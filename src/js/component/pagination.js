// 翻页

(function(factory, window) {
	// 模块化输出
	if (typeof define == 'function') {
		if (define.amd) {
			// amd
			define('pagination', ['jenny', 'emitter', 'lifeCycle', 'ejs'], factory);
		}
	} else {
		window.Pagination = factory(Jenny);
	}
})(function(_, Emitter, LifeCycle) {
	function Pagination() {
		LifeCycle.apply(this, arguments);
		Emitter.apply(this, arguments);

		this.totalPages = null;
		this.visiblePages = null;
		this.currentPage = null;

		// element
		this.pre = null;
		this.next = null;
	}

	_.extend(Pagination.prototype, Emitter.prototype, LifeCycle.prototype, {
		templateUI: function() {
			var data = {
				visiblePages: this.visiblePages,
				totalPages: this.totalPages,
				currentPage: this.currentPage
			}
			this.container[0].innerHTML = '';
			this.template = _(ejs.render('<div class="arrow-right arrows" id="arrow-right">\
            <p>&gt;</p>\
        </div>\
        <ul id="pageList">\
        	<% for(var i = 0; i < (visiblePages > totalPages? totalPages : visiblePages); i++) { %>\
        	<li value="<%= i+1 %>" <% if(currentPage == i+1) { %>class="select-li"<% } %>><%= i+1 %></li>\
        	<% } %>\
        </ul>\
        <div class="arrow-left arrows" id="arrow-left">\
            <p>&lt;</p>\
        </div>', data), true)
		},
		eventUI: function() {
			var _self = this;
			this.on('getData', this.onPageChange);
			this.on('pageSwitch', function(num) {
				var ele = this.container.find('#pageList').childs().removeClass('select-li');
				var index = _.matchVal(ele, 'value', num);
				// console.log(index);

				ele.eq(index).addClass('select-li');
			})
			this.on('pageShow', function() {
				var nowPage = this.currentPage;
				var totalPage = this.totalPages;
				var visiblePages = this.visiblePages;
				var halfPage = Math.round(this.visiblePages / 2);
				var num = null;
				var nowNum = null;
				var flag = false;

				var ele = this.container.find('#pageList').childs();;
				if (totalPage > visiblePages) {
					flag = true;
					if (nowPage > halfPage && nowPage <= totalPage - halfPage) {
						num = halfPage;
						nowNum = nowPage;
						for (var i = nowPage; i > nowPage - halfPage; i--) {
							ele.eq(num - 1).attr('value', i);
							ele[num - 1].innerHTML = i;
							num--;
						}
						for (var s = halfPage + 1; s <= visiblePages; s++) {
							ele.eq(s - 1).attr('value', ++nowNum);
							ele[s - 1].innerHTML = nowNum;
						}

					}
					if (nowPage <= halfPage && flag) {
						falg = false;
						for (var i = 0; i < visiblePages; i++) {
							ele.eq(i).attr('value', i + 1);
							ele[i].innerHTML = i + 1;
						}
					}
					if (nowPage > totalPage - halfPage && flag) {
						flag = true;
						var s = 0;
						for (var i = totalPage - visiblePages; i < totalPage; i++) {
							ele.eq(s).attr('value', i + 1);
							ele[s++].innerHTML = i + 1;
						}
					}
				}

				_self.fire('pageSwitch', nowPage);

				if (this.onPageChange) {
					_self.fire('getData');
				}
			});

			this.container.find('#arrow-right').addHandler('click', function(e) {
				e.preventDefault();
				if (_self.currentPage < _self.totalPages) {
					_self.currentPage += 1;
					_self.container.attr('value', _self.currentPage);
					_self.fire('pageShow');
				}
			});

			this.container.find('#arrow-left').addHandler('click', function(e) {
				e.preventDefault();
				if (_self.currentPage > 1) {
					_self.currentPage -= 1;
					_self.container.attr('value', _self.currentPage);
					_self.fire('pageShow');
				}
			});

			this.container.find('#pageList').childs().addHandler('click', function(e) {
				e.preventDefault();
				if (_self.currentPage != _(this).attr('value')) {
					_self.currentPage = Number(_(this).attr('value'));
					_self.container.attr('value', _self.currentPage);
					_self.fire('pageShow');
				}
			})
		},
		styleUI: function() {
			this.container.attr('value', this.currentPage);
		},
		init: function(obj) {
			_.extend(this, obj);
			this.render(this.container);

			return this;
		}
	});

	return Pagination;
}, window);