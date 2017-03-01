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

(function(factory, window) {
	// 模块化输出
	if (typeof define == 'function') {
		if (define.amd) {
			// amd
			define('vedio', ['jenny', 'emitter', 'lifeCycle', 'ejs'], factory);
		}
	} else {
		window.Vedio = factory(Jenny);
	}
})(function(_, Emitter, LifeCycle) {
	function Vedio() {
		LifeCycle.apply(this, arguments);
		Emitter.apply(this, arguments);

		this.status = 1;
	}

	_.extend(Vedio.prototype, Emitter.prototype, LifeCycle.prototype, {
		templateUI: function() {
			var data = {
				src: this.src,
				poster: this.poster,
				width: this.width,
				height: this.height,
				type: this.type,
				controls: this.controls,
				id: this.id
			}

			this.template = _(ejs.render('<div class="g-modal vedio-modal">\
		    <div class="g-align"></div>\
		    <div class="g-wrap">\
		        <div class="g-header">\
					<div class="g-close">\
	            		<a href="javascript:void(0)" class="close icon-cross"></a>\
	        		</div>\
		        </div>\
		        <div class="g-main">\
					<div class="vedio-content">\
				        <h1>请观看下面的视频</h1>\
				        <video width="<%= width %>" height="<%= height %>" controls="<%= controls %>" poster="<%= poster %>" src="<%= src %>" style="background-color: #000;" type="<%= type %>" id="<%= id %>">您的浏览器不支持 video 标签。</video>\
				    </div>\
		        </div>\
		    </div>\
		</div>', data), true);
		},
		eventUI: function() {
			var _self = this;
			_('.vedio-modal .close').addHandler('click', function(e) {
				e.preventDefault();
				_('.vedio-modal').hide();
				_('#' + _self.id)[0].pause();
			});

			_('#' + this.id).addHandler('click', function(e) {
				if (_self.status) {
					this.play();
					_self.status = 0;
				} else {
					this.pause();
					_self.status = 1;
				}
			});
		},
		init: function(obj) {
			_.extend(this, obj);
			this.render(this.container);

			return {
				template: this.template,
				id: this.id
			};
		}
	});

	return Vedio;
}, window);