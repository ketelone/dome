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
  'HmsModule',
  'productModule'
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
  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$ionicConfigProvider','baseConfig',
    function ($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider,baseConfig) {
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
        .state('tab', {
          url: '/tab',
          abstract: true,
          templateUrl: 'build/pages/tab/tabs.html'
        })

        // Each tab has its own nav history stack:


        .state('tab.indexPage', {
          url: '/indexPage',
          views: {
            'tab-indexPage': {
              templateUrl: 'build/pages/index-page/indexPage.html',
              controller: 'indexPageCtrl'
            }
          }
        })

        .state('tab.message', {
          url: '/message',
          views: {
            'tab-message': {
              templateUrl: 'build/pages/message/message.html',
              controller: 'messageCtrl'
            }
          }
        })

        .state('tab.myInfo', {
          url: '/myInfo',
          views: {
            'tab-myInfo': {
              templateUrl: 'build/pages/my-info/myInfo.html',
              controller: 'myInfoCtrl'
            }
          }
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

        .state('login', {
          url: '/login',
          templateUrl: 'build/pages/login/login.html',
          controller: 'loginCtrl'
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
            $urlRouterProvider.otherwise('/gesture-lock');
          } else {
            $urlRouterProvider.otherwise('/tab/message');
          }
        } else {

          window.localStorage.isHrms2108 = "true";

          $urlRouterProvider.otherwise('/login');
        }
      }
    }]);
