define(function(require, exports, module) {
	/** * 模块外部依赖 ** */
	/** * 模块私有数据 ** */
	var defaults = {
		id : "",
		value : "",
		rows:3,
		cols:20,
		isNull : true,
		cls : "",
		css : {},
		attr : {	},
		events : {
			//click : null,
			//change : null
		}
	};
	/** * 模块私有方法 ** */
	/** * 类定义 ** */
	var Textarea = function(configs) {
		 //类的属性定义
		this.configs=$.extend(true,{},defaults,configs);
		this._className="sea_textarea";
		//初始化
		this.textarea=this._input=$("<textarea></textarea>");
		this.init();
	};
	// 类公共方法
	var Input=require("Input").create();
	Textarea.prototype = $.extend({},Input,{
		/**多态：新增或覆盖父类方法**/
	});
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new Textarea(configs);
	};
});
