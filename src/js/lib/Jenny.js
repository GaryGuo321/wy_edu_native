/*

author: guoweihan@qq.com
data: 2017.2.11

 */
//polyfill代码
~ function polyfill() {
	// Object.create的polyfill代码
	if (!Object.create) {
		Object.create = function(o) {
			function F() {};
			F.prototype = o;
			return new F();
		}
	}
	// indexOf兼容
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(x) {
			var result = -1;
			if (this.length == 0) {
				return result;
			}
			for (var i = 0; i < this.length; i++) {
				if (this[i] === x) {
					result = i;
					break;
				}
			}
			return result;
		}
	}
	// bind兼容
	if (!Function.prototype.bind) {
		Function.prototype.bind = function(oThis) {
			var aArgs = Array.prototype.slice.call(arguments, 1),
				fToBind = this,
				fNOP = function() {},
				fBound = function() {
					return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
						aArgs.concat(Array.prototype.slice.call(arguments)));
				};
			fNOP.prototype = this.prototype;
			fBound.prototype = new fNOP();
			return fBound;
		};
	}
}();

// IE9+

(function(window, undefined) {
	function Jenny(selector, context) {
		return new Jenny.fn.init(selector, context);
	}

	Jenny.fn = Jenny.prototype = {
		constructor: Jenny,
		selector: null,

		// 选择器
		// 目前接受字符串选择器和函数
		init: function(selector, context) {
			var ele = null;
			// "", null, undefined, 0, false
			if (!selector) {
				return this;
			}

			// 选择器
			if (typeof selector === 'string') {
				this.selector = selector;
				if (context) {
					if (context.length && (typeof Jenny === "function" || typeof Jenny === "object") && context instanceof Jenny) {
						for (var i = 0; i < context.length; i++) {
							ele = context[i].querySelectorAll(selector);
							Array.prototype.push.apply(this, ele);
						}
						return this;
					}
					if (typeof context === 'boolean') {
						this.selector = '';
						ele = Jenny.parseHTML(selector);
						Array.prototype.push.apply(this, ele);

						return this;
					}
				} else {
					ele = document.querySelectorAll(selector);
					Array.prototype.push.apply(this, ele);

					return this;
				}

				return this;
			} else if (selector.nodeType) {
				ele = this.constructor();
				Array.prototype.push.call(ele, selector);

				return ele;
			} else if (typeof selector === 'function') {
				// DOM解析完成就执行
				if (document.readyState === "complete") {
					selector();
				} else if (document.addEventListener) {
					document.addEventListener("DOMContentLoaded", selector, false);
				} else {
					document.attachEvent("onreadystatechange", selector);

					var top = false;
					try {
						top = window.frameElement == null && document.documentElement;
					} catch (e) {}
					if (top && top.doScroll) {
						(function doScrollCheck() {
							try {
								top.doScroll("left");
							} catch (e) {
								return setTimeout(doScrollCheck, 50);
							}

							document.detachEvent("onreadystatechange", selector);

							selector();
						})();
					}
				}
			} else {
				return this;
			}
		},
		pushStack: function(eles) {

		}
	}

	Jenny.fn.init.prototype = Jenny.prototype;

	// 扩展
	Jenny.fn.extend = Jenny.extend = function() {
		var target = arguments[0] || {};
		var i = 1;
		var deep = false;
		var length = arguments.length;
		var options, name, clone;

		if (typeof target === 'boolean') {
			deep = target;
			target = arguments[1];
			i = 2;
		}

		if (typeof target !== 'object' && typeof target !== 'function') {
			target = {};
		}

		if (length == i) {
			target = this;
			--i;
		}

		for (; i < length; i++) {
			options = arguments[i];
			if (options != null) {
				for (name in options) {
					if (target[name] == options[name]) {
						continue;
					}

					if (deep && typeof options[name] === 'object') {
						if (options[name] instanceof Array) {
							clone = target[name] ? target[name] : [];
						} else {
							clone = target[name] ? target[name] : {};
						}

						target[name] = Jenny.extend(deep, clone, options[name]);
					} else {
						target[name] = options[name];
					}
				}
			}
		}

		return target;
	}

	// DOM筛选
	Jenny.fn.extend({
		find: function(selector) {
			var ele;

			ele = Jenny(selector, this);

			return ele;
		},
		eq: function(index) {
			var ele = this.constructor();

			if (index < this.length) {
				var arr = [this[index]];
			}

			Array.prototype.push.apply(ele, arr);

			return ele;
		},
		first: function() {
			return this.eq(0);
		},
		last: function() {
			return this.eq(this.length - 1);
		},
		rangeSiblings: function(target) {
			var ret = this.constructor();

			var length = target.length;
			var arr = Jenny.toArray(target);

			for (var i = 0; i < length; i++) {
				var flag = true;
				for (var s = 0; s < this.length; s++) {
					if (arr[i] == this[s]) {
						flag = false;
						break;
					}
				}
				if (flag) {
					Array.prototype.push.call(ret, arr[i]);
				}
			}

			return ret;
		},
		parent: function() {
			var ret = this.constructor();
			var parent = this[0].parentNode;

			Array.prototype.push.call(ret, parent);

			return ret;
		},
		childs: function() {
			var ret = this.constructor();

			var ele = this[0].childNodes;
			var arr = [];
			for (var i = 0; i < ele.length; i++) {
				if (ele[i].nodeType === 1) {
					arr.push(ele[i]);
				}
			}

			Array.prototype.push.apply(ret, arr);

			return ret;
		},
		siblings: function() {
			var ret = this.constructor();

			var child = this.parent().childs();

			for (var i = 0; i < child.length; i++) {
				var flag = true;
				for (var s = 0; s < this.length; s++) {
					if (child[i] == this[s]) {
						flag = false;
						break;
					}
				}

				if (flag) {
					Array.prototype.push.call(ret, child[i]);
				}
			}
			return ret;
		}
	});

	// DOM操作
	Jenny.fn.extend({
		show: function() {
			for (var i = 0; i < this.length; i++) {
				this[i].style.display = 'block';
			}
			return this;
		},
		hide: function() {
			for (var i = 0; i < this.length; i++) {
				this[i].style.display = 'none';
			}

			return this;
		},
		appendTo: function(parent) {
			for (var i = 0; i < this.length; i++) {
				for (var s = 0; s < parent.length; s++) {
					parent[s].appendChild(this[i])
				}
			}

			return this;
		},
		replaceHTML: function(parent) {
			for (var i = 0; i < parent.length; i++) {
				parent[i].innerHTML = this[0];
			}

			return this;
		},
		addClass: function(cName) {
			var newClassName = null;
			for (var i = 0; i < this.length; i++) {
				if (!this[i].className) {
					this[i].className = cName;
				} else {
					newClassName = this[i].className;
					newClassName += " ";
					newClassName += cName;
					this[i].className = newClassName;
				}
			}

			return this;
		},
		removeClass: function(cName) {
			for (var i = 0; i < this.length; i++) {
				if (!cName || typeof cName != 'string') {
					this[i].className = "";
				} else {
					var allClass = this[i].className.split(" ");
					var num = allClass.indexOf(cName);
					if (num != -1) {
						allClass.splice(num, 1);
						allClass = allClass.join(" ");
						this[i].className = allClass;
					}
				}
			}

			return this;
		},
		height: function() {
			return parseFloat(Jenny.getStyle(this, 'height'));
		},
		attr: function(name, val) {
			if (val) {
				val = String(val);
				if (name === "class") {
					this.addClass(val);
				} else {
					this[0].setAttribute(name, val);
				}
				return this;
			} else {
				return this[0].getAttribute(name);
			}
		}
	});



	// 事件绑定
	Jenny.fn.extend({
		addHandler: function(type, handler) {
			for (var i = 0; i < this.length; i++) {
				if (this[i].addEventListener) {
					//传入false指定冒泡，传入true指定捕获
					//DOM 2级事件处理程序
					this[i].addEventListener(type, handler, false);
				} else {
					//DOM 0级事件处理程序
					this[i]["on" + type] = handler;
				}
			}
			return this;
		},
		removeHandler: function(type, handler) {
			for (var i = 0; i < this.length; i++) {
				if (this[i].removeEventListener) {
					this[i].removeEventListener(type, handler, false);
				} else {
					this[i]["on" + type] = null;
				}
			}
			return this;
		}

	});

	// 动画
	Jenny.fn.extend({
		animate: function(json, time, callback) {
			var _self = this;
			var times = time / 10;
			clearInterval(this[0].timer);
			this[0].timer = setInterval(function() {
				var flag = true; //用于判断运动状态是否全都完成
				//利用for...in进行同时动画
				for (var attr in json) {
					// 1 取值
					if (attr == 'opacity') {
						var preValue = Math.round(parseFloat(Jenny.getStyle(_self, attr)) * 100);
						var jsonAttr = json[attr] * 100;
					} else {
						var preValue = parseInt(Jenny.getStyle(_self, attr));
						var jsonAttr = json[attr];
					}

					// 2 检测停止

					if (preValue != jsonAttr) {
						flag = false;
					} else {
						continue;
					}

					// 3 速度计算
					//匀速运动
					if (jsonAttr > preValue) {
						var speed = 10;
					} else {
						var speed = -10;
					}

					//进行动画操作
					if (attr == 'opacity') {
						_self[0].style.opacity = (preValue + speed) / 100;
						_self[0].style.filter = 'alpha(opacity=' + preValue + speed + ')';
					} else {
						_self[0].style[attr] = preValue + speed + "px";
					}

				}
				//判断动画停止
				if (flag) {
					clearInterval(_self[0].timer);
					if (callback) {
						callback();
					}
				}
			}, times);
		}
	})

	// 样式
	Jenny.extend({
		getStyle: function(ele, attr) {
			console.log(ele);
			//能力检测
			if (ele.length != 0) {
				// ie9+
				console.log(getComputedStyle(ele[0], false)[attr]);
				return getComputedStyle(ele[0], false)[attr];
			}
		}
	})

	Jenny.extend({
		parseHTML: function(str) {
			var objE = document.createElement("div");
			objE.innerHTML = str;　　
			return objE.childNodes;
		},
		toArray: function(list) {
			var arr = [];
			var length = list.length;
			if (!Array.prototype.slice) {
				for (var i = 0; i < length; i++) {
					arr.push(list[i]);
				}
			} else {
				arr = Array.prototype.slice.call(list);
			}
			return arr;
		},
		matchVal: function(ele, val, num) {
			for (var i = 0; i < ele.length; i++) {
				if (ele.eq(i).attr(val) == num) {
					return i;
				}
			}
		}
	})

	// ajax
	Jenny.extend({
		post: function(url, data, callback) {
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
						callback(xhr.responseText);
					} else {
						alert('Request was unsuccessful ' + xhr.status);
					}
				}
			};

			xhr.open('post', url, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.send(Jenny.serialize(data));
		},
		get: function(url, data, callback) {
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
						callback(xhr.responseText);
					} else {
						alert('Request was unsuccessful ' + xhr.status);
					}
				}
			};
			// 拼接数据
			data = Jenny.serialize(data);
			url = url + '?' + data;

			xhr.open('get', url, true);
			xhr.send(null);
		},
		// CORS
		CORSRequest: function(url, data, callback) {
			// 数据拼接
			if (data) {
				var serializeData = Jenny.serialize(data);

				url = url + '?' + serializeData;
			}
			// 开始请求
			var xhr = new XMLHttpRequest();

			if ('withCredentials' in xhr) {
				xhr.open('get', url, true);
			} else {
				xhr = new XDomainRequest();
				xhr.open('get', url);
			}

			xhr.onload = function() {
				callback(xhr.responseText);
			};
			xhr.onerror = function() {
				alert('Request was unsuccessful');
			};

			xhr.send(null);
		}
	})

	// form
	Jenny.extend({
		// 表单序列化
		serialize: function(data) {
			var serializeData = '';
			for (key in data) {
				serializeData += (encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&');
			}
			serializeData = serializeData.slice(0, -1);
			return serializeData;
		},
		md5: function(string) {
			function RotateLeft(lValue, iShiftBits) {
				return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
			}

			function AddUnsigned(lX, lY) {
				var lX4, lY4, lX8, lY8, lResult;
				lX8 = (lX & 0x80000000);
				lY8 = (lY & 0x80000000);
				lX4 = (lX & 0x40000000);
				lY4 = (lY & 0x40000000);
				lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
				if (lX4 & lY4) {
					return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
				}
				if (lX4 | lY4) {
					if (lResult & 0x40000000) {
						return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
					} else {
						return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
					}
				} else {
					return (lResult ^ lX8 ^ lY8);
				}
			}

			function F(x, y, z) {
				return (x & y) | ((~x) & z);
			}

			function G(x, y, z) {
				return (x & z) | (y & (~z));
			}

			function H(x, y, z) {
				return (x ^ y ^ z);
			}

			function I(x, y, z) {
				return (y ^ (x | (~z)));
			}

			function FF(a, b, c, d, x, s, ac) {
				a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
				return AddUnsigned(RotateLeft(a, s), b);
			};

			function GG(a, b, c, d, x, s, ac) {
				a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
				return AddUnsigned(RotateLeft(a, s), b);
			};

			function HH(a, b, c, d, x, s, ac) {
				a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
				return AddUnsigned(RotateLeft(a, s), b);
			};

			function II(a, b, c, d, x, s, ac) {
				a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
				return AddUnsigned(RotateLeft(a, s), b);
			};

			function ConvertToWordArray(string) {
				var lWordCount;
				var lMessageLength = string.length;
				var lNumberOfWords_temp1 = lMessageLength + 8;
				var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
				var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
				var lWordArray = Array(lNumberOfWords - 1);
				var lBytePosition = 0;
				var lByteCount = 0;
				while (lByteCount < lMessageLength) {
					lWordCount = (lByteCount - (lByteCount % 4)) / 4;
					lBytePosition = (lByteCount % 4) * 8;
					lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
					lByteCount++;
				}
				lWordCount = (lByteCount - (lByteCount % 4)) / 4;
				lBytePosition = (lByteCount % 4) * 8;
				lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
				lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
				lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
				return lWordArray;
			};

			function WordToHex(lValue) {
				var WordToHexValue = "",
					WordToHexValue_temp = "",
					lByte, lCount;
				for (lCount = 0; lCount <= 3; lCount++) {
					lByte = (lValue >>> (lCount * 8)) & 255;
					WordToHexValue_temp = "0" + lByte.toString(16);
					WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
				}
				return WordToHexValue;
			};

			function Utf8Encode(string) {
				string = string.replace(/\r\n/g, "\n");
				var utftext = "";

				for (var n = 0; n < string.length; n++) {

					var c = string.charCodeAt(n);

					if (c < 128) {
						utftext += String.fromCharCode(c);
					} else if ((c > 127) && (c < 2048)) {
						utftext += String.fromCharCode((c >> 6) | 192);
						utftext += String.fromCharCode((c & 63) | 128);
					} else {
						utftext += String.fromCharCode((c >> 12) | 224);
						utftext += String.fromCharCode(((c >> 6) & 63) | 128);
						utftext += String.fromCharCode((c & 63) | 128);
					}

				}

				return utftext;
			};

			var x = Array();
			var k, AA, BB, CC, DD, a, b, c, d;
			var S11 = 7,
				S12 = 12,
				S13 = 17,
				S14 = 22;
			var S21 = 5,
				S22 = 9,
				S23 = 14,
				S24 = 20;
			var S31 = 4,
				S32 = 11,
				S33 = 16,
				S34 = 23;
			var S41 = 6,
				S42 = 10,
				S43 = 15,
				S44 = 21;

			string = Utf8Encode(string);

			x = ConvertToWordArray(string);

			a = 0x67452301;
			b = 0xEFCDAB89;
			c = 0x98BADCFE;
			d = 0x10325476;

			for (k = 0; k < x.length; k += 16) {
				AA = a;
				BB = b;
				CC = c;
				DD = d;
				a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
				d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
				c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
				b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
				a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
				d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
				c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
				b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
				a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
				d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
				c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
				b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
				a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
				d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
				c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
				b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
				a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
				d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
				c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
				b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
				a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
				d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
				c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
				b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
				a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
				d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
				c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
				b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
				a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
				d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
				c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
				b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
				a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
				d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
				c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
				b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
				a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
				d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
				c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
				b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
				a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
				d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
				c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
				b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
				a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
				d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
				c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
				b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
				a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
				d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
				c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
				b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
				a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
				d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
				c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
				b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
				a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
				d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
				c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
				b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
				a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
				d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
				c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
				b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
				a = AddUnsigned(a, AA);
				b = AddUnsigned(b, BB);
				c = AddUnsigned(c, CC);
				d = AddUnsigned(d, DD);
			}

			var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

			return temp.toLowerCase();
		}
	});

	// cookies
	Jenny.extend({
		//获取cookie的值
		getCookie: function(name) {
			var cookieName = encodeURIComponent(name) + '=',
				cookieStart = document.cookie.indexOf(cookieName),
				cookieValue = null;
			if (cookieStart > -1) {
				//取得name ＝ value;的位置
				var cookieEnd = document.cookie.indexOf(';', cookieStart); //从存在的name那里开始找，找到；符号为止
				if (cookieEnd == -1) {
					cookieEnd = document.cookie.length;
				} //如果没有找到；表示此cookie是最后一个
				cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
			}
			return cookieValue;
		},
		// 设置cookie的值
		setCookie: function(name, value, expires, path, domain, secure) {
			var exdate = new Date();
			exdate.setDate(exdate.getDate() + expires);
			var cookieText = encodeURIComponent(name) + '=' +
				encodeURIComponent(value);
			if (expires && expires != null) {
				cookieText += ';expires=' + exdate.toGMTString();
			}
			if (path) {
				cookieText += ';path=' + path;
			}
			if (domain) {
				cookieText += ';domain=' + domain;
			}
			if (secure) {
				cookieText += ';secure';
			}
			document.cookie = cookieText;

			return cookieText;
		},
		// 消除cookie
		unsetCookie: function(name, path, domain, secure) {
			this.setCookie(name, '', 0, domain, path, secure);
		}
	})

	// 模块化
	// 暴露API:  Amd || Commonjs  || Global || Cmd
	// 支持commonjs
	if (typeof module === "object" && module && typeof module.exports === "object") {
		module.exports = Jenny;
		// 支持amd/cmd
	} else if (typeof define === 'function' && (define.amd || define.cmd)) {
		define("jenny", [], function() {
			return Jenny;
		});
	} else {
		// 直接暴露到全局
		window.Jenny = window._ = Jenny;
	}
})(window)