// 关注模块
function Follow(cookieName, parentBox) {
	// cookie名
	this.cookieName = cookieName;
	// cookie值
	this.cookieValue = cookieUtil.get(cookieName);
	// 关注的盒子
	this.parentBox = parentBox;

}
// 创建关注元素
Follow.prototype.creFollowEle = function() {
	// 创建元素的过程
	var p = dom.insertElement(this.parentBox, 'p', 'first', {
		'class': 'follow'
	});
	var pText = dom.insertText(p, '+关注');
};
// 创建已关注元素
Follow.prototype.creAlreadyFollowEle = function() {
	// 创建元素的过程
	var p = dom.insertElement(this.parentBox, 'p', 'first', {
		'class': 'follow-now'
	});
	var i = dom.insertElement(p, 'i', 'last', {
		'class': 'true-img'
	});
	var pText1 = dom.insertText(p, '已关注 ');
	var span = dom.insertElement(p, 'span', 'last');
	var spanText = dom.insertText(span, '|');
	var pText2 = dom.insertText(p, ' ');
	var a = dom.insertElement(p, 'a', 'last', {
		'class': 'cancel',
		'href': 'javascript:void(0)'
	});
	var aText = dom.insertText(a, '取消');
};
// 建立关注行为
Follow.prototype.creFollow = function(followEle) {
	// 删除关注按钮
	dom.removeElement(followEle);
	// 设置关注cookie值
	cookieUtil.set(this.cookieName, true);
	// 创建已关注按钮
	this.creAlreadyFollowEle();
};
// 建立取消关注行为
Follow.prototype.creCancelFollow = function(notFollowEle) {
	// 删除cookie值
	cookieUtil.unset(this.cookieName);
	// 删除已关注按钮
	dom.removeElement(notFollowEle);
	// 创建关注按钮
	this.creFollowEle();
};