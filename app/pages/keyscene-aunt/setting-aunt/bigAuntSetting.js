/**
 * Created by daidongdong on 2017/4/3.
 */
myApp.controller('bigAuntSettingCtrl',     [
  '$scope',
  '$state',
  'publicMethod','$ionicModal','$ionicPopover','$timeout','$ionicHistory',
  function ($scope, $state,publicMethod,$ionicModal,$ionicPopover,$timeout,$ionicHistory) {
    $scope.goBack = function(){
      console.log('1212');
      $ionicHistory.goBack();
    }
  }]);
