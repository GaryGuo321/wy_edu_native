// 登陆模块
function Login(cookieName, formObj, loginFrame, back) {
	// cookie名
	this.cookieName = cookieName;
	// cookie值
	this.cookieValue = cookieUtil.get(cookieName);
	// 登陆框
	this.loginFrame = loginFrame;
	// 遮罩层
	this.back = back;
	// 表单元素
	for (var key in formObj) {
		this[key] = formObj[key];
	}
}
// 显示登录框
Login.prototype.showFrame = function() {
	// 显示登陆窗是，监听表单输入和重置表单内容
	formUtil.monitor(this.user, this.userRemind);
	formUtil.monitor(this.pwd, this.pwdRemind);
	formUtil.resetForm(this.user, this.userRemind);
	formUtil.resetForm(this.pwd, this.pwdRemind);
	// 遮罩显示
	dom.show(this.back);
	// 登陆框显示
	dom.show(this.loginFrame);
};
// 关闭登陆框
Login.prototype.closeFrame = function() {
	// 遮罩隐藏
	dom.hide(this.back);
	// 登陆框隐藏
	dom.hide(this.loginFrame);
};
// 错误提示
Login.prototype.errorInfer = function(ele) {
	// 错误提示框显示
	ele.style.display = 'block';
	// 显示动画
	dom.myAnimate(ele, {
		'margin-top': -60,
		'opacity': 1
	}, 150, true);
	// 隐藏动画
	var timer = setTimeout(function() {
		dom.myAnimate(ele, {
			'margin-top': -20,
			'opacity': 0
		}, 150, true, function() {
			ele.style.display = 'none';
		});
	}, 1000);
}