seajs.use(["BorderLayout", "FormLayout", "ViewLayout", "Dialog", "Grid", "Ajax", "Component", "Array"],
function(BorderLayout, FormLayout, ViewLayout, Dialog, Grid, Ajax,Component,Array) {
	/***************变量定义***************/
	var _title='角色管理',_baseUrl = "SysRole/";
	var _currentId,_grid,_dialog,_formQuery,_formEdit;
	/***************函数定义***************/
	//创建查询表单
//	var getQueryForm = function() {
//		var form;
//		var cfgForm = {
//			items: [[{
//				id: "name",
//				label: "角色名称",
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
			id: "name",
			label: "角色名称",
			type: "textfield",
			maxLen: "100",
			isNull: false
		}],[{
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
			maxLen: "2"
		}],[{
			id: "memo",
			label: "备注",
			type: "textfield",
			maxLen: "1000"
		}],			// 主键以及不为null字段须隐藏域 
		[{
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
				items:[{
					id: "search-name",
					placeholder:"请输入角色名称",
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
				_gridUser.reload({
					"roleId":_currentId
				});
				_gridUser.disabled(false);
			},
			loadSuccess:function(){
				if(_gridUser)_gridUser.disabled(true);
			}
		};
		_grid = Grid.create(Component.getCfgGrid(cfgGrid,cfgForm));
		return _grid.grid;
	};
	
	var getGridUser = function() {
		var cfgGrid = {
			columns: [{
				id: "id",
				align: "center",
				width: 40,
				format: "checkbox",
				forzen: true,
				click:function(obj,e){
					if(!_currentId||_currentId===""){
						Dialog.alert("请选择角色！");
						return;
					}
					var _userId=obj.value;
					var selected=$(obj).is(':checked');
					if(selected){
						Ajax.post("SysUserRole/save", {"userId": _userId,"roleId":_currentId},function(rs) {
						});
					}else{
						Ajax.post("SysUserRole/delete", {"userId": _userId,"roleId":_currentId},function(rs) {
						});
					}
				}
			},{
				id: "departmentName",
				label: "部门名称"
			},{
				id: "code",
				label: "工号"
			},{
				id: "name",
				label: "名称"
			},{
				id: "simpleCode",
				label: "拼音简码"
			},{
				id: "sex",
				label: "性别",
				format:Global.DicJson("system","Sex")
			},{
				id: "tel",
				label: "手机号"
			},{
				id: "position",
				label: "职位名称"
			},{
				id: "level",
				label: "职位级别"
			},{
				id: "ratio",
				label: "折算系数"
			},{
				id: "state",
				label: "状态",
				type: "dic",
				params:{
					app:"system",
					type:"状态"
				}
			}],
			url: "SysUser/listRoleUser",
			pageSize:0,
			params:{
				roleId:"-1"
			},
			toolbar:{
				hide:true
			}
		};
		_gridUser = Grid.create(cfgGrid);
		return _gridUser.grid;
	};
	/***************函数调用***************/
	//创建页面布局
	BorderLayout.create({
//		north: {
//			height: 60,
//			item: getQueryForm()
//		},
		center:{
			css:{"padding-right":"10px"},
			item:getGrid()
		},
		east: {
			width:240,
			css:{
				"padding-top":"120px"
			},
			item:getGridUser()
		}
	});
});