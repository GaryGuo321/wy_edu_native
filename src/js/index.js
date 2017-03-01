// requirejs的回调是在js已经加载完之后执行的
require(['config'], function(common) {
	require(['jenny', 'emitter', 'lifeCycle', 'banner', 'login', 'messageScoll', 'notice', 'pagination', 'subjectList', 'tab', 'vedio', 'ejs'], function(_, Emitter, LifeCycle, Banner, Login, SubjectScoll, Notice, Pagination, SubjectList, Tab, Vedio) {
		// 不再提示顶部通知栏
		new Notice().init({
			container: _('.h-notice'),
			cookieName: 'wangyi_notice_show',
			cookieTime: 10000
		});


		// 初始化
		var num = ''; //用于限制只执行一次
		if (document.body.clientWidth > 1205) {
			_('body').attr('value', 20);
			num = 1;
		} else {
			_('body').attr('value', 15);
			num = 2;
		}

		// 监听浏览器窗口变化
		// 响应式支持ie9+
		if (document.all && !document.addEventListener) {
			console.log('IE8 or lower');
		} else {
			window.onresize = function() {
				if (document.body.clientWidth > 1205) {
					if (num != 1) {
						num = 1;
						_('body').attr('value', 20);
						subInit(_('body').attr('value'), _('#tab-list').attr('value'));
					}
				} else {
					if (num != 2) {
						num = 2;
						_('body').attr('value', 15);
						subInit(_('body').attr('value'), _('#tab-list').attr('value'));
					}
				}
			}
		}


		// 初始化课程列表
		// 默认页面为1
		function subInit(pageSize, tabNum) {
			new SubjectList().init({
				container: _('.subject-list'),
				url: 'http://study.163.com/webDev/couresByCategory.htm',
				requestData: {
					pageNo: 1,
					psize: pageSize,
					type: tabNum
				},
				onPagination: function() {
					var _self = this;
					new Pagination().init({
						container: _('.page-num'),
						totalPages: _self.data.totalPage,
						visiblePages: 8,
						currentPage: _self.data.pagination.pageIndex,
						onPageChange: function(num, type) {
							new SubjectList().init({
								container: _self.container,
								url: _self.url,
								requestData: {
									pageNo: this.currentPage,
									psize: pageSize,
									type: tabNum
								}
							});
						}
					})
				}
			});
		}

		// 初始化tab
		new Tab().init({
			container: _('#tab-list .tab'),
			initNum: 1,
			onChangeTab: function() {
				subInit(_('body').attr('value'), _('#tab-list').attr('value'));
			}
		});
		// 初始化课程列表
		subInit(_('body').attr('value'), _('#tab-list').attr('value'));

		// 最热排行
		new SubjectScoll().init({
			container: _('.rank-list-box'),
			url: 'http://study.163.com/webDev/hotcouresByCategory.htm',
			times: 300,
			delayTime: 5000
		});

		// 轮播图
		new Banner().init({
			container: _('.m-banner'),
			imgData: [{
				imgUrl: 'images/banner1.jpg',
				linkUrl: 'http://open.163.com/'
			}, {
				imgUrl: 'images/banner2.jpg',
				linkUrl: 'http://study.163.com/'
			}, {
				imgUrl: 'images/banner3.jpg',
				linkUrl: 'http://www.icourse163.org/'
			}],
			defaultShowNum: 1,
			times: 5000
		});

		// 登录
		var loginFlag = false;
		if (_.getCookie('isLogin') == 'true') {
			_('.h-content .message')[0].innerHTML = '<p class="login-now"><i class="true-img"></i>已登录 <span>|</span> <a href="#" class="cancel">退出</a></p>';
		} else {
			_('.h-content .message')[0].innerHTML = '<p class="login">登录网易云</p>';
		}

		_('.login').addHandler('click', function() {
			if (loginFlag) {
				_('.login-modal').show();
			} else {
				new Login().init({});
			}
		});

		_('.login-now .cancel').addHandler('click', function(e) {
			e.preventDefault();
			_.unsetCookie('isLogin');
			window.location.reload();
		});

		// 播放视频模块
		var vedioFlag = false;
		var vedioModal = null;
		_('.play-content').addHandler('click', function(e) {
			if (vedioFlag) {
				_('.vedio-modal').show();
				vedioModal.template.find('#' + vedioModal.id)[0].load();
			} else {
				vedioFlag = true;
				vedioModal = new Vedio().init({
					src: 'http://mov.bn.netease.com/open-movie/nos/mp4/2014/12/30/SADQ86F5S_shd.mp4',
					poster: 'images/DSC_21@2x.png',
					width: '550px',
					height: '350px',
					type: 'video/mp4',
					controls: 'controls',
					id: 'myVideo'
				});
			}
		});
	})

	return;
})