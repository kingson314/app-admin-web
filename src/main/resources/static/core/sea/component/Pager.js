define(function(require, exports, module) {
	/** * 模块外部依赖 ** */
	//require.async(("./css/pager.css");
	var Lang = require("Lang");
	var Component = require("Component");
	/** * 模块私有数据 ** */
	var defaults = {
		cls : "sea_pager",
		pagerMode:"normal",//simple
		pageSizeArr:[20,50,100,200,500,1000],
		pageNav:5,
		pageSize:20,
		pageIndex:1,
		rowCount:0,
		css : {},
		attr : {	},
		select:function(pageIndex,pageSize){}
	};
	/** * 模块私有方法 ** */
	var self = {
		html :function template(){
			var html = [] ;
			html.push('<table  cellspacing="0" cellpadding="0">');
			html.push('<tr>');
			html.push('<td class="totalpage">'+Lang["total"]+'<span class="sea_totalpage"></span>'+Lang["page"]+'/<span class="sea_rowCount"></span>'+Lang["record"]+'</span> &nbsp;&nbsp;&nbsp;'+Lang["each.page"]+'</td>');
			html.push('<td class="pageSize"><select class="sea_pageSize"></select></td>');
			html.push('<td class="jump">'+Lang["item"]+' &nbsp;&nbsp;&nbsp;'+Lang["jump"]+'&nbsp;<span><input type="text" class="sea_jump" style="width:30px;text-align:center" value=""/></span>&nbsp;页&nbsp;&nbsp;&nbsp;</td>');
			html.push('<td class="firstpage">');
			html.push('<a href="#" class="sea_grid_pager_btn sea_firstpage" sea_pageIndex="first"><i class="glyphicon glyphicon-fast-backward"></i></a>');
			html.push('<a href="#" class="sea_grid_pager_btn sea_prepage" sea_pageIndex="pre"><i class="glyphicon glyphicon-backward"></i></a>');
			html.push('</td>');
			html.push('<td class="navig"><span class="sea_grid_navig"></span></td>');
			html.push('<td  class="lastpage">');
			html.push('<a href="#" class="sea_grid_pager_btn sea_nextpage" sea_pageIndex="next"><i class="glyphicon glyphicon-forward"></i>&nbsp;</a>');
			html.push('<a href="#" class="sea_grid_pager_btn sea_lastpage" sea_pageIndex="last"><i class="glyphicon glyphicon-fast-forward"></i>&nbsp;</a>');
			html.push('</td>');
			html.push('</tr>');
			html.push('</table>');
			return html.join('') ;
	  	},
	  	reader:function(me,pageIndex,pageSize,rowCount){
	  		var totalPage=rowCount % pageSize == 0? (rowCount / pageSize): (Math.floor(rowCount / pageSize) + 1);

			me.pager.find(".sea_totalpage").html(totalPage) ;
			me.pager.find(".sea_rowCount").html(rowCount) ;
			me.pager.find(".sea_jump").val(pageIndex) ;
			
	  		var pageNav=me.configs.pageNav;
	  		var pageIndex=pageIndex;
			var middle = Math.floor(pageNav / 2);
			var start = (pageIndex - middle);
			if(start<1)start=1;
			var end = Number(start) + Number(pageNav - 1) ;
			if(end>totalPage) end=totalPage;
			if (end - start < pageNav&& start > 0) {
				start = end - pageNav + 1;
			}
			var html = [] ;
			for (var i = start; i <= end; i++) {
				if (i <= 0) continue;
				var active = (i==pageIndex)?"sea_state_active":"sea_state_default" ;
				html.push('<a href="#" class="sea_grid_pager_btn '+active+'" sea_pageIndex="'+i+'"><span>'+i+'</span></a>');
			}
			me.pager.find(".sea_grid_navig").html(html.join("")) ;
			me.pager.find(".sea_firstpage,.sea_prepage").removeClass("sea_state_disabled");
			me.pager.find(".sea_nextpage,.sea_lastpage").removeClass("sea_state_disabled");
			if(pageIndex <= 1){
				me.pager.find(".sea_firstpage,.sea_prepage").addClass("sea_state_disabled") ;
			}
			if(pageIndex >= totalPage ){
				me.pager.find(".sea_nextpage,.sea_lastpage").addClass("sea_state_disabled") ;
			}
			if(me.configs.pagerMode=="simple"){
				me.pager.find("td:not(.navig)").hide();
			}
		},
	  	bindEvent:function(me){
	  		me.pager.find(".sea_jump").keydown(function(event){
				if(event.keyCode==13){
					var pageSize=me.pager.find(".sea_pageSize").val();
					var pageIndex=$(this).val();
					var rowCount=me.configs.select(pageIndex ,pageSize);
					self.reader(me,pageIndex,pageSize,rowCount);
				}
			}) ;
	  		me.pager.find(".sea_pageSize").change(function(){
	  			var rowCount=me.configs.select(1,$(this).val()) ;
				var pageSize=me.pager.find(".sea_pageSize").val();
	  			self.reader(me,1,pageSize,rowCount);
			}) ;
	  		me.pager.delegate("[sea_pageIndex]","click",function(event){
				if( $(this).hasClass("sea_state_disabled") ) return false ;
				var pageIndex = $(this).attr("sea_pageIndex");
				var pageSize=me.pager.find(".sea_pageSize").val();
				var curPageIndex=Number(me.pager.find(".sea_grid_navig .sea_state_active").attr("sea_pageIndex"));
				var totalPage=me.pager.find(".sea_totalpage").html() ;
				switch(pageIndex){
					case "pre"	: pageIndex = Math.max(curPageIndex - 1,1) ;break ;
					case "next": pageIndex = Math.min(curPageIndex + 1,totalPage) ; break ;
					case "last"	: pageIndex = totalPage ; break ;
					case "first": pageIndex = 1 ; break ;
					default:
						break ;
				}
				var rowCount=me.configs.select(pageIndex ,pageSize);
				self.reader(me,pageIndex,pageSize,rowCount);
				return false ;
			}) ;
	  	}
	};
	/** * 类定义 ** */
	var Pager = function(configs) {
		// 类的属性定义
		this.configs = $.extend(true, {}, defaults, configs);
		this.pager=Component.attr($(self.html()),this.configs);
		var me=this;
		
		$(this.configs.pageSizeArr).each(function(){
			me.pager.find(".sea_pageSize").append("<option value='"+this+"' "+(this==me.configs.pageSize?"selected":"")+">"+this+"</option>") ;
		}) ;
		self.reader(this,this.configs.pageIndex,this.configs.pageSize,this.configs.rowCount);
		self.bindEvent(this);
	};
	// 类公共方法
	Pager.prototype = {
	};
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new Pager(configs);
	};
});