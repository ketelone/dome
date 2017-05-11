angular.module('airfoilShowerModule')
  .controller('airfoilShowerCtrl', [
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
    'airfoilShowerService',
    'SettingsService',
    function($scope, $state, $interval, $window, $ionicModal, $ionicHistory, hmsPopup, $stateParams, bathroomService, bathroomCmdService, $timeout, baseConfig, hmsHttp, cmdService, $translate, airfoilShowerService, SettingsService) {


      $scope.ctemperature = '22℃';
      $scope.stemerature = '38℃';
      $scope.status = "airfoidShower.water";

      $scope.goBack = function(){
        //closebox();
        $ionicHistory.goBack();
      };

      $scope.$watch('',function(){
        getCurrentDeviceStatus();
      },true);

      /**
       *@autor: caolei
       *@disc: query device all status
       */
      var getCurrentDeviceStatus = function(){
        var data = airfoilShowerService.getAllStatus();
        var value = getCmdValue(data);
        sendCmd(getDeviceId() ,value,"获取出水状态","获取出水状态失败");
      };

      var getCmdValue = function(data){
        return airfoilShowerService.getCmdValue("8877", "00", data, "E3", "01");
      };

      /**
       *@autor: caolei
       *@return: device id
       *@disc: get device id
       */
      var getDeviceId = function(){
        var deviceList = localStorage.deviceInfo.split(";");
        for(var i = 0; i < deviceList.length; i ++){
          var deviceInfo = deviceList[i].split(",");
          if(deviceInfo[0] == SettingsService.get('sku')){
            return deviceInfo[1];
          }
        }
      };

      document.addEventListener('SocketPlugin.receiveTcpData', function (result) {
        var resultOn = result[0];
        if(resultOn.from.uid != getDeviceId()){
          return;
        }
        if (resultOn.data.cmd.length > 0) {
          var data = airfoilShowerService.explainAck(resultOn.data.cmd[0]);

          try{
            if(data.cmd == 'a6'){
              $scope.ctemperature = parseInt(data.ctemperature, 16);
              $scope.stemerature = parseInt(data.stemerature, 16);
            }
          }catch(e){
          }

          try{
            if(data.cmd == '83'){
              if(data.status == 'shower off'){
                $scope.stemerature = "";
              }else if(data.status == 'shower on'){
                $scope.status = "airfoidShower.water";
              }
            }
          }catch(e){
          }

          $scope.$apply();
        }
      }, false);

      var sendCmd = function(deviceId, value, successMsg, errorMsg){
        if(baseConfig.isCloudCtrl){
          cloudToCtrl(deviceId, value, successMsg, errorMsg);
        }else{
          pluginToCtrl(deviceId, value, successMsg, errorMsg);
        }
      };

      var pluginToCtrl = function(deviceId, value, successMsg, errorMsg){
        cmdService.sendCmd(deviceId, value, localStorage.boxIp);
      };

      var cloudToCtrl = function(deviceId, value, successMsg, errorMsg){
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
            if(response.code == 200){
              var value = airfoilShowerService.explainAck(response.data.data.cmd[0]);

              if(value.ack.toLowerCase() == "fa21"){
                angular.forEach($scope.handlenapeListNape, function(data, index, array){
                  if(data.matchdataid == 'water'){
                    data.selecFlag = true;
                    data.imgUrl = data.imgSeledUrl;
                    $scope.Toast.show($translate.instant("airfoidShower.waterSuccess"));
                  }
                });
              }else if(value.ack.toLowerCase() == "fa00"){
                angular.forEach($scope.handlenapeListNape, function(data, index, array){
                  if(data.matchdataid == 'clear'){
                    $scope.Toast.show($translate.instant("airfoidShower.stopSuccess"));
                    $timeout(function () {
                      data.selecFlag = true;
                      data.imgUrl = data.imgSeledUrl;
                    }, 1000);
                  }
                });
              }
            }else{
              alert("fail");
            }
          }
        ).error(
          function (response, status, header, config){
            hmsPopup.showShortCenterToast("");
          }
        );
      };


      var canvas=document.getElementById("canvas");

      /**
       *@autor: caolei
       *@params: color
       *@disc: change the color of the ring
       */
      var changeRingCol = function(color){
        var cxt=canvas.getContext("2d");
        var xLength = $window.innerWidth * 0.5;
        var yLength = $window.innerWidth * 0.7;
        var r = $window.innerWidth * 0.36;
        cxt.beginPath();
        cxt.arc(xLength,yLength,r,0,360,false);
        cxt.lineWidth=$window.innerWidth * 0.07;
        cxt.strokeStyle= color;
        cxt.fillStyle = color;
        cxt.stroke();
        cxt.scale(2,2);
        //cxt.fill();
        cxt.closePath();
      };

      canvas.height = $window.innerWidth*1.1;
      canvas.width = $window.innerWidth*1;
      var cxt=canvas.getContext("2d");
      var xLength = $window.innerWidth * 0.5;
      var yLength = $window.innerWidth * 0.7;
      var r = $window.innerWidth * 0.36;
      cxt.beginPath();
      cxt.arc(xLength,yLength,r,0,360,false);
      cxt.lineWidth=$window.innerWidth * 0.07;
      cxt.strokeStyle="#99d5ff";
      cxt.fillStyle = "#99d5ff";
      cxt.stroke();
      cxt.scale(2,2);
      //cxt.fill();
      cxt.closePath();

    }]);
