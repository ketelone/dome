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

//����Զ����ɵ�Ŀ¼�ļ�
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


//��̬����android ��ʱͨѶ��
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


//�﷨���
gulp.task('lint', function () {
  return gulp.src(jsFilePath)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//����ҳ�浽����Ŀ¼
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

//�½�����ҳ������
gulp.task('html', [/*'rootHtml',*/ 'pagesHtml']);

//���ƿ����������������ļ�
gulp.task('copy-dev-libs', function () {
  return gulp.src(libDevFilePath)
    //.pipe(useref({noAssets: true}, lazypipe().pipe(sourcemaps.init, {loadMaps: true})))
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('www/build/lib'));
});

//���Ʒ����������������ļ�
gulp.task('copy-publish-libs', function () {
  return gulp.src(libPublishFilePath)
    //.pipe(useref({noAssets: true}, lazypipe().pipe(sourcemaps.init, {loadMaps: true})))
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('www/build/lib'));
});

//����ͼƬ�ļ�
gulp.task('copy-img', function () {
  return gulp.src(imgFilePath)
    .pipe(gulp.dest('www/build/img'));
});

//���ƿ������� config.xml
gulp.task('copy-dev-config', function () {
  return gulp.src(configDEVPath)
    .pipe(gulp.dest(''));
});

//���Ʒ������� config.xml
gulp.task('copy-prod-config', function () {
  return gulp.src(configPRODPath)
    .pipe(gulp.dest(''));
});

//���Ʒ������� config.xml
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

//���忪���������������ļ�����
gulp.task('copy-dev-lib', function (callback) {
  runSequence('copy-dev-libs', 'copy-img', 'copy-common-js-libs', callback);
});

//���巢���������������ļ�����
gulp.task('copy-publish-lib', function (callback) {
  runSequence('copy-publish-libs', 'copy-img', 'copy-common-js-libs', callback);
});

//�ϲ�ѹ��css�ļ�
gulp.task('sass', function () {
  return gulp.src(['app/theme/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('www/build/css'));
});


//���ɿ����������������ļ�
gulp.task('config-dev', function () {
  gulp.src('app/config/devConfig.json')
    .pipe(gulpNgConfig('baseConfig'))
    .pipe(rename("baseConfig.js"))
    .pipe(gulp.dest('app/scripts'))
});

//���ɷ����������������ļ�
gulp.task('config-prod', function () {
  gulp.src('app/config/prodConfig.json')
    .pipe(gulpNgConfig('baseConfig'))
    .pipe(rename("baseConfig.js"))
    .pipe(gulp.dest('app/scripts'))
});

//����iOS�̵귢���������������ļ�
gulp.task('config-ios-appStore-prod', function () {
  gulp.src('app/config/iOSAppStoreConfig.json')
    .pipe(gulpNgConfig('baseConfig'))
    .pipe(rename("baseConfig.js"))
    .pipe(gulp.dest('app/scripts'))
});

//����iOS�����������������ļ�
gulp.task('config-prod', function () {
  gulp.src('app/config/prodConfig.json')
    .pipe(gulpNgConfig('baseConfig'))
    .pipe(rename("baseConfig.js"))
    .pipe(gulp.dest('app/scripts'))
});

//���ƿ������� config.xml
gulp.task('copy-iosAppStore-config', function () {
  return gulp.src(configIosAppStorePath)
    .pipe(gulp.dest(''));
});

//ѹ��css
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

//�ϲ�ѹ����Js
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

// �������Ŀ¼
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

//�����ļ�
function copyfile(oldPath, newPath) {
  //console.log('����' + oldPath + ' -> ' + newPath);

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
  mac ����
   console.log(oldPath+"��");
   var newPath = oldPath.replace('/app/', '/www/build/');
   console.log(newPath+"��");
   var newDirPathTemp = newPath.split("/");
  */
  console.log(oldPath+'��');
  var newPath = oldPath.replace('\\app\\', '\\www\\build\\');
  console.log(newPath+'��');
  var newDirPathTemp = newPath.split("\\");

  var currentPath = fs.realpathSync('.');

  var newDirPath = [];
  for (var i = 0; i < newDirPathTemp.length - 1; i++) {
    newDirPath[i] = newDirPathTemp[i];
  }
  newDirPath = newDirPath.join("\\");
  // �޸Ļ�����ʱ
  if ('added' == e.type || 'changed' == e.type || 'renamed' == e.type) {

    // �ж�Ŀ¼�Ƿ���ڣ��������򴴽�
    fs.exists(newDirPath, function (exists) {
      if (exists) {
        console.log("�ļ��д���");
        copyfile(oldPath, newPath);
      } else {
        console.log("�ļ��в����ڣ��򴴽�Ŀ¼");

       mkdirs(newDirPath);

        //��ʱ���ȴ�Ŀ¼�������
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

// �������� ������� gulp watch
gulp.task('watch', function () {
  server.listen(port, function (err) {
    if (err) {
      return console.log(err);
    }

    //�����޸Ĺ����ļ�
    gulp.watch(htmlFilePath, function (e) {
      console.log('�б䶯���ļ�Ϊ oldPath ' + e.path);
      copyPages(e);
    });

    gulp.watch('app/img/**/**/**/**', function (e) {
      console.log('�б䶯���ļ�Ϊ oldPath ' + e.path);
      copyPages(e);
    });

    // ����sass
    gulp.watch(cssFilePath, function (e) {
      console.log('�б䶯���ļ�Ϊ oldPath ' + e.path);
      gulp.run('sass');
    });

    // ����js
    gulp.watch(jsFilePath, function (e) {
      console.log('�б䶯���ļ�Ϊ oldPath ' + e.path);
      gulp.run('scripts');
    });
  });

});

//�ֶ�����www/build����
gulp.task('rebuild', function (callback) {
  runSequence('clean-code', ['copy-img', 'sass', 'scripts', 'html'], callback);
});

//���ɿ�����������Ŀ¼
gulp.task('run-dev', function (callback) {
  runSequence('clean', 'config-dev', /*'lint',*/ 'copy-dev-config', 'copy-publish-lib', ['sass', 'scripts', 'html'], callback);
});

//���ɷ�����������Ŀ¼
gulp.task('run-prod', function (callback) {
  runSequence('clean', 'config-prod', /*'lint',*/ 'copy-prod-config', 'copy-publish-lib', ['sass', 'scripts', 'html'], callback);
});

//���ɷ�����������Ŀ¼
gulp.task('run-ios-prod', function (callback) {
  runSequence('clean', 'config-ios-appStore-prod', /*'lint',*/ 'copy-ios-appStore-config', 'copy-publish-lib', ['sass', 'scripts', 'html'], callback);
});


//Ĭ������
gulp.task('default', ['run-dev']);
