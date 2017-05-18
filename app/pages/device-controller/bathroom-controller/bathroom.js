/**
 *@autor: caolei
 */
angular.module('bathroomModule')
  .controller('bathroomCtrl',[
    '$scope',
    '$state',
    '$interval',
    '$window',
    '$ionicModal',
    '$ionicHistory',
    'hmsPopup',
    '$stateParams',
    'bathroomService',
    'bathroomCmdService',
    '$timeout',
    'baseConfig',
    'hmsHttp',
    'cmdService',
    '$translate',
    'SettingsService',
    '$ionicPopover',
    function($scope, $state, $interval, $window, $ionicModal, $ionicHistory, hmsPopup, $stateParams, bathroomService, bathroomCmdService, $timeout, baseConfig, hmsHttp, cmdService, $translate, SettingsService,$ionicPopover){

      $scope.bathroomData = [
        {
          id: "1",
          switchPictureUrl: "build/img/bathroom/hot_wind_nor.png",
          isOpen: false,
          isCommon: true,
          isSetting: false,
          isBreathSwitch: false,
          isOpenTimer: false,
          setTime: "",
          switchType: "Hot",
          desc: "bathroom.hot"
        },
        {
          id: "2",
          switchPictureUrl: "build/img/bathroom/cool_wind_nor.png",
          isOpen: false,
          isCommon: true,
          isSetting: false,
          isBreathSwitch: false,
          isOpenTimer: false,
          setTime: "",
          switchType: "Cool",
          desc: "bathroom.cool"
        },
        {
          id: "3",
          switchPictureUrl: "build/img/bathroom/cool_nor.png",
          isOpen: false,
          isCommon: true,
          isSetting: false,
          isBreathSwitch: false,
          isOpenTimer: false,
          setTime: "",
          switchType: "Dryer",
          desc: "bathroom.dryer"
        },
        {
          id: "4",
          switchPictureUrl: "build/img/bathroom/hot_drying_nor.png",
          isOpen: false,
          isCommon: true,
          isSetting: false,
          isBreathSwitch: false,
          isOpenTimer: false,
          setTime: "",
          switchType: "Hot drying",
          desc: "bathroom.hotDrying"
        },
        {
          id: "5",
          switchPictureUrl: "build/img/bathroom/breath_nor.png",
          isOpen: false,
          isCommon: false,
          isSetting: false,
          isBreathSwitch: true,
          isOpenTimer: false,
          setTime: "",
          switchType: "Breath",
          desc: "bathroom.breath"
        },
        {
          id: "6",
          switchPictureUrl: "build/img/bathroom/purify_nor.png",
          isOpen: false,
          isCommon: true,
          isSetting: false,
          isBreathSwitch: false,
          isOpenTimer: false,
          setTime: "",
          switchType: "Purify",
          desc: "bathroom.purify"
        },
        {
          id: "7",
          switchPictureUrl: "build/img/bathroom/light_nor.png",
          isOpen: false,
          isCommon: true,
          isSetting: false,
          isBreathSwitch: false,
          isOpenTimer: false,
          setTime: "",
          switchType: "Light",
          desc: "bathroom.light"
        },
        {
          id: "8",
          switchPictureUrl: "build/img/bathroom/wind_nor.png",
          isOpen: false,
          isCommon: true,
          isSetting: false,
          isBreathSwitch: false,
          isOpenTimer: false,
          setTime: "",
          switchType: "Wind direction",
          desc: "bathroom.windDirection"
        },
        {
          id: "9",
          switchPictureUrl: "build/img/bathroom/stop_nor.png",
          isOpen: false,
          isCommon: true,
          isSetting: false,
          isBreathSwitch: false,
          isOpenTimer: false,
          setTime: "",
          switchType: "CloseAll",
          desc: "bathroom.closeAll"
        },
        {
          id: "10",
          switchPictureUrl: "build/img/bathroom/setting_nor.png",
          isOpen: false,
          isCommon: false,
          isSetting: true,
          isBreathSwitch: false,
          isOpenTimer: false,
          setTime: "",
          switchType: "Setting",
          desc: "bathroom.setting"
        }

      ];
      $scope.isBreath = false;
      $scope.isWindShow = false;
      $scope.count = 1;
      $scope.isCountDown = false;
      $scope.countDown = "00:00";
      $scope.temperate = '22℃';
      $scope.tempPercent = '19%';
      $scope.isBox = true;
      $scope.isBig = false;
      $scope.isWind = false;
      $scope.isTime = false;
      $scope.isShowTime = false;
      $scope.isTouchSwitch = false;
      $scope.isTimeOk = false;
      $scope.bathroomItem = {};
      $scope.signalStatus = "bathroom.signalStatus";
      var canvas=document.getElementById("canvas");
      $scope.setHour = "";
      $scope.setMinu = "";
      $scope.windType = {'type': "bathroom.rock"};
      var isLight = false;
      var isBreathOk = false;
      $scope.isNetOk = true;

      $scope.goBack = function(){
        document.removeEventListener("SocketPlugin.receiveTcpData", receiveBathroomTcpData, false);
        $ionicHistory.goBack();
      };

      var isLinkOk = false;
      var receiveBathroomTcpData = function (result) {

        var resultOn = result[0];

        if(resultOn.from.uid == getDeviceId()){
          if (resultOn.data.cmd.length > 0) {
            $scope.isNetOk = true;
            $timeout.cancel(timeOutCancel);
            isLinkOk = true;
            isOpenOk = true;

            changeLightStatus(resultOn.data.cmd[0]);
            changeHeaderStatus(resultOn.data.cmd[0]);
            changeAirStatus(resultOn.data.cmd[0]);
            changeAllStatus(resultOn.data.cmd[0]);

            var data = bathroomCmdService.explainAck(resultOn.data.cmd[0]);
            if(data.temperature){
              $scope.temperate = parseInt(data.temperature,16) + "℃";
              $scope.tempPercent = parseInt(data.humidity,16) + "%";
              //$scope.$apply();
            }

            var heater = bathroomCmdService.explainAck(resultOn.data.cmd[0]);

            try{
              if(heater.status || heater.cmd == '85'){
                //alert(heater.hour + ":"+　heater.min);
                $scope.countDown = "";
                $scope.isShowTime = true;

                var hourValue = parseInt(heater.hour, 16);
                if(hourValue < 10){
                  hourValue = "0" + hourValue;
                }else{
                  hourValue = hourValue;
                }
                var minuValue = parseInt(heater.min, 16);
                if(heater.second != '00'){
                  minuValue = minuValue + 1;
                }
                if(minuValue < 10){
                  minuValue = "0" + minuValue;
                }else{
                  minuValue = minuValue;
                }
                //if(heater.hour == '00' && heater.min == '00'){
                if(heater.status == 'heater finished'){
                  $scope.isTimeout = true;
                }
                //alert("show  " + hourValue + ":" + minuValue);
                if(hourValue <= 24){
                  if(minuValue == '60'){
                    var h = parseInt(heater.hour, 16) + 1;
                    if(h < 10 ){
                      hourValue = '0' + h;
                    }else{
                      hourValue = h;
                    }
                    minuValue = '00';
                  }
                  $scope.countDown = hourValue + ":" + minuValue;
                }

                $scope.$apply();
              }

              explainCurrentOperate(resultOn.data.cmd[0]);

            }catch(e){
            }

            if($scope.isTimeout){
              changeTimeStatus();
            }

            var isCloseTime = false;
            angular.forEach($scope.bathroomData, function(data, index, array) {
              if(data.isOpen){
                isCloseTime = true;
              }
            });

            if(!isCloseTime){
              $scope.isShowTime = false;
            }

            $scope.$apply();
          }
        }

        hmsPopup.hideLoading();
      };

      /**
       *@autor: caolei
       *@disc: close box link
       */
      var closebox = function () {
        cordova.plugins.SocketPlugin.tcpClose ({
          "ip": localStorage.boxIp
        },success,error);
        function success(response) {
          hmsPopup.showShortCenterToast("断开box成功");
        }

        function error() {
          hmsPopup.showShortCenterToast("断开box");
        }
      };

      var timeOutCancel = '';
      var pluginToCtrl = function(deviceId, value, successMsg, errorMsg){
        if(!$scope.isNetOk){
          $scope.Toast.show($translate.instant("golabelvariable.loadingdataerrror"));
          //localStorage.deviceInfo = "";
          if(getDeviceId() != ""){
            cmdService.sendCmd(deviceId, getValue(bathroomCmdService.getDeviceAllStatus()), localStorage.boxIp);
          }
          return;
        }else{
          if(isLightSwitch){
            isLight = false;
          }
          hmsPopup.showLoading();
          $timeout(function(){
            //hmsPopup.hideLoading();
            $scope.isNetOk = false;
            cmdService.sendCmd(deviceId, value, localStorage.boxIp);
          },400);
          $timeout(function(){
            timeOutCancel = $timeout(function(){
              if(!$scope.isNetOk){
                hmsPopup.hideLoading();
                $scope.Toast.show($translate.instant("golabelvariable.loadingdataerrror"));
              }
            }, 10000);
          }, 100);
          isLightSwitch = false;
        }
      };

      var cloudToCtrl = function(deviceId, value, successMsg, errorMsg){
        //cloud
        var url = baseConfig.basePath + "/r/api/message/sendMessage";
        var paramter = cmdService.cloudCmd(deviceId, value);

        /*var paramter = {
         "ver":1,
         "from":{
         "ctype":240,
         "uid": deviceId
         },
         "to":{
         "ctype":229,
         "uid":"hand-residential"
         },
         "ts":1493013672695,
         "idx":1,
         "mtype":"ctl",
         "data":{
         "cmd":[value]
         }
         };*/

        hmsHttp.post(url, paramter).success(
          function(response){
            console.log(response);
            if(response.code == 200){
              var value = bathroomCmdService.explainAck(response.data.data.cmd[0]);
              if(value.ack.toLowerCase() == "fa27"){
                angular.forEach($scope.bathroomData, function(data, index, array) {
                  if(data.switchType == "Light"){
                    data.switchPictureUrl = 'build/img/bathroom/light.png';
                    data.isOpen = true;
                    $scope.Toast.show($translate.instant("bathroom.openLightSuccess"));
                    return;
                  }
                });
              }else if(value.ack.toLowerCase() == "fa21"){//heater
                angular.forEach($scope.bathroomData, function(data, index, array) {
                  if(data.switchType == "Cool"){
                    data.switchPictureUrl = 'build/img/bathroom/Cool.png';
                    data.isOpen = true;
                    $scope.Toast.show($translate.instant("bathroom.openCoolSuccess"));
                    return;
                  }
                });
              }
            }else{
              $scope.Toast.show($translate.instant("bathroom.fail"));
            }
          }
        ).error(
          function (response, status, header, config){
            hmsPopup.showShortCenterToast("");
          }
        );
      };
      var sendCmd = function(deviceId, value, successMsg, errorMsg){

        if(baseConfig.isCloudCtrl){
          cloudToCtrl(deviceId, value, successMsg, errorMsg);
        }else{
          pluginToCtrl(deviceId, value, successMsg, errorMsg);
        }
      };

      var getCurrentTemplate = function(deviceId){
        sendCmd(deviceId,"887706010005721563","获取温度","获取温度失败");
      };

      var flag = false;
      $scope.isTimeout = false;
      document.addEventListener('SocketPlugin.receiveTcpData', receiveBathroomTcpData, false);

      var changeLightStatus = function(value){
        var lightStatus = bathroomCmdService.explainAck(value);
        if(lightStatus.cmd == '8a'){
          angular.forEach($scope.bathroomData, function(data, index, array) {
            if(data.switchType == "Light" && lightStatus.state == 'lighting_on'){
              data.switchPictureUrl = 'build/img/bathroom/light.png';
              data.isOpen = true;
            }else if(data.switchType == "Light" && lightStatus.state == 'lighting_off'){
              data.switchPictureUrl = 'build/img/bathroom/light_nor.png';
              data.isOpen = false;
            }
          });
          $scope.$apply();
        }
      };

      var changeHeaderStatus = function(value){
        var headerStatus = bathroomCmdService.explainAck(value);
        if(headerStatus.cmd == '84'){
          changeSwitchHidden();
          angular.forEach($scope.bathroomData, function(data, index, array) {
            $scope.isShowTime = true;
            //$scope.windType.type = localStorage.windType;
            if(data.switchType == "Hot" && headerStatus.status == 'heater'){
              data.switchPictureUrl = 'build/img/bathroom/hot_wind.png';
              data.isOpen = true;
            }else if(data.switchType == "Cool" && headerStatus.status == 'fan'){
              data.switchPictureUrl = 'build/img/bathroom/cool_wind.png';
              data.isOpen = true;
            }else if(data.switchType == "Dryer" && headerStatus.status == 'cool dry'){
              data.switchPictureUrl = 'build/img/bathroom/cool.png';
              data.isOpen = true;
            }else if(data.switchType == "Hot drying" && headerStatus.status == 'hot_dry'){
              data.switchPictureUrl = 'build/img/bathroom/hot_drying.png';
              data.isOpen = true;
            }else if(data.switchType == "Breath" && headerStatus.status == 'vantilation'){
              data.switchPictureUrl = 'build/img/bathroom/breath.png';
              data.isOpen = true;
            }
          });
          $scope.$apply();
        }
      };

      var changeAllStatus = function(value){
        var code = bathroomCmdService.explainAck(value);
        try{
          if(code.ack == 'fa00'){
            changeSwitchHidden();
            angular.forEach($scope.bathroomData, function(data, index, array) {
              if(data.switchType == 'Light'){
                data.switchPictureUrl = 'build/img/bathroom/light_nor.png';
                data.isOpen = false;
              }
            });
          }
        }catch (e){
        }
      };

      var changeAirStatus = function(value){
        var airStatus = bathroomCmdService.explainAck(value);
        if(airStatus.cmd == '85'){
          angular.forEach($scope.bathroomData, function(data, index, array) {
            if(data.switchType == "Purify" && airStatus.acs == 'Air-care on'){
              changeSwitchHidden();
              data.switchPictureUrl = 'build/img/bathroom/purify.png';
              data.isOpen = true;
            }else if(data.switchType == "Purify" && airStatus.acs == 'Air-care off'){
              data.switchPictureUrl = 'build/img/bathroom/purify_nor.png';
              data.isOpen = false;
            }
          });
          $scope.$apply();
        }
      };

      var explainCurrentOperate = function(value){
        var isWindFlag = true;
        var code = bathroomCmdService.explainAck(value);
        if(!code.ack){
          return;
        }
        if(code.ack.indexOf("fa") >= 0){
          var switchType = currentBtnStatus.type;
          if(switchType == "" && currentBtnStatus.status == ""){
            return;
          }
          if(switchType == 'Light'){
            if(currentBtnStatus.status){
              angular.forEach($scope.bathroomData, function(data, index, array) {
                if(data.switchType == switchType){
                  isLight = true;
                  data.switchPictureUrl = 'build/img/bathroom/light.png';
                  data.isOpen = true;

                  //changeRingCol('#ff6600');
                  return;
                }
              });
            }else{
              angular.forEach($scope.bathroomData, function(data, index, array) {
                if(data.switchType == switchType){
                  isLight = true;
                  data.switchPictureUrl = 'build/img/bathroom/light_nor.png';
                  data.isOpen = false;
                  //changeRingCol("#99d5ff");
                  return;
                }
              });
            }
          }else if(switchType == 'Wind direction'){
            if(currentBtnStatus.status){
              angular.forEach($scope.bathroomData, function(data, index, array) {
                if(data.switchType == switchType){
                  data.switchPictureUrl = 'build/img/bathroom/wind.png';
                  data.isOpen = true;
                  $scope.isWind = true;
                  return;
                }
              });
            }else{
              angular.forEach($scope.bathroomData, function(data, index, array) {
                if(data.switchType == switchType){
                  data.switchPictureUrl = 'build/img/bathroom/wind_nor.png';
                  data.isOpen = false;
                  return;
                }
              });
            }
          }else if(switchType == 'Breath'){
            isBreathOk = true;
            if(currentBtnStatus.status){
              angular.forEach($scope.bathroomData, function(data, index, array) {
                if(data.switchType == switchType){
                  //changeSwitchHidden(switchType);
                  data.switchPictureUrl = 'build/img/bathroom/breath.png';
                  isWindFlag = false;
                  data.isOpen = true;
                }
              });
              angular.forEach($scope.bathroomData, function(data, index, array){
                if(data.switchType == 'Hot' && data.isOpen){
                  data.switchPictureUrl = 'build/img/bathroom/hot_wind_nor.png';
                  $scope.isShowTime = false;
                  data.isOpen = false;
                }
                if(data.switchType == 'Cool' && data.isOpen){
                  data.switchPictureUrl = 'build/img/bathroom/cool_wind_nor.png';
                  localStorage.windType = "bathroom.rock";
                  $scope.isShowTime = false;
                  data.isOpen = false;
                }
                if(data.switchType == 'Dryer' && data.isOpen){
                  data.switchPictureUrl = 'build/img/bathroom/cool_nor.png';
                  localStorage.windType = "bathroom.rock";
                  $scope.isShowTime = false;
                  data.isOpen = false;
                }
                if(data.switchType == 'Hot drying' && data.isOpen){
                  data.switchPictureUrl = 'build/img/bathroom/hot_drying_nor.png';
                  localStorage.windType = "bathroom.rock";
                  $scope.isShowTime = false;
                  data.isOpen = false;
                }
                if(data.switchType == 'Purify' && data.isOpen){
                  data.switchPictureUrl = 'build/img/bathroom/purify_nor.png';
                  localStorage.windType = "bathroom.rock";
                  $scope.isShowTime = false;
                  data.isOpen = false;
                }
              });
              return;

            }else{
              angular.forEach($scope.bathroomData, function(data, index, array) {
                if(data.switchType == switchType){
                  data.switchPictureUrl = 'build/img/bathroom/breath_nor.png';
                  localStorage.windType = "bathroom.rock";
                  data.isOpen = false;
                  return;
                }
              });
            }

            //changeSwitchHidden(switchType);

          }else if(switchType == 'CloseAll'){
            angular.forEach($scope.bathroomData, function(data, index, array) {
              if(data.switchType == switchType){
                $scope.isShowTime = false;
                data.isOpen = true;
                data.switchPictureUrl = "build/img/bathroom/stop.png";
                $timeout(function () {
                  data.isOpen = false;
                  data.switchPictureUrl = "build/img/bathroom/stop_nor.png";
                  localStorage.windType = "bathroom.rock";
                }, 1000);
                return;
              }
            });
            //changeSwitchHidden(switchType);
          }

          angular.forEach($scope.bathroomData, function(data, index, array) {

            if(currentBtnStatus.status){
              if(switchType == 'Hot' && data.switchType == switchType){
                data.switchPictureUrl = 'build/img/bathroom/hot_wind.png';
                isWindFlag = false;
                data.isOpen = true;
                $scope.isWind = true;
                //changeRingCol('#ff6600');
              }
              if(switchType == 'Hot drying' && data.switchType == switchType){
                data.switchPictureUrl = 'build/img/bathroom/hot_drying.png';
                isWindFlag = false;
                data.isOpen = true;
                $scope.isWind = true;
                //changeRingCol('#ff6600');
              }
              if(switchType == 'Cool' && data.switchType == switchType){
                data.switchPictureUrl = 'build/img/bathroom/cool_wind.png';
                isWindFlag = false;
                data.isOpen = true;
                $scope.isWind = true;
                //changeRingCol("#99d5ff");
              }
              if(switchType == 'Dryer' && data.switchType == switchType){
                data.switchPictureUrl = 'build/img/bathroom/cool.png';
                isWindFlag = false;
                data.isOpen = true;
                $scope.isWind = true;
                //changeRingCol("#99d5ff");
              }

              if(switchType == 'Purify' && data.switchType == switchType){
                data.switchPictureUrl = 'build/img/bathroom/purify.png';
                data.isOpen = true;
                //changeRingCol("#99d5ff");
              }

              if((switchType == 'Dryer' || switchType == 'Cool' || switchType == 'Hot drying' || switchType == 'Hot' || switchType == 'Purify')  && data.switchType == 'Breath'){
                data.switchPictureUrl = 'build/img/bathroom/breath_nor.png';
                data.isOpen = false;
              }
              $scope.isTimeOk = true;
            }else{
              if(switchType == 'Hot' && data.switchType == switchType){
                data.switchPictureUrl = 'build/img/bathroom/hot_wind_nor.png';
                //$scope.windType.type = "bathroom.rock";
                $scope.isShowTime = false;
                data.isOpen = false;
              }
              if(switchType == 'Cool' && data.switchType == switchType){
                data.switchPictureUrl = 'build/img/bathroom/cool_wind_nor.png';
                //$scope.windType.type = "bathroom.rock";
                localStorage.windType = "bathroom.rock";
                $scope.isShowTime = false;
                data.isOpen = false;
              }
              if(switchType == 'Dryer' && data.switchType == switchType){
                data.switchPictureUrl = 'build/img/bathroom/cool_nor.png';
                //$scope.windType.type = "bathroom.rock";
                localStorage.windType = "bathroom.rock";
                $scope.isShowTime = false;
                data.isOpen = false;
              }
              if(switchType == 'Hot drying' && data.switchType == switchType){
                data.switchPictureUrl = 'build/img/bathroom/hot_drying_nor.png';
                //$scope.windType.type = "bathroom.rock";
                localStorage.windType = "bathroom.rock";
                $scope.isShowTime = false;
                data.isOpen = false;
              }
              if(switchType == 'Purify' && data.switchType == switchType){
                data.switchPictureUrl = 'build/img/bathroom/purify_nor.png';
                //$scope.windType.type = "bathroom.rock";
                localStorage.windType = "bathroom.rock";
                $scope.isShowTime = false;
                data.isOpen = false;
              }
              //changeRingCol("#99d5ff");
              //$scope.isTimeOk = false;
            }
          });

          if(switchType != 'Light' && switchType != 'Wind direction' && switchType != 'Breath'){
            angular.forEach($scope.bathroomData, function(data, index, array) {
              if(data.switchType != switchType){
                if(data.switchType == 'Hot'){
                  data.switchPictureUrl = 'build/img/bathroom/hot_wind_nor.png';
                  data.isOpen = false;
                }
                if(data.switchType == 'Cool'){
                  data.switchPictureUrl = 'build/img/bathroom/cool_wind_nor.png';
                  data.isOpen = false;
                }
                if(data.switchType == 'Dryer'){
                  data.switchPictureUrl = 'build/img/bathroom/cool_nor.png';
                  data.isOpen = false;
                }
                if(data.switchType == 'Hot drying'){
                  data.switchPictureUrl = 'build/img/bathroom/hot_drying_nor.png';
                  data.isOpen = false;
                }
                if(data.switchType == 'Purify'){
                  data.switchPictureUrl = 'build/img/bathroom/purify_nor.png';
                  data.isOpen = false;
                }
              }
            });
          }

          if(isWindFlag){
            //$scope.windType.type = "bathroom.rock";
          }
        }
      };

      var changeSwitchHidden = function(){
        angular.forEach($scope.bathroomData, function(data, index, array) {
          //if(data.switchType != switchType && data.isOpen){
          if(data.isOpen){
            if(data.switchType == 'Hot'){
              data.switchPictureUrl = 'build/img/bathroom/hot_wind_nor.png';
              data.isOpen = false;
            }
            if(data.switchType == 'Cool'){
              data.switchPictureUrl = 'build/img/bathroom/cool_wind_nor.png';
              data.isOpen = false;
            }
            if(data.switchType == 'Dryer'){
              data.switchPictureUrl = 'build/img/bathroom/cool_nor.png';
              data.isOpen = false;
            }
            if(data.switchType == 'Hot drying'){
              data.switchPictureUrl = 'build/img/bathroom/hot_drying_nor.png';
              data.isOpen = false;
            }
            if(data.switchType == 'Purify'){
              data.switchPictureUrl = 'build/img/bathroom/purify_nor.png';
              data.isOpen = false;
            }
            if(data.switchType == 'Breath'){
              data.switchPictureUrl = 'build/img/bathroom/breath_nor.png';
              data.isOpen = false;
            }
          }
        });
      };

      var changeTimeStatus = function(){
        $scope.isShowTime = false;
        angular.forEach($scope.bathroomData, function(data, index, array) {

          if(data.isOpen){
            if(data.switchType == 'Hot'){
              data.switchPictureUrl = 'build/img/bathroom/hot_wind_nor.png';
              data.isOpen = false;
            }
            if(data.switchType == 'Cool'){
              data.switchPictureUrl = 'build/img/bathroom/cool_wind_nor.png';
              data.isOpen = false;
            }
            if(data.switchType == 'Dryer'){
              data.switchPictureUrl = 'build/img/bathroom/cool_nor.png';
              data.isOpen = false;
            }
            if(data.switchType == 'Hot drying'){
              data.switchPictureUrl = 'build/img/bathroom/hot_drying_nor.png';
              data.isOpen = false;
            }
            if(data.switchType == 'Purify'){
              data.switchPictureUrl = 'build/img/bathroom/purify_nor.png';
              data.isOpen = false;
            }
            if(data.switchType == 'Breath'){
              data.switchPictureUrl = 'build/img/bathroom/breath_nor.png';
              data.isOpen = false;
            }
          }

        });
        $scope.isTimeout = false;
        //changeRingCol("#99d5ff");
      };

      var getValue = function(data){
        return bathroomCmdService.getCmd('8877','01', data, 'E3', '05');
      };

      /**
       *@autor: caolei
       *@params: deviceId
       *@disc: open light
       */
      var openLight = function (deviceId) {
        var data = bathroomCmdService.operateLighting({"switch":"ON"});
        var value = getValue(data);
        if(baseConfig.isCloudCtrl){
          sendCmd("BathroomLightTurnOn", value ,"开灯","开灯失败");
        }else{
          sendCmd(deviceId, value ,"开灯","开灯失败");
        }
      };

      /**
       *@autor: caolei
       *@params: deviceId
       *@disc: close light
       */
      var closeLight = function (deviceId) {
        var data = bathroomCmdService.operateLighting({"switch":"OFF"});
        var value = getValue(data);
        if(baseConfig.isCloudCtrl){
          sendCmd("BathroomLightTurnOff",value,"关灯","关灯失败");
        }else{
          sendCmd(deviceId,value,"关灯","关灯失败");
        }
      };

      /**
       *@autor: caolei
       *@params: deviceId
       *@disc: open Hot
       */
      var openHot = function(deviceId, hour, min){
        $scope.isWind = true;
        $scope.isTime = false;
        var data = bathroomCmdService.operateHeater({"operate":"HEARTER","type":"01","switch":"ON","time_hour":hour,"time_min":min});
        if(hour == "" && min == ""){
          data = bathroomCmdService.operateHeater({"operate":"HEARTER","type":"01","switch":"ON","time_hour":"06","time_min":"00"});
        }
        var value = getValue(data);
        sendCmd(deviceId, value, "热风", "热风失败");
        //sendCmd(deviceId,"8877080200052101000A2D","热风","热风失败");
      };

      /**
       *@autor: caolei
       *@params: deviceId
       *@disc: close Hot
       */
      var closeHot = function(deviceId){
        //$scope.isWind = false;
        $scope.isTime = false;
        $scope.isCountDown = false;
        var data = bathroomCmdService.operateHeater({"switch":"OFF"});
        var value = getValue(data);
        sendCmd(deviceId, value, "热风关闭", "热风关闭失败");
        $scope.isShowTime = false;
        //sendCmd(deviceId,"8877080200052100000026","热风关闭","热风关闭失败");
      };

      /**
       *@autor: caolei
       *@params: deviceId
       *@disc: open cool
       */
      var openCool = function(deviceId, hour, min){
        $scope.isWind = true;
        $scope.isTime = false;
        $scope.isCountDown = false;
        var data = bathroomCmdService.operateHeater({"operate":"HEARTER","type":"02","switch":"ON","time_hour":hour,"time_min":min});
        if(hour == "" && min == ""){
          data = bathroomCmdService.operateHeater({"operate":"HEARTER","type":"02","switch":"ON","time_hour":"06","time_min":"00"});
        }
        var value = getValue(data);
        if(baseConfig.isCloudCtrl){
          sendCmd("BathroomCoolTurnOn",value,"凉风","凉风失败");
        }else{
          sendCmd(deviceId,value,"凉风","凉风失败");
        }

        //sendCmd(deviceId,"8877080300052102000A2F","凉风","凉风失败");
      };

      /**
       *@autor: caolei
       *@params: deviceId
       *@disc: close cool
       */
      var closeCool = function(deviceId){
        //$scope.isWind = false;
        $scope.isTime = false;
        $scope.isCountDown = false;
        var data = bathroomCmdService.operateHeater({"switch":"OFF"});
        var value = getValue(data);
        if(baseConfig.isCloudCtrl){
          sendCmd("BathroomCoolTurnOff",value,"凉风关闭","凉风关闭失败");
        }else{
          sendCmd(deviceId,value,"凉风关闭","凉风关闭失败");
        }
        $scope.isShowTime = false;
        //sendCmd(deviceId,"8877080200052100000026","凉风关闭","凉风关闭失败");
      };

      /**
       *@autor: caolei
       *@params: deviceId
       *@disc: open dryer
       */
      var openDryer = function(deviceId, hour, min){
        $scope.isWind = true;
        $scope.isTime = false;
        $scope.isCountDown = false;
        var data = bathroomCmdService.operateHeater({"operate":"HEARTER","type":"05","switch":"ON","time_hour":hour,"time_min":min});
        if(hour == "" && min == ""){
          data = bathroomCmdService.operateHeater({"operate":"HEARTER","type":"05","switch":"ON","time_hour":"06","time_min":"00"});
        }
        var value = getValue(data);
        //$timeout(function () {},300);
        sendCmd(deviceId,value,"冷干","冷干失 败");
        //sendCmd(deviceId,"8877080200052105000A29","冷干","冷干失 败");
      };

      /**
       *@autor: caolei
       *@params: deviceId
       *@disc: close dryer
       */
      var closeDryer = function(deviceId){
        //$scope.isWind = false;
        $scope.isTime = false;
        $scope.isCountDown = false;
        var data = bathroomCmdService.operateHeater({"switch":"OFF"});
        var value = getValue(data);
        sendCmd(deviceId,value,"冷干关闭","冷干关闭失败");
        $scope.isShowTime = false;
        //sendCmd(deviceId,"8877080200052100000026","冷干关闭","冷干关闭失败");
      };

      /**
       *@autor: caolei
       *@params: deviceId
       *@disc: open hot drying
       */
      var openHotDrying = function(deviceId,hour, min){
        $scope.isWind = true;
        $scope.isTime = false;
        $scope.isCountDown = false;
        var data = bathroomCmdService.operateHeater({"operate":"HEARTER","type":"03","switch":"ON","time_hour":hour,"time_min":min});
        if(hour == "" && min == ""){
          data = bathroomCmdService.operateHeater({"operate":"HEARTER","type":"03","switch":"ON","time_hour":"06","time_min":"00"});
        }
        var value = getValue(data);
        sendCmd(deviceId,value,"热干","热干失败");
      };

      /**
       *@autor: caolei
       *@params: deviceId
       *@disc: close hot drying
       */
      var closeHotDrying = function(deviceId){
        //$scope.isWind = false;
        $scope.isTime = false;
        $scope.isCountDown = false;
        var data = bathroomCmdService.operateHeater({"switch":"OFF"});
        var value = getValue(data);
        sendCmd(deviceId,value,"热干关闭","热干关闭失败");
        //sendCmd(deviceId,"8877080200052100000026","热干关闭","热干关闭失败");
      };

      //Breath
      var openBreath = function(deviceId, hour, min){
        var data = bathroomCmdService.operateHeater({"operate":"HEARTER","type":"04","switch":"ON","time_hour":hour,"time_min":min});
        if(hour == "" && min == ""){
          data = bathroomCmdService.operateHeater({"operate":"HEARTER","type":"04","switch":"ON","time_hour":"06","time_min":"00"});
        }
        var value = getValue(data);
        sendCmd(deviceId,value,"换气","换气失败");
      };
      var open24HBreath = function(deviceId){
        var data = bathroomCmdService.operateHeater({"operate":"HEARTER","type":"04","switch":"ON","time_hour":"ff","time_min":"00"});
        var value = getValue(data);
        sendCmd(deviceId,value,"换气","换气失败");
      };

      var closeBreath = function(deviceId){
        var data = bathroomCmdService.operateHeater({"switch":"OFF"});
        var value = getValue(data);
        sendCmd(deviceId,value,"换气关闭","换气关闭失败");
        $scope.isShowTime = false;
        isAllDay = false;
        //sendCmd(deviceId,"8877080200052100000026","换气关闭","换气关闭失败");
      };

      var openWindDirection = function (deviceId) {
        var data = bathroomCmdService.setHeaterPara({"mode":"SWING"});
        var value = getValue(data);
        sendCmd(deviceId,value,"风向","风向失败");
        localStorage.windType = "bathroom.rock";
        //sendCmd(deviceId,"887706020005034005","风向","风向失败");
      };

      var closeWindDirection = function (deviceId) {
        var data = bathroomCmdService.setHeaterPara({"mode":"NORMAL"});
        var value = getValue(data);
        sendCmd(deviceId,value,"风向关闭","风向关闭失败");
        localStorage.windType = "bathroom.fixed";
        //sendCmd(deviceId,"887706020005030004","风向关闭","风向关闭失败");
      };

      var closeAllFunction = function(deviceId){
        var data = bathroomCmdService.stopAllOperation();
        var value = getValue(data);

        sendCmd(deviceId,value,"一键关闭","一键关闭失败");
        $timeout(function () {
          closeWindDirection(deviceId);
        },300);

        angular.forEach($scope.bathroomData, function(data, index, array) {
          data.isOpen = false;
          if(data.switchType == 'Hot'){
            data.switchPictureUrl = 'build/img/bathroom/hot_wind_nor.png';
            //closeTimer();
            //closeHot(deviceId);
          }
          if(data.switchType == 'Cool'){
            data.switchPictureUrl = 'build/img/bathroom/cool_wind_nor.png';
            //closeTimer();
            //closeCool(deviceId);
          }
          if(data.switchType == 'Dryer'){
            data.switchPictureUrl = 'build/img/bathroom/cool_nor.png';
            //closeTimer();
            //closeDryer(deviceId);
          }
          if(data.switchType == 'Hot drying'){
            data.switchPictureUrl = 'build/img/bathroom/hot_drying_nor.png';
            //closeTimer();
            //closeHotDrying(deviceId);
          }
          if(data.switchType == 'Purify'){
            data.switchPictureUrl = 'build/img/bathroom/purify_nor.png';
          }
          if(data.switchType == 'Light'){
            data.switchPictureUrl = "build/img/bathroom/light_nor.png";
            //closeLight(deviceId);
          }
          if(data.switchType == 'Wind direction'){
            data.switchPictureUrl = "build/img/bathroom/wind_nor.png";
            //closeWindDirection(deviceId);
          }
          if(data.switchType == 'Breath'){
            data.switchPictureUrl = "build/img/bathroom/breath_nor.png";
            //closeBreath(deviceId);
          }

        });

        $scope.isShowTime = false;
        //var data = bathroomCmdService.stopAllOperation();
        //var value = getValue(data);
        //sendCmd(deviceId,value,"一键关闭","一键关闭失败");
        //sendCmd(deviceId,"8877050200050007","一键关闭","一键关闭失败");
      };

      var openPurify = function(deviceId, hour, min){
        var data = bathroomCmdService.operateAirCare({"operate":"AIRCARE","switch":"ON","time_hour":hour,"time_min":min});
        if(hour == "" && min == ""){
          data = bathroomCmdService.operateAirCare({"operate":"AIRCARE","switch":"ON","time_hour":"02","time_min":"00"});
        }
        var value = getValue(data);
        sendCmd(deviceId, value, "打开空气净化", "空气净化打开失败");
      };

      var closePurify = function(deviceId){
        var data = bathroomCmdService.operateAirCare({"operate":"AIRCARE","switch":"OFF"});
        var vaule = getValue(data);
        sendCmd(deviceId, vaule, "关闭空气净化", "空气净化关闭失败");
      };

      var getXOR = function(){
        var result = 2^0^5^(114^1);
        return result;
      };
      var test = function(){
        var url = baseConfig.basePath + "/r/api/message/sendMessage";
        var paramter = {
          "ver":1,
          "from":{
            "ctype":240,
            "uid":"13405533206"
          },
          "to":{
            "ctype":229,
            "uid":"hand-residential"
          },
          "ts":1493013672695,
          "idx":1,
          "mtype":"ctl",
          "data":{
            "cmd":["887706010005270221"]
          }
        };
        hmsHttp.post(url, paramter).success(

          function(response){

            /*var v = {
             "code":200,
             "data":{
             "ver":1,
             "from":{
             "ctype":240,
             "uid":"13405533206"
             },
             "to":{
             "ctype":229,
             "uid":"hand-residential"
             },
             "ts":1493013672695,
             "idx":1,
             "mtype":"ctl",
             "data":{
             "cmd":["887706010005fa27d9"]
             }
             }
             };*/

            var value = response.data.data.cmd[0];
          }
        ).error(
          function (response, status, header, config){
            hmsPopup.showShortCenterToast("");
          }
        );
      };

      /**
       *@autor: caolei
       *@disc: to obtain the information of Yuba
       */
      $scope.$watch('', function(){

        //test();

        var did = getDeviceId();
        if(did != ""){
          getCurrentSwitchStatus();

          if(!localStorage.windType){
            localStorage.windType = "bathroom.rock";
          }
          $scope.windType.type = localStorage.windType;

        }else{
          hmsPopup.showLoading('<span translate="golabelvariable.loadingdata"></span>');
          $timeout(function(){
            if(!isLinkOk){
              hmsPopup.hideLoading();
              $scope.Toast.show($translate.instant("golabelvariable.loadingdataerrror"));
              $scope.isNetOk = false;
            }
          }, 10000);
        }

        changeRingCol('#6ACBB3');

      }, true);

      var getCurrentSwitchStatus = function(){

        $scope.queryCount = 1;

        getDeviceAllStatus();

        //changeWindType();

      };


      var changeWindType = function(){
        var isRock = true;
        angular.forEach($scope.bathroomData, function(data, index, array) {
          if(data.isOpen){
            var isRock = false;
          }
        });
        if(isRock){
          $scope.windType.type = "bathroom.rock";
        }
      };

      var getDeviceAllStatus = function(){

        $timeout(function () {
          var data = bathroomCmdService.getDeviceAllStatus();
          var value = getValue(data);
          if(baseConfig.isCloudCtrl){

          }else{
            //hmsPopup.showLoading();
            $timeout(function () {
              //hmsPopup.hideLoading();
            },600);
            sendCmd(getDeviceId(), value ,"","");
          }
        },300);
      };

      var getAirCareStatus = function(){
        $timeout(function () {
          var data = bathroomCmdService.getAirCaseStatus();
          var value = getValue(data);
          if(baseConfig.isCloudCtrl){

          }else{
            sendCmd(getDeviceId(), value ,"获取air的状态","获取air的状态失败");
          }
        },300);
      };

      var getLightingStatus = function(){
        $timeout(function () {
          var data = bathroomCmdService.getLightDeviceStatus();
          var value = getValue(data);
          if(baseConfig.isCloudCtrl){

          }else{
            //alert("status");
            sendCmd(getDeviceId(), value ,"获取灯的状态","获取灯的状态失败");
          }
        },300);
      };

      var getDeviceStatus = function(){
        var deviceStatus = JSON.parse(localStorage.deviceStatus);
        angular.forEach(deviceStatus, function(data, index, array){
          if(data.deviceSku == $stateParams.deviceSku){
            if(data.deviceRssi != 0){
              $scope.signalStatus = 'bathroom.signalBadStatus'
            }
          }
        });
      };

      /**
       *@autor: caolei
       *@return: device id
       *@disc: get device id
       */
      var getDeviceId = function(){
        var skuList = SettingsService.get('sku');
        var did = "";
        var deviceList
        if(localStorage.deviceInfo){
          deviceList = localStorage.deviceInfo.split(";");
        }else{
          localStorage.deviceInfo = ";123456";
          deviceList = localStorage.deviceInfo.split(";");
        }
        for(var i = 0; i < deviceList.length; i ++){
          var deviceInfo = deviceList[i].split(",");
          for(var j =0 ; j < skuList.length; j ++){
            if(deviceInfo[0] == skuList[j]){
              did =  deviceInfo[1];
              return did;
            }
          }
        }

        return did;
      };

      var currentBtnStatus = {
        type: "",
        status: ""
      }

      var isLightSwitch = false;
      var isOpenOk = false;
      var startCommand = function(item){
        isOpenOk = false;
        currentBtnStatus.type = item.switchType;
        currentBtnStatus.status = item.isOpen;

        var deviceId = getDeviceId();

        if(item.switchType == 'CloseAll'){
          closeAllFunction(deviceId);
        }

        if(item.switchType == 'Light'){
          isLightSwitch = true;
          if(item.isOpen){
            item.isOpen = false;
            openLight(deviceId);
            //changeRingCol('#ff6600');
          }else{
            closeLight(deviceId);
            //changeRingCol('#99d5ff');
          }
          item.isOpen = false;
          //if(($scope.count%4) == 1){
          //  openLight(deviceId);
          //}else if(($scope.count%4) == 2){
          //  closeLight(deviceId);
          //  changeRingCol('#99d5ff');
          //}else
          //if(($scope.count%2) == 1){
          //  openLight(deviceId);
          //  changeRingCol('#ff6600');
          //}else if(($scope.count%2) == 0){
          //  closeLight(deviceId);
          //  changeRingCol('#99d5ff');
          //}
          $scope.count = $scope.count + 1;

        }else{
          if(item.isOpen){
            if(checkIsOk(item)){
              item.isOpen = false;
              if(item.switchType == 'Hot' || item.switchType == 'Hot drying'){
                if(item.switchType == 'Hot'){
                  if(localStorage.hotTimer != "default"){
                    var hotTimer = JSON.parse(localStorage.hotTimer);
                    openHot(deviceId, hotTimer.hour, hotTimer.min);
                  }else{
                    openHot(deviceId, "", "");
                  }
                }
                if(item.switchType == 'Hot drying'){
                  if(localStorage.hotDryingTimer != "default"){
                    var hotDryingTimer = JSON.parse(localStorage.hotDryingTimer);
                    openHotDrying(deviceId, hotDryingTimer.hour, hotDryingTimer.min);
                  }else{
                    openHotDrying(deviceId, "", "");
                  }
                }
                //changeRingCol('#ff6600');
              }
              if(item.switchType == 'Cool'){
                if(localStorage.coolTimer != "default"){
                  var coolTimer = JSON.parse(localStorage.coolTimer);
                  openCool(deviceId, coolTimer.hour, coolTimer.min);
                }else{
                  openCool(deviceId, "", "");
                }
              }
              if(item.switchType == 'Dryer'){
                if(localStorage.dryerTimer != "default"){
                  var dryerTimer = JSON.parse(localStorage.dryerTimer);
                  openDryer(deviceId, dryerTimer.hour, dryerTimer.min);
                }else{
                  openDryer(deviceId, "", "");
                }
              }
              /*if(isOthers){
                isOthers = false;
                $timeout(function(){
                  currentBtnStatus = {
                    type: 'Breath',
                    status: false
                  };
                  closeBreath(deviceId);
                }, 500);
              }*/
              if(item.switchType == 'Breath'){
                //openBreath(deviceId);
              }
              if(item.switchType == 'Wind direction'){
                $scope.isWind = true;
                $scope.isTime = false;
                $scope.isCountDown = false;
                openWindDirection(deviceId);
              }
              if(item.switchType == 'Purify'){
                if(localStorage.purityTimer != "default"){
                  var purityTimer = JSON.parse(localStorage.purityTimer);
                  openPurify(deviceId, purityTimer.hour, purityTimer.min);
                }else{
                  openPurify(deviceId, "", "");
                }
              }

              return true;
            }else{
              if(item.switchType == 'Wind direction'){
                item.isOpen = false;
                $scope.Toast.show($translate.instant("bathroom.pof"));
                //alert("请打开热风或者凉风或者冷干或者热干的功能");
              }else{
              }
              return false;
            }
          }else{
            if(item.switchType == 'Hot' || item.switchType == 'Cool' || item.switchType == 'Dryer' || item.switchType == 'Hot drying'){
              if(item.switchType == 'Hot'){
                //closeTimer();
                closeHot(deviceId);
              }
              if(item.switchType == 'Cool'){
                //closeTimer();
                closeCool(deviceId);
              }
              if(item.switchType == 'Dryer'){
                //closeTimer();
                closeDryer(deviceId);
              }
              if(item.switchType == 'Hot drying'){
                //closeTimer();
                closeHotDrying(deviceId);
              }
              angular.forEach($scope.bathroomData, function(data, index, array) {
                if (data.switchType == 'Wind direction') {
                  closeWindDirection(deviceId);
                  //$scope.isWind = false;
                  //$scope.isTime = true;
                  $scope.isCountDown = true;
                  data.isOpen = false;
                }
              });
            }
            if(item.switchType == 'Breath'){
              closeBreath(deviceId);
            }
            if(item.switchType == 'Purify'){
              //item.switchPictureUrl = 'build/img/bathroom/purify_nor.png';
              closePurify(deviceId);
            }
            if(item.switchType == 'Wind direction'){
              //item.switchPictureUrl = 'build/img/bathroom/wind_nor.png';
              //$scope.isWind = false;
              $scope.isTime = true;
              $scope.isCountDown = true;
              closeWindDirection(deviceId);
            }
            if((item.switchType != 'Hot' && item.switchType != 'Hot drying') || (item.switchType == 'Hot' || item.switchType == 'Hot drying')){
              //changeRingCol('#99d5ff');
            }
          }
        }

        if(item.switchType == 'Wind direction' && item.isOpen){
          $scope.isWind = true;
          $scope.isTime = false;
        }

      };

      /**
       *@autor: caolei
       *@params: object device
       *@return: true or false
       *@disc: get relative device is open
       */
      $scope.getInfo = function(item){

        //$scope.isTouchSwitch = true;
        //$scope.bathroomItem = item;
        if(item.switchType == 'Wind direction'){
          item.isOpen = false;
          openModal();
        }else {
          startCommand(item);
        }

      };

      var closeTimer = function(){
        //$scope.isWind = false;
        $scope.isTime = false;
        //$scope.countDown = 0;
      };

      /**
       *@autor: caolei
       *@params: object device
       *@return: true or false
       *@disc: check device's function is ok
       */
      var checkIsOk = function(item){
        if(item.switchType == 'Light'){
          return true;
        }
        var flag = true;
        var deviceId = getDeviceId();
        /*angular.forEach($scope.bathroomData, function(data, index, array) {
         if (data.switchType != 'Light' && (data.switchType != item.switchType) && (item.switchType != 'Wind direction' && item.switchType != 'Light' && item.switchType != 'Setting' && data.isOpen)) {

         if(data.switchType == 'Hot'){
         //closeTimer();
         closeHot(deviceId);
         }
         if(data.switchType == 'Cool'){
         //closeTimer();
         closeCool(deviceId);
         }
         if(data.switchType == 'Dryer'){
         //closeTimer();
         closeDryer(deviceId);
         }
         if(data.switchType == 'Hot drying'){
         //closeTimer();
         closeHotDrying(deviceId);
         }
         if(data.switchType == 'Purify'){
         //data.switchPictureUrl = 'build/img/bathroom/purify_nor.png';
         closePurify(deviceId)
         }
         if(data.switchType == 'Breath'){
         //closeTimer();
         closeBreath(deviceId);
         }
         }
         });*/

        var isWind = false;
        if(item.switchType == 'Wind direction'){
          angular.forEach($scope.bathroomData, function(data, index, array) {
            if ((data.switchType != item.switchType) && ((data.switchType == 'Hot' || data.switchType == 'Cool' || data.switchType == 'Dryer' || data.switchType == 'Hot drying') && data.isOpen)) {
              //item.isOpen = true;
              isWind = true;
            }
          });
          if(!isWind){
            //item.isOpen = false;
          }
          return isWind;
        }

        return flag;
      };

      var isOthers = false;
      $scope.getCommon = function(item){
        isOthers = true;
        if(localStorage.breathTimer != "default"){
          var breathTimer = JSON.parse(localStorage.breathTimer);
          openBreath(getDeviceId(), breathTimer.hour, breathTimer.min);
        }else{
          openBreath(getDeviceId(), "", "");
        }
        $scope.isWindShow = false;
        currentBtnStatus = {
          type: 'Breath',
          status: true
        };
        if(!$scope.isNetOk){
          $timeout(function(){
            if(!isBreathOk){
              closeThreeBtn(item);
            }
          }, 1000);
        }
      };

      var closeOthers = function(){
        var deviceId = getDeviceId();
        angular.forEach($scope.bathroomData, function(data, index, array){
          if(data.switchType == 'Hot' || data.switchType == 'Cool' || data.switchType == 'Dryer' || data.switchType == 'Hot drying') {
            if(data.isOpen){
              currentBtnStatus = {
                type: data.switchType,
                status: false
              };
              if (data.switchType == 'Hot') {
                closeHot(deviceId);
              }else if (data.switchType == 'Cool') {
                closeCool(deviceId);
              }else if (data.switchType == 'Dryer') {
                closeDryer(deviceId);
              }else if (data.switchType == 'Hot drying') {
                closeHotDrying(deviceId);
              }else if(item.switchType == 'Purify'){
                closePurify(deviceId);
              }
            }
          }
        });
      };

      var isAllDay = false;
      $scope.getAllDay = function(item){
        isAllDay = true;
        isOthers = true;
        open24HBreath(getDeviceId());
        $scope.isWindShow = false;
        currentBtnStatus = {
          type: 'Breath',
          status: true
        };
        if(!$scope.isNetOk){
          $timeout(function(){
            if(!isBreathOk){
              angular.forEach($scope.bathroomData, function(data, index, array){
                if(data.switchType == 'Breath'){
                  data.isOpen = false;
                  data.switchPictureUrl = "build/img/bathroom/breath_nor.png";
                }
              });
            }
          }, 1000);
        }
      };

      /**
       *@autor: caolei
       *@params: true or false
       *@disc: change the value of isBreath and isWindShow
       */
      $scope.showType = function(item){

        if(item.isOpen){
          if(checkIsOk(item)){
            $scope.isBreath = true;
            $scope.isWindShow = true;
            item.switchPictureUrl = "build/img/bathroom/breath.png";
          }else{
            $scope.Toast.show($translate.instant("bathroom.closeOtherFunction"));
          }
        }else{
          closeBreath(getDeviceId());
          item.switchPictureUrl = "build/img/bathroom/breath_nor.png";
          $scope.isBreath = false;
          currentBtnStatus = {
            type: 'Breath',
            status: false
          };
          angular.forEach($scope.bathroomData, function(data, index, array){
            if(data.switchType == 'Hot' && data.isOpen){
              data.switchPictureUrl = 'build/img/bathroom/hot_wind_nor.png';
              $scope.isShowTime = false;
              data.isOpen = false;
            }
            if(data.switchType == 'Cool' && data.isOpen){
              data.switchPictureUrl = 'build/img/bathroom/cool_wind_nor.png';
              localStorage.windType = "bathroom.rock";
              $scope.isShowTime = false;
              data.isOpen = false;
            }
            if(data.switchType == 'Dryer' && data.isOpen){
              data.switchPictureUrl = 'build/img/bathroom/cool_nor.png';
              localStorage.windType = "bathroom.rock";
              $scope.isShowTime = false;
              data.isOpen = false;
            }
            if(data.switchType == 'Hot drying' && data.isOpen){
              data.switchPictureUrl = 'build/img/bathroom/hot_drying_nor.png';
              localStorage.windType = "bathroom.rock";
              $scope.isShowTime = false;
              data.isOpen = false;
            }
          });
        }
      };

      /**
       *@autor: caolei
       *@params: true or false
       *@disc: close navigation button
       */
      $scope.closeNav = function(item){
        closeThreeBtn(item);
      };

      var closeThreeBtn = function(item){
        angular.forEach($scope.bathroomData, function(data, index, array){
          if(data.switchType == 'Breath' && isAllDay && isOthers){
            data.switchPictureUrl = "build/img/bathroom/breath.png";
          }
          if(data.switchType == 'Breath'){
            if(!isAllDay || !isOthers){
              data.isOpen = false;
              data.switchPictureUrl = "build/img/bathroom/breath_nor.png";
            }
          }
        });

        $scope.isWindShow = false;
      }

      /**
       *@autor: caolei
       *@disc: go to barthroomSet page
       */
      $scope.getBathroomInfo = function(item){
        item.isOpen = false;
        $state.go('bathroomSet');
      };

      /**
       *@autor: caolei
       *@disc: open timer
       */
      var deviceInfo = [];
      $scope.openTimer = function(){

        var hasOpenCount = 0;

        angular.forEach($scope.bathroomData, function(data, index, array){

          if(!data.isSetting && data.isOpen){
            hasOpenCount = hasOpenCount + 1;
            deviceInfo.push(data);
          }
        });

        if(hasOpenCount){
          openTimeModal();
        }else{
          $scope.Toast.show($translate.instant("bathroom.notCloseTimer"));
          //alert("不能开启定时功能");
        }
      };

      /**
       *@autor: caolei
       *@params: hour, minu
       *@disc: Timing of the current function
       */
      var needTimerFuctionArray = [];
      var getTimer = function(hour, minu){

        $scope.isTimeOk = true;
        $scope.isCountDown = true;
        var deviceId = getDeviceId();
        //$scope.countDown = $scope.timeHour.substring(0,$scope.timeHour.length-1)*60*60*1000 + $scope.timeMinu.substring(0,$scope.timeMinu.length-1)*60*1000 - 8*60*60*1000;
        var hourValue = $scope.timeHour.substring(0,1);
        if(!hourValue){
          hourValue = "00"
        }else{
          hourValue = "0" + hourValue;
        }
        var minuValue = $scope.timeMinu.substring(0,$scope.timeMinu.length-1);
        if(!minuValue){
          minuValue = "00";
        }else if(minuValue.length == 1){
          minuValue = "0" + minuValue;
        }
        $scope.isShowTime = true;
        $scope.countDown = hourValue + ":" + minuValue;

        var hour = hourValue;
        var min = "";
        if(parseInt($scope.timeMinu.substring (0,$scope.timeMinu.length-1)) < 16){
          min = "0" + parseInt($scope.timeMinu.substring (0,$scope.timeMinu.length-1)).toString(16);
        }else{
          min = parseInt($scope.timeMinu.substring (0,$scope.timeMinu.length-1)).toString(16);
        }

        angular.forEach(deviceInfo, function(data, index, array){
          var currentSwitchType = {"switchType": ""};
          if(data.switchType == 'Hot' && data.isOpen){
            currentSwitchType.switchType = data.switchType;
            needTimerFuctionArray.push(currentSwitchType);
            openHot(deviceId, hour, min);
            //$scope.windType.type = "bathroom.rock";
            localStorage.hotTimer = JSON.stringify({"hour": hour, "min": min});
          }
          if(data.switchType == 'Hot drying' && data.isOpen){
            currentSwitchType.switchType = data.switchType;
            needTimerFuctionArray.push(currentSwitchType);
            openHotDrying(deviceId, hour, min);
            //$scope.windType.type = "bathroom.rock";
            localStorage.hotDryingTimer = JSON.stringify({"hour": hour, "min": min});
          }
          if(data.switchType == 'Cool' && data.isOpen){
            currentSwitchType.switchType = data.switchType;
            needTimerFuctionArray.push(currentSwitchType);
            openCool(deviceId, hour, min);
            //$scope.windType.type = "bathroom.rock";
            localStorage.coolTimer = JSON.stringify({"hour": hour, "min": min});
          }
          if(data.switchType == 'Dryer' && data.isOpen){
            currentSwitchType.switchType = data.switchType;
            needTimerFuctionArray.push(currentSwitchType);
            openDryer(deviceId, hour, min);
            //$scope.windType.type = "bathroom.rock";
            localStorage.dryerTimer = JSON.stringify({"hour": hour, "min": min});
          }
          if(data.switchType == 'Breath' && data.isOpen){
            currentSwitchType.switchType = data.switchType;
            needTimerFuctionArray.push(currentSwitchType);
            openBreath(deviceId, hour, min);
            //$scope.windType.type = "bathroom.rock";
            localStorage.breathTimer = JSON.stringify({"hour": hour, "min": min});
          }
          if(data.switchType == 'Purify' && data.isOpen){
            currentSwitchType.switchType = data.switchType;
            needTimerFuctionArray.push(currentSwitchType);
            openPurify(deviceId, hour, min);
            localStorage.purityTimer = JSON.stringify({"hour": hour, "min": min});
          }
        });
      };

      /**
       *@autor: caolei
       *@params: color
       *@disc: change the color of the ring
       */
      var changeRingCol = function(color){
        var c = "#6ACBB3";
        var cxt=canvas.getContext("2d");
        var xLength = $window.innerWidth * 0.5;
        var yLength = $window.innerWidth * 0.78;
        //var yLength = $window.innerWidth * 0.95;
        var r = $window.innerWidth * 0.34;
        cxt.beginPath();
        cxt.arc(xLength,yLength,r,Math.PI*0.75,Math.PI*2.25,false);
        cxt.lineWidth =  $window.innerWidth * 0.055;
        cxt.strokeStyle = c;
        cxt.fillStyle = c;
        cxt.stroke();
        //cxt.fill();
        cxt.closePath();
        cxt.scale(2, 2);
      };


      //canvas.height = $window.innerWidth*1.1;
      //canvas.width = $window.innerWidth*1;
      //var cxt=canvas.getContext("2d");
      //var xLength = $window.innerWidth * 0.5;
      //var yLength = $window.innerWidth * 0.95;
      //var r = $window.innerWidth * 0.36;
      //cxt.beginPath();
      //cxt.arc(xLength,yLength,r,0,360,false);
      //cxt.lineWidth=$window.innerWidth * 0.07;
      //cxt.strokeStyle="#99d5ff";
      //cxt.fillStyle = "#99d5ff";
      //cxt.stroke();
      //cxt.scale(2,2);
      ////cxt.fill();
      //cxt.closePath();

      $scope.screenHeig = window.innerHeight;
      $ionicModal.fromTemplateUrl('build/pages/model/windModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });
      $scope.value = [{id:2,des:'bathroom.fixed'}, {id:3,des:'bathroom.rock'}];
      var openModal = function () {
        if($scope.value.length!==0) {
          $scope.modal.show();
          setTimeout(function () {
            var ele = document.getElementsByClassName("windModal");
            ele[0].style.top = $window.innerHeight * 0.85 + "px";
            ele[0].style.minHeight = 61 + '%';
          }, 10)
        }
      };
      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });
      $scope.choose = function (val) {
        $scope.modal.hide();
        for(var i=0;i<$scope.value.length;i++){
          if($scope.value[i].id == val.id){
            $scope.windType.type = $scope.value[i].des;
            localStorage.windType = $scope.value[i].des;
            if($scope.value[i].des != 'bathroom.fixed'){
              openWindDirection(getDeviceId());
            }else{
              closeWindDirection(getDeviceId());
            }
          }
        }
      };

      $scope.toilteSetting={
        gaiganyin:"",
        gaiganyinDistance:""
      };
      $scope.listleft = [{
        name:"0时",
        flag:false,
        towdata:[{
          name: "0分",
          flag:false
        },{
          name: "10分",
          flag:false
        },{
          name: "20分",
          flag:false
        },{
          name: "30分",
          flag:false
        },{
          name: "40分",
          flag:false
        },{
          name: "50分",
          flag:false
        },{
          name: "59分",
          flag:false
        }]
      },{
        name:"1时",
        flag:false,
        towdata:[{
          name: "无",
          flag:false
        }]
      },{
        name:"2时",
        flag:false,
        towdata:[{
          name: "无",
          flag:false
        }]
      },{
        name:"3时",
        flag:false,
        towdata:[{
          name: "无",
          flag:false
        }]
      },{
        name:"4时",
        flag:false,
        towdata:[{
          name: "无",
          flag:false
        }]
      },{
        name:"5时",
        flag:false,
        towdata:[{
          name: "无",
          flag:false
        }]
      },{
        name:"6时",
        flag:false,
        towdata:[{
          name: "无",
          flag:false
        }]
      }];
      $scope.timeHour="";
      $scope.timeMinu="";
      $scope.listright=$scope.listleft[0].towdata;
      $scope.silderSeleced = function (index) {
        $scope.listleft[index].flag = true;
        $scope.timeHour = $scope.listleft[index].name;
        //$scope.listright = $scope.listleft[index].towdata;
        for(var i=0;i<$scope.listleft.length;i++){
          if(index !== i){
            $scope.listleft[i].flag = false;
          }
        }
      };
      $scope.silderRightSeleced = function (index) {
        $scope.listright[index].flag = true;
        $scope.timeMinu = $scope.listright[index].name;
        for(var i=0;i<$scope.listright.length;i++){
          if(index !== i){
            $scope.listright[i].flag = false;
          }
        }
      };

      $ionicModal.fromTemplateUrl('build/pages/model/hmsiot-setSelect.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.setmodal = modal;
      });
      openTimeModal = function () {
        $scope.listright=$scope.listleft[0].towdata;
        $scope.setmodal.show();
        setTimeout(function () {
          var ele = document.getElementsByClassName("hmsiot-setSelect");
          ele[0].style.top = 68 + '%';
          ele[0].style.minHeight = 61 + '%';
        }, 10)
      };
      $scope.$on('$destroy', function() {
        $scope.setmodal.remove();
      });
      $scope.setchoose = function () {

        var oneStep = true;
        var twoStep = true;
        var threeStep = true;
        var fourStep = true;

        if($scope.timeHour.substring(0,$scope.timeHour.length-1) == 0 && $scope.timeMinu.substring (0,$scope.timeMinu.length-1) == 0){
          hmsPopup.showPopup('<span translate="bathroom.alertTimeout"></span>');
          oneStep = false;
        }
        if(oneStep){
          if($scope.timeHour.substring(0,$scope.timeHour.length-1) == 6 && $scope.timeMinu.substring (0,$scope.timeMinu.length-1) != 0){
            hmsPopup.showPopup('<span translate="bathroom.alertTimeout"></span>');
            twoStep = false;
          }
        }

        if(oneStep && twoStep){
          angular.forEach($scope.bathroomData, function(data, index, array) {
            if(data.switchType == "Purify" && data.isOpen){
              if($scope.timeHour.substring(0,$scope.timeHour.length-1) > 2){
                hmsPopup.showPopup('<span translate="bathroom.alertTimeout"></span>');
                threeStep = false;
              }
            }
          });
        }

        if(oneStep && twoStep && threeStep){
          if(isAllDay){
            hmsPopup.showPopup('<span translate="bathroom.alertTimeout"></span>');
            fourStep = false;
          }
        }

        if(oneStep && twoStep && threeStep && fourStep){
          getTimer($scope.timeHour, $scope.timeMinu);
        }
        $scope.setmodal.hide();
      };
      $scope.goLearn = function () {
        $state.go("bathroomLearning");
      }

      $scope.operating = [{
        text:'重命名'
      },{
        text:'移动'
      },{
        text:'解除绑定'
      },{
        text:'机器学习设置'
      }];

      $scope.popover = $ionicPopover.fromTemplateUrl('build/pages/device-controller/bathroom-controller/model/popover.html', {
        scope: $scope
      });

      // .fromTemplateUrl() 方法
      $ionicPopover.fromTemplateUrl('build/pages/device-controller/bathroom-controller/model/popover.html', {
        scope: $scope
      }).then(function(popover) {
        $scope.popover = popover;
      });


      $scope.openPopover = function($event) {
        $scope.popover.show($event);
      };

      $scope.closePopover = function(index) {
        console.log(index);
        $scope.popover.hide();
        if(index==3){
          $scope.goLearn();
        }
      };

    }]);
