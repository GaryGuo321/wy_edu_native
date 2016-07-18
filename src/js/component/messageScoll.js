// 信息滚动模块


/*
基本模版
<div class="rank-list-box" id="list-box">
    <ul id="mes1"></ul>
    <ul id="mes2"></ul>
</div>
 */

function MessageScoll(obj) {
	this.box = dom.getId('list-box'); //滚动盒子
	this.mes1 = dom.getId('mes1'); //list1
	this.mes2 = dom.getId('mes2'); //list2，用于复制list1的内容
	// 给传入参数赋值
	help.extend(this, obj);

	// 获取数据并插入DOM中
	this.getMessage();
	if (this.scroll) {
		this.intervalScoll();
	}
}

help.extend(MessageScoll.prototype, {
	// ajax获取数据，插入到DOM中
	getMessage: function() {
		var self = this;
		// 获取滚动信息内容 hotcoures, 并将获取的数据插入到DOM树中
		ajax.CORSRequest(this.url, this.data, function(data) {
			// json->对象
			var addData = JSON.parse(data);
			console.log(addData);
			// 清空list1的内容
			self.mes1.innerHTML = '';
			// 将data进行数据的拼接，并加入list1中
			self.createEle(self.mes1, addData);
			// 将list1的内容复制给list1
			self.mes2.innerHTML = this.mes1.innerHTML;
		});
	},
	// 将ajax拿到的hotCoures数据进行拼接并插入DOM树
	createEle: function(parent, data) {
		// 以下都为拼接行为
		// 计算数据数量
		var dataLength = data.length;
		for (var i = 0; i < dataLength; i++) {
			// 创建template
			var ele = help.html2node('<li><a class="rank-list" href="javascript:void(0)" title="' + data[i].name + '" data-id="' + data[i].id + '" data-name="' + data[i].name + '" data-provider="' + data[i].provider + '" data-learnercount="' + data[i].learnerCount + '" data-price="' + data[i].price + '" data-categoryname="' + data[i].categoryName + '" data-description="' + data[i].description + '"><div><img src="' + data[i].middlePhotoUrl + '"></div><h2>' + data[i].name + '</h2><p><i class="icon-user"></i>' + ' ' + data[i].learnerCount + '</p></a></li>');
			// 插入DOM中
			parent.appendChild(ele);
		}
	},
	// 间歇性滚动, 并判断鼠标滑入是否停止动画
	intervalScoll: function() {
		var _self = this;
		var adtimer = null;
		var setTime = null;
		var time = this.scroll.finishTime / this.scroll.height;
		// 动画
		var timer = function() {
			_self.box.scrollTop++;
			if (_self.box.scrollTop % _self.scroll.height == 0) {
				clearInterval(adtimer);
				setTime = setTimeout(delay, _self.scroll.delayTime);
			} else if (_self.box.scrollTop >= _self.mes1.offsetHeight) {
				_self.box.scrollTop = 0;
			}
		};
		// 延迟
		var delay = function() {
			adtimer = setInterval(timer, time);
		};
		// 动画开始
		setTime = setTimeout(delay, this.scroll.delayTime);
		// 停止滚动
		if (this.scroll.hoverStop) {
			eventUnit.addHandler(this.box, 'mouseenter', function() {
				clearInterval(adtimer);
				clearTimeout(setTime);
			});
			eventUnit.addHandler(this.box, 'mouseleave', function() {
				setTime = setTimeout(delay, _self.scroll.delayTime);
			});
		}
	}
});