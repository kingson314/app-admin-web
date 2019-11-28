seajs.use(["BorderLayout", "FormLayout", "ViewLayout", "Dialog", "Grid", "Ajax", "Component", "Array"],
function(BorderLayout, FormLayout, ViewLayout, Dialog, Grid, Ajax,Component,Array) {
	/***************变量定义***************/
	var _title='数据日志',_baseUrl = "SysLog/";
	var _currentId,_grid,_dialog,_formQuery,_formEdit;
	/***************函数定义***************/
	//创建查询表单
//	var getQueryForm = function() {
//		var cfgForm = {
//				items: [[{
//					id: "app",
//					label: "所属应用",
//					type: "textfield"
//				},{
//					id: "type",
//					label: "日志类型	",
//					type: "dic",
//					params:{
//						app:"system",
//						type:"日志类型"
//					}
//				},{
//					id: "userName",
//					label: "用户名称	",
//					type: "textfield"
//				}], [{
//					type: "buttongroup",
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
			label: "所属应用"
		},{
			id: "type",
			label: "日志类型"
		}],[{
			id: "userName",
			label: "用户"
		},{
			id: "operation",
			label: "操作"
		}],[{
			id: "begTime",
			label: "开始时间"
		},{
			id: "endTime",
			label: "结束时间"
		}],[{
			id: "url",
			label: "访问链接"
		},{
			id: "recordId",
			label: "记录ID",
			hide:true
		}],[{
			id: "baseParams",
			label: "基础参数",
			hide:true
		},{
			id: "mapParams",
			label: "参数",
			hide:true
		}],[{
			id: "functionId",
			label: "功能ID",
			hide:true
		},{
			id: "functionName",
			label: "功能名称"
		}],[{
			id: "exception",
			label: "异常信息",
			hide:true
		},{
			id: "memo",
			label: "备注",
			hide:true
		}],[{
			id: "device",
			label: "设备"
		},{
			id: "userAgent",
			label: "浏览器信息"
		}],[{
			id: "ip",
			label: "IP地址"
		}]]
	};
	var getFormView = function(record) {
		cfgForm.record=record;
		return  ViewLayout.create(cfgForm);
	};
	var getFormEdit = function(record) {
	};
	var getGrid = function() {
		var cfgGrid = {
			title:_title,
			url: _baseUrl,
			toolbar: {
				add:false,
				edit:false,
				"delete":true,
				"export":false,
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
						"float":"right"
					},
					click:function(){
						_grid.reload({"app":$("#search-app").val(),"type":$("#search-type").val(),"userName":$("#search-userName").val()});
					}
				},{
					id: "search-type",
					nullText:"请选择日志类型",
					type: "dic",
					params:{
						app:"system",
						type:"日志类型"
					},
					cssLi:{
						"float":"right",
						"margin-right":"10px"
					}
				},{
					id: "search-userName",
					placeholder:"请输入应用名称",
					type: "textfield",
					width:"120",
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
	//创建页面布局
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
