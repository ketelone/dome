/**
 *@author: caolei
 */
angular.module('nextgenModule')
  .controller('nextgenSetCtrl',[
    '$scope',
    '$state',
    'hmsPopup','$ionicHistory',
    function($scope, $state, hmsPopup,$ionicHistory){
      $scope.goBack = function(){
        $ionicHistory.goBack();
      }

      /**
       *@author: caolei
       *@disc: restore default settings
       */
      $scope.resetDeviceInfo = function(){
        hmsPopup.showPopup('是否恢复默认设置');
      };
    }]);
