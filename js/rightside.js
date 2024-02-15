let rm={};const addEvent=(e,t,n)=>e.addEventListener(t,n);async function imageToBlob(e){const t=new Image,n=document.createElement("canvas"),o=n.getContext("2d");return t.crossOrigin="",t.src=e,new Promise((e=>{t.onload=function(){n.width=this.naturalWidth,n.height=this.naturalHeight,o.drawImage(this,0,0),n.toBlob((t=>e(t)),"image/png",.75)}}))}async function copyImage(e){try{const t=await imageToBlob(e),n=new ClipboardItem({"image/png":t});await navigator.clipboard.write([n])}catch(e){console.error("Failed to copy image: ",e)}}function stopMaskScroll(){addEvent(document.getElementById("rightmenu-mask"),"mousewheel",rm.hideRightMenu),addEvent(document.getElementById("rightMenu"),"mousewheel",rm.hideRightMenu)}rm.stopdragimg=Array.from(document.getElementsByTagName("img")),rm.stopdragimg.forEach((e=>addEvent(e,"dragstart",(()=>!1)))),rm.showRightMenu=function(e,t=0,n=0){let o=document.getElementById("rightMenu");o.style.top=t+"px",o.style.left=n+"px",o.style.display=e?"block":"none",e?stopMaskScroll():document.getElementById("rightmenu-mask").style.display="none"},rm.reloadrmSize=function(){let e=document.querySelector("#rightMenu");e.style.display="block",rmWidth=e.offsetWidth,rmHeight=e.offsetHeight,e.style.display="none"},rm.downloadimging=!1,rm.writeClipImg=async function(e){rm.downloadimging||(rm.downloadimging=!0,utils.snackbarShow("正在下载中，请稍后",!1,1e4),rm.hideRightMenu(),setTimeout((async function(){await copyImage(e),utils.snackbarShow("复制成功！图片已添加盲水印，请遵守版权协议"),rm.downloadimging=!1}),1e3))},rm.copyUrl=function(e){const t=document.createElement("input");t.value=e,document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)},rm.insertAtCaret=function(e,t){const n=e.selectionStart,o=e.selectionEnd;if(document.selection)e.focus(),document.selection.createRange().text=t,e.focus();else if(n||"0"===n){let i=e.scrollTop;e.value=e.value.substring(0,n)+t+e.value.substring(o,e.value.length),e.focus(),e.selectionStart=n+t.length,e.selectionEnd=n+t.length,e.scrollTop=i}else e.value+=t,e.focus()},rm.rightMenuCommentText=function(e){rm.hideRightMenu();let t=document.getElementsByClassName("el-textarea__inner")[0],n=document.createEvent("HTMLEvents");n.initEvent("input",!0,!0);let o=replaceAll(e,"\n","\n> ");t.value="> "+o+"\n\n",t.dispatchEvent(n);const i=document.querySelector("#post-comment").offsetTop;window.scrollTo(0,i-80),t.focus(),t.setSelectionRange(-1,-1),document.getElementById("comment-tips")&&document.getElementById("comment-tips").classList.add("show")},rm.hideRightMenu=()=>rm.showRightMenu(!1)||(document.getElementById("rightmenu-mask").style.display="none"),document.querySelector("#rightMenu").style.display="block",rmWidth=document.querySelector("#rightMenu").offsetWidth,rmHeight=document.querySelector("#rightMenu").offsetHeight,document.querySelector("#rightMenu").style.display="none";let domhref="",domImgSrc="",globalEvent=null;rm.switchDarkMode=()=>sco.switchDarkMode()||rm.hideRightMenu(),rm.rightmenuCopyText=e=>navigator.clipboard&&navigator.clipboard.writeText(e)||utils.snackbarShow("复制文本成功",!1,2e3)||rm.hideRightMenu(),rm.copyPageUrl=()=>rm.copyUrl(window.location.href)||utils.snackbarShow("复制本页链接地址成功",!1,2e3)||rm.hideRightMenu(),rm.sharePage=()=>rm.copyUrl(url)||utils.snackbarShow("复制本页链接地址成功",!1,2e3)||rm.hideRightMenu();var selectTextNow="";let selceText=()=>selectTextNow=document.selection?document.selection.createRange().text:window.getSelection()+""||"",replaceAll=(e,t,n)=>e.split(t).join(n);function addRightMenuClickEvent(){const e=(e,t,n)=>document.getElementById(e)?.addEventListener(t,n);e("menu-backward","click",(()=>window.history.back()||rm.hideRightMenu())),e("menu-forward","click",(()=>window.history.forward()||rm.hideRightMenu())),e("menu-refresh","click",(()=>window.location.reload())),e("menu-top","click",(()=>utils.scrollToDest(0,500)||rm.hideRightMenu())),Array.from(document.getElementsByClassName("menu-link")).forEach((e=>e.addEventListener("click",rm.hideRightMenu))),e("menu-darkmode","click",rm.switchDarkMode),e("menu-randomPost","click",(()=>toRandomPost()||rm.hideRightMenu())),GLOBAL_CONFIG.comment.commentBarrage&&e("menu-commentBarrage","click",sco.switchCommentBarrage),e("rightmenu-mask","click",rm.hideRightMenu),e("rightmenu-mask","contextmenu",(()=>rm.hideRightMenu()||!1)),e("menu-copy","click",rm.copyPageUrl),e("menu-pastetext","click",rm.pasteText),e("menu-copytext","click",(()=>rm.rightmenuCopyText(selectTextNow)||utils.snackbarShow("复制成功，复制和转载请标注本文地址")||rm.hideRightMenu())),GLOBAL_CONFIG.comment.enable&&e("menu-commenttext","click",(()=>rm.rightMenuCommentText(selectTextNow))),e("menu-newwindow","click",(()=>window.open(domhref)||rm.hideRightMenu())),e("menu-copylink","click",rm.copyLink),e("menu-downloadimg","click",(()=>sco.downloadImage(domImgSrc))),e("menu-copyimg","click",(()=>rm.writeClipImg(domImgSrc))),e("menu-music-toggle","click",sco.musicToggle),e("menu-music-back","click",sco.musicSkipBack),e("menu-music-forward","click",sco.musicSkipForward),e("menu-music-copyMusicName","click",(()=>rm.rightmenuCopyText(sco.musicGetName())||utils.snackbarShow("复制歌曲名称成功",!1,3e3)))}document.onmouseup=document.ondbclick=selceText,rm.readClipboard=()=>navigator.clipboard&&navigator.clipboard.readText().then((e=>rm.insertAtCaret(globalEvent.target,e))),rm.pasteText=()=>rm.readClipboard()||rm.hideRightMenu(),rm.copyLink=()=>rm.rightmenuCopyText(domhref)||utils.snackbarShow("已复制链接地址"),window.oncontextmenu=function(e){if(document.body.clientWidth<=768)return;let t=e.clientX+10,n=e.clientY,o={other:document.getElementsByClassName("rightMenuOther"),plugin:document.getElementsByClassName("rightMenuPlugin"),copytext:document.getElementById("menu-copytext"),pastetext:document.getElementById("menu-pastetext"),commenttext:document.getElementById("menu-commenttext"),newwindow:document.getElementById("menu-newwindow"),copylink:document.getElementById("menu-copylink"),copyimg:document.getElementById("menu-copyimg"),downloadimg:document.getElementById("menu-downloadimg"),search:document.getElementById("menu-search"),music:{toggle:document.getElementById("menu-music-toggle"),back:document.getElementById("menu-music-back"),forward:document.getElementById("menu-music-forward"),playlist:document.getElementById("menu-music-playlist"),copyMusicName:document.getElementById("menu-music-copyMusicName")}},i=e.target.href,m=e.target.currentSrc,c=!1;Array.from(o.other).forEach((e=>e.style.display="block")),globalEvent=e,selectTextNow&&window.getSelection()?(c=!0,o.copytext.style.display="block",o.commenttext.style.display="block",o.search.style.display="block"):(o.copytext.style.display="none",o.commenttext.style.display="none",o.search.style.display="none"),i?(c=!0,o.newwindow.style.display="block",o.copylink.style.display="block",domhref=i):(o.newwindow.style.display="none",o.copylink.style.display="none"),m?(c=!0,o.copyimg.style.display="block",o.downloadimg.style.display="block",domImgSrc=m):(o.copyimg.style.display="none",o.downloadimg.style.display="none");let l=e.target.tagName.toLowerCase();return"input"===l||"textarea"===l?(c=!0,o.pastetext.style.display="block"):o.pastetext.style.display="none","METING-JS"===e.target.nodeName?(c=!0,Object.values(o.music).forEach((e=>e.style.display="block"))):Object.values(o.music).forEach((e=>e.style.display="none")),Array.from(c?o.other:o.plugin).forEach((e=>e.style.display="none")),Array.from(c?o.plugin:o.other).forEach((e=>e.style.display="block")),rm.reloadrmSize(),t+rmWidth>window.innerWidth&&(t-=rmWidth+10),n+rmHeight>window.innerHeight&&(n-=n+rmHeight-window.innerHeight),rm.showRightMenu(!0,n,t),document.getElementById("rightmenu-mask").style.display="flex",!1};