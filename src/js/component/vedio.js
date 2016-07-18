// 播放视频模块

/*
	视频播放
    <div class="vedio-frame" id="vedio-frame">
        关闭按钮
        <div class="vedio-close">
            <a href="javascript:void(0)" class="close icon-cross" id="vedio-close"></a>
        </div>
        视频播放区域
        <div class="vedio-content">
            <h1>请观看下面的视频</h1>
        </div>
    </div>
 */
//<video width="550px" height="350px" controls="controls" poster="./src/images/DSC_21@2x.png" src="http://mov.bn.netease.com/open-movie/nos/mp4/2014/12/30/SADQ86F5S_shd.mp4" style="background-color: black;" type="video/mp4" jktag="0001|0.1|71045" id="myVideo">您的浏览器不支持 video 标签。</video>

function VedioPaly(obj) {
	var self = this;
	this.back = dom.getId('fixed-back');
	this.frame = dom.getId('vedio-frame');
	this.vedioContent = dom.getClass(this.frame, 'vedio-content')[0];
	help.extend(this, obj);
	this.close = dom.getId('vedio-close');

	this.status = 1;
	// 插入vedio元素
	(function() {
		var template = help.html2node('<video width="' + self.vedio.width + '" height="' + self.vedio.height + '" controls="controls" poster="' + self.vedio.poster + '" src="' + self.vedio.src + '" style="background-color: #000;" type="' + self.vedio.type + '" id="' + self.vedio.id + '">您的浏览器不支持 video 标签。</video>');
		self.vedioContent.appendChild(template);
		self.vedio = dom.getId(self.vedio.id);
	})();

	this.showVedio();
	this.closeVedio();
	this.clickVedioPlay();
	this.watch();
}

// 点击某个区域显示
VedioPaly.prototype.showVedio = function() {
	eventUnit.addHandler(this.showEle, 'click', function() {
		this.vedio.load();
		dom.show(this.back);
		dom.show(this.frame);
	}.bind(this));
};
// 点击隐藏
VedioPaly.prototype.closeVedio = function() {
	eventUnit.addHandler(this.close, 'click', function() {
		this.vedio.pause();
		dom.hide(this.back);
		dom.hide(this.frame);
		return false;
	}.bind(this));
};
// 点击视频范围播放或暂停视频
VedioPaly.prototype.clickVedioPlay = function() {
	eventUnit.addHandler(this.vedio, 'click', function(e) {
		if (this.status) {
			this.vedio.play();
		} else {
			this.vedio.pause();
		}
	}.bind(this));
};
VedioPaly.prototype.watch = function() {
	// 监听视频播放状态
	eventUnit.addHandler(this.vedio, 'pause', function(e) {
		this.status = 1;
	}.bind(this));
	eventUnit.addHandler(this.vedio, 'play', function(e) {
		this.status = 0;
	}.bind(this));
};