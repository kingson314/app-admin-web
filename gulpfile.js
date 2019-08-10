'use stritc';
/**插件库**/
var gulp = require('gulp');
var yargs = require('yargs').argv; //获取运行gulp命令时附加的命令行参数
var clean = require('gulp-clean'); //清理文件或文件夹
var replace = require('gulp-replace-task'); //对文件中的字符串进行替换
var browserSync = require('browser-sync'); //启动静态服务器
var uglify = require('gulp-uglify'); //js压缩混淆
var cssmin = require('gulp-minify-css'); //css压缩
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer'); //css前缀
var sourcemaps = require('gulp-sourcemaps'); //sourcemaps
var less = require('gulp-less'); //less
var notify = require('gulp-notify'); //更改提醒
var plumber = require('gulp-plumber'); //更改提醒
var jshint = require("gulp-jshint"); //js提示
var imagemin = require("gulp-imagemin"); //图片压缩
var cache = require("gulp-cache"); //图片缓存
var minifyHtml = require("gulp-minify-html");
var livereload = require("gulp-livereload"); //自动刷新页面
var cmd = require('gulp-cmd'); //seajs合并
var through = require('through-gulp'); //获取文件路径
var gulpSequence = require('gulp-sequence'); //同步执行任务
/**全局变量与函数**/
var rootPath = __dirname;
var src = rootPath + "/src/main/resources/_static/";
var dist = rootPath + "/src/main/resources/static/";
var Session = {
  staticPath: src
};
var endsWith = function(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
};
var getFilePath = function(pathArr) {
  return gulp.src(pathArr, {}).pipe(through(function(file, enc, cb) {
    //console.log(file.path); this.push(file.path);
    cb();
  }));
}
var getCmdConfig = function() {
  return {
    //ignore: [src + '/app/app-common.js'],
    map: {
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
    }
  };
}
/**任务列表**/
//清理构建目录
gulp.task('clean', function() {
  return gulp.src([dist + '**/*.*'], {
    read: false
  }).pipe(clean({
    force: true
  }));
});
//拷贝
gulp.task('copy', ['clean'], function() {
  console.log(src);
  gulp.src([src + '**/*.jsp',src + '**/*.vm', src + 'css/**/*.woff', src + 'css/**/*.woff2', 
	  src + 'css/**/*.eot', src + 'css/**/*.svg',
	  src + 'css/**/*.ttf'], {
    base: src
  }).pipe(gulp.dest(dist));
  
  gulp.src(src + 'ueditor/**/*.*',)
  .pipe(gulp.dest(dist+'ueditor/'))
  
});
//图片压缩
gulp.task('image', function() {
  if (yargs.p) {
    return gulp.src([src + '**/*.gif', src + '**/*.png', src + '**/*.jpg', src + '**/*.ico'], {
      base: src
    }).pipe(plumber()).pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))).pipe(gulp.dest(dist));
  } else {
    return gulp.src([src + '**/*.gif', src + '**/*.png', src + '**/*.jpg', src + '**/*.ico'], {
      base: src
    }).pipe(plumber()).pipe(gulp.dest(dist));
  }
});
//html压缩
gulp.task('html', function() {
  if (yargs.p) {
    return gulp.src([src + '**/*.html', src + '**/*.htm'], {
        base: src
      }).pipe(plumber()).pipe(minifyHtml()) //压缩
      .pipe(gulp.dest(dist));
  } else {
    return gulp.src([src + '**/*.html', src + '**/*.htm'], {
        base: src
      }).pipe(plumber())
      .pipe(gulp.dest(dist));
  }
});
//js
gulp.task('jsOther', function() {
  return gulp.src([src + 'core/**/*.js'], {
      base: src
    }).pipe(plumber())
    .pipe(jshint())
    .pipe(gulp.dest(dist));

});
gulp.task('js', ['jsOther'], function() {
  if (yargs.p) {
    
  } else {
    return gulp.src([src + '**/*.js'], {
        base: src
      }).pipe(plumber())
      .pipe(gulp.dest(dist));
  }
});
//css压缩
gulp.task('cssOther', function() {
  if (yargs.p) {
    return gulp.src([src + 'com/**/*.less'
    ], {
      base: src
    }).pipe(less())
    .pipe(plumber()).pipe(autoprefixer({
      browsers: ['last 2 versions', 'Android >= 4.0'],
      cascade: false
    })).pipe(cssmin()).pipe(gulp.dest(dist));

  } else {
    return gulp.src([ src + 'com/**/*.less'
    ], {
      base: src
    }).pipe(gulp.dest(dist));
  }
});
gulp.task('css', ['cssOther'], function() {
  if (yargs.p) {
    return gulp.src([src + '/css/base.css',  src + '/core/jquery/**/*.css',
        src + '/**/*.less'
      ], {
        base: src
      }).pipe(less())
      .pipe(plumber()).pipe(autoprefixer({
        browsers: ['last 2 versions', 'Android >= 4.0'],
        cascade: false
      }))
      .pipe(concat('base.css'))
      .pipe(cssmin())
      .pipe(gulp.dest(dist + "css/"));
  } else {
    return gulp.src([src + 'css/base.css',  src + 'core/**/*.css', 
      src + '**/*.less'
    ], {
      base: src
    }).pipe(less()).pipe(concat('base.css')).pipe(gulp.dest(dist + "/css/"));
  }
});/**任务监控**/
gulp.task('watch', function() {
  gulp.watch(src + '**/*',function(event) {
      if (endsWith(event.path, ".js")) {
        gulp.src(event.path, {
            base: src
          }).pipe(plumber())
          .pipe(jshint()).pipe(jshint.reporter())
          .pipe(gulp.dest(dist));
        console.log('js ' + event.path + ' was ' + event.type);
      } else if (endsWith(event.path, ".css")||endsWith(event.path, ".less")) {
    	  gulp.src([src + 'css/base.css',  src + 'core/**/*.css',
    	      src + '**/*.less'
    	    ], {
    	      base: src
    	    }).pipe(less()).pipe(less())
    	      .pipe(plumber()).pipe(autoprefixer({
    	          browsers: ['last 2 versions', 'Android >= 4.0'],
    	          cascade: false
    	        })).pipe(concat('base.css')).pipe(gulp.dest(dist + "/css/"));
    	  console.log('css' + event.path + ' was ' + event.type);
      } else {
		gulp.src(event.path, {
		  base: src
		}).pipe(plumber()).pipe(gulp.dest(dist));
		console.log('other ' + event.path + ' was ' + event.type);
      }
    });
});
gulp.task('package', ['html', 'css', 'image', 'jsOther'], function() {
	return gulp.src([src + 'com/**/*.js'], {})
    .pipe(through(function(file, enc, cb) {
      gulp.src(file.path, {
          base: src
        })
        	.pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter())
        .pipe(cmd(getCmdConfig()))
//        .pipe(uglify({
//          mangle: {
//            except: ['require', 'exports', 'module']
//          }
//        }))
        .pipe(gulp.dest(dist));
      
      cb();
    }));
//  return gulp.src([
//	  src + 'sea/component/Thumbnail.js',
//      src + 'sea/component/Menu.js',
//      src + 'sea/component/Nav.js',
//      src + 'sea/component/Toolbar.js',
//      src + 'sea/library/function/Window.js'
//    ], {
//      base: src
//    }).pipe(plumber())
//    .pipe(uglify({
//      mangle: {
//        except: ['require', 'exports', 'module']
//      }
//    }))
//    .pipe(jshint())
//    .pipe(gulp.dest(dist));
});
/**
 * gulp入口
 * -w: 监听文件改变
 * -s: 启动browserAsync
 * -p: 指定端口
 * -r: 需要更新github上的demo时才会用到的参数
 * 常用命令如下
 * 构建：gulp
 * 构建完，监听文件改变：gulp -w
 * 构建并启动browserAsync: gulp -s
 * 通过指定端口启动browserAsync: gulp -s -p=8081
 * 构建启动browserAsync，同时启动监听： gulp -sw
 * 开发过程使用：gulp -w或gulp -w -p
 * 打包时使用：gulp -p   -->  mvn clean package
 */
gulp.task('default', ['copy'], function() {
  if (yargs.p) {
    gulp.start('package');
  } else {
    gulp.start('html');
    gulp.start('css');
    gulp.start('js');
    gulp.start('image');
  }
  if (yargs.w) {
    gulp.start('watch');
  }
});