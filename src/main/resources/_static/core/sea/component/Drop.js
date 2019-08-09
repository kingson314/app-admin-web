/**
 * sea_drop_layout 拖放布局器类，可支持布局器本身的拖放以及布局器内部sea_droper承载投放对象
 * sea_drag_only 只支持拖拽，不支持投放，方式为：克隆
 * sea_droper 既支持拖拽也支持拖放，方式为：移动
 */
define(function(require, exports, module) {
	//require.async(("./css/drop.css");
$.fn.drop = function(configs) {
	var defaults={
		initHtm:null,
		offset:{
			left:0,
			top:0
		},
		onStart:function(startJq){
		},
		onEnd:function(startJq,endJq){
		}
	};
	var options=$.extend(true,{},defaults,configs); 
    var container = $(this);
	container.css({
		width:options.width,
		height:options.height
	}).css(options.css||{});
    //初始化投放区域
	container.each(function(){
		var obj=$(this);
		if(!obj.hasClass("sea_drag_only")&&obj.has(".sea_droper").length==0){
			if(options.initHtml){
				 obj.append(options.initHtml);
			}else{
				obj.append("<div class='sea_droper  sea_draglayout' style='width:100%;height:40px;margin: 8px 0;'></div>");
			}
		}
	});
    var startJq;
    container.delegate(".sea_drager","mousedown",{},function(e) {
        if(e.which != 1 || window.SEA_DROP_ONLY) return; // 排除非左击和表单元素
        e.preventDefault(); // 阻止选中文本
        window.SEA_DROP_ONLY = true;
 		startJq=$(this);
 		if(options.onStart){
    		options.onStart($(this));
    	}
        var me= $(this);
        var pageX = e.pageX;
        var pageY = e.pageY;
        if(me.parent().hasClass("sea_drag_only")){
        	me= me.clone().appendTo($("body")).css({"position":"absolute","left":startJq.offset().left,"top":startJq.offset().top,opacity: 0.8, "z-index": 999,"width":"200px"});
        }else{
        	me.css({opacity: 0.8, "z-index": 999});
        	pageX=pageX+container.offset().left;//潜规则
        	pageY=pageY+container.offset().top;//潜规则
        }
       
        var width = me.width();
        var height = me.height();
        var left = me.offset().left;
        var top = me.offset().top;
        var sea_droper=me.parent(".sea_droper");
        // 绑定mousemove事件
        $(document).mousemove(function(e){
            e.preventDefault();
            // 移动选中块
            var l = left + e.pageX - pageX-options.offset.left;
            var t = top + e.pageY - pageY-options.offset.top;
            me.css({ "position":"absolute","left":l, "top":t});
            // 选中块的中心坐标
            var pointer=getMousePos(e);
            var ml =pointer.x;// l+width/2;
            var mt =pointer.y;// t+height/2;
            // 遍历所有块的坐标
            container.find(".sea_droper").not(me).not(me.find(".sea_droper")).each(function(){
                var obj = $(this);
                if(obj.parents().hasClass("sea_drag_only"))return;
                var offset = obj.offset();
                var left1 = offset.left;
                var left2 = offset.left + obj.width();
                var top1 = offset.top;
                var top2 = offset.top + obj.height();
                if(ml > left1 && ml < left2 && mt > top1  && mt < top2){
                	if(obj.children().length==0){
	                	sea_droper=obj;
	                	container.find(".sea_droper_active").removeClass("sea_droper_active");
	                	sea_droper.addClass("sea_droper_active");
                	}
//                }else if(ml > left1 && ml < left2 && (top1-mt )<=10 ){//在上面插入
//                	if(obj.parent().hasClass("sea_drager"))return;
//                	if((obj.prev(".sea_droper").length==0||obj.prev(".sea_droper").children().length>0) && obj.children().length>0){
//                		$("<div class='sea_droper sea_droper_auto' style='width:100%;height:40px;margin: 8px 0;'></div>").insertBefore(obj);
//                	}
                }else if(ml > left1 && ml < left2 && (mt-top2)<=10){//在下面插入
                	if(obj.parent().hasClass("sea_drager"))return;
                	if((obj.next(".sea_droper").length==0||obj.next(".sea_droper").children().length>0) && obj.children().length>0){
                		$("<div class='sea_droper sea_droper_auto' style='width:100%;height:40px;margin: 8px 0;'></div>").insertAfter(obj);
                	}
//                }else if(ml<left1){//暂不支持左右
//                }else if(ml>left2){
                }
            });
        });
        // 绑定mouseup事件
        $(document).mouseup(function() {
            $(document).off('mouseup').off('mousemove');
            if(options.onEnd){
        		options.onEnd(startJq,sea_droper);
        	}
            if(sea_droper==null||sea_droper.length==0){//只点击没拖动时
            	me.remove();
                window.SEA_DROP_ONLY = null;
            	return;
            }
            me.animate({"left":sea_droper.offset().left, "top":sea_droper.offset().top}, 100, function(){
            	me.removeAttr("style").css({width:sea_droper.width(),height:sea_droper.height(),margin:0});
            	sea_droper.append(me);
            	//清除自动创建但没投放的区域
            	container.find(".sea_droper_auto").each(function(){
                	if($(this).children().length==0){
                		$(this).remove();
                	}
                });
            	container.find(".sea_droper_active").removeClass("sea_droper_active");
                window.SEA_DROP_ONLY = null;
            });
        });
    });
	
	//Firefox支持属性pageX,与pageY属性，这两个属性已经把页面滚动计算在内了, 
	//在Chrome可以通过document.body.scrollLeft，document.body.scrollTop计算出页面滚动位移， 
	//而在IE下可以通过document.documentElement.scrollLeft ，document.documentElement.scrollTop 
	function getMousePos(event) { 
      var e = event || window.event; 
      var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft; 
      var scrollY = document.documentElement.scrollTop || document.body.scrollTop; 
      var x = e.pageX || e.clientX + scrollX; 
      var y = e.pageY || e.clientY + scrollY; 
      return { 'x': x, 'y': y }; 
    } 
}
});