// 信息滚动模块

/*
基本模版
<div class="rank-list-box" id="list-box">
    <ul id="mes1"></ul>
    <ul id="mes2"></ul>
</div>
 */

(function(factory, window) {
	// 模块化输出
	if (typeof define == 'function') {
		if (define.amd) {
			// amd
			define('messageScoll', ['jenny', 'emitter', 'lifeCycle', 'ejs'], factory);
		}
	} else {
		window.SubjectScoll = factory(Jenny);
	}
})(function(_, Emitter, LifeCycle) {
	function SubjectScoll() {
		LifeCycle.apply(this, arguments);
		Emitter.apply(this, arguments);

		this.data = null;
		this.url = null;
		this.scroll = {};

		this.mes1 = null;
	}

	_.extend(SubjectScoll.prototype, LifeCycle.prototype, Emitter.prototype, {
		dataUI: function(fn) {
			var _self = this;
			_.CORSRequest(this.url, null, function(data) {
				_self.data = JSON.parse(data);
				fn();
			})
		},
		templateUI: function() {
			console.log(this.data);
			var lists = {
				data: this.data
			}
			this.template = _(ejs.render('<ul id="mes1">\
			<% for (var i = 0; i < data.length; i++) { %>\
			<li>\
				<a class="rank-list" href="javascript:void(0)" title="<%= data[i].name %>" data-id="<%= data[i].id %>" data-name="<%= data[i].name %>" data-provider="<%= data[i].provider %>" data-learnercount="<%= data[i].learnerCount %>" data-price="<%= data[i].price %>" data-categoryname="<%= data[i].categoryName %>" data-description="<%= data[i].description %>">\
					<div><img src="<%= data[i].middlePhotoUrl %>"></div>\
					<h2><%= data[i].name %></h2>\
					<p><i class="icon-user"></i> <%= data[i].learnerCount %></p>\
				</a>\
			</li>\
			<% } %>\
		</ul>\
		<ul id="mes2">\
			<% for (var i = 0; i < data.length; i++) { %>\
			<li>\
				<a class="rank-list" href="javascript:void(0)" title="<%= data[i].name %>" data-id="<%= data[i].id %>" data-name="<%= data[i].name %>" data-provider="<%= data[i].provider %>" data-learnercount="<%= data[i].learnerCount %>" data-price="<%= data[i].price %>" data-categoryname="<%= data[i].categoryName %>" data-description="<%= data[i].description %>">\
					<div><img src="<%= data[i].middlePhotoUrl %>"></div>\
					<h2><%= data[i].name %></h2>\
					<p><i class="icon-user"></i> <%= data[i].learnerCount %></p>\
				</a>\
			</li>\
			<% } %>\
		</ul>', lists), true);
		},
		eventUI: function() {
			var _self = this;
			var adtimer = null;
			var setTime = null;

			this.mes1 = _('#mes1');

			this.scroll.height = _('#mes1 li').height();
			console.log(this.scroll.height);
			var time = this.Times / this.scroll.height;
			// 动画
			var timer = function() {
				_self.container[0].scrollTop++;
				if (_self.container[0].scrollTop % _self.scroll.height == 0) {
					clearInterval(adtimer);
					setTime = setTimeout(delay, _self.delayTime);
				} else if (_self.container[0].scrollTop >= _self.mes1[0].offsetHeight) {
					_self.container[0].scrollTop = 0;
				}
			};
			// 延迟
			var delay = function() {
				adtimer = setInterval(timer, time);
			};
			// 动画开始
			setTime = setTimeout(delay, this.delayTime);
			// 停止滚动
			this.container.addHandler('mouseenter', function() {
				clearInterval(adtimer);
				clearTimeout(setTime);
			}).addHandler('mouseleave', function() {
				setTime = setTimeout(delay, _self.delayTime);
			});
		},
		render: function(container) {
			this.dataUI(function() {
				this.templateUI();
				if (this.template) {
					this.template.appendTo(container || _('body'));
					this.eventUI();
					this.styleUI();
				}
			}.bind(this));
		},
		init: function(obj) {
			_.extend(this, obj);
			this.render(this.container);

			return this;
		}
	});

	return SubjectScoll;
}, window);