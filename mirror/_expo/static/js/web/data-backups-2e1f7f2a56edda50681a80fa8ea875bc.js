__d(function (g, r, i, a, m, _e, d) {
  "use strict";
  function e(e) {
    return e && e.__esModule ? e : { default: e };
  }
  Object.defineProperty(_e, "__esModule", { value: !0 }),
    Object.defineProperty(_e, "default", {
      enumerable: !0,
      get: function () {
        return x;
      },
    });
  var t = r(d[0]),
    s = (r(d[1]), r(d[2])),
    n = r(d[3]),
    c = e(r(d[4]));
  r(d[5]);
  var l = e(r(d[6])),
    o = e(r(d[7])),
    E = e(r(d[8])),
    u = e(r(d[9])),
    _ = e(r(d[10])),
    p = e(r(d[11])),
    h = r(d[12]),
    S = r(d[13]),
    C = r(d[14]);
  const b = {
      bg: "#080D0B",
      card: "#111A15",
      green: "#B7F34A",
      white: "#F5F7F2",
      muted: "#89948B",
      border: "#26332A",
      red: "#FF8B80",
    },
    A = "knight3",
    y = new TextEncoder().encode("BAADHSAH_CRICKET_BACKUP_V1\n"),
    O = [
      "BJS turf",
      "Baarat ghar",
      "Rinku Park",
      "Surtal",
      "Cp turf",
      "Bindra park",
    ];
  function f() {
    return new Date().toISOString().replace(/[:.]/g, "-").replace(/Z$/, "");
  }
  function w(e, t) {
    return e.map((e) => t.map((t) => e[t] ?? ""));
  }
  function N(e, t, s, n) {
    return { name: e, rows: [t, ...w(s, n)] };
  }
  function T(e, t, s) {
    const n = e.slice().buffer,
      c = URL.createObjectURL(new Blob([n], { type: s })),
      l = document.createElement("a");
    (l.href = c),
      (l.download = t),
      document.body.appendChild(l),
      l.click(),
      l.remove(),
      window.setTimeout(() => URL.revokeObjectURL(c), 1e3);
  }
  async function L(e, t, s) {
    return T(e, t, s), "Download started.";
  }
  async function R() {
    return new Promise((e) => {
      const t = document.createElement("input");
      (t.type = "file"),
        (t.accept = ".bcbak,.db,.sqlite,application/octet-stream"),
        (t.onchange = async () => {
          const s = t.files?.[0];
          e(s ? new Uint8Array(await s.arrayBuffer()) : null);
        }),
        t.addEventListener("cancel", () => e(null), { once: !0 }),
        t.click();
    });
  }
  function k(e) {
    const t = new Uint8Array(y.length + e.length);
    return t.set(y), t.set(e, y.length), t;
  }
  function formatCloudDate(iso) {
    if (!iso) return "unknown time";
    const d = new Date(iso);
    return isNaN(d) ? iso : d.toLocaleString(void 0, { dateStyle: "medium", timeStyle: "short" });
  }
  const { syncCounts, describeMerge } = h.cloud;
  function x() {
    const e = (0, t.useSQLiteContext)(),
      [E, w] = (0, n.useState)(""),
      [T, x] = (0, n.useState)(!1),
      [M, B] = (0, n.useState)(""),
      [W, H] = (0, n.useState)(""),
      [F, I] = (0, n.useState)(!1),
      [v, U] = (0, n.useState)(null),
      [cloudPw, setCloudPw] = (0, n.useState)(() => h.cloud.savedPassword()),
      [cloudInfo, setCloudInfo] = (0, n.useState)(null);
    async function refreshCloudInfo() {
      I(!0), B(""), H("");
      try {
        const info = await (await h.cloud.cloudRequest("GET", { info: !0 })).json();
        setCloudInfo(info.latest ?? !1);
      } catch (err) {
        B(err.message);
      } finally {
        I(!1);
      }
    }
    async function saveToCloud() {
      I(!0), B(""), H("");
      try {
        const { latest, counts, stats } = await h.cloud.cloudPush(e, t.deserializeDatabaseAsync, cloudPw.trim());
        setCloudInfo(latest),
          H(
            `Saved to cloud \xb7 ${formatCloudDate(latest.savedAt)} \xb7 ${counts.matches} matches, ${counts.players} players.` +
              (stats ? ` Merged from cloud: ${describeMerge(stats)}.` : ""),
          );
      } catch (err) {
        B(err.message);
      } finally {
        I(!1);
      }
    }
    async function restoreFromCloud() {
      I(!0), B(""), H("");
      try {
        const { stats } = await h.cloud.cloudPull(e, t.deserializeDatabaseAsync);
        if (!stats) return void B("No cloud backup saved yet.");
        const counts = await syncCounts(e);
        H(
          `Got data from cloud: ${describeMerge(stats)}. This phone now has ${counts.matches} matches and ${counts.players} players.` +
            (stats.deleted
              ? " Records deleted in Match History on another phone were removed here too."
              : " Nothing on this phone was deleted."),
        );
      } catch (err) {
        B(err.message);
      } finally {
        I(!1);
      }
    }
    function forgetCloudPw() {
      h.cloud.rememberPassword(""),
        setCloudPw(""),
        H("Scorer password removed from this device. This phone is now view-only for the cloud.");
    }
    function j() {
      E === A ? (B(""), w(""), x(!0)) : B("Incorrect password.");
    }
    return (0, C.jsxs)(o.default, {
      style: D.page,
      contentContainerStyle: D.content,
      children: [
        (0, C.jsx)(l.default, {
          onPress: () => s.router.back(),
          children: (0, C.jsx)(u.default, {
            style: D.back,
            children: "\u2039  DASHBOARD",
          }),
        }),
        (0, C.jsx)(u.default, { style: D.kicker, children: "CLUB SETTINGS" }),
        (0, C.jsx)(u.default, { style: D.title, children: "Data & Backups" }),
        (0, C.jsx)(u.default, {
          style: D.hint,
          children:
            "Keep your local cricket records safe when changing phones or updating the app.",
        }),
        T
          ? (0, C.jsxs)(C.Fragment, {
              children: [
                (0, C.jsxs)(p.default, {
                  style: [D.card, D.cloudCard],
                  children: [
                    (0, C.jsx)(u.default, { style: D.section, children: "CLOUD BACKUP" }),
                    (0, C.jsx)(u.default, {
                      style: D.hint,
                      children:
                        "Everyone gets the latest cloud records automatically when they open the app. Only scorers with the scorer password can update the cloud: matches are uploaded automatically when a match finishes, or tap SAVE TO CLOUD. Cloud data only grows \u2014 nothing is overwritten; only matches deleted in Match History are removed everywhere.",
                    }),
                    (0, C.jsx)(_.default, {
                      style: D.input,
                      value: cloudPw,
                      onChangeText: setCloudPw,
                      secureTextEntry: !0,
                      placeholder: "Scorer password (only needed to upload)",
                      placeholderTextColor: b.muted,
                      onSubmitEditing: refreshCloudInfo,
                    }),
                    (0, C.jsx)(u.default, {
                      style: D.hint,
                      children:
                        null === cloudInfo
                          ? h.cloud.savedPassword()
                            ? "This phone is a SCORER: finished matches upload to the cloud automatically."
                            : "This phone is VIEW-ONLY for the cloud. Enter the scorer password and tap SAVE TO CLOUD once to make it a scorer phone."
                          : !1 === cloudInfo
                            ? "No cloud backup saved yet."
                            : `Last cloud save: ${formatCloudDate(cloudInfo.savedAt)} \xb7 ${Math.ceil((cloudInfo.size ?? 0) / 1024)} KB${cloudInfo.rawSize ? ` (${Math.ceil(cloudInfo.rawSize / 1024)} KB uncompressed) \xb7 ${Math.round((100 * (cloudInfo.size ?? 0)) / (20 * 1024 * 1024))}% of 20 MB limit` : ""}${cloudInfo.counts ? ` \xb7 ${cloudInfo.counts.matches} matches \xb7 ${cloudInfo.counts.players} players` : ""}${cloudInfo.device ? ` \xb7 ${cloudInfo.device}` : ""}`,
                    }),
                    (0, C.jsx)(l.default, {
                      style: D.primary,
                      disabled: F,
                      onPress: saveToCloud,
                      children: (0, C.jsx)(u.default, {
                        style: D.primaryText,
                        children: F ? "WORKING\u2026" : "SAVE TO CLOUD",
                      }),
                    }),
                    (0, C.jsx)(l.default, {
                      style: D.secondary,
                      disabled: F,
                      onPress: restoreFromCloud,
                      children: (0, C.jsx)(u.default, {
                        style: D.secondaryText,
                        children: "GET FROM CLOUD",
                      }),
                    }),
                    (0, C.jsxs)(p.default, {
                      style: D.cloudRow,
                      children: [
                        (0, C.jsx)(l.default, {
                          style: [D.secondary, D.cloudSmall],
                          disabled: F,
                          onPress: refreshCloudInfo,
                          children: (0, C.jsx)(u.default, { style: D.secondaryText, children: "CHECK CLOUD" }),
                        }),
                        (0, C.jsx)(l.default, {
                          style: [D.secondary, D.cloudSmall],
                          onPress: forgetCloudPw,
                          children: (0, C.jsx)(u.default, { style: D.secondaryText, children: "FORGET PASSWORD" }),
                        }),
                      ],
                    }),
                  ],
                }),
                (0, C.jsxs)(p.default, {
                  style: D.card,
                  children: [
                    (0, C.jsx)(u.default, {
                      style: D.section,
                      children: "FULL BACKUP",
                    }),
                    (0, C.jsx)(u.default, {
                      style: D.hint,
                      children:
                        "Export a restorable database backup before imports or app updates. Importing replaces current app data; use EXPORT CURRENT DATA FIRST in the restore prompt if unsure.",
                    }),
                    (0, C.jsx)(l.default, {
                      style: D.primary,
                      disabled: F,
                      onPress: async function () {
                        I(!0), B(""), H("");
                        try {
                          const t = k(await e.serializeAsync()),
                            s = await L(
                              t,
                              `Baadhsah-Cricket-backup-${f()}.bcbak`,
                              "application/octet-stream",
                            );
                          H(s);
                        } catch {
                          B("Could not export the database backup.");
                        } finally {
                          I(!1);
                        }
                      },
                      children: (0, C.jsx)(u.default, {
                        style: D.primaryText,
                        children: F
                          ? "WORKING\u2026"
                          : "EXPORT FULL BACKUP (.BCBAK)",
                      }),
                    }),
                    (0, C.jsx)(l.default, {
                      style: D.secondary,
                      disabled: F,
                      onPress: async function () {
                        I(!0), B(""), H("");
                        try {
                          const t = await R();
                          if (!t) return;
                          if (
                            !(
                              (e = t).length > y.length &&
                              y.every((t, s) => e[s] === t)
                            )
                          )
                            return void B(
                              "This file is not a Baadhsah Cricket backup.",
                            );
                          U({
                            name: `Baadhsah Cricket backup (${Math.ceil((t.length - y.length) / 1024)} KB)`,
                            bytes: t.slice(y.length),
                          });
                        } catch {
                          B("Could not open that backup file.");
                        } finally {
                          I(!1);
                        }
                        var e;
                      },
                      children: (0, C.jsx)(u.default, {
                        style: D.secondaryText,
                        children: "IMPORT / RESTORE BACKUP",
                      }),
                    }),
                  ],
                }),
                (0, C.jsxs)(p.default, {
                  style: D.card,
                  children: [
                    (0, C.jsx)(u.default, {
                      style: D.section,
                      children: "EXCEL REPORT",
                    }),
                    (0, C.jsx)(u.default, {
                      style: D.hint,
                      children:
                        "Create an .xlsx workbook for Excel with match details, series by date, squads, player totals, batting scorecards, bowling figures, and every recorded delivery.",
                    }),
                    (0, C.jsx)(l.default, {
                      style: D.primary,
                      disabled: F,
                      onPress: async function () {
                        I(!0), B(""), H("");
                        try {
                          const t = await e.getAllAsync(
                              "SELECT m.id,m.series_id,COALESCE(s.series_date,substr(m.created_at,1,10)) AS series_date,m.series_match_number,m.match_name,m.match_type,m.batting_mode,m.ground,m.overs,m.team_a,m.team_b,m.batting_first,CASE m.toss_winner WHEN 'A' THEN m.team_a WHEN 'B' THEN m.team_b ELSE '' END AS toss_winner,COALESCE(m.toss_decision,'') AS toss_decision,m.status,COALESCE(m.result_type,'') AS result_type,CASE m.winner_side WHEN 'A' THEN m.team_a WHEN 'B' THEN m.team_b ELSE '' END AS winner,COALESCE((SELECT p.name FROM match_players mp JOIN players p ON p.id=mp.player_id WHERE mp.match_id=m.id AND mp.team_side='A' AND mp.is_captain=1 LIMIT 1),'') AS captain_a,COALESCE((SELECT p.name FROM match_players mp JOIN players p ON p.id=mp.player_id WHERE mp.match_id=m.id AND mp.team_side='B' AND mp.is_captain=1 LIMIT 1),'') AS captain_b,COALESCE((SELECT SUM(d.runs_bat+d.extras) FROM deliveries d WHERE d.match_id=m.id AND d.innings=1),0) AS innings_1_runs,COALESCE((SELECT SUM(d.wicket) FROM deliveries d WHERE d.match_id=m.id AND d.innings=1),0) AS innings_1_wickets,COALESCE((SELECT SUM(d.runs_bat+d.extras) FROM deliveries d WHERE d.match_id=m.id AND d.innings=2),0) AS innings_2_runs,COALESCE((SELECT SUM(d.wicket) FROM deliveries d WHERE d.match_id=m.id AND d.innings=2),0) AS innings_2_wickets,COALESCE((SELECT SUM(d.runs_bat+d.extras) FROM deliveries d WHERE d.match_id=m.id AND d.innings=3),0) AS innings_3_runs,COALESCE((SELECT SUM(d.wicket) FROM deliveries d WHERE d.match_id=m.id AND d.innings=3),0) AS innings_3_wickets,COALESCE((SELECT SUM(d.runs_bat+d.extras) FROM deliveries d WHERE d.match_id=m.id AND d.innings=4),0) AS innings_4_runs,COALESCE((SELECT SUM(d.wicket) FROM deliveries d WHERE d.match_id=m.id AND d.innings=4),0) AS innings_4_wickets,m.created_at,m.completed_at FROM matches m LEFT JOIN match_series s ON s.id=m.series_id ORDER BY series_date DESC,m.series_match_number,m.created_at",
                            ),
                            s = await e.getAllAsync(
                              "SELECT s.series_date,s.match_type,s.status,s.created_at,s.completed_at,COUNT(m.id) AS matches FROM match_series s LEFT JOIN matches m ON m.series_id=s.id GROUP BY s.id ORDER BY s.series_date DESC,s.created_at DESC",
                            ),
                            n = await e.getAllAsync(
                              "SELECT p.name,p.nickname,p.batting_style,p.bowling_style,p.player_type,p.is_active,COUNT(DISTINCT mp.match_id) AS matches,(SELECT COALESCE(SUM(d.runs_bat),0) FROM deliveries d WHERE lower(trim(d.batter))=lower(trim(p.name))) AS runs,(SELECT COALESCE(SUM(CASE WHEN lower(COALESCE(d.extra_type,''))!='wide' AND lower(COALESCE(d.dismissal,''))!='retired hurt' THEN 1 ELSE 0 END),0) FROM deliveries d WHERE lower(trim(d.batter))=lower(trim(p.name))) AS balls_faced,(SELECT COALESCE(SUM(CASE WHEN d.runs_bat=4 THEN 1 ELSE 0 END),0) FROM deliveries d WHERE lower(trim(d.batter))=lower(trim(p.name))) AS fours,(SELECT COALESCE(SUM(CASE WHEN d.runs_bat=6 THEN 1 ELSE 0 END),0) FROM deliveries d WHERE lower(trim(d.batter))=lower(trim(p.name))) AS sixes,(SELECT COALESCE(SUM(CASE WHEN d.wicket=1 AND COALESCE(d.dismissal,'') NOT IN ('Run out','Retired hurt','Obstructing the field','Timed out') THEN 1 ELSE 0 END),0) FROM deliveries d WHERE lower(trim(d.bowler))=lower(trim(p.name))) AS wickets FROM players p LEFT JOIN match_players mp ON mp.player_id=p.id GROUP BY p.id ORDER BY p.name COLLATE NOCASE",
                            ),
                            c = await e.getAllAsync(
                              "SELECT COALESCE(s.series_date,substr(m.created_at,1,10)) AS series_date,m.series_match_number,m.match_name,m.team_a,m.team_b,d.innings,d.batter,SUM(d.runs_bat) AS runs,SUM(CASE WHEN lower(COALESCE(d.extra_type,''))!='wide' AND lower(COALESCE(d.dismissal,''))!='retired hurt' THEN 1 ELSE 0 END) AS balls_faced,SUM(CASE WHEN d.runs_bat=4 THEN 1 ELSE 0 END) AS fours,SUM(CASE WHEN d.runs_bat=6 THEN 1 ELSE 0 END) AS sixes,MAX(CASE WHEN d.wicket=1 THEN COALESCE(d.dismissal,'Out') ELSE '' END) AS dismissal FROM deliveries d JOIN matches m ON m.id=d.match_id LEFT JOIN match_series s ON s.id=m.series_id GROUP BY d.match_id,d.innings,d.batter ORDER BY series_date DESC,m.series_match_number,d.innings,d.batter COLLATE NOCASE",
                            ),
                            l = await e.getAllAsync(
                              "SELECT COALESCE(s.series_date,substr(m.created_at,1,10)) AS series_date,m.series_match_number,m.match_name,m.team_a,m.team_b,d.innings,d.bowler,SUM(d.legal) AS legal_balls,SUM(d.runs_bat+CASE WHEN lower(COALESCE(d.extra_type,'')) IN ('wide','no-ball') THEN d.extras ELSE 0 END) AS runs_conceded,SUM(CASE WHEN d.wicket=1 AND COALESCE(d.dismissal,'') NOT IN ('Run out','Retired hurt','Obstructing the field','Timed out') THEN 1 ELSE 0 END) AS wickets FROM deliveries d JOIN matches m ON m.id=d.match_id LEFT JOIN match_series s ON s.id=m.series_id GROUP BY d.match_id,d.innings,d.bowler ORDER BY series_date DESC,m.series_match_number,d.innings,d.bowler COLLATE NOCASE",
                            ),
                            o = await e.getAllAsync(
                              "SELECT COALESCE(s.series_date,substr(m.created_at,1,10)) AS series_date,m.series_match_number,m.match_name,m.team_a,m.team_b,d.innings,d.sequence,d.batter,d.bowler,d.runs_bat,d.extras,d.extra_type,d.extra_runs,d.wicket,d.dismissal,d.dismissed_batter,d.dismissed_by,d.legal,d.created_at FROM deliveries d JOIN matches m ON m.id=d.match_id LEFT JOIN match_series s ON s.id=m.series_id ORDER BY series_date DESC,m.series_match_number,d.innings,d.sequence",
                            ),
                            E = await e.getAllAsync(
                              "SELECT COALESCE(s.series_date,substr(m.created_at,1,10)) AS series_date,m.series_match_number,m.match_name,CASE mp.team_side WHEN 'A' THEN m.team_a ELSE m.team_b END AS team,p.name,p.nickname,mp.is_captain,mp.is_wicketkeeper FROM match_players mp JOIN matches m ON m.id=mp.match_id JOIN players p ON p.id=mp.player_id LEFT JOIN match_series s ON s.id=m.series_id ORDER BY series_date DESC,m.series_match_number,mp.team_side,p.name COLLATE NOCASE",
                            ),
                            u = await e.getAllAsync(
                              "SELECT g.ground_name,'Custom or saved' AS ground_kind,(SELECT COUNT(*) FROM matches m WHERE lower(trim(m.ground))=lower(trim(g.ground_name))) AS matches FROM grounds g ORDER BY g.ground_name COLLATE NOCASE",
                            ),
                            _ = new Map();
                          for (const e of O)
                            _.set(e.toLocaleLowerCase(), {
                              name: e,
                              kind: "Preset",
                            });
                          for (const e of u) {
                            const t = String(e.ground_name ?? "").trim();
                            t &&
                              _.set(t.toLocaleLowerCase(), {
                                name: t,
                                kind: "Custom or saved",
                              });
                          }
                          const p = [..._.values()].map((e) => ({
                              ground_name: e.name,
                              ground_kind: e.kind,
                              matches: t.filter(
                                (t) =>
                                  String(t.ground ?? "")
                                    .trim()
                                    .toLocaleLowerCase() ===
                                  e.name.toLocaleLowerCase(),
                              ).length,
                            })),
                            h = [
                              N(
                                "Match Details",
                                [
                                  "Match ID",
                                  "Series Date",
                                  "Series ID",
                                  "Match Number",
                                  "Match Name",
                                  "Format",
                                  "Batting Mode",
                                  "Ground",
                                  "Overs",
                                  "Team A",
                                  "Captain A",
                                  "Team B",
                                  "Captain B",
                                  "Toss Winner",
                                  "Toss Decision",
                                  "Batting First",
                                  "Innings 1 Runs",
                                  "Innings 1 Wickets",
                                  "Innings 2 Runs",
                                  "Innings 2 Wickets",
                                  "Innings 3 Runs",
                                  "Innings 3 Wickets",
                                  "Innings 4 Runs",
                                  "Innings 4 Wickets",
                                  "Status",
                                  "Result",
                                  "Winner",
                                  "Created At",
                                  "Completed At",
                                ],
                                t,
                                [
                                  "id",
                                  "series_date",
                                  "series_id",
                                  "series_match_number",
                                  "match_name",
                                  "match_type",
                                  "batting_mode",
                                  "ground",
                                  "overs",
                                  "team_a",
                                  "captain_a",
                                  "team_b",
                                  "captain_b",
                                  "toss_winner",
                                  "toss_decision",
                                  "batting_first",
                                  "innings_1_runs",
                                  "innings_1_wickets",
                                  "innings_2_runs",
                                  "innings_2_wickets",
                                  "innings_3_runs",
                                  "innings_3_wickets",
                                  "innings_4_runs",
                                  "innings_4_wickets",
                                  "status",
                                  "result_type",
                                  "winner",
                                  "created_at",
                                  "completed_at",
                                ],
                              ),
                              N(
                                "Player Totals",
                                [
                                  "Player",
                                  "Nickname",
                                  "Type",
                                  "Active",
                                  "Matches",
                                  "Runs",
                                  "Balls Faced",
                                  "Fours",
                                  "Sixes",
                                  "Wickets",
                                  "Batting Style",
                                  "Bowling Style",
                                ],
                                n,
                                [
                                  "name",
                                  "nickname",
                                  "player_type",
                                  "is_active",
                                  "matches",
                                  "runs",
                                  "balls_faced",
                                  "fours",
                                  "sixes",
                                  "wickets",
                                  "batting_style",
                                  "bowling_style",
                                ],
                              ),
                              N(
                                "Batting Scorecards",
                                [
                                  "Series Date",
                                  "Match Number",
                                  "Match Name",
                                  "Team A",
                                  "Team B",
                                  "Innings",
                                  "Batter",
                                  "Runs",
                                  "Balls Faced",
                                  "Fours",
                                  "Sixes",
                                  "Dismissal",
                                ],
                                c,
                                [
                                  "series_date",
                                  "series_match_number",
                                  "match_name",
                                  "team_a",
                                  "team_b",
                                  "innings",
                                  "batter",
                                  "runs",
                                  "balls_faced",
                                  "fours",
                                  "sixes",
                                  "dismissal",
                                ],
                              ),
                              N(
                                "Bowling Figures",
                                [
                                  "Series Date",
                                  "Match Number",
                                  "Match Name",
                                  "Team A",
                                  "Team B",
                                  "Innings",
                                  "Bowler",
                                  "Legal Balls",
                                  "Runs Conceded",
                                  "Wickets",
                                ],
                                l,
                                [
                                  "series_date",
                                  "series_match_number",
                                  "match_name",
                                  "team_a",
                                  "team_b",
                                  "innings",
                                  "bowler",
                                  "legal_balls",
                                  "runs_conceded",
                                  "wickets",
                                ],
                              ),
                              N(
                                "Deliveries",
                                [
                                  "Series Date",
                                  "Match Number",
                                  "Match Name",
                                  "Team A",
                                  "Team B",
                                  "Innings",
                                  "Ball Sequence",
                                  "Batter",
                                  "Bowler",
                                  "Bat Runs",
                                  "Extras",
                                  "Extra Type",
                                  "Extra Runs",
                                  "Wicket",
                                  "Dismissal",
                                  "Dismissed Batter",
                                  "Fielder",
                                  "Legal Ball",
                                  "Recorded At",
                                ],
                                o,
                                [
                                  "series_date",
                                  "series_match_number",
                                  "match_name",
                                  "team_a",
                                  "team_b",
                                  "innings",
                                  "sequence",
                                  "batter",
                                  "bowler",
                                  "runs_bat",
                                  "extras",
                                  "extra_type",
                                  "extra_runs",
                                  "wicket",
                                  "dismissal",
                                  "dismissed_batter",
                                  "dismissed_by",
                                  "legal",
                                  "created_at",
                                ],
                              ),
                              N(
                                "Match Squads",
                                [
                                  "Series Date",
                                  "Match Number",
                                  "Match Name",
                                  "Team",
                                  "Player",
                                  "Nickname",
                                  "Captain",
                                  "Wicketkeeper",
                                ],
                                E,
                                [
                                  "series_date",
                                  "series_match_number",
                                  "match_name",
                                  "team",
                                  "name",
                                  "nickname",
                                  "is_captain",
                                  "is_wicketkeeper",
                                ],
                              ),
                              N(
                                "Series",
                                [
                                  "Series Date",
                                  "Format",
                                  "Status",
                                  "Matches",
                                  "Created At",
                                  "Completed At",
                                ],
                                s,
                                [
                                  "series_date",
                                  "match_type",
                                  "status",
                                  "matches",
                                  "created_at",
                                  "completed_at",
                                ],
                              ),
                              N("Grounds", ["Ground", "Type", "Matches"], p, [
                                "ground_name",
                                "ground_kind",
                                "matches",
                              ]),
                            ],
                            C = (0, S.createXlsxWorkbook)(h),
                            b = await L(
                              C,
                              `Baadhsah-Cricket-report-${f()}.xlsx`,
                              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                            );
                          H(
                            `${b} Workbook contains match details, series dates, squads, scorecards, player totals, bowling figures, and deliveries.`,
                          );
                        } catch (e) {
                          B(
                            e instanceof Error
                              ? e.message
                              : "Could not export the Excel report.",
                          );
                        } finally {
                          I(!1);
                        }
                      },
                      children: (0, C.jsx)(u.default, {
                        style: D.primaryText,
                        children: "EXPORT EXCEL WORKBOOK (.XLSX)",
                      }),
                    }),
                  ],
                }),
                (0, C.jsx)(u.default, {
                  style: D.footnote,
                  children:
                    "App updates keep this database when installed over the same app. Keep a backup outside the phone as well. Exported backup and Excel files are not encrypted, so store them privately.",
                }),
              ],
            })
          : (0, C.jsxs)(p.default, {
              style: D.card,
              children: [
                (0, C.jsx)(u.default, {
                  style: D.section,
                  children: "PASSWORD REQUIRED",
                }),
                (0, C.jsx)(u.default, {
                  style: D.hint,
                  children: "Enter your app password to open database tools.",
                }),
                (0, C.jsx)(_.default, {
                  style: D.input,
                  value: E,
                  onChangeText: w,
                  secureTextEntry: !0,
                  placeholder: "Password",
                  placeholderTextColor: b.muted,
                  onSubmitEditing: j,
                }),
                (0, C.jsx)(l.default, {
                  style: D.primary,
                  onPress: j,
                  children: (0, C.jsx)(u.default, {
                    style: D.primaryText,
                    children: "UNLOCK DATA TOOLS",
                  }),
                }),
              ],
            }),
        M ? (0, C.jsx)(u.default, { style: D.error, children: M }) : null,
        W ? (0, C.jsx)(u.default, { style: D.success, children: W }) : null,
        (0, C.jsx)(c.default, {
          visible: null !== v,
          transparent: !0,
          animationType: "fade",
          onRequestClose: () => U(null),
          children: (0, C.jsx)(p.default, {
            style: D.overlay,
            children: (0, C.jsxs)(p.default, {
              style: D.confirm,
              children: [
                (0, C.jsx)(u.default, {
                  style: D.section,
                  children: "REPLACE CURRENT DATA?",
                }),
                (0, C.jsxs)(u.default, {
                  style: D.hint,
                  children: [
                    "Restore ",
                    v?.name,
                    ". Current players, grounds, matches, series, scores, and rankings will be replaced by this backup. Export current data first if you may need to undo.",
                  ],
                }),
                (0, C.jsxs)(p.default, {
                  style: D.actions,
                  children: [
                    (0, C.jsx)(l.default, {
                      style: D.primary,
                      disabled: F,
                      onPress: async function () {
                        if (!v) return;
                        I(!0), B(""), H("");
                        let s = null;
                        try {
                          s = await (0, t.deserializeDatabaseAsync)(v.bytes);
                          const n = await s.getFirstAsync(
                            "PRAGMA integrity_check",
                          );
                          if ("ok" !== n?.integrity_check)
                            throw new Error("Backup integrity check failed.");
                          const c = await s.getAllAsync(
                              "SELECT name FROM sqlite_master WHERE type='table'",
                            ),
                            l = new Set(c.map((e) => e.name));
                          for (const e of [
                            "players",
                            "grounds",
                            "match_series",
                            "matches",
                            "deliveries",
                            "match_players",
                            "app_settings",
                          ])
                            if (!l.has(e))
                              throw new Error(
                                "Backup is missing required app data.",
                              );
                          await (0, t.backupDatabaseAsync)({
                            sourceDatabase: s,
                            destDatabase: e,
                          }),
                            await (0, h.initializeDatabase)(e),
                            U(null),
                            H(
                              "Backup restored. Your matches, series, players, and rankings are back.",
                            );
                        } catch (e) {
                          B(
                            e instanceof Error
                              ? e.message
                              : "Could not restore this backup.",
                          );
                        } finally {
                          s && (await s.closeAsync().catch(() => {})), I(!1);
                        }
                      },
                      children: (0, C.jsx)(u.default, {
                        style: D.primaryText,
                        children: F ? "RESTORING\u2026" : "RESTORE BACKUP",
                      }),
                    }),
                    (0, C.jsx)(l.default, {
                      style: D.secondary,
                      disabled: F,
                      onPress: async function () {
                        I(!0), B(""), H("");
                        try {
                          T(
                            k(await e.serializeAsync()),
                            `Baadhsah-Cricket-preimport-${f()}.bcbak`,
                            "application/octet-stream",
                          ),
                            H("Current data exported. You can still restore or cancel.");
                        } catch {
                          B("Could not export the current database first.");
                        } finally {
                          I(!1);
                        }
                      },
                      children: (0, C.jsx)(u.default, {
                        style: D.secondaryText,
                        children: "EXPORT CURRENT DATA FIRST",
                      }),
                    }),
                    (0, C.jsx)(l.default, {
                      style: D.secondary,
                      onPress: () => U(null),
                      children: (0, C.jsx)(u.default, {
                        style: D.secondaryText,
                        children: "CANCEL",
                      }),
                    }),
                  ],
                }),
              ],
            }),
          }),
        }),
      ],
    });
  }
  const D = E.default.create({
    page: { flex: 1, backgroundColor: b.bg },
    content: {
      padding: 22,
      paddingTop: 45,
      paddingBottom: 55,
      maxWidth: 760,
      width: "100%",
      alignSelf: "center",
    },
    back: {
      color: b.green,
      fontSize: 12,
      fontWeight: "800",
      letterSpacing: 1,
      marginBottom: 28,
    },
    kicker: {
      color: b.green,
      fontSize: 10,
      fontWeight: "800",
      letterSpacing: 3,
    },
    title: { color: b.white, fontSize: 32, fontWeight: "900", marginTop: 8 },
    hint: { color: b.muted, fontSize: 12, lineHeight: 19, marginTop: 8 },
    card: {
      backgroundColor: b.card,
      borderWidth: 1,
      borderColor: b.border,
      borderRadius: 14,
      padding: 17,
      marginTop: 19,
    },
    section: {
      color: b.green,
      fontSize: 11,
      fontWeight: "900",
      letterSpacing: 1.2,
    },
    input: {
      backgroundColor: b.bg,
      borderWidth: 1,
      borderColor: b.border,
      borderRadius: 10,
      padding: 14,
      color: b.white,
      marginTop: 15,
    },
    primary: {
      backgroundColor: b.green,
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 15,
    },
    primaryText: {
      color: b.bg,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 0.8,
    },
    secondary: {
      backgroundColor: b.card,
      borderWidth: 1,
      borderColor: b.border,
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 10,
    },
    secondaryText: {
      color: b.white,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 0.7,
    },
    footnote: { color: b.muted, fontSize: 10, lineHeight: 16, marginTop: 18 },
    error: { color: b.red, fontSize: 11, marginTop: 14 },
    success: { color: b.green, fontSize: 11, lineHeight: 17, marginTop: 14 },
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,.75)",
      justifyContent: "center",
      alignItems: "center",
      padding: 24,
    },
    confirm: {
      width: "100%",
      maxWidth: 420,
      backgroundColor: b.card,
      borderWidth: 1,
      borderColor: b.green,
      borderRadius: 16,
      padding: 20,
    },
    actions: { gap: 8, marginTop: 12 },
    cloudCard: { borderColor: b.green },
    cloudRow: { flexDirection: "row", gap: 8 },
    cloudSmall: { flex: 1 },
  });
},760,[772,774,771,12,238,104,245,133,28,188,255,109,773,792,6]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"Paths",{enumerable:!0,get:function(){return t.Paths}}),Object.defineProperty(e,"File",{enumerable:!0,get:function(){return n.File}}),Object.defineProperty(e,"Directory",{enumerable:!0,get:function(){return o.Directory}}),Object.defineProperty(e,"UploadTask",{enumerable:!0,get:function(){return u.UploadTask}}),Object.defineProperty(e,"DownloadTask",{enumerable:!0,get:function(){return u.DownloadTask}}),Object.defineProperty(e,"DEFAULT_DEBOUNCE_MS",{enumerable:!0,get:function(){return c.DEFAULT_DEBOUNCE_MS}}),Object.defineProperty(e,"FileMode",{enumerable:!0,get:function(){return c.FileMode}}),Object.defineProperty(e,"EncodingType",{enumerable:!0,get:function(){return c.EncodingType}}),Object.defineProperty(e,"UploadType",{enumerable:!0,get:function(){return c.UploadType}});var t=r(d[0]),n=r(d[1]),o=r(d[2]),u=r(d[3]),c=r(d[4]),f=r(d[5]);Object.keys(f).forEach(function(t){'default'===t||Object.prototype.hasOwnProperty.call(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:function(){return f[t]}})})},774,[775,778,776,780,786,791]);
__d(function(g,r,i,a,m,_e,d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"Paths",{enumerable:!0,get:function(){return o}});var e,t=r(d[0]),n=r(d[1]),c=(e=n)&&e.__esModule?e:{default:e},u=r(d[2]);class o extends u.PathUtilities{static get cache(){return new t.Directory(c.default.cacheDirectory)}static get bundle(){return new t.Directory(c.default.bundleDirectory)}static get document(){return new t.Directory(c.default.documentDirectory)}static get appleSharedContainers(){const e=c.default.appleSharedContainers??{},n={};for(const c in e)e[c]&&(n[c]=new t.Directory(e[c]));return n}static get totalDiskSpace(){return c.default.totalDiskSpace}static get availableDiskSpace(){return c.default.availableDiskSpace}static info(...e){return c.default.info(e.join('/'))}}},775,[776,777,783]);
__d(function(g,r,i,a,m,_e,d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"Directory",{enumerable:!0,get:function(){return o}});var e,t=r(d[0]),n=(e=t)&&e.__esModule?e:{default:e},s=r(d[1]),u=r(d[2]),c=r(d[3]);class o extends n.default.FileSystemDirectory{constructor(...e){super(u.Paths.join(...e)),this.validatePath()}get parentDirectory(){return new o(u.Paths.join(this.uri,'..'))}list(){return super.listAsRecords().map(({isDirectory:e,uri:t})=>e?new o(t):new s.File(t))}get name(){return u.Paths.basename(this.uri)}createFile(e,t){return new s.File(super.createFile(e,t).uri)}createDirectory(e){return new o(super.createDirectory(e).uri)}watch(e,t){return new c.FileSystemWatcher(this.uri,e,t,(e,t)=>t?new o(e):new s.File(e))}}o.pickDirectoryAsync=async function(e){const t=(await n.default.pickDirectoryAsync(e)).uri;return new o(t)}},776,[777,778,775,781]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o}});var o={FileSystemDirectory:class{constructor(){console.warn('expo-file-system is not supported on web')}},FileSystemFile:class{constructor(){console.warn('expo-file-system is not supported on web')}canPreview(o){return console.warn('expo-file-system is not supported on web'),Promise.resolve(!1)}preview(o){return console.warn('expo-file-system is not supported on web'),Promise.reject(new Error('File preview is not supported on web'))}},FileSystemUploadTask:class{start(){return console.warn('expo-file-system is not supported on web'),Promise.resolve({body:'',status:0,headers:{}})}addListener(){return console.warn('expo-file-system is not supported on web'),{remove:()=>{}}}release(){console.warn('expo-file-system is not supported on web')}cancel(){console.warn('expo-file-system is not supported on web')}},FileSystemDownloadTask:class{start(){return console.warn('expo-file-system is not supported on web'),Promise.resolve(null)}pause(){return console.warn('expo-file-system is not supported on web'),{resumeData:''}}resume(){return console.warn('expo-file-system is not supported on web'),Promise.resolve(null)}addListener(){return console.warn('expo-file-system is not supported on web'),{remove:()=>{}}}release(){console.warn('expo-file-system is not supported on web')}cancel(){console.warn('expo-file-system is not supported on web')}},downloadFileAsync:()=>(console.warn('expo-file-system is not supported on web'),Promise.resolve()),pickDirectoryAsync:()=>(console.warn('expo-file-system is not supported on web'),Promise.resolve()),pickFileAsync:()=>(console.warn('expo-file-system is not supported on web'),Promise.resolve()),get totalDiskSpace(){return console.warn('expo-file-system is not supported on web'),0},get availableDiskSpace(){return console.warn('expo-file-system is not supported on web'),0},get documentDirectory(){return console.warn('expo-file-system is not supported on web'),''},get cacheDirectory(){return console.warn('expo-file-system is not supported on web'),''},get bundleDirectory(){return console.warn('expo-file-system is not supported on web'),''}}},777,[]);
__d(function(g,r,i,a,m,_e,d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"File",{enumerable:!0,get:function(){return p}});var e=r(d[0]);r(d[1]);var t,n=r(d[2]),s=r(d[3]),o=(t=s)&&t.__esModule?t:{default:t},l=r(d[4]),u=r(d[5]),c=r(d[6]),w=r(d[7]),y=r(d[8]);class p extends o.default.FileSystemFile{static async canPreview(e,t){const n=v(e);return b(n,t),1===n.length&&n[0].canPreview(t)}static async preview(t,n){const s=v(t),o=n?.initialIndex??0;if(!Number.isInteger(o)||o<0||o>=s.length)throw new RangeError('initialIndex must be an integer within the preview collection.');if(b(s,n),1===s.length)return s[0].preview({title:n?.title,mimeType:n?.mimeType});throw new e.UnavailabilityError('expo-file-system','File.preview (multiple files)')}static async pickFileAsync(e,t){const{options:n,usingOldAPI:s}=h(e,t);try{if(n.multipleFiles){return{result:(await o.default.pickFileAsync(n)).map(e=>new p(e.uri)),canceled:!1}}const e=await o.default.pickFileAsync(n);return s?new p(e.uri):{result:new p(e.uri),canceled:!1}}catch(e){if(s)throw e;return{result:null,canceled:!0}}}constructor(...e){super(c.Paths.join(...e)),this.validatePath()}get parentDirectory(){return new n.Directory(c.Paths.dirname(this.uri))}get extension(){return c.Paths.extname(this.uri)}get name(){return c.Paths.basename(this.uri)}readableStream(){return new ReadableStream(new y.FileSystemReadableStreamSource(super.open(l.FileMode.ReadOnly)))}writableStream(){return new WritableStream(new y.FileSystemWritableSink(super.open(l.FileMode.WriteOnly)))}async arrayBuffer(){return(await this.bytes()).buffer}async json(){return JSON.parse(await this.text())}async formData(){return new Response(await this.arrayBuffer(),{headers:this.type?{'Content-Type':this.type}:void 0}).formData()}stream(){return this.readableStream()}slice(e,t,n){return new Blob([this.bytesSync().slice(e,t)],{type:n})}canPreview(e){return super.canPreview(e??{})}preview(e){return super.preview(e??{})}upload(e,t){return new u.UploadTask(this,e,t).uploadAsync()}createUploadTask(e,t){return new u.UploadTask(this,e,t)}static createDownloadTask(e,t,n){return new u.DownloadTask(e,t,n)}watch(e,t){return new w.FileSystemWatcher(this.uri,e,t,e=>new p(e))}}function f(e){const t=new Error('string'==typeof e?e:'The operation was aborted.');return t.name='AbortError',t}function h(e,t){return'object'==typeof e?{options:e,usingOldAPI:!1}:{options:{initialUri:e,mimeTypes:t,multipleFiles:!1},usingOldAPI:void 0!==t||'string'==typeof e}}function v(e){const t=Array.isArray(e)?[...e]:[e];if(0===t.length)throw new RangeError('At least one file is required for a preview.');for(const e of t)if(!(e instanceof o.default.FileSystemFile))throw new TypeError('Preview input must contain File instances.');return t}function b(e,t){if(e.length>1&&(void 0!==t?.title||void 0!==t?.mimeType))throw new TypeError('title and mimeType are only supported for single-file previews.')}p.downloadFileAsync=async function(t,n,s){const l=s?.onProgress||s?.signal?e.uuid.v4():void 0;let u,c,w;try{if(s?.signal?.aborted)throw f(s.signal.reason);l&&s?.onProgress&&(u=o.default.addListener('downloadProgress',e=>{e.uuid===l&&(w=e.data,s.onProgress(w))})),l&&s?.signal&&(c=()=>{o.default.cancelDownloadAsync(l)},s.signal.addEventListener('abort',c,{once:!0}));const e=await o.default.downloadFileAsync(t,n,s,l),y=new p(e),h=y.size??0;return s?.onProgress&&h>0&&(w?.bytesWritten!==h||w?.totalBytes!==h)&&s.onProgress({bytesWritten:h,totalBytes:h}),y}catch(e){if(s?.signal?.aborted)throw f(s.signal.reason);throw e}finally{u?.remove(),c&&s?.signal&&s.signal.removeEventListener('abort',c)}}},778,[283,104,776,777,779,780,775,781,782]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"EncodingType",{enumerable:!0,get:function(){return n}}),Object.defineProperty(e,"FileMode",{enumerable:!0,get:function(){return t}});var n=(function(n){return n.UTF8="utf8",n.Base64="base64",n})({}),t=(function(n){return n.ReadWrite="rw",n.ReadOnly="r",n.WriteOnly="w",n.Append="wa",n.Truncate="wt",n})({})},779,[]);
__d(function(g,r,i,a,m,_e,d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"UploadTask",{enumerable:!0,get:function(){return p}}),Object.defineProperty(_e,"DownloadTask",{enumerable:!0,get:function(){return v}}),r(d[0]);var t,s=r(d[1]),e=r(d[2]),o=(t=e)&&t.__esModule?t:{default:t},n=r(d[3]);function h(t){const s=new Error(t??'The operation was aborted.');return s.name='AbortError',s}function l(t,s,e){if(!s.includes(t))throw new Error(`Cannot call ${e}() in state "${t}"`)}function _(t,s){if(t?.aborted)throw h();if(t){const e=()=>s();return t.addEventListener('abort',e,{once:!0}),e}}function c(t,s){if(t)return s(t)}function u(t,s,e){s?.remove(),e&&t&&t.removeEventListener('abort',e)}class p{_state='idle';constructor(t,s,e){this._nativeTask=new o.default.FileSystemUploadTask,this._file=t,this._url=s,this._options=e}get state(){return this._state}async uploadAsync(){l(this._state,['idle'],'uploadAsync'),this._state='active';try{this._abortHandler=_(this._options?.signal,()=>this.cancel()),this._subscription=c(this._options?.onProgress,t=>this.addListener('progress',t));const t={httpMethod:this._options?.httpMethod||'POST',uploadType:this._options?.uploadType??0,headers:this._options?.headers,fieldName:this._options?.fieldName,mimeType:this._options?.mimeType,parameters:this._options?.parameters,sessionType:this._options?.sessionType},s=await this._nativeTask.start(this._url,this._file,t);if(this._state='completed',this._options?.onProgress&&this._file.exists){const t=this._file.size??0;t>0&&this._options.onProgress({bytesSent:t,totalBytes:t})}return s}catch(t){if(this._options?.signal?.aborted)throw this._state='cancelled',h();if('cancelled'===this.state)throw t;throw this._state='error',t}finally{u(this._options?.signal,this._subscription,this._abortHandler),this._subscription=void 0,this._abortHandler=void 0}}addListener(t,s){return this._nativeTask.addListener(t,s)}release(){this._nativeTask.release()}cancel(){['completed','cancelled','error'].includes(this._state)||(this._state='cancelled',this._nativeTask.cancel(),u(this._options?.signal,this._subscription,this._abortHandler),this._subscription=void 0,this._abortHandler=void 0)}}class v{_state='idle';constructor(t,s,e){this._nativeTask=new o.default.FileSystemDownloadTask,this._url=t,this._destination=s,this._options=e}get state(){return this._state}async acknowledgeBackgroundCompletionAsync(){}async downloadAsync(){l(this._state,['idle'],'downloadAsync'),this._state='active',this._pauseRequest=void 0;const t=this._runDownloadOperation(()=>this._nativeTask.start(this._url,this._destination,{headers:this._options?.headers,sessionType:this._options?.sessionType,deferBackgroundSessionCompletion:this._options?.deferBackgroundSessionCompletion}));return this._inFlightOperation=t,t}pause(){l(this._state,['active'],'pause'),this._pauseRequest=Promise.resolve(this._nativeTask.pause()).then(t=>{this._resumeData=t?.resumeData??void 0})}async pauseAsync(){this.pause(),await this._pauseRequest,await this._inFlightOperation}async resumeAsync(){if(l(this._state,['paused'],'resumeAsync'),!this._resumeData)throw new Error('No resume data available. Was the download paused before any data was received?');this._state='active',this._pauseRequest=void 0;const t=this._runDownloadOperation(()=>this._nativeTask.resume(this._url,this._destination,this._resumeData,{headers:this._options?.headers,sessionType:this._options?.sessionType,deferBackgroundSessionCompletion:this._options?.deferBackgroundSessionCompletion}));return this._inFlightOperation=t,t}addListener(t,s){return this._nativeTask.addListener(t,s)}release(){this._nativeTask.release()}cancel(){['completed','cancelled','error'].includes(this._state)||(this._state='cancelled',this._pauseRequest=void 0,this._nativeTask.cancel(),u(this._options?.signal,this._subscription,this._abortHandler),this._subscription=void 0,this._abortHandler=void 0)}savable(){return l(this._state,['paused'],'savable'),{url:this._url,fileUri:this._destination.uri,isDirectory:this._destination instanceof s.Directory,headers:this._options?.headers,resumeData:this._resumeData}}static fromSavable(t,e){if(!t.resumeData)throw new Error('Cannot restore task: DownloadPauseState has no resumeData');const o=t.isDirectory?new s.Directory(t.fileUri):new n.File(t.fileUri),h=e||t.headers?{...e,headers:{...t.headers,...e?.headers}}:void 0,l=new v(t.url,o,h);return l._resumeData=t.resumeData,l._state='paused',l}async _runDownloadOperation(t){try{this._abortHandler=_(this._options?.signal,()=>this.cancel()),this._subscription=c(this._options?.onProgress,t=>this.addListener('progress',t));const s=await t();if(s){this._state='completed',this._resumeData=void 0;const t=new n.File(s);return this._emitFinalProgressEvent(t.size),t}return await this._pauseRequest,this._state='paused',null}catch(t){if(this._options?.signal?.aborted)throw this._state='cancelled',h();if('cancelled'===this.state)throw t;throw this._state='error',t}finally{u(this._options?.signal,this._subscription,this._abortHandler),this._subscription=void 0,this._abortHandler=void 0,this._inFlightOperation=void 0}}_emitFinalProgressEvent(t){this._options?.onProgress&&t>0&&this._options.onProgress({bytesWritten:t,totalBytes:t})}}},780,[104,776,777,778]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"FileSystemWatcher",{enumerable:!0,get:function(){return t}});class t{constructor(t,n,o={},c){console.warn('FileSystemWatcher is not supported on web')}remove(){}}},781,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"FileSystemReadableStreamSource",{enumerable:!0,get:function(){return t}}),Object.defineProperty(e,"FileSystemWritableSink",{enumerable:!0,get:function(){return s}});class t{size=1024;type='bytes';constructor(t){this.handle=t}cancel(){this.handle.close()}async pull(t){const s=t.byobRequest?.view;if(!s){const s=await this.handle.readBytes(this.size);return 0===s.length?void t.close():void t.enqueue(s)}const n=await this.handle.readBytes(s.byteLength);if(0===n.length)return t.close(),void t.byobRequest.respond(0);new Uint8Array(s.buffer,s.byteOffset,s.byteLength).set(n),t.byobRequest.respond(n.length)}}class s{constructor(t){this.handle=t}abort(){this.close()}close(){this.handle.close()}async write(t){await this.handle.writeBytes(t)}}},782,[]);
__d(function(g,r,i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"PathUtilities",{enumerable:!0,get:function(){return o}});var e=(function(e){if(e&&e.__esModule)return e;var t={};return e&&Object.keys(e).forEach(function(n){if('default'!==n){var o=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,o.get?o:{enumerable:!0,get:function(){return e[n]}})}}),t.default=e,t})(r(_d[0])),t=r(_d[1]);function n(e){return'string'==typeof e?e:e.uri}class o{static join(...o){const[s="",...c]=o.map(n),u=(0,t.asUrl)(s);return u?(u.pathname=e.join(u.pathname,...c.map(t.encodeURLChars)),u.toString()):e.join(s,...c.map(t.encodeURLChars))}static relative(o,s){const c=n(o),u=n(s);return(0,t.isUrl)(c)&&(o=(0,t.asUrl)(c).pathname),(0,t.isUrl)(u)&&(s=(0,t.asUrl)(u).pathname),e.relative(c,u)}static isAbsolute(o){const s=n(o);return!!(0,t.isUrl)(s)||e.isAbsolute(s)}static normalize(o){const s=n(o),c=(0,t.asUrl)((0,t.encodeURLChars)(s));return c?(c.pathname=(0,t.encodeURLChars)(e.normalize(decodeURIComponent(c.pathname))),c.toString()):e.normalize(s)}static dirname(o){const s=n(o),c=(0,t.asUrl)(s);return c?(c.pathname=(0,t.encodeURLChars)(e.dirname(decodeURIComponent(c.pathname))),c.toString()):e.dirname(s)}static basename(o,s){const c=n(o),u=(0,t.asUrl)(c);return u?e.basename(decodeURIComponent(u.pathname)):e.basename(c,s)}static extname(o){const s=n(o),c=(0,t.asUrl)(s);return c?e.extname(decodeURIComponent(c.pathname)):e.extname(s)}static parse(o){const s=n(o),c=(0,t.asUrl)(s);return c?e.parse(decodeURIComponent(c.pathname)):e.parse(s)}}},783,[784,785]);
__d(function(g,r,_i,a,m,e,d){"use strict";function t(t){return'/'===t}function n(n,l,i){let c='',f=0,o=-1,h=0,s='';for(let u=0;u<=n.length;++u){if(u<n.length)s=n.charAt(u);else{if(t(s))break;s='/'}if(t(s)){if(o===u-1||1===h);else if(2===h){if(c.length<2||2!==f||'.'!==c.charAt(c.length-1)||'.'!==c.charAt(c.length-2)){if(c.length>2){const t=c.lastIndexOf(i);-1===t?(c='',f=0):(c=c.slice(0,t),f=c.length-1-c.lastIndexOf(i)),o=u,h=0;continue}if(0!==c.length){c='',f=0,o=u,h=0;continue}}l&&(c+=c.length>0?`${i}..`:'..',f=2)}else c.length>0?c+=`${i}${n.slice(o+1,u)}`:c=n.slice(o+1,u),f=u-o-1;o=u,h=0}else'.'===s&&-1!==h?++h:h=-1}return c}function l(...t){let l='',i=!1;for(let n=t.length-1;n>=-1&&!i;n--){const c=n>=0?t[n]:'';c&&0!==c.length&&(l=`${c}/${l}`,i=!(!c||'/'!==c.charAt(0)))}return l=n(l,!i,'/'),i?`/${l}`:l.length>0?l:'.'}function i(t){if(0===t.length)return'.';const l='/'===t.charAt(0),i='/'===t.charAt(t.length-1);return 0===(t=n(t,!l,'/')).length?l?'/':i?'./':'.':(i&&(t+='/'),l?`/${t}`:t)}Object.defineProperty(e,'__esModule',{value:!0}),e.format=function(t,n){const l=n.dir||n.root,i=n.base||`${n.name||''}${c=n.ext,c?`${'.'===c[0]?'':'.'}${c}`:''}`;var c;if(!l)return i;return l===n.root?`${l}${i}`:`${l}${t}${i}`},e.resolve=l,e.normalize=i,e.isAbsolute=function(t){return t.length>0&&'/'===t.charAt(0)},e.join=function(...t){if(0===t.length)return'.';const n=[];for(let l=0;l<t.length;++l){const i=t[l];i&&i.length>0&&n.push(i)}return 0===n.length?'.':i(n.join('/'))},e.relative=function(t,n){if(t===n)return'';if(t=l(t),n=l(n),t===n)return'';const i=t.length,c=i-1,f=n.length-1,o=c<f?c:f;let h=-1,s=0;for(;s<o;s++){const l=t.charAt(1+s);if(l!==n.charAt(1+s))break;'/'===l&&(h=s)}if(s===o)if(f>o){if('/'===n.charAt(1+s))return n.slice(1+s+1);if(0===s)return n.slice(1+s)}else c>o&&('/'===t.charAt(1+s)?h=s:0===s&&(h=0));let u='';for(s=1+h+1;s<=i;++s)s!==i&&'/'!==t.charAt(s)||(u+=0===u.length?'..':'/..');return`${u}${n.slice(1+h)}`},e.toNamespacedPath=function(t){return t},e.dirname=function(t){if(0===t.length)return'.';const n='/'===t.charAt(0);let l=-1,i=!0;for(let n=t.length-1;n>=1;--n)if('/'===t.charAt(n)){if(!i){l=n;break}}else i=!1;return-1===l?n?'/':'.':n&&1===l?'//':t.slice(0,l)},e.basename=function(t,n){let l=0,i=-1,c=!0;if(void 0!==n&&n.length>0&&n.length<=t.length){if(n===t)return'';let f=n.length-1,o=-1;for(let h=t.length-1;h>=0;--h){const s=t.charAt(h);if('/'===s){if(!c){l=h+1;break}}else-1===o&&(c=!1,o=h+1),f>=0&&(s===n.charAt(f)?-1===--f&&(i=h):(f=-1,i=o))}return l===i?i=o:-1===i&&(i=t.length),t.slice(l,i)}for(let n=t.length-1;n>=0;--n)if('/'===t.charAt(n)){if(!c){l=n+1;break}}else-1===i&&(c=!1,i=n+1);return-1===i?'':t.slice(l,i)},e.extname=function(t){let n=-1,l=0,i=-1,c=!0,f=0;for(let o=t.length-1;o>=0;--o){const h=t.charAt(o);if('/'!==h)-1===i&&(c=!1,i=o+1),'.'===h?-1===n?n=o:1!==f&&(f=1):-1!==n&&(f=-1);else if(!c){l=o+1;break}}if(-1===n||-1===i||0===f||1===f&&n===i-1&&n===l+1)return'';return t.slice(n,i)},e.parse=function(t){const n={root:'',dir:'',base:'',ext:'',name:''};if(0===t.length)return n;const l='/'===t.charAt(0);let i;l?(n.root='/',i=1):i=0;let c=-1,f=0,o=-1,h=!0,s=t.length-1,u=0;for(;s>=i;--s){const n=t.charAt(s);if('/'!==n)-1===o&&(h=!1,o=s+1),'.'===n?-1===c?c=s:1!==u&&(u=1):-1!==c&&(u=-1);else if(!h){f=s+1;break}}if(-1!==o){const i=0===f&&l?1:f;-1===c||0===u||1===u&&c===o-1&&c===f+1?n.base=n.name=t.slice(i,o):(n.name=t.slice(i,c),n.base=t.slice(i,o),n.ext=t.slice(c,o))}f>0?n.dir=t.slice(0,f-1):l&&(n.dir='/');return n},Object.defineProperty(e,"sep",{enumerable:!0,get:function(){return c}}),Object.defineProperty(e,"delimiter",{enumerable:!0,get:function(){return f}});const c='/',f=':'},784,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),e.encodeURLChars=function(t){let c=(0,n.resolve)(t);'/'===t.charAt(t.length-1)&&c[c.length-1]!==n.sep&&(c+='/');c=O(c),-1!==c.indexOf('?')&&(c=c.replace(o,'%3F'));-1!==c.indexOf('#')&&(c=c.replace(s,'%23'));return c},e.isUrl=function(n){try{return!!new URL(n)}catch(n){return!1}},e.asUrl=function(n){try{const t=new URL(n);return t.hash='',t}catch(n){return null}};var n=r(d[0]);const t=/%/g,c=/\\/g,l=/\n/g,u=/\r/g,f=/\t/g,o=/\?/g,s=/#/g,p=/ /g;function O(n){return-1!==n.indexOf('%')&&(n=n.replace(t,'%25')),-1!==n.indexOf('\\')&&(n=n.replace(c,'%5C')),-1!==n.indexOf('\n')&&(n=n.replace(l,'%0A')),-1!==n.indexOf('\r')&&(n=n.replace(u,'%0D')),-1!==n.indexOf('\t')&&(n=n.replace(f,'%09')),-1!==n.indexOf(' ')&&(n=n.replace(p,'%20')),n}},785,[784]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})});var n=r(d[1]);Object.keys(n).forEach(function(t){'default'===t||Object.prototype.hasOwnProperty.call(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:function(){return n[t]}})});var c=r(d[2]);Object.keys(c).forEach(function(t){'default'===t||Object.prototype.hasOwnProperty.call(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:function(){return c[t]}})});var o=r(d[3]);Object.keys(o).forEach(function(t){'default'===t||Object.prototype.hasOwnProperty.call(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:function(){return o[t]}})});var u=r(d[4]);Object.keys(u).forEach(function(t){'default'===t||Object.prototype.hasOwnProperty.call(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:function(){return u[t]}})})},786,[787,779,788,789,790]);
__d(function(g,r,i,a,m,e,d){},787,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"DEFAULT_DEBOUNCE_MS",{enumerable:!0,get:function(){return t}});const t=100},788,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"UploadType",{enumerable:!0,get:function(){return t}});var t=(function(t){return t[t.BINARY_CONTENT=0]="BINARY_CONTENT",t[t.MULTIPART=1]="MULTIPART",t})({})},789,[]);
__d(function(g,r,i,a,m,e,d){},790,[]);
__d(function(g,r,i,a,m,e,d){"use strict";function n(n){const t=`Method ${n} imported from "expo-file-system" is deprecated.\nYou can migrate to the new filesystem API using "File" and "Directory" classes or import the legacy API from "expo-file-system/legacy".\nAPI reference and examples are available in the filesystem docs: https://docs.expo.dev/versions/v54.0.0/sdk/filesystem/`;return console.warn(t),new Error(t)}Object.defineProperty(e,'__esModule',{value:!0}),e.getInfoAsync=async function(t,c={}){throw n('getInfoAsync')},e.readAsStringAsync=async function(t,c={}){throw n('readAsStringAsync')},e.getContentUriAsync=async function(t){throw n('getContentUriAsync')},e.writeAsStringAsync=async function(t,c,o={}){throw n('writeAsStringAsync')},e.deleteAsync=async function(t,c={}){throw n('deleteAsync')},e.deleteLegacyDocumentDirectoryAndroid=async function(){throw n('deleteLegacyDocumentDirectoryAndroid')},e.moveAsync=async function(t){throw n('moveAsync')},e.copyAsync=async function(t){throw n('copyAsync')},e.makeDirectoryAsync=async function(t,c={}){throw n('makeDirectoryAsync')},e.readDirectoryAsync=async function(t){throw n('readDirectoryAsync')},e.getFreeDiskStorageAsync=async function(){throw n('getFreeDiskStorageAsync')},e.getTotalDiskCapacityAsync=async function(){throw n('getTotalDiskCapacityAsync')},e.downloadAsync=async function(t,c,o={}){throw n('downloadAsync')},e.uploadAsync=async function(t,c,o={}){throw n('uploadAsync')},e.createDownloadResumable=function(t,c,o,s,y){throw n('createDownloadResumable')},e.createUploadTask=function(t,c,o,s){throw n('createUploadTask')}},791,[]);
__d(function(g,r,_i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),e.createXlsxWorkbook=function(t){const o=t.map((t,n)=>({...t,name:t.name.replace(/[\\/?*:[\]]/g," ").slice(0,31)||`Sheet${n+1}`})),l=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>${o.map((t,n)=>`<Override PartName="/xl/worksheets/sheet${n+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join("")}</Types>`,i=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${o.map((t,o)=>`<sheet name="${n(t.name)}" sheetId="${o+1}" r:id="rId${o+1}"/>`).join("")}</sheets></workbook>`,c=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${o.map((t,n)=>`<Relationship Id="rId${n+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${n+1}.xml"/>`).join("")}</Relationships>`;return h([{name:"[Content_Types].xml",content:l},{name:"_rels/.rels",content:"<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Relationships xmlns=\"http://schemas.openxmlformats.org/package/2006/relationships\"><Relationship Id=\"rId1\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument\" Target=\"xl/workbook.xml\"/></Relationships>"},{name:"xl/workbook.xml",content:i},{name:"xl/_rels/workbook.xml.rels",content:c},...o.map((t,n)=>({name:`xl/worksheets/sheet${n+1}.xml`,content:s(t.rows)}))])};const t=new TextEncoder,n=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");function o(t){let n=t+1,o="";for(;n>0;){const t=(n-1)%26;o=String.fromCharCode(65+t)+o,n=Math.floor((n-1)/26)}return o}function s(t){return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${t.map((t,s)=>{const l=t.map((t,l)=>{if(null==t||""===t)return"";const i=`${o(l)}${s+1}`;return"number"==typeof t&&Number.isFinite(t)?`<c r="${i}"><v>${t}</v></c>`:"boolean"==typeof t?`<c r="${i}" t="b"><v>${t?1:0}</v></c>`:`<c r="${i}" t="inlineStr"><is><t xml:space="preserve">${n(String(t))}</t></is></c>`}).join("");return`<row r="${s+1}">${l}</row>`}).join("")}</sheetData></worksheet>`}const l=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let o=n;for(let t=0;t<8;t++)o=1&o?3988292384^o>>>1:o>>>1;t[n]=o>>>0}return t})();function i(t){let n=4294967295;for(const o of t)n=l[255&(n^o)]^n>>>8;return(4294967295^n)>>>0}function c(t,n,o){t.setUint16(n,o,!0)}function p(t,n,o){t.setUint32(n,o>>>0,!0)}function h(n){const o=n.map(n=>({name:t.encode(n.name),data:t.encode(n.content)})),s=o.reduce((t,n)=>t+30+n.name.length+n.data.length,0),l=o.reduce((t,n)=>t+46+n.name.length,0);if(s+l+22>4294967295)throw new Error("The workbook is too large to export.");const h=new Uint8Array(s+l+22),f=new DataView(h.buffer);let x=0,u=s;for(const t of o){const n=i(t.data),o=x;p(f,x,67324752),c(f,x+4,20),c(f,x+6,0),c(f,x+8,0),c(f,x+10,0),c(f,x+12,0),p(f,x+14,n),p(f,x+18,t.data.length),p(f,x+22,t.data.length),c(f,x+26,t.name.length),c(f,x+28,0),h.set(t.name,x+30),h.set(t.data,x+30+t.name.length),x+=30+t.name.length+t.data.length,p(f,u,33639248),c(f,u+4,20),c(f,u+6,20),c(f,u+8,0),c(f,u+10,0),c(f,u+12,0),c(f,u+14,0),p(f,u+16,n),p(f,u+20,t.data.length),p(f,u+24,t.data.length),c(f,u+28,t.name.length),c(f,u+30,0),c(f,u+32,0),c(f,u+34,0),c(f,u+36,0),p(f,u+38,0),p(f,u+42,o),h.set(t.name,u+46),u+=46+t.name.length}return p(f,u,101010256),c(f,u+4,0),c(f,u+6,0),c(f,u+8,o.length),c(f,u+10,o.length),p(f,u+12,l),p(f,u+16,s),c(f,u+20,0),h}},792,[]);