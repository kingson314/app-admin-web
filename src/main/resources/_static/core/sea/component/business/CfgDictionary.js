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
		attr:{disabled:false,maxLen:0},
		url:null,
		options:[],
		params:{
//			app:"",
//			type:"",
//			subType:"",
//			value:"",
//			text:""
		},
		valueKey:"value",//value
		textKey:Session.langue,//text
        hasNullVal:true,
        nullValue:"",
        nullText:Lang["please.select"],
		events:{
			click:null,
			change:null
		}
	};
	/** * 类定义 ** */
	var CfgDictionary = function(configs) {
		 //类的属性定义
		this.configs=$.extend(true,{},defaults,configs);
		this.configs.options=Global.DicList(this.configs.params["app"],this.configs.params["type"],this.configs.params["subType"],true);
		this.dic=this._input = require("Select").create(this.configs).select;
		this.init();
	};
	var Input=require("Input").create();
	CfgDictionary.prototype= $.extend({},Input,{
		/**多态：新增或覆盖父类方法**/
		reload:function(params,options){
			this.dic.empty();
            this.configs.hasNullVal&&this.dic.append("<option value='"+this.configs.nullValue+"'>"+this.configs.nullText+"</option>");
			var options=Global.DicList(params["app"],params["type"],params["subType"],true);
			var len=options.length;
			for(var i=0;i<len;i++){
				var item=options[i];
				this.dic.append("<option value='"+item[this.configs.valueKey]+"'>"+item[this.configs.textKey]+"</option>");
			}
		}
	});
	/*** 输出类对象 ***/
	exports.create = function(configs) {
		return new CfgDictionary(configs);
	};
});