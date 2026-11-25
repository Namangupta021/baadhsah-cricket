// module 759 from _layout-c2fef04989f7440d404f8d0c7d3ea14c.js deps=[770,12,771,772,551,228,109,773,6]
(function (g, r, i, a, m, _e, d) {
  "use strict";
  function e(e) {
    return e && e.__esModule ? e : { default: e };
  }
  Object.defineProperty(_e, "__esModule", { value: !0 }),
    Object.defineProperty(_e, "default", {
      enumerable: !0,
      get: function () {
        return _;
      },
    });
  var t = r(d[0]),
    n = r(d[1]),
    c = r(d[2]),
    o = r(d[3]),
    l = r(d[4]),
    s = e(r(d[5])),
    u = e(r(d[6])),
    f = r(d[7]),
    b = r(d[8]);
  function _() {
    const e = (0, t.c)(3);
    let _, h, S;
    return (
      e[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((_ = (0, b.jsx)(u.default, {
            style: {
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#080D0B",
            },
            children: [
              (0, b.jsx)(s.default, { color: "#B7F34A" }),
              (0, b.jsx)("div", {
                style: { color: "#89948B", fontSize: 12, marginTop: 14, fontFamily: "system-ui, sans-serif" },
                children: "Getting latest records\u2026",
              }),
            ],
          })),
          (e[0] = _))
        : (_ = e[0]),
      e[1] === Symbol.for("react.memo_cache_sentinel")
        ? ((h = (0, b.jsx)(l.StatusBar, { style: "light" })), (e[1] = h))
        : (h = e[1]),
      e[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((S = (0, b.jsx)(n.Suspense, {
            fallback: _,
            children: (0, b.jsxs)(o.SQLiteProvider, {
              databaseName: "baadhsah-cricket.db",
              onInit: async (db) => {
                await f.initializeDatabase(db);
                await f.cloud.pullOnOpen(db, o.deserializeDatabaseAsync);
              },
              useSuspense: !0,
              children: [
                h,
                (0, b.jsx)(c.Stack, {
                  screenOptions: {
                    headerShown: !1,
                    contentStyle: { backgroundColor: "#080D0B" },
                  },
                }),
              ],
            }),
          })),
          (e[2] = S))
        : (S = e[2]),
      S
    );
  }
});
