//属性前加_表示不建议调用

/*
基础DOM结构模版
<div class="m-banner">
	<div class="arrow" id="arrow"></div>
</div>
 */

// 图片轮播模块

function Banner(obj) {
	var self = this;
	// 固定变量
	// 固定模版
	this.imgBox = dom.getClass(document, 'm-banner')[0];
	this.imgDotBox = dom.getClass(this.imgBox, 'arrow')[0];

	help.extend(this, obj);

	// 全部banner图片数
	this.imgLength = this.img.length;
	// 全部小圆点数
	this.dotLength = this.imgLength;

	// 创建插入图片元素等
	(function() {
		for (var i = 0; i < self.imgLength; i++) {
			var a = help.html2node('<a href="' + self.img[i].linkUrl + '" target="_blank"><img src="' + self.img[i].imgUrl + '" class="banner' + (i + 1) + ' banner"></a>');
			var dot = help.html2node('<span></span>');
			dom.insertBefore(a, self.imgDotBox);
			self.imgDotBox.appendChild(dot);
		}
		// 获取全部的小圆点，和切换小圆点是需要的样式
		self.dot = dom.childNodes(self.imgDotBox);
		self.img = dom.getClass(self.imgBox, 'banner');
	})();
	// 如果defaultShowNum = true，显示默认图片
	if (this.defaultShowNum) {
		this.defaultShow();
	}
	// 如果传入timerBanner = true，执行时间banner轮播
	if (this.timerBanner) {
		this.timeCarousel();
	}
	// 如果传入clickSwitch = true，执行点击切换
	if (this.clickSwitch) {
		this.clickDot();
	}
}

help.extend(Banner.prototype, {
	// 默认显示第几张图片
	defaultShow: function() {
		var num = this.defaultShowNum - 1;
		// 加上默认样式
		this.img[num].style.zIndex = 100;
		this.img[num].style.opacity = 1;
		// 添加小圆点样式
		if (this.dotStyle) {
			dom.addClass(this.dot[num], this.dotStyle);
		}
	},
	// 图片切换函数
	switchImg: function(num) {
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
	},
	// 切换小圆点
	switchDot: function(num) {
		// 给点击的小圆点加上样式
		dom.addClass(this.dot[num], this.dotStyle);
		// 获取小圆点的兄弟元素
		var spanSibling = dom.sameSibling(this.dot, this.dot[num]);
		// 重置小圆点兄弟元素的样式
		for (var t = 0; t < spanSibling.length; t++) {
			dom.removeClass(spanSibling[t], this.dotStyle);
		}
	},
	// 计算下一张banner图
	timer: function() {
		// 计算要显示的下一张图片
		for (var i = 0; i < this.dotLength; i++) {
			var spanClass = this.dot[i].className;
			if (spanClass == this.dotStyle) {
				var indexNum = i + 1;
				if (indexNum == this.dotLength) {
					indexNum = 0;
				}
				break;
			}
		}
		// 图片切换
		this.switchImg(indexNum);
		// 小圆点切换
		this.switchDot(indexNum);
	},
	timeCarousel: function() {
		var self = this;
		// 定时轮播
		var adtimerBanner = setInterval(this.timer.bind(this), this.times);
		// 如果传入hoverStop参数，则hover时停止时间轮播
		if (this.hoverStop) {
			// hover停止轮播
			var area = this.imgBox;
			eventUnit.addHandler(area, 'mouseenter', function() {
				// 鼠标进入取消时间轮播
				clearInterval(adtimerBanner);
			});
			eventUnit.addHandler(area, 'mouseleave', function() {
				// 鼠标移出，重新建立时间轮播
				adtimerBanner = setInterval(self.timer.bind(self), self.times);
			});
		}
	},
	clickDot: function() {
		var self = this;
		// 点击小圆点切换图片
		for (var i = 0; i < this.dotLength; i++) {
			~ function(i) {
				eventUnit.addHandler(self.dot[i], 'click', function(e) {
					var event = eventUnit.getEvent(e);
					// 切换图片
					self.switchImg(i);
					// 切换小圆点
					self.switchDot(i);
				});
			}(i)
		}
	}
});