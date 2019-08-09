//define(function(require, exports, module) {
//	/** * 模块外部依赖 ** */
//	//https://www.kancloud.cn/wangfupeng/wangeditor3/335770
////	var E=require("../../../jquery/wangEditor/wangEditor.js");
//	var E=require("JwangEditor");
//	/** * 模块私有数据 ** */
//	var defaults = {
//		id : "",
//		value : "",
//		isNull : true,
//		cls : "",
//		css : {},
//		attr : {	},
//		events : {
//			//click : null,
//			//change : null
//		},
////		linkImgCallback:function(url){//插入网络图片的回调
////			
////		},
//		linkCheck:function(text, link){//插入链接的校验
//			
//		},
//		linkImgCheck:function(src){//插入网络图片的校验
//			
//		}
//		
//	};
//	/** * 模块私有方法 ** */
//	/** * 类定义 ** */
//	var Editor = function(configs) {
//		 //类的属性定义
//		this.configs=$.extend(true,{},defaults,configs);
//		this._className="sea_editor";
//		//初始化
//		this._input=$("<div></div>");
//		this.init();
//		var me=this;
//		var timer=setInterval(function(){
//			var selector="#"+me.configs.id;
//			if($(selector).length>0){
//				clearInterval(timer);
//				me.editor = new E(selector);
//				if(me.configs.zIndex)me.editor.customConfig.zIndex = 100
//				
//				me.editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
//				if(me.configs.change){
//					me.editor.customConfig.onchange = function (html) {
//				       return me.configs.change(html);
//				    }
//				}
//				if(me.configs.linkImgCallback){
//					me.editor.customConfig.linkImgCallback = function (url) {
//						return me.configs.linkImgCallback(url) // url 即插入图片的地址
//					}
//				}
//				if(me.configs.linkCheck){
//					me.editor.customConfig.linkCheck = function (text, link) {
//						return me.configs.linkCheck(text, link) ;// 插入的文字、链接
//					}
//				}
//				if(me.configs.linkImgCheck){
//					me.editor.customConfig.linkImgCheck = function (src) {
//						return me.configs.linkImgCheck(src) ;// 图片的链接
//					}
//				}
//				
//				if(me.configs.focus){
//					me.editor.customConfig.onfocus = function () {
//				       return me.configs.focus();
//				    }
//				}
//				if(me.configs.blur){
//					me.editor.customConfig.onfocus = function () {
//				       return me.configs.onblur();
//				    }
//				}
//				
//				
//				me.editor.create();
//			}
//		},100)
//		
//		
//	};
//	// 类公共方法
//	var Input=require("Input").create();
//	Editor.prototype = $.extend({},Input,{
//		check:function(){
//			return true;
//		},
//		//值获取或赋值函数
//		val:function(data){
//			if(data!=null&&data!=undefined){
//				data=data[this.configs.id];
//				 this.editor.txt.html(data);
//			}else{ 
//				return this.editor.txt.html()
//			}
//		},
//		append:function(val){
//			 this.editor.txt.append(val);
//		},
//		//清空函数
//		clear:function(){
//			this.editor.txt.clear()
//		},
//		//设置焦点
//		focus:function(){
//			return ;
//		},
//		//显示 
//		show:function(){
//			return Component.show(this._input);
//		},
//		//隐藏
//		hide:function(){
//			return Component.hide(this._input);
//		},
//		//禁用
//		disabled:function(){
//			return this.editor.$textElem.attr('contenteditable', false)
//		},
//		//启用
//		enabled:function(){
//			return this.editor.$textElem.attr('contenteditable', true)
//		}
//	});
//	/** * 输出类对象 ** */
//	exports.create = function(configs) {
//		return new Editor(configs);
//	};
//});
