/**
 *@autor: caolei
 */
angular.module('nextgenModule')
  .controller('nextgenSetCtrl',[
    '$scope',
    '$state',
    'hmsPopup',
    function($scope, $state, hmsPopup){

      /**
       *@autor: caolei
       *@disc: restore default settings
       */
      $scope.resetDeviceInfo = function(){

        hmsPopup.showPopup('是否恢复默认设置');

      };



    }]);
