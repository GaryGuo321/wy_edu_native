//属性前加_表示不建议调用

/*
基础DOM结构模版
<div class="m-banner">
	<div class="arrow" id="arrow"></div>
</div>
 */

(function(factory, window) {
	// 模块化输出
	if (typeof define == 'function') {
		if (define.amd) {
			// amd
			define('banner', ['jenny', 'emitter', 'lifeCycle', 'ejs'], factory);
		}
	} else {
		window.Banner = factory(Jenny);
	}
})(function(_, Emitter, LifeCycle) {
	// 图片轮播模块
	function Banner() {
		LifeCycle.apply(this, arguments);
		Emitter.apply(this, arguments);

		this.imgData = [];
		this.defaultShowNum = 1;
		this.times = 3000;

		// element
		this.allImg = null;
	}

	_.extend(Banner.prototype, LifeCycle.prototype, Emitter.prototype, {
		templateUI: function() {
			var data = {
				imgData: this.imgData
			};
			this.template = _(ejs.render('<div class="banner-container">\
			<% for(var i = 0; i < imgData.length; i++) { %>\
			<a href="<%= imgData[i].linkUrl %>" target="_blank">\
				<img src="<%= imgData[i].imgUrl %>" class="banner"/>\
			</a>\
			<% } %>\
			<div class="arrow" id="arrow">\
				<% for(var s = 0; s < imgData.length; s++) { %>\
				<span></span>\
				<% } %>\
			</div>\
		</div>', data), true);
		},
		eventUI: function() {
			var _self = this;
			// 切换图片
			this.on('switch', function(num) {
				// 设置图片的z-index值
				this.allImg[num].style.zIndex = 100;
				// 动画切换图片，淡入
				this.allImg.eq(num).animate({
					opacity: 1
				}, 600);
				// 获取图片的兄弟元素
				var imgSibling = this.allImg.eq(num).rangeSiblings(this.allImg);
				// 重置图片兄弟元素的样式
				for (var t = 0; t < imgSibling.length; t++) {
					imgSibling.eq(t).animate({
						opacity: 0
					}, 600);
					imgSibling[t].style.zIndex = 50;
				}
			});
			// 切换导航点
			this.on('switch', function(num) {
				// 给点击的小圆点加上样式
				this.dot.eq(num).addClass('spanClick');
				// 获取小圆点的兄弟元素
				var spanSibling = this.dot.eq(num).rangeSiblings(this.dot);
				// 重置小圆点兄弟元素的样式
				spanSibling.removeClass('spanClick');
			});

			// 轮播定时器函数
			var nextImg = function() {
				// 计算要显示的下一张图片
				for (var i = 0; i < _self.dot.length; i++) {
					var spanClass = _self.dot[i].className;
					if (spanClass == 'spanClick') {
						var indexNum = i + 1;
						if (indexNum == _self.dot.length) {
							indexNum = 0;
						}
						break;
					}
				}
				// 图片切换
				// 小圆点切换
				_self.fire('switch', indexNum);
			};

			for (var i = 0; i < this.dot.length; i++) {
				~ function(i) {
					_self.dot.eq(i).addHandler('click', function(e) {
						// 切换图片
						// 切换小圆点
						_self.fire('switch', i);
					});
				}(i)
			}

			// 轮播
			var adtimerBanner = setInterval(nextImg, this.times);
			// hover停止轮播
			this.container.addHandler('mouseenter', function() {
				// 鼠标进入取消时间轮播
				clearInterval(adtimerBanner);
			}).addHandler('mouseleave', function() {
				// 鼠标移出，重新建立时间轮播
				adtimerBanner = setInterval(nextImg, _self.times);
			});
		},
		styleUI: function() {
			// 初始化显示
			this.allImg = this.container.find('.banner');
			this.dot = this.container.find('.arrow span');

			var num = this.defaultShowNum - 1;
			// 加上默认样式
			this.allImg[num].style.zIndex = 100;
			this.allImg[num].style.opacity = 1;
			// 添加小圆点样式
			this.dot.eq(num).addClass('spanClick');
		},
		init: function(obj) {
			_.extend(this, obj);
			this.render(this.container);
			// this.templateUI();

			return this;
		}
	});

	return Banner;
}, window);