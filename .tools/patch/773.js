// module 773 from __common-544e76b37d4da68f62c23250dda1d8c8.js deps=[946]
(function (g, r, i, a, m, e, d) {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: !0 }),
    (e.initializeDatabase = async function (s) {
      await s.execAsync("PRAGMA foreign_keys = ON;"),
        await s.execAsync(t.DATABASE_SCHEMA);
      const T = async (t, T, n) => {
        (await s.getAllAsync(`PRAGMA table_info(${t})`)).some(
          (t) => t.name === T,
        ) || (await s.execAsync(`ALTER TABLE ${t} ADD COLUMN ${T} ${n}`));
      };
      await T("matches", "current_innings", "INTEGER NOT NULL DEFAULT 1"),
        await T("matches", "match_type", "TEXT NOT NULL DEFAULT 'normal'"),
        await T("matches", "batting_mode", "TEXT NOT NULL DEFAULT 'duo'"),
        await T("matches", "series_id", "TEXT"),
        await T("matches", "series_match_number", "INTEGER NOT NULL DEFAULT 1"),
        await T("matches", "result_type", "TEXT"),
        await T("matches", "winner_side", "TEXT"),
        await T("matches", "match_name", "TEXT NOT NULL DEFAULT ''"),
        await T("matches", "toss_winner", "TEXT"),
        await T("matches", "toss_decision", "TEXT"),
        await T("deliveries", "extra_runs", "INTEGER NOT NULL DEFAULT 0"),
        await T("deliveries", "dismissed_batter", "TEXT"),
        await T("deliveries", "dismissed_by", "TEXT"),
        await T("match_players", "is_captain", "INTEGER NOT NULL DEFAULT 0"),
        await T(
          "match_players",
          "is_wicketkeeper",
          "INTEGER NOT NULL DEFAULT 0",
        ),
        await T("players", "player_type", "TEXT NOT NULL DEFAULT 'club'"),
        await T("players", "updated_at", "TEXT"),
        await T("matches", "super_over_balls", "INTEGER"),
        await T("match_players", "is_common", "INTEGER NOT NULL DEFAULT 0"),
        await T("grounds", "updated_at", "TEXT"),
        await T("match_series", "updated_at", "TEXT"),
        await s.execAsync(
          "CREATE TABLE IF NOT EXISTS sync_deletions (table_name TEXT NOT NULL, row_id TEXT NOT NULL, deleted_at TEXT NOT NULL, PRIMARY KEY(table_name, row_id));",
        );
      for (const tbl of ["players", "grounds", "match_series"])
        await s.execAsync(
          `CREATE TRIGGER IF NOT EXISTS sync_${tbl}_touch_ins AFTER INSERT ON ${tbl} WHEN NEW.updated_at IS NULL BEGIN UPDATE ${tbl} SET updated_at=strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id=NEW.id; END;` +
            `CREATE TRIGGER IF NOT EXISTS sync_${tbl}_touch_upd AFTER UPDATE ON ${tbl} WHEN NEW.updated_at IS OLD.updated_at BEGIN UPDATE ${tbl} SET updated_at=strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id=NEW.id; END;`,
        );
      for (const tbl of ["matches", "match_series", "grounds", "players"])
        await s.execAsync(
          `CREATE TRIGGER IF NOT EXISTS sync_${tbl}_del AFTER DELETE ON ${tbl} BEGIN INSERT OR IGNORE INTO sync_deletions(table_name,row_id,deleted_at) VALUES('${tbl}',OLD.id,strftime('%Y-%m-%dT%H:%M:%fZ','now')); END;`,
        );
      const n = [
        ["theme", "dark"],
        ["cricket_type", "tennis_ball"],
        ["wide_penalty", "1"],
        ["no_ball_penalty", "1"],
      ];
      for (const [t, T] of n)
        await s.runAsync(
          "INSERT OR IGNORE INTO app_settings\n       (setting_key, setting_value)\n       VALUES (?, ?)",
          t,
          T,
        );
      console.log("Baadhsah Cricket database initialized!");
    });
  var t = r(d[0]);

  const CLOUD_PW_KEY = "baadhsah-cloud-password";
  const savedPassword = () => {
    try {
      return (localStorage.getItem(CLOUD_PW_KEY) ?? "").trim();
    } catch {
      return "";
    }
  };
  const rememberPassword = (pw) => {
    try {
      pw ? localStorage.setItem(CLOUD_PW_KEY, pw) : localStorage.removeItem(CLOUD_PW_KEY);
    } catch {}
  };
  const pipeBytes = async (bytes, transform) =>
    new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(transform)).arrayBuffer());
  const gzipBytes = (bytes) => pipeBytes(bytes, new CompressionStream("gzip"));
  const gunzipIfNeeded = async (bytes) =>
    0x1f === bytes[0] && 0x8b === bytes[1] ? pipeBytes(bytes, new DecompressionStream("gzip")) : bytes;

  async function cloudRequest(method, { password = "", body, headers = {}, info = !1, timeoutMs = 0 } = {}) {
    const ctrl = timeoutMs ? new AbortController() : null,
      timer = ctrl && setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const res = await fetch("/api/backup" + (info ? "?info=1" : ""), {
        method,
        headers: {
          ...(password ? { Authorization: "Bearer " + password } : {}),
          "X-Device-Name": (navigator.userAgent.match(/\(([^;)]+)/)?.[1] ?? "device").slice(0, 60),
          ...headers,
        },
        body,
        cache: "no-store",
        signal: ctrl?.signal,
      });
      if (!res.ok) {
        let msg = `Cloud request failed (${res.status}).`;
        try {
          msg = (await res.json()).error ?? msg;
        } catch {}
        const err = new Error(msg);
        throw ((err.status = res.status), err);
      }
      return res;
    } finally {
      timer && clearTimeout(timer);
    }
  }

  const SYNC_TABLES = ["players", "grounds", "match_series", "matches", "match_players", "deliveries"];
  const columnsOf = async (db, table) => (await db.getAllAsync(`PRAGMA table_info(${table})`)).map((c) => c.name);
  async function upsertRow(db, table, row, cols, keyCols, replace) {
    const use = cols.filter((c) => c in row);
    if (replace) {
      const setCols = use.filter((c) => !keyCols.includes(c));
      const r = await db.runAsync(
        `UPDATE ${table} SET ${setCols.map((c) => `${c}=?`).join(",")} WHERE ${keyCols.map((c) => `${c}=?`).join(" AND ")}`,
        ...setCols.map((c) => row[c]),
        ...keyCols.map((c) => row[c]),
      );
      if (r.changes) return;
    }
    await db.runAsync(
      `INSERT OR IGNORE INTO ${table}(${use.join(",")}) VALUES(${use.map(() => "?").join(",")})`,
      ...use.map((c) => row[c]),
    );
  }
  async function syncCounts(db) {
    const one = async (sql) => (await db.getFirstAsync(sql))?.n ?? 0;
    return {
      matches: await one("SELECT COUNT(*) n FROM matches"),
      players: await one("SELECT COUNT(*) n FROM players"),
      deliveries: await one("SELECT COUNT(*) n FROM deliveries"),
      deletions: await one("SELECT COUNT(*) n FROM sync_deletions"),
    };
  }
  async function mergeCloudInto(local, cloudBytes, deserialize) {
    const cloud = await deserialize(cloudBytes);
    const stats = { matchesAdded: 0, matchesUpdated: 0, playersAdded: 0, deleted: 0 };
    try {
      const ok = await cloud.getFirstAsync("PRAGMA integrity_check");
      if ("ok" !== ok?.integrity_check) throw new Error("Cloud backup is damaged. Nothing was changed.");
      const cloudTables = new Set(
        (await cloud.getAllAsync("SELECT name FROM sqlite_master WHERE type='table'")).map((r) => r.name),
      );
      for (const tbl of ["players", "matches", "deliveries", "match_players"])
        if (!cloudTables.has(tbl)) throw new Error("Cloud backup is missing required app data. Nothing was changed.");
      const cols = {};
      for (const tbl of SYNC_TABLES) {
        const cc = new Set(cloudTables.has(tbl) ? await columnsOf(cloud, tbl) : []);
        cols[tbl] = (await columnsOf(local, tbl)).filter((c) => cc.has(c));
      }
      const all = (sql, ...p) => cloud.getAllAsync(sql, ...p);
      const allFrom = (tbl) => (cloudTables.has(tbl) ? all(`SELECT * FROM ${tbl}`) : []);
      const deletions = await allFrom("sync_deletions");
      const key = (d) => d.table_name + ":" + d.row_id;
      const deleted = new Set(deletions.map(key));
      const localDeleted = new Set((await local.getAllAsync("SELECT table_name,row_id FROM sync_deletions")).map(key));
      const gone = (tbl, id) => deleted.has(tbl + ":" + id) || localDeleted.has(tbl + ":" + id);
      const newer = (a, b) => (a?.updated_at ?? "") > (b?.updated_at ?? "");
      const progress = async (db, m) =>
        ("completed" === m.status ? 1e9 : 0) +
        1e6 * (m.current_innings ?? 1) +
        ((await db.getFirstAsync("SELECT COUNT(*) n FROM deliveries WHERE match_id=?", m.id))?.n ?? 0);
      await local.withTransactionAsync(async () => {
        for (const d of deletions)
          await local.runAsync(
            "INSERT OR IGNORE INTO sync_deletions(table_name,row_id,deleted_at) VALUES(?,?,?)",
            d.table_name,
            d.row_id,
            d.deleted_at,
          );
        for (const tbl of ["players", "grounds", "match_series"])
          for (const row of await allFrom(tbl)) {
            if (gone(tbl, row.id)) continue;
            const mine = await local.getFirstAsync(`SELECT * FROM ${tbl} WHERE id=?`, row.id);
            if (!mine) await upsertRow(local, tbl, row, cols[tbl], ["id"], !1), "players" === tbl && stats.playersAdded++;
            else if (newer(row, mine) || ("match_series" === tbl && "completed" === row.status && "completed" !== mine.status))
              await upsertRow(local, tbl, row, cols[tbl], ["id"], !0);
          }
        for (const m of await all("SELECT * FROM matches")) {
          if (gone("matches", m.id)) continue;
          const mine = await local.getFirstAsync("SELECT * FROM matches WHERE id=?", m.id);
          if (mine && (await progress(cloud, m)) <= (await progress(local, mine))) continue;
          m.series_id &&
            !(await local.getFirstAsync("SELECT 1 x FROM match_series WHERE id=?", m.series_id)) &&
            (m.series_id = null);
          if (mine)
            await local.runAsync("DELETE FROM deliveries WHERE match_id=?", m.id),
              await local.runAsync("DELETE FROM match_players WHERE match_id=?", m.id),
              await upsertRow(local, "matches", m, cols.matches, ["id"], !0),
              stats.matchesUpdated++;
          else await upsertRow(local, "matches", m, cols.matches, ["id"], !1), stats.matchesAdded++;
          for (const mp of await all("SELECT * FROM match_players WHERE match_id=?", m.id))
            (await local.getFirstAsync("SELECT 1 x FROM players WHERE id=?", mp.player_id)) &&
              (await upsertRow(local, "match_players", mp, cols.match_players, ["match_id", "player_id"], !1));
          for (const dl of await all("SELECT * FROM deliveries WHERE match_id=? ORDER BY innings,sequence", m.id))
            await upsertRow(local, "deliveries", dl, cols.deliveries, ["id"], !1);
        }
        const ORDER = ["matches", "match_series", "grounds", "players"];
        const pending = (await local.getAllAsync("SELECT table_name,row_id FROM sync_deletions"))
          .filter((d) => ORDER.includes(d.table_name))
          .sort((a, b) => ORDER.indexOf(a.table_name) - ORDER.indexOf(b.table_name));
        for (const d of pending) {
          const stillUsed = {
            match_series: "SELECT 1 x FROM matches WHERE series_id=?",
            grounds:
              "SELECT 1 x FROM matches m JOIN grounds g ON lower(trim(m.ground))=lower(trim(g.ground_name)) WHERE g.id=?",
            players: "SELECT 1 x FROM match_players WHERE player_id=?",
          }[d.table_name];
          if (stillUsed && (await local.getFirstAsync(stillUsed, d.row_id))) continue;
          stats.deleted += (await local.runAsync(`DELETE FROM ${d.table_name} WHERE id=?`, d.row_id)).changes;
        }
      });
    } finally {
      await cloud.closeAsync().catch(() => {});
    }
    return stats;
  }
  function describeMerge(s) {
    const parts = [];
    s.matchesAdded && parts.push(`${s.matchesAdded} new match${1 === s.matchesAdded ? "" : "es"}`);
    s.matchesUpdated && parts.push(`${s.matchesUpdated} match${1 === s.matchesUpdated ? "" : "es"} updated`);
    s.playersAdded && parts.push(`${s.playersAdded} new player${1 === s.playersAdded ? "" : "s"}`);
    s.deleted && parts.push(`${s.deleted} deleted record${1 === s.deleted ? "" : "s"} removed`);
    return parts.length ? parts.join(" \xb7 ") : "nothing new";
  }
  async function cloudPull(db, deserialize, opts = {}) {
    let res;
    try {
      res = await cloudRequest("GET", opts);
    } catch (err) {
      if (404 === err.status) return { base: "", stats: null };
      throw err;
    }
    const bytes = await gunzipIfNeeded(new Uint8Array(await res.arrayBuffer()));
    return { base: res.headers.get("X-Backup-Saved-At") ?? "", stats: await mergeCloudInto(db, bytes, deserialize) };
  }
  let pushQueue = Promise.resolve();
  function cloudPush(db, deserialize, password) {
    if (!password) return Promise.reject(new Error("Enter the scorer password first."));
    const run = pushQueue.catch(() => {}).then(async () => {
        for (let attempt = 0; ; attempt++) {
          const { base, stats } = await cloudPull(db, deserialize),
            counts = await syncCounts(db),
            raw = await db.serializeAsync(),
            body = await gzipBytes(raw);
          try {
            const info = await (
              await cloudRequest("PUT", {
                password,
                body,
                headers: {
                  "X-Sync-Counts": JSON.stringify(counts),
                  "X-Base-Saved-At": base,
                  "X-Raw-Size": String(raw.length),
                },
              })
            ).json();
            rememberPassword(password);
            lastCloudSeen = info.latest?.savedAt ?? lastCloudSeen;
            return { latest: info.latest, counts, stats };
          } catch (err) {
            if (409 !== err.status || attempt >= 2) throw err;
          }
        }
    });
    return (pushQueue = run);
  }
  let lastCloudSeen = "",
    lastCheck = 0,
    watching = !1,
    liveDb = null;
  const hasChanges = (s) => Boolean(s && (s.matchesAdded || s.matchesUpdated || s.playersAdded || s.deleted));
  let openPull = null;
  async function pullOnOpen(db, deserialize) {
    liveDb = db;
    openPull ??= (async () => {
      try {
        const { base, stats } = await cloudPull(db, deserialize, { timeoutMs: 8e3 });
        (lastCloudSeen = base), (lastCheck = Date.now());
        stats && console.log("Cloud sync on open:", describeMerge(stats));
      } catch (err) {
        console.warn("Cloud sync on open skipped:", err?.message ?? err);
      }
    })();
    await openPull;
    watchForUpdates(db, deserialize);
  }
  function watchForUpdates(db, deserialize) {
    if (watching || "undefined" == typeof document) return;
    watching = !0;
    let busy = !1;
    const check = async () => {
      if (busy || "visible" !== document.visibilityState || Date.now() - lastCheck < 15e3) return;
      busy = !0;
      lastCheck = Date.now();
      try {
        const info = await (await cloudRequest("GET", { info: !0, timeoutMs: 8e3 })).json(),
          savedAt = info.latest?.savedAt ?? "";
        if (!savedAt || savedAt === lastCloudSeen) return;
        const { base, stats } = await cloudPull(liveDb ?? db, deserialize, { timeoutMs: 15e3 });
        lastCloudSeen = base;
        hasChanges(stats) &&
          (console.log("New cloud records:", describeMerge(stats)),
          location.pathname.startsWith("/scoring") || location.reload());
      } catch (err) {
        console.warn("Cloud check skipped:", err?.message ?? err);
      } finally {
        busy = !1;
      }
    };
    document.addEventListener("visibilitychange", check);
    window.addEventListener("focus", check);
    window.addEventListener("pageshow", check);
  }
  e.cloud = {
    savedPassword,
    rememberPassword,
    cloudRequest,
    cloudPull,
    cloudPush,
    pullOnOpen,
    syncCounts,
    describeMerge,
  };
  globalThis.__baadhsahCloud = e.cloud;
});
