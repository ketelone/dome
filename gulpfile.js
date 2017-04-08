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
var notify = require('gulp-notify');//��ʾ��Ϣ
var gulpNgConfig = require('gulp-ng-config');//��ʾ��Ϣ
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
//清除自动生成的目录文件
=======
//����Զ����ɵ�Ŀ¼�ļ�
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
//动态配置android 即时通讯的
=======
//��̬����android ��ʱͨѶ��
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
//语法检查
=======
//�﷨���
>>>>>>> f-9457
gulp.task('lint', function () {
  return gulp.src(jsFilePath)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

<<<<<<< HEAD
//复制页面到运行目录
=======
//����ҳ�浽����Ŀ¼
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
//新建复制页面任务
gulp.task('html', [/*'rootHtml',*/ 'pagesHtml']);

//复制开发环境的依赖库文件
=======
//�½�����ҳ������
gulp.task('html', [/*'rootHtml',*/ 'pagesHtml']);

//���ƿ����������������ļ�
>>>>>>> f-9457
gulp.task('copy-dev-libs', function () {
  return gulp.src(libDevFilePath)
    //.pipe(useref({noAssets: true}, lazypipe().pipe(sourcemaps.init, {loadMaps: true})))
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('www/build/lib'));
});

<<<<<<< HEAD
//复制发布环境的依赖库文件
=======
//���Ʒ����������������ļ�
>>>>>>> f-9457
gulp.task('copy-publish-libs', function () {
  return gulp.src(libPublishFilePath)
    //.pipe(useref({noAssets: true}, lazypipe().pipe(sourcemaps.init, {loadMaps: true})))
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('www/build/lib'));
});

<<<<<<< HEAD
//复制图片文件
=======
//����ͼƬ�ļ�
>>>>>>> f-9457
gulp.task('copy-img', function () {
  return gulp.src(imgFilePath)
    .pipe(gulp.dest('www/build/img'));
});

<<<<<<< HEAD
//复制开发环境 config.xml
=======
//���ƿ������� config.xml
>>>>>>> f-9457
gulp.task('copy-dev-config', function () {
  return gulp.src(configDEVPath)
    .pipe(gulp.dest(''));
});

<<<<<<< HEAD
//复制发布环境 config.xml
=======
//���Ʒ������� config.xml
>>>>>>> f-9457
gulp.task('copy-prod-config', function () {
  return gulp.src(configPRODPath)
    .pipe(gulp.dest(''));
});

<<<<<<< HEAD
//复制发布环境 config.xml
=======
//���Ʒ������� config.xml
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
//定义开发环境的依赖库文件任务
=======
//���忪���������������ļ�����
>>>>>>> f-9457
gulp.task('copy-dev-lib', function (callback) {
  runSequence('copy-dev-libs', 'copy-img', 'copy-common-js-libs', callback);
});

<<<<<<< HEAD
//定义发布环境的依赖库文件任务
=======
//���巢���������������ļ�����
>>>>>>> f-9457
gulp.task('copy-publish-lib', function (callback) {
  runSequence('copy-publish-libs', 'copy-img', 'copy-common-js-libs', callback);
});

<<<<<<< HEAD
//合并压缩css文件
=======
//�ϲ�ѹ��css�ļ�
>>>>>>> f-9457
gulp.task('sass', function () {
  return gulp.src(['app/theme/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('www/build/css'));
});


<<<<<<< HEAD
//生成开发环境环境配置文件
=======
//���ɿ����������������ļ�
>>>>>>> f-9457
gulp.task('config-dev', function () {
  gulp.src('app/config/devConfig.json')
    .pipe(gulpNgConfig('baseConfig'))
    .pipe(rename("baseConfig.js"))
    .pipe(gulp.dest('app/scripts'))
});

<<<<<<< HEAD
//生成发布环境环境配置文件
=======
//���ɷ����������������ļ�
>>>>>>> f-9457
gulp.task('config-prod', function () {
  gulp.src('app/config/prodConfig.json')
    .pipe(gulpNgConfig('baseConfig'))
    .pipe(rename("baseConfig.js"))
    .pipe(gulp.dest('app/scripts'))
});

<<<<<<< HEAD
//生成iOS商店发布环境环境配置文件
=======
//����iOS�̵귢���������������ļ�
>>>>>>> f-9457
gulp.task('config-ios-appStore-prod', function () {
  gulp.src('app/config/iOSAppStoreConfig.json')
    .pipe(gulpNgConfig('baseConfig'))
    .pipe(rename("baseConfig.js"))
    .pipe(gulp.dest('app/scripts'))
});

<<<<<<< HEAD
//生成iOS发布环境环境配置文件
=======
//����iOS�����������������ļ�
>>>>>>> f-9457
gulp.task('config-prod', function () {
  gulp.src('app/config/prodConfig.json')
    .pipe(gulpNgConfig('baseConfig'))
    .pipe(rename("baseConfig.js"))
    .pipe(gulp.dest('app/scripts'))
});

<<<<<<< HEAD
//复制开发环境 config.xml
=======
//���ƿ������� config.xml
>>>>>>> f-9457
gulp.task('copy-iosAppStore-config', function () {
  return gulp.src(configIosAppStorePath)
    .pipe(gulp.dest(''));
});

<<<<<<< HEAD
//压缩css
=======
//ѹ��css
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
//合并压缩丑化Js
=======
//�ϲ�ѹ����Js
>>>>>>> f-9457
gulp.task('scripts', function () {
  return gulp.src(jsFilePath)
    .pipe(concat('app.bundle.js'))
    .pipe(gulp.dest('www/build')) // write source file for debug
    .pipe(rename({suffix: '.min'}))   //renameѹ������ļ���
    .pipe(uglify())    //ѹ��
    .pipe(gulp.dest('www/build'));  //���
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
// 创建多层目录
=======
// �������Ŀ¼
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
//拷贝文件
function copyfile(oldPath, newPath) {
  //console.log('复制' + oldPath + ' -> ' + newPath);
=======
//�����ļ�
function copyfile(oldPath, newPath) {
  //console.log('����' + oldPath + ' -> ' + newPath);
>>>>>>> f-9457

  var stat = fs.lstatSync(oldPath);
  if (stat.isDirectory()) {
    console.log(oldPath + '��Ŀ¼');
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
  mac 部分
   console.log(oldPath+"旧");
   var newPath = oldPath.replace('/app/', '/www/build/');
   console.log(newPath+"新");
   var newDirPathTemp = newPath.split("/");
  */
  console.log(oldPath+'旧');
  var newPath = oldPath.replace('\\app\\', '\\www\\build\\');
  console.log(newPath+'新');
=======
  mac ����
   console.log(oldPath+"��");
   var newPath = oldPath.replace('/app/', '/www/build/');
   console.log(newPath+"��");
   var newDirPathTemp = newPath.split("/");
  */
  console.log(oldPath+'��');
  var newPath = oldPath.replace('\\app\\', '\\www\\build\\');
  console.log(newPath+'��');
>>>>>>> f-9457
  var newDirPathTemp = newPath.split("\\");

  var currentPath = fs.realpathSync('.');

  var newDirPath = [];
  for (var i = 0; i < newDirPathTemp.length - 1; i++) {
    newDirPath[i] = newDirPathTemp[i];
  }
  newDirPath = newDirPath.join("\\");
<<<<<<< HEAD
  // 修改或增加时
  if ('added' == e.type || 'changed' == e.type || 'renamed' == e.type) {

    // 判断目录是否存在，不存在则创建
=======
  // �޸Ļ�����ʱ
  if ('added' == e.type || 'changed' == e.type || 'renamed' == e.type) {

    // �ж�Ŀ¼�Ƿ���ڣ��������򴴽�
>>>>>>> f-9457
    fs.exists(newDirPath, function (exists) {
      if (exists) {
        console.log("�ļ��д���");
        copyfile(oldPath, newPath);
      } else {
<<<<<<< HEAD
        console.log("文件夹不存在，则创建目录");

       mkdirs(newDirPath);

        //延时，等待目录创建完成
=======
        console.log("�ļ��в����ڣ��򴴽�Ŀ¼");

       mkdirs(newDirPath);

        //��ʱ���ȴ�Ŀ¼�������
>>>>>>> f-9457
        setTimeout(function () {
          copyfile(oldPath, newPath);
        }, 200);
      }
    });
  } else if ('deleted' == e.type) { //ɾ��
    fs.unlink(newPath, function (err) {
      console.log('ɾ�� newPath ' + newPath + err);
    });
  }
}

<<<<<<< HEAD
// 监听任务 运行语句 gulp watch
=======
// �������� ������� gulp watch
>>>>>>> f-9457
gulp.task('watch', function () {
  server.listen(port, function (err) {
    if (err) {
      return console.log(err);
    }

<<<<<<< HEAD
    //拷贝修改过的文件
=======
    //�����޸Ĺ����ļ�
>>>>>>> f-9457
    gulp.watch(htmlFilePath, function (e) {
      console.log('�б䶯���ļ�Ϊ oldPath ' + e.path);
      copyPages(e);
    });

    gulp.watch('app/img/**/**/**/**', function (e) {
      console.log('�б䶯���ļ�Ϊ oldPath ' + e.path);
      copyPages(e);
    });

<<<<<<< HEAD
    // 监听sass
=======
    // ����sass
>>>>>>> f-9457
    gulp.watch(cssFilePath, function (e) {
      console.log('�б䶯���ļ�Ϊ oldPath ' + e.path);
      gulp.run('sass');
    });

<<<<<<< HEAD
    // 监听js
=======
    // ����js
>>>>>>> f-9457
    gulp.watch(jsFilePath, function (e) {
      console.log('�б䶯���ļ�Ϊ oldPath ' + e.path);
      gulp.run('scripts');
    });
  });

});

<<<<<<< HEAD
//手动更新www/build代码
=======
//�ֶ�����www/build����
>>>>>>> f-9457
gulp.task('rebuild', function (callback) {
  runSequence('clean-code', ['copy-img', 'sass', 'scripts', 'html'], callback);
});

<<<<<<< HEAD
//生成开发环境代码目录
=======
//���ɿ�����������Ŀ¼
>>>>>>> f-9457
gulp.task('run-dev', function (callback) {
  runSequence('clean', 'config-dev', /*'lint',*/ 'copy-dev-config', 'copy-publish-lib', ['sass', 'scripts', 'html'], callback);
});

<<<<<<< HEAD
//生成发布环境代码目录
=======
//���ɷ�����������Ŀ¼
>>>>>>> f-9457
gulp.task('run-prod', function (callback) {
  runSequence('clean', 'config-prod', /*'lint',*/ 'copy-prod-config', 'copy-publish-lib', ['sass', 'scripts', 'html'], callback);
});

<<<<<<< HEAD
//生成发布环境代码目录
=======
//���ɷ�����������Ŀ¼
>>>>>>> f-9457
gulp.task('run-ios-prod', function (callback) {
  runSequence('clean', 'config-ios-appStore-prod', /*'lint',*/ 'copy-ios-appStore-config', 'copy-publish-lib', ['sass', 'scripts', 'html'], callback);
});


<<<<<<< HEAD
//默认任务
=======
//Ĭ������
>>>>>>> f-9457
gulp.task('default', ['run-dev']);
