/**
 * Created by daidongdong on 2017/4/3.
 */
angular.module('productModule')
  .controller('bigAuntCtrl',     [
  '$scope',
  '$state',
  'publicMethod','$ionicModal','$ionicPopover','$timeout','$ionicHistory',
  function ($scope, $state,publicMethod,$ionicModal,$ionicPopover,$timeout,$ionicHistory) {
    $scope.goBack = function(){
      console.log(12);
      $ionicHistory.goBack();
    }

    $scope.goSetting = function(){
      $state.go("bigAuntSetting");
    }
  }]);
