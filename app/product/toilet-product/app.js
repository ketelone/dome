// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var toiletModule = angular.module('toiletModule', []);

angular.module("baseConfig", [])
  .constant("baseConfig", {
    "debug": false,
    "isMobilePlatform": false,
    "clearTable": true,
    "basePath": "http://wechat.hand-china.com/hmbms_hand/api",
    "currentVersion": "2.0.01",
    "url": "",
    "pkgIdentifier": "",
    "versionName": "此版本为UAT测试环境 2.0.0",
    "appEnvironment": "UAT",
    "version": {
      "currentVersion": "2.9.0",
      "currentversionName": "此版本为测试版本2.9.0",
      "currentSubVersion": "2",
      "currentSubVersionName": "资源增量包2"
    }
  });

var myApp = angular.module('myApp', [
  'ionic',
  'ngCordova',
  'loginModule',
  'baseConfig',
  'toiletModule',
]);

angular.module('myApp')
  .run(function ($ionicPlatform) {
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

    });
  });

angular.module('myApp')
  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$ionicConfigProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {
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

      $stateProvider
        // setup an abstract state for the tabs directive
        .state('toilet', {
          url: '/toilet',
          abstract: true,
          templateUrl: 'build/pages/toilet.html'
        })

        // Each tab has its own nav history stack:



      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/guide');

    }]);
