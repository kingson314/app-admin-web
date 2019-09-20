define(function(require, exports, module) {
	/** * 模块外部依赖 ** */
	//require.async(("./css/toolbar.css");
	var Component = require("Component"); 
	/** * 模块私有数据 ** */
	var defaults = {
			id:"",
			align:"0",//横排：horizontal  或 0; 竖排：vertical 或 1
			cls : "",
			css : {},
			attr : {},
			separatorWidth:null
//			,items:[{
//				id : "",
//				value : "",
//				cls : "",
//				css : {},
//				cssLi:{},
//				attr : {},
//				icon:null,
//				events : {
//					//click : null
//				}
//			}]
	};
	/** * 模块私有方法 ** */
	var self = {
		init : function(me) {
			me.toolbar=$("<div></div>").addClass(me._className);
			var ul=$("<ul></ul>").appendTo(me.toolbar);
			$.each(me.configs.items,function(index,item){
				var li=$("<li></li>").css(item.cssLi||{}).appendTo(ul);
				if(item.type){
					switch (item.type.toLowerCase()) {
					case "select":
						_Component = require("Select").create(item);
						if (_Component.label) {
							 li.append(_Component.label);
						}
						li.append( _Component.select);
						break;
					case "textfield":
						_Component = require("Textfield").create(item);
						if (_Component.label) {
							 li.append(_Component.label);
						}
						li.append( _Component.textfield);
						break;
					case "file":
						if(!item.path)	item.path="uploads/import";
						item.showImg=false;
						_Component = require("File").create(item).file.css({"display":"inline"});
						_Component.find("input[type!=button]").removeAttr("style").css({"display":"none"});
						_Component.find("input[type=button]").removeAttr("style").css({"margin-left":"10px","padding":"0 20px","background":"transparent url(app/css/images/import.png) no-repeat left center"}).val(item.value);
						li.append( _Component);
						break;
					case "msgfile":
						if(!item.path)	item.path="uploads/import";
						item.showImg=false;
						_Component = require("File").create(item).file.css({"display":"inline"});
						_Component.find("input[type!=button]").removeAttr("style").css({"display":"none"});
						_Component.find("input[type=button]").removeAttr("style").css({"height":"40px","margin-left":"10px","border":"0","padding":"5px 15px 5px 15px","background":"transparent url(app/css/images/msgfile.png) no-repeat left center"}).val(item.value);
						li.append( _Component);
						break;
					default:
						break;
					}
				}else if(item.icon){
					li.append("<button class='sea_button' type='button'><span style='display:inline-block' class='"+item.icon+"'></span>"+Global.getI18N(item.value||"")+"</button>");
				}else{
					li.append("<button class='sea_button' type='button'>"+Global.getI18N(item.value||"")+"</button>");
				}
				if(me.configs.align=="0"||me.configs.align=="horizontal"){
					li.css("display","inline");
					if(me.configs.separatorWidth)li.css("margin-ight",me.configs.separatorWidth);
				}else{
					if(me.configs.separatorWidth)li.css("margin-bottom",me.configs.separatorWidth);
				}
				var buttons=li.find("button");
				// 控件类名设置
				Component.addClass(buttons, item);
				// 控件样式设置
				Component.css(buttons, item);
				// 控件的属性设置
				Component.attr(buttons, item);
				// 控件的事件绑定
				Component.bind(buttons, item);
			});
			// 控件类名设置
			Component.addClass(me.toolbar, me.configs);
			// 控件样式设置
			Component.css(me.toolbar, me.configs);
			// 控件的属性设置
			Component.attr(me.toolbar, me.configs);
		}
	};
	/** * 类定义 ** */
	var Toolbar = function(configs) {
		// 类的属性定义
		this.configs = $.extend(true, {}, defaults, configs);
		// 初始化
		// 类的属性定义
		this.configs=$.extend(true,{},defaults,configs);
		this._className="sea_toolbar";
		//初始化
		self.init(this);
	};
	// 类公共方法
	Toolbar.prototype = {
		 
	};
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new Toolbar(configs);
	};
});