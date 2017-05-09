/**
 * Created by daidongdong on 2017/4/14.
 */
angular.module('sceneSupermarketModule')
  .controller('sceneSupermarketCtrl', [
    '$scope',
    '$state',
    'publicMethod', '$ionicModal', '$ionicPopover', '$timeout', '$ionicHistory', 'hmsHttp', 'hmsPopup', '$translate',
    function ($scope, $state, publicMethod, $ionicModal, $ionicPopover, $timeout, $ionicHistory, hmsHttp, hmsPopup, $translate) {
      $scope.goBack = function () {
        $ionicHistory.goBack();
      }





    }]);


