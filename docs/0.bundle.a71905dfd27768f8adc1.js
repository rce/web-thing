(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{80:function(e,t,a){"use strict";var r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t.default=e,t},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};t.__esModule=!0;var l=r(a(4)),c=a(82),u=a(86),i=a(101),s=a(40),o=a(35),m=a(100),f=n(a(92)),d=a(93),p=a(94),h=a(95);function g(){var e=l.useRef(null),t=l.useState(),a=t[0],r=t[1];l.useEffect((function(){var t=p.fromScrollEvents(e).subscribe((function(e){return r(e)}));return function(){return t.unsubscribe()}}),[e]);var n=l.useState(""),c=n[0],u=n[1],i=m.useObservable((function(e){return e.pipe(m.pluckFirst,o.filter((function(e){return e.length>=3})),o.debounceTime(300),h.tapLog("searchTerm"))}),[c]),f=m.useObservable((function(e){return e.pipe(m.pluckFirst,o.flatMap((function(e){return e?s.of(e):s.EMPTY})),o.filter((function(e){var t=e.scrollTop,a=e.scrollTopMax;return t>=Math.max(0,a-500)})))}),[a]);var g=m.useObservable((function(e){return e.pipe(m.pluckFirst,o.flatMap(s.identity)).pipe(o.switchMap((function(e){var t=new s.BehaviorSubject(0),a=f.pipe(o.startWith());return s.zip(t,a).pipe(m.pluckFirst,h.tapLog("offset"),o.flatMap((function(t){return d.searchPlayer(e,t,100)})),o.tap((function(e){return 0===e.items.length?t.complete():t.next(e.end)})),h.tapLog("resultPages")).pipe(o.map((function(e){return e.items})),o.scan((function(e,t){return e.concat(t)}),[]),o.map(v))})))}),[i]),y=l.useState([]),x=y[0],b=y[1];return m.useSubscription(g,b),l.default.createElement("div",{className:"search-form"},l.default.createElement("input",{type:"text",onChange:function(e){u(e.currentTarget.value)}}),l.default.createElement("ul",{className:"search-results",ref:e},x.map((function(e){return l.default.createElement(E,{result:e,key:e.player_id})}))))}function v(e){var t=new Set,a=[];return e.forEach((function(e){t.has(e.player_id)||(t.add(e.player_id),a.push(e))})),a}function E(e){var t=e.result;return l.default.createElement("li",{className:"search-result"},l.default.createElement(i.Link,{to:"/player/"+t.player_id},l.default.createElement("img",{className:"avatar",src:""===t.avatar?f.default:t.avatar}),l.default.createElement("span",{className:"nickname"},t.nickname)))}function y(){var e,t,a=i.useParams().playerId,r=m.useObservable((function(e){return e.pipe(m.pluckFirst,o.switchMap((function(e){return d.getPlayer(e)})))}),[a]),n=l.useState(!1),c=n[0],u=n[1],s=m.useObservableState(r);return s&&s.player_id===a?l.default.createElement(l.default.Fragment,null,l.default.createElement("div",{className:"player"},l.default.createElement("img",{className:"player-avatar",src:""===s.avatar?f.default:s.avatar}),l.default.createElement("div",{className:"player-info"},l.default.createElement("h2",null,s.nickname," (",s.country,")"),l.default.createElement("ul",null,l.default.createElement("li",null,l.default.createElement("a",{href:"https://www.faceit.com/en/players/"+s.nickname},"FACEIT profile")),s.steam_id_64&&l.default.createElement("li",null,l.default.createElement("a",{href:"https://steamcommunity.com/profiles/"+s.steam_id_64},"Steam profile")),(null===(t=null===(e=s.games)||void 0===e?void 0:e.csgo)||void 0===t?void 0:t.faceit_elo)&&l.default.createElement("li",null,"CS:GO elo ",s.games.csgo.faceit_elo)))),l.default.createElement("div",null,l.default.createElement("button",{onClick:function(){return u(!c)}},"Show JSON"),c&&l.default.createElement(h.DebugValue,{name:"player",value:s})),l.default.createElement(x,{playerId:s.player_id})):l.default.createElement("p",null,"Loading...")}function x(e){var t=e.playerId,a=m.useObservable((function(e){return e.pipe(m.pluckFirst,o.switchMap((function(e){return d.getMatchHistory(e,"csgo")})),o.map((function(e){return e.items})))}),[t]),r=m.useObservableState(a,[]);return l.default.createElement("div",{className:"match-history"},l.default.createElement("h2",null,"Match history"),r.map((function(e){return l.default.createElement(b,{key:e.match_id,playerId:t,matchId:e.match_id})})))}function b(e){var t=e.playerId,a=e.matchId,r=m.useObservable((function(e){return e.pipe(m.pluckFirst,o.switchMap((function(e){return d.getMatch(e)})))}),[a]),n=m.useObservableState(r);return n&&a===n.match_id?l.default.createElement("div",{className:"match"},2===n.version&&l.default.createElement(_,{match:n,playerId:t}),1===n.version&&l.default.createElement(w,{match:n,playerId:t})):l.default.createElement("p",null,"Loading...")}function w(e){e.match,e.playerId;return l.default.createElement("p",null,"TODO")}function _(e){var t,a=e.match,r=e.playerId,n=function(e,t){return e.roster.find((function(e){return e.player_id===t}))},c=function(e){var t=e.team;return l.default.createElement("span",{className:n(t,r)?"home-team":"enemy-team"},t.name)},i=l.useState(!1),s=i[0],o=i[1],m=a.teams[a.results.winner],f=n(m,r)?l.default.createElement("span",{className:"win"},"WIN"):l.default.createElement("span",{className:"loss"},"LOSS");return l.default.createElement("div",null,l.default.createElement("div",{className:"match-header",onClick:function(){return o(!s)}},l.default.createElement("div",{className:"result"},l.default.createElement("p",null,f)),l.default.createElement("div",{className:"match-name"},l.default.createElement("p",null,l.default.createElement(c,{team:a.teams.faction1})," vs ",l.default.createElement(c,{team:a.teams.faction2}))),l.default.createElement("div",{className:"timestamp"},l.default.createElement("p",null,(t=a.started_at,u.DateTime.fromSeconds(t).toRelative()))),l.default.createElement("div",{className:"toggle"},l.default.createElement("p",null,s?l.default.createElement("i",{className:"fas fa-chevron-down"}):l.default.createElement("i",{className:"fas fa-chevron-right"})))),s&&l.default.createElement(S,{match:a}))}function S(e){var t=e.match,a=function(e){return l.default.createElement("div",{className:"team"},l.default.createElement("img",{className:"avatar",src:""===e.avatar?f.default:e.avatar}),l.default.createElement("div",{className:"players"},l.default.createElement("h2",null,e.name),l.default.createElement("ul",null,e.roster.map((function(e){return l.default.createElement("li",{key:e.player_id},e.nickname)})))))},r=l.useState(!1),n=r[0],c=r[1];return l.default.createElement("div",{className:"match-details"},l.default.createElement("div",{className:"teams"},a(t.teams.faction1),a(t.teams.faction2)),l.default.createElement("button",{onClick:function(){return c(!n)}},"Show JSON"),n&&l.default.createElement(h.DebugValue,{name:"match",value:t}))}a(96),c.render(l.default.createElement((function(){return l.default.createElement(i.HashRouter,null,l.default.createElement(g,null),l.default.createElement("div",{className:"main-content"},l.default.createElement(i.Route,{path:"/player/:playerId"},l.default.createElement(y,null))))}),null),document.getElementById("app"))},92:function(e,t,a){"use strict";a.r(t),t.default=a.p+"7a2dcae25524daba0f2f1485ce5c07e3.jpg"},93:function(e,t,a){"use strict";t.__esModule=!0;var r=a(40),n=a(35);function l(e,t,a){var n=a?"https://open.faceit.com/data/v4"+t+"?"+function(e){var t=new URLSearchParams;return Object.entries(e).forEach((function(e){var a=e[0],r=e[1];return t.append(a,r)})),t.toString()}(a):"https://open.faceit.com/data/v4"+t;return new r.Observable((function(a){var r=new AbortController,l=!1;return fetch(n,{method:e,headers:{Authorization:"Bearer 82592226-3fb7-41cf-941c-7098de7d84c7"},signal:r.signal}).then((function(e){l=!0,a.next(e),a.complete()})).catch((function(e){a.error(e),a.complete()})),function(){l||(console.log("Cancelling request in progress: "+t),r.abort())}}))}t.searchPlayer=function(e,t,a){return l("GET","/search/players",{nickname:e,game:"csgo",offset:String(t),limit:String(a)}).pipe(n.flatMap((function(e){return r.from(e.json())})))},t.getPlayer=function(e){return l("GET","/players/"+e).pipe(n.flatMap((function(e){return r.from(e.json())})))},t.getMatchHistory=function(e,t){return l("GET","/players/"+e+"/history",{game:t}).pipe(n.flatMap((function(e){return r.from(e.json())})))},t.getMatch=function(e){return l("GET","/matches/"+e).pipe(n.flatMap((function(e){return r.from(e.json())})))},t.getMatchStats=function(e){return l("GET","/matches/"+e+"/stats").pipe(n.flatMap((function(e){return r.from(e.json())})))}},94:function(e,t,a){"use strict";t.__esModule=!0;var r=a(40),n=a(35);function l(e,t){return JSON.stringify(e)===JSON.stringify(t)}t.fromScrollEvents=function(e){return r.merge((t=e.current,r.merge(r.fromEvent(t,"scroll"),r.fromEvent(window,"resize")).pipe(n.throttleTime(200),n.map((function(){return t})))),r.interval(1e3)).pipe(n.map((function(){return t=e.current,"undefined"==typeof window?{scrollTop:0,scrollTopMax:0}:{scrollTop:t.scrollTop,scrollTopMax:t.scrollHeight-t.clientHeight};var t})),n.distinctUntilChanged(l));var t}},95:function(e,t,a){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};t.__esModule=!0;var n=a(35),l=r(a(4));t.tapLog=function(e){return n.tap((function(t){return console.log(e+"$ ->",t)}))},t.DebugValue=function(e){var t=e.name,a=e.value;return l.default.createElement("pre",null,t," === ",JSON.stringify(a,null,2))}},96:function(e,t,a){var r=a(97),n=a(98);"string"==typeof(n=n.__esModule?n.default:n)&&(n=[[e.i,n,""]]);var l={insert:"head",singleton:!1},c=(r(n,l),n.locals?n.locals:{});e.exports=c},98:function(e,t,a){(t=a(99)(!1)).push([e.i,"@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro);"]),t.push([e.i,"body{font-family:'Source Sans Pro', sans-serif;color:#333;background-color:#f7f7f7}.search-form{position:fixed;top:0;left:0;overflow:none;height:100%;width:300px;display:flex;flex-direction:column}.search-form input{min-height:12px;height:12px;padding:10px}.search-form .search-results{flex-grow:1;overflow-y:scroll}.search-form .search-results .search-result a{display:flex;height:32px}.search-form .search-results .search-result a .nickname{flex-grow:1;vertical-align:middle;line-height:32px}.search-form .search-results .search-result{border-bottom:1px dashed #ddd;box-sizing:border-box}.search-form .search-results .search-result .avatar{width:32px;height:32px;margin-right:10px}.search-form ul{margin:0;padding:0}.search-form li{list-style-type:none}.search-form li.selected{background-color:#eee}.main-content{margin-left:300px}.player{display:flex;flex-direction:row}.player .player-avatar{width:170px;height:170px}.player .player-info{flex-grow:1;padding-left:20px}.match{margin:10px 0;padding:5px 0}.match .match-header{display:flex;flex-direction:row}.match .match-header .result{width:100px}.match .match-header .match-name{flex-grow:1;padding-left:20px}.match .match-header .timestamp{width:150px;padding:0 20px}.match .match-header .toggle{width:16px;padding:0 20px}.match .match-details .teams{display:flex;flex-direction:row}.match .match-details .teams .team{flex-grow:1;display:flex;flex-direction:row}.match .match-details .teams .team .avatar{width:240px;height:240px}.match .match-details .teams .team .players{flex-grow:1;padding-left:20px}.match{border:1px solid #eee;background:white;box-shadow:0px 8px 16px 0px rgba(0,0,0,0.2)}.match .match-header .result{text-align:center}.match .match-header .result .win{color:green}.match .match-header .result .loss{color:red}.match .match-header .match-name{border-left:1px solid lightgray;border-right:1px solid lightgray}.match .match-header .match-name .home-team{text-decoration:underline}.match .match-header .timestamp{text-align:center}.match .match-header .toggle{text-align:center;border-left:1px solid lightgray}.match .match-details{padding:20px;border-top:1px solid lightgray}\n",""]),e.exports=t}},[[80,1,2]]]);
//# sourceMappingURL=0.bundle.a71905dfd27768f8adc1.js.map