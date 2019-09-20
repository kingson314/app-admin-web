define(function(require, exports, module) {
	exports.getPage=function(actionName,data){
		var params="";
		if(data)
		$.each(data,function(key,val){
			if(actionName.indexOf("?")>=0){
				params+="&";
			}else	if(params==""){
				params="?";
			}else{
				params+="&";
			}
			params+=key+"="+val;
		});
		return actionName+params;
	};
	exports.getLocal=function(actionName,data){
		var params="";
		if(data)
		$.each(data,function(key,val){
			if(actionName.indexOf("?")>=0){
				params+="&";
			}else	if(params==""){
				params="?";
			}else{
				params+="&";
			}
			params+=key+"="+val;
		});
		return Session.localPath+actionName+params;
	};
	/**
	 * @Description: 获取url
	 * @ param actionName
	 * @ return url
	 * @date 2015-12-31 
	 * @author:kfzx-fenggq
	 */
	var getUrl=function(actionName,data){
		var params="";
		if(data)
		$.each(data,function(key,val){
			if(actionName.indexOf("?")>=0){
				params+="&";
			}else	if(params==""){
				params="?";
			}else{
				params+="&";
			}
			params+=key+"="+val;
		});
		return Session.basePath+actionName+params;
	};
	exports.getUrl=getUrl;
	/**
	 * @Description: ajax请求
	 * @ param url 
	 * @ param params
	 * @ param callback 
	 * @ return 
	 * @date 2015-12-31 
	 * @author:kfzx-fenggq
	 */
	exports.post = function(url, data, callback,async,dt) {
		Log.begTime=new Date().getTime();
		if(data){
			data._langue=Session.langue;
			data._log=JSON.stringify(Log);
			data._token=Session.token;
		}else{
			data={
				_langue:Session.langue,
				_log:JSON.stringify(Log),
				_token:Session.token
			};
		}
		$.ajax( {
			type : 'POST',
			url : getUrl(url),
			data : data,
			async : async||false,
			dataType : dt||"json",
			success : function(result) {
				if(callback){
					callback.call(window, result);
				}
			}
		});
	};
	
	exports.getParam = function(paramName) {
		var url = document.location.href;
		var arrStr = url.substring(url.indexOf("?") + 1).split("&");
		for ( var i = 0; i < arrStr.length; i++) {
			var loc = arrStr[i].indexOf(paramName + "=");
			if (loc != -1) {
				return arrStr[i].replace(paramName + "=", "").replace("?", "");
			}
		}
		return "";
	};
	
	exports.getUrlParam = function(url,paramName) {
		var arrStr = url.substring(url.indexOf("?") + 1).split("&");
		for ( var i = 0; i < arrStr.length; i++) {
			var loc = arrStr[i].indexOf(paramName + "=");
			if (loc != -1) {
				return arrStr[i].replace(paramName + "=", "").replace("?", "");
			}
		}
		return "";
	};
});