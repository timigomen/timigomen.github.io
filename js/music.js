const scoMusic={params:new URLSearchParams(window.location.search),extractValue:e=>/\("([^\s]+)"\)/g.exec(e)[1],changeMusicBg:(e=!0)=>{const t=document.getElementById("Music-bg"),s=document.getElementsByClassName("Music-loading");if(e){const e=document.querySelector("#Music-page .aplayer-pic"),s=new Image;s.src=scoMusic.extractValue(e.style.backgroundImage),s.onload=()=>{t.style.backgroundImage=e.style.backgroundImage}}else{const e=setInterval((()=>{document.querySelector("#Music-page .aplayer-pic")&&(s[0].style.display="none",clearInterval(e),document.querySelector("meting-js").aplayer.volume(.8,!0),scoMusic.addEventListenerChangeMusicBg(),t.style.display="block")}),100)}},lrcupdate:()=>{const e=document.querySelector(".aplayer-lrc-contents"),t=e.querySelector("p.aplayer-lrc-current");if(t){const s=80*-Array.from(e.children).indexOf(t);e.style.transform=`translateY(${s}px)`}},buttonlist:()=>{const e=document.querySelector(".aplayer-list");e&&document.querySelector(".aplayer-lrc").addEventListener("click",(()=>{e.classList.contains("aplayer-list-hide")?e.classList.remove("aplayer-list-hide"):e.classList.add("aplayer-list-hide")}))},extractValue:e=>/\("([^\s]+)"\)/g.exec(e)[1],changeMusicBg:(e=!0)=>{const t=document.getElementById("Music-bg"),s=document.getElementsByClassName("Music-loading");if(e){const e=document.querySelector("#Music-page .aplayer-pic"),s=new Image;s.src=scoMusic.extractValue(e.style.backgroundImage),s.onload=()=>{t.style.backgroundImage=e.style.backgroundImage}}else{const e=setInterval((()=>{document.querySelector("#Music-page .aplayer-pic")&&(s[0].style.display="none",clearInterval(e),document.querySelector("meting-js").aplayer.volume(.8,!0),scoMusic.addEventListenerChangeMusicBg(),t.style.display="block")}),100)}},lrcupdate:()=>{const e=document.querySelector(".aplayer-lrc-contents"),t=e.querySelector("p.aplayer-lrc-current");if(t){const s=80*-Array.from(e.children).indexOf(t);e.style.transform=`translateY(${s}px)`}},buttonlist:()=>{const e=document.querySelector(".aplayer-list");e&&document.querySelector(".aplayer-lrc").addEventListener("click",(()=>{e.classList.contains("aplayer-list-hide")?e.classList.remove("aplayer-list-hide"):e.classList.add("aplayer-list-hide")}))},addEventListenerChangeMusicBg:()=>{const e=document.getElementById("Music-page").querySelector("meting-js").aplayer;e.on("loadeddata",(()=>{scoMusic.changeMusicBg()})),e.on("timeupdate",(()=>{scoMusic.lrcupdate()}))},getCustomPlayList:()=>{const e=document.getElementById("Music-page"),t=scoMusic.params.get("type")||"playlist";if(scoMusic.params.get("id")&&params.get("server")){const s=scoMusic.params.get("id"),c=scoMusic.params.get("server");e.innerHTML=`<meting-js id="${s}" server="${c}" type="${t}" preload="auto" order="random"></meting-js>`}else e.innerHTML=`<meting-js id="${musicConfig.userId}" server="${musicConfig.userServer}" type="${musicConfig.userType}" preload="auto" order="random"></meting-js>`;scoMusic.changeMusicBg(!1)},setKeydown:e=>{const t=document.querySelector("meting-js").aplayer;"Space"===e.code&&(e.preventDefault(),t.toggle()),39===e.keyCode&&(e.preventDefault(),t.skipForward()),37===e.keyCode&&(e.preventDefault(),t.skipBack()),38===e.keyCode&&musicConfig.volume<=1&&(musicConfig.volume+=.1,t.volume(musicConfig.volume,!0)),40===e.keyCode&&musicConfig.volume>=0&&(musicConfig.volume+=-.1,t.volume(musicConfig.volume,!0))},init:()=>{let e=1*window.innerHeight;document.documentElement.style.setProperty("--vh",`${e}px`),scoMusic.getCustomPlayList(),document.addEventListener("keydown",scoMusic.setKeydown)}};window.addEventListener("resize",(()=>{let e=1*window.innerHeight;document.documentElement.style.setProperty("--vh",`${e}px`)}));