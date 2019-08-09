define(function(require, exports, module) {
	/**
	 * //history //cache //cookie
	 */
	var browserVersion = window.navigator.userAgent.toUpperCase();
	var isOpera = browserVersion.indexOf("OPERA") > -1 ? true: false;
	var isFireFox = browserVersion.indexOf("FIREFOX") > -1 ? true: false;
	var isChrome = browserVersion.indexOf("CHROME") > -1 ? true: false;
	var isSafari = browserVersion.indexOf("SAFARI") > -1 ? true: false;
	var isIE = ( !! window.ActiveXObject || "ActiveXObject" in window);
	var isIE9More = (!-[1, ] == false);
	function resizeIframe(iframeId, minHeight) {
		var iframe = document.getElementById(iframeId);
		var bHeight = 0;
		if (isChrome == false && isSafari == false) bHeight = iframe.contentWindow.document.body.scrollHeight;
		var dHeight = 0;
		if (isFireFox == true) dHeight = iframe.contentWindow.document.documentElement.offsetHeight + 2;
		else if (isIE == false && isOpera == false) dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
		else if (isIE == true && isIE9More) { // ie9+
			var heightDeviation = bHeight - eval("window.IE9MoreRealHeight" + iframeId);
			if (heightDeviation == 0) {
				bHeight += 3;
			} else if (heightDeviation != 3) {
				eval("window.IE9MoreRealHeight" + iframeId + "=" + bHeight);
				bHeight += 3;
			}
		} else
		bHeight += 3;
		var height = Math.max(bHeight, dHeight);
		if (height < minHeight) height = minHeight;
		iframe.style.height = height + "px";
	};

	exports.setCookie = function(map, expiredays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		$.each(map,
		function(key, value) {
			document.cookie = key + "=" + escape(value) + ((expiredays == null) ? "": ";expires=" + exdate.toGMTString());
		});
	};
	exports.setCookieByName = function(c_name, value, expiredays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "": ";expires=" + exdate.toGMTString());
	};
	var getCookie = function(c_name) {
		if (document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + "=");
			if (c_start != -1) {
				c_start = c_start + c_name.length + 1;
				c_end = document.cookie.indexOf(";", c_start);
				if (c_end == -1) c_end = document.cookie.length;
				return unescape(document.cookie.substring(c_start, c_end));
			}
		}
		return "";
	};
	exports.getCookie = getCookie;
	exports.delCookie = function(name) // 删除cookie
	{
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = getCookie(name);
		if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	};

	exports.loadJs = function(path) {
		if (!path || path.length === 0) {
			return;
		}
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.src = path;
		script.type = 'text/javascript';
		head.appendChild(script);
		return script;
	};
	exports.loadCss = function(path) {
		if (!path || path.length === 0) {
			return;
		}
		var head = document.getElementsByTagName('head')[0];
		var link = document.createElement('link');
		link.href = path;
		link.rel = 'stylesheet';
		link.type = 'text/css';
		head.appendChild(link);
		return link;
	};
	/**
	 * 删除动态生成的javascript/css
	 */
	exports.remove = function(src) {
		document.getElementsByTagName('head')[0].removeChild(src);
	};

	exports.zoomChange = function(size) {
		document.body.style.zoom = size;
		document.body.style.cssText += '; -moz-transform: scale(' + size + ');-moz-transform-origin: 0 0; '; //
	};
	var getTop = function(e) {
		var offset = e.offsetTop;
		if (e.offsetParent != null) offset += getTop(e.offsetParent);
		return offset;
	};
	// 获取元素绝对位置
	exports.getTop = getTop;

	var getLeft = function(e) {
		var offset = e.offsetLeft;
		if (e.offsetParent != null) offset += getLeft(e.offsetParent);
		return offset;
	};
	exports.getLeft = getLeft;

	// Firefox支持属性pageX,与pageY属性，这两个属性已经把页面滚动计算在内了,
	// 在Chrome可以通过document.body.scrollLeft，document.body.scrollTop计算出页面滚动位移，
	// 而在IE下可以通过document.documentElement.scrollLeft
	// ，document.documentElement.scrollTop
	exports.getMousePos = function(event) {
		var e = event || window.event;
		var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
		var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
		var x = e.pageX || e.clientX + scrollX;
		var y = e.pageY || e.clientY + scrollY;
		return {
			'x': x,
			'y': y
		};
	};
	exports.getScreenPos = function(e) {
		var offset = {};
		if (!e) var e = window.event;
		offset.x = e.screenX;
		offset.y = e.screenY;
		return offset;
	};
});