define(function(require, exports, module) {
	//	exports.isHtml=function (htmlStr) {
	//    var  reg = /<[^>]+>/g;
	//    return reg.test(htmlStr);
	//}
	/**
	 * 只能输入日期[yyyy-mm-dd]
	 */
	exports.isDate = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/);
		if (result == null) return false;
		return true;
	};
	/**
	 * 只能输入日期时间[HH:mm:ss]
	 */
	exports.isTime = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^\d{2}[:]\d{2}[:]\d{2}$/);
		if (result == null) return false;
		return true;
	};
	/**
	 * 只能输入日期时间[yyyy-mm-dd HH:mm:ss]
	 */
	exports.isDateTime = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^\d{4}[-]\d{2}[-]\d{2} \d{2}[:]\d{2}[:]\d{2}$/);
		if (result == null) return false;
		return true;
	};
	/**
	 * 只能输入数字[0-9]
	 */
	exports.isDigits = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^\d+$/);
		if (result == null) return false;
		return true;
	};
	/**
	 * 匹配money
	 */
	exports.isMoney = function(str) {
		if (str == null || str == "") return false;
		str=str.replace(/[^\d\.-]/g, "");
		var result = str.match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/);
		if (result == null) return false;
		return true;
	};
	/**
	 * 匹配Email地址
	 */
	exports.isEmail = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
		if (result == null) return false;
		return true;
	};
	/**
	 * 判断数值类型，包括整数和浮点数
	 */
	exports.isNumber = function(str) {
		if (isDouble(str) || isInteger(str)) return true;
		return false;
	};
	/**
	 * 匹配phone
	 */
	var isPhone = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/);
		if (result == null) return false;
		return true;
	};
	exports.isPhone = isPhone;
	/**
	 * 匹配mobile
	 */
	var isMobile = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^((\(\d{2,3}\))|(\d{3}\-))?((1\d{10}))$/);
		if (result == null) return false;
		return true;
	};
	exports.isMobile = isMobile;
	/**
	 * 联系电话(手机/电话皆可)验证
	 */
	exports.isTel = function(str) {
		if (isMobile(str) || isPhone(str)) return true;
		return false;
	};
	/**
	 * 匹配qq
	 */
	exports.isQq = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^[1-9]\d{4,12}$/);
		if (result == null) return false;
		return true;
	};
	/**
	 * 匹配integer
	 */
	var isInteger = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^[-\+]?\d+$/);
		if (result == null) return false;
		return true;
	};
	exports.isInteger = isInteger;
	/**
	 * 匹配double或float
	 */
	var isDouble = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^[-\+]?\d+(\.\d+)?$/);
		if (result == null) return false;
		return true;
	};
	exports.isDouble = isDouble;
	/**
	 * 匹配邮政编码
	 */
	exports.isPostCode = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^[0-9]{6}$/);
		if (result == null) return false;
		return true;
	};

	/**
	 * 匹配URL
	 */
	exports.isUrl = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\’:+!]*([^<>\"])*$/);
		if (result == null) return false;
		return true;
	};

	/**
	 * 匹配密码，以字母开头，长度在6-12之间，只能包含字符、数字和下划线。
	 */
	exports.isPwd = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^[a-zA-Z]\\w{6,12}$/);
		if (result == null) return false;
		return true;
	};

	/**
	 * 判断是否为合法字符(a-zA-Z0-9-_)
	 */
	exports.isChar = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^[A-Za-z0-9_-]+$/);
		if (result == null) return false;
		return true;
	};

	/**
	 * 匹配english
	 */
	exports.isEnglish = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^[A-Za-z]+$/);
		if (result == null) return false;
		return true;
	};

	/**
	 * 匹配身份证号码
	 */
	exports.isIdCardNo = function(num) {
		// if (isNaN(num)) {alert("输入的不是数字！"); return false;}
		var len = num.length,
			re;
		if (len == 15)
			re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/);
		else if (len == 18)
			re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/);else {
			alert("输入的数字位数不对。"); return false;
		}
		var a = num.match(re);
		if (a != null) {
			if (len == 15) {
				var D = new Date("19" + a[3] + "/" + a[4] + "/" + a[5]);
				var B = D.getYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
			} else {
				var D = new Date(a[3] + "/" + a[4] + "/" + a[5]);
				var B = D.getFullYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
			}
			if (!B) {
				alert("输入的身份证号 " + a[0] + " 里出生日期不对。"); return false;
			}
		}
		if (!re.test(num)) {
			alert("身份证最后一位只能是数字和字母。");return false;
		}
		return true;
	};

	/**
	 * 匹配汉字
	 */
	exports.isChinese = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^[\u4e00-\u9fa5]+$/);
		if (result == null) return false;
		return true;
	};

	/**
	 * 匹配中文(包括汉字和字符)
	 */
	exports.isChineseChar = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^[\u0391-\uFFE5]+$/);
		if (result == null) return false;
		return true;
	};

	/**
	 * 字符验证，只能包含中文、英文、数字、下划线等字符。
	 */
	exports.stringCheck = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^[a-zA-Z0-9\u4e00-\u9fa5-_]+$/);
		if (result == null) return false;
		return true;
	};

	/**
	 * 过滤中英文特殊字符，除英文"-_"字符外
	 */
	exports.stringFilter = function(str) {
		var pattern = new RegExp("[`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]");
		var rs = "";
		for (var i = 0; i < str.length; i++) {
			rs = rs + str.substr(i, 1).replace(pattern, '');
		}
		return rs;
	};

	/**
	 * 判断是否包含中英文特殊字符，除英文"-_"字符外
	 */
	exports.isContainsSpecialChar = function(str) {
		if (str == null || str == "") return false;
		var reg = RegExp(/[(\ )(\`)(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\+)(\=)(\|)(\{)(\})(\')(\:)(\;)(\')(',)(\[)(\])(\.)(\<)(\>)(\/)(\?)(\~)(\！)(\@)(\#)(\￥)(\%)(\…)(\&)(\*)(\（)(\）)(\—)(\+)(\|)(\{)(\})(\【)(\】)(\‘)(\；)(\：)(\”)(\“)(\’)(\。)(\，)(\、)(\？)]+/);
		return reg.test(str);
	};
});