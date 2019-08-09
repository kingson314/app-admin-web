define(function(require, exports, module) {
	/** * 模块外部依赖 ** */
	//require.async(("./css/mask.css");
	/** * 模块私有数据 ** */
	var  defaults = {
			id:"",
			loadingMsg:"is currently running"
	    };
	/** * 模块私有方法 ** */
	 var self={
	 	init:function(me){
	 		me.mask=$("<div></div>").addClass(me._className).appendTo($("body"));
	 		if(me.configs.loadingMsg){
	 			me.mask_loading=$('<div class="sea_mask_loading"></div>').insertAfter(me.mask);
	 		}
	 	}
	 };
	/** * 类定义 ** */
	var Mask = function(configs) {
		// 类的属性定义
		this.configs = $.extend(true, {}, defaults, configs);
		this._className="sea_mask";
		// 初始化
		self.init(this);
	};
	// 类公共方法
	Mask.prototype = {
		hide:function(){
			 this.mask.hide();
			 this.mask_loading&&this.mask_loading.hide();
		}
	};
	
	/** * 输出类对象 ** */
	exports.show = function(configs,fun) {
		var mask=new Mask(configs);
		if(fun){
			 setTimeout(function(){
				 fun();
				 mask.hide();
			 },600);
		 }
		return mask;
	};
});
