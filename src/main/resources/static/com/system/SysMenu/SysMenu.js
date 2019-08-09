seajs.use(["BorderLayout", "FormLayout", "ViewLayout", "Dialog", "Grid", "Ajax", "Component", "Array","Tree","Mask"],
function(BorderLayout, FormLayout, ViewLayout, Dialog, Grid, Ajax,Component,Array,Tree,Mask) {
	/***************变量定义***************/
	var _title='菜单管理',_baseUrl = "SysMenu/";
	var _tree,_currentId,_nodeId,_nodeName,_grid,_dialog,_formQuery,_formEdit;
	/***************函数定义***************/
	//创建查询表单
	var getQueryForm = function() {
		var cfgForm = {
			items: [[{
				id: "name",
				label: "菜单名称",
				type: "textfield"
			},{
				type: "buttongroup",
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
			id: "parentId",
			label: "上级菜单ID",
			type: "textfield",
			maxLen: "100",
			isNull: false
		},{
			id: "id",
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
				type:"State"
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
			params:{parentId:"root"},
			toolbar: {
				"export":false,
				copy:false,
				items:[{
				       id:"initMenu",
				       value:"初始化菜单",
				       //css:{"display":"none"},
				       click:function(){
							Mask.show({},function(){
								var list=[];
								//app-nav.jsp
								var navli=$(".sea_nav li",parent.document);
								$.each(navli,function(index,item){
									var li=$(item);
									if(li.attr("ignore"))return true;
									var a=li.find("a");
									if(a.length>0){
										if($.trim(li.attr("id"))==="")return true;
										list.push({
											parentId:"root",
											id:$.trim(li.attr("id")),
											name:$.trim(a.text()),
											url:$.trim(a.attr("link")),
											"open":true,
											ord:index
										});
									}
								});
								//app-menu.jsp
								var menuUl=$(".sea_menu>ul",parent.document);
								$.each(menuUl,function(index,item){
									var ul=$(item);
									var parentId=$.trim(ul.attr("class"));
									var li1=ul.children("li");
									$.each(li1,function(index1,item1){
										var objItem1=$(item1);
										if(objItem1.attr("ignore"))return true;
										var a=objItem1.children("a");
										var parentId1=$.trim(objItem1.attr("id"));
										if(parentId1==="")return true;
										list.push({
											parentId:parentId,
											id:parentId1,
											name:$.trim(a.text().replace("+","")),
											url:$.trim(a.attr("script")||a.attr("page")||a.attr("link")||""),
											"open":false,
											ord:index1
										});
										var li2=objItem1.children(".sea_submenu").children("li");
										if(li2.length>0){
											$.each(li2,function(index2,item2){
												var objItem2=$(item2);
												if(objItem2.attr("ignore"))return true;
												var a=objItem2.children("a");
												var parentId2=$.trim(objItem2.attr("id"));
												if(parentId2==="")return true;
												list.push({
													parentId:parentId1,
													id:parentId2,
													name:$.trim(a.text().replace("+","")),
													url:$.trim(a.attr("script")||a.attr("page")||a.attr("link")||""),
													"open":false,
													ord:index2
												});
												var li3=objItem2.find(".sea_submenu>li");
												if(li3.length>0){
													$.each(li3,function(index3,item3){
														var objItem3=$(item3);
														var a=objItem3.children("a");
														var parentId3=$.trim(objItem3.attr("id"));
														if(parentId3==="")return true;
														list.push({
															parentId:parentId2,
															id:parentId3,
															name:$.trim(a.text().replace("+","")),
															url:$.trim(a.attr("script")||a.attr("page")||a.attr("link")||""),
															"open":false,
															ord:index3
														});
													});
												}
											});
										}
									});
								});
								Ajax.post(_baseUrl+"initMenu", {"menuList": JSON.stringify(list)},function(rs) {
									Dialog.alert(rs.msg);
									_grid.reload();
								},false);
							});	
						}
					}
				],
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
						if (selectNode.isParent) {
							_tree.getTree().expandNode(selectNode);
							_grid.reload({parentId:selectNode.id});
						}else{
						}
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
			width :250,
			north: {
				height: 35,
				item: "<div class='sea_formLayout_title'><i class='iconfont icon-liebiao'><i/>菜单列表</div>"
			},
			center: {
				 css:{"border":"1px solid #eee","overflow":"auto"},
				 item:getTree().tree
			}
		},
		north: {
			height: 60,
			item: getQueryForm()
		},
		center: {
			item: getGrid()
		}
	});
});