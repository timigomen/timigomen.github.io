function initializeCommentBarrage(){window.commentBarrageInitialized=!0;const e={maxBarrage:1,barrageTime:8e3,twikooUrl:GLOBAL_CONFIG.comment.twikoo.url,pageUrl:window.location.pathname,accessToken:GLOBAL_CONFIG.comment.twikoo.accessToken};new class{constructor(e){this.config={...e,barrageTimer:[],barrageList:[],barrageIndex:0,dom:document.querySelector(".comment-barrage")},this.commentInterval=null,this.hoverOnCommentBarrage=!1,this.init()}async fetchComments(){try{const e=await fetch(this.config.twikooUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({event:"COMMENT_GET",accessToken:this.config.accessToken,url:this.config.pageUrl})});if(!e.ok)throw new Error("HTTP error! status: "+e.status);return(await e.json()).data}catch(e){console.error("An error occurred while fetching comments: ",e)}}commentLinkFilter(e){e.sort(((e,t)=>e.created-t.created));let t=[];return e.forEach((e=>{t.push(...this.getCommentReplies(e))})),t}getCommentReplies(e){let t=[e];return e.replies&&e.replies.forEach((e=>{t.push(...this.getCommentReplies(e))})),t}processCommentContent(e){const t=e.replace(/<blockquote\b[^>]*>[\s\S]*?<\/blockquote>/gi,"").replace(/<[^>]*>/g,"").replace(/\n/g," ");return""!==t.trim()?`<p>${t}</p>`:""}popCommentBarrage(e){const t=this.processCommentContent(e.comment);if(!t.trim())return!1;const r=document.createElement("div");return r.className="comment-barrage-item",r.innerHTML=`\n                <div class="barrageHead">\n                    <a class="barrageTitle" href="javascript:sco.scrollTo('post-comment')">热评</a>\n                    <div class="barrageNick">${e.nick}</div>\n                    <img class="barrageAvatar" src="https://cravatar.cn/avatar/${e.mailMd5}"/>\n                    <a class="comment-barrage-close" href="javascript:sco.switchCommentBarrage();"><i class="scoicon sco-close-fill"></i></a>\n                </div>\n                <a class="barrageContent" href="javascript:sco.scrollTo('${e.id}');">${t}</a>\n            `,this.config.barrageTimer.push(r),this.config.dom.appendChild(r),!0}removeCommentBarrage(e){e.className="comment-barrage-item out",setTimeout((()=>{this.config.dom.removeChild(e)}),1e3)}async initCommentBarrage(){null!=localStorage.getItem("commentBarrageSwitch")?(document.querySelector(".comment-barrage").style.display="flex",GLOBAL_CONFIG.rightside.enable&&(document.querySelector(".menu-commentBarrage-text").textContent="关闭热评"),document.querySelector("#consoleCommentBarrage").classList.add("on")):(document.querySelector(".comment-barrage").style.display="none",GLOBAL_CONFIG.rightside.enable&&(document.querySelector(".menu-commentBarrage-text").textContent="显示热评"),document.querySelector("#consoleCommentBarrage").classList.remove("on"));const e=await this.fetchComments();this.config.barrageList=this.commentLinkFilter(e),this.config.dom.innerHTML="",clearInterval(this.commentInterval),this.commentInterval=null;const t=()=>{if(this.config.barrageList.length&&!this.hoverOnCommentBarrage){if(!this.popCommentBarrage(this.config.barrageList[this.config.barrageIndex]))return this.config.barrageIndex+=1,this.config.barrageIndex%=this.config.barrageList.length,t();this.config.barrageIndex+=1,this.config.barrageIndex%=this.config.barrageList.length}this.config.barrageTimer.length>(this.config.barrageList.length>this.config.maxBarrage?this.config.maxBarrage:this.config.barrageList.length)&&!this.hoverOnCommentBarrage&&this.removeCommentBarrage(this.config.barrageTimer.shift())};setTimeout((()=>{t(),this.commentInterval&&clearInterval(this.commentInterval),this.commentInterval=setInterval(t,this.config.barrageTime)}),3e3)}init(){this.initCommentBarrage();const e=document.querySelector(".comment-barrage");e.addEventListener("mouseover",(()=>{this.hoverOnCommentBarrage=!0})),e.addEventListener("mouseout",(()=>{this.hoverOnCommentBarrage=!1}))}}(e)}