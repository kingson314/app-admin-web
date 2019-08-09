define(function(require, exports, module) {
	var BorderLayout=require("BorderLayout"); 
	var ViewLayout=require("ViewLayout"); 
	var Dialog=require("Dialog"); 
	var Grid=require("Grid"); 
	var Ajax=require("Ajax"); 
	var Component=require("Component"); 
	var Array=require("Array"); 
	var Tree=require("Tree"); 
	var Toolbar=require("Toolbar"); 		
	/***************变量定义***************/
	var _title='部门管理',_baseUrl = "SysUser/";
	var _baseUrlTree="SysDepartment/";
	var _currentId,_nodeId,_nodeName,_border,_grid,_dialog,_tree,_formEdit;
	var _params,_recoresAll=null;
	/***************函数定义***************/
	var cfgForm = {
		items: [[{
			id: "departmentId",
			_id: "departmentName",
			label: "部门名称",
			isNull:false,
			type: "select",
			url:"SysDepartment/options",
			hide:true
		},{}],[{
			id: "code",
			label: "工号",
			type: "textfield",
			maxLen: "100"
		}],[{
			id: "name",
			label: "用户名称",
			type: "textfield",
			maxLen: "100"
		},{
			id: "position",
			label: "职位",
			type: "textfield",
			maxLen: "100"
		}],[{
			id: "sex",
			label: "性别",
			maxLen: "1",
			type: "dic",
			isNull:false,
			params:{
				app:"system",
				type:"Sex"
			}
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
			width:150,
			align:"right"
		}],[{
			id: "entryDate",
			label: "入职日期",
			type: "date",
			format:"YYYY-MM-DD"
		},{
			id: "state",
			label: "状态",
			type: "dic",
			params:{
				app:"system",
				type:"State"
			},
			hide:true
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
	var getGrid = function() {
		var cfgGrid = {
			url: _baseUrl+"listDepartmentUserByScene",
			pageSize:0,
			columns: [{
				id: "id",
				align: "center",
				width: 40,
				format:_params.selectType||"radio",
				forzen: true,
				click:function(obj){
					var idArr=(_params.id||"").split(",");
					var id=$(obj).val();
					if($(obj).is(':checked')){
						idArr.push(id);
					}else{
						for(var i=0;i<idArr.length;i++){
							if(idArr[i]==id){
								idArr.splice(i, 1);
								break;
							}
						}
					}
					_params.id=idArr.join(",")
				}
//			},{
//				id: "_op",
//				label: "操作",
//				align: "center",
//				width: 50,
//				buttons: ["view"],
//				forzen: true
			}],
			toolbar: {
				id:"toolbar",
				refresh : false,
				add:false,
				"delete":false, 
				onView: function(record, selected) {
					Component.onView(_grid,_dialog,_title,getFormView,record,Dialog,Array,_currentId);
				},
				items:[{
					id:"name",
					type:"textfield",
					placeholder:"用户名称",
					width:"200px",
					cssLi:{
						"border-right":"0"
					}
				},{
					icon:"glyphicon glyphicon-search",
					click:function(){
						var String=require("String"); 
						var val=$("#toolbar #name").val();
						if(String.isBlank(val)==false){
							_grid.reload({"name":val});
						}
					}
				}]
			},
			loadSuccess:function(){
				if(!_recoresAll)_recoresAll=_grid.configs.records;
				_grid.setSelected((_params.id||"").split(","),_params.valueKey||"id");
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
				icon: "glyphicon glyphicon-plus-sign",
				value:"展开",
				click:function(){
					_tree.expandAll(true);
				}
			},{
				icon: "glyphicon glyphicon-minus-sign",
				value:"收缩",
				click:function(){
					_tree.expandAll(false);
				}
			},{
				icon: "glyphicon glyphicon-refresh",
				value:"刷新",
				click:function(){
					_tree.refresh();
				}
			}]
		};
		var toolbar=Toolbar.create(cfgToolbar);
		return toolbar.toolbar;
	};
	/***************函数调用***************/
	exports.showSelect=function (params,callback){
		_params=params;
		var dialog=Dialog.confirm({
			width:"80%",
			height:"100%",
			title:"部门用户选择",
			content:"",
			confirm:function(){
				var idArr=(_params.id||"").split(",");
				var _records=[];
				for(var i=0;i<idArr.length;i++){
					for(var j=0;j<_recoresAll.length;j++){
						if(idArr[i]==_recoresAll[j].id){
							_records.push(_recoresAll[j]);
							break;
						}
					}
				}
				if(_params.selectType=="radio"){
					_records=_grid.getSelectedRecord()
					callback(_records[0]||{});
				}else{
					callback(_records);
				}
				return true;
			}
		});
		_border = BorderLayout.create({
			parent:dialog.content.find("div"),
			west : {
				width : 229,
				north : {
					height : 36,
					item : getTreeToolbar()
				},
				center : {
					css : {
						"overflow" : "auto"
					},
					item :getTree().tree
				}
			},
			center: {
				item: getGrid()
			}
		});
	};
});