//define(function(require, exports, module) {
//	/*** 模块外部依赖 ***/
//	var Lang = require("Lang");
//	require("../../../jquery/selectMulti/selectMulti.js");
//	/** * 模块私有数据 ** */
//	//默认配置
//	var defaults = {
//		id:"",
//		label:"",
//		labelCss:{},
//		labelAttr:{},
//		value:"",
//		isNull:true,
//		cls:"",
//		css:{},
//		width:"100%",
////		attr:{disabled:false,maxLen:0},
//		url:null,//返回[{value:"",text:""},{...}]
//		params:{},//url时生效
//		options:[],
//		valueKey:"id",//value
//		textKey:"name",//text
//		events:{
//			click:null,
//			change:null
//		},
//		multiple: true,
//		filter:true
//	};
//	/** * 类定义 ** */
//	var SelectMulti = function(configs) {
//		var me=this;
//		 //类的属性定义
//		this.configs=$.extend(true,{},defaults,configs);
//		this._className="sea_select";
//		//初始化
//		var _id=Global.getSeq();
//		this.select=this._input= $("<select _id='select"+_id+"'multiple ></select>");
//		if(this.configs.url){
//			Ajax=require("Ajax");
//			Ajax.post(this.configs.url,this.configs.params,function(rs){
//				var len=rs.data.length;
//				for(var i=0;i<len;i++){
//					var item=rs.data[i];
//					me.select.append("<option value='"+item[me.configs.valueKey]+"'>"+item[me.configs.textKey]+"</option>");
//				}
//			},false);
//		}else{
//			var len=this.configs.options.length;
//			for(var i=0;i<len;i++){
//				var item=this.configs.options[i];
//				this.select.append("<option value='"+item[this.configs.valueKey]+"'>"+item[this.configs.textKey]+"</option>");
//			}
//		}
//		
//		var interval=setInterval(function(){
//			me.select=$("#"+me.configs.id);
//			if(me.select.length>0){
//				clearInterval(interval);
//				me.select.multipleSelect({
//					width:me.configs.width,
//					single: !me.configs.multiple,
//					filter:me.configs.filter
//				});
////				me.select.multipleSelect("setSelects",["87125D24E676465A9299830221246B08", "D4EE39E31A9449A3BEC092B4C7F5CF5C"]);
////				me.select.val((me.configs.value||"").split(";"));
//				//me.select.multipleSelect("setSelects",((me.configs.value||"").split(";")));
//				//$select.multipleSelect('setSelects', [1, 3])
////				$select.multipleSelect('setSelects', [1, 3])
//			}
//		},100);
//		this.init();
//	};
//	//类公共方法
//	var Input=require("Input").create();
//	SelectMulti.prototype= $.extend({},Input,{
//		val:function(val){
//			if(val){
//				if(val[this.configs.id]){
//					var me=this;
//					var interval=setInterval(function(){
//						var jq=$("#"+me.configs.id);
//						if(jq.length>0){
//							clearInterval(interval);
//							jq.multipleSelect("setSelects",val[me.configs.id].split(";"));
//						}
//					},100);
//				}
//			}else{
//				return this.select.multipleSelect("getSelects");
//			}
//		},
//		clear:function(){
//			this.select.multipleSelect("setSelects",[]);
//		}
//	});
//	/*** 输出类对象 ***/
//	exports.create = function(configs) {
//		return new SelectMulti(configs);
//	};
//});