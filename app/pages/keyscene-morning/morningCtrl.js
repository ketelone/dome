/**
 * Created by daidongdong on 2017/4/3.
 */
angular.module('productModule')
  .controller('morningCtrl', [
    '$scope',
    '$state',
    'publicMethod', '$ionicModal', '$ionicPopover', '$timeout', '$ionicHistory', 'hmsHttp', 'hmsPopup','cmdService','bathroomCmdService',
    function ($scope, $state, publicMethod, $ionicModal, $ionicPopover, $timeout, $ionicHistory, hmsHttp, hmsPopup,cmdService,bathroomCmdService) {


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
      $scope.scane = JSON.parse(localStorage.crrentScane);
      $scope.temperate='';
      $scope.tempPercent = '';
      $scope.disables = false;

      /**
       *@autor:daidongdong
       *@name:goBack
       *@params:
       *@return:
       *@disc:goback
       */
      $scope.goBack = function () {
        document.removeEventListener("SocketPlugin.receiveTcpData",  morning, false);
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
          $scope.disables = true;
          //马桶
          if($scope.config.flagDevice1 != true){
            console.log($scope.config.flagDevice1);
            $("#progressAnimation1").css({
              "-webkit-animation": "aaa 6.0s linear",
              "background": "#1a1d28"
            });
            $timeout(function () {
              $scope.config.device1 = true;
              $scope.config.openFlag = true;
            }, 6000);
          }
          //浴霸
          if($scope.config.flagDevice2 != true) {
            $("#progressAnimation3").css({
              "-webkit-animation": "aaa 4.0s linear",
              "background": "#1a1d28"
            });
            $timeout(function () {
              getCurrentTemplate( getDeviceId());
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
          $timeout(function () {
            $scope.closeKeyscene();
            $scope.config.device4 = false;
            $scope.config.device3 = false;
            $scope.config.device2 = false;
            $scope.config.device1 = false;
            $scope.disables = false;
            console.log('解除禁用!');
          }, 15000);

          sendCmd1();
        } else {
          $scope.config.openFlag= true;

        }
      }

      $scope.openKeyscenefast = function () {
        console.log($scope.config.openFlag);
        if ($scope.config.openFlag == true) {
          getCurrentTemplate( getDeviceId());
          //马桶
          if($scope.config.flagDevice1 != true){
            console.log($scope.config.flagDevice1);
            $("#progressAnimation1").css({
              "-webkit-animation": "aaa 0s linear",
              "background": "#1a1d28"
            });
              $scope.config.device1 = true;
              $scope.config.openFlag = true;
          }
          //浴霸
          if($scope.config.flagDevice2 != true) {
            $("#progressAnimation3").css({
              "-webkit-animation": "aaa 0s linear",
              "background": "#1a1d28"
            });

              $scope.config.device3 = true;

          }
          //淋浴
          if($scope.config.flagDevice3 != true) {
            $("#progressAnimation2").css({
              "-webkit-animation": "aaa 0s linear",
              "background": "#1a1d28"
            });
              $scope.config.device2 = true;
          }
          //净水
          if($scope.config.flagDevice4 != true) {
            $("#progressAnimation4").css({
              "-webkit-animation": "aaa 0s linear",
              "background": "#1a1d28"
            });
              $scope.config.device4 = true;
          }
          $timeout(function () {
            $scope.closeKeyscene();
            $scope.config.device4 = false;
            $scope.config.device3 = false;
            $scope.config.device2 = false;
            $scope.config.device1 = false;
          }, 5000);
          getCurrentTemplate( getDeviceId());
        } else {

        }
      }

      $scope.closeKeyscene = function () {
        console.log($scope.config.openFlag);

          //马桶
            console.log($scope.config.flagDevice1);
            $("#progressAnimation1").css({
              "-webkit-animation": "bbb 0s linear",
              "background": ""
            });

          //浴霸
            $("#progressAnimation3").css({
              "-webkit-animation": "bbb 0s linear",
              "background": ""
            });



          //淋浴
            $("#progressAnimation2").css({
              "-webkit-animation": "bbb 0s linear",
              "background": ""
            });

          //净水

            $("#progressAnimation4").css({
              "-webkit-animation": "bbb 0s linear",
              "background": ""
            });

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

      /**
       *@autor: caolei
       *@return: device id
       *@disc: get device id
       */
      var getDeviceId = function(){
        var deviceList
        if(localStorage.deviceInfo){
          deviceList = localStorage.deviceInfo.split(";");
        }else{
          localStorage.deviceInfo = ";123456";
          deviceList = localStorage.deviceInfo.split(";");
        }
        for(var i = 0; i < deviceList.length; i ++){
          var deviceInfo = deviceList[i].split(",");
          if(deviceInfo[0] == localStorage.crrentScanesku){
            return deviceInfo[1];
          }
        }
      };

      var pluginToCtrl = function(deviceId, value, successMsg, errorMsg){
        //alert('发送指令中')
        //hmsPopup.showLoading();
        $timeout(function(){
          //hmsPopup.hideLoading();
          cmdService.sendCmd(deviceId, value, localStorage.boxIp);
        },500);
      };

      var sendCmd = function(deviceId, value, successMsg, errorMsg){
        //alert('发送指令开始')
        //if(baseConfig.isCloudCtrl){
        //  cloudToCtrl(deviceId, value, successMsg, errorMsg);  //云端发送
        //}else{
        pluginToCtrl(deviceId, value, successMsg, errorMsg);
        //}
      };

      var getCurrentTemplate = function(deviceId){
        //alert('获取到deviceid=='+deviceId);
        sendCmd(deviceId,"887706010005721563","获取温度","获取温度失败");
      };
      document.addEventListener('SocketPlugin.receiveTcpData',morning , false);
      var morning = function (result) {

        var resultOn = result[0];

        if(resultOn.from.uid == getDeviceId()){
          //alert(JSON.stringify(result[0]));
          if (resultOn.data.cmd.length > 0) {
            var data = bathroomCmdService.explainAck(resultOn.data.cmd[0]);
            if(data.temperature){
              $scope.temperate = parseInt(data.temperature,16) + "℃";
              $scope.tempPercent = parseInt(data.humidity,16) + "%";
              //$scope.$apply();
              //alert('温度===='+angular.toString($scope.temperate)+'湿度===='+angular.toString($scope.tempPercent));
            }

            $scope.$apply();
          }
        }

      }




      //本地发送指令
      var pluginToCtrl = function (value, successMsg, errorMsg) {
        cmdService.sendScanCmd( value, localStorage.boxIp);
      };

      var sendCmd1 = function () {
        var value = [
          {
            "ver": 1,
            "from": {
              "ctype":  227,
              "uid"  : "CN100012"
            },
            "to": {
              "ctype": 228,
              "uid": localStorage.boxId
            },
            "ts": 1487213040,
            "idx": 12,
            "mtype":  "rqst",
            "data": {
              "device_type": "ALL_DEVICE",
              "act": "SCN_TRIGGER_REQUEST",
              "act_params": {
                "scn_id": "000000011"
              }
            }
          }
        ];

        alert('发送的信息==='+JSON.stringify(value));
        pluginToCtrl( value, "发送成功", "发送失败");
      }


      if($scope.scane.isOff==true){
        $scope.openKeyscenefast();
      }


    }]);
