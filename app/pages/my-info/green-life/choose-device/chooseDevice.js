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
      };

      $scope.deviceList=[
        'my-info.greenLife.device.toilet',
        'my-info.greenLife.device.waterPurifier',
        'my-info.greenLife.device.bathroomHeader',
        'my-info.greenLife.device.bathtub',
        'my-info.greenLife.device.nextgen',
        'my-info.greenLife.device.airfoilShower',
        'my-info.greenLife.device.mc',
      ];

    }]);
