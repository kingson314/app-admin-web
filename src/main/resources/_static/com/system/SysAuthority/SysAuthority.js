seajs.use([ "BorderLayout", "FormLayout", "ViewLayout", "Dialog", "Grid",
		"Ajax", "Component", "Array", "Toolbar", "Tree", "Mask" ], function(
		BorderLayout, FormLayout, ViewLayout, Dialog, Grid, Ajax, Component,
		Array, Toolbar, Tree, Mask) {
	/** *************变量定义************** */
	var _title = '权限管理', _baseUrl = "SysRole/";
	var _currentId, _tree, _grid, _dialog, _formQuery, _formEdit;
	/** *************函数定义************** */
	// var getQueryForm = function() {
	// var cfgForm = {
	// items: [[{
	// id: "name",
	// label: "角色名称",
	// type: "textfield"
	// },{
	// type: "buttongroup",
	// items: [{
	// icon: "iconfont icon-chaxun",
	// value: "查询",
	// click: function() {
	// if (!_formQuery.check()) {
	// return false;
	// }
	// _grid.reload(_formQuery.val());
	// }
	// }]
	// }]]
	// };
	// _formQuery=FormLayout.create(cfgForm);
	// return _formQuery.formLayout;
	// };
	var cfgForm = {
		items : [ [ {
			id : "name",
			label : "角色名称",
			type : "textfield",
			maxLen : "100",
			isNull : false
		} ], [ {
			id : "state",
			label : "状态",
			type : "dic",
			params : {
				app : "system",
				type : "状态"
			}
		} ], [ {
			id : "ord",
			label : "排序号",
			type : "textfield",
			maxLen : "2"
		} ], [ {
			id : "memo",
			label : "备注",
			type : "textfield",
			maxLen : "1000",
			hide:true
		} ], [ {
			id : "id",
			type : "hidden"
		} ] ]
	};
	var getFormView = function(record) {
		cfgForm.record = record;
		return ViewLayout.create(cfgForm);
	};
	var getFormEdit = function(record) {
		cfgForm.record = record;
		return FormLayout.create(cfgForm);
	};
	var getGrid = function() {
		var cfgGrid = {
			title : _title,
			url : _baseUrl,
			toolbar : {
				items : [ {
					id : "search-name",
					placeholder : "请输入配置名称",
					type : "textfield",
					width : "200",
					icon : "iconfont icon-find",
					iconCss : {
						"background-color" : "#28B779"
					},
					cssLi : {
						"float" : "right",
						"margin-right" : "10px"
					},
					click : function() {
						_grid.reload({
							"name" : $("#search-name").val(),
							"app" : $("#search-app").val()
						});
					}
				} ],
				onAdd : function(record, selected) {
					Component.onAdd(_grid, _dialog, _formEdit, _formQuery,
							_title, _baseUrl, getFormEdit, record, Dialog);
				},
				onEdit : function(record, selected) {
					Component.onEdit(_grid, _dialog, _formEdit, _formQuery,
							_title, _baseUrl, getFormEdit, record, Dialog,
							Array, _currentId);
				},
				onView : function(record, selected) {
					Component.onView(_grid, _dialog, _title, getFormView,
							record, Dialog, Array, _currentId);
				}
			},
			rowClick : function(record) {
				_currentId = record.id;
				$("#tool_publish").removeAttr("disabled");
				Border.getCenter().getCenter().empty().append(
						getTree(_currentId).tree);
			}
		};
		_grid = Grid.create(Component.getCfgGrid(cfgGrid, cfgForm));
		return _grid.grid;
	};
	var getTree = function(roleId) {
		var cfgTree = {
			async : {
				url : Ajax.getUrl("SysAuthority/listRoleMenu?roleId=" + roleId)
			},
			callback : {
				onClick : function(treeId, treeNode) {
					var selectNode = tree.getTree().getSelectedNodes()[0];
					if (selectNode.isParent) {
						tree.getTree().expandNode(selectNode);
					} else {
					}
					return;
				}
			},
			check : {
				enable : true
			}
		};
		_tree = Tree.create(cfgTree);
		return _tree;
	};
	/** *************函数调用************** */
	Border = BorderLayout.create({
		// north: {
		// height: 60,
		// item: getQueryForm()
		// },
		center : {
			css : {
				"padding-right" : "10px"
			},
			item : getGrid()
		},
		east : {
			width : 240,
			north : {
				height : 82,
				item : ""
			},
			center : {
				north : {
					height : 35,
					item : Toolbar.create({
						css : {
							"border-left" : "1px solid #f6f6f6"
						},
						items : [ {
							id : "tool_publish",
							icon : "iconfont icon-shouquan",
							value : "授权",
							attr : {
								"disabled" : "disabled"
							},
							click : function() {
								Mask.show({}, function() {
									var menuIds = [];
									var nodes = _tree.getCheckedNodes(true);
									for (var i = 0; i < nodes.length; i++) {
										menuIds.push(nodes[i].id);
									}
									Ajax.post("SysAuthority/save", {
										roleId : _currentId,
										"menuIds" : menuIds
									}, function(rs) {
										Dialog.alert(rs.msg);
									});
								});
							}
						} ]
					}).toolbar
				},
				center : {
					css : {
						"border" : "1px solid #eaeaea",
						"overflow" : "auto",
						"margin-top":"4px!important"
					},
					item : getTree("").tree
				}
			}
		}
	});
});