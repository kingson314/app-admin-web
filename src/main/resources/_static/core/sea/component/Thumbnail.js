define(function(require, exports, module) {
	/** * 模块外部依赖 ** */
	//require.async(("./css/thumbnail.css");
	var Component = require("Component"); 
	/** * 模块私有数据 ** */
	var defaults = {
			id:"",
			cls : "",
			css : {},
			attr : {	},
			imgSrc:"",
			imgCss:null,
			imgClick:null,
			title:"",
			content:""
	};
		/** * 模块私有方法 ** */
	var self = {
		init : function(me) {
			me.thumbnail=$("<div></div>").addClass(me._className);
			var img=$("<img class='"+me._className+"_img"+"' src='"+me.configs.imgSrc+"'>").css(me.configs.imgCss);
			if(me.configs.imgClick){
				img.click(function(){
					me.configs.imgClick();
				});
			}
			me.a=$("<a></a>").addClass(me._className+"_a").append("<i class='"+me.configs.icon+"'></i>").append(img).appendTo(me.thumbnail);
			me.caption=$("<div></div>").addClass(me._className+"_caption").appendTo(me.thumbnail);
			me.title=$("<span>"+me.configs.title+"</span>").addClass(me._className+"_title").appendTo(me.caption);
			me.content=$("<p>"+me.configs.content+"</p>").addClass(me._className+"_content").appendTo(me.caption);
			// 控件类名设置
			Component.addClass(me.thumbnail, me.configs);
			// 控件样式设置
			Component.css(me.thumbnail, me.configs);
			// 控件的属性设置
			//Component.attr(me.thumbnail, me.configs);
		}
	}; 
	/** * 类定义 ** */
	var Thumbnail = function(configs) {
		// 类的属性定义
		this.configs = $.extend(true, {}, defaults, configs);
		this._className="sea_thumbnail";
		// 初始化
		self.init(this);
	};
	// 类公共方法
	Thumbnail.prototype = {
		 
	};
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new Thumbnail(configs);
	};
});
