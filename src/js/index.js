// 不再提示顶部通知栏
function topNoticeSet() {
	// 创建notice新对象，并传递参数cookie值
	var noticeBox = dom.getId('h-notice'); //标签盒子
	var noticeClose = dom.getId('no-remind'); //不再提示按钮
	var topNotice = new TopNotice('wangyi_notice_show', noticeBox, noticeClose);
	// 初始化
	// 如果存在cookie值，则隐藏，如果不存在，则隐藏
	if (topNotice.cookieValue) {
		dom.hide(topNotice.notice);
	} else {
		dom.show(topNotice.notice);
	}
	// 点击不再提醒后，设置cookie并隐藏notice
	eventUnit.addHandler(topNotice.close, 'click', function(event) {
		var e = eventUnit.getEvent(event);
		eventUnit.preventDafault(e);
		// 设置cookie值，并隐藏，10000为cookie的有效时间
		topNotice.hideNotice(10000);
	});
}

// 关注与登陆
function loginFollow() {
	// 创建登陆和关注对象
	var followBox = dom.getId('message'); //关注部分的盒子
	// 参数为：followCookie名, 关注部分的盒子，
	var follow = new Follow('followSuc', followBox);
	// 参数为：loginCookie名，表单元素对象/提示集合，登陆框，遮罩
	var loginFrame = dom.getId('login-frame'); //登陆框
	var back = dom.getId('fixed-back'); //遮罩
	// 创建login对象
	var login = new Login('loginSuc', {
		user: dom.getId('user'),
		userRemind: dom.getId('remind-user'),
		pwd: dom.getId('pwd'),
		pwdRemind: dom.getId('remind-pwd')
	}, loginFrame, back);

	// 关注初始化
	if (login.cookieValue) {
		// 如果已经登陆，判断关注cookie
		if (follow.cookieValue) {
			// 如果存在关注cookie，则创建已关注元素
			follow.creAlreadyFollowEle();
		} else {
			// 如果不存在关注cookie，则创建关注元素
			follow.creFollowEle();
		}
	} else {
		// 如果未登陆，显示关注元素
		follow.creFollowEle();
	}

	// 点击关注/取消关注，使用事件代理
	eventUnit.addHandler(followBox, 'click', function(e) {
		var event = eventUnit.getEvent(e);
		eventUnit.preventDafault(event);
		var target = eventUnit.getTarget(event);
		// 获取class名
		var className = target.className;
		// 如果点击的是取消按钮
		if (className == 'cancel') {
			// 获取已关注按钮
			var notFollow = dom.getClass(document, 'follow-now')[0];
			// 删除已关注按钮，创建关注按钮
			follow.creCancelFollow(notFollow)
		}
		// 如果点击的是关注按钮
		if (className == 'follow') {
			login.cookieValue = cookieUtil.get(login.cookieName);
			if (login.cookieValue) {
				// 如果已经登陆，则创建已关注按钮，删除关注按钮
				follow.creFollow(target);
			} else {
				// 如果未登陆，则显示登陆框要求登陆
				login.showFrame();
			}
		}
	});

	// 点击关闭登陆窗口
	var closeLoginFrame = dom.getId('login-close'); //关闭按钮
	eventUnit.addHandler(closeLoginFrame, 'click', function(e) {
		var event = eventUnit.getEvent(e);
		eventUnit.preventDafault(event);
		// 调用closeFrame关闭登陆窗口
		login.closeFrame();
	});

	// 点击登录，并进行验证
	var btnLogin = dom.getId('submit'); //提交按钮
	eventUnit.addHandler(btnLogin, 'click', function(e) {
		var form = document.forms['login-form'];
		var event = eventUnit.getEvent(e);
		eventUnit.preventDafault(event);
		// 进行登陆验证，返回1表示成功，0表示失败
		ajax.CORSRequest('http://study.163.com/webDev/login.htm', {
			userName: formUtil.md5(form['userName'].value),
			password: formUtil.md5(form['password'].value)
		}, function(num) {
			num = parseInt(num);
			if (num) {
				// 登陆成功
				var followEle = dom.getClass(document, 'follow')[0]; //关注按钮
				// 关闭登陆框
				login.closeFrame();
				// 删除关注按钮
				dom.removeElement(followEle);
				// 设置登陆和关注的cookie值
				cookieUtil.set(login.cookieName, true);
				cookieUtil.set(follow.cookieName, true);
				// 创建已关注按钮
				follow.creAlreadyFollowEle();
			} else {
				// 登录失败
				var errorMess = dom.getClass(document, 'login-error')[0]; //失败提示窗口
				// 显示失败提示窗口
				login.errorInfer(errorMess);
			}
		});
	});
}



// 轮播图

function bannerImg() {
	var banner = new Banner({
		img: [{
			imgUrl: './src/images/banner1.jpg',
			linkUrl: 'http://open.163.com/'
		}, {
			imgUrl: './src/images/banner2.jpg',
			linkUrl: 'http://study.163.com/'
		}, {
			imgUrl: './src/images/banner3.jpg',
			linkUrl: 'http://www.icourse163.org/'
		}],
		dotStyle: 'spanClick',
		// 默认显示页数
		defaultShowNum: 1,
		// 是否进行定时轮播
		timerBanner: true,
		// hover时是否停止
		hoverStop: true,
		// 时间轮播间隔时间
		times: 5000,
		// 点击dot时候切换
		clickSwitch: true
	});
}

// 信息滚动模块

function hotCouresScroll() {
	// 信息滚动
	var hotCoures = new MessageScoll({
		url: 'http://study.163.com/webDev/hotcouresByCategory.htm',
		data: null,
		// 滚动高度／完成时间／延迟时间／hover是否停止
		scroll: {
			height: 66,
			finishTime: 300,
			delayTime: 5000,
			hoverStop: true
		}
	});
}

// 课程列表模块

function subjectList() {
	var tabParent = dom.getId('tab-list'); //装tab的盒子
	var listParent = dom.getId('subject-list'); //装课程列表的盒子
	var pageList = dom.getId('pageList'); //装页码的盒子
	// 默认每页显示多少项，默认显示第几页，默认显示分类的第几个课程
	var sub = new SubList(tabParent, listParent, pageList);
	// 判断屏幕浏览器窗口宽度，大窗口显示20个课程每页，小窗口显示15个课程每页
	var num = ''; //用于限制只执行一次
	if (document.body.clientWidth > 1205) {
		sub.defaultShow(20, 1, 1);
		num = 1;
	} else {
		sub.defaultShow(15, 1, 1);
		num = 2;
	}
	ajax.CORSRequest('http://study.163.com/webDev/couresByCategory.htm', {
		'pageNo': sub.defaultShowPage,
		'psize': sub.defaultShowNum,
		'type': sub.tabNum * 10
	}, sub.composeEle.bind(sub));
	// tab切换
	eventUnit.addHandler(sub.tabParent, 'click', function(e) {
		var event = eventUnit.getEvent(e);
		var target = eventUnit.getTarget(event);
		sub.tabNum = dom.getAttr(target, 'value');
		ajax.CORSRequest('http://study.163.com/webDev/couresByCategory.htm', {
			'pageNo': sub.defaultShowPage,
			'psize': sub.defaultShowNum,
			'type': sub.tabNum * 10
		}, sub.composeEle.bind(sub));
		sub.switchSub(target, 'tab-click');
	});
	// 点击箭头切换
	var arrowLeft = dom.getId('arrow-left');
	var arrowRight = dom.getId('arrow-right');

	eventUnit.addHandler(arrowLeft, 'click', function(e) {
		if (sub.showPage > 1) {
			sub.showPage -= 1;
			ajax.CORSRequest('http://study.163.com/webDev/couresByCategory.htm', {
				'pageNo': sub.showPage,
				'psize': sub.defaultShowNum,
				'type': sub.tabNum * 10
			}, sub.composeEle.bind(sub));
		}
	});
	eventUnit.addHandler(arrowRight, 'click', function(e) {
		if (sub.showPage < sub.totalPage) {
			sub.showPage += 1;
			ajax.CORSRequest('http://study.163.com/webDev/couresByCategory.htm', {
				'pageNo': sub.showPage,
				'psize': sub.defaultShowNum,
				'type': sub.tabNum * 10
			}, sub.composeEle.bind(sub));
		}
	});
	// 点击页数进行切换，使用代理绑定事件
	eventUnit.addHandler(sub.pageList, 'click', function(e) {
		var event = eventUnit.getEvent(e);
		var targetEle = eventUnit.getTarget(event);
		// sub.showPage = dom.getAttr(event.target, 'value');
		sub.showPage = dom.getAttr(targetEle, 'value');
		ajax.CORSRequest('http://study.163.com/webDev/couresByCategory.htm', {
			'pageNo': sub.showPage,
			'psize': sub.defaultShowNum,
			'type': sub.tabNum * 10
		}, sub.composeEle.bind(sub));
	});

	// 监听浏览器窗口变化
	// 响应式支持ie9+
	if (document.all && !document.addEventListener) {
		console.log('IE8 or lower');
	} else {
		window.onresize = function() {
			if (document.body.clientWidth > 1205) {
				if (num != 1) {
					num = 1;
					sub.defaultShowNum = 20;
					ajax.CORSRequest('http://study.163.com/webDev/couresByCategory.htm', {
						'pageNo': sub.showPage,
						'psize': sub.defaultShowNum,
						'type': sub.tabNum * 10
					}, sub.composeEle.bind(sub));
				}
			} else {
				if (num != 2) {
					num = 2;
					sub.defaultShowNum = 15;
					ajax.CORSRequest('http://study.163.com/webDev/couresByCategory.htm', {
						'pageNo': sub.showPage,
						'psize': sub.defaultShowNum,
						'type': sub.tabNum * 10
					}, sub.composeEle.bind(sub));
				}
			}
		}
	}
}


// 播放视频模块

function vedioControl() {
	var adVedio = new VedioPaly({
		vedio: {
			src: 'http://mov.bn.netease.com/open-movie/nos/mp4/2014/12/30/SADQ86F5S_shd.mp4',
			poster: './src/images/DSC_21@2x.png',
			width: '550px',
			height: '350px',
			type: 'video/mp4',
			controls: 'controls',
			id: 'myVideo'
		},
		showEle: dom.getId('play-content')
	});
}

// 初始化

window.onload = function() {
	// 顶部通知栏
	topNoticeSet();
	// 关注登陆
	loginFollow();
	// 轮播图
	bannerImg();
	// 右边最热课程信息滚动
	hotCouresScroll();
	// 课程列表
	subjectList();
	// 视频播放
	vedioControl();
}