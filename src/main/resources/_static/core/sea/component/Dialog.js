define(function(require, exports, module) {
	/** * 模块外部依赖 ** */ 
	//require.async(("./css/dialog.css");
	var Lang = require("Lang");
	var ButtonGroup = require("ButtonGroup"); 
	var Component = require("Component");
	/** * 模块私有数据 ** */
	var  defaults = {
			id:"",
			hasButtonGroup:true,
 			hasTitle:true,
 			hasMask:true,
 			hasConfirm:true,
 			hasCancel:true,
 			canMove:true,
 			hasClose:true,
			//autoHideTime:2000,
 			width: "400", 
 			height: "200",
 			css:{},
 			cssContent:{},
 			confirmValue: "<i class='glyphicon glyphicon-ok'></i>"+Lang["confirm"],
 			confirm: function(){return true;}, //点击确定后回调函数
 			cancelValue:"<i style='transform:rotateY(180deg)' class='glyphicon glyphicon-share-alt'></i>"+Lang["cancel"],
 			cancel: function(){},  //点击取消后回调函数，默认关闭弹出框
 			title: Lang["prompt"],  //标题内容，如果不设置，则连同关闭按钮（不论设置显示与否）都不显示标题
 			content: '',  //正文内容，可以为纯字符串，html标签字符串，以及URL地址，当content为URL地址时，将内嵌目标页面的iframe（未实现）。
 			items:null
	    };
	/** * 模块私有方法 ** */
	 var self={
	 	init:function(me){
	 		var indexMask=8;
	 		var dialogCount=$("."+me._className).length;
	 		me.dialog=$("<div></div>").addClass(me._className).css("z-index",(indexMask+dialogCount+3));
	 		Component.css(me.dialog,me.configs);
	 		if(!me.configs.title)me.configs.hasTitle=false;
	 		if(me.configs.hasTitle){
		 		me.title=$("<div><span class='"+me._className+"_title_icon "+"glyphicon glyphicon-th-large'></span>"+Global.getI18N(me.configs.title)+"</div>").addClass(me._className+"_title").appendTo(me.dialog);
		 		if(me.configs.hasClose){
		 			me.title.append("<span class='"+me._className+"_title_btn "+"glyphicon glyphicon-remove'></span>");
			 		me.title.find("."+me._className+"_title_btn").click(function(){
			 			me.hide();
			 		});
		 		}
		 		if(me.configs.canMove){
					me.title.mousedown(function(e){self.mousedown(me,me.title,e)})
									.mousemove(function(e){self.mousemove(me,me.title,e)})
									.mouseup(function(e){self.mouseup(me,me.title)});
		 		}
	 		}
	 		me.content=$("<div></div>").addClass(me._className+"_content").css(me.configs.cssContent).appendTo(me.dialog);
	 		Component.css(me.dialog,me.configs);
	 		if(me.configs.hasButtonGroup){
				var cfgBtnGroup = {
					cls:me._className+"_buttonGroup",
					items: []
				};
				if(me.configs.hasConfirm==true){
					cfgBtnGroup.items.push({
						cls:me._className+"_buttonGroup_confirm",
						value: me.configs.confirmValue,
					    click: function() {
					    	if(me.configs.confirm()==true)
					    	me.hide();
					    }
					  });
				}
				if(me.configs.hasCancel==true){
					cfgBtnGroup.items.push({
					  	cls:me._className+"_buttonGroup_cancel",
					    value: me.configs.cancelValue,
					    click: function() {
					    	me.configs.cancel();
					    	me.hide();
					    }
					  });
				}
				if(me.configs.items){
					cfgBtnGroup.items=cfgBtnGroup.items.concat(me.configs.items);
				}
				me.buttonGroup=ButtonGroup.create(cfgBtnGroup).buttonGroup.appendTo(me.dialog);	 		
	 		}
	 		var body=$("body").append(me.dialog);
	 		if(me.configs.hasMask){
	 			me.mask=$("<div></div>").addClass(me._className+"_mask").css("z-index",(indexMask+dialogCount+2)).appendTo(body).click(function(){me.isDowm = false; });
	 		}
//	 		if(me.configs.hasClose){
//		 		$(document).keyup(function(event){
//	 				if(event.keyCode === 27){
//	 					me.hide();
//	 				}
//	 			});
//	 		}
	 		var contentHeight=me.dialog.height();
	 		if(me.configs.hasTitle){
	 			contentHeight=contentHeight-35;
	 		}else{
	 			me.content.css("top","0");
	 		}
	 		if(me.configs.hasButtonGroup){
	 			contentHeight=contentHeight-50;
	 		}
	 		me.content.height(contentHeight);
	 		if($.type(me.configs.content)=="object"){
	 			me.content.css("line-height",Component.getSize(contentHeight)).append(me.configs.content);
	 		}else{
	 			me.content.css("display","table").append("<div>"+Global.getI18N(me.configs.content)+"</div>");
	 		}
	 		//重排
	 		me.dialog.css({
				  "margin-top":Component.getSize(-Math.round(me.dialog.height()/2)),
				  "margin-left":Component.getSize(-Math.round(me.dialog.width()/2))
	 		});
	 	},
	 	mousedown:function (me,obj, e) {  
	 		obj.css("cursor","move");
	 		var  offset=obj.offset();
	 		me.diffX=e.clientX-offset.left;
	 		me.diffY=e.clientY-offset.top;
            me.isDowm = true;  
        },
        mousemove:function (me,obj,e) {  
            if (me.isDowm) {  
            	var  offset=self.getMousePos(e);
            	me.dialog.css({
                	left:(offset.x-me.diffX+200)+"px",
                	top:	(offset.y-me.diffY+108)+"px"
                });
            }  
        },
        mouseup:function (me,obj) {  
            me.isDowm = false;  
        	obj.css("cursor","default");
        },
        getMousePos:function(event) { 
  	      var e = event || window.event; 
  	      var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft; 
  	      var scrollY = document.documentElement.scrollTop || document.body.scrollTop; 
  	      var x = e.pageX || e.clientX + scrollX; 
  	      var y = e.pageY || e.clientY + scrollY; 
  	      return { 'x': x, 'y': y }; 
  	    }
	 };
	/** * 类定义 ** */
	var Dialog = function(configs) {
		// 类的属性定义
		this.configs = $.extend(true, {}, defaults, configs);
		this._className="sea_dialog";
		this. isDowm = false; 
		this.diffX;
		this.diffY;  
		// 初始化
		self.init(this);
	};
	// 类公共方法
	Dialog.prototype = {
		view:function(){
			this.dialog.show();
			this.dialog.find("."+this._className+"_buttonGroup_cancel").hide();
			this.dialog.find("."+this._className+"_buttonGroup_confirm").parent().css("margin","0");
			if(this.configs.hasMask)this.mask.show();
		},
		alert:function(){
			this.view();
			var me=this;
			if(this.configs.autoHideTime){
				//me.mask.remove();
				this.dialog.fadeOut(this.configs.autoHideTime,function(){
					me.dialog.remove();
				});
				if(this.configs.hasMask){
					this.mask.fadeOut(this.configs.autoHideTime,function(){
						me.mask.remove();
					});
				}
			}
			return this;
		},
		confirm:function(){
			this.dialog.show();
			if(this.configs.hasMask)this.mask.show();
			return this;
		},		
		hide:function(){
			this.dialog.remove();
			if(this.configs.hasMask)this.mask.remove();
			return this;
		},
		//白盒测试函数
		test:function(data){
		}
	};
	/** * 输出类对象 ** */
	exports.alert = function(configs) {
		if($.type(configs)=="string"||$.type(configs)=="array"){
			configs={content:configs};
		}
		return new Dialog(configs).alert();
	};
	
	exports.view = function(configs) {
		if(!configs.width){
			configs.width="100%";
		}
		if(!configs.height){
			configs.height="100%";
		}
		configs.canMove=false;
		return new Dialog(configs).view();
	};
	
	exports.confirm = function(configs) {
		return new Dialog(configs).confirm();
	};
	
	exports.edit = function(configs) {
		if(!configs.width){
			configs.width="100%";
		}
		if(!configs.height){
			configs.height="100%";
		}
		configs.canMove=false;
		return new Dialog(configs).confirm();
	};
});
