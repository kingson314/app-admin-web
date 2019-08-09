define(function(require, exports, module) {
	/*** 模块外部依赖 ***/
	//require.async(("./jedate/skin/jedate.css");
	require("Jedate");
	var Component = require("Component");
	var Lang = require("Lang");
	/** * 模块私有数据 ** */
	//默认配置
	var defaults = {
		id:"",								  //统一使用id替换dateCell
		label:"",
		labelCss:{},
		labelAttr:{},
		limit:"date"
//		dateCell:"#id",                       //目标元素。由于jedate.js封装了一个轻量级的选择器，因此dateCell还允许你传入class、tag这种方式 '#id .class'
//		skinCell:"jedateblue",                //日期风格样式，默认蓝色
//		format:"YYYY-MM-DD hh:mm:ss",         //日期格式 （1、 YYYY-MM-DD hh:mm:ss 2、 YYYY-MM-DD hh:mm 3、 YYYY-MM-DD 4、 YYYY-MM 5、 YYYY 6、 hh:mm:ss 7、 hh:mm ）
//		minDate:"1900-01-01 00:00:00",        //最小日期
//		maxDate:"2099-12-31 23:59:59",        //最大日期
//		startMin:"",                          //清除日期后返回到预设的最小日期
//		startMax:"",                          //清除日期后返回到预设的最大日期
//		isinitVal:false,                      //是否初始化时间，默认不初始化时间
//		initAddVal:[0],                       //初始化时间，加减 天 时 分
//		isTime:true,                          //是否开启时间选择
//		ishmsLimit:false,                     //时分秒限制
//		ishmsVal:true,                        //是否限制时分秒输入框输入，默认可以直接输入时间
//		isClear:true,                         //是否显示清空
//		isToday:true,                         //是否显示今天或本月
//		clearRestore:true,                    //清空输入框，返回预设日期，输入框非空的情况下有效
//		festival:false,                       //是否显示节日
//		fixed:true,                           //是否静止定位，为true时定位在输入框，为false时居中定位
//		zIndex:2099,                          //弹出层的层级高度
//		marks:null,                           //给日期做标注
//		choosefun:function(elem, val) {},     //选中日期后的回调, elem当前输入框ID, val当前选择的值
//		clearfun:function(elem, val) {},      //清除日期后的回调, elem当前输入框ID, val当前选择的值
//		okfun:function(elem, val) {},         //点击确定后的回调, elem当前输入框ID, val当前选择的值
//		success:function(elem) {}             //层弹出后的成功回调方法, elem当前输入框ID
	};
	/** * 类定义 ** */
	var DateTime = function(configs) {
		 //类的属性定义
		this.configs=$.extend(true,{},defaults,configs);
		this.configs.dateCell="#"+this.configs.id;//统一使用id替换dateCell
		this._className="sea_datetime";
		//初始化
		this.label=Component.createLabel(this.configs);
		this.dateTime=this._input= $("<input type='text'/>")
						.attr("id",this.configs.id)
						.attr("placeholder",Lang["please.select"])
						.attr("value",this.configs.value||"");
        // 控件的属性设置
        Component.attr(this._input, this.configs);
		var me=this;
		var interval=setInterval(function(){
				if($(me.configs.dateCell).length>0){
					jeDate(me.configs);
					clearInterval(interval);
				}
			},100);
	};
	//类公共方法
	var Input=require("Input").create();
	DateTime.prototype= $.extend({},Input,{
		/**多态：新增或覆盖父类方法**/
	});
	/*** 输出类对象 ***/
	exports.create = function(configs) {
		return new DateTime(configs);
	};
});
