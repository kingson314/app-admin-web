define(function(require, exports, module) {
	/** * 模块外部依赖 ** */
	//require.async((("./css/accordionlayout.css");
	var String = require("String");
	var Component = require("Component");
	/** * 模块私有数据 ** */
	var ClassName="sea_accordionLayout";
	// 默认配置
	var defaults = {
		parent: null,
		// 父元素
		id: "",
		name: "",
		title: null,
		buttons: [],
		width: null,
		height: null,
		cls: "",
		css: {"margin":"0 auto"},
		attr: {},
		labelWidthPercent: 0.382,// 黄金分割线，必须为数字；fieldWidth=1-labelWidthPercent
		events: {
			click: null,
			change: null
		},
		items: [//只支持两层嵌套
//		        {
//		        	id:"",						//分组项
//			        label:"",
//			        items:[{					//子分组项
//							id: "",
//							name: "",
//							label: "",
//							type: "",
//							format: "",
//							value: "",
//							isNull: "",
//							cls: "",
//							css: "",
//							attr: "",
//							options: [{
//								value: "",
//								text: ""
//							}],
//							events: {
//								click: null,
//								change: null
//							}
//		        	}]
//		        }
		]
	};
	/** * 模块私有方法 ** */
	var self = {
		// 初始化
		init: function(me) {
			// 控件封装
			me.layout=me.accordionLayout=$("<div></div>").addClass(ClassName);
		  	//控件类名设置
		    Component.addClass(me.accordionLayout,me.configs);
		    //控件样式设置
			Component.css(me.accordionLayout, me.configs);
			// 控件属性设置
			Component.attr(me.accordionLayout, me.configs);
			
		  if(me.configs.parent){
			  if ($.type(me.configs.parent) == "string") {
					me.parent = $(me.configs.parent);
				} else {
					me.parent = me.configs.parent;
			   }
			  me.parent.append(me.accordionLayout)
		   }

			if (me.configs.title) {
				$("<div></div>").addClass(ClassName + "_title").append(Global.getI18N(me.configs.title)).appendTo(me.accordionLayout);
			}
			
			for (var i = 0; i < me.configs.items.length; i++) {
				var groupConfig = me.configs.items[i];
				var group=$("<div></div>").addClass(ClassName + "_group")
				.append("<div class='"+ClassName + "_groupTitle'><i class='glyphicon glyphicon-plus-sign'></i>&nbsp;"+Global.getI18N(groupConfig.label)+"</div>")
				.appendTo(me.accordionLayout);
				//控件类名设置
			    Component.addClass(group,groupConfig);
			    //控件样式设置
				Component.css(group,groupConfig);
				// 控件属性设置
				Component.attr(group,groupConfig);
				for (var j = 0; j < groupConfig.items.length; j++) {
					var groupItem=$("<div>").addClass(ClassName + "_groupItem").appendTo(group);
					if(i==0){
						groupItem.show();
						//group.css("border-bottom","1px solid #d5d5d5");
						group.find("i").removeClass("glyphicon-plus-sign").addClass("glyphicon-minus-sign");
					}else{
						groupItem.hide();
					}
					var item=groupConfig.items[j];
					if (!item.type) {
						continue;
					}
					switch (item.type.toLowerCase()) {
					/***对表单提供单列支持***/
					case "hidden":
						var hidden = $("<input type='hidden' />").appendTo(groupItem);
						Component.attr(hidden, item);
						Component.val(hidden, item);
						break;
					case "textfield":
						_Component = require("Textfield").create(item);
						if (_Component.label) {
							groupItem.append(_Component.label.css({
								"width": "38.2%",
								"text-align": "right",
								"padding-right": "5px"
							}));
							groupItem.append(_Component.textfield.css("width", "61.8%").removeClass("sea_drager"));
						} else {
							groupItem.append(_Component.textfield.css("width", "100%").removeClass("sea_drager"));
						}
					    Component.addClass(groupItem,item);
						Component.css(groupItem,item);
						Component.attr(groupItem,item);
						break;
					case "textarea":
						_Component = require("Textarea").create(item);
						if (_Component.label) {
							groupItem.append(_Component.label.css({
								"width": "38.2%",
								"text-align": "right",
								"padding-right": "5px"
							}));
							groupItem.append(_Component.textarea.css("width", "61.8%").removeClass("sea_drager"));
						} else {
							groupItem.append(_Component.textarea.css("width", "100%").removeClass("sea_drager"));
						}
						Component.addClass(groupItem,item);
						Component.css(groupItem,item);
						Component.attr(groupItem,item);
						break;
					case "select":
						_Component = require("Select").create(item);
						if (_Component.label) {
							groupItem.append(_Component.label.css({
								"width": "38.2%",
								"text-align": "right",
								"padding-right": "5px"
							}));
							groupItem.append(_Component.select.css("width", "61.8%").removeClass("sea_drager"));
						} else {
							groupItem.append(_Component.select.css("width", "100%").removeClass("sea_drager"));
						}
						Component.addClass(groupItem,item);
						Component.css(groupItem,item);
						Component.attr(groupItem,item);
						break;
					case "button":
						_Component=require("Button").create(item);
						_Component.button.addClass(ClassName + "_btn").appendTo(groupItem).removeClass("sea_drager");
						Component.addClass(groupItem,item);
						Component.css(groupItem,item);
						Component.attr(groupItem,item);
						break;
					case "row":
						var row=$("<div class='sea_drager sea_draglayout' style='float:none'></div>").appendTo(groupItem);
						Component.css(row,item);
						$.each(item.items,function(index,item){
							var  col=$("<div class='sea_droper'>"+item.label+"</div>").appendTo(row);
							Component.css(col,item);
						});
						break;
					case "layout":
						$('<div class="sea_drag_only" style="float:none;"><div class="sea_drager sea_draglayout" style="float:none;">'
							+'<div class="sea_droper" style="width:100%;border:0" title="一栏"></div>'
						+'</div>'
						+'<div class=" sea_drager sea_draglayout" style="float:none;">'
						+'	<div class="sea_droper " style="width:50%;border:0;border-right:1px dashed #222" title="二栏"> </div>'
						+'	<div class="sea_droper" style="width:50%; border:0"> </div>'
						+'</div></div>'
						).appendTo(groupItem);
						break;						
					default:
						break;
					}
				}
			}
			me.accordionLayout.find("."+ClassName + "_groupTitle").click(function(){
				$(this).parent().siblings().find("."+ClassName + "_groupItem").slideUp(300);
				me.accordionLayout.find("."+ClassName + "_group").css("border","0");
				me.accordionLayout.find("."+ClassName + "_groupTitle>i").removeClass("glyphicon-plus-sign").removeClass("glyphicon-minus-sign").addClass("glyphicon-plus-sign");
				if($(this).nextAll().css("display")=="none"){
					$(this).nextAll().slideDown(300);
					//$(this).parent().css("border-bottom","1px solid #d5d5d5");
					$(this).parent().find("i").removeClass("glyphicon-plus-sign").addClass("glyphicon-minus-sign");
				}else $(this).nextAll().slideUp(300);
			});
		}
	};
	/** * 类定义 ** */
	var AccordionLayout = function(configs) {
		this.configs = $.extend(true, {},defaults, configs);
		self.init(this);
	};

	// 类公共方法
	AccordionLayout.prototype = {
	};
		
	/** *输出类对象 ** */
	exports.create = function(configs) {
		return new AccordionLayout(configs);
	};
});