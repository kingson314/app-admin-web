seajs.use(["BorderLayout", "FormLayout", "ViewLayout", "Dialog", "Grid", "Ajax", "Component", "Array","Tree","Mask"],
function(BorderLayout, FormLayout, ViewLayout, Dialog, Grid, Ajax,Component,Array,Tree,Mask) {
	/***************变量定义***************/
	var _title='菜单管理',_baseUrl = "SysMenu/";
	var _tree,_currentId,_nodeId,_nodeName,_grid,_dialog,_formQuery,_formEdit;
	/***************函数定义***************/
	//创建查询表单
//	var getQueryForm = function() {
//		var cfgForm = {
//			items: [[{
//				id: "name",
//				label: "菜单名称",
//				type: "textfield"
//			},{
//				type: "buttongroup",
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
			id: "parentId",
			label: "上级菜单ID",
			type: "textfield",
			maxLen: "100",
			isNull: false
		},{
			id: "menuId",
			label: "菜单ID",
			type: "textfield",
			maxLen: "100",
			isNull: false
		}],[{
			id: "name",
			label: "菜单名称",
			type: "textfield",
			maxLen: "100",
			isNull: false
		},{
			id: "url",
			label: "URL",
			type: "textfield",
			maxLen: "100"
		}],[{
			id: "countUrl",
			label: "COUNTURL",
			type: "textfield",
			maxLen: "100"
		},{
			id: "state",
			label: "状态",
			type: "dic",
			params:{
				app:"system",
				type:"状态"
			}
		}],[{
			id: "ord",
			label: "排序号",
			type: "textfield",
			maxLen: "11"
		},{
			id: "memo",
			label: "备注",
			type: "textfield",
			maxLen: "1000"
		},{
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
			params:{parentId:0},
			toolbar: {
				"export":false,
				copy:false,
				items:[{
					id: "search-name",
					placeholder:"请输入菜单名称",
					type: "textfield",
					width:"200",
					icon:"iconfont icon-find",
					iconCss:{
						"background-color":"#28B779"
					},
					cssLi:{
						"float":"right",
						"margin-right" : "15px"
					},
					click:function(){
						_grid.reload({"name":$("#search-name").val()});
					}
				}],
				onAdd: function(record, selected) {
					record={};
					record.parentId=_nodeId;
					record.parentName=_nodeName;
					Component.onAdd(_grid,_dialog,_formEdit,_formQuery,_title,_baseUrl,getFormEdit,record,Dialog);
				},
				onEdit: function(record, selected) {
					record.parentId=_nodeId;
					record.parentName=_nodeName;
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
	var getTree=function(){
		var cfgTree = {
				id:"treeMenu",
				async : {
					url : Ajax.getUrl("SysMenu/listMenu")
				} ,
				callback : {
					onClick: function(treeId, treeNode) {
						var selectNode = _tree.getSelectedNodes()[0];
						_nodeId = selectNode.id;
						_nodeName = selectNode.name;
//						if (selectNode.isParent) {
							_tree.getTree().expandNode(selectNode);
							_grid.reload({parentId:selectNode.id});
//						}
						return;
					}
				}
			};
		_tree = Tree.create(cfgTree);
		return _tree;
	};
	/***************函数调用***************/
	//创建页面布局
	BorderLayout.create({
		west:{
			width :220,
//			north: {
//				height: 35,
//				item: "<div class='sea_formLayout_title'><i class='iconfont icon-liebiao'><i/>菜单列表</div>"
//			},
//			center: {
				 css:{"border":"1px solid #eee","overflow":"auto"},
				 item:getTree().tree
//			}
		},
//		north: {
//			height: 60,
//			item: getQueryForm()
//		},
		north:{
			height:80,
			css:{
				"line-height":"80px",
				"font-size":"1.4rem"
			},
			item:"<i class='iconfont icon-Settings'></i><span style='margin-left:3px'>菜单管理</span>"
		},
		center: {
			 css:{"padding":"0 0 0 15px"},
			item: getGrid()
		}
	});
});