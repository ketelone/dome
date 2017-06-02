angular.module('myInfoModule')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('language', {
          url: '/setting/language',
          templateUrl: 'build/pages/my-info/setting/language/language.html',
          controller: 'languageCtrl'
        })
        .state('unit', {
          url: '/setting/unit',
          templateUrl: 'build/pages/my-info/setting/unit/unit.html',
          controller: 'unitCtrl'
        })
        .state('about', {
          url: '/setting/about',
          templateUrl: 'build/pages/my-info/setting/about/about.html',
          controller: 'settingCtrl'
        })
    }])
  .controller('settingCtrl', [
    '$scope', '$state', 'baseConfig', '$ionicLoading',
    '$http', '$timeout', '$ionicHistory', '$ionicPlatform',
    '$ionicScrollDelegate', 'hmsPopup', '$rootScope',
    'publicMethod', '$stateParams', 'checkVersionService',
    'SettingsService', '$translate',
    function ($scope, $state, baseConfig, $ionicLoading,
              $http, $timeout, $ionicHistory, $ionicPlatform,
              $ionicScrollDelegate, hmsPopup, $rootScope,
              publicMethod, $stateParams, checkVersionService,
              SettingsService, $translate) {

      $scope.goBack = function () {
        $ionicHistory.goBack();
      };

      /**which language is use**/
      var sureLanguage=function () {
        if (window.localStorage.language == 'zh') {
          $scope.language = "中文简体";
        }
        else if (window.localStorage.language == 'tw') {
          $scope.language = "中文繁体";
        }
        else if (window.localStorage.language == 'en') {
          $scope.language = "English";
        }
        else if (window.localStorage.language == 'th') {
          $scope.language = "ภาษาไทย";
        }
        else {
          $scope.language = $translate.instant("my-info.setting.followLanguage");
        }
      };
      sureLanguage();

      /**logout**/
      $scope.logout = function () {
        var goLogin = function () {
          $state.go('login');
        }
        hmsPopup.confirmNoTitle("<div style='text-align: center'>是否退出当前账号</div>",
          "确定","取消",goLogin);
      };

    }]);
