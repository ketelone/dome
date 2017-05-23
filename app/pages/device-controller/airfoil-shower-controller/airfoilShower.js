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
      $scope.waterUrl = "build/img/airfoil-shower/no_water.png";
      $scope.isUsing = false;
      $scope.isBig = $window.innerWidth > 1000 ? true : false;

      $scope.goBack = function(){
        //closebox();
        document.removeEventListener("SocketPlugin.receiveTcpData", receiveAirfoilTcpData, false);
        $ionicHistory.goBack();
      };

      var isLinkOk = false;
      $scope.$watch('',function(){
        var did = getDeviceId();
        if(did != ""){
          getCurrentDeviceStatus();
        }else{
          //alert("该设备没有绑定！");
        }

        hmsPopup.showLoading('<span translate="golabelvariable.loadingdata"></span>');
        $timeout(function(){
          if(!isLinkOk){
            hmsPopup.hideLoading();
            $scope.Toast.show($translate.instant("golabelvariable.loadingdataerrror"));
          }
        }, 10000);

        changeRingCol('#6ACBB3');
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
        var skuList = SettingsService.get('sku');
        var deviceId = "";
        var deviceList = localStorage.deviceInfo.split(";");
        for(var i = 0; i < deviceList.length; i ++){
          var deviceInfo = deviceList[i].split(",");
          for(var j =0 ; j < skuList.length; j ++){
            if(deviceInfo[0] == skuList[j]){
              deviceId =  deviceInfo[1];
              return deviceId;
            }
          }
        }
        return deviceId;
      };

      var receiveAirfoilTcpData = function(result){
        var resultOn = result[0];
        if(resultOn.from.uid != getDeviceId()){
          return;
        }
        if (resultOn.data.cmd.length > 0) {
          isLinkOk = true;
          var data = airfoilShowerService.explainAck(resultOn.data.cmd[0]);

          try{
            if(data.cmd == 'a6'){
              $scope.ctemperature = parseInt(data.ctemperature, 16) + "℃";
              $scope.stemerature = parseInt(data.stemerature, 16) + "℃";
            }
          }catch(e){
          }

          try{
            if(data.cmd == '83'){
              if(data.status == 'shower off'){
                $scope.isUsing = false;
                $scope.stemerature = $scope.ctemperature;
                $scope.waterUrl = "build/img/airfoil-shower/no_water.png";
              }else if(data.status == 'shower on'){
                $scope.isUsing = true;
                $scope.status = "airfoidShower.water";
                $scope.waterUrl = "build/img/airfoil-shower/airfor_water.png"
              }
            }
            $scope.$apply();
          }catch(e){
          }
        }

        hmsPopup.hideLoading();
      };

      document.addEventListener('SocketPlugin.receiveTcpData', receiveAirfoilTcpData, false);

      /*document.addEventListener('SocketPlugin.receiveTcpData', function (result) {
        var resultOn = result[0];
        if(resultOn.from.uid != getDeviceId()){
          return;
        }
        if (resultOn.data.cmd.length > 0) {
          isLinkOk = true;
          var data = airfoilShowerService.explainAck(resultOn.data.cmd[0]);

          try{
            if(data.cmd == 'a6'){
              $scope.ctemperature = parseInt(data.ctemperature, 16) + "℃";
              $scope.stemerature = parseInt(data.stemerature, 16) + "℃";
            }
          }catch(e){
          }

          try{
            if(data.cmd == '83'){
              if(data.status == 'shower off'){
                $scope.isUsing = false;
                $scope.stemerature = $scope.ctemperature;
                $scope.waterUrl = "build/img/airfoil-shower/no_water.png";
              }else if(data.status == 'shower on'){
                $scope.isUsing = true;
                $scope.status = "airfoidShower.water";
                $scope.waterUrl = "build/img/airfoil-shower/airfor_water.png"
              }
            }
            $scope.$apply();
          }catch(e){
          }
        }

        hmsPopup.hideLoading();

      }, false);*/

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
        var c = '#6ACBB3';
        var cxt=canvas.getContext("2d");
        var xLength = $window.innerWidth * 0.5;
        var yLength = $window.innerWidth > 1000 ? $window.innerWidth * 0.73 : $window.innerWidth * 0.65;
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

    }]);
