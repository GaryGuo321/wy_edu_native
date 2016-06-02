/*

author: GuoWeihan
data: 2016.4.25

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
		Function.prototype.bind = function(context) {
			var self = this;
			var args = Array.prototype.slice.call(arguments);
			return function() {
				return self.apply(context, args.slice(1));
			}
		};
	}
}();
//事件绑定
var eventUnit = {
	/*
	传入要绑定事件的元素，要绑定的事件名，事件处理函数
	*/
	//绑定事件
	addHandler: function(element, type, handler) {
		if (element.addEventListener) {
			//传入false指定冒泡，传入true指定捕获
			//DOM 2级事件处理程序
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			//DOM 0级事件处理程序
			element["on" + type] = handler;
		}
	},
	//跨浏览器事件对象
	//返回对event的引用方式
	getEvent: function(event) {
		return event ? event : window.event;
	},
	//获取目标元素
	getTarget: function(event) {
		return event.target || event.srcElement;
	},
	//阻止默认事件的发生
	preventDafault: function(event) {
		if (event.preventDafault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},
	//解除绑定事件
	removeHandler: function(element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	},
	//阻止事件冒泡
	stopPropagation: function(event) {
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}
};
//DOM操作
var dom = {
	/*
	获取元素
	 */
	// 通过id获取元素
	getId: function(id) {
		return document.getElementById(id);
	},
	// 通过标签名获取元素
	getTagName: function(root, tag) {
		return root.getElementsByTagName(tag);
	},
	// 通过class名获取元素
	getClass: function(root, c_name) {
		if (root.getElementsByClassName) {
			return root.getElementsByClassName(c_name);
		} else {
			//用于输出找到的匹配的DOM元素
			var arr = [];
			// 查找元素,并计算数组长度
			var allTag = root.getElementsByTagName('*');
			var tagLength = allTag.length;
			// 对传进来的c_name参数进行分割,并计算数组长度
			var cNameList = c_name.split(' ');
			var cNameLength = cNameList.length;
			// 对所有的tag元素进行遍历
			for (var i = 0; i < tagLength; i++) {
				// 对每一个tag的class属性进行分割,并计算数组长度
				var classList = allTag[i].className.split(' ');
				var listLength = classList.length;
				// 定义一个空数组
				var judge = [];
				for (var t = 0; t < cNameLength; t++) {
					// 如果cNamelist可以在classList中找到，就给judge push一个true 
					if (classList.indexOf(cNameList[t]) !== -1) {
						judge.push(true);
					}
				}
				// 判断judge是否相等cNameLength，如果相等，表示是我们需要的元素
				if (judge.length === cNameLength) {
					arr.push(allTag[i]);
				}
			}
			return arr;
		}
	},
	// querySelector ie8+
	getQuery: function(root, selector) {
		return root.querySelector(selector);
	},
	// querySelectorAll ie8+
	getQueryAll: function(root, selector) {
		return root.querySelectorAll(selector);
	},
	/*
	动态创建节点, 并插入到节点树
	 */
	// 创建元素节点, 并插入到父元素的最后面/最前面
	insertElement: function(parentEle, ele, position, attrObj) {
		var element = document.createElement(ele);
		if (attrObj) {
			for (var key in attrObj) {
				if (key === "class") {
					this.addClass(element, attrObj[key]);
				} else {
					element.setAttribute(key, attrObj[key]);
				}
			}
		}
		if (position === "last") {
			parentEle.appendChild(element);
		}
		if (position === "first") {
			parentEle.insertBefore(element, this.firstChild(parentEle));
		}
		return element;
	},
	// 创建元素节点, 并插入到父元素的某个元素的前面
	insertEleBefore: function(ele, tarEle, attrObj) {
		var element = document.createElement(ele);
		var parentEle = tarEle.parentNode;
		if (attrObj) {
			for (var key in attrObj) {
				if (key === "class") {
					this.addClass(element, attrObj[key]);
				} else {
					element.setAttribute(key, attrObj[key]);
				}
			}
		}
		parentEle.insertBefore(element, tarEle);
		return element;
	},
	// 创建元素节点, 并插入到父元素的某个元素的后面
	insertEleAfter: function(ele, tarEle, attrObj) {
		var element = document.createElement(ele);
		if (attrObj) {
			for (var key in attrObj) {
				if (key === "class") {
					this.addClass(element, attrObj[key]);
				} else {
					element.setAttribute(key, attrObj[key]);
				}
			}
		}
		this.insertAfter(ele, tarEle);
		return element;
	},
	// 创建文本节点，不会覆盖内容, 默认把文本插入到父元素的最后面
	insertText: function(parentEle, text) {
		var content = document.createTextNode(text);
		parentEle.appendChild(content);
		return content;
	},
	// 设置元素属性
	setAttr: function(ele, obj) {
		for (var key in obj) {
			if (key === "class") {
				this.addClass(ele, obj[key]);
			} else {
				ele.setAttribute(key, obj[key]);
			}
		}
	},
	getAttr: function(ele, attrName) {
		return ele.getAttribute(attrName);
	},
	// 查看节点类型
	nodeType: function(node) {
		if (node.nodeType === 1) {
			return 'Element Node';
		} else if (node.nodeType === 2) {
			return 'Attribute Node';
		} else if (node.nodeType === 3) {
			return 'Text Node';
		} else {
			return null;
		}
	},
	// 把nodeList数组对象转换成真正的数组
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
	// 获取文本／修改文本
	text: function(ele, texts) {
		if (texts) {
			ele.firstChild.nodeValue = texts;
			return ele.firstChild.nodeValue;
		} else {
			return ele.firstChild.nodeValue;
		}
	},
	// 获取全部子元素
	childNodes: function(ele) {
		var arr = [];
		var allNodes = ele.childNodes;
		var nodesLength = allNodes.length;
		for (var i = 0; i < nodesLength; i++) {
			if (allNodes[i].nodeType === 1) {
				arr.push(allNodes[i]);
			}
		}
		return arr;
	},
	// 获取第一个子元素
	firstChild: function(ele) {
		var arr = this.childNodes(ele);
		return arr[0];
	},
	// 获取最后一个子元素
	lastChild: function(ele) {
		var arr = this.childNodes(ele);
		var length = arr.length;
		return arr[length - 1];
	},
	// 获取第n个子元素
	nthChild: function(ele, n) {
		var arr = this.childNodes(ele);
		var length = arr.length;
		if (n < (length + 1)) {
			return arr[n - 1];
		} else {
			return null;
		}
	},
	// 获取上一个兄弟元素
	previousSibling: function(ele, parent) {
		var arr = this.childNodes(parent);
		var length = arr.length;
		for (var i = 0; i < length; i++) {
			if (ele === arr[i]) {
				if (i === 0) {
					return null;
				} else {
					return arr[i - 1];
				}
			}
		}
	},
	// 获取下一个兄弟元素
	nextSibling: function(ele, parent) {
		var arr = this.childNodes(parent);
		var lengths = arr.length;
		for (var i = 0; i < lengths; i++) {
			if (ele === arr[i]) {
				if (i === (length - 1)) {
					return null;
				} else {
					return arr[i + 1];
				}
			}
		}
	},
	// 获取其余全部兄弟元素
	allSibling: function(ele, parent) {
		var arr = this.childNodes(parent);
		var length = arr.length;
		for (var i = 0; i < length; i++) {
			if (ele === arr[i]) {
				arr.splice(i, 1);
				break;
			}
		}
		return arr;
	},
	// 相同类型的兄弟元素,接受数组ele参数
	sameSibling: function(arr, thisEle) {
		var length = arr.length;
		var ele = this.toArray(arr);
		for (var i = 0; i < length; i++) {
			if (thisEle === ele[i]) {
				ele.splice(i, 1);
				break;
			}
		}
		return ele;
	},
	// 获取父元素
	parentNode: function(ele) {
		return ele.parentNode;
	},
	//insertBefore方法：
	insertBefore: function(newElement, targetElement) {
		var parent = targetElement.parentNode;
		parent.insertBefore(newElement, targetElement);
	},
	// insertAfter方法：
	insertAfter: function(newElement, targetElement) {
		var parent = targetElement.parentNode;
		if (parent.lastChild == targetElement) {
			parent.appendChild(newElement);
		} else {
			parent.insertBefore(newElement, targetElement.nextSibling);
		}
	},
	removeElement: function(ele) {
		var parent = ele.parentNode;
		parent.removeChild(ele);
	},
	removeAllChild: function(ele) {
		ele.innerHTML = "";
	},
	// addClass方法(不覆盖)
	addClass: function(ele, name) {
		if (!ele.className) {
			ele.className = name;
		} else {
			newClassName = ele.className;
			newClassName += " ";
			newClassName += name;
			ele.className = newClassName;
		}
	},
	// addClass方法(覆盖)
	addCoverClass: function(ele, name) {
		ele.className = name;
	},
	// removeClass方法
	removeClass: function(ele, name) {
		if (!name) {
			ele.className = "";
		} else {
			var allClass = ele.className.split(" ");
			var num = allClass.indexOf(name);
			if (num != -1) {
				allClass.splice(num, 1);
				allClass = allClass.join(" ");
				ele.className = allClass;
			}
		}
	},
	show: function(ele) {
		ele.style.display = 'block';
	},
	hide: function(ele) {
		ele.style.display = 'none';
	},
	// 动画
	//ele : 执行动画的元素，json : 动画属性，对象的格式
	//speedType : 默认匀速，time : 动画时间，这个有点bug
	//callback : 链式运动
	myAnimate: function(ele, json, time, speedType, callback) {
		var _self = this;
		var times = time / 10;
		clearInterval(ele.timer);
		ele.timer = setInterval(function() {
			var flag = true; //用于判断运动状态是否全都完成
			//利用for...in进行同时动画
			for (var attr in json) {
				// 1 取值
				if (attr == 'opacity') {
					var preValue = Math.round(parseFloat(_self.getStyle(ele, attr)) * 100);
					var jsonAttr = json[attr] * 100;
				} else {
					var preValue = parseInt(_self.getStyle(ele, attr));
					var jsonAttr = json[attr];
				}
				// 2 速度计算
				if (speedType) {
					//缓冲运动
					var speed = (jsonAttr - preValue) / 10;
					speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
				} else {
					//匀速运动
					if (jsonAttr > preValue) {
						var speed = 10;
					} else {
						var speed = -10;
					}
				}
				// 3 检测停止

				if (preValue != jsonAttr) {
					flag = false;
				}
				//判断动画停止
				if (flag) {
					clearInterval(ele.timer);
					if (callback) {
						callback();
					}
				} else {
					//进行动画操作
					if (attr == 'opacity') {
						ele.style.opacity = (preValue + speed) / 100;
						ele.style.filter = 'alpha(opacity=' + preValue + speed + ')';
					} else {
						ele.style[attr] = preValue + speed + "px";
					}
				}
			}
		}, times);
	},
	// 获取css样式
	getStyle: function(ele, attr) {
		//能力检测
		if (ele.currentStyle) {
			return ele.currentStyle[attr];
		} else {
			return getComputedStyle(ele, false)[attr];
		}
	}
};
// 表单
var formUtil = {
	// 表单监听，提示的显示与隐藏
	monitor: function(ele, refer) {
		// 判断是否支持事件
		var isSupport = 'oninput' in document ? true : false;
		if (isSupport) {
			// ie9+
			eventUnit.addHandler(ele, 'input', function() {
				var value = ele.value;
				if (value == '') {
					refer.style.display = 'inline-block';
				} else {
					refer.style.display = 'none';
				}
			});
		} else {
			// ie8-
			eventUnit.addHandler(ele, 'propertychange', function() {
				var value = ele.value;
				if (value == '') {
					refer.style.display = 'inline-block';
				} else {
					refer.style.display = 'none';
				}
			});
		}
	},
	// 清空表单
	resetForm: function(ele, refer) {
		// 清空表单内容
		ele.value = '';
		// 显示提示信息
		if (refer) {
			refer.style.display = 'inline-block';
		}
	}
};
//cookie
var cookieUtil = {
	//获取cookie的值
	get: function(name) {
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
	set: function(name, value, expires, path, domain, secure) {
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
	},
	// 消除cookie
	unset: function(name, path, domain, secure) {
		this.set(name, '', 0, domain, path, secure);
	}
};
//ajax请求
var ajax = function(method, action, data, callback, asyn) {
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
	if (asyn) {
		xhr.open(method, action, false);
	} else {
		xhr.open(method, action, true);
	}
	xhr.send(data);
};
// md5加密
var md5 = function(string) {

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
};
//window.onload的包装函数;
var addLoad = function(fn) {
	//把函数之前的window.onload赋值给oldOnload
	var oldOnload = window.onload;
	//添加新的window.onload或者覆盖旧的window.onload
	if (typeof window.onload != 'function') {
		window.onload = fn;
	} else {
		window.onload = function() {
			oldOnload();
			fn();
		}
	}
};