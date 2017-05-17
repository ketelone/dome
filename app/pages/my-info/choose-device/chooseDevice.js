/**
 * Created by Angela on 2017/5/17.
 */
angular.module('myInfoModule')
  .controller('chooseDeviceCtrl', [
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
              $rootScope, publicMethod,$stateParams) {

      $scope.goBack = function(){
        $ionicHistory.goBack();
      }

    }]);
