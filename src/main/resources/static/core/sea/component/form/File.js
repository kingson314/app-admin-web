define(function(require, exports, module) {
	/*** 模块外部依赖 ***/
	var Component = require("Component");
	var Lang = require("Lang");
	var Date = require("Date");
	var Mask = require("Mask");
	var Ajax = require("Ajax");
	/** * 模块私有数据 ** */
	//默认配置
	var defaults = {
		id:"",
		label:"",
		labelCss:{},
		labelAttr:{},
//		value:"",
		isNull:true,
		auto:true,//选择文件后，马上上传
		showImg:true,
		multiple:false,
		downloadAll:false,
		isToolBar:false,
		importParams:null,//导入参数：{table:"patent_sale",columns:[name,..],ignoreRow:[]}
		path:"uploads/file",//上传路径，默认为“upload/当前日期/”
		cls:"",
		css:{},
		action:"upload/run",
		attr:{disabled:false,maxLen:0},
		onSuccess:function(rs){}
//		1.accept="application/msexcel"
//		2.accept="application/msword"
//		3.accept="application/pdf"
//		4.accept="application/poscript"
//		5.accept="application/rtf"
//		6.accept="application/x-zip-compressed"
//		7.accept="audio/basic"
//		8.accept="audio/x-aiff"
//		9.accept="audio/x-mpeg"
//		10.accept="audio/x-pn/realaudio"
//		11.accept="audio/x-waw"
//		12.accept="image/gif"
//		13.accept="image/jpeg"
//		14.accept="image/tiff"
//		15.accept="image/x-ms-bmp"
//		16.accept="image/x-photo-cd"
//		17.accept="image/x-png"
//		18.accept="image/x-portablebitmap"
//		19.accept="image/x-portable-greymap"
//		20.accept="image/x-portable-pixmap"
//		21.accept="image/x-rgb"
//		22.accept="text/html"
//		23.accept="text/plain"
//		24.accept="video/quicktime"
//		25.accept="video/x-mpeg2"
//		26.accept="video/x-msvideo"
	};
	/** * 类定义 ** */
	var File = function(configs) {
		this.configs=$.extend(true,{},defaults,configs);
		this.configs.path=this.configs.path+"/"+Date.getDate("");
		this._className="sea_file";
		this.files=[];
		//初始化
		this.label = Component.createLabel(this.configs);
		var me=this;
		this.file=$('<form id=form'+this.configs.id+' style="position:relative;width:100%;text-align:left;" method="post" enctype="multipart/form-data"></form>')
		.attr("action",Session.basePath+me.configs.action)
		.addClass(me._className);
		this._input= $("<input class='sea_textfield' type='hidden' id='"+this.configs.id+"' name='"+this.configs.id+"' />").appendTo(this.file);
		this._button=$("<input type='button'value='"+(this.configs.value||Lang.browse)+"'/>")
		.css({
			"line-height":"15px",
			"text-align":"center",
			"padding":"5px 15px",
			"cursor": "pointer",
			"margin-right":"5px",
			"border":"1px solid #ccc"
		}).click(function(){
			me._file.click();
		});
		me._button.appendTo(me.file);
		if(me.configs.isToolBar==false){
			me.ul=$("<ul style='padding:3px 3px 5px 10px;line-height:20px;'></ul>").appendTo(me.file);
			var li=$("<li style='display:block;width:100%'></li>").appendTo(me.ul).append(me._button);
		}
		this._file=$("<input type='file' name='"+this.configs.id+"' style='display:none;position:absolute;top:0;left:0;width:88%;height:30px;line-height:30px;filter:alpha(opacity:0);opacity: 0;'/>")
		.appendTo(this.file).change(function(){
			 var mask=Mask.show(); 
			 setTimeout(function(){
				 var formData = new FormData($("#form"+me.configs.id)[0]);  
				 $.ajax({   
				   url: Session.basePath +me.configs.action,
			       type: 'post',
			       data: formData,
		    	   dataType : "json",
			       async: false,
			       cache: false,
			       contentType: false,
			       processData: false,
			       success: function(rs) {    
				 		var path=rs.data[me.configs.id];
			    		var pathVal=me._input.val();
		    			var pathArr=[];
		    			if(pathVal!=""){
		    				pathArr=pathVal.split(",");
		    			}
				 		if(me.configs.showImg==true){
					 		$.each(path,function(index,item){
					 			if($.trim(item)=="")return true;
					 			pathArr.push(item);
					 			var Img=require("Img");
						 		var _img=Img.create({src:me.getPath(item)}).img;
						 		$("<li style='display:block;width:100%'></li>")
				 				.appendTo(me.ul).append(_img)
				 				.append("<a class='deletefile'  path='"+item+"' style='margin-left:10px' href=#><i class='glyphicon glyphicon-remove'></i></a>");
					 		});
				 		}else{
				 			$.each(path,function(index,item){
				 				pathArr.push(item);
				 				var fileName=Ajax.getUrlParam(item,"attname")||column.label;
				 				$("<li style='display:block;width:100%'></li>")
				 				.appendTo(me.ul)
				 				.append("<a class='_file' style='color:blue'target=_blank href='"+(me.getPath(item))+"' download='"+fileName+"'>"
				 						+fileName+"</a> <a class='deletefile' path='"+item+"' style='margin-left:10px' href=#><i class='glyphicon glyphicon-remove'></i></a>");
					 		});
				 		}
				 		me._input.val(pathArr.join(","));
					    mask.hide();
				 		me.configs.onSuccess(rs);   
			    	   },
			       error: function(rs) {    
			    		 alert(JSON.stringify(rs));   
		    	   }  
				});
			 },100);
		});
		$("body").delegate(".sea_file .deletefile", "click", function() {
			var pathArr=me._input.val().split(",");
			var path=$(this).attr("path");
			$.each(pathArr,function(index,item){
				if(item==path){
					delete pathArr[index];
				}
			});
			me._input.val(pathArr.join(","));
			$(this).parent().remove();
		});
		if(this.configs.multiple)this._file.attr("multiple","multiple");
		if(this.configs.accept)this._file.attr("accept",this.configs.accept);
		this.file.append("<input id='_uploadPath' name='_uploadPath' type='hidden' value='"+this.configs.path+"' />");
		if(this.configs.importParams){
			this.file.append("<input id='_importParams' name='_importParams' type='hidden' value='"+JSON.stringify(this.configs.importParams)+"' />");
			Log.begTime=Date.getTimestamp();
			this.file.append("<input id='_log' name='_log' type='hidden' value='"+JSON.stringify(Log)+"' />");
		}
	};
	
	//类公共方法
	File.prototype={
		download:function(name, href) {
	      var a = document.createElement("a"), //创建a标签
		  e = document.createEvent("MouseEvents"); //创建鼠标事件对象
		  e.initEvent("click", false, false); //初始化事件对象
		  a.href = href; //设置下载地址
		  a.setAttribute("class","_download");
		  a.download = name; //设置下载文件名
		  a.dispatchEvent(e); //给指定的元素，执行事件click事件
		  a.remove();
	  	},
		getPath:function(path){
			if(path.indexOf("http")>=0){
				return path;
			}else{
				return Session.basePath+path;
			}
		},
		val:function(data){
			var path;
			var me=this;
			var pathArr=[];
			if(data!=null||data!=undefined){
				data=data[this.configs.id];
				if(this.configs.showImg==true){
					path=(data||"").split(",");
					me.file.find(".sea_img").remove();
			 		$.each(path,function(index,item){
						if($.trim(item)=="")return;
						pathArr.push(item);
			 			var Img=require("Img");
				 		var _img=Img.create({src:me.getPath(item)}).img;
				 		$("<li style='display:block;width:100%'></li>")
		 				.appendTo(me.ul).append(_img).append("<a class='deletefile' path='"+item+"' style='margin-left:10px' href=#><i class='glyphicon glyphicon-remove'></i></a>");
			 		});
				}else{
					if(data){
						path=data.split(",");
						$.each(path,function(index,item){
							if($.trim(item)=="")return;
			 				pathArr.push(item);
			 				var fileName=Ajax.getUrlParam(item,"attname")||column.label;
			 				$("<li style='display:block;width:100%'></li>")
			 				.appendTo(me.ul)
			 				.append("<a class='_file' style='color:blue'target=_blank href='"+me.getPath(item)+"' download='"+fileName+"'>"+fileName+"</a> <a class='deletefile' path='"+item+"' style='margin-left:10px' href=#><i class='glyphicon glyphicon-remove'></i></a>");
			 				me.files.push({"name":fileName,"href":me.getPath(item)});
				 		});
					}
				}
				me._input.val(pathArr.join(","));
			}else{ 
				return this._input.val();
			}
		},
		check:function(){
			return true;
		},
		clear:function(){
			this._input.val("");
		},
		//设置焦点
		focus:function(){
			return Component.focus(this._input);
		},
		//显示 
		show:function(){
			return Component.show(this._input);
		},
		//隐藏
		hide:function(){
			return Component.hide(this._input);
		},
		//禁用
		disabled:function(){
			return Component.disable(this._input);
		},
		//启用
		enabled:function(){
			return Component.enabled(this._input);
		}
	};
	/*** 输出类对象 ***/
	exports.create = function(configs) {
		return new File(configs);
	};
});
