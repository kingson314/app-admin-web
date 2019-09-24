seajs.use(["BorderLayout", "FormLayout", "ViewLayout", "Dialog", "Grid", "Ajax", "Component", "Array"],
function(BorderLayout, FormLayout, ViewLayout, Dialog, Grid, Ajax,Component,Array) {
	/***************变量定义***************/
	var _title='集成开发工具字典',_baseUrl = "ToolDictionary/";
	var _currentId,_grid,_dialog,_formQuery,_formEdit;
	/***************函数定义***************/
	var getFormQuery = function() {
		var cfgForm = {
			id:"formQuery",
			items: [[{
				id: "label",
				label: "标签",
				type: "textfield"
			},{
				type: "buttongroup",
				css:{"text-align":"left","padding-left":"20px"},
				items: [{
					icon: "iconfont icon-search",
					value: "查询",
					click: function() {
						if (_formQuery.check()) {
							_grid.reload(_formQuery.val());
						}
					}
				}]
			}]]
		};
		_formQuery=FormLayout.create(cfgForm);
		return _formQuery.formLayout;
	};
	var cfgForm = {
		items: [[{
			id: "_id",
			label: "ID",
			type: "textfield",
			maxLen: "100"
		},{
			id: "label",
			label: "标签",
			type: "textfield",
			maxLen: "100"
		}],[{
			id: "length",
			label: "长度",
			type: "textfield",
			maxLen: "100"
		},{
			id: "datetype",
			label: "数据类型",
			type: "textfield",
			maxLen: "100"
		}],[{
			id: "isNull",
			label: "isNull",
			type: "textfield",
			maxLen: "100"
		}],[{
			id: "id",
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
			height: 60,
			item: getFormQuery()
		},
		center: {
			item: getGrid()
		}
	});
});