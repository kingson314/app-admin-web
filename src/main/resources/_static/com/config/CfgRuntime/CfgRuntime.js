seajs.use(["BorderLayout", "FormLayout", "ViewLayout", "Dialog", "Grid", "Ajax", "Component", "Array"],
function(BorderLayout, FormLayout, ViewLayout, Dialog, Grid, Ajax,Component,Array) {
	/***************变量定义***************/
	var _currentId,_title='运行时配置',_baseUrl = "CfgRuntime/";
	var _grid,_dialog,_formQuery,_formEdit;
	/***************函数定义***************/
	//创建查询表单
//	var getFormQuery = function() {
//		var cfgForm = {
//			id:"formQuery",
//			items: [[{
//				id: "app",
//				label: "所属应用",
//				type: "textfield",
//				value:"system"
//			},{
//				id: "name",
//				label: "配置名称	",
//				type: "textfield"
//			}], [{
//				type: "buttongroup",
//				colspan: 2,
//				items: [{
//					icon: "iconfont icon-search",
//					value: "查询",
//					click: function() {
//						if (!_formQuery.check()) {
//							return false;
//						}
//						_grid.reload(_formQuery.val());
//					}
//				}]
//			}]]
//		};
//		_formQuery=FormLayout.create(cfgForm);
//		return _formQuery.formLayout;
//	};
	var cfgForm = {
		items: [[{
			id: "app",
			label: "所属应用",
			type: "textfield",
			maxLen: "100"
		}],[{
			id: "name",
			label: "配置名称",
			type: "textfield",
			maxLen: "100"
		}],[{
			id: "value",
			label: "配置值",
			type: "textfield"
		}],[{
			id: "runType",
			label: "运行类型",
			type: "textfield",
			maxLen: "100"
		}],[{
			id: "loadType",
			label: "加载类型",
			type: "textfield",
			maxLen: "100"
		}],[{
			id: "destroyType",
			label: "销毁类型",
			type: "textfield",
			maxLen: "100"
		}],[{
			id: "memo",
			label: "备注说明",
			type: "textarea"
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
			title:_title,
			url: _baseUrl,
			params:{
				app:"system"
			},
			toolbar: {
				refresh:false,
				copy:true,
				items:[{
					id: "search-name",
					placeholder:"请输入配置名称",
					type: "textfield",
					width:"200",
					icon:"iconfont icon-find",
					iconCss:{
						"background-color":"#28B779"
					},
					cssLi:{
						"float":"right"
					},
					click:function(){
						_grid.reload({"name":$("#search-name").val(),"app":$("#search-app").val()});
					}
				},{
					id: "search-app",
					placeholder:"请输入应用名称",
					type: "textfield",
					width:"150",
					cssLi:{
						"float":"right",
						"margin-right":"10px"
					}
				}],
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
//		north: {
//			height: 100,
//			item: getFormQuery()
//		},
		center: {
			item: getGrid()
		}
	});
});