define(function(require, exports, module) {
	exports.toNum=function(s){
		return Number(s);
	};
	
	exports.toMoney=function(s){
	   return s.replace(/[^\d\.-]/g, "");   
	};
	/**金额 用逗号 隔开。数字格式化
	 * s :被个是字符串
	 * n:保留小数位
	 */
	exports.formatMoney=function(s, n) {
	   if(!n)n=2;
	   n = n > 0 && n <= 20 ? n : 2;   
	   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
	   var l = s.split(".")[0].split("").reverse(),   
	   r = s.split(".")[1];   
	   t = "";   
	   for(i = 0; i < l.length; i ++ ){
	      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
	   }   
	   return t.split("").reverse().join("") + "." + r;   
	};
});
