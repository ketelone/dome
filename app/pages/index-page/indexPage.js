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

      $scope.tabs = [
        {
          text: "场景模式",
        },
        {
          text: "设备模式",
        },
      ];
    }])
  .directive('onFinishRender', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        if (scope.$last === true) {
          $timeout(function () {
            scope.$emit('ngRepeatFinished');
          });
        }
      }
    }
  }).directive('hmsTabSlideBox', ['$timeout', '$window', '$ionicSlideBoxDelegate', '$ionicScrollDelegate', '$state',
  function ($timeout, $window, $ionicSlideBoxDelegate, $ionicScrollDelegate) {
    return {
      restrict: 'ACE',
      link: function (scope, element, attrs) {
        var ta = element[0], $ta = element;
        console.log(element[0]);
        console.log(element);

        //当页面存在多个滑动块时，需要用delegate-handle来标识
        var handle = ta.querySelector('.slider').getAttribute('delegate-handle');

        var ionicSlideBoxDelegate = $ionicSlideBoxDelegate;
        var ionicScrollDelegate = $ionicScrollDelegate;

        function renderScrollableTabs() {
          var iconsDiv = angular.element(ta.querySelector(".tsb-icons")),
            icons = iconsDiv.find("a"),
            totalTabs = icons.length;

          angular.forEach(icons, function (value, key) {
            //  将a元素变成jQuery元素
            var a = angular.element(value);
            a.on('click', function () {
              ionicSlideBoxDelegate.slide(key);
            });
          })
          //如果属性上有设置tab值，将标签页初始化为tab值
          var initialIndex = attrs.tab;
          //初始化标签页为0
          if (typeof attrs.tab === 'undefined' || (totalTabs <= initialIndex) || initialIndex < 0) {
            initialIndex = 0;
          }

          //如果标签页为0，设置位置
          if (initialIndex == 0) {
            setPosition(0);
          }
          //初始化滑动页
          $timeout(function () {
            ionicSlideBoxDelegate.slide(initialIndex);
          }, 0);
        };

        //滚动条
        function heightlight(item) {
          var heightlight = document.querySelector('.heightLight');
          var client = item[0].getBoundingClientRect();
          var coords = {
            width: client.width,
            top: 0,
            left: item[0].offsetLeft
          };
          heightlight.style.width = coords.width + 'px';
          heightlight.style.transform = 'translate3d(' + coords.left + 'px,' + coords.top + 'px,0)'

        }

        function setPosition(index) {
          var iconsDiv = angular.element(ta.querySelector(".tsb-icons")), icons = iconsDiv.find("a"), wrap = iconsDiv[0].querySelector(".tsb-ic-wrp")
          var scrollDiv = wrap.querySelector(".scroll");
          console.log(scrollDiv);
          var middle = iconsDiv[0].offsetWidth / 2;
          console.log(iconsDiv[0].offsetWidth);
          var curEl = angular.element(icons[index]);
          console.log(curEl);

          //获取之前生效的元素
          var prvEl = angular.element(iconsDiv[0].querySelector(".active"));
          if (curEl && curEl.length) {
            var curElWidth = curEl[0].offsetWidth, curElLeft = curEl[0].offsetLeft;
            if (prvEl) {
              prvEl.removeClass("active");
            }
            curEl.addClass('active');
            //当前元素的中点跟左端中线的距离
            var leftStr = (middle - (curElLeft) - curElWidth / 2 + 5);
            if (!scrollDiv) {
              //如果标签条不能滚动，则直接将选中元素居中
              var leftStr = (middle - (curElLeft) - curElWidth / 2 + 5) + "px";
              wrap.style.webkitTransform = "translate3d(" + leftStr + ",0,0)";
            } else {
              //  如果能够滚动
              if (leftStr > 0) {
                leftStr = 0;
              }
              //将选中的标签滚动到屏幕中间
              ionicScrollDelegate.scrollTo(Math.abs(leftStr), 0, true);
              heightlight(curEl);
            }
          }
        };

        scope.events.on('slideChange', function (data) {
          setPosition(data.index);
        });
        scope.events.on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
          console.log(111)
          renderScrollableTabs();
        });

      },
      controller: function ($scope, $attrs, $element) {
        $scope.events = new SimplePubSub();
        $scope.slideHasChanged = function (index) {
          //切换页面时触发方法来切换标签
          console.log(222)
          $scope.events.trigger("slideChange", {"index": index});
        };
        //当repeat结束时，触发初始化方法
        $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
          console.log(ngRepeatFinishedEvent);
          $scope.events.trigger("ngRepeatFinished", {"event": ngRepeatFinishedEvent});
        });
      }
    }
  }]);


function SimplePubSub() {
  var events = {};
  return {
    on: function (names, handler) {
      console.log(names.split(' '));
      console.log(names);
      names.split(' ').forEach(function (name) {
        console.log(events[name]);
        if (!events[name]) {
          events[name] = [];
        }
        events[name].push(handler);
      });
      return this;
    },
    trigger: function (name, args) {
      console.log(events);
      angular.forEach(events[name], function (handler) {
        console.log(events[name]);
        console.log(handler);
        handler.call(null, args);
      });
      return this;
    }
  };
};

