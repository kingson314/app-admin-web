define(function(require, exports, module) {
	/** * 模块外部依赖 ** */
	/** * 模块私有数据 ** */
	var defaults = {
			id : "",
			value : "",
			cls : "",
			checked:false,
			labelAlign:'right',
			showLabelWidth:true,//保留Label的宽度
			css : {},
			attr : {},
			events : {
				//click : null,
				//change : null
			}
	};
	/** * 模块私有方法 ** */
	/** * 类定义 ** */
	var Checkbox = function(configs) {
		 //类的属性定义
		this.configs=$.extend(true,{},defaults,configs);
		this._className="sea_checkbox";
		//初始化
		this.configs.width="";
        this.checkbox=this._input= $("<input checked="+this.configs.checked+" type='checkbox'/>");
		this.configs.labelCls="sea_checkLabel";
		this.init();
	};	
	//类公共方法
	var Input=require("Input").create();
	Checkbox.prototype= $.extend({},Input,{
		/**多态：新增或覆盖父类方法**/
		val:function(data){
			if(data){
				data=data[this.configs.id];
				if(data=="true"||data==true||data=="checked"){
					this._input.attr("checked",data);
					this._input.prop('checked',true);
				}else{
					this._input.removeAttr("checked");
				}
			}else{ 
				return this._input.is(':checked');
			}
		},
		//清空函数
		clear:function(){
			this._input.removeAttr("checked");
		}
	});
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new Checkbox(configs);
	};
});
