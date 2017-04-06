/**
 * Created by daidongdong on 2017/4/3.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('bigAunt', {
          url: '/bigAunt',
          templateUrl: 'build/pages/keyscene-aunt/bigAunt.html',
          controller: 'bigAuntCtrl'
        })
        .state('bigAuntSetting', {
          url: '/bigAuntSetting',
          templateUrl: 'build/pages/keyscene-aunt/setting-aunt/bigAuntSetting.html',
          controller: 'bigAuntSettingCtrl'
        });
    }
  ]).controller('bigAuntCtrl',     [
  '$scope',
  '$state',
  'publicMethod','$ionicModal','$ionicPopover','$timeout','$ionicHistory',
  function ($scope, $state,publicMethod,$ionicModal,$ionicPopover,$timeout,$ionicHistory) {
    $scope.goBack = function(){
      console.log('1212');
      $ionicHistory.goBack();
    }
    $ionicPopover.fromTemplateUrl('my-popover.html', {
      scope: $scope,
    }).then(function(popover) {
      $scope.popover = popover;
    });

    $scope.openPopover = function($event) {
      $scope.popover.show($event);
      console.log('1212');
    };
    $scope.closePopover = function() {
      $scope.popover.hide();
    };
    // 清除浮动框
    $scope.$on('$destroy', function() {
      $scope.popover.remove();
    });
    // 在隐藏浮动框后执行
    $scope.$on('popover.hidden', function() {
      // 执行代码
    });
    // 移除浮动框后执行
    $scope.$on('popover.removed', function() {
      // 执行代码
    });

    $scope.goSetting = function(){
      $state.go("bigAuntSetting");
    }
  }]);
