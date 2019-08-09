define(function(require, exports, module) {
	/* @Description: 获取jquery对象的html(包括自己)
 	* @ param jq 
 	* @ return str 
	* @date 2015-12-31
	* @author:kfzx-fenggq
	*/	
	exports.getHtml=function(jq){
		return jq.prop("outerHTML");
	}
});
