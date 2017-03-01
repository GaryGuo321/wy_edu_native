// 课程列表模块

// <div class="subject-box">
//     <a class="subject" href="javascript:void(0)" title="Windows Phone 7 带来了什么?　" data-id="250006" data-name="Windows Phone 7 带来了什么?　" data-provider="极客公园" data-learnercount="462" data-price="免费" data-categoryname="null" data-description="　本期极客活动将邀请国内在 Windows Phone 7 平台有重要表现的嘉宾们，他们将于我们共同探讨 WP 7 手机的到来带来了什么样的革新和体验，并一起来看看他们又做了哪些创新。"><img src="http://img2.ph.126.net/1Md8406dmo1TPHnYD67fdw==/6598260537750239978.jpg" class="sub-img">
//         <p title="Windows Phone 7 带来了什么?　" class="title">Windows Phone 7 带来了什么?</p>
//         <p class="album">极客公园</p>
//         <p class="num"><i class="icon-user"></i> 462</p>
//         <p class="price">免费</p>
//     </a>
//     <a class="sub-hover">
//         <div class="top">
//             <img src="http://img2.ph.126.net/1Md8406dmo1TPHnYD67fdw==/6598260537750239978.jpg">
//             <h3>Windows Phone 7 带来了什么?　</h3>
//             <p class="num"><i class="icon-user"></i> 462人在学</p>
//             <p class="provider">发布者：极客公园</p>
//             <p class="sort">分类：无</p>
//         </div>
//         <p class="description">本期极客活动将邀请国内在 Windows Phone 7 平台有重要表现的嘉宾们，他们将于我们共同探讨 WP 7 手机的到来带来了什么样的革新和体验，并一起来看看他们又做了哪些创新。</p>
//     </a>
// </div>

(function(factory, window) {
	// 模块化输出
	if (typeof define == 'function') {
		if (define.amd) {
			// amd
			define('subjectList', ['jenny', 'emitter', 'lifeCycle', 'ejs'], factory);
		}
	} else {
		window.SubjectList = factory(Jenny);
	}
})(function(_, Emitter, LifeCycle) {
	function SubjectList() {
		LifeCycle.apply(this, arguments);
		Emitter.apply(this, arguments);

		this.requestData = {};
		this.url = null;

		// element
		this.pageContainer = null;
	}

	_.extend(SubjectList.prototype, Emitter.prototype, LifeCycle.prototype, {
		dataUI: function(fn) {
			var _self = this;
			console.log(this.requestData);
			_.CORSRequest(this.url, this.requestData, function(data) {
				_self.data = JSON.parse(data);
				for (var i = 0; i < _self.data.list.length; i++) {
					if (_self.data.list[i].price == 0) {
						_self.data.list[i].price = '免费';
					} else {
						_self.data.list[i].price = '¥' + Number.prototype.toFixed.call(_self.data.list[i].price, 2);
					}
				}

				fn();
			})
		},
		templateUI: function() {
			var data = {
				dataList: this.data.list
			};
			this.container[0].innerHTML = '';
			this.template = _(ejs.render('<% for(var i = 0; i < dataList.length; i++) { %>\
		<div class="subject-box">\
			<a class="subject" href="javascript:void(0)" title="<%= dataList[i].name %>" data-id="<%= dataList[i].id %>" data-name="<%= dataList[i].name %>" data-provider="<%= dataList[i].provider %>" data-learnercount="<%= dataList[i].learnerCount %>" data-price="<%= dataList[i].price %>" data-categoryname="<%= dataList[i].categoryName %>" data-description="<%= dataList[i].description %>"><img src="<%= dataList[i].middlePhotoUrl %>" class="sub-img">\
		        <p title="<%= dataList[i].name %>" class="title"><%= dataList[i].name %></p>\
		        <p class="album"><%= dataList[i].provider %></p>\
		        <p class="num"><i class="icon-user"></i> <%= dataList[i].learnerCount %></p>\
		        <p class="price"><%= dataList[i].price %></p>\
    		</a>\
    		<a class="sub-hover">\
		        <div class="top">\
		            <img src="<%= dataList[i].middlePhotoUrl %>">\
		            <h3><%= dataList[i].name %></h3>\
		            <p class="num"><i class="icon-user"></i> <%= dataList[i].learnerCount %>人在学</p>\
		            <p class="provider">发布者：<%= dataList[i].provider %></p>\
		            <p class="sort">分类：<%= dataList[i].categoryName %></p>\
		        </div>\
		        <p class="description"><%= dataList[i].description %></p>\
		    </a>\
		</div>\
		<% } %>', data), true)
		},
		eventUI: function() {
			// 换页
			if (typeof this.onPagination == 'function') {
				this.onPagination();
			}
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
	})

	return SubjectList;
}, window);