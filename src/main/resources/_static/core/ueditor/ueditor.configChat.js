(function () {
    var URL = window.UEDITOR_HOME_URL || getUEBasePath();
    window.UEDITOR_CONFIG = {
        UEDITOR_HOME_URL: URL
        , serverUrl: URL + "jsp/controller.jsp"
        , toolbars: [['undo', 'redo', '|',
          'bold', 'italic', 'underline', 'fontborder', 
           'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist',
           'lineheight', '|',
          'fontfamily', 'fontsize', '|',
          'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
          'simpleupload','imageleft', 'imageright', 'imagecenter', '|',
          'link','horizontal', 'date', 'time'
        ]]
        ,lang:"zh-cn"
        ,langPath:URL +"lang/"
        ,isShow : true    //默认显示编辑器
        ,emotionLocalization:true //是否开启表情本地化，默认关闭。若要开启请确保emotion文件夹下包含官网提供的images表情文件夹
        ,maxListLevel : -1 //限制可以tab的级数, 设置-1为不限制
        ,'fontfamily':[
            { label:'',name:'songti',val:'宋体,SimSun'},
            { label:'',name:'kaiti',val:'楷体,楷体_GB2312, SimKai'},
            { label:'',name:'yahei',val:'微软雅黑,Microsoft YaHei'},
            { label:'',name:'heiti',val:'黑体, SimHei'},
            { label:'',name:'lishu',val:'隶书, SimLi'},
            { label:'',name:'andaleMono',val:'andale mono'},
            { label:'',name:'arial',val:'arial, helvetica,sans-serif'},
            { label:'',name:'arialBlack',val:'arial black,avant garde'},
            { label:'',name:'comicSansMs',val:'comic sans ms'},
            { label:'',name:'impact',val:'impact,chicago'},
            { label:'',name:'timesNewRoman',val:'times new roman'}
        ]
        ,'fontsize':[10, 11, 12, 14, 16, 18, 20, 24, 36]
        ,'paragraph':{'p':'', 'h1':'', 'h2':'', 'h3':'', 'h4':'', 'h5':'', 'h6':''}
        ,elementPathEnabled : false
        ,wordCount:false          //是否开启字数统计
        ,autoHeightEnabled:true
		,xssFilterRules: true
		,inputXssFilter: true
		,outputXssFilter: true
		,whitList: {
			a:      ['target', 'href', 'title', 'class', 'style'],
			abbr:   ['title', 'class', 'style'],
			address: ['class', 'style'],
			area:   ['shape', 'coords', 'href', 'alt'],
			article: [],
			aside:  [],
			audio:  ['autoplay', 'controls', 'loop', 'preload', 'src', 'class', 'style'],
			b:      ['class', 'style'],
			bdi:    ['dir'],
			bdo:    ['dir'],
			big:    [],
			blockquote: ['cite', 'class', 'style'],
			br:     [],
			caption: ['class', 'style'],
			center: [],
			cite:   [],
			code:   ['class', 'style'],
			col:    ['align', 'valign', 'span', 'width', 'class', 'style'],
			colgroup: ['align', 'valign', 'span', 'width', 'class', 'style'],
			dd:     ['class', 'style'],
			del:    ['datetime'],
			details: ['open'],
			div:    ['class', 'style'],
			dl:     ['class', 'style'],
			dt:     ['class', 'style'],
			em:     ['class', 'style'],
			font:   ['color', 'size', 'face'],
			footer: [],
			h1:     ['class', 'style'],
			h2:     ['class', 'style'],
			h3:     ['class', 'style'],
			h4:     ['class', 'style'],
			h5:     ['class', 'style'],
			h6:     ['class', 'style'],
			header: [],
			hr:     [],
			i:      ['class', 'style'],
			img:    ['src', 'alt', 'title', 'width', 'height', 'id', '_src', 'loadingclass', 'class', 'data-latex'],
			ins:    ['datetime'],
			li:     ['class', 'style'],
			mark:   [],
			nav:    [],
			ol:     ['class', 'style'],
			p:      ['class', 'style'],
			pre:    ['class', 'style'],
			s:      [],
			section:[],
			small:  [],
			span:   ['class', 'style'],
			sub:    ['class', 'style'],
			sup:    ['class', 'style'],
			strong: ['class', 'style'],
			table:  ['width', 'border', 'align', 'valign', 'class', 'style'],
			tbody:  ['align', 'valign', 'class', 'style'],
			td:     ['width', 'rowspan', 'colspan', 'align', 'valign', 'class', 'style'],
			tfoot:  ['align', 'valign', 'class', 'style'],
			th:     ['width', 'rowspan', 'colspan', 'align', 'valign', 'class', 'style'],
			thead:  ['align', 'valign', 'class', 'style'],
			tr:     ['rowspan', 'align', 'valign', 'class', 'style'],
			tt:     [],
			u:      [],
			ul:     ['class', 'style'],
			video:  ['autoplay', 'controls', 'loop', 'preload', 'src', 'height', 'width', 'class', 'style']
		}
    };
    function getUEBasePath(docUrl, confUrl) {
        return getBasePath(docUrl || self.document.URL || self.location.href, confUrl || getConfigFilePath());
    }
    function getConfigFilePath() {
        var configPath = document.getElementsByTagName('script');
        return configPath[ configPath.length - 1 ].src;
    }
    function getBasePath(docUrl, confUrl) {
        var basePath = confUrl;
        if (/^(\/|\\\\)/.test(confUrl)) {
            basePath = /^.+?\w(\/|\\\\)/.exec(docUrl)[0] + confUrl.replace(/^(\/|\\\\)/, '');
        } else if (!/^[a-z]+:/i.test(confUrl)) {
            docUrl = docUrl.split("#")[0].split("?")[0].replace(/[^\\\/]+$/, '');
            basePath = docUrl + "" + confUrl;
        }
        return optimizationPath(basePath);
    }
    function optimizationPath(path) {
        var protocol = /^[a-z]+:\/\//.exec(path)[ 0 ],
            tmp = null,
            res = [];
        path = path.replace(protocol, "").split("?")[0].split("#")[0];
        path = path.replace(/\\/g, '/').split(/\//);
        path[ path.length - 1 ] = "";
        while (path.length) {
            if (( tmp = path.shift() ) === "..") {
                res.pop();
            } else if (tmp !== ".") {
                res.push(tmp);
            }
        }
        return protocol + res.join("/");
    }
    window.UE = {
        getUEBasePath: getUEBasePath
    };
})();
