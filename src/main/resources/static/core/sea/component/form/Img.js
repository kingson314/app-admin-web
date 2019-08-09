define(function(require, exports, module) {
	/** * 模块外部依赖 ** */
	var Component = require("Component");

	/** * 模块私有数据 ** */
	var ClassName="sea_img";
	var defaults = {
		id : "",
		src:"#",
		cls : "",
		css : {},
		attr : {}
	};
	 
	/** * 类定义 ** */
	var Img = function(configs) {
		// 类的属性定义
		this.configs = $.extend(true, {}, defaults, configs);
		// 初始化
		this.img=$("<img src='"+this.configs.src+"'>").addClass(ClassName);
		//控件类名设置
		Component.addClass(this.img,this.configs);
		//控件样式设置
		Component.css(this.img,this.configs);
		//控件属性设置
		Component.attr(this.img,this.configs);
	};
	// 类公共方法
	Img.prototype = {
	 
	};
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new Img(configs);
	};
});
