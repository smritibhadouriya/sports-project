import{Q as $,P as H,M as x,J as e,j as W,i as P,h as U,e as z,f as G,b,o as C,V as m,g as M}from"./index-CWTHNZ0q.js";function S(t,n){n===void 0&&(n={});var s=n.insertAt;if(!(!t||typeof document>"u")){var a=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css",s==="top"&&a.firstChild?a.insertBefore(o,a.firstChild):a.appendChild(o),o.styleSheet?o.styleSheet.cssText=t:o.appendChild(document.createTextNode(t))}}var V=`:root {
  --toast-default: #8b1dd0;
  --toast-success: #27d0b2;
  --toast-error: #c52965;
  --toast-info: #004eff;
  --toast-warning: #d0761d;
  --toast-black: #221d26;
  --toast-white: #ffffff;
}

.toast {
  padding: 15px;
  min-width: 300px;
  max-width: 400px;
  color: var(--toast-white);
  display: flex;
  align-items: flex-start;
  line-height: 1.6;
  font-size: 14px;
  border-radius: 15px;
}

.toast.default {
  background-color: var(--toast-default);
}

.toast.success {
  background-color: var(--toast-success);
}

.toast.error {
  background-color: var(--toast-error);
}

.toast.info {
  background-color: var(--toast-info);
}

.toast.warning {
  background-color: var(--toast-warning);
}

.toast .content {
  flex: 1;
}

.toast .content p {
  padding: 0;
  margin: 0;
}

.toast .close {
  margin-left: 10px;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0);
  transition: all 100ms ease-in-out;
  border-radius: 8px;
  cursor: pointer;
}

.toast .close:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.toast .icon {
  margin-right: 10px;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
}
`;S(V);function f(){return f=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var s=arguments[n];for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&(t[a]=s[a])}return t},f.apply(this,arguments)}var L=function(){var t=new Map;return{on:function(s,a){t.has(s)||t.set(s,[]),t.get(s).push(a)},emit:function(s,a){t.has(s)&&t.get(s).forEach(function(o){return o(a)})},off:function(){t.clear()}}}(),J=function(n){var s=n.content,a=n.type,o=n.config;return{id:Math.random().toString(36).substr(2,10),content:s,type:a,config:o}},h;(function(t){t.SHOW="show",t.HIDE="hide",t.HIDE_ALL="hideAll"})(h||(h={}));var K=`.toastContainer {
  overflow: hidden;
  overflow-x: auto;
  display: grid;
  grid-gap: 20px;
  position: fixed;
  user-select: none;
}

.top-left {
  top: 20px;
  left: 20px;
}

.top-center {
  top: 20px;
  left: 50%;
  transform: translate(-50%, 0);
}

.top-right {
  top: 20px;
  right: 20px;
}

.bottom-left {
  bottom: 20px;
  left: 20px;
}

.bottom-center {
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 0);
}

.bottom-right {
  bottom: 20px;
  right: 20px;
}
`;S(K);var u=function(n){var s=f({},n);return L.emit(h.SHOW,J(f({},s)))},d=function(n,s){return u({content:n,type:"default",config:s})};d.success=function(t,n){return u({content:t,type:"success",config:n})};d.error=function(t,n){return u({content:t,type:"error",config:n})};d.info=function(t,n){return u({content:t,type:"info",config:n})};d.warn=function(t,n){return u({content:t,type:"warning",config:n})};d.hideAll=function(){return L.emit(h.HIDE_ALL)};const Q=({author:t,navigate:n})=>e.jsx("nav",{className:"mb-8","aria-label":"Breadcrumb",children:e.jsxs("ol",{className:"flex flex-wrap items-center gap-1.5 text-md",children:[e.jsx("li",{className:"flex items-center",children:e.jsx("button",{onClick:()=>n("/"),className:"text-gray-500 hover:text-[#292B97] transition-colors flex items-center gap-1.5",children:e.jsx(M,{className:"text-md"})})}),e.jsxs("li",{className:"flex items-center",children:[e.jsx(b,{className:"text-gray-400 text-[10px] mx-1"}),e.jsx("button",{onClick:()=>n("/blogs"),className:"text-gray-500 hover:text-[#292B97] transition-colors",children:"Blog"})]}),e.jsxs("li",{className:"flex items-center",children:[e.jsx(b,{className:"text-gray-400 text-[10px] mx-1"}),e.jsx("span",{className:"text-gray-900 font-medium truncate max-w-[200px] sm:max-w-md",children:(t==null?void 0:t.name)||"Author"})]})]})}),y=t=>{if(!t)return null;if(typeof t=="string")return t.trim()?t.startsWith("http")?t:`${m}/${t.replace(/^\//,"")}`:null;if(t!=null&&t.src){const n=t.src.trim();return n?t.mode==="url"||n.startsWith("http")?n:`${m}${n.startsWith("/")?n:"/"+n}`:null}return null},Y=t=>y(t==null?void 0:t.bannerImage)||y(t==null?void 0:t.image)||null,q=(t="")=>t.toLowerCase().trim().replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-"),X=(t="")=>t.toLowerCase().trim().replace(/\s+/g,"-"),Z={cricket:{bg:"#10b98115",text:"#10b981"},football:{bg:"#3b82f615",text:"#3b82f6"},badminton:{bg:"#8b5cf615",text:"#8b5cf6"},tennis:{bg:"#ec489915",text:"#ec4899"},formula1:{bg:"#f59e0b15",text:"#f59e0b"}},O=t=>Z[t==null?void 0:t.toLowerCase()]||{bg:"#6b728015",text:"#6b7280"},tt=[{key:"twitter",icon:W,color:"#1DA1F2",label:"Twitter"},{key:"linkedin",icon:P,color:"#0A66C2",label:"LinkedIn"},{key:"instagram",icon:U,color:"#E1306C",label:"Instagram"},{key:"facebook",icon:z,color:"#1877F2",label:"Facebook"},{key:"website",icon:G,color:"#374151",label:"Website"}];function st(){var k;const{authorName:t}=$(),n=H(),[s,a]=x.useState(null),[o,F]=x.useState([]),[B,v]=x.useState(!0),[I,w]=x.useState(!1);if(x.useEffect(()=>{t&&(async()=>{var i,l;try{v(!0),w(!1);const[g,_]=await Promise.all([C.get(`${m}/authors`),C.get(`${m}/blogs`)]),D=((i=g.data)==null?void 0:i.authors)||[],T=((l=_.data)==null?void 0:l.blogs)||[],p=D.find(c=>X(c.name)===t);if(!p){w(!0);return}a(p);const R=T.filter(c=>{var A;return(typeof c.author=="object"?(A=c.author)==null?void 0:A._id:c.author)===p._id&&c.status==="published"});F(R)}catch(g){console.error(g),d.error("Failed to load author")}finally{v(!1)}})()},[t]),B)return e.jsx("div",{className:"min-h-screen bg-white dark:bg-[#0a0f1e] flex items-center justify-center transition-colors",children:e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"animate-spin h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto"}),e.jsx("p",{className:"mt-4 text-gray-500 dark:text-gray-400 text-sm",children:"Loading author..."})]})});if(I||!s)return e.jsx("div",{className:"min-h-screen bg-white dark:bg-[#0a0f1e] flex items-center justify-center px-4 transition-colors",children:e.jsxs("div",{className:"text-center",children:[e.jsx("h1",{className:"text-3xl font-bold text-gray-900 dark:text-white mb-4",children:"Author Not Found"}),e.jsx("button",{onClick:()=>n("/blogs"),className:"px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition",children:"Back to Blog"})]})});const j=y(s.image),E=((k=s.name)==null?void 0:k.split(" ").map(r=>r[0]).join("").substring(0,2).toUpperCase())||"A",N=tt.filter(r=>{var i;return(i=s.socialLinks)==null?void 0:i[r.key]});return e.jsxs("div",{className:"min-h-screen bg-gray-100 dark:bg-[#0a0f1e] transition-colors",children:[e.jsxs("div",{className:"relative overflow-hidden",children:[e.jsxs("div",{className:"absolute inset-0 pointer-events-none",children:[e.jsx("div",{className:"absolute top-10 left-1/4 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"}),e.jsx("div",{className:"absolute bottom-0 right-1/4 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"})]}),e.jsxs("div",{className:"relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-14",children:[e.jsx(Q,{author:s,navigate:n}),e.jsxs("div",{className:"flex flex-col md:flex-row items-center md:items-start gap-8 bg-white p-4",children:[e.jsx("div",{className:"shrink-0",children:j?e.jsx("img",{src:j,alt:s.name,className:"w-20 h-20 md:w-20 md:h-20 rounded-full object-cover border-2 border-indigo-500/30 shadow-xl"}):e.jsx("div",{className:"w-20 h-20 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white text-3xl font-semibold shadow-xl select-none",children:E})}),e.jsxs("div",{className:"flex-1 text-center md:text-left",children:[e.jsx("h1",{className:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-1",children:s.name}),s.designation&&e.jsx("p",{className:"text-indigo-500 dark:text-indigo-400 font-semibold text-sm mb-2",children:s.designation}),s.bio&&e.jsx("p",{className:"text-gray-600 dark:text-gray-300 text-sm max-w-5xl mb-5",children:s.bio}),N.length>0&&e.jsx("div",{className:"flex gap-2 justify-center md:justify-start",children:N.map(({key:r,icon:i,color:l})=>e.jsx("a",{href:s.socialLinks[r],target:"_blank",rel:"noopener noreferrer",className:"w-9 h-9 rounded-xl flex items-center justify-center text-white hover:scale-110 transition",style:{backgroundColor:l},children:e.jsx(i,{className:"text-sm"})},r))})]})]})]})]}),e.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20",children:[e.jsx("div",{className:"flex items-center justify-between mb-8",children:e.jsxs("h2",{className:"text-xl font-bold text-gray-900 dark:text-white",children:["Latest Articles",e.jsxs("span",{className:"ml-2 text-sm font-normal text-gray-500 dark:text-gray-400",children:["(",o.length,")"]})]})}),o.length===0?e.jsx("div",{className:"text-center py-20 bg-gray-100 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10",children:e.jsx("p",{className:"text-gray-500 dark:text-gray-400 text-sm",children:"No published articles yet."})}):e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",children:o.map(r=>{const i=Y(r),l=O(r.category);return e.jsxs("div",{onClick:()=>n(`/blogs/${r.slug||q(r.title)}`),className:"bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group",children:[e.jsxs("div",{className:"relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-white/5",children:[i?e.jsx("img",{src:i,alt:r.title,className:"w-full h-full object-cover group-hover:scale-105 transition duration-500"}):e.jsx("div",{className:"w-full h-full flex items-center justify-center text-gray-400 dark:text-white/20 text-4xl font-bold",children:(r.title||"?").charAt(0).toUpperCase()}),r.category&&e.jsx("span",{className:"absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",style:{background:l.bg,color:l.text},children:r.category})]}),e.jsxs("div",{className:"p-5 flex flex-col h-[160px]",children:[e.jsx("div",{className:"text-xs text-gray-500 dark:text-gray-400 mb-2",children:new Date(r.publishedDate||r.updatedAt||r.createdAt).toLocaleDateString()}),e.jsx("h3",{className:"text-sm font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-indigo-500 transition mb-2",children:r.title}),r.description&&e.jsx("p",{className:"text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-4",children:r.description}),e.jsx("div",{className:"mt-auto flex items-center justify-between",children:e.jsxs("span",{className:"text-indigo-500 text-xs font-semibold flex items-center gap-1",children:["Read ",e.jsx(b,{className:"text-[10px]"})]})})]})]},r._id)})})]})]})}export{st as default};
