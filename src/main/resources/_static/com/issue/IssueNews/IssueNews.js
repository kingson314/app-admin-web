seajs.use(["BorderLayout", "FormLayout", "ViewLayout", "Dialog", "Grid", "Ajax", "Component", "Array"],
function(BorderLayout, FormLayout, ViewLayout, Dialog, Grid, Ajax,Component,Array) {
	/***************变量定义***************/
	var _title='新闻发布',_baseUrl = "IssueNews/";
	var _currentId,_grid,_dialog,_formQuery,_formEdit;
	/***************函数定义***************/
//	var getFormQuery = function() {
//		var cfgForm = {
//			id:"formQuery",
//			items: [[{
//				id: "type",
//				label: "类型",
//				type: "textfield",
////				params:{
////					app:"system",
////					type:"newsType"
////				},
////				isNull:false,
////				
////				change:function(){
////					if (_formQuery.check()) {
////						_grid.reload(_formQuery.val());
////					}
////				}
//			},{
//				type: "buttongroup",
//				items: [{
//					icon: "iconfont icon-search",
//					css:{"text-align":"left","padding-left":"20px"},
//					value: "查询",
//					click: function() {
//						if (_formQuery.check()) {
//							_grid.reload(_formQuery.val());
//						}
//					}
//				}]
//			}]]
//		};
//		_formQuery=FormLayout.create(cfgForm);
//		return _formQuery.formLayout;
//	};
	var cfgForm = {
		id: "formEdit",
		items: [[{
			id: "type",
			label: "类型",
			isNull:false,
			type: "dic",
			params:{
				app:"system",
				type:"newsType"
			}
		},{
			id: "subType",
			label: "子类型",
			type: "textfield",
			maxLen: "1000"
		}],[{
			id: "source",
			label: "来源",
			type: "textfield",
			maxLen: "1000"
		},{
			id: "mark",
			label: "标识",
			type: "textfield",
			limit: "char"
		}],[{
			id: "title",
			label: "标题",
			type: "textfield",
			isNull:false,
			maxLen: "1000",
			colspan:2
		},{}],[{
//////			id: "originalTitle",
//////			label: "原标题",
//////			type: "textfield",
//////			maxLen: "1000",
//////			colspan:2
//////		}],[{
//////			id: "subTitle",
//////			label: "副标题",
//////			type: "textfield",
//////			maxLen: "1000",
//////			colspan:2
		}],[{
			id: "summary",
			label: "摘要",
			type: "textarea",
			maxLen: "4000",
			colspan:2
		}],[{
			id: "newsTime",
			label: "新闻时间",
			type: "date",
			format:"YYYY-MM-DD",
			limit:"date"
		},{
			id: "editor",
			label: "责任编辑",
			type: "textfield",
			maxLen: "100"
		}],[{
			id: "content",
			label: "内容",
			type: "ueditor",
			colspan:2,
			css:{
				display:"none"
			}
		}],[{
			id: "coverUrl",
			label: "缩略图",
			type:"file",
			colspan:2
		}],[{
			id: "contentUrl",
			label: "网址",
			type: "textfield",
			maxLen: "1000",
			colspan:2
//		}],[{
//			id: "cntFavorite",
//			label: "收藏数",
//			type: "textfield",
//			maxLen: "10"
//		},{
//			id: "cntShare",
//			label: "分享数",
//			type: "textfield",
//			maxLen: "10"
//		}],[{
//			id: "cntClick",
//			label: "点击数",
//			type: "textfield",
//			maxLen: "10"
//		},{
//			id: "cntComment",
//			label: "评论数",
//			type: "textfield",
//			maxLen: "10"
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
	var getGrid = function() {
		var cfgGrid = {
			title:_title,
			url: _baseUrl,
			params:{
				type:"-1"
			},
			toolbar: {
				items:[{
					icon: "iconfont icon-publish1",
					value: "发布",
					click: function() {
//						var selected =_grid.getSelected();
//						var params={
//							id: selected
//						};
//						Ajax.post(_baseUrl+"publish",params,function(rs) {
//							Dialog.alert(rs.msg);
//							_grid.reload(_formQuery.val());
//						});
					}
				},{
					id: "search-title",
					placeholder:"请输入标题",
					type: "textfield",
					width:"300",
					icon:"iconfont icon-find",
					iconCss:{
						"background-color":"#28B779"
					},
					cssLi:{
						"float":"right"
					},
					click:function(){
						_grid.reload({"title":$("#search-title").val(),"type":$("#search-type").val()});
					}
				},{
					id: "search-type",
					nullText:"请选择类型",
					type:"dic",
					params:{
						app:"system",
						type:"newsType"
					},
					width:"150",
					cssLi:{
						"float":"right",
						"margin-right":"10px"
					}
				}],
				onAdd: function(record, selected) {
//					if(_formQuery.check()==false){
//						Dialog.alert("请选择类型");
//						return;
//					}
//					record={
//						type:$("#formQuery #type").val()
//					};
					Component.onAdd(_grid,_dialog,_formEdit,_formQuery,_title,_baseUrl,getFormEdit,record,Dialog);
				},
				onEdit: function(record, selected) {
					if(_formQuery.check()==false){
						Dialog.alert("请选择类型");
						return;
					}
					Component.onEdit(_grid,_dialog,_formEdit,_formQuery,_title,_baseUrl,getFormEdit,record,Dialog,Array,_currentId);
				},
				onView: function(record, selected) {
					if(_formQuery.check()==false){
						Dialog.alert("请选择类型");
						return;
					}
					Component.onView(_grid,_dialog,_title,getFormView,record,Dialog,Array,_currentId);
				}
			}
		};
		_grid = Grid.create(Component.getCfgGrid(cfgGrid,cfgForm));
		return _grid.grid;
	};
	/***************函数调用***************/
	BorderLayout.create({
//		north: {
//			height: 60,
//			item: getFormQuery()
//		},
		center: {
			item: getGrid()
		}
	});
});