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
var notify = require('gulp-notify');//ÌáÊ¾ÐÅÏ¢
var gulpNgConfig = require('gulp-ng-config');//ÌáÊ¾ÐÅÏ¢
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
//æ¸…é™¤è‡ªåŠ¨ç”Ÿæˆçš„ç›®å½•æ–‡ä»¶
=======
//Çå³ý×Ô¶¯Éú³ÉµÄÄ¿Â¼ÎÄ¼þ
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
//åŠ¨æ€é…ç½®android å³æ—¶é€šè®¯çš„
=======
//¶¯Ì¬ÅäÖÃandroid ¼´Ê±Í¨Ñ¶µÄ
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
//è¯­æ³•æ£€æŸ¥
=======
//Óï·¨¼ì²é
>>>>>>> f-9457
gulp.task('lint', function () {
  return gulp.src(jsFilePath)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

<<<<<<< HEAD
//å¤åˆ¶é¡µé¢åˆ°è¿è¡Œç›®å½•
=======
//¸´ÖÆÒ³Ãæµ½ÔËÐÐÄ¿Â¼
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
//æ–°å»ºå¤åˆ¶é¡µé¢ä»»åŠ¡
gulp.task('html', [/*'rootHtml',*/ 'pagesHtml']);

//å¤åˆ¶å¼€å‘çŽ¯å¢ƒçš„ä¾èµ–åº“æ–‡ä»¶
=======
//ÐÂ½¨¸´ÖÆÒ³ÃæÈÎÎñ
gulp.task('html', [/*'rootHtml',*/ 'pagesHtml']);

//¸´ÖÆ¿ª·¢»·¾³µÄÒÀÀµ¿âÎÄ¼þ
>>>>>>> f-9457
gulp.task('copy-dev-libs', function () {
  return gulp.src(libDevFilePath)
    //.pipe(useref({noAssets: true}, lazypipe().pipe(sourcemaps.init, {loadMaps: true})))
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('www/build/lib'));
});

<<<<<<< HEAD
//å¤åˆ¶å‘å¸ƒçŽ¯å¢ƒçš„ä¾èµ–åº“æ–‡ä»¶
=======
//¸´ÖÆ·¢²¼»·¾³µÄÒÀÀµ¿âÎÄ¼þ
>>>>>>> f-9457
gulp.task('copy-publish-libs', function () {
  return gulp.src(libPublishFilePath)
    //.pipe(useref({noAssets: true}, lazypipe().pipe(sourcemaps.init, {loadMaps: true})))
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('www/build/lib'));
});

<<<<<<< HEAD
//å¤åˆ¶å›¾ç‰‡æ–‡ä»¶
=======
//¸´ÖÆÍ¼Æ¬ÎÄ¼þ
>>>>>>> f-9457
gulp.task('copy-img', function () {
  return gulp.src(imgFilePath)
    .pipe(gulp.dest('www/build/img'));
});

<<<<<<< HEAD
//å¤åˆ¶å¼€å‘çŽ¯å¢ƒ config.xml
=======
//¸´ÖÆ¿ª·¢»·¾³ config.xml
>>>>>>> f-9457
gulp.task('copy-dev-config', function () {
  return gulp.src(configDEVPath)
    .pipe(gulp.dest(''));
});

<<<<<<< HEAD
//å¤åˆ¶å‘å¸ƒçŽ¯å¢ƒ config.xml
=======
//¸´ÖÆ·¢²¼»·¾³ config.xml
>>>>>>> f-9457
gulp.task('copy-prod-config', function () {
  return gulp.src(configPRODPath)
    .pipe(gulp.dest(''));
});

<<<<<<< HEAD
//å¤åˆ¶å‘å¸ƒçŽ¯å¢ƒ config.xml
=======
//¸´ÖÆ·¢²¼»·¾³ config.xml
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
//å®šä¹‰å¼€å‘çŽ¯å¢ƒçš„ä¾èµ–åº“æ–‡ä»¶ä»»åŠ¡
=======
//¶¨Òå¿ª·¢»·¾³µÄÒÀÀµ¿âÎÄ¼þÈÎÎñ
>>>>>>> f-9457
gulp.task('copy-dev-lib', function (callback) {
  runSequence('copy-dev-libs', 'copy-img', 'copy-common-js-libs', callback);
});

<<<<<<< HEAD
//å®šä¹‰å‘å¸ƒçŽ¯å¢ƒçš„ä¾èµ–åº“æ–‡ä»¶ä»»åŠ¡
=======
//¶¨Òå·¢²¼»·¾³µÄÒÀÀµ¿âÎÄ¼þÈÎÎñ
>>>>>>> f-9457
gulp.task('copy-publish-lib', function (callback) {
  runSequence('copy-publish-libs', 'copy-img', 'copy-common-js-libs', callback);
});

<<<<<<< HEAD
//åˆå¹¶åŽ‹ç¼©cssæ–‡ä»¶
=======
//ºÏ²¢Ñ¹ËõcssÎÄ¼þ
>>>>>>> f-9457
gulp.task('sass', function () {
  return gulp.src(['app/theme/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('www/build/css'));
});


<<<<<<< HEAD
//ç”Ÿæˆå¼€å‘çŽ¯å¢ƒçŽ¯å¢ƒé…ç½®æ–‡ä»¶
=======
//Éú³É¿ª·¢»·¾³»·¾³ÅäÖÃÎÄ¼þ
>>>>>>> f-9457
gulp.task('config-dev', function () {
  gulp.src('app/config/devConfig.json')
    .pipe(gulpNgConfig('baseConfig'))
    .pipe(rename("baseConfig.js"))
    .pipe(gulp.dest('app/scripts'))
});

<<<<<<< HEAD
//ç”Ÿæˆå‘å¸ƒçŽ¯å¢ƒçŽ¯å¢ƒé…ç½®æ–‡ä»¶
=======
//Éú³É·¢²¼»·¾³»·¾³ÅäÖÃÎÄ¼þ
>>>>>>> f-9457
gulp.task('config-prod', function () {
  gulp.src('app/config/prodConfig.json')
    .pipe(gulpNgConfig('baseConfig'))
    .pipe(rename("baseConfig.js"))
    .pipe(gulp.dest('app/scripts'))
});

<<<<<<< HEAD
//ç”ŸæˆiOSå•†åº—å‘å¸ƒçŽ¯å¢ƒçŽ¯å¢ƒé…ç½®æ–‡ä»¶
=======
//Éú³ÉiOSÉÌµê·¢²¼»·¾³»·¾³ÅäÖÃÎÄ¼þ
>>>>>>> f-9457
gulp.task('config-ios-appStore-prod', function () {
  gulp.src('app/config/iOSAppStoreConfig.json')
    .pipe(gulpNgConfig('baseConfig'))
    .pipe(rename("baseConfig.js"))
    .pipe(gulp.dest('app/scripts'))
});

<<<<<<< HEAD
//ç”ŸæˆiOSå‘å¸ƒçŽ¯å¢ƒçŽ¯å¢ƒé…ç½®æ–‡ä»¶
=======
//Éú³ÉiOS·¢²¼»·¾³»·¾³ÅäÖÃÎÄ¼þ
>>>>>>> f-9457
gulp.task('config-prod', function () {
  gulp.src('app/config/prodConfig.json')
    .pipe(gulpNgConfig('baseConfig'))
    .pipe(rename("baseConfig.js"))
    .pipe(gulp.dest('app/scripts'))
});

<<<<<<< HEAD
//å¤åˆ¶å¼€å‘çŽ¯å¢ƒ config.xml
=======
//¸´ÖÆ¿ª·¢»·¾³ config.xml
>>>>>>> f-9457
gulp.task('copy-iosAppStore-config', function () {
  return gulp.src(configIosAppStorePath)
    .pipe(gulp.dest(''));
});

<<<<<<< HEAD
//åŽ‹ç¼©css
=======
//Ñ¹Ëõcss
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
//åˆå¹¶åŽ‹ç¼©ä¸‘åŒ–Js
=======
//ºÏ²¢Ñ¹Ëõ³ó»¯Js
>>>>>>> f-9457
gulp.task('scripts', function () {
  return gulp.src(jsFilePath)
    .pipe(concat('app.bundle.js'))
    .pipe(gulp.dest('www/build')) // write source file for debug
    .pipe(rename({suffix: '.min'}))   //renameÑ¹ËõºóµÄÎÄ¼þÃû
    .pipe(uglify())    //Ñ¹Ëõ
    .pipe(gulp.dest('www/build'));  //Êä³ö
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
// åˆ›å»ºå¤šå±‚ç›®å½•
=======
// ´´½¨¶à²ãÄ¿Â¼
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
//æ‹·è´æ–‡ä»¶
function copyfile(oldPath, newPath) {
  //console.log('å¤åˆ¶' + oldPath + ' -> ' + newPath);
=======
//¿½±´ÎÄ¼þ
function copyfile(oldPath, newPath) {
  //console.log('¸´ÖÆ' + oldPath + ' -> ' + newPath);
>>>>>>> f-9457

  var stat = fs.lstatSync(oldPath);
  if (stat.isDirectory()) {
    console.log(oldPath + 'ÊÇÄ¿Â¼');
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
  mac éƒ¨åˆ†
   console.log(oldPath+"æ—§");
   var newPath = oldPath.replace('/app/', '/www/build/');
   console.log(newPath+"æ–°");
   var newDirPathTemp = newPath.split("/");
  */
  console.log(oldPath+'æ—§');
  var newPath = oldPath.replace('\\app\\', '\\www\\build\\');
  console.log(newPath+'æ–°');
=======
  mac ²¿·Ö
   console.log(oldPath+"¾É");
   var newPath = oldPath.replace('/app/', '/www/build/');
   console.log(newPath+"ÐÂ");
   var newDirPathTemp = newPath.split("/");
  */
  console.log(oldPath+'¾É');
  var newPath = oldPath.replace('\\app\\', '\\www\\build\\');
  console.log(newPath+'ÐÂ');
>>>>>>> f-9457
  var newDirPathTemp = newPath.split("\\");

  var currentPath = fs.realpathSync('.');

  var newDirPath = [];
  for (var i = 0; i < newDirPathTemp.length - 1; i++) {
    newDirPath[i] = newDirPathTemp[i];
  }
  newDirPath = newDirPath.join("\\");
<<<<<<< HEAD
  // ä¿®æ”¹æˆ–å¢žåŠ æ—¶
  if ('added' == e.type || 'changed' == e.type || 'renamed' == e.type) {

    // åˆ¤æ–­ç›®å½•æ˜¯å¦å­˜åœ¨ï¼Œä¸å­˜åœ¨åˆ™åˆ›å»º
=======
  // ÐÞ¸Ä»òÔö¼ÓÊ±
  if ('added' == e.type || 'changed' == e.type || 'renamed' == e.type) {

    // ÅÐ¶ÏÄ¿Â¼ÊÇ·ñ´æÔÚ£¬²»´æÔÚÔò´´½¨
>>>>>>> f-9457
    fs.exists(newDirPath, function (exists) {
      if (exists) {
        console.log("ÎÄ¼þ¼Ð´æÔÚ");
        copyfile(oldPath, newPath);
      } else {
<<<<<<< HEAD
        console.log("æ–‡ä»¶å¤¹ä¸å­˜åœ¨ï¼Œåˆ™åˆ›å»ºç›®å½•");

       mkdirs(newDirPath);

        //å»¶æ—¶ï¼Œç­‰å¾…ç›®å½•åˆ›å»ºå®Œæˆ
=======
        console.log("ÎÄ¼þ¼Ð²»´æÔÚ£¬Ôò´´½¨Ä¿Â¼");

       mkdirs(newDirPath);

        //ÑÓÊ±£¬µÈ´ýÄ¿Â¼´´½¨Íê³É
>>>>>>> f-9457
        setTimeout(function () {
          copyfile(oldPath, newPath);
        }, 200);
      }
    });
  } else if ('deleted' == e.type) { //É¾³ý
    fs.unlink(newPath, function (err) {
      console.log('É¾³ý newPath ' + newPath + err);
    });
  }
}

<<<<<<< HEAD
// ç›‘å¬ä»»åŠ¡ è¿è¡Œè¯­å¥ gulp watch
=======
// ¼àÌýÈÎÎñ ÔËÐÐÓï¾ä gulp watch
>>>>>>> f-9457
gulp.task('watch', function () {
  server.listen(port, function (err) {
    if (err) {
      return console.log(err);
    }

<<<<<<< HEAD
    //æ‹·è´ä¿®æ”¹è¿‡çš„æ–‡ä»¶
=======
    //¿½±´ÐÞ¸Ä¹ýµÄÎÄ¼þ
>>>>>>> f-9457
    gulp.watch(htmlFilePath, function (e) {
      console.log('ÓÐ±ä¶¯µÄÎÄ¼þÎª oldPath ' + e.path);
      copyPages(e);
    });

    gulp.watch('app/img/**/**/**/**', function (e) {
      console.log('ÓÐ±ä¶¯µÄÎÄ¼þÎª oldPath ' + e.path);
      copyPages(e);
    });

<<<<<<< HEAD
    // ç›‘å¬sass
=======
    // ¼àÌýsass
>>>>>>> f-9457
    gulp.watch(cssFilePath, function (e) {
      console.log('ÓÐ±ä¶¯µÄÎÄ¼þÎª oldPath ' + e.path);
      gulp.run('sass');
    });

<<<<<<< HEAD
    // ç›‘å¬js
=======
    // ¼àÌýjs
>>>>>>> f-9457
    gulp.watch(jsFilePath, function (e) {
      console.log('ÓÐ±ä¶¯µÄÎÄ¼þÎª oldPath ' + e.path);
      gulp.run('scripts');
    });
  });

});

<<<<<<< HEAD
//æ‰‹åŠ¨æ›´æ–°www/buildä»£ç 
=======
//ÊÖ¶¯¸üÐÂwww/build´úÂë
>>>>>>> f-9457
gulp.task('rebuild', function (callback) {
  runSequence('clean-code', ['copy-img', 'sass', 'scripts', 'html'], callback);
});

<<<<<<< HEAD
//ç”Ÿæˆå¼€å‘çŽ¯å¢ƒä»£ç ç›®å½•
=======
//Éú³É¿ª·¢»·¾³´úÂëÄ¿Â¼
>>>>>>> f-9457
gulp.task('run-dev', function (callback) {
  runSequence('clean', 'config-dev', /*'lint',*/ 'copy-dev-config', 'copy-publish-lib', ['sass', 'scripts', 'html'], callback);
});

<<<<<<< HEAD
//ç”Ÿæˆå‘å¸ƒçŽ¯å¢ƒä»£ç ç›®å½•
=======
//Éú³É·¢²¼»·¾³´úÂëÄ¿Â¼
>>>>>>> f-9457
gulp.task('run-prod', function (callback) {
  runSequence('clean', 'config-prod', /*'lint',*/ 'copy-prod-config', 'copy-publish-lib', ['sass', 'scripts', 'html'], callback);
});

<<<<<<< HEAD
//ç”Ÿæˆå‘å¸ƒçŽ¯å¢ƒä»£ç ç›®å½•
=======
//Éú³É·¢²¼»·¾³´úÂëÄ¿Â¼
>>>>>>> f-9457
gulp.task('run-ios-prod', function (callback) {
  runSequence('clean', 'config-ios-appStore-prod', /*'lint',*/ 'copy-ios-appStore-config', 'copy-publish-lib', ['sass', 'scripts', 'html'], callback);
});


<<<<<<< HEAD
//é»˜è®¤ä»»åŠ¡
=======
//Ä¬ÈÏÈÎÎñ
>>>>>>> f-9457
gulp.task('default', ['run-dev']);
