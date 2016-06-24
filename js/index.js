/*

author: GuoWeihan
data: 2016.5.10

 */


// 顶部cookie的key是：wangyi_notice_show
// 顶部通知条显示与隐藏
function TopNotice(cookieName, box, close) {
	// cookie名
	this.cookieName = cookieName;
	// cookie值
	this.cookieValue = cookieUtil.get(cookieName);
	// 整个notice的box
	this.notice = box;
	// 关闭notice按钮
	this.close = close;
}
// 隐藏notice，并设置cookie值
TopNotice.prototype.hideNotice = function(times) {
	// 设置cookie值
	cookieUtil.set(this.cookieName, true, times);
	// 隐藏通知条
	dom.hide(this.notice);
};

// 顶部通知栏
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
	eventUnit.addHandler(topNotice.close, 'click', function(e) {
		var event = eventUnit.getEvent(e);
		eventUnit.preventDafault(event);
		// 设置cookie值，并隐藏，10000为cookie的有效时间
		topNotice.hideNotice(10000);
	});
}


// 关注模块
function Follow(cookieName, parentBox) {
	// cookie名
	this.cookieName = cookieName;
	// cookie值
	this.cookieValue = cookieUtil.get(cookieName);
	// 关注的盒子
	this.parentBox = parentBox;

}
// 创建关注元素
Follow.prototype.creFollowEle = function() {
	// 创建元素的过程
	var p = dom.insertElement(this.parentBox, 'p', 'first', {
		'class': 'follow'
	});
	var pText = dom.insertText(p, '+关注');
};
// 创建已关注元素
Follow.prototype.creAlreadyFollowEle = function() {
	// 创建元素的过程
	var p = dom.insertElement(this.parentBox, 'p', 'first', {
		'class': 'follow-now'
	});
	var i = dom.insertElement(p, 'i', 'last', {
		'class': 'true-img'
	});
	var pText1 = dom.insertText(p, '已关注 ');
	var span = dom.insertElement(p, 'span', 'last');
	var spanText = dom.insertText(span, '|');
	var pText2 = dom.insertText(p, ' ');
	var a = dom.insertElement(p, 'a', 'last', {
		'class': 'cancel',
		'href': 'javascript:void(0)'
	});
	var aText = dom.insertText(a, '取消');
};
// 建立关注行为
Follow.prototype.creFollow = function(followEle) {
	// 删除关注按钮
	dom.removeElement(followEle);
	// 设置关注cookie值
	cookieUtil.set(this.cookieName, true);
	// 创建已关注按钮
	this.creAlreadyFollowEle();
};
// 建立取消关注行为
Follow.prototype.creCancelFollow = function(notFollowEle) {
	// 删除cookie值
	cookieUtil.unset(this.cookieName);
	// 删除已关注按钮
	dom.removeElement(notFollowEle);
	// 创建关注按钮
	this.creFollowEle();
};

// 登陆模块
function Login(cookieName, formObj, loginFrame, back) {
	// cookie名
	this.cookieName = cookieName;
	// cookie值
	this.cookieValue = cookieUtil.get(cookieName);
	// 登陆框
	this.loginFrame = loginFrame;
	// 遮罩层
	this.back = back;
	// 表单元素
	for (var key in formObj) {
		this[key] = formObj[key];
	}
}
// 显示登录框
Login.prototype.showFrame = function() {
	// 显示登陆窗是，监听表单输入和重置表单内容
	formUtil.monitor(this.user, this.userRemind);
	formUtil.monitor(this.pwd, this.pwdRemind);
	formUtil.resetForm(this.user, this.userRemind);
	formUtil.resetForm(this.pwd, this.pwdRemind);
	// 遮罩显示
	dom.show(this.back);
	// 登陆框显示
	dom.show(this.loginFrame);
};
// 关闭登陆框
Login.prototype.closeFrame = function() {
	// 遮罩隐藏
	dom.hide(this.back);
	// 登陆框隐藏
	dom.hide(this.loginFrame);
};
// 错误提示
Login.prototype.errorInfer = function(ele) {
	// 错误提示框显示
	ele.style.display = 'block';
	// 显示动画
	dom.myAnimate(ele, {
		'margin-top': -60,
		'opacity': 1
	}, 150, true);
	// 隐藏动画
	var timer = setTimeout(function() {
		dom.myAnimate(ele, {
			'margin-top': -20,
			'opacity': 0
		}, 150, true, function() {
			ele.style.display = 'none';
		});
	}, 1000);
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
		CORSRequest('http://study.163.com/webDev/login.htm', {
			userName: md5(form['userName'].value),
			password: md5(form['password'].value)
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

	// 操作
	var operate = function(num) {
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
	};

}

// 图片轮播模块

function Banner(allImg, navSpanParent, navSpanStyle) {
	// 获取全部的banner图片
	this.img = allImg;
	// 全部banner图片数
	this.imgLength = this.img.length;
	// 获取全部的小圆点，和切换小圆点是需要的样式
	this.navSpan = dom.childNodes(navSpanParent);
	this.navSpanLength = this.navSpan.length;
	this.navSpanStyle = navSpanStyle;
}
// 图片切换函数
Banner.prototype.switchImg = function(num) {
	// 设置图片的z-index值
	this.img[num].style.zIndex = 100;
	// 动画切换图片，淡入
	dom.myAnimate(this.img[num], {
		opacity: 1
	}, 600);
	// 获取图片的兄弟元素
	var imgSibling = dom.sameSibling(this.img, this.img[num]);
	// 重置图片兄弟元素的样式
	for (var t = 0; t < imgSibling.length; t++) {
		dom.myAnimate(imgSibling[t], {
			opacity: 0
		}, 600);
		imgSibling[t].style.zIndex = 50;
	}
};
// 小圆点切换函数
Banner.prototype.switchNavSpan = function(ele, num) {
	// 给点击的小圆点加上样式
	dom.addClass(ele, this.navSpanStyle);
	// 获取小圆点的兄弟元素
	var spanSibling = dom.sameSibling(this.navSpan, this.navSpan[num]);
	// 重置小圆点兄弟元素的样式
	for (var t = 0; t < spanSibling.length; t++) {
		dom.removeClass(spanSibling[t], this.navSpanStyle);
	}
};
// 默认显示第num张
Banner.prototype.defaultShow = function(num) {
	console.log(this);
	var num = num - 1;
	this.img[num].style.zIndex = 100;
	this.img[num].style.opacity = 1;
	if (this.navSpanStyle) {
		dom.addClass(this.navSpan[num], this.navSpanStyle);
	}
};
// 间隔一段时间切换banner
Banner.prototype.timer = function() {
	for (var i = 0; i < this.navSpanLength; i++) {
		var spanClass = this.navSpan[i].className;
		if (spanClass == this.navSpanStyle) {
			var indexNum = i + 1;
			if (indexNum == this.navSpanLength) {
				indexNum = 0;
			}
			break;
		}
	}
	this.switchImg(indexNum);
	this.switchNavSpan(this.navSpan[indexNum], indexNum);
};

// 轮播图

function bannerImg() {
	// 全部图片
	var allImg = dom.getClass(document, 'banner');
	// navSpan的父元素，做容器用
	var navSpanParent = dom.getId('arrow');
	// 创建banner对象
	var banner = new Banner(allImg, navSpanParent, "spanClick");
	// 默认显示第1页
	banner.defaultShow(1);
	// 定时轮播
	var adtimerBanner = setInterval(banner.timer.bind(banner), 5000);
	// hover停止轮播
	var area = dom.getClass(document, 'm-banner');
	eventUnit.addHandler(area[0], 'mouseenter', function() {
		// 鼠标进入取消时间轮播
		clearInterval(adtimerBanner);
	});
	eventUnit.addHandler(area[0], 'mouseleave', function() {
		// 鼠标移出，重新建立时间轮播
		adtimerBanner = setInterval(banner.timer.bind(banner), 5000);
	});
	// 点击小圆点切换图片
	for (var i = 0; i < banner.navSpanLength; i++) {
		~ function(i) {
			eventUnit.addHandler(banner.navSpan[i], 'click', function(e) {
				var event = eventUnit.getEvent(e);
				// 切换图片
				banner.switchImg(i);
				// 切换小圆点
				banner.switchNavSpan(this, i);
			});
		}(i)
	}
}


// 信息滚动模块

function MessageScoll(box, mes1, mes2) {
	this.box = box; //滚动的盒子
	this.mes1 = mes1; //list1
	this.mes2 = mes2; //list2，用于复制list1的内容
}
// 获取数据，插入到DOM中
MessageScoll.prototype.getMessage = function(data) {
	// json->对象
	if (window.JSON) {
		var addData = JSON.parse(data);
	} else {
		var addData = eval('(' + data + ')');
	}
	// 清空list1的内容
	this.mes1.innerHTML = '';
	// 将data进行数据的拼接，并加入list1中
	this.createEle(this.mes1, addData);
	// 将list1的内容复制给list1
	this.mes2.innerHTML = this.mes1.innerHTML;
};
// 将ajax拿到的hotCoures数据进行拼接并插入DOM树
MessageScoll.prototype.createEle = function(parent, data) {
	// 以下都为拼接行为
	var dataLength = data.length;
	for (var i = 0; i < dataLength; i++) {
		var li = dom.insertElement(parent, 'li', 'last');
		var a = dom.insertElement(li, 'a', 'last', {
			'class': 'rank-list',
			'href': 'javascript:void(0)',
			'title': data[i].name,
			'data-id': data[i].id,
			'data-name': data[i].name,
			'data-provider': data[i].provider,
			'data-learnerCount': data[i].learnerCount,
			'data-price': data[i].price,
			'data-categoryName': data[i].categoryName,
			'data-description': data[i].description
		});
		var div = dom.insertElement(a, 'div', 'last');
		var img = dom.insertElement(div, 'img', 'last', {
			'src': data[i].middlePhotoUrl
		});
		var h2 = dom.insertElement(a, 'h2', 'last');
		var title = dom.insertText(h2, data[i].name);
		var p = dom.insertElement(a, 'p', 'last');
		var iEle = dom.insertElement(p, 'i', 'last', {
			'class': 'icon-user'
		});
		var learner = dom.insertText(p, ' ' + data[i].learnerCount);
	}
};
// 间歇性滚动, 并判断鼠标滑入是否停止动画
MessageScoll.prototype.intervalScoll = function(listHeight, finishTime, delayTime, stopScoll) {
	var _self = this;
	var adtimer = null;
	var setTime = null;
	var time = finishTime / listHeight;
	var timer = function() {
		_self.box.scrollTop++;
		if (_self.box.scrollTop % listHeight == 0) {
			clearInterval(adtimer);
			setTime = setTimeout(delay, delayTime);
		} else if (_self.box.scrollTop >= _self.mes1.offsetHeight) {
			_self.box.scrollTop = 0;
		}
	};
	var delay = function() {
		adtimer = setInterval(timer, time);
	};
	setTime = setTimeout(delay, delayTime);
	if (stopScoll) {
		eventUnit.addHandler(this.box, 'mouseenter', function() {
			clearInterval(adtimer);
			clearTimeout(setTime);
		});
		eventUnit.addHandler(this.box, 'mouseleave', function() {
			setTime = setTimeout(delay, delayTime);
		});
	}
};

function hotCouresScroll() {
	// 信息滚动
	var listBox = dom.getId('list-box'); //滚动盒子
	var mes1 = dom.getId('mes1'); //list1
	var mes2 = dom.getId('mes2'); //list2
	var hotCoures = new MessageScoll(listBox, mes1, mes2);
	// 获取滚动信息内容 hotcoures, 并将获取的数据插入到DOM树中
	CORSRequest('http://study.163.com/webDev/hotcouresByCategory.htm', null, hotCoures.getMessage.bind(hotCoures));
	// 间隔滚动，每次滚动高度／完成时间／延迟时间／hover是否停止
	hotCoures.intervalScoll(66, 300, 5000, true);
}



// 课程列表模块

function SubList(tabParent, listParent, pageList) {
	this.tabParent = tabParent; //装tab的盒子
	this.allTab = dom.childNodes(this.tabParent); //tab盒子里的所有tab
	this.listParent = listParent; //装课程列表的盒子
	this.pageList = pageList; //装页码的盒子

	// 用于默认显示，和切换tab默认显示的参数
	this.defaultShowNum = '';
	this.defaultShowPage = '';
	// 用于点击箭头和数字时切换页数的参数
	this.showPage = '';
	// tab
	this.tabNum = '';
	this.totalPage = '';
	//存放数据
	this.data = '';
}
// 默认显示
SubList.prototype.defaultShow = function(defaultShowNum, defaultShowPage, defaultSortNum) {
	// 用于默认显示，和切换tab默认显示的参数
	this.defaultShowNum = defaultShowNum;
	this.defaultShowPage = defaultShowPage;
	// 用于点击箭头和数字时切换页数的参数
	this.showPage = defaultShowPage;
	// tab
	this.tabNum = defaultSortNum;
	var num = this.tabNum - 1;
	dom.addClass(this.allTab[num], 'tab-click');
};
// tab切换
SubList.prototype.switchSub = function(target, switchStyle) {
	this.showPage = this.defaultShowPage;
	dom.addClass(target, switchStyle);
	var sib = dom.allSibling(target, this.tabParent);
	for (var s = 0; s < sib.length; s++) {
		dom.removeClass(sib[s], switchStyle);
	}
};
// 拼接数据
SubList.prototype.composeEle = function(data) {
	var data = JSON.parse(data);
	var dataList = data.list;
	var dataLength = dataList.length;
	this.listParent.innerHTML = '';
	// 拼接页数
	// console.log(this.pageList);
	this.totalPage = data.totalPage;
	var totalPage = this.totalPage;
	var nowPage = data.pagination.pageIndex;
	// 最多展示多少页
	var pageListNum = 8;
	this.pageList.innerHTML = '';
	switch (true) {
		case nowPage <= 5:
			{
				for (var s = 0; s < pageListNum; s++) {
					var li = dom.insertElement(this.pageList, 'li', 'last', {
						'value': s + 1,
					});
					var liText = dom.insertText(li, s + 1);

				}
				break;
			}
		case nowPage > totalPage - 4:
			{
				for (var s = pageListNum; s > 0; s--) {
					var li = dom.insertElement(this.pageList, 'li', 'last', {
						'value': totalPage - s + 1,
					});
					var liText = dom.insertText(li, totalPage - s + 1);
				}
				break;
			}
		default:
			{
				var middlePage = nowPage - 4;
				for (var s = 0; s < pageListNum; s++) {
					console.log(middlePage);
					var li = dom.insertElement(this.pageList, 'li', 'last', {
						'value': middlePage,
					});
					var liText = dom.insertText(li, middlePage++);
				}
			}
	}
	// 给当前页添加样式
	var allLi = dom.getTagName(this.pageList, 'li');
	var allLiLength = allLi.length;
	for (var t = 0; t < allLiLength; t++) {
		if (dom.getAttr(allLi[t], 'value') == nowPage) {
			dom.addClass(allLi[t], 'select-li');
			break;
		};
	}

	// 拼接课程信息
	for (var i = 0; i < dataLength; i++) {
		if (dataList[i].price == 0) {
			dataList[i].price = '免费';
		} else {
			dataList[i].price = '¥' + Number.prototype.toFixed.call(dataList[i].price, 2);
		}
		var num = i + 1;
		var box = dom.insertElement(this.listParent, 'a', 'last', {
			'class': 'subject',
			'href': 'javascript:void(0)',
			'title': dataList[i].name,
			'data-id': dataList[i].id,
			'data-name': dataList[i].name,
			'data-provider': dataList[i].provider,
			'data-learnerCount': dataList[i].learnerCount,
			'data-price': dataList[i].price,
			'data-categoryName': dataList[i].categoryName,
			'data-description': dataList[i].description
		});
		if (num % 4 === 0) {
			box.style.marginRight = '0';
		}
		var img = dom.insertElement(box, 'img', 'last', {
			'src': dataList[i].middlePhotoUrl,
		});
		var title = dom.insertElement(box, 'p', 'last', {
			'title': dataList[i].name,
			'class': 'title'
		});
		var titleText = dom.insertText(title, dataList[i].name);
		var album = dom.insertElement(box, 'p', 'last', {
			'class': 'album'
		});
		var albumText = dom.insertText(album, dataList[i].provider);
		var learner = dom.insertElement(box, 'p', 'last', {
			'class': 'num'
		});
		var iEle = dom.insertElement(learner, 'i', 'last', {
			'class': 'icon-user'
		});
		var learnerNum = dom.insertText(learner, ' ' + dataList[i].learnerCount);
		var price = dom.insertElement(box, 'p', 'last', {
			'class': 'price'
		});
		var priceNum = dom.insertText(price, dataList[i].price);
	}
};

function subjectList() {
	var tabParent = dom.getId('tab-list'); //装tab的盒子
	var listParent = dom.getId('subject-list'); //装课程列表的盒子
	var pageList = dom.getId('pageList'); //装页码的盒子
	// 默认每页显示多少项，默认显示第几页，默认显示分类的第几个课程
	var sub = new SubList(tabParent, listParent, pageList);
	sub.defaultShow(20, 1, 1);
	console.log(sub);
	CORSRequest('http://study.163.com/webDev/couresByCategory.htm', {
		'pageNo': sub.defaultShowPage,
		'psize': sub.defaultShowNum,
		'type': sub.tabNum * 10
	}, sub.composeEle.bind(sub));
	eventUnit.addHandler(sub.tabParent, 'click', function(e) {
		var event = eventUnit.getEvent(e);
		var target = eventUnit.getTarget(event);
		sub.tabNum = dom.getAttr(target, 'value');
		CORSRequest('http://study.163.com/webDev/couresByCategory.htm', {
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
			CORSRequest('http://study.163.com/webDev/couresByCategory.htm', {
				'pageNo': sub.showPage,
				'psize': sub.defaultShowNum,
				'type': sub.tabNum * 10
			}, sub.composeEle.bind(sub));
		}
	});
	eventUnit.addHandler(arrowRight, 'click', function(e) {
		if (sub.showPage < sub.totalPage) {
			sub.showPage += 1;
			CORSRequest('http://study.163.com/webDev/couresByCategory.htm', {
				'pageNo': sub.showPage,
				'psize': sub.defaultShowNum,
				'type': sub.tabNum * 10
			}, sub.composeEle.bind(sub));
		}
	});
	// 点击页数进行切换，使用代理绑定事件
	eventUnit.addHandler(sub.pageList, 'click', function(e) {
		var event = eventUnit.getEvent(e);
		sub.showPage = dom.getAttr(event.target, 'value');
		CORSRequest('http://study.163.com/webDev/couresByCategory.htm', {
			'pageNo': sub.showPage,
			'psize': sub.defaultShowNum,
			'type': sub.tabNum * 10
		}, sub.composeEle.bind(sub));
	});
}

// 播放视频模块
function VedioPaly(back, frame, vedio) {
	this.back = back;
	this.frame = frame;
	this.vedio = vedio;
	this.status = 1;
}
// 显示
VedioPaly.prototype.showVedio = function() {
	console.log(this);
	this.vedio.load();
	dom.show(this.back);
	dom.show(this.frame);
};
// 隐藏
VedioPaly.prototype.closeVedio = function() {
	this.vedio.pause();
	dom.hide(this.back);
	dom.hide(this.frame);
	return false;
};

function vedioControl() {
	var back = dom.getId('fixed-back');
	var frame = dom.getId('vedio-frame');
	var vedioContent = dom.getId('myVideo');
	var adVedio = new VedioPaly(back, frame, vedioContent);
	var clickArea = dom.getId('play-content');
	eventUnit.addHandler(clickArea, 'click', adVedio.showVedio.bind(adVedio));
	var clickClose = dom.getId('vedio-close');
	eventUnit.addHandler(clickClose, 'click', adVedio.closeVedio.bind(adVedio));
	// 点击视频范围播放或暂停视频
	eventUnit.addHandler(adVedio.vedio, 'click', function(e) {
		if (adVedio.status) {
			adVedio.vedio.play();
		} else {
			adVedio.vedio.pause();
		}
	});
	// 监听视频播放状态
	eventUnit.addHandler(adVedio.vedio, 'pause', function(e) {
		adVedio.status = 1;
	});
	eventUnit.addHandler(adVedio.vedio, 'play', function(e) {
		adVedio.status = 0;
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