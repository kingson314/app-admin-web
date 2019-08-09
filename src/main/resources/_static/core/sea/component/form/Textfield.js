define(function(require, exports, module) {
	/*** 模块外部依赖 ***/
	/** * 模块私有数据 ** */
	//默认配置
	var defaults = {
		id:"",
		validator:'char',
		label:"",
		labelCss:{},
		labelAttr:{},
		value:"",
		isNull:true,
		nullWarning:null,
		subtype:"text",
		icon:null,
		iconCss:null,
		iconAlign:"right",
		cls:"",
		css:{},
//		attr:{disabled:false,maxLen:0},
		events:{
			click:null,
			change:null
		}
	};
	/** * 类定义 ** */
	var Textfield = function(configs) {
		var me=this;
		 //类的属性定义
		this.configs=$.extend(true,{},defaults,configs);
		this._className="sea_textfield";
		//初始化
		this.textfield=this._input= $("<input autocomplete='off' type='"+this.configs.subtype+"'/>");
		if(this.configs.icon){
			this.textfieldIcon=$("<div style='padding:0;text-align:left;width:100%;'></div>");
			this._input.css({"width":"auto","border-radius":0});
			this._icon=$("<div class='"+this.configs.icon+"' style='color:#fff;cursor:pointer;margin:0;min-width:28px;line-height:28px;text-align:center;'></div>")
			.css(this.configs.iconCss||{
				"width":"28px",
				"height":"28px"
			})
			.click(function(){
				if(me.configs.readonly=="readonly"||me.configs.readonly==true||me.configs.disabled=="disabled"||me.configs.disabled==true)return;
				me.configs.click();
			});
			if(this.configs.iconAlign=="left"){
				this.textfieldIcon.append(this._icon).append(this._input);
			}else{
				this.textfieldIcon.append(this._input).append(this._icon);
			}
		}
		this.init();
		if(Session.isMini==false){
			if(this.configs.icon){
				var interval=setInterval(function(){
					if($("#"+me.configs.id).length){
						me.textfield.width(me.textfieldIcon.parent().width()-38);
						clearInterval(interval);
					}
				},100);
			}
		}
	};
	//类公共方法
	var Input=require("Input").create();
	Textfield.prototype= $.extend({},Input,{
		/**多态：新增或覆盖父类方法**/
	});
	/*** 输出类对象 ***/
	exports.create = function(configs) {
		return new Textfield(configs);
	};
});
