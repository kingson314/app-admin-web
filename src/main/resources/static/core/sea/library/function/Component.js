define(function(require, exports, module) {
 	/***模块外部依赖***/ 
 	var String =require("String");
	/* @Description: focus
 	* @ param jq
	* @date 2015-12-31
	* @author:kfzx-fenggq
	*/
	exports.focus=function(jq){
		var type=jq.attr("type");
		if(type&&type.indexOf("select")>=0){
			jq.focus();
		}else{
			try{
				var obj = jq.get(0);
				var txt;
				if(document.all)
					txt=obj.createTextRange();
				else
					txt=obj.createRange();
				txt.moveStart('character', obj.value.length);
				txt.collapse(true);
				txt.select();
			}catch(e){
				jq.focus();
			}
		}
		return jq;
	};
	/* @Description: 增加jQuery对象的类名
 	* @ param jq
 	* @ param configs 包含属性数组configs.cls
	* @date 2015-12-31
	* @author:kfzx-fenggq
	*/
	var addClass=function(jq,configs){
		if(!jq || !configs){
			return jq;
		}
		if($.type(configs.cls)=="array"){
			for(var i=0;i<configs.cls.length;i++){
				jq.addClass(configs.cls);
			}
		}else{
			 if(!String.isBlank(configs.cls)){
				 jq.addClass(configs.cls);
			 }
		}
		 return jq;
	};
	exports.addClass=addClass;
	/* @Description: 增加jQuery对象的Css样式
 	* @ param jq
 	* @ param configs 包含属性数组configs.css
	* @date 2015-12-31
	* @author:kfzx-fenggq
	*/
	var css=function(jq,configs){
		if(!jq || !configs){
			return jq;
		}
		if(configs.css){
			jq.css(configs.css);
		}
		 if(!String.isBlank(configs.width)){
		 	 jq.css("width",getSize(configs.width));
		 }
		 if(!String.isBlank(configs.height)){
		 	 jq.css("height",getSize(configs.height));
		 }
		 return jq;
	};
	exports.css=css;	
	exports.getStyle=function(configs,isGrid){
		var style=[];
		if(!configs)return style;
		if(configs.css){
			$.each(configs.css,function(key,val){
				style.push(key+":"+val);
			});
		}
		if(!String.isBlank(configs.align)){
			style.push("text-align:"+configs.align);
		}
		if(isGrid){
			if(!String.isBlank(configs.widthCol)){
				style.push("width:"+getSize(configs.widthCol));
			}else if(!String.isBlank(configs.width)){
				style.push("width:"+getSize(configs.width));
			}
		}else{
			if(!String.isBlank(configs.width)){
				style.push("width:"+getSize(configs.width));
			}
		}
		
		if(!String.isBlank(configs.height)){
			style.push("height:"+getSize(configs.height));
		}
		if(!String.isBlank(configs.display)){
			style.push("display:"+configs.display);
		}
		return " style='"+style.join(";")+"'";
	};
	/* @Description: 增加jQuery对象的属性
 	* @ param configs 包含属性数组configs.attr
	* @date 2015-12-31
	* @author:kfzx-fenggq
	*/
	var attr=function(jq,configs){
		if(!jq || !configs){
			return jq;
		}
		if(configs.attr){
			for(var key in configs.attr){
				var val=configs.attr[key];
				 jq.attr(key,val);
			}
		}
		 if(!String.isBlank(configs.id)){
		 	 jq.attr("id",configs.id);
		 }
		 if(!String.isBlank(configs.name)){
		 	 jq.attr("name",configs.name);
		 }
		 if (!String.isBlank(configs.title)) {
				jq.attr("title", configs.title);
			}
		 //textarea,input
		 if(!String.isBlank(configs.disabled)){
		 	 jq.attr("disabled",configs.disabled);
		 }
		 if(!String.isBlank(configs.readonly)){
		 	 jq.attr("readonly",configs.readonly);
		 }
		 //textarea
		 if(!String.isBlank(configs.rows)){
		 	 jq.attr("rows",configs.rows);
		 }
		 //textarea
		 if(!String.isBlank(configs.cols)){
		 	 jq.attr("cols",configs.cols);
		 }
		//input
		 if(!String.isBlank(configs.placeholder)){
		 	 jq.attr("placeholder",Global.getI18N(configs.placeholder));
		 }
		 //radio,check
		 if(!String.isBlank(configs.checked) ){
			 if(configs.checked==true || configs.checked=="true" || configs.checked=="checked"){
				 jq.attr("checked","checked");
			 }else{
				 jq.removeAttr("checked");
			 }
		 }
		 //table
		 if(!String.isBlank(configs.rowspan)){
		 	 jq.attr("rowspan",configs.rowspan);
		 }
		 if(!String.isBlank(configs.colspan)){
		 	 jq.attr("colspan",configs.colspan);
		 }
		//iframe,img..
		 if(!String.isBlank(configs.src)){
		 	 jq.attr("src",configs.src);
		 }
		if (!String.isBlank(configs.autocomplete)) {
			jq.attr("autocomplete", configs.autocomplete);
		}
		 return jq;
	};
	exports.attr=attr;
	/*@Description: jQuery对象设置默认值
 	* @ param jq=[],value=[]时，jq[i]=value[i];jq={},value=[]时，jq=value[0];jq={},value=“”时，jq=value
 	* @ param configs 包含属性数组configs.value[]
 	* @return jq 
	* @date 2015-12-31
	* @author:kfzx-fenggq
	*/
	exports.val=function(jq,configs){
		if($.type(jq)=="array"){
			for(var i=0;i<jq.length;i++){
				if(!String.isBlank(configs.value[i])){
					jq[i].val(configs.value[i]);
				}
			}
		}else{
			if($.type(configs.value)=="array"){
					if(!String.isBlank(configs.value[0])){
						jq.val(configs.value[0]);
					}
			}else{
				if(!String.isBlank(configs.value)){
					jq.val(configs.value);
				}
			}
		}
		return jq;
	};
	/*@Description: jQuery对象绑定事件
 	* @ param jq
 	* @ param configs 包含属性数组configs.cls
	* @date 2015-12-31
	* @author:kfzx-fenggq
	*/
	exports.bind=function(jq,configs){
		 if (configs.events) {
		 	for (var key in configs.events) {
		 		var val=configs.events[key];
		 		if(val){
		 			jq.bind(key,val);
		 		}
		 	}
		 }
		 if(configs.click){
			 jq.bind("click",configs.click);
		 }
		 if(configs.change){
			 jq.bind("change",configs.change);
		 }
		 if(configs.blur){
			 jq.bind("blur",configs.blur);
		 }
		 if(configs.keydown){
			 jq.bind("keydown",configs.keydown);
		 }
		 if(configs.keyup){
			 jq.bind("keyup",configs.keyup);
		 }
		 if(configs.keypress){
			 jq.bind("keypress",configs.keypress);
		 }
		 if(configs.hover){
			 jq.bind("hover",configs.hover);
		 }
		 return jq;
	};
	
 
	/* @Description: 创建标签 
 	* @ param configs 
	* @date 2015-12-31
	* @author:kfzx-fenggq
	*/
	exports.createLabel=function(configs){
		if(!configs.label){
			return null;
		}
		var label=$("<label for='"+configs.id+"'>"+Global.getI18N(configs.label)+"</label>");
		if(configs.isNull==false || configs.isNull=="false"){
			label.append("<span class='nullTip' style='color:red'>*</span>");
		}
		var labelConfigs={};
		labelConfigs.cls=configs.labelCls||{}; 
		labelConfigs.css=configs.labelCss||{}; 
		labelConfigs.attr=configs.labelArr||{};
		//控件样式设置
		css(label,labelConfigs);
		//控件类设置
		addClass(label,labelConfigs);
		//控件属性设置
		attr(label,labelConfigs);
		return label;
	};
	
	/* @Description: 创建Input的旁注
 	* @ param configs 
	* @date 2017-01-06
	* @author:kfzx-fenggq
	*/
	exports.createTip=function(configs){
		if(!configs.tip){
			return null;
		}
		var label=$("<label class='sea_formLayout_tip' for='"+configs.id+"' style='color:#999;'>&nbsp;"+Global.getI18N(configs.tip)+"</label>");
		return label;
	};
	/* @Description: 隐藏
 	* @ param jq 
	* @date 2015-12-31
	* @author:kfzx-fenggq
	*/
	exports.hide=function(jq){
		return jq.hide();
	};
	/* @Description: 显示
 	* @ param jq 
	* @date 2015-12-31
	* @author:kfzx-fenggq
	*/
	exports.show=function(jq){
		return jq.show();
	};
	/* @Description: 禁用
 	* @ param jq 
	* @date 2015-12-31
	* @author:kfzx-fenggq
	*/
	exports.disabled=function(jq){
		return jq.attr("disabled","disabled");
	};
	/* @Description: 启用
 	* @ param jq 
	* @date 2015-12-31
	* @author:kfzx-fenggq
	*/
	exports.enabled=function(jq){
		return jq.attr("disabled","");
	};
	var getSize=function(val,parentSize){
		if(parentSize){
			if((val+"").indexOf('%')>0){
				return 0.01*parentSize* parseFloat($.trim(val.replace("%","")));
			}else {
				return val;
			}
		}else{
			if((val+"").indexOf('%')>0){
				return val;
			}else {
				try{
					val=parseFloat(val);
				}catch(e){
					return val;
				}
				return val+'px';
			}
		}
	};
	exports.getSize=getSize;
	exports.hasScroll=function(el, direction){
		if(direction == "vertical") {
			return el.scrollHeight > el.clientHeight;
		}else if(direction == "horizontal") {
	        return el.scrollWidth > el.clientWidth;
	    }
	};
	
	exports.getNumber=function(val,defaultValue){
		if(val){
			try{
				val=Number(val);
				return val;
			}catch(e){
				if(defaultValue)return defaultValue;
			}
		}else{
			if(defaultValue)return defaultValue;
		}
		return 0;
	};
	exports.autoSizeTextarea=function(id){
		if($("textarea#"+id).length==0)return;
		var observe;
		if (window.attachEvent) {
		    observe = function (element, event, handler) {
		        element.attachEvent('on'+event, handler);
		    };
		}else {
		    observe = function (element, event, handler) {
		        element.addEventListener(event, handler, false);
		    };
		}
	    var text = document.getElementById(id);
	    function resize () {
	        text.style.height = 'auto';
	        text.style.height = text.scrollHeight+'px';
	    }
	    function delayedResize () {
	        window.setTimeout(resize, 0);
	    }
	    observe(text, 'change',  resize);
	    observe(text, 'cut',     delayedResize);
	    observe(text, 'paste',   delayedResize);
	    observe(text, 'drop',    delayedResize);
	    observe(text, 'keydown', delayedResize);
//	    text.focus();
//	    text.select();
	    resize();
	};
	exports.onAdd=function(_grid,_dialog,_formEdit,_formQuery,_title,_baseUrl,getFormEdit,record,Dialog,callback,beforeNew){
		_formEdit=getFormEdit(record);
		_dialog=Dialog.edit({
			title:_title&&_title+"-录入",
			hasConfirm:false,
			hasCancel:false,
			items:[{
			    icon: "iconfont icon-icon_function_baocunbingxinzeng",
			    value: "保存并新增",
			    cls:"btn_saveNew",
			    click: function() {
					_formEdit.submit(_baseUrl,function(rs){
						Dialog.alert(rs.msg);
						if(rs.success==false){
							return false;
						}
						_grid.reload(_formQuery&&_formQuery.val());
						if(beforeNew)record=beforeNew(record);
						_formEdit=getFormEdit(record);
						_dialog.content.empty().append(_formEdit.formLayout);
						if(callback)callback(_formEdit);
					});
			    }
			  },{
			    icon: "iconfont icon-icon_saved",
			    value: "保存并退出",
			    cls:"btn_saveExit",
			    click: function() {
					_formEdit.submit(_baseUrl,function(rs){
						Dialog.alert(rs.msg);
						if(rs.success==false){
							return false;
						}
						_grid.reload(_formQuery&&_formQuery.val());
						_dialog.hide();
					});
			    }
			},{
		    icon: "iconfont icon-return",
		    value: "返回",
		    cls:"btn_return",
		    click: function() {
			  _dialog.hide();
		    }
		  }],
			content: _formEdit.formLayout
		});
		if(callback)callback(_formEdit);
	};
	exports.onEdit=function(_grid,_dialog,_formEdit,_formQuery,_title,_baseUrl,getFormEdit,record,Dialog,Array,_currentId,callback){
		_formEdit=getFormEdit(record);
		_currentId=record.id;
		_dialog=Dialog.edit({
			title:_title&&_title+"-编辑",
			hasConfirm:false,
			hasCancel:false,
			items:[{
				id:"btn_prev",
			    icon: "iconfont icon-step-backward",
			    cls:"btn_prev",
			    value: "上一条",
			    click: function() {
					var curIndex=Array.getRecordIndex(_grid.configs.records,"id",_currentId);
					if((curIndex-1)>=0){
						var record=_grid.configs.records[curIndex-1];
						_currentId=record.id;
						_formEdit.submit(_baseUrl,function(rs){
							if(rs.success==false){
								Dialog.alert(rs.msg);
								return false;
							}
							_grid.reload(_formQuery&&_formQuery.val());
							_dialog.content.empty();
							_formEdit=getFormEdit(record);
							_dialog.content.append(_formEdit.formLayout);
							if(callback)callback(_formEdit);
						});
					}else{
						$("#btn_prev").parent().tip({
							content: "<div style='font-size:14px'>已经是第一条了...</div>"
						}).trigger("show");
					}
			    }
			  },{
			    icon: "iconfont icon-icon_saved",
			    value: "保存并退出",
			    cls:"btn_saveExit",
			    click: function() {
					_formEdit.submit(_baseUrl,function(rs){
						Dialog.alert(rs.msg);
						if(rs.success==false){
							return false;
						}
						_grid.reload(_formQuery&&_formQuery.val());
						_dialog.hide();
					});
			    }
		  },{
			id:"btn_next",
		    icon: "iconfont icon-step-forward",
		    cls:"btn_next",
		    value: "下一条",
		    click: function() {
				var curIndex=Array.getRecordIndex(_grid.configs.records,"id",_currentId);
				if(_grid.configs.records.length>(curIndex+1)){
					var record=_grid.configs.records[curIndex+1];
					_currentId=record.id;
					_formEdit.submit(_baseUrl,function(rs){
						if(rs.success==false){
							Dialog.alert(rs.msg);
							return false;
						}
						_grid.reload(_formQuery&&_formQuery.val());
						_dialog.content.empty();
						_formEdit=getFormEdit(record);
						_dialog.content.append(_formEdit.formLayout);
						if(callback)callback(_formEdit);
					});
				}else{
					$("#btn_next").parent().tip({
						content: "<div style='font-size:14px'>已经是最后一条了...</div>"
					}).trigger("show");
				}
		    }
		  }],
			content: _formEdit.formLayout
		});
		if(callback)callback(_formEdit);
	};
	exports.onView=function(_grid,_dialog,_title,getFormView,record,Dialog,Array,_currentId,callback){
		var _formView=getFormView(record);
		_currentId=record.id;
		_dialog=Dialog.edit({
			title:_title&&_title+"-查看",
			hasConfirm:false,
			hasCancel:false,
			items:[{
				id:"btn_prev",
			    icon: "iconfont icon-step-backward",
			    cls:"btn_prev",
			    value: "上一条",
			    click: function() {
					var curIndex=Array.getRecordIndex(_grid.configs.records,"id",_currentId);
					if((curIndex-1)>=0){
						var record=_grid.configs.records[curIndex-1];
						record=_grid.getViewData(record);
						_currentId=record.id;
						_dialog.content.empty();
						_formView=getFormView(record);
						_dialog.content.append(_formView.viewLayout);
						if(callback)callback(_formView);
					}else{
						$("#btn_prev").parent().tip({
							content: "<div style='font-size:14px'>已经是第一条了...</div>"
						}).trigger("show");
					}
			    }
			  },{
			    icon: "iconfont icon-icon_saved",
			    value: "退出",
			    cls:"btn_return",
			    click: function() {
					_dialog.hide();
			    }
		  },{
			id:"btn_next",
		    icon: "iconfont icon-step-forward",
		    value: "下一条",
		    cls:"btn_next",
		    click: function() {
				var curIndex=Array.getRecordIndex(_grid.configs.records,"id",_currentId);
				if(_grid.configs.records.length>(curIndex+1)){
					var record=_grid.configs.records[curIndex+1];
					record=_grid.getViewData(record);
					_currentId=record.id;
					_dialog.content.empty();
					_formView=getFormView(record);
					_dialog.content.append(_formView.viewLayout);
					if(callback)callback(_formView);
				}else{
					$("#btn_next").parent().tip({
						content: "<div style='font-size:14px'>已经是最后一条了...</div>"
					}).trigger("show");
				}
		    }
		  }],
			content: _formView.viewLayout
		});
		if(callback)callback(_formView);
	};
	
	exports.getCfgGrid=function(cfgGrid,cfgForm){
		var columns=[];
		if(!cfgGrid.columns){
			columns= [{
				id: "id",
				align: "center",
				width: 40,
				format: "checkbox",
				forzen: true
			},{
				id: "_op",
				label: "操作",
				align: "center",
				width: 100,
				buttons: ["view","edit","delete"],
				forzen: true
			}];
		}else{
			columns=cfgGrid.columns;
		}
		var rlen=cfgForm.items.length;
		for(var i=0;i<rlen;i++){
			var clen=cfgForm.items[i].length;
			for(var j=0;j<clen;j++){
				var item=cfgForm.items[i][j];
				if(!item.id)continue;
				if(item.type=="hidden"||item.isColumn==false)continue;
				columns.push(item);
			}
		}
		cfgGrid.columns=columns;
		return cfgGrid;
	};
	exports.getOrd = function(selectNode) {
		var preNode = selectNode.getPreNode();
		var nextNode = selectNode.getNextNode();
//		var preOrd = preNode ? preNode.ord : 0;
//		var nextOrd = nextNode ? nextNode.ord : (preOrd + 1);
//		var ord = (preOrd + nextOrd) * 0.5;
		if(preNode)return preNode.ord+1;
		if(nextNode)return nextNode.ord+1;
		return selectNode.ord;
	};
	
	exports.setVal=function(ids,record,parentSelector){
		var len=ids.length;
		for(var i=0;i<len;i++){
			var id=ids[i];
			$("#"+id,parentSelector).val(record[id]);
		}
	};
});