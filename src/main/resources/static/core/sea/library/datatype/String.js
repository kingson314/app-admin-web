define(function(require, exports, module) {

	exports.checkPassword = function(str) {
		if (str.length < 6) {
			return -1;
		}
		if (/[a-zA-Z]+/.test(str) && /[0-9]+/.test(str) && /\W+\D+/.test(str)) {
			return 3;
		}
		if (/[a-zA-Z]+/.test(str) && /[0-9]+/.test(str)) {
			return 2;
		}
		if (/\[a-zA-Z]+/.test(str) && /\W+\D+/.test(str)) {
			return 2;
		}
		if (/[0-9]+/.test(str) && /\W+\D+/.test(str)) {
			return 2;
		}
		return -1;
	};
	
	exports.startWith = function(str, prefix) {
		return str.slice(0, prefix.length) === prefix;
	};

	exports.endsWith = function(str, suffix) {
		return str.indexOf(suffix, str.length - suffix.length) !== -1;
	};
	/*
	 * @Description: undefined字符串返回空，否则返回原字符串 @ param str @ return str @date
	 * 2015-12-31 @author:kfzx-fenggq
	 */
	exports.isNil = function(str) {
		if (str == undefined || str == null)
			str = '';
		return str;
	};

	/*
	 * @Description: undefined字符串返回then，否则返回原字符串 @ param str * @ return str
	 * @date 2015-12-31 @author:kfzx-fenggq
	 */
	exports.isNil = function(str, then) {
		if (str == undefined || str == null)
			str = then;
		return str;
	};


	/*
	 * @Description: 判断字符串是否为空 @ param str @ return boolean @date 2015-12-31
	 * @author:kfzx-fenggq
	 */
	exports.isBlank = function(str) {
		if ($.type(str) == 'boolean')
			return str;
		if (str === undefined || str === null || str === '')
			return true;
		return false;
	};
	exports.isEmptyObj = function(obj) {
		var key;
		for (key in obj)
			return !1;
		return !0
	}
	/*
	 * @Description:
	 * 使用参数替换指定字符串中的参数标志，字符串中的参数标识形如（数字1：对应的参数以分号隔开，第一个对应的参数标识0，后面的逐个加1 @ param
	 * str @ return String @date 2015-12-31 @author:kfzx-fenggq
	 */
	exports.strUseParam = function(str, params) {
		var replaceStr = "";
		var separator = ";";
		var paramArr = params.toString().split(separator);
		for (var i = 0; i < paramArr.length; i++) {
			replaceStr = new RegExp("\\[" + i + "\\]", "g");
			str = str.replace(replaceStr, paramArr);
		}
		return str;
	};
	/*
	 * @Description: 字符串的第一个字母大写 @ param str @ return String @date 2015-12-31
	 * @author:kfzx-fenggq
	 */
	exports.upperFirst = function(str) {
		if (str.length > 0) {
			str = str.substr(0, 1).toUpperCase() + str.substr(1);
		}
		return str;
	};

	exports.upper_ = function(str) {
		while (str.indexOf("_") >= 0) {
			var left = str.substr(0, str.indexOf("_"));
			var right = str.substr(str.indexOf("_") + 1);
			right = right.substr(0, 1).toUpperCase() + right.substr(1);
			str = left + right;
		}
		return str;
	};
	exports.upperTo_ = function(str) {
		var rs = "";
		for (var i = 0; i < str.length; i++) {
			var c = str.charAt(i);
			if (c > 'A' && c < 'Z') {
				rs += "_" + c.toLowerCase();
			} else {
				rs += c;
			}
		}
		return rs;
	};
	startWith = function(stirng, str) {
		var reg = new RegExp("^" + str);
		return reg.test(stirng);
	};
	exports.startWith=startWith;
	exports.endWith = function(stirng, str) {
		var reg = new RegExp(str + "$");
		return reg.test(stirng);
	};

	exports.UrlEncode = function(str) {
		var ret = "";
		var strSpecial = "!\"#$%&'()*+,/:;<=>?[]^`{|}~%";
		var tt = "";
		for (var i = 0; i < str.length; i++) {
			var chr = str.charAt(i);
			var c = str2asc(chr);
			tt += chr + ":" + c + "n";
			if (parseInt("0x" + c) > 0x7f) {
				ret += "%" + c.slice(0, 2) + "%" + c.slice(-2);
			} else {
				if (chr == " ") {
					ret += "+";
				} else if (strSpecial.indexOf(chr) != -1) {
					ret += "%" + c.toString(16);
				} else {
					ret += chr;
				}
			}
		}
		return ret;
	};
	exports.UrlDecode = function(str) {
		var ret = "";
		for (var i = 0; i < str.length; i++) {
			var chr = str.charAt(i);
			if (chr == "+") {
				ret += " ";
			} else if (chr == "%") {
				var asc = str.substr(i + 1, i + 3);
				if (parseInt("0x" + asc) > 0x7f) {
					ret += asc2str(parseInt("0x" + asc + str.substr(i + 4, i + 6)));
					i += 5;
				} else {
					ret += asc2str(parseInt("0x" + asc));
					i += 2;
				}
			} else {
				ret += chr;
			}
		}
		return ret;
	};

	function str2asc(strstr) {
		return ("0" + strstr.charCodeAt(0).toString(16)).slice(-2);
	};

	function asc2str(ascasc) {
		return String.fromCharCode(ascasc);
	};
	
	exports.delTag=function(str){
		var rs="";
		try{
			if(typeof str=='string'){
				rs=str.replace(/<[^>]+>/g,"");//去掉所有的html标记 
			}else{
				rs=str;
			}
		}catch(e){
			return "";
		}
		return rs;
	};
	exports.isUrl=function(url){
		if(startWith(url,"http:")||startWith(url,"https:"))
			return true;
		return false;
	};
});