angular.module('toiletControlModule')
  .controller('toiletSettingCtrl', [
    '$scope',
    '$state',
    '$translate',
    '$ionicPlatform',
    '$ionicHistory',
    '$timeout',
    'publicMethod',
    '$ionicModal',
    '$compile',
    'baseConfig',
    'checkVersionService',
    'hmsPopup',
    'cmdService',
    'SettingsService',
    function ($scope,
              $state,
              $translate,
              $ionicPlatform,
              $ionicHistory,
              $timeout,
              publicMethod,
              $ionicModal,
              $compile,
              baseConfig,
              checkVersionService,
              hmsPopup,
              cmdService,
              SettingsService
    ) {
      $scope.goBack = function () {
        document.removeEventListener("SocketPlugin.receiveTcpData", receiveTcpDatatoseting, false);
        publicMethod.goBack();
      };
      $ionicPlatform.registerBackButtonAction(function (e) {
        document.removeEventListener("SocketPlugin.receiveTcpData", receiveTcpDatatoseting, false);
        $ionicHistory.goBack();
        e.preventDefault();
        return false;
      }, 101);
      $scope.myObjstyle={};
      $scope.chongshuisetval = false,
      $scope.chuchousetval = false,
      $scope.toilteSettingData={
        gaiganyinDistance:"toiletSetting.close",
        jieDianSeting:"toiletSetting.never",
        jiedianDanwei:""
      };
      var getDeviceItoset = function(){
        var skuList = SettingsService.get('sku');
        var deviceId = "";
        var deviceList = localStorage.deviceInfo.split(";");
        for(var i = 0; i < deviceList.length; i ++){
          var deviceInfo = deviceList[i].split(",");
          for(var j =0 ; j < skuList.length; j ++){
            if(deviceInfo[0] == skuList[j]){
              deviceId =  deviceInfo[1];
              return deviceId;
            };
          };
        };
        return deviceId;
      };
      var tolitersetcmdObj = {
        boxid:localStorage.boxIp,
        diviceid:getDeviceItoset(),
        // diviceid:"8BE850C2",
        header:'8877',
        idx:1,
        ctrId:'E3',
        devId:'01'
      };
      var nimisetting = new NIMI();
      /**
       *@params:
       *@disc:accept ack or status;
       */
      try {
        $scope.tosetstatustiveOnceFlag = 0;
        $scope.selectedType = "";
        var receiveTcpDatatoseting =  function (result) {
          var resultOn = result[0];
          if (resultOn.from.uid === tolitersetcmdObj.diviceid) {
            if (resultOn.data.cmd) {
              var backDataCmd = nimisetting.analysisInstruction(resultOn.data.cmd[0]);
              if (backDataCmd.flag === "ack") {
                if ($scope.tosetstatustiveOnceFlag === 0) {
                  $scope.tosetstatustiveOnceFlag++;
                  try {
                    if (backDataCmd.cmd === "0a") {
                      var name = "toiletSetting.settingsucc";
                      if (backDataCmd.ack === "1000") {
                        $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directesuccess"));
                        if ($scope.selectedType === "autochongshui") {
                          $scope.chongshuisetval = !$scope.chongshuisetval;
                        } else if ($scope.selectedType === "autochuchou") {
                          $scope.chuchousetval = !$scope.chuchousetval;
                        };
                      }else {
                        $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directerror"));
                      };
                    } else if (backDataCmd.cmd === "13" || backDataCmd.cmd === "00" ||backDataCmd.cmd === "0c" || backDataCmd.cmd === "0f") {
                      var name = "toiletSetting.settingsucc";
                      if (backDataCmd.ack === "1000") {
                        $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directesuccess"));
                      } else {
                        $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directerror"));
                      }
                    };
                    // else if (backDataCmd.cmd === "0c") {
                    //   var name = "toiletSetting.settingsucc";
                    //   if (backDataCmd.ack === "1000") {
                    //     $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directesuccess"));
                    //   } else {
                    //     $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directerror"));
                    //   }
                    // }else if (backDataCmd.cmd === "0f") {
                    //   var name = "toiletSetting.settingsucc";
                    //   if (backDataCmd.ack === "1000") {
                    //     $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directesuccess"));
                    //   } else {
                    //     $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directerror"));
                    //   }
                    // }
                  } catch (e) {
                    alert(e.message);
                  };
                };
              };
              $scope.$apply();
            };
          };
        };
        document.addEventListener('SocketPlugin.receiveTcpData',receiveTcpDatatoseting, false);
      }catch(e){
        alert(e.message)
      }
      /**
       *@params:cmdvalue(value) type(chu fa type) name(current chu fa name)
       *@disc:send clound Instruction;
       */
      $scope.toilSetGetImpleteData = function(type,cmdvalue, name){
        //cloud
        hmsPopup.showLoading("<span translate='golabelvariable.loadingdata'></span>");
        $timeout(function () {
          hmsPopup.hideLoading();
          $scope.Toast.show("发生指令成功");
        },1000);
      };
      $scope.changeCheckVal = function (type) {
        $scope.tosetstatustiveOnceFlag = 0;
        $scope.selectedType=type;
        if(type === "autochongshui"){
          if(!$scope.chongshuisetval){
            var cmdvalue = cmdService.getCmd(tolitersetcmdObj.header,tolitersetcmdObj.idx,nimisetting.setting("OFF", "OFF", "OFF", "ON", "OFF", "OFF", "OFF", "OFF", "OFF"),tolitersetcmdObj.ctrId,tolitersetcmdObj.devId);
            //send instructin
            console.log(cmdvalue)
            if(baseConfig.isCloudCtrl){
              $scope.toilSetGetImpleteData(type,cmdvalue,$translate.instant("toiletSetting.autochongshui"));
            }else{
              cmdService.sendCmd(tolitersetcmdObj.diviceid, cmdvalue, tolitersetcmdObj.boxid);
            }
          }else{
            var cmdvalue = cmdService.getCmd(tolitersetcmdObj.header,tolitersetcmdObj.idx,nimisetting.setting("OFF", "OFF", "OFF", "OFF", "OFF", "OFF", "OFF", "OFF", "OFF"),tolitersetcmdObj.ctrId,tolitersetcmdObj.devId);
            //send instructin
            console.log(cmdvalue)
            if(baseConfig.isCloudCtrl){
              $scope.toilSetGetImpleteData(type,cmdvalue,$translate.instant("toiletSetting.autochongshui"));
            }else{
              cmdService.sendCmd(tolitersetcmdObj.diviceid, cmdvalue, tolitersetcmdObj.boxid);
            }
          }
        }else if(type === "autochuchou"){
          if(!$scope.chuchousetval){
            var cmdvalue = cmdService.getCmd(tolitersetcmdObj.header,tolitersetcmdObj.idx,nimisetting.setting("OFF", "OFF", "OFF", "OFF", "OFF", "OFF", "ON", "OFF", "OFF"),tolitersetcmdObj.ctrId,tolitersetcmdObj.devId);
            //send instructin
            console.log(cmdvalue)
            if(baseConfig.isCloudCtrl){
              $scope.toilSetGetImpleteData(type,cmdvalue,$translate.instant("toiletSetting.autochongshui"));
            }else{
              cmdService.sendCmd(tolitersetcmdObj.diviceid, cmdvalue, tolitersetcmdObj.boxid);
            }
          }else{
            var cmdvalue = cmdService.getCmd(tolitersetcmdObj.header,tolitersetcmdObj.idx,nimisetting.setting("OFF", "OFF", "OFF", "OFF", "OFF", "OFF", "OFF", "OFF", "OFF"),tolitersetcmdObj.ctrId,tolitersetcmdObj.devId);
            //send instructin
            console.log(cmdvalue)
            if(baseConfig.isCloudCtrl){
              $scope.toilSetGetImpleteData(type,cmdvalue,$translate.instant("toiletSetting.autochongshui"));
            }else{
              cmdService.sendCmd(tolitersetcmdObj.diviceid, cmdvalue, tolitersetcmdObj.boxid);
            };
          };
        };
      };
      //synchronous date
      var currentDate = new Date();
      var currentDateYear = Number(((currentDate.getFullYear()).toString()).substring(2,4));
      var currentDateMouth = currentDate.getMonth()+1;
      var currentDateDay = currentDate.getDate();
      var currentDateHour = currentDate.getHours();
      var currentDateMinute = currentDate.getMinutes();
      var currentDateWeek = currentDate.getDay();
      if(currentDateWeek == 0){
        currentDateWeek = 7;
      };
      var cmdvalue = cmdService.getCmd(tolitersetcmdObj.header,tolitersetcmdObj.idx,nimisetting.setDeviceTime(currentDateYear,currentDateMouth,currentDateDay,currentDateHour,currentDateMinute,currentDateWeek),tolitersetcmdObj.ctrId,tolitersetcmdObj.devId);
      //send instructin
      alert(cmdvalue);
      if(baseConfig.isCloudCtrl){
        $scope.toilSetGetImpleteData(type,cmdvalue,$translate.instant(""));
      }else{
        cmdService.sendCmd(tolitersetcmdObj.diviceid, cmdvalue, tolitersetcmdObj.boxid);
      };
      $scope.jiedianval = [{
        id:"jiedianval",des:'toiletSetting.never','danwei':""
      },{id:"jiedianval",des:'4','danwei':"toiletSetting.danwei"
      },{id:"jiedianval",des:'8',danwei:"toiletSetting.danwei"},
        {id:"jiedianval",des:'12',danwei:"toiletSetting.danwei"
        },{id:"jiedianval",des:'toiletSetting.interngent','danwei':""
      }];
      $scope.autofangaival = [
        {id:"autofangaival",des:'toiletSetting.close','danwei':""},
        {id:"autofangaival",des:'toiletSetting.nearinstance','danwei':""},
        {id:"autofangaival",des:'toiletSetting.centerinstance',"danwei":""},
        {id:"autofangaival",des:'toiletSetting.farinstance',"danwei":""}
      ];
       $scope.value = [];
        $scope.fontSize = document.documentElement.clientWidth / 7.5;
        $scope.setSingalModalTop = "toiletSetSingalModalTop";
        $scope.screenHeig = window.innerHeight;
        $ionicModal.fromTemplateUrl('build/pages/model/hmsModal.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function (modal) {
          $scope.modal = modal;
        });
      $scope.openModal = function (type) {
        if(type === "autofangai"){
          $scope.value = $scope.autofangaival;
        }else if(type === "jiedianset"){
          $scope.value = $scope.jiedianval;
        };
        $scope.reduceHeight = $scope.fontSize*$scope.value.length;
        $scope.myObjstyle = {
          "top":$scope.screenHeig - $scope.reduceHeight + 'px',
          "minHeight":$scope.reduceHeight + 'px'
        };
        if($scope.value.length!==0) {
          $scope.modal.show();
          // $timeout(function () {
          //   var ele = document.getElementsByClassName("toiletSetSingalModalTop");
          //   ele[0].style.top = $scope.screenHeig - 1*$scope.fontSize*$scope.value.length + 'px';
          //   ele[0].style.minHeight = 1*$scope.fontSize*$scope.value.length + 'px';
          // }, 0)
        };
      };
      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });
      $scope.choose = function (val) {
        $scope.tosetstatustiveOnceFlag = 0;
        $scope.modal.hide();
        if(val.id === "jiedianval"){
          $scope.toilteSettingData.jieDianSeting=val.des;
          $scope.toilteSettingData.jiedianDanwei = val.danwei;
          if(val.des === "toiletSetting.never"){
            var delayTime = 0;
          }else if(val.des === "4"){
            var delayTime = 4;
          }else if(val.des === "8"){
            var delayTime = 8;
          }else if(val.des === "12"){
            var delayTime = 12;
          }else if(val.des === "toiletSetting.interngent"){
            var delayTime = 15;
          };
          var cmdvalue = cmdService.getCmd(tolitersetcmdObj.header, tolitersetcmdObj.idx, nimisetting.powerSaveDelay(delayTime), tolitersetcmdObj.ctrId, tolitersetcmdObj.devId);
          //send instructin
          console.log(cmdvalue)
          // alert(cmdvalue)
          if(baseConfig.isCloudCtrl) {
            $scope.toilSetGetImpleteData("jiedian", cmdvalue, $translate.instant("toiletSetting.jiedianset"));
          }else{
            cmdService.sendCmd(tolitersetcmdObj.diviceid, cmdvalue, tolitersetcmdObj.boxid);
          };
        }else{
          $scope.toilteSettingData.gaiganyinDistance=val.des;
          if(val.des === "toiletSetting.close"){
            var value = "closeLidAuto";
          }else if(val.des === "toiletSetting.nearinstance"){
            var value = "distanceNear";
          }else if(val.des === "toiletSetting.centerinstance"){
            var value = "distanceMedium";
          }else if(val.des === "toiletSetting.farinstance"){
            var value = "distanceFar";
          };
          var cmdvalue = cmdService.getCmd(tolitersetcmdObj.header, tolitersetcmdObj.idx, nimisetting._data[value], tolitersetcmdObj.ctrId, tolitersetcmdObj.devId);
          //send instructin
          // alert(cmdvalue)
          if (baseConfig.isCloudCtrl) {
            $scope.toilSetGetImpleteData("autofangai", cmdvalue, $translate.instant("toiletSetting.autofangai"));
          } else {
            cmdService.sendCmd(tolitersetcmdObj.diviceid, cmdvalue, tolitersetcmdObj.boxid);
          };
        };
      };
      //确定是否清除设备设置
      $scope.isCheckDeviceInfoSet = function () {
        // hmsPopup.confirmNoTitle($translate.instant('toiletSetting.popmessage'),$translate.instant('golabelvariable.PopupConfire'),$translate.instant('golabelvariable.PopupCancle'),function () {
        //   console.log("你点击了确定")
        // });
      };
      //进入各个设置的具体界面
      $scope.goSettingInfo = function (url) {
        $state.go(url);
      };
    }]);
