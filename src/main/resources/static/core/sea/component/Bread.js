define(function(require, exports, module) {
	/** * 模块外部依赖 ** */
	//require.async(("./css/bread.css");
	var Component = require("Component"); 
	/** * 模块私有数据 ** */
	var defaults = {
			id:"",
			separator:"/",
			cls : "",
			css : {},
			cssUl:{},
			cssLi:{},
			attr : {	},
			items:[{
				id : "",
				label : "",
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
			me.bread=$("<div></div>").addClass(me._className);
			var ul=$("<ul></ul>").appendTo(me.bread).css(me.configs.cssUl);
			me.image=$("<li></li>").css(me.configs.cssLi).append("<span  class='iconfont icon-forward'></span>").appendTo(ul);
			var len=me.configs.items.length;
			$.each(me.configs.items,function(index,item){
				var	li=$("<li></li>").css(me.configs.cssLi).append("<a href='#'>"+Global.getI18N(item.label)+"</a>").appendTo(ul); 				 
				// 控件类名设置
				Component.addClass(li, item);
				// 控件样式设置
				Component.css(li, item);
				// 控件的属性设置
				Component.attr(li, item);
				// 控件的事件绑定
				Component.bind(li.find("a"), item);
				if(index<len-1){
					$("<li></li>").css(me.configs.cssLi).append(me.configs.separator).appendTo(ul);
				}
			});
			// 控件类名设置
			Component.addClass(me.bread, me.configs);
			// 控件样式设置
			Component.css(me.bread, me.configs);
			// 控件的属性设置
			Component.attr(me.bread, me.configs);
		}
	}; 
	/** * 类定义 ** */
	var Bread = function(configs) {
		// 类的属性定义
		this.configs = $.extend(true, {}, defaults, configs);
		this._className="sea_bread";
		// 初始化
		self.init(this);
	};
	// 类公共方法
	Bread.prototype = {
		 
	};
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new Bread(configs);
	};
});
