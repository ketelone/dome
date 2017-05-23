/**
 * Created by Angela on 2017/5/17.
 */
angular.module('myInfoModule')
  .controller('consumptionDetailCtrl', [
    '$scope','$state','baseConfig','$ionicLoading',
    '$http','$timeout','$ionicHistory','$ionicPlatform',
    '$ionicScrollDelegate','hmsPopup','$rootScope',
    'publicMethod','$stateParams',
    function ($scope,$state,baseConfig,$ionicLoading,
              $http,$timeout,$ionicHistory,
              $ionicPlatform,$ionicScrollDelegate,
              hmsPopup,$rootScope, publicMethod,$stateParams) {


      $scope.goBack = function(){
        $ionicHistory.goBack();
      };

      //查看的设备
      $scope.device=$stateParams.device?$stateParams.device:'my-info.greenLife.greenLife';
      //控制日、周、月高亮
      $scope.index=$stateParams.index?Number($stateParams.index):1;
      //消耗类型
      $scope.type=$stateParams.type?$stateParams.type:0;

      //用水量和用电量的单位
      $scope.waterUnit=localStorage.waterUnit?localStorage.waterUnit:'greenLife.waterUnit';
      $scope.electricityUnit=localStorage.electricityUnit?localStorage.electricityUnit:'greenLife.electricityUnit';

      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'));

      // 指定图表的配置项和数据
      var option = {
        title: {
        },
        tooltip: {
          trigger:'axis',
        },
        legend: {
        },
        grid:{
          show:false,
          left:0,
          top:0,
          right:0,
          // bottom:0
        },
        color:['#A5FFF6'],
        xAxis: {
          type: 'category',
          data: [1,2,3,4,5,6,7],
          axisLine:{
            show:false,
          },
          axisTick:{
            show:false,
          },
          axisLabel:{
            margin:30,
            textStyle:{
              fontSize:24,
              color:'white',
            },
          },
          axisPointer:{
            show:true,
            label:{
              show:false,
              formatter:"{value}号"
            },
            lineStyle:{//标线宽度
              width:3,
              color:'white',
            }
          },
        },
        yAxis: {
          type:'value',
          show:false,
        },
        brush:{
          xAxisIndex:'all'
        },
        series: [{
          type: 'line',
          name:'用水量',
          data: [5, 20, 36, 10, 10, 20,0],
          lineStyle:{//折线宽度
            normal:{
              width:4,
            }
          }
        }]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);

      myChart.on('click', function (params) {
        // 控制台打印数据的名称
        console.log(params);
        $scope.data.waterConsumption=params.value;
      });

      //绿色房间数据
      $scope.data={
        "device":$scope.device,//设备种类
        "index":1,//判断查询的是日、周、月的哪个
        "waterConsumption":5, //用水量
        "pureWaterConsumption":2.5, //纯净水用水量=用水量/2
        "electricityConsumption":100,//用电量
      };

      //获取数据
      $scope.getData=function (index) {
        // hmsPopup.showLoading();
        if(index==1){
          $scope.index=1;
          //获取数据
          //修改图表数据
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
