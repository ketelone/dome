/**
 * Created by daidongdong on 2017/4/3.
 */
angular.module('productModule')
  .controller('morningCtrl', [
    '$scope',
    '$state',
    'publicMethod', '$ionicModal', '$ionicPopover', '$timeout', '$ionicHistory', 'hmsHttp', 'hmsPopup',
    function ($scope, $state, publicMethod, $ionicModal, $ionicPopover, $timeout, $ionicHistory, hmsHttp, hmsPopup) {


      $scope.config = {
        openFlag: true,
        device1: false,//shebei
        device2: false,
        device3: false,
        device4: false,
        flagDevice1: false,//shifouanzhuang
      flagDevice2: false,
        flagDevice3: false,
        flagDevice4: false,
        onOrOff1 : true,//shifouzaixian
        onOrOff2 : true,
        onOrOff3 : true,
        onOrOff4 : true,
        onLinePic1 : "build/img/keyscene-morning/icon_home_device_signal5.png",//tupian
        onLinePic2 : "build/img/keyscene-morning/icon_home_device_signal5.png",
        onLinePic3 : "build/img/keyscene-morning/icon_home_device_signal5.png",
        onLinePic4 : "build/img/keyscene-morning/icon_home_device_signal5.png",
      }
      /**
       *@autor:daidongdong
       *@name:goBack
       *@params:
       *@return:
       *@disc:goback
       */
      $scope.goBack = function () {
        $ionicHistory.goBack();
      }

      /**
       *@autor:daidongdong
       *@name:openKeyscene
       *@params:
       *@return:
       *@disc:openKeysceneMorning
       */
      $scope.openKeyscene = function () {
        console.log($scope.config.openFlag);
        if ($scope.config.openFlag == true) {
          //马桶
          if($scope.config.flagDevice1 != true){
            console.log($scope.config.flagDevice1);
            $("#progressAnimation1").css({
              "-webkit-animation": "aaa 6s linear",
              "background": "#1a1d28"
            });
            $timeout(function () {
              $scope.config.device1 = true;
              $scope.config.openFlag = false;
            }, 6000);
          }
          //浴霸
          if($scope.config.flagDevice2 != true) {
            $("#progressAnimation3").css({
              "-webkit-animation": "aaa 4.0s linear",
              "background": "#1a1d28"
            });
            $timeout(function () {
              $scope.config.device3 = true;
            }, 4000);
          }
          //淋浴
          if($scope.config.flagDevice3 != true) {
            $("#progressAnimation2").css({
              "-webkit-animation": "aaa 2.0s linear",
              "background": "#1a1d28"
            });
            $timeout(function () {
              $scope.config.device2 = true;
            }, 2000);
          }
          //净水
          if($scope.config.flagDevice4 != true) {
            $("#progressAnimation4").css({
              "-webkit-animation": "aaa 10s linear",
              "background": "#1a1d28"
            });
            $timeout(function () {
              $scope.config.device4 = true;
            }, 10000);
          }
        } else {

        }
      }

      /**
       *@autor:daidongdong
       *@name:deleteKeyscene
       *@params:
       *@return:
       *@disc:delete Keyscene
       */
      $scope.deleteKeyscene = function () {
        hmsPopup.confirmNoTitle('删除场景', deleteKey);
        function deleteKey() {
          var url = "";
          var paramter = {}
          hmsHttp.post(url, paramter).success(
            function (response) {

            }
          ).error(
            function (response, status, header, config) {
            }
          );
        }

      }


      //连接box
      $scope.boxClick = function (item) {
        $scope.boxItem = item;
        console.log('lian box');
        cordova.plugins.SocketPlugin.tcpConnect({
          "timeout": "5000",
          "ip": item.payload.cmd_properties.ip,
        }, success, error);

        function success(response) {
          hmsPopup.showShortCenterToast("连接成功");
        }

        function error() {
          hmsPopup.showShortCenterToast("连接失败");
        }
      }


    }]);
