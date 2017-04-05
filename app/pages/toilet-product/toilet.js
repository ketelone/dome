/**
 * Created by daidongdong on 2017/4/3.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('toilet', {
          url: '/toilet',
          templateUrl: 'build/pages/toilet-product/toilet.html',
          controller: 'toiletCtrl'
        });
    }
  ]).controller('toiletCtrl', [
  '$scope',
  '$state',
  'publicMethod','$ionicModal','$ionicPopover','$timeout',
  function ($scope, $state,publicMethod,$ionicModal,$ionicPopover,$timeout) {
    // $scope.functionList = [
    //   [{name:"大冲"},{name:"小冲"},{name:"翻盖"},{name:"翻圈"}],
    //   [{name:"关盖"},{name:"女性冲洗"},{name:"臀部冲洗"},{name:"暖风烘干"}],
    //   [{name:"暖脚"},{name:"圈温"},{name:"灯光"},{name:"设置"}]
    // ];
    // $scope.screenHeig = window.innerHeight;
    // $(".functionModal").css("top", $scope.screenHeig - 149 + 'px')
    // $scope.choose = function(item){
    //   console.log(item);
    // }

    //上部更多的页面
    $scope.toilets = [
      {name:"授权",icon :""},
      {name:"重命名",icon :""},
      {name:"移动",icon :""},
      {name:"删除",icon :""}
    ]
    $ionicPopover.fromTemplateUrl('build/pages/toilet-product/modal/popover.html', {
      scope: $scope,
    }).then(function(popover) {
      $scope.popover = popover;
    });
    $scope.openMore = function(){
      $scope.popover.show();
      console.log();
    }

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
  }]);
