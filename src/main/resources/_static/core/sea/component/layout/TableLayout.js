define(function(require, exports, module) {
	/** * 模块外部依赖 ** */
	var Component = require("Component"); 
	var Array=  require("Array"); 
	/** * 模块私有数据 ** */
	var ClassName = "sea_tableLayout";
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
			"margin": "0 auto",
		    "display": "table"
		},
		isAutoTdWidth:true,
		attr: {},
		cssTr:{},
		attrTd:{},
		attrTdLabel:{},
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
				//			cssTdLabel: "",
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
		init: function(me) {
			me.layout=me.tableLayout = $("<table></table>").addClass(ClassName);
			if (me.configs.parent) {
				if ($.type(me.configs.parent) == "string") {
					me.parent = $(me.configs.parent);
				} else {
					me.parent = me.configs.parent;
				}
				me.parent.append(me.tableLayout);
			}
			Component.addClass(me.tableLayout, me.configs);
			Component.attr(me.tableLayout, me.configs);
			Component.css(me.tableLayout, me.configs);
			if (me.configs.title) {
				$("<tr></tr>").addClass(ClassName + "_title").append("<td><i class='iconfont icon-viewgrid'><i/><span style='margin-left:3px'>"+Global.getI18N(me.configs.title)+"</span></td>").appendTo(me.tableLayout);
			}
			var rowCount = me.configs.items.length;
			for (var rowIndex = 0; rowIndex < rowCount; rowIndex++) {
				var rowItems = me.configs.items[rowIndex];
				var colCount = rowItems.length;
				var tdLabel,tdField;
				var tr = $("<tr></tr>").addClass(rowItems[0].clsTr||"").css($.extend(true,{},me.configs.cssTr,rowItems[0].cssTr||{})).appendTo(me.tableLayout);
				for (var colIndex = 0; colIndex < colCount; colIndex++) {
					var item = rowItems[colIndex];
					if (!item.type) {
						continue;
					}
					var labelWidthPercent=me.configs.labelWidthPercent;
					var _Component;
					if (!item.id || item.id == "") {
						//item.id = Global.getSeq();
					}
					switch (item.type.toLowerCase()) {
					case "div":
						if (item.label) {
							tdLabel = $("<td></td>").css(item.cssTdLabel || {}).attr(item.attrTdLabel||{}).appendTo(tr);
							self.appendLabel(tdLabel, item.label);
						}  
						_Component = $("<td></td>").attr(item.attrTd||{}).css(item.cssTd || {});
						if(item.html){
							_Component.append(item.html||"");
						}else if(me.configs.record){
							_Component.append(me.configs.record[item.id]||"");
						}
						
						Component.addClass(_Component, item);
						Component.css(_Component, item);
						Component.attr(_Component, item);
						_Component.appendTo(tr);
						break;
					case "button":
						_Component = require("Button").create(item);
						$("<td></td>").attr(item.attrTd||{}).append(_Component.button).appendTo(tr);
						break;
					case "buttongroup":
						_Component = require("ButtonGroup").create(item);
						$("<td></td>").attr(item.attrTd||{}).append(_Component.buttonGroup).appendTo(tr);
						break;
					case "checkbox":
						_Component = require("Checkbox").create(item);
						if (_Component.label && _Component.configs.showLabelWidth==true) {
							tdLabel = $("<td></td>").css(item.cssTdLabel || {}).attr(item.attrTdLabel||{}).appendTo(tr);
						}
						tdField = $("<td></td>").attr(item.attrTd||{}).css(item.cssTd || {}).appendTo(tr);
						tdField.append(_Component.checkbox).append(_Component.label);
						break;
					case "checkgroup":
						_Component = require("CheckGroup").create(item);
						if (_Component.label) {
							tdLabel = $("<td></td>").css(item.cssTdLabel || {}).attr(item.attrTdLabel||{}).appendTo(tr);
							self.appendLabel(tdLabel, _Component.label);
						}
						tdField = $("<td></td>").attr(item.attrTd||{}).appendTo(tr);
						self.appendFields(tdField, _Component.checkGroup,_Component);
						break;
					case "color":
						break;
					case "date":
					case "time":
					case "datetime":
						_Component = require("DateTime").create(item);
						if (_Component.label) {
							tdLabel = $("<td></td>").css(item.cssTdLabel || {}).attr(item.attrTdLabel||{}).appendTo(tr);
							self.appendLabel(tdLabel, _Component.label);
						}  
						tdField = $("<td></td>").attr(item.attrTd||{}).appendTo(tr);
						self.appendFields(tdField, _Component.dateTime.show(),_Component);
						break;
					case "hidden":
						_Component = require("Hidden").create(item);
						me.tableLayout.prepend(_Component.hidden);
						break;
					case "img":
						_Component = require("Img").create(item);
						$("<td></td>").attr(item.attrTd||{}).append(_Component.img).css(item.cssTd || {}).appendTo(tr);
						break;
					case "label":
						_Component = require("Label").create(item);
						$("<td></td>").addClass(item.clsTd||"").addClass(ClassName + "_label").attr(item.attrTd||{}).append(item.label).css(item.cssTdLabel || {}).css(item.cssTd || {}).appendTo(tr);
						break;
					case "link":
						_Component = require("Link").create(item);
						$("<td></td>").attr(item.attrTd||{}).append(_Component.link).css(item.cssTd || {}).appendTo(tr);
						break;
					case "radio":
						_Component = require("Radio").create(item);
						if (_Component.label &&  _Component.configs.showLabelWidth==true) {
							tdLabel = $("<td></td>").css(item.cssTdLabel || {}).attr(item.attrTdLabel||{}).appendTo(tr);
						}
						tdField = $("<td></td>").attr(item.attrTd||{}).css(item.cssTd || {}).appendTo(tr);
						tdField.append(_Component.radio).append(_Component.label);
						break;
					case "radiogroup":
						_Component = require("RadioGroup").create(item);
						if (_Component.label) {
							tdLabel = $("<td></td>").css(item.cssTdLabel || {}).attr(item.attrTdLabel||{}).appendTo(tr);
							self.appendLabel(tdLabel, _Component.label);
						}
						tdField = $("<td></td>").attr(item.attrTd||{}).css(item.cssTd || {}).appendTo(tr);
						self.appendFields(tdField, _Component.radioGroup,_Component);
						break;
					case "select":
						_Component = require("Select").create(item);
						if (_Component.label) {
							tdLabel = $("<td></td>").css(item.cssTdLabel || {}).attr(item.attrTdLabel||{}).appendTo(tr);
							self.appendLabel(tdLabel, _Component.label);
						}
						tdField = $("<td></td>").attr(item.attrTd||{}).css(item.cssTd || {}).appendTo(tr);
						self.appendFields(tdField, _Component.select,_Component);
						break;
					case "textarea":
						_Component = require("Textarea").create(item);
						if (_Component.label) {
							tdLabel = $("<td></td>").css(item.cssTdLabel || {}).attr(item.attrTdLabel||{}).appendTo(tr);
							self.appendLabel(tdLabel, _Component.label);
						}
						tdField = $("<td></td>").attr(item.attrTd||{}).css(item.cssTd || {}).appendTo(tr);
						 _Component.textarea.keyup(function() {
							this.style.height = 'auto';
							this.style.height = this.scrollHeight + "px";
						});
//						.each(function () {
//					        this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
//					      }).css({"background-color":"#fff"});
						self.appendFields(tdField, _Component.textarea,_Component);
						break;
					case "textfield":
						_Component = require("Textfield").create(item);
						if (_Component.label) {
							tdLabel = $("<td></td>").css(item.cssTdLabel || {}).attr(item.attrTdLabel||{}).appendTo(tr);
							self.appendLabel(tdLabel, _Component.label);
						}
						tdField = $("<td></td>").attr(item.attrTd||{}).css(item.cssTd || {}).appendTo(tr);
						if(item.icon){
							self.appendFields(tdField, _Component.textfieldIcon,_Component);
						}else{
							self.appendFields(tdField, _Component.textfield,_Component);
						}
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
							width:80,
							icon:"iconfont icon-user2",
							iconCss:{
								"background-color":"#28B779"
							},
							css:{
								"width":"80px",
								"height":"28px",
								"line-height":"28px",
								"text-align":"center"
							},
							click:function(){
								var id=$(this).attr("id");
								if($(this).attr("readonly")||$(this).attr("disabled"))return;
								var self=me.tableLayout.find("#"+id);
								var _id=self.data("_id");
								var selectType=self.data("selectType");
								var name=self.data("name");
								var params={
									id:me.tableLayout.find("#"+_id).val(),
									selectType:selectType
								};
								var SysDepartment=require("SysDepartment");
								if(selectType=="checkbox"){
									SysDepartment.showSelect(params,function(records){
										me.tableLayout.find("#"+_id).val(Array.getArrayFieldValue(records,"id"));
										me.tableLayout.find("#"+name).val(Array.getArrayFieldValue(records,"name"));
									});
								}else{
									SysDepartment.showSelect(params,function(record){
										me.tableLayout.find("#"+_id).val(record.id);
										me.tableLayout.find("#"+name).val(record.name);
									});
								}
							}
						});
						_Component = require("Textfield").create(item);
						if(item.sameTd==true){
							tdField= $("<td></td>").attr(item.attrTd||{}).css(item.cssTd || {}).appendTo(tr);
							$("<div class='sea_tableLayout_label' style='text-align:center;height:20px;line-height:20px;'></div>").append(item.label).appendTo(tdField);
							if(item.icon){
								self.appendFields(tdField, _Component.textfieldIcon,_Component);
							}else{
								self.appendFields(tdField, _Component.textfield,_Component);
							}
						}else{
							if (_Component.label) {
								tdLabel = $("<td></td>").css(item.cssTdLabel || {}).attr(item.attrTdLabel||{}).appendTo(tr);
								self.appendLabel(tdLabel, item.label);
							}
							tdField= $("<td></td>").attr(item.attrTd||{}).css(item.cssTd || {}).appendTo(tr);
							if(item.icon){
								self.appendFields(tdField, _Component.textfieldIcon,_Component);
							}else{
								self.appendFields(tdField, _Component.textfield,_Component);
							}
						}
						tdField.append(hiddenCom.hidden);
						me.tableLayout.find("#"+item.id).data({
							 _id:item._id,
							 name:item.name,
							 selectType:item.selectType||"radio"
						 });
						break;
					case "file":
						_Component = require("File").create(item);
						if (_Component.label) {
							tdLabel = $("<td></td>").css(item.cssTdLabel || {}).attr(item.attrTdLabel||{}).appendTo(tr);
							self.appendLabel(tdLabel, _Component.label);
						}
						tdField = $("<td></td>").attr(item.attrTd||{}).css(item.cssTd || {}).appendTo(tr);
						self.appendFields(tdField, _Component.file,_Component);
						break;
					case "ueditor":
						_Component = $("<div style='width:100%;'></div>").attr("id", item.id).appendTo($("body"));
						window.UEDITOR_CONFIG.initialFrameHeight=item.height||600;
						if(item.autoHeightEnabled)window.UEDITOR_CONFIG.autoHeightEnabled=item.autoHeightEnabled;
						if(item.toolbars)window.UEDITOR_CONFIG.toolbars=item.toolbars;
						if (item.label) {
							tdLabel = $("<td></td>").css(item.cssTdLabel || {}).attr(item.attrTdLabel||{}).appendTo(tr);
							self.appendLabel(tdLabel,Component.createLabel(item));
						}
						tdField = $("<td></td>").attr(item.attrTd||{}).css(item.cssTd || {}).appendTo(tr);
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
							tdLabel = $("<td></td>").css(item.cssTdLabel || {}).attr(item.attrTdLabel||{}).appendTo(tr);
							self.appendLabel(tdLabel, _Component.label);
						}
						tdField = $("<td></td>").attr(item.attrTd||{}).css(item.cssTd || {}).appendTo(tr);
						self.appendFields(tdField, _Component.dic,_Component);
						break;
					default:
						continue;
					}
					if(item.id){
						me._Components.push({
							id: item.id,
							"type": item.type,
							"_Component": _Component
						});
					}
					if(me.configs.record){
						try{
							if(item.id)
							_Component.val(me.configs.record);
						}catch(e){
							continue;
						}
					}
				}
			}
			if(!me.configs.autoTdWidth)me.tableLayout.find("tr").css("display","block");
			setTimeout(function(){
				$("textarea").each(function () {
		          this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
		        });
			},500);
		},
		appendLabel: function(td, label) {
			td.addClass(ClassName + "_label").append(label);
		},
		appendFields: function(td, fields,_Component) {
			td.append(fields);
		}
	}; 
	/** * 类定义 ** */
	var TableLayout = function(configs) {
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
	TableLayout.prototype = {
		submit:function(baseUrl,callback,params){
			if (!this.check()) {
				return false;
			}
			if(!params){
				params=this.val();
			}
			var action=baseUrl+(this.configs.action||"save");
			var Ajax=require("Ajax");
 			Ajax.post(action, params,function(rs) { 
 				callback(rs);
			});
			return true;
		},
		get: function(selector) {
			return this.tableLayout.find(selector);
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
		//值获取或赋值函数
		val: function(data) {
			var item,i;
			if (data) {
				for (i = 0; i < this._Components.length; i++) {
					item = this._Components[i];
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
					case "div":
						item._Component.append(data[item.id]);
						break;
					default:
						continue;
					}
				}
				return this;
			} else {
				var _data = {};
				for (i = 0; i < this._Components.length; i++) {
					item = this._Components[i];
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
						_data[item.id] = item._Component.val();
						break;
					case "ueditor":
						_data[item.id] =UE.getEditor(item.id).getContent();
						break;
					case "div":	
						_data[item.id] = item._Component.html();
						break;
					default:
						continue;
					}
				}
				return _data;
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
		return new TableLayout(configs);
	};
});