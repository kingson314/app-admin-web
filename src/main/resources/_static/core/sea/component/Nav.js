define(function(require, exports, module) {
	//require.async(("./css/nav.css");
	/** * 模块私有数据 ** */
	var	defaults = {
			selector:""
		};
	/** * 类定义 ** */
	var Nav = function(configs) {
		// 类的属性定义
		this.configs = $.extend(true, {}, defaults, configs);
		// 初始化
		// 类的属性定义
		this.configs=$.extend(true,{},defaults,configs);
		this._className="sea_nav";
		this.nav=$(this.configs.selector).show();
		this.nav.find(".sea_nav_main > li>a").click(function(){
				$(this).parent().addClass("sea_nav_active").siblings().removeClass("sea_nav_active");
			});
	};
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new Nav(configs);
	};
});
