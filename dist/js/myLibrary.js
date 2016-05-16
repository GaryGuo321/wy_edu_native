define(function(){~function(){Object.create||(Object.create=function(e){function t(){}return t.prototype=e,new t}),Array.prototype.indexOf||(Array.prototype.indexOf=function(e){var t=-1;if(0==this.length)return t;for(var n=0;n<this.length;n++)if(this[n]===e){t=n;break}return t}),Function.prototype.bind||(Function.prototype.bind=function(e){var t=this,n=Array.prototype.slice.call(arguments);return function(){return t.apply(e,n.slice(1))}})}();var e={addHandler:function(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent?e.attachEvent("on"+t,n):e["on"+t]=n},getEvent:function(e){return e?e:window.event},getTarget:function(e){return e.target||e.srcElement},preventDafault:function(e){e.preventDafault?e.preventDefault():e.returnValue=!1},removeHandler:function(e,t,n){e.removeEventListener?e.removeEventListener(t,n,!1):e.detachEvent?e.detachEvent("on"+t,n):e["on"+t]=null},stopPropagation:function(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0}},t={getId:function(e){return document.getElementById(e)},getTagName:function(e,t){return e.getElementsByTagName(t)},getClass:function(e,t){if(e.getElementsByClassName)return e.getElementsByClassName(t);for(var n=[],r=e.getElementsByTagName("*"),o=r.length,i=t.split(" "),a=i.length,l=0;o>l;l++){for(var s=r[l].className.split(" "),u=(s.length,[]),c=0;a>c;c++)-1!==s.indexOf(i[c])&&u.push(!0);u.length===a&&n.push(r[l])}return n},getQuery:function(e,t){return e.querySelector(t)},getQueryAll:function(e,t){return e.querySelectorAll(t)},insertElement:function(e,t,n,r){var o=document.createElement(t);if(r)for(var i in r)"class"===i?this.addClass(o,r[i]):o.setAttribute(i,r[i]);return"last"===n&&e.appendChild(o),"first"===n&&e.insertBefore(o,this.firstChild(e)),o},insertEleBefore:function(e,t,n){var r=document.createElement(e),o=t.parentNode;if(n)for(var i in n)"class"===i?this.addClass(r,n[i]):r.setAttribute(i,n[i]);return o.insertBefore(r,t),r},insertEleAfter:function(e,t,n){var r=document.createElement(e);if(n)for(var o in n)"class"===o?this.addClass(r,n[o]):r.setAttribute(o,n[o]);return this.insertAfter(e,t),r},insertText:function(e,t){var n=document.createTextNode(t);return e.appendChild(n),n},setAttr:function(e,t){for(var n in t)"class"===n?this.addClass(e,t[n]):e.setAttribute(n,t[n])},getAttr:function(e,t){return e.getAttribute(t)},nodeType:function(e){return 1===e.nodeType?"Element Node":2===e.nodeType?"Attribute Node":3===e.nodeType?"Text Node":null},toArray:function(e){var t=[],n=e.length;if(Array.prototype.slice)t=Array.prototype.slice.call(e);else for(var r=0;n>r;r++)t.push(e[r]);return t},text:function(e,t){return t?(e.firstChild.nodeValue=t,e.firstChild.nodeValue):e.firstChild.nodeValue},childNodes:function(e){for(var t=[],n=e.childNodes,r=n.length,o=0;r>o;o++)1===n[o].nodeType&&t.push(n[o]);return t},firstChild:function(e){var t=this.childNodes(e);return t[0]},lastChild:function(e){var t=this.childNodes(e),n=t.length;return t[n-1]},nthChild:function(e,t){var n=this.childNodes(e),r=n.length;return r+1>t?n[t-1]:null},previousSibling:function(e,t){for(var n=this.childNodes(t),r=n.length,o=0;r>o;o++)if(e===n[o])return 0===o?null:n[o-1]},nextSibling:function(e,t){for(var n=this.childNodes(t),r=n.length,o=0;r>o;o++)if(e===n[o])return o===length-1?null:n[o+1]},allSibling:function(e,t){for(var n=this.childNodes(t),r=n.length,o=0;r>o;o++)if(e===n[o]){n.splice(o,1);break}return n},sameSibling:function(e,t){for(var n=e.length,r=this.toArray(e),o=0;n>o;o++)if(t===r[o]){r.splice(o,1);break}return r},parentNode:function(e){return e.parentNode},insertBefore:function(e,t){var n=t.parentNode;n.insertBefore(e,t)},insertAfter:function(e,t){var n=t.parentNode;n.lastChild==t?n.appendChild(e):n.insertBefore(e,t.nextSibling)},removeElement:function(e){var t=e.parentNode;t.removeChild(e)},removeAllChild:function(e){e.innerHTML=""},addClass:function(e,t){e.className?(newClassName=e.className,newClassName+=" ",newClassName+=t,e.className=newClassName):e.className=t},addCoverClass:function(e,t){e.className=t},removeClass:function(e,t){if(t){var n=e.className.split(" "),r=n.indexOf(t);-1!=r&&(n.splice(r,1),n=n.join(" "),e.className=n)}else e.className=""},show:function(e){e.style.display="block"},hide:function(e){e.style.display="none"},myAnimate:function(e,t,n,r,o){var i=this,a=n/10;clearInterval(e.timer),e.timer=setInterval(function(){var n=!0;for(var a in t){if("opacity"==a)var l=Math.round(100*parseFloat(i.getStyle(e,a))),s=100*t[a];else var l=parseInt(i.getStyle(e,a)),s=t[a];if(r){var u=(s-l)/10;u=u>0?Math.ceil(u):Math.floor(u)}else if(s>l)var u=10;else var u=-10;l!=s&&(n=!1),n?(clearInterval(e.timer),o&&o()):"opacity"==a?(e.style.opacity=(l+u)/100,e.style.filter="alpha(opacity="+l+u+")"):e.style[a]=l+u+"px"}},a)},getStyle:function(e,t){return e.currentStyle?e.currentStyle[t]:getComputedStyle(e,!1)[t]}},n={monitor:function(t,n){var r="oninput"in document;r?e.addHandler(t,"input",function(){var e=t.value;""==e?n.style.display="inline-block":n.style.display="none"}):e.addHandler(t,"propertychange",function(){var e=t.value;""==e?n.style.display="inline-block":n.style.display="none"})},resetForm:function(e,t){e.value="",t&&(t.style.display="inline-block")}},r={get:function(e){var t=encodeURIComponent(e)+"=",n=document.cookie.indexOf(t),r=null;if(n>-1){var o=document.cookie.indexOf(";",n);-1==o&&(o=document.cookie.length),r=decodeURIComponent(document.cookie.substring(n+t.length,o))}return r},set:function(e,t,n,r,o,i){var a=new Date;a.setDate(a.getDate()+n);var l=encodeURIComponent(e)+"="+encodeURIComponent(t);n&&null!=n&&(l+=";expires="+a.toGMTString()),r&&(l+=";path="+r),o&&(l+=";domain="+o),i&&(l+=";secure"),document.cookie=l},unset:function(e,t,n,r){this.set(e,"",0,n,t,r)}},o=function(e,t,n,r,o){var i=new XMLHttpRequest;i.onreadystatechange=function(){4==i.readyState&&(i.status>=200&&i.status<300||304==i.status?r(i.responseText):alert("Request was unsuccessful "+i.status))},o?i.open(e,t,!1):i.open(e,t,!0),i.send(n)},i=function(e){function t(e,t){return e<<t|e>>>32-t}function n(e,t){var n,r,o,i,a;return o=2147483648&e,i=2147483648&t,n=1073741824&e,r=1073741824&t,a=(1073741823&e)+(1073741823&t),n&r?2147483648^a^o^i:n|r?1073741824&a?3221225472^a^o^i:1073741824^a^o^i:a^o^i}function r(e,t,n){return e&t|~e&n}function o(e,t,n){return e&n|t&~n}function i(e,t,n){return e^t^n}function a(e,t,n){return t^(e|~n)}function l(e,o,i,a,l,s,u){return e=n(e,n(n(r(o,i,a),l),u)),n(t(e,s),o)}function s(e,r,i,a,l,s,u){return e=n(e,n(n(o(r,i,a),l),u)),n(t(e,s),r)}function u(e,r,o,a,l,s,u){return e=n(e,n(n(i(r,o,a),l),u)),n(t(e,s),r)}function c(e,r,o,i,l,s,u){return e=n(e,n(n(a(r,o,i),l),u)),n(t(e,s),r)}function f(e){for(var t,n=e.length,r=n+8,o=(r-r%64)/64,i=16*(o+1),a=Array(i-1),l=0,s=0;n>s;)t=(s-s%4)/4,l=s%4*8,a[t]=a[t]|e.charCodeAt(s)<<l,s++;return t=(s-s%4)/4,l=s%4*8,a[t]=a[t]|128<<l,a[i-2]=n<<3,a[i-1]=n>>>29,a}function d(e){var t,n,r="",o="";for(n=0;3>=n;n++)t=e>>>8*n&255,o="0"+t.toString(16),r+=o.substr(o.length-2,2);return r}function h(e){e=e.replace(/\r\n/g,"\n");for(var t="",n=0;n<e.length;n++){var r=e.charCodeAt(n);128>r?t+=String.fromCharCode(r):r>127&&2048>r?(t+=String.fromCharCode(r>>6|192),t+=String.fromCharCode(63&r|128)):(t+=String.fromCharCode(r>>12|224),t+=String.fromCharCode(r>>6&63|128),t+=String.fromCharCode(63&r|128))}return t}var p,v,m,g,y,C,N,b,A,E=Array(),S=7,w=12,x=17,T=22,k=5,B=9,I=14,L=20,O=4,U=11,D=16,H=23,M=6,R=10,j=15,q=21;for(e=h(e),E=f(e),C=1732584193,N=4023233417,b=2562383102,A=271733878,p=0;p<E.length;p+=16)v=C,m=N,g=b,y=A,C=l(C,N,b,A,E[p+0],S,3614090360),A=l(A,C,N,b,E[p+1],w,3905402710),b=l(b,A,C,N,E[p+2],x,606105819),N=l(N,b,A,C,E[p+3],T,3250441966),C=l(C,N,b,A,E[p+4],S,4118548399),A=l(A,C,N,b,E[p+5],w,1200080426),b=l(b,A,C,N,E[p+6],x,2821735955),N=l(N,b,A,C,E[p+7],T,4249261313),C=l(C,N,b,A,E[p+8],S,1770035416),A=l(A,C,N,b,E[p+9],w,2336552879),b=l(b,A,C,N,E[p+10],x,4294925233),N=l(N,b,A,C,E[p+11],T,2304563134),C=l(C,N,b,A,E[p+12],S,1804603682),A=l(A,C,N,b,E[p+13],w,4254626195),b=l(b,A,C,N,E[p+14],x,2792965006),N=l(N,b,A,C,E[p+15],T,1236535329),C=s(C,N,b,A,E[p+1],k,4129170786),A=s(A,C,N,b,E[p+6],B,3225465664),b=s(b,A,C,N,E[p+11],I,643717713),N=s(N,b,A,C,E[p+0],L,3921069994),C=s(C,N,b,A,E[p+5],k,3593408605),A=s(A,C,N,b,E[p+10],B,38016083),b=s(b,A,C,N,E[p+15],I,3634488961),N=s(N,b,A,C,E[p+4],L,3889429448),C=s(C,N,b,A,E[p+9],k,568446438),A=s(A,C,N,b,E[p+14],B,3275163606),b=s(b,A,C,N,E[p+3],I,4107603335),N=s(N,b,A,C,E[p+8],L,1163531501),C=s(C,N,b,A,E[p+13],k,2850285829),A=s(A,C,N,b,E[p+2],B,4243563512),b=s(b,A,C,N,E[p+7],I,1735328473),N=s(N,b,A,C,E[p+12],L,2368359562),C=u(C,N,b,A,E[p+5],O,4294588738),A=u(A,C,N,b,E[p+8],U,2272392833),b=u(b,A,C,N,E[p+11],D,1839030562),N=u(N,b,A,C,E[p+14],H,4259657740),C=u(C,N,b,A,E[p+1],O,2763975236),A=u(A,C,N,b,E[p+4],U,1272893353),b=u(b,A,C,N,E[p+7],D,4139469664),N=u(N,b,A,C,E[p+10],H,3200236656),C=u(C,N,b,A,E[p+13],O,681279174),A=u(A,C,N,b,E[p+0],U,3936430074),b=u(b,A,C,N,E[p+3],D,3572445317),N=u(N,b,A,C,E[p+6],H,76029189),C=u(C,N,b,A,E[p+9],O,3654602809),A=u(A,C,N,b,E[p+12],U,3873151461),b=u(b,A,C,N,E[p+15],D,530742520),N=u(N,b,A,C,E[p+2],H,3299628645),C=c(C,N,b,A,E[p+0],M,4096336452),A=c(A,C,N,b,E[p+7],R,1126891415),b=c(b,A,C,N,E[p+14],j,2878612391),N=c(N,b,A,C,E[p+5],q,4237533241),C=c(C,N,b,A,E[p+12],M,1700485571),A=c(A,C,N,b,E[p+3],R,2399980690),b=c(b,A,C,N,E[p+10],j,4293915773),N=c(N,b,A,C,E[p+1],q,2240044497),C=c(C,N,b,A,E[p+8],M,1873313359),A=c(A,C,N,b,E[p+15],R,4264355552),b=c(b,A,C,N,E[p+6],j,2734768916),N=c(N,b,A,C,E[p+13],q,1309151649),C=c(C,N,b,A,E[p+4],M,4149444226),A=c(A,C,N,b,E[p+11],R,3174756917),b=c(b,A,C,N,E[p+2],j,718787259),N=c(N,b,A,C,E[p+9],q,3951481745),C=n(C,v),N=n(N,m),b=n(b,g),A=n(A,y);var F=d(C)+d(N)+d(b)+d(A);return F.toLowerCase()},a=function(e){var t=window.onload;"function"!=typeof window.onload?window.onload=e:window.onload=function(){t(),e()}};return{eventUnit:e,dom:t,cookieUtil:r,md5:i,addLoad:a,ajax:o,formUtil:n}});