// module 767 from rankings-233247f00879b6981bae17b5ca680271.js deps=[770,771,772,12,238,245,133,28,188,109,6,862]
(function (g, r, i, _a, m, _e, d) {
  "use strict";
  function e(e) {
    return e && e.__esModule ? e : { default: e };
  }
  Object.defineProperty(_e, "__esModule", { value: !0 }),
    Object.defineProperty(_e, "default", {
      enumerable: !0,
      get: function () {
        return N;
      },
    });
  var t = r(d[0]),
    l = r(d[1]),
    s = r(d[2]),
    a = r(d[3]),
    n = e(r(d[4])),
    o = e(r(d[5])),
    c = e(r(d[6])),
    u = e(r(d[7])),
    h = e(r(d[8])),
    p = e(r(d[9])),
    E = r(d[10]),
    Zr = r(d[11]);
  const f = "#080D0B",
    S = "#111A15",
    b = "#B7F34A",
    O = "#F5F7F2",
    y = "#89948B",
    C = "#26332A";
  function PlayerCompare({ format }) {
    const db=(0,s.useSQLiteContext)(), [open,setOpen]=(0,a.useState)(false), [players,setPlayers]=(0,a.useState)([]), [grounds,setGrounds]=(0,a.useState)([]), [ground,setGround]=(0,a.useState)(""), [first,setFirst]=(0,a.useState)(null), [second,setSecond]=(0,a.useState)(null), [choosing,setChoosing]=(0,a.useState)(null), [figures,setFigures]=(0,a.useState)([]);
    (0,a.useEffect)(()=>{let active=true; db.getAllAsync("SELECT id,name FROM players WHERE is_active=1 AND player_type='club' ORDER BY name COLLATE NOCASE").then(x=>{if(active)setPlayers(x)}).catch(()=>{}); db.getAllAsync("SELECT DISTINCT ground FROM matches WHERE status='completed' AND match_type=? AND ground IS NOT NULL AND trim(ground)!='' ORDER BY ground COLLATE NOCASE",format).then(x=>{if(active){setGrounds(x.map(y=>String(y.ground)));setGround('')}}).catch(()=>{}); return()=>{active=false}},[db,format]);
    (0,a.useEffect)(()=>{let active=true;if(!first||!second){setFigures([]);return()=>{active=false}} db.getAllAsync("SELECT p.id,p.name,COALESCE(SUM(d.runs_bat),0) runs,COUNT(CASE WHEN d.id IS NOT NULL AND lower(COALESCE(d.extra_type,''))!='wide' THEN 1 END) balls,SUM(CASE WHEN d.runs_bat=4 THEN 1 ELSE 0 END) fours,SUM(CASE WHEN d.runs_bat=6 THEN 1 ELSE 0 END) sixes,SUM(CASE WHEN d.wicket=1 AND lower(COALESCE(d.dismissal,'')) NOT IN('run out','retired hurt','obstructing the field','timed out') THEN 1 ELSE 0 END) outs,COUNT(DISTINCT CASE WHEN mp.match_id IS NOT NULL THEN m.id END) matches,COUNT(DISTINCT CASE WHEN d.id IS NOT NULL THEN m.id||':'||d.innings END) innings FROM players p LEFT JOIN matches m ON m.status='completed' AND m.match_type=? AND (?='' OR lower(trim(m.ground))=lower(trim(?))) LEFT JOIN match_players mp ON mp.match_id=m.id AND mp.player_id=p.id LEFT JOIN deliveries d ON d.match_id=m.id AND (m.match_type='test' OR d.innings<=2) AND d.batter=p.name WHERE p.id IN(?,?) GROUP BY p.id,p.name",format,ground,ground,first,second).then(x=>{if(active)setFigures(x)}).catch(()=>{if(active)setFigures([])});return()=>{active=false}},[db,first,second,ground,format]);
    const btn=(label,action,style)=> (0,E.jsx)(o.default,{onPress:action,style,children:(0,E.jsx)(h.default,{style:{color:b,fontSize:9,fontWeight:"900"},children:label})});
    const picker=choosing?(0,E.jsxs)(p.default,{children:[(0,E.jsx)(h.default,{style:{color:b,fontWeight:"900",fontSize:10,marginBottom:8},children:choosing==="first"?"SELECT PLAYER A":"SELECT PLAYER B"}),(0,E.jsx)(c.default,{style:{maxHeight:250},nestedScrollEnabled:!0,keyboardShouldPersistTaps:"handled",children:players.filter(x=>x.id!==(choosing==="first"?second:first)).map(x=>(0,E.jsx)(o.default,{onPress:()=>{choosing==="first"?setFirst(x.id):setSecond(x.id);setChoosing(null)},style:{padding:11,borderBottomWidth:1,borderBottomColor:C},children:(0,E.jsx)(h.default,{style:{color:O,fontSize:12,fontWeight:"800"},children:x.name})},x.id))}),btn("BACK",()=>setChoosing(null),{padding:8})]}):(0,E.jsxs)(p.default,{children:[(0,E.jsxs)(p.default,{style:{flexDirection:"row",gap:7},children:[btn(first?(players.find(x=>x.id===first)?.name||"PLAYER A"):"SELECT PLAYER A",()=>setChoosing("first"),{flex:1,minHeight:44,justifyContent:"center",padding:8,backgroundColor:S,borderWidth:1,borderColor:C,borderRadius:8}),(0,E.jsx)(h.default,{style:{color:b,alignSelf:"center",fontWeight:"900"},children:"VS"}),btn(second?(players.find(x=>x.id===second)?.name||"PLAYER B"):"SELECT PLAYER B",()=>setChoosing("second"),{flex:1,minHeight:44,justifyContent:"center",padding:8,backgroundColor:S,borderWidth:1,borderColor:C,borderRadius:8})]}),(0,E.jsx)(c.default,{horizontal:!0,showsHorizontalScrollIndicator:!1,contentContainerStyle:{flexDirection:"row",gap:6,paddingVertical:9},children:["",...grounds].map(x=>btn(x||"ALL GROUNDS",()=>setGround(x),{padding:8,borderRadius:14,backgroundColor:ground===x?"#202B18":S,borderWidth:1,borderColor:ground===x?b:C}))}),first&&second?(figures.length?(0,E.jsxs)(p.default,{style:{flexDirection:"row",gap:7},children:figures.map(x=>{const runs=Number(x.runs)||0,balls=Number(x.balls)||0,outs=Number(x.outs)||0;return(0,E.jsxs)(p.default,{style:{flex:1,minWidth:0,padding:9,borderRadius:8,backgroundColor:S,borderWidth:1,borderColor:C},children:[(0,E.jsx)(h.default,{numberOfLines:1,style:{color:O,fontSize:11,fontWeight:"900",marginBottom:6},children:x.name}),...[ ["RUNS",runs],["BALLS",balls],["STRIKE RATE",balls?(100*runs/balls).toFixed(1):"—"],["AVERAGE",outs?(runs/outs).toFixed(1):(runs?"Not out":"—")],["4s / 6s",`${x.fours||0} / ${x.sixes||0}`],["MATCHES",x.matches||0],["INNINGS",x.innings||0] ].map(([k,v])=>(0,E.jsxs)(h.default,{style:{color:y,fontSize:9,marginTop:5},children:[k,"  ",(0,E.jsx)(h.default,{style:{color:O,fontWeight:"800"},children:v})]},k))]},x.id)})}):(0,E.jsx)(h.default,{style:{color:y,fontSize:10,padding:12},children:"No completed batting figures for this ground yet."})):(0,E.jsx)(h.default,{style:{color:y,fontSize:10,padding:12},children:"Choose two players to compare their recorded batting figures."})]});
    return(0,E.jsxs)(p.default,{style:{marginTop:0},children:[(0,E.jsx)(o.default,{accessibilityRole:"button",onPress:()=>setOpen(true),style:{minWidth:44,minHeight:44,alignItems:"center",justifyContent:"center",paddingHorizontal:10,paddingVertical:7,borderRadius:9,borderWidth:1,borderColor:b,backgroundColor:S},children:(0,E.jsx)(h.default,{style:{color:b,fontSize:10,fontWeight:"900"},children:"VS"})}),(0,E.jsx)(n.default,{visible:open,transparent:!0,animationType:"fade",onRequestClose:()=>{setOpen(false);setChoosing(null)},children:(0,E.jsx)(p.default,{style:{flex:1,backgroundColor:"rgba(0,0,0,.78)",justifyContent:"center",alignItems:"center",padding:14},children:(0,E.jsxs)(p.default,{style:{width:"100%",maxWidth:560,maxHeight:"90%",padding:14,borderRadius:14,borderWidth:1,borderColor:C,backgroundColor:S},children:[(0,E.jsxs)(p.default,{style:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:10},children:[(0,E.jsxs)(p.default,{children:[(0,E.jsx)(h.default,{style:{color:b,fontSize:9,fontWeight:"900",letterSpacing:1},children:format.toUpperCase()+" COMPARISON"}),(0,E.jsx)(h.default,{style:{color:O,fontSize:20,fontWeight:"900",marginTop:3},children:"Player vs Player"})]}),btn("CLOSE",()=>{setOpen(false);setChoosing(null)},{padding:9,borderRadius:7,borderWidth:1,borderColor:C})]}),(0,E.jsx)(c.default,{style:{maxHeight:"88%"},nestedScrollEnabled:!0,keyboardShouldPersistTaps:"handled",children:picker})]})})})]});
  }
  function ProfileChart({ player, format }) {
    const db = (0, s.useSQLiteContext)();
    const [rows, setRows] = (0, a.useState)([]);
    const [ground, setGround] = (0, a.useState)("");
    const [grounds, setGrounds] = (0, a.useState)([]);
    const [metric, setMetric] = (0, a.useState)("runs");
    const [chartWidth, setChartWidth] = (0, a.useState)(320);
    (0, a.useEffect)(() => {
      let active = true;
      db.getAllAsync("SELECT DISTINCT ground FROM matches WHERE match_type=? AND status='completed' AND ground IS NOT NULL AND trim(ground)!='' ORDER BY ground COLLATE NOCASE", format)
        .then((items) => { if (active) setGrounds(items.map((item) => String(item.ground))); })
        .catch(() => { if (active) setGrounds([]); });
      return () => { active = false; };
    }, [db, format]);
    (0, a.useEffect)(() => {
      let active = true;
      if (!player?.id) { setRows([]); return () => { active = false; }; }
      db.getAllAsync("SELECT m.id,m.ground,COALESCE(m.completed_at,m.created_at) matchDate,(SELECT COALESCE(SUM(d.runs_bat),0) FROM deliveries d WHERE d.match_id=m.id AND d.batter=? AND (m.match_type='test' OR d.innings<=2)) runs,(SELECT COALESCE(SUM(CASE WHEN d.wicket=1 AND lower(COALESCE(d.dismissal,'')) NOT IN('run out','retired hurt','obstructing the field','timed out') THEN 1 ELSE 0 END),0) FROM deliveries d WHERE d.match_id=m.id AND d.bowler=? AND (m.match_type='test' OR d.innings<=2)) wickets FROM matches m JOIN match_players mp ON mp.match_id=m.id AND mp.player_id=? WHERE m.match_type=? AND m.status='completed' AND (?='' OR lower(trim(m.ground))=lower(trim(?))) ORDER BY matchDate DESC LIMIT 5", player.name, player.name, player.id, format, ground, ground)
        .then((items) => { if (active) setRows(items.reverse()); })
        .catch(() => { if (active) setRows([]); });
      return () => { active = false; };
    }, [db, player?.id, player?.name, format, ground]);
    if (rows.length < 5) return null;
    const maxValue = Math.max(1, ...rows.map((item) => Number(item[metric]) || 0)),
      graphTop = 24, graphBottom = 94, graphSpan = graphBottom - graphTop,
      xAt = (index) => 20 + index * ((Math.max(chartWidth, 240) - 40) / 4),
      yAt = (item) => graphBottom - graphSpan * ((Number(item[metric]) || 0) / maxValue),
      matchLabel = (item, index) => {
        const match = String(item.matchDate || "").match(/(\d{4})-(\d{2})-(\d{2})/);
        return match ? match[3] + "/" + match[2] : "M" + (index + 1);
      };
    const title = (0, E.jsx)(h.default, { style: { color: b, fontSize: 10, fontWeight: "900", letterSpacing: 1 }, children: `LAST 5 MATCHES · ${"runs" === metric ? "BATTING RUNS" : "BOWLING WICKETS"}` });
    const buttons = (0, E.jsx)(c.default, { horizontal: !0, showsHorizontalScrollIndicator: !1, contentContainerStyle: { flexDirection: "row", gap: 6, paddingVertical: 6 }, children: [["runs", "RUNS"], ["wickets", "WICKETS"]].map(([value, label]) => (0, E.jsx)(o.default, { onPress: () => setMetric(value), style: { paddingHorizontal: 9, paddingVertical: 6, borderRadius: 14, borderWidth: 1, borderColor: metric === value ? b : C, backgroundColor: metric === value ? "#202B18" : S }, children: (0, E.jsx)(h.default, { style: { color: metric === value ? b : y, fontSize: 8, fontWeight: "800" }, children: label }) }, value)) });
    const groundButtons = (0, E.jsx)(c.default, { horizontal: !0, showsHorizontalScrollIndicator: !1, contentContainerStyle: { flexDirection: "row", gap: 6, paddingBottom: 6 }, children: ["", ...grounds].map((value) => (0, E.jsx)(o.default, { onPress: () => setGround(value), style: { paddingHorizontal: 9, paddingVertical: 6, borderRadius: 14, borderWidth: 1, borderColor: ground === value ? b : C, backgroundColor: ground === value ? "#202B18" : S }, children: (0, E.jsx)(h.default, { style: { color: ground === value ? b : y, fontSize: 8, fontWeight: "800" }, children: value || "ALL GROUNDS" }) }, value || "all")) });
    const plot = (0, E.jsxs)(p.default, { onLayout: (event) => { const width = Math.round(event.nativeEvent.layout.width); if (width > 0 && width !== chartWidth) setChartWidth(width); }, style: { height: 124, position: "relative", marginTop: 4, overflow: "visible" }, children: [
      rows.slice(0, -1).map((item, index) => {
        const x1=xAt(index), y1=yAt(item), x2=xAt(index+1), y2=yAt(rows[index+1]);
        const dx=x2-x1, dy=y2-y1, length=Math.sqrt(dx*dx+dy*dy), angle=Math.atan2(dy,dx)*180/Math.PI;
        return (0, E.jsx)(p.default, { pointerEvents: "none", style: { position: "absolute", left: (x1+x2-length)/2, top: (y1+y2)/2-1.5, width: length, height: 3, borderRadius: 3, backgroundColor: b, transform: [{ rotate: angle + "deg" }] } }, "line-" + index);
      }),
      rows.map((item, index) => {
        const x=xAt(index), pointY=yAt(item);
        return (0, E.jsxs)(p.default, { pointerEvents: "none", children: [
          (0, E.jsx)(h.default, { style: { position: "absolute", left: x-22, top: Math.max(0,pointY-22), width: 44, color: O, fontSize: 11, fontWeight: "900", textAlign: "center" }, children: Number(item[metric])||0 }),
          (0, E.jsx)(p.default, { style: { position: "absolute", left: x-5, top: pointY-5, width: 10, height: 10, borderRadius: 5, backgroundColor: b, borderWidth: 2, borderColor: "#E8FFB0" } }),
          (0, E.jsx)(h.default, { style: { position: "absolute", left: x-22, top: 103, width: 44, color: y, fontSize: 8, fontWeight: "800", textAlign: "center" }, children: matchLabel(item,index) }),
        ] }, item.id);
      }),
    ] });
    return (0, E.jsxs)(p.default, { style: { marginTop: 8, padding: 11, borderRadius: 10, backgroundColor: f, borderWidth: 1, borderColor: C }, children: [title, buttons, groundButtons, plot] });
  }
  function ProfileRecords({ player, format }) {
    const db = (0, s.useSQLiteContext)();
    const [formats, setFormats] = (0, a.useState)([]);
    const [venues, setVenues] = (0, a.useState)([]);
    const [victims, setVictims] = (0, a.useState)([]);
    (0, a.useEffect)(() => {
      let active = true;
      if (!player?.id) return () => { active = false; };
      Promise.all([
        db.getAllAsync("SELECT lower(m.match_type) type,COUNT(DISTINCT m.id) matches,(SELECT COALESCE(SUM(d.runs_bat),0) FROM deliveries d WHERE d.match_id=m.id AND d.batter=? AND (m.match_type='test' OR d.innings<=2)) runs,(SELECT COALESCE(SUM(CASE WHEN d.wicket=1 AND lower(COALESCE(d.dismissal,'')) NOT IN('run out','retired hurt','obstructing the field','timed out') THEN 1 ELSE 0 END),0) FROM deliveries d WHERE d.match_id=m.id AND d.bowler=? AND (m.match_type='test' OR d.innings<=2)) wickets FROM matches m JOIN match_players mp ON mp.match_id=m.id AND mp.player_id=? WHERE m.status='completed' GROUP BY lower(m.match_type)", player.name, player.name, player.id),
        db.getAllAsync("SELECT m.ground,COUNT(DISTINCT m.id) matches,(SELECT COALESCE(SUM(d.runs_bat),0) FROM deliveries d WHERE d.match_id=m.id AND d.batter=? AND (m.match_type='test' OR d.innings<=2)) runs,(SELECT COALESCE(SUM(CASE WHEN d.wicket=1 AND lower(COALESCE(d.dismissal,'')) NOT IN('run out','retired hurt','obstructing the field','timed out') THEN 1 ELSE 0 END),0) FROM deliveries d WHERE d.match_id=m.id AND d.bowler=? AND (m.match_type='test' OR d.innings<=2)) wickets FROM matches m JOIN match_players mp ON mp.match_id=m.id AND mp.player_id=? WHERE m.match_type=? AND m.status='completed' AND m.ground IS NOT NULL AND trim(m.ground)!='' GROUP BY m.ground ORDER BY runs+15*wickets DESC,m.ground LIMIT 3", player.name, player.name, player.id, format),
        db.getAllAsync("SELECT COALESCE(d.dismissed_batter,d.batter) name,COUNT(*) wickets,SUM(d.runs_bat+CASE WHEN d.extra_type IN('bye','leg-bye') THEN 0 ELSE d.extras END) conceded,SUM(d.legal) balls FROM deliveries d JOIN matches m ON m.id=d.match_id WHERE d.bowler=? AND m.match_type=? AND m.status='completed' AND d.wicket=1 AND lower(COALESCE(d.dismissal,'')) NOT IN('run out','retired hurt','obstructing the field','timed out') GROUP BY name ORDER BY wickets DESC,conceded ASC,name LIMIT 3", player.name, format),
      ]).then(([formatRows, venueRows, victimRows]) => { if (active) setFormats(formatRows), setVenues(venueRows), setVictims(victimRows); }).catch(() => {});
      return () => { active = false; };
    }, [db, player?.id, player?.name, format]);
    return (0, E.jsxs)(p.default, { style: { marginTop: 8, padding: 11, borderRadius: 10, backgroundColor: f, borderWidth: 1, borderColor: C }, children: [
      (0, E.jsx)(h.default, { style: _.section, children: "PLAYER RECORDS" }),
      (0, E.jsx)(h.default, { style: _.meta, children: `FIELDING · ${player?.catches ?? 0} catches · ${player?.runOuts ?? 0} run-outs · ${player?.stumpings ?? 0} stumpings` }),
      (0, E.jsx)(h.default, { style: _.meta, children: `BOUNDARIES · ${player?.fours ?? 0} fours · ${player?.sixes ?? 0} sixes · MVP ${player?.mvpCount ?? 0}` }),
      ...formats.map((item) => (0, E.jsx)(h.default, { style: _.meta, children: `${String(item.type).toUpperCase()} · ${item.matches} matches · ${item.runs || 0} runs · ${item.wickets || 0} wickets` }, item.type)),
      ...venues.map((item) => (0, E.jsx)(h.default, { style: _.meta, children: `GROUND · ${item.ground} · ${item.matches}m · ${item.runs || 0}r/${item.wickets || 0}w` }, item.ground)),
      victims.length ? (0, E.jsx)(h.default, { style: _.meta, children: `TOP VICTIMS · ${victims.map((item) => `${item.name} ${item.wickets}`).join(" · ")}` }) : null,
    ] });
  }
  function sortLeaderboard(rows, category, baseCompare) {
    const byName = (playerA, playerB) => playerA.name.localeCompare(playerB.name);
    const metric = (player, key) => Number(player[key]) || 0;
    const rate = (player, numerator, denominator) => metric(player, denominator) ? metric(player, numerator) / metric(player, denominator) : 0;
    return [...rows]
      .filter((player) => category !== "strikeRate" || Number(player.balls) >= 10)
      .filter((player) => category !== "captaincy" && category !== "captainWins" || Number(player.captainMatches) > 0)
      .filter((player) => category !== "bowlingAverage" && category !== "bowlingStrikeRate" || Number(player.wickets) > 0)
      .filter((player) => category !== "economy" || Number(player.bowlingBalls) > 0)
      .filter((player) => category !== "mvp" || Number(player.mvpCount) > 0)
      .filter((player) => category !== "scores25" || Number(player.scores25) > 0)
      .sort((playerA, playerB) =>
        category === "strikeRate"
          ? rate(playerB, "runs", "balls") - rate(playerA, "runs", "balls") || byName(playerA, playerB)
          : category === "average"
            ? rate(playerB, "runs", "dismissals") - rate(playerA, "runs", "dismissals") || byName(playerA, playerB)
            : category === "sixes" || category === "fours" || category === "scores25" || category === "dotBalls" || category === "catches" || category === "runOuts" || category === "stumpings" || category === "captainWins"
              ? metric(playerB, category) - metric(playerA, category) || byName(playerA, playerB)
              : category === "bowlingAverage"
                ? rate(playerA, "conceded", "wickets") - rate(playerB, "conceded", "wickets") || byName(playerA, playerB)
                : category === "economy"
                  ? rate(playerA, "conceded", "bowlingBalls") - rate(playerB, "conceded", "bowlingBalls") || byName(playerA, playerB)
                  : category === "bowlingStrikeRate"
                    ? rate(playerA, "bowlingBalls", "wickets") - rate(playerB, "bowlingBalls", "wickets") || byName(playerA, playerB)
                    : category === "captaincy"
                      ? rate(playerB, "captainWins", "captainMatches") - rate(playerA, "captainWins", "captainMatches") || byName(playerA, playerB)
                      : category === "mvp"
                        ? playerB.mvpCount - playerA.mvpCount || playerB.mvpPoints - playerA.mvpPoints || byName(playerA, playerB)
                        : baseCompare(playerA, playerB),
      );
  }
  function getRankMovement(currentRows, previousRows) {
    const previousRanks = new Map(previousRows.map((player, index) => [String(player.id), index + 1]));
    const moves = {};
    currentRows.forEach((player, index) => {
      const currentRank = index + 1;
      const previousRank = previousRanks.get(String(player.id));
      moves[player.id] = previousRank === undefined ? { direction: "new", places: 0 } : previousRank > currentRank ? { direction: "up", places: previousRank-currentRank } : previousRank < currentRank ? { direction: "down", places: currentRank-previousRank } : { direction: "same", places: 0 };
    });
    return moves;
  }
  function N() {
    const e = (0, t.c)(98),
      u = (0, s.useSQLiteContext)();
    let f;
    e[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((f = []), (e[0] = f))
      : (f = e[0]);
    const [S, b] = (0, a.useState)(f),
      [O, y] = (0, a.useState)("normal"),
      [C, N] = (0, a.useState)("batting"),
      [A, j] = (0, a.useState)(null);
    let W;
    e[1] === Symbol.for("react.memo_cache_sentinel")
      ? ((W = []), (e[1] = W))
      : (W = e[1]);
    const [w, L] = (0, a.useState)(W),
      [H, D] = (0, a.useState)("");
    const [previousStats, setPreviousStats] = (0, a.useState)([]);
    let M;
    e[2] !== u || e[3] !== O
      ? ((M = async () => {
          try {
            const statsSql = "WITH lm AS(SELECT id,lower(match_type) mt FROM matches WHERE (?='overall' OR lower(match_type)=lower(?)) AND status='completed'),\n   innings_scores AS(SELECT d.batter,d.match_id,d.innings,SUM(d.runs_bat) score FROM deliveries d JOIN lm ON lm.id=d.match_id AND (lm.mt='test' OR d.innings<=2) GROUP BY d.batter,d.match_id,d.innings),\n   batting_milestones AS(SELECT batter,SUM(CASE WHEN score>=25 THEN 1 ELSE 0 END) scores25,SUM(CASE WHEN score>=50 THEN 1 ELSE 0 END) scores50 FROM innings_scores GROUP BY batter),\n   appearance_counts AS(SELECT a.player_id,COUNT(DISTINCT a.match_id) matches FROM (SELECT mp.player_id,mp.match_id FROM match_players mp UNION SELECT p2.id,d.match_id FROM deliveries d JOIN players p2 ON p2.name IN(d.batter,d.bowler,d.dismissed_batter,d.dismissed_by)) a JOIN lm ON lm.id=a.match_id GROUP BY a.player_id)\n   SELECT p.id,p.name,\n   COALESCE((SELECT matches FROM appearance_counts ap WHERE ap.player_id=p.id),0) matches,\n   COALESCE((SELECT scores25 FROM batting_milestones bm WHERE bm.batter=p.name),0) scores25,\n   COALESCE((SELECT scores50 FROM batting_milestones bm WHERE bm.batter=p.name),0) scores50,\n   (SELECT COALESCE(SUM(d.runs_bat),0) FROM deliveries d JOIN lm ON lm.id=d.match_id AND (lm.mt='test' OR d.innings<=2) WHERE d.batter=p.name) runs,\n   (SELECT COUNT(*) FROM deliveries d JOIN lm ON lm.id=d.match_id AND (lm.mt='test' OR d.innings<=2) WHERE d.batter=p.name AND COALESCE(d.extra_type,'')!='wide' AND COALESCE(d.dismissal,'')!='Retired hurt') balls,\n   (SELECT COUNT(*) FROM deliveries d JOIN lm ON lm.id=d.match_id AND (lm.mt='test' OR d.innings<=2) WHERE d.batter=p.name AND d.wicket=1 AND COALESCE(d.dismissed_batter,d.batter)=p.name) dismissals,\n   (SELECT COUNT(*) FROM deliveries d JOIN lm ON lm.id=d.match_id AND (lm.mt='test' OR d.innings<=2) WHERE d.batter=p.name AND d.runs_bat=4) fours,\n   (SELECT COUNT(*) FROM deliveries d JOIN lm ON lm.id=d.match_id AND (lm.mt='test' OR d.innings<=2) WHERE d.batter=p.name AND d.runs_bat=6) sixes,\n   (SELECT COALESCE(SUM(CASE WHEN d.wicket=1 AND COALESCE(d.dismissal,'') NOT IN('Run out','Retired hurt','Obstructing the field','Timed out') THEN 1 ELSE 0 END),0) FROM deliveries d JOIN lm ON lm.id=d.match_id AND (lm.mt='test' OR d.innings<=2) WHERE d.bowler=p.name) wickets,\n   (SELECT COALESCE(SUM(d.legal),0) FROM deliveries d JOIN lm ON lm.id=d.match_id AND (lm.mt='test' OR d.innings<=2) WHERE d.bowler=p.name) bowlingBalls,\n   (SELECT COALESCE(SUM(CASE WHEN d.legal=1 AND d.runs_bat+d.extras=0 THEN 1 ELSE 0 END),0) FROM deliveries d JOIN lm ON lm.id=d.match_id AND (lm.mt='test' OR d.innings<=2) WHERE d.bowler=p.name) dotBalls,\n   (SELECT COALESCE(SUM(d.runs_bat+CASE WHEN d.extra_type IN('bye','leg-bye') THEN 0 ELSE d.extras END),0) FROM deliveries d JOIN lm ON lm.id=d.match_id AND (lm.mt='test' OR d.innings<=2) WHERE d.bowler=p.name) conceded,\n   (SELECT COALESCE(MAX(score),0) FROM(SELECT SUM(d.runs_bat) score FROM deliveries d JOIN lm ON lm.id=d.match_id AND (lm.mt='test' OR d.innings<=2) WHERE d.batter=p.name GROUP BY d.match_id,d.innings)) best,\n   (SELECT COUNT(*) FROM deliveries d JOIN lm ON lm.id=d.match_id AND (lm.mt='test' OR d.innings<=2) WHERE d.dismissed_by=p.name AND d.dismissal='Caught') catches,\n   (SELECT COUNT(*) FROM deliveries d JOIN lm ON lm.id=d.match_id AND (lm.mt='test' OR d.innings<=2) WHERE d.dismissed_by=p.name AND d.dismissal='Run out') runOuts,\n   (SELECT COUNT(*) FROM deliveries d JOIN lm ON lm.id=d.match_id AND (lm.mt='test' OR d.innings<=2) WHERE d.dismissed_by=p.name AND d.dismissal='Stumped') stumpings,\n   (SELECT COUNT(*) FROM match_players mp JOIN lm ON lm.id=mp.match_id WHERE mp.player_id=p.id AND mp.is_captain=1) captainMatches,\n   (SELECT COUNT(*) FROM match_players mp JOIN lm ON lm.id=mp.match_id JOIN matches m ON m.id=mp.match_id WHERE mp.player_id=p.id AND mp.is_captain=1 AND mp.team_side=m.winner_side) captainWins\n   FROM players p WHERE p.is_active=1 AND p.player_type='club' ORDER BY name COLLATE NOCASE";
            const e = await u.getAllAsync(statsSql, O, O);
            const latestMatch = await u.getFirstAsync("SELECT id FROM matches WHERE (?='overall' OR lower(match_type)=lower(?)) AND status='completed' ORDER BY COALESCE(completed_at,created_at) DESC,id DESC LIMIT 1", O, O);
            const previousRowsRaw = latestMatch ? await u.getAllAsync(statsSql.replace("AND status='completed')", "AND status='completed' AND id<>?)"), O, O, latestMatch.id) : [];
            const previousRows = previousRowsRaw.some((row) => Number(row.matches) > 0) ? previousRowsRaw : [];
            const scoredDeliveries = await u.getAllAsync(
              "SELECT d.match_id,m.winner_side,d.batter,d.bowler,d.runs_bat,d.extras,d.legal,d.wicket,d.dismissal,d.dismissed_by FROM deliveries d JOIN matches m ON m.id=d.match_id WHERE m.status='completed' AND (?='overall' OR lower(m.match_type)=lower(?))",
              O,
              O,
            );
            const rosterRows = await u.getAllAsync(
              "SELECT mp.match_id,p.name,mp.team_side,COALESCE(mp.is_common,0) is_common FROM match_players mp JOIN players p ON p.id=mp.player_id JOIN matches m ON m.id=mp.match_id WHERE m.status='completed' AND (?='overall' OR lower(m.match_type)=lower(?))",
              O,
              O,
            );
            const captainRows = await u.getAllAsync(
              "SELECT mp.player_id,lower(m.match_type) match_type,COUNT(DISTINCT mp.match_id) matches,SUM(CASE WHEN mp.team_side=m.winner_side AND m.winner_side IS NOT NULL THEN 1 ELSE 0 END) wins FROM match_players mp JOIN matches m ON m.id=mp.match_id WHERE mp.is_captain=1 AND m.status='completed' GROUP BY mp.player_id,lower(m.match_type)",
            );
            const captainRecords = new Map();
            for (const record of captainRows) {
              const current = captainRecords.get(record.player_id) || { normalMatches: 0, normalWins: 0, testMatches: 0, testWins: 0 };
              if (String(record.match_type).toLowerCase() === "normal") {
                current.normalMatches = Number(record.matches);
                current.normalWins = Number(record.wins);
              } else {
                current.testMatches = Number(record.matches);
                current.testWins = Number(record.wins);
              }
              captainRecords.set(record.player_id, current);
            }
            const pointsByMatch = new Map();
            const winnerSideByMatch = new Map();
            const rosterByMatch = new Map();
            for (const player of rosterRows) {
              let roster = rosterByMatch.get(player.match_id);
              if (!roster) rosterByMatch.set(player.match_id, (roster = new Map()));
              roster.set(player.name, { teamSide: player.team_side, common: Boolean(player.is_common) });
            }
            for (const delivery of scoredDeliveries) {
              winnerSideByMatch.set(delivery.match_id, delivery.winner_side);
              let players = pointsByMatch.get(delivery.match_id);
              if (!players) pointsByMatch.set(delivery.match_id, (players = new Map()));
              const award = (name, points, runs = 0) => {
                if (!name) return;
                const current = players.get(name) || { points: 0, runs: 0 };
                current.points += points;
                current.runs += runs;
                players.set(name, current);
              };
              const batRuns = Number(delivery.runs_bat || 0);
              award(delivery.batter, batRuns + (batRuns === 4 ? 1 : batRuns === 6 ? 2 : 0), batRuns);
              if (Number(delivery.wicket) === 1 && !["run out", "retired hurt", "obstructing the field", "timed out"].includes((delivery.dismissal || "").toLowerCase()))
                award(delivery.bowler, 20);
              if (Number(delivery.legal) === 1 && batRuns + Number(delivery.extras || 0) === 0)
                award(delivery.bowler, 1);
              if (Number(delivery.wicket) === 1 && ["Caught", "Run out", "Stumped"].includes(delivery.dismissal))
                award(delivery.dismissed_by, 10);
            }
            const mvpCounts = new Map();
            const previousMvpCounts = new Map();
            for (const [matchId, players] of pointsByMatch.entries()) {
              const winningSide = winnerSideByMatch.get(matchId);
              const roster = rosterByMatch.get(matchId) || new Map();
              const winnerCandidates = [...players.entries()].filter(([name, stats]) => {
                const team = roster.get(name);
                return team && (team.teamSide === winningSide || team.common) && stats.points > 0;
              });
              const candidates = winnerCandidates.length ? winnerCandidates : [...players.entries()];
              const winner = candidates.sort((a, b) => {
                const aTeam = roster.get(a[0]);
                const bTeam = roster.get(b[0]);
                const aPoints = a[1].points * (winningSide && aTeam && (aTeam.teamSide === winningSide || aTeam.common) ? 1.25 : 1);
                const bPoints = b[1].points * (winningSide && bTeam && (bTeam.teamSide === winningSide || bTeam.common) ? 1.25 : 1);
                return bPoints - aPoints || b[1].runs - a[1].runs || a[0].localeCompare(b[0]);
              })[0];
              if (!winner) continue;
              const current = mvpCounts.get(winner[0]) || { count: 0, points: 0 };
              current.count++;
              current.points += winner[1].points;
              mvpCounts.set(winner[0], current);
              if (String(matchId) !== String(latestMatch?.id)) {
                const prior = previousMvpCounts.get(winner[0]) || { count: 0, points: 0 };
                prior.count++;
                prior.points += winner[1].points;
                previousMvpCounts.set(winner[0], prior);
              }
            }
            const addCaptainAndAwards = (player, awards) => {
              const captain = captainRecords.get(player.id) || { normalMatches: 0, normalWins: 0, testMatches: 0, testWins: 0 };
              const formatCaptainMatches = player.captainMatches;
              const formatCaptainWins = player.captainWins;
              return { ...player, ...captain, captainMatches: formatCaptainMatches, captainWins: formatCaptainWins, captainOverallMatches: captain.normalMatches + captain.testMatches, captainOverallWins: captain.normalWins + captain.testWins, mvpCount: awards?.count || 0, mvpPoints: awards?.points || 0 };
            };
            b(e.map((player) => addCaptainAndAwards(player, mvpCounts.get(player.name))));
            setPreviousStats(previousRows.map((player) => addCaptainAndAwards(player, previousMvpCounts.get(player.name))));
            D("");
          } catch (error) {
            D(`Could not load player statistics: ${String(error?.message || error)}`);
          }
        }),
        (e[2] = u),
        (e[3] = O),
        (e[4] = M))
      : (M = e[4]);
    const I = M;
    let k, v;
    e[5] !== I
      ? ((k = () => {
          I();
        }),
        (e[5] = I),
        (e[6] = k))
      : (k = e[6]),
      (0, l.useFocusEffect)(k),
      e[7] !== u || e[8] !== O
        ? ((v = async function (e) {
            j(e);
            try {
              const t = await u.getAllAsync(
                "SELECT d.bowler,COUNT(DISTINCT m.id) matches,SUM(d.runs_bat) runs,SUM(CASE WHEN lower(COALESCE(d.extra_type,''))!='wide' AND lower(COALESCE(d.dismissal,''))!='retired hurt' THEN 1 ELSE 0 END) ballsFaced,SUM(CASE WHEN d.wicket=1 AND COALESCE(d.dismissed_batter,d.batter)=d.batter AND lower(COALESCE(d.dismissal,'')) NOT IN('run out','retired hurt','obstructing the field','timed out') THEN 1 ELSE 0 END) wickets FROM deliveries d JOIN matches m ON m.id=d.match_id WHERE (?='overall' OR m.match_type=?) AND m.status='completed' AND (m.match_type='test' OR d.innings<=2) AND d.batter=? GROUP BY d.bowler ORDER BY runs DESC,ballsFaced ASC,d.bowler COLLATE NOCASE",
                O,
                O,
                e.name,
              );
              L(t);
            } catch {
              L([]);
            }
          }),
          (e[7] = u),
          (e[8] = O),
          (e[9] = v))
        : (v = e[9]);
    const F = v;
    const selectedGroup = ["batting", "strikeRate", "average", "sixes", "fours", "scores25"].includes(C)
      ? "batting"
      : ["bowling", "dotBalls", "bowlingAverage", "economy", "bowlingStrikeRate"].includes(C)
        ? "bowling"
        : ["fielding", "catches", "runOuts", "stumpings"].includes(C)
          ? "fielding"
          : ["captaincy", "captainWins"].includes(C)
            ? "captaincy"
            : C;
    const metricOptions = "batting" === selectedGroup
      ? ["batting", "strikeRate", "average", "sixes", "fours", "scores25"]
      : "bowling" === selectedGroup
        ? ["bowling", "bowlingAverage", "economy", "bowlingStrikeRate", "dotBalls"]
        : "fielding" === selectedGroup
          ? ["fielding", "catches", "runOuts", "stumpings"]
          : "captaincy" === selectedGroup
            ? ["captaincy", "captainWins"]
            : [];
    let U, B, z, J, P, G, V, Y, $, K, q;
    if (
      e[10] !== C ||
      e[11] !== H ||
      e[12] !== O ||
      e[13] !== F ||
      e[14] !== S ||
      e[97] !== previousStats
    ) {
      let t;
      e[26] !== C
        ? ((t = (e, t) =>
            "batting" === C
              ? t.runs - e.runs || e.name.localeCompare(t.name)
              : "bowling" === C
                ? t.wickets - e.wickets || e.name.localeCompare(t.name)
              : "captaincy" === C
                ? (t.captainMatches ? t.captainWins / t.captainMatches : 0) -
                    (e.captainMatches ? e.captainWins / e.captainMatches : 0) ||
                    e.name.localeCompare(t.name)
                : "mvp" === C
                  ? t.mvpCount - e.mvpCount || t.mvpPoints - e.mvpPoints || e.name.localeCompare(t.name)
                : t.catches +
                    t.runOuts +
                    t.stumpings -
                    (e.catches + e.runOuts + e.stumpings) ||
                  e.name.localeCompare(t.name)),
          (e[26] = C),
          (e[27] = t))
        : (t = e[27]);
      const l = sortLeaderboard(S, C, t);
      const previousRanked = sortLeaderboard(previousStats.filter((player) => Number(player.matches) > 0), C, t);
      const rankMoves = getRankMovement(l, previousRanked);
      (U = c.default),
        (V = _.page),
        (Y = _.content),
        e[28] === Symbol.for("react.memo_cache_sentinel")
          ? (($ = (0, E.jsx)(o.default, {
              onPress: R,
              children: (0, E.jsx)(h.default, {
                style: _.back,
                children: "\u2039  DASHBOARD",
              }),
            })),
            (K = (0, E.jsx)(h.default, {
              style: _.kicker,
              children: "SEASON RECORDS",
            })),
            (q = (0, E.jsx)(h.default, {
              style: _.title,
              children: "Player rankings",
            })),
            (B = (0, E.jsx)(h.default, {
              style: _.hint,
              children:
                "Normal and Test records are separate. Arrows compare all completed matches with results before the latest completed match. NEW means no prior eligible rank. Strike-rate requires 10 balls.",
            })),
            (e[28] = B),
            (e[29] = $),
            (e[30] = K),
            (e[31] = q))
          : ((B = e[28]), ($ = e[29]), (K = e[30]), (q = e[31])),
        e[32] !== O
          ? ((z = (0, E.jsx)(p.default, {
              style: _.formatTabs,
              children: ["normal", "test"].map((e) =>
                (0, E.jsx)(
                  o.default,
                  {
                    onPress: () => y(e),
                    style: [_.tab, _.formatTab, O === e && _.active],
                    children: (0, E.jsx)(h.default, {
                      style: [_.tabText, O === e && _.activeText],
                      children: ({
                        strikeRate: "STRIKE RATE",
                        boundary: "BOUNDARY / BALLS",
                        sixes: "MOST SIXES",
                        fours: "MOST FOURS",
                      }[e] || e.toUpperCase()),
                    }),
                  },
                  e,
                ),
              ),
            })),
            (e[32] = O),
            (e[33] = z))
          : (z = e[33]),
        e[34] !== C || e[96] !== O
          ? ((J = (0, E.jsxs)(p.default, {
              style: _.navContainer,
              children: [
                (0, E.jsx)(c.default, {
                  horizontal: !0,
                  showsHorizontalScrollIndicator: !1,
                  contentContainerStyle: _.categoryTabs,
                  children: ["batting", "bowling", "fielding", "captaincy", "mvp"].map((e) =>
                    (0, E.jsx)(o.default, {
                      onPress: () => N(e),
                      style: [_.tab, _.categoryTab, selectedGroup === e && _.active],
                      children: (0, E.jsx)(h.default, {
                        style: [_.tabText, selectedGroup === e && _.activeText],
                        children: ({ mvp: "MVP" }[e] || e.toUpperCase()),
                      }),
                    }, e),
                  ),
                }),
                (0, E.jsxs)(p.default, {
                  style: _.filterRow,
                  children: [
                    metricOptions.length > 0 && (0, E.jsx)(c.default, {
                      horizontal: !0,
                      showsHorizontalScrollIndicator: !1,
                      style: _.metricScroll,
                      contentContainerStyle: _.subtabs,
                      children: metricOptions.map((e) =>
                        (0, E.jsx)(o.default, {
                          onPress: () => N(e),
                          style: [_.tab, _.filterTab, { minWidth: ({ batting: 54, strikeRate: 84, average: 66, sixes: 78, fours: 78, scores25: 84, bowling: 70, bowlingAverage: 84, economy: 68, bowlingStrikeRate: 80, dotBalls: 78, fielding: 76, catches: 68, runOuts: 74, stumpings: 82, captaincy: 58, captainWins: 54 }[e] || 76) }, C === e && _.active],
                          children: (0, E.jsx)(h.default, {
                            style: [_.tabText, C === e && _.activeText, _.filterTabText],
                            children: ({ batting: "RUNS", strikeRate: "STRIKE RATE", average: "AVERAGE", sixes: "MOST SIXES", fours: "MOST FOURS", scores25: "25+ SCORES", bowling: "WICKETS", bowlingAverage: "BOWLING AVG", economy: "ECONOMY", bowlingStrikeRate: "BOWLING SR", dotBalls: "DOT BALLS", fielding: "FIELDING", catches: "CATCHES", runOuts: "RUN-OUTS", stumpings: "STUMPINGS", captaincy: "WIN %", captainWins: "WINS" }[e]),
                          }),
                        }, e),
                      ),
                    }),
                    (0, E.jsx)(PlayerCompare, { format: O }),
                  ],
                }),
              ],
            })),
            (e[34] = C),
            (e[96] = O),
            (e[97] = previousStats),
            (e[35] = J))
          : (J = e[35]),
        e[36] !== H
          ? ((P = H
              ? (0, E.jsx)(h.default, { style: _.error, children: H })
              : null),
            (e[36] = H),
            (e[37] = P))
          : (P = e[37]),
        (G = l.length
          ? l.map((e, t) => {
              const l = e.dismissals ? e.runs / e.dismissals : 0,
                s = e.balls ? (100 * e.runs) / e.balls : 0,
                a = e.bowlingBalls ? (6 * e.conceded) / e.bowlingBalls : 0,
                n = e.catches + e.runOuts + e.stumpings,
                c =
                  e.matches >= 15
                    ? ("batting" === C
                        ? [
                            s >= 130 && e.runs >= 100 ? "HITTER" : null,
                            l >= 25 ? "ANCHOR" : null,
                          ]
                        : "bowling" === C
                          ? [
                              a <= 6 && e.bowlingBalls >= 30
                                ? "ECONOMIST"
                                : null,
                              e.wickets >= 15 ? "WICKET TAKER" : null,
                              e.runs >= 200 && e.wickets >= 10
                                ? "ALL-ROUNDER"
                                : null,
                            ]
                          : "fielding" === C
                            ? [
                              e.catches >= 10 ? "SAFE HANDS" : null,
                              e.runOuts >= 5 ? "RUN-OUT SPECIALIST" : null,
                              e.stumpings >= 5 ? "SHARP STUMPER" : null,
                            ]
                            : []
                      ).filter(Boolean)
                    : [];
              return (0, E.jsxs)(
                o.default,
                {
                  accessibilityRole: "button",
                  style: [_.card, t === 0 ? _.podiumGold : t === 1 ? _.podiumSilver : t === 2 ? _.podiumBronze : null],
                  onPress: () => {
                    F(e);
                  },
                  children: [
                    (0, E.jsxs)(p.default, {
                      style: _.head,
                      children: [
                        (0, E.jsx)(h.default, {
                          style: [_.rank, t === 0 ? _.rankGold : t === 1 ? _.rankSilver : t === 2 ? _.rankBronze : null],
                          children: String(t + 1).padStart(2, "0"),
                        }),
                        rankMoves[e.id] && (0, E.jsx)(Zr.default.Text, {
                          entering: Zr.FadeInDown.duration(180),
                          style: [_.rankMovement, rankMoves[e.id].direction === "up" ? _.moveUp : rankMoves[e.id].direction === "down" ? _.moveDown : rankMoves[e.id].direction === "same" ? _.moveSame : _.moveNew],
                          children: rankMoves[e.id].direction === "new" ? "NEW" : rankMoves[e.id].direction === "same" ? "→ 0" : (rankMoves[e.id].direction === "up" ? "↑ " : "↓ ") + rankMoves[e.id].places,
                        },String(e.id)+":"+rankMoves[e.id].direction+":"+rankMoves[e.id].places),
                        (0, E.jsxs)(p.default, {
                          style: _.identity,
                          children: [
                            (0, E.jsx)(h.default, {
                              style: _.name,
                              children: e.name,
                            }),
                            (0, E.jsxs)(h.default, {
                              style: _.meta,
                              children: [
                                e.matches,
                                " matches \xb7 captain ",
                                e.captainMatches
                                  ? e.captainWins +
                                    "/" +
                                    e.captainMatches +
                                    " wins"
                                  : "\u2014",
                              ],
                            }),
                            c.length > 0 &&
                              (0, E.jsx)(p.default, {
                                style: _.badges,
                                children: c.map(T),
                              }),
                          ],
                        }),
                        (0, E.jsx)(h.default, {
                          style: _.total,
                          children:
                            "batting" === C
                              ? e.runs
                              : "bowling" === C
                                ? e.wickets
                              : "fielding" === C
                                  ? n
                                  : "captaincy" === C
                                    ? e.captainMatches ? `${((e.captainWins / e.captainMatches) * 100).toFixed(0)}%` : "—"
                                    : "captainWins" === C
                                      ? e.captainWins
                                    : "scores25" === C
                                      ? e.scores25
                                    : "mvp" === C
                                      ? e.mvpCount
                                  : "strikeRate" === C
                                    ? e.balls ? ((100 * e.runs) / e.balls).toFixed(1) : "0.0"
                                  : "average" === C
                                    ? e.dismissals ? (e.runs / e.dismissals).toFixed(1) : "—"
                                    : "sixes" === C
                                      ? e.sixes
                                      : "fours" === C
                                        ? e.fours
                                        : "dotBalls" === C
                                          ? e.dotBalls
                                          : "bowlingAverage" === C
                                            ? e.wickets ? (e.conceded / e.wickets).toFixed(1) : "—"
                                            : "economy" === C
                                              ? e.bowlingBalls ? ((6 * e.conceded) / e.bowlingBalls).toFixed(1) : "—"
                                              : "bowlingStrikeRate" === C
                                                ? e.wickets ? (e.bowlingBalls / e.wickets).toFixed(1) : "—"
                                                : "catches" === C
                                                  ? e.catches
                                                  : "runOuts" === C
                                                    ? e.runOuts
                                                    : "stumpings" === C
                                                      ? e.stumpings
                                                      : e.fours + e.sixes,
                        }),
                      ],
                    }),
                    "batting" === C
                      ? (0, E.jsxs)(p.default, {
                          style: _.stats,
                          children: [
                            (0, E.jsxs)(h.default, {
                              style: _.stat,
                              children: [
                                "AVG ",
                                (0, E.jsx)(h.default, {
                                  style: _.value,
                                  children: l ? l.toFixed(1) : "\u2014",
                                }),
                              ],
                            }),
                            (0, E.jsxs)(h.default, {
                              style: _.stat,
                              children: [
                                "SR ",
                                (0, E.jsx)(h.default, {
                                  style: _.value,
                                  children: e.balls >= 10 ? s.toFixed(1) : "10-ball minimum",
                                }),
                              ],
                            }),
                            (0, E.jsxs)(h.default, {
                              style: _.stat,
                              children: [
                                "HS ",
                                (0, E.jsx)(h.default, {
                                  style: _.value,
                                  children: e.best,
                                }),
                              ],
                            }),
                            (0, E.jsxs)(h.default, {
                              style: _.stat,
                              children: [
                                "4s/6s ",
                                (0, E.jsxs)(h.default, {
                                  style: _.value,
                                  children: [e.fours, "/", e.sixes],
                                }),
                              ],
                            }),
                          ],
                        })
                      : "strikeRate" === C
                        ? (0, E.jsxs)(h.default, {
                            style: _.detail,
                            children: [
                              "STRIKE RATE  ", e.balls >= 10 ? s.toFixed(1) : "10-ball minimum",
                              " · ", e.runs, " runs · ", e.balls, " balls faced · ",
                              e.fours + e.sixes ? `1 boundary every ${Math.max(1, Math.round(e.balls / (e.fours + e.sixes)))} balls` : "No boundaries yet",
                              " · ", e.fours, " fours · ", e.sixes, " sixes",
                            ],
                          })
                      : "average" === C
                        ? (0, E.jsxs)(h.default, {
                            style: _.detail,
                            children: ["BATTING AVERAGE  ", e.dismissals ? (e.runs / e.dismissals).toFixed(1) : "No dismissals", " · ", e.runs, " runs · ", e.dismissals, " dismissals"],
                          })
                      : "captaincy" === C
                        ? (0, E.jsxs)(h.default, {
                            style: _.detail,
                            children: [
                              "NORMAL  ", e.normalWins, "/", e.normalMatches,
                              " wins · TEST  ", e.testWins, "/", e.testMatches, " wins",
                            ],
                          })
                      : "scores25" === C
                        ? (0, E.jsxs)(h.default, { style: _.detail, children: ["25+ SCORES  ", e.scores25, " innings · ", e.scores50, " of those 50+"] })
                      : "mvp" === C
                        ? (0, E.jsxs)(h.default, {
                            style: _.detail,
                            children: [e.mvpCount, " MVP awards"],
                          })
                      : "sixes" === C || "fours" === C
                        ? (0, E.jsxs)(h.default, {
                            style: _.detail,
                            children: [
                              "fours" === C ? "FOURS  " : "SIXES  ",
                              "fours" === C ? e.fours : e.sixes,
                              " · ", e.runs, " runs · ", e.balls, " balls faced",
                            ],
                          })
                      : "dotBalls" === C
                        ? (0, E.jsxs)(h.default, {
                            style: _.detail,
                            children: ["DOT BALLS  ", e.dotBalls, " dot balls · ", Math.floor(e.bowlingBalls / 6), ".", e.bowlingBalls % 6, " overs bowled"],
                          })
                      : "bowlingAverage" === C
                        ? (0, E.jsxs)(h.default, { style: _.detail, children: ["BOWLING AVERAGE  ", e.wickets ? (e.conceded / e.wickets).toFixed(1) : "—", " · ", e.conceded, " runs conceded · ", e.wickets, " wickets"] })
                      : "economy" === C
                        ? (0, E.jsxs)(h.default, { style: _.detail, children: ["ECONOMY  ", e.bowlingBalls ? ((6 * e.conceded) / e.bowlingBalls).toFixed(1) : "—", " · ", e.conceded, " runs conceded · ", Math.floor(e.bowlingBalls / 6), ".", e.bowlingBalls % 6, " overs"] })
                      : "bowlingStrikeRate" === C
                        ? (0, E.jsxs)(h.default, { style: _.detail, children: ["BOWLING STRIKE RATE  ", e.wickets ? (e.bowlingBalls / e.wickets).toFixed(1) : "—", " · ", e.bowlingBalls, " balls · ", e.wickets, " wickets"] })
                      : "captainWins" === C
                        ? (0, E.jsxs)(h.default, { style: _.detail, children: ["CAPTAINCY WINS  ", e.captainWins, " wins from ", e.captainMatches, " matches · ", e.captainMatches ? ((100 * e.captainWins) / e.captainMatches).toFixed(0) : 0, "% win rate"] })
                      : "catches" === C || "runOuts" === C || "stumpings" === C
                        ? (0, E.jsxs)(h.default, { style: _.detail, children: ["catches" === C ? "CATCHES  " : "runOuts" === C ? "RUN-OUTS  " : "STUMPINGS  ", "catches" === C ? e.catches : "runOuts" === C ? e.runOuts : e.stumpings, " · ", e.catches, " catches · ", e.runOuts, " run-outs · ", e.stumpings, " stumpings"] })
                      : "bowling" === C
                        ? (0, E.jsxs)(h.default, {
                            style: _.detail,
                            children: [
                              "BOWLING  ",
                              e.wickets,
                              " wickets \xb7 ",
                              Math.floor(e.bowlingBalls / 6),
                              ".",
                              e.bowlingBalls % 6,
                              " overs \xb7 econ ",
                              a.toFixed(1),
                              " \xb7 avg ",
                              e.wickets ? (e.conceded / e.wickets).toFixed(1) : "\u2014",
                              " \xb7 SR ",
                              e.wickets ? (e.bowlingBalls / e.wickets).toFixed(1) : "\u2014",
                            ],
                          })
                        : (0, E.jsxs)(h.default, {
                            style: _.detail,
                            children: [
                              "FIELDING  ",
                              e.catches,
                              " catches \xb7 ",
                              e.runOuts,
                              " run-outs \xb7 ",
                              e.stumpings,
                              " stumpings",
                            ],
                          }),
                    e.matches < 15 &&
                      (0, E.jsxs)(h.default, {
                        style: _.unlock,
                        children: [
                          "Achievements unlock after 15 ",
                          O,
                          " matches \xb7 ",
                          15 - e.matches,
                          " to go",
                        ],
                      }),
                  ],
                },
                e.id,
              );
            })
          : (0, E.jsx)(p.default, {
              style: _.empty,
              children: (0, E.jsxs)(h.default, {
                style: _.hint,
                children: "scores25" === C ? ["No 25+ innings recorded in completed ", O, " matches yet."] : ["No completed ", O, " matches have ranking stats yet."],
              }),
            })),
        (e[10] = C),
        (e[11] = H),
        (e[12] = O),
        (e[13] = F),
        (e[14] = S),
        (e[15] = U),
        (e[16] = B),
        (e[17] = z),
        (e[18] = J),
        (e[19] = P),
        (e[20] = G),
        (e[21] = V),
        (e[22] = Y),
        (e[23] = $),
        (e[24] = K),
        (e[25] = q);
    } else
      (U = e[15]),
        (B = e[16]),
        (z = e[17]),
        (J = e[18]),
        (P = e[19]),
        (G = e[20]),
        (V = e[21]),
        (Y = e[22]),
        ($ = e[23]),
        (K = e[24]),
        (q = e[25]);
    const Q = null !== A;
    let X, Z, ee;
    e[38] === Symbol.for("react.memo_cache_sentinel")
      ? ((X = () => j(null)), (e[38] = X))
      : (X = e[38]),
      e[39] !== O
        ? ((Z = O.toUpperCase()), (e[39] = O), (e[40] = Z))
        : (Z = e[40]),
      e[41] !== Z
        ? ((ee = (0, E.jsxs)(h.default, {
            style: _.kicker,
            children: ["PLAYER PROFILE \xb7 ", Z],
          })),
          (e[41] = Z),
          (e[42] = ee))
        : (ee = e[42]);
    const te = A?.name;
    let le;
    e[43] !== te
      ? ((le = (0, E.jsx)(h.default, { style: _.profileTitle, children: te })),
        (e[43] = te),
        (e[44] = le))
      : (le = e[44]);
    const se = A?.matches,
      ae = A?.runs,
      ie = A?.wickets;
    let ne, de;
    e[45] !== A
      ? ((ne = A?.captainMatches
          ? `${((A.captainWins / A.captainMatches) * 100).toFixed(0)}% wins (${A.captainWins}/${A.captainMatches})`
          : "\u2014"),
        (e[45] = A),
        (e[46] = ne))
      : (ne = e[46]),
      e[47] !== se || e[48] !== ae || e[49] !== ie || e[50] !== ne
        ? ((de = (0, E.jsxs)(h.default, {
            style: _.hint,
            children: [se, " matches · captaincy ", ne,
              " \xb7 Normal ",
              A?.normalWins ?? 0,
              "/",
              A?.normalMatches ?? 0,
              " \xb7 Test ",
              A?.testWins ?? 0,
              "/",
              A?.testMatches ?? 0,
            ],
          })),
          (e[47] = se),
          (e[48] = ae),
          (e[49] = ie),
          (e[50] = ne),
          (e[51] = de))
        : (de = e[51]);
    const re = A?.catches ?? 0;
    let oe;
    e[52] !== re
      ? ((oe = (0, E.jsxs)(h.default, {
          style: _.profileStat,
          children: ["Catches  ", re],
        })),
        (e[52] = re),
        (e[53] = oe))
      : (oe = e[53]);
    const ce = A?.runOuts ?? 0;
    let me;
    e[54] !== ce
      ? ((me = (0, E.jsxs)(h.default, {
          style: _.profileStat,
          children: ["Run-outs  ", ce],
        })),
        (e[54] = ce),
        (e[55] = me))
      : (me = e[55]);
    const ue = A?.stumpings ?? 0;
    let he;
    e[56] !== ue
      ? ((he = (0, E.jsxs)(h.default, {
          style: _.profileStat,
          children: ["Stumpings  ", ue],
        })),
        (e[56] = ue),
        (e[57] = he))
      : (he = e[57]);
    const pe = A?.fours ?? 0,
      Ee = A?.sixes ?? 0;
    let fe, ge, Se, be, Oe, ye, Ce, Ne, xe, Te;
    return (
      e[58] !== pe || e[59] !== Ee
        ? ((fe = (0, E.jsxs)(h.default, {
            style: _.profileStat,
            children: ["4s / 6s  ", pe, " / ", Ee],
          })),
          (e[58] = pe),
          (e[59] = Ee),
          (e[60] = fe))
        : (fe = e[60]),
      (ge = (0, E.jsxs)(p.default, { style: _.milestoneSection, children: [(0, E.jsx)(h.default, { style: _.section, children: "BATTING MILESTONES" }), (0, E.jsxs)(p.default, { style: _.milestoneGrid, children: [(0, E.jsxs)(p.default, { style: _.milestoneCard, children: [(0, E.jsx)(h.default, { style: _.milestoneLabel, children: "25+ SCORES" }), (0, E.jsx)(h.default, { style: _.milestoneValue, children: A?.scores25 ?? 0 })] }), (0, E.jsxs)(p.default, { style: _.milestoneCard, children: [(0, E.jsx)(h.default, { style: _.milestoneLabel, children: "50+ SCORES" }), (0, E.jsx)(h.default, { style: _.milestoneValueGold, children: A?.scores50 ?? 0 })] })] })] })),
      e[66] === Symbol.for("react.memo_cache_sentinel")
        ? ((Se = (0, E.jsx)(h.default, {
            style: _.section,
            children: "BATTING AGAINST BOWLERS · DIRECT DELIVERIES",
          })),
          (e[66] = Se))
        : (Se = e[66]),
      e[67] === Symbol.for("react.memo_cache_sentinel")
        ? ((be = { maxHeight: 180 }), (e[67] = be))
        : (be = e[67]),
      e[68] !== O || e[69] !== w
        ? ((Oe = w.length
            ? w.map(x)
            : (0, E.jsxs)(h.default, {
                style: _.hint,
                children: [
                  "No dismissals recorded against this player in completed ",
                  O,
                  " matches.",
                ],
              })),
          (e[68] = O),
          (e[69] = w),
          (e[70] = Oe))
        : (Oe = e[70]),
      e[71] !== Oe
        ? ((ye = (0, E.jsx)(c.default, { style: be, children: Oe })),
          (e[71] = Oe),
          (e[72] = ye))
        : (ye = e[72]),
      e[73] === Symbol.for("react.memo_cache_sentinel")
        ? ((Ce = (0, E.jsx)(o.default, {
            style: _.close,
            onPress: () => j(null),
            children: (0, E.jsx)(h.default, {
              style: _.closeText,
              children: "CLOSE PROFILE",
            }),
          })),
          (e[73] = Ce))
        : (Ce = e[73]),
      e[74] !== ee ||
      e[75] !== le ||
      e[76] !== de ||
      e[77] !== ge ||
      e[78] !== ye
        ? ((Ne = (0, E.jsx)(p.default, {
            style: _.overlay,
            children: (0, E.jsxs)(p.default, {
              style: _.profile,
              children: (0, E.jsx)(c.default, {
                nestedScrollEnabled: !0,
                children: [ee, le, de, ge, (0, E.jsx)(ProfileChart, { player: A, format: O }), (0, E.jsx)(ProfileRecords, { player: A, format: O }), Se, ye, Ce],
              }),
            }),
          })),
          (e[74] = ee),
          (e[75] = le),
          (e[76] = de),
          (e[77] = ge),
          (e[78] = ye),
          (e[79] = Ne))
        : (Ne = e[79]),
      e[80] !== Q || e[81] !== Ne
        ? ((xe = (0, E.jsx)(n.default, {
            visible: Q,
            transparent: !0,
            animationType: "fade",
            onRequestClose: X,
            children: Ne,
          })),
          (e[80] = Q),
          (e[81] = Ne),
          (e[82] = xe))
        : (xe = e[82]),
      e[83] !== U ||
      e[84] !== B ||
      e[85] !== z ||
      e[86] !== J ||
      e[87] !== P ||
      e[88] !== G ||
      e[89] !== xe ||
      e[90] !== V ||
      e[91] !== Y ||
      e[92] !== $ ||
      e[93] !== K ||
      e[94] !== q
        ? ((Te = (0, E.jsxs)(U, {
            style: V,
            contentContainerStyle: Y,
            children: [$, K, q, B, z, J, P, G, xe],
          })),
          (e[83] = U),
          (e[84] = B),
          (e[85] = z),
          (e[86] = J),
          (e[87] = P),
          (e[88] = G),
          (e[89] = xe),
          (e[90] = V),
          (e[91] = Y),
          (e[92] = $),
          (e[93] = K),
          (e[94] = q),
          (e[95] = Te))
        : (Te = e[95]),
      Te
    );
  }
  function x(e) { const sr=e.ballsFaced?(100*e.runs)/e.ballsFaced:0; return (0,E.jsxs)(p.default,{style:_.h2h,children:[(0,E.jsxs)(h.default,{style:_.name,children:[e.bowler," · ",e.runs," runs"]}),(0,E.jsxs)(h.default,{style:_.meta,children:[e.ballsFaced," balls · SR ",sr.toFixed(1)," · ",e.matches," matches · ",e.wickets," bowler wickets (run-outs excluded)"]})]},e.bowler); }
  function T(e) {
    return (0, E.jsx)(h.default, { style: _.badge, children: e }, e);
  }
  function R() {
    return l.router.replace("/");
  }
  const _ = u.default.create({
    page: { flex: 1, backgroundColor: f },
    content: { padding: 16, paddingTop: 24, paddingBottom: 34, maxWidth: 760, width: "100%", alignSelf: "center" },
    back: { color: b, fontSize: 11, fontWeight: "800", letterSpacing: 1, marginBottom: 12 },
    kicker: { color: b, fontSize: 9, fontWeight: "800", letterSpacing: 2.5 },
    title: { color: O, fontSize: 28, fontWeight: "900", marginTop: 4 },
    hint: { color: y, fontSize: 11, lineHeight: 17, marginTop: 4 },
    navContainer: { marginTop: 2, marginBottom: 6 },
    formatTabs: { flexDirection: "row", gap: 6, marginTop: 8 },
    categoryTabs: { flexDirection: "row", gap: 6, paddingVertical: 5 },
    filterRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 3 },
    metricScroll: { flex: 1, minWidth: 0 },
    subtabs: { flexDirection: "row", alignItems: "center", gap: 6, paddingVertical: 3 },
    tab: { justifyContent: "center", backgroundColor: S, borderWidth: 1, borderColor: C, borderRadius: 9, alignItems: "center" },
    formatTab: { flex: 1, minHeight: 38, paddingHorizontal: 10, paddingVertical: 7 },
    categoryTab: { flex: 0, minWidth: 82, paddingHorizontal: 11, paddingVertical: 8 },
    filterTab: { flex: 0, flexShrink: 0, minHeight: 36, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 20 },
    active: { borderColor: b, backgroundColor: "#202B18" },
    tabText: { color: y, fontWeight: "900", fontSize: 10, letterSpacing: 0.8 },
    filterTabText: { fontSize: 9, letterSpacing: 0.45, whiteSpace: "nowrap" },
    activeText: { color: b },
    card: {
      marginTop: 9,
      padding: 13,
      backgroundColor: S,
      borderWidth: 1,
      borderColor: C,
      borderRadius: 12,
    },
    head: { flexDirection: "row", alignItems: "center", gap: 12 },
    rank: { color: b, fontSize: 15, fontWeight: "900", width: 30 },
    rankGold: { color: "#FFD166" }, rankSilver: { color: "#C7D0D9" }, rankBronze: { color: "#CD8B58" },
    podiumGold: { borderColor: "#6B5622" }, podiumSilver: { borderColor: "#46535B" }, podiumBronze: { borderColor: "#63422C" },
    rankMovement: { minWidth: 28, fontSize: 9, fontWeight: "900", textAlign: "center" },
    moveUp: { color: "#80E38A" }, moveDown: { color: "#FF8B80" }, moveSame: { color: "#929A9F" }, moveNew: { color: b, fontSize: 7 },
    identity: { flex: 1 },
    name: { color: O, fontWeight: "900", fontSize: 14 },
    meta: { color: y, fontSize: 10, marginTop: 4 },
    badges: { flexDirection: "row", flexWrap: "wrap", gap: 5, marginTop: 8 },
    badge: {
      overflow: "hidden",
      backgroundColor: "#202B18",
      borderWidth: 1,
      borderColor: b,
      borderRadius: 7,
      color: b,
      fontSize: 8,
      fontWeight: "900",
      letterSpacing: 0.5,
      paddingHorizontal: 7,
      paddingVertical: 5,
    },
    total: { color: b, fontSize: 23, fontWeight: "900" },
    stats: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 14,
      paddingTop: 12,
      borderTopColor: C,
      borderTopWidth: 1,
    },
    stat: { color: y, fontSize: 9, fontWeight: "800" },
    value: { color: O, fontSize: 11, fontWeight: "900" },
    detail: { color: y, fontSize: 10, marginTop: 14 },
    unlock: { color: y, fontSize: 9, marginTop: 10 },
    empty: { padding: 20, backgroundColor: S, borderRadius: 12, marginTop: 22 },
    error: { color: "#FF8B80", marginTop: 16 },
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,.75)",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    profile: {
      width: "100%",
      maxWidth: 480,
      maxHeight: "90%",
      backgroundColor: S,
      borderWidth: 1,
      borderColor: b,
      borderRadius: 16,
      padding: 20,
    },
    profileTitle: { color: O, fontSize: 24, fontWeight: "900", marginTop: 8 },
    profileGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      marginVertical: 16,
    },
    profileStat: {
      width: "47%",
      color: b,
      fontWeight: "800",
      fontSize: 11,
      backgroundColor: f,
      padding: 10,
      borderRadius: 8,
    },
    milestoneSection: { marginTop: 12 },
    milestoneGrid: { flexDirection: "row", gap: 8, marginTop: 7 },
    milestoneCard: { flex: 1, minWidth: 0, backgroundColor: f, borderWidth: 1, borderColor: C, borderRadius: 9, padding: 9 },
    milestoneLabel: { color: y, fontSize: 8, fontWeight: "900", letterSpacing: 0.7 },
    milestoneValue: { color: b, fontSize: 19, fontWeight: "900", marginTop: 3 },
    milestoneValueGold: { color: "#FFD166", fontSize: 19, fontWeight: "900", marginTop: 3 },
    section: {
      color: b,
      fontWeight: "900",
      fontSize: 10,
      letterSpacing: 1,
      marginVertical: 10,
    },
    h2h: { paddingVertical: 9, borderBottomWidth: 1, borderBottomColor: C },
    close: {
      marginTop: 16,
      backgroundColor: b,
      padding: 13,
      borderRadius: 9,
      alignItems: "center",
    },
    closeText: { color: f, fontSize: 10, fontWeight: "900", letterSpacing: 1 },
  });
});
