/**
 * Created by daidongdong on 2017/4/3.
 */
angular.module('loginModule')

  .controller('testCtrl', [
    '$scope',
    '$state',
    'publicMethod', '$ionicModal', '$ionicPopover', '$timeout', '$ionicHistory',
    function ($scope, $state, publicMethod, $ionicModal, $ionicPopover, $timeout, $ionicHistory) {
      $scope.goBack = function () {
        $ionicHistory.goBack();
      }
      $ionicPopover.fromTemplateUrl('my-popover.html', {
        scope: $scope,
      }).then(function (popover) {
        $scope.popover = popover;
      });

      $scope.openPopover = function ($event) {
        $scope.popover.show($event);
        console.log('1212');
      };
      $scope.closePopover = function () {
        $scope.popover.hide();
      };
      // 清除浮动框
      $scope.$on('$destroy', function () {
        $scope.popover.remove();
      });
      // 在隐藏浮动框后执行
      $scope.$on('popover.hidden', function () {
        // 执行代码
      });
      // 移除浮动框后执行
      $scope.$on('popover.removed', function () {
        // 执行代码
      });

      $scope.goSetting = function () {
        $state.go("bigAuntSetting");
      }


      $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });
      $scope.openModal = function () {
        $scope.modal.show();
      };
      $scope.closeModal = function () {
        $scope.modal.hide();
      };


      $scope.listData = ['zhe1', 'zhe2', 'zhe3', 'zhe4', 'zhe5', 'zhe6', 'zhe7', 'zhe8', 'zhe9',
        'zhe10', 'zh11', 'zhe12', 'zhe13', 'zhe14', 'zhe15', 'zhe16', 'zhe17', 'zhe18','zhe19','zhe20','zhe21','zhe22','zhe23','zhe24'];


      //滚动啊
      var scope = $scope;
      scope.rotates = [];
      scope.sourceDeg = 180;
      scope.weeksIndex = [];
      var weekNum = 8;
      scope.nowIndex = weekNum / 2;
      scope.stageRotate = {
        "transform": "rotateX(" + scope.sourceDeg + "deg)",
        "-webkit-transform": "rotateX(" + scope.sourceDeg + "deg)"
      };
      for (var i = 0; i < weekNum; i++) {
        scope.weeksIndex.push(i);
      }
      scope.baseDeg = 360 / scope.weeksIndex.length;

      for (var i = (weekNum - 1); i >= 0; i--) {
        var deg = 360 / weekNum * (weekNum - i);
        scope.rotates[i] = {
          "transform": "rotateX(" + deg + "deg) translateZ(90px)",
          "-webkit-transform": "rotateX(" + deg + "deg) translateZ(90px)"
        };
      }

      function getLastDeg(deg) {
        return (Math.round(deg / scope.baseDeg) + 1) * scope.baseDeg;
      }

      scope.lastDeg = 0;
      scope.onDragScroll = function ($event) {
        // console.log(scope.nowIndex);
        // console.log(scope.weeks[scope.nowIndex]);
        if (scope.weeks[scope.nowIndex] <= min && $event.gesture.deltaY > 0) {
          return;
        }
        if (scope.weeks[scope.nowIndex] >= max && $event.gesture.deltaY < 0) {
          return;
        }
        scope.lastDeg = scope.sourceDeg - $event.gesture.deltaY / 2;
        scope.stageRotate = {
          "transform": "rotateX(" + scope.lastDeg + "deg)",
          "-webkit-transform": "rotateX(" + scope.lastDeg + "deg)"
        };
        getNowIndex(scope.lastDeg);
      };

      scope.onReleaseScroll = function ($event) {
        if ($event.gesture.deltaY > 0)
          scope.sourceDeg = getLastDeg(scope.lastDeg) - scope.baseDeg;
        else
          scope.sourceDeg = getLastDeg(scope.lastDeg - scope.baseDeg);
        scope.stageRotate = {
          "transform": "rotateX(" + scope.sourceDeg + "deg)",
          "-webkit-transform": "rotateX(" + scope.sourceDeg + "deg)"
        };
      };



      var min = 1;
      var max = 24;
      function getNextIndex(nowIndex) {
        var temp = nowIndex + 1;
        if (temp > (weekNum - 1))
          temp = 0;
        return temp;
      }

      function getPrevIndex(nowIndex) {
        var temp = nowIndex - 1;
        if (temp < 0)
          temp = weekNum - 1;
        return temp;
      }

      function getNowIndex(deg) {
        var temp = deg / scope.baseDeg % weekNum;
        scope.nowIndex = temp < 0 ? (weekNum + temp) : temp;
        refreshData();
      }
      function refreshData() {
        scope.nowIndex = Math.round(scope.nowIndex);
        if (scope.nowIndex > (weekNum - 1))
          scope.nowIndex -= weekNum;

        var needChangeUpIndex = scope.nowIndex - weekNum / 4;
        if (needChangeUpIndex < 0)
          needChangeUpIndex = weekNum + needChangeUpIndex;

        if (scope.weeks[getNextIndex(needChangeUpIndex)] == '' || scope.weeks[getNextIndex(needChangeUpIndex)] - 1 < min)
          scope.weeks[needChangeUpIndex] = '';
        else
          scope.weeks[needChangeUpIndex] = scope.weeks[getNextIndex(needChangeUpIndex)] - 1;

        var needChangeDownIndex = scope.nowIndex + weekNum / 4;
        if (needChangeDownIndex > (weekNum - 1))
          needChangeDownIndex = needChangeDownIndex - weekNum;

        if (scope.weeks[getPrevIndex(needChangeDownIndex)] == '' || scope.weeks[getPrevIndex(needChangeDownIndex)] + 1 > max)
          scope.weeks[needChangeDownIndex] = '';
        else
          scope.weeks[needChangeDownIndex] = scope.weeks[getPrevIndex(needChangeDownIndex)] + 1;
      }


      scope.weeks = [];
      for (var i = 0; i < scope.listData.length; i++) {
        scope.weeks.push(i + 1);
      }

      scope.getShowString = function (item) {
        return scope.listData[item-1];
      };


    }])
