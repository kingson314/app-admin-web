define(function(require, exports, module) {
	/** * 模块外部依赖 ** */
	var Component = require("Component");
	/** * 模块私有数据 ** */
	var ClassName="sea_iframe";
	var defaults = {
		id : "",
		cls : "",
		css : {"width":"100%","height":"100%","border":0},
		attr : {frameborder:0,scrolling :"yes"},
		events : {
		}
	};
	/** * 模块私有方法 ** */
	var self = {
		init : function(me) {
			// 控件封装
			me.iframe = $("<iframe></iframe>").addClass(ClassName).attr("name",me.configs.id);
			// 控件类名设置
			Component.addClass(me.iframe, me.configs);
			// 控件样式设置
			Component.css(me.iframe, me.configs);
			// 控件的属性设置
			Component.attr(me.iframe, me.configs);
			// 控件的事件绑定
			Component.bind(me.iframe, me.configs);
		}
	};
	/** * 类定义 ** */
	var Iframe = function(configs) {
		// 类的属性定义
		this.configs = $.extend(true, {}, defaults, configs);
		// 初始化
		self.init(this);
	};
	// 类公共方法
	Iframe.prototype = {
		//检查函数
		check:function(configs){
			return true;
		},
		//白盒测试函数
		test:function(data){
			
		}
	};
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new Iframe(configs);
	};
});
