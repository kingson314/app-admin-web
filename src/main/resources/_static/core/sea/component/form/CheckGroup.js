define(function(require, exports, module) {
	/** * 模块外部依赖 ** */
	//require.async(("./css/checkgroup.css");
	var Component = require("Component");
	var Array = require("Array");
	/** * 模块私有数据 ** */
	var defaults = {
			id:"",
			align:"0",//横排：horizontal  或 0; 竖排：vertical 或 1
			cls : "",
			css : {},
			cssLi:{},
			attr : {	},
			items:[{
				label:"",
				value:"",
				checked:false,
				html:"",
				cls : "",
				css : {},
				attr : {	},
				events : {
					//click : null
				}
			}]
	};
	/** * 模块私有方法 ** */
	var self = {
		init : function(me) {
			me.checkGroup=$("<div></div>").addClass(me._className);
			me.checkboxs=[];
			me.label = Component.createLabel(me.configs);
			var ul=$("<ul></ul>").appendTo(me.checkGroup);
			$.each(me.configs.items,function(index,item){
				var li=$("<li></li>").css(me.configs.cssLi).appendTo(ul);
				if(me.configs.align=="0"||me.configs.align=="horizontal"){
					li.css("display","inline");
				}
				item.labelCls="sea_checkLabel";
				item.id=me.configs.id+index;
				var checkbox=$("<input  id='"+item.id+"' type='checkbox'/>").appendTo(li);
				if(item.checked){
					checkbox.attr("checked",item.checked);
				}
				me.checkboxs.push(checkbox);
				var label=Component.createLabel(item).appendTo(li);
				if(item.html)ul.append(item.html);
				// 控件类名设置
				Component.addClass(checkbox, item);
				// 控件样式设置
				Component.css(checkbox, item);
				// 控件的属性设置
				Component.attr(checkbox, item);
				// 控件默认值
				Component.val(checkbox, item);
				// 控件的事件绑定
				Component.bind(checkbox, item);
			});
			// 控件类名设置
			Component.addClass(me.checkGroup, me.configs);
			// 控件样式设置
			Component.css(me.checkGroup, me.configs);
			// 控件的属性设置
			Component.attr(me.checkGroup, me.configs);
		}
	};
	/** * 类定义 ** */
	var CheckGroup = function(configs) {
		// 类的属性定义
		this.configs = $.extend(true, {}, defaults, configs);
		// 初始化
		// 类的属性定义
		this.configs=$.extend(true,{},defaults,configs);
		this._className="sea_checkgroup";
		//初始化
		self.init(this);
	};
	// 类公共方法
	CheckGroup.prototype = {
		 val:function(data){
			if(data){
				data=data[this.configs.id];
				$.each(this.checkboxs,function(index,item){
					if(Array.getIndex(data,item.val())>=0){
						item.attr("checked",true);
					}
				});
			}else{
				var rs=[];
				for(var i=0;i<this.checkboxs.length;i++){
					if(this.checkboxs[i].is(':checked')){
						rs.push(this.checkboxs[i].val());
					}
				}
				return rs.join("|");
			}
		},
		check:function(){
			if(this.configs.isNull==false){
				this.checkGroup.parent().removeClass("sea_input_warning");
				for(var i=0;i<this.checkboxs.length;i++){
					if($(this.checks[i]).is(':checked')){
						return true;
					}
				}
				this.checkGroup.parent().addClass("sea_input_warning");
				this.checkGroup.parent().attr("title","该字段不能为空").tip({}).trigger("show");
				return false;
			}
			return true;
		},
		clear:function(){
			this.checkGroup.find("input[type=checkbox]").removeAttr("checked");
		},
		//设置焦点
		focus:function(){
			return Component.focus($(this.checks[0]));
		}
	};
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new CheckGroup(configs);
	};
});
