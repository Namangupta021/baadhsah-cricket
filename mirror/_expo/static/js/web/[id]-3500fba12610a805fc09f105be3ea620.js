__d(function (g, r, i, a, _m, _e, _d) {
  "use strict";
  function e(e) {
    return e && e.__esModule ? e : { default: e };
  }
  Object.defineProperty(_e, "__esModule", { value: !0 }),
    Object.defineProperty(_e, "default", {
      enumerable: !0,
      get: function () {
        return w;
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
    o = e(r(_d[5])),
    c = e(r(_d[6])),
    u = e(r(_d[7]));
  r(_d[8]);
  var h = e(r(_d[9])),
    f = e(r(_d[10])),
    m = e(r(_d[11])),
    y = e(r(_d[12])),
    p = e(r(_d[13]));
  r(_d[14]);
  var x = e(r(_d[15])),
    b = r(_d[16]),
    T = r(_d[17]),
    j = r(_d[18]),
    E = r(_d[19]),
    S = r(_d[20]);
  const INNINGS_THEMES = [
    {
      bg: "#080D0B",
      card: "#111A15",
      green: "#B7F34A",
      tint: "#202B18",
      white: "#F5F7F2",
      muted: "#89948B",
      border: "#26332A",
      red: "#FF8B80",
    },
    {
      bg: "#070B13",
      card: "#0F1724",
      green: "#5CC8FF",
      tint: "#142A3D",
      white: "#F2F6FB",
      muted: "#8593A6",
      border: "#22324A",
      red: "#FF8B80",
    },
  ];
  const FX = {
    "FOUR!": { color: "#5CC8FF", text: "#04121C", flash: "#5CC8FF" },
    "SIX!": { color: "#FFC83D", text: "#1C1300", flash: "#FFC83D" },
    "WICKET!": { color: "#FF4D4D", text: "#FFFFFF", flash: "#FF1F1F" },
    "RUN OUT!": { color: "#FF8A1F", text: "#1C0D00", flash: "#FF8A1F" },
    "FIFTY!": { color: "#B7F34A", text: "#101806", flash: "#B7F34A" },
    "HUNDRED!": { color: "#B98CFF", text: "#170B2B", flash: "#B98CFF" },
    "HAT-TRICK!": { color: "#FF6B4A", text: "#2B0800", flash: "#FF6B4A" },
  };
  const BOWLER_DISMISSALS = new Set([
    "run out",
    "retired hurt",
    "obstructing the field",
    "timed out",
  ]);
  function bowlerWicket(d, bowler) {
    return d?.bowler === bowler && d?.wicket && !BOWLER_DISMISSALS.has(String(d.wicket).toLowerCase());
  }
  const STYLE_CACHE = new Map();
  function inningsInfo(match, k) {
    const first = match.batting_first,
      second = first === match.team_a ? match.team_b : match.team_a,
      so = "normal" === match.match_type && k > 2;
    if (!so) return { so, round: 0, chase: k % 2 == 0, batting: k % 2 == 1 ? first : second, balls: 6 * match.overs };
    const idx = k - 3,
      leadoff = ((idx >> 1) % 2 == 0) ? second : first;
    return {
      so,
      round: (idx >> 1) + 1,
      chase: idx % 2 == 1,
      batting: idx % 2 == 0 ? leadoff : leadoff === first ? second : first,
      balls: match.super_over_balls || 6,
    };
  }
  function w() {
    const { id: e } = (0, l.useLocalSearchParams)(),
      m = (0, s.useSQLiteContext)(),
      [w, A] = (0, n.useState)(null),
      [B, _] = (0, n.useState)([]),
      [v, W] = (0, n.useState)([]),
      [O, k] = (0, n.useState)(1),
      C = INNINGS_THEMES[(O - 1) % 2],
      R = STYLE_CACHE.get(C) ?? (STYLE_CACHE.set(C, makeStyles(C)), STYLE_CACHE.get(C)),
      [N, D] = (0, n.useState)(""),
      [L, I] = (0, n.useState)(""),
      [P, U] = (0, n.useState)(""),
      [M, z] = (0, n.useState)(!1),
      [H, F] = (0, n.useState)(!1),
      [V, $] = (0, n.useState)("striker"),
      [q, Y] = (0, n.useState)(""),
      [G, K] = (0, n.useState)(""),
      [X] = (0, n.useState)(() => new o.default.Value(0.45)),
      [J] = (0, n.useState)(() => new o.default.Value(0)),
      [fxX] = (0, n.useState)(() => new o.default.Value(0)),
      [fxY] = (0, n.useState)(() => new o.default.Value(0)),
      [fxRot] = (0, n.useState)(() => new o.default.Value(0)),
      [fxFlash] = (0, n.useState)(() => new o.default.Value(0)),
      [fxSub, setFxSub] = (0, n.useState)(""),
      [soPrompt, setSoPrompt] = (0, n.useState)(""),
      [Q, Z] = (0, n.useState)(!1),
      [ee, te] = (0, n.useState)(!1),
      [re, le] = (0, n.useState)(!1),
      [se, ae] = (0, n.useState)(""),
      [ie, ne] = (0, n.useState)("A"),
      [de, oe] = (0, n.useState)(null),
      [ce, ue] = (0, n.useState)(""),
      [he, fe] = (0, n.useState)(""),
      [me, ye] = (0, n.useState)(""),
      [ge, pe] = (0, n.useState)(0),
      [xe, be] = (0, n.useState)(!0),
      [Te, je] = (0, n.useState)(""),
      [Ee, Se] = (0, n.useState)(0),
      Ce = (0, n.useCallback)(async () => {
        try {
          const t = await m.getFirstAsync(
            "SELECT * FROM matches WHERE id=?",
            e,
          );
          if (!t) return void je("Match not found.");
          if ((A(t), t.current_innings !== O)) return void k(t.current_innings);
          const l = await m.getAllAsync(
            "SELECT p.id,p.name,mp.team_side,mp.is_wicketkeeper,COALESCE(mp.is_common,0) AS is_common FROM match_players mp JOIN players p ON p.id=mp.player_id WHERE mp.match_id=? ORDER BY p.name",
            e,
          );
          _(l);
          let s = 0;
          if ("normal" === t.match_type && 2 === O) {
            const t = await m.getFirstAsync(
              "SELECT COALESCE(SUM(runs_bat+extras),0) AS total FROM deliveries WHERE match_id=? AND innings=1",
              e,
            );
            s = (0, E.normalChaseTarget)(t?.total ?? 0);
          } else if ("normal" === t.match_type && O > 2 && O % 2 == 0) {
            const t = await m.getFirstAsync(
              "SELECT COALESCE(SUM(runs_bat+extras),0) AS total FROM deliveries WHERE match_id=? AND innings=?",
              e,
              O - 1,
            );
            s = (0, E.normalChaseTarget)(t?.total ?? 0);
          } else if ("test" === t.match_type && 4 === O) {
            const t = await m.getAllAsync(
                "SELECT innings,COALESCE(SUM(runs_bat+extras),0) AS total FROM deliveries WHERE match_id=? AND innings IN (1,2,3) GROUP BY innings",
                e,
              ),
              l = (e) => t.find((t) => t.innings === e)?.total ?? 0;
            s = (0, E.testChaseTarget)(l(1), l(2), l(3));
          }
          Se(s);
          const n = (
            await m.getAllAsync(
              "SELECT sequence,batter,bowler,runs_bat AS runsBat,extra_type AS extraType,extra_runs AS extraRuns,wicket,dismissal,dismissed_batter AS dismissedBatter,dismissed_by AS dismissedBy FROM deliveries WHERE match_id=? AND innings=? ORDER BY sequence",
              e,
              O,
            )
          ).map((e) => ({
            sequence: e.sequence,
            batter: e.batter,
            bowler: e.bowler,
            runsBat: e.runsBat,
            extraType: e.extraType,
            extraRuns: e.extraRuns ?? void 0,
            wicket: e.wicket ? (e.dismissal ?? "Wicket") : void 0,
            retiredHurt: "Retired hurt" === e.dismissal,
            dismissedBatter: e.dismissedBatter ?? void 0,
            dismissedBy: e.dismissedBy ?? void 0,
          }));
          W(n);
          const d = inningsInfo(t, O).batting === t.team_a ? "A" : "B",
            o = l.filter((e) => e.team_side === d || e.is_common),
            c = n.reduce(
              (e, t) => e + ((0, j.deliveryTotals)(t).legal ? 1 : 0),
              0,
            ),
            u = (0, j.summarizeDeliveries)(n),
            h = (0, E.recoverBatters)(
              n,
              o.map((e) => e.name),
              t.batting_mode,
            ),
            f = h.allOut;
          !N &&
            l.length &&
            (D(h.striker),
            I(h.nonStriker),
            $(h.nextSlot ?? "striker"),
            F(null !== h.nextSlot),
            Y(h.blockedBatter));
          const y = c >= inningsInfo(t, O).balls || f || (s > 0 && u.runs >= s),
            p = n[n.length - 1],
            x = (0, E.overRequiresNewBowler)(p, c, y);
          z(x), n.length > 0 && U(x ? "" : p.bowler);
        } catch {
          je("Unable to load match.");
        } finally {
          be(!1);
        }
      }, [m, e, O, N]);
    (0, n.useEffect)(() => {
      Ce();
    }, [Ce]);
    const inn = w ? inningsInfo(w, O) : { so: !1, round: 0, chase: !1, batting: "", balls: 6 },
      we = inn.batting,
      Re = w ? (we === w.team_a ? "A" : "B") : "A",
      Ae = B.filter((e) => e.team_side === Re || e.is_common),
      Be = B.filter((e) => (e.team_side !== Re || e.is_common) && e.name !== N && e.name !== L),
      ve = Be.filter((e) => e.is_wicketkeeper),
      We = ve.length ? ve : Be,
      Oe = v[v.length - 1]?.bowler,
      ke = Be.filter((e) => e.name !== Oe),
      Ne = ke.length ? ke : Be,
      De = !N || !P || xe || M,
      Le = (0, n.useMemo)(() => (0, j.summarizeDeliveries)(v), [v]),
      Ie = (0, n.useMemo)(() => {
        const e = {};
        for (const t of v) {
          const l = e[t.batter] ?? { runs: 0, balls: 0 };
          (l.runs += t.runsBat),
            "wide" === t.extraType || t.retiredHurt || (l.balls += 1),
            (e[t.batter] = l);
        }
        return e;
      }, [v]),
      Pe = (0, E.dismissedBatterNames)(v),
      Ue = Pe.size >= Math.max(1, Ae.length),
      Me = (0, E.nextBatterOptions)(
        Ae.map((e) => e.name).filter((e) => e !== P),
        Pe,
        N,
        L,
        V,
        q,
      ),
      ze = Boolean(
        w && (Le.legalBalls >= inn.balls || Ue || (Ee > 0 && Le.runs >= Ee)),
      );
    function He(e, sub = "") {
      const A = o.default,
        ez = c.default,
        t = (v, toValue, duration, easing) =>
          A.timing(v, { toValue, duration, easing, useNativeDriver: !0 });
      [X, J, fxX, fxY, fxRot, fxFlash].forEach((v) => v.stopAnimation());
      K(e), setFxSub(sub);
      J.setValue(0), fxFlash.setValue(0), fxX.setValue(0), fxY.setValue(0), fxRot.setValue(0);
      const flash = () => A.sequence([t(fxFlash, 1, 90), t(fxFlash, 0, 380)]),
        shake = () => A.sequence([22, -22, 16, -16, 9, -9, 0].map((x) => t(fxX, x, 50)));
      let move;
      if ("SIX!" === e)
        X.setValue(0.2), fxY.setValue(220), fxRot.setValue(-1),
          (move = A.parallel([
            t(X, 1.25, 450, ez.out(ez.back(1.8))),
            t(fxY, 0, 450, ez.out(ez.cubic)),
            t(fxRot, 0, 600, ez.out(ez.back(2.2))),
            A.sequence([flash(), flash()]),
          ]));
      else if ("FOUR!" === e)
        X.setValue(0.85), fxX.setValue(-360),
          (move = A.parallel([
            t(fxX, 0, 340, ez.out(ez.cubic)),
            A.sequence([A.delay(280), t(X, 1.15, 120), t(X, 1, 140)]),
            flash(),
          ]));
      else if ("RUN OUT!" === e)
        X.setValue(1), fxX.setValue(360),
          (move = A.parallel([A.sequence([t(fxX, 0, 220, ez.out(ez.cubic)), shake()]), flash()]));
      else if (["FIFTY!", "HUNDRED!", "HAT-TRICK!"].includes(e))
        X.setValue(0.35), fxY.setValue(120), fxRot.setValue(-0.5),
          (move = A.parallel([
            t(X, 1.12, 420, ez.out(ez.back(1.7))),
            t(fxY, 0, 420, ez.out(ez.cubic)),
            t(fxRot, 0, 520, ez.out(ez.cubic)),
            A.sequence([flash(), flash(), flash()]),
          ]));
      else
        X.setValue(1.8),
          (move = A.parallel([A.sequence([t(X, 1, 200, ez.in(ez.quad)), shake()]), flash()]));
      A.parallel([
        A.sequence([t(J, 1, 120), A.delay(["SIX!", "FIFTY!", "HUNDRED!", "HAT-TRICK!"].includes(e) ? 1150 : 850), t(J, 0, 260)]),
        move,
      ]).start(({ finished }) => finished && (K(""), setFxSub("")));
    }
    async function Fe(e, l = null, s = "", n = 1, d = {}) {
      if (w && !xe && !M)
        if (N)
          if (P) {
            je(""), be(!0);
            try {
              const o = "Retired hurt" === s,
                c = "Run out" === s ? (d.dismissedBatter ?? N) : N,
                u = "Run out" === s,
                h = "wide" === l ? 0 : u ? ge : e,
                f =
                  "wide" === l
                    ? u
                      ? ge
                      : n
                    : "no-ball" === l
                      ? 0
                      : l
                        ? u
                          ? ge
                          : n
                        : void 0,
                y = {
                  sequence: v.length + 1,
                  batter: N,
                  bowler: P,
                  runsBat: h,
                  extraType: l ?? void 0,
                  extraRuns: f,
                  wicket: o ? void 0 : s || void 0,
                  retiredHurt: o,
                  dismissedBatter: o ? void 0 : s ? c : void 0,
                  dismissedBy: d.dismissedBy,
                },
                p = (0, j.deliveryTotals)(y),
                x = t.randomUUID();
              await m.runAsync(
                "INSERT INTO deliveries(id,match_id,innings,sequence,batter,bowler,runs_bat,extras,extra_type,extra_runs,wicket,dismissal,dismissed_batter,dismissed_by,legal) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                x,
                w.id,
                O,
                y.sequence,
                y.batter,
                y.bowler,
                y.runsBat,
                p.extras,
                y.extraType ?? null,
                y.extraRuns ?? 0,
                y.wicket ? 1 : 0,
                s || null,
                y.dismissedBatter ?? null,
                y.dismissedBy ?? null,
                p.legal ? 1 : 0,
              );
              let b = N,
                T = L;
              p.rotate && T && ([b, T] = [T, b]);
              const S = Le.legalBalls + (p.legal ? 1 : 0);
              let C = !1,
                R = null;
              if (s) {
                const e = (0, E.resolveDismissal)(
                  v,
                  Ae.map((e) => e.name),
                  w.batting_mode,
                  b,
                  T,
                  c,
                  o,
                );
                (b = e.striker),
                  (T = e.nonStriker),
                  (C = e.allOut),
                  (R = e.nextSlot);
              } else p.legal && S % 6 == 0 && T && ([b, T] = [T, b]);
              const A = s ? C : Pe.size >= Math.max(1, Ae.length),
                B =
                  S >= inn.balls || A || (Ee > 0 && Le.runs + p.total >= Ee);
              s &&
                !B &&
                p.legal &&
                S % 6 == 0 &&
                (([b, T] = [T, b]),
                R && (R = "striker" === R ? "nonStriker" : "striker")),
                s && ($(R ?? "striker"), Y(c), F(null !== R && !B));
              const _ = p.legal && S > 0 && S % 6 == 0 && !B;
              D(b),
                I(T),
                oe(null),
                ue(""),
                pe(0),
                _
                  ? (U(""), z(!0))
                  : B
                    ? z(!1)
                    : ("wide" !== l && "no-ball" !== l) || z(!1),
                !o && s
                  ? (() => {
                      const previousBalls = v
                        .filter((t) => t.bowler === P && (0, j.deliveryTotals)(t).legal)
                        .slice(-2);
                      !u && !BOWLER_DISMISSALS.has(s.toLowerCase()) && p.legal &&
                      2 === previousBalls.length && previousBalls.every((t) => bowlerWicket(t, P))
                        ? He("HAT-TRICK!", `${P} takes 3 wickets in 3 balls`)
                        : u
                          ? He("RUN OUT!", `${c} is run out`)
                          : He("WICKET!", `${c} \xb7 ${s}`);
                    })()
                  : (() => {
                      const before = Ie[N]?.runs ?? 0,
                        after = before + h;
                      before < 100 && after >= 100
                        ? He("HUNDRED!", `${N} reaches a century`)
                        : before < 50 && after >= 50
                          ? He("FIFTY!", `${N} reaches fifty`)
                          : 6 === e
                            ? He("SIX!", `${N} \xb7 MAXIMUM`)
                            : 4 === e && He("FOUR!", `${N} \xb7 4 runs`);
                    })(),
                await Ce();
            } catch (e) {
              console.error("Delivery could not be saved", e),
                je(
                  e instanceof Error
                    ? `Delivery could not be saved: ${e.message}`
                    : "Delivery could not be saved.",
                );
            } finally {
              be(!1);
            }
          } else je("Choose a bowler before recording a delivery.");
        else je("Select a batter before recording a delivery.");
    }
    async function Ve() {
      const e = v[v.length - 1];
      if (!e || !w) return;
      const t = v.slice(0, -1),
        l = (0, E.recoverBatters)(
          t,
          Ae.map((e) => e.name),
          w.batting_mode,
        );
      D(l.striker),
        I(l.nonStriker),
        U(e.bowler),
        z(!1),
        $(l.nextSlot ?? "striker"),
        F(null !== l.nextSlot),
        Y(l.blockedBatter),
        oe(null),
        ue(""),
        ye(""),
        pe(0),
        je(""),
        be(!0);
      try {
        await m.runAsync(
          "DELETE FROM deliveries WHERE match_id=? AND innings=? AND sequence=?",
          w.id,
          O,
          e.sequence,
        ),
          W(t),
          be(!1);
      } catch {
        je("Could not undo the last ball."), be(!1);
      }
    }
    async function $e(e, t) {
      if (w)
        try {
          await m.runAsync(
            "UPDATE matches SET status='completed',completed_at=CURRENT_TIMESTAMP,result_type=?,winner_side=? WHERE id=?",
            e,
            t,
            w.id,
          ),
            A({ ...w, status: "completed", result_type: e, winner_side: t }),
            Z(!1),
            te(!0),
            autoUpload();
        } catch {
          je("Could not save the match result.");
        }
    }
    async function goToInnings(next, extra = {}) {
      await m.runAsync(
        "UPDATE matches SET current_innings=?" + ("super_over_balls" in extra ? ",super_over_balls=?" : "") + " WHERE id=?",
        next,
        ...("super_over_balls" in extra ? [extra.super_over_balls] : []),
        w.id,
      );
      A({ ...w, ...extra, current_innings: next }), k(next), D(""), I(""), U(""), z(!1), je("");
    }
    async function startSuperOver(balls) {
      setSoPrompt("");
      try {
        await goToInnings(O + 1, { super_over_balls: balls });
      } catch {
        je("Could not start the super over.");
      }
    }
    function autoUpload() {
      const cloud = globalThis.__baadhsahCloud,
        pw = cloud?.savedPassword();
      if (!pw) return Promise.resolve();
      return cloud
        .cloudPush(m, s.deserializeDatabaseAsync, pw)
        .then(() => console.log("Match uploaded to cloud"))
        .catch((err) =>
          je(`Match saved on this phone, but the cloud upload failed: ${err.message} Open Data & Backups and tap SAVE TO CLOUD.`),
        );
    }
    async function qe() {
      try {
        w?.series_id &&
          (await m.runAsync(
            "UPDATE match_series SET status='completed',completed_at=CURRENT_TIMESTAMP WHERE id=?",
            w.series_id,
          )),
          te(!1),
          await autoUpload(),
          l.router.replace("/history");
      } catch {
        je("Could not close the series.");
      }
    }
    return w
      ? (0, S.jsxs)(x.default, { style: R.page, children: [(0, S.jsxs)(f.default, {
          style: R.page,
          contentContainerStyle: R.content,
          children: [
            (0, S.jsx)(h.default, {
              onPress: () => l.router.replace("/history"),
              children: (0, S.jsx)(y.default, {
                style: R.back,
                children: "\u2039  MATCH CENTRE",
              }),
            }),
            (0, S.jsxs)(y.default, {
              style: R.kicker,
              children: [
                w.match_type.toUpperCase(),
                " \xb7 ",
                w.ground || "TENNIS BALL CRICKET",
                " \xb7 ",
                w.overs,
                " OVERS \xb7 ",
                w.batting_mode.toUpperCase(),
                " MODE",
              ],
            }),
            (0, S.jsxs)(y.default, {
              style: R.title,
              children: [
                w.team_a,
                " ",
                (0, S.jsx)(y.default, { style: R.versus, children: "vs" }),
                " ",
                w.team_b,
              ],
            }),
            (0, S.jsxs)(y.default, {
              style: R.matchSub,
              children: [
                w.match_name || "Match",
                w.toss_winner
                  ? ` \xb7 Toss won by ${"B" === w.toss_winner ? w.team_b : w.team_a}, chose to ${w.toss_decision ?? "bat"}`
                  : "",
              ],
            }),
            (0, S.jsx)(h.default, {
              style: R.drawAction,
              onPress: () =>
                l.router.push({
                  pathname: "/scorecard/[id]",
                  params: { id: w.id },
                }),
              children: (0, S.jsx)(y.default, {
                style: R.drawText,
                children: "FULL SCORECARD \xb7 ALL INNINGS",
              }),
            }),
            (0, S.jsxs)(x.default, {
              style: R.scoreCard,
              children: [
                (0, S.jsxs)(y.default, {
                  style: R.small,
                  children: [
                    inn.so
                      ? `SUPER OVER${inn.round > 1 ? " " + inn.round : ""} (${inn.balls} BALLS) \xb7 ${inn.chase ? "CHASE" : "1ST"}`
                      : ["1ST", "2ND", "3RD", "4TH"][O - 1] + " INNINGS",
                    " \xb7 BATTING: ",
                    we.toUpperCase(),
                  ],
                }),
                (0, S.jsxs)(x.default, {
                  style: { flexDirection: "row", alignItems: "center" },
                  children: [
                    (0, S.jsx)(b.AnimatedCounter, {
                      value: Le.runs,
                      style: R.score,
                    }),
                    (0, S.jsx)(y.default, {
                      style: [R.score, R.wicket],
                      children: "/",
                    }),
                    (0, S.jsx)(b.AnimatedCounter, {
                      value: Le.wickets,
                      style: [R.score, R.wicket],
                    }),
                  ],
                }),
                (0, S.jsxs)(y.default, {
                  style: R.overs,
                  children: [
                    (0, j.oversText)(Le.legalBalls),
                    " overs ",
                    (0, S.jsx)(y.default, { style: R.dim, children: "\xb7" }),
                    " CRR ",
                    Le.legalBalls
                      ? ((6 * Le.runs) / Le.legalBalls).toFixed(1)
                      : "0.0",
                  ],
                }),
                Ee > 0 &&
                  (0, S.jsxs)(S.Fragment, {
                    children: [
                      (0, S.jsxs)(y.default, {
                        style: R.target,
                        children: ["Target: ", Ee, " runs"],
                      }),
                      !ze &&
                        (0, S.jsx)(y.default, {
                          style: R.chase,
                          children: (0, E.chaseProgress)(
                            Ee,
                            Le.runs,
                            Le.legalBalls,
                            inn.balls / 6,
                            Le.wickets,
                            Ae.length,
                          ),
                        }),
                    ],
                  }),
                "completed" === w.status &&
                  (0, S.jsx)(y.default, {
                    style: R.result,
                    children:
                      (0, E.describeMatchResult)({
                        status: w.status,
                        resultType: w.result_type ?? null,
                        winnerSide: w.winner_side ?? null,
                        teamA: w.team_a,
                        teamB: w.team_b,
                        battingFirst: w.batting_first,
                        matchType: w.match_type,
                        superOver: "normal" === w.match_type && Boolean(w.super_over_balls) && O > 2,
                        scores: [],
                        teamSizes: {
                          A: B.filter((e) => "A" === e.team_side || e.is_common).length,
                          B: B.filter((e) => "B" === e.team_side || e.is_common).length,
                        },
                      }) || "Match completed",
                  }),
              ],
            }),
            "live" === w.status &&
              (0, S.jsx)(h.default, {
                style: R.drawAction,
                onPress: () => {
                  ne("A"), le(!0);
                },
                children: (0, S.jsx)(y.default, {
                  style: R.drawText,
                  children: "\uff0b ADD A LATE PLAYER",
                }),
              }),
            "test" === w.match_type &&
              "live" === w.status &&
              (0, S.jsx)(h.default, {
                style: R.drawAction,
                onPress: () => Z(!0),
                children: (0, S.jsx)(y.default, {
                  style: R.drawText,
                  children: "END TEST AS DRAW",
                }),
              }),
            (0, S.jsxs)(y.default, {
              style: R.section,
              children: [
                "AT THE CREASE \xb7 ",
                w.batting_mode.toUpperCase(),
                " MODE",
              ],
            }),
            "duo" === w.batting_mode &&
              (0, S.jsx)(h.default, {
                style: R.drawAction,
                onPress: () => {
                  const e = N;
                  D(L), I(e);
                },
                children: (0, S.jsx)(y.default, {
                  style: R.drawText,
                  children: "\u21c4 SWITCH STRIKER / NON-STRIKER",
                }),
              }),
            (0, S.jsx)(x.default, {
              style: R.row,
              children: ("single" === w.batting_mode
                ? [[N, "BATTER \xb7 ONLY PLAYER AT CREASE", D]]
                : [
                    [N, "STRIKER", D],
                    [L, "NON-STRIKER", I],
                  ]
              ).map(([e, t, l]) =>
                (0, S.jsxs)(
                  x.default,
                  {
                    style: R.person,
                    children: [
                      (0, S.jsx)(y.default, { style: R.small, children: t }),
                      (0, S.jsx)(y.default, {
                        style: R.personName,
                        children: e || "Select batter",
                      }),
                      (0, S.jsxs)(y.default, {
                        style: R.personFigure,
                        children: [
                          Ie[e]?.runs ?? 0,
                          " (",
                          Ie[e]?.balls ?? 0,
                          ")",
                        ],
                      }),
                      (0, S.jsx)(x.default, {
                        style: R.chips,
                        children: Ae.filter(
                          (e) =>
                            e.name !== ("STRIKER" === t ? L : N) &&
                            e.name !== P &&
                            !Pe.has(e.name),
                        ).map((t) =>
                          (0, S.jsx)(
                            h.default,
                            {
                              onPress: () => l(t.name),
                              style: [R.chip, t.name === e && R.selected],
                              children: (0, S.jsx)(y.default, {
                                style: R.chipText,
                                children: t.name,
                              }),
                            },
                            t.id,
                          ),
                        ),
                      }),
                    ],
                  },
                  t,
                ),
              ),
            }),
            (0, S.jsxs)(y.default, {
              style: R.section,
              children: [
                "BOWLER",
                P ? ` \xb7 ${P.toUpperCase()}` : " \xb7 SELECT ONE",
              ],
            }),
            (0, S.jsx)(h.default, {
              style: R.drawAction,
              onPress: () => z(!0),
              children: (0, S.jsx)(y.default, {
                style: R.drawText,
                children: "CHANGE BOWLER",
              }),
            }),
            (0, S.jsx)(x.default, {
              style: R.chips,
              children: Be.map((e) =>
                (0, S.jsx)(
                  h.default,
                  {
                    onPress: () => {
                      U(e.name), je("");
                    },
                    style: [R.chip, e.name === P && R.selected],
                    children: (0, S.jsx)(y.default, {
                      style: R.chipText,
                      children: e.name,
                    }),
                  },
                  e.id,
                ),
              ),
            }),
            !P &&
              (0, S.jsx)(y.default, {
                style: R.bowlerPrompt,
                children: "Choose a bowler above to start scoring.",
              }),
            ze
              ? (0, S.jsxs)(x.default, {
                  style: R.finish,
                  children: [
                    (0, S.jsx)(y.default, {
                      style: R.finishTitle,
                      children: Ue
                        ? "ALL OUT"
                        : Ee > 0 && Le.runs >= Ee
                          ? "TARGET REACHED"
                          : "OVERS COMPLETE",
                    }),
                    (0, S.jsxs)(y.default, {
                      style: R.hint,
                      children: [
                        "Innings total ",
                        Le.runs,
                        "/",
                        Le.wickets,
                        " \xb7 Extras ",
                        Le.extras,
                      ],
                    }),
                    Ee > 0 &&
                      (0, S.jsx)(y.default, {
                        style: R.target,
                        children:
                          Le.runs === Ee - 1
                            ? "Match tied"
                            : Le.runs >= Ee
                              ? `${we} win by ${Math.max(0, Ae.length - Le.wickets)} wickets`
                              : `${we === w.team_a ? w.team_b : w.team_a} win by ${Math.max(0, Ee - 1 - Le.runs)} runs`,
                      }),
                    (0, S.jsx)(h.default, {
                      style: R.primary,
                      onPress: async function () {
                        if (w)
                          try {
                            if ("test" === w.match_type && 3 === O) {
                              const e = await m.getAllAsync(
                                  "SELECT innings,COALESCE(SUM(runs_bat+extras),0) AS total FROM deliveries WHERE match_id=? AND innings IN (1,2,3) GROUP BY innings",
                                  w.id,
                                ),
                                t = (t) =>
                                  e.find((e) => e.innings === t)?.total ?? 0,
                                l = (0, E.testThirdInningsResult)(
                                  t(1),
                                  t(2),
                                  t(3),
                                  w.batting_first === w.team_a ? "A" : "B",
                                );
                              if (l) return void (await $e(l.result, l.winner));
                            }
                            if ("normal" === w.match_type && (1 === O || (O > 2 && O % 2 == 1))) {
                              await goToInnings(O + 1);
                              return;
                            }
                            if ("normal" === w.match_type && O >= 2) {
                              const res = (0, E.normalChaseResult)(Le.runs, Ee, Re, Le.wickets, Ae.length);
                              if ("tie" === res.result) return void setSoPrompt(O >= 4 ? "again" : "first");
                              await $e(res.result, res.winner);
                              return;
                            }
                            const e = "test" === w.match_type ? 4 : 2;
                            if (O < e) {
                              const e = O + 1;
                              await m.runAsync(
                                "UPDATE matches SET current_innings=? WHERE id=?",
                                e,
                                w.id,
                              ),
                                k(e),
                                D(""),
                                I(""),
                                U(""),
                                z(!1),
                                je("");
                            } else {
                              const e = we === w.team_a ? "A" : "B",
                                t =
                                  "test" === w.match_type
                                    ? (0, E.testFourthInningsResult)(
                                        Le.runs,
                                        Ee,
                                        e,
                                        Le.wickets,
                                        Ae.length,
                                      )
                                    : (0, E.normalChaseResult)(
                                        Le.runs,
                                        Ee,
                                        e,
                                        Le.wickets,
                                        Ae.length,
                                      );
                              await $e(t.result, t.winner);
                            }
                          } catch {
                            je("Could not save the innings result.");
                          }
                      },
                      children: (0, S.jsx)(y.default, {
                        style: R.primaryText,
                        children: ("test" === w.match_type ? O < 4 : 1 === O || (O > 2 && O % 2 == 1))
                          ? O > 2
                            ? "START SUPER OVER CHASE"
                            : "START NEXT INNINGS"
                          : "COMPLETE MATCH",
                      }),
                    }),
                  ],
                })
              : (0, S.jsxs)(S.Fragment, {
                  children: [
                    (0, S.jsx)(y.default, {
                      style: R.section,
                      children: "ADD DELIVERY",
                    }),
                    (0, S.jsx)(x.default, {
                      style: R.runGrid,
                      children: [0, 1, 2, 3, 4, 6].map((e) =>
                        (0, S.jsxs)(
                          h.default,
                          {
                            style: ({ pressed: t }) => [
                              R.runButton,
                              (4 === e || 6 === e) && R.boundary,
                              De && R.disabled,
                              t &&
                                !De && {
                                  transform: [{ scale: 0.96 }],
                                  opacity: 0.9,
                                },
                            ],
                            disabled: De,
                            onPress: () =>
                              "wide" === de
                                ? Fe(0, de, "", e)
                                : "no-ball" === de
                                  ? Fe(e, de, "", 0)
                                  : "bye" === de ||
                                      "leg-bye" === de ||
                                      "penalty" === de
                                    ? Fe(0, de, "", e)
                                    : Fe(e, de),
                            children: [
                              (0, S.jsx)(y.default, {
                                style: R.runText,
                                children: e,
                              }),
                              0 === e &&
                                (0, S.jsx)(y.default, {
                                  style: R.runLabel,
                                  children: "DOT BALL",
                                }),
                              (4 === e || 6 === e) &&
                                (0, S.jsx)(y.default, {
                                  style: R.runLabel,
                                  children: "RUNS",
                                }),
                            ],
                          },
                          e,
                        ),
                      ),
                    }),
                    (0, S.jsx)(x.default, {
                      style: R.row,
                      children: [
                        "wide",
                        "no-ball",
                        "bye",
                        "leg-bye",
                        "penalty",
                      ].map((e) =>
                        (0, S.jsx)(
                          h.default,
                          {
                            style: [
                              R.extraButton,
                              de === e && R.selected,
                              De && R.disabled,
                            ],
                            disabled: De,
                            onPress: () => oe(de === e ? null : e),
                            children: (0, S.jsxs)(y.default, {
                              style: R.extraText,
                              children: [
                                "no-ball" === e ? "NO BALL" : e.toUpperCase(),
                                "wide" === e ? " +1" : "",
                              ],
                            }),
                          },
                          e,
                        ),
                      ),
                    }),
                    de &&
                      (0, S.jsxs)(x.default, {
                        style: R.inline,
                        children: [
                          (0, S.jsxs)(y.default, {
                            style: R.inlineText,
                            children: [
                              de.toUpperCase(),
                              " \xb7 CHOOSE RUNS",
                              "wide" === de
                                ? " (PENALTY + COMPLETED RUNS)"
                                : "no-ball" === de
                                  ? " (PENALTY + BAT RUNS)"
                                  : "",
                            ],
                          }),
                          [0, 1, 2, 3, 4, 5, 6].map((e) =>
                            (0, S.jsx)(
                              h.default,
                              {
                                disabled: De,
                                onPress: () =>
                                  Fe(
                                    "bye" === de ||
                                      "leg-bye" === de ||
                                      "penalty" === de ||
                                      "wide" === de
                                      ? 0
                                      : e,
                                    de,
                                    "",
                                    "no-ball" === de ? 0 : e,
                                  ),
                                style: [R.tinyButton, De && R.disabled],
                                children: (0, S.jsx)(y.default, {
                                  style: R.tinyText,
                                  children: e,
                                }),
                              },
                              e,
                            ),
                          ),
                        ],
                      }),
                    (0, S.jsx)(y.default, {
                      style: R.section,
                      children: "WICKET / RETIREMENT",
                    }),
                    (0, S.jsx)(x.default, {
                      style: R.row,
                      children: [
                        "Bowled",
                        "Caught",
                        "Run out",
                        "Stumped",
                        "LBW",
                        "Outside the park",
                        "Other",
                        "Retired hurt",
                      ].map((e) =>
                        (0, S.jsx)(
                          h.default,
                          {
                            onPress: () => {
                              ue(e), fe(N), ye("");
                            },
                            style: [R.chip, ce === e && R.wicketSelected],
                            children: (0, S.jsx)(y.default, {
                              style: R.chipText,
                              children: e,
                            }),
                          },
                          e,
                        ),
                      ),
                    }),
                    "Run out" === ce &&
                      (0, S.jsxs)(x.default, {
                        style: R.fieldingPick,
                        children: [
                          (0, S.jsx)(y.default, {
                            style: R.small,
                            children: "WHO WAS RUN OUT?",
                          }),
                          (0, S.jsx)(x.default, {
                            style: R.chips,
                            children: [
                              N,
                              ...("duo" === w.batting_mode && L ? [L] : []),
                            ]
                              .filter(Boolean)
                              .map((e) =>
                                (0, S.jsx)(
                                  h.default,
                                  {
                                    onPress: () => fe(e),
                                    style: [R.chip, he === e && R.selected],
                                    children: (0, S.jsx)(y.default, {
                                      style: R.chipText,
                                      children: e,
                                    }),
                                  },
                                  e,
                                ),
                              ),
                          }),
                          (0, S.jsx)(y.default, {
                            style: [R.small, { marginTop: 12 }],
                            children: "COMPLETED RUNS BEFORE THE RUN OUT",
                          }),
                          (0, S.jsx)(x.default, {
                            style: R.chips,
                            children: [0, 1, 2, 3, 4, 5].map((e) =>
                              (0, S.jsx)(
                                h.default,
                                {
                                  onPress: () => pe(e),
                                  style: [R.chip, ge === e && R.selected],
                                  children: (0, S.jsxs)(y.default, {
                                    style: R.chipText,
                                    children: [e, " RUN", 1 === e ? "" : "S"],
                                  }),
                                },
                                e,
                              ),
                            ),
                          }),
                        ],
                      }),
                    ["Caught", "Run out", "Stumped"].includes(ce) &&
                      (0, S.jsxs)(x.default, {
                        style: R.fieldingPick,
                        children: [
                          (0, S.jsx)(y.default, {
                            style: R.small,
                            children:
                              "Caught" === ce
                                ? "CAUGHT BY"
                                : "Stumped" === ce
                                  ? ve.length
                                    ? "STUMPED BY \xb7 WICKETKEEPER"
                                    : "STUMPED BY \xb7 SELECT FIELDER"
                                  : "RUN OUT BY",
                          }),
                          (0, S.jsx)(x.default, {
                            style: R.chips,
                            children: ("Stumped" === ce ? We : Be).map((e) =>
                              (0, S.jsx)(
                                h.default,
                                {
                                  onPress: () => ye(e.name),
                                  style: [R.chip, me === e.name && R.selected],
                                  children: (0, S.jsx)(y.default, {
                                    style: R.chipText,
                                    children: e.name,
                                  }),
                                },
                                e.id,
                              ),
                            ),
                          }),
                        ],
                      }),
                    ce &&
                      (0, S.jsx)(h.default, {
                        disabled:
                          De ||
                          (["Caught", "Run out", "Stumped"].includes(ce) &&
                            !me) ||
                          ("Run out" === ce && !he),
                        style: [
                          R.wicketButton,
                          De && R.disabled,
                          ["Caught", "Run out", "Stumped"].includes(ce) &&
                            !me &&
                            R.disabled,
                        ],
                        onPress: () =>
                          Fe(0, de, ce, ge, {
                            dismissedBatter: he,
                            dismissedBy: me,
                          }),
                        children: (0, S.jsx)(y.default, {
                          style: R.primaryText,
                          children:
                            "Retired hurt" === ce
                              ? "RECORD RETIRED HURT"
                              : "RECORD " + ce.toUpperCase() + " WICKET",
                        }),
                      }),
                    (0, S.jsxs)(x.default, {
                      style: R.actions,
                      children: [
                        (0, S.jsx)(h.default, {
                          onPress: Ve,
                          disabled: !v.length || xe,
                          style: [R.secondary, !v.length && R.disabled],
                          children: (0, S.jsx)(y.default, {
                            style: R.secondaryText,
                            children: "\u21b6 UNDO LAST BALL",
                          }),
                        }),
                        (0, S.jsxs)(y.default, {
                          style: R.ballCount,
                          children: [v.length, " deliveries recorded"],
                        }),
                      ],
                    }),
                  ],
                }),
            (0, S.jsx)(y.default, {
              style: R.section,
              children: "THIS INNINGS",
            }),
            (0, S.jsxs)(y.default, {
              style: R.hint,
              children: [
                "Batting ",
                Le.batterRuns,
                " \xb7 Extras ",
                Le.extras,
                " (WD ",
                Le.wides,
                ", NB ",
                Le.noBalls,
                ", B ",
                Le.byes,
                ", LB ",
                Le.legByes,
                ") \xb7 ",
                Le.fours,
                " fours \xb7 ",
                Le.sixes,
                " sixes",
              ],
            }),
            (0, S.jsx)(x.default, {
              style: R.recent,
              children: v
                .slice(-12)
                .reverse()
                .map((e) =>
                  (0, S.jsxs)(
                    x.default,
                    {
                      style: R.ball,
                      children: [
                        (0, S.jsx)(y.default, {
                          style: R.ballOver,
                          children: (0, j.oversText)(
                            v
                              .slice(0, e.sequence - 1)
                              .reduce(
                                (e, t) =>
                                  e + ((0, j.deliveryTotals)(t).legal ? 1 : 0),
                                0,
                              ),
                          ),
                        }),
                        (0, S.jsx)(y.default, {
                          style: R.ballText,
                          children: e.retiredHurt
                            ? "RETIRED HURT"
                            : e.wicket
                              ? `WICKET \xb7 ${e.wicket}${e.extraType ? ` \xb7 ${e.extraType.toUpperCase()}` : ""}${e.dismissedBy ? ` \xb7 ${e.dismissedBy}` : ""}${e.dismissedBatter && e.dismissedBatter !== e.batter ? ` \xb7 ${e.dismissedBatter}` : ""}${(0, j.deliveryTotals)(e).total ? ` \xb7 ${(0, j.deliveryTotals)(e).total} runs` : ""}`
                              : e.extraType
                                ? `${e.extraType.toUpperCase()} \xb7 ${(0, j.deliveryTotals)(e).total} runs`
                                : 0 === e.runsBat
                                  ? "DOT BALL"
                                  : `${e.runsBat} run${1 === e.runsBat ? "" : "s"}`,
                        }),
                        (0, S.jsx)(y.default, {
                          style: R.ballBatter,
                          children: e.batter,
                        }),
                      ],
                    },
                    e.sequence,
                  ),
                ),
            }),
            Te ? (0, S.jsx)(y.default, { style: R.error, children: Te }) : null,
            (0, S.jsx)(u.default, {
              visible: re,
              transparent: !0,
              animationType: "fade",
              onRequestClose: () => le(!1),
              children: (0, S.jsx)(x.default, {
                style: R.modalOverlay,
                children: (0, S.jsxs)(x.default, {
                  style: R.modalCard,
                  children: [
                    (0, S.jsx)(y.default, {
                      style: R.modalTitle,
                      children: "ADD LATE PLAYER",
                    }),
                    (0, S.jsx)(y.default, {
                      style: R.hint,
                      children:
                        "Add a new local player to either team. They\u2019ll also be saved in Manage Players.",
                    }),
                    (0, S.jsxs)(x.default, {
                      style: R.chips,
                      children: [
                        (0, S.jsx)(h.default, {
                          style: [R.chip, "A" === ie && R.selected],
                          onPress: () => ne("A"),
                          children: (0, S.jsx)(y.default, {
                            style: R.chipText,
                            children: w.team_a,
                          }),
                        }),
                        (0, S.jsx)(h.default, {
                          style: [R.chip, "B" === ie && R.selected],
                          onPress: () => ne("B"),
                          children: (0, S.jsx)(y.default, {
                            style: R.chipText,
                            children: w.team_b,
                          }),
                        }),
                      ],
                    }),
                    (0, S.jsx)(p.default, {
                      style: R.input,
                      value: se,
                      onChangeText: ae,
                      placeholder: "Player name",
                      placeholderTextColor: C.muted,
                    }),
                    (0, S.jsxs)(x.default, {
                      style: R.modalActions,
                      children: [
                        (0, S.jsx)(h.default, {
                          style: R.modalBowler,
                          onPress: async function () {
                            const e = se.trim();
                            if (!e || !w)
                              return je(
                                "Enter the joining player\u2019s name.",
                              );
                            if (
                              B.some(
                                (t) =>
                                  t.name.toLocaleLowerCase() ===
                                  e.toLocaleLowerCase(),
                              )
                            )
                              return je(
                                "That player is already in this match.",
                              );
                            be(!0);
                            try {
                              let l = await m.getFirstAsync(
                                "SELECT id FROM players WHERE player_type='club' AND lower(trim(name))=lower(trim(?)) LIMIT 1",
                                e,
                              );
                              if (!l) {
                                const s = t.randomUUID();
                                await m.runAsync(
                                  "INSERT INTO players(id,name,player_type) VALUES(?,?,'club')",
                                  s,
                                  e,
                                ),
                                  (l = { id: s });
                              }
                              await m.runAsync(
                                "INSERT INTO match_players(match_id,team_side,player_id) VALUES(?,?,?)",
                                w.id,
                                ie,
                                l.id,
                              ),
                                ae(""),
                                le(!1),
                                je(""),
                                await Ce();
                            } catch {
                              je("Could not add this player to the match.");
                            } finally {
                              be(!1);
                            }
                          },
                          children: (0, S.jsx)(y.default, {
                            style: R.chipText,
                            children: "ADD TO MATCH",
                          }),
                        }),
                        (0, S.jsx)(h.default, {
                          style: R.cancelAction,
                          onPress: () => le(!1),
                          children: (0, S.jsx)(y.default, {
                            style: R.chipText,
                            children: "CANCEL",
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            }),
            (0, S.jsx)(u.default, {
              visible: M && !H,
              transparent: !0,
              animationType: "fade",
              onRequestClose: () => {},
              children: (0, S.jsx)(x.default, {
                style: R.modalOverlay,
                children: (0, S.jsxs)(x.default, {
                  style: R.modalCard,
                  children: [
                    (0, S.jsx)(y.default, {
                      style: R.modalTitle,
                      children: "OVER COMPLETE",
                    }),
                    (0, S.jsx)(y.default, {
                      style: R.hint,
                      children:
                        "Choose the next bowler from the selected bowling team.",
                    }),
                    (0, S.jsx)(x.default, {
                      style: R.chips,
                      children: Ne.map((e) =>
                        (0, S.jsx)(
                          h.default,
                          {
                            style: R.modalBowler,
                            onPress: () => {
                              U(e.name), z(!1);
                            },
                            children: (0, S.jsx)(y.default, {
                              style: R.chipText,
                              children: e.name,
                            }),
                          },
                          e.id,
                        ),
                      ),
                    }),
                    (0, S.jsx)(x.default, {
                      style: R.modalActions,
                      children: (0, S.jsx)(h.default, {
                        style: R.cancelAction,
                        onPress: Ve,
                        children: (0, S.jsx)(y.default, {
                          style: R.chipText,
                          children: "UNDO LAST DELIVERY",
                        }),
                      }),
                    }),
                  ],
                }),
              }),
            }),
            (0, S.jsx)(u.default, {
              visible: H,
              transparent: !0,
              animationType: "fade",
              onRequestClose: () => {},
              children: (0, S.jsx)(x.default, {
                style: R.modalOverlay,
                children: (0, S.jsxs)(x.default, {
                  style: R.modalCard,
                  children: [
                    (0, S.jsx)(y.default, {
                      style: R.modalTitle,
                      children: "NEXT BATTER",
                    }),
                    (0, S.jsx)(y.default, {
                      style: R.hint,
                      children:
                        "Choose the incoming batter. A dismissed batter cannot return; a retired-hurt batter can return later.",
                    }),
                    (0, S.jsx)(x.default, {
                      style: R.chips,
                      children: Me.map((e) =>
                        (0, S.jsx)(
                          h.default,
                          {
                            style: R.modalBowler,
                            onPress: () => {
                              return (
                                (t = e),
                                void (Pe.has(t)
                                  ? je(
                                      "A dismissed batter cannot return to the crease.",
                                    )
                                  : ("nonStriker" === V ? I(t) : D(t),
                                    F(!1),
                                    Y("")))
                              );
                              var t;
                            },
                            children: (0, S.jsxs)(y.default, {
                              style: R.chipText,
                              children: [
                                e,
                                v.some((t) => t.batter === e && t.retiredHurt)
                                  ? " \xb7 RETIRED HURT"
                                  : "",
                              ],
                            }),
                          },
                          e,
                        ),
                      ),
                    }),
                  ],
                }),
              }),
            }),
            (0, S.jsx)(u.default, {
              visible: Q,
              transparent: !0,
              animationType: "fade",
              onRequestClose: () => Z(!1),
              children: (0, S.jsx)(x.default, {
                style: R.modalOverlay,
                children: (0, S.jsxs)(x.default, {
                  style: R.modalCard,
                  children: [
                    (0, S.jsx)(y.default, {
                      style: R.modalTitle,
                      children: "DECLARE A DRAW?",
                    }),
                    (0, S.jsx)(y.default, {
                      style: R.hint,
                      children: "This will complete the Test match as drawn.",
                    }),
                    (0, S.jsxs)(x.default, {
                      style: R.modalActions,
                      children: [
                        (0, S.jsx)(h.default, {
                          style: R.modalBowler,
                          onPress: () => $e("draw", null),
                          children: (0, S.jsx)(y.default, {
                            style: R.chipText,
                            children: "YES \xb7 COMPLETE DRAW",
                          }),
                        }),
                        (0, S.jsx)(h.default, {
                          style: R.cancelAction,
                          onPress: () => Z(!1),
                          children: (0, S.jsx)(y.default, {
                            style: R.chipText,
                            children: "CANCEL",
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            }),
            (0, S.jsx)(u.default, {
              visible: Boolean(soPrompt),
              transparent: !0,
              animationType: "fade",
              onRequestClose: () => setSoPrompt(""),
              children: (0, S.jsx)(x.default, {
                style: R.modalOverlay,
                children: (0, S.jsxs)(x.default, {
                  style: R.modalCard,
                  children: [
                    (0, S.jsx)(y.default, {
                      style: R.modalTitle,
                      children: "again" === soPrompt ? "SUPER OVER TIED!" : "MATCH TIED!",
                    }),
                    (0, S.jsx)(y.default, {
                      style: R.hint,
                      children:
                        "Play a super over? The team that batted second bats first. No wicket limit \u2014 the innings ends when the balls run out or the team is all out.",
                    }),
                    (0, S.jsxs)(x.default, {
                      style: R.modalActions,
                      children: [
                        (0, S.jsx)(h.default, {
                          style: R.modalBowler,
                          onPress: () => startSuperOver(6),
                          children: (0, S.jsx)(y.default, { style: R.chipText, children: "SUPER OVER \xb7 6 BALLS" }),
                        }),
                        (0, S.jsx)(h.default, {
                          style: R.modalBowler,
                          onPress: () => startSuperOver(3),
                          children: (0, S.jsx)(y.default, { style: R.chipText, children: "SUPER OVER \xb7 3 BALLS" }),
                        }),
                        (0, S.jsx)(h.default, {
                          style: R.cancelAction,
                          onPress: () => (setSoPrompt(""), $e("tie", null)),
                          children: (0, S.jsx)(y.default, { style: R.chipText, children: "END AS A TIE" }),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            }),
            (0, S.jsx)(u.default, {
              visible: ee,
              transparent: !0,
              animationType: "fade",
              onRequestClose: qe,
              children: (0, S.jsxs)(x.default, {
                style: R.modalOverlay,
                children: [
                  (0, S.jsx)(T.ConfettiBurst, { visible: ee }),
                  (0, S.jsxs)(x.default, {
                    style: R.modalCard,
                    children: [
                      (0, S.jsx)(y.default, {
                        style: R.modalTitle,
                        children: "MATCH COMPLETE",
                      }),
                      (0, S.jsx)(y.default, {
                        style: R.hint,
                        children:
                          "Would you like to play another match in this series?",
                      }),
                      (0, S.jsxs)(x.default, {
                        style: R.modalActions,
                        children: [
                          (0, S.jsx)(h.default, {
                            style: R.modalBowler,
                            onPress: async function () {
                              te(!1),
                                w?.series_id
                                  ? l.router.replace({
                                      pathname: "/match-setup",
                                      params: { seriesId: w.series_id },
                                    })
                                  : l.router.replace("/match-setup");
                            },
                            children: (0, S.jsx)(y.default, {
                              style: R.chipText,
                              children: "YES \xb7 NEXT MATCH",
                            }),
                          }),
                          (0, S.jsx)(h.default, {
                            style: R.cancelAction,
                            onPress: qe,
                            children: (0, S.jsx)(y.default, {
                              style: R.chipText,
                              children: "NO \xb7 CLOSE SERIES",
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
            xe &&
              (0, S.jsx)(x.default, {
                style: R.busyOverlay,
                children: (0, S.jsx)(d.default, { color: C.green }),
              }),
          ],
        }),
            (0, S.jsx)(o.default.View, {
              pointerEvents: "none",
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 19,
                backgroundColor: (FX[G] ?? FX["FOUR!"]).flash,
                opacity: fxFlash.interpolate({ inputRange: [0, 1], outputRange: [0, 0.28] }),
              },
            }),
            (0, S.jsx)(x.default, {
              pointerEvents: "none",
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 20,
                alignItems: "center",
                justifyContent: "center",
              },
              children: (0, S.jsxs)(o.default.View, {
                style: {
                  paddingHorizontal: 36,
                  paddingVertical: 20,
                  borderRadius: 24,
                  alignItems: "center",
                  backgroundColor: (FX[G] ?? { color: C.green }).color,
                  borderWidth: 3,
                  borderColor: "rgba(255,255,255,0.85)",
                  shadowColor: (FX[G] ?? { color: C.green }).color,
                  shadowOpacity: 0.8,
                  shadowRadius: 28,
                  elevation: 10,
                  opacity: J,
                  transform: [
                    { translateX: fxX },
                    { translateY: fxY },
                    {
                      rotate: fxRot.interpolate({
                        inputRange: [-1, 0],
                        outputRange: ["-14deg", "0deg"],
                      }),
                    },
                    { scale: X },
                  ],
                },
                children: [
                  (0, S.jsx)(y.default, {
                    style: {
                      color: (FX[G] ?? { text: C.bg }).text,
                      fontSize: ({ "SIX!": 52, "FIFTY!": 44, "HUNDRED!": 34, "HAT-TRICK!": 28 })[G] ?? 40,
                      fontWeight: "900",
                      letterSpacing: 2,
                    },
                    children: G,
                  }),
                  fxSub
                    ? (0, S.jsx)(y.default, {
                        style: {
                          color: (FX[G] ?? { text: C.bg }).text,
                          fontSize: 13,
                          fontWeight: "800",
                          letterSpacing: 1,
                          marginTop: 4,
                          opacity: 0.85,
                        },
                        children: fxSub.toUpperCase(),
                      })
                    : null,
                ],
              }),
            }),
          ],
        })
      : (0, S.jsxs)(x.default, {
          style: [R.page, R.loading],
          children: [
            (0, S.jsx)(d.default, { size: "large", color: C.green }),
            (0, S.jsx)(y.default, {
              style: R.hint,
              children: Te || "Loading match\u2026",
            }),
          ],
        });
  }
  const makeStyles = (C) => m.default.create({
    page: { flex: 1, backgroundColor: C.bg },
    loading: { justifyContent: "center", alignItems: "center", gap: 14 },
    busyOverlay: {
      position: "absolute",
      top: 8,
      right: 8,
      backgroundColor: C.card,
      borderRadius: 24,
      padding: 8,
      borderWidth: 1,
      borderColor: C.border,
    },
    content: {
      padding: 20,
      paddingTop: 40,
      paddingBottom: 50,
      maxWidth: 800,
      width: "100%",
      alignSelf: "center",
    },
    back: {
      color: C.green,
      fontSize: 11,
      fontWeight: "800",
      letterSpacing: 1,
      marginBottom: 24,
    },
    kicker: {
      color: C.green,
      fontSize: 10,
      fontWeight: "800",
      letterSpacing: 2,
    },
    title: { color: C.white, fontSize: 25, fontWeight: "900", marginTop: 8 },
    matchSub: { color: C.muted, fontSize: 11, fontWeight: "700", marginTop: 6 },
    versus: { color: C.muted, fontSize: 15 },
    scoreCard: {
      marginTop: 20,
      backgroundColor: C.card,
      borderRadius: 18,
      borderColor: C.border,
      borderWidth: 1,
      padding: 22,
      alignItems: "center",
    },
    small: {
      color: C.muted,
      fontSize: 10,
      fontWeight: "800",
      letterSpacing: 1,
    },
    score: { color: C.white, fontSize: 64, fontWeight: "900", marginTop: 7 },
    wicket: { color: C.green },
    overs: { color: C.white, fontWeight: "700", marginTop: 0 },
    dim: { color: C.muted },
    target: { color: C.green, fontSize: 11, marginTop: 8 },
    chase: {
      color: C.green,
      fontSize: 14,
      fontWeight: "900",
      marginTop: 7,
      textAlign: "center",
    },
    result: {
      color: C.white,
      fontSize: 14,
      fontWeight: "900",
      marginTop: 9,
      textAlign: "center",
    },
    section: {
      color: C.white,
      fontSize: 11,
      fontWeight: "900",
      letterSpacing: 1.2,
      marginTop: 25,
      marginBottom: 10,
    },
    row: { flexDirection: "row", gap: 9, flexWrap: "wrap" },
    person: {
      flex: 1,
      minWidth: 140,
      backgroundColor: C.card,
      borderColor: C.border,
      borderWidth: 1,
      borderRadius: 12,
      padding: 13,
    },
    personName: { color: C.white, fontWeight: "800", marginTop: 6 },
    personFigure: {
      color: C.green,
      fontSize: 11,
      fontWeight: "800",
      marginTop: 3,
    },
    chips: { flexDirection: "row", gap: 7, flexWrap: "wrap", marginTop: 9 },
    chip: {
      backgroundColor: C.card,
      borderWidth: 1,
      borderColor: C.border,
      paddingVertical: 9,
      paddingHorizontal: 11,
      borderRadius: 9,
    },
    selected: { borderColor: C.green, backgroundColor: C.tint },
    chipText: { color: C.white, fontSize: 11, fontWeight: "700" },
    input: {
      backgroundColor: C.bg,
      borderWidth: 1,
      borderColor: C.border,
      borderRadius: 10,
      padding: 13,
      color: C.white,
      marginTop: 12,
    },
    runGrid: { flexDirection: "row", gap: 9, flexWrap: "wrap" },
    runButton: {
      width: "31%",
      flexGrow: 1,
      minWidth: 80,
      height: 78,
      borderRadius: 14,
      backgroundColor: C.card,
      borderColor: C.border,
      borderWidth: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    boundary: { backgroundColor: C.tint, borderColor: C.green },
    runText: { color: C.white, fontSize: 27, fontWeight: "900" },
    runLabel: {
      color: C.green,
      fontSize: 8,
      fontWeight: "900",
      letterSpacing: 1,
    },
    extraButton: {
      flexGrow: 1,
      paddingVertical: 13,
      paddingHorizontal: 10,
      backgroundColor: C.card,
      borderWidth: 1,
      borderColor: C.border,
      borderRadius: 10,
      alignItems: "center",
    },
    extraText: { color: C.white, fontSize: 10, fontWeight: "800" },
    inline: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: 8,
      marginTop: 8,
      padding: 12,
      backgroundColor: C.card,
      borderRadius: 10,
    },
    inlineText: {
      color: C.green,
      fontSize: 11,
      fontWeight: "800",
      width: "100%",
    },
    tinyButton: {
      backgroundColor: C.green,
      borderRadius: 7,
      paddingHorizontal: 16,
      paddingVertical: 9,
    },
    tinyText: { color: C.bg, fontWeight: "900" },
    wicketSelected: { borderColor: C.red },
    wicketButton: {
      marginTop: 10,
      backgroundColor: C.red,
      padding: 15,
      alignItems: "center",
      borderRadius: 10,
    },
    primary: {
      marginTop: 16,
      backgroundColor: C.green,
      padding: 16,
      borderRadius: 10,
      alignItems: "center",
    },
    primaryText: {
      color: C.bg,
      fontWeight: "900",
      fontSize: 12,
      letterSpacing: 1,
    },
    finish: {
      marginTop: 24,
      padding: 18,
      backgroundColor: C.card,
      borderColor: C.green,
      borderWidth: 1,
      borderRadius: 14,
      alignItems: "center",
    },
    finishTitle: {
      color: C.green,
      fontSize: 14,
      fontWeight: "900",
      marginBottom: 4,
    },
    actions: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 18,
    },
    secondary: {
      padding: 12,
      borderRadius: 9,
      borderWidth: 1,
      borderColor: C.border,
    },
    secondaryText: { color: C.white, fontWeight: "800", fontSize: 10 },
    disabled: { opacity: 0.35 },
    ballCount: { color: C.muted, fontSize: 10 },
    recent: { marginTop: 10, borderTopColor: C.border, borderTopWidth: 1 },
    ball: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomColor: C.border,
      borderBottomWidth: 1,
      gap: 12,
    },
    ballOver: { color: C.green, width: 30, fontWeight: "800", fontSize: 11 },
    ballText: { color: C.white, flex: 1, fontSize: 12, fontWeight: "700" },
    fieldingPick: {
      marginTop: 10,
      padding: 12,
      borderColor: C.border,
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: C.card,
    },
    ballBatter: { color: C.muted, fontSize: 10 },
    hint: { color: C.muted, fontSize: 12, lineHeight: 18 },
    error: { color: C.red, marginTop: 12 },
    bowlerPrompt: {
      color: C.green,
      fontSize: 12,
      fontWeight: "900",
      marginTop: 10,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.72)",
      justifyContent: "center",
      alignItems: "center",
      padding: 24,
    },
    modalCard: {
      width: "100%",
      maxWidth: 440,
      backgroundColor: C.card,
      borderWidth: 1,
      borderColor: C.green,
      borderRadius: 16,
      padding: 20,
    },
    modalTitle: {
      color: C.green,
      fontSize: 15,
      fontWeight: "900",
      letterSpacing: 1.3,
      marginBottom: 8,
    },
    modalBowler: {
      backgroundColor: C.tint,
      borderWidth: 1,
      borderColor: C.green,
      paddingVertical: 13,
      paddingHorizontal: 14,
      borderRadius: 10,
    },
    drawAction: {
      marginTop: 14,
      padding: 12,
      borderColor: C.border,
      borderWidth: 1,
      borderRadius: 9,
      alignItems: "center",
    },
    drawText: {
      color: C.muted,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 1,
    },
    modalActions: {
      flexDirection: "row",
      gap: 10,
      flexWrap: "wrap",
      marginTop: 16,
    },
    cancelAction: {
      backgroundColor: C.card,
      borderWidth: 1,
      borderColor: C.border,
      paddingVertical: 13,
      paddingHorizontal: 14,
      borderRadius: 10,
    },
  });
},769,[863,771,772,12,228,102,206,238,104,245,133,28,188,255,227,109,867,868,866,865,6]);
__d(function(g,r,i,a,m,_e,d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),_e.AnimatedCounter=function({value:e,style:s,...l}){const f=(0,t.useRef)(new u.default.Value(1)).current;return(0,t.useEffect)(()=>{f.setValue(1.14),u.default.spring(f,{toValue:1,stiffness:300,damping:16,mass:.5,useNativeDriver:!0}).start()},[f,e]),(0,n.jsx)(u.default.Text,{...l,style:[s,{transform:[{scale:f}]}],children:e})};var e,t=r(d[0]),s=r(d[1]),u=(e=s)&&e.__esModule?e:{default:e},n=r(d[2])},867,[12,102,6]);
__d(function(g,r,i,a,m,_e,d){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(_e,'__esModule',{value:!0}),_e.ConfettiBurst=function(e){const c=(0,t.c)(5),{visible:_}=e;let h;c[0]===Symbol.for("react.memo_cache_sentinel")?(h=Array.from({length:28},F),c[0]=h):h=c[0];const b=h;let y,R,z;c[1]!==_?(y=()=>{_?u.default.parallel(b.map(p)).start():b.forEach(v)},R=[b,_],c[1]=_,c[2]=y,c[3]=R):(y=c[2],R=c[3]);if((0,n.useEffect)(y,R),!_)return null;c[4]===Symbol.for("react.memo_cache_sentinel")?(z=(0,s.jsx)(o.default,{pointerEvents:"none",style:l.default.absoluteFill,children:b.map(f)}),c[4]=z):z=c[4];return z};var t=r(d[0]),n=r(d[1]),u=e(r(d[2])),l=e(r(d[3])),o=e(r(d[4])),s=r(d[5]);const c=["#B7F34A","#F5F7F2","#6CD6FF","#FFC857","#FF8B80"];function f(e,t){return(0,s.jsx)(u.default.View,{style:[_.piece,{left:e.left,backgroundColor:e.color,width:e.size,height:1.7*e.size,opacity:e.value.interpolate({inputRange:[0,.7,1],outputRange:[1,1,0]}),transform:[{translateY:e.value.interpolate({inputRange:[0,1],outputRange:[-50,470+t%5*45]})},{rotate:e.value.interpolate({inputRange:[0,1],outputRange:["0deg",e.rotate]})}]}]},t)}function p(e){return u.default.timing(e.value,{toValue:1,duration:950+25*e.size,useNativeDriver:!0})}function v(e){return e.value.setValue(0)}function F(e,t){return{value:new u.default.Value(0),left:37*t%96+"%",color:c[t%c.length],rotate:73*t%360+"deg",size:5+t%4*2}}const _=l.default.create({piece:{position:"absolute",top:"32%",borderRadius:2}})},868,[770,12,102,28,109,6]);