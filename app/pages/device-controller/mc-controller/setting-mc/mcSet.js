/**
 *@autor:
 */
angular.module('mcControlModule')
  .controller('mcSettingControllerCtrl',[
    '$scope',
    '$state',
    'hmsPopup','$ionicHistory',
    function($scope, $state, hmsPopup,$ionicHistory){

      /**
       *@autor: caolei
       *@disc: restore default settings
       */
      $scope.resetDeviceInfo = function(){

        hmsPopup.showPopup('是否恢复默认设置');

      };

      $scope.goBack = function(){
        $ionicHistory.goBack();
      }

      $scope.goInfo = function(){
        $state.go('karessInfo');
      }

    }]);
