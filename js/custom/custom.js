"" === GLOBAL_CONFIG_SITE.title.replace("Jayhrn", "") ? document.getElementById("page-name-text").style.display = "none" : document.querySelector("#page-name-text>span").innerHTML = document.title.split(" | Jayhrn")[0];
// 存数据
function saveData(name, data) { localStorage.setItem(name, JSON.stringify({ 'time': Date.now(), 'data': data })) };
// 取数据
function loadData(name, time) {
    let d = JSON.parse(localStorage.getItem(name));
    // 过期或有错误返回 0 否则返回数据
    if (d) {
        let t = Date.now() - d.time
        if (-1 < t && t < (time * 60000)) return d.data;
    }
    return 0;
};

let talkTimer = null;
function indexTalk() {
    if (talkTimer) {
        clearInterval(talkTimer)
        talkTimer = null;
    }
    if (!document.getElementById('bber-talk')) return

    function toText(ls) {
        let text = []
        ls.forEach(item => {
            text.push(item.content.replace(/#(.*?)\s/g, '').replace(/\{(.*?)\}/g, '').replace(/\!\[(.*?)\]\((.*?)\)/g, '<i class="fa-solid fa-image"></i>').replace(/(?<!!)\[(.*?)\]\((.*?)\)/g, '<i class="fa-solid fa-link"></i>'))
        });
        return text
    }

    function talk(ls) {
        let html = ''
        ls.forEach((item, i) => { html += `<li class="item item-${i + 1}">${item}</li>` });
        let box = document.querySelector("#bber-talk .talk-list")
        box.innerHTML = html;
        talkTimer = setInterval(() => {
            box.appendChild(box.children[0]);
        }, 3000);
    }

    let d = loadData('talk', 10);
    if (d) talk(d);
    else {
        fetch('https://memos.itisn.cyou/api/memo?openId=0c73bab0-e69d-4744-b59b-e678890f0ec1&tag=%E8%AF%B4%E8%AF%B4&limit=30creatorId=1').then(res => res.json()).then(data => { // 更改地址
            data = toText(data.data)
            talk(data);
            saveData('talk', data);
        })
    }
}
doStuff();
var custom = {
    getTimeState: function() {
        var e = (new Date).getHours()
          , t = "";
        return 0 <= e && e <= 5 ? t = "晚安😴" : 5 < e && e <= 10 ? t = "早上好👋" : 10 < e && e <= 14 ? t = "中午好👋" : 14 < e && e <= 18 ? t = "下午好👋" : 18 < e && e <= 24 && (t = "晚上好👋"),
        t
    },
    sayhi: function() {
        var e = document.getElementById("author-info__sayhi");
        e && (e.innerHTML = custom.getTimeState() + "！我是")
    },
}
custom.sayhi();
let heo_cookiesTime = null;
let heo_musicPlaying = false;
let heo_keyboard = false;
let heo_intype = false;
// 私有函数
var heo = {
    // 检测显示模式
    darkModeStatus: function () {
        let theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
        if (theme == 'light') {
            $(".menu-darkmode-text").text("深色模式");
        } else {
            $(".menu-darkmode-text").text("浅色模式");
        }
    },

    //bb添加时间
    changeTimeInEssay: function () {
        const relativeDate = function (selector) {
            selector.forEach(item => {
                const $this = item
                const timeVal = $this.getAttribute('datetime')
                $this.innerText = btf.diffDate(timeVal, true)
                $this.style.display = 'inline'
            })
        }

        if (document.querySelector('#bber')) {
            relativeDate(document.querySelectorAll('#bber time'))
        }
    },

    // 首页bb
    initIndexEssay: function () {
        if (document.querySelector('#bber-talk')) {
            var swiper = new Swiper('.swiper-container', {
                direction: 'vertical', // 垂直切换选项
                loop: true,
                autoplay: {
                    delay: 3000,
                    pauseOnMouseEnter: true
                },
            });
        }
    },


    // 只在首页显示
    onlyHome: function () {
        var urlinfo = window.location.pathname;
        urlinfo = decodeURIComponent(urlinfo);
        if (urlinfo == '/') {
            $('.only-home').attr('style', 'display: flex');
        } else {
            $('.only-home').attr('style', 'display: none');
        }
    },

    //是否在首页
    is_Post: function () {
        var url = window.location.href;  //获取url
        if (url.indexOf("/p/") >= 0) { //判断url地址中是否包含code字符串
            return true;
        } else {
            return false;
        }
    },


    //监测是否在页面开头
    addNavBackgroundInit: function () {
        var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if (document.body) {
            bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
            documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        // console.log("滚动高度"+ scrollTop)

        if (scrollTop != 0) {
            document.getElementById("page-header").classList.add("nav-fixed");
            document.getElementById("page-header").classList.add("nav-visible");
            $('#cookies-window').hide()
            console.log("已添加class")
        }
    },

    // 标签页面
    //分类条
    tagPageActive: function () {
        var urlinfo = window.location.pathname;
        urlinfo = decodeURIComponent(urlinfo)
        // console.log(urlinfo);
        // 验证是否是分类链接
        var pattern = /\/tags\/.*?\//;
        var patbool = pattern.test(urlinfo);
        // console.log(patbool);
        // 获取当前的分类
        if (patbool) {
            var valuegroup = urlinfo.split("/");
            // console.log(valuegroup[2]);
            // 获取当前分类
            var nowCategorie = valuegroup[2];
            if (document.querySelector('#tag-page-tags')) {
                $('a').removeClass('select')
                document.getElementById(nowCategorie).classList.add("select");
            }
        }
    },

    //分类条
    categoriesBarActive: function () {
        if (document.querySelector('#category-bar')) {
            $(".category-bar-item").removeClass("select")
        }
        var urlinfo = window.location.pathname;
        urlinfo = decodeURIComponent(urlinfo);
        // console.log(urlinfo);
        //判断是否是首页
        if (urlinfo == '/') {
            if (document.querySelector('#category-bar')) {
                document.getElementById('category-bar-home').classList.add("select");
            }
        } else {
            // 验证是否是分类链接
            var pattern = /\/categories\/.*?\//;
            var patbool = pattern.test(urlinfo);
            // console.log(patbool);
            // 获取当前的分类
            if (patbool) {
                var valuegroup = urlinfo.split("/");
                // console.log(valuegroup[2]);
                // 获取当前分类
                var nowCategorie = valuegroup[2];
                if (document.querySelector('#category-bar')) {
                    document.getElementById(nowCategorie).classList.add("select");
                }
            }
        }
    },

    // 页脚友链
    addFriendLinksInFooter: function () {
        var fetchUrl = "https://moments.zhheo.com/randomfriend?num=3"
        fetch(fetchUrl)
            .then(res => res.json())
            .then(json => {
                var randomFriendLinks = getArrayItems(json, 3);

                var htmlText = '';
                for (let i = 0; i < randomFriendLinks.length; ++i) {
                    var item = randomFriendLinks[i]
                    htmlText += `<a class='footer-item' href='${item.link}'  target="_blank" rel="noopener nofollow">${item.name}</a>`;
                }
                htmlText += `<a class='footer-item' href='/link/'>更多</a>`
                document.getElementById("friend-links-in-footer").innerHTML = htmlText;
            })
    },

    //禁止图片右键单击
    stopImgRightDrag: function () {
        var img = $("img");
        img.on("dragstart", function () { return false; });
    },

    //置顶文章横向滚动
    topPostScroll: function () {
        if (document.getElementById("recent-post-top")) {
            let xscroll = document.getElementById("recent-post-top");
            xscroll.addEventListener("mousewheel", function (e) {
                //计算鼠标滚轮滚动的距离
                let v = -e.wheelDelta / 2;
                xscroll.scrollLeft += v;
                //阻止浏览器默认方法
                if (document.body.clientWidth < 1300) {
                    e.preventDefault();
                }
            }, false);
        }
    },

    topCategoriesBarScroll: function () {
        if (document.getElementById("category-bar-items")) {
            let xscroll = document.getElementById("category-bar-items");
            xscroll.addEventListener("mousewheel", function (e) {
                //计算鼠标滚轮滚动的距离
                let v = -e.wheelDelta / 2;
                xscroll.scrollLeft += v;
                //阻止浏览器默认方法
                e.preventDefault();
            }, false);
        }
    },

    //作者卡片问好
    sayhi: function () {
        if (document.querySelector('#author-info__sayhi')) {
            document.getElementById("author-info__sayhi").innerHTML = getTimeState() + "！我是";
        }
    },

    // 添加标签
    addTag: function () {
        //添加new标签
        if (document.querySelector('.heo-tag-new')) {
            $(".heo-tag-new").append(`<sup class="heo-tag heo-tag-new-view">N</sup>`)
        }
        //添加hot标签
        if (document.querySelector('.heo-tag-hot')) {
            $(".heo-tag-hot").append(`<sup class="heo-tag heo-tag-hot-view">H</sup>`)
        }
    },

    // 二维码
    qrcodeCreate: function () {
        if (document.getElementById('qrcode')) {
            document.getElementById("qrcode").innerHTML = "";
            var qrcode = new QRCode(document.getElementById("qrcode"), {
                text: window.location.href,
                width: 250,
                height: 250,
                colorDark: "#000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        }
    },

    // 刷新即刻短文瀑布流
    reflashEssayWaterFall: function () {
        if (document.querySelector('#waterfall')) {
            setTimeout(function () {
                waterfall('#waterfall');
                document.getElementById("waterfall").classList.add('show');
            }, 500);
        }
    },

    // 即刻短文添加灯箱
    addMediumInEssay: function () {
        if (document.querySelector('#waterfall')) {
            mediumZoom(document.querySelectorAll('[data-zoomable]'))
        }
    },

    // 下载图片
    downloadImage: function (imgsrc, name) { //下载图片地址和图片名
        rm.hideRightMenu();
        if (rm.downloadimging == false) {
            rm.downloadimging = true;
            btf.snackbarShow('正在下载中，请稍后', false, 10000)
            setTimeout(function () {
                let image = new Image();
                // 解决跨域 Canvas 污染问题
                image.setAttribute("crossOrigin", "anonymous");
                image.onload = function () {
                    let canvas = document.createElement("canvas");
                    canvas.width = image.width;
                    canvas.height = image.height;
                    let context = canvas.getContext("2d");
                    context.drawImage(image, 0, 0, image.width, image.height);
                    let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
                    let a = document.createElement("a"); // 生成一个a元素
                    let event = new MouseEvent("click"); // 创建一个单击事件
                    a.download = name || "photo"; // 设置图片名称
                    a.href = url; // 将生成的URL设置为a.href属性
                    a.dispatchEvent(event); // 触发a的单击事件
                };
                image.src = imgsrc;
                btf.snackbarShow('图片已添加盲水印，请遵守版权协议');
                rm.downloadimging = false;
            }, "10000");
        } else {
            btf.snackbarShow('有正在进行中的下载，请稍后再试');
        }
    },

    //控制评论弹幕
    switchCommentBarrage: function () {
        let commentBarrage = document.querySelector('.comment-barrage');
        if (commentBarrage) {
            if ($(".comment-barrage").is(":visible")) {
                $(".comment-barrage").hide();
                $(".menu-commentBarrage-text").text("显示热评");
                document.querySelector("#consoleCommentBarrage").classList.remove("on");
                localStorage.setItem('commentBarrageSwitch', 'false');
            } else if ($(".comment-barrage").is(":hidden")) {
                $(".comment-barrage").show();
                $(".menu-commentBarrage-text").text("关闭热评");
                document.querySelector("#consoleCommentBarrage").classList.add("on");
                localStorage.removeItem('commentBarrageSwitch');
            }
        }
        rm.hideRightMenu();
    },

    //隐藏cookie窗口
    hidecookie: function () {
        heo_cookiesTime = setTimeout(() => {
            document.getElementById("cookies-window").classList.add('cw-hide');
            setTimeout(() => {
                $('#cookies-window').hide()
            }, 1000)
        }, 3000)
    },

    //隐藏今日推荐
    hideTodayCard: function () {
        if (document.getElementById("todayCard")) {
            document.getElementById("todayCard").classList.add('hide');
        }
    },

    //更改主题色
    changeThemeColor: function (color) {
        if (document.querySelector('meta[name="theme-color"]') !== null) {
            document.querySelector('meta[name="theme-color"]').setAttribute('content', color)
        }
    },

    //自适应主题色
    initThemeColor: function () {
        if (heo.is_Post()) {
            const currentTop = window.scrollY || document.documentElement.scrollTop
            if (currentTop > 56) {
                let themeColor = getComputedStyle(document.documentElement).getPropertyValue('--heo-background');
                heo.changeThemeColor(themeColor);
            } else {
                if (currentTop === 0) {
                    let themeColor = getComputedStyle(document.documentElement).getPropertyValue('--heo-main');
                    heo.changeThemeColor(themeColor);
                }
            }
        } else {
            let themeColor = getComputedStyle(document.documentElement).getPropertyValue('--heo-background');
            heo.changeThemeColor(themeColor);
        }
    },

    //跳转到指定位置
    jumpTo: function (dom) {
        $(document).ready(function () {
            $("html,body").animate({
                scrollTop: $(dom).eq(i).offset().top
            }, 500 /*scroll实现定位滚动*/); /*让整个页面可以滚动*/
        });
    },

    //显示加载动画
    showLoading: function () {
        document.querySelector("#loading-box").classList.remove("loaded");
        let cardColor = getComputedStyle(document.documentElement).getPropertyValue('--heo-card-bg');
        heo.changeThemeColor(cardColor);
    },

    //隐藏加载动画
    hideLoading: function () {
        document.querySelector("#loading-box").classList.add("loaded");
    },

    //切换音乐播放状态
    musicToggle: function () {
        let msgPlay = '<i class="fa-solid fa-play"></i><span>播放音乐</span>' // 此處可以更改為你想要顯示的文字
        let msgPause = '<i class="fa-solid fa-pause"></i><span>暂停音乐</span>' // 同上，但兩處均不建議更改
        if (heo_musicPlaying) {
            document.querySelector("#nav-music").classList.remove("playing");
            document.getElementById("menu-music-toggle").innerHTML = msgPlay;
            document.getElementById("nav-music-hoverTips").innerHTML = "音乐已暂停";
            document.querySelector("#consoleMusic").classList.remove("on");
            heo_musicPlaying = false;
        } else {
            document.querySelector("#nav-music").classList.add("playing");
            document.getElementById("menu-music-toggle").innerHTML = msgPause;
            document.querySelector("#consoleMusic").classList.add("on");
            heo_musicPlaying = true;
        }
        document.querySelector('meting-js').aplayer.toggle();
        rm.hideRightMenu();
    },

    //音乐上一曲
    musicSkipBack: function () {
        document.querySelector('meting-js').aplayer.skipBack();
        rm.hideRightMenu();
    },

    //音乐下一曲
    musicSkipForward: function () {
        document.querySelector('meting-js').aplayer.skipForward();
        rm.hideRightMenu();
    },

    //获取音乐中的名称
    musicGetName: function () {
        var x = $('.aplayer-title')
        // var x = document.getElementsByClassName('txt');
        // for (var i = x.length - 1; i >= 0; i--) {
        // console.log(x[i].innerText)
        // }
        var arr = []
        for (var i = x.length - 1; i >= 0; i--) {
            arr[i] = x[i].innerText
            // console.log(x[i].innerText)
        }
        return arr[0]
    },

    //显示中控台
    showConsole: function () {
        document.querySelector("#console").classList.add("show");
        heo.initConsoleState();
    },

    //隐藏中控台
    hideConsole: function () {
        document.querySelector("#console").classList.remove("show");
    },

    //快捷键功能开关
    keyboardToggle: function () {
        if (heo_keyboard) {
            heo_keyboard = false;
            document.querySelector("#consoleKeyboard").classList.remove("on");
            localStorage.setItem('keyboardToggle', 'false');
        } else {
            heo_keyboard = true;
            document.querySelector("#consoleKeyboard").classList.add("on");
            localStorage.setItem('keyboardToggle', 'true');
        }
    },

    //滚动到指定id
    scrollTo: function (id) {
        var domTop = document.querySelector(id).offsetTop;
        window.scrollTo(0, domTop - 80);
    },

    //隐藏侧边栏
    hideAsideBtn: () => { // Hide aside
        const $htmlDom = document.documentElement.classList
        $htmlDom.contains('hide-aside')
            ? saveToLocal.set('aside-status', 'show', 2)
            : saveToLocal.set('aside-status', 'hide', 2)
        $htmlDom.toggle('hide-aside')
        $htmlDom.contains('hide-aside')
            ? document.querySelector("#consoleHideAside").classList.add("on")
            : document.querySelector("#consoleHideAside").classList.remove("on")
    },

    //初始化console图标
    initConsoleState: function () {
        //初始化隐藏边栏
        const $htmlDom = document.documentElement.classList
        $htmlDom.contains('hide-aside')
            ? document.querySelector("#consoleHideAside").classList.add("on")
            : document.querySelector("#consoleHideAside").classList.remove("on")
    },

    //删除多余的class
    removeBodyPaceClass: function () {
        $('body').removeClass()
        $('body').addClass('pace-done')
    }
}
// pjax注释掉上面的 indexTalk(); 使用如下方法：
function whenDOMReady() {
	let postContent = document.querySelector('#post>#article-container.post-content')
	let cardToc = document.getElementById('card-toc')
	if (postContent && cardToc) {
	    let tocNumber = cardToc.getElementsByClassName('toc-number')
	    let tocLink = cardToc.getElementsByClassName('toc-link')
	    for (let i = 0; i < tocLink.length; i++) {
	        document.getElementById(decodeURIComponent(tocLink[i].attributes.href.value).slice(1)).dataset.toc = tocNumber[i].innerText
	    }
	}
    indexTalk();
	var $percent = document.querySelector("#nav #hotkey #top-button a.site-page i");
	$percent && window.addEventListener("scroll", (function () {
	    let e = document.body.scrollHeight || document.documentElement.scrollHeight,
	        t = window.innerHeight || document.documentElement.clientHeight;
	    $percent.dataset.percent = ((document.body.scrollTop || document.documentElement.scrollTop) / (e - t) * 100).toFixed(0)
	}));
}
var percentFlag = false; // 节流阀
function essayScroll() {
    let a = document.documentElement.scrollTop || window.pageYOffset; // 卷去高度
    const waterfallResult = a % document.documentElement.clientHeight; // 卷去一个视口
    result <= 99 || (result = 99);

    if (
        !percentFlag &&
        waterfallResult + 100 >= document.documentElement.clientHeight &&
        document.querySelector("#waterfall")
    ) {
        // console.info(waterfallResult, document.documentElement.clientHeight);
        setTimeout(() => {
            waterfall("#waterfall");
        }, 500);
    } else {
        setTimeout(() => {
            document.querySelector("#waterfall") && waterfall("#waterfall");
        }, 500);
    }

    const r = window.scrollY + document.documentElement.clientHeight;

    let p = document.getElementById("post-comment") || document.getElementById("footer");

    (p.offsetTop + p.offsetHeight / 2 < r || 90 < result) && (percentFlag = true);
}
function replaceAll(e, n, t) {
    return e.split(n).join(t);
}
var anzhiyu = {
    diffDate: function (d, more = false) {
        const dateNow = new Date();
        const datePost = new Date(d);
        const dateDiff = dateNow.getTime() - datePost.getTime();
        const minute = 1000 * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const month = day * 30;

        let result;
        if (more) {
            const monthCount = dateDiff / month;
            const dayCount = dateDiff / day;
            const hourCount = dateDiff / hour;
            const minuteCount = dateDiff / minute;

            if (monthCount >= 1) {
                result = datePost.toLocaleDateString().replace(/\//g, "-");
            } else if (dayCount >= 1) {
                result = parseInt(dayCount) + " " + GLOBAL_CONFIG.date_suffix.day;
            } else if (hourCount >= 1) {
                result = parseInt(hourCount) + " " + GLOBAL_CONFIG.date_suffix.hour;
            } else if (minuteCount >= 1) {
                result = parseInt(minuteCount) + " " + GLOBAL_CONFIG.date_suffix.min;
            } else {
                result = GLOBAL_CONFIG.date_suffix.just;
            }
        } else {
            result = parseInt(dateDiff / day);
        }
        return result;
    },
    changeTimeInEssay: function () {
        document.querySelector("talk_item") &&
            document.querySelectorAll("#bber time").forEach(function (e) {
                var t = e,
                    datetime = t.getAttribute("datetime");
                (t.innerText = anzhiyu.diffDate(datetime, true)), (t.style.display = "inline");
            });
    },
    reflashEssayWaterFall: function () {
        document.querySelector("#waterfall") &&
            setTimeout(function () {
                waterfall("#waterfall");
                document.getElementById("waterfall").classList.add("show");
            }, 500);
    },
    commentText: function (txt) {
        const postCommentDom = document.querySelector("#post-comment");
        var domTop = postCommentDom.offsetTop;
        window.scrollTo(0, domTop - 80);
        if (txt == "undefined" || txt == "null") txt = "好棒！";
        function setText() {
            setTimeout(() => {
                var input = document.getElementsByClassName("el-textarea__inner")[0];
                if (!input) setText();
                let evt = document.createEvent("HTMLEvents");
                evt.initEvent("input", true, true);
                let inputValue = replaceAll(txt, "\n", "\n> ");
                input.value = "> " + inputValue + "\n\n";
                input.dispatchEvent(evt);
                input.focus();
                input.setSelectionRange(-1, -1);
                if (document.getElementById("comment-tips")) {
                    document.getElementById("comment-tips").classList.add("show");
                }
            }, 100);
        }
        setText();
    },
    initIndexEssay: function () {
        setTimeout(() => {
            let essay_bar_swiper = new Swiper(".essay_bar_swiper_container", {
                passiveListeners: true,
                direction: "vertical",
                loop: true,
                autoplay: {
                    disableOnInteraction: true,
                    delay: 3000,
                },
                mousewheel: true,
            });

            let essay_bar_comtainer = document.getElementById("bbtalk");
            if (essay_bar_comtainer !== null) {
                essay_bar_comtainer.onmouseenter = function () {
                    essay_bar_swiper.autoplay.stop();
                };
                essay_bar_comtainer.onmouseleave = function () {
                    essay_bar_swiper.autoplay.start();
                };
            }
        }, 100);
    },
};

anzhiyu.initIndexEssay();
anzhiyu.changeTimeInEssay();
anzhiyu.reflashEssayWaterFall();

whenDOMReady()
document.addEventListener("pjax:complete", whenDOMReady)

postAddToc()
// 检测按键
window.onkeydown = function (e) {
    if (e.keyCode === 123) {
        btf.snackbarShow('开发者模式已打开，请遵循GPL协议', false, 3000)
    }
}

//友链随机传送
function travelling() {
    var fetchUrl = "https://moments.zhheo.com/randomfriend"
    fetch(fetchUrl)
        .then(res => res.json())
        .then(json => {
            var name = json.name;
            var link = json.link;
            var msg = "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + name + "」";
            document.styleSheets[0].addRule(':root', '--heo-snackbar-time:' + 8000 + 'ms!important');
            Snackbar.show({
                text: msg,
                duration: 8000,
                pos: 'top-center',
                actionText: '前往',
                onActionClick: function (element) {
                    //Set opacity of element to 0 to close Snackbar
                    $(element).css('opacity', 0);
                    window.open(link, '_blank');
                }
            });
        })
}
//监听ctrl+C
$(document).unbind('keydown').bind('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && (e.keyCode == 67) && (selectTextNow != '')) {
        btf.snackbarShow('复制成功，复制和转载请标注本文地址');
        rm.rightmenuCopyText(selectTextNow);
        return false;
    }
})

function doStuff() {
    var flag = 0;
    try {
        ap = aplayers[0]; //aplayer对象的存放位置挺离谱的
        ap.list;
        flag = 1;
    } catch {
        setTimeout(doStuff, 50);//等待aplayer对象被创建（没找到初始化实例的地方只能这样了，这个判断代码是StackOverflow上面扒的（因为自己是个蒟蒻
        return;
    }
    if (flag) {
        ap.lrc.hide();//自带播放暂停时显隐歌词，可以删
        document.getElementsByClassName("aplayer-icon-menu")[0].click()
        if (localStorage.getItem("musicIndex") != null) {
            musicIndex = localStorage.getItem("musicIndex");
            ap.list.switch(musicIndex);
            //歌曲可以本地储存下次访问体验更好
        }
        if (sessionStorage.getItem("musicTime") != null) {
            window.musict = sessionStorage.getItem("musicTime");
            ap.setMode(sessionStorage.getItem("musicMode"));
            if (sessionStorage.getItem("musicPaused") != '1') {
                ap.play();
            }
            // setTimeout(function(){
            //     ap.seek(window.musict); //seek炸了我很久，最后决定加个延时（本来要用canplay但是莫名鬼畜了）
            // },500);
            var g = true; //加个变量以防鬼畜但是不知道怎么节流qwq
            ap.on("canplay", function () {
                if (g) {
                    ap.seek(window.musict);
                    g = false;//如果不加oncanplay的话会seek失败就这原因炸很久
                }
            });
        } else {
            sessionStorage.setItem("musicPaused", 1);
            ap.setMode("mini"); //新版添加了保存展开状态功能
        }
        if (sessionStorage.getItem("musicVolume") != null) {
            ap.audio.volume = Number(sessionStorage.getItem("musicVolume"));
        }
        ap.on("pause", function () { sessionStorage.setItem("musicPaused", 1); ap.lrc.hide() });//原基础上加了个检测暂停免得切换页面后爆零(bushi)（指社死）
        ap.on("play", function () { sessionStorage.setItem("musicPaused", 0); ap.lrc.show() });//自带播放暂停时显隐歌词，后面那句可以删，上同
        ap.audio.onvolumechange = function () { sessionStorage.setItem("musicVolume", ap.audio.volume); };//新版增加保存音量免得切换页面爆零（doge
        setInterval(function () {
            musicIndex = ap.list.index;
            musicTime = ap.audio.currentTime;
            localStorage.setItem("musicIndex", musicIndex);
            //保存播放进度
            sessionStorage.setItem("musicTime", musicTime);
            sessionStorage.setItem("musicMode", ap.mode);
            //保存展开状态
        }, 200);//节流，200ms精度感知不大qwq
    }
}
function fullScreen() {
    var de = document.documentElement;
    if (de.requestFullscreen) {
        de.requestFullscreen();
    } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen();
    } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen();
    }
}
function hideTodayCard() {
    document.getElementById("todayCard") && document.getElementById("todayCard").classList.add("hide")
}
$(".topGroup").hover((function () { }
), (function () {
    document.getElementById("todayCard").classList.remove("hide"),
        document.getElementById("todayCard").style.zIndex = 1
}
))
fpssw = function () {
    if (localStorage.getItem("fpson") == "1") {
        localStorage.setItem("fpson", "0");
    } else {
        localStorage.setItem("fpson", "1");
    }
    document.location.reload();
}
setBlur = function () {
    blur = !blur;
    localStorage.setItem("blur", blur);
    if (!blur) {
        document.getElementById("settingStyle").innerText = `
    *{
        -webkit-backdrop-filter: none!important;
        backdrop-filter: none!important;
        -webkit-filter: none!important;
        filter: none!important;
    }`}
    else {
        document.getElementById("settingStyle").innerText = ''
    }
}
searchSize();
window.addEventListener('resize', searchSize)
// 搜索窗口自适应
function searchSize() {
    // 只需要适应手机端
    if (document.body.clientWidth > 768) return
    let div = document.querySelector('#algolia-hits')
    // 监听插入，如果有插入则根据可视高度动态设置最大高度
    div.addEventListener('DOMNodeInserted', () => {
        div.children[0].style.maxHeight = (document.documentElement.clientHeight - 210) + 'px'
    })
}
window.onload = function () {
    // 1.找到页面中的按钮
    var totop = document.getElementById("btn");
    totop.style.display ="none";
    var timer = null;

    // 2. 给按钮绑定点击事件
    totop.onclick =function () {
        // 周期性定时
        timer = setInterval(function () {
            // 3.获取滚动条距离浏览器顶端的距离
            var backTop = document.documentElement.scrollTop || 
            document.body.scrollTop;

            // 越滚越慢
            speedTop =backTop/5;
            document.documentElement.scrollTop=backTop-speedTop;
            if(backTop==0){
                clearInterval(timer);
            }
        },30)
    }
    // 设置临界值
    var pageHeight =700;
    window.onscroll =function () {
        var backTop = document.documentElement.scrollTop || 
        document.body.scrollTop;
        if(backTop>pageHeight){
            totop.style.display="block";
        }else{
            totop.style.display="none";
        }

    }
}
// 如果当前页有评论就执行函数
if (document.getElementById('post-comment')) owoBig();
// 表情放大
function owoBig() {
    let flag = 1, // 设置节流阀
        owo_time = '', // 设置计时器
        m = 3; // 设置放大倍数
    // 创建盒子
    let div = document.createElement('div'),
        body = document.querySelector('body');
    // 设置ID
    div.id = 'owo-big';
    // 插入盒子
    body.appendChild(div)

    // 构造observer
    let observer = new MutationObserver(mutations => {

        for (let i = 0; i < mutations.length; i++) {
            let dom = mutations[i].addedNodes,
                owo_body = '';
            if (dom.length == 2 && dom[1].className == 'OwO-body') owo_body = dom[1];
            // 如果需要在评论内容中启用此功能请解除下面的注释
            // else if (dom.length == 1 && dom[0].className == 'tk-comment') owo_body = dom[0];
            else continue;
            
            // 禁用右键（手机端长按会出现右键菜单，为了体验给禁用掉）
            if (document.body.clientWidth <= 768) owo_body.addEventListener('contextmenu', e => e.preventDefault());
            // 鼠标移入
            owo_body.onmouseover = (e) => {
                    if (flag && e.target.tagName == 'IMG') {
                        flag = 0;
                        // 移入300毫秒后显示盒子
                        owo_time = setTimeout(() => {
                            let height = e.path[0].clientHeight * m, // 盒子高
                                width = e.path[0].clientWidth * m, // 盒子宽
                                left = (e.x - e.offsetX) - (width - e.path[0].clientWidth) / 2, // 盒子与屏幕左边距离
                                top = e.y - e.offsetY; // 盒子与屏幕顶部距离

                            if ((left + width) > body.clientWidth) left -= ((left + width) - body.clientWidth + 10); // 右边缘检测，防止超出屏幕
                            if (left < 0) left = 10; // 左边缘检测，防止超出屏幕
                            // 设置盒子样式
                            div.style.cssText = `display:flex; height:${height}px; width:${width}px; left:${left}px; top:${top}px;`;
                            // 在盒子中插入图片
                            div.innerHTML = `<img src="${e.target.src}">`
                        }, 300);
                    }
                };
            // 鼠标移出隐藏盒子
            owo_body.onmouseout = () => { div.style.display = 'none', flag = 1, clearTimeout(owo_time); }
        }

    })
    observer.observe(document.getElementById('post-comment'), { subtree: true, childList: true }) // 监听的 元素 和 配置项
}
let icons = document.querySelectorAll(".ico");
let length = icons.length;

icons.forEach((item, index) => {
  item.addEventListener("mouseover", (e) => {
    focus(e.target, index);
  });
  item.addEventListener("mouseleave", (e) => {
    icons.forEach((item) => {
      item.style.transform = "scale(1)  translateY(0px)";
    });
  });
});

const focus = (elem, index) => {
  let previous = index - 1;
  let previous1 = index - 2;
  let next = index + 1;
  let next2 = index + 2;

  if (previous == -1) {
    console.log("first element");
    elem.style.transform = "scale(1.5)  translateY(-10px)";
  } else if (next == icons.length) {
    elem.style.transform = "scale(1.5)  translateY(-10px)";
    console.log("last element");
  } else {
    elem.style.transform = "scale(1.5)  translateY(-10px)";
    icons[previous].style.transform = "scale(1.2) translateY(-6px)";
    icons[previous1].style.transform = "scale(1.1)";
    icons[next].style.transform = "scale(1.2) translateY(-6px)";
    icons[next2].style.transform = "scale(1.1)";
  }
};
var custom = {
    saveData: (e,t)=>{
        localStorage.setItem(e, JSON.stringify({
            time: Date.now(),
            data: t
        }))
    },
    loadData: (e,t)=>{
        let n = JSON.parse(localStorage.getItem(e));
        if (n) {
            let e = Date.now() - n.time;
            if (e < 60 * t * 1e3 && e > -1)
                return n.data
        }
        return 0
    },
    randomLink: ()=>{
        let e = shine.loadData("links", 30);
        if (e) {
            let t = document.querySelectorAll("#friend-links-in-footer .footer-item");
            if (!t.length)
                return;
            for (let n = 0; n < 5; n++) {
                let o = parseInt(Math.random() * e.length);
                t[n].innerText = e[o].name,
                t[n].href = e[o].link,
                e.splice(o, 1)
            }
        } else{
            fetch("./link.json").then((e=>e.json())).then((e=>{
                shine.saveData("links", e.link_list),
                shine.randomLink()
            }
            ))
        }
    },
}
custom.randomLink();
window.addEventListener("DOMContentLoaded",() => {
	const ur = new UndoRedo(".undo-redo");
});

class UndoRedo {
	actionIndex = 4;
	actions = 9;

	constructor(el) {
		this.el = document.querySelector(el);

		this.init();
	}
	init() {
		this.el?.addEventListener("click",this.buttonAction.bind(this));
		this.updateDisplay();
	}
	buttonAction(e) {
		const actionName = e.target.getAttribute("data-action");

		if (actionName === "icon-moon" && this.actionIndex > 0) {
			// undo
			--this.actionIndex;
		} else if (actionName === "icon-moon" && this.actionIndex < this.actions - 1) {
			// redo
			++this.actionIndex;
		}

		this.updateDisplay();
	}
	updateDisplay() {
		// disable undo if on the first action
		const undoButton = this.el?.querySelector("[data-action='icon-moon']");
		undoButton.disabled = this.actionIndex === 0;
		// disable redo if on the last action
		const redoButton = this.el?.querySelector("[data-action='icon-moon']");
		redoButton.disabled = this.actionIndex === this.actions - 1;
	}
}
