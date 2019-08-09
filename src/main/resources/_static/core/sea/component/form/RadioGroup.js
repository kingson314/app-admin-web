define(function(require, exports, module) {
	/** * 模块外部依赖 ** */
	var Component = require("Component");
	
	/** * 模块私有数据 ** */
	var defaults = {
			id:"",
			name:"",//必须有name
			align:"0",//横排：horizontal  或 0; 竖排：vertical 或 1
			cls : "",
			isNull:true,
			css : {},
			attr : {	},
			items:[{
//				id : "",
//				value : "",
//				checked:false,
//				cls : "",
//				css : {},
//				attr : {	},
//				events : {
//					click : null
//				}
			}]
	};
	/** * 模块私有方法 ** */
	var self = {
		init : function(me) {
		me.radioGroup=$("<div></div>").addClass(me._className);
		me.radios=[];
		me.label = Component.createLabel(me.configs);
		var ul=$("<ul></ul>").appendTo(me.radioGroup);
		$.each(me.configs.items,function(index,item){
			var li=$("<li ></li>").appendTo(ul);
			if(me.configs.align=="0"||me.configs.align=="horizontal"){
				li.css({"display":"inline","float":"left"});
			}
			item.labelCls="sea_radioLabel";
			item.id=me.configs.id+index;
			var checked="";
			if(item.value==me.configs.value){
				checked="checked";
			}
			var radio=$("<input id='"+item.id+"' type='radio' name='"+(me.configs.name||me.configs.id)+"' value='"+item.value+"' "+checked+"/>").appendTo(li);
			
			me.radios.push(radio);
			li.append("&nbsp;");
			var label=Component.createLabel(item).appendTo(li);
			// 控件类名设置
			Component.addClass(radio, item);
			// 控件样式设置
			Component.css(radio, item);
			// 控件的属性设置
			Component.attr(radio, item);
			// 控件默认值
			Component.val(radio, item);
			// 控件的事件绑定
			Component.bind(radio, item);
		});
		// 控件类名设置
		Component.addClass(me.radioGroup, me.configs);
		// 控件样式设置
		Component.css(me.radioGroup, me.configs);
		// 控件的属性设置
		Component.attr(me.radioGroup, me.configs);
		}
	};
	/** * 类定义 ** */
	var RadioGroup = function(configs) {
		// 类的属性定义
		this.configs = $.extend(true, {}, defaults, configs);
		// 初始化
		// 类的属性定义
		this.configs=$.extend(true,{},defaults,configs);
		this._className="sea_radiogroup";
		//初始化
		self.init(this);
	};
	// 类公共方法
	RadioGroup.prototype = {
		val:function(data){
			if(data){
				data=data[this.configs.id];
				$.each(this.radios,function(index,item){
					item.removeAttr("checked");
					if(item.val()==data){
						item.click();
						item.attr("checked",true);
					}
				});
			}else{
				for(var i=0;i<this.radios.length;i++){
					if(this.radios[i].is(':checked')){
						return this.radios[i].val();
					}
				}
				return "";
			}
		},
		check:function(){
			if(this.configs.isNull==false){
				this.radioGroup.parent().removeClass("sea_input_warning");
				for(var i=0;i<this.radios.length;i++){
					if($(this.radios[i]).is(':checked')){
						return true;
					}
				}
				this.radioGroup.parent().addClass("sea_input_warning");
				this.radioGroup.parent().attr("title","该字段不能为空").tip({}).trigger("show");
				return false;
			}
			return true;
		},
		clear:function(){
			this.radioGroup.find("input[type=radio]").removeAttr("checked");
		},
		//设置焦点
		focus:function(){
			return Component.focus($(this.radios[0]));
		}
	};
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new RadioGroup(configs);
	};
});
