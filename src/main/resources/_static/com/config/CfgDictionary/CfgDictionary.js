seajs.use(["BorderLayout", "FormLayout", "ViewLayout", "Dialog", "Grid", "Ajax", "Component", "Array"],
function(BorderLayout, FormLayout, ViewLayout, Dialog, Grid, Ajax,Component,Array) {
	/***************变量定义***************/
	var _currentId,_title='数字字典',_baseUrl = "CfgDictionary/";
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
//				id: "type",
//				label: "字典分类",
//				type: "textfield"
//			},{
//				id: "subType",
//				label: "二级分类",
//				type: "textfield"
//			},{
//				id: "zh_CN",
//				label: "字典文本(中文)",
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
		id:"formEdit",
		items: [[{
			id: "app",
			label: "所属应用",
			type: "textfield",
			maxLen: "100",
			colspan:2,
			value:"app"
		},{}],[{
			id: "type",
			label: "字典分类",
			type: "textfield",
			maxLen: "100",
			width:160
		},{
			id: "subType",
			label: "二级分类",
			type: "textfield",
			maxLen: "100"
		}],[{
			id: "value",
			label: "字典值",
			type: "textfield",
			maxLen: "4000",
			blur:function(){
				$("#formEdit #ord").val($(this).val());
			},
			colspan:2
		}],[{
			id: "zh_CN",
			label: "中文字典",
			type: "textfield",
			maxLen: "1000",
			colspan:2
		}],[{
			id: "en_US",
			label: "英文字典",
			type: "textfield",
			maxLen: "1000",
			colspan:2
		}],[{
			id: "ord",
			label: "顺序号",
			type: "textfield",
			value:"0"
		}],[{
			id: "memo",
			label: "字典说明",
			type: "textarea",
			maxLen: "4000",
			hide:true,
			colspan:2
		}],[{
			id: "id",
			type: "hidden"
		},{
			id: "state",
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
					id: "search-subType",
					placeholder:"请输入二级分类",
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
						_grid.reload({"subType":$("#search-subType").val(),"type":$("#search-type").val(),"app":$("#search-app").val()});
					}
				},{
					id: "search-type",
					placeholder:"请输入类别",
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
