define(function(require, exports, module) {
	/** * 模块外部依赖 ** */
	var Component = require("Component"); 
	/** * 模块私有数据 ** */
	var defaults = {
			height:300,
			css : {},
			cssInner:{
				width:"100%",
			},
			piece:18,
			interval:6000,
			delay:3000,
			animateShow:["fade","fade","fade","fade","fade"],
			animateHide:["fade","fade","fade","fade","fade"]
	};
	/** * 类定义 ** */
	var Carousel = function(configs) {
		// 类的属性定义
		var me=this;
		this.configs = $.extend(true, {}, defaults, configs);
		if(!this.configs.imgHeight)this.configs.imgHeight=this.configs.height;
		if(!this.configs.cssInner.height)this.configs.cssInner.height=this.configs.height;
		this._className="sea_carousel";
		// 初始化
		this.carousel=$(".sea_carousel");
		Component.css(this.carousel,this.configs);
		this.slide=this.carousel.find(".carousel-slide").css(this.configs.cssInner);
		this.slidesItems=this.carousel.find(".carousel-slide>.item");
		this.imgs=this.carousel.find(".carousel-slide>.item>table").height(this.configs.imgHeight);
		//animate
		this.interval;
		this.index=0;
		this.count=this.slidesItems.length
		this.setIntravle();
	};
	// 类公共方法
	Carousel.prototype = {
		 setIntravle:function(){
			var me=this;
			 this.interval=window.setInterval(function(){
					me.setEffect("next");
				},this.configs.interval);
		 },
		 setEffect:function(controlType,defalut){
			 var ran=this.random(0,6);
			 switch (defalut||ran) {
	            case 0:
	                this.effectVertical(controlType,0);
	                break;
	            case 1:
	                this.effectVertical(controlType,1);
	                break;
	            case 2:
	                this.effectVertical(controlType,2);
	                break;
	            case 3:
	               this.effectHorizontal(controlType,0);
	                break;
	            case 4:
	               this.effectHorizontal(controlType,1);
	                break;
	            case 5:
	               this.effectHorizontal(controlType,2);
	                break;
	            case 6:
	                this.effectCellToggle(controlType);
	                break;
	            default:
	                this.effectFade(controlType);
	                break;
	        }
		 },
		 effectFade:function(controlType){
			 if(controlType=="prev"){
				 this.hide(this.index);
				 if(this.index==0){
						this.index=this.count
				}
				this.index=this.index-1;
				this.show(this.index);
			 }else if(controlType=="next"){
				 this.hide(this.index);
				 if(this.index==(this.count-1)){
					this.index=-1;
				} 
				this.index=this.index+1;
				 this.show(this.index);
			 }
		 },
		 effectVertical:function(controlType,showType){//controlType只支持next
			 var nextIndex=this.index+1;
			 if(this.index==(this.count-1)){
				 nextIndex=0;
			 } 
			 var me=this;
			 var img=$(this.slidesItems[this.index]).find("table");
			 var height=img.height();
			 var width=img.width();
			 var top=img.position().top
			 var left=img.position().left
	         var bakHtml = this.slidesItems[this.index].innerHTML;//备份当前节点的内容
	         this.slidesItems[this.index].innerHTML="";	
	         for (var i = 0; i < this.configs.piece; i++) {//利用循环 创建出栅格节点
	            var curItem = $('<div class="curItem"></div>');
	            $(this.slidesItems[this.index]).css("z-index",2).append(curItem);
	            curItem.html($(this.imgs[this.index]).prop("outerHTML"));
	            curItem.css({//为每个栅格节点添加css样式
	                'width':width/this.configs.piece+'px',
	                'height':height+'px',
	                'left':(left+width/this.configs.piece*i)+'px',
	                'top':top+'px'
	            });
	            curItem.find('*').first().css({
	                'display':'block',
	                'margin-left':width/-this.configs.piece*i+'px'
	            });
	        }
             $(me.slidesItems[nextIndex]).css({"z-index":1,"display":"block"});
	        //分配对应效果
	        switch (showType) {
	            default:
	            case 0:
	                $(this.slidesItems[this.index]).find('.curItem').each(function(index,el){
	                    if (index%2==0) {
	                        var topNums = height;
	                    } else {
	                        var topNums =height*-1;
	                    }
	                    $(this).animate({
	                        top:topNums + 'px'
	                    },1500);
	                });
	                break;
	            case 1:
	            	//添加动画过渡效果 下降
                    $(this.slidesItems[this.index]).find('.curItem').each(function(index,el){
                        var sp = 80*index;
                        $(this).animate({
                            top: $(this).height() + 'px'
                        },500+sp);
                    });
                    break;
	            case 2:
                    //添加动画过渡效果 上升
                    $(this.slidesItems[this.index]).find('.curItem').each(function(index,el){
                        var sp = 80*index;
                        $(this).animate({
                            top: $(this).height()*-1 + 'px'
                        },500+sp);
                    });
	                break;
		        }
		        setTimeout(function(){//动画结束后开始恢复原有状态
	            	me.slidesItems[me.index].style.zIndex = 1;
	                $(me.slidesItems[me.index]).html(bakHtml).css("display","none");//清除动画产生的多余内容
	                me.index = nextIndex;//得到新的当前节点key
	            },1500);
		 },
		 effectHorizontal: function(controlType,showType) {//controlType只支持next
			 var nextIndex=this.index+1;
             if(this.index==(this.count-1)){
                 nextIndex=0;
             } 
             var me=this;
             var img=$(this.slidesItems[this.index]).find("table");
             var height=img.height();
             var width=img.width();
             var top=img.position().top
             var left=img.position().left
             var bakHtml = this.slidesItems[this.index].innerHTML;//备份当前节点的内容
             this.slidesItems[this.index].innerHTML=""; 
		        for (var i = 0;i<this.configs.piece;i++) {//利用循环 创建出栅格节点
		            var curItem = $('<div class="curItem"></div>');
	                $(this.slidesItems[this.index]).css("z-index",2).append(curItem);
	                curItem.html($(this.imgs[this.index]).prop("outerHTML"));
	                curItem.css({//为每个栅格节点添加css样式
	                    'width':width+'px',
	                    'height':height/this.configs.piece+'px',
	                    'left':left+'px',
	                    'top':(top+height/this.configs.piece*i)+'px',
	                });
	                curItem.find('*').first().css({
	                    'display':'block',
	                    'margin-top':height/-this.configs.piece*i+'px'
	                });
		        }
		        $(me.slidesItems[nextIndex]).css({"z-index":1,"display":"block"});
		        switch (showType) {
		            default:
		            case 0:
		            	$(this.slidesItems[this.index]).find('.curItem').each(function(index,el){
		                    if (index%2==0) {
		                        var leftNums = width;
		                    } else {
		                        var leftNums = width*-1;
		                    }
		                    $(this).animate({
		                        'left':left+leftNums + 'px'
		                    },1500);
		                });
		                break;
		            case 1:
		            	//添加动画过渡效果 向左
		            	$(this.slidesItems[this.index]).find('.curItem').each(function(index,el){
	                        var sp = 80*index;
	                        $(this).animate({
	                            'left':left+width*-1 + 'px'
	                        },620+sp);
	                    });
	                    break;
		            case 2:
	                    //添加动画过渡效果 向右
		            	$(this.slidesItems[this.index]).find('.curItem').each(function(index,el){
	                        var sp = 80*index;
	                        $(this).animate({
	                            'left':left+width + 'px'
	                        },620+sp);
	                    });
		                break;
		        }
		        setTimeout(function(){//动画结束后开始恢复原有状态
		        	me.slidesItems[me.index].style.zIndex = 1;
	                $(me.slidesItems[me.index]).html(bakHtml).css("display","none");//清除动画产生的多余内容
	                me.index = nextIndex;//得到新的当前节点key
		        },1500);
		    },
		    effectCellToggle: function(controlType) {//controlType只支持next
		    	 var nextIndex=this.index+1;
	             if(this.index==(this.count-1)){
	                 nextIndex=0;
	             } 
	             var me=this;
	             var img=$(this.slidesItems[this.index]).find("table");
	             var height=img.height();
	             var width=img.width();
	             var top=img.position().top
	             var left=img.position().left
	             var bakHtml = this.slidesItems[this.index].innerHTML;//备份当前节点的内容
	             this.slidesItems[this.index].innerHTML=""; 
		        for (var i = 0;i<20;i++) {//利用循环 创建出栅格节点
		            if (i<5) {//行数判断
		                var rows = 0;
		            } else if (i<10) {
		                var rows = 1;
		            } else if (i<15) {
		                var rows = 2;
		            } else {
		                var rows = 3;
		            }
		            var curItem = $('<div class="curItem"></div>');
                    $(this.slidesItems[this.index]).css("z-index",2).append(curItem);
                    curItem.html($(this.imgs[this.index]).prop("outerHTML"));
                    curItem.css({//为每个栅格节点添加css样式
		                'width':width/5+'px',
		                'height':height/4+'px',
		                'left':(left+width/5*(i%5))+'px',
		                'top':(top+height/4*rows)+'px',
		            });
                    curItem.find('*').first().css({
		                'display':'block',
		                'margin-left':width/-5*(i%5)+'px',
		                'margin-top':height/-4*rows+'px',
		            });
		        }
		        $(me.slidesItems[nextIndex]).css({"z-index":1,"display":"block"});
		        //添加动画过渡效果
		        $(this.slidesItems[this.index]).find('.curItem').each(function(index,el){
		            if (index%2==0) {
		                $(this).find('*').first().animate({
		                    "margin-left": $(this).width() + 'px'
		                }, 500);
		            }
		        });
		        setTimeout(function(){
		            $(me.slidesItems[me.index]).find('.curItem').each(function(index,el){
		                if (index%1==0) {
		                    $(this).find('*').first().animate({
		                        "margin-left": $(this).width() + 'px'
		                    }, 500);
		                }
		            });
		        },600);
		        setTimeout(function(){//动画结束后开始恢复原有状态
		        	me.slidesItems[me.index].style.zIndex = 1;
                    $(me.slidesItems[me.index]).html(bakHtml).css("display","none");//清除动画产生的多余内容
                    me.index = nextIndex;//得到新的当前节点key
		        },1100);
		    },
		    random: function(min,max) {
                return Math.floor(Math.random()*(max+1)-min);
            }
	};
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new Carousel(configs);
	};
});
