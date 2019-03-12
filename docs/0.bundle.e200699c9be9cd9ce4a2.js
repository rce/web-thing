(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,function(e,n,t){function r(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=[],r=!0,a=!1,o=void 0;try{for(var l,i=e[Symbol.iterator]();!(r=(l=i.next()).done)&&(t.push(l.value),!n||t.length!==n);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw o}}return t}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function a(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var o=t(2),l=t(6),i=t(26).DateTime,c=function(){function e(n){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.base="https://open.faceit.com/data/v4",this.apiKey=n,this.authHeaders={Authorization:"Bearer ".concat(this.apiKey)}}var n,t,c;return n=e,(t=[{key:"searchPlayer",value:function(e){return this.callApi("GET","/search/players",{nickname:e,limit:"1000",game:"csgo"}).map(l.prop("items"))}},{key:"getPlayer",value:function(e){return this.callApi("GET","/players/".concat(e))}},{key:"getHistory",value:function(e,n){return this.callApi("GET","/players/".concat(e,"/history"),{game:n}).map(l.prop("items"))}},{key:"getMatch",value:function(e){return this.callApi("GET","/matches/".concat(e)).map(function(e){return l.mergeLeft({started_at:i.fromSeconds(e.started_at)},e)})}},{key:"getMatchStats",value:function(e){return this.callApi("GET","/matches/".concat(e,"/stats"))}},{key:"callApi",value:function(e,n,t){var r=this,a="".concat(this.base).concat(n,"?").concat(this.mkQueryString(t));return o.stream(function(t){var o=new AbortController,l=o.signal,i=!1;return fetch(a,{method:e,headers:r.authHeaders,signal:l}).then(function(e){return e.json()}).then(function(e){i=!0,t.emit(e),t.end()}).catch(function(e){t.error(e),t.end()}),function(){i||(console.log("Cancelling request in progress: ".concat(n)),o.abort())}})}},{key:"mkQueryString",value:function(e){if(!e)return"";var n=new URLSearchParams;return Object.entries(e).forEach(function(e){var t=r(e,2),a=t[0],o=t[1];return n.append(a,String(o))}),n.toString()}}])&&a(n.prototype,t),c&&a(n,c),e}();e.exports=new c("82592226-3fb7-41cf-941c-7098de7d84c7")},function(e,n,t){var r=t(5);e.exports={Spinner:function(){return r.createElement("p",null,"Loading...")}}},,,,function(e,n,t){var r=t(5),a=t(14).render;t(18);var o=t(23),l=o.BrowserRouter,i=o.Route,c=o.navigate,u=t(25),s=t(28).Search;a(r.createElement(function(){return r.createElement(l,null,r.createElement(s,{onSelect:function(e){return c("#/player/".concat(e.player_id))}}),r.createElement("div",{className:"main-content"},r.createElement(i,{hash:"#/player/:playerId",Component:u})))},null),document.getElementById("app"))},,,,,,function(e,n,t){var r=t(19);"string"==typeof r&&(r=[[e.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};t(21)(r,a);r.locals&&(e.exports=r.locals)},function(e,n,t){(n=e.exports=t(20)(!1)).push([e.i,"@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro);",""]),n.push([e.i,"body {\n  font-family: 'Source Sans Pro', sans-serif;\n  color: #333;\n  background-color: #f7f7f7; }\n\n.search-form {\n  position: fixed;\n  top: 0;\n  left: 0;\n  overflow: none;\n  height: 100%;\n  width: 200px;\n  display: flex;\n  flex-direction: column; }\n  .search-form input {\n    min-height: 12px;\n    height: 12px;\n    padding: 10px; }\n  .search-form .search-results {\n    flex-grow: 1;\n    overflow-y: scroll; }\n  .search-form .search-results .search-result {\n    display: flex;\n    height: 32px; }\n    .search-form .search-results .search-result .nickname {\n      flex-grow: 1;\n      vertical-align: middle;\n      line-height: 32px; }\n  .search-form .search-results .search-result {\n    border-bottom: 1px dashed #ddd;\n    box-sizing: border-box; }\n    .search-form .search-results .search-result .avatar {\n      width: 32px;\n      height: 32px;\n      margin-right: 10px; }\n  .search-form ul {\n    margin: 0;\n    padding: 0; }\n  .search-form li {\n    list-style-type: none; }\n    .search-form li.selected {\n      background-color: #eee; }\n\n.match-history .match {\n  border: 1px solid #eee;\n  background: white;\n  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);\n  margin: 10px;\n  padding: 10px; }\n  .match-history .match .home-team {\n    font-weight: bold;\n    font-style: italic; }\n\n.match-history .win {\n  color: green; }\n\n.match-history .loss {\n  color: red; }\n\n.main-content {\n  margin-left: 200px; }\n\n.player-details .player-avatar {\n  width: 170px;\n  height: 170px; }\n",""])},,,,function(e,n,t){function r(){return(r=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}function a(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}function o(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=[],r=!0,a=!1,o=void 0;try{for(var l,i=e[Symbol.iterator]();!(r=(l=i.next()).done)&&(t.push(l.value),!n||t.length!==n);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw o}}return t}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var l=t(5),i=t(4).Atom,c=t(6),u=t(24),s=l.createContext(),m=function(){return window.location.hash},f=new i(m());f.onValue(function(e){console.log("Sync Atom -> window.location"),window.location.hash=e}),window.onhashchange=function(){console.log("Sync window.location -> Atom"),f.set(m())};var p=function(e,n){return function(){return n.view("pathname").set(e)}};e.exports={BrowserRouter:function(e){var n=e.children;return l.createElement(s.Provider,{value:f},n)},Route:function(e){var n=e.hash,t=e.Component,r=o(function(e){var n=[];return[u(e,n),n.map(c.prop("name"))]}(n),2),a=r[0],i=r[1];return l.createElement(s.Consumer,null,function(e){return l.createElement(l.Fragment,null,e.map(function(n){var r=a.exec(n);if(r){var o=c.tail(r),u=c.zipObj(i,o);return l.createElement(t,{key:"1",params:u,location:e})}}))})},Link:function(e){var n=e.href,t=a(e,["href"]);return l.createElement(s.Consumer,null,function(e){return l.createElement("a",r({href:n,onClick:p(n,e)},t))})},navigate:function(e){return f.set(e)}}},,function(e,n,t){var r=t(5),a=t(6),o=t(9),l=t(7),i=t(27),c=t(8).Spinner;e.exports=function(e){var n=e.params.playerId,t=l.getPlayer(n).toProperty();return r.createElement("div",{className:"player-details"},o.ifElse(t.map(a.isNil),r.createElement(c,null),r.createElement("div",null,r.createElement("h2",null,o.view("nickname",t)," (",o.view("country",t),")"),r.createElement("img",{className:"player-avatar",src:o.view("avatar",t)}),r.createElement("table",null,r.createElement("tbody",null,r.createElement("tr",null,r.createElement("td",null,"Player ID"),r.createElement("td",null,o.view("player_id",t))),r.createElement("tr",null,r.createElement("td",null,"Country"),r.createElement("td",null,o.view("country",t))),o.when(t.map(a.path(["platforms","steam"])),r.createElement("tr",null,r.createElement("td",null,"Steam ID"),r.createElement("td",null,o.view(["platforms","steam"],t)))),o.when(t.map(a.path(["games","csgo","faceit_elo"])),r.createElement("tr",null,r.createElement("td",null,"CSGO elo"),r.createElement("td",null,o.view(["games","csgo","faceit_elo"],t)))))),r.createElement(i,{playerId:o.view("player_id",t)}))))}},,function(e,n,t){var r=t(5),a=t(2),o=t(9),l=t(6),i=t(7),c=t(8).Spinner,u=function(e){var n=e.playerId,t=e.matchId.flatMapLatest(function(e){return i.getMatch(e)}).toProperty(),u=o.view(["teams","faction1"],t),h=o.view(["teams","faction2"],t),d=o.when(t,a.combine([t],[n],function(e,n){return m(n,s(e))?r.createElement("span",{className:"win"},"WIN"):r.createElement("span",{className:"loss"},"LOSS")})),y=p(n);return r.createElement("div",{className:"match"},o.ifElse(l.isNil(t),r.createElement(c,null),r.createElement("div",null,r.createElement("p",null,r.createElement(y,{team:u})," vs ",r.createElement(y,{team:h})," (",o.view("competition_name",t),")"),r.createElement("p",null,d),r.createElement("p",null,o.view(["started_at",f],t)))))},s=function(e){return e.teams[e.results.winner]},m=function(e,n){return n.roster.map(l.prop("player_id")).includes(e)},f=function(e){return e.toRelative()},p=function(e){return function(n){var t=n.team,i=n.className;return r.createElement("span",{className:o.cns(i,o.ifElse(function(n){return a.combine([n],[e],function(e,n){return e.roster.map(l.prop("player_id")).includes(n)})}(t),"home-team","enemy-team"))},o.view("name",t))}};e.exports=function(e){var n=e.playerId,t=n.flatMapLatest(function(e){return i.getHistory(e,"csgo")}).toProperty(function(){return[]});return r.createElement("div",{className:"match-history"},r.createElement("h2",null,"Match history"),o.mapElemsWithIds("match_id",function(e,t){return r.createElement(u,{key:t,playerId:n,matchId:o.view("match_id",e)})},t))}},function(e,n,t){function r(){return(r=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}function a(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}function o(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=[],r=!0,a=!1,o=void 0;try{for(var l,i=e[Symbol.iterator]();!(r=(l=i.next()).done)&&(t.push(l.value),!n||t.length!==n);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw o}}return t}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var l=t(5),i=t(4).Atom,c=t(6),u=t(9),s=t(2),m=t(7),f=t(8).Spinner,p=t(29).isAwaiting,h=l.forwardRef(function(e,n){var t=e.result,o=e.className,i=a(e,["result","className"]);return l.createElement("li",r({},i,{ref:n,className:u.cns("search-result",o)}),l.createElement("img",{className:"avatar",src:u.view("avatar",t)}),l.createElement("span",{className:"nickname"},u.view("nickname",t)))}),d=function(e){return e&&e.scrollIntoView({block:"nearest"})},y=function(e){return c.compose(c.lte(e),c.length)},v=function(e,n){return c.pipe(c.min(n),c.max(e))},g=function(e){return void 0!==e};e.exports={Search:function(e){var n=e.onSelect,t=new i(""),r=new i(void 0),a=t.filter(y(3)).debounce(250).skipDuplicates(),w=a.flatMapLatest(function(e){return m.searchPlayer(e)}).toProperty(function(){return[]}),E=p(a,w);w.onValue(function(){return r.set(void 0)}),s.combine([r],[w]).onValue(function(e){var t=o(e,2),r=t[0],a=t[1];return g(r)&&n(a[r])});var b=u.bus();s.combine([b],[r,w]).onValue(function(e){var n=o(e,3),t=n[0],a=n[1],l=n[2];if(0===l.length)return r.set(void 0);if(!g(a))return r.set(0);var i="ArrowUp"===t.key?c.dec:c.inc,u=v(0,l.length)(i(a));r.set(u)});var x=new i;return x.onValue(function(e){return e.focus()}),l.createElement("div",{className:"search-form"},l.createElement("input",{ref:u.set(x),type:"text",value:t,onKeyDown:function(e){["ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),e.persist(),b.push(e))},onChange:u.getProps({value:t})}),u.when(E,l.createElement(f,null)),l.createElement("ul",{className:"search-results",onMouseDown:function(e){e.preventDefault(),x.get().focus()}},u.mapElems(function(e,n){var t=r.map(c.equals(n)),a=new i;return t.filter(c.identity).onValue(function(){return d(a.get())}),l.createElement(h,{result:e,ref:u.set(a),key:n,onClick:function(){return r.set(n)},className:u.cns(u.when(t,"selected"))})},w)))}}},function(e,n,t){var r=t(2);e.exports={isAwaiting:function(e,n){return r.merge([e.map(function(){return!0}),n.map(function(){return!1})])}}}],[[12,1,2]]]);
//# sourceMappingURL=0.bundle.e200699c9be9cd9ce4a2.js.map