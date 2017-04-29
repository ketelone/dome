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
  'bathroomModule',
  'karessControlModule',
  'nextgenModule',
  'mcControlModule',
  'airfoilShowerModule'
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


      window.localStorage.temperature="°C";
      window.localStorage.useWater="S";
      window.localStorage.useElectricity="h";

      if (window.localStorage.languageFlag == undefined || window.localStorage.language == "default") {
        navigator.globalization.getPreferredLanguage(
          function (language) {
            alert(language.value == 'zh-Hans-CN');
            alert(language.value == 'zh-CN' || language.value == 'zh-Hans-CN');
            if (language.value == 'zh-CN' || language.value == 'zh-Hans-CN') {
              alert(language.value + '1');
              $translate.use('zh');

            }
            else if (language.value == 'zh-TW' || language.value == 'zh-Hans-TW') {
              $translate.use('tw');

            }
            else if (language.value == 'en-US' || language.value == 'en-CN') {
              alert(language.value + '2');
              $translate.use('en');
            }
            else if (language.value == 'en-TH' || language.value == 'th-CN') {
              $translate.use('th');

            }
            else {
              $translate.use('en');
              alert(language.value + "a");

            }
            window.localStorage.languageFlag = true;
            window.localStorage.language = "default";
          },
          function () {
            // alert('Error getting locale\n');
          });
      }
      else {

        if (window.localStorage.language == '中文简体') {
          $translate.use('zh');

        }
        else if (window.localStorage.language == '中文繁体') {
          $translate.use('tw');
        }
        else if (window.localStorage.language == 'English') {
          $translate.use('en');
        }
        else if (window.localStorage.language == 'ภาษาไทย') {
          $translate.use('th');
        }
        else {
          $translate.use('en');
        }
      }
    });

    document.addEventListener('deviceready', function () {
      console.log('openDatabase');
      db = window.sqlitePlugin.openDatabase({name: 'ko.db', location: 'default'});

      //T_CTM_PARTY
      db.transaction(function (tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS T_CTM_PARTY (" +
          "[PARTY_ID] [bigint] IDENTITY(1,1) NOT NULL," +
          "[PARTY_TYPE] [nvarchar](30) NULL," +
          "[PARTY_ACCOUNT] [nvarchar](30) NULL," +
          "[PASSWORD] [nvarchar](80) NULL," +
          "[HEAD_PORTRAIT] [nvarchar](240) NULL," +
          "[PARTY_NAME] [nvarchar](30) NULL," +
          "[SEX] [nvarchar](30) NULL," +
          "[PHONE_NUMBER] [nvarchar](30) NULL," +
          "[EMAIL_ADDRESS] [nvarchar](30) NULL," +
          "[LOCATION_ADDRESS] [nvarchar](30) NULL," +
          "[ROLE_ID] [bigint] NULL," +
          "[TIME_ZONE] [nvarchar](30) NULL," +
          "[PARTY_STATUS] [nvarchar](30) NULL," +
          "[REFERENCE_SOURCE] [nvarchar](30) NULL," +
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
          "[GROUP_ID] [bigint] NULL" +
          ")");

        tx.executeSql("CREATE TABLE IF NOT EXISTS T_CTM_PARTY_BOX (" +
          "[PARTY_BOX_ID] [bigint] IDENTITY(1,1) NOT NULL," +
          "[PARTY_ID] [bigint] NULL," +
          "[BOX_ID] [bigint] NULL," +
          "[REFERENCE_SOURCE] [nvarchar](30) NULL," +
          "[CREATION_DATE] [datetime] NOT NULL," +
          "[CREATED_BY] [nvarchar](100) NOT NULL," +
          "[LAST_UPDATE_DATE] [datetime] NOT NULL," +
          "[LAST_UPDATED_BY] [nvarchar](100) NOT NULL," +
          "[LAST_UPDATE_LOGIN] [nvarchar](100) NOT NULL," +
          "[GROUP_ID] [bigint] NULL" +
          ")");

        tx.executeSql("CREATE TABLE IF NOT EXISTS T_CTM_PARTY_BOX_DEVICE (" +
          "[BOX_DEVICE_ID] [bigint] IDENTITY(1,1) NOT NULL," +
          "[PARTY_ID] [bigint] NOT NULL," +
          "[BOX_ID] [bigint] NOT NULL," +
          "[DEVICE_ID] [bigint] NOT NULL," +
          "[REFERENCE_SOURCE] [nvarchar](30) NULL," +
          "[CREATION_DATE] [datetime] NOT NULL," +
          "[CREATED_BY] [nvarchar](100) NOT NULL," +
          "[LAST_UPDATE_DATE] [datetime] NOT NULL," +
          "[LAST_UPDATED_BY] [nvarchar](100) NOT NULL," +
          "[LAST_UPDATE_LOGIN] [nvarchar](100) NOT NULL," +
          "[GROUP_ID] [bigint] NULL" +
          ")");

        tx.executeSql("CREATE TABLE IF NOT EXISTS T_CTM_PARTY_GROUP (" +
          "[PARTY_GROUP_ID] [bigint] IDENTITY(1,1) NOT NULL," +
          "[PARTY_ID] [bigint] NULL," +
          "[GROUP_ID] [bigint] NULL," +
          "[ROOT_FLAG] [nvarchar](30) NULL," +
          "[DEFAULT_FLAG] [nvarchar](30) NULL," +
          "[REFERENCE_SOURCE] [nvarchar](30) NULL," +
          "[CREATION_DATE] [datetime] NOT NULL," +
          "[CREATED_BY] [nvarchar](100) NOT NULL," +
          "[LAST_UPDATE_DATE] [datetime] NOT NULL," +
          "[LAST_UPDATED_BY] [nvarchar](100) NOT NULL," +
          "[LAST_UPDATE_LOGIN] [nvarchar](100) NOT NULL" +
          ")");

        tx.executeSql("CREATE TABLE IF NOT EXISTS T_CTM_PARTY_GROUP_DEVICE (" +
          "[GROUP_DEVICE_ID] [bigint] IDENTITY(1,1) NOT NULL," +
          "[PARTY_ID] [bigint] NOT NULL," +
          "[GROUP_ID] [bigint] NOT NULL," +
          "[DEVICE_ID] [bigint] NOT NULL," +
          "[REFERENCE_SOURCE] [nvarchar](30) NULL," +
          "[CREATION_DATE] [datetime] NOT NULL," +
          "[CREATED_BY] [nvarchar](100) NOT NULL," +
          "[LAST_UPDATE_DATE] [datetime] NOT NULL," +
          "[LAST_UPDATED_BY] [nvarchar](100) NOT NULL," +
          "[LAST_UPDATE_LOGIN] [nvarchar](100) NOT NULL" +
          ")");

        tx.executeSql("CREATE TABLE IF NOT EXISTS T_DVM_DEVICE (" +
          "[DEVICE_ID] [bigint] IDENTITY(1,1) NOT NULL," +
          "[IOT_DEVICE_ID] [nvarchar](50) NULL," +
          "[PRODUCT_ID] [bigint] NOT NULL," +
          "[SKU_ID] [bigint] NOT NULL," +
          "[SKU_NUMBER] [nvarchar](30) NOT NULL," +
          "[DEVICE_SERIAL_NUMBER] [nvarchar](30) NULL," +
          "[DEVICE_CODE] [nvarchar](30) NULL," +
          "[DEVICE_NAME] [nvarchar](30) NULL," +
          "[LOCATION] [nvarchar](240) NULL," +
          "[CONNECT_MODE] [nvarchar](30) NULL," +
          "[REFERENCE_SOURCE] [nvarchar](30) NULL," +
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
          "[DEVICE_STATUS] [nvarchar](30) NULL," +
          "[GROUP_ID] [bigint] NULL" +
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
          "[SCENARIO_STATUS] [nvarchar](30) NULL," +
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
          "[GROUP_ID] [bigint] NULL" +
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
        // 设备控制-马桶
        .state('toiletContrl', {
          url: '/toiletContrl',
          templateUrl: 'build/pages/device-controller/toilet-controller/toiletController.html',
          controller: 'toiletControllerCtrl'
        })
        //马桶设置
        .state('toiletSetting', {
          url: '/toiletSetting',
          templateUrl: 'build/pages/device-controller/toilet-controller/toiletSetting/toiletSetting.html',
          controller: 'toiletSettingCtrl'
        })
        //灯光设置
        .state('lightSetting', {
          url: '/lightSetting',
          templateUrl: 'build/pages/device-controller/toilet-controller/lightSetting/lightSetting.html',
          controller: 'lightSettingCtrl'
        })
        //智能除菌计划
        .state('cleargearPlan', {
          url: '/cleargearPlan',
          templateUrl: 'build/pages/device-controller/toilet-controller/cleargearPlan/cleargearPlan.html',
          controller: 'cleargearPlanCtrl'
        })
        // 设备控制-中央净水器
        .state('cenwatpurifierContrl', {
          url: '/cenwatpurifierContrl',
          templateUrl: 'build/pages/device-controller/cenwatpurifier-controller/cenwatpurifierContrl.html',
          controller: 'cenwatpurifierCtrl'
        })
        // 设备控制-中央净水器设置
        .state('cenwatpurSetting', {
          url: '/cenwatpurSetting',
          templateUrl: 'build/pages/device-controller/cenwatpurifier-controller/cenwatpurSetting/cenwatpurSetting.html',
          controller: 'cenwatpurSettingCtrl'
        })
        //设备控制-karess
        .state('karess', {
          url: '/karess',
          templateUrl: 'build/pages/device-controller/karess-controller/karessController.html',
          controller: 'karessControllerCtrl'
        })
        .state('karessSetting', {
          url: '/karessSetting',
          templateUrl: 'build/pages/device-controller/karess-controller/setting-karess/karessSet.html',
          controller: 'karessSettingControllerCtrl'
        })
        .state('karessInfo', {
          url: '/karessInfo',
          templateUrl: 'build/pages/device-controller/karess-controller/info-karess/karessInfo.html',
          controller: 'karessInfoControllerCtrl'

        })
        //设备控制-mc
        .state('mc', {
          url: '/mc',
          templateUrl: 'build/pages/device-controller/mc-controller/mcController.html',
          controller: 'mcControllerCtrl'
        })
        .state('mcSetting', {
          url: '/mcSetting',
          templateUrl: 'build/pages/device-controller/mc-controller/setting-mc/mcSet.html',
          controller: 'mcSettingControllerCtrl'
        })
        .state('mcInfo', {
          url: '/mcInfo',
          templateUrl: 'build/pages/device-controller/mc-controller/info-mc/mcInfo.html',
          controller: 'mcInfoControllerCtrl'

        })
        .state('nextgenSet', {
          url: '/nextgenSet',
          templateUrl: 'build/pages/device-controller/nextgen-controller/nextgen-set/nextgenSet.html',
          controller: 'nextgenSetCtrl'
        })
        .state('nextgen', {
          url: '/nextgen',
          templateUrl: 'build/pages/device-controller/nextgen-controller/nextgen.html',
          controller: 'nextgenCtrl'
        })
        .state('nextgenInfo', {
          url: '/nextgenInfo',
          templateUrl: 'build/pages/device-controller/nextgen-controller/nextgen-info/nextgenInfo.html',
          controller: 'nextgenInfoCtrl'
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
        })
        .state('airfoilShower', {
          url: '/airfoilShower',
          templateUrl: 'build/pages/device-controller/airfoil-shower-controller/airfoilShower.html',
          controller: 'airfoilShowerCtrl'
        })
        .state('airfoilShowerSetting', {
          url: '/airfoilShowerSetting',
          templateUrl: 'build/pages/device-controller/airfoil-shower-controller/airfoil-shower-setting-controller/airfoilShowerSetting.html',
          controller: 'airfoilShowerSettingCtrl'
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
            $urlRouterProvider.otherwise('/login');
          }
        } else {

          window.localStorage.isHrms2108 = "true";

          $urlRouterProvider.otherwise('/login');
        }
      }
    }]);
