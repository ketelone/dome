/**
 * Created by daidongdong on 2017/4/3.
 */
angular.module('productModule')
  .controller('bathingCtrl', [
    '$scope',
    '$state',
    'publicMethod', '$ionicModal', '$ionicPopover', '$timeout', '$ionicHistory', 'hmsHttp', 'hmsPopup','cmdService','indexPageService',
    function ($scope, $state, publicMethod, $ionicModal, $ionicPopover, $timeout, $ionicHistory, hmsHttp, hmsPopup,cmdService,indexPageService) {


      $scope.config = {
        openFlag: true,
        device3: false,
        device4: false,
        flagDevice3: false,
        flagDevice4: false,
        onOrOff3: true,
        onOrOff4: true,
        onLinePic3: "build/img/keyscene-leavehome/icon_home_device_signal5.png",
        onLinePic4: "build/img/keyscene-leavehome/icon_home_device_signal5.png",
        isOneButton: true,
        isTwoButton: false,
        isOff: false
      }
      $scope.scane = JSON.parse(localStorage.crrentScane);
      $scope.config.isOff = $scope.scane.isOff;
      console.log('泡澡=='+localStorage.crrentScane);
      console.log('开关=='+$scope.config.isOff);

      /**
       *@autor:daidongdong
       *@name:goBack
       *@params:
       *@return:
       *@disc:goback
       */
      $scope.goBack = function () {
        indexPageService.edit($scope.scane);
        $ionicHistory.goBack();
      }

      $scope.getSwitchStatus = function (item) {
        sendCmd1()
        if ($scope.config.isOff) {
          $scope.openKeyscene();
        } else {
          $scope.closeKeyscene();
        }
      };
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
          //浴霸
          if ($scope.config.flagDevice3 != true) {
            $("#progressAnimation3").css({
              "-webkit-animation": "aaa 4.0s linear",
              "background": "#1a1d28"
            });
            $timeout(function () {
              $scope.config.device3 = true;
            }, 4000);
          }
          //淋浴
          if ($scope.config.flagDevice4 != true) {
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

      $scope.openKeyscenefast = function () {
        console.log($scope.config.openFlag);
        if ($scope.config.openFlag == true) {
          //浴霸
          if ($scope.config.flagDevice3 != true) {
            $("#progressAnimation3").css({
              "-webkit-animation": "aaa 0s linear",
              "background": "#1a1d28"
            });
              $scope.config.device3 = true;
          }
          //淋浴
          if ($scope.config.flagDevice4 != true) {
            $("#progressAnimation4").css({
              "-webkit-animation": "aaa 0s linear",
              "background": "#1a1d28"
            });
              $scope.config.device4 = true;
          }
        } else {

        }
      }

      $scope.closeKeyscene = function () {
        console.log($scope.config.openFlag);
        if ($scope.config.openFlag == true) {
          //浴霸
          if ($scope.config.flagDevice3 != true) {
            $scope.config.device3 = false;
            $("#progressAnimation3").css({
              "-webkit-animation": "bbb 0s linear",
              "background": ''
            });
          }
          //淋浴
          if ($scope.config.flagDevice4 != true) {
            $scope.config.device4 = false;
            $("#progressAnimation4").css({
              "-webkit-animation": "bbb 0s linear",
              "background": ''
            });
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



      //本地发送指令
      var pluginToCtrl = function (value, successMsg, errorMsg) {
        cmdService.sendScanCmd( value, localStorage.boxIp);
      };

      var sendCmd1 = function (index) {
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


        if($scope.scane.isOff == true){
          value[0].data.act_params.scn_id =  '000000015';
        }else {
          value[0].data.act_params.scn_id =  '000000016';
        }


        alert('发送的信息==='+JSON.stringify(value));
        pluginToCtrl( value, "发送成功", "发送失败");
      }
      if($scope.scane.isOff==true){
        $scope.openKeyscenefast();
      }

    }]);
