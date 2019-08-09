define(function(require, exports, module) {
	/** * 模块外部依赖 ** */
	var Component = require("Component");

	/** * 模块私有数据 ** */
	var ClassName="sea_label";
	var defaults = {
		id : "",
		label : "",
		isNull : true,
		cls : "",
		css : {},
		attr : {}
	};
	 
	/** * 类定义 ** */
	var Label = function(configs) {
		// 类的属性定义
		this.configs = $.extend(true, {}, defaults, configs);
		// 初始化
		this.label=$("<label>"+Global.getI18N(this.configs.label)+"</label>").addClass(ClassName);
		if(this.configs.isNull==false || this.configs.isNull=="false"){
			this.label.append("<span style='color:red'>*</span>");
		}
		//控件类名设置
		Component.addClass(this.label,this.configs);
		//控件样式设置
		Component.css(this.label,this.configs);
		//控件属性设置
		Component.attr(this.label,this.configs);
	};
	// 类公共方法
	Label.prototype = {
		html:function(html){
			if(html){
				this.label.html(html);
			}else{
				return this.label.html();
			}
		}
	};
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new Label(configs);
	};
});
