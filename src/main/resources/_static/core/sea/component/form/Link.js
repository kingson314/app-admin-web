define(function(require, exports, module) {
	/** * 模块外部依赖 ** */
	//require.async(("./css/link.css");
	var Component = require("Component"); 
	/** * 模块私有数据 ** */
	var defaults = {
			id:"",
			separator:"&nbsp;",
			cls : "",
			css : {},
			attr : {	},
			items:[{
				id : "",
				label : "",
				imgCls:"",
				imgAlign:"left",
				cls : "",
				css : {},
				attr : {},
				events : {
					//click : null
				}
			}]
	};
		/** * 模块私有方法 ** */
	var self = {
		init : function(me) {
			me.link=$("<div></div>").addClass(me._className);
			var ul=$("<ul></ul>").appendTo(me.link);
			var len=me.configs.items.length;
			$.each(me.configs.items,function(index,item){
				var	li=$("<li></li>").appendTo(ul); 
				var a=$("<a href='#'>"+Global.getI18N(item.label)+"</a>").appendTo(li);
				if(item.imgCls){
					if(item.imgAlign&&item.imgAlign=="left"){
						a.prepend("<span  class='"+item.imgCls+"'></span>");
					}else{
						a.append("<span  class='"+item.imgCls+"'></span>");
					}
				}
				// 控件类名设置
				Component.addClass(a, item);
				// 控件样式设置
				Component.css(a, item);
				// 控件的属性设置
				Component.attr(a, item);
				// 控件的事件绑定
				Component.bind(a, item);
				if(index<len-1){
					$("<li></li>").append(me.configs.separator).appendTo(ul);
				}
			});
			// 控件类名设置
			Component.addClass(me.link, me.configs);
			// 控件样式设置
			Component.css(me.link, me.configs);
			// 控件的属性设置
			Component.attr(me.link, me.configs);
		}
	}; 
	/** * 类定义 ** */
	var Link = function(configs) {
		// 类的属性定义
		this.configs = $.extend(true, {}, defaults, configs);
		this._className="sea_link";
		// 初始化
		self.init(this);
	};
	// 类公共方法
	Link.prototype = {
		 
	};
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new Link(configs);
	};
});
