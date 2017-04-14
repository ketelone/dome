/**
 * Created by daidongdong on 17/43/20.
 */

'use strict';
angular.module('loginModule').controller('TabsCtrl', ['$scope', '$rootScope', '$state', '$ionicConfig', '$ionicHistory', '$templateCache',
    '$ionicSlideBoxDelegate', '$ionicPlatform',
    function ($scope, $rootScope, $state, $ionicConfig, $ionicHistory, $templateCache, $ionicSlideBoxDelegate, $ionicPlatform) {
      $scope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParam) {
        if (fromState && toState && (fromState.name == 'login') && toState.name == 'tabs') {
          $ionicHistory.clearCache();
          $ionicHistory.clearHistory();
        }
      });
      $scope.tabs = [{
        name: '首页',
        isActive: true,
        onClass: 'main-on',
        offClass: 'main-off'
      }, {
        name: '消息',
        isActive: false,
        onClass: 'app-on',
        offClass: 'app-off'
      }, {
        name: '我的',
        isActive: false,
        onClass: 'my-on',
        offClass: 'my-off'
      }];
      $scope.clickTab = function (tab) {
        for (var i = 0; i < $scope.tabs.length; i++) {
          $scope.tabs[i].isActive = false;
        }
        tab.isActive = true;
      }
    }]);
