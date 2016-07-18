// 顶部cookie的key是：wangyi_notice_show
// 顶部通知条显示与隐藏
function TopNotice(cookieName, box, close) {
	// cookie名
	this.cookieName = cookieName;
	// cookie值
	this.cookieValue = cookieUtil.get(cookieName);
	// 整个notice的box
	this.notice = box;
	// 关闭notice按钮
	this.close = close;
}
// 隐藏notice，并设置cookie值
TopNotice.prototype.hideNotice = function(times) {
	// 设置cookie值
	cookieUtil.set(this.cookieName, true, times);
	// 隐藏通知条
	dom.hide(this.notice);
};