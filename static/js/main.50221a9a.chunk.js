(this["webpackJsonphooter-web"]=this["webpackJsonphooter-web"]||[]).push([[0],{12:function(e,t,c){},13:function(e,t,c){},15:function(e,t,c){"use strict";c.r(t);var n=c(1),s=c.n(n),a=c(6),o=c.n(a),r=(c(12),c.p+"static/media/logo.6ce24c58.svg"),i=(c(13),c(7)),l=c(2);var j=c(0);function b(e){var t=s.a.createRef(),c=Object(n.useState)([]),a=Object(l.a)(c,2),o=a[0],r=a[1];return Object(j.jsxs)("div",{className:e.className,children:[Object(j.jsx)("div",{className:"col-12 mb-3",children:Object(j.jsxs)("form",{onSubmit:function(e){e.preventDefault();var c=t.current.value,n=Object(i.a)(o);n.unshift({content:c,likes:0,id:12313}),r(n),t.current.value=""},children:[Object(j.jsx)("textarea",{ref:t,required:!0,className:"form-control",name:"hoot"}),Object(j.jsx)("button",{type:"submit",className:"btn btn-primary my-3",children:"Hoot"})]})}),Object(j.jsx)(u,{newHoots:o})]})}function u(e){var t=Object(n.useState)([]),c=Object(l.a)(t,2),s=c[0],a=c[1],o=Object(n.useState)([]),r=Object(l.a)(o,2),b=r[0],u=r[1];return Object(n.useEffect)((function(){var t=Object(i.a)(e.newHoots).concat(s);t.length!==b.length&&u(t)}),[e.newHoots,b,s]),Object(n.useEffect)((function(){!function(e){var t=new XMLHttpRequest;t.responseType="json",t.open("GET","http://localhost:8000/api/hoots/"),t.onload=function(){e(t.response,t.status)},t.onerror=function(t){e({message:"The request was an error"},400)},t.send()}((function(e,t){200===t&&a(e)}))}),[]),b.map((function(e,t){return Object(j.jsx)(p,{hoot:e,className:"my-5 py-5 border bg-white text-dark"},"".concat(t,"-item.id"))}))}function d(e){var t=e.hoot,c=e.action,s=Object(n.useState)(t.likes?t.likes:0),a=Object(l.a)(s,2),o=a[0],r=a[1],i=Object(n.useState)(!0===t.useLike),b=Object(l.a)(i,2),u=b[0],d=b[1],p=e.className?e.className:"btn btn-primary btn-small",h=c.display?c.display:"Action",O="like"===c.type?"".concat(o," ").concat(h):h;return Object(j.jsx)("button",{className:p,onClick:function(e){e.preventDefault(),"like"===c.type&&(!0===u?(d(!1),r(o-1)):(d(!0),r(o+1)))},children:O})}function p(e){var t=e.hoot,c=(e.action,e.className?e.className:"col-10 mx-auto col-md-6");return Object(j.jsxs)("div",{className:c,children:[Object(j.jsxs)("p",{children:[t.id," - ",t.content]}),Object(j.jsxs)("div",{className:"btn btn-group",children:[Object(j.jsx)(d,{hoot:t,action:{type:"like",display:"Likes"}}),Object(j.jsx)(d,{hoot:t,action:{type:"unlike",display:"Unlike"}}),Object(j.jsx)(d,{hoot:t,action:{type:"rehoot",display:"ReHoot"}})]})]})}var h=function(){return Object(j.jsx)("div",{className:"App",children:Object(j.jsxs)("header",{className:"App-header",children:[Object(j.jsx)("img",{src:r,className:"App-logo",alt:"logo"}),Object(j.jsxs)("p",{children:["Edit ",Object(j.jsx)("code",{children:"src/App.js"})," and save to reload."]}),Object(j.jsx)("div",{children:Object(j.jsx)(b,{})}),Object(j.jsx)("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"})]})})},O=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,16)).then((function(t){var c=t.getCLS,n=t.getFID,s=t.getFCP,a=t.getLCP,o=t.getTTFB;c(e),n(e),s(e),a(e),o(e)}))},m=document.getElementById("root");m&&o.a.render(Object(j.jsx)(s.a.StrictMode,{children:Object(j.jsx)(h,{})}),m);var f=document.getElementById("hooter");f&&o.a.render(Object(j.jsx)(s.a.StrictMode,{children:Object(j.jsx)(b,{})}),f),O()}},[[15,1,2]]]);
//# sourceMappingURL=main.50221a9a.chunk.js.map