define(function(require, exports, module) {
	/** * 模块外部依赖 ** */
	//require.async(("./css/tabLayout.css");
	var Component = require("Component"); 
	/** * 模块私有数据 ** */
	var defaults = {
			id:"_tablayout",
			//align:"0",//横排：horizontal  或 0; 竖排：vertical 或 1
			position:"top",//top,bottom,left,right
			cls : "",
			width:"100%",
			height:"100%",
			titleHover:false,
			css : {},
			attr : {},
			separatorWidth:null,
			items:[{
				id : "",
				title : "",
				cls : "",
				css : {},
				attr : {},
				icon:null,
				events : {
					//click : null
				},
				content:null
			}]
	};
	/** * 模块私有方法 ** */
	var self = {
		init : function(me) {
			me.tabLayout=$("<div></div>").addClass(me._className);
			// 初始化
			if (me.configs.parent) {
				if ($.type(me.configs.parent) == "string") {
					me.parent = $(me.configs.parent);
				} else {
					me.parent = me.configs.parent;
				}
				me.parent.append(me.tabLayout);
			}
			// 控件类名设置
			Component.addClass(me.tabLayout, me.configs);
			// 控件样式设置
			Component.css(me.tabLayout, me.configs);
			// 控件的属性设置
			Component.attr(me.tabLayout, me.configs);
//			.mouseleave(function(){
//				me.tabLayout.hide();
//			});
			me.tab=$("<ul></ul>").appendTo(me.tabLayout);
			me.title=[];
			me.content=[];
			$.each(me.configs.items,function(index,item){
				if(item.icon){
					var li=$("<li></li>").appendTo(me.tab);
					li.append("<a href='#'><i  class='"+item.icon+"'></i>&nbsp;"+Global.getI18N(item.title)+"</a>");
				}else{
					var li=$("<li></li>").appendTo(me.tab);
					li.append("<a href='#'>"+Global.getI18N(item.title)+"</a>");
				}
				if(index==0)li.addClass(me._className+"_active");
				me.title.push(li);
				if(me.configs.position=="top"||me.configs.position=="bottom"){
					li.css("display","inline");
					if(me.configs.separatorWidth)li.css({"margin-ight":me.configs.separatorWidth});
					//li.find("a").css("border-right","1px solid #d5d5d5");
				}else{
					if(me.configs.separatorWidth)li.css({"margin-bottom":me.configs.separatorWidth});
					//li.find("a").css("border-bottom","1px solid #d5d5d5");
				}
				
				// 控件类名设置
				Component.addClass(li.find("a"), item);
				// 控件样式设置
				Component.css(li.find("a"), item);
				// 控件的属性设置
				Component.attr(li.find("a"), item);
				// 控件的事件绑定
//				Component.bind(li.find("a"), item);
				var content=$("<div></div>").addClass(me._className+"_content").appendTo(me.tabLayout);
				if(index>0){
					content.hide();
				}
				if(item.content){
					content.append(item.content);
				}
				me.content.push(content);
//				li.find("a").hover(function(){
//					var index=$(this).parent().index();
//					me.tab.find("li").removeClass(me._className+"_active");
//					$(this).parent().addClass(me._className+"_active");
//					$("."+me._className+"_content").hide();
//					$("."+me._className+"_content:eq("+index+")").show();
//				},function(){
//				});
			});
//			me.tab.delegate("li a","click hover",function(){
			me.tab.delegate("li a","click",function(){
				var index=$(this).parent().index();
				me.tab.find("li").removeClass(me._className+"_active");
				$(this).parent().addClass(me._className+"_active");
				$("."+me._className+"_content").hide();
				$("."+me._className+"_content:eq("+index+")").show();
				if(me.configs.items[index].click){
					me.configs.items[index].click(me.content[index]);
				}
			});
			
//			if(me.configs.position=="top"||me.configs.position=="bottom"){
//				me.tab.append("<li style='display:inline;'><span class='" + me._className+ "_title_btn glyphicon glyphicon-remove'></span></li>");
//				me.tab.find("." + me._className + "_title_btn").click(function() {
//					me.tabLayout.hide();
//				});
//			}
			self.resize(me);
		},
		resize:function(me){
			var  interval=setInterval(function(){
				if($("#"+me.configs.id).length>0){
					clearInterval(interval);
					self._resize(me);
				}
			},100);
		},
		_resize:function(me){
			$.each(me.content,function(index,content){
				if(me.configs.position=="top"){
					me.tab.css({width:"100%",left:0,top:0});
					content.css({width:"100%",height:me.tabLayout.height()-me.tab.height(),left:0,top:me.tab.height()});
				}else if(me.configs.position=="bottom"){
					me.tab.css({width:"100%",left:0,bottom:0,"border-top":"1px solid #d5d5d5"});
					content.css({width:"100%",height:me.tabLayout.height()-me.tab.height()});
				}else if(me.configs.position=="left"){
					var ulWidth=126;//me.tab.find("a:eq(0)").outerWidth(true);
					me.tab.css({width:ulWidth,height:"100%","border-right":"1px solid #d5d5d5"});
					content.css({height:"100%",width:me.tabLayout.width()-ulWidth,left:ulWidth,top:0});
				}else if(me.configs.position=="right"){
					var ulWidth=126;
					me.tab.css({width:ulWidth,height:"100%","border-left":"1px solid #d5d5d5",right:0,top:0});
					content.css({height:"100%",width:me.tabLayout.width()-ulWidth,right:ulWidth,top:0});
				}
			});
		}
	};
	/** * 类定义 ** */
	var TabLayout = function(configs) {
		// 类的属性定义
		this.configs = $.extend(true, {}, defaults, configs);
		// 初始化
		// 类的属性定义
		this.configs=$.extend(true,{},defaults,configs);
		this._className="sea_tabLayout";
		//初始化
		self.init(this);
	};
	// 类公共方法
	TabLayout.prototype = {
		 reload:function(i,content){
			$(this.content[i]).empty().append(content);
		 },
		setActive:function(i){
			 this.title[i].find("a").click();
		}
	};
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new TabLayout(configs);
	};
});
