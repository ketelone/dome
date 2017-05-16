/**
 * Created by chenjiacheng on 2017/4/3.
 */
angular.module('productModule')
  .controller('spaCtrl', [
    '$scope',
    '$state',
    'publicMethod', '$ionicModal', '$ionicPopover', '$timeout', '$ionicHistory', 'hmsHttp', 'hmsPopup', 'cmdService', 'bathroomCmdService', 'indexPageService','$ionicPlatform',
    function ($scope, $state, publicMethod, $ionicModal, $ionicPopover, $timeout, $ionicHistory, hmsHttp, hmsPopup, cmdService, bathroomCmdService, indexPageService,$ionicPlatform) {


      $scope.config = {
        openFlag: true,

        device2: false,
        device3: false,//shebei
        device4: false,

        flagDevice2: false,
        flagDevice3: false,//shifouanzhuang
        flagDevice4: false,

        onOrOff2: true,
        onOrOff3: true,//shifouzaixian
        onOrOff4: true,
        isOff: false,
        onLinePic3: "build/img/keyscene-spa/icon_home_device_signal5.png",
        onLinePic4: "build/img/keyscene-spa/icon_home_device_signal5.png",
      }

      $scope.isOff = false;
      $scope.isFirst = true;
      $scope.temperate = '';
      $scope.tempPercent = '';
      $scope.scane = JSON.parse(localStorage.crrentScane);
      $scope.config.isOff = $scope.scane.isOff;
      console.log('泡澡==' + localStorage.crrentScane);
      console.log('开关==' + $scope.isOff);


      /**
       *@autor:zhaocuiwang
       *@name:物理返回按钮
       *@params:
       *@return:
       *@disc:goback
       */
      $ionicPlatform.registerBackButtonAction(function (e) {
        // Is there a page to go back to
        //alert('进入物理返回键2!')
          indexPageService.edits($scope.scane);
          $ionicHistory.goBack();

        e.preventDefault();
        return false;
      }, 101);

      //platform.registerBackButtonAction(function (e) {
      //  alert('进入物理返回键!')
      //    indexPageService.edits($scope.scane);
      //    $ionicHistory.goBack();
      //
      //  e.preventDefault();
      //  return false;
      //},101);

      /**
       *@autor: caolei
       *@params: item
       *@disc: get switch status
       */

      $scope.getSwitchStatus = function () {
        console.log('状态==' + $scope.config.isOff);
        if ($scope.config.isOff==true) {
          $scope.openKeyscene();
        } else {
          $scope.closeKeyscene();
        }
        sendCmd1()
      };


      /**
       *@author:chenjiacheng
       *@name:goBack
       *@params:
       *@return:
       *@disc:goback
       */
      $scope.goBack = function () {
        indexPageService.edits($scope.scane);
        //var  scan =  indexPageService.getScaneList();
        //for(var i=0;i<scan.length;i++){
        //  if(scan[i].id==$scope.scane.id){
        //    console.log('当前情况=='+$scope.scane.isOff+'service读出状态==='+scan[i].isOff);
        //  }
        //}

        document.removeEventListener("SocketPlugin.receiveTcpData", spa, false);
        $ionicHistory.goBack();
      }

      /**
       *@author:chenjiacheng
       *@name:openKeyscene
       *@params:
       *@return:
       *@disc:openKeysceneSpa
       */
      $scope.openKeyscene = function () {
        console.log($scope.config.openFlag);
        if ($scope.config.openFlag == true) {
          //马桶
          /* if($scope.config.flagDevice1 != true){
           console.log($scope.config.flagDevice1);
           $("#progressAnimation1").css({
           "-webkit-animation": "aaa 5.5s linear",
           "background": "#1a1d28"
           });
           $timeout(function () {
           $scope.config.device1 = true;
           $scope.config.openFlag = false;
           }, 5700);
           }*/
          //镜柜
          if ($scope.config.flagDevice2 != true) {
            $("#progressAnimation2").css({
              "-webkit-animation": "aaa 2.0s linear",
              "background": "#1a1d28"
            });
            $timeout(function () {
              $scope.config.device2 = true;
            }, 2800);
          }
          //浴霸
          if ($scope.config.flagDevice3 != true) {
            $("#progressAnimation3").css({
              "-webkit-animation": "aaa 4.0s linear",
              "background": "#1a1d28"
            });
            $timeout(function () {
              getCurrentTemplate(getDeviceId());
              $scope.config.device3 = true;
            }, 2000);
          }
          //浴缸
          if ($scope.config.flagDevice4 != true) {
            $("#progressAnimation4").css({
              "-webkit-animation": "aaa 4s linear",
              "background": "#1a1d28"
            });
            $timeout(function () {
              $scope.config.device4 = true;
            }, 4000);
          }
        } else {

        }
      }

      $scope.openKeyscenefast = function () {
        console.log($scope.config.openFlag);
        if ($scope.config.openFlag == true) {
          //马桶
          /* if($scope.config.flagDevice1 != true){
           console.log($scope.config.flagDevice1);
           $("#progressAnimation1").css({
           "-webkit-animation": "aaa 5.5s linear",
           "background": "#1a1d28"
           });
           $timeout(function () {
           $scope.config.device1 = true;
           $scope.config.openFlag = false;
           }, 5700);
           }*/
          //镜柜
          if ($scope.config.flagDevice2 != true) {
            $("#progressAnimation2").css({
              "-webkit-animation": "aaa 0s linear",
              "background": "#1a1d28"
            });
            $scope.config.device2 = true;
          }
          //浴霸
          if ($scope.config.flagDevice3 != true) {
            $("#progressAnimation3").css({
              "-webkit-animation": "aaa 0s linear",
              "background": "#1a1d28"
            });

            $scope.config.device3 = true;
          }
          //浴缸
          if ($scope.config.flagDevice4 != true) {
            $("#progressAnimation4").css({
              "-webkit-animation": "aaa 0s linear",
              "background": "#1a1d28"
            });
            $scope.config.device4 = true;
          }
          getCurrentTemplate(getDeviceId());
        } else {

        }
      }

      $scope.closeKeyscene = function () {
        console.log($scope.config.openFlag);

        //镜柜

        $scope.config.device2 = false;
        $("#progressAnimation2").css({
          "-webkit-animation": "bbb 0s linear",
          "background": ''
        });

        //浴霸

        $scope.config.device3 = false;
        $("#progressAnimation3").css({
          "-webkit-animation": "bbb 0s linear",
          "background": ''
        });

        //浴缸
        $scope.config.device4 = false;
        $("#progressAnimation4").css({
          "-webkit-animation": "bbb 0s linear",
          "background": ''
        });
      }


      /**
       *@author:chenjiacheng
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
      var getDeviceId = function () {
        var deviceList
        if (localStorage.deviceInfo) {
          deviceList = localStorage.deviceInfo.split(";");
        } else {
          localStorage.deviceInfo = ";123456";
          deviceList = localStorage.deviceInfo.split(";");
        }
        for (var i = 0; i < deviceList.length; i++) {
          var deviceInfo = deviceList[i].split(",");
          if (deviceInfo[0] == localStorage.crrentScanesku) {
            return deviceInfo[1];
          }
        }
      };

      var pluginToCtrl = function (deviceId, value, successMsg, errorMsg) {
        //alert('发送指令中')
        //hmsPopup.showLoading();
        $timeout(function () {
          //hmsPopup.hideLoading();
          cmdService.sendCmd(deviceId, value, localStorage.boxIp);
        }, 500);
      };

      var sendCmd = function (deviceId, value, successMsg, errorMsg) {
        //alert('发送指令开始')
        //if(baseConfig.isCloudCtrl){
        //  cloudToCtrl(deviceId, value, successMsg, errorMsg);  //云端发送
        //}else{
        pluginToCtrl(deviceId, value, successMsg, errorMsg);
        //}
      };

      var getCurrentTemplate = function (deviceId) {
        //alert('获取到deviceid=='+deviceId);
        sendCmd(deviceId, "887706010005721563", "获取温度", "获取温度失败");
      };
      document.addEventListener('SocketPlugin.receiveTcpData', spa, false);
      var spa = function (result) {

        var resultOn = result[0];

        if (resultOn.from.uid == getDeviceId()) {
          //alert(JSON.stringify(result[0]));
          if (resultOn.data.cmd.length > 0) {
            var data = bathroomCmdService.explainAck(resultOn.data.cmd[0]);
            if (data.temperature) {
              $scope.temperate = parseInt(data.temperature, 16) + "℃";
              $scope.tempPercent = parseInt(data.humidity, 16) + "%";
              //$scope.$apply();
              //alert('温度===='+angular.toString($scope.temperate)+'湿度===='+angular.toString($scope.tempPercent));
            }

            $scope.$apply();
          }
        }

      }

      //本地发送指令
      var pluginToCtrl = function (value, successMsg, errorMsg) {
        cmdService.sendScanCmd(value, localStorage.boxIp);
      };

      var sendCmd1 = function (index) {
        var value = [
          {
            "ver": 1,
            "from": {
              "ctype": 227,
              "uid": "CN100012"
            },
            "to": {
              "ctype": 228,
              "uid": localStorage.boxId
            },
            "ts": 1487213040,
            "idx": 12,
            "mtype": "rqst",
            "data": {
              "device_type": "ALL_DEVICE",
              "act": "SCN_TRIGGER_REQUEST",
              "act_params": {
                "scn_id": "000000011"
              }
            }
          }
        ];



        if ($scope.config.isOff == true) {
          value[0].data.act_params.scn_id = '000000013';
          $scope.scane.isOff = true;
        } else {
          value[0].data.act_params.scn_id = '000000014';
          $scope.scane.isOff = false;
        }


        alert('发送的信息===' + JSON.stringify(value));
        pluginToCtrl(value, "发送成功", "发送失败");
      }
      if ($scope.scane.isOff == true) {
        $scope.openKeyscenefast();
      }

    }]);
