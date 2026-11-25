// module 763 from history-c70a6b4cc6a2299a3dfafca57445130b.js deps=[770,771,772,12,245,132,133,28,188,227,109,862,864,865,6]
(function (g, r, i, a, _m, _e, _d) {
  "use strict";
  function e(e) {
    return e && e.__esModule ? e : { default: e };
  }
  Object.defineProperty(_e, "__esModule", { value: !0 }),
    Object.defineProperty(_e, "default", {
      enumerable: !0,
      get: function () {
        return b;
      },
    });
  var t = r(_d[0]),
    s = r(_d[1]),
    n = r(_d[2]),
    d = r(_d[3]),
    o = e(r(_d[4])),
    c = e(r(_d[5])),
    l = e(r(_d[6])),
    m = e(r(_d[7])),
    u = e(r(_d[8])),
    h = e(r(_d[9])),
    f = e(r(_d[10])),
    E = r(_d[11]),
    S = e(E),
    p = r(_d[12]),
    y = r(_d[13]),
    _ = r(_d[14]);
  const C = {
    bg: "#080D0B",
    card: "#111A15",
    green: "#B7F34A",
    white: "#F5F7F2",
    muted: "#89948B",
    border: "#26332A",
    red: "#FF8B80",
  };
  function b() {
    const e = (0, t.c)(48),
      m = (0, n.useSQLiteContext)();
    let y;
    e[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((y = []), (e[0] = y))
      : (y = e[0]);
    const [b, R] = (0, d.useState)(y),
      [k, M] = (0, d.useState)(""),
      [O, D] = (0, d.useState)(""),
      [L, W] = (0, d.useState)(null),
      [F, H] = (0, d.useState)(!1),
      [z, v] = (0, d.useState)("");
    let N;
    e[1] !== m
      ? ((N = async () => {
          try {
            const e = await m.getAllAsync(
              "SELECT m.*,s.series_date,\n  (SELECT COALESCE(SUM(d.runs_bat+d.extras),0) FROM deliveries d WHERE d.match_id=m.id AND d.innings=1) AS score1,\n  (SELECT COALESCE(SUM(d.wicket),0) FROM deliveries d WHERE d.match_id=m.id AND d.innings=1) AS wickets1,\n  (SELECT COALESCE(SUM(d.runs_bat+d.extras),0) FROM deliveries d WHERE d.match_id=m.id AND d.innings=2) AS score2,\n  (SELECT COALESCE(SUM(d.wicket),0) FROM deliveries d WHERE d.match_id=m.id AND d.innings=2) AS wickets2,\n  (SELECT COALESCE(SUM(d.runs_bat+d.extras),0) FROM deliveries d WHERE d.match_id=m.id AND d.innings=3) AS score3,\n  (SELECT COALESCE(SUM(d.wicket),0) FROM deliveries d WHERE d.match_id=m.id AND d.innings=3) AS wickets3,\n  (SELECT COALESCE(SUM(d.runs_bat+d.extras),0) FROM deliveries d WHERE d.match_id=m.id AND d.innings=4) AS score4,\n  (SELECT COALESCE(SUM(d.wicket),0) FROM deliveries d WHERE d.match_id=m.id AND d.innings=4) AS wickets4,\n  (SELECT COUNT(*) FROM match_players mp WHERE mp.match_id=m.id AND mp.team_side='A') AS teamSizeA,\n  (SELECT COUNT(*) FROM match_players mp WHERE mp.match_id=m.id AND (mp.team_side='B' OR COALESCE(mp.is_common,0)=1)) AS teamSizeB\n  FROM matches m LEFT JOIN match_series s ON s.id=m.series_id ORDER BY COALESCE(s.series_date,substr(m.created_at,1,10)) DESC,m.series_match_number DESC,m.created_at DESC",
            );
            R(e);
          } catch {
            R([]);
          }
        }),
        (e[1] = m),
        (e[2] = N))
      : (N = e[2]);
    const B = N;
    let I, U, P, V, $;
    e[3] !== B
      ? ((I = () => {
          B();
        }),
        (U = [B]),
        (e[3] = B),
        (e[4] = I),
        (e[5] = U))
      : ((I = e[4]), (U = e[5])),
      (0, d.useEffect)(I, U),
      e[6] !== z
        ? ((P = () => {
            if (!z) return;
            const e = setTimeout(() => v(""), 2400);
            return () => clearTimeout(e);
          }),
          (V = [z]),
          (e[6] = z),
          (e[7] = P),
          (e[8] = V))
        : ((P = e[7]), (V = e[8])),
      (0, d.useEffect)(P, V),
      e[9] !== B
        ? (($ = async () => {
            H(!0), await B(), H(!1);
          }),
          (e[9] = B),
          (e[10] = $))
        : ($ = e[10]);
    const G = $;
    let Y;
    if (e[11] !== b) {
      const t = new Map();
      for (const e of b) {
        const s = e.series_date || e.created_at.slice(0, 10),
          n = s,
          d = t.get(n) ?? { key: n, date: s, matches: [] };
        d.matches.push(e), t.set(n, d);
      }
      (Y = [...t.values()]), (e[11] = b), (e[12] = Y);
    } else Y = e[12];
    const J = Y;
    let Q;
    e[13] !== m || e[14] !== B
      ? ((Q = async function (e) {
          try {
            await m.runAsync("DELETE FROM matches WHERE id=?", e.id),
              e.series_id &&
                (await m.runAsync(
                  "DELETE FROM match_series WHERE id=? AND NOT EXISTS(SELECT 1 FROM matches WHERE series_id=?)",
                  e.series_id,
                  e.series_id,
                )),
              M(""),
              h.default.vibrate(25),
              v("Match record removed"),
              await B();
          } catch {
            v("Could not delete match");
          }
        }),
        (e[13] = m),
        (e[14] = B),
        (e[15] = Q))
      : (Q = e[15]);
    const X = Q;
    let q;
    e[16] !== m || e[17] !== B
      ? ((q = async function (e) {
          try {
            await m.withTransactionAsync(async () => {
              await m.runAsync("DELETE FROM matches WHERE series_id=?", e),
                await m.runAsync("DELETE FROM match_series WHERE id=?", e);
            }),
              D(""),
              h.default.vibrate(25),
              v("Series removed"),
              await B();
          } catch {
            v("Could not delete series");
          }
        }),
        (e[16] = m),
        (e[17] = B),
        (e[18] = q))
      : (q = e[18]);
    const K = q,
      Z = A;
    let ee;
    e[19] === Symbol.for("react.memo_cache_sentinel")
      ? ((ee = (e) =>
          "completed" === e.status
            ? (Z(e) || "MATCH COMPLETED").toUpperCase()
            : e.status.toUpperCase()),
        (e[19] = ee))
      : (ee = e[19]);
    const te = ee,
      se = T;
    let ie, ne, re, ae, de, oe, ce, le;
    e[20] === Symbol.for("react.memo_cache_sentinel")
      ? ((ie = [C.green]), (e[20] = ie))
      : (ie = e[20]),
      e[21] !== G || e[22] !== F
        ? ((ne = (0, _.jsx)(c.default, {
            refreshing: F,
            onRefresh: G,
            tintColor: C.green,
            colors: ie,
          })),
          (e[21] = G),
          (e[22] = F),
          (e[23] = ne))
        : (ne = e[23]),
      e[24] === Symbol.for("react.memo_cache_sentinel")
        ? ((re = (0, _.jsx)(o.default, {
            onPress: w,
            children: (0, _.jsx)(u.default, {
              style: j.back,
              children: "\u2039  DASHBOARD",
            }),
          })),
          (ae = (0, _.jsx)(u.default, {
            style: j.kicker,
            children: "YOUR CLUB ARCHIVE",
          })),
          (de = (0, _.jsx)(u.default, {
            style: j.title,
            children: "Match history",
          })),
          (oe = (0, _.jsx)(u.default, {
            style: j.hint,
            children:
              "Matches are grouped by series date. Open a match to view its scorecard.",
          })),
          (e[24] = re),
          (e[25] = ae),
          (e[26] = de),
          (e[27] = oe))
        : ((re = e[24]), (ae = e[25]), (de = e[26]), (oe = e[27])),
      e[28] !== k || e[29] !== O || e[30] !== J
        ? ((ce =
            0 === J.length
              ? (0, _.jsxs)(S.default.View, {
                  entering: E.FadeInDown.duration(260),
                  style: j.empty,
                  children: [
                    (0, _.jsx)(u.default, {
                      style: j.emptyIcon,
                      children: "\ud83c\udfcf",
                    }),
                    (0, _.jsx)(u.default, {
                      style: j.emptyTitle,
                      children: "Your first match is waiting",
                    }),
                    (0, _.jsx)(u.default, {
                      style: j.hint,
                      children:
                        "Start a match and this page will keep every innings together by date.",
                    }),
                  ],
                })
              : J.map((e) =>
                  (0, _.jsxs)(
                    f.default,
                    {
                      style: j.dayGroup,
                      children: [
                        (0, _.jsxs)(f.default, {
                          style: j.dayHeader,
                          children: [
                            (0, _.jsx)(u.default, {
                              style: j.dayTitle,
                              children: se(e.date),
                            }),
                            (0, _.jsxs)(u.default, {
                              style: j.dayCount,
                              children: [
                                e.matches.length,
                                " MATCH",
                                1 === e.matches.length ? "" : "ES",
                              ],
                            }),
                          ],
                        }),
                        e.matches.map((e, t) =>
                          (0, _.jsxs)(
                            S.default.View,
                            {
                              entering: E.FadeInDown.delay(
                                28 * Math.min(t, 8),
                              ).duration(220),
                              style: j.card,
                              children: [
                                (0, _.jsxs)(o.default, {
                                  onPress: () =>
                                    s.router.push({
                                      pathname: "/scoring/[id]",
                                      params: { id: e.id },
                                    }),
                                  children: [
                                    (0, _.jsxs)(f.default, {
                                      style: j.top,
                                      children: [
                                        (0, _.jsxs)(u.default, {
                                          style: j.status,
                                          children: [
                                            te(e),
                                            " \xb7 ",
                                            e.match_type.toUpperCase(),
                                          ],
                                        }),
                                        (0, _.jsxs)(u.default, {
                                          style: j.date,
                                          children: [
                                            "MATCH ",
                                            e.series_match_number,
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, _.jsxs)(u.default, {
                                      style: j.teams,
                                      children: [
                                        e.team_a,
                                        " ",
                                        (0, _.jsx)(u.default, {
                                          style: j.vs,
                                          children: "vs",
                                        }),
                                        " ",
                                        e.team_b,
                                      ],
                                    }),
                                    (0, _.jsx)(u.default, {
                                      style: j.meta,
                                      children:
                                        e.match_name ||
                                        `Match ${e.series_match_number}`,
                                    }),
                                    (0, _.jsxs)(u.default, {
                                      style: j.meta,
                                      children: [
                                        e.batting_first,
                                        " ",
                                        e.score1,
                                        "/",
                                        e.wickets1,
                                        e.score2 || "completed" === e.status
                                          ? ` \xb7 ${e.batting_first === e.team_a ? e.team_b : e.team_a} ${e.score2}/${e.wickets2}`
                                          : "",
                                      ],
                                    }),
                                    "normal" === e.match_type &&
                                      e.super_over_balls &&
                                      e.current_innings > 2 &&
                                      (0, _.jsx)(u.default, {
                                        style: j.meta,
                                        children: `Super over (${e.super_over_balls} balls): ${e.batting_first === e.team_a ? e.team_b : e.team_a} ${e.score3}/${e.wickets3}${e.current_innings >= 4 || "completed" === e.status ? ` \xb7 ${e.batting_first} ${e.score4}/${e.wickets4}` : ""}`,
                                      }),
                                    "completed" === e.status &&
                                      (0, _.jsx)(u.default, {
                                        style: j.result,
                                        children: Z(e) || "Match completed",
                                      }),
                                    (0, _.jsxs)(u.default, {
                                      style: j.meta,
                                      children: [
                                        e.ground || "Tennis ball cricket",
                                        " \xb7 ",
                                        e.overs,
                                        " overs per innings",
                                      ],
                                    }),
                                    "test" === e.match_type &&
                                      (e.current_innings >= 3 ||
                                        "completed" === e.status) &&
                                      (0, _.jsxs)(u.default, {
                                        style: j.meta,
                                        children: [
                                          "3rd: ",
                                          e.batting_first,
                                          " ",
                                          e.score3,
                                          "/",
                                          e.wickets3,
                                        ],
                                      }),
                                    "test" === e.match_type &&
                                      (e.current_innings >= 4 ||
                                        "completed" === e.status) &&
                                      (0, _.jsxs)(u.default, {
                                        style: j.meta,
                                        children: [
                                          "4th: ",
                                          e.batting_first === e.team_a
                                            ? e.team_b
                                            : e.team_a,
                                          " ",
                                          e.score4,
                                          "/",
                                          e.wickets4,
                                        ],
                                      }),
                                  ],
                                }),
                                "live" === e.status &&
                                  (0, _.jsx)(o.default, {
                                    accessibilityRole: "button",
                                    style: x,
                                    onPress: () =>
                                      s.router.push({
                                        pathname: "/scoring/[id]",
                                        params: { id: e.id },
                                      }),
                                    children: (0, _.jsx)(u.default, {
                                      style: j.continueText,
                                      children: "\u25b6  CONTINUE LIVE SCORING",
                                    }),
                                  }),
                                (0, _.jsxs)(f.default, {
                                  style: j.controls,
                                  children: [
                                    e.series_id &&
                                      (O === e.series_id
                                        ? (0, _.jsxs)(_.Fragment, {
                                            children: [
                                              (0, _.jsx)(o.default, {
                                                onPress: () =>
                                                  W({
                                                    kind: "series",
                                                    seriesId: e.series_id,
                                                  }),
                                                children: (0, _.jsx)(
                                                  u.default,
                                                  {
                                                    style: j.deleteConfirm,
                                                    children: "DELETE SERIES",
                                                  },
                                                ),
                                              }),
                                              (0, _.jsx)(o.default, {
                                                onPress: () => D(""),
                                                children: (0, _.jsx)(
                                                  u.default,
                                                  {
                                                    style: j.meta,
                                                    children: "CANCEL",
                                                  },
                                                ),
                                              }),
                                            ],
                                          })
                                        : (0, _.jsx)(o.default, {
                                            onPress: () => D(e.series_id),
                                            children: (0, _.jsx)(u.default, {
                                              style: j.delete,
                                              children: "DELETE SERIES",
                                            }),
                                          })),
                                    k === e.id
                                      ? (0, _.jsxs)(_.Fragment, {
                                          children: [
                                            (0, _.jsx)(o.default, {
                                              onPress: () =>
                                                W({ kind: "match", match: e }),
                                              children: (0, _.jsx)(u.default, {
                                                style: j.deleteConfirm,
                                                children: "DELETE MATCH",
                                              }),
                                            }),
                                            (0, _.jsx)(o.default, {
                                              onPress: () => M(""),
                                              children: (0, _.jsx)(u.default, {
                                                style: j.meta,
                                                children: "CANCEL",
                                              }),
                                            }),
                                          ],
                                        })
                                      : (0, _.jsx)(o.default, {
                                          onPress: () => M(e.id),
                                          children: (0, _.jsx)(u.default, {
                                            style: j.delete,
                                            children: "DELETE MATCH",
                                          }),
                                        }),
                                  ],
                                }),
                                (0, _.jsx)(o.default, {
                                  onPress: () =>
                                    s.router.push({
                                      pathname: "/scorecard/[id]",
                                      params: { id: e.id },
                                    }),
                                  children: (0, _.jsx)(u.default, {
                                    style: j.open,
                                    children: "OPEN FULL SCORECARD  \u203a",
                                  }),
                                }),
                              ],
                            },
                            e.id,
                          ),
                        ),
                      ],
                    },
                    e.key,
                  ),
                )),
          (e[28] = k),
          (e[29] = O),
          (e[30] = J),
          (e[31] = ce))
        : (ce = e[31]),
      e[32] !== z
        ? ((le =
            "" !== z &&
            (0, _.jsx)(S.default.View, {
              entering: E.FadeInDown.duration(180),
              style: j.toast,
              children: (0, _.jsx)(u.default, {
                style: j.toastText,
                children: z,
              }),
            })),
          (e[32] = z),
          (e[33] = le))
        : (le = e[33]);
    const me = null !== L,
      ue =
        "series" === L?.kind ? "Delete entire series" : "Delete match record";
    let he, fe, Ee, ge;
    return (
      e[34] === Symbol.for("react.memo_cache_sentinel")
        ? ((he = () => W(null)), (e[34] = he))
        : (he = e[34]),
      e[35] !== X || e[36] !== K || e[37] !== L
        ? ((fe = async () => {
            const e = L;
            W(null),
              "match" === e?.kind
                ? await X(e.match)
                : "series" === e?.kind && (await K(e.seriesId));
          }),
          (e[35] = X),
          (e[36] = K),
          (e[37] = L),
          (e[38] = fe))
        : (fe = e[38]),
      e[39] !== me || e[40] !== ue || e[41] !== fe
        ? ((Ee = (0, _.jsx)(p.DeletePasswordModal, {
            visible: me,
            title: ue,
            onCancel: he,
            onVerified: fe,
          })),
          (e[39] = me),
          (e[40] = ue),
          (e[41] = fe),
          (e[42] = Ee))
        : (Ee = e[42]),
      e[43] !== ne || e[44] !== ce || e[45] !== le || e[46] !== Ee
        ? ((ge = (0, _.jsxs)(l.default, {
            style: j.page,
            contentContainerStyle: j.content,
            refreshControl: ne,
            children: [re, ae, de, oe, ce, le, Ee],
          })),
          (e[43] = ne),
          (e[44] = ce),
          (e[45] = le),
          (e[46] = Ee),
          (e[47] = ge))
        : (ge = e[47]),
      ge
    );
  }
  function x(e) {
    const { pressed: t } = e;
    return [
      j.continueButton,
      t && { opacity: 0.82, transform: [{ scale: 0.99 }] },
    ];
  }
  function w() {
    return s.router.replace("/");
  }
  function T(e) {
    const [t, s, n] = e.split("-").map(Number);
    return new Date(t, s - 1, n).toLocaleDateString(void 0, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  function A(e) {
    return (0, y.describeMatchResult)({
      status: e.status,
      resultType: e.result_type,
      winnerSide: e.winner_side,
      teamA: e.team_a,
      teamB: e.team_b,
      battingFirst: e.batting_first,
      matchType: e.match_type,
      superOver: "normal" === e.match_type && Boolean(e.super_over_balls),
      scores: [
        { runs: e.score1, wickets: e.wickets1 },
        { runs: e.score2, wickets: e.wickets2 },
        { runs: e.score3, wickets: e.wickets3 },
        { runs: e.score4, wickets: e.wickets4 },
      ],
      teamSizes: { A: e.teamSizeA, B: e.teamSizeB },
    });
  }
  const j = m.default.create({
    page: { flex: 1, backgroundColor: C.bg },
    content: {
      padding: 22,
      paddingTop: 45,
      paddingBottom: 50,
      maxWidth: 760,
      width: "100%",
      alignSelf: "center",
    },
    back: {
      color: C.green,
      fontSize: 12,
      fontWeight: "800",
      letterSpacing: 1,
      marginBottom: 28,
    },
    kicker: {
      color: C.green,
      fontSize: 10,
      fontWeight: "800",
      letterSpacing: 3,
    },
    title: { color: C.white, fontSize: 32, fontWeight: "900", marginTop: 8 },
    hint: { color: C.muted, fontSize: 13, lineHeight: 20, marginTop: 7 },
    empty: {
      marginTop: 24,
      padding: 24,
      backgroundColor: C.card,
      borderWidth: 1,
      borderColor: C.border,
      borderRadius: 14,
      alignItems: "center",
    },
    emptyIcon: { fontSize: 34, marginBottom: 10 },
    emptyTitle: { color: C.white, fontSize: 16, fontWeight: "800" },
    dayGroup: { marginTop: 24 },
    dayHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: 9,
      borderBottomWidth: 1,
      borderBottomColor: C.border,
    },
    dayTitle: { color: C.white, fontSize: 14, fontWeight: "900" },
    dayCount: { color: C.green, fontSize: 9, fontWeight: "900" },
    card: {
      marginTop: 11,
      padding: 16,
      backgroundColor: C.card,
      borderWidth: 1,
      borderColor: C.border,
      borderRadius: 14,
    },
    top: { flexDirection: "row", justifyContent: "space-between" },
    status: {
      color: C.green,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1,
    },
    date: { color: C.muted, fontSize: 10 },
    teams: { color: C.white, fontSize: 18, fontWeight: "900", marginTop: 14 },
    vs: { color: C.muted, fontSize: 12 },
    meta: { color: C.muted, fontSize: 11, marginTop: 8 },
    result: { color: C.green, fontSize: 13, fontWeight: "900", marginTop: 9 },
    continueButton: {
      marginTop: 15,
      backgroundColor: C.green,
      borderRadius: 9,
      paddingVertical: 13,
      paddingHorizontal: 15,
      alignItems: "center",
    },
    continueText: {
      color: C.bg,
      fontSize: 11,
      fontWeight: "900",
      letterSpacing: 1,
    },
    controls: {
      flexDirection: "row",
      gap: 14,
      alignItems: "center",
      flexWrap: "wrap",
      marginTop: 15,
    },
    delete: { color: C.red, fontSize: 9, fontWeight: "800", letterSpacing: 1 },
    deleteConfirm: {
      color: C.red,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1,
    },
    open: {
      color: C.green,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 1,
      marginTop: 15,
    },
    toast: {
      position: "absolute",
      bottom: 26,
      alignSelf: "center",
      backgroundColor: C.green,
      borderRadius: 20,
      paddingHorizontal: 17,
      paddingVertical: 11,
    },
    toastText: { color: C.bg, fontSize: 11, fontWeight: "900" },
  });
});
