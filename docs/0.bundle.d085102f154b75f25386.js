(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,function(e,t,n){function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,a=!1,l=void 0;try{for(var c,i=e[Symbol.iterator]();!(r=(c=i.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(e){a=!0,l=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw l}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var l=n(2),c=n(6),i=n(27).DateTime,o=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.base="https://open.faceit.com/data/v4",this.apiKey=t,this.authHeaders={Authorization:"Bearer ".concat(this.apiKey)}}var t,n,o;return t=e,(n=[{key:"searchPlayer",value:function(e){return this.callApi("GET","/search/players",{nickname:e,limit:"1000",game:"csgo"}).map(c.prop("items"))}},{key:"getPlayer",value:function(e){return this.callApi("GET","/players/".concat(e))}},{key:"getHistory",value:function(e,t){return this.callApi("GET","/players/".concat(e,"/history"),{game:t}).map(c.prop("items"))}},{key:"getMatch",value:function(e){return this.callApi("GET","/matches/".concat(e)).map(function(e){return c.mergeLeft({started_at:i.fromSeconds(e.started_at)},e)})}},{key:"getMatchStats",value:function(e){return this.callApi("GET","/matches/".concat(e,"/stats"))}},{key:"callApi",value:function(e,t,n){var r=this,a="".concat(this.base).concat(t,"?").concat(this.mkQueryString(n));return l.stream(function(n){var l=new AbortController,c=l.signal,i=!1;return fetch(a,{method:e,headers:r.authHeaders,signal:c}).then(function(e){return e.json()}).then(function(e){i=!0,n.emit(e),n.end()}).catch(function(e){n.error(e),n.end()}),function(){i||(console.log("Cancelling request in progress: ".concat(t)),l.abort())}})}},{key:"mkQueryString",value:function(e){if(!e)return"";var t=new URLSearchParams;return Object.entries(e).forEach(function(e){var n=r(e,2),a=n[0],l=n[1];return t.append(a,String(l))}),t.toString()}}])&&a(t.prototype,n),o&&a(t,o),e}();e.exports=new o("82592226-3fb7-41cf-941c-7098de7d84c7")},function(e,t,n){var r=n(5);e.exports={Spinner:function(){return r.createElement("p",null,"Loading...")}}},function(e,t,n){var r=n(2),a=n(6);e.exports={isAwaiting:function(e,t){return r.merge([e.map(function(){return!0}),t.map(function(){return!1})])},toggle:function(e){return function(){return e.modify(a.not)}}}},,,,function(e,t,n){var r=n(5),a=n(15).render;n(19);var l=n(24),c=l.BrowserRouter,i=l.Route,o=l.navigate,s=n(26),u=n(29).Search;a(r.createElement(function(){return r.createElement(c,null,r.createElement(u,{onSelect:function(e){return o("#/player/".concat(e.player_id))}}),r.createElement("div",{className:"main-content"},r.createElement(i,{hash:"#/player/:playerId",Component:s})))},null),document.getElementById("app"))},,,,,,function(e,t,n){var r=n(20);"string"==typeof r&&(r=[[e.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(22)(r,a);r.locals&&(e.exports=r.locals)},function(e,t,n){(t=e.exports=n(21)(!1)).push([e.i,"@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro);",""]),t.push([e.i,"body {\n  font-family: 'Source Sans Pro', sans-serif;\n  color: #333;\n  background-color: #f7f7f7; }\n\n.search-form {\n  position: fixed;\n  top: 0;\n  left: 0;\n  overflow: none;\n  height: 100%;\n  width: 300px;\n  display: flex;\n  flex-direction: column; }\n  .search-form input {\n    min-height: 12px;\n    height: 12px;\n    padding: 10px; }\n  .search-form .search-results {\n    flex-grow: 1;\n    overflow-y: scroll; }\n  .search-form .search-results .search-result {\n    display: flex;\n    height: 32px; }\n    .search-form .search-results .search-result .nickname {\n      flex-grow: 1;\n      vertical-align: middle;\n      line-height: 32px; }\n  .search-form .search-results .search-result {\n    border-bottom: 1px dashed #ddd;\n    box-sizing: border-box; }\n    .search-form .search-results .search-result .avatar {\n      width: 32px;\n      height: 32px;\n      margin-right: 10px; }\n  .search-form ul {\n    margin: 0;\n    padding: 0; }\n  .search-form li {\n    list-style-type: none; }\n    .search-form li.selected {\n      background-color: #eee; }\n\n.main-content {\n  margin-left: 300px; }\n\n.player {\n  display: flex;\n  flex-direction: row; }\n  .player .player-avatar {\n    width: 170px;\n    height: 170px; }\n  .player .player-info {\n    flex-grow: 1;\n    padding-left: 20px; }\n\n.match {\n  margin: 10px 0;\n  padding: 5px 0; }\n  .match .match-header {\n    display: flex;\n    flex-direction: row; }\n    .match .match-header .result {\n      width: 100px; }\n    .match .match-header .match-name {\n      flex-grow: 1;\n      padding-left: 20px; }\n    .match .match-header .timestamp {\n      width: 150px;\n      padding: 0 20px; }\n    .match .match-header .toggle {\n      width: 16px;\n      padding: 0 20px; }\n  .match .match-details .teams {\n    display: flex;\n    flex-direction: row; }\n    .match .match-details .teams .team {\n      flex-grow: 1;\n      display: flex;\n      flex-direction: row; }\n      .match .match-details .teams .team .avatar {\n        width: 240px;\n        height: 240px; }\n      .match .match-details .teams .team .players {\n        flex-grow: 1;\n        padding-left: 20px; }\n\n.match {\n  border: 1px solid #eee;\n  background: white;\n  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2); }\n  .match .match-header .result {\n    text-align: center; }\n    .match .match-header .result .win {\n      color: green; }\n    .match .match-header .result .loss {\n      color: red; }\n  .match .match-header .match-name {\n    border-left: 1px solid lightgray;\n    border-right: 1px solid lightgray; }\n    .match .match-header .match-name .home-team {\n      text-decoration: underline; }\n  .match .match-header .timestamp {\n    text-align: center; }\n  .match .match-header .toggle {\n    text-align: center;\n    border-left: 1px solid lightgray; }\n  .match .match-details {\n    padding: 20px;\n    border-top: 1px solid lightgray; }\n",""])},,,,function(e,t,n){function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function a(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function l(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,a=!1,l=void 0;try{for(var c,i=e[Symbol.iterator]();!(r=(c=i.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(e){a=!0,l=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw l}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var c=n(5),i=n(4).Atom,o=n(6),s=n(25),u=c.createContext(),m=function(){return window.location.hash},f=new i(m());f.onValue(function(e){console.log("Sync Atom -> window.location"),window.location.hash=e}),window.onhashchange=function(){console.log("Sync window.location -> Atom"),f.set(m())};var p=function(e,t){return function(){return t.view("pathname").set(e)}};e.exports={BrowserRouter:function(e){var t=e.children;return c.createElement(u.Provider,{value:f},t)},Route:function(e){var t=e.hash,n=e.Component,r=l(function(e){var t=[];return[s(e,t),t.map(o.prop("name"))]}(t),2),a=r[0],i=r[1];return c.createElement(u.Consumer,null,function(e){return c.createElement(c.Fragment,null,e.map(function(t){var r=a.exec(t);if(r){var l=o.tail(r),s=o.zipObj(i,l);return c.createElement(n,{key:"1",params:s,location:e})}}))})},Link:function(e){var t=e.href,n=a(e,["href"]);return c.createElement(u.Consumer,null,function(e){return c.createElement("a",r({href:t,onClick:p(t,e)},n))})},navigate:function(e){return f.set(e)}}},,function(e,t,n){function r(){var e=function(e,t){t||(t=e.slice(0));return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}(["https://steamcommunity.com/profiles/",""]);return r=function(){return e},e}var a=n(5),l=n(6),c=n(10),i=n(4).Atom,o=n(7),s=n(28),u=n(8).Spinner,m=n(9).toggle;e.exports=function(e){var t=e.params.playerId,n=o.getPlayer(t).toProperty(),f=new i(!1),p=c.view("steam_id_64",n);return a.createElement("div",null,c.ifElse(n.map(l.isNil),a.createElement(u,null),a.createElement("div",null,a.createElement("div",{className:"player"},a.createElement("img",{className:"player-avatar",src:c.view("avatar",n)}),a.createElement("div",{className:"player-info"},a.createElement("h2",null,c.view("nickname",n)," (",c.view("country",n),")"),c.when(p,a.createElement("p",null,a.createElement("a",{href:c.string(r(),p)},"Steam profile"))),a.createElement("table",null,a.createElement("tbody",null,a.createElement("tr",null,a.createElement("td",null,"Player ID"),a.createElement("td",null,c.view("player_id",n))),a.createElement("tr",null,a.createElement("td",null,"Country"),a.createElement("td",null,c.view("country",n))),c.when(n.map(l.path(["games","csgo","faceit_elo"])),a.createElement("tr",null,a.createElement("td",null,"CSGO elo"),a.createElement("td",null,c.view(["games","csgo","faceit_elo"],n)))))))),a.createElement("div",null,a.createElement("button",{onClick:m(f)},"Show JSON"),c.when(f,a.createElement("pre",null,c.stringify(n,null,2)))),a.createElement(s,{playerId:c.view("player_id",n)}))))}},,function(e,t,n){var r=n(5),a=n(2),l=n(4).Atom,c=n(10),i=n(6),o=n(7),s=n(8).Spinner,u=n(9).toggle,m=function(e){var t=e.playerId,n=e.matchId.flatMapLatest(function(e){return o.getMatch(e)}).toProperty(function(){});return r.createElement("div",{className:"match"},c.cond([n.map(i.isNil),r.createElement(s,null)],[n.map(function(e){return 2===e.version}),r.createElement(p,{playerId:t,match:n})],[n.map(function(e){return 1===e.version}),r.createElement(f,{playerId:t,match:n})],[r.createElement("p",null,"Unknown match version")]))},f=function(e){var t=e.match,n=e.playerId,o=i.prop("roster_v1"),s=new l(!1),m=c.view(["teams","faction1"],t),f=c.view(["teams","faction2"],t),p=c.when(t,a.combine([t],[n],function(e,t){return v(o)(t,d(e))?r.createElement("span",{className:"win"},"WIN"):r.createElement("span",{className:"loss"},"LOSS")})),w=g(o)(n);return r.createElement("div",null,r.createElement("div",{className:"match-header",onClick:u(s)},r.createElement("div",{className:"result"},r.createElement("p",null,p)),r.createElement("div",{className:"match-name"},r.createElement("p",null,r.createElement(w,{team:m})," vs ",r.createElement(w,{team:f}))),r.createElement("div",{className:"timestamp"},r.createElement("p",null,c.view(["started_at",y],t))),r.createElement("div",{className:"toggle"},r.createElement("p",null,c.ifElse(s,r.createElement("i",{className:"fas fa-chevron-down"}),r.createElement("i",{className:"fas fa-chevron-right"}))))),c.when(s,r.createElement(h,{match:t,getRoster:o})))},p=function(e){var t=e.match,n=e.playerId,o=i.prop("roster"),s=new l(!1),u=c.view(["teams","faction1"],t),m=c.view(["teams","faction2"],t),f=c.when(t,a.combine([t],[n],function(e,t){return v(o)(t,d(e))?r.createElement("span",{className:"win"},"WIN"):r.createElement("span",{className:"loss"},"LOSS")})),p=g(o)(n);return r.createElement("div",null,r.createElement("div",{className:"match-header",onClick:function(){return s.modify(i.not)}},r.createElement("div",{className:"result"},r.createElement("p",null,f)),r.createElement("div",{className:"match-name"},r.createElement("p",null,r.createElement(p,{team:u})," vs ",r.createElement(p,{team:m}))),r.createElement("div",{className:"timestamp"},r.createElement("p",null,c.view(["started_at",y],t))),r.createElement("div",{className:"toggle"},r.createElement("p",null,c.ifElse(s,r.createElement("i",{className:"fas fa-chevron-down"}),r.createElement("i",{className:"fas fa-chevron-right"}))))),c.when(c.lift(i.and)(s,t),r.createElement(h,{match:t,getRoster:o})))},h=function(e){var t=e.match,n=e.getRoster,a=new l(!1),o=c.lift(function(e){return r.createElement("div",{className:"team"},r.createElement("img",{className:"avatar",src:c.view("avatar",e)}),r.createElement("div",{className:"players"},r.createElement("h2",null,c.view("name",e)),r.createElement("ul",null,c.mapElems(function(e,t){return r.createElement("li",{key:t},c.view("nickname",e))},n(e)))))});return r.createElement("div",{className:"match-details"},r.createElement("div",{className:"teams"},o(t.map(i.path(["teams","faction1"]))),o(t.map(i.path(["teams","faction2"])))),r.createElement("button",{onClick:u(a)},"Show JSON"),c.when(a,r.createElement("pre",null,c.stringify(t,null,2))))},d=function(e){return e.teams[e.results.winner]},v=function(e){return function(t,n){return e(n).map(i.prop("player_id")).includes(t)}},y=function(e){return e.toRelative()},g=function(e){return function(t){return function(n){var l=n.team,o=n.className;return r.createElement("span",{className:c.cns(o,c.ifElse(function(n){return a.combine([n],[t],function(t,n){return e(t).map(i.prop("player_id")).includes(n)})}(l),"home-team","enemy-team"))},c.view("name",l))}}};e.exports=function(e){var t=e.playerId,n=t.flatMapLatest(function(e){return o.getHistory(e,"csgo")}).toProperty(function(){return[]});return r.createElement("div",{className:"match-history"},r.createElement("h2",null,"Match history"),c.mapElemsWithIds("match_id",function(e,n){return r.createElement(m,{key:n,playerId:t,matchId:c.view("match_id",e)})},n))}},function(e,t,n){function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function a(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function l(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,a=!1,l=void 0;try{for(var c,i=e[Symbol.iterator]();!(r=(c=i.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(e){a=!0,l=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw l}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var c=n(5),i=n(4).Atom,o=n(6),s=n(10),u=n(2),m=n(7),f=n(8).Spinner,p=n(9).isAwaiting,h=c.forwardRef(function(e,t){var n=e.result,l=e.className,i=a(e,["result","className"]);return c.createElement("li",r({},i,{ref:t,className:s.cns("search-result",l)}),c.createElement("img",{className:"avatar",src:s.view("avatar",n)}),c.createElement("span",{className:"nickname"},s.view("nickname",n)))}),d=function(e){return e&&e.scrollIntoView({block:"nearest"})},v=function(e){return o.compose(o.lte(e),o.length)},y=function(e,t){return o.pipe(o.min(t),o.max(e))},g=function(e){return void 0!==e};e.exports={Search:function(e){var t=e.onSelect,n=new i(""),r=new i(void 0),a=n.filter(v(3)).debounce(250).skipDuplicates(),w=a.flatMapLatest(function(e){return m.searchPlayer(e)}).toProperty(function(){return[]}),E=p(a,w);w.onValue(function(){return r.set(void 0)}),u.combine([r],[w]).onValue(function(e){var n=l(e,2),r=n[0],a=n[1];return g(r)&&t(a[r])});var x=s.bus();u.combine([x],[r,w]).onValue(function(e){var t=l(e,3),n=t[0],a=t[1],c=t[2];if(0===c.length)return r.set(void 0);if(!g(a))return r.set(0);var i="ArrowUp"===n.key?o.dec:o.inc,s=y(0,c.length)(i(a));r.set(s)});var b=new i;return b.onValue(function(e){return e.focus()}),c.createElement("div",{className:"search-form"},c.createElement("input",{ref:s.set(b),type:"text",value:n,onKeyDown:function(e){["ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),e.persist(),x.push(e))},onChange:s.getProps({value:n})}),s.when(E,c.createElement(f,null)),c.createElement("ul",{className:"search-results",onMouseDown:function(e){e.preventDefault(),b.get().focus()}},s.mapElems(function(e,t){var n=r.map(o.equals(t)),a=new i;return n.filter(o.identity).onValue(function(){return d(a.get())}),c.createElement(h,{result:e,ref:s.set(a),key:t,onClick:function(){return r.set(t)},className:s.cns(s.when(n,"selected"))})},w)))}}}],[[13,1,2]]]);
//# sourceMappingURL=0.bundle.d085102f154b75f25386.js.map