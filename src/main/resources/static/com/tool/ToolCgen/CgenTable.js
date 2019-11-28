//seajs.use(["BorderLayout", "FormLayout", "TabLayout","AccordionLayout", "Dialog", "Toolbar", "Ajax","Drop","Grid","Boolean"],
//function(BorderLayout, FormLayout, TabLayout, AccordionLayout,Dialog, Toolbar, Ajax,Drop,Grid,Boolean) {
//	/***************变量定义***************/
//	var baseUrl = "ToolCgen/";
//	var Tab,BaseMsgForm,ToolCgenGrid; //表格变量
//	var formProperty;
//	var Configs={
//			id:"",
//			fields:[]
//	};
//	var _BaseMsgFormValue={
//			"srcPath": "/Volumes/Docs/Git/app-spm/src/main/java/com/business/",
//			"jsPath": "/Volumes/Docs/Git/app-spm-web/pages/admin/business/",
//			"menuParentName":"",
//			"menuName":"",
//			"packagePath":"",
//			"tableName":"",
//			"modelType":"Base",
//			"cache":false,
//			"rapid":""
//	};
//	/***************函数定义***************/
//	//创建查询表单
//	var getBaseMsgForm = function() {
//		var cfgForm = {
//			id:"baseMsgForm",
//			css:{"padding-top":"15px"},
//			items: [[{
//				id: "javaOptions",
//				type: "checkgroup",
//				cssTr:{
//					margin:"0",
//					"padding-bottom":"0",
//					"padding-top":"0"
//				},
//				items:[{
//					label:"Controller",
//					value:"Controller",
//					checked:true
//				},{
//					label:"Service",
//					value:"Service",
//					checked:true
//				},{
//					label:"Dao",
//					value:"Dao",
//					checked:true
//				},{
//					label:"Model",
//					value:"Model",
//					checked:true
//				},{
//					label:"Mapper",
//					value:"Mapper",
//					checked:true
//				}],
//				colspan:2
//			},{}],[{
//				
//				id: "srcPath",
//				label: "JAVA文件路径",
//				type: "textfield",
//				value:"/Users/guoqufeng/Projects/Gogs/app-spm/src/main/java/com/system",
//				isNull: false,
//				colspan:2
//			},{}],[{
//				id: "jsPath",
//				label: "JS文件路径",
//				type: "textfield",
//				isNull: false,
//				colspan:2
//			},{}],[{
//				id: "menuParentName",
//				label: "父级菜单名称",
//				type: "textfield",
//				placeholder:"例如：系统管理",
//				isNull: false
//			},{
//				id: "menuName",
//				label: "菜单名称",
//				type: "textfield",
//				placeholder:"功能菜单title,例如：用户管理",
//				isNull: false
//			}],[{
//				id: "packagePath",
//				label: "JAVA包路径",
//				type: "textfield",
//				placeholder:"例如：com.system.SysMenu",
//				isNull: false,
//				blur:function(){
//					$("#baseMsgForm #tableName").val($(this).val().substring($(this).val().lastIndexOf(".")+1));
//				}
//			},{
//				id: "tableName",
//				label: "数据库表名称",
//				type: "textfield",
//				placeholder:"例如：SysMenu",
//				isNull: false
//			}],[{
//				id: "modelType",
//				label: "模型类型",
//				type: "select",
//				value:"Base",
//				options:[{id:"Base",name:"Base"},{id:"Super",name:"Super"},{id:"Tree",name:"Tree"}],
//				isNull: false
//			}],[{
//				type:"buttongroup",
//				colspan:2,
//				items: [{
//					icon: "iconfont icon-edit",
//					value: "运行",
//					css:{
//						"padding":"0 12px!important",
//						background:"rgb(22, 173, 35)"
//					},
//					click: function() {
//						exec("execTable");
//					}
//				}]
//			}],[{
//				id: "id",
//				type: "hidden",
//			}]]
//		};
//		BaseMsgForm = FormLayout.create(cfgForm);
//		BaseMsgForm.val(_BaseMsgFormValue);
//		return BaseMsgForm.layout;
//	};
//	var exec=function(action){
//		if(BaseMsgForm.check()===false)return;
//		Configs=$.extend(true,{},Configs,BaseMsgForm.val());
//		Ajax.post(baseUrl + action, {"Configs":JSON.stringify(Configs)},function(rs) {
//			Dialog.alert(rs.msg);
//		});
//	};
//	/***************函数调用***************/
//	// 创建Tab
//	var getTab = function(){
//		var cfgTab = {
//			id:"tablayout",
//			top:60,
//			css:{"width":"100%","height":"100%"},
//			items:[{
//				id:"baseMsgForm",
//				title:"基本属性",
//				icon:"iconfont icon-liebiao",
//				content:getBaseMsgForm()
//			}]
//		};
//		Tab = TabLayout.create(cfgTab);
//		return Tab.layout;
//	};
//	//创建页面布局
//	BorderLayout.create({
//		center: {
//			css:{"color":"#222","padding":"0 0.8rem"},
//			item: getTab()
//		}
//	});
//});