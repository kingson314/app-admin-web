//define(function(require, exports, module) {
//	/*** 模块外部依赖 ***/
////	require("../../../jquery/star/star.js");
//	require("Jstar");
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
//		stars:5,
//		min:0,
//		max:5,
//		step:1,
//		size:"xs",
//		showCaption:false
//	};
//	/** * 类定义 ** */
//	var Star = function(configs) {
//		var me=this;
//		 //类的属性定义
//		this.configs=$.extend(true,{},defaults,configs);
//		this._className="sea_star";
//		this.star=this._input= $("<input autocomplete='off' type='hidden'/>");
//		if(this.configs.value)this.star.val(this.configs.value);
//		
//		var interval=setInterval(function(){
//			var jq=$("#"+me.configs.id);
//			if(jq.length>0){
//				clearInterval(interval);
//				jq.rating({
//		            'showCaption': me.configs.showCaption,
//		            'stars': me.configs.stars,
//		            'min': me.configs.min,
//		            'max': me.configs.max,
//		            'step': me.configs.step,
//		            'size': me.configs.size,
//		            'starCaptions': {0: 'status:nix', 1: 'status:wackelt', 2: 'status:geht', 3: 'status:laeuft'},
//		             starCaptions: function (val) {
//		                 me.star.val(val);
//		                 return val;
//		            }
//		        });
//			}
//		},100);
//		this.init();
//	};
//	//类公共方法
//	var Input=require("Input").create();
//	Star.prototype= $.extend({},Input,{
//		val:function(val){
//			if(val){
//				this.star.val(val[this.configs.id]);
//			}else{
//				return this.star.val();
//			}
//		},
//		clear:function(){
//			this.star.val("");
//		}
//	});
//	/*** 输出类对象 ***/
//	exports.create = function(configs) {
//		return new Star(configs);
//	};
//});