/**
 * Created by daidongdong on 2017/4/14.
 */
angular.module('deviceAddModule')
  .controller('boxOnLineCtrl', [
    '$scope',
    '$state',
    'publicMethod', '$ionicModal', '$ionicPopover', '$timeout', '$ionicHistory', 'hmsHttp', 'hmsPopup','SettingsService',
    function ($scope, $state, publicMethod, $ionicModal, $ionicPopover, $timeout, $ionicHistory, hmsHttp, hmsPopup,SettingsService) {
      $scope.goBack = function () {
        $ionicHistory.goBack();
      }
      /**
      *@autor:daidongdong
      *@name:
      *@params:
      *@return:
      *@disc:
      */
      var a  =localStorage.box.split(',');
      console.log(a);
      $scope.boxOnLine = [1,2,3];

      $scope.boxClick = function(item){
        SettingsService.set("box",item);
        $state.go('boxAddDevice');
      }

    }]);


