window.addEventListener("load",(()=>{const e=document.getElementById("search-mask"),t=document.querySelector("#algolia-search .search-dialog");window.openSearch=()=>{utils.animateIn(e,"to_show 0.5s"),t.style.display="block",setTimeout((()=>{document.querySelector("#algolia-search .ais-SearchBox-input").focus()}),100),document.addEventListener("keydown",(function e(t){"Escape"===t.code&&(i(),document.removeEventListener("keydown",e))})),s(),window.addEventListener("resize",s)};const i=()=>{utils.animateOut(t,"search_close .5s"),utils.animateOut(e,"to_hide 0.5s"),window.removeEventListener("resize",s)},s=()=>{window.innerWidth<768&&t.style.setProperty("--search-height",window.innerHeight+"px")},a=()=>{utils.addEventListenerPjax(document.querySelector("#search-button > .search"),"click",openSearch),GLOBAL_CONFIG.rightside.enable&&document.getElementById("menu-search").addEventListener("click",(function(){rm.hideRightMenu(),openSearch();let e=document.getElementsByClassName("ais-SearchBox-input")[0],t=document.createEvent("HTMLEvents");t.initEvent("input",!0,!0),e.value=selectTextNow,e.dispatchEvent(t)}))},n=GLOBAL_CONFIG.algolia;if(!(n.appId&&n.apiKey&&n.indexName))return console.error("Algolia setting is invalid!");const o=instantsearch({indexName:n.indexName,searchClient:algoliasearch(n.appId,n.apiKey),searchFunction(e){if(e.state.query){let t='<i class="scoicon sco-loading-line sco-spin"></i>';document.getElementById("algolia-hits").innerHTML=t,e.search()}}}),c=instantsearch.widgets.configure({hitsPerPage:n.hits.per_page||5}),l=instantsearch.widgets.searchBox({container:"#algolia-search-input",showReset:!1,showSubmit:!1,placeholder:GLOBAL_CONFIG.lang.search.placeholder,showLoadingIndicator:!0,searchOnEnterKeyPressOnly:!0,searchAsYouType:!1}),r=instantsearch.widgets.hits({container:"#algolia-hits",templates:{item(e){const t=e.permalink?e.permalink:GLOBAL_CONFIG.root+e.path,i=e._highlightResult,s=document.querySelector("#algolia-hits .sco-spin");return s&&(s.style.display="none"),setTimeout((()=>{document.querySelector("#algolia-search .ais-SearchBox-input").focus()}),200),`\n          <a href="${t}" class="algolia-hit-item-link">\n          <span class="algolia-hits-item-title">${i.title.value||"no-title"}</span>\n          </a>`},empty:function(e){const t=document.querySelector("#algolia-hits .sco-spin");return t&&(t.style.display="none"),setTimeout((()=>{document.querySelector("#algolia-search .ais-SearchBox-input").focus()}),200),'<div id="algolia-hits-empty">'+GLOBAL_CONFIG.lang.search.empty.replace(/\$\{query}/,e.query)+"</div>"}},cssClasses:{item:"algolia-hit-item"}}),d=instantsearch.widgets.pagination({container:"#algolia-pagination",totalPages:n.hits.per_page??5,scrollTo:!1,showFirstLast:!1,templates:{first:'<i class="scoicon sco-show-left-line"></i>',last:'<i class="scoicon sco-show-right-line"></i>',previous:'<i class="scoicon sco-arrow-left-bold"></i>',next:'<i class="scoicon sco-arrow-right-bold"></i>'},cssClasses:{root:"pagination",item:"pagination-item",link:"page-number",active:"current",disabled:"disabled-item"}}),h=instantsearch.widgets.stats({container:"#algolia-tips > #algolia-stats",templates:{text:function(e){return`<hr>${GLOBAL_CONFIG.lang.search.hit.replace(/\$\{hits}/,e.nbHits).replace(/\$\{time}/,e.processingTimeMS)}`}}});o.addWidgets([c,l,h,r,d]),o.start(),a(),e.addEventListener("click",i),document.querySelector("#algolia-search .search-close-button").addEventListener("click",i),window.addEventListener("pjax:complete",(()=>{!utils.isHidden(e)&&i(),a()})),window.pjax&&o.on("render",(()=>{window.pjax.refresh(document.getElementById("algolia-hits"))}))}));