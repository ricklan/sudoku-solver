(this["webpackJsonpsudoku-solver"]=this["webpackJsonpsudoku-solver"]||[]).push([[0],{23:function(e,t,r){},24:function(e,t,r){},25:function(e,t,r){},49:function(e,t,r){},50:function(e,t,r){},51:function(e,t,r){"use strict";r.r(t);var n=r(4),o=r.n(n),c=r(16),s=r.n(c),u=(r(23),r(24),r(7)),i=(r(25),r(17)),a=r(18),l=function(){function e(t,r){Object(i.a)(this,e),this.value="",this.selected=!1,this.hasDupRow=!1,this.hasDupCol=!1,this.hasDupSquare=!1,this.row=t,this.col=r,this.userEntered=!1}return Object(a.a)(e,[{key:"toggleSelected",value:function(){this.selected=!this.selected}},{key:"getSelected",value:function(){return this.selected}},{key:"getTag",value:function(){return document.querySelector("#c".concat(this.row,"-").concat(this.col))}},{key:"getValue",value:function(){return this.value}},{key:"setValue",value:function(e){this.value=e}},{key:"setDupRow",value:function(e){this.hasDupRow=e}},{key:"getDupRow",value:function(){return this.hasDupRow}},{key:"setDupCol",value:function(e){this.hasDupCol=e}},{key:"getDupCol",value:function(){return this.hasDupCol}},{key:"setDupSquare",value:function(e){this.hasDupSquare=e}},{key:"getDupSquare",value:function(){return this.hasDupSquare}},{key:"getRow",value:function(){return this.row}},{key:"getCol",value:function(){return this.col}},{key:"setUserEntered",value:function(e){this.userEntered=e}}]),e}(),h=r(0);function d(){var e=Object(u.a)(Array(9)).map((function(e,t){return Object(u.a)(Array(9)).map((function(e,r){return new l(t,r)}))}));console.log(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_URL);var t=function(){var t=[];return e.forEach((function(e){var r=[];e.forEach((function(e){""===e.getValue()?r.push(0):r.push(parseInt(e.getValue()))})),t.push(r)})),t},n=function(t){e.forEach((function(e,r){e.forEach((function(e,n){e.getTag().innerHTML=""+t[r][n],e.setValue(""+t[r][n])}))}))},o=function(t){var r=t.target,n=parseInt(r.id.substring(1,2)),o=parseInt(r.id.substring(3,4)),u=function(){for(var t=0;t<9;t++)for(var r=0;r<9;r++)if(e[t][r].getSelected())return e[t][r];return null}();if(t.key>="1"&&t.key<="9"||"Delete"===t.key){var a=e[n][o];"Delete"===t.key?(a.setValue(""),a.setUserEntered(!1),r.classList.remove("cell-user-entered"),r.innerHTML=""):(a.setValue(t.key),a.setUserEntered(!0),r.classList.add("cell-user-entered"),r.innerHTML=t.key),c(n),s(o),i(n,o)}else"ArrowUp"!==t.key&&"ArrowDown"!==t.key&&"ArrowLeft"!==t.key&&"ArrowRight"!==t.key||(t.preventDefault(),p(t,u))},c=function(t){var r=!0;e[t].forEach((function(n){r=d("row",n,e[t]);var o=n.getTag();r?(n.setDupRow(!1),n.getDupCol()||n.getDupSquare()||o.classList.remove("cell-highlight-error")):(n.setDupRow(!0),o.classList.add("cell-highlight-error"))}))},s=function(t){for(var r=!0,n=[],o=0;o<=8;o++)n.push(e[o][t]);n.forEach((function(e){r=d("col",e,n);var t=e.getTag();r?(e.setDupCol(!1),e.getDupRow()||e.getDupSquare()||t.classList.remove("cell-highlight-error")):(e.setDupCol(!0),t.classList.add("cell-highlight-error"))}))},i=function(t,r){for(var n=a(t),o=a(r),c=[],s=0;s<3;s++)c.push(e[n[0]][o[0]+s]),c.push(e[n[0]+1][o[0]+s]),c.push(e[n[0]+2][o[0]+s]);c.forEach((function(e){for(var t=!0,r=0;r<3;r++)d("square",e,c)||(t=!1);var n=e.getTag();t?(e.setDupSquare(!1),e.getDupRow()||e.getDupCol()||n.classList.remove("cell-highlight-error")):(e.setDupSquare(!0),n.classList.add("cell-highlight-error"))}))},a=function(e){return e<=2?[0,2]:e>=6?[6,8]:[3,5]},d=function(e,t,r){var n=!0;return r.forEach((function(r){t.getRow()===r.getRow()&&t.getCol()===r.getCol()||g(t,r,e)||(n=!1)})),n},g=function(e,t,r){var n=!0;return""!==e.getValue()&&t.getValue()===e.getValue()&&(n=!1,"square"===r?t.setDupSquare(!0):"row"===r?t.setDupRow(!0):t.setDupCol(!0),t.getTag().classList.add("cell-highlight-error")),n},f=function(e,t){return 0!==t||"ArrowUp"!==e&&"ArrowLeft"!==e?8!==t||"ArrowDown"!==e&&"ArrowRight"!==e?"ArrowUp"===e||"ArrowLeft"===e?t-1:t+1:0:8},p=function(t,r){var n,o;"ArrowUp"===t.key||"ArrowDown"===t.key?(n=f(t.key,r.getRow()),o=r.getCol()):(n=r.getRow(),o=f(t.key,r.getCol())),e[n][o].getTag().focus()};return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("h2",{id:"prompt",children:"Enter values into the board and hit submit to solve!"}),Object(h.jsx)("ul",{id:"sudoku-board",children:e.map((function(t,r){return t.map((function(t,n){return Object(h.jsx)("li",{className:"cell row".concat(r," col").concat(n),id:"c".concat(r,"-").concat(n),onKeyDown:function(e){return o(e)},onFocus:function(t){return function(t){var r=t.id.substring(1,2),n=t.id.substring(3,4);e[r][n].toggleSelected(),t.focus()}(t.target)},onBlur:function(t){return function(t){var r=parseInt(t.id.substring(1,2)),n=parseInt(t.id.substring(3,4));e[r][n].toggleSelected()}(t.target)},tabIndex:"0"},"".concat(r,"-").concat(n))}))}))}),Object(h.jsxs)("div",{id:"board-menu",children:[Object(h.jsxs)("div",{id:"menu-buttons",children:[Object(h.jsx)("button",{onClick:function(e){return function(e){e.preventDefault();var o=t();r(31).post("".concat(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).URL,"/api/solvePuzzle"),{puzzle:o}).then((function(e){n(e.data),document.querySelector("#error-message").innerHTML=""})).catch((function(e){console.log(e),document.querySelector("#error-message").innerHTML=e.response.data}))}(e)},children:"Submit"}),Object(h.jsx)("button",{onClick:function(){return e.forEach((function(e){e.forEach((function(e){e.setValue(""),e.getTag().innerHTML="",e.setDupCol(!1),e.setDupRow(!1),e.setDupSquare(!1),e.getTag().classList.remove("cell-highlight-error"),e.getTag().classList.remove("cell-user-entered")}))})),void(document.querySelector("#error-message").innerHTML="")},children:"Clear"})]}),Object(h.jsx)("p",{id:"error-message"})]})]})}r(27).config();var g=r.p+"static/media/key-tab.b5325a8c.svg",f=r.p+"static/media/key-arrow.1d262c56.svg",p=r.p+"static/media/key-one-to-nine.5c763635.svg",v=r.p+"static/media/key-del.f745cffe.svg",j=r.p+"static/media/key-mouse.bcaac00b.svg";r(49);function b(){return Object(h.jsxs)("div",{id:"board-use",children:[Object(h.jsx)("h2",{children:"Board use:"}),Object(h.jsxs)("div",{className:"key-group",children:[Object(h.jsx)("p",{children:"Navigation:"}),Object(h.jsx)("img",{className:"key-long key",src:g,alt:"Tab key"}),Object(h.jsx)("img",{className:"key-arrow key",src:f,alt:"Arrow Keys"}),Object(h.jsx)("img",{className:"key-mouse key",src:j,alt:"Mouse"})]}),Object(h.jsxs)("div",{className:"key-group",children:[Object(h.jsx)("p",{id:"input",children:"Input:"}),Object(h.jsx)("img",{className:"key-nums key",src:p,alt:"One to nine"}),Object(h.jsx)("img",{className:"key-long key",src:v,alt:"Delete key"})]}),Object(h.jsxs)("ol",{children:[Object(h.jsx)("li",{children:"Each cell must be a number between 1-9 or blank"}),Object(h.jsx)("li",{children:"Each row, column, and 3x3 box may only contain each number between 1-9 once"})]})]})}r(50);function y(){return Object(h.jsx)(h.Fragment,{children:Object(h.jsx)("header",{children:Object(h.jsx)("h1",{children:"Sudoku Puzzle Solver"})})})}var k=function(){return Object(h.jsxs)("div",{className:"App",children:[Object(h.jsx)(y,{}),Object(h.jsxs)("div",{id:"board-and-rules",children:[Object(h.jsx)(d,{}),Object(h.jsx)(b,{})]})]})},m=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,52)).then((function(t){var r=t.getCLS,n=t.getFID,o=t.getFCP,c=t.getLCP,s=t.getTTFB;r(e),n(e),o(e),c(e),s(e)}))};s.a.render(Object(h.jsx)(o.a.StrictMode,{children:Object(h.jsx)(k,{})}),document.getElementById("root")),m()}},[[51,1,2]]]);
//# sourceMappingURL=main.72020d2e.chunk.js.map