angular.module('myInfoModule')
  .controller('greenLifeCtrl', [
    '$scope','$state','baseConfig','$ionicLoading',
    '$http','$timeout','$ionicHistory','$ionicPlatform',
    '$ionicScrollDelegate','hmsPopup','$rootScope',
    'publicMethod','$stateParams',
    function ($scope,$state,baseConfig,$ionicLoading,
              $http,$timeout,$ionicHistory,
              $ionicPlatform,$ionicScrollDelegate,
              hmsPopup,$rootScope, publicMethod,$stateParams) {

      //后退
      $scope.goBack = function(){
        $ionicHistory.goBack();
      }

      //用水量和用电量的单位
      $scope.waterUnit=localStorage.waterUnit?localStorage.waterUnit:'greenLife.waterUnit';
      $scope.electricityUnit=localStorage.electricityUnit?localStorage.electricityUnit:'greenLife.electricityUnit';

      //绿色房间数据
      $scope.data={
        "device":"all",//设备种类
        "index":1,//判断查询的是日、周、月的哪个
        "waterConsumption":5, //用水量
        "pureWaterConsumption":2.5, //纯净水用水量=用水量/2
        "electricityConsumption":100,//用电量
      };

      //控制日、周、月高亮
      $scope.index=1;

      //获取数据
      $scope.getData=function (index) {
        // hmsPopup.showLoading();
        if(index==1){
          $scope.index=1;
          $scope.data.index=1;
          $scope.data.waterConsumption=10;
          $scope.data.pureWaterConsumption=5;
          $scope.data.electricityConsumption=200;
        }
        else if(index==2){
          $scope.index=2;
          $scope.data.index=2;
          $scope.data.waterConsumption=80;
          $scope.data.pureWaterConsumption=40;
          $scope.data.electricityConsumption=800;
        }
        else{
          $scope.index=3;
          $scope.data.index=1;
          $scope.data.waterConsumption=100;
          $scope.data.pureWaterConsumption=50;
          $scope.data.electricityConsumption=2000;
        }
        // $timeout(function () {
        //   hmsPopup.hideLoading();
        // },1000);
      };



    }]);
