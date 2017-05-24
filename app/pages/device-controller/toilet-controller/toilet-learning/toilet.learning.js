angular.module('toiletControlModule')
  .controller('toiletLearningCtrl', [
    '$scope',
    '$state',
    '$translate',
    '$timeout',
    'publicMethod',
    '$ionicModal',
    '$compile',
    'baseConfig',
    'checkVersionService',
    'hmsPopup',
    'cmdService',
    function ($scope,
              $state,
              $translate,
              $timeout,
              publicMethod,
              $ionicModal,
              $compile,
              baseConfig,
              checkVersionService,
              hmsPopup,
              cmdService
    ) {
      $scope.goBack = function () {
        publicMethod.goBack();
      };

      $scope.isOn = false;
      $scope.img ='build/img/toilet-controller/toilet-learning/btn_off.png';
      $scope.isDay =  true;

      $scope.chongshuisetval = false;
      $scope.chuchousetval = false;
      // $scope.anjianvoicesetval = true,
      // $scope.welcomemsetval = false

      $scope.image = 'build/img/toilet-controller/toilet-learning/mt2.png';

      //$scope.next = function () {
      //  $scope.index += 1;
      //  if($scope.index <4){
      //    $scope.image = $scope.images[$scope.index];
      //  }else{
      //    $scope.index = 0;
      //    $scope.image = $scope.images[0];
      //  }
      //}
      $scope.change = function () {
        $scope.isOn =  !$scope.isOn;
        if($scope.isOn==true){
          $scope.img = 'build/img/toilet-controller/toilet-learning/btn_on.png';
          if($scope.isDay==true){
            if (window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/toilet-controller/toilet-learning/mt1.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/toilet-controller/toilet-learning/mte1.png';
            }
          }else{
            if (window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/toilet-controller/toilet-learning/mt3.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/toilet-controller/toilet-learning/mte3.png';
            }
          }
        }else {
          $scope.img ='build/img/toilet-controller/toilet-learning/btn_off.png';
          if($scope.isDay==true){
            if (window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/toilet-controller/toilet-learning/mt2.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/toilet-controller/toilet-learning/mte2.png';
            }
          }else{
            if (window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/toilet-controller/toilet-learning/mt4.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/toilet-controller/toilet-learning/mte4.png';
            }
          }
        }
      }

      $scope.changeModel = function (item) {
        if(item=='day'){
          $scope.isDay = true;
          if($scope.isOn==true){
            if (window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/toilet-controller/toilet-learning/mt1.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/toilet-controller/toilet-learning/mte1.png';
            }
          }else{
            if (window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/toilet-controller/toilet-learning/mt2.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/toilet-controller/toilet-learning/mte2.png';
            }
          }
        }else{
          $scope.isDay = false;
          if($scope.isOn==true){
            if (window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/toilet-controller/toilet-learning/mt3.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/toilet-controller/toilet-learning/mte3.png';
            }
          }else{
            if (window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/toilet-controller/toilet-learning/mt4.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/toilet-controller/toilet-learning/mte4.png';
            }
          }
        }
      };


      //$scope.toilteSettingData={
      //  // gaiganyin:"toiletSetting.ganyinggai",
      //  gaiganyinDistance:"toiletSetting.close",
      //  //jiedian setting
      //  jieDianSeting:"toiletSetting.never",
      //  jiedianDanwei:""
      //};
      //var tolitersetcmdObj = {
      //  boxid:localStorage.boxIp,
      //  diviceid:'8BE850C2',
      //  header:'8877',
      //  idx:1,
      //  ctrId:'00',
      //  devId:'01'
      //};
      //var nimisetting = new NIMI();
      ///**
      // *@params:
      // *@disc:accept ack or status;
      // */
      //document.addEventListener('SocketPlugin.receiveTcpData', function (result) {
      //  var resultOn = result[0];
      //  if(resultOn.from.uid === tolitersetcmdObj.diviceid){
      //    if (resultOn.data.cmd) {
      //      var backDataCmd = nimisetting.analysisInstruction(resultOn.data.cmd[0]);
      //      if(backDataCmd.flag === "ack"){
      //        var name = "toiletSetting.settingsucc";
      //        //
      //        // if(backDataCmd.cmd === "13"){
      //        //   var name = "toiletSetting.autofangai";
      //        // }else if(backDataCmd.cmd === "13"){
      //        //   var name = "toiletSetting.autofangai";
      //        // }else if(backDataCmd.cmd === "13"){
      //        //   var name = "toiletSetting.autofangai";
      //        // }else if(backDataCmd.cmd === "13"){
      //        //   var name = "toiletSetting.autofangai";
      //        // }else{
      //        //   var name = "";
      //        // };
      //        if(backDataCmd.ack === "fa"){
      //          $scope.Toast.show($translate.instant(name)+$translate.instant("golabelvariable.directesuccess"));
      //          if(type === "autochongshui"){
      //            $scope.chongshuisetval = !$scope.chongshuisetval;
      //          }else if(type === "autochuchou"){
      //            $scope.chuchousetval = !$scope.chuchousetval;
      //          };
      //        }else{
      //          $scope.Toast.show($translate.instant(name)+$translate.instant("golabelvariable.directerror"));
      //        };
      //      }
      //      $scope.$apply();
      //    };
      //  };
      //}, false);
      ///**
      // *@params:cmdvalue(value) type(chu fa type) name(current chu fa name)
      // *@disc:send clound Instruction;
      // */
      //$scope.toilSetGetImpleteData = function(type,cmdvalue, name){
      //  //cloud
      //  hmsPopup.showLoading("<span translate='toiletSetting.loadingdata'></span>");
      //  $timeout(function () {
      //    hmsPopup.hideLoading();
      //    $scope.Toast.show("发生指令成功");
      //  },1000);
      //  // hmsPopup.showLoading("<span translate='toiletSetting.loadingdata'></span>");
      //  // var url = baseConfig.basePath + "/r/api/message/sendMessage";
      //  // var paramter = cmdService.cloudCmd(cmdvalue,$scope.handlenapeListNape[index].cloudId);
      //  // hmsHttp.post(url, paramter).success(
      //  //   function(response){
      //  //     hmsPopup.hideLoading();
      //  //     //resolve
      //  //     if(response.code == 200){
      //  //       if(value.ack.toLowerCase() == "fa27"){
      //  //         $scope.Toast.show(name+$translate.instant("toiletSetting.directesuccess"));
      //  //         if(type === "autochongshui"){
      //  //           $scope.chongshuisetval = !$scope.chongshuisetval;
      //  //         }else if(type === "autochuchou"){
      //  //           $scope.chuchousetval = !$scope.chuchousetval;
      //  //         }
      //  //         // $scope.selectChange(index);
      //  //       }
      //  //     }else{
      //  //       $scope.Toast.show(name+$translate.instant("toiletSetting.directerror"));
      //  //     }
      //  //   }).
      //  // error(function () {
      //  //   hmsPopup.hideLoading();
      //  //   $scope.Toast.show(name + $translate.instant("toiletSetting.loadingdataerrror"));
      //  // })
      //};
      //$scope.changeCheckVal = function (type) {
      //  if(type === "autochongshui"){
      //    if(!$scope.chongshuisetval){
      //      var cmdvalue = cmdService.getCmd(tolitersetcmdObj.header,tolitersetcmdObj.idx,nimisetting.setting("OFF", "OFF", "OFF", "ON", "OFF", "OFF", "OFF", "OFF", "OFF"),tolitersetcmdObj.ctrId,tolitersetcmdObj.devId);
      //      //send instructin
      //      console.log(cmdvalue)
      //      if(baseConfig.isCloudCtrl){
      //        $scope.toilSetGetImpleteData(type,cmdvalue,$translate.instant("toiletSetting.autochongshui"));
      //      }else{
      //        // $scope.sendCmd("autochongshui",cmdvalue,$translate.instant("toiletSetting.autochongshui"));
      //        cmdService.sendCmd(tolitersetcmdObj.diviceid, cmdvalue, tolitersetcmdObj.boxid);
      //      }
      //    }else{
      //      var cmdvalue = cmdService.getCmd(tolitersetcmdObj.header,tolitersetcmdObj.idx,nimisetting.setting("OFF", "OFF", "OFF", "OFF", "OFF", "OFF", "OFF", "OFF", "OFF"),tolitersetcmdObj.ctrId,tolitersetcmdObj.devId);
      //      //send instructin
      //      console.log(cmdvalue)
      //      if(baseConfig.isCloudCtrl){
      //        $scope.toilSetGetImpleteData(type,cmdvalue,$translate.instant("toiletSetting.autochongshui"));
      //      }else{
      //        // $scope.sendCmd("autochongshui",cmdvalue,$translate.instant("toiletSetting.autochongshui"));
      //        cmdService.sendCmd(tolitersetcmdObj.diviceid, cmdvalue, tolitersetcmdObj.boxid);
      //      }
      //    }
      //  }else if(type === "autochuchou"){
      //    if(!$scope.chuchousetval){
      //      var cmdvalue = cmdService.getCmd(tolitersetcmdObj.header,tolitersetcmdObj.idx,nimisetting.setting("OFF", "OFF", "OFF", "OFF", "OFF", "OFF", "ON", "OFF", "OFF"),tolitersetcmdObj.ctrId,tolitersetcmdObj.devId);
      //      //send instructin
      //      console.log(cmdvalue)
      //      if(baseConfig.isCloudCtrl){
      //        $scope.toilSetGetImpleteData(type,cmdvalue,$translate.instant("toiletSetting.autochongshui"));
      //      }else{
      //        // $scope.sendCmd("autochuchou",cmdvalue,$translate.instant("toiletSetting.autochongshui"));
      //        cmdService.sendCmd(tolitersetcmdObj.diviceid, cmdvalue, tolitersetcmdObj.boxid);
      //      }
      //    }else{
      //      var cmdvalue = cmdService.getCmd(tolitersetcmdObj.header,tolitersetcmdObj.idx,nimisetting.setting("OFF", "OFF", "OFF", "OFF", "OFF", "OFF", "OFF", "OFF", "OFF"),tolitersetcmdObj.ctrId,tolitersetcmdObj.devId);
      //      //send instructin
      //      console.log(cmdvalue)
      //      if(baseConfig.isCloudCtrl){
      //        $scope.toilSetGetImpleteData(type,cmdvalue,$translate.instant("toiletSetting.autochongshui"));
      //      }else{
      //        // $scope.sendCmd("autochuchou",cmdvalue,$translate.instant("toiletSetting.autochongshui"));
      //        cmdService.sendCmd(tolitersetcmdObj.diviceid, cmdvalue, tolitersetcmdObj.boxid);
      //      }
      //    }
      //  }
      //};
      //$scope.jiedianval = [{
      //  id:"jiedianval",des:'toiletSetting.never','danwei':""
      //},{id:"jiedianval",des:'4','danwei':"toiletSetting.danwei"
      //},{id:"jiedianval",des:'8',danwei:"toiletSetting.danwei"},
      //  {id:"jiedianval",des:'12',danwei:"toiletSetting.danwei"
      //  },{id:"jiedianval",des:'toiletSetting.interngent','danwei':""
      //}];
      //$scope.autofangaival = [
      //  {id:"autofangaival",des:'toiletSetting.close','danwei':""},
      //  {id:"autofangaival",des:'toiletSetting.nearinstance','danwei':""},
      //  {id:"autofangaival",des:'toiletSetting.centerinstance',"danwei":""},
      //  {id:"autofangaival",des:'toiletSetting.farinstance',"danwei":""}
      //];
      // $scope.value = [];
      //  $scope.fontSize = document.documentElement.clientWidth / 7.5;
      //  $scope.setSingalModalTop = "toiletSetSingalModalTop";
      //  $scope.screenHeig = window.innerHeight;
      //  $ionicModal.fromTemplateUrl('build/pages/model/hmsModal.html', {
      //    scope: $scope,
      //    animation: 'slide-in-up'
      //  }).then(function (modal) {
      //    $scope.modal = modal;
      //  });
      //$scope.openModal = function (type) {
      //  if(type === "autofangai"){
      //    $scope.value = $scope.autofangaival;
      //  }else if(type === "jiedianset"){
      //    $scope.value = $scope.jiedianval;
      //  };
      //  if($scope.value.length!==0) {
      //    $scope.modal.show();
      //    setTimeout(function () {
      //      var ele = document.getElementsByClassName("toiletSetSingalModalTop");
      //      ele[0].style.top = $scope.screenHeig - 1*$scope.fontSize*$scope.value.length + 'px';
      //      ele[0].style.minHeight = 1*$scope.fontSize*$scope.value.length + 'px';
      //    }, 10)
      //  };
      //};
      //$scope.$on('$destroy', function() {
      //  $scope.modal.remove();
      //});
      //$scope.choose = function (val) {
      //  $scope.modal.hide();
      //  if(val.id === "jiedianval"){
      //    $scope.toilteSettingData.jieDianSeting=val.des;
      //    $scope.toilteSettingData.jiedianDanwei = val.danwei;
      //    if(val.des === "toiletSetting.never"){
      //      var delayTime = 0;
      //    }else if(val.des === "4"){
      //      var delayTime = 4;
      //    }else if(val.des === "8"){
      //      var delayTime = 8;
      //    }else if(val.des === "12"){
      //      var delayTime = 12;
      //    }else if(val.des === "toiletSetting.interngent"){
      //      var delayTime = 15;
      //    };
      //    var cmdvalue = cmdService.getCmd(tolitersetcmdObj.header,tolitersetcmdObj.idx,nimisetting.powerSaveDelay(delayTime),tolitersetcmdObj.ctrId,tolitersetcmdObj.devId);
      //    //send instructin
      //    console.log(cmdvalue)
      //    if(baseConfig.isCloudCtrl){
      //      $scope.toilSetGetImpleteData("jiedian",cmdvalue,$translate.instant("toiletSetting.jiedianset"));
      //    }else{
      //      // $scope.sendCmd("jiedian",cmdvalue,$translate.instant("toiletSetting.jiedianset"));
      //      cmdService.sendCmd(tolitersetcmdObj.diviceid, cmdvalue, boxId);
      //    };
      //  }else{
      //    $scope.toilteSettingData.gaiganyinDistance=val.des;
      //    if(val.des === "toiletSetting.close"){
      //      var value = "closeLidAuto";
      //    }else if(val.des === "toiletSetting.nearinstance"){
      //      var value = "distanceNear";
      //    }else if(val.des === "toiletSetting.centerinstance"){
      //      var value = "distanceMedium";
      //    }else if(val.des === "toiletSetting.farinstance"){
      //      var value = "distanceFar";
      //    }
      //    var cmdvalue = cmdService.getCmd(tolitersetcmdObj.header,tolitersetcmdObj.idx,nimisetting._data[value],tolitersetcmdObj.ctrId,tolitersetcmdObj.devId);
      //    //send instructin
      //    console.log(cmdvalue)
      //    if(baseConfig.isCloudCtrl){
      //      $scope.toilSetGetImpleteData("autofangai",cmdvalue,$translate.instant("toiletSetting.autofangai"));
      //    }else{
      //      // $scope.sendCmd("autofangai",cmdvalue,$translate.instant("toiletSetting.autofangai"));
      //      cmdService.sendCmd(tolitersetcmdObj.diviceid, cmdvalue, boxId);
      //    };
      //  };
      //};
      ////确定是否清除设备设置
      //$scope.isCheckDeviceInfoSet = function () {
      //  hmsPopup.confirmNoTitle($translate.instant('toiletSetting.popmessage'),$translate.instant('golabelvariable.PopupConfire'),$translate.instant('golabelvariable.PopupCancle'),function () {
      //    console.log("你点击了确定")
      //  });
      //};
      ////进入各个设置的具体界面
      //$scope.goSettingInfo = function (url) {
      //  $state.go(url);
      //}

    }]);
