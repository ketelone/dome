/**
 * Created by daidongdong on 2017/4/3.
 */
myApp.controller('bigAuntSettingCtrl',     [
  '$scope',
  '$state',
  'publicMethod','$ionicModal','$ionicPopover','$timeout','$ionicHistory',
  function ($scope, $state,publicMethod,$ionicModal,$ionicPopover,$timeout,$ionicHistory) {
    console.log($ionicHistory);
    console.log('caocao');

    $scope.goBack = function(){
      console.log('1212');
      $ionicHistory.goBack();
    }
  }]);
