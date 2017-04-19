// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js


var myApp = angular.module('myApp', [
  'ionic',
  'ngCordova',
  'loginModule',
  'baseConfig',
  'messageModule',
  'indexPageModule',
  'myInfoModule',
  'utilModule',
  'utilsModule',
  'serviceModule',
  'deviceAddModule',
  'HmsModule',
  'productModule',
  'pascalprecht.translate',
  'toiletControlModule',
  'bathroomModule'
]);

var db = null;
angular.module('myApp')
  .run(function ($ionicPlatform, $translate, baseConfig) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
      // alert('language:');
      navigator.globalization.getPreferredLanguage(
        function (language) {
          //  alert('language: ' + language.value + '\n');
          //   alert(language.value=='en-US');
          //     alert(language.value=='zh-CN');
          // var localLanguage=language.value;
          if (language.value == 'zh-CN' || 'zh-Hans-CN') {
            $translate.use('zh');

            //   alert('zh1');
          }
          else if (language.value == 'zh-TW' || 'zh-Hans-TW') {
            $translate.use('tw');

            //   alert('tw1');
          }
          else if (language.value == 'en-US' || 'en-CN') {
            $translate.use('en');

            // alert('en1');

          }
          else if (language.value == 'en-TH' || 'th-CN') {
            $translate.use('th');

            //   alert('th1');
          }
          else {
            $translate.use('en');
            //  alert('en1');
          }

        },
        function () {
          // alert('Error getting locale\n');
        });
    });

    document.addEventListener('deviceready', function() {
      console.log('openDatabase');
      db = window.sqlitePlugin.openDatabase({name: 'ko.db', location: 'default'});

      //T_CTM_PARTY
      db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS T_CTM_PARTY ("+
          "[PARTY_ID] bigint NOT NULL ,"+
          "[PARTY_TYPE] nvarchar(30) NULL ,"+
          "[PARTY_ACCOUNT] nvarchar(30) NULL ,"+
          "[PASSWORD] nvarchar(30) NULL ,"+
          "[HEAD_PORTRAIT] nvarchar(240) NULL ,"+
          "[PARTY_NAME] nvarchar(30) NULL ,"+
          "[SEX] nvarchar(30) NULL ,"+
          "[PHONE_NUMBER] nvarchar(30) NULL ,"+
          "[EMAIL_ADDRESS] nvarchar(30) NULL ,"+
          "[ROLE_ID] bigint NULL ,"+
          "[PARTY_STATUS] nvarchar(30) NULL ,"+
          "[REFERENCE_SOURCE] nvarchar(30) NULL ,"+
          "[CREATION_DATE] datetime NOT NULL DEFAULT (sysdatetime()) ,"+
          "[CREATED_BY] nvarchar(100) NOT NULL DEFAULT ('-1') ,"+
          "[LAST_UPDATE_DATE] datetime NOT NULL DEFAULT (sysdatetime()) ,"+
          "[LAST_UPDATED_BY] nvarchar(100) NOT NULL DEFAULT ('-1') ,"+
          "[LAST_UPDATE_LOGIN] nvarchar(100) NOT NULL DEFAULT ('-1') ,"+
          "[OBJECT_VERSION_NUMBER] bigint NOT NULL DEFAULT ((1)) ,"+
          "[REQUEST_ID] bigint NULL ,"+
          "[PROGRAM_ID] bigint NULL ,"+
          "[ATTRIBUTE_CATEGORY] nvarchar(100) NULL ,"+
          "[ATTRIBUTE1] nvarchar(240) NULL ,"+
          "[ATTRIBUTE2] nvarchar(240) NULL ,"+
          "[ATTRIBUTE3] nvarchar(240) NULL ,"+
          "[ATTRIBUTE4] nvarchar(240) NULL ,"+
          "[ATTRIBUTE5] nvarchar(240) NULL ,"+
          "[ATTRIBUTE6] nvarchar(240) NULL ,"+
          "[ATTRIBUTE7] nvarchar(240) NULL ,"+
          "[ATTRIBUTE8] nvarchar(240) NULL ,"+
          "[ATTRIBUTE9] nvarchar(240) NULL ,"+
          "[ATTRIBUTE10] nvarchar(240) NULL ,"+
          "[ATTRIBUTE11] nvarchar(240) NULL ,"+
          "[ATTRIBUTE12] nvarchar(240) NULL ,"+
          "[ATTRIBUTE13] nvarchar(240) NULL ,"+
          "[ATTRIBUTE14] nvarchar(240) NULL ,"+
          "[ATTRIBUTE15] nvarchar(240) NULL ,"+
          "PRIMARY KEY ([PARTY_ID]),"+
          "UNIQUE ([PARTY_ID] ASC)"+
        ")");

        tx.executeSql("CREATE TABLE IF NOT EXISTS T_CTM_PARTY_BOX (" +
          "[PARTY_BOX_DEVICE_ID] bigint NOT NULL ," +
          "[PARTY_ID] bigint NULL ," +
          "[BOX_ID] bigint NULL ," +
          "[REFERENCE_SOURCE] nvarchar(30) NULL ," +
          "[CREATION_DATE] datetime NOT NULL DEFAULT (sysdatetime()) ," +
          "[CREATED_BY] nvarchar(100) NOT NULL DEFAULT ('-1') ," +
          "[LAST_UPDATE_DATE] datetime NOT NULL DEFAULT (sysdatetime()) ," +
          "[LAST_UPDATED_BY] nvarchar(100) NOT NULL DEFAULT ('-1') ," +
          "[LAST_UPDATE_LOGIN] nvarchar(100) NOT NULL DEFAULT ('-1') ," +
          "[OBJECT_VERSION_NUMBER] bigint NOT NULL DEFAULT ((1)) ," +
          "[REQUEST_ID] bigint NULL ," +
          "[PROGRAM_ID] bigint NULL ," +
          "[ATTRIBUTE_CATEGORY] nvarchar(100) NULL ," +
          "[ATTRIBUTE1] nvarchar(240) NULL ," +
          "[ATTRIBUTE2] nvarchar(240) NULL ," +
          "[ATTRIBUTE3] nvarchar(240) NULL ," +
          "[ATTRIBUTE4] nvarchar(240) NULL ," +
          "[ATTRIBUTE5] nvarchar(240) NULL ," +
          "[ATTRIBUTE6] nvarchar(240) NULL ," +
          "[ATTRIBUTE7] nvarchar(240) NULL ," +
          "[ATTRIBUTE8] nvarchar(240) NULL ," +
          "[ATTRIBUTE9] nvarchar(240) NULL ," +
          "[ATTRIBUTE10] nvarchar(240) NULL ," +
          "[ATTRIBUTE11] nvarchar(240) NULL ," +
          "[ATTRIBUTE12] nvarchar(240) NULL ," +
          "[ATTRIBUTE13] nvarchar(240) NULL ," +
          "[ATTRIBUTE14] nvarchar(240) NULL ," +
          "[ATTRIBUTE15] nvarchar(240) NULL ," +
          "PRIMARY KEY ([PARTY_BOX_DEVICE_ID])" +
        ")");

        tx.executeSql("CREATE TABLE IF NOT EXISTS T_CTM_PARTY_BOX_DEVICE ("  +
          "[PARTY_BOX_DEVICE_ID] bigint NOT NULL ," +
          "[PARTY_ID] bigint NULL ," +
          "[BOX_ID] bigint NULL ," +
          "[DEVICE_ID] bigint NULL ," +
          "[REFERENCE_SOURCE] nvarchar(30) NULL ," +
          "[CREATION_DATE] datetime NOT NULL DEFAULT (sysdatetime()) ," +
          "[CREATED_BY] nvarchar(100) NOT NULL DEFAULT ('-1') ," +
          "[LAST_UPDATE_DATE] datetime NOT NULL DEFAULT (sysdatetime()) ," +
          "[LAST_UPDATED_BY] nvarchar(100) NOT NULL DEFAULT ('-1') ," +
          "[LAST_UPDATE_LOGIN] nvarchar(100) NOT NULL DEFAULT ('-1') ," +
          "[OBJECT_VERSION_NUMBER] bigint NOT NULL DEFAULT ((1)) ," +
          "[REQUEST_ID] bigint NULL ," +
          "[PROGRAM_ID] bigint NULL ," +
          "[ATTRIBUTE_CATEGORY] nvarchar(100) NULL ," +
          "[ATTRIBUTE1] nvarchar(240) NULL ," +
          "[ATTRIBUTE2] nvarchar(240) NULL ," +
          "[ATTRIBUTE3] nvarchar(240) NULL ," +
          "[ATTRIBUTE4] nvarchar(240) NULL ," +
          "[ATTRIBUTE5] nvarchar(240) NULL ," +
          "[ATTRIBUTE6] nvarchar(240) NULL ," +
          "[ATTRIBUTE7] nvarchar(240) NULL ," +
          "[ATTRIBUTE8] nvarchar(240) NULL ," +
          "[ATTRIBUTE9] nvarchar(240) NULL ," +
          "[ATTRIBUTE10] nvarchar(240) NULL ," +
          "[ATTRIBUTE11] nvarchar(240) NULL ," +
          "[ATTRIBUTE12] nvarchar(240) NULL ," +
          "[ATTRIBUTE13] nvarchar(240) NULL ," +
          "[ATTRIBUTE14] nvarchar(240) NULL ," +
          "[ATTRIBUTE15] nvarchar(240) NULL ," +
          "PRIMARY KEY ([PARTY_BOX_DEVICE_ID])" +
        ")");

        tx.executeSql("CREATE TABLE IF NOT EXISTS T_CTM_PARTY_DEVICE (" +
          "[PARTY_DEVICE_ID] bigint NOT NULL ," +
          "[PARTY_ID] bigint NULL ," +
          "[DEVICE_ID] bigint NULL ," +
          "[REFERENCE_SOURCE] nvarchar(30) NULL ," +
          "[CREATION_DATE] datetime NOT NULL DEFAULT (sysdatetime()) ," +
          "[CREATED_BY] nvarchar(100) NOT NULL DEFAULT ('-1') ," +
          "[LAST_UPDATE_DATE] datetime NOT NULL DEFAULT (sysdatetime()) ," +
          "[LAST_UPDATED_BY] nvarchar(100) NOT NULL DEFAULT ('-1') ," +
          "[LAST_UPDATE_LOGIN] nvarchar(100) NOT NULL DEFAULT ('-1') ," +
          "[OBJECT_VERSION_NUMBER] bigint NOT NULL DEFAULT ((1)) ," +
          "[REQUEST_ID] bigint NULL ," +
          "[PROGRAM_ID] bigint NULL ," +
          "[ATTRIBUTE_CATEGORY] nvarchar(100) NULL ," +
          "[ATTRIBUTE1] nvarchar(240) NULL ," +
          "[ATTRIBUTE2] nvarchar(240) NULL ," +
          "[ATTRIBUTE3] nvarchar(240) NULL ," +
          "[ATTRIBUTE4] nvarchar(240) NULL ," +
          "[ATTRIBUTE5] nvarchar(240) NULL ," +
          "[ATTRIBUTE6] nvarchar(240) NULL ," +
          "[ATTRIBUTE7] nvarchar(240) NULL ," +
          "[ATTRIBUTE8] nvarchar(240) NULL ," +
          "[ATTRIBUTE9] nvarchar(240) NULL ," +
          "[ATTRIBUTE10] nvarchar(240) NULL ," +
          "[ATTRIBUTE11] nvarchar(240) NULL ," +
          "[ATTRIBUTE12] nvarchar(240) NULL ," +
          "[ATTRIBUTE13] nvarchar(240) NULL ," +
          "[ATTRIBUTE14] nvarchar(240) NULL ," +
          "[ATTRIBUTE15] nvarchar(240) NULL ," +
          "PRIMARY KEY ([PARTY_DEVICE_ID])" +
        ")");

        tx.executeSql("CREATE TABLE IF NOT EXISTS T_CTM_PARTY_GROUP (" +
          "[PARTY_GROUP_ID] bigint NOT NULL ," +
          "[PARTY_ID] bigint NULL ," +
          "[GROUP_ID] bigint NULL ," +
          "[ROOT_FLAG] nvarchar(30) NULL ," +
          "[DEFAULT_FLAG] nvarchar(30) NULL ," +
          "[REFERENCE_SOURCE] nvarchar(30) NULL ," +
          "[CREATION_DATE] datetime NOT NULL DEFAULT (sysdatetime()) ," +
          "[CREATED_BY] nvarchar(100) NOT NULL DEFAULT ('-1') ," +
          "[LAST_UPDATE_DATE] datetime NOT NULL DEFAULT (sysdatetime()) ," +
          "[LAST_UPDATED_BY] nvarchar(100) NOT NULL DEFAULT ('-1') ," +
          "[LAST_UPDATE_LOGIN] nvarchar(100) NOT NULL DEFAULT ('-1') ," +
          "[OBJECT_VERSION_NUMBER] bigint NOT NULL DEFAULT ((1)) ," +
          "[REQUEST_ID] bigint NULL ," +
          "[PROGRAM_ID] bigint NULL ," +
          "[ATTRIBUTE_CATEGORY] nvarchar(100) NULL ," +
          "[ATTRIBUTE1] nvarchar(240) NULL ," +
          "[ATTRIBUTE2] nvarchar(240) NULL ," +
          "[ATTRIBUTE3] nvarchar(240) NULL ," +
          "[ATTRIBUTE4] nvarchar(240) NULL ," +
          "[ATTRIBUTE5] nvarchar(240) NULL ," +
          "[ATTRIBUTE6] nvarchar(240) NULL ," +
          "[ATTRIBUTE7] nvarchar(240) NULL ," +
          "[ATTRIBUTE8] nvarchar(240) NULL ," +
          "[ATTRIBUTE9] nvarchar(240) NULL ," +
          "[ATTRIBUTE10] nvarchar(240) NULL ," +
          "[ATTRIBUTE11] nvarchar(240) NULL ," +
          "[ATTRIBUTE12] nvarchar(240) NULL ," +
          "[ATTRIBUTE13] nvarchar(240) NULL ," +
          "[ATTRIBUTE14] nvarchar(240) NULL ," +
          "[ATTRIBUTE15] nvarchar(240) NULL ," +
          "PRIMARY KEY ([PARTY_GROUP_ID])" +
        ")");

        tx.executeSql("CREATE TABLE IF NOT EXISTS T_CTM_PARTY_GROUP_DEVICE (" +
          "[GROUP_DEVICE_ID] bigint NOT NULL ," +
          "[PARTY_ID] bigint NULL ," +
          "[GROUP_ID] bigint NULL ," +
          "[DEVICE_ID] bigint NULL ," +
          "[REFERENCE_SOURCE] nvarchar(30) NULL ," +
          "[CREATION_DATE] datetime NOT NULL DEFAULT (sysdatetime()) ," +
          "[CREATED_BY] nvarchar(100) NOT NULL DEFAULT ('-1') ," +
          "[LAST_UPDATE_DATE] datetime NOT NULL DEFAULT (sysdatetime()) ," +
          "[LAST_UPDATED_BY] nvarchar(100) NOT NULL DEFAULT ('-1') ," +
          "[LAST_UPDATE_LOGIN] nvarchar(100) NOT NULL DEFAULT ('-1') ," +
          "[OBJECT_VERSION_NUMBER] bigint NOT NULL DEFAULT ((1)) ," +
          "[REQUEST_ID] bigint NULL ," +
          "[PROGRAM_ID] bigint NULL ," +
          "[ATTRIBUTE_CATEGORY] nvarchar(100) NULL ," +
          "[ATTRIBUTE1] nvarchar(240) NULL ," +
          "[ATTRIBUTE2] nvarchar(240) NULL ," +
          "[ATTRIBUTE3] nvarchar(240) NULL ," +
          "[ATTRIBUTE4] nvarchar(240) NULL ," +
          "[ATTRIBUTE5] nvarchar(240) NULL ," +
          "[ATTRIBUTE6] nvarchar(240) NULL ," +
          "[ATTRIBUTE7] nvarchar(240) NULL ," +
          "[ATTRIBUTE8] nvarchar(240) NULL ," +
          "[ATTRIBUTE9] nvarchar(240) NULL ," +
          "[ATTRIBUTE10] nvarchar(240) NULL ," +
          "[ATTRIBUTE11] nvarchar(240) NULL ," +
          "[ATTRIBUTE12] nvarchar(240) NULL ," +
          "[ATTRIBUTE13] nvarchar(240) NULL ," +
          "[ATTRIBUTE14] nvarchar(240) NULL ," +
          "[ATTRIBUTE15] nvarchar(240) NULL ," +
          "PRIMARY KEY ([GROUP_DEVICE_ID])" +
        ")");

        tx.executeSql("CREATE TABLE IF NOT EXISTS T_DVM_DEVICE (" +
          "[DEVICE_ID] bigint NOT NULL ," +
          "[PRODUCT_ID] bigint NULL ," +
          "[SKU_ID] bigint NULL ," +
          "[DEVICE_SN] nvarchar(30) NULL ," +
          "[DEVICE_NAME] nvarchar(30) NULL ," +
          "[LOCATION] nvarchar(240) NULL ," +
          "[CONNECT_MODE] nvarchar(30) NULL ," +
          "[REFERENCE_SOURCE] nvarchar(30) NULL ," +
          "[CREATION_DATE] datetime NOT NULL DEFAULT (sysdatetime()) ," +
          "[CREATED_BY] nvarchar(100) NOT NULL DEFAULT ('-1') ," +
          "[LAST_UPDATE_DATE] datetime NOT NULL DEFAULT (sysdatetime()) ," +
          "[LAST_UPDATED_BY] nvarchar(100) NOT NULL DEFAULT ('-1') ," +
          "[LAST_UPDATE_LOGIN] nvarchar(100) NOT NULL DEFAULT ('-1') ," +
          "[OBJECT_VERSION_NUMBER] bigint NOT NULL DEFAULT ((1)) ," +
          "[REQUEST_ID] bigint NULL ," +
          "[PROGRAM_ID] bigint NULL ," +
          "[ATTRIBUTE_CATEGORY] nvarchar(100) NULL ," +
          "[ATTRIBUTE1] nvarchar(240) NULL ," +
          "[ATTRIBUTE2] nvarchar(240) NULL ," +
          "[ATTRIBUTE3] nvarchar(240) NULL ," +
          "[ATTRIBUTE4] nvarchar(240) NULL ," +
          "[ATTRIBUTE5] nvarchar(240) NULL ," +
          "[ATTRIBUTE6] nvarchar(240) NULL ," +
          "[ATTRIBUTE7] nvarchar(240) NULL ," +
          "[ATTRIBUTE8] nvarchar(240) NULL ," +
          "[ATTRIBUTE9] nvarchar(240) NULL ," +
          "[ATTRIBUTE10] nvarchar(240) NULL ," +
          "[ATTRIBUTE11] nvarchar(240) NULL ," +
          "[ATTRIBUTE12] nvarchar(240) NULL ," +
          "[ATTRIBUTE13] nvarchar(240) NULL ," +
          "[ATTRIBUTE14] nvarchar(240) NULL ," +
          "[ATTRIBUTE15] nvarchar(240) NULL ," +
          "PRIMARY KEY ([DEVICE_ID])" +
        ")");

        tx.executeSql("CREATE TABLE T_CTM_PARTY_SCENARIO (" +
          "[SCENARIO_ID] [bigint] IDENTITY(1,1) NOT NULL," +
          "[PARTY_ID] [bigint] NOT NULL," +
          "[PLUGIN_ID] [bigint] NOT NULL," +
          "[SCENARIO_TYPE] [nvarchar](30) NULL," +
          "[SCENARIO_CODE] [nvarchar](30) NULL," +
          "[SCENARIO_NAME] [nvarchar](30) NULL," +
          "[IMAGE_ADDRESS] [nvarchar](30) NULL," +
          "[REFERENCE_SOURCE] [nvarchar](30) NULL," +
          "[SCENARIO_status] [nvarchar](30) NULL," +
          "[DEFAULT_FLAG] [nvarchar](30) NULL," +
          "[ACTIVE_FLAG] [nvarchar](30) NULL," +
          "[DESCRIPTION] [nvarchar](240) NULL," +
          "[CREATION_DATE] [datetime] NOT NULL," +
          "[CREATED_BY] [nvarchar](100) NOT NULL," +
          "[LAST_UPDATE_DATE] [datetime] NOT NULL," +
          "[LAST_UPDATED_BY] [nvarchar](100) NOT NULL," +
          "[LAST_UPDATE_LOGIN] [nvarchar](100) NOT NULL," +
          "[OBJECT_VERSION_NUMBER] [bigint] NOT NULL," +
          "[REQUEST_ID] [bigint] NULL," +
          "[PROGRAM_ID] [bigint] NULL," +
          "[ATTRIBUTE_CATEGORY] [nvarchar](100) NULL," +
          "[ATTRIBUTE1] [nvarchar](240) NULL," +
          "[ATTRIBUTE2] [nvarchar](240) NULL," +
          "[ATTRIBUTE3] [nvarchar](240) NULL," +
          "[ATTRIBUTE4] [nvarchar](240) NULL," +
          "[ATTRIBUTE5] [nvarchar](240) NULL," +
          "[ATTRIBUTE6] [nvarchar](240) NULL," +
          "[ATTRIBUTE7] [nvarchar](240) NULL," +
          "[ATTRIBUTE8] [nvarchar](240) NULL," +
          "[ATTRIBUTE9] [nvarchar](240) NULL," +
          "[ATTRIBUTE10] [nvarchar](240) NULL," +
          "[ATTRIBUTE11] [nvarchar](240) NULL," +
          "[ATTRIBUTE12] [nvarchar](240) NULL," +
          "[ATTRIBUTE13] [nvarchar](240) NULL," +
          "[ATTRIBUTE14] [nvarchar](240) NULL," +
          "[ATTRIBUTE15] [nvarchar](240) NULL," +
          "PRIMARY KEY ([SCENARIO_ID] ASC)" +
        ")");
      });
      /*db.close(successcb, errorcb);
      //
      var successcb = function(){

      };
      var errorcb = function(msg){

      };*/
    });
  });

angular.module('myApp')
  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$ionicConfigProvider',
    '$translateProvider', '$translateStaticFilesLoaderProvider', 'baseConfig',
    function ($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider,
              $translateProvider, $translateStaticFilesLoaderProvider, baseConfig) {
      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js

      $httpProvider.interceptors.push('httpRequestHeader');//注册过滤器
      $ionicConfigProvider.platform.ios.tabs.style('standard');
      $ionicConfigProvider.platform.ios.tabs.position('bottom');
      $ionicConfigProvider.platform.android.tabs.style('standard');
      $ionicConfigProvider.platform.android.tabs.position('standard');

      $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
      $ionicConfigProvider.platform.android.navBar.alignTitle('center');

      //$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
      $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

      $ionicConfigProvider.platform.ios.views.transition('ios');
      $ionicConfigProvider.platform.android.views.transition('android');


      $translateProvider.preferredLanguage("zh");

      $translateProvider.useStaticFilesLoader({
        prefix: 'build/common/i18n/',
        suffix: '.json'
      });

      $stateProvider
        .state('tabs', {
          url: '/tabs',
          templateUrl: 'build/pages/tab/tabs.html',
          controller: 'TabsCtrl'
        })

        .state('indexPage', {
          url: '/indexPage',
          templateUrl: 'build/pages/index-page/indexPage.html',
          controller: 'indexPageCtrl'
        })

        .state('message', {
          url: '/message',
          templateUrl: 'build/pages/message/message.html',
          controller: 'messageCtrl'

        })

        .state('myInfo', {
          url: '/myInfo',
          templateUrl: 'build/pages/my-info/myInfo.html',
          controller: 'myInfoCtrl'

        })

        .state('guide', {
          url: '/guide',
          templateUrl: 'build/pages/guide/guide.html',
          controller: 'guideCtrl'
        })

        .state('registered', {
          url: '/registered',
          templateUrl: 'build/pages/login/registered/registered.html',
          controller: 'registeredCtrl'
        })

        .state('forgetPassword', {
          url: '/forgetPassword',
          templateUrl: 'build/pages/login/forget-password/forgetPassword.html',
          controller: 'forgetPasswordCtrl'
        })

        .state('test', {
          url: '/test',
          templateUrl: 'build/pages/test/test.html',
          controller: 'testCtrl'
        })

        .state('login', {
          url: '/login',
          templateUrl: 'build/pages/login/login.html',
          controller: 'loginCtrl'
        })
        .state('deviceList', {
          url: '/deviceList',
          templateUrl: 'build/pages/device-add/deviceList.html',
          controller: 'deviceListCtrl'
        })
        .state('boxList', {
          url: '/boxList',
          templateUrl: 'build/pages/device-add/box-add/boxList.html',
          controller: 'boxListCtrl'
        })
        .state('boxOnLine', {
          url: '/boxOnLine',
          templateUrl: 'build/pages/device-add/box-online-List/boxOnLine.html',
          controller: 'boxOnLineCtrl'
        })
        .state('boxAddDevice', {
          url: '/boxAddDevice',
          templateUrl: 'build/pages/device-add/box-add-device/boxAddDevice.html',
          controller: 'boxAddDeviceCtrl'
        })
        //一键场景
        //gohome
        .state('goHome', {
          url: '/goHome',
          templateUrl: 'build/pages/keyscene-gohome/goHome.html',
          controller: 'goHomeCtrl'
        })
        .state('leaveHome', {
          url: '/leaveHome',
          templateUrl: 'build/pages/keyscene-leavehome/leaveHome.html',
          controller: 'leaveHomeCtrl'
        })
        .state('morning', {
          url: '/morning',
          templateUrl: 'build/pages/keyscene-morning/morning.html',
          controller: 'morningCtrl'
        })
        .state('bathing', {
          url: '/bathing',
          templateUrl: 'build/pages/keyscene-bathing/bathing.html',
          controller: 'bathingCtrl'
        })
        .state('spa', {
          url: '/spa',
          templateUrl: 'build/pages/keyscene-spa/spa.html',
          controller: 'spaCtrl'
        })

        .state('period', {
          url: '/period',
          templateUrl: 'build/pages/keyscene-period/period.html',
          controller: 'periodCtrl'
        })
        .state('veil', {
          url: '/veil',
          templateUrl: 'build/pages/keyscene-veil/veil.html',
          controller: 'veilCtrl'
        })
        // 设备控制
        // 设备控制-马桶
        .state('toiletContrl', {
          url: '/toiletContrl',
          templateUrl: 'build/pages/device-controller/toilet-controller/toiletController.html',
          controller: 'toiletControllerCtrl'
        })

        .state('bathroom', {
          url: '/bathroom/:deviceSku',
          templateUrl: 'build/pages/device-controller/bathroom-controller/bathroom.html',
          controller: 'bathroomCtrl'
        })

        .state('bathroomSet', {
          url: '/bathroomSet',
          templateUrl: 'build/pages/device-controller/bathroom-controller/bathroom-set/bathroomSet.html',
          controller: 'bathroomSetCtrl'
        })

        .state('bathroomInfo', {
          url: '/bathroomInfo',
          templateUrl: 'build/pages/device-controller/bathroom-controller/bathroom-info/bathroomInfo.html',
          controller: 'bathroomInfoCtrl'
        });

      // if none of the above states are matched, use this as the fallback
      if (baseConfig.debug) {
        console.log('app.js window.localStorage.appCacheVersion ' + window.localStorage.appCacheVersion);
        console.log('app.js !window.localStorage.appCacheVersion ' + !window.localStorage.appCacheVersion);
        console.log('app.js baseConfig.version.currentVersion ' + baseConfig.version.currentVersion);
      }

      //$xhrFactory('GET','http://localhost:8100/build/pages/application/application.html');

      //$templateRequest('build/pages/application/application.html',true);
      //$urlRouterProvider.otherwise('/guide'); return;


      if (!window.localStorage.needGuid || window.localStorage.needGuid == "true"
        || !window.localStorage.appCacheVersion || window.localStorage.appCacheVersion != baseConfig.version.currentVersion
      ) {
        if (baseConfig.debug) {
          console.log('app.js into guide ');
        }

        $urlRouterProvider.otherwise('/guide');
        window.localStorage.appCacheVersion = baseConfig.version.currentVersion;

      } else {
        if (window.localStorage.token && window.localStorage.token != "" && window.localStorage.isHrms2108) {

          window.localStorage.isHrms2108 = "true";

          if (window.localStorage.getItem('gesturePassword') && window.localStorage.getItem('gesturePassword') != '') {
          } else {
            $urlRouterProvider.otherwise('/tab/indexPage');
          }
        } else {

          window.localStorage.isHrms2108 = "true";

          $urlRouterProvider.otherwise('/login');
        }
      }
    }]);
