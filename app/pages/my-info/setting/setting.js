/**
 * Created by chenjiacheng on 2017/3/28.
 */
angular.module('myInfoModule')

  .controller('settingCtrl', [
    '$scope',
    '$state',
    'baseConfig',
    '$ionicLoading',
    '$http',
    '$timeout',
    '$ionicHistory',
    '$ionicPlatform',
    '$ionicScrollDelegate',
    'hmsPopup',
    '$rootScope',
    'publicMethod',
    '$stateParams','checkVersionService','SettingsService',
    function ($scope,
              $state,
              baseConfig,
              $ionicLoading,
              $http,
              $timeout,
              $ionicHistory,
              $ionicPlatform,
              $ionicScrollDelegate,
              hmsPopup,
              $rootScope, publicMethod,$stateParams,checkVersionService,SettingsService){

      $scope.language="";
      SettingsService.set("language","简体中文");

      $scope.logout=function() {

        var confirmPopup = publicMethod.showPopupConfirm(null, "<div style='text-align: center'>是否退出当前账号</div>");
        confirmPopup.then(function (res) {
          if (res) {
            console.log('You are sure');
            $state.go('login');
          } else {
            console.log('You are not sure');
          }
        });


      }








    }]);
