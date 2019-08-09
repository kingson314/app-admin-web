define(function(require, exports, module) {
	/*** 模块外部依赖 ***/
	var String = require("String");
	var Component = require("Component");

	/*** 模块私有数据 ***/
	var ClassName="sea_borderLayout";
	//默认配置
	var defaults = {
		parent: "body",// 父元素，默认为body
		id: "",
		width: "100%",
		height: "100%",
		cls: "",
		resize:true,
		css: {
			"position": "absolute",
			"margin":"0 auto",
			"padding":"0",
			"box-sizing": "border-box",
			"overflow": "hidden"
		},
		horizontally:false,//水平居中
		vertically:false,//垂直居中
		attr: {},
		events: {
			click: null,
			change: null
		},
		//高度，宽度单位必须为数字
		// north : {
		// height : 100,
		// north : {},
		// east : {},
		// south : {},
		// west : {},
		// center : {}
		// },
		// east : {
		// width : 100
		// },
		// south : {
		// height : 100
		// },
		// west : {
		// width : 100
		// },
		center: {}
	};
	/*** 模块化私有方法 ***/
	var self = {
		//初始化
		init: function(parent, configs) {
			Component.attr(parent, configs);
			Component.css(parent,configs);
			parent.addClass(configs.cls);
			var parentHeight = parent.height();
			var northHeight = configs.north && Component.getSize(configs.north.height,parentHeight)||0;
			var southHeight = configs.south && Component.getSize(configs.south.height,parentHeight)||0;
			var centerHeight = parentHeight - northHeight - southHeight;

			var parentWidth = parent.width();
			var westWidth = configs.west && Component.getSize(configs.west.width,parentWidth)||0;
			var eastWidth = configs.east && Component.getSize(configs.east.width,parentWidth)||0;
			var centerWidth = parentWidth - westWidth - eastWidth;

			var left=0,right=0,top=0,bottom=0;
			if(configs.horizontally==true){//水平居中
				 left=($(document).width()-parentWidth)*0.5;
				 right=left;
			}
			if(configs.vertically==true){//垂直居中
				top=($(document).height()-parentHeight)*0.5;
				bottom=top;
			}	
			var block = null;
			for (var key in configs) {
				if (!key) continue;
				var val = configs[key];
				switch (key.toLowerCase()) {
				case "north":
					block = $("<div></div>").css({
						"top": top,
						"left": left,
						"height": val.height,
						"width": parentWidth
					});
					break;
				case "east":
					block = $("<div></div>").css({
						"top": northHeight+top,
						"right": -right,
						"height": centerHeight,
						"width": val.width
					});
					break;
				case "south":
					block = $("<div></div>").css({
						"bottom": -bottom,
						"left": left,
						"height": val.height,
						"width": parentWidth
					});
					break;
				case "west":
					block = $("<div></div>").css({
						"top": northHeight+top,
						"left": left,
						"height": centerHeight,
						"width": val.width
					});
					break;
				case "center":
					block = $("<div></div>").css({
						"top": northHeight+top,
						"left": westWidth+left,
						"height": centerHeight,
						"width": centerWidth
					});
					break;
				default:
					break;
				}
				if (block) {
					val.id = ClassName + Global.getSeq();
					block.attr("id", val.id).css({
						"position": "absolute",
						"box-sizing": "border-box",
						"margin": "0"
					}).addClass(ClassName + "_" + key).appendTo(parent);
					Component.css(block,val);
					Component.attr(block,val);
					Component.addClass(block,val);
				}
				if (val) {
					if (val.north || val.east || val.south || val.east || val.center) {
						self.init(block, val);
					} else if(val.item) {
						block.append(val.item);
					}
				}
			}
		},
		//界面布局重置
		resize: function(parent, configs) {
			var parentHeight = parent.height();
			var northHeight = configs.north && Component.getSize(configs.north.height,parentHeight)||0;
			var southHeight = configs.south && Component.getSize(configs.south.height,parentHeight)||0;
			var centerHeight = parentHeight - northHeight - southHeight;

			var parentWidth = parent.width();
			var westWidth = configs.west && Component.getSize(configs.west.width,parentWidth)||0;
			var eastWidth = configs.east && Component.getSize(configs.east.width,parentWidth)||0;
			var centerWidth = parentWidth - westWidth - eastWidth;
			
			var left=0,right=0,top=0,bottom=0;
			if(configs.horizontally==true){//水平居中
				 left=($(document).width()-parentWidth)*0.5;
				 right=left;
			}
			if(configs.vertically==true){//垂直居中
				top=($(document).height()-parentHeight)*0.5;
				bottom=top;
			}	
			var block = null;
			for (var key in configs) {
				if (!key) continue;
				var val = configs[key];
				switch (key.toLowerCase()) {
				case "north":
					block = $("#" + val.id).css({
						"top": top,
						"left": left,
						"height": val.height,
						"width": parentWidth
					});
					break;
				case "east":
					block = $("#" + val.id).css({
						"top": northHeight+top,
						"right": -right,
						"height": centerHeight,
						"width": val.width
					});
					break;
				case "south":
					block = $("#" + val.id).css({
						"bottom": -bottom,
						"left": left,
						"height": val.height,
						"width": parentWidth
					});
					break;
				case "west":
					block = $("#" + val.id).css({
						"top": northHeight+top,
						"left": left,
						"height": centerHeight,
						"width": val.width
					});
					break;
				case "center":
					block = $("#" + val.id).css({
						"top": northHeight+top,
						"left": westWidth+left,
						"height": centerHeight,
						"width": centerWidth
					});
					break;
				default:
					break;
				}
				if (val) {
					if (val.north || val.east || val.south || val.east || val.center) {
						self.resize(block, val);
					}
				}
			}
		}
	};
	/** * 类定义 ** */
	var BorderLayout = function(configs) {
		// 类属性定义
		this.configs = $.extend(true, {},defaults, configs);
		if ($.type(this.configs.parent) == "string") {
			this.parent = $(this.configs.parent);
		} else {
			this.parent = this.configs.parent;
		}
		self.init(this.parent, this.configs);
		var me = this;
		if(me.configs.resize==true){
			$(window).resize(function() {
				self.resize(me.parent, me.configs);
			});
		}
	};

	// 类公共方法
	BorderLayout.prototype = {
		getNorth: function(configs) {
			var me=this;
			var block;
			if (!configs) configs = this.configs;
			for (var key in configs) {
				if (!key) continue;
				block = null;
				switch (key.toLowerCase()) {
				case "north":
					var val = configs[key];
					block = $("#" + val.id);
					if (val) {
						if (val.north) {
							block.getNorth = function() {
								return me.getNorth(val);
							};
						}
						if (val.west) {
							block.getWest = function() {
								return me.getWest(val);
							};
						}
						if (val.south) {
							block.getSouth = function() {
								return me.getSouth(val);
							};
						}
						if (val.east) {
							block.getEast = function() {
								return me.getEast(val);
							};
						}
						if (val.center) {
							block.getCenter = function() {
								return me.getCenter(val);
							};
						}
					}
					break;
				default:
					break;
				}
				if (block) {
					break;
				}
			}
			return block;
		},
		getWest: function(configs) {
			var me=this;
			var block;
			if (!configs) configs = this.configs;
			for (var key in configs) {
				if (!key) continue;
				block = null;
				switch (key.toLowerCase()) {
				case "west":
					var val = configs[key];
					block = $("#" + val.id);
					if (val) {
						if (val.north) {
							block.getNorth = function() {
								return me.getNorth(val);
							};
						}
						if (val.west) {
							block.getWest = function() {
								return me.getWest(val);
							};
						}
						if (val.south) {
							block.getSouth = function() {
								return me.getSouth(val);
							};
						}
						if (val.east) {
							block.getEast = function() {
								return me.getEast(val);
							};
						}
						if (val.center) {
							block.getCenter = function() {
								return me.getCenter(val);
							};
						}
					}
					break;
				default:
					break;
				}
				if (block) {
					break;
				}
			}
			return block;
		},
		getSouth: function(configs) {
			var me=this;
			var block;
			if (!configs) configs = this.configs;
			for (var key in configs) {
				if (!key) continue;
				block = null;
				switch (key.toLowerCase()) {
				case "south":
					var val = configs[key];
					block = $("#" + val.id);
					if (val) {
						if (val.north) {
							block.getNorth = function() {
								return me.getNorth(val);
							};
						}
						if (val.west) {
							block.getWest = function() {
								return me.getWest(val);
							};
						}
						if (val.south) {
							block.getSouth = function() {
								return me.getSouth(val);
							};
						}
						if (val.east) {
							block.getEast = function() {
								return me.getEast(val);
							};
						}
						if (val.center) {
							block.getCenter = function() {
								return me.getCenter(val);
							};
						}
					}
					break;
				default:
					break;
				}
				if (block) {
					break;
				}
			}
			return block;
		},
		getEast: function(configs) {
			var me=this;
			var block;
			if (!configs) configs = this.configs;
			for (var key in configs) {
				if (!key) continue;
				block = null;
				switch (key.toLowerCase()) {
				case "east":
					var val = configs[key];
					block = $("#" + val.id);
					if (val) {
						if (val.north) {
							block.getNorth = function() {
								return me.getNorth(val);
							};
						}
						if (val.west) {
							block.getWest = function() {
								return me.getWest(val);
							};
						}
						if (val.south) {
							block.getSouth = function() {
								return me.getSouth(val);
							};
						}
						if (val.east) {
							block.getEast = function() {
								return me.getEast(val);
							};
						}
						if (val.center) {
							block.getCenter = function() {
								return me.getCenter(val);
							};
						}
					}
					break;
				default:
					break;
				}
				if (block) {
					break;
				}
			}
			return block;
		},
		getCenter: function(configs) {
			var me=this;
			var block;
			if (!configs) configs = this.configs;
			for (var key in configs) {
				if (!key) continue;
				block = null;
				switch (key.toLowerCase()) {
				case "center":
					var val = configs[key];
					block = $("#" + val.id);
					if (val) {
						if (val.north) {
							block.getNorth = function() {
								return me.getNorth(val);
							};
						}
						if (val.west) {
							block.getWest = function() {
								return me.getWest(val);
							};
						}
						if (val.south) {
							block.getSouth = function() {
								return me.getSouth(val);
							};
						}
						if (val.east) {
							block.getEast = function() {
								return me.getEast(val);
							};
						}
						if (val.center) {
							block.getCenter = function() {
								return me.getCenter(val);
							};
						}
					}
					break;
				default:
					break;
				}
				if (block) {
					break;
				}
			}
			return block;
		},
		check: function(configs) {
			configs = $.extend(true, {},defaults, configs);
			var parent = null;
			if ($.type(configs.parent) == "string") {
				parent = $(this.configs.parent);
			} else {
				parent = this.configs.parent;
			}
			if (parent.length < 0) {
				alert("请配置正确的parent选择器");
				return false;
			}
			var rs = true;
			for (var key in configs) {
				if (!key) continue;
				switch (key.toLowerCase()) {
				case "north":
					if (String.isBlank(configs.north.height)) {
						alert("请配置：" + key + ".height");
						rs = false;
					}
					break;
				case "west":
					if (String.isBlank(configs.west.width)) {
						alert("请配置：" + key + ".width");
						rs = false;
					}
					break;
				case "south":
					if (String.isBlank(configs.south.height)) {
						alert("请配置：" + key + ".height");
						rs = false;
					}
					break;
				case "east":
					if (String.isBlank(configs.east.width)) {
						alert("请配置：" + key + ".width");
						rs = false;
					}
					break;

				default:
					break;
				}
				if (rs == false) {
					break;
				} else {
					var val = configs[key];
					if (val) {
						if (val.north || val.east || val.south || val.east || val.center) {
							rs = this.check(val);
						}
					}
				}
			}
		}
	};
		/** *输出类对象 ** */
		exports.create = function(configs) {
			return new BorderLayout(configs);
		};
	});