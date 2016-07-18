// 课程列表模块

function SubList(tabParent, listParent, pageList) {
	this.tabParent = tabParent; //装tab的盒子
	this.allTab = dom.childNodes(this.tabParent); //tab盒子里的所有tab
	this.listParent = listParent; //装课程列表的盒子
	this.pageList = pageList; //装页码的盒子

	// 用于默认显示，和切换tab默认显示的参数
	this.defaultShowNum = '';
	this.defaultShowPage = '';
	// 用于点击箭头和数字时切换页数的参数
	this.showPage = '';
	// tab
	this.tabNum = '';
	this.totalPage = '';
	//存放数据
	this.data = '';
}
// 默认显示
SubList.prototype.defaultShow = function(defaultShowNum, defaultShowPage, defaultSortNum) {
	// 用于默认显示，和切换tab默认显示的参数
	this.defaultShowNum = defaultShowNum;
	this.defaultShowPage = defaultShowPage;
	// 用于点击箭头和数字时切换页数的参数
	this.showPage = defaultShowPage;
	// tab
	this.tabNum = defaultSortNum;
	var num = this.tabNum - 1;
	dom.addClass(this.allTab[num], 'tab-click');
};
// tab切换
SubList.prototype.switchSub = function(target, switchStyle) {
	this.showPage = this.defaultShowPage;
	dom.addClass(target, switchStyle);
	var sib = dom.allSibling(target, this.tabParent);
	for (var s = 0; s < sib.length; s++) {
		dom.removeClass(sib[s], switchStyle);
	}
};
// 拼接数据
SubList.prototype.composeEle = function(data) {
	var data = JSON.parse(data);
	var dataList = data.list;
	// console.log(dataList);
	var dataLength = dataList.length;
	this.listParent.innerHTML = '';
	// 拼接页数
	this.totalPage = data.totalPage;
	var totalPage = this.totalPage;
	var nowPage = data.pagination.pageIndex;
	// 最多展示多少页
	var pageListNum = 8;
	this.pageList.innerHTML = '';
	switch (true) {
		case nowPage <= 5:
			{
				for (var s = 0; s < pageListNum; s++) {
					var li = dom.insertElement(this.pageList, 'li', 'last', {
						'value': s + 1,
					});
					var liText = dom.insertText(li, s + 1);

				}
				break;
			}
		case nowPage > totalPage - 4:
			{
				for (var s = pageListNum; s > 0; s--) {
					var li = dom.insertElement(this.pageList, 'li', 'last', {
						'value': totalPage - s + 1,
					});
					var liText = dom.insertText(li, totalPage - s + 1);
				}
				break;
			}
		default:
			{
				var middlePage = nowPage - 4;
				for (var s = 0; s < pageListNum; s++) {
					console.log(middlePage);
					var li = dom.insertElement(this.pageList, 'li', 'last', {
						'value': middlePage,
					});
					var liText = dom.insertText(li, middlePage++);
				}
			}
	}

	// 显示箭头
	var pageArrow = dom.getClass(document, 'arrows');
	for (var t = 0; t < pageArrow.length; t++) {
		pageArrow[t].style.display = 'block';
	}

	// 给当前页添加样式
	var allLi = dom.getTagName(this.pageList, 'li');
	var allLiLength = allLi.length;
	for (var t = 0; t < allLiLength; t++) {
		if (dom.getAttr(allLi[t], 'value') == nowPage) {
			dom.addClass(allLi[t], 'select-li');
			break;
		};
	}

	// 拼接课程信息
	for (var i = 0; i < dataLength; i++) {
		// 定义价格格式
		if (dataList[i].price == 0) {
			dataList[i].price = '免费';
		} else {
			dataList[i].price = '¥' + Number.prototype.toFixed.call(dataList[i].price, 2);
		}
		// 分类
		if (!dataList[i].categoryName) {
			dataList[i].categoryName = '无';
		}
		// 原始元素
		var subBox = dom.insertElement(this.listParent, 'div', 'last', {
			'class': 'subject-box'
		});
		var box = dom.insertElement(subBox, 'a', 'last', {
			'class': 'subject',
			'href': 'javascript:void(0)',
			'title': dataList[i].name,
			'data-id': dataList[i].id,
			'data-name': dataList[i].name,
			'data-provider': dataList[i].provider,
			'data-learnerCount': dataList[i].learnerCount,
			'data-price': dataList[i].price,
			'data-categoryName': dataList[i].categoryName,
			'data-description': dataList[i].description
		});
		var img = dom.insertElement(box, 'img', 'last', {
			'src': dataList[i].middlePhotoUrl,
			'class': 'sub-img'
		});
		var title = dom.insertElement(box, 'p', 'last', {
			'title': dataList[i].name,
			'class': 'title'
		});
		var titleText = dom.insertText(title, dataList[i].name);
		var album = dom.insertElement(box, 'p', 'last', {
			'class': 'album'
		});
		var albumText = dom.insertText(album, dataList[i].provider);
		var learner = dom.insertElement(box, 'p', 'last', {
			'class': 'num'
		});
		var iEle = dom.insertElement(learner, 'i', 'last', {
			'class': 'icon-user'
		});
		var learnerNum = dom.insertText(learner, ' ' + dataList[i].learnerCount);
		var price = dom.insertElement(box, 'p', 'last', {
			'class': 'price'
		});
		var priceNum = dom.insertText(price, dataList[i].price);
		// 小屏幕hover时显示的元素
		var hovBox = dom.insertElement(subBox, 'a', 'last', {
			'class': 'sub-hover'
		});
		var topBox = dom.insertElement(hovBox, 'div', 'last', {
			'class': 'top'
		})
		var hovImg = dom.insertElement(topBox, 'img', 'last', {
			'src': dataList[i].middlePhotoUrl,
		});
		var hovTitle = dom.insertElement(topBox, 'h3', 'last');
		var hovTitleText = dom.insertText(hovTitle, dataList[i].name);
		var hovLearner = dom.insertElement(topBox, 'p', 'last', {
			'class': 'num'
		});
		var hoviEle = dom.insertElement(hovLearner, 'i', 'last', {
			'class': 'icon-user'
		});
		var hovLearnerNum = dom.insertText(hovLearner, ' ' + dataList[i].learnerCount + '人在学');
		var provider = dom.insertElement(topBox, 'p', 'last', {
			'class': 'provider'
		});
		var providerText = dom.insertText(provider, '发布者：' + dataList[i].provider);
		var hovSort = dom.insertElement(topBox, 'p', 'last', {
			'class': 'sort'
		});
		var hovSortText = dom.insertText(hovSort, '分类：' + dataList[i].categoryName);
		var description = dom.insertElement(hovBox, 'p', 'last', {
			'class': 'description'
		});
		var descriptionText = dom.insertText(description, dataList[i].description);
	}
};