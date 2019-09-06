define(function(require, exports, module) {
	/*** 模块外部依赖 ***/
	var Lang = require("Lang");
	/** * 模块私有数据 ** */
	//默认配置
	var defaults = {
		id:"",
		label:"",
		labelCss:{},
		labelAttr:{},
		value:"",
		isNull:true,

		cls:"",
		css:{},
//		attr:{disabled:false,maxLen:0},
		url:null,//返回[{value:"",text:""},{...}]
		params:{},//url时生效
		options:[],
		valueKey:"id",//value
		textKey:"name",//text
        hasNullVal:true,
		nullValue:"",
		nullText:Lang["please.select"],
		events:{
			click:null,
			change:null
		}
	};
	/** * 类定义 ** */
	var Select = function(configs) {
		 //类的属性定义
		this.configs=$.extend(true,{},defaults,configs);
		this._className="sea_select";
		//初始化
		this.select=this._input= $("<select></select>");
        this.configs.hasNullVal&&this.select.append("<option value='"+this.configs.nullValue+"'>"+this.configs.nullText+"</option>");
		if(this.configs.url){
			Ajax=require("Ajax");
			var me=this;
			Ajax.post(this.configs.url,this.configs.params,function(rs){
				var len=rs.data.length;
				for(var i=0;i<len;i++){
					var item=rs.data[i];
					me.select.append("<option value='"+item[me.configs.valueKey]+"'>"+item[me.configs.textKey]+"</option>");
				};
			},false);
		}else{
			var len=this.configs.options.length;
			if($.type(this.configs.options[0])=="object"){
				for(var i=0;i<len;i++){
					var item=this.configs.options[i];
					this.select.append("<option value='"+item[this.configs.valueKey]+"'>"+item[this.configs.textKey]+"</option>");
				}
			}else{
				for(var i=0;i<len;i++){
					var item=this.configs.options[i];
					this.select.append("<option value='"+item+"'>"+item+"</option>");
				}
			}
		}
		this.select.val(this.configs.value||"");
		this.init();
	};
	//类公共方法
	var Input=require("Input").create();
	Select.prototype= $.extend({},Input,{
		/**多态：新增或覆盖父类方法**/
	});
	/*** 输出类对象 ***/
	exports.create = function(configs) {
		return new Select(configs);
	};
});