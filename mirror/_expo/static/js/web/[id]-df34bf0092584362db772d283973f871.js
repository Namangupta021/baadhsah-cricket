__d(function (g, r, i, a, m, _e, d) {
  "use strict";
  function e(e) {
    return e && e.__esModule ? e : { default: e };
  }
  Object.defineProperty(_e, "__esModule", { value: !0 }),
    Object.defineProperty(_e, "default", {
      enumerable: !0,
      get: function () {
        return j;
      },
    });
  var t = r(d[0]),
    l = r(d[1]),
    s = r(d[2]),
    n = e(r(d[3])),
    o = e(r(d[4])),
    c = e(r(d[5])),
    u = e(r(d[6])),
    f = e(r(d[7])),
    h = e(r(d[8])),
    x = r(d[9]),
    b = r(d[10]),
    y = r(d[11]);
  const p = {
      bg: "#080D0B",
      card: "#111A15",
      green: "#B7F34A",
      white: "#F5F7F2",
      muted: "#89948B",
      border: "#26332A",
    },
    _ = new Set([
      "run out",
      "retired hurt",
      "obstructing the field",
      "timed out",
    ]);
  const INNINGS_LABEL = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"];
  function dismissalText(d) {
    const by = d.dismissed_by;
    switch (d.dismissal) {
      case "Caught":
        return by === d.bowler ? `c & b ${d.bowler}` : `c ${by ?? "?"} b ${d.bowler}`;
      case "Run out":
        return by ? `run out (${by})` : "run out";
      case "Stumped":
        return `st ${by ?? "?"} b ${d.bowler}`;
      case "Bowled":
        return `b ${d.bowler}`;
      case "LBW":
        return `lbw b ${d.bowler}`;
      default:
        return `${d.dismissal}${by ? ` \xb7 ${by}` : ""}`;
    }
  }
  function fieldingFor(deliveries, innings) {
    const byFielder = new Map();
    let legal = 0;
    for (const d of deliveries) {
      const legalBefore = legal;
      legal += Number(d.legal);
      if (1 !== d.wicket || !d.dismissed_by) continue;
      const kind = { Caught: "catches", "Run out": "runOuts", Stumped: "stumpings" }[d.dismissal];
      if (!kind) continue;
      const f = byFielder.get(d.dismissed_by) ?? {
        name: d.dismissed_by,
        catches: 0,
        runOuts: 0,
        stumpings: 0,
        details: [],
      };
      f[kind]++;
      f.details.push({
        kind,
        batter: d.dismissed_batter ?? d.batter,
        bowler: d.bowler,
        innings,
        over: `${Math.floor(legalBefore / 6)}.${(legalBefore % 6) + (Number(d.legal) ? 1 : 0)}`,
      });
      byFielder.set(d.dismissed_by, f);
    }
    return sortFielders([...byFielder.values()]);
  }
  function sortFielders(list) {
    const total = (f) => f.catches + f.runOuts + f.stumpings;
    return list.sort((a, b) => total(b) - total(a) || b.catches - a.catches || a.name.localeCompare(b.name));
  }
  function mergeFielding(innings) {
    const all = new Map();
    for (const inn of innings)
      for (const f of inn.fielding) {
        const m = all.get(f.name) ?? { name: f.name, catches: 0, runOuts: 0, stumpings: 0, details: [] };
        (m.catches += f.catches), (m.runOuts += f.runOuts), (m.stumpings += f.stumpings), m.details.push(...f.details);
        all.set(f.name, m);
      }
    return sortFielders([...all.values()]);
  }
  const DETAIL_LABEL = { catches: "Caught", runOuts: "Run out", stumpings: "Stumped" };
  function fieldingRows(list, S, withInnings) {
    return list.map((e) =>
      (0, y.jsxs)(
        h.default,
        {
          style: S.battingRow,
          children: [
            (0, y.jsxs)(h.default, {
              style: S.nameCol,
              children: [
                (0, y.jsx)(f.default, { style: S.player, children: e.name }),
                ...e.details.map((d, k) =>
                  (0, y.jsx)(
                    f.default,
                    {
                      style: S.dismissal,
                      children: `${DETAIL_LABEL[d.kind]} ${d.batter}${"runOuts" === d.kind ? "" : ` (b ${d.bowler})`}${withInnings ? ` \xb7 ${INNINGS_LABEL[d.innings - 1]} inns` : ""} \xb7 over ${d.over}`,
                    },
                    k,
                  ),
                ),
              ],
            }),
            (0, y.jsx)(f.default, { style: S.cellStrong, children: e.catches }),
            (0, y.jsx)(f.default, { style: S.cellStrong, children: e.runOuts }),
            (0, y.jsx)(f.default, { style: S.cell, children: e.stumpings }),
            (0, y.jsx)(f.default, { style: S.cell, children: e.catches + e.runOuts + e.stumpings }),
          ],
        },
        e.name,
      ),
    );
  }
  function fieldingHead(S) {
    return (0, y.jsxs)(h.default, {
      style: S.tableHead,
      children: [
        (0, y.jsx)(f.default, { style: [S.th, S.nameCol], children: "FIELDER / DISMISSALS" }),
        (0, y.jsx)(f.default, { style: S.th, children: "CT" }),
        (0, y.jsx)(f.default, { style: S.th, children: "RO" }),
        (0, y.jsx)(f.default, { style: S.th, children: "ST" }),
        (0, y.jsx)(f.default, { style: S.th, children: "TOT" }),
      ],
    });
  }
  function inningsInsights(deliveries) {
    const overRuns = [], fow = [];
    let legal = 0, total = 0, wickets = 0, stand = 0, bestStand = 0;
    for (const d of deliveries) {
      const over = Math.floor(legal / 6), runs = d.runs_bat + d.extras;
      if (over === overRuns.length) overRuns.push(0);
      overRuns[over] += runs;
      total += runs;
      stand += runs;
      if (d.wicket) {
        wickets += 1;
        bestStand = Math.max(bestStand, stand);
        stand = 0;
        fow.push({ score: total, wicket: wickets, batter: d.dismissed_batter ?? d.batter, over: `${over}.${(legal % 6) + (Number(d.legal) ? 1 : 0)}` });
      }
      legal += Number(d.legal);
    }
    return { overRuns, fow, bestStand: Math.max(bestStand, stand), bestOver: Math.max(0, ...overRuns) };
  }
  function playerOfMatch(innings, players, match) {
    const teamSize = (side) => Math.max(1, players.filter((player) => player.team_side === side || player.is_common).length),
      averageSize = Math.max(1, (teamSize("A") + teamSize("B")) / 2),
      sideOf = (name) => players.find((player) => player.name === name)?.team_side,
      sizeWeight = (name) => Math.sqrt(averageSize / teamSize(sideOf(name))),
      winningSide = match?.winner_side,
      points = new Map(),
      add = (name, value, runs = 0) => {
        if (!name) return;
        const item = points.get(name) || { name, points: 0, runs: 0 };
        (item.points += value), (item.runs += runs), points.set(name, item);
      };
    for (const inn of innings) {
      const inningsRate = (6 * inn.runs) / Math.max(1, inn.legalBalls),
        chaseWeight = inn.number > 1 ? 1.12 : 1;
      for (const batter of inn.batters) {
        const parRate = Math.max(1, inningsRate * 16.6667),
          paceWeight = Math.max(0.8, Math.min(1.45, batter.strikeRate / parRate));
        add(batter.name, (batter.runs * paceWeight + batter.fours + 2 * batter.sixes) * chaseWeight * sizeWeight(batter.name), batter.runs);
      }
      for (const bowler of inn.bowlers)
        add(bowler.name, (20 * bowler.wickets + bowler.dotBalls + 5 * bowler.maidens + 3 * Math.max(0, inningsRate - bowler.economy)) * sizeWeight(bowler.name));
      for (const fielder of inn.fielding)
        add(fielder.name, 10 * (fielder.catches + fielder.runOuts + fielder.stumpings) * sizeWeight(fielder.name));
    }
    const winners = new Set(players.filter((player) => player.team_side === winningSide || player.is_common).map((player) => player.name)),
      candidates = [...points.values()],
      hasWinner = winningSide && candidates.some((player) => winners.has(player.name) && player.points > 0);
    return candidates
      .map((player) => ({ ...player, score: player.points * (winners.has(player.name) ? 1.25 : 1) }))
      .sort((a, b) => b.score - a.score || b.runs - a.runs || a.name.localeCompare(b.name))
      .find((player) => !hasWinner || winners.has(player.name));
  }
  function summaryText(match, result, innings, mvp) {
    const lines = [`${match.match_name} · ${match.team_a} vs ${match.team_b}`, result || "Match completed"];
    for (const inn of innings) {
      const top = inn.batters.filter((batter) => batter.runs > 0).sort((a, b) => b.runs - a.runs).slice(0, 3).map((batter) => `${batter.name} ${batter.runs}${"not out" === batter.dismissal ? "*" : ""}`).join(", "),
        bowler = [...inn.bowlers].sort((a, b) => b.wickets - a.wickets || a.runs - b.runs)[0];
      lines.push(`${inn.team}: ${inn.runs}/${inn.wickets} (${(0, x.oversText)(inn.legalBalls)} ov)`, top ? `Top: ${top}` : "Top: none", bowler ? `Best bowler: ${bowler.name} ${bowler.wickets}/${bowler.runs}` : "Best bowler: none");
    }
    return [...lines, mvp ? `Man of the Match: ${mvp.name}` : "Man of the Match: not decided"].join("\n");
  }
  function j() {
    const { id: e } = (0, t.useLocalSearchParams)(),
      u = (0, l.useSQLiteContext)(),
      [j, w] = (0, s.useState)(null),
      [B, C] = (0, s.useState)([]),
      [T, R] = (0, s.useState)([]),
      [W, A] = (0, s.useState)(""),
      [k, E] = (0, s.useState)(!0),
      [summaryOpen, setSummaryOpen] = (0, s.useState)(!1),
      [shareNote, setShareNote] = (0, s.useState)(""),
      N = (0, s.useCallback)(async () => {
        try {
          const t = await u.getFirstAsync(
            "SELECT id,match_name,team_a,team_b,batting_first,match_type,current_innings,overs,status,ground,result_type,winner_side,super_over_balls FROM matches WHERE id=?",
            e,
          );
          if (!t) return void A("Match not found.");
          w(t);
          const [l, s] = await Promise.all([
            u.getAllAsync(
              "SELECT innings,sequence,batter,bowler,runs_bat,extras,extra_type,extra_runs,wicket,dismissal,dismissed_batter,dismissed_by,legal FROM deliveries WHERE match_id=? ORDER BY innings,sequence",
              e,
            ),
            u.getAllAsync(
              "SELECT p.name,mp.team_side,COALESCE(mp.is_common,0) AS is_common FROM match_players mp JOIN players p ON p.id=mp.player_id WHERE mp.match_id=? ORDER BY p.name COLLATE NOCASE",
              e,
            ),
          ]);
          R(s);
          const n = Math.max(1, t.current_innings, ...l.map((e) => e.innings)),
            o = [];
          for (let e = 1; e <= n; e++) {
            const second = t.batting_first === t.team_a ? t.team_b : t.team_a,
              so = "normal" === t.match_type && e > 2,
              soIdx = e - 3,
              soLead = ((soIdx >> 1) % 2 == 0) ? second : t.batting_first,
              n = so
                ? soIdx % 2 == 0
                  ? soLead
                  : soLead === t.batting_first
                    ? second
                    : t.batting_first
                : e % 2 == 1
                  ? t.batting_first
                  : second,
              c = n === t.team_a ? "A" : "B",
              u = l.filter((t) => t.innings === e),
              f = u.reduce((e, t) => e + Number(t.legal), 0),
              h = u.reduce((e, t) => e + t.runs_bat + t.extras, 0),
              x = u.reduce((e, t) => e + Number(t.wicket), 0),
              b = u.reduce((e, t) => e + t.extras, 0),
              y = [
                ...new Set(u.map((e) => e.batter)),
                ...s
                  .filter((e) => e.team_side === c || e.is_common)
                  .map((e) => e.name)
                  .filter((e) => !u.some((t) => t.batter === e)),
              ].map((e) => {
                const t = u.filter((t) => t.batter === e),
                  l = t.reduce((e, t) => e + t.runs_bat, 0),
                  s = t.filter(
                    (e) =>
                      "wide" !== e.extra_type && "Retired hurt" !== e.dismissal,
                  ).length,
                  n = u
                    .filter(
                      (t) =>
                        (1 === t.wicket &&
                          (t.dismissed_batter ?? t.batter) === e) ||
                        ("Retired hurt" === t.dismissal && t.batter === e),
                    )
                    .at(-1),
                  o = Boolean(
                    "Retired hurt" === n?.dismissal &&
                      t.some((e) => e.sequence > n.sequence),
                  ),
                  c = n?.dismissal ? dismissalText(n) : "";
                return {
                  name: e,
                  runs: l,
                  balls: s,
                  fours: t.filter((e) => 4 === e.runs_bat).length,
                  sixes: t.filter((e) => 6 === e.runs_bat).length,
                  dismissal: n && !o ? c : t.length ? "not out" : "did not bat",
                  strikeRate: s ? (100 * l) / s : 0,
                };
              }),
              p = [...new Set(u.map((e) => e.bowler))].map((e) => {
                const t = u.filter((t) => t.bowler === e),
                  l = t.reduce(
                    (e, t) =>
                      e +
                      t.runs_bat +
                      (["wide", "no-ball"].includes(t.extra_type ?? "")
                        ? t.extras
                        : 0),
                    0,
                  ),
                  s = t.reduce((e, t) => e + Number(t.legal), 0),
                  n = new Map();
                let o = 0;
                for (const t of u) {
                  const l = Math.floor(o / 6);
                  if (t.bowler === e) {
                    const e = n.get(l) ?? { legal: 0, runs: 0 };
                    (e.legal += Number(t.legal)),
                      (e.runs +=
                        t.runs_bat +
                        (["wide", "no-ball"].includes(t.extra_type ?? "")
                          ? t.extras
                          : 0)),
                      n.set(l, e);
                  }
                  o += Number(t.legal);
                }
                return {
                  name: e,
                  balls: s,
                  runs: l,
                  dotBalls: t.filter((e) => Number(e.legal) === 1 && Number(e.runs_bat || 0) + Number(e.extras || 0) === 0).length,
                  wickets: t.filter(
                    (e) =>
                      1 === e.wicket &&
                      !_.has((e.dismissal ?? "").toLowerCase()),
                  ).length,
                  maidens: [...n.values()].filter(
                    (e) => e.legal >= 6 && 0 === e.runs,
                  ).length,
                  wides: t
                    .filter((e) => "wide" === e.extra_type)
                    .reduce((e, t) => e + t.extras, 0),
                  noBalls: t
                    .filter((e) => "no-ball" === e.extra_type)
                    .reduce((e, t) => e + t.extras, 0),
                  economy: s ? (6 * l) / s : 0,
                };
              }),
              j = [
                `WD ${u.filter((e) => "wide" === e.extra_type).reduce((e, t) => e + t.extras, 0)}`,
                `NB ${u.filter((e) => "no-ball" === e.extra_type).reduce((e, t) => e + t.extras, 0)}`,
                `B ${u.filter((e) => "bye" === e.extra_type).reduce((e, t) => e + t.extra_runs, 0)}`,
                `LB ${u.filter((e) => "leg-bye" === e.extra_type).reduce((e, t) => e + t.extra_runs, 0)}`,
                `P ${u.filter((e) => "penalty" === e.extra_type).reduce((e, t) => e + t.extra_runs, 0)}`,
              ].join(" \xb7 ");
            const fielding = fieldingFor(u, e);
            o.push({
              label: so
                ? `SUPER OVER${soIdx >> 1 ? " " + ((soIdx >> 1) + 1) : ""} \xb7 ${soIdx % 2 ? "CHASE" : "1ST"} (${t.super_over_balls || 6} BALLS)`
                : ["1ST", "2ND", "3RD", "4TH"][e - 1] + " INNINGS",
              number: e,
              fielding,
              team: n,
              runs: h,
              wickets: x,
              legalBalls: f,
              extras: b,
              batters: y,
              bowlers: p,
              extrasText: j,
              insights: inningsInsights(u),
            });
          }
          C(o);
        } catch {
          A("Could not load the scorecard.");
        } finally {
          E(!1);
        }
      }, [u, e]);
    (0, s.useEffect)(() => {
      N();
    }, [N]);
    const z = j
      ? (0, b.describeMatchResult)({
          status: j.status,
          resultType: j.result_type,
          winnerSide: j.winner_side,
          teamA: j.team_a,
          teamB: j.team_b,
          battingFirst: j.batting_first,
          matchType: j.match_type,
          superOver: "normal" === j.match_type && Boolean(j.super_over_balls) && B.length > 2,
          scores: B.map((e) => ({ runs: e.runs, wickets: e.wickets })),
          teamSizes: {
            A: T.filter((e) => "A" === e.team_side || e.is_common).length,
            B: T.filter((e) => "B" === e.team_side || e.is_common).length,
          },
        })
      : "";
    return k
      ? (0, y.jsxs)(h.default, {
          style: [S.page, S.loading],
          children: [
            (0, y.jsx)(n.default, { color: p.green }),
            (0, y.jsx)(f.default, {
              style: S.hint,
              children: "Loading scorecard\u2026",
            }),
          ],
        })
      : (0, y.jsxs)(c.default, {
          style: S.page,
          contentContainerStyle: S.content,
          children: [
            (0, y.jsx)(o.default, {
              onPress: () => t.router.back(),
              children: (0, y.jsx)(f.default, {
                style: S.back,
                children: "\u2039  BACK TO MATCH",
              }),
            }),
            (0, y.jsxs)(f.default, {
              style: S.kicker,
              children: [
                j?.match_type.toUpperCase(),
                " \xb7 ",
                j?.ground ?? "TENNIS BALL CRICKET",
              ],
            }),
            (0, y.jsx)(f.default, {
              style: S.title,
              children: "Full scorecard",
            }),
            (0, y.jsxs)(f.default, {
              style: S.subtitle,
              children: [j?.team_a, " vs ", j?.team_b, " \xb7 ", j?.match_name],
            }),
            "completed" === j?.status &&
              (0, y.jsx)(h.default, {
                style: S.resultCard,
                children: (0, y.jsx)(f.default, {
                  style: S.result,
                  children: z || "Match completed",
                }),
              }),
            "completed" === j?.status &&
              (0, y.jsx)(o.default, {
                onPress: () => setSummaryOpen(!summaryOpen),
                style: S.resultCard,
                children: (0, y.jsx)(f.default, {
                  style: S.result,
                  children: summaryOpen ? "BACK TO FULL SCORECARD" : "VIEW MATCH SUMMARY",
                }),
              }),
            summaryOpen && "completed" === j?.status && B.length > 0 &&
              (() => {
                const mvp = playerOfMatch(B, T, j),
                  shareSummary = async () => {
                    const text = summaryText(j, z, B, mvp);
                    try {
                      navigator.share
                        ? await navigator.share({ title: j.match_name, text })
                        : (await navigator.clipboard.writeText(text), setShareNote("Summary copied to clipboard."));
                    } catch {
                      try {
                        await navigator.clipboard.writeText(text), setShareNote("Summary copied to clipboard.");
                      } catch {
                        setShareNote("Could not share the summary.");
                      }
                    }
                    setTimeout(() => setShareNote(""), 2200);
                  };
                return (0, y.jsxs)(h.default, {
                  style: S.card,
                  children: [
                    (0, y.jsx)(f.default, { style: S.section, children: "MATCH SUMMARY" }),
                    (0, y.jsx)(f.default, { style: S.result, children: z || "Match completed" }),
                    ...B.map((inn) => {
                      const topBatters = inn.batters.filter((batter) => batter.runs > 0).sort((a, b) => b.runs - a.runs || b.strikeRate - a.strikeRate).slice(0, 3),
                        bestBowler = [...inn.bowlers].sort((a, b) => b.wickets - a.wickets || a.runs - b.runs)[0],
                        insight = inn.insights,
                        maxOver = Math.max(1, ...(insight?.overRuns ?? []));
                      return (0, y.jsxs)(h.default, {
                        style: S.summaryRow,
                        children: [
                          (0, y.jsx)(f.default, { style: S.team, children: `${inn.team} · ${inn.runs}/${inn.wickets} (${(0, x.oversText)(inn.legalBalls)} ov)` }),
                          (0, y.jsx)(f.default, { style: S.meta, children: topBatters.length ? topBatters.map((batter) => `${batter.name} ${batter.runs}${"not out" === batter.dismissal ? "*" : ""}`).join(" · ") : "No batting figures recorded" }),
                          (0, y.jsx)(f.default, { style: S.meta, children: bestBowler ? `${bestBowler.name} ${bestBowler.wickets}/${bestBowler.runs}` : "No bowling figures recorded" }),
                          insight?.overRuns.length
                            ? (0, y.jsxs)(h.default, {
                                style: S.sparkRow,
                                children: insight.overRuns.map((runs, index) =>
                                  (0, y.jsx)(h.default, { style: [S.sparkBar, { height: 4 + Math.round((18 * runs) / maxOver) }] }, index),
                                ),
                              })
                            : null,
                          insight
                            ? (0, y.jsx)(f.default, {
                                style: S.meta,
                                children: `Overs ${insight.overRuns.join(" · ") || "—"} · best ${insight.bestOver} · top stand ${insight.bestStand}`,
                              })
                            : null,
                          insight?.fow.length
                            ? (0, y.jsx)(f.default, {
                                style: S.meta,
                                children: `FOW ${insight.fow.map((item) => `${item.wicket}-${item.score} (${item.batter}, ${item.over})`).join(" · ")}`,
                              })
                            : null,
                        ],
                      }, inn.number);
                    }),
                    mvp && (0, y.jsxs)(f.default, { style: S.mvp, children: ["MAN OF THE MATCH · ", mvp.name] }),
                    (0, y.jsx)(o.default, { style: S.shareButton, onPress: shareSummary, children: (0, y.jsx)(f.default, { style: S.shareText, children: "SHARE / COPY SUMMARY" }) }),
                    shareNote ? (0, y.jsx)(f.default, { style: S.meta, children: shareNote }) : null,
                    (0, y.jsx)(f.default, { style: S.meta, children: "MVP is weighted by batting pace, bowling control, fielding impact, team size, match situation and result." }),
                  ],
                });
              })(),
            W
              ? (0, y.jsx)(f.default, { style: S.error, children: W })
              : !summaryOpen && B.map((e) =>
                  (0, y.jsxs)(
                    h.default,
                    {
                      style: S.card,
                      children: [
                        (0, y.jsxs)(h.default, {
                          style: S.inningsHead,
                          children: [
                            (0, y.jsxs)(h.default, {
                              children: [
                                (0, y.jsxs)(f.default, {
                                  style: S.section,
                                  children: e.label,
                                }),
                                (0, y.jsx)(f.default, {
                                  style: S.team,
                                  children: e.team,
                                }),
                              ],
                            }),
                            (0, y.jsxs)(f.default, {
                              style: S.total,
                              children: [e.runs, "/", e.wickets],
                            }),
                          ],
                        }),
                        (0, y.jsxs)(f.default, {
                          style: S.meta,
                          children: [
                            (0, x.oversText)(e.legalBalls),
                            " overs \xb7 ",
                            e.extras,
                            " extras \xb7 ",
                            e.runs
                              ? `CRR ${((6 * e.runs) / Math.max(1, e.legalBalls)).toFixed(1)}`
                              : "No runs recorded",
                          ],
                        }),
                        (0, y.jsx)(f.default, {
                          style: S.label,
                          children: "BATTING",
                        }),
                        (0, y.jsxs)(h.default, {
                          style: S.tableHead,
                          children: [
                            (0, y.jsx)(f.default, {
                              style: [S.th, S.nameCol],
                              children: "BATTER / DISMISSAL",
                            }),
                            (0, y.jsx)(f.default, {
                              style: S.th,
                              children: "R",
                            }),
                            (0, y.jsx)(f.default, {
                              style: S.th,
                              children: "B",
                            }),
                            (0, y.jsx)(f.default, {
                              style: S.th,
                              children: "4s",
                            }),
                            (0, y.jsx)(f.default, {
                              style: S.th,
                              children: "6s",
                            }),
                            (0, y.jsx)(f.default, {
                              style: S.th,
                              children: "SR",
                            }),
                          ],
                        }),
                        e.batters.map((e) =>
                          (0, y.jsxs)(
                            h.default,
                            {
                              style: S.battingRow,
                              children: [
                                (0, y.jsxs)(h.default, {
                                  style: S.nameCol,
                                  children: [
                                    (0, y.jsx)(f.default, {
                                      style: S.player,
                                      children: e.name,
                                    }),
                                    (0, y.jsx)(f.default, {
                                      style: S.dismissal,
                                      children: e.dismissal,
                                    }),
                                  ],
                                }),
                                (0, y.jsx)(f.default, {
                                  style: S.cellStrong,
                                  children: e.runs,
                                }),
                                (0, y.jsx)(f.default, {
                                  style: S.cell,
                                  children: e.balls,
                                }),
                                (0, y.jsx)(f.default, {
                                  style: S.cell,
                                  children: e.fours,
                                }),
                                (0, y.jsx)(f.default, {
                                  style: S.cell,
                                  children: e.sixes,
                                }),
                                (0, y.jsx)(f.default, {
                                  style: S.cell,
                                  children: e.strikeRate.toFixed(1),
                                }),
                              ],
                            },
                            e.name,
                          ),
                        ),
                        (0, y.jsxs)(f.default, {
                          style: S.extras,
                          children: [
                            "Extras: ",
                            e.extras,
                            " (",
                            e.extrasText,
                            ")",
                          ],
                        }),
                        (0, y.jsx)(f.default, {
                          style: S.label,
                          children: "BOWLING",
                        }),
                        (0, y.jsxs)(h.default, {
                          style: S.tableHead,
                          children: [
                            (0, y.jsx)(f.default, {
                              style: [S.th, S.nameCol],
                              children: "BOWLER",
                            }),
                            (0, y.jsx)(f.default, {
                              style: S.th,
                              children: "O",
                            }),
                            (0, y.jsx)(f.default, {
                              style: S.th,
                              children: "M",
                            }),
                            (0, y.jsx)(f.default, {
                              style: S.th,
                              children: "R",
                            }),
                            (0, y.jsx)(f.default, {
                              style: S.th,
                              children: "W",
                            }),
                            (0, y.jsx)(f.default, {
                              style: S.th,
                              children: "ECON",
                            }),
                          ],
                        }),
                        e.bowlers.length
                          ? e.bowlers.map((e) =>
                              (0, y.jsxs)(
                                h.default,
                                {
                                  style: S.battingRow,
                                  children: [
                                    (0, y.jsxs)(h.default, {
                                      style: S.nameCol,
                                      children: [
                                        (0, y.jsx)(f.default, {
                                          style: S.player,
                                          children: e.name,
                                        }),
                                        (0, y.jsxs)(f.default, {
                                          style: S.dismissal,
                                          children: [
                                            "WD ",
                                            e.wides,
                                            " \xb7 NB ",
                                            e.noBalls,
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, y.jsx)(f.default, {
                                      style: S.cellStrong,
                                      children: (0, x.oversText)(e.balls),
                                    }),
                                    (0, y.jsx)(f.default, {
                                      style: S.cell,
                                      children: e.maidens,
                                    }),
                                    (0, y.jsx)(f.default, {
                                      style: S.cell,
                                      children: e.runs,
                                    }),
                                    (0, y.jsx)(f.default, {
                                      style: S.cellStrong,
                                      children: e.wickets,
                                    }),
                                    (0, y.jsx)(f.default, {
                                      style: S.cell,
                                      children: e.economy.toFixed(1),
                                    }),
                                  ],
                                },
                                e.name,
                              ),
                            )
                          : (0, y.jsx)(f.default, {
                              style: S.meta,
                              children: "No bowling figures yet.",
                            }),
                        (0, y.jsx)(f.default, {
                          style: S.label,
                          children: "FIELDING",
                        }),
                        e.fielding.length
                          ? [fieldingHead(S), ...fieldingRows(e.fielding, S, !1)]
                          : (0, y.jsx)(f.default, {
                              style: S.meta,
                              children: "No catches, run outs or stumpings yet.",
                            }),
                      ],
                    },
                    e.number,
                  ),
                ),
            !summaryOpen && !W &&
              B.length > 0 &&
              (() => {
                const all = mergeFielding(B),
                  sum = (k, word) => {
                    const n = all.reduce((t, f) => t + f[k], 0);
                    return `${n} ${word}${1 === n ? "" : "s"}`;
                  };
                return (0, y.jsxs)(h.default, {
                  style: [S.card, S.fieldingCard],
                  children: [
                    (0, y.jsx)(f.default, { style: S.section, children: "MATCH FIELDING SUMMARY" }),
                    (0, y.jsx)(f.default, {
                      style: S.team,
                      children: `${sum("catches", "catch").replace(/catchs$/, "catches")} \xb7 ${sum("runOuts", "run out")} \xb7 ${sum("stumpings", "stumping")}`,
                    }),
                    all.length
                      ? [fieldingHead(S), ...fieldingRows(all, S, !0)]
                      : (0, y.jsx)(f.default, {
                          style: S.meta,
                          children: "No fielding dismissals recorded in this match.",
                        }),
                  ],
                });
              })(),
          ],
        });
  }
  const S = u.default.create({
    page: { flex: 1, backgroundColor: p.bg },
    content: {
      padding: 20,
      paddingTop: 40,
      paddingBottom: 50,
      maxWidth: 850,
      width: "100%",
      alignSelf: "center",
    },
    loading: { justifyContent: "center", alignItems: "center", gap: 12 },
    back: {
      color: p.green,
      fontSize: 11,
      fontWeight: "900",
      letterSpacing: 1.1,
      marginBottom: 24,
    },
    kicker: {
      color: p.green,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 2,
    },
    title: { color: p.white, fontSize: 30, fontWeight: "900", marginTop: 7 },
    subtitle: { color: p.muted, fontSize: 12, marginTop: 6 },
    card: {
      backgroundColor: p.card,
      borderColor: p.border,
      borderWidth: 1,
      borderRadius: 16,
      padding: 15,
      marginTop: 18,
    },
    resultCard: {
      backgroundColor: p.card,
      borderColor: p.green,
      borderWidth: 1,
      borderRadius: 14,
      padding: 14,
      marginTop: 16,
      alignItems: "center",
    },
    result: {
      color: p.green,
      fontSize: 15,
      fontWeight: "900",
      textAlign: "center",
    },
    summaryRow: {
      paddingVertical: 12,
      borderTopWidth: 1,
      borderTopColor: p.border,
      gap: 5,
    },
    mvp: {
      color: p.green,
      fontSize: 15,
      fontWeight: "900",
      marginTop: 12,
      marginBottom: 8,
    },
    shareButton: {
      alignSelf: "flex-start",
      borderColor: p.green,
      borderRadius: 8,
      borderWidth: 1,
      marginTop: 4,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    shareText: { color: p.green, fontSize: 9, fontWeight: "900", letterSpacing: 0.8 },
    sparkRow: { alignItems: "flex-end", flexDirection: "row", gap: 3, height: 25, marginTop: 6 },
    sparkBar: { backgroundColor: p.green, borderRadius: 3, minWidth: 7, opacity: 0.85 },
    inningsHead: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    section: {
      color: p.green,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 1.2,
    },
    team: { color: p.white, fontSize: 17, fontWeight: "900", marginTop: 5 },
    total: { color: p.white, fontSize: 26, fontWeight: "900" },
    meta: { color: p.muted, fontSize: 10, marginTop: 7 },
    label: {
      color: p.muted,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1.1,
      marginTop: 21,
      marginBottom: 8,
    },
    tableHead: {
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: p.border,
      paddingVertical: 8,
      gap: 5,
    },
    th: {
      flex: 1,
      minWidth: 24,
      textAlign: "right",
      color: p.muted,
      fontSize: 8,
      fontWeight: "900",
    },
    nameCol: { flex: 4, minWidth: 100, textAlign: "left" },
    battingRow: {
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: p.border,
      paddingVertical: 9,
      gap: 5,
    },
    player: { color: p.white, fontSize: 10, fontWeight: "800" },
    dismissal: { color: p.muted, fontSize: 8, marginTop: 3 },
    cell: {
      flex: 1,
      minWidth: 24,
      textAlign: "right",
      color: p.white,
      fontSize: 9,
    },
    cellStrong: {
      flex: 1,
      minWidth: 24,
      textAlign: "right",
      color: p.green,
      fontSize: 10,
      fontWeight: "900",
    },
    extras: { color: p.muted, fontSize: 9, marginTop: 10 },
    fieldingCard: { borderColor: p.green },
    error: { color: "#FF8B80", fontSize: 12, marginTop: 16 },
    hint: { color: p.muted, fontSize: 11 },
  });
},768,[771,772,12,228,245,133,28,188,109,866,865,6]);