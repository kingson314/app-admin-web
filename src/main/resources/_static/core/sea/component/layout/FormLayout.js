define(function(require, exports, module) {
	/** * 模块外部依赖 ** */
	//require.async(("./css/formLayout.css");
	//var String = require("String");
	var Component = require("Component"); 
	/** * 模块私有数据 ** */
	var ClassName = "sea_formLayout";
	// 默认配置
	var defaults = {
		parent: null,// 父元素
		id: "",
		name: "",
		record:null,//视图记录集
		title: null,
		action:null,
		buttons: [],
		width: "100%",
		height: "100%",
		cls: "",
		css: {
//			"border": "0",
			"margin": "0 auto"
		},
		attr: {},
		cssInner: {
			"padding": "5px 10% 0 0"
		},
		cssTr:{},
		isSameLabelWidth:true,//在使用colspan后保持Label的宽度一样
		labelWidthPercent: 0.382,
		// 黄金分割线，必须为数字；fieldWidth=1-labelWidthPercent
		events: {
			click: null,
			change: null
		},
		items: [
			[{
				//			id: "",
				//			name: "",
				//			label: "",
				//			type: "",,
				//			tip: "",
				//			tipWdith: "30%",
				//			format: "",
				//			value: "",
				//			isNull: "",
				//			colspan: "",
				//			cssTr: "",
				//			cssTd: "",
				//			cls: "",
				//			css: "",
				//			attr: "",
				//			options: [{
				//				value: "",
				//				text: ""
				//			}],
				//			events: {
				//				click: null,
				//				change: null
				//			}
			}]
		],
		beforeRender: function() {

		},
		afterRender: function() {

		},
		beforeCheck:function(){
			return true;
		},
		afterCheck:function(){
			return true;
		}
	};
	/** * 模块私有方法 ** */
	var self = {
		// 初始化
		init: function(me) {
			// 控件封装
			me.layout=me.formLayout = $("<form autocomplete='off' ></form>").addClass(ClassName);
			if (me.configs.parent) {
				if ($.type(me.configs.parent) == "string") {
					me.parent = $(me.configs.parent);
				} else {
					me.parent = me.configs.parent;
				}
				me.parent.append(me.formLayout)
			}
			//控件类名设置
			Component.addClass(me.formLayout, me.configs);
			// 控件属性设置
			Component.attr(me.formLayout, me.configs);
			//控件样式设置
			Component.css(me.formLayout, me.configs);
			if (me.configs.title) {
				$("<div></div>").addClass("sea_title").append("<i class='glyphicon glyphicon-th'><i/><span style='margin-left:3px'>"+Global.getI18N(me.configs.title)+"</span>").appendTo(me.formLayout);
			}
			var table = $("<div></div>").addClass(me.configs._clsTable).appendTo(me.formLayout).css(me.configs.cssInner);
			var maxColCount = me.configs.items[0].length; // 潜规则1：以首行配置的列数为最大列数(包含hidden类型以及空对象)
			var colWidthInit = Math.floor(100 / maxColCount);
			var rowCount = me.configs.items.length;
			var clsGroup="";//当有title字段时，该title下直到下一个title出现前的字段为一个组，用于控制显藏
			for (var rowIndex = 0; rowIndex < rowCount; rowIndex++) {
				var rowItems = me.configs.items[rowIndex];
				var colCount = rowItems.length;
				var tr = $("<div></div>").addClass(me.configs._clsTr).css(me.configs.cssTr).appendTo(table);
				if(clsGroup!="")tr.addClass(clsGroup);
				if (rowItems && colCount > 0 && rowItems[0].cssTr) {
					tr.css(rowItems[0].cssTr)
				}
				for (var colIndex = 0; colIndex < colCount; colIndex++) {
					var item = rowItems[colIndex];
					if (item.colspan) {
						colWidth = colWidthInit * item.colspan;
					} else {
						colWidth = colWidthInit;
					}
					if (!item.type) {
						continue;
					}
					var labelWidthPercent=me.configs.labelWidthPercent;
					var _Component;
					if (!item.id || item.id == "") {
						item.id = Global.getSeq();
					}
					switch (item.type.toLowerCase()) {
					case "title":
						_Component = $("<div>"+(item.html||"")+"</div>").addClass("sea_subtitle").css("width", colWidth + '%').css(item.cssTd || {});
						_Component.append("<span class='sea_formLayout_subtitle_btn "+"glyphicon glyphicon-chevron-up'></span>");
						_Component.find(".sea_formLayout_subtitle_btn").bind("click",{index:rowIndex},function(event){
				 			$(this).toggleClass("glyphicon-chevron-up glyphicon-chevron-down");
				 			$("#"+me.configs.id+" .sea_formLayout_group"+event.data.index).toggle();
				 		});
						Component.addClass(_Component, item);
						Component.css(_Component, item);
						Component.attr(_Component, item);
						_Component.appendTo(tr);
						tr.removeClass(clsGroup).css({"padding":0,"margin-bottom":"1px"});
						clsGroup="sea_formLayout_group"+rowIndex;
						break;
					case "div":
						_Component = $("<div></div>").addClass(me.configs._clsTd).css("width", colWidth + '%').css(item.cssTd || {});
						_Component.append(item.html||"");
						Component.addClass(_Component, item);
						Component.css(_Component, item);
						Component.attr(_Component, item);
						_Component.appendTo(tr);
						break;
					case "button":
						_Component = require("Button").create(item);
						$("<div></div>").append(_Component.button).addClass(me.configs._clsTd).css("width", colWidth + '%').css(item.cssTd || {}).appendTo(tr);
						break;
					case "buttongroup":
						_Component = require("ButtonGroup").create(item);
						$("<div></div>").append(_Component.buttonGroup).addClass(me.configs._clsTd).css("width", colWidth + '%').css(item.cssTd || {}).appendTo(tr);
						break;
					case "checkbox":
						_Component = require("Checkbox").create(item);
						if (_Component.label && _Component.configs.showLabelWidth==true) {
							var tdLabel = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getLabelWidth(me,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
						}
						var tdField = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getFieldWidth(me,item,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
						tdField.append(_Component.checkbox).append(_Component.label);
						break;
					case "checkgroup":
						_Component = require("CheckGroup").create(item);
						if (_Component.label) {
							var tdLabel = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getLabelWidth(me,colWidthInit,colWidth) ).appendTo(tr);
							self.appendLabel(tdLabel, _Component.label);
						}
						var tdField = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getFieldWidth(me,item,colWidthInit,colWidth) ).appendTo(tr);
						self.appendFields(tdField, _Component.checkGroup,_Component);
						break;
					case "color":
						break;
//					case "combobox":
//						_Component = require("ComboBox").create(item);
//						if (_Component.label) {
//							var tdLabel = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getLabelWidth(me,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
//							self.appendLabel(tdLabel, _Component.label);
//						}
//						var tdField = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getFieldWidth(me,item,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
//						self.appendFields(tdField, _Component.combobox,_Component);
//						break;
					case "date":
					case "time":
					case "datetime":
						_Component = require("DateTime").create(item);
						if (_Component.label) {
							var tdLabel = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getLabelWidth(me,colWidthInit,colWidth)).appendTo(tr);
							self.appendLabel(tdLabel, _Component.label);
						}  
						var tdField = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getFieldWidth(me,item,colWidthInit,colWidth) ).appendTo(tr);
						self.appendFields(tdField, _Component.dateTime.show(),_Component);
						break;
					case "hidden":
						_Component = require("Hidden").create(item);
						me.formLayout.append(_Component.hidden);
						break;
					case "img":
						_Component = require("Img").create(item);
						$("<div></div>").append(_Component.img).addClass(me.configs._clsTd).css("width", colWidth + '%').css(item.cssTd || {}).appendTo(tr);
						break;
					case "label":
						_Component = require("Label").create(item);
						$("<div></div>").append(_Component.label).addClass(me.configs._clsTd).css("width", colWidth + '%').css(item.cssTd || {}).appendTo(tr);
						break;
					case "link":
						_Component = require("Link").create(item);
						$("<div></div>").append(_Component.link).addClass(me.configs._clsTd).css("width", colWidth + '%').css(item.cssTd || {}).appendTo(tr);
						break;
					case "radio":
						_Component = require("Radio").create(item);
						if (_Component.label &&  _Component.configs.showLabelWidth==true) {
							var tdLabel = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getLabelWidth(me,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
						}
						var tdField = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getFieldWidth(me,item,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
						tdField.append(_Component.radio).append(_Component.label);
						break;
					case "radiogroup":
						_Component = require("RadioGroup").create(item);
						if (_Component.label) {
							var tdLabel = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getLabelWidth(me,colWidthInit,colWidth)).css(item.cssTd || {}).appendTo(tr);
							self.appendLabel(tdLabel, _Component.label);
						}
						var tdField = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getFieldWidth(me,item,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
						self.appendFields(tdField, _Component.radioGroup,_Component);
						break;
					case "select":
						_Component = require("Select").create(item);
						if (_Component.label) {
							var tdLabel = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getLabelWidth(me,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
							self.appendLabel(tdLabel, _Component.label);
						}
						var tdField = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getFieldWidth(me,item,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
						self.appendFields(tdField, _Component.select,_Component);
						break;
					case "textarea":
						_Component = require("Textarea").create(item);
						if (_Component.label) {
							var tdLabel = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getLabelWidth(me,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
							self.appendLabel(tdLabel, _Component.label);
						}
						var tdField = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getFieldWidth(me,item,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
						self.appendFields(tdField, _Component.textarea,_Component);
						break;
					case "textfield":
						_Component = require("Textfield").create(item);
						if (_Component.label) {
							var tdLabel = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getLabelWidth(me,colWidthInit,colWidth)).css(item.cssTd || {}).appendTo(tr);
							self.appendLabel(tdLabel, _Component.label);
						}
						var tdField = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getFieldWidth(me,item,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
						if(item.icon){
							self.appendFields(tdField, _Component.textfieldIcon,_Component);
						}else{
							self.appendFields(tdField, _Component.textfield,_Component);
						}
						break;
					case "file":
						 if(item.auto==false)	{//多个文件上传时，最好统一auto属性
							 this.isMultipartContent=true;
							 me.formLayout.attr({"method":"post","enctype":"multipart/form-data"});
						 } 
						_Component = require("File").create(item);
						if (_Component.label) {
							var tdLabel = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getLabelWidth(me,colWidthInit,colWidth)).css(item.cssTd || {}).appendTo(tr);
							self.appendLabel(tdLabel, _Component.label);
						}
						var tdField = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getFieldWidth(me,item,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
						self.appendFields(tdField, _Component.file,_Component);
						break;
					case "user":
						var hiddenCom = require("Hidden").create({
							id:item.id,
							value:(me.configs.record||{})[item.id]
						});
						me._Components.push({
							id: item.id,
							"type": "hidden",
							"_Component": hiddenCom
						});
						item._id=item.id;
						item.id=item.name;
						item=$.extend(true,item,{
							icon:"glyphicon glyphicon-user",
							iconCss:{
								"background-color":"#28B779"
							},
							css:{
								"height":"28px",
								"line-height":"28px",
								"text-align":"center"
							},
							click:function(){
								var id=$(this).attr("id");
								if($(this).attr("readonly")||$(this).attr("disabled"))return;
								var self=me.formLayout.find("#"+id);
								var _id=self.data("_id");
								var selectType=self.data("selectType");
								var name=self.data("name");
								var params={
									id:me.formLayout.find("#"+_id).val(),
									selectType:selectType
								};
								var SysDepartment=require("SysDepartment");
								if(selectType=="checkbox"){
									SysDepartment.showSelect(params,function(records){
										me.formLayout.find("#"+_id).val(Array.getArrayFieldValue(records,"id"));
										me.formLayout.find("#"+name).val(Array.getArrayFieldValue(records,"name"));
									});
								}else{
									SysDepartment.showSelect(params,function(record){
										me.formLayout.find("#"+_id).val(record.id);
										me.formLayout.find("#"+name).val(record.name);
									});
								}
							}
						});
						_Component = require("Textfield").create(item);
						if (_Component.label) {
							var tdLabel = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getLabelWidth(me,colWidthInit,colWidth)).css(item.cssTd || {}).appendTo(tr);
							self.appendLabel(tdLabel, item.label);
						}
						var tdField = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getFieldWidth(me,item,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
						if(item.icon){
							self.appendFields(tdField, _Component.textfieldIcon,_Component);
						}else{
							self.appendFields(tdField, _Component.textfield,_Component);
						}
						tdField.append(hiddenCom.hidden);
						me.formLayout.find("#"+item.id).data({
							 _id:item._id,
							 name:item.name,
							 selectType:item.selectType||"radio"
						 });
						break;
//					case "navbar":
//						if (item.obj) {
//							$("<div></div>").append(item.obj).addClass(me.configs._clsTd).css("width", colWidth + '%').css(item.cssTd || {}).appendTo(tr);
//						} else {
//							_Component = require("Navbar").create(item);
//							$("<div></div>").append(_Component.navbar).addClass(me.configs._clsTd).css("width", colWidth + '%').css(item.cssTd || {}).appendTo(tr);
//						}
//						break;
					case "hr":
							tr.remove();
							var hr=$("<hr>");
							Component.css(hr, item);
							table.append(hr);
						break;
					case "ueditor":
						_Component = $("<div style='width:100%;'></div>").attr("id", item.id).appendTo($("body"));
						window.UEDITOR_CONFIG.initialFrameHeight=item.height||600;
						if(item.autoHeightEnabled)window.UEDITOR_CONFIG.autoHeightEnabled=item.autoHeightEnabled;
						if(item.toolbars)window.UEDITOR_CONFIG.toolbars=item.toolbars;
						if (item.label) {
							var tdLabel = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getLabelWidth(me,colWidthInit,colWidth)).css(item.cssTd || {}).appendTo(tr);
							self.appendLabel(tdLabel,Component.createLabel(item));
						}
						var tdField = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getFieldWidth(me,item,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
						try{
							UE.getEditor(item.id).destroy();
						}catch(e){}
						var ue=UE.getEditor(item.id);
						if(me.configs.record){
							ue.setContent(me.configs.record[item.id], false);
						}
						if(item.keydown){
							var keydown=item.keydown;
							ue.addListener("keydown",function(type,event){
								keydown(event);
							});
						}
						self.appendFields(tdField, _Component,_Component);
						break;
					case "dic":
						_Component = require("CfgDictionary").create(item);
						if (_Component.label) {
							var tdLabel = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getLabelWidth(me,colWidthInit,colWidth)).css(item.cssTd || {}).appendTo(tr);
							self.appendLabel(tdLabel, _Component.label);
						}
						var tdField = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getFieldWidth(me,item,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
						self.appendFields(tdField, _Component.dic,_Component);
						break;
					default:
						continue;
					}
					if(me.configs.record){
						_Component.val(me.configs.record);
					}
					me._Components.push({
						id: item.id,
						"type": item.type,
						"_Component": _Component
					});
				}
				if(tr.html()=="")tr.remove();
			}
		},
		appendLabel: function(td, label) {
			$("<div></div>").addClass(ClassName + "_label").append(label).appendTo(td);
		},
		appendFields: function(td, fields,_Component) {
			var formFields = $("<div></div>").addClass(ClassName + "_field");
			var fieldWidth="100%";
			if(_Component&&_Component.tip&&_Component.configs&&_Component.configs.tipWidth){
				formFields.append(_Component.tip);
				var _tipWidth=_Component.configs.tipWidth.replace("%","");
				fieldWidth=(100-_tipWidth)+"%";
			}
			if ($.type(fields) == "array") {
				var fieldCount = fields.length;
				for (var i = 0; i < fieldCount; i++) {
					formFields.prepend(fields[i].css("width",fieldWidth));
				}
			} else {
				formFields.prepend(fields.css("width",fieldWidth));
			}
			
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
	var FormLayout = function(configs) {
			this.configs = $.extend(true, {}, defaults, configs);
			this.configs._clsTable=ClassName + "_table";
			this.configs._clsTr=ClassName + "_tr";
			this.configs._clsTd=ClassName + "_td";
			this.isMultipartContent=false;//是否包含文件上传控件
			this._Components = [];
			this.configs.beforeRender();
			self.init(this);
			this.configs.afterRender();
		};

	// 类公共方法
	FormLayout.prototype = {
		submit:function(baseUrl,callback,params){
			if (!this.check()) {
				return false;
			}
			if(!params){
				params=this.val();
			}
			var action=baseUrl+(this.configs.action||"save");
			if(this.configs.action){
				var Ajax=require("Ajax");
				this.formLayout.attr({"action":Ajax.getUrl(action,params),"method":"POST"});
				this.formLayout.submit();
			}else if(this.isMultipartContent){
				this.formLayout.attr("action",Session.basePath+action);
				require("JqueryForm");
				this.formLayout.ajaxSubmit({
					async: false, 
					dataType : "json",
					data:params,
			        success: function (rs) {
						callback(rs);
			        }
			    });
			}else{
				var Ajax=require("Ajax");
	 			Ajax.post(action, params,function(rs) { 
	 				callback(rs);
 				});
			}
			return true;
		},
		get: function(selector) {
			return this.formLayout.find(selector)
		},
		focus: function(id) {
			this.get(id).focus();
		},
		//检查函数
		check: function() {
			if(this.configs.beforeCheck()==false) return false;
			for (var i = 0; i < this._Components.length; i++) {
				var item = this._Components[i];
				if (item._Component.check) {
					if (!item._Component.check()) {
						item._Component.focus();
						return false;
					}
				}
			}
			if(this.configs.afterCheck()==false) return false;
			return true;
		},
		getCom: function(id) {
			for(var i=0;i<this._Components.length;i++){
				if(this._Components[i].id==id){
					return this._Components[i]._Component;
				}
			}
		},
		//值获取或赋值函数
		val: function(data) {
			if (data) {
				for (var i = 0; i < this._Components.length; i++) {
					var item = this._Components[i];
					switch (item.type.toLowerCase()) {
					case "checkbox":
					case "checkgroup":
					case "color":
					case "combobox":	
					case "date":
					case "time":
					case "datetime":
					case "hidden":
					case "radio":
					case "radiogroup":
					case "textarea":
					case "textfield":
					case "file":	
					case "select":
					case "dic":
					case "user":
						item._Component.val(data);
						break;
					case "ueditor":
						UE.getEditor(item.id).setContent(data[item.id], false);
						break;
					default:
						continue;
					}
				}
				return this;
			} else {
				var data = {};
				for (var i = 0; i < this._Components.length; i++) {
					var item = this._Components[i];
					switch (item.type.toLowerCase()) {
					case "checkbox":
					case "checkgroup":
					case "color":
					case "combobox":
					case "date":
					case "time":
					case "datetime":
					case "hidden":
					case "radio":
					case "radiogroup":
					case "textarea":
					case "textfield":
						if(item._Component.configs.like){
							if(item._Component.val()!=""){
								data[item.id] = "%"+$.trim(item._Component.val())+"%";
							}else{
								data[item.id] = "";
							}
						}else{
							data[item.id] = item._Component.val();
						}
						break;
					case "file":	
					case "select":
					case "dic":
					case "user":
						data[item.id] = item._Component.val();
						break;
					case "ueditor":
						data[item.id] =UE.getEditor(item.id).getContent();
						break;
					default:
						continue;
					}
				}
				return data;
			}
		},
		//清空函数
		clear: function() {
			for (var i = 0; i < this._Components.length; i++) {
				var item = this._Components[i];
				switch (item.type.toLowerCase()) {
				case "checkbox":
				case "checkgroup":
				case "color":
				case "combobox":
				case "date":
				case "time":
				case "datetime":
				case "hidden":
				case "radio":
				case "radiogroup":
				case "textarea":
				case "textfield":
				case "file":	
				case "select":
				case "dic":
				case "user":
					item._Component.clear();
					break;
				case "ueditor":
					UE.getEditor(item.id).setContent("", false);
					break;
				default:
					continue;
				}
			}
		}
	};
	/** *输出类对象 ** */
	exports.create = function(configs) {
		return new FormLayout(configs);
	};
});