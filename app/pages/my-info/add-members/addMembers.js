angular.module('myInfoModule')
  .controller('addMembersCtrl', [
    '$scope','$state','baseConfig','$ionicLoading',
    '$http','$timeout','$ionicHistory',
    '$ionicPlatform','$ionicScrollDelegate',
    'hmsPopup','$rootScope','publicMethod',
    '$stateParams',
    function ($scope,$state,baseConfig,$ionicLoading,
              $http,$timeout,$ionicHistory,
              $ionicPlatform,$ionicScrollDelegate,
              hmsPopup,$rootScope, publicMethod,
              $stateParams) {

      $scope.goBack = function () {
        $ionicHistory.goBack();
      };

    }]);
