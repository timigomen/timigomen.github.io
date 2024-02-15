(()=>{const t="SolitudeCache",e="https://id.v3/",n=()=>caches.match(e).then((t=>t?.json())),s=n=>caches.open(t).then((t=>t.put(e,new Response(JSON.stringify(n)))));self.addEventListener("install",(()=>{self.skipWaiting()})),self.addEventListener("activate",(t=>t.waitUntil(clients.claim())));let r={simple:{clean:!0,search:!1,match:t=>"blog.fanwu.link"===t.host&&["/404.html"].includes(t.pathname)},cdn:{clean:!0,match:t=>["cdn.cbd.int","lf26-cdn-tos.bytecdntp.com","lf6-cdn-tos.bytecdntp.com","lf3-cdn-tos.bytecdntp.com","lf9-cdn-tos.bytecdntp.com","cdn.staticfile.org","npm.elemecdn.com"].includes(t.host)&&t.pathname.match(/\.(js|css|woff2|woff|ttf|cur)$/)}},a=t=>{if(t.startsWith("https://npm.elemecdn.com"))return{timeout:3e3,list:[t,`https://fastly.jsdelivr.net/${new URL(t).pathname}`]}};const c=(t,e,n=null)=>{if(!n&&!(n=a(t.url)))return u(t,e);const s=n.list,r=new Array(s.length),c=n=>u(new Request(s[n],t),e,{signal:(r[n]=new AbortController).signal}).then((t=>l(t)?{r:t,i:n}:Promise.reject()));return new Promise(((e,a)=>{let l=!0;const o=()=>{l=!1,Promise.any([h,...Array.from({length:s.length-1},((t,e)=>e+1)).map((t=>c(t)))]).then((t=>{for(let e=0;e!==s.length;++e)e!==t.i&&r[e].abort();e(t.r)})).catch((()=>a(`请求 ${t.url} 失败`)))},i=setTimeout(o,n.timeout),h=c(0).then((t=>{l&&(clearTimeout(i),e(t.r))})).catch((()=>(l&&(clearTimeout(i),o()),Promise.reject())))}))},l=t=>t.ok||[301,302,307,308].includes(t.status),o=new Map;self.addEventListener("fetch",(e=>{let n=e.request,s=new URL(n.url);if("GET"!==n.method||!n.url.startsWith("http"))return;if((t=>t.url.startsWith("https://i0.hdslb.com")||t.url.startsWith("https://meting.qjqq.cn")||t.url.startsWith("https://api.i-meto.com"))(n))return;let r,i=s.hostname+s.pathname+s.search;const u=t=>{e.respondWith(r?t.then((t=>{for(let e of r)e(t.clone())})).catch((t=>{for(let e of r)e(t)})).then((()=>(o.delete(i),t))):t)},m=f(s);if(m){let e=`https://${s.host}${s.pathname}`;e.endsWith("/index.html")&&(e=e.substring(0,e.length-10)),m.search&&(e+=s.search),u(caches.match(e).then((s=>s??c(n,!0).then((n=>{if(l(n)){const s=n.clone();caches.open(t).then((t=>t.put(e,s)))}return n})))))}else{const t=a(n.url);u(t?c(n,!1,t):h(n).catch((t=>new Response(t,{status:499}))))}})),self.addEventListener("message",(t=>{"update"===t.data&&m().then((e=>{e.type="update",t.source.postMessage(e)}))}));const i=(t,e,n,s)=>(s||(s={}),s.cache=e?"no-store":"default",n&&(s.mode="cors",s.credentials="same-origin"),fetch(t,s)),h=(t,e)=>i(t,!1,!1,e),u=(t,e,n)=>i(t,e,!0,n),f=t=>{if("localhost"!==t.hostname)for(let e in r){const n=r[e];if(n.match(t))return n}},m=async()=>{const r=await c(new Request("/update.json"),!1);if(!l(r))throw`加载 update.json 时遇到异常，状态码：${r.status}`;const a=await r.json(),o=await(t=>n().then((e=>{const{info:n,global:r}=t,a={global:r,local:n[0].version,escape:e?.escape??0};if(!e)return a.escape=0,s(a),{new:a,old:e};let c=new d,l=((t,e,n)=>{for(let s of e){const{version:e,change:r}=s;if(e===n)return!1;if(r)for(let e of r)t.push(new p(e))}return!0})(c,n,e.local);return s(a),l&&(r!==e.global?c.force=!0:c.refresh=!0),{list:c,new:a,old:e}})))(a);if(o.list){const n=await(n=>caches.open(t).then((t=>t.keys().then((s=>Promise.all(s.map((async s=>{const r=s.url;return r!==e&&n.match(r)?(t.delete(s),r):null}))))).then((t=>t.filter((t=>t)))))))(o.list);o.list=n?.length?n:null}return o};function d(){const t=[];this.push=e=>{t.push(e)},this.match=e=>{if(this.force)return!0;if(e=new URL(e),this.refresh)return f(e).clean;for(let n of t)if(n.match(e))return!0;return!1}}function p(t){const e=e=>{const n=t.value;if(Array.isArray(n)){for(let t of n)if(e(t))return!0;return!1}return e(n)};this.match=(()=>{switch(t.flag){case"html":return t=>t.pathname.match(/(\/|\.html)$/);case"end":return t=>e((e=>t.href.endsWith(e)));case"begin":return t=>e((e=>t.pathname.startsWith(e)));case"str":return t=>e((e=>t.href.includes(e)));case"reg":return t=>e((e=>t.href.match(new RegExp(e,"i"))));default:throw`未知表达式：${JSON.stringify(t)}`}})()}})();