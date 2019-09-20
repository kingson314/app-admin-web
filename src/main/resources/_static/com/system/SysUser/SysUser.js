seajs.use(["BorderLayout", "FormLayout", "ViewLayout", "Dialog", "Grid", "Ajax", "Component", "Array","Tree"],
function(BorderLayout, FormLayout, ViewLayout, Dialog, Grid, Ajax,Component,Array,Tree) {
	/***************变量定义***************/
	var _currentId,_title='用户管理',_baseUrl = "SysUser/";
	var _gridRole,_grid,_dialog,_formQuery,_formEdit;
	/***************函数定义***************/
	var audit=function(_grid,_baseUrl,state){
		var selecteRecord =_grid.getSelectedRecord();
		var len=selecteRecord.length;
		if(len===0){
			Dialog.alert("请选择一条记录");
			return;
		}
		var ids=[];
		for(var i=0;i<len;i++){
			if(state===0){
				if(selecteRecord[i].state==1)
					ids.push(selecteRecord[i].id);
			}else if(state===1){
				if(selecteRecord[i].state===0)
					ids.push(selecteRecord[i].id);
			}
		}
		if(ids.length===0){
			if(state===0){
				Dialog.alert("请选择未审核记录");
			}else{
				Dialog.alert("请选择已审核记录");
			}
			return;
		}
		Ajax.post(_baseUrl+"audit", {
			"id": ids,
			"state":state,
			"auditor":Session.sysUser.name
		},function(rs) {
			Dialog.alert(rs.msg);
			_grid.reload();
		});
	};
//	//创建查询表单
//	var getQueryForm = function() {
//		var form;
//		var cfgForm = {
//			title:_title,
//			items: [[{
//				id: "code",
//				label:"工号",
//				type: "textfield"
//			},{
//				id: "name",
//				label:"用户名称",
//				type: "textfield"
//			}], [{
//				type: "buttongroup",
//				colspan: 2,
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
			maxLen: "100",
			isNull:false
		},{
			id: "password",
			label: "密码",
			type: "textfield",
			//subtype:"password",
			maxLen: "100",
			isNull:false
		}],[{
			id: "name",
			label: "用户名称",
			type: "textfield",
			maxLen: "100",
			isNull:false
		},{
			id: "position",
			label: "职务",
			type:"textfield",
			isNull:false
		}],[{
			id: "ord",
			label: "排序号",
			type: "textfield",
			limit:"num"
		},{
			id: "sex",
			label: "性别",
			maxLen: "1",
			type: "dic",
			isNull:false,
			params:{
				app:"system",
				type:"性别"
			}
		}],[{
			id: "tel",
			label: "手机号",
			type: "textfield",
			limit:"tel",
			maxLen: "20",
			isNull:false
		},{
			id: "email",
			label: "邮箱地址",
			type: "textfield",
			limt:"email",
			maxLen: "100",
			isNull:false
		}],[{
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
	var getGridUser = function() {
		var cfgGrid = {
			title:_title,
			url: _baseUrl,
			toolbar: {
				refresh:false,
				items:[{
//					icon: "iconfont icon-view",
//					value: "菜单预览",
//					click: function() {
//						if(!_currentId){
//							Dialog.alert("请选择用户");
//							return;
//						}
//						Dialog.view({
//							title: "用户菜单预览",
//							content: getTree(_currentId).tree
//						});
//					}
//				},{
					icon: "iconfont icon-shengxiao",
					id:"tb_audit",
					"disabled":"disabled",
					value: "激活",
					click: function() {
						audit(_grid,_baseUrl,0);
						$(this).attr("disabled","disabled");
					}
				},{
					icon: "iconfont icon-shixiao",
					id:"tb_cancelAudit",
					"disabled":"disabled",
					value: "冻结",
					click: function() {
						audit(_grid,_baseUrl,1);
						$(this).attr("disabled","disabled");
					}
				},{
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
						"margin-right":"10px"
					},
					click:function(){
						_grid.reload({"name":$("#search-name").val()});
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
			},
			rowClick:function(record){
				_currentId=record.id;
				_gridRole.reload({
					"userId":_currentId
				});
				_gridRole.disabled(false);
				$("#tb_audit").attr("disabled","disabled");
				$("#tb_cancelAudit").attr("disabled","disabled");
				var state=record.state;
				if(state===0){
					$("#tb_cancelAudit").removeAttr("disabled");
				}else if(state===1){
					$("#tb_audit").removeAttr("disabled");
				}
				return false;
			},
			loadSuccess:function(){
				if(_gridRole)_gridRole.disabled(true);
			}
		};
		_grid = Grid.create(Component.getCfgGrid(cfgGrid,cfgForm));
		return _grid.grid;
	};
	var getGridRole=function(){
		var _baseUrl="SysUserRole/";
		var cfgGrid = {
				pagerMode:"simple",
				columns: [{
					id: "id",
					align: "center",
					width: 40,
					format: "checkbox",
					forzen: true,
					click:function(obj,e){
						var roleId=obj.value;
						var selected=$(obj).is(':checked');
						if(selected){
							Ajax.post(_baseUrl+"save", {"userId": _currentId,"roleId":roleId},function(rs) {
//								Dialog.alert(rs.msg);
							});
						}else{
							Ajax.post(_baseUrl+"delete", {"userId": _currentId,"roleId":roleId},function(rs) {
//								Dialog.alert(rs.msg);
							});
						}
					}
				},{
					id: "name",
					label: "选择角色",
					align:"left"
				}],
				url: _baseUrl,
				toolbar: {
					hide:true
				}
			};
			_gridRole = Grid.create(cfgGrid);
			_gridRole.disabled(true);
			return _gridRole.grid;
	};

	var getTree=function(userId){
		var cfgTree = {
				id:"treeUsermenu",
				async : {
					url : Ajax.getUrl("SysAuthority/listUserMenu?userId="+userId)
				} ,
				callback : {
					onClick: function(treeId, treeNode) {
						var selectNode = tree.getTree().getSelectedNodes()[0];
						if (selectNode.isParent) {
							tree.getTree().expandNode(selectNode);
						}else{
						}
						return;
					}
				},
				check: {
					enable: true
				}
			};
		tree = Tree.create(cfgTree);
		return  tree ;
	};
	/***************函数调用***************/
	//创建页面布局
	BorderLayout.create({
//		north: {
//			height: 100,
//			item: getQueryForm()
//		},
		center: {
			css:{"padding-right":"10px"},
			item: getGridUser()
		},
		east:{
			width:240,
			css:{
				"padding-top":"120px"
			},
			item:getGridRole()
		}
	});
});
