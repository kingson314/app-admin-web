var SessionStorage = {
	get : function(key) {
		return sessionStorage.getItem(key);
	},
	set : function(obj) {
		for ( var key in obj) {
			sessionStorage.setItem(key, obj[key]);
		}
	},
	remove : function(key) {
		sessionStorage.removeItem(key);
	}
}
var String = {
	isNil : function(str) {
		if (str == undefined || str == null)
			str = '';
		return str;
	},
	isNil : function(str, then) {
		if (str == undefined || str == null)
			str = then;
		return str;
	},
	isBlank : function(str) {
		if ($.type(str) == 'boolean')
			return str;
		if (str === undefined || str === null || str === '')
			return true;
		return false;
	},
	startWith : function(str, prefix) {
		return str.slice(0, prefix.length) === prefix;
	},
	endsWith : function(str, suffix) {
		return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}
}
var LocalStorage = {
	get : function(key) {
		return localStorage.getItem(key);
	},
	set : function(obj) {
		for ( var key in obj) {
			localStorage.setItem(key, obj[key]);
		}
	},
	remove : function(key) {
		localStorage.removeItem(key);
	}
}

var Cookie = {
	get : function(c_name) {
		if (document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + "=");
			if (c_start != -1) {
				c_start = c_start + c_name.length + 1;
				c_end = document.cookie.indexOf(";", c_start);
				if (c_end == -1)
					c_end = document.cookie.length;
				return unescape(document.cookie.substring(c_start, c_end));
			}
		}
		return "";
	},
	set : function(map, expiredays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		$.each(map, function(key, value) {
			document.cookie = key
					+ "="
					+ escape(value)
					+ ((expiredays == null) ? "" : ";expires="
							+ exdate.toGMTString());
		});
	}
}
var Ajax = {
	getParam : function(paramName) {
		var url = document.location.href;
		var arrStr = url.substring(url.indexOf("?") + 1).split("&");
		for (var i = 0; i < arrStr.length; i++) {
			var loc = arrStr[i].indexOf(paramName + "=");
			if (loc != -1) {
				return arrStr[i].replace(paramName + "=", "").replace("?", "");
				break;
			}
		}
		return "";
	},
	getParamObj : function() {
		var url = decodeURI(decodeURI(location.search)); // 获取url中"?"符后的字串，使用了两次decodeRUI解码
		var params = new Object();
		if (url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for (var i = 0; i < strs.length; i++) {
				params[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		return params;
	},
	post : function(url, data, callback, async, dt) {
		$.ajax({
			type : 'POST',
			url : url,
			data : data,
			async : async || false,
			dataType : dt || "json",
			success : function(result) {
				if (callback) {
					callback.call(window, result);
				}
			}
		});
	}
}
var Dialog = {
	// params={
	// title:"",
	// content:"",
	// confirmValue:"",
	// cancelValue:"",
	// confirm:function(){},
	// cancel:function(),
	// size:"modal-sm"
	// }
	confirm : function(params) {
		params.id = params.id || "dialog20170824";
		$("#" + params.id).remove();
		var html = [];
		html.push('<div id="' + params.id
				+ '" class="modal fade dialog" tabindex="-1" role="dialog">');
		html.push('  <div class="modal-dialog ' + (params.size || 'modal-sm')
				+ '" role="document">');
		html.push('    <div class="modal-content">');
		html.push('      <div class="modal-header">');
		html
				.push('        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
		html.push('        <h4 class="modal-title">' + (params.title || "提示")
				+ '</h4>');
		html.push('      </div>');
		if (params.size && params.size != "modal-sm") {
			html
					.push('      <div class="modal-body text-center" style="padding:0 15px;display:flex;">');
		} else {
			html
					.push('      <div class="modal-body text-center" style="padding:15px 0;">');
		}
		// html.push(' <p><h6>'+(params.content||"")+'</h6></p>');
		html.push('      </div>');
		html.push('      <div style="text-align:center" class="modal-footer">');
		html
				.push('        <button type="button" class="btn btn-success confirm">'
						+ (params.confirmValue || "确定") + '</button>');
		html
				.push('        <button type="button" class="btn btn-default cancel" data-dismiss="modal">'
						+ (params.cancelValue || "取消") + '</button>');
		html.push('      </div>');
		html.push('    </div>');
		html.push('  </div>');
		html.push('</div>');
		$("body").append(html.join(''));
		if ($.type(params.content) == "string") {
			$("#" + params.id + " .modal-body").append(
					'<p><h6>' + (params.content || "") + '</h6></p>');
		} else {
			$("#" + params.id + " .modal-body").append(params.content || "");
		}
		$("#" + params.id + " .confirm").click(function() {
			var rs = true;
			if (params.confirm) {
				rs = params.confirm();
			}
			if (rs == true) {
				$("#" + params.id).modal('hide');
			}
		});
		$("#" + params.id + " .cancel").click(function() {
			$("#" + params.id).modal('hide');
			if (params.cancel) {
				return params.cancel();
			}
			return true;
		});
		var dialog = $("#" + params.id);
		dialog.modal({
			show : true
		});
		return dialog;
	},
	alert : function(params) {
		params.id = "dialog20170823"
		var dialog = Dialog.confirm(params);
		$("#" + params.id + " .cancel").hide();
		return dialog;
	}
}
var Sock = {
	init : function(baseUrl, chatId, sendUserId, callback) {
		if (window.location.protocol == 'http:') {
			url = 'ws://' + baseUrl + "chat/" + chatId + "/" + sendUserId
			console.log(url);
		} else {
			url = 'wss://' + baseUrl + "chat/" + chatId + "/" + sendUserId
		}
		var ws = new WebSocket(url);
		// 监听三种状态的变化 。js会回调
		ws.onopen = function(message) {
		};
		ws.onclose = function(message) {
		};
		ws.onmessage = function(message) {
			if (callback) {
				callback(message.data);
			}
		};
		// 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
		window.onbeforeunload = function() {
			ws.close();
		};
		return ws;
	}
}
// 获取emoji表情
function getEm(str) {
	str = str.replace(/\</g, '&lt;');
	str = str.replace(/\>/g, '&gt;');
	str = str.replace(/\n/g, '<br/>');
	str = str.replace(/\[em_([0-9]*)\]/g,
			'<img src="../../core/qqFace/arclist/$1.gif" border="0" />');
	return str;
}
// 倒计时
function getCountDown(datetime) {
	var now = new Date();
	var endDate = new Date(Date.parse(datetime.replace(/-/g, "/")));
	var leftTime = endDate.getTime() - now.getTime();
	var leftsecond = parseInt(leftTime / 1000);

	var day1 = Math.floor(leftsecond / (60 * 60 * 24));
	var hour = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600);
	var minute = Math
			.floor((leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60);
	var second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600
			- minute * 60);

	console.debug(day1 + "天" + hour + "小时" + minute + "分" + second + "秒");
	return {
		"day" : day1,
		"hour" : hour,
		"minute" : minute,
		"second" : second
	}
}
var loadJs = function(path) {
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.src = path;
	script.type = 'text/javascript';
	head.appendChild(script);
	return script;
};
var random = function(m, n) {
	var diff = n - m;
	var num = Math.random() * diff + m;
	return parseInt(num, 10);
}
var randomRange = function(m, n, count) {
	var rs = new Array(count);
	var map = {};
	var cnt = 0;
	while (cnt < count) {
		var ran = random(n, m);
		if (!map[ran]) {
			map[ran] = 1;
			rs[cnt] = Number(ran);
			cnt++;
		}
	}
	return rs;
}
var getIndex = function(arr, item) {
	var rs = -1;
	if (!arr || arr.length <= 0) {
		return rs;
	}
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == item) {
			rs = i;
			break;
		}
	}
	return rs;
};
function guid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}
function getDate(seperator1) {
	if (!seperator1 && seperator1 != "")
		seperator1 = "-";
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	if (month <= 9) {
		month = "0" + month;
	}
	if (day <= 9) {
		day = "0" + day;
	}
	var curdate = year + seperator1 + month + seperator1 + day;
	return curdate;
}
function formatTime(s) {
	var t;
	if (s > -1) {
		hour = Math.floor(s / 3600);
		min = Math.floor(s / 60) % 60;
		sec = s % 60;
		day = parseInt(hour / 24);
		if (day > 0) {
			hour = hour - 24 * day;
			t = day + "day " + hour + ":";
		} else
			t = hour + ":";
		if (min < 10) {
			t += "0";
		}
		t += min + ":";
		if (sec < 10) {
			t += "0";
		}
		t += sec;
	}
	return t;
}
var Cookie = {
	set : function(map, expiredays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		$.each(map, function(key, value) {
			document.cookie = key
					+ "="
					+ escape(value)
					+ ((expiredays == null) ? "" : ";expires="
							+ exdate.toGMTString());
		});
	},
	setByName : function(c_name, value, expiredays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = c_name
				+ "="
				+ escape(value)
				+ ((expiredays == null) ? "" : ";expires="
						+ exdate.toGMTString());
	},
	get : function(c_name) {
		if (document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + "=");
			if (c_start != -1) {
				c_start = c_start + c_name.length + 1;
				c_end = document.cookie.indexOf(";", c_start);
				if (c_end == -1)
					c_end = document.cookie.length;
				return unescape(document.cookie.substring(c_start, c_end));
			}
		}
		return "";
	},
	del : function(name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = Cookie.get(name);
		if (cval != null)
			document.cookie = name + "=" + cval + ";expires="
					+ exp.toGMTString();
	}
}
Number.prototype.formatMoney = function(places, symbol, thousand, decimal) {
	places = !isNaN(places = Math.abs(places)) ? places : 2;
	symbol = symbol !== undefined ? symbol : "￥";
	thousand = thousand || ",";
	decimal = decimal || ".";
	var number = this, negative = number < 0 ? "-" : "", i = parseInt(
			number = Math.abs(+number || 0).toFixed(places), 10)
			+ "", j = (j = i.length) > 3 ? j % 3 : 0;
	return symbol
			+ negative
			+ (j ? i.substr(0, j) + thousand : "")
			+ i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand)
			+ (places ? decimal + Math.abs(number - i).toFixed(places).slice(2)
					: "");
};
