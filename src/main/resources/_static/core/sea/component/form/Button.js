define(function(require, exports, module) {
	/** * 模块外部依赖 ** */
	//require.async(("./css/button.css");
	var Component = require("Component"); 
	/** * 模块私有数据 ** */
	var defaults = {
		id : "",
		value : "",
		cls : "",
		css : {},
		attr : {	},
		icon:null,
		events : {
			//click : null
		}
	};
	/** * 类定义 ** */
	var Button = function(configs) {
		// 类的属性定义
		this.configs=$.extend(true,{},defaults,configs);
		this._className="sea_button";
		//初始化
		this._input =$("<button type='button'>"+Global.getI18N(this.configs.value)+"</button>").addClass(this._className);
		if(this.configs.icon){
			this._input.prepend("<span  class='"+this.configs.icon+"'></span>");
		}
		this.button=this._input;
		this.init();
	};
	// 类公共方法
	var Input=require("Input").create();
	Button.prototype =  $.extend({},Input,{
		/**多态：新增或覆盖父类方法**/
		//检查函数
		check:function(configs){
			return true;
		}
	});
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new Button(configs);
	};
});
