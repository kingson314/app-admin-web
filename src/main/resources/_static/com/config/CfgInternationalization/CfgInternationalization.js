seajs.use(["BorderLayout", "FormLayout", "ViewLayout", "Dialog", "Grid", "Ajax", "Component", "Array"],
function(BorderLayout, FormLayout, ViewLayout, Dialog, Grid, Ajax,Component,Array) {
	/***************变量定义***************/
	var _currentId,_title='国际化配置',_baseUrl = "CfgInternationalization/";
	var _grid,_dialog,_formQuery,_formEdit;
	/***************函数定义***************/
	//创建查询表单
	var getQueryForm = function() {
		var cfgForm = {
			items: [[{
				id: "app",
				label: "所属应用",
				type: "textfield"
			},{
				id: "keyword",
				label: "关键字	",
				type: "textfield"
			},{
				id: "zh_CN",
				label: "中文标签	",
				type: "textfield"
			}], [{
				type: "buttongroup",
				colspan: 3,
				items: [{
					icon: "iconfont icon-chaxun",
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
			id: "app",
			label: "所属应用",
			type: "textfield",
			maxLen: "10",
			isNull: false,
			value:"system"
		}],[{
			id: "keyword",
			label: "关键字",
			type: "textfield",
			maxLen: "100",
			isNull: false
		}],[{
			id: "zh_CN",
			label: "中文标签",
			type: "textarea",
			isNull: false
		}],[{
			id: "en_US",
			label: "英文标签",
			type: "textarea"
		}],[{
			id: "iw_IL",
			label: "希伯来语",
			type: "textarea"
		}],[{
			id: "zh_TW",
			label: "繁体标签",
			type: "textarea"
		}],[{
			id: "memo",
			label: "备注",
			type: "textarea",
			maxLen: "1000"
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
				"export":true,
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
			item: getQueryForm()
		},
		center: {
			item: getGrid()
		}
	});
});
