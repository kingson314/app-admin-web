seajs.config({
//	comboSyntax: ['?', '&'],
    alias: {
        /***核心库***/
    	JqueryForm     :Session.staticPath+"core/jquery/jquery.form",
        Jedate     :Session.staticPath+"core/jquery/jedate/jedate",
//        Jstar     :Session.staticPath+"core/jquery/star/star",
//        JwangEditor :Session.staticPath+"core/jquery/wangEditor/wangEditor",
        Jztree:Session.staticPath+"core/jquery/ztree/ztree",
        /***核心库——基础类型***/
        Array       :Session.staticPath+"core/sea/library/datatype/Array",
        Boolean     :Session.staticPath+"core/sea/library/datatype/Boolean",
        Date        :Session.staticPath+"core/sea/library/datatype/Date",
        Number      :Session.staticPath+"core/sea/library/datatype/Number",
        Object      :Session.staticPath+"core/sea/library/datatype/Object",
        String      :Session.staticPath+"core/sea/library/datatype/String",
        /***核心库——核心功能库——系统功能类库***/
        Ajax        :Session.staticPath+"core/sea/library/function/Ajax",
        Component   :Session.staticPath+"core/sea/library/function/Component",
        Window      :Session.staticPath+"core/sea/library/function/Window",
        /***核心库——核心功能库——业务功能类库***/
        /***组件库***/
        /***组件库——公共国际化***/
        Lang  :Session.staticPath+"core/sea/Lang",
        /***业务库——业务组件***/
        CfgDictionary: Session.staticPath+"core/sea/component/business/CfgDictionary",
        SysDepartment: Session.staticPath+"core/sea/component/business/SysDepartment",
        /***组件库——基础组件***/
        /***组件库——基础组件库——表单组件***/
        Input      : Session.staticPath+"core/sea/component/form/_Input",
        Button      : Session.staticPath+"core/sea/component/form/Button",
        ButtonGroup : Session.staticPath+"core/sea/component/form/ButtonGroup",
        Checkbox       : Session.staticPath+"core/sea/component/form/Checkbox",
        CheckGroup  : Session.staticPath+"core/sea/component/form/CheckGroup",
        DateTime    : Session.staticPath+"core/sea/component/form/DateTime",
        File    : Session.staticPath+"core/sea/component/form/File",
        Hidden      : Session.staticPath+"core/sea/component/form/Hidden",
        Img      : Session.staticPath+"core/sea/component/form/Img",
        Label       : Session.staticPath+"core/sea/component/form/Label",
        Link       : Session.staticPath+"core/sea/component/form/Link",
        Radio       : Session.staticPath+"core/sea/component/form/Radio",
        RadioGroup  : Session.staticPath+"core/sea/component/form/RadioGroup",
        Select      : Session.staticPath+"core/sea/component/form/Select",
//        Star :Session.staticPath+"core/sea/component/form/Star",
//        Switch:Session.staticPath+"core/sea/component/form/Switch",
        Textarea    : Session.staticPath+"core/sea/component/form/Textarea",
//        Editor    : Session.staticPath+"core/sea/component/form/Editor",
        Textfield   : Session.staticPath+"core/sea/component/form/Textfield",
        /***组件库——基础组件库——布局组件***/
        AccordionLayout: Session.staticPath+"core/sea/component/layout/AccordionLayout",
        BorderLayout: Session.staticPath+"core/sea/component/layout/BorderLayout",
        FormLayout  : Session.staticPath+"core/sea/component/layout/FormLayout",
        GridLayout : Session.staticPath+"core/sea/component/layout/GridLayout",
        TabLayout: Session.staticPath+"core/sea/component/layout/TabLayout",
//        TableLayout: Session.staticPath+"core/sea/component/layout/TableLayout",
        ViewLayout : Session.staticPath+"core/sea/component/layout/ViewLayout",
        /***组件库——基础组件库——特效组件***/
        Bread       : Session.staticPath+"core/sea/component/Bread",
        Carousel       : Session.staticPath+"core/sea/component/Carousel",
        Dialog       : Session.staticPath+"core/sea/component/Dialog",
        Drop       : Session.staticPath+"core/sea/component/Drop",
        Grid        : Session.staticPath+"core/sea/component/Grid",
        Iframe : Session.staticPath+"core/sea/component/Iframe",
        Mask        : Session.staticPath+"core/sea/component/Mask",
        Menu        : Session.staticPath+"core/sea/component/Menu",
        Nav        : Session.staticPath+"core/sea/component/Nav",
        Pager       : Session.staticPath+"core/sea/component/Pager",
        Popmenu       : Session.staticPath+"core/sea/component/Popmenu",
        Progress       : Session.staticPath+"core/sea/component/Progress",
        Thumbnail       : Session.staticPath+"core/sea/component/Thumbnail",
        Tip         : Session.staticPath+"core/sea/component/Tip",
        Toolbar       : Session.staticPath+"core/sea/component/Toolbar",
        Tree        : Session.staticPath+"core/sea/component/Tree"
    },
    charset: 'utf-8'
});

jQuery.fn.slideLeftHide = function( speed, callback ) {  
    this.animate({  
        width : "hide",
        paddingLeft : "hide",  
        paddingRight : "hide",  
        marginLeft : "hide",
        marginRight : "hide"  
    }, speed, callback );  
};  
jQuery.fn.slideLeftShow = function( speed, callback ) {  
    this.animate({  
        width : "show",  
        paddingLeft : "show",  
        paddingRight : "show",  
        marginLeft : "show",  
        marginRight : "show"  
    }, speed, callback );  
};
if(Session.token!="0" && Session.token!="null" ){
	localStorage.setItem("Session",JSON.stringify(Session));
}else{
	var sess=localStorage.getItem("Session");
	if(sess)Session=JSON.parse(sess);
}
if(Session.token=="null"){
    top.location.href=Session.basePath;
}
var Log={
    app:"system",
    userId: Session.sysUser.id
};
var Global = {
    //转换国际化
    getI18N:function(str){ 
        if($.type(str)=="array"){
            return str[Session._LangueEnum[Session.langue]];
        }
        return str;
    },
    //获取全局唯一序列
    getSeq:(function(){
        var seq=0;
        return function(){
                if(seq>Number.MAX_VALUE){
                    seq=0;
                    return seq;
                }else{
                    return seq++;
                }
            };
    }()),
    CfgRuntime:function(app,name){
    	var runtime=null;
    	var runtimeApp=Session._CfgRuntime[app];
    	if(runtimeApp!==undefined&&runtimeApp!==null && runtimeApp[name]!==null){
    		return runtimeApp[name];
    	}
    	var params= {"app":app,"name":name};
        $.ajax( {
            "type" : 'POST',
            url :Session.basePath+"CfgRuntime/getByAppAndName",
            data :params,
            async : false,
            dataType : "json",
            success : function(result) {
            	runtime=result.data;
                if(!Session._CfgRuntime[app])Session._CfgRuntime[app]={};
                Session._CfgRuntime[app][name]=runtime;
            }
        });
        return runtime;
    },
    DicList:function(app,type,subType,cache){
        if(!cache)cache=true;
        var  dicList=null;
        try{
            dicList=Session._DicList[app][type];
            if(subType){
                dicList=dicList[subType];
            }
        }catch(e){
            dicList=null;
        }
        if(!dicList||!cache){
            var params= {"app":app,"type":type};
            if(subType){params.subType=subType;}
            $.ajax( {
                "type" : 'POST',
                url :Session.basePath+"CfgDictionary/getByType",
                data :params,
                async : false,
                dataType : "json",
                success : function(result) {
                    dicList=result.data;
                    if(subType){
                        if(!Session._DicList[app])Session._DicList[app]={};
                        if(!Session._DicList[app][type])Session._DicList[app][type]={};
                        Session._DicList[app][type][subType]=dicList;
                    }else{
                        if(!Session._DicList[app])Session._DicList[app]={};
                        Session._DicList[app][type]=dicList;
                    }
                }
            });
        }
        return dicList;
    },
    DicJson:function(app,type,subType,cache,lang){
    		if(!lang)lang=Session.langue;
        var  dicJson=null;
//	        try{
//	            dicJson=Session._DicJson[app][type];
//	            if(subType){
//	                dicJson=dicJson[subType];
//	            }
//	        }catch(e){
//	            dicJson=null;
//	        }
        if(!dicJson){
            dicJson={};
            var  dicList=Global.DicList(app,type,subType,cache);
            if(dicList){
                for(var i=0;i<dicList.length;i++){
                    dicJson[dicList[i].value]=dicList[i][lang];
                }
                if(subType){
                    if(!Session._DicJson[app])Session._DicJson[app]={};
                    if(!Session._DicJson[app][type])Session._DicJson[app][type]={};
                    Session._DicJson[app][type][subType]=dicJson;
                }else{
                    if(!Session._DicJson[app])Session._DicJson[app]={};
                    Session._DicJson[app][type]=dicJson;
                }
            }
        }
        return dicJson;
    },
    loadJs:function(path) {
		if (!path || path.length === 0) {
			return;
		}
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.src = path;
		script.type = 'text/javascript';
		head.appendChild(script);
		return script;
	},
	loadCss:function(path) {
		if (!path || path.length === 0) {
			return;
		}
		var head = document.getElementsByTagName('head')[0];
		var link = document.createElement('link');
		link.href = path;
		link.rel = 'stylesheet';
		link.type = 'text/css';
		head.appendChild(link);
		return link;
	}
};