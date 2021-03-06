define(function(require, exports, module) {
	//require.async(("./css/popmenu.css");
	/** * 模块私有数据 ** */
	var	defaults = {
			selector:""
		};
		/** * 类定义 ** */
	var Popmenu = function(configs) {
		// 类的属性定义
		this.configs = $.extend(true, {}, defaults, configs);
		// 初始化
		// 类的属性定义
		this.configs=$.extend(true,{},defaults,configs);
		this._className="sea_popmenu";
		var html=[];
		html.push("<div class='"+this._className+"' style='display:none;'>");
		html.push(" <ul>");
		html.push("	<li class='folder'><a href='#'  onclick='newfolder();'><i class='iconfont icon-addfolder'></i>新建目录</a></li>");
		html.push("	<li class='folder'><a href='#'  onclick='newsubfolder();'><i class='iconfont icon-Addfolder'></i>新建子目录</a></li>");
		html.push("	<li class='note separator'><a href='#' onclick='newnote();'><i class='iconfont icon-Addfile'></i>新建笔记</a></li>");
		html.push("	<li><a href='#' onclick='rename();'><i class='iconfont icon-rename'></i>重命名</a></li>");
		html.push("	<li class='separator'><a  href='#' onclick='del();'><i class='iconfont icon-remove'></i>删除</a></li>");
		html.push("	<li><a href='#' onclick='share();'><i class='iconfont icon-share'></i>分享</a></li>");
		html.push("	<li><a href='#' onclick='encrypt();'><i class='iconfont icon-password3'></i>阅读密码</a></li>");
		html.push("</ul>");
		html.push("</div>");
		this.popmenu=$(html.join("")).show();
	};
	// 类公共方法
	Popmenu.prototype = {
	};
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new Popmenu(configs);
	};
});
