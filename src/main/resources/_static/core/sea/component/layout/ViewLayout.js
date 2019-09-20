define(function(require, exports, module) {
	/** * 模块外部依赖 ** */
	//require.async(("./css/viewLayout.css");
	var String = require("String");
	var Component = require("Component");
	var Ajax = require("Ajax");
	/** * 模块私有数据 ** */
	var ClassName="sea_viewLayout";
	// 默认配置
	var defaults = {
		parent: null,	// 父元素
		id: "",
		name: "",
		record:{},//视图记录集
		title: null,
		buttons: [],
		width: "100%",
		height: "100%",
		cls: "",
		css: {"margin":"0 auto"},
		attr: {},
		cssInner:{"padding":"0 10%"},
		cssTr:{},
		isSameLabelWidth:true,//在使用colspan后保持Label的宽度一样
		labelWidthPercent: 0.382,// 黄金分割线，必须为数字；fieldWidth=1-labelWidthPercent
		events: {
			click: null,
			change: null
		},
		items: [[{
			//			id: "",
			//			name: "",
			//			label: "",
			//			value: "",
			//			colspan: "",
			//			cssTr: "",
			//			cssTd: "",
			//			cls: "",
			//			css: "",
			//			attr: ""
			//			}
		}]]
	};
	/** * 模块私有方法 ** */
	var self = {
		// 初始化
		init: function(me) {
			// 控件封装
		  me.layout=me.viewLayout=$("<form></form>").addClass(ClassName);
		  if(me.configs.parent){
			  if ($.type(me.configs.parent) == "string") {
					me.parent = $(me.configs.parent);
				} else {
					me.parent = me.configs.parent;
			   }
			  me.parent.append(me.viewLayout)
		   }
		  	//控件类名设置
		    Component.addClass(me.viewLayout,me.configs);
		    //控件样式设置
			Component.css(me.viewLayout, me.configs);
			// 控件属性设置
			Component.attr(me.viewLayout, me.configs);

			if (me.configs.title) {
				$("<div></div>").addClass("sea_title").append(Global.getI18N(me.configs.title)).appendTo(me.viewLayout);
			}
			var table = $("<div></div>").addClass(ClassName + "_table").appendTo(me.viewLayout).css(me.configs.cssInner);
			var maxColCount = me.configs.items[0].length; // 潜规则1：以首行配置的列数为最大列数(包含hidden类型以及空对象)
			var colWidthInit = Math.floor(100 / maxColCount);
			var rowCount=me.configs.items.length;
			var clsGroup="";//当有title字段时，该title下直到下一个title出现前的字段为一个组，用于控制显藏
			for (var rowIndex = 0; rowIndex < rowCount; rowIndex++) {
				var rowItems = me.configs.items[rowIndex];
				var colCount=rowItems.length;
				var tr = $("<div></div>").addClass(ClassName + "_tr").css(me.configs.cssTr).appendTo(table);
				if(clsGroup!="")tr.addClass(clsGroup);
				if(rowItems&&colCount>0 && rowItems[0].cssTr){
					tr.css(rowItems[0].cssTr)
				}
				for (var colIndex = 0; colIndex < colCount; colIndex++) {
					var item = rowItems[colIndex];
					if(item.type=="hr"){
						tr.remove();
						table.append("<hr>");
						continue;
					}
					if(item.type=="hidden"){
						continue;
					}
					if(item.hideView==true){
						continue;
					}
					if (!item.id) {
						continue;
					}
					if(item.colspan){
						colWidth=colWidthInit * item.colspan;
					}else{
						colWidth=colWidthInit;
					}
					if(item.type=="title"){
						_Component = $("<div>"+(item.html||"")+"</div>").addClass("sea_subtitle").css("width", colWidth + '%').css(item.cssTd || {});
						_Component.append("<span class='sea_formLayout_subtitle_btn "+"iconfont icon-up'></span>");
						_Component.find(".sea_formLayout_subtitle_btn").bind("click",{index:rowIndex},function(event){
				 			$(this).toggleClass("icon-down icon-up");
				 			$("#"+me.configs.id+" .sea_formLayout_group"+event.data.index).toggle();
				 		});
						Component.addClass(_Component, item);
						Component.css(_Component, item);
						Component.attr(_Component, item);
						_Component.appendTo(tr);
						tr.removeClass(clsGroup).css({"padding":0,"margin-bottom":"1px"});
						clsGroup="sea_formLayout_group"+rowIndex;
					}else if(item.type=="image"){
						var tdLabel = $("<div></div>").addClass(ClassName + "_td").css("width",  self.getLabelWidth(me,colWidthInit,colWidth)).appendTo(tr);
						self.appendLabel(tdLabel,Component.createLabel(item));
						var tdField = $("<div></div>").addClass(ClassName + "_td").css("width", self.getFieldWidth(me,item,colWidthInit,colWidth)).appendTo(tr);
						var val=me.configs.record[item.id];
						if(val==null || val==undefined){
							val=item.val;
						}
						if(String.isBlank(val)){
							self.appendFields(tdField,"");
						}else{
							var url=val;
							if(!String.isUrl(url)){
								url=Session.basePath+url;
							}
							
							var image="<img src='"+url+"'/>";
							self.appendFields(tdField,image);
						}
					}else if(item.type=="file"){
						var tdLabel = $("<div></div>").addClass(ClassName + "_td").css("width",  self.getLabelWidth(me,colWidthInit,colWidth)).appendTo(tr);
						self.appendLabel(tdLabel,Component.createLabel(item));
						var tdField = $("<div></div>").addClass(ClassName + "_td").css("width", self.getFieldWidth(me,item,colWidthInit,colWidth)).appendTo(tr);
						var val=me.configs.record[item.id];
						if(val==null || val==undefined){
							val=item.val;
						}
						if(String.isBlank(val)){
							self.appendFields(tdField,"");
						}else{
							var url=val;
							if(!String.isUrl(url)){
								url=Session.basePath+url;
							}
							var fileName=Ajax.getUrlParam(url,"attname");
							var a="<a style='color:blue'target=_blank href='"+url+"' download='"+(fileName||item.label)+"'>下载文件</a>";
							self.appendFields(tdField,a);
						}
					}else if(item.type=="div"){
						var _Component = $("<div></div>").addClass(me.configs._clsTd).css("width", colWidth + '%').css(item.cssTd || {});
						_Component.append(item.html||"");
						Component.addClass(_Component, item);
						Component.css(_Component, item);
						Component.attr(_Component, item);
						_Component.appendTo(tr);
					}else{
						if(item.label){
							var tdLabel = $("<div></div>").addClass(ClassName + "_td").css("width",  self.getLabelWidth(me,colWidthInit,colWidth)).appendTo(tr);
							self.appendLabel(tdLabel,Component.createLabel(item));
						}
						var tdField = $("<div></div>").addClass(ClassName + "_td").css("width", self.getFieldWidth(me,item,colWidthInit,colWidth)).appendTo(tr);
						var val;
						var columnNameArr=item.id.split(".");//兼容关联对象
						if(columnNameArr.length==1){
							val=me.configs.record[item.id];
						}else{
							var relativeObj=me.configs.record[columnNameArr[0]];
							if(relativeObj){
								val=relativeObj[columnNameArr[1]];
							}else{
								val="";
							}
						}
						if(val==null || val==undefined){
							val=item.val;
						}
						self.appendFields(tdField,val);
					}
				}
			}
		},
		appendLabel: function(td, label) {
			$("<div></div>").addClass(ClassName+"_label").append(label).appendTo(td);
		},
		appendFields: function(td, fields) {
			var formFields = $("<div></div>").addClass(ClassName+"_field");
			formFields.append(fields);
			td.append(formFields);
		},
		getLabelWidth:function(me,colWidthInit,colWidth){
			return (me.configs.isSameLabelWidth?colWidthInit:colWidth)* me.configs.labelWidthPercent + '%';
		},
		getFieldWidth:function(me,item,colWidthInit,colWidth){
			if(!item.label)return colWidth+ '%';
			return ((me.configs.isSameLabelWidth&&item.colspan>1)?(colWidthInit* (1 - me.configs.labelWidthPercent)+colWidthInit*(item.colspan-1)):(colWidth* (1 - me.configs.labelWidthPercent))) + '%';
		}
	};
	/** * 类定义 ** */
	var ViewLayout = function(configs) {
		this.configs = $.extend(true, {},defaults, configs);
		self.init(this);
	};
	// 类公共方法
	ViewLayout.prototype = {
		get: function(selector) {
			return this.viewLayout.find(selector)
		}
	};
	/** *输出类对象 ** */
	exports.create = function(configs) {
		return new ViewLayout(configs);
	};
});