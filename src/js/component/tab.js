(function(factory, window) {
	// 模块化输出
	if (typeof define == 'function') {
		if (define.amd) {
			// amd
			define('tab', ['jenny', 'emitter', 'lifeCycle', 'ejs'], factory);
		}
	} else {
		window.Tab = factory(Jenny);
	}
})(function(_, Emitter, LifeCycle) {
	function Tab() {
		LifeCycle.apply(this, arguments);
		Emitter.apply(this, arguments);

		this.initNum = null;

		this.onChangeTab = null;
	}

	_.extend(Tab.prototype, Emitter.prototype, LifeCycle.prototype, {
		eventUI: function() {
			var _self = this;
			var num = null;
			this.on('changeTab', this.onChangeTab);

			this.container.addHandler('click', function(e) {
				e.preventDefault();

				if (_(this).attr('value') != _self.initNum) {
					// window.sub.tabNum = _(this).attr('value');
					// window.sub.pageNo = 1;
					_self.initNum = _(this).attr('value');
					_(this).parent().attr('value', _self.initNum * 10);
					_(this).addClass('tab-click').siblings().removeClass('tab-click');

					_self.fire('changeTab');
				}
			});
		},
		styleUI: function() {
			// 初始化显示
			this.container.eq(this.initNum - 1).addClass('tab-click');

			this.container.parent().attr('value', this.initNum * 10);
		},
		render: function() {
			this.styleUI();
			this.eventUI();
		},
		init: function(obj) {
			_.extend(this, obj);
			this.render(this.container);

			return this;
		}
	});

	return Tab;
}, window);