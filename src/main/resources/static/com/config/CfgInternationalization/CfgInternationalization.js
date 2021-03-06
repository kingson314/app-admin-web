seajs.use(["BorderLayout", "FormLayout", "ViewLayout", "Dialog", "Grid", "Ajax", "Component", "Array"],
function(BorderLayout, FormLayout, ViewLayout, Dialog, Grid, Ajax,Component,Array) {
	/***************变量定义***************/
	var _currentId,_title='国际化配置',_baseUrl = "CfgInternationalization/";
	var _grid,_dialog,_formQuery,_formEdit;
	/***************函数定义***************/
	//创建查询表单
//	var getQueryForm = function() {
//		var cfgForm = {
//			items: [[{
//				id: "app",
//				label: "所属应用",
//				type: "textfield"
//			},{
//				id: "keyword",
//				label: "关键字	",
//				type: "textfield"
//			},{
//				id: "zh_CN",
//				label: "中文标签	",
//				type: "textfield"
//			}], [{
//				type: "buttongroup",
//				colspan: 3,
//				items: [{
//					icon: "iconfont icon-chaxun",
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
			maxLen: "10",
			isNull: false,
			value:"system",
			colspan:2
		},{}],[{
			id: "keyword",
			label: "关键字",
			type: "textfield",
			maxLen: "100",
			isNull: false,
			colspan:2
		}],[{
			id: "zh_CN",
			label: "中文标签",
			type: "textfield",
			isNull: false,
			colspan:2
		}],[{
			id: "en_US",
			label: "英文标签",
			type: "textfield",
			colspan:2
//		}],[{
//			id: "iw_IL",
//			label: "希伯来语",
//			type: "textfield",
//			colspan:2
//		}],[{
//			id: "zh_TW",
//			label: "繁体标签",
//			type: "textfield",
//			colspan:2
		}],[{
			id: "memo",
			label: "备注",
			type: "textarea",
			maxLen: "1000",
			hide:true,
			colspan:2
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
			toolbar: {
				refresh:false,
				copy:true,
				items:[{
					id: "search-zh_CN",
					placeholder:"请输入中文标签",
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
						_grid.reload({"zh_CN":$("#search-zh_CN").val(),"keyword":$("#search-keyword").val(),"app":$("#search-app").val()});
					}
				},{
					id: "search-keyword",
					placeholder:"请输入关键字",
					type: "textfield",
					width:"150",
					cssLi:{
						"float":"right",
						"margin-right":"10px"
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
//			item: getQueryForm()
//		},
		center: {
			item: getGrid()
		}
	});
});
