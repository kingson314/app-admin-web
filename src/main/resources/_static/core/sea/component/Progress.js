define(function(require, exports, module) {
	var Component = require("Component"); 
	/** * 模块私有数据 ** */
	var defaults = {
			id:"",
			cls : "",
			css : {},
			attr : {	},
			value:"",
	};
		/** * 模块私有方法 ** */
	var self = {
		init : function(me) {
			me.progress=$("<div></div>").addClass(me._className);
			me.value=$("<div class='value'></div>").appendTo(me.progress);
			if(me.configs.value){
				me.value.html(me.configs.value);
			}
			// 控件类名设置
			Component.addClass(me.progress, me.configs);
			// 控件样式设置
			Component.css(me.progress, me.configs);
			// 控件的属性设置
			Component.attr(me.progress, me.configs);
		}
	}; 
	/** * 类定义 ** */
	var Progress = function(configs) {
		// 类的属性定义
		this.configs = $.extend(true, {}, defaults, configs);
		this._className="sea_progress";
		// 初始化
		self.init(this);
	};
	// 类公共方法
	Progress.prototype = {
		val:function(val){
			if(val){
				this.value.html((val*100).toFixed(2)+"%").width(this.value.parent().width()*val);
			}else {
				return this.value.html();
			}
		},
		text:function(val){
			this.value.hide();
			var span=this.progress.find("span");
			if(span.length>0){
				span.html(val);
			}else{
				this.progress.append("<span>"+val+"</span>").css("text-align","center");
			}
			console.log(val);
		},
		clear:function(){
			this.progress.css("text-align","left").find("span").remove();
			this.value.show();
		}
	};
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new Progress(configs);
	};
});
