const LATEST = "backup:latest";
const HISTORY_PREFIX = "backup:history:";
const HISTORY_TTL = 60 * 60 * 24 * 60;
const MAX_BYTES = 20 * 1024 * 1024;
const MAX_HISTORY = 10;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });

async function authorized(request, env) {
  const expected = env.CLOUD_PASSWORD;
  const given = (request.headers.get("Authorization") || "").replace(/^Bearer /, "");
  if (!expected || !given) return false;
  const enc = new TextEncoder();
  const [a, b] = await Promise.all([enc.encode(expected), enc.encode(given)].map((v) => crypto.subtle.digest("SHA-256", v)));
  return crypto.subtle.timingSafeEqual(a, b);
}

async function gunzipHead(buffer, length) {
  const reader = new Blob([buffer]).stream().pipeThrough(new DecompressionStream("gzip")).getReader();
  const out = new Uint8Array(length);
  let got = 0;
  while (got < length) {
    const { value, done } = await reader.read();
    if (done) break;
    const take = value.subarray(0, length - got);
    out.set(take, got);
    got += take.length;
  }
  await reader.cancel().catch(() => {});
  return out.subarray(0, got);
}

async function handleGet(request, env) {
  if (new URL(request.url).searchParams.has("info")) {
    const { keys } = await env.BACKUPS.list({ prefix: LATEST });
    return json({ latest: keys[0]?.metadata ?? null });
  }
  const { value, metadata } = await env.BACKUPS.getWithMetadata(LATEST, "arrayBuffer");
  if (!value) return json({ error: "No cloud backup saved yet." }, 404);
  return new Response(value, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Cache-Control": "no-store",
      "X-Backup-Saved-At": metadata?.savedAt ?? "",
      "X-Backup-Device": metadata?.device ?? "",
    },
  });
}

async function handlePut(request, env) {
  const body = await request.arrayBuffer();
  if (!body.byteLength) return json({ error: "Empty backup." }, 400);
  if (body.byteLength > MAX_BYTES) return json({ error: "Backup is larger than 20 MB." }, 413);
  const bytes = new Uint8Array(body);
  const compressed = bytes[0] === 0x1f && bytes[1] === 0x8b;
  let head;
  try {
    head = compressed ? await gunzipHead(body, 16) : bytes.subarray(0, 16);
  } catch {
    return json({ error: "Backup file is damaged (bad compression)." }, 400);
  }
  if (!new TextDecoder().decode(head).startsWith("SQLite format 3"))
    return json({ error: "Not a valid database backup." }, 400);

  let counts;
  try {
    counts = JSON.parse(request.headers.get("X-Sync-Counts") || "");
  } catch {}
  const valid = (v) => Number.isFinite(v) && v >= 0;
  if (!counts || ![counts.matches, counts.players, counts.deliveries, counts.deletions].every(valid))
    return json({ error: "This version of the app is out of date. Refresh the page (Ctrl+F5) and try again." }, 400);

  const previous = await env.BACKUPS.getWithMetadata(LATEST, "arrayBuffer");
  const prev = previous.metadata;
  if (prev?.savedAt && (request.headers.get("X-Base-Saved-At") || "") !== prev.savedAt)
    return json({ error: "The cloud was updated by another phone. Please tap SAVE TO CLOUD again." }, 409);
  const pc = prev?.counts;
  if (pc && (counts.matches + counts.deletions < pc.matches + pc.deletions || counts.players < pc.players))
    return json(
      {
        error: `Blocked: this upload has fewer records than the cloud (${counts.matches} matches / ${counts.players} players vs ${pc.matches} / ${pc.players}). Cloud data was NOT changed.`,
      },
      412,
    );

  const metadata = {
    savedAt: new Date().toISOString(),
    size: body.byteLength,
    compressed,
    rawSize: compressed ? Number(request.headers.get("X-Raw-Size")) || null : body.byteLength,
    device: (request.headers.get("X-Device-Name") || "").slice(0, 60),
    counts: { matches: counts.matches, players: counts.players, deliveries: counts.deliveries, deletions: counts.deletions },
  };
  if (previous.value)
    await env.BACKUPS.put(HISTORY_PREFIX + (prev?.savedAt ?? Date.now()), previous.value, {
      metadata: prev,
      expirationTtl: HISTORY_TTL,
    });
  await env.BACKUPS.put(LATEST, body, { metadata });
  const { keys } = await env.BACKUPS.list({ prefix: HISTORY_PREFIX });
  const old = keys.map((k) => k.name).sort().slice(0, Math.max(0, keys.length - MAX_HISTORY));
  await Promise.all(old.map((name) => env.BACKUPS.delete(name)));
  return json({ ok: true, latest: metadata });
}

export async function onRequest({ request, env }) {
  if (!env.BACKUPS) return json({ error: "Cloud storage is not configured." }, 500);
  if (request.method === "GET") return handleGet(request, env);
  if (request.method !== "PUT") return json({ error: "Method not allowed." }, 405);
  if (!(await authorized(request, env))) return json({ error: "Wrong scorer password." }, 401);
  return handlePut(request, env);
}
