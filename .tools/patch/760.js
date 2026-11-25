// module 760 from data-backups-2e1f7f2a56edda50681a80fa8ea875bc.js deps=[772,774,771,12,238,104,245,133,28,188,255,109,773,792,6]
(function (g, r, i, a, m, _e, d) {
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
});
