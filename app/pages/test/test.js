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
        'zhe10', 'zh11', 'zhe12', 'zhe13', 'zhe14', 'zhe15', 'zhe16', 'zhe17', 'zhe18'];


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
        if (scope.weeks[scope.nowIndex-1] <= min && $event.gesture.deltaY > 0) {
          return;
        }
        if (scope.weeks[scope.nowIndex-1] >= max && $event.gesture.deltaY < 0) {
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
      var max = 18;
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
      console.log(scope.listData[1]);
      for (var i = 0; i < scope.listData.length; i++) {
        scope.weeks.push(i + 1);
      }

      scope.getShowString = function (date) {
        return date;
      }
      scope.getShowString = function (item) {
        return scope.listData[item];
      };

      scope.onReleaseYear = function ($event) {

      };

    }])

  .directive('infinityScroll', function () {
    return {
      restrict: 'AE',
      scope: {
        type: '=type',
        max: '=max',
        min: '=min',
        titleText: '=titleText',
        listData: '=listData',
        weekNum: '=weekNum'
      },
      template: '<div class="year" on-release="onReleaseYear($event)"> {{year}} </div>' +
      '<div class="scroll-container" on-drag="onDragScroll($event)" on-release="onReleaseScroll($event)">' +
      '<div class="stage" ng-style="stageRotate">' +
      '<div class="scroll-item" ng-repeat="week in weeks track by $index" ng-style="rotates[$index]" ng-class="{true:\'selected\'}[nowIndex == $index]">{{getShowString(week)}}' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div ng-repeat="i in listData" ng-show="false">{{i}}</div>' +
      '<div class="select-week" ng-click="selectItem()">确定</div>',
      link: function (scope, element, attrs) {
        scope.rotates = [];
        scope.sourceDeg = 180;
        scope.weeksIndex = [];
        var weekNum = attrs.weekNum;
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

        scope.lastDeg = 0;
        scope.onDragScroll = function ($event) {
          if (attrs.type == 'number' || attrs.type == 'dateList') {
            if (scope.weeks[scope.nowIndex] <= min && $event.gesture.deltaY > 0) {
              return;
            }
            if (scope.weeks[scope.nowIndex] >= max && $event.gesture.deltaY < 0) {
              return;
            }
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

        if (attrs.type == 'number') {
          scope.year = attrs.titleText ? attrs.titleText : 'title';
          var min = attrs.min ? Number.parseInt(attrs.min) : 0;
          var max = attrs.max ? attrs.max : 100;

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
          for (var i = min; i < weekNum + min; i++) {
            scope.weeks[i - min] = i;
          }

          scope.getShowString = function (item) {
            return item;
          };

          scope.onReleaseYear = function ($event) {

          };

          scope.selectItem = function () {
            alert(scope.weeks[scope.nowIndex]);
          };
        } else if (attrs.type == 'dateList') {
          scope.year = attrs.titleText ? attrs.titleText : 'title';
          var min = attrs.min ? Number.parseInt(attrs.min) : 0;
          var max = attrs.max ? attrs.max : 100;

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
          console.log(scope.listData[1]);
          for (var i = 0; i < scope.listData.length; i++) {
            scope.weeks.push(i + 1);
          }

          scope.getShowString = function (date) {
            return date;
          }
          scope.getShowString = function (item) {
            return scope.listData[item];
          };

          scope.onReleaseYear = function ($event) {

          };
        }

        else {
          function refreshData() {
            scope.nowIndex = Math.round(scope.nowIndex);
            if (scope.nowIndex > (weekNum - 1))
              scope.nowIndex -= weekNum;
            scope.year = scope.weeks[scope.nowIndex].getFullYear();
            var needChangeUpIndex = scope.nowIndex - weekNum / 4;
            if (needChangeUpIndex < 0)
              needChangeUpIndex = weekNum + needChangeUpIndex;
            var UpDate = new Date(scope.weeks[getNextIndex(needChangeUpIndex)]);
            UpDate.setDate(UpDate.getDate() - 7);
            scope.weeks[needChangeUpIndex] = UpDate;

            var needChangeDownIndex = scope.nowIndex + weekNum / 4;
            if (needChangeDownIndex > (weekNum - 1))
              needChangeDownIndex = needChangeDownIndex - weekNum;
            var DownDate = new Date(scope.weeks[getPrevIndex(needChangeDownIndex)]);
            DownDate.setDate(DownDate.getDate() + 7);
            scope.weeks[needChangeDownIndex] = DownDate;
          }


          scope.today = new Date();
          scope.year = scope.today.getFullYear();
          scope.chooseWeek = "";

          function formatDate(value) {
            if (parseInt(value) < 10) {
              return '0' + value;
            }
            return value;
          }

          scope.getShowString = function (date) {
            var day = date.getDay();
            var weekStart = new Date(date);
            weekStart.setDate(weekStart.getDate() - (day - 1));
            var weekEnd = new Date(date);
            weekEnd.setDate(weekEnd.getDate() + (7 - day));
            return formatDate(weekStart.getMonth() + 1) + '月' + formatDate(weekStart.getDate()) + '日 ~ ' +
              formatDate(weekEnd.getMonth() + 1) + '月' + formatDate(weekEnd.getDate()) + '日';
          };

          function initWeeks(year) {
            scope.weeks = [];
            var listDate = new Date();
            listDate.setFullYear(year);
            listDate.setDate(scope.today.getDate() - 6 * 7);
            for (var i = 0; i < weekNum; i++) {
              var tempDate = new Date(listDate);
              scope.weeks[i] = tempDate;
              listDate.setDate(listDate.getDate() + 7);
            }
          }

          initWeeks(scope.today.getFullYear());

          scope.onReleaseYear = function ($event) {
            var slideLeft = $event.gesture.deltaX < 0;
            if (slideLeft)
              scope.year++;
            else
              scope.year--;
            initWeeks(scope.year);
          };

          scope.selectItem = function (nowIndex) {
            alert(scope.getShowString(scope.weeks[scope.nowIndex]));
          };
        }

      }
    }
  });
