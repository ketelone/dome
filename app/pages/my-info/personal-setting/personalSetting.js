
angular.module('myInfoModule')

  .controller('personalSettingCtrl', [
    '$scope','$state','baseConfig','$ionicLoading','$http',
    '$timeout','$ionicHistory','$ionicPlatform',
    '$ionicScrollDelegate','hmsPopup','$rootScope',
    'publicMethod','$stateParams',
    function ($scope,$state,baseConfig,$ionicLoading,
              $http,$timeout,$ionicHistory,$ionicPlatform,
              $ionicScrollDelegate,hmsPopup,
              $rootScope, publicMethod, $stateParams) {

      $scope.goBack = function(){
        $ionicHistory.goBack();
      };

      $scope.userData={
        "head_img":"",
        "nickname":"老爸",
        "sex":0,
        "telephone":"18828321238",
        "email":"",
        "state":"上海",
      };

    }]);
