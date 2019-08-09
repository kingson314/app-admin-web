define(function(require, exports, module) {
	/** * 模块外部依赖 ** */
	var Component = require("Component");
	var Lang = require("Lang");
	var Boolean = require("Boolean");
	var Dialog = require("Dialog");
	var Tip = require("Tip");
	/** * 模块私有数据 ** */
	/** * 类定义 ** */
	var Input = function(configs) {
		// 类的属性定义
		//this.configs = $.extend(true, {}, defaults, configs);
		//this._className="";
		// 初始化
		//this.init();
	};
	// 类公共方法
	Input.prototype = {
		//初始化函数
		init:function(){
			this.label = Component.createLabel(this.configs);
			this.tip = Component.createTip(this.configs);
			// 控件封装
			this._input.addClass(this._className);
			// 控件类名设置
			Component.addClass(this._input, this.configs);
			// 控件样式设置
			Component.css(this._input, this.configs);
			// 控件默认值
			Component.val(this._input, this.configs);
			// 控件的属性设置
			Component.attr(this._input, this.configs);
			// 控件的事件绑定
			Component.bind(this._input, this.configs);
		},
		//检查函数
		check:function(){
			this._input.removeClass("sea_input_warning");
			if(this.configs.isNull==false){
				if($.trim(this._input.val())==""){
					this._input.addClass("sea_input_warning");
					this._input.parent().tip({content:Global.getI18N(this.configs.nullWarning)||Lang.nullwarning}).trigger("show");
					return false;
				}
			}
			if($.trim(this._input.val())==""){
				return true;
			}
			try{
				if(this.configs.len && this.configs.len!=""){
					var len= Number(this.configs.len);
					if(this._input.val().length>len){
						this._input.addClass("sea_input_warning");
						this._input.parent().attr("title",Lang.maxLen+len).tip({}).trigger("show");
						return false;
					}
				}
				
				if(this.configs.maxLen && this.configs.maxLen!=""){
					var len= Number(this.configs.maxLen);
					if(this._input.val().length>len){
						this._input.addClass("sea_input_warning");
						this._input.parent().attr("title",Lang.maxLen+len).tip({}).trigger("show");
						return false;
					}
				}
				
				if(this.configs.minLen && this.configs.minLen!=""){
					var len= Number(this.configs.minLen);
					if(this._input.val().length<len){
						this._input.addClass("sea_input_warning");
						this._input.parent().attr("title",Lang.minLen+len).tip({}).trigger("show");
						return false;
					}
				}
				
			}catch(e){}
			
			if(this.configs.limit){
				if(this.configs.limit=="date"){
					if(Boolean.isDate(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().attr("title",Lang.date+"[YYYY-MM-DD]").tip({}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="time"){
					if(Boolean.isTime(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().attr("title",Lang.date+"[HH:MM:SS]").tip({}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="datetime"){
					if(Boolean.isDateTime(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().attr("title",Lang.datetime+"[YYYY-MM-DD HH:MM:SS]").tip({}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="digits"){
					if(Boolean.isDigits(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.digits}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="money"){
					if(Boolean.isMoney(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.money}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="email"){
					if(Boolean.isEmail(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.email}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="number"){
					if(Boolean.isNumber(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.number}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="phone"){
					if(Boolean.isPhone(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.phone}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="mobile"){
					if(Boolean.isMobile(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.mobile}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="tel"){
					if(Boolean.isTel(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.tel}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="qq"){
					if(Boolean.isQq(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.qq}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="integer"||this.configs.limit=="int"){
					if(Boolean.isInteger(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang["int"]}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="double"||this.configs.limit=="float"){
					if(Boolean.isDouble(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang["double"]}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="post"){
					if(Boolean.isPostCode(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.post}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="url"){
					if(Boolean.isUrl(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.url}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="password"){
					if(Boolean.isPwd(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.password}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="char"){
					if(Boolean.isChar(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang["char"]}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="en"){
					if(Boolean.isEnglish(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.en}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="cardno"){
					if(Boolean.isIdCardNo(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.cardno}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="cn"){
					if(Boolean.isChinese(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.cn}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="chinesechar"){
					if(Boolean.isChineseChar(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.chinesechar}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="stringcheck"){
					if(Boolean.stringCheck(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.stringcheck}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="stringfilter"){
					if(Boolean.stringFilter(this._input.val())==false){
						this._input.parent().tip({content:Lang.stringfilter}).trigger("show");
						this._input.addClass("sea_input_warning");
						return false;
					}
				}else if(this.configs.limit=="specialchar"){
					if(Boolean.isContainsSpecialChar(this._input.val())==false){
						this._input.parent().tip({content:Lang.specialchar}).trigger("show");
						this._input.addClass("sea_input_warning");
						return false;
					}
				}
			}
			return true;
		},
		//白盒测试函数
		test:function(data){
			
		},
		//值获取或赋值函数
		val:function(data){
			if(data!=null&&data!=undefined){
				data=data[this.configs.id];
				this._input.val(data);
			}else{ 
				return this._input.val();
			}
		},
		//清空函数
		clear:function(){
			this._input.val("");
		},
		//设置焦点
		focus:function(){
			return Component.focus(this._input);
		},
		//显示 
		show:function(){
			return Component.show(this._input);
		},
		//隐藏
		hide:function(){
			return Component.hide(this._input);
		},
		//禁用
		disabled:function(){
			return Component.disable(this._input);
		},
		//启用
		enabled:function(){
			return Component.enabled(this._input);
		}
	};
	/** * 输出类对象 ** */
	exports.create = function() {
		return new Input();
	};
});
