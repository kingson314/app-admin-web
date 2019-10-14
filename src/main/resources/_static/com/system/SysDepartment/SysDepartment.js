seajs.use(["BorderLayout", "FormLayout", "ViewLayout", "Dialog", "Grid", "Ajax", "Component", "Array", "Tree",  "Window", "Menu","Toolbar"],
function(BorderLayout, FormLayout, ViewLayout, Dialog, Grid, Ajax,Component,Array, Tree, Window, Menu,Toolbar) {
	/***************变量定义***************/
	var _title='部门管理',_baseUrl = "SysUser/";
	var _baseUrlTree="SysDepartment/";
	var _currentId,_nodeId,_nodeName,_border,_grid,_dialog,_tree,_formQuery,_formEdit;
	
	/***************函数定义***************/
//	var getFormQuery = function() {
//		var cfgForm = {
//			items: [[{
//				id: "name",
//				label: "用户名称",
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
//			id: "company",
//			label: "公司名称",
//			type: "textfield",
//			value:Global.CfgRuntime("system","company").value,
//			disabled:"disabled"
//		},{
			id: "departmentId",
			_id: "departmentName",
			label: "部门名称",
			isNull:false,
			type: "select",
			url:"SysDepartment/options"
		},{}],[{
			id: "code",
			label: "工号",
			type: "textfield",
			maxLen: "100"
		},{
			id: "password",
			label: "密码",
			type: "textfield",
			//subtype:"password",
			maxLen: "100",
			hide:true
		}],[{
			id: "name",
			label: "用户名称",
			type: "textfield",
			maxLen: "100",
			hide:true
		},{
			id: "position",
			label: "职位名称",
			type: "textfield",
			maxLen: "100"
		}],[{
			id: "level",
			label: "职位级别",
			type: "textfield",
			maxLen: "100",
			hide:true
		},{
			id: "ratio",
			label: "折算系数",
			type: "textfield",
			limit:"num",
			hide:true
		}],[{
			id: "sex",
			label: "性别",
			maxLen: "1",
			type: "dic",
			isNull:false,
			params:{
				app:"system",
				type:"性别"
			},
			hide:true
		},{
			id: "birthday",
			label: "出生日期",
			type: "date",
			format:"YYYY-MM-DD",
			maxLen: "10",
			hide:true
		}],[{
			id: "tel",
			label: "手机号",
			type: "textfield",
			limit:"tel",
			maxLen: "20"
		},{
			id: "email",
			label: "邮箱地址",
			type: "textfield",
			limt:"email",
			maxLen: "100",
			hide:true
		}],[{
			id: "education",
			label: "学历",
			type: "textfield",
			maxLen: "100",
			hide:true
		},{
			id: "photo",
			label: "头像",
			type: "textfield",
			maxLen: "1000",
			hide:true
		}],[{
			id: "idcard",
			label: "身份证",
			type: "textfield",
			maxLen: "100",
			hide:true
		},{
			id: "address",
			label: "住址",
			type: "textfield",
			maxLen: "1000",
			hide:true
		}],[{
			id: "wxCode",
			label: "微信",
			type: "textfield",
			maxLen: "100",
			limit:"char",
			hide:true
		},{
			id: "qq",
			label: "QQ",
			type: "textfield",
			maxLen: "100",
			limit:"qq",
			hide:true
		}],[{
			id: "entryDate",
			label: "入职日期",
			type: "date",
			format:"YYYY-MM-DD",
			hide:true
//		},{
//			id: "entryDate",
//			label: "工资计算方式",
//			type: "dic",
//			params:{
//				app:"em",
//				type:"wageCalculation"
//			}
//		}],[{
//			id: "payrollAccount",
//			label: "工资帐号",
//			type: "textfield",
//			maxLen: "100"
		},{
			id: "state",
			label: "状态",
			type: "dic",
			params:{
				app:"system",
				type:"状态"
			}
		}],[{
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
			url: _baseUrl+"listDepartmentUser",
			columns: [{
				id: "id",
				align: "center",
				width: 40,
				format: "checkbox",
				forzen: true,
				click:function(obj,e){
					if(!_nodeId||_nodeId===""){
						Dialog.alert("请选择部门！");
						return;
					}
					var selected=$(obj).is(':checked');
					var _userId=obj.value;
					var departmentId="";
					if(selected){
						departmentId=_nodeId;
					}else{
						_nodeId="-1";
					}
					Ajax.post("SysUser/updateDepartment", {"userId": _userId,"departmentId":departmentId},function(rs) {
						_grid.reload({
							"departmentId":_nodeId
						});
						Dialog.alert(rs.msg);
					});
				}
			},{
				id: "_op",
				label: "操作",
				align: "center",
				width: 100,
				buttons: ["edit","view","delete"],
				forzen: true
			}],
			toolbar: {
				"delete":false,
				items:[{
					id: "search-name",
					placeholder:"请输入用户名称",
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
					if(!_nodeId||_nodeId===""){
						Dialog.alert("请选择部门");
						return;
					}
					record={};
					record.departmentId=_nodeId;
					Component.onAdd(_grid,_dialog,_formEdit,_formQuery,_title,_baseUrl,getFormEdit,record,Dialog);
				},
				onEdit: function(record, selected) {
					record.departmentId=_nodeId;
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
	var getTree = function() {
		var cfgTree = {
			async : {
				url : Ajax.getUrl(_baseUrlTree+"listTree")
			},
			callback : {
				beforeClick : function(treeId, treeNode, clickFlag) {
					var selectNode = _tree.getSelectedNodes()[0];
				},
				onClick : function(treeId, treeNode) {
					if(_dialog)_dialog.hide();
					var selectNode = _tree.getSelectedNodes()[0];
					_nodeId = selectNode.id;
					_nodeName = selectNode.name;
					_tree.expandNode(selectNode);
					_grid.reload({
						"departmentId":_nodeId
					});
					
					return;
				},
				onRightClick : function(event, treeId, treeNode) {
					var selectNode = _tree.getSelectedNodes();
					if (selectNode.length === 0) return;
					if (!treeNode) return;
					_nodeId = treeNode.id;
					_nodeName = treeNode.name;
					if(_dialog)_dialog.hide();
					var pos = Window.getMousePos(event);
					var content = $(".sea_popmenu").Menu().clone(true).show();
					_dialog = Dialog.alert({
						width : 150,
						height : 128,
						hasMask : false,
						hasTitle : false,
						hasButtonGroup : false,
						content : content
					});
					_dialog.dialog.css({
						left : pos.x + _dialog.dialog.width() * 0.5,
						top : pos.y + _dialog.dialog.height() * 0.5
					});
				},
				onRename : function(event, treeId, treeNode) {
					Ajax.post(_baseUrlTree + "rename", {
						id : treeNode.id,
						name : treeNode.name
					}, function(rs) {
						if (rs.success === false) Dialog.alert(rs.msg);
						else _grid.reload(_formQuery.val());
					});
				},
				beforeDrop : function(treeId, treeNodes, targetNode, moveType, isCopy) {
				},
				onDrop : function(event, treeId, treeNode) {
					var selectNode = _tree.getSelectedNodes()[0];
					var parentNode = selectNode.getParentNode();
					if (parentNode && parentNode.type == "1") {
						_tree.refresh();
						return;
					}
					Ajax.post(_baseUrlTree + "move", {
						id : selectNode.id,
						parentId : parentId,
						"ord" : Component.getOrd()
					}, function(rs) {
						if (rs.success === false) Dialog.alert(rs.msg);
						else _grid.reload(_formQuery.val());
					});
				}
			}
		};
		_tree = Tree.create(cfgTree);
		return _tree;
	};

	var getTreeToolbar=function(){
		var cfgToolbar={
			id:"treeToolbar",
			items:[{
				icon: "iconfont icon-jiahao",
				value:"展开",
				click:function(){
					_tree.expandAll(true);
				}
			},{
				icon: "iconfont icon-remove1",
				value:"收缩",
				click:function(){
					_tree.expandAll(false);
				}
//			},{
//				icon: "iconfont icon-shuaxin",
//				value:"刷新",
//				click:function(){
//					_tree.refresh();
//				}
			}]
		};
		var toolbar=Toolbar.create(cfgToolbar);
		return toolbar.toolbar;
	};
	var getPopuMenu=function(){
		var html=[];
		html.push("<div class='sea_popmenu' style='display:none;'>");
		html.push(" <ul>");
		html.push("	<li class='folder'><a href='#' class='tree-newfolder'><i class='iconfont icon-xinzeng'></i>新建节点</a></li>");
		html.push("	<li class='note separator'><a href='#'  class='tree-newsubfolder'><i class='iconfont icon-file'></i>新建子节点</a></li>");
		html.push("	<li><a href='#' class='tree-rename'><i class='iconfont icon-edit'></i>重命名</a></li>");
		html.push("	<li><a href='#' class='tree-del'><i class='iconfont icon-remove1'></i>删除</a></li>");
		html.push("</ul>");
		html.push("</div>");
		$("body").append(html.join(""));
	
		$(".tree-newfolder").click(function(){
			_dialog.hide();
			var selectNode = _tree.getSelectedNodes()[0];
			var newNodeData = {
				parentId : selectNode.parentId,
				parentName : selectNode.parentName,
				name : "新建节点",
				type : "0",
				open : "true",
				userId : Log.userId
			};
			Ajax.post(_baseUrlTree+"save", newNodeData, function(rs) {
				if (rs.success === false) Dialog.alert(rs.msg);
				newNodeData.id = rs.data.id;
			});
			var newNode = _tree.addNodes(null, newNodeData);
			_tree.editName(newNode[0]);
		});
		$(".tree-newsubfolder").click(function(){
			_dialog.hide();
			var selectNode = _tree.getSelectedNodes()[0];
			var newNodeData = {
				parentId : selectNode.id,
				parentName:selectNode.name,
				name : "新建子节点",
				type : "0",
				userId : Log.userId
			};
			Ajax.post(_baseUrlTree+"save", newNodeData, function(rs) {
				if (rs.success === false) Dialog.alert(rs.msg);
				newNodeData.id = rs.data.id;
			});
			var newNode = _tree.addNodes(selectNode, newNodeData);
			_tree.editName(newNode[0]);
		});
		$(".tree-rename").click(function(){
			_dialog.hide();
			var selectNode = _tree.getSelectedNodes()[0];
			_tree.editName(selectNode);
		});
		$(".tree-del").click(function(){
			_dialog.hide();
			var selectNode = _tree.getSelectedNodes()[0];
			if (selectNode.isParent) {
				Dialog.alert("该节点包含子节点，不允许删除！");
				return;
			}
			_tree.removeNode(selectNode);
			Ajax.post(_baseUrlTree+"delete", {
				id : selectNode.id
			}, function(rs) {
				if (rs.success === false) Dialog.alert(rs.msg);
				else _grid.reload(_formQuery.val());
			});
		});
	};
	/***************函数调用***************/
	_border = BorderLayout.create({
		north:{
			height:80,
			css:{
				"line-height":"80px",
				"font-size":"1.4rem"
			},
			item:"<i class='iconfont icon-Settings'></i><span style='margin-left:3px'>部门管理</span>"
		},
		west : {
			width : 220,
//			north : {
//				height : 36,
//				item : getTreeToolbar()
//			},
//			center : {
				css:{"border":"1px solid #eee","overflow":"auto"},
				item :getTree().tree
//			}
		},
		center : {
//			north:{
//				height: 60,
//				item: getFormQuery()
//			},
//			center: {
				css:{"padding":"0 0 0 15px"},
				item: getGrid()
//			}
		}
	});
	getPopuMenu();
	/***************事件绑定***************/
	_border.getWest().click(function(){
		if(_dialog)_dialog.hide();
	});
});