(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,function(e,t,n){function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,a=!1,c=void 0;try{for(var l,i=e[Symbol.iterator]();!(r=(l=i.next()).done)&&(n.push(l.value),!t||n.length!==t);r=!0);}catch(e){a=!0,c=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw c}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var c=n(2),l=n(6),i=n(27).DateTime,o=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.base="https://open.faceit.com/data/v4",this.apiKey=t,this.authHeaders={Authorization:"Bearer ".concat(this.apiKey)}}var t,n,o;return t=e,(n=[{key:"searchPlayer",value:function(e){return this.callApi("GET","/search/players",{nickname:e,limit:"1000",game:"csgo"}).map(l.prop("items"))}},{key:"getPlayer",value:function(e){return this.callApi("GET","/players/".concat(e))}},{key:"getHistory",value:function(e,t){return this.callApi("GET","/players/".concat(e,"/history"),{game:t}).map(l.prop("items"))}},{key:"getMatch",value:function(e){return this.callApi("GET","/matches/".concat(e)).map((function(e){return l.mergeLeft({started_at:i.fromSeconds(e.started_at)},e)}))}},{key:"getMatchStats",value:function(e){return this.callApi("GET","/matches/".concat(e,"/stats"))}},{key:"callApi",value:function(e,t,n){var r=this,a="".concat(this.base).concat(t,"?").concat(this.mkQueryString(n));return c.stream((function(n){var c=new AbortController,l=c.signal,i=!1;return fetch(a,{method:e,headers:r.authHeaders,signal:l}).then((function(e){return e.json()})).then((function(e){i=!0,n.emit(e),n.end()})).catch((function(e){n.error(e),n.end()})),function(){i||(console.log("Cancelling request in progress: ".concat(t)),c.abort())}}))}},{key:"mkQueryString",value:function(e){if(!e)return"";var t=new URLSearchParams;return Object.entries(e).forEach((function(e){var n=r(e,2),a=n[0],c=n[1];return t.append(a,String(c))})),t.toString()}}])&&a(t.prototype,n),o&&a(t,o),e}();e.exports=new o("82592226-3fb7-41cf-941c-7098de7d84c7")},function(e,t,n){var r=n(5);e.exports={Spinner:function(){return r.createElement("p",null,"Loading...")}}},function(e,t,n){var r=n(2),a=n(6);e.exports={isAwaiting:function(e,t){return r.merge([e.map((function(){return!0})),t.map((function(){return!1}))])},toggle:function(e){return function(){return e.modify(a.not)}}}},function(e,t,n){var r=n(1),a=n(29),c=[r.prop("avatar"),r.reread((function(e){return""===e?void 0:e})),r.defaults(a)];e.exports={avatarLens:c}},,,function(e,t,n){var r=n(5),a=n(16).render;n(20);var c=n(24),l=c.BrowserRouter,i=c.Route,o=c.navigate,s=n(26),u=n(30).Search;a(r.createElement((function(){return r.createElement(l,null,r.createElement(u,{onSelect:function(e){return o("#/player/".concat(e.player_id))}}),r.createElement("div",{className:"main-content"},r.createElement(i,{hash:"#/player/:playerId",Component:s})))}),null),document.getElementById("app"))},,,,,,,function(e,t,n){var r=n(21),a=n(22);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var c={insert:"head",singleton:!1},l=(r(a,c),a.locals?a.locals:{});e.exports=l},,function(e,t,n){(t=n(23)(!1)).push([e.i,"@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro);"]),t.push([e.i,"body {\n  font-family: 'Source Sans Pro', sans-serif;\n  color: #333;\n  background-color: #f7f7f7; }\n\n.search-form {\n  position: fixed;\n  top: 0;\n  left: 0;\n  overflow: none;\n  height: 100%;\n  width: 300px;\n  display: flex;\n  flex-direction: column; }\n  .search-form input {\n    min-height: 12px;\n    height: 12px;\n    padding: 10px; }\n  .search-form .search-results {\n    flex-grow: 1;\n    overflow-y: scroll; }\n  .search-form .search-results .search-result {\n    display: flex;\n    height: 32px; }\n    .search-form .search-results .search-result .nickname {\n      flex-grow: 1;\n      vertical-align: middle;\n      line-height: 32px; }\n  .search-form .search-results .search-result {\n    border-bottom: 1px dashed #ddd;\n    box-sizing: border-box; }\n    .search-form .search-results .search-result .avatar {\n      width: 32px;\n      height: 32px;\n      margin-right: 10px; }\n  .search-form ul {\n    margin: 0;\n    padding: 0; }\n  .search-form li {\n    list-style-type: none; }\n    .search-form li.selected {\n      background-color: #eee; }\n\n.main-content {\n  margin-left: 300px; }\n\n.player {\n  display: flex;\n  flex-direction: row; }\n  .player .player-avatar {\n    width: 170px;\n    height: 170px; }\n  .player .player-info {\n    flex-grow: 1;\n    padding-left: 20px; }\n\n.match {\n  margin: 10px 0;\n  padding: 5px 0; }\n  .match .match-header {\n    display: flex;\n    flex-direction: row; }\n    .match .match-header .result {\n      width: 100px; }\n    .match .match-header .match-name {\n      flex-grow: 1;\n      padding-left: 20px; }\n    .match .match-header .timestamp {\n      width: 150px;\n      padding: 0 20px; }\n    .match .match-header .toggle {\n      width: 16px;\n      padding: 0 20px; }\n  .match .match-details .teams {\n    display: flex;\n    flex-direction: row; }\n    .match .match-details .teams .team {\n      flex-grow: 1;\n      display: flex;\n      flex-direction: row; }\n      .match .match-details .teams .team .avatar {\n        width: 240px;\n        height: 240px; }\n      .match .match-details .teams .team .players {\n        flex-grow: 1;\n        padding-left: 20px; }\n\n.match {\n  border: 1px solid #eee;\n  background: white;\n  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2); }\n  .match .match-header .result {\n    text-align: center; }\n    .match .match-header .result .win {\n      color: green; }\n    .match .match-header .result .loss {\n      color: red; }\n  .match .match-header .match-name {\n    border-left: 1px solid lightgray;\n    border-right: 1px solid lightgray; }\n    .match .match-header .match-name .home-team {\n      text-decoration: underline; }\n  .match .match-header .timestamp {\n    text-align: center; }\n  .match .match-header .toggle {\n    text-align: center;\n    border-left: 1px solid lightgray; }\n  .match .match-details {\n    padding: 20px;\n    border-top: 1px solid lightgray; }\n",""]),e.exports=t},,function(e,t,n){function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function a(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,a=!1,c=void 0;try{for(var l,i=e[Symbol.iterator]();!(r=(l=i.next()).done)&&(n.push(l.value),!t||n.length!==t);r=!0);}catch(e){a=!0,c=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw c}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var l=n(5),i=n(4).Atom,o=n(6),s=n(25),u=l.createContext(),m=function(){return window.location.hash},f=new i(m());f.onValue((function(e){console.log("Sync Atom -> window.location"),window.location.hash=e})),window.onhashchange=function(){console.log("Sync window.location -> Atom"),f.set(m())};var p=function(e,t){return function(){return t.view("pathname").set(e)}};e.exports={BrowserRouter:function(e){var t=e.children;return l.createElement(u.Provider,{value:f},t)},Route:function(e){var t=e.hash,n=e.Component,r=c(function(e){var t=[];return[s(e,t),t.map(o.prop("name"))]}(t),2),a=r[0],i=r[1];return l.createElement(u.Consumer,null,(function(e){return l.createElement(l.Fragment,null,e.map((function(t){var r=a.exec(t);if(r){var c=o.tail(r),s=o.zipObj(i,c);return l.createElement(n,{key:"1",params:s,location:e})}})))}))},Link:function(e){var t=e.href,n=a(e,["href"]);return l.createElement(u.Consumer,null,(function(e){return l.createElement("a",r({href:t,onClick:p(t,e)},n))}))},navigate:function(e){return f.set(e)}}},,function(e,t,n){function r(){var e=c(["https://steamcommunity.com/profiles/",""]);return r=function(){return e},e}function a(){var e=c(["https://www.faceit.com/en/players/",""]);return a=function(){return e},e}function c(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var l=n(5),i=n(6),o=n(11),s=n(4).Atom,u=n(7),m=n(28),f=n(8).Spinner,p=n(9).toggle,h=n(10).avatarLens;e.exports=function(e){var t=e.params.playerId,n=u.getPlayer(t).toProperty(),c=new s(!1),d=o.view("steam_id_64",n),v=o.view(["games","csgo","faceit_elo"],n);return l.createElement("div",null,o.ifElse(n.map(i.isNil),l.createElement(f,null),l.createElement("div",null,l.createElement("div",{className:"player"},l.createElement("img",{className:"player-avatar",src:o.view(h,n)}),l.createElement("div",{className:"player-info"},l.createElement("h2",null,o.view("nickname",n)," (",o.view("country",n),")"),l.createElement("ul",null,l.createElement("li",null,l.createElement("a",{href:o.string(a(),o.view("nickname",n))},"FACEIT profile")),o.when(d,l.createElement("li",null,l.createElement("a",{href:o.string(r(),d)},"Steam profile"))),o.when(v,l.createElement("li",null,"CS:GO elo ",v))))),l.createElement("div",null,l.createElement("button",{onClick:p(c)},"Show JSON"),o.when(c,l.createElement("pre",null,o.stringify(n,null,2)))),l.createElement(m,{playerId:o.view("player_id",n)}))))}},,function(e,t,n){var r=n(5),a=n(2),c=n(4).Atom,l=n(11),i=n(6),o=n(7),s=n(8).Spinner,u=n(9).toggle,m=n(10).avatarLens,f=function(e){var t=e.playerId,n=e.matchId.flatMapLatest((function(e){return o.getMatch(e)})).toProperty((function(){}));return r.createElement("div",{className:"match"},l.cond([n.map(i.isNil),r.createElement(s,null)],[n.map((function(e){return 2===e.version})),r.createElement(h,{playerId:t,match:n})],[n.map((function(e){return 1===e.version})),r.createElement(p,{playerId:t,match:n})],[r.createElement("p",null,"Unknown match version")]))},p=function(e){var t=e.match,n=e.playerId,o=i.prop("roster_v1"),s=i.prop("guid"),m=new c(!1),f=l.view(["teams","faction1"],t),p=l.view(["teams","faction2"],t),h=l.when(t,a.combine([t],[n],(function(e,t){return g(o,s)(t,v(e))?r.createElement("span",{className:"win"},"WIN"):r.createElement("span",{className:"loss"},"LOSS")}))),E=w(o,s)(n);return r.createElement("div",null,r.createElement("div",{className:"match-header",onClick:u(m)},r.createElement("div",{className:"result"},r.createElement("p",null,h)),r.createElement("div",{className:"match-name"},r.createElement("p",null,r.createElement(E,{team:f})," vs ",r.createElement(E,{team:p}))),r.createElement("div",{className:"timestamp"},r.createElement("p",null,l.view(["started_at",y],t))),r.createElement("div",{className:"toggle"},r.createElement("p",null,l.ifElse(m,r.createElement("i",{className:"fas fa-chevron-down"}),r.createElement("i",{className:"fas fa-chevron-right"}))))),l.when(m,r.createElement(d,{match:t,getRoster:o})))},h=function(e){var t=e.match,n=e.playerId,o=i.prop("roster"),s=i.prop("player_id"),u=new c(!1),m=l.view(["teams","faction1"],t),f=l.view(["teams","faction2"],t),p=l.when(t,a.combine([t],[n],(function(e,t){return g(o,s)(t,v(e))?r.createElement("span",{className:"win"},"WIN"):r.createElement("span",{className:"loss"},"LOSS")}))),h=w(o,s)(n);return r.createElement("div",null,r.createElement("div",{className:"match-header",onClick:function(){return u.modify(i.not)}},r.createElement("div",{className:"result"},r.createElement("p",null,p)),r.createElement("div",{className:"match-name"},r.createElement("p",null,r.createElement(h,{team:m})," vs ",r.createElement(h,{team:f}))),r.createElement("div",{className:"timestamp"},r.createElement("p",null,l.view(["started_at",y],t))),r.createElement("div",{className:"toggle"},r.createElement("p",null,l.ifElse(u,r.createElement("i",{className:"fas fa-chevron-down"}),r.createElement("i",{className:"fas fa-chevron-right"}))))),l.when(l.lift(i.and)(u,t),r.createElement(d,{match:t,getRoster:o})))},d=function(e){var t=e.match,n=e.getRoster,a=new c(!1),o=l.lift((function(e){return r.createElement("div",{className:"team"},r.createElement("img",{className:"avatar",src:l.view(m,e)}),r.createElement("div",{className:"players"},r.createElement("h2",null,l.view("name",e)),r.createElement("ul",null,l.mapElems((function(e,t){return r.createElement("li",{key:t},l.view("nickname",e))}),n(e)))))}));return r.createElement("div",{className:"match-details"},r.createElement("div",{className:"teams"},o(t.map(i.path(["teams","faction1"]))),o(t.map(i.path(["teams","faction2"])))),r.createElement("button",{onClick:u(a)},"Show JSON"),l.when(a,r.createElement("pre",null,l.stringify(t,null,2))))},v=function(e){return e.teams[e.results.winner]},g=function(e,t){return function(n,r){return e(r).map(t).includes(n)}},y=function(e){return e.toRelative()},w=function(e,t){return function(n){return function(c){var i=c.team,o=c.className;return r.createElement("span",{className:l.cns(o,l.ifElse(function(r){return a.combine([r],[n],(function(n,r){return e(n).map(t).includes(r)}))}(i),"home-team","enemy-team"))},l.view("name",i))}}};e.exports=function(e){var t=e.playerId,n=t.flatMapLatest((function(e){return o.getHistory(e,"csgo")})).toProperty((function(){return[]}));return r.createElement("div",{className:"match-history"},r.createElement("h2",null,"Match history"),l.mapElemsWithIds("match_id",(function(e,n){return r.createElement(f,{key:n,playerId:t,matchId:l.view("match_id",e)})}),n))}},function(e,t,n){"use strict";n.r(t),t.default=n.p+"553ceec0991dfc5541582f07b1e6c681.jpg"},function(e,t,n){function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function a(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,a=!1,c=void 0;try{for(var l,i=e[Symbol.iterator]();!(r=(l=i.next()).done)&&(n.push(l.value),!t||n.length!==t);r=!0);}catch(e){a=!0,c=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw c}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var l=n(5),i=n(4).Atom,o=n(6),s=n(11),u=n(2),m=n(7),f=n(8).Spinner,p=n(9).isAwaiting,h=n(10).avatarLens,d=l.forwardRef((function(e,t){var n=e.result,c=e.className,i=a(e,["result","className"]);return l.createElement("li",r({},i,{ref:t,className:s.cns("search-result",c)}),l.createElement("img",{className:"avatar",src:s.view(h,n)}),l.createElement("span",{className:"nickname"},s.view("nickname",n)))})),v=function(e){return e&&e.scrollIntoView({block:"nearest"})},g=function(e){return o.compose(o.lte(e),o.length)},y=function(e,t){return o.pipe(o.min(t),o.max(e))},w=function(e){return void 0!==e};e.exports={Search:function(e){var t=e.onSelect,n=new i(""),r=new i(void 0),a=n.filter(g(3)).debounce(250).skipDuplicates(),h=a.flatMapLatest((function(e){return m.searchPlayer(e)})).toProperty((function(){return[]})),E=p(a,h);h.onValue((function(){return r.set(void 0)})),u.combine([r],[h]).onValue((function(e){var n=c(e,2),r=n[0],a=n[1];return w(r)&&t(a[r])}));var x=s.bus();u.combine([x],[r,h]).onValue((function(e){var t=c(e,3),n=t[0],a=t[1],l=t[2];if(0===l.length)return r.set(void 0);if(!w(a))return r.set(0);var i="ArrowUp"===n.key?o.dec:o.inc,s=y(0,l.length)(i(a));r.set(s)}));var b=new i;return b.onValue((function(e){return e.focus()})),l.createElement("div",{className:"search-form"},l.createElement("input",{ref:s.set(b),type:"text",value:n,onKeyDown:function(e){["ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),e.persist(),x.push(e))},onChange:s.getProps({value:n})}),s.when(E,l.createElement(f,null)),l.createElement("ul",{className:"search-results",onMouseDown:function(e){e.preventDefault(),b.get().focus()}},s.mapElems((function(e,t){var n=r.map(o.equals(t)),a=new i;return n.filter(o.identity).onValue((function(){return v(a.get())})),l.createElement(d,{result:e,ref:s.set(a),key:t,onClick:function(){return r.set(t)},className:s.cns(s.when(n,"selected"))})}),h)))}}}],[[13,1,2]]]);
//# sourceMappingURL=0.bundle.a35022d8a1d924ec630c.js.map