// cookie的key是：wangyi_notice_show
// 通知条显示与隐藏

(function(factory, window) {
	// 模块化输出
	if (typeof define == 'function') {
		if (define.amd) {
			// amd
			define('notice', ['jenny', 'emitter', 'lifeCycle', 'ejs'], factory);
		}
	} else {
		window.Notice = factory(Jenny);
	}
})(function(_, Emitter, LifeCycle) {
	function Notice() {
		LifeCycle.apply(this, arguments);
		Emitter.apply(this, arguments);

		this.cookieVal = null;
		this.cookieName = null;
		this.close = null;
		this.cookieTime = 10000;
	}

	_.extend(Notice.prototype, Emitter.prototype, LifeCycle.prototype, {
		templateUI: function() {
			this.template = _('<div class="notice-content">\
            <p>网易云课堂微专业，帮助你掌握专业技能，令你求职或加薪多一份独特优势！<a href="#">立即查看&#62;</a></p>\
            <a href="#" class="no-remind" id="no-remind"><i></i> 不再提醒</a>\
        </div>', true);
		},
		eventUI: function() {
			var _self = this;
			this.close = this.container.find('.no-remind');
			// // 点击不再提醒后，设置cookie并隐藏notice
			this.close.addHandler('click', function(e) {
				e.preventDefault();
				// 设置cookie值
				_.setCookie(_self.cookieName, true, _self.cookieTime || 10000);
				// 隐藏通知条
				_self.container.hide();
			});
		},
		styleUI: function() {
			this.cookieVal = _.getCookie(this.cookieName);

			// 初始化
			// 如果存在cookie值，则隐藏，如果不存在，则隐藏
			if (this.cookieVal) {
				this.container.hide();
			} else {
				this.container.show();
			}
		},
		init: function(obj) {
			_.extend(this, obj);

			this.render(this.container);

			return this;
		}
	});


	return Notice;
}, window);