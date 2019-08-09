define(function(require, exports, module) {
	/** * 模块外部依赖 ** */
	var Component = require("Component");
	// require("./template.css");
	/** * 模块私有数据 ** */
	var defaults = {
		id : "",
		value : ""
	};
 
	/** * 类定义 ** */
	var Hidden = function(configs) {
		 //类的属性定义
		this.configs=$.extend(true,{},defaults,configs);
		this._className="sea_hidden";
		//初始化
		this.hidden=this._input= $("<input type='hidden'/>");
		this.init();
	};
	//类公共方法
	var Input=require("Input").create();
	Hidden.prototype= $.extend({},Input,{
		/**多态：新增或覆盖父类方法**/
		//检查函数
		check:function(configs){
			return true;
		}
	});
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new Hidden(configs);
	};
});
