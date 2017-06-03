angular.module('myInfoModule')
  .controller('myRoomCtrl', [
    '$scope','$state','baseConfig','$ionicLoading',
    '$http','$timeout','$ionicHistory','$ionicPlatform',
    '$ionicScrollDelegate','hmsPopup','$rootScope',
    'publicMethod','$stateParams', 'SettingsService', '$translate',
    function ($scope,$state,baseConfig,$ionicLoading,$http,
              $timeout,$ionicHistory,$ionicPlatform,
              $ionicScrollDelegate,hmsPopup,
              $rootScope, publicMethod, $stateParams,
              SettingsService, $translate) {

      $scope.goBack = function () {
        $ionicHistory.goBack();
      };


    }
  ]);
