/**
 * Created by daidongdong on 2017/4/10.
 */
angular.module('productModule')
  .controller('leaveHomeCtrl',     [
  '$scope',
  '$state',
  'publicMethod','$ionicModal','$ionicPopover','$timeout','$ionicHistory','hmsHttp',
  function ($scope, $state,publicMethod,$ionicModal,$ionicPopover,$timeout,$ionicHistory,hmsHttp) {

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
      onLinePic1 : "build/img/keyscene-leavehome/icon_home_device_signal5.png",//tupian
      onLinePic2 : "build/img/keyscene-leavehome/icon_home_device_signal5.png",
      onLinePic3 : "build/img/keyscene-leavehome/icon_home_device_signal5.png",
      onLinePic4 : "build/img/keyscene-leavehome/icon_home_device_signal5.png",
    }
    $scope.scane = JSON.parse(localStorage.crrentScane);
    $scope.disables = false;

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
      $scope.disables = true;
      $timeout(function () {
        $scope.disables = false;
      }, 4000);
      console.log($scope.config.openFlag);
      if ($scope.config.openFlag == true) {
        //马桶
        if($scope.config.flagDevice1 != true){
          console.log($scope.config.flagDevice1);
          $("#progressAnimation1").css({
            "-webkit-animation": "aaa 2s linear",
            "background": "#1a1d28"
          });
          $timeout(function () {
            $scope.config.device1 = true;
            $scope.config.openFlag = false;
          }, 2000);
        }
        //浴霸
        if($scope.config.flagDevice2 != true) {
          $("#progressAnimation3").css({
            "-webkit-animation": "aaa 2.0s linear",
            "background": "#1a1d28"
          });
          $timeout(function () {
            $scope.config.device3 = true;
          }, 2000);
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
            "-webkit-animation": "aaa 2s linear",
            "background": "#1a1d28"
          });
          $timeout(function () {
            $scope.config.device4 = true;
          }, 2000);
        }
        $timeout(function () {
          $scope.closeKeyscene();
          $scope.config.device4 = false;
          $scope.config.device3 = false;
          $scope.config.device2 = false;
          $scope.config.device1 = false;
        }, 8000);
        sendCmd1();
      } else {

      }
    }

    $scope.openKeyscenefast = function () {
      console.log($scope.config.openFlag);
      if ($scope.config.openFlag == true) {
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
              "scn_id": "000000012"
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
