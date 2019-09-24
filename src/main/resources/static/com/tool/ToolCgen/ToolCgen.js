seajs.use(["BorderLayout", "FormLayout", "ViewLayout", "Dialog", "Grid", "Ajax", "Component", "Array"],
function(BorderLayout, FormLayout, ViewLayout, Dialog, Grid, Ajax,Component,Array) {
	/***************变量定义***************/
	var _title='集成开发管理',_baseUrl = "ToolCgen/";
	var _currentId,_grid,_dialog,_formQuery,_formEdit;
	/***************函数定义***************/
	var getFormQuery = function() {
		var cfgForm = {
			id:"formQuery",
			items: [[{
				id: "entityName",
				label: "实体类名称",
				type: "textfield"
			},{
				id: "tableName",
				label: "表名称",
				type: "textfield"
			}], [{
				type: "buttongroup",
				colspan: 2,
				items: [{
					icon: "iconfont icon-search",
					value: "查询",
					click: function() {
						if (!_formQuery.check()) {
							return false;
						}
						_grid.reload(_formQuery.val());
					}
				}]
			}]]
		};
		_formQuery=FormLayout.create(cfgForm);
		return _formQuery.formLayout;
	};
	var cfgForm = {
		items: [[{
			id: "tableName",
			label: "表名称",
			type: "textfield",
			maxLen: "100",
			width:200
		},{
			id: "entityName",
			label: "实体类名称",
			type: "textfield",
			maxLen: "100"
		}],[{
			id: "rapid",
			label: "快速通道",
			type: "textarea",
			colspan:2,
			maxLen: "4000"
		}],[{
			id: "fields",
			label: "字段列表",
			type: "textarea",
			colspan:2
		}],[{
			id: "basePathSrc",
			label: "基本路径",
			type: "textarea"
		},{
			id: "packagePath",
			label: "代码包路径",
			type: "textarea"
		}],[{
			id: "baseUrl",
			label: "基本Url ",
			type: "textfield"
		},{
			id: "entityType",
			label: "实体类型",
			type: "textfield",
			maxLen: "20"
		}],[{
			id: "menuName",
			label: "菜单名称",
			type: "textfield"
		},{
			id: "menuParentName",
			label: "父菜单名称",
			type: "textfield"
		}],[{
			id: "menuUrl",
			label: "MenuUrl",
			type: "textfield"
		}],[{
			id: "pathController",
			label: "PathController",
			type: "textarea"
		},{
			id: "jsPath",
			label: "JsPath",
			type: "textarea"
		}],[{
			id: "pathService",
			label: "PathService",
			type: "textarea"
		},{
			id: "pathIService",
			label: "PathIService",
			type: "textarea"
		}],[{
			id: "pathDao",
			label: "PathDao",
			type: "textarea"
		},{
			id: "pathIDao",
			label: "PathIDao",
			type: "textarea"
		}],[{
			id: "pathEntity",
			label: "PathEntity",
			type: "textarea"
		},{
			id: "pathHibernate",
			label: "PathHibernate",
			type: "textarea"
		}],			// 主键以及不为null字段须隐藏域 
		[{
			id: "id",
			type: "hidden"
		},{
			id: "ord",
			type: "hidden"
		}]]
	};
	var getFormView = function(record) {
		cfgForm.record=record;
		return  ViewLayout.create(cfgForm);
	};
	var getFormEdit = function(record) {
		cfgForm.record=record;
		return FormLayout.create(cfgForm);
	};
	var getGrid = function() {
		var cfgGrid = {
			url: _baseUrl,
			toolbar: {
				copy:true,
				onAdd: function(record, selected) {
					Component.onAdd(_grid,_dialog,_formEdit,_formQuery,_title,_baseUrl,getFormEdit,record,Dialog);
				},
				onEdit: function(record, selected) {
					Component.onEdit(_grid,_dialog,_formEdit,_formQuery,_title,_baseUrl,getFormEdit,record,Dialog,Array,_currentId);
				},
				onView: function(record, selected) {
					Component.onView(_grid,_dialog,_title,getFormView,record,Dialog,Array,_currentId);
				}
			}
		};
		_grid = Grid.create(Component.getCfgGrid(cfgGrid,cfgForm));
		return _grid.grid;
	};
	/***************函数调用***************/
	BorderLayout.create({
		north: {
			height: 100,
			item: getFormQuery()
		},
		center: {
			item: getGrid()
		}
	});
});
