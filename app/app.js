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

angular.module('myApp')
  .run(function ($ionicPlatform, $translate) {
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
          if (language.value == 'zh-CN') {
            $translate.use('zh');

            //   alert('zh1');
          }
          else if (language.value == 'zh-TW') {
            $translate.use('tw');

            //   alert('tw1');
          }
          else if (language.value == 'en-US') {
            $translate.use('en');

            // alert('en1');

          }
          else if (language.value == 'en-TH') {
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
        //大姨妈了没
        .state('bigAunt', {
          url: '/bigAunt',
          templateUrl: 'build/pages/keyscene-aunt/bigAunt.html',
          controller: 'bigAuntCtrl'
        })

        .state('bigAuntSetting', {
          url: '/bigAuntSetting',
          templateUrl: 'build/pages/keyscene-aunt/setting-aunt/bigAuntSetting.html',
          controller: 'bigAuntSettingCtrl'
        })
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
        .state('toiletSetting', {
          url: '/toiletSetting',
          templateUrl: 'build/pages/device-controller/toilet-controller/toiletSetting/toiletSetting.html',
          controller: 'toiletSettingCtrl'
        })
        .state('bathroom', {
          url: '/bathroom',
          params: {"deviceSku": null},
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
