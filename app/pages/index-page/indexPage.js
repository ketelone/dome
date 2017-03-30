/**
 * Created by daidongdong on 17/43/20.
 */

angular.module('indexPageModule')

  .controller('indexPageCtrl', [
    '$scope',
    '$state',
    '$ionicGesture',
    'baseConfig',
    '$timeout',
    '$ionicScrollDelegate',
    function ($scope,
              $state,
              $ionicGesture,
              baseConfig,
              $timeout,
              $ionicScrollDelegate) {

      $scope.animationsEnabled = false;
      $scope.openDoor = 0;
      $scope.fetchWorkflowData = true;
      $scope.hasCrm = window.localStorage.crm == 'true';
      $scope.titleBg = 'build/img/application/banner@3x.png';

      var menuFetchFlag = false;



      $scope.bgLoaded = false;

      $scope.onLoadBg = function () {
        $scope.bgLoaded = true;
      };


      $scope.imgHeight = 0;

      $timeout(function () {
        $scope.imgHeight = angular.element('.calendar-container')[0].clientHeight - 5;
      }, 500);

      $scope.headerStyle = {
        opacity: 0
      };

      $scope.showHeader = false;

      $scope.bgStyle = {};

      $scope.searchStyle = {};

      $scope.onDragContent = function () {
        var top = $ionicScrollDelegate.getScrollPosition().top;
        if (top <= 0) {
          var scrollHeight = 0 - top;
          var scale = ((scrollHeight + $scope.imgHeight) / $scope.imgHeight).toFixed(2);
          $scope.bgStyle = {
            "transform": "scale(" + scale + ")",
            "-webkit-transform": "scale(" + scale + ")"
          };
          $scope.searchStyle = {};
        }

        else {
          if (ionic.Platform.isIOS())
            $scope.searchStyle = {
              top: 30 - top + "px"
            };
          else
            $scope.searchStyle = {
              top: 10 - top + "px"
            };
        }

        if (top >= $scope.imgHeight) {
          $scope.headerStyle.opacity = 1;
          return;
        }
        if (top <= 0) {
          $scope.headerStyle.opacity = 0;
          $scope.showHeader = false;
          return;
        }
        $scope.showHeader = true;
        $scope.headerStyle.opacity = (top / $scope.imgHeight).toFixed(1);
      };

      $scope.onSwipeContent = function () {
        $timeout(function () {
          var top = $ionicScrollDelegate.getScrollPosition().top;
          if (top >= $scope.imgHeight) {
            $scope.headerStyle.opacity = 1;
            return;
          }
          if (top <= 0) {
            $scope.headerStyle.opacity = 0;
            $scope.showHeader = false;
            return;
          }
          $scope.showHeader = true;
          $scope.headerStyle.opacity = (top / $scope.imgHeight).toFixed(1);
        }, 500);
      };

      $scope.onReleaseContent = function () {
        $scope.bgStyle = {
          "transition": "all 0.5s",
          "-webkit-transition": "all 0.5s",
          "transform": "scale(1)",
          "-webkit-transform": "scale(1)"
        };
      };



      $scope.onRelease = function () {
        if (baseConfig.debug) {
          console.log('$scope.onRelease');
        }
        $scope.animationsEnabled = false;
      };


      $scope.$on('$ionicView.beforeEnter', function (e) {
        if (baseConfig.debug) {
          console.log('applicationCtrl.$ionicView.beforeEnter');
        }
        $scope.openDoor = 0;
      });

      $scope.$on('$ionicView.beforeLeave', function (e) {
        if (baseConfig.debug) {
          console.log('applicationCtrl.$ionicView.beforeLeave');
        }
        $scope.animationsEnabled = false;
      });

      $scope.$on('$destroy', function (e) {
        if (baseConfig.debug) {
          console.log('applicationCtrl.$destroy');
        }
      });
    }
  ]);
