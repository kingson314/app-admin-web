//define(function(require, exports, module) {
//	/** * 模块外部依赖 ** */
//	/** * 模块私有数据 ** */
//	var defaults = {
//			id : "",
//			value : "",
//			cls : "",
//			labelAlign:'right',
//			showLabelWidth:true,//保留Label的宽度
//			css : {},
//			attr : {},
//			events : {
//				//click : null,
//				//change : null
//			}
//	};
//	/** * 模块私有方法 ** */
//	/** * 类定义 ** */
//	var Switch = function(configs) {
//		 //类的属性定义
//		this.configs=$.extend(true,{},defaults,configs);
//		this._className="sea_switch";
//		this.configs.width=50;
//		//初始化
//    	if(this.configs.value){
//    		this._input=$("<span class='sea_switch on'></span>");
//    	}else{
//    		this._input=$("<span class='sea_switch off'></span>");
//    	}
//    	this._input.append("<span class='slider'></span>");
//    	this._input.click(function() {
//			if ($(this).hasClass("switch-disabled")) {
//				return;
//			}
//			if ($(this).hasClass("on")) {
//				$(this).removeClass("on").addClass("off");
//			} else {
//				$(this).removeClass("off").addClass("on");
//			}
//		});
//		this.init();
//	};	
//	//类公共方法
//	var Input=require("Input").create();
//	Switch.prototype= $.extend({},Input,{
//		/**多态：新增或覆盖父类方法**/
//		val:function(data){
//			if(data){
//				data=data[this.configs.id];
//				if(data=="true"||data==true){
//					this._input.removeClass("off").addClass("on");
//				}else{
//					this._input.removeClass("on").addClass("off");
//				}
//			}else{ 
//				if(this._input.hasClass("on"))return true;
//				else return false;
//			}
//		},
//		//清空函数
//		clear:function(){
//			this._input.removeClass("on").addClass("off");
//		}
//	});
//	/** * 输出类对象 ** */
//	exports.create = function(configs) {
//		return new Switch(configs);
//	};
//});
