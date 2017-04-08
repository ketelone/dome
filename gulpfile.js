/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gulp = require('gulp');

//Include Plugins
var del = require('del');
var jshint = require('gulp-jshint');
var useref = require('gulp-useref');
var lazypipe = require('lazypipe');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var nano = require('gulp-cssnano');
var runSequence = require('gulp-run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var notify = require('gulp-notify');//提示信息
var gulpNgConfig = require('gulp-ng-config');//提示信息
var tinylr = require('tiny-lr');
var fs = require('fs');
var path = require('path');
var server = tinylr();
var port = 8000;

var jsFilePath = [
  'app/scripts/*.js',
  'app/scripts/*/*.js',
  'app/app.js',
  'app/pages/**/*.js',
  'app/pages/**/**/*.js',
  'app/pages/**/**/**/*.js'];

var cssFilePath = [
  'app/theme/app.core.scss',
  'app/pages/**/*.scss',
  'app/pages/**/**/*.scss',
  'app/pages/**/**/**/*.scss'];

var htmlFilePath = [
  'app/pages/**/*.html',
  'app/pages/**/**/*.html',
  'app/pages/**/**/**/*.html',
  'app/pages/**/**/**/**/*.html'];

var libDevFilePath = [
  'app/lib/**/*.*',
  'app/lib/**/**/*.*',
  'app/lib/**/**/**/*.*'];

var libDevCommonFilePath = [
  'app/common/**/*.*',
  'app/common/**/**/*.*',
  'app/common/**/**/**/*.*'
];

var libPublishFilePath = [
  'app/lib/**/css/ionic.min.css',
  'app/lib/**/fonts/*.*',
  'app/lib/**/js/ionic.bundle.js',
  'app/lib/**/rollups/md5.js',
  'app/lib/**/dist/jquery.min.js',
  'app/lib/**/dist/ng-cordova.js',
  'app/lib/**/angular-translate.js',
  'app/lib/**/angular-translate-loader-static-files.js',
  'app/lib/**/dist/ionic-datepicker.bundle.min.js',
  'app/lib/**/dist/pouchdb.min.js'
];

var imgFilePath = [
  'app/img/**/*.png',
  'app/img/**/**/*.*',
  'app/img/**/**/**/*.png',
  'app/img/*.gif'];

var configDEVPath = [
  'publish/TEST/config.xml'];

var configPRODPath = [
  'publish/PROD/config.xml'];

var configiOSAppStorePath = [
  'publish/IOSAPPSTORE/config.xml'
]

var pluginDEVPath = [
  'publish/TEST/plugins/*.*',
  'publish/TEST/plugins/**/*.*',
  'publish/TEST/plugins/**/**/*.*',
  'publish/TEST/plugins/**/**/**/*.*',
  'publish/TEST/plugins/**/**/**/**/*.*',
  'publish/TEST/plugins/**/**/**/**/**/*.*'];
var pluginPRODPath = [
  'publish/PROD/plugins/*.*',
  'publish/PROD/plugins/**/*.*',
  'publish/PROD/plugins/**/**/*.*',
  'publish/PROD/plugins/**/**/**/*.*',
  'publish/PROD/plugins/**/**/**/**/*.*',
  'publish/PROD/plugins/**/**/**/**/**/*.*'];

<<<<<<< HEAD
//娓呴櫎鑷姩鐢熸垚鐨勭洰褰曟枃浠�
=======
//清除自动生成的目录文件
>>>>>>> f-9457
gulp.task('clean', function () {
  return gulp.src(['www/build/*', 'app/scripts/baseConfig.js', 'config.xml'
    /*,'plugins/com.handmobile.cordovaplugin.hotpatch/*', 'plugins/hand-im-plugin-device/*'*/]).pipe(clean());
});

gulp.task('clean-code', function () {
  return gulp.src(['www/build/css/*', 'www/build/img/*', 'www/build/pages/*', 'www/build/app.bundle.js']).pipe(clean());
});

gulp.task('clean-bundle-js', function () {
  return gulp.src(['www/build/app.bundle.js']).pipe(clean());
});


<<<<<<< HEAD
//鍔ㄦ�侀厤缃產ndroid 鍗虫椂閫氳鐨�
=======
//动态配置android 即时通讯的
>>>>>>> f-9457
gulp.task('clean-android-im-config', function () {
  return gulp.src(['plugins/hand-im-plugin-device/plugin.xml']).pipe(clean());
});

gulp.task('copy-prod-android-im-config', function () {
  return gulp.src('publish/PROD/hand-im-plugin-device/plugin.xml')
    .pipe(gulp.dest('plugins/hand-im-plugin-device'));
});

gulp.task('config-prod-android-im-config', function (callback) {
  runSequence('clean-android-im-config', 'copy-prod-android-im-config', callback);
});


<<<<<<< HEAD
//璇硶妫�鏌�
=======
//语法检查
>>>>>>> f-9457
gulp.task('lint', function () {
  return gulp.src(jsFilePath)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

<<<<<<< HEAD
//澶嶅埗椤甸潰鍒拌繍琛岀洰褰�
=======
//复制页面到运行目录
>>>>>>> f-9457
gulp.task('pagesHtml', function () {
  return gulp.src(htmlFilePath)
    .pipe(useref({noAssets: true}, lazypipe().pipe(sourcemaps.init, {loadMaps: true})))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('www/build/pages'));
});

//
gulp.task('rootHtml', function () {
  return gulp.src('src/*.html')
    .pipe(useref({noAssets: true}, lazypipe().pipe(sourcemaps.init, {loadMaps: true})))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('www'));
});

<<<<<<< HEAD
//鏂板缓澶嶅埗椤甸潰浠诲姟
gulp.task('html', [/*'rootHtml',*/ 'pagesHtml']);

//澶嶅埗寮�鍙戠幆澧冪殑渚濊禆搴撴枃浠�
=======
//新建复制页面任务
gulp.task('html', [/*'rootHtml',*/ 'pagesHtml']);

//复制开发环境的依赖库文件
>>>>>>> f-9457
gulp.task('copy-dev-libs', function () {
  return gulp.src(libDevFilePath)
    //.pipe(useref({noAssets: true}, lazypipe().pipe(sourcemaps.init, {loadMaps: true})))
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('www/build/lib'));
});

<<<<<<< HEAD
//澶嶅埗鍙戝竷鐜鐨勪緷璧栧簱鏂囦欢
=======
//复制发布环境的依赖库文件
>>>>>>> f-9457
gulp.task('copy-publish-libs', function () {
  return gulp.src(libPublishFilePath)
    //.pipe(useref({noAssets: true}, lazypipe().pipe(sourcemaps.init, {loadMaps: true})))
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('www/build/lib'));
});

<<<<<<< HEAD
//澶嶅埗鍥剧墖鏂囦欢
=======
//复制图片文件
>>>>>>> f-9457
gulp.task('copy-img', function () {
  return gulp.src(imgFilePath)
    .pipe(gulp.dest('www/build/img'));
});

<<<<<<< HEAD
//澶嶅埗寮�鍙戠幆澧� config.xml
=======
//复制开发环境 config.xml
>>>>>>> f-9457
gulp.task('copy-dev-config', function () {
  return gulp.src(configDEVPath)
    .pipe(gulp.dest(''));
});

<<<<<<< HEAD
//澶嶅埗鍙戝竷鐜 config.xml
=======
//复制发布环境 config.xml
>>>>>>> f-9457
gulp.task('copy-prod-config', function () {
  return gulp.src(configPRODPath)
    .pipe(gulp.dest(''));
});

<<<<<<< HEAD
//澶嶅埗鍙戝竷鐜 config.xml
=======
//复制发布环境 config.xml
>>>>>>> f-9457
gulp.task('copy-ios-appStore-config', function () {
  return gulp.src(configiOSAppStorePath)
    .pipe(gulp.dest(''));
});

/*
 gulp.task('copy-dev-plugin', function () {
 return gulp.src(pluginDEVPath)
 .pipe(gulp.dest('plugins'));
 });
 gulp.task('copy-prod-plugin', function () {
 return gulp.src(pluginPRODPath)
 .pipe(gulp.dest('plugins'));
 });
 */


gulp.task('copy-common-js-libs', function () {
  return gulp.src(libDevCommonFilePath)
    //.pipe(useref({noAssets: true}, lazypipe().pipe(sourcemaps.init, {loadMaps: true})))
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('www/build/common'));
});

<<<<<<< HEAD
//瀹氫箟寮�鍙戠幆澧冪殑渚濊禆搴撴枃浠朵换鍔�
=======
//定义开发环境的依赖库文件任务
>>>>>>> f-9457
gulp.task('copy-dev-lib', function (callback) {
  runSequence('copy-dev-libs', 'copy-img', 'copy-common-js-libs', callback);
});

<<<<<<< HEAD
//瀹氫箟鍙戝竷鐜鐨勪緷璧栧簱鏂囦欢浠诲姟
=======
//定义发布环境的依赖库文件任务
>>>>>>> f-9457
gulp.task('copy-publish-lib', function (callback) {
  runSequence('copy-publish-libs', 'copy-img', 'copy-common-js-libs', callback);
});

<<<<<<< HEAD
//鍚堝苟鍘嬬缉css鏂囦欢
=======
//合并压缩css文件
>>>>>>> f-9457
gulp.task('sass', function () {
  return gulp.src(['app/theme/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('www/build/css'));
});


<<<<<<< HEAD
//鐢熸垚寮�鍙戠幆澧冪幆澧冮厤缃枃浠�
=======
//生成开发环境环境配置文件
>>>>>>> f-9457
gulp.task('config-dev', function () {
  gulp.src('app/config/devConfig.json')
    .pipe(gulpNgConfig('baseConfig'))
    .pipe(rename("baseConfig.js"))
    .pipe(gulp.dest('app/scripts'))
});

<<<<<<< HEAD
//鐢熸垚鍙戝竷鐜鐜閰嶇疆鏂囦欢
=======
//生成发布环境环境配置文件
>>>>>>> f-9457
gulp.task('config-prod', function () {
  gulp.src('app/config/prodConfig.json')
    .pipe(gulpNgConfig('baseConfig'))
    .pipe(rename("baseConfig.js"))
    .pipe(gulp.dest('app/scripts'))
});

<<<<<<< HEAD
//鐢熸垚iOS鍟嗗簵鍙戝竷鐜鐜閰嶇疆鏂囦欢
=======
//生成iOS商店发布环境环境配置文件
>>>>>>> f-9457
gulp.task('config-ios-appStore-prod', function () {
  gulp.src('app/config/iOSAppStoreConfig.json')
    .pipe(gulpNgConfig('baseConfig'))
    .pipe(rename("baseConfig.js"))
    .pipe(gulp.dest('app/scripts'))
});

<<<<<<< HEAD
//鐢熸垚iOS鍙戝竷鐜鐜閰嶇疆鏂囦欢
=======
//生成iOS发布环境环境配置文件
>>>>>>> f-9457
gulp.task('config-prod', function () {
  gulp.src('app/config/prodConfig.json')
    .pipe(gulpNgConfig('baseConfig'))
    .pipe(rename("baseConfig.js"))
    .pipe(gulp.dest('app/scripts'))
});

<<<<<<< HEAD
//澶嶅埗寮�鍙戠幆澧� config.xml
=======
//复制开发环境 config.xml
>>>>>>> f-9457
gulp.task('copy-iosAppStore-config', function () {
  return gulp.src(configIosAppStorePath)
    .pipe(gulp.dest(''));
});

<<<<<<< HEAD
//鍘嬬缉css
=======
//压缩css
>>>>>>> f-9457
gulp.task('css', function () {
  return gulp.src('src/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(gulp.dest('www/css'))  // write source file for debug
    .pipe(nano({reduceIdents: false}))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '.'}))
    .pipe(gulp.dest('www/css'));
});

<<<<<<< HEAD
//鍚堝苟鍘嬬缉涓戝寲Js
=======
//合并压缩丑化Js
>>>>>>> f-9457
gulp.task('scripts', function () {
  return gulp.src(jsFilePath)
    .pipe(concat('app.bundle.js'))
    .pipe(gulp.dest('www/build')) // write source file for debug
    .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
    .pipe(uglify())    //压缩
    .pipe(gulp.dest('www/build'));  //输出
});

//
gulp.task('copy-prod', function () {
  return gulp.src([
      'src/**/*',
      '!src/index.html',
      '!src/**/*.ts',
      '!src/**/*.less',
      '!src/**/*.sass',
      '!src/**/*.styl',
      '!src/css/*',
      '!src/**/*.md',
      '!src/scripts/*'])
    .pipe(gulp.dest('www'));
});

<<<<<<< HEAD
// 鍒涘缓澶氬眰鐩綍
=======
// 创建多层目录
>>>>>>> f-9457
function mkdirs(dirname, mode, callback) {
 // console.log(dirname+"abc1");
  fs.exists(dirname, function (exists) {
    if (exists) {
      callback();
    } else {
    // console.log(path.dirname(dirname)+"abc");
      mkdirs(path.dirname(dirname), mode, function () {
     fs.mkdir(dirname, mode, callback);
     });
    }
  });
}

<<<<<<< HEAD
//鎷疯礉鏂囦欢
function copyfile(oldPath, newPath) {
  //console.log('澶嶅埗' + oldPath + ' -> ' + newPath);
=======
//拷贝文件
function copyfile(oldPath, newPath) {
  //console.log('复制' + oldPath + ' -> ' + newPath);
>>>>>>> f-9457

  var stat = fs.lstatSync(oldPath);
  if (stat.isDirectory()) {
    console.log(oldPath + '是目录');
    return false;
  }

  var readStream = fs.createReadStream(oldPath);
  var writeStream = fs.createWriteStream(newPath);
  readStream.pipe(writeStream);
  readStream.on('end', function () {
    console.log('copy end');
  });
  readStream.on('error', function () {
    console.log('copy error');
  });
}


function copyPages(e) {
  var oldPath = e.path;
  /*
<<<<<<< HEAD
  mac 閮ㄥ垎
   console.log(oldPath+"鏃�");
   var newPath = oldPath.replace('/app/', '/www/build/');
   console.log(newPath+"鏂�");
   var newDirPathTemp = newPath.split("/");
  */
  console.log(oldPath+'鏃�');
  var newPath = oldPath.replace('\\app\\', '\\www\\build\\');
  console.log(newPath+'鏂�');
=======
  mac 部分
   console.log(oldPath+"旧");
   var newPath = oldPath.replace('/app/', '/www/build/');
   console.log(newPath+"新");
   var newDirPathTemp = newPath.split("/");
  */
  console.log(oldPath+'旧');
  var newPath = oldPath.replace('\\app\\', '\\www\\build\\');
  console.log(newPath+'新');
>>>>>>> f-9457
  var newDirPathTemp = newPath.split("\\");

  var currentPath = fs.realpathSync('.');

  var newDirPath = [];
  for (var i = 0; i < newDirPathTemp.length - 1; i++) {
    newDirPath[i] = newDirPathTemp[i];
  }
  newDirPath = newDirPath.join("\\");
<<<<<<< HEAD
  // 淇敼鎴栧鍔犳椂
  if ('added' == e.type || 'changed' == e.type || 'renamed' == e.type) {

    // 鍒ゆ柇鐩綍鏄惁瀛樺湪锛屼笉瀛樺湪鍒欏垱寤�
=======
  // 修改或增加时
  if ('added' == e.type || 'changed' == e.type || 'renamed' == e.type) {

    // 判断目录是否存在，不存在则创建
>>>>>>> f-9457
    fs.exists(newDirPath, function (exists) {
      if (exists) {
        console.log("文件夹存在");
        copyfile(oldPath, newPath);
      } else {
<<<<<<< HEAD
        console.log("鏂囦欢澶逛笉瀛樺湪锛屽垯鍒涘缓鐩綍");

       mkdirs(newDirPath);

        //寤舵椂锛岀瓑寰呯洰褰曞垱寤哄畬鎴�
=======
        console.log("文件夹不存在，则创建目录");

       mkdirs(newDirPath);

        //延时，等待目录创建完成
>>>>>>> f-9457
        setTimeout(function () {
          copyfile(oldPath, newPath);
        }, 200);
      }
    });
  } else if ('deleted' == e.type) { //删除
    fs.unlink(newPath, function (err) {
      console.log('删除 newPath ' + newPath + err);
    });
  }
}

<<<<<<< HEAD
// 鐩戝惉浠诲姟 杩愯璇彞 gulp watch
=======
// 监听任务 运行语句 gulp watch
>>>>>>> f-9457
gulp.task('watch', function () {
  server.listen(port, function (err) {
    if (err) {
      return console.log(err);
    }

<<<<<<< HEAD
    //鎷疯礉淇敼杩囩殑鏂囦欢
=======
    //拷贝修改过的文件
>>>>>>> f-9457
    gulp.watch(htmlFilePath, function (e) {
      console.log('有变动的文件为 oldPath ' + e.path);
      copyPages(e);
    });

    gulp.watch('app/img/**/**/**/**', function (e) {
      console.log('有变动的文件为 oldPath ' + e.path);
      copyPages(e);
    });

<<<<<<< HEAD
    // 鐩戝惉sass
=======
    // 监听sass
>>>>>>> f-9457
    gulp.watch(cssFilePath, function (e) {
      console.log('有变动的文件为 oldPath ' + e.path);
      gulp.run('sass');
    });

<<<<<<< HEAD
    // 鐩戝惉js
=======
    // 监听js
>>>>>>> f-9457
    gulp.watch(jsFilePath, function (e) {
      console.log('有变动的文件为 oldPath ' + e.path);
      gulp.run('scripts');
    });
  });

});

<<<<<<< HEAD
//鎵嬪姩鏇存柊www/build浠ｇ爜
=======
//手动更新www/build代码
>>>>>>> f-9457
gulp.task('rebuild', function (callback) {
  runSequence('clean-code', ['copy-img', 'sass', 'scripts', 'html'], callback);
});

<<<<<<< HEAD
//鐢熸垚寮�鍙戠幆澧冧唬鐮佺洰褰�
=======
//生成开发环境代码目录
>>>>>>> f-9457
gulp.task('run-dev', function (callback) {
  runSequence('clean', 'config-dev', /*'lint',*/ 'copy-dev-config', 'copy-publish-lib', ['sass', 'scripts', 'html'], callback);
});

<<<<<<< HEAD
//鐢熸垚鍙戝竷鐜浠ｇ爜鐩綍
=======
//生成发布环境代码目录
>>>>>>> f-9457
gulp.task('run-prod', function (callback) {
  runSequence('clean', 'config-prod', /*'lint',*/ 'copy-prod-config', 'copy-publish-lib', ['sass', 'scripts', 'html'], callback);
});

<<<<<<< HEAD
//鐢熸垚鍙戝竷鐜浠ｇ爜鐩綍
=======
//生成发布环境代码目录
>>>>>>> f-9457
gulp.task('run-ios-prod', function (callback) {
  runSequence('clean', 'config-ios-appStore-prod', /*'lint',*/ 'copy-ios-appStore-config', 'copy-publish-lib', ['sass', 'scripts', 'html'], callback);
});


<<<<<<< HEAD
//榛樿浠诲姟
=======
//默认任务
>>>>>>> f-9457
gulp.task('default', ['run-dev']);
