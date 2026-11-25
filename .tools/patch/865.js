// module 865 from __common-544e76b37d4da68f62c23250dda1d8c8.js deps=[866]
(function (g, r, i, a, m, e, d) {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: !0 }),
    (e.dismissedBatterNames = n),
    (e.recoverBatters = function (s, o, l) {
      const u = n(s),
        c = u.size >= Math.max(1, o.length);
      if (!s.length)
        return {
          striker: o[0] ?? "",
          nonStriker: "duo" === l ? (o[1] ?? "") : "",
          nextSlot: null,
          blockedBatter: "",
          allOut: c,
        };
      let k = s[0].batter,
        w = "duo" === l ? (o.find((t) => t !== k) ?? "") : "",
        h = 0;
      s.forEach((n, o) => {
        n.batter !== k && (n.batter === w ? ([k, w] = [w, k]) : (k = n.batter));
        const u = (0, t.deliveryTotals)(n);
        u.rotate && w && ([k, w] = [w, k]);
        const c = n.wicket
          ? (n.dismissedBatter ?? n.batter)
          : n.retiredHurt
            ? n.batter
            : "";
        c && (k === c ? (k = "") : w === c && (w = "")),
          u.legal && (h++, "duo" === l && h % 6 == 0 && ([k, w] = [w, k]));
        const f = s[o + 1];
        f &&
          f.batter !== k &&
          (f.batter === w ? ([k, w] = [w, k]) : (k = f.batter));
      });
      const f = o.filter((t) => !u.has(t));
      let S = null;
      c || "duo" !== l
        ? c || k || !f.length || (S = "striker")
        : k
          ? !w && f.some((t) => t !== k) && (S = "nonStriker")
          : f.some((t) => t !== w)
            ? (S = "striker")
            : w && ((k = w), (w = ""));
      const b = s.at(-1),
        B = S && b.wicket ? (b.dismissedBatter ?? b.batter) : "";
      return {
        striker: "striker" === S ? "" : k,
        nonStriker:
          "duo" === l && "nonStriker" === S ? "" : "duo" === l ? w : "",
        nextSlot: S,
        blockedBatter: B,
        allOut: c,
      };
    }),
    (e.nextBatterOptions = function (t, n, s, o, l, u = "") {
      return t.filter(
        (t) => !n.has(t) && t !== u && ("striker" === l ? t !== o : t !== s),
      );
    }),
    (e.resolveDismissal = function (t, s, o, l, u, c, k = !1) {
      const w = n(t);
      k || w.add(c);
      let h = l,
        f = u;
      c === h ? (h = "") : c === f && (f = "");
      const S = w.size >= Math.max(1, s.length);
      if (S)
        return {
          striker: "",
          nonStriker: "",
          nextSlot: null,
          blockedBatter: "",
          allOut: S,
        };
      const b = c === l ? "striker" : "nonStriker";
      if (s.find((t) => !(w.has(t) || t === h || t === f || (k && t === c))))
        return {
          striker: h,
          nonStriker: f,
          nextSlot: b,
          blockedBatter: k ? c : "",
          allOut: S,
        };
      if (k && !h && !f)
        return {
          striker: "",
          nonStriker: "",
          nextSlot: b,
          blockedBatter: "",
          allOut: S,
        };
      "striker" === b && f
        ? ((h = f), (f = ""))
        : "nonStriker" === b && h && ((f = h), (h = ""));
      return {
        striker: h,
        nonStriker: "duo" === o ? f : "",
        nextSlot: null,
        blockedBatter: "",
        allOut: S,
      };
    }),
    (e.overRequiresNewBowler = function (n, s, o) {
      return Boolean(
        n && (0, t.deliveryTotals)(n).legal && s > 0 && s % 6 == 0 && !o,
      );
    }),
    (e.normalChaseTarget = function (t) {
      return t + 1;
    }),
    (e.testChaseTarget = function (t, n, s) {
      return Math.max(1, t + s - n + 1);
    }),
    (e.normalChaseResult = function (t, n, s, o, l) {
      return t === n - 1
        ? { result: "tie", winner: null, margin: 0 }
        : t >= n
          ? { result: "win", winner: s, margin: Math.max(0, l - o) }
          : { result: "win", winner: "A" === s ? "B" : "A", margin: n - 1 - t };
    }),
    (e.testThirdInningsResult = function (t, n, s, o) {
      return t + s < n
        ? { result: "win", winner: "A" === o ? "B" : "A", margin: n - t - s }
        : null;
    }),
    (e.testFourthInningsResult = function (t, n, s, o, l) {
      return t === n - 1
        ? { result: "tie", winner: null, margin: 0 }
        : t < n
          ? { result: "win", winner: "A" === s ? "B" : "A", margin: n - 1 - t }
          : { result: "win", winner: s, margin: Math.max(0, l - o) };
    }),
    (e.describeMatchResult = function (t) {
      if ("draw" === t.resultType) return "Match drawn";
      if ("tie" === t.resultType) return "Match tied";
      if ("completed" !== t.status || !t.winnerSide) return "";
      if (t.superOver) return `${"A" === t.winnerSide ? t.teamA : t.teamB} won the super over`;
      const n = (t) => ("A" === t ? "B" : "A"),
        s = t.battingFirst === t.teamA ? "A" : "B",
        o = n(s),
        l = "A" === t.winnerSide ? t.teamA : t.teamB;
      if (
        "normal" === t.matchType
          ? t.winnerSide === o
          : t.winnerSide === o && (t.scores[3]?.runs ?? 0) > 0
      ) {
        const n = "normal" === t.matchType ? t.scores[1] : t.scores[3],
          s = t.teamSizes[t.winnerSide],
          o = Math.max(0, s - (n?.wickets ?? 0));
        return `${l} won by ${o} wicket${1 === o ? "" : "s"}`;
      }
      const u = (n) =>
          t.scores.reduce(
            (t, l, u) => t + ((u % 2 == 0 ? s : o) === n ? l.runs : 0),
            0,
          ),
        c = Math.abs(u(t.winnerSide) - u(n(t.winnerSide)));
      return 0 === c
        ? "Match tied"
        : `${l} won by ${c} run${1 === c ? "" : "s"}`;
    }),
    (e.chaseProgress = function (t, n, s, o, l, u) {
      if (t <= 0) return "";
      const c = Math.max(0, t - n),
        k = Math.max(0, 6 * o - s),
        w = Math.max(0, u - l);
      return `Need ${c} run${1 === c ? "" : "s"} from ${k} ball${1 === k ? "" : "s"} \xb7 ${w} wicket${1 === w ? "" : "s"} in hand`;
    });
  var t = r(d[0]);
  function n(t) {
    return new Set(
      t.filter((t) => t.wicket).map((t) => t.dismissedBatter ?? t.batter),
    );
  }
});
