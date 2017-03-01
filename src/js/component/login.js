(function(factory, window) {
	// 模块化输出
	if (typeof define == 'function') {
		if (define.amd) {
			// amd
			define('login', ['jenny', 'emitter', 'lifeCycle', 'ejs'], factory);
		}
	} else {
		window.Login = factory(Jenny);
	}
})(function(_, Emitter, LifeCycle) {
	function Login() {
		LifeCycle.apply(this, arguments);
		Emitter.apply(this, arguments);

		this.form = null;
	}

	_.extend(Login.prototype, Emitter.prototype, LifeCycle.prototype, {
		templateUI: function() {
			var data = {};
			this.template = _(ejs.render('<div class="g-modal login-modal">\
		    <div class="g-align"></div>\
		    <div class="g-wrap">\
		        <div class="g-header">\
					<div class="g-close">\
		        		<a href="javascript:void(0)" class="close icon-cross"></a>\
		    		</div>\
		        </div>\
		        <div class="g-main">\
		        	<div class="login-content">\
						<h1>登录网易云课堂</h1>\
						<form class="login-form" name="login-form">\
							<div class="user-message">\
								<input type="text" class="user-name" id="user" name="userName">\
				            	<span class="remind-user" id="remind-user">帐号</span>\
							</div>\
							<div class="pwd-message">\
								<input type="password" class="user-password" id="pwd" name="password">\
				            	<span class="remind-pwd" id="remind-pwd">密码</span>\
							</div>\
				            <button class="submit" type="submit" id="submit">登录</button>\
				        </form>\
		        	</div>\
		        	<div class="login-error">\
            			<i class="icon-cross"></i>\
            			<p>用户名或密码错误！</p>\
        			</div>\
		        </div>\
		    </div>\
		</div>', data), true);
		},
		resetUI: function() {
			var lists = this.form.elements;
			for (var i = 0; i < lists.length; i++) {
				lists[i].value = '';
				lists[0].focus();
				this.fire('monitor', lists[i]);
			}
		},
		errorUI: function() {
			var ele = _('.login-error');
			// 错误提示框显示
			ele.show();
			// 显示动画
			ele.animate({
				'margin-top': -60,
				'opacity': 1
			}, 150);
			// 隐藏动画
			var timer = setTimeout(function() {
				ele.animate({
					'margin-top': -20,
					'opacity': 0
				}, 150, function() {
					ele.hide();
				});
			}, 1500);

			this.resetUI();
		},
		eventUI: function() {
			this.form = document.forms['login-form'];
			console.log(this.form.elements);
			var _self = this;
			// 提示显示与隐藏
			this.on('monitor', function(ele) {
				if (ele.value) {
					_(ele).siblings().hide();
				} else {
					_(ele).siblings().show();
				}
			});
			// 表单内容监听
			_('.login-modal .user-name').addHandler('input', function() {
				_self.fire('monitor', this);
			});
			_('.login-modal .user-password').addHandler('input', function() {
				_self.fire('monitor', this);
			});

			// 关闭登陆框
			_('.login-modal .close').addHandler('click', function(e) {
				e.preventDefault();
				_('.login-modal').hide();
			});

			// 提交验证登陆
			_('.login-modal .submit').addHandler('click', function(e) {
				e.preventDefault();
				_.CORSRequest('http://study.163.com/webDev/login.htm', {
					userName: _.md5(this.form['userName'].value),
					password: _.md5(this.form['password'].value)
				}, function(data) {
					if (data == 1) {
						_('.login-modal').hide();
						_.setCookie('isLogin', true, 10000);
						window.location.reload();
					} else {
						_self.errorUI();
					}
				});
			});
		},
		init: function(obj) {
			_.extend(this, obj);
			this.render(this.container);

			return this;
		}
	});

	return Login;
}, window);