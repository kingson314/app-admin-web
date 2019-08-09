define(function(require, exports, module) {
	/** * 模块外部依赖 ** */
	var Component = require("Component");
	//require.async(("./css/tree.css");
	require("Jztree");
	/** * 模块私有数据 ** */
	var defaults = {
			id : "tree",
			cls : "",
			css : "",
			treeId: "",
			treeObj: null,
			nodeData:null,//静态数据
			async: {
				autoParam: [],
				//contentType: "application...",
				dataFilter: null,
				dataType : "json",
				enable : true,
				otherParam: [],
				type: "post",
				url: ""
			},			
			callback: {
				beforeAsync: null,
				beforeCheck: null,
				beforeClick: null,
				beforeCollapse: null,
				beforeDblClick: null,
				beforeDrag: null,
				beforeDragOpen: null,
				beforeDrop: null,
				beforeEditName: null,
				beforeExpand: null,
				beforeMouseDown: null,
				beforeMouseUp: null,
				beforeRemove: null,
				beforeRename: null,
				beforeRightClick: null,
				onAsyncError: null,
				onAsyncSuccess: null,
				onCheck: null,
				onClick: null,
				onCollapse: null,
				onDblClick: null,
				onDrag: null,
				onDragMove: null,
				onDrop: null,
				onExpand: null,
				onMouseDown: null,
				onMouseUp: null,
				onNodeCreated: null,
				onRemove: null,
				onRename: null,
				onRightClick: null
			},
			check: {
				autoCheckTrigger: false,
				chkboxType: {
					"Y": "ps",
					"N": "ps"
				},
				chkStyle: "checkbox",
				enable: false,
				nocheckInherit: false,
				chkDisabledInherit: false,
				radioType: "level"
			},
			data: {
				keep: {
					leaf: false,
					parent: false
				},
				key: {
					checked: "checked",
					children: "children",
					name: "name",
					title: "",
					url: "url"
				},
				simpleData: {
					enable : true,
					idKey : "id",
					pIdKey : "parentId",
					rootPId : "root"
				}
			},
			edit: {
				drag : {
					autoExpandTrigger : true,
					isCopy : true,
					isMove : true,
					prev : true,
					next : true,
					inner : true,
					borderMax : 10,
					borderMin : -5,
					minMoveSize : 5,
					maxShowNodeNum : 5,
					autoOpenTime : 500
				},
				editNameSelectAll : true,
				enable : true,
				removeTitle : "remove",
				renameTitle : "rename",
				showRemoveBtn : false,
				showRenameBtn : false
			},
			view: {
				addDiyDom: null,
				addHoverDom: null,
				autoCancelSelected: true,
				dblClickExpand: true,
				expandSpeed: "fast",
				fontCss: {},
				nameIsHTML: false,
				removeHoverDom: null,
				selectedMulti: true,
				showIcon: true,
				showLine: true,
				showTitle: true,
				txtSelectedEnable: false
			}
		};

	/** * 模块私有方法 ** */
	var self = {
		init : function(me) {
			me.tree=$("<ul id='"+me.configs.id+"' class='ztree'></ul>");
			if(me.configs.nodeData){
				delete me.configs.async;
				$.fn.zTree.init(me.tree, me.configs,me.configs.nodeData);
			}else{
				$.fn.zTree.init(me.tree, me.configs);
			}
			var interval=setInterval(function(){
				if($("#"+me.configs.id).length>0){
					me.treeObj=me.getTree();
					clearInterval(interval);
				}
			},100);
		}
	};
	/** * 类定义 ** */
	var Tree = function(configs) {
		// 类的属性定义
		this.configs = $.extend(true, {}, defaults, configs);
		// 初始化
		self.init(this);
	};
	// 类公共方法
	Tree.prototype = {
		getTree:function(){
	 		return $.fn.zTree.getZTreeObj(this.configs.id);
		},
		refresh:function(){
			var nodes = this.treeObj.getNodes();
			for (var i = nodes.length - 1; i >= 0; i--) {
				this.treeObj.removeNode(nodes[i]);
			}
			this.treeObj.reAsyncChildNodes();
		},
		expandAll:function(flag){
			this.treeObj.expandAll(flag);
		},
		expandNode:function(node){
			this.treeObj.expandNode(node);
		},
		getSelectedNodes:function(){
			return this.treeObj.getSelectedNodes()
		},
		addNodes:function(parentNode,node){
			return this.treeObj.addNodes(parentNode,node);
		},
		editName:function(node){
			this.treeObj.editName(node);
		},
		removeNode:function(node){
			this.treeObj.removeNode(node);
		},
		getCheckedNodes:function(flag){
			return this.treeObj.getCheckedNodes(flag);
		}
	};
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new Tree(configs);
	};

});
