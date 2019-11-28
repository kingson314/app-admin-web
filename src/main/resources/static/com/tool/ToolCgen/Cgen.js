seajs.use(["BorderLayout", "FormLayout", "TabLayout","AccordionLayout", "Dialog", "Toolbar", "Ajax","Drop","Grid","Boolean"],
function(BorderLayout, FormLayout, TabLayout, AccordionLayout,Dialog, Toolbar, Ajax,Drop,Grid,Boolean) {
	/***************变量定义***************/
	var baseUrl = "ToolCgen/";
	var Tab,BaseMsgForm,ToolCgenGrid; //表格变量
	var formProperty;
	var Configs={
			id:"",
			fields:[]
	};
	var _BaseMsgFormValue={
//			"srcPath": "/Users/guoqufeng/Projects/Github/app-qy1/src/main/java/com/system",
//			"jsPath": "/Users/guoqufeng/Projects/Github/app-qy-web/pages/system",
			"srcPath": "/Volumes/Docs/Git/app-spm/src/main/java/com/business/",
			"jsPath": "/Volumes/Docs/Git/app-spm-web/pages/admin/business/",
			"menuParentName":"",
			"menuName":"",
			"packagePath":"",
			"tableName":"",
			"modelType":"Base",
			"cache":false,
			"rapid":""
	};
	/***************函数定义***************/
	var rowClick=function(record){
		BaseMsgForm.val(record);
		var rows= $.parseJSON(record.fields);
		if(rows){
			$(".sea_dropmain").empty();
			$(".sea_dropmain").append('<div style="width:100%;height:40px;margin: 8px 0;" class="sea_droper sea_droper_auto"><div class=" sea_drager sea_draglayout" style="width:100%; height: 38px;line-height:38px; margin: 0px;">	<div style="width:50%;border:0;" class="sea_droper "> </div>	<div style="width:50%; border:0" class="sea_droper"> </div></div></div>');
			for(var i=0;i<rows.length;i++){
				var draglayout= $('<div class="sea_droper sea_droper_auto" style="width:100%;height:40px;margin: 8px 0;"><div class=" sea_drager sea_draglayout" style="width:100%; height: 38px;line-height:38px; margin: 0px;">	</div></div>').appendTo($(".sea_dropmain"));
				var cols=rows[i];
				for(var j=0;j<cols.length;j++){
					var col=cols[j];
					col.id=col._id;
					var component;
					if(col.type=="textfield"){
						component=$('<div class="sea_droper" style="width:50%; border:0"> <div class="sea_accordionLayout_groupItem sea_drager" style="width:100%;height: 36px; margin: 0px;"><label for="" style="background-color: transparent; width: 38.2%; text-align: right; padding-right: 5px;">Label</label><input type="text" class="sea_textfield" style="float: none; width:100%;height: 35px; width: 61.8%;"></div></div>').appendTo(draglayout.find(".sea_draglayout"));
						component=component.find(".sea_textfield").data("data",col);
					}else if(col.type=="textarea"){
						component=$('<div class="sea_droper" style="width:50%;border:0;"> <div class="sea_accordionLayout_groupItem sea_drager" rows="1" placeholder="多行文本" style="width: 462px; height: 36px; margin: 0px;"><label for="" style="width: 38.2%; text-align: right; padding-right: 5px; background-color: transparent;">Label</label><textarea class="sea_textarea" rows="1" cols="20" placeholder="多行文本" style="float: none; height: 35px; width: 61.8%;"></textarea></div></div>').appendTo(draglayout.find(".sea_draglayout"));
						component=component.find(".sea_textarea").data("data",col);
					}else if(col.type=="select"){
						component=$('<div class="sea_droper" style="width:50%;border:0;"> <div class="sea_accordionLayout_groupItem sea_drager" style="width: 462px; height: 36px; margin: 0px;"><label for="" style="width: 38.2%; text-align: right; padding-right: 5px; background-color: transparent;">Label</label><select class="sea_select" style="float: none; height: 35px; width: 61.8%;"><option value="">请选择</option></select></div></div>').appendTo(draglayout.find(".sea_draglayout"));
						component=component.find(".sea_select").data("data",col);
					}
					component.attr("id",col.id);
					component.attr("_id",col.id);
					component.val(col.id);
					component.parent().find("label").html(col.label);
				}
			}
			$(".sea_dropmain").append('<div style="width:100%;height:40px;margin: 8px 0;" class="sea_droper sea_droper_auto"><div class=" sea_drager sea_draglayout" style="width:100%; height: 38px;line-height:38px; margin: 0px;">	<div style="width:50%;border:0;" class="sea_droper "> </div>	<div style="width:50%; border:0" class="sea_droper"> </div></div></div>');
		}
	};
	//创建查询表单
	var getBaseMsgForm = function() {
		var cfgForm = {
			id:"baseMsgForm",
			css:{"padding-top":"15px"},
			items: [[{
				id: "javaOptions",
				type: "checkgroup",
				cssTr:{
					margin:"0",
					"padding-bottom":"0",
					"padding-top":"0"
				},
				items:[{
					label:"Controller",
					value:"Controller",
					checked:true
				},{
					label:"Service",
					value:"Service",
					checked:true
				},{
					label:"Dao",
					value:"Dao",
					checked:true
				},{
					label:"Model",
					value:"Model",
					checked:true
				},{
					label:"Mapper",
					value:"Mapper",
					checked:true
				}],
				colspan:2
			},{}],[{
				id: "jsOptions",
				type: "checkgroup",
				cssTr:{
					margin:"0",
					"padding-bottom":"0",
					"padding-top":"0"
				},
				items:[{
					label:"JsList",
					value:"JsList",
					checked:true
				},{
					label:"JsTable",
					value:"JsTable",
					checked:false
				},{
					label:"JsView",
					value:"JsView",
					checked:false
				},{
					label:"JsEdit",
					value:"JsEdit",
					checked:false
				},{
					label:"JsViewEdit",
					value:"JsViewEdit",
					checked:false
				},{
					label:"JsConfig",
					value:"JsConfig",
					checked:false
				}],
				colspan:2
			},{}],[{
				id: "srcPath",
				label: "JAVA文件路径",
				type: "textfield",
				value:"/Users/guoqufeng/Projects/Gogs/app-spm/src/main/java/com/system",
				isNull: false,
				colspan:2
			},{}],[{
				id: "jsPath",
				label: "JS文件路径",
				type: "textfield",
				isNull: false,
				colspan:2
			},{}],[{
				id: "menuParentName",
				label: "父级菜单名称",
				type: "textfield",
				placeholder:"例如：系统管理",
				isNull: false
			},{
				id: "menuName",
				label: "菜单名称",
				type: "textfield",
				placeholder:"功能菜单title,例如：用户管理",
				isNull: false
			}],[{
				id: "packagePath",
				label: "JAVA包路径",
				type: "textfield",
				placeholder:"例如：com.system.SysMenu",
				isNull: false,
				blur:function(){
					$("#baseMsgForm #tableName").val($(this).val().substring($(this).val().lastIndexOf(".")+1));
				}
			},{
				id: "tableName",
				label: "数据库表名称",
				type: "textfield",
				placeholder:"例如：SysMenu",
				isNull: false
			}],[{
				id: "modelType",
				label: "模型类型",
				type: "select",
				value:"Base",
				options:[{id:"Base",name:"Base"},{id:"Super",name:"Super"},{id:"Tree",name:"Tree"}],
				isNull: false
			},{
				id:"cache",
				label:"是否使用缓存",
				labelAlign:"left",
				type:"checkbox"
			}],[{
				value:"名称，上级名称",
				id: "rapid",
				label: "快速通道",
				type: "textarea", 
				colspan:2,
				change:function(){
					var rows=$(this).val().replace(new RegExp("，","gm"),",").split(",");
					$(".sea_dropmain").empty();
					$(".sea_dropmain").append('<div style="width:100%;height:40px;margin: 8px 0;" class="sea_droper sea_droper_auto"><div class=" sea_drager sea_draglayout" style="width:100%; height: 38px;line-height:38px; margin: 0px;">	<div style="width:50%;border:0;" class="sea_droper "> </div>	<div style="width:50%; border:0" class="sea_droper"> </div></div></div>');
					for(var i=0;i<Math.ceil(rows.length/2);i++){
						var draglayout= $('<div class="sea_droper sea_droper_auto" style="width:100%;height:40px;margin: 8px 0;"><div class=" sea_drager sea_draglayout" style="width:100%; height: 38px;line-height:38px; margin: 0px;">	</div></div>').appendTo($(".sea_dropmain"));
						for(var j=0;j<2;j++){
							var label=$.trim(rows[i*2+j]);
							var col={
								id:label,
								"label":label,
								type:"textfield",
								"dataType":"String",
								componentType:"Input",
								componentProp:"",
								length:"100",
								"isNull":"true",
								"memo":label
							};
							if(label!=""){
								Ajax.post("ToolDictionary/getDic", {"label":label},function(rs) {
									var data=rs.data||{};
									col=$.extend(true,{},col,data);
								});
							}
							var component;
							if(col.type=="textfield"){
								component=$('<div class="sea_droper" style="width:50%; border:0"> <div class="sea_accordionLayout_groupItem sea_drager" style="width:100%;height: 36px; margin: 0px;"><label for="" style="background-color: transparent; width: 38.2%; text-align: right; padding-right: 5px;">Label</label><input type="text" class="sea_textfield" style="float: none; width:100%;height: 35px; width: 61.8%;"></div></div>').appendTo(draglayout.find(".sea_draglayout"));
								component=component.find(".sea_textfield").data("data",col);
							}else if(col.type=="textarea"){
								component=$('<div class="sea_droper" style="width:50%;border:0;"> <div class="sea_accordionLayout_groupItem sea_drager" rows="1" placeholder="多行文本" style="width: 462px; height: 36px; margin: 0px;"><label for="" style="width: 38.2%; text-align: right; padding-right: 5px; background-color: transparent;">Label</label><textarea class="sea_textarea" rows="1" cols="20" placeholder="多行文本" style="float: none; height: 35px; width: 61.8%;"></textarea></div></div>').appendTo(draglayout.find(".sea_draglayout"));
								component=component.find(".sea_textarea").data("data",col);
							}else if(col.type=="select"){
								component=$('<div class="sea_droper" style="width:50%;border:0;"> <div class="sea_accordionLayout_groupItem sea_drager" style="width: 462px; height: 36px; margin: 0px;"><label for="" style="width: 38.2%; text-align: right; padding-right: 5px; background-color: transparent;">Label</label><select class="sea_select" style="float: none; height: 35px; width: 61.8%;"><option value="">请选择</option></select></div></div>').appendTo(draglayout.find(".sea_draglayout"));
								component=component.find(".sea_select").data("data",col);
							}
							component.attr("id",col.id);
							component.attr("_id",col.id);
							component.attr("placeholder",col.id);
							component.parent().find("label").html(col.label);
						}
					}
					$(".sea_dropmain").append('<div style="width:100%;height:40px;margin: 8px 0;" class="sea_droper sea_droper_auto"><div class=" sea_drager sea_draglayout" style="width:100%; height: 38px;line-height:38px; margin: 0px;">	<div style="width:50%;border:0;" class="sea_droper "> </div>	<div style="width:50%; border:0" class="sea_droper"> </div></div></div>');
				}
			}],[{
				id: "ddl",
				label: "DDL",
				type: "textarea",
				colspan:2,
				rows:6
			}],[{
				type:"buttongroup",
				colspan:2,
				items: [{
					icon: "iconfont icon-shuaxin",
					value: "保存",
					css:{
						"padding":"0 12px!important"
					},
					click: function() {
						exec("update");
					}
				},{
					icon: "iconfont icon-edit",
					value: "运行",
					css:{
						"padding":"0 12px!important",
						background:"#28a745"
					},
					click: function() {
						exec("run");
					}
				},{
					icon: "iconfont icon-edit",
					value: "运行Table",
					css:{
						"padding":"0 12px!important",
						background:"#ffc107"
					},
					click: function() {
						exec("execTable");
					}
				}]
			}],[{
				id: "id",
				type: "hidden",
			}]]
		};
		BaseMsgForm = FormLayout.create(cfgForm);
		BaseMsgForm.val(_BaseMsgFormValue);
		return BaseMsgForm.layout;
	};
	var exec=function(action){
		if(BaseMsgForm.check()===false)return;
		Configs=$.extend(true,{},Configs,BaseMsgForm.val());
		Configs.fields=[];
		$(".sea_dropmain .sea_draglayout").each(function(){
			var fieldArr=[];
			$(this).find(".sea_accordionLayout_groupItem").each(function(){
				var data=$(this).find(".sea_button,.sea_textfield,.sea_textarea,.sea_select").data("data");
				if(data){
					if(data.id&&data.id!==""){
						if(Boolean.isChineseChar(data.id)){
							Dialog.alert("存在字段包含中文字符");
							return;
						}
						data._id=data.id;
						fieldArr.push(data);
						Ajax.post("ToolDictionary/save", data,function(rs) {
						});
					}
				}
			});
			if(fieldArr.length>0)Configs.fields.push(fieldArr);
		});
		if(action=="update" || action=="execTable"){
			Ajax.post(baseUrl + action, {"Configs":JSON.stringify(Configs)},function(rs) {
					Dialog.alert(rs.msg);
					ToolCgenGrid.reload({});
					rowClick(rs.data);
			});
		}else{
			Configs.cover="false";//覆盖
			Ajax.post(baseUrl + action, {"Configs":JSON.stringify(Configs)},function(rs) {
				if(rs.success=="true"){
					Dialog.alert(rs.msg);
					ToolCgenGrid.reload({});
				}else{
					var dialog=Dialog.confirm({
						content: rs.msg,
						confirmValue: "确定",
						confirm: function() {
							$(".sea_dialog").remove();
							Configs.cover="true";
							Ajax.post(baseUrl + action, {"Configs":JSON.stringify(Configs)},function(rs) {
								var menu='<li id="'+Configs.tableName+'" class="list-group-item"><a script="'+Configs.jsPath.substring(Configs.jsPath.indexOf("_static/")+"_static/".length,Configs.jsPath.indexOf(".js"))+'"href="#"><span class="iconfont icon-kehuguanli"></span>'+Configs.menuName+'</a></li>';
								Dialog.alert(menu);
								ToolCgenGrid.reload({});
								rowClick(rs.data);
							});
							return true;
						}
					});
				}
			});
		}
	};
	var getPropertyForm=function(me){
		if(me==null){
			me=$("<div>");
		}
		var cfgForm = {
				id:"property",
				title: "属性",
				items: [],
				css:{
					padding:"0"
				},
				cssInner:{
					padding:"0"
				}
			};
			if(!me.hasClass("sea_drager")){
				cfgForm.items.push([{
					id:"id",
					label: "ID",
					type: "textfield",
					placeholder: "ID",
					isNull: false,
					keyup:function(){
						me.attr("id",$("#property #id").val());
						me.attr("_id",$("#property #id").val());
						me.attr("placeholder",$("#property #id").val());
						me.val($("#property #id").val());
					},
					blur:function(){
						$("#btnSave a").click();
					}
				}]);
			   cfgForm.items.push([{
					id:"label",
					label: "标签",
					type: "textfield",
					placeholder: "标签",
					isNull: false,
					keyup:function(){
						me.prev("label").html($(this).val());
						$("#property #memo").val($(this).val());
					},
					blur:function(){
						$("#btnSave a").click();
					}
				}]);
			   if(me.hasClass("sea_select")){
				   cfgForm.items.push([{
						id:"options",
						label: "options",
						type: "textarea",
						rows:4,
						value: "[{id:\"\",name:\"\"},{id:\"\",name:\"\"},{id:\"\",name:\"\"}]",
						isNull: false,
						blur:function(){
							$("#btnSave a").click();
						}
					}]);
			   }
			   
			   cfgForm.items.push([{
					id:"dataType",
					label: "数据类型",
					type: "select",
					value:"String",
					options:[{id:"String","name":"String"},{id:"Integer","name":"Integer"},{id:"Long","name":"Long"},{id:"Double","name":"Double"},{id:"Boolean","name":"Boolean"},{id:"Date","name":"Date"}],
					blur:function(){
						$("#btnSave a").click();
						if($(this).val()=='String'){
							$("#property #length").val("100");
						}else if($(this).val()=='Integer'){
							$("#property #length").val("10");
						}else if($(this).val()=='Long'){
							$("#property #length").val("20");
						}else if($(this).val()=='Double'||$(this).val()=='Float'){
							$("#property #length").val("16,4");
						}else if($(this).val()=='Date'){
							$("#property #length").val("6");
						} 
					},
					change:function(){
						if($(this).val()=='String'){
							$("#property #length").val("100");
						}else if($(this).val()=='Integer'){
							$("#property #length").val("10");
						}else if($(this).val()=='Long'){
							$("#property #length").val("20");
						}else if($(this).val()=='Double'||$(this).val()=='Float'){
							$("#property #length").val("16,4");
						}else if($(this).val()=='Date'){
							$("#property #length").val("20");
						} 
					}
				}]);
			   cfgForm.items.push([{
					id:"componentType",
					label: "控件类型",
					type: "select",
					value:"Input",
					options:["AutoComplete","Checkbox","CheckGroup","Cascader","District","DatePicker","InputNumber","Input","Hidden",
					 "Mention", "Rate", "Radio", "Switch","Dic", "Select","Slider", "TextArea","TreeSelect", "Transfer", "TimePicker", "Tree","File"],
					blur:function(){
						$("#btnSave a").click();
					},
					change:function(){
						if($(this).val()=='Dic'){
							$("#property #componentProp").val("params={{app:\"app\",type:\"\"}}");
						}else if($(this).val()=='Select'){
							$("#property #componentProp").val("url=\"\" params={{}}");
						}else if($(this).val()=='DatePicker'){
							$("#property #componentProp").val("format=\"YYYY-MM-DD\"");
						}else if($(this).val()=='CheckGroup'){
							$("#property #componentProp").val("options={[\"item1\",\"item2\"]}");
						}
					}
				}]);
			   cfgForm.items.push([{
					id:"componentProp",
					label: "控件属性",
					type: "textarea",
					rows:2,
					blur:function(){
						$("#btnSave a").click();
					}
				}]);
			   cfgForm.items.push([{
					id:"length",
					label: "长度",
					type: "textfield",
					placeholder: "长度",
					value:100,
					isNull: false,
					blur:function(){
						$("#btnSave a").click();
					}
				}]);
			   cfgForm.items.push([{	
					id:"isNull",
					label: "isNull",
					type: "select",
					value:"true",
					options:[{id:"true","name":"true"},{id:"false","name":"false"}],
					blur:function(){
						$("#btnSave a").click();
					}
				}]);
			   cfgForm.items.push([{
					id:"colspan",
					label: "colspan",
					type: "textfield",
					value:1,
					isNull: true,
					blur:function(){
						$("#btnSave a").click();
					}
				}]);
			   cfgForm.items.push([{
					id:"memo",
					label: "备注",
					rows:2,
					type: "textarea",
					blur:function(){
						$("#btnSave a").click();
					}
				}]);
			}else{
				cfgForm.items.push([]);
			}
			cfgForm.items.push([{
				id:"btnSave",
				type: "buttonGroup",
				items:[{
					value : "保存",
					css:{
						"padding":"0 12px!important"
					},
					click : function(){
						 if(!formProperty.check()){
							    return;
						  }
						 me.attr("_id",me.attr("id"));
						 if($(".sea_dropmain").find("[_id='"+me.attr("id")+"']").length>1){
							 Dialog.alert( '已存在ID!');
							 return;
						 }
						 var data=formProperty.val();
						 data.type=me.attr("class").replace("sea_","");
						 me.data("data",data);
						 Ajax.post("ToolDictionary/save", data,function(rs) {
							 console.log("save ToolDictionary!");
						 });
					}
				},{
					type: "button",
					value : "删除",
					css:{
						"padding":"0 12px!important"
					},
					click : function(){
						if(me.hasClass("sea_drager")){ 
							me.remove();
						}else{
							me.parent().remove();
						}
						 Border.getEast().empty();
					}
				}]
			}]);
			formProperty=FormLayout.create(cfgForm);
			return formProperty;
	};
	var getPageDesign=function(parent){
		/** * 工具栏 ** */
//		var cfgToolbar = {
//			items: [{
//				icon: "iconfont icon-shuaxin",
//				value: "保存",
//				click: function() {
//					exec("update");
//				}
//			},{
//				icon: "iconfont icon-edit",
//				value: "运行",
//				click: function() {
//					exec("run");
//				}
//			/*value: "发布", value: "清空", value: "撤销", value: "重做", value: "主题", */
//			}]
//		};
//		var toolbar = Toolbar.create(cfgToolbar).toolbar;
		/** * 可选拖动列表 ** */
		var cfgAccordionLayout={
				items: [{
					items:[{
						type:"buttongroup",
						separatorWidth:"5px",
						items: [{
							icon: "iconfont icon-shuaxin",
							value: "保存",
							css:{
								"padding":"0 12px!important"
							},
							click: function() {
								exec("update");
							}
						},{
							icon: "iconfont icon-edit",
							value: "运行",
							css:{
								"padding":"0 12px!important",
								background:"rgb(22, 173, 35)"
							},
							click: function() {
								exec("run");
							}
						}]
					}]
					
				},{
					label:"布局设置",
					items:[{
						type: "layout",
						}]	
					},{
						label:"表单组件",
						cls:"sea_drag_only",
						items:[{
							label: "label",
					 		type: "textfield",
							cls:"sea_drager",
							css:{"float":"none","height":"35px"},
							placeholder:"单行文本"
						},{
							label: "label",
					 		type: "textarea",
					 		cls:"sea_drager",
					 		css:{"float":"none","height":"35px"},
							placeholder:"多行文本",
							rows:1
						},{
							label: "label",
					 		type: "select",
					 		cls:"sea_drager",
					 		css:{"float":"none","color":"#666","height":"35px"},
						},{
							value: "按钮",
					 		type: "button",
					 		cls:"sea_drager",
					 		css:{"float":"none","height":"38px","color":"#666","text-align":"center","font-weight":"500","border":0,"background-color":"#f4f4f4","width":"100%"},
						}]	
//					},{
//						label:"功能组件",
//						items:[]	
//					  },{
//						label:"场景/模板",
//						items:[]	
//					 },{
//						label:"第三方组件",
//						items:[]	
//					 },{
//						label:"应用扩展",
//							items:[]	
					 }]
		};
		accordionLayout=AccordionLayout.create(cfgAccordionLayout).layout;
		var Border=BorderLayout.create({
			horizontally:false,//水平居中
			vertically:false,//垂直居中
			"parent":parent,
//			north: {
//				height: 60,
//				item:toolbar,
//				css:{
//					"padding":"15px 15px 0 15px"
//				}
//			},
			west:{
				width:200,
				item:accordionLayout,
				css:{"overflow-y":"auto","padding":"7px 15px"}
			},east:{
				width:300,
				css:{"overflow-y":"auto","padding":"0 15px 0 15px"},
				item:getPropertyForm(null).layout
			},center:{
				item:"<div class='sea_dropmain' style='padding:0.3rem'></div>",
				css:{"overflow-y":"auto"}
			}
		});
		$(".sea_dropmain,.sea_drag_only").drop({
			width:"99%",
			initHtml:'<div class="sea_droper sea_droper_auto" style="width:100%;height:40px;margin: 8px 0;"><div class=" sea_drager sea_draglayout" style="width:100%; height: 38px;line-height:38px; margin: 0px;">	<div class="sea_droper" style="width:50%;border:0;"> <div class="sea_accordionLayout_groupItem sea_drager" style="width:100%;height: 36px; margin: 0px;"><label for="" style="background-color: transparent; width: 38.2%; text-align: right; padding-right: 5px;">Label</label><input type="text" class="sea_textfield" style="float: none;width:100%; height: 35px; width: 61.8%;" ></div></div>	<div class="sea_droper" style="width:50%; border:0"> <div class="sea_accordionLayout_groupItem sea_drager" style="width:100%;height: 36px; margin: 0px;"><label for="" style="background-color: transparent; width: 38.2%; text-align: right; padding-right: 5px;">Label</label><input type="text" class="sea_textfield" style="float: none; width:100%;height: 35px; width: 61.8%;" ></div></div></div></div>'+
						  '<div class="sea_droper sea_droper_auto" style="width:100%;height:40px;margin: 8px 0;"><div class=" sea_drager sea_draglayout" style="width:100%; height: 38px;line-height:38px; margin: 0px;">	<div class="sea_droper" style="width:50%;border:0;"> <div class="sea_accordionLayout_groupItem sea_drager" style="width:100%;height: 36px; margin: 0px;"><label for="" style="background-color: transparent; width: 38.2%; text-align: right; padding-right: 5px;">Label</label><input type="text" class="sea_textfield" style="float: none; width:100%;height: 35px; width: 61.8%;" ></div></div>	<div class="sea_droper" style="width:50%; border:0"> <div class="sea_accordionLayout_groupItem sea_drager" style="width:100%;height: 36px; margin: 0px;"><label for="" style="background-color: transparent; width: 38.2%; text-align: right; padding-right: 5px;">Label</label><input type="text" class="sea_textfield" style="float: none; width:100%;height: 35px; width: 61.8%;" ></div></div></div></div>'+
						  '<div class="sea_droper sea_droper_auto" style="width:100%;height:40px;margin: 8px 0;"><div class=" sea_drager sea_draglayout" style="width:100%; height: 38px;line-height:38px; margin: 0px;">	<div class="sea_droper" style="width:50%;border:0;"> <div class="sea_accordionLayout_groupItem sea_drager" style="width:100%;height: 36px; margin: 0px;"><label for="" style="background-color: transparent; width: 38.2%; text-align: right; padding-right: 5px;">Label</label><input type="text" class="sea_textfield" style="float: none; width:100%;height: 35px; width: 61.8%;" ></div></div>	<div class="sea_droper" style="width:50%; border:0"> <div class="sea_accordionLayout_groupItem sea_drager" style="width:100%;height: 36px; margin: 0px;"><label for="" style="background-color: transparent; width: 38.2%; text-align: right; padding-right: 5px;">Label</label><input type="text" class="sea_textfield" style="float: none; width:100%;height: 35px; width: 61.8%;" ></div></div></div></div>'+
						  '<div class="sea_droper sea_droper_auto" style="width:100%;height:40px;margin: 8px 0;"><div class=" sea_drager sea_draglayout" style="width:100%; height: 38px;line-height:38px; margin: 0px;">	<div class="sea_droper" style="width:50%;border:0;"> <div class="sea_accordionLayout_groupItem sea_drager" style="width:100%;height: 36px; margin: 0px;"><label for="" style="background-color: transparent; width: 38.2%; text-align: right; padding-right: 5px;">Label</label><input type="text" class="sea_textfield" style="float: none; width:100%;height: 35px; width: 61.8%;" ></div></div>	<div class="sea_droper" style="width:50%; border:0"> <div class="sea_accordionLayout_groupItem sea_drager" style="width:100%;height: 36px; margin: 0px;"><label for="" style="background-color: transparent; width: 38.2%; text-align: right; padding-right: 5px;">Label</label><input type="text" class="sea_textfield" style="float: none; width:100%;height: 35px; width: 61.8%;" ></div></div></div></div>'+
						  '<div class="sea_droper sea_droper_auto" style="width:100%;height:40px;margin: 8px 0;"><div class=" sea_drager sea_draglayout" style="width:100%; height: 38px;line-height:38px; margin: 0px;">	<div class="sea_droper" style="width:50%;border:0;"> <div class="sea_accordionLayout_groupItem sea_drager" style="width:100%;height: 36px; margin: 0px;"><label for="" style="background-color: transparent; width: 38.2%; text-align: right; padding-right: 5px;">Label</label><input type="text" class="sea_textfield" style="float: none; width:100%;height: 35px; width: 61.8%;" ></div></div>	<div class="sea_droper" style="width:50%; border:0"> <div class="sea_accordionLayout_groupItem sea_drager" style="width:100%;height: 36px; margin: 0px;"><label for="" style="background-color: transparent; width: 38.2%; text-align: right; padding-right: 5px;">Label</label><input type="text" class="sea_textfield" style="float: none; width:100%;height: 35px; width: 61.8%;" ></div></div></div></div>'+
						  '<div class="sea_droper sea_droper_auto" style="width:100%;height:40px;margin: 8px 0;"><div class=" sea_drager sea_draglayout" style="width:100%; height: 38px;line-height:38px; margin: 0px;">	<div class="sea_droper" style="width:50%;border:0;"> <div class="sea_accordionLayout_groupItem sea_drager" style="width:100%;height: 36px; margin: 0px;"><label for="" style="background-color: transparent; width: 38.2%; text-align: right; padding-right: 5px;">Label</label><input type="text" class="sea_textfield" style="float: none; width:100%;height: 35px; width: 61.8%;" ></div></div>	<div class="sea_droper" style="width:50%; border:0"> <div class="sea_accordionLayout_groupItem sea_drager" style="width:100%;height: 36px; margin: 0px;"><label for="" style="background-color: transparent; width: 38.2%; text-align: right; padding-right: 5px;">Label</label><input type="text" class="sea_textfield" style="float: none; width:100%;height: 35px; width: 61.8%;" ></div></div></div></div>'+
						  '<div class="sea_droper sea_droper_auto" style="width:100%;height:40px;margin: 8px 0;"><div class=" sea_drager sea_draglayout" style="width:100%; height: 38px;line-height:38px; margin: 0px;">	<div class="sea_droper" style="width:50%;border:0;"> <div class="sea_accordionLayout_groupItem sea_drager" style="width:100%;height: 36px; margin: 0px;"><label for="" style="background-color: transparent; width: 38.2%; text-align: right; padding-right: 5px;">Label</label><input type="text" class="sea_textfield" style="float: none; width:100%;height: 35px; width: 61.8%;" ></div></div>	<div class="sea_droper" style="width:50%; border:0"> <div class="sea_accordionLayout_groupItem sea_drager" style="width:100%;height: 36px; margin: 0px;"><label for="" style="background-color: transparent; width: 38.2%; text-align: right; padding-right: 5px;">Label</label><input type="text" class="sea_textfield" style="float: none; width:100%;height: 35px; width: 61.8%;" ></div></div></div></div>'+
						  '<div class="sea_droper sea_droper_auto" style="width:100%;height:40px;margin: 8px 0;"><div class=" sea_drager sea_draglayout" style="width:100%; height: 38px;line-height:38px; margin: 0px;">	<div class="sea_droper" style="width:50%;border:0;"> <div class="sea_accordionLayout_groupItem sea_drager" style="width:100%;height: 36px; margin: 0px;"><label for="" style="background-color: transparent; width: 38.2%; text-align: right; padding-right: 5px;">Label</label><input type="text" class="sea_textfield" style="float: none; width:100%;height: 35px; width: 61.8%;" ></div></div>	<div class="sea_droper" style="width:50%; border:0"> <div class="sea_accordionLayout_groupItem sea_drager" style="width:100%;height: 36px; margin: 0px;"><label for="" style="background-color: transparent; width: 38.2%; text-align: right; padding-right: 5px;">Label</label><input type="text" class="sea_textfield" style="float: none; width:100%;height: 35px; width: 61.8%;" ></div></div></div></div>'+
						  '<div class="sea_droper sea_droper_auto" style="width:100%;height:40px;margin: 8px 0;"><div class=" sea_drager sea_draglayout" style="width:100%; height: 38px;line-height:38px; margin: 0px;">	<div class="sea_droper" style="width:50%;border:0;"> <div class="sea_accordionLayout_groupItem sea_drager" style="width:100%;height: 36px; margin: 0px;"><label for="" style="background-color: transparent; width: 38.2%; text-align: right; padding-right: 5px;">Label</label><input type="text" class="sea_textfield" style="float: none; width:100%;height: 35px; width: 61.8%;" ></div></div>	<div class="sea_droper" style="width:50%; border:0"> <div class="sea_accordionLayout_groupItem sea_drager" style="width:100%;height: 36px; margin: 0px;"><label for="" style="background-color: transparent; width: 38.2%; text-align: right; padding-right: 5px;">Label</label><input type="text" class="sea_textfield" style="float: none; width:100%;height: 35px; width: 61.8%;" ></div></div></div></div>'+
						  '<div class="sea_droper sea_droper_auto" style="width:100%;height:40px;margin: 8px 0;"><div class=" sea_drager sea_draglayout" style="width:100%; height: 38px;line-height:38px; margin: 0px;">	<div class="sea_droper" style="width:50%;border:0;"> <div class="sea_accordionLayout_groupItem sea_drager" style="width:100%;height: 36px; margin: 0px;"><label for="" style="background-color: transparent; width: 38.2%; text-align: right; padding-right: 5px;">Label</label><input type="text" class="sea_textfield" style="float: none; width:100%;height: 35px; width: 61.8%;" ></div></div>	<div class="sea_droper" style="width:50%; border:0"> <div class="sea_accordionLayout_groupItem sea_drager" style="width:100%;height: 36px; margin: 0px;"><label for="" style="background-color: transparent; width: 38.2%; text-align: right; padding-right: 5px;">Label</label><input type="text" class="sea_textfield" style="float: none; width:100%;height: 35px; width: 61.8%;" ></div></div></div></div>'+
						  '<div style="width:100%;height:40px;margin: 8px 0;" class="sea_droper sea_droper_auto"><div class=" sea_drager sea_draglayout" style="width:100%; height: 38px;line-height:38px; margin: 0px;">	<div style="width:50%;border:0;" class="sea_droper "> </div>	<div style="width:50%; border:0" class="sea_droper"> </div></div></div>'+
						  '<div style="width:100%;height:40px;margin: 8px 0;" class="sea_droper sea_droper_auto"><div class=" sea_drager sea_draglayout" style="width:100%; height: 38px;line-height:38px; margin: 0px;">	<div style="width:50%;border:0;" class="sea_droper "> </div>	<div style="width:50%; border:0" class="sea_droper"> </div></div></div>'+
						  '<div style="width:100%;height:40px;margin: 8px 0;" class="sea_droper sea_droper_auto"><div class=" sea_drager sea_draglayout" style="width:100%; height: 38px;line-height:38px; margin: 0px;">	<div style="width:50%;border:0;" class="sea_droper "> </div>	<div style="width:50%; border:0" class="sea_droper"> </div></div></div>'
		});
		$(".sea_dropmain").delegate(".sea_drager,.sea_button,.sea_textfield,.sea_textarea,.sea_select","click",function(){
			var  me=$(this);
			Border.getEast().empty();
				formProperty=getPropertyForm(me);
				var data=me.data("data");
				if(data&&data.label!=""){
					Ajax.post("ToolDictionary/getDic", {"label":data.label},function(rs) {
						if(rs.data.id)data.id=rs.data.id;
					});
				}
				formProperty.val(data);
				Border.getEast().append(formProperty.layout);
				formProperty.focus("id");
				return false;
		});
		return Border.layout;
	};
	
	
	// 创建表格
	var getToolCgenGrid = function() {
		var cfgGrid = {
			title:"集成开发管理",
			isFlow:false,
			indexColumn:false,
			css:{
				"padding":"0.8rem"
			},
			columns: [{
				id: "id",
				align: "center",
				width: 40,
				format: "checkbox"
			},{
				id: "tableName",
				label: "表名称",
				width: 130
			},{
				id: "entityName",
				label: "实体类名称",
				width: 150,
				hide:true
			},{
				id: "fields",
				label: "字段列表",
				hide:true
			},{
				id: "basePathSrc",
				label: "基本路径",
				hide:true
			},{
				id: "packagePath",
				label: "代码包路径",
				hide:true
			},{
				id: "baseUrl",
				label: "基本Url",
				hide:true
			},{
				id: "entityType",
				label: "实体类型",
				hide:true
			},{
				id: "menuName",
				label: "菜单名称"
			},{
				id: "menuParentName",
				label: "父菜单名称",
				hide:true
			},{
				id: "jsOptions",
				label: "jsOptions",
				hide:true
			},{
				id: "javaOptions",
				label: "javaOptions",
				hide:true
			},{
				id: "ddl",
				label: "ddl",
				hide:true
			}],
			url: "ToolCgen/list",
			pagerMode:"simple",
			toolbar:{
				css:{
					"padding-left":"10px"
				},
				refresh:false,
				add:false,
				edit:false,
				view:false,
				"delete":true,
				"export":false,
				"copy":true,
//				items:[{
//					value:"<i class='iconfont icon-xinzeng'>新建</i>",
//					click:function(){
//						BaseMsgForm.val(_BaseMsgFormValue);
//					}
//				}],
				onCopy:function(selected){return true;}
			},
			rowClick:function(record){
				rowClick(record);
			}
		};
		ToolCgenGrid = Grid.create(cfgGrid);
		return ToolCgenGrid.grid;
	};
	/***************函数调用***************/
	// 创建Tab
	var getTab = function(){
		var cfgTab = {
			id:"tablayout",
			top:60,
			css:{"width":"100%","height":"100%"},
			items:[{
				id:"baseMsgForm",
				title:"基本属性",
				icon:"iconfont icon-liebiao",
				content:getBaseMsgForm()
			},{
				id:"pageDesign",
				title : "页面设计",
				icon:"iconfont icon-edit",
				content:""
			}]
		};
		Tab = TabLayout.create(cfgTab);
		return Tab.layout;
	};
	//创建页面布局
	BorderLayout.create({
		west:{	
			width:270,
			item:getToolCgenGrid()
		},
		center: {
			css:{"color":"#222","padding":"0 0.8rem"},
			item: getTab()
		}
	});
	getPageDesign($(Tab.content[1]));
//	$("#rapid").change(); 
	var timer=setInterval(function(){
		if($(".sea_button").length>0 && $("button").length>0 ){
			$(".sea_button").css("padding","0 12px");
			$("button").css("padding","0 12px");
			clearInterval(timer);
		}
	},100);
	
});