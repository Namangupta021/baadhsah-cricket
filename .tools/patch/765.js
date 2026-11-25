// module 765 from match-setup-4f50c3f7794ce060b27a5e13fffa824a.js deps=[863,771,772,12,228,238,104,245,133,28,188,255,227,109,862,6]
(function (g, r, i, a, m, _e, _d) {
  "use strict";
  function e(e) {
    return e && e.__esModule ? e : { default: e };
  }
  Object.defineProperty(_e, "__esModule", { value: !0 }),
    Object.defineProperty(_e, "default", {
      enumerable: !0,
      get: function () {
        return A;
      },
    });
  var t = (function (e) {
      if (e && e.__esModule) return e;
      var t = {};
      return (
        e &&
          Object.keys(e).forEach(function (l) {
            if ("default" !== l) {
              var s = Object.getOwnPropertyDescriptor(e, l);
              Object.defineProperty(
                t,
                l,
                s.get
                  ? s
                  : {
                      enumerable: !0,
                      get: function () {
                        return e[l];
                      },
                    },
              );
            }
          }),
        (t.default = e),
        t
      );
    })(r(_d[0])),
    l = r(_d[1]),
    s = r(_d[2]),
    n = r(_d[3]),
    d = e(r(_d[4])),
    o = e(r(_d[5]));
  r(_d[6]);
  var c = e(r(_d[7])),
    u = e(r(_d[8])),
    p = e(r(_d[9])),
    h = e(r(_d[10])),
    f = e(r(_d[11]));
  r(_d[12]);
  var y = e(r(_d[13])),
    x = r(_d[14]),
    b = e(x),
    T = r(_d[15]);
  const j = [
      "BJS turf",
      "Baarat ghar",
      "Rinku Park",
      "Surtal",
      "Cp turf",
      "Bindra park",
    ],
    S = {
      bg: "#080D0B",
      card: "#111A15",
      green: "#B7F34A",
      white: "#F5F7F2",
      muted: "#89948B",
      border: "#26332A",
    };
  function A() {
    const e = (0, s.useSQLiteContext)(),
      p = (0, l.useLocalSearchParams)(),
      A = "string" == typeof p.seriesId ? p.seriesId : void 0,
      [E, N] = (0, n.useState)(!1),
      [w, R] = (0, n.useState)(1),
      [O, _] = (0, n.useState)(null),
      [v, I] = (0, n.useState)("duo"),
      [k, P] = (0, n.useState)(""),
      [B, L] = (0, n.useState)(j),
      [D, M] = (0, n.useState)(""),
      [W, F] = (0, n.useState)("6"),
      [U, H] = (0, n.useState)("11"),
      [z, V] = (0, n.useState)("11"),
      [$, Y] = (0, n.useState)("Match 1"),
      [G, K] = (0, n.useState)("A"),
      [X, J] = (0, n.useState)("bat"),
      [q, Q] = (0, n.useState)(""),
      [Z, ee] = (0, n.useState)(""),
      [te, re] = (0, n.useState)([]),
      [ae, le] = (0, n.useState)(""),
      [se, ie] = (0, n.useState)(""),
      [ne, de] = (0, n.useState)({}),
      [oe, ce] = (0, n.useState)({}),
      [ue, pe] = (0, n.useState)("A"),
      [he, me] = (0, n.useState)(""),
      [fe, ye] = (0, n.useState)(""),
      [xe, ge] = (0, n.useState)({}),
      [be, Te] = (0, n.useState)({}),
      [je, Se] = (0, n.useState)(!1),
      [Ae, Ce] = (0, n.useState)(""),
      [Ee, Ne] = (0, n.useState)("Strangers"),
      [we, Re] = (0, n.useState)(""),
      [Oe, ve] = (0, n.useState)(!1),
      [Ie, ke] = (0, n.useState)(null),
      [Pe, Be] = (0, n.useState)(!1);
    (0, n.useEffect)(() => {
      Promise.all([
        e.getAllAsync(
          "SELECT id,name,player_type FROM players WHERE is_active=1 ORDER BY name COLLATE NOCASE",
        ),
        e.getAllAsync(
          "SELECT ground_name FROM grounds ORDER BY ground_name COLLATE NOCASE",
        ),
      ])
        .then(async ([t, l]) => {
          if (
            (re(t), L([...new Set([...j, ...l.map((e) => e.ground_name)])]), A)
          ) {
            const t = await e.getFirstAsync(
              "SELECT id,team_a,team_b,batting_first,match_type,batting_mode,ground,overs,series_match_number FROM matches WHERE series_id=? ORDER BY series_match_number DESC LIMIT 1",
              A,
            );
            if (t) {
              const l = await e.getAllAsync(
                "SELECT p.id,p.name,mp.team_side,mp.is_captain,mp.is_wicketkeeper,COALESCE(mp.is_common,0) AS is_common,p.player_type FROM match_players mp JOIN players p ON p.id=mp.player_id WHERE mp.match_id=?",
                t.id,
              );
              re((e) => [
                ...e,
                ...l.filter((t) => !e.some((e) => e.id === t.id)),
              ]),
                N(!0),
                R(2),
                _(t.match_type),
                I(t.batting_mode ?? "duo"),
                P(t.ground ?? ""),
                F(String(t.overs)),
                Q(t.team_a),
                ee(t.team_b),
                Y(`Match ${t.series_match_number + 1}`),
                de(Object.fromEntries(l.map((e) => [e.id, e.is_common ? "C" : e.team_side]))),
                le(
                  l.find((e) => e.is_captain && "A" === e.team_side)?.id ?? "",
                ),
                ie(
                  l.find((e) => e.is_captain && "B" === e.team_side)?.id ?? "",
                );
              const s = l.some(
                (e) => "opponent" === e.player_type && "B" === e.team_side,
              );
              Se(s),
                Ne(t.team_b),
                me(
                  l.find((e) => e.is_wicketkeeper && "A" === e.team_side)?.id ??
                    "",
                ),
                ye(
                  l.find((e) => e.is_wicketkeeper && "B" === e.team_side)?.id ??
                    "",
                ),
                H(String(l.filter((e) => "A" === e.team_side && !e.is_common).length)),
                V(String(l.filter((e) => "B" === e.team_side && !e.is_common).length));
            }
          }
        })
        .catch(() => Re("Could not load players and grounds."));
    }, [e, A]),
      (0, n.useEffect)(() => {
        te.length &&
          e
            .getAllAsync(
              "SELECT p.id,\n      COUNT(DISTINCT CASE WHEN m.status='completed' THEN m.id END) AS matches,\n      COALESCE(SUM(CASE WHEN m.status='completed' AND m.winner_side=mp.team_side THEN 1 ELSE 0 END),0) AS wins,\n      COALESCE(SUM(CASE WHEN m.status='completed' AND m.result_type='draw' THEN 1 ELSE 0 END),0) AS draws\n      FROM players p LEFT JOIN match_players mp ON mp.player_id=p.id AND mp.is_captain=1\n      LEFT JOIN matches m ON m.id=mp.match_id GROUP BY p.id",
            )
            .then((e) => Te(Object.fromEntries(e.map((e) => [e.id, e]))))
            .catch(() => Te({}));
      }, [e, te]),
      (0, n.useEffect)(() => {
        k &&
          e
            .getAllAsync(
              "SELECT p.id,\n      (SELECT COALESCE(SUM(d.runs_bat),0) FROM deliveries d JOIN matches m ON m.id=d.match_id WHERE d.batter=p.name AND lower(trim(m.ground))=lower(trim(?))) AS runs,\n      (SELECT COALESCE(SUM(d.wicket),0) FROM deliveries d JOIN matches m ON m.id=d.match_id WHERE d.bowler=p.name AND d.wicket=1 AND COALESCE(d.dismissal,'') NOT IN ('Run out','Retired hurt','Obstructing the field','Timed out') AND lower(trim(m.ground))=lower(trim(?))) AS wickets,\n      (SELECT COUNT(DISTINCT d.match_id) FROM deliveries d JOIN matches m ON m.id=d.match_id WHERE (d.batter=p.name OR d.bowler=p.name) AND lower(trim(m.ground))=lower(trim(?))) AS innings\n      FROM players p WHERE p.is_active=1",
              k,
              k,
              k,
            )
            .then((e) => ge(Object.fromEntries(e.map((e) => [e.id, e]))))
            .catch(() => ge({}));
      }, [e, k]);
    const Le = Math.max(1, Math.min(15, Number(U) || 11)),
      De = Math.max(1, Math.min(15, Number(z) || 11)),
      Me = (0, n.useMemo)(() => te.filter((e) => "A" === ne[e.id]), [ne, te]),
      We = (0, n.useMemo)(() => te.filter((e) => "B" === ne[e.id]), [ne, te]),
      Fe = (0, n.useMemo)(() => new Set(Object.keys(ne)), [ne]),
      Ue = te.filter((e) => !Fe.has(e.id)),
      commonPlayers = te.filter((e) => "C" === ne[e.id]),
      He = Me.length >= Le ? "B" : We.length >= De ? "A" : ue,
      ze = te.find((e) => e.id === ae)?.name ?? "Captain A",
      Ve = te.find((e) => e.id === se)?.name ?? "Captain B",
      $e = te.filter((e) => "club" === e.player_type),
      Ye = te.filter((e) => "opponent" === e.player_type),
      Ge = E ? q : `${ze} ${Me.length + commonPlayers.length}`,
      Ke = E ? Z : je ? Ee.trim() || "Opponents" : `${Ve} ${We.length + commonPlayers.length}`,
      Xe = E ? 2 : 5,
      Je = (0, T.jsxs)(T.Fragment, {
        children: [
          (0, T.jsx)(h.default, { style: C.label, children: "MATCH NAME" }),
          (0, T.jsx)(f.default, {
            style: C.input,
            value: $,
            onChangeText: Y,
            placeholder: "e.g. Sunday Series \xb7 Match 1",
            placeholderTextColor: S.muted,
          }),
          (0, T.jsx)(h.default, { style: C.label, children: "TOSS WINNER" }),
          (0, T.jsxs)(y.default, {
            style: C.row,
            children: [
              (0, T.jsx)(c.default, {
                onPress: () => K("A"),
                style: [C.sideButton, "A" === G && C.active],
                children: (0, T.jsx)(h.default, {
                  style: [C.sideText, "A" === G && C.activeText],
                  children: Ge,
                }),
              }),
              (0, T.jsx)(c.default, {
                onPress: () => K("B"),
                style: [C.sideButton, "B" === G && C.active],
                children: (0, T.jsx)(h.default, {
                  style: [C.sideText, "B" === G && C.activeText],
                  children: Ke,
                }),
              }),
            ],
          }),
          (0, T.jsx)(h.default, { style: C.label, children: "TOSS DECISION" }),
          (0, T.jsxs)(y.default, {
            style: C.row,
            children: [
              (0, T.jsx)(c.default, {
                onPress: () => J("bat"),
                style: [C.sideButton, "bat" === X && C.active],
                children: (0, T.jsx)(h.default, {
                  style: [C.sideText, "bat" === X && C.activeText],
                  children: "BAT FIRST",
                }),
              }),
              (0, T.jsx)(c.default, {
                onPress: () => J("bowl"),
                style: [C.sideButton, "bowl" === X && C.active],
                children: (0, T.jsx)(h.default, {
                  style: [C.sideText, "bowl" === X && C.activeText],
                  children: "BOWL FIRST",
                }),
              }),
            ],
          }),
        ],
      });
    function qe(e) {
      if (Me.length >= Le && We.length >= De) return;
      const t = Me.length >= Le ? "B" : We.length >= De ? "A" : ue;
      de((l) => ({ ...l, [e.id]: t })), pe("A" === t ? "B" : "A"), Re("");
    }
    function Qe(e, t) {
      ("A" === e && se === t.id) || ("B" === e && ae === t.id)
        ? Re("Choose two different captains.")
        : ("A" === e ? le(t.id) : ie(t.id), Re(""));
    }
    async function Ze() {
      if (!O) return Re("Choose Normal or Test first.");
      if (!k) return Re("Choose a ground first.");
      if (!$.trim()) return Re("Enter a match name.");
      if (!ae || !se) return Re("Select both captains before drafting.");
      if (Me.length < 1 || We.length < 1)
        return Re("Draft at least one player to each captain\u2019s team.");
      if (!he || !fe) return Re("Choose a wicketkeeper for each team.");
      const s = Number(U),
        n = Number(z);
      if (!E && ![s, n].every((e) => Number.isInteger(e) && e >= 1 && e <= 15))
        return Re("Each team size must be a whole number from 1 to 15.");
      const d = Number(W);
      if (!Number.isInteger(d) || d < 1 || d > 200)
        return Re("Overs must be a whole number from 1 to 200.");
      try {
        ve(!0);
        const s = t.randomUUID(),
          n = A ?? t.randomUUID(),
          o = Ge,
          c = Ke,
          u = "bat" === X ? G : "A" === G ? "B" : "A";
        await e.withTransactionAsync(async () => {
          if (!A) {
            const t = new Date(),
              l = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
            await e.runAsync(
              "INSERT INTO match_series(id,series_date,match_type) VALUES(?,?,?)",
              n,
              l,
              O,
            );
          }
          const l = await e.getFirstAsync(
            "SELECT COALESCE(MAX(series_match_number),0)+1 AS number FROM matches WHERE series_id=?",
            n,
          );
          (await e.getFirstAsync(
            "SELECT id FROM grounds WHERE lower(trim(ground_name))=lower(trim(?)) LIMIT 1",
            k,
          )) ||
            (await e.runAsync(
              "INSERT INTO grounds(id,ground_name) VALUES(?,?)",
              t.randomUUID(),
              k,
            )),
            await e.runAsync(
              "INSERT INTO matches(id,match_name,team_a,team_b,batting_first,toss_winner,toss_decision,ground,overs,match_type,batting_mode,series_id,series_match_number,status) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?, 'live')",
              s,
              $.trim(),
              o,
              c,
              "A" === u ? o : c,
              G,
              X,
              k,
              d,
              O,
              v,
              n,
              l?.number ?? 1,
            );
          for (const t of Me)
            await e.runAsync(
              "INSERT INTO match_players(match_id,team_side,player_id,is_captain,is_wicketkeeper) VALUES(?,?,?,?,?)",
              s,
              "A",
              t.id,
              Number(t.id === ae),
              Number(t.id === he),
            );
          for (const t of We)
            await e.runAsync(
              "INSERT INTO match_players(match_id,team_side,player_id,is_captain,is_wicketkeeper) VALUES(?,?,?,?,?)",
              s,
              "B",
              t.id,
              Number(t.id === se),
              Number(t.id === fe),
            );
          for (const t of commonPlayers)
            await e.runAsync(
              "INSERT INTO match_players(match_id,team_side,player_id,is_captain,is_wicketkeeper,is_common) VALUES(?,?,?,0,0,1)",
              s,
              "A",
              t.id,
            );
        }),
          l.router.replace({ pathname: "/scoring/[id]", params: { id: s } });
      } catch (e) {
        ve(!1),
          console.error("Match creation failed", e),
          Re(
            e instanceof Error
              ? `Could not create the match: ${e.message}`
              : "Could not create the match.",
          );
      }
    }
    return (0, T.jsxs)(u.default, {
      style: C.page,
      contentContainerStyle: C.content,
      children: [
        (0, T.jsx)(c.default, {
          onPress: () => (w > 1 ? R(w - 1) : l.router.back()),
          children: (0, T.jsxs)(h.default, {
            style: C.back,
            children: ["\u2039  ", w > 1 ? "BACK" : "DASHBOARD"],
          }),
        }),
        (0, T.jsxs)(h.default, {
          style: C.kicker,
          children: ["MATCH DAY \xb7 STEP ", w, " OF ", Xe],
        }),
        (0, T.jsx)(y.default, {
          style: C.progressRow,
          children: Array.from({ length: Xe }, (e, t) => t + 1).map((e) =>
            (0, T.jsx)(
              y.default,
              { style: [C.progressTrack, e <= w && C.progressActive] },
              e,
            ),
          ),
        }),
        1 === w &&
          (0, T.jsxs)(T.Fragment, {
            children: [
              (0, T.jsx)(h.default, {
                style: C.title,
                children: "Choose match type",
              }),
              (0, T.jsx)(h.default, {
                style: C.hint,
                children:
                  "Normal and Test matches are kept in separate leaderboards.",
              }),
              (0, T.jsx)(y.default, {
                style: C.column,
                children: ["normal", "test"].map((e, t) =>
                  (0, T.jsx)(
                    b.default.View,
                    {
                      entering: x.FadeInDown.delay(60 * t).duration(250),
                      children: (0, T.jsxs)(c.default, {
                        onPress: () => {
                          _(e), F("test" === e ? "90" : "6");
                        },
                        style: ({ pressed: t }) => [
                          C.option,
                          O === e && C.active,
                          t && C.pressed,
                        ],
                        children: [
                          (0, T.jsx)(h.default, {
                            style: [C.optionTitle, O === e && C.activeText],
                            children: "normal" === e ? "NORMAL" : "TEST",
                          }),
                          (0, T.jsx)(h.default, {
                            style: C.hint,
                            children:
                              "normal" === e
                                ? "Regular club match"
                                : "Test match \xb7 long format",
                          }),
                        ],
                      }),
                    },
                    e,
                  ),
                ),
              }),
              (0, T.jsx)(h.default, {
                style: C.label,
                children: "BATTING MODE",
              }),
              (0, T.jsx)(y.default, {
                style: C.row,
                children: ["single", "duo"].map((e) =>
                  (0, T.jsx)(
                    c.default,
                    {
                      onPress: () => I(e),
                      style: [C.sideButton, v === e && C.active],
                      children: (0, T.jsxs)(h.default, {
                        style: [C.sideText, v === e && C.activeText],
                        children: [
                          e.toUpperCase(),
                          " \xb7 ",
                          "single" === e
                            ? "ONE BATTER AT CREASE"
                            : "TWO BATTERS",
                        ],
                      }),
                    },
                    e,
                  ),
                ),
              }),
              (0, T.jsx)(c.default, {
                style: C.primary,
                onPress: () => (O ? R(2) : Re("Choose a match type.")),
                children: (0, T.jsx)(h.default, {
                  style: C.primaryText,
                  children: "NEXT \xb7 SELECT GROUND \u2192",
                }),
              }),
            ],
          }),
        2 === w &&
          (0, T.jsxs)(T.Fragment, {
            children: [
              (0, T.jsx)(h.default, {
                style: C.title,
                children: E ? "Next match in series" : "Choose a ground",
              }),
              (0, T.jsx)(h.default, {
                style: C.hint,
                children: E
                  ? "Teams and captains are carried over. Set the overs for this match."
                  : "Select where the match is being played. Ground records help suggest players for the draft.",
              }),
              (0, T.jsx)(y.default, {
                style: C.chips,
                children: B.map((e) =>
                  (0, T.jsx)(
                    c.default,
                    {
                      onPress: () => P(e),
                      style: [C.chip, k === e && C.active],
                      children: (0, T.jsx)(h.default, {
                        style: [C.sideText, k === e && C.activeText],
                        children: e,
                      }),
                    },
                    e,
                  ),
                ),
              }),
              (0, T.jsx)(h.default, {
                style: C.label,
                children: "ADD A GROUND",
              }),
              (0, T.jsxs)(y.default, {
                style: C.row,
                children: [
                  (0, T.jsx)(f.default, {
                    style: [C.input, { flex: 1 }],
                    value: D,
                    onChangeText: M,
                    placeholder: "Ground name",
                    placeholderTextColor: S.muted,
                  }),
                  (0, T.jsx)(c.default, {
                    style: C.secondary,
                    onPress: function () {
                      const e = D.trim();
                      if (!e) return;
                      const t =
                        B.find((t) => t.toLowerCase() === e.toLowerCase()) ?? e;
                      L((e) =>
                        e.some((e) => e.toLowerCase() === t.toLowerCase())
                          ? e
                          : [...e, t],
                      ),
                        P(t),
                        M(""),
                        Re("");
                    },
                    children: (0, T.jsx)(h.default, {
                      style: C.sideText,
                      children: "ADD",
                    }),
                  }),
                ],
              }),
              (0, T.jsx)(h.default, {
                style: C.label,
                children: "OVERS PER INNINGS",
              }),
              (0, T.jsx)(f.default, {
                style: C.input,
                value: W,
                onChangeText: F,
                keyboardType: "number-pad",
                placeholder: "6",
                placeholderTextColor: S.muted,
              }),
              E && (0, T.jsx)(T.Fragment, { children: Je }),
              (0, T.jsx)(c.default, {
                style: C.primary,
                onPress: () => {
                  k ? (E ? Ze() : R(3)) : Re("Choose a ground.");
                },
                children: (0, T.jsx)(h.default, {
                  style: C.primaryText,
                  children: E
                    ? "START NEXT MATCH \u2192"
                    : "NEXT \xb7 CHOOSE CAPTAINS \u2192",
                }),
              }),
            ],
          }),
        3 === w &&
          (0, T.jsxs)(T.Fragment, {
            children: [
              (0, T.jsx)(h.default, {
                style: C.title,
                children: "Choose captains",
              }),
              (0, T.jsx)(h.default, {
                style: C.hint,
                children:
                  "The captain\u2019s name becomes the team name. Captains are included in their teams.",
              }),
              !te.length &&
                (0, T.jsx)(h.default, {
                  style: C.error,
                  children: "Add player profiles before setting up a match.",
                }),
              "normal" === O &&
                (0, T.jsxs)(T.Fragment, {
                  children: [
                    (0, T.jsx)(h.default, {
                      style: C.label,
                      children: "OPPONENT TYPE",
                    }),
                    (0, T.jsxs)(y.default, {
                      style: C.row,
                      children: [
                        (0, T.jsx)(c.default, {
                          onPress: () => {
                            Se(!1), ie(""), de({});
                          },
                          style: [C.sideButton, !je && C.active],
                          children: (0, T.jsx)(h.default, {
                            style: [C.sideText, !je && C.activeText],
                            children: "OUR PLAYERS",
                          }),
                        }),
                        (0, T.jsx)(c.default, {
                          onPress: () => {
                            Se(!0), ie(""), de({});
                          },
                          style: [C.sideButton, je && C.active],
                          children: (0, T.jsx)(h.default, {
                            style: [C.sideText, je && C.activeText],
                            children: "CHAPRIS / STRANGERS",
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              je &&
                (0, T.jsxs)(T.Fragment, {
                  children: [
                    (0, T.jsx)(h.default, {
                      style: C.label,
                      children: "OPPONENT TEAM NAME",
                    }),
                    (0, T.jsx)(f.default, {
                      style: C.input,
                      value: Ee,
                      onChangeText: Ne,
                      placeholder: "e.g. Strangers",
                      placeholderTextColor: S.muted,
                    }),
                    (0, T.jsx)(h.default, {
                      style: C.label,
                      children: "ADD OPPONENT TO SAVED LIST",
                    }),
                    (0, T.jsxs)(y.default, {
                      style: C.row,
                      children: [
                        (0, T.jsx)(f.default, {
                          style: [C.input, { flex: 1 }],
                          value: Ae,
                          onChangeText: Ce,
                          placeholder: "Opponent player name",
                          placeholderTextColor: S.muted,
                        }),
                        (0, T.jsx)(c.default, {
                          style: C.secondary,
                          onPress: async function () {
                            const l = Ae.trim();
                            if (!l)
                              return Re(
                                "Enter the opponent player\u2019s name.",
                              );
                            if (
                              te.some(
                                (e) =>
                                  e.name.toLocaleLowerCase() ===
                                  l.toLocaleLowerCase(),
                              )
                            )
                              return Re(
                                "That name is already in the player list.",
                              );
                            const s = {
                              id: t.randomUUID(),
                              name: l,
                              player_type: "opponent",
                            };
                            try {
                              await e.runAsync(
                                "INSERT INTO players(id,name,player_type) VALUES(?,?, 'opponent')",
                                s.id,
                                s.name,
                              ),
                                re((e) => [...e, s]),
                                Ce(""),
                                Re("");
                            } catch {
                              Re("Could not save opponent player.");
                            }
                          },
                          children: (0, T.jsx)(h.default, {
                            style: C.sideText,
                            children: "ADD",
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              (0, T.jsx)(h.default, {
                style: C.label,
                children: "CAPTAIN 1 \xb7 OUR TEAM",
              }),
              (0, T.jsx)(y.default, {
                style: C.chips,
                children: $e
                  .filter((e) => e.id !== se)
                  .map((e) => {
                    const t = be[e.id];
                    return (0, T.jsxs)(
                      c.default,
                      {
                        onPress: () => Qe("A", e),
                        style: [C.captainChoice, ae === e.id && C.active],
                        children: [
                          (0, T.jsx)(h.default, {
                            style: [C.sideText, ae === e.id && C.activeText],
                            children: e.name,
                          }),
                          (0, T.jsxs)(h.default, {
                            style: C.captainRecord,
                            children: [
                              t?.matches ?? 0,
                              " matches \xb7 ",
                              t?.wins ?? 0,
                              " wins \xb7 ",
                              t?.draws ?? 0,
                              " draws",
                            ],
                          }),
                        ],
                      },
                      e.id,
                    );
                  }),
              }),
              (0, T.jsx)(h.default, {
                style: C.label,
                children: je ? "OPPONENT CAPTAIN" : "CAPTAIN 2 \xb7 OUR TEAM",
              }),
              (0, T.jsx)(y.default, {
                style: C.chips,
                children: (je ? Ye : $e)
                  .filter((e) => e.id !== ae)
                  .map((e) => {
                    const t = be[e.id];
                    return (0, T.jsxs)(
                      c.default,
                      {
                        onPress: () => Qe("B", e),
                        style: [C.captainChoice, se === e.id && C.active],
                        children: [
                          (0, T.jsx)(h.default, {
                            style: [C.sideText, se === e.id && C.activeText],
                            children: e.name,
                          }),
                          !je &&
                            (0, T.jsxs)(h.default, {
                              style: C.captainRecord,
                              children: [
                                t?.matches ?? 0,
                                " matches \xb7 ",
                                t?.wins ?? 0,
                                " wins \xb7 ",
                                t?.draws ?? 0,
                                " draws",
                              ],
                            }),
                        ],
                      },
                      e.id,
                    );
                  }),
              }),
              (0, T.jsx)(h.default, {
                style: C.label,
                children: "PLAYERS IN EACH TEAM",
              }),
              (0, T.jsxs)(y.default, {
                style: C.row,
                children: [
                  (0, T.jsxs)(y.default, {
                    style: { flex: 1 },
                    children: [
                      (0, T.jsxs)(h.default, {
                        style: C.hint,
                        children: [ze, "\u2019s team"],
                      }),
                      (0, T.jsx)(f.default, {
                        style: C.input,
                        value: U,
                        onChangeText: H,
                        keyboardType: "number-pad",
                        placeholder: "11",
                        placeholderTextColor: S.muted,
                      }),
                    ],
                  }),
                  (0, T.jsxs)(y.default, {
                    style: { flex: 1 },
                    children: [
                      (0, T.jsxs)(h.default, {
                        style: C.hint,
                        children: [je ? Ee : Ve, "\u2019s team"],
                      }),
                      (0, T.jsx)(f.default, {
                        style: C.input,
                        value: z,
                        onChangeText: V,
                        keyboardType: "number-pad",
                        placeholder: "11",
                        placeholderTextColor: S.muted,
                      }),
                    ],
                  }),
                ],
              }),
              (0, T.jsx)(c.default, {
                style: C.primary,
                onPress: () => {
                  [Number(U), Number(z)].every(
                    (e) => Number.isInteger(e) && e >= 1 && e <= 15,
                  )
                    ? ae && se
                      ? (de({ [ae]: "A", [se]: "B" }),
                        me(ae),
                        ye(se),
                        pe("A"),
                        R(4),
                        Be(!0),
                        Re(""))
                      : Re("Choose two captains.")
                    : Re("Each team size must be a whole number from 1 to 15.");
                },
                children: (0, T.jsx)(h.default, {
                  style: C.primaryText,
                  children: "NEXT \xb7 DRAFT TEAMS \u2192",
                }),
              }),
            ],
          }),
        4 === w &&
          (0, T.jsxs)(T.Fragment, {
            children: [
              (0, T.jsx)(h.default, {
                style: C.title,
                children: "Draft the teams",
              }),
              (0, T.jsxs)(h.default, {
                style: C.hint,
                children: [
                  "Captains take turns picking. The suggested ground record is based on saved matches at ",
                  k,
                  ".",
                ],
              }),
              (0, T.jsxs)(y.default, {
                style: C.teamRow,
                children: [
                  (0, T.jsxs)(y.default, {
                    style: C.teamBox,
                    children: [
                      (0, T.jsxs)(h.default, {
                        style: C.teamName,
                        children: [ze, " ", Me.length],
                      }),
                      (0, T.jsxs)(h.default, {
                        style: C.hint,
                        children: [
                          Me.length,
                          "/",
                          Le,
                          " \xb7 ",
                          "A" === He ? "PICKING NEXT" : "",
                        ],
                      }),
                    ],
                  }),
                  (0, T.jsxs)(y.default, {
                    style: C.teamBox,
                    children: [
                      (0, T.jsxs)(h.default, {
                        style: C.teamName,
                        children: [je ? Ee : Ve, " ", We.length],
                      }),
                      (0, T.jsxs)(h.default, {
                        style: C.hint,
                        children: [
                          We.length,
                          "/",
                          De,
                          " \xb7 ",
                          "B" === He ? "PICKING NEXT" : "",
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              commonPlayers.length > 0 &&
                (0, T.jsxs)(y.default, {
                  style: [C.teamBox, { marginTop: 10, borderColor: S.green }],
                  children: [
                    (0, T.jsx)(h.default, {
                      style: C.label,
                      children: "COMMON PLAYER \xb7 PLAYS FOR BOTH TEAMS",
                    }),
                    (0, T.jsx)(h.default, {
                      style: C.hint,
                      children: "Bats and bowls for both sides. Tap a name to send them back to the pool.",
                    }),
                    (0, T.jsx)(y.default, {
                      style: C.chips,
                      children: commonPlayers.map((t) =>
                        (0, T.jsx)(
                          c.default,
                          {
                            onPress: () =>
                              de((l) => {
                                const n = { ...l };
                                return delete n[t.id], n;
                              }),
                            style: [C.chip, C.active],
                            children: (0, T.jsx)(h.default, {
                              style: [C.sideText, C.activeText],
                              children: t.name + "  \u2715",
                            }),
                          },
                          t.id,
                        ),
                      ),
                    }),
                  ],
                }),
              (0, T.jsxs)(h.default, {
                style: C.label,
                children: [
                  "COMMON PLAYER POOL \xb7 ",
                  "A" === He ? ze : Ve,
                  " PICKS NEXT",
                ],
              }),
              Ue.filter(
                (e) =>
                  e.player_type ===
                  ("A" === He ? "club" : je ? "opponent" : "club"),
              ).map((e, t) => {
                const l = xe[e.id],
                  s = Boolean(oe[e.id]);
                return (0, T.jsxs)(
                  b.default.View,
                  {
                    entering: x.FadeInDown.delay(28 * Math.min(t, 8)).duration(
                      220,
                    ),
                    style: [C.playerCard, s && C.playerUnavailable],
                    children: [
                      (0, T.jsxs)(c.default, {
                        disabled: s,
                        style: ({ pressed: e }) => [
                          C.playerCardMain,
                          e && C.pressed,
                        ],
                        onPress: () => ke(e),
                        children: [
                          (0, T.jsx)(y.default, {
                            style: C.avatar,
                            children: (0, T.jsx)(h.default, {
                              style: C.avatarText,
                              children: e.name.slice(0, 1).toUpperCase(),
                            }),
                          }),
                          (0, T.jsxs)(y.default, {
                            style: { flex: 1 },
                            children: [
                              (0, T.jsx)(h.default, {
                                style: C.playerName,
                                children: e.name,
                              }),
                              (0, T.jsx)(h.default, {
                                style: C.playerStats,
                                children: l?.innings
                                  ? `${l.runs} runs \xb7 ${l.wickets} wickets at ${k}`
                                  : `No recorded stats at ${k} yet`,
                              }),
                              (0, T.jsx)(h.default, {
                                style: C.tapHint,
                                children: "TAP FOR PLAYER CARD",
                              }),
                            ],
                          }),
                          (0, T.jsx)(h.default, {
                            style: C.pickArrow,
                            children: "\uff0b",
                          }),
                        ],
                      }),
                      (0, T.jsx)(c.default, {
                        style: C.availability,
                        onPress: () => ce((t) => ({ ...t, [e.id]: !t[e.id] })),
                        children: (0, T.jsx)(h.default, {
                          style: C.availabilityText,
                          children: s ? "AVAILABLE" : "NOT AVAILABLE",
                        }),
                      }),
                    ],
                  },
                  e.id,
                );
              }),
              (0, T.jsx)(h.default, {
                style: C.label,
                children: "WICKETKEEPER",
              }),
              ["A", "B"].map((e) => {
                const t = "A" === e ? Me : We,
                  l = "A" === e ? he : fe;
                return (0, T.jsxs)(
                  y.default,
                  {
                    children: [
                      (0, T.jsxs)(h.default, {
                        style: C.hint,
                        children: ["A" === e ? ze : Ve, "\u2019s team"],
                      }),
                      (0, T.jsx)(y.default, {
                        style: C.chips,
                        children: t.map((t) =>
                          (0, T.jsx)(
                            c.default,
                            {
                              onPress: () => ("A" === e ? me(t.id) : ye(t.id)),
                              style: [C.chip, l === t.id && C.active],
                              children: (0, T.jsx)(h.default, {
                                style: [C.sideText, l === t.id && C.activeText],
                                children: t.name,
                              }),
                            },
                            t.id,
                          ),
                        ),
                      }),
                    ],
                  },
                  e,
                );
              }),
              (0, T.jsx)(c.default, {
                style: C.primary,
                onPress: () => {
                  [Number(U), Number(z)].every(
                    (e) => Number.isInteger(e) && e >= 1 && e <= 15,
                  )
                    ? Me.length < 1 || We.length < 1
                      ? Re("Draft at least one player to each team.")
                      : he && fe
                        ? (Re(""), R(5))
                        : Re("Choose a wicketkeeper for each team.")
                    : Re("Each team size must be a whole number from 1 to 15.");
                },
                children: (0, T.jsx)(h.default, {
                  style: C.primaryText,
                  children: "NEXT \xb7 MATCH NAME & TOSS \u2192",
                }),
              }),
            ],
          }),
        5 === w &&
          (0, T.jsxs)(T.Fragment, {
            children: [
              (0, T.jsx)(h.default, {
                style: C.title,
                children: "Name & toss",
              }),
              (0, T.jsx)(h.default, {
                style: C.hint,
                children:
                  "Confirm the match label and record the toss before starting the scorecard.",
              }),
              (0, T.jsxs)(y.default, {
                style: C.teamRow,
                children: [
                  (0, T.jsxs)(y.default, {
                    style: C.teamBox,
                    children: [
                      (0, T.jsx)(h.default, {
                        style: C.teamName,
                        children: Ge,
                      }),
                      (0, T.jsxs)(h.default, {
                        style: C.hint,
                        children: ["Team A \xb7 ", Me.length, " players"],
                      }),
                    ],
                  }),
                  (0, T.jsxs)(y.default, {
                    style: C.teamBox,
                    children: [
                      (0, T.jsx)(h.default, {
                        style: C.teamName,
                        children: Ke,
                      }),
                      (0, T.jsxs)(h.default, {
                        style: C.hint,
                        children: ["Team B \xb7 ", We.length, " players"],
                      }),
                    ],
                  }),
                ],
              }),
              Je,
              (0, T.jsx)(c.default, {
                disabled: Oe,
                style: [C.primary, Oe && { opacity: 0.8 }],
                onPress: Ze,
                children: Oe
                  ? (0, T.jsx)(d.default, { color: S.bg })
                  : (0, T.jsxs)(h.default, {
                      style: C.primaryText,
                      children: ["START ", O?.toUpperCase(), " MATCH \u2192"],
                    }),
              }),
            ],
          }),
        we ? (0, T.jsx)(h.default, { style: C.error, children: we }) : null,
        (0, T.jsx)(o.default, {
          visible: Pe,
          transparent: !0,
          animationType: "fade",
          onRequestClose: () => {},
          children: (0, T.jsx)(y.default, {
            style: C.popupOverlay,
            children: (0, T.jsxs)(b.default.View, {
              entering: x.FadeInDown.duration(220),
              style: C.popup,
              children: [
                (0, T.jsx)(h.default, {
                  style: C.popupTag,
                  children: "TEAM DRAFT",
                }),
                (0, T.jsx)(h.default, {
                  style: C.popupName,
                  children: "Who picks first?",
                }),
                (0, T.jsx)(h.default, {
                  style: C.popupMeta,
                  children:
                    "Choose the captain who gets the first player pick.",
                }),
                (0, T.jsxs)(c.default, {
                  style: ({ pressed: e }) => [C.firstPickCard, e && C.pressed],
                  onPress: () => {
                    pe("A"), Be(!1);
                  },
                  children: [
                    (0, T.jsx)(y.default, {
                      style: C.avatar,
                      children: (0, T.jsx)(h.default, {
                        style: C.avatarText,
                        children: "A",
                      }),
                    }),
                    (0, T.jsxs)(y.default, {
                      style: { flex: 1 },
                      children: [
                        (0, T.jsx)(h.default, {
                          style: C.playerName,
                          children: ze,
                        }),
                        (0, T.jsx)(h.default, {
                          style: C.playerStats,
                          children: "Captain 1 \xb7 picks first",
                        }),
                      ],
                    }),
                    (0, T.jsx)(h.default, {
                      style: C.pickArrow,
                      children: "\u2192",
                    }),
                  ],
                }),
                (0, T.jsxs)(c.default, {
                  style: ({ pressed: e }) => [C.firstPickCard, e && C.pressed],
                  onPress: () => {
                    pe("B"), Be(!1);
                  },
                  children: [
                    (0, T.jsx)(y.default, {
                      style: C.avatar,
                      children: (0, T.jsx)(h.default, {
                        style: C.avatarText,
                        children: "B",
                      }),
                    }),
                    (0, T.jsxs)(y.default, {
                      style: { flex: 1 },
                      children: [
                        (0, T.jsx)(h.default, {
                          style: C.playerName,
                          children: je ? Ee : Ve,
                        }),
                        (0, T.jsx)(h.default, {
                          style: C.playerStats,
                          children: "Captain 2 \xb7 picks first",
                        }),
                      ],
                    }),
                    (0, T.jsx)(h.default, {
                      style: C.pickArrow,
                      children: "\u2192",
                    }),
                  ],
                }),
              ],
            }),
          }),
        }),
        (0, T.jsx)(o.default, {
          visible: null !== Ie,
          transparent: !0,
          animationType: "fade",
          onRequestClose: () => ke(null),
          children: (0, T.jsx)(y.default, {
            style: C.popupOverlay,
            children: (0, T.jsxs)(b.default.View, {
              entering: x.FadeInDown.duration(220),
              style: C.popup,
              children: [
                (0, T.jsx)(h.default, {
                  style: C.popupTag,
                  children: "PLAYER CARD \xb7 GROUND FORM",
                }),
                (0, T.jsxs)(y.default, {
                  style: C.popupIdentity,
                  children: [
                    (0, T.jsx)(y.default, {
                      style: C.popupAvatar,
                      children: (0, T.jsx)(h.default, {
                        style: C.popupAvatarText,
                        children: Ie?.name.slice(0, 1).toUpperCase(),
                      }),
                    }),
                    (0, T.jsxs)(y.default, {
                      style: { flex: 1 },
                      children: [
                        (0, T.jsx)(h.default, {
                          style: C.popupName,
                          children: Ie?.name,
                        }),
                        (0, T.jsxs)(h.default, {
                          style: C.popupMeta,
                          children: [
                            "Suggested for ",
                            "A" === He ? ze : je ? Ee : Ve,
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, T.jsxs)(y.default, {
                  style: C.popupStats,
                  children: [
                    (0, T.jsxs)(y.default, {
                      style: C.popupStat,
                      children: [
                        (0, T.jsx)(h.default, {
                          style: C.popupStatValue,
                          children: xe[Ie?.id ?? ""]?.runs ?? 0,
                        }),
                        (0, T.jsx)(h.default, {
                          style: C.popupStatLabel,
                          children: "RUNS HERE",
                        }),
                      ],
                    }),
                    (0, T.jsxs)(y.default, {
                      style: C.popupStat,
                      children: [
                        (0, T.jsx)(h.default, {
                          style: C.popupStatValue,
                          children: xe[Ie?.id ?? ""]?.wickets ?? 0,
                        }),
                        (0, T.jsx)(h.default, {
                          style: C.popupStatLabel,
                          children: "WICKETS",
                        }),
                      ],
                    }),
                    (0, T.jsxs)(y.default, {
                      style: C.popupStat,
                      children: [
                        (0, T.jsx)(h.default, {
                          style: C.popupStatValue,
                          children: xe[Ie?.id ?? ""]?.innings ?? 0,
                        }),
                        (0, T.jsx)(h.default, {
                          style: C.popupStatLabel,
                          children: "MATCHES",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, T.jsx)(c.default, {
                  style: ({ pressed: e }) => [C.primary, e && C.pressed],
                  onPress: () => {
                    Ie && qe(Ie), ke(null);
                  },
                  children: (0, T.jsxs)(h.default, {
                    style: C.primaryText,
                    children: ["PICK FOR ", "A" === He ? ze : je ? Ee : Ve],
                  }),
                }),
                (0, T.jsx)(c.default, {
                  style: ({ pressed: e }) => [C.popupSecondary, { marginTop: 10, alignItems: "center" }, e && C.pressed],
                  onPress: () => {
                    Ie && (de((e) => ({ ...e, [Ie.id]: "C" })), Re("")), ke(null);
                  },
                  children: (0, T.jsx)(h.default, {
                    style: C.popupSecondaryText,
                    children: "PLAYS FOR BOTH TEAMS (COMMON PLAYER)",
                  }),
                }),
                (0, T.jsxs)(y.default, {
                  style: C.popupActions,
                  children: [
                    (0, T.jsx)(c.default, {
                      style: C.popupSecondary,
                      onPress: () => {
                        Ie && ce((e) => ({ ...e, [Ie.id]: !e[Ie.id] })),
                          ke(null);
                      },
                      children: (0, T.jsx)(h.default, {
                        style: C.popupSecondaryText,
                        children: "MARK UNAVAILABLE",
                      }),
                    }),
                    (0, T.jsx)(c.default, {
                      style: C.popupSecondary,
                      onPress: () => ke(null),
                      children: (0, T.jsx)(h.default, {
                        style: C.popupSecondaryText,
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
  const C = p.default.create({
    page: { flex: 1, backgroundColor: S.bg },
    pressed: { transform: [{ scale: 0.98 }], opacity: 0.9 },
    progressRow: {
      flexDirection: "row",
      gap: 6,
      marginTop: 15,
      marginBottom: 7,
    },
    progressTrack: {
      flex: 1,
      height: 4,
      borderRadius: 4,
      backgroundColor: S.border,
    },
    progressActive: { backgroundColor: S.green },
    content: {
      padding: 22,
      paddingTop: 45,
      paddingBottom: 50,
      maxWidth: 760,
      width: "100%",
      alignSelf: "center",
    },
    back: {
      color: S.green,
      fontWeight: "800",
      fontSize: 12,
      letterSpacing: 1,
      marginBottom: 28,
    },
    kicker: {
      color: S.green,
      fontSize: 10,
      fontWeight: "800",
      letterSpacing: 3,
    },
    title: { color: S.white, fontSize: 32, fontWeight: "900", marginTop: 8 },
    hint: { color: S.muted, fontSize: 13, lineHeight: 20, marginTop: 7 },
    label: {
      color: S.muted,
      fontSize: 10,
      fontWeight: "800",
      letterSpacing: 1.4,
      marginTop: 24,
      marginBottom: 10,
    },
    row: { flexDirection: "row", gap: 10, alignItems: "center" },
    column: { gap: 12, marginTop: 22 },
    option: {
      backgroundColor: S.card,
      borderWidth: 1,
      borderColor: S.border,
      borderRadius: 14,
      padding: 18,
    },
    optionTitle: {
      color: S.white,
      fontSize: 16,
      fontWeight: "900",
      letterSpacing: 1,
    },
    input: {
      backgroundColor: S.card,
      borderWidth: 1,
      borderColor: S.border,
      borderRadius: 10,
      padding: 14,
      color: S.white,
    },
    chips: { flexDirection: "row", gap: 8, flexWrap: "wrap", marginTop: 8 },
    chip: {
      backgroundColor: S.card,
      borderWidth: 1,
      borderColor: S.border,
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 9,
    },
    captainChoice: {
      backgroundColor: S.card,
      borderWidth: 1,
      borderColor: S.border,
      paddingVertical: 11,
      paddingHorizontal: 12,
      borderRadius: 10,
      minWidth: 150,
    },
    captainRecord: { color: S.muted, fontSize: 9, marginTop: 4 },
    active: { borderColor: S.green, backgroundColor: "#202B18" },
    sideButton: {
      flex: 1,
      padding: 13,
      borderRadius: 10,
      backgroundColor: S.card,
      borderWidth: 1,
      borderColor: S.border,
      alignItems: "center",
    },
    sideText: { color: S.muted, fontWeight: "700", fontSize: 12 },
    activeText: { color: S.green },
    teamRow: { flexDirection: "row", gap: 10, marginTop: 22 },
    teamBox: {
      flex: 1,
      minWidth: 0,
      backgroundColor: S.card,
      borderColor: S.border,
      borderWidth: 1,
      borderRadius: 12,
      padding: 14,
    },
    teamName: { color: S.white, fontSize: 14, fontWeight: "900" },
    playerCard: {
      backgroundColor: S.card,
      borderColor: S.border,
      borderWidth: 1,
      borderRadius: 15,
      padding: 10,
      marginTop: 9,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
      shadowColor: S.green,
      shadowOpacity: 0.06,
      shadowRadius: 12,
      elevation: 2,
    },
    playerUnavailable: { opacity: 0.55 },
    playerCardMain: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 5,
    },
    avatar: {
      width: 42,
      height: 42,
      borderRadius: 14,
      backgroundColor: "#202B18",
      borderWidth: 1,
      borderColor: S.border,
      alignItems: "center",
      justifyContent: "center",
    },
    avatarText: { color: S.green, fontWeight: "900", fontSize: 16 },
    playerName: { color: S.white, fontWeight: "800" },
    playerStats: { color: S.muted, fontSize: 10, marginTop: 4 },
    tapHint: {
      color: S.green,
      fontSize: 8,
      fontWeight: "900",
      letterSpacing: 1,
      marginTop: 6,
    },
    pickArrow: {
      color: S.green,
      fontSize: 20,
      fontWeight: "900",
      paddingHorizontal: 8,
    },
    availability: {
      padding: 8,
      borderWidth: 1,
      borderColor: S.border,
      borderRadius: 8,
    },
    availabilityText: { color: S.muted, fontSize: 8, fontWeight: "800" },
    pick: { color: S.green, fontSize: 10, fontWeight: "900" },
    secondary: {
      padding: 14,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: S.border,
    },
    error: { color: "#FF8B80", marginTop: 14 },
    primary: {
      backgroundColor: S.green,
      padding: 18,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 22,
    },
    primaryText: { color: S.bg, fontWeight: "900", letterSpacing: 1 },
    popupOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.78)",
      alignItems: "center",
      justifyContent: "center",
      padding: 22,
    },
    popup: {
      width: "100%",
      maxWidth: 430,
      backgroundColor: S.card,
      borderColor: S.green,
      borderWidth: 1,
      borderRadius: 22,
      padding: 21,
    },
    popupTag: {
      color: S.green,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1.5,
    },
    popupIdentity: {
      flexDirection: "row",
      alignItems: "center",
      gap: 13,
      marginTop: 18,
    },
    popupAvatar: {
      width: 58,
      height: 58,
      borderRadius: 19,
      backgroundColor: "#202B18",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: S.border,
    },
    popupAvatarText: { color: S.green, fontSize: 23, fontWeight: "900" },
    popupName: { color: S.white, fontSize: 21, fontWeight: "900" },
    popupMeta: { color: S.muted, fontSize: 11, marginTop: 5 },
    popupStats: { flexDirection: "row", gap: 8, marginTop: 22 },
    popupStat: {
      flex: 1,
      alignItems: "center",
      backgroundColor: S.bg,
      borderColor: S.border,
      borderWidth: 1,
      borderRadius: 12,
      paddingVertical: 13,
    },
    popupStatValue: { color: S.white, fontSize: 18, fontWeight: "900" },
    popupStatLabel: {
      color: S.muted,
      fontSize: 7,
      fontWeight: "900",
      letterSpacing: 0.8,
      marginTop: 4,
    },
    popupActions: { flexDirection: "row", gap: 8, marginTop: 11 },
    popupSecondary: {
      flex: 1,
      alignItems: "center",
      padding: 12,
      borderWidth: 1,
      borderColor: S.border,
      borderRadius: 9,
    },
    popupSecondaryText: { color: S.muted, fontSize: 9, fontWeight: "900" },
    firstPickCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: S.bg,
      borderColor: S.border,
      borderWidth: 1,
      borderRadius: 14,
      padding: 13,
      gap: 12,
      marginTop: 12,
    },
  });
});
