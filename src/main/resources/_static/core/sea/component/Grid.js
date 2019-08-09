/**
 * 1.冻结列的width必须指定值，且为数字
 */
define(function(require, exports, module) {
	/** * 模块外部依赖 ** */
	var Lang = require("Lang");
	var String = require("String");
	var Component = require("Component");
	var Ajax = require("Ajax");
	var Dialog = require("Dialog");
	var Array = require("Array");
	/** * 模块私有数据 ** */
	var defaults = {
		parent : null, // 父元素，默认为null
		id : "",
		cls : "",
		css : {},
		attr : {},
		card : "",
		indexColumn : true,
		showColumnSet:false,
		summaryRows:0,//统计记录行数
		pagerMode : "normal", //normal,simple
		pageSize : 100,
		url : "", //url优先
		params : {},
		paramsDelete : {},
		toolbar : {
			baseUrl : "",
			refresh : true,
			add : true,
			"delete" : true,
			"export" : false,
			"copy" : false,
			onAdd : function() {},
			onEdit : function(record, selected) {},
			onView : function(record, selected) {},
			onDelete : function(record, selected) {
				return true;
			},
			onExport : function(records, selected) {
				return true;
			},
			onCopy : function(records, selected) {
				return true;
			},
			afterLoad : function() {
				return true;
			},
			afterDelete : null,
			items : [] //其他工具栏按钮
		},
		loadSuccess : function() {}
	};
	/** * 模块私有方法 ** */
	var self = {
		html : function() {
			var html = [];
			html.push('<div class="sea_grid">');
			html.push('<div class="sea_grid_title"></div>');
			html.push('<div class="sea_grid_toolbar"></div>');
			html.push('<div class="sea_grid_forzen">');
			//1 head start
			html.push('<div class="sea_grid_head">');
			html.push('<table cellspacing="0" cellpadding="0"><tr class="sea_grid_tr"></tr></table>');
			html.push("</div>");
			//1head end
			//1body start
			html.push('<div class="sea_grid_body">');
			html.push("<div class='sea_grid_scroll_y'>");
			html.push('<table cellspacing="0" cellpadding="0"></table>');
			html.push("</div>");
			html.push("</div>");
			//summary
			html.push('<div style="display:none" class="sea_grid_summary">');
			html.push('<table cellspacing="0" cellpadding="0"><tr class="sea_grid_tr"></table>');
			html.push("</div>") ;
			html.push('</div>');
			//1body end
			html.push('<div class="sea_grid_normal">');
			//2head start
			html.push('<div class="sea_grid_head">');
			html.push('<div class="sea_grid_scroll_x">');
			html.push('<table cellspacing="0" cellpadding="0"><tr class="sea_grid_tr"></table>');
			html.push("</div>") ;
			html.push("</div>") ;
			//2head end
			//2body start
			html.push('<div class="sea_grid_body">');
			html.push('<table cellspacing="0" cellpadding="0"></table>');
			html.push("</div>");
			//summary
			html.push('<div style="display:none" class="sea_grid_summary">');
			html.push('<div class="sea_grid_scroll_x">');
			html.push('<table cellspacing="0" cellpadding="0"><tr class="sea_grid_tr"></table>');
			html.push("</div>") ;
			html.push("</div>") ;
			html.push('</div>');
			//2body end
			html.push('<div class="sea_grid_pager"></div>');
			html.push('<div class="sea_grid_mask"></div><div class="sea_grid_mask_loading"></div>');
			html.push('</div>');
			return html.join("");
		},
		load : function(me, params) {
			var _params = params || me.configs.params;
			//分页参数
			if (me.configs.pageSize > 0) {
				if (!_params.pageSize)
					_params.pageSize = me.configs.pageSize;
				if (!_params.pageIndex)
					_params.pageIndex = me.configs.pageIndex || 1;
			}
			if (me.configs.url) {
				Ajax.post(me.configs.url, _params, function(result) {
					if (result.success) {
						me.configs.records = result.data;
						me.rowCount = result.rowcount;
					}
					self.render(me);
					self.pager(me, _params);
					if (me.configs.loadSuccess) {
						me.configs.loadSuccess(result);
					}
					if (me.configs.loadError) {
						me.configs.loadError(result);
					}
				}, true);
			} else {
				me.rowCount = me.configs.records.length;
				if(me.configs.pageSize>0)
					me.configs.records =me.configs.records.slice((_params.pageIndex - 1) * me.configs.pageSize, _params.pageIndex * me.configs.pageSize);
				self.render(me);
				self.pager(me, _params);
			}
		},
		getCell : function(record, column, isHead, rowIndex) {
			if (isHead) {
				if (column.format && column.format == "checkbox") {
					if (column.click)
						return "<input  type='checkbox' hasClick='true' id='" + column["id"] + "'/>";
					return "<input  type='checkbox' id='" + column["id"] + "'/>"; //<label class='sea_checkLabel' for='"+column["id"]+"'>"+(Global.getI18N(column["label"])||"")+"</label>
				} else {
					return Global.getI18N(column["label"]||"");
				}
			} else {
				var id = column["_id"]; //SysUser.js
				if (!id) {
					id = column["id"];
				}
				var columnNameArr = id.split("."); //兼容关联对象
				if (columnNameArr.length == 1) {
					val = record[columnNameArr[0]];
				} else {
					var relativeObj = record[columnNameArr[0]];
					if (relativeObj) {
						val = relativeObj[columnNameArr[1]];
					} else {
						val = "";
					}
				}
				if (val == undefined || val == null) {
					val = "";
				}
				var cell = {
					value : val,
					title : val
				};
				if (column.format) {
					if ($.type(column.format) == "string") {
						cell.title = "";
						if (column.format.toLowerCase() == "checkbox") {
							if (column.click) {
								var checkbox;
								if (record["_" + column["id"]] && record["_" + column["id"]] == val) {
									checkbox = $("<input type='checkbox' class='" + column["id"] + "' value='" + val + "' checked/>");
								} else {
									checkbox = $("<input type='checkbox' class='" + column["id"] + "' value='" + val + "'/>");
								}
								checkbox.click(function(e) {
									column.click(e.target, e);
								});
								cell.value = checkbox;
							} else {
								cell.value = "<input type='checkbox' class='" + column["id"] + "' value='" + val + "'/>";
							}
						} else if (column.format.toLowerCase() == "radio") {
							cell.value = "<input type='radio' class='" + column["id"] + "' value='" + val + "'/>"
						} else if (column.format.toLowerCase() == "textfield") {
							var Textfield=require("Textfield");
							var configs=$.extend(true,{},column);
							configs.width="99%";
							var textfield=Textfield.create(configs);
							if(column.limit){
								textfield.textfield.blur(function(){
									return textfield.check();
								});
							}
							if(column.align)textfield.textfield.css({"text-align":column.align});
							cell.value = textfield.textfield.addClass(column["id"]).val(val);
						} else if (column.format.toLowerCase() == "select") {
							var Select=require("Select");
							var configs=$.extend(true,{},column);
							configs.width="99%";
							var select=Select.create(configs);
							if(column.limit){
								select.select.blur(function(){
									return select.check();
								});
							}
							if(column.align)select.select.css({"text-align":column.align});
							cell.value = select.select.addClass(column["id"]).val(val);
						} else if (column.format.toLowerCase() == "dic") {
							var CfgDictionary=require("CfgDictionary");
							var configs=$.extend(true,{},column);
							configs.width="99%";
							var cfgDictionary=CfgDictionary.create(configs);
							if(column.limit){
								cfgDictionary.dic.blur(function(){
									return cfgDictionary.check();
								});
							}
							cell.value = cfgDictionary.dic.addClass(column["id"]).val(val);
						} else if (column.format.toLowerCase() == "buttongroup") {
							cell.value = require("ButtonGroup").create(column).buttonGroup;
						} else if (column.format.toLowerCase() == "link") {
							cell.value = "<a href='" + column.link + "''><span class='" + column.imgCls + "'></span>" + val + "</a>";
						} else if (column.format.toLowerCase() == "buttons") {
							var div=$("<span></span>")
							for(var i=0;i<column.items.length;i++){
								var item=column.items[i];
								div.append("&nbsp;&nbsp;&nbsp;").append($("<a href='#'>" + item.value + "</a>").prepend("<span class='" + item.icon + "'></span>").bind("click",{index:i},function(event){
									var idx= event.data.index;
									column.items[idx].click(record);
								}));
							}
							cell.value = div;
						} else if (column.format.toLowerCase() == "yyyy-mm-dd hh:mm:ss" ||column.format.toLowerCase() == "timestamp" || column.format.toLowerCase() == "datetime") {
							if(!String.isBlank(val)){
								var Date = require("Date");
								cell.value = Date.getNow(val);
								cell.title = cell.value;
							}
						} else if (column.format.toLowerCase() == "href") {
							cell.value = "<a target=_blank href='" + val + "''>" + val + "</a>";
						}
					} else if ($.type(column.format) == "function") {
						cell.value = column.format(val, record, rowIndex);
						cell.title = String.delTag(cell.value);
					} else if ($.type(column.format) == "object") {
						cell.value = column.format[val];
						cell.title = cell.value
					}
				} else if (column.type) {
					if (column.type == "user") {
						cell.value = record[column.name];
						cell.title = cell.value;
					}else if (column.type == "dicColumn") {
						cell.value = Global.DicJson(column.params["app"], column.params["type"], column.params["subType"],true,Session.langue)[val];
						cell.title = cell.value;
					}else if (column.type == "dic") {
						cell.value = Global.DicJson(column.params["app"], column.params["type"], column.params["subType"],true,Session.langue)[val];
						cell.title = cell.value;
					}else if (column.type == "file") {
						cell.title = "";
						var val=cell.value;
						cell.value="";
						if(!String.isBlank(val)){
							var path=val.split(",");
							$.each(path,function(index,item){
								var url=item;
								if(String.isBlank(url))return true;
								if(!String.isUrl(url)){
									url=Session.basePath+url;
									var fileName=Ajax.getUrlParam(url,"attname");
									cell.value+="<a style='color:blue'target=_blank href='"+url+"' download='"+(fileName||column.label)+"'>"+fileName+"</a>&nbsp;";
								}else{
									var fileName=Ajax.getUrlParam(url,"attname");
									cell.value+="<a style='color:blue'target=_blank href='"+url+"' download='"+(fileName||column.label)+"'>"+fileName+"</a>&nbsp;";
								}
							});
						}
					}	
				}
				return cell;
			}
		},
		getRow : function(me, el) {
			var index = el.rowIndex;
			return me.grid.find(".sea_grid_forzen .sea_grid_body table tr:eq(" + index + "),.sea_grid_normal  .sea_grid_body table tr:eq(" + index + ")");
		},
		bindEvent : function(me) {
			me.grid.find(".sea_grid_body table tr").hover(function() {
				self.getRow(me, this).addClass("sea_grid_hover") ;
			}, function() {
				self.getRow(me, this).removeClass("sea_grid_hover") ;
			}) ;
			me.grid.find(".sea_grid_normal>.sea_grid_body").scroll(function() {
				me.grid.find(".sea_grid_forzen>.sea_grid_body").scrollTop($(this).scrollTop()) ;
				me.grid.find(".sea_grid_normal>.sea_grid_head").scrollLeft($(this).scrollLeft()) ;
			});
			if(me.configs.summaryRows>0){
				me.grid.find(".sea_grid_normal>.sea_grid_summary").scroll(function() {
					me.grid.find(".sea_grid_normal>.sea_grid_head").scrollLeft($(this).scrollLeft()) ;
					me.grid.find(".sea_grid_normal>.sea_grid_body").scrollLeft($(this).scrollLeft()) ;
				});
			}
			me.grid.find(".sea_grid_head").delegate("input[type=checkbox]", "click", function() {
				var selector = ".sea_grid_body" + " ." + $(this).attr("id");
				var hasClick = $(this).attr("hasClick");
				if (hasClick) {
					if ($(this).is(':checked') == true) {
						me.grid.find(selector).not("input:checked").click();
					} else {
						me.grid.find(selector + ":checked").click();
					}
				}
				me.grid.find(selector).prop("checked", $(this).is(':checked'));
				if (me.configs.onCheckAll) me.configs.onCheckAll(this);
			});
			me.grid.delegate(".sea_grid_body input[type=radio]", 'click', function() {
				var selector = ".sea_grid_body" + " ." + $(this).attr("class");
				var selected = $(this).is(':checked');
				me.grid.find(selector).not(this).prop("checked", !selected);
				if (me.configs.onCheckAll) me.configs.onCheckAll(this);
			});
			me.grid.delegate(".sea_grid_body input[type=radio]", 'dblclick', function() {
				var selector = ".sea_grid_body" + " ." + $(this).attr("class");
				me.grid.find(selector).prop("checked", false);
			});
			if (me.configs.rowDblClick) {
				me.grid.delegate(".sea_grid_body tr", 'dblclick', function() {
					me.configs.rowDblClick(me.configs.records[this.rowIndex], this);
				}) ;
			}
			if (me.configs.rowClick) {
				me.grid.delegate(".sea_grid_body tr", 'click', function() {
					if(me.configs.rowClick(me.configs.records[this.rowIndex], this)==true){
						self.getRow(me, this).addClass("sea_grid_rowselected").siblings().removeClass("sea_grid_rowselected");	
					}
				}) ;
			}
			me.grid.find(".sort").unbind("click").click(function(){
				var a=$(this);
				a.parent().siblings().find(".sort-icon").removeClass("sort-asc").removeClass("sort-desc").removeClass("sort-none").addClass("sort-none");
				var field=a.attr("field");
				var sortType="";
				var sortIcon=a.find(".sort-icon");
				if(sortIcon.hasClass("sort-none")){
					sortIcon.removeClass("sort-none").addClass("sort-asc");
					sortType="asc";
				}else if(sortIcon.hasClass("sort-asc")){
					sortIcon.removeClass("sort-asc").addClass("sort-desc");
					sortType="desc";
				}else if(sortIcon.hasClass("sort-desc")){
					sortIcon.removeClass("sort-desc").addClass("sort-none");
					sortType="";
				}
				var url=me.configs.url;
				me.configs.url=null;
				if(sortType==""){
					self.load(me);
				}else{
					var records=me.configs.records;
					if(me.configs.summaryRows>0){
						var len=records.length;
						var lastRecord=records[len-1];
						var _records=records.slice(0,len-1);
						//排序_records
						_record=Array.sort(_records,field,sortType);
						_records.push(lastRecord);
						me.configs.records=_records;
					}
					self.load(me);
					me.configs.records=records;
				}
				me.configs.url=url;
			});
		},
		render : function(me) { //渲染主体
			me.grid_forzen_body.empty();
			me.grid_normal_body.empty();
			if(me.grid_normal_summary){
				me.grid_normal_summary.empty();
				me.grid_forzen_summary.empty();
			}
			var len = 0;
			if (me.configs.records) {
				len = me.configs.records.length-me.configs.summaryRows
			}
			var columnForzenCount = me.columnsForzen.length;
			var columnNormalCount = me.columnsNormal.length;
			for (var i = 0; i < len; i++) {
				var record = me.configs.records[i];
				var row_forzen = $("<tr class='sea_grid_tr'></tr>").appendTo(me.grid_forzen_body);
				for (var j = 0; j < columnForzenCount; j++) {
					var column = me.columnsForzen[j];
					if(column.hide&&column.hide===true)continue;
					if (column["id"] == "_index") {
						row_forzen.append("<td class='sea_grid_td center'" + Component.getStyle(column,true) + " title='" + (i + 1) + "'>" + (i + 1) + "</td>");
					} else {
						var cell = self.getCell(record, column, false, i);
						self.getTd(me, record, column, cell).appendTo(row_forzen);
					}
				}
				var row_normal = $("<tr class='sea_grid_tr'></tr>").appendTo(me.grid_normal_body).data("id", record["id"]);
				for (var j = 0; j < columnNormalCount; j++) {
					var column = me.columnsNormal[j];
					if(column.hide&&column.hide===true)continue;
					var cell = self.getCell(record, column, false, i);
					self.getTd(me, record, column, cell).appendTo(row_normal);
				}
			}
			//统计记录
			if(len>=0){
				for(var i=len;i<(len+me.configs.summaryRows);i++){
					var record = me.configs.records[i];
					var row_forzen = $("<tr class='sea_grid_tr'></tr>").appendTo(me.grid_forzen_summary);
					row_forzen.append("<td colspan="+(columnForzenCount-1)+" class='sea_grid_td center'" + Component.getStyle(column,true) + ">合计</td>");
					var row_normal = $("<tr class='sea_grid_tr'></tr>").appendTo(me.grid_normal_summary).data("id", record["id"]);
					for (var j = 0; j < columnNormalCount; j++) {
						var _column = me.columnsNormal[j];
						var column=$.extend(true,{},_column);
						if(column.hide&&column.hide===true)continue;
						delete column.format;
						var cell = self.getCell(record, column, false, i);
						var td=self.getTd(me, record, column, cell).appendTo(row_normal);
						td.find("input").attr("readonly","readonly").css({"border":"0","cursor":"default"});
					}
				}
			}
			me.grid.find(".sea_grid_head table").find(" input[type=checkbox]").prop("checked", false);
			self.bindEvent(me);
			me.resize();
			me.setMask(false);
		},
		getTd : function(me, record, column, cell) {
			var td = $("<td class='sea_grid_td'" + Component.getStyle(column,true) + " title='" + cell.title + "'></td>");
			if (column.buttons) {
				if (Array.getIndex(column.buttons, "view") >= 0) {
					td.append(self.getViewLink(me, record, ""))//Lang.view
				}
				if (Array.getIndex(column.buttons, "edit") >= 0) {
					td.append(self.getEditLink(me, record, ""));//Lang.edit
				}
				if (Array.getIndex(column.buttons, "delete") >= 0) {
					td.append(self.getDeleteLink(me, record, ""));//Lang["delete"]
				}
			} 
			td.append(cell.value);
			return td;
		},
		pager : function(me, _params) {
			if (me.configs.pageSize > 0) {
				me.grid.find(".sea_pager").remove();
				var pager = require("Pager").create({
					pageNav : me.configs.pageNav || 5,
					pageSize : _params.pageSize,
					pageIndex : _params.pageIndex,
					pagerMode : me.configs.pagerMode,
					rowCount : me.rowCount,
					select : function(pageIndex, pageSize) {
						me.configs.params.pageIndex = pageIndex;
						me.configs.params.pageSize = pageSize || me.configs.pageSize;
						me.reload(me.configs.params) ;
						return me.rowCount;
					}
				});
				me.grid.find(".sea_grid_pager").empty().append(pager.pager);
			} else {
				me.grid.find(".sea_grid_pager").remove();
			}
		},
		toolbar : function(me) { //创建工具栏
			me.toolbar = me.grid.find(".sea_grid_toolbar");
			if (!me.configs.toolbar.hide){
				if (me.configs.toolbar.copy) {
					me.configs.toolbar.items.unshift({
						icon : "glyphicon glyphicon-credit-card",
						id:"tb_copy",
						value : Lang.copy,
						click : function() {
							var selected = me.getSelected();
							if (selected.length === 0) {
								Dialog.alert(Lang.select);
								return false;
							} else {
								var records = me.getSelectedRecord();
								if (me.configs.toolbar.onCopy(records, selected)) {
									Ajax.post(me.configs.toolbar.baseUrl + "copy", {
										"id" : selected
									}, function(rs) {
										Dialog.alert(rs.msg);
									});
								}
								me.reload();
								return true;
							}
							return false;
						}
					});
				}
				if (me.configs.toolbar["export"]) {
					me.configs.toolbar.items.unshift({
						icon : "glyphicon glyphicon-floppy-disk",
						id:"tb_export",
						value : Lang["export"],
						click : function() {
							var listTitle = [];
							for (var i = 0; i < me.configs.columns.length; i++) {
								var column = me.configs.columns[i];
								if (column["id"] == "id"||column["id"] == "_op"||column["id"] == "_index") continue;
								if(column.hide)continue;
								var _column = {};
								_column["id"] = column["id"];
								_column["label"] = Global.getI18N(column["label"]);
								_column["align"] = column["align"];
								_column["width"] = column["width"];
								_column["forzen"] = column["forzen"];
								listTitle.push(_column);
							}
							if(me.getSelected().length==0){
								me.selectAll();
							}
							var params = {
								sheetName : "Sheet1",
								listTitle : JSON.stringify(listTitle),
								listData : JSON.stringify(me.getExportData()) //一条一条查，效率慢，待优化
							};
							
							Ajax.post("export/excel", params, function(rs) {
								window.location.href = Session.basePath+rs.msg;
							});
							return false;
						}
					});
				}
				if (me.configs.toolbar["delete"]) {
					me.configs.toolbar.items.unshift({
						icon : "glyphicon glyphicon-minus",
						id:"tb_delete",
						value : Lang["delete"],
						click : function() {
							var selected = me.getSelected();
							if (selected.length === 0) {
								Dialog.alert(Lang.select);
								return false;
							} else {
								if (me.configs.toolbar.onDelete(me.getRecord(selected[0]),selected)) {
									Dialog.confirm({
										content : Lang.ifDel,
										confirmValue : Lang.confirm,
										confirm : function() {
											var params = $.extend(true, {}, {
												"id" : selected
											}, me.configs.paramsDelete);
											Ajax.post(me.configs.toolbar.baseUrl + "delete", params, function(rs) {
												Dialog.alert(rs.msg);
											});
											if (me.configs.toolbar.afterDelete) {
												me.configs.toolbar.afterDelete();
											} else {
												me.reload();
											}
											return true;
										}
									});
								}
							}
							return false;
						}
					});
				}
				if (me.configs.toolbar.add) {
					me.configs.toolbar.items.unshift({
						icon : "glyphicon glyphicon-plus",
						id:"tb_add",
						value : Lang.add,
						click : function() {
							me.configs.toolbar.onAdd();
							return false;
						}
					});
				}
				if (me.configs.toolbar.refresh) {
					me.configs.toolbar.items.unshift({
						icon : "glyphicon glyphicon-refresh",
						id:"tb_refresh",
						value : Lang.refresh,
						click : function() {
							me.reload();
							return false;
						}
					});
				}
				var tb = require("Toolbar").create(me.configs.toolbar);
				me.toolbar.append(tb.toolbar);
			} else {
				me.toolbar.remove();
				if (me.title) {
					me.grid.find(".sea_grid_forzen").css("top", "35px");
					me.grid.find(".sea_grid_normal").css("top", "35px");
				} else {
					me.grid.find(".sea_grid_forzen").css("top", 0);
					me.grid.find(".sea_grid_normal").css("top", 0);
				}
			}
		},
		getViewLink : function(me, record, cellValue) {
			var a = $("<a style='padding:0 5px;'><i class='glyphicon glyphicon-eye-open'></i>" + cellValue + "</a>").click(function() {
				me.configs.toolbar.onView(me.getViewData(record), [ record["id"] ]);
			});
			return a;
		},
		getEditLink : function(me, record, cellValue) {
			var a = $("<a style='padding:0 5px;'><i class='glyphicon glyphicon-pencil'></i>" + cellValue + "</a>").click(function() {
				me.configs.toolbar.onEdit(record, [ record["id"] ]);
			});
			return a;
		},
		getDeleteLink : function(me, record, cellValue) {
			var selected = me.getSelected();
			var a = $("<a style='padding:0 5px;'><i class='glyphicon glyphicon-remove'></i>" + cellValue + "</a>").click(function() {
				if (me.configs.toolbar.onDelete(record,selected)) {
					Dialog.confirm({
						content : Lang.ifDel,
						confirmValue : Lang.confirm,
						confirm : function() {
							var params = $.extend(true, {}, {
								"id" : [ record["id"] ]
							}, me.configs.paramsDelete);
							Ajax.post(me.configs.toolbar.baseUrl + "delete", params, function(rs) {
								Dialog.alert(rs.msg);
							});
							if (me.configs.toolbar.afterDelete) {
								me.configs.toolbar.afterDelete();
							} else {
								me.reload();
							}
							return true;
						}
					});
				}
			});
			return a;
		},
		getColumnsSet:function(me){
			var ul=$("<ul class='sea_grid_columnset' style='padding:5px;background-color:#f6f6f6;z-index:999;position:fixed;width:50%;border:1px solid #eaeaea;float:left;'></ul>");
			var len=me.columnsForzen.length;
			for(var i=0;i<len;i++){
				var item=me.columnsForzen[i];
				if(!item.label)continue;
				if(item.id=="_index")continue;
				var li=$("<li style='float:left;padding:0 3px;'></li>").appendTo(ul);
				var check=$("<input type='checkbox' checked id='"+item.id+"' colIndex="+i+">"+item.label+"</li>").bind("click",{index:i},function(event){
					var idx= event.data.index+1;
					//冻结表
					if(me.grid_forzen_head.find("tr td:nth-child("+idx+")").css("display")=="none"){
						me.columnsForzen[idx-1].display="";
					}else{
						me.columnsForzen[idx-1].display="none";
					}
					me.grid_forzen_head.find("tr td:nth-child("+idx+")").toggle();
					me.grid_forzen_body.find("tr td:nth-child("+idx+")").toggle();
				}).appendTo(li);
			}
			var len=me.columnsNormal.length;
			for(var i=0;i<len;i++){
				var item=me.columnsNormal[i];
				if(!item.label)continue;
				var li=$("<li style='float:left;'></li>").appendTo(ul);
				var check=$("<input type='checkbox' checked id='"+item.id+"' colIndex="+i+">"+item.label+"</li>").bind("click",{index:i},function(event){
					var idx= event.data.index+1;
					//非冻结表
					if(me.grid_normal_head.find("tr td:nth-child("+idx+")").css("display")=="none"){
						me.columnsNormal[idx-1].display="";
					}else{
						me.columnsNormal[idx-1].display="none";
					}
					me.grid_normal_head.find("tr td:nth-child("+idx+")").toggle();
					me.grid_normal_body.find("tr td:nth-child("+idx+")").toggle();
				}).appendTo(li);
			}
			return ul;
		}
	};
	/** * 类定义 ** */
	var Grid = function(configs) {
		// 类的属性定义
		this.configs = $.extend(true, {}, defaults, configs);
		if (String.endsWith(this.configs.url, "/")) {
			if (!this.configs.toolbar.baseUrl){
				this.configs.toolbar.baseUrl = this.configs.url;
			}
			this.configs.url = this.configs.url + "list";
		} else {
			if (this.configs.toolbar && !this.configs.toolbar.baseUrl)
				this.configs.toolbar.baseUrl = this.configs.url.substr(0, this.configs.url.indexOf("/") + 1);
		}
		this.rowCount = 0; //总记录数
		this.grid = $(self.html());
		// 控件类名设置
		Component.addClass(this.grid, this.configs);
		// 控件样式设置
		Component.css(this.grid, this.configs);
		if (this.configs.parent) {
			if ($.type(this.configs.parent) == "string") {
				this.parent = $(this.configs.parent);
			} else {
				this.parent = this.configs.parent;
			}
			this.parent.append(this.grid);
		}
		// 初始化
		//标题
		if (this.configs.title) {
			this.title = this.grid.find(".sea_grid_title").html("<i class='glyphicon glyphicon-th'><i/><span style='margin-left:3px'>" + Global.getI18N(this.configs.title) + "</span>");
			this.grid.find(".sea_grid_toolbar").css("top", "35px");
			this.grid.find(".sea_grid_forzen").css("top", "71px");
			this.grid.find(".sea_grid_normal").css("top", "71px");
		} else {
			this.grid.find(".sea_grid_title").remove();
		}
		//工具栏
		self.toolbar(this);
		if(this.configs.title && !this.configs.toolbar.hide){
			this.toolbar.css("border-top","1px solid rgb(213, 213, 213)");
			this.title.css("border-bottom","1px solid #999");
		}
		//冻结表
		this.grid_forzen_head = this.grid.find(".sea_grid_forzen>.sea_grid_head table");
		this.grid_forzen_body = this.grid.find(".sea_grid_forzen>.sea_grid_body table");
		
		//非冻结表
		this.grid_normal_head = this.grid.find(".sea_grid_normal>.sea_grid_head table");
		this.grid_normal_body = this.grid.find(".sea_grid_normal>.sea_grid_body table");
		if(this.configs.summaryRows>0){
			this.grid.find(".sea_grid_forzen>.sea_grid_summary").show();
			this.grid_forzen_summary = this.grid.find(".sea_grid_forzen>.sea_grid_summary table");
//			this.grid_normal_body.wrap('<div class="sea_grid_scroll_x"></div>');
			this.grid.find(".sea_grid_normal>.sea_grid_summary").show();
			this.grid_normal_summary= this.grid.find(".sea_grid_normal>.sea_grid_summary table");
			this.grid.find(".sea_grid_normal>.sea_grid_body").css("overflow-x","hidden");
		}
		//加载进度信息
		this.mask = this.grid.find(".sea_grid_mask");
		this.mask_loading = this.grid.find(".sea_grid_mask_loading");

		this.columnsForzen = []; //冻结列
		this.columnsNormal = []; //非冻结列
		var columnCount = this.configs.columns.length;
		if (this.configs.indexColumn) {
			this.columnsForzen.push({
				id : "_index",
				width : 30,
				label : "<span id='_columnset' class='glyphicon' style='color:#999;cursor:pointer;'></span>"
			});
		}
		for (var i = 0; i < columnCount; i++) {
			var column = this.configs.columns[i];
			if (column["forzen"]) {
				this.columnsForzen.push(column);
			} else {
				this.columnsNormal.push(column);
			}
		}
		//创建冻结表表头
		this.columnForzenWidth = 0; //冻结表总宽度
		var columnForzenCount = this.columnsForzen.length;
		var grid_forzen_head_tr = this.grid_forzen_head.find("tr");
		for (var i = 0; i < columnForzenCount; i++) {
			var column = this.columnsForzen[i];
			if(column.hide&&column.hide===true)continue;
			column["width"] = Component.getNumber(column.width, 90);
			this.columnForzenWidth += column["width"];
			grid_forzen_head_tr.append("<td class='sea_grid_th'" + Component.getStyle(column,true) + ">" + self.getCell([], column, true) + "</td>");
		}
		this.grid_forzen_head.width(this.columnForzenWidth);
		this.grid_forzen_body.width(this.columnForzenWidth);
		this.grid_forzen_summary&&this.grid_forzen_summary.width(this.columnForzenWidth);
		this.grid.find(".sea_grid_normal").css("left", Component.getSize(this.columnForzenWidth));
		//创建非冻结表表头
		var columnsNormalCount = this.columnsNormal.length;
		var grid_normal_head_tr = this.grid_normal_head.find("tr");
		for (var i = 0; i < columnsNormalCount; i++) {
			var column = this.columnsNormal[i];
			if(column.hide&&column.hide===true)continue;
			if (!column.width)
				column["width"] = 90;
			if(column.sort){
				grid_normal_head_tr.append("<td class='sea_grid_th'" + Component.getStyle(column,true) + "><a class='sort' field='"+column.id+"' href='#'><span style='vertical-align: middle;display: inline-block;'>" + self.getCell([], column, true) + "</span><span class='sort-icon sort-none'>&nbsp;</span></a> </td>");
			}else{
				grid_normal_head_tr.append("<td class='sea_grid_th'" + Component.getStyle(column,true) + ">" + self.getCell([], column, true) + "</td>");
			}
		}
		self.load(this);
		var me = this;
		$(window).resize(function() {
			me.resize(me);
		});
		if(this.configs.showColumnSet){
			$("#_columnset",this.grid).addClass("glyphicon-th").click(function(){
				$("#_columnset",this.grid).toggleClass("glyphicon-th-list","glyphicon-th");
				if($(".sea_grid_columnset").length>0){
					$(".sea_grid_columnset").toggle();
					return false;
				}
				var ul=self.getColumnsSet(me).appendTo($("body")).css({
					"left":0,
					"bottom":$(this).offset().top+20
				});
				return false;
			});
		}
	};
	// 类公共方法
	Grid.prototype = {
		print:function(){
			var formEdit=$("#formEdit");
	    		$("body").empty().css({"overflow":"auto"}).append(formEdit).find(".glyphicon,input[type=button]").hide();
            if (document.execCommand("print")) {
            		window.location.reload();
            }
		},
		clear : function() {
			this.grid_forzen_body.empty();
			this.grid_normal_body.empty();
			this.grid.find(".sea_grid_head table").find(" input[type=checkbox]").prop("checked", false);
		},
		disabled : function(flag) {
			if (flag) {
				this.mask.show();
			} else {
				this.mask.hide();
			}
		},
		setMask : function(isShow) {
			if (isShow) {
				this.mask.show();
				this.mask_loading.show()
			} else {
				this.mask.hide();
				this.mask_loading.hide();
			}
		},
		reload : function(params) {
			this.configs.params = $.extend(true, {}, this.configs.params, params);
			self.load(this, params);
		},
		getSelected : function(id) {
			var rs = [];
			id = id || "id";
			var  idsJq=this.grid.find("." + id + ":checked")
			$.each(idsJq, function(index, item) {
				rs.push($(item).val());
			});
			return rs;
		},
		setSelected : function(ids, id) {
			id = id || "id";
			if($.type(ids)!="array"){
				ids=[ids];
			}
			if(!id||id=="id"){
				id ="id";
				$.each(this.grid.find("." + id), function(index, item) {
					if (Array.getIndex(ids, $(item).val()) >= 0) {
						$(item).prop("checked", true);
					}
				});
			}else{
				var me=this;
				$.each(this.grid.find(".id"), function(index, item) {
					var idValue=$(item).val();
					var record=me.getRecord(idValue);
					if (Array.getIndex(ids,record[id]) >= 0) {
						$(item).prop("checked", true);
					}
				});
			}
		},
		selectAll : function(id) {
			id = id || "id";
			this.grid.find("." + id).prop("checked", true)
		},
		getSelectedData : function(id) { //获取html的值
			var me = this;
			var records = [];
			var ids = this.getSelected(id);
			$.each(ids, function(index, id) {
				Ajax.post(me.configs.toolbar.baseUrl + "get", {
					"id" : [ id ]
				}, function(rs) {
					if (rs.success === true) {
						var record = rs.data;
						$.each(me.configs.columns, function(index, column) {
							if (column.format || column.type) {
								var cell = self.getCell(record, column, false);
								record[column["id"]] = cell.value;
							}
						});
						records.push(record);
					}
				});
			});
			return records;
		},
		getExportData : function(id) { //获取html的值
			var records = [];
			var me = this;
			var ids = me.getSelected();
			for(var i=0;i<me.configs.records.length;i++){
				var record=$.extend(true, {}, me.configs.records[i]);
				if(Array.getIndex(ids,record.id)>=0){
					$.each(me.configs.columns, function(index, column) {
						if (column["id"] == "id") return true;
						if (column["id"] == "_op") return true;
						if (column.format || column.type) {
							var cell = self.getCell(record, column, false);
							record[column["id"]] = String.delTag(cell.value);
						}
					});
					records.push(record);
				}
			} 
			return records;
		},
		getViewData : function(record) {
			var me = this;
			var rs = $.extend(true, {}, record);
			$.each(me.configs.columns, function(index, column) {
				if (column["id"] == "id") return true;
				if (column.format || column.type) {
					if(column.type=="file"){
						rs[column["id"]] = record[column["id"]];
					}else{
						var cell = self.getCell(record, column, false);
						rs[column["id"]] = cell.value;
					}
				}
			});
			return rs;
		},
		getRecord:function(idValue,id){
			id = id || "id";
			var len=this.configs.records.length;
			for(var i=0;i<len;i++){
				var record=this.configs.records[i];
				if(record[id]==idValue)return record
			}
			return {};
		},
		setRecord:function(idValue,_record){
			var id = "id";
			var len=this.configs.records.length;
			for(var i=0;i<len;i++){
				var record=this.configs.records[i];
				if(record[id]==idValue)this.configs.records[i]=_record;
			}
		},
		getRecords:function(){
			return this.configs.records;
		},
		getSelectedRecord : function(id) { //获取记录的值
			var me = this;
			var records = [];
			var ids = this.getSelected(id);
			$.each(me.configs.records, function(index, record) {
				if(Array.getIndex(ids,record["id"])>=0){
					records.push(record);
				}
			});
			return records;
		},
		insertRow : function(record) {},
		updateRow : function(record) {},
		deleteRow : function(id) {},
		removeAll : function() {},
		resize : function() {
			var me = this;
			setTimeout(function() {
				var _height=me.grid.height() - me.grid_forzen_head.height() 
				- me.grid.find(".sea_grid_pager").height() 
				- me.grid.find(".sea_grid_toolbar").height() - me.grid.find(".sea_grid_title").height();
				var sea_grid_summary=me.grid.find(".sea_grid_summary");
				if(sea_grid_summary.css("display")!="none"){
					_height=_height-sea_grid_summary.height();
				}
				me.grid.find(".sea_grid_body").height(_height);
				
				var width = me.grid.parent().width() - me.columnForzenWidth;
				var el = me.grid.find(".sea_grid_normal>.sea_grid_body").get(0);
//				if (Component.hasScroll(el, "vertical")) {
//					var swidth = el.offsetWidth - el.scrollWidth;
//					me.grid.find(".sea_grid_scroll_x").css("padding-right", Component.getSize(swidth == 0 ? 17 : swidth));
//				} else {
//					me.grid.find(".sea_grid_scroll_x").css("padding-right", 0);
//				}
				me.grid.find(".sea_grid_normal>div").width(width);
				setTimeout(function(){
					var sea_grid_summary=me.grid.find(".sea_grid_summary");
					if(sea_grid_summary.css("display")!="none"){
						var el = me.grid.find(".sea_grid_normal>.sea_grid_summary").get(0);
						if (Component.hasScroll(el, "horizontal")) {
							var sheight = el.offsetHeight - el.scrollHeight;
							var gridbody=me.grid.find(".sea_grid_body");
							gridbody.height(gridbody.height()-sheight);
						}
					}
				},100);
				
			}, 100);
		},
		getRow : function(rowIndex) {
			return this.grid.find(".sea_grid_forzen .sea_grid_body table tr:eq(" + rowIndex + "),.sea_grid_normal  .sea_grid_body table tr:eq(" + rowIndex + ")");
		},
		getColumnsSet:function(){
			me=this;
			var ul=$("<ul class='sea_grid_columnset' style='line-height:30px;padding:5px;float:left;'></ul>");
			var len=me.columnsForzen.length;
			for(var i=0;i<len;i++){
				var item=me.columnsForzen[i];
				if(!item.label)continue;
				if(item.id=="_index")continue;
				if(item.id=="_op")continue;
				var li=$("<li style='float:left;padding:0 3px;'></li>").appendTo(ul);
				var check=$("<input type='checkbox' checked id='"+item.id+"' colIndex="+i+">"+item.label+"</li>").appendTo(li);
			}
			var len=me.columnsNormal.length;
			for(var i=0;i<len;i++){
				var item=me.columnsNormal[i];
				if(!item.label)continue;
				var li=$("<li style='float:left;'></li>").appendTo(ul);
				var check=$("<input type='checkbox' checked id='"+item.id+"' colIndex="+i+">"+item.label+"</li>").appendTo(li);
			}
			return ul;
		}
	};
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new Grid(configs);
	};
});