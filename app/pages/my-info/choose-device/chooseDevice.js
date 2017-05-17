/**
 * Created by Angela on 2017/5/17.
 */
angular.module('myInfoModule')
  .controller('chooseDeviceCtrl', [
    '$scope','$state','baseConfig','$ionicLoading',
    '$http','$timeout','$ionicHistory','$ionicPlatform',
    '$ionicScrollDelegate','hmsPopup','$rootScope',
    'publicMethod','$stateParams',
    function ($scope,$state,baseConfig,$ionicLoading,
              $http,$timeout,$ionicHistory,
              $ionicPlatform,$ionicScrollDelegate,
              hmsPopup,$rootScope, publicMethod,$stateParams) {


      $scope.goBack = function(){
        $ionicHistory.goBack();
      }

      $scope.deviceList=[
        'index.toliet','index.waterPurifier','index.bathroomHeader',
        'index.bathtub','index.nextgen','index.airfoilShower',
        'index.mc',
      ];

      $scope.getDeviceInfo=function (index) {
        $state.go('greenLife', {device: $scope.deviceList[index]});
      };

    }]);
