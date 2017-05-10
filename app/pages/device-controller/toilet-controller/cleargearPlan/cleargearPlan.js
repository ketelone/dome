angular.module('toiletControlModule')
  .controller('cleargearPlanCtrl', [
    '$scope',
    '$state',
    '$translate',
    '$timeout',
    'publicMethod',
    '$ionicModal',
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
              baseConfig,
              checkVersionService,
              hmsPopup,
              cmdService
    ) {
      $scope.goBack = function () {
        publicMethod.goBack();
      };
      var cleartersetcmdObj = {
        boxid:localStorage.boxIp,
        diviceid:'8BE850C2',
        header:'8877',
        idx:1,
        ctrId:'E3',
        devId:'01'
      };
      var cleartersetting = new NIMI();

      $scope.clearGearPlanCheck = false;
      $scope.clearGearPlanCheckBg = true;
      $scope.weekTemp = [];
      $scope.weekTemp.push($translate.instant("cleargearPlan.zhouyi"));
      $scope.weekTemp.push($translate.instant("cleargearPlan.zhouer"));
      $scope.weekTemp.push($translate.instant("cleargearPlan.zhousan"));
      $scope.weekTemp.push($translate.instant("cleargearPlan.zhousi"));
      $scope.weekTemp.push($translate.instant("cleargearPlan.zhouwu"));
      $scope.weekTemp.push($translate.instant("cleargearPlan.zhouliu"));
      $scope.weekTemp.push($translate.instant("cleargearPlan.zhoutian"));
      $scope.cleargearPlan = {
        weekValDanwei:"cleargearPlan.weekValDanwei",
        clearRepeatVal:"("+ $scope.weekTemp.join(",")+")",
        danweiFlag:true,
        dataTime:"18:00",
        // // MOM, TUE, WED, THU, FRI, SAT, SUM
        // weekReapet:[{
        //
        // }]
      };
      $scope.fontsizgray={
        "color":"gray"
      };
      $scope.clearChangeSatus = function () {
        $scope.clearGearPlanCheck = !$scope.clearGearPlanCheck;
        if($scope.clearGearPlanCheck){
          $scope.clearGearPlanCheckBg = false;
          $scope.fontsizgray={}
        }else {
          $scope.clearGearPlanCheckBg = true;
          $scope.fontsizgray={
            "color":"gray"
          }
        }
      };
      // send directive
      /**
       *@params:
       *@disc:accept ack or status;
       */
      $scope.clearsetOnceFlag = 0;
      document.addEventListener('SocketPlugin.receiveTcpData', function (result) {
        var resultOn = result[0];
        alert(angular.toJson(resultOn))
        if(resultOn.from.uid === cleartersetcmdObj.diviceid){
          if (resultOn.data.cmd) {
            var backDataCmd = cleartersetting.analysisInstruction(resultOn.data.cmd[0]);
            if(backDataCmd.flag === "ack"){
              if($scope.clearsetOnceFlag === 0){
                $scope.clearsetOnceFlag++;
                // alert(1)
                // alert("backDataCmdlightclear"+angular.toJson(backDataCmd))
                if(backDataCmd.cmd === "0e") {
                  var name = "cleargearPlan.settingsucc";
                  if(backDataCmd.ack === "1000"){
                    $scope.Toast.show($translate.instant(name)+$translate.instant("golabelvariable.directesuccess"));
                  }else{
                    $scope.Toast.show($translate.instant(name)+$translate.instant("golabelvariable.directerror"));
                  };
                };
              };
            };
            $scope.$apply();
          };
        };
      }, false);
      /**
      /**
       *@params:cmdvalue(value) name(current chu fa name)
       *@disc:send clound Instruction;
       */
      $scope.clangerSetGetImpleteData = function(cmdvalue){
        //cloud
        var name = "cleargearPlan.settingsucc";
        hmsPopup.showLoading("<span translate='golabelvariable.loadingdata'></span>");
        $timeout(function () {
          hmsPopup.hideLoading();
          $scope.Toast.show("发生指令成功");
        },1000)
        // hmsPopup.showLoading("<span translate='golabelvariable.loadingdata'></span>");
        // var url = baseConfig.basePath + "/r/api/message/sendMessage";
        // var paramter = cmdService.cloudCmd(cmdvalue,"");
        // hmsHttp.post(url, paramter).success(
        //   function(response){
        //     hmsPopup.hideLoading();
        //     //resolve
        //     if(response.code == 200){
        //       if(value.ack.toLowerCase() == "fa27"){
        //         $scope.Toast.show(name+$translate.instant("golabelvariable.directesuccess"));
        //       }
        //     }else{
        //       $scope.Toast.show(name+$translate.instant("golabelvariable.directerror"));
        //     }
        //   }).
        // error(function () {
        //   hmsPopup.hideLoading();
        //   $scope.Toast.show(name + $translate.instant("golabelvariable.loadingdataerrror"));
        // })
      };
      // mSwitchType, hour, minute, dateSwitch, MOM, TUE, WED, THU, FRI, SAT, SUM
      $scope.sendCmdData = function () {
        $scope.clearsetOnceFlag = 0;
        if($scope.clearGearPlanCheckBg){
          $scope.Toast.show($translate.instant("cleargearPlan.settingopen"));
        }else{
          var cmdvalue = cmdService.getCmd(cleartersetcmdObj.header,cleartersetcmdObj.idx,cleartersetting.cleanWand("OFF", $scope.clearGeardataTimeval.hour, $scope.clearGeardataTimeval.minute, "ON", $scope.trunChange($scope.listleftRepeat[0].reflag),$scope.trunChange($scope.listleftRepeat[1].reflag),
            $scope.trunChange($scope.listleftRepeat[2].reflag),$scope.trunChange($scope.listleftRepeat[3].reflag),$scope.trunChange($scope.listleftRepeat[4].reflag),$scope.trunChange($scope.listleftRepeat[5].reflag)),cleartersetcmdObj.ctrId,cleartersetcmdObj.devId);        //send instructin
          console.log(cmdvalue)
          if(baseConfig.isCloudCtrl){
            $scope.clangerSetGetImpleteData(cmdvalue);
          }else{
            cmdService.sendCmd(cleartersetcmdObj.diviceid,cmdvalue,cleartersetcmdObj.boxid);
          };
        };
      };
      //data select
      //hour data
      $scope.listleft = [];
      $scope.listright = [];
      $scope.recicleObj = {};
      $scope.clearGeardataTime={
        hour:"",
        minute:""
      };
      $scope.clearGeardataTimeval={
        hour:"18",
        minute:"0"
      };
      for(var i=0;i<=23;i++){
        $scope.recicleObj = {
          name:i,
          flag:false,
          danwei:"cleargearPlan.hour",
        };
        $scope.listleft.push($scope.recicleObj)
      };
      //minute data
      for(var i=0;i<=3;i++){
        $scope.recicleObj = {
          name:i*15,
          flag:false,
          danwei:"cleargearPlan.minute",
        };
        $scope.listright.push($scope.recicleObj)
      };
      /**
       *@autor:gongke
       *@name:silderSeleced
       *@params:
       *@disc:add border and bottom line
       */
      $scope.silderSeleced = function (index) {
        $scope.listleft[index].flag = !$scope.listleft[index].flag;
        if($scope.listleft[index].flag){
          $scope.clearGeardataTime.hour = $scope.listleft[index].name+"时";
        }else{
          $scope.clearGeardataTime.hour = "";
        }
        for(var i=0;i<$scope.listleft.length;i++){
          if(index !== i){
            $scope.listleft[i].flag = false;
          }
        }
      };
      /**
       *@autor:gongke
       *@name:silderRightSeleced
       *@params:
       *@disc:add border and bottom line
       */
      $scope.silderRightSeleced = function (index) {
        $scope.listright[index].flag = !$scope.listright[index].flag;
        if($scope.listright[index].flag){
          $scope.clearGeardataTime.minute = $scope.listright[index].name+"分";
        }else{
          $scope.clearGeardataTime.minute = "";
        }
        for(var i=0;i<$scope.listright.length;i++){
          if(index !== i){
            $scope.listright[i].flag = false;
          }
        }
      };
      $scope.setModalTop = "clearGearModalTop";
      $ionicModal.fromTemplateUrl('build/pages/model/hmsiot-setSelect.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.setmodal = modal;
      });
      $scope.setopenModal = function () {
        $scope.setmodal.show();
        setTimeout(function () {
          var ele = document.getElementsByClassName("clearGearModalTop");
          ele[0].style.top = 68 + '%';
        }, 20);
      };
      $scope.$on('$destroy', function() {
        $scope.setmodal.remove();
      });
      $scope.setchoose = function () {
        $scope.setmodal.hide();
        if($scope.clearGeardataTime.hour && $scope.clearGeardataTime.minute){
          $scope.clearGeardataTimeval.hour = filterTimeMinute($scope.clearGeardataTime.hour,"hour");
          $scope.clearGeardataTimeval.minute = filterTimeMinute($scope.clearGeardataTime.minute,"minute");
          if($scope.clearGeardataTime.hour.length===2){
            $scope.clearGeardataTime.hour = "0"+$scope.clearGeardataTime.hour;
          };
          if($scope.clearGeardataTime.minute.length===2){
            $scope.clearGeardataTime.minute = "0"+$scope.clearGeardataTime.minute;
          };
          $scope.cleargearPlan.dataTime = filterTimeMinute($scope.clearGeardataTime.hour,"hour")+":"+ filterTimeMinute($scope.clearGeardataTime.minute,"minute")
        }else{
          $scope.Toast.show($translate.instant("cleargearPlan.selectPoup"));
        };
        console.log($scope.clearGeardataTimeval)
      };
      $scope.listleftRepeat = [{
        name:"cleargearPlan.zhouyi",
        reflag:true,
      },{
        name:"cleargearPlan.zhouer",
        reflag:true,
      },{
        name:"cleargearPlan.zhousan",
        reflag:true,
      },{
        name:"cleargearPlan.zhousi",
        reflag:true,
      },{
        name:"cleargearPlan.zhouwu",
        reflag:true,
      },{
        name:"cleargearPlan.zhouliu",
        reflag:true,
      },{
        name:"cleargearPlan.zhoutian",
        reflag:true,
      }];
      /**
       *@params:
       *@disc:trun true/false to ON/OFF
       */
      $scope.trunChange = function (value) {
        if(value){
          return "ON";
        }else{
          return "OFF";
        }
      }
      $ionicModal.fromTemplateUrl('build/pages/model/hmsiot-manySelect.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.setsingalmodal = modal;
      });
      $scope.setSingalOpenModal = function () {
        $scope.setsingalmodal.show();
        setTimeout(function () {
          var ele = document.getElementsByClassName("hmsiot-manySelect");
          ele[0].style.top = 43 + '%';
          ele[0].style.minHeight = 57 + '%';
        }, 20)
      };
      $scope.$on('$destroy', function() {
        $scope.setsingalmodal.remove();
        $scope.setmodal.remove();
      });
      /**
       *@autor:gongke
       *@name:setSingalChoose
       *@params:
       *@disc:hide model
       */
      $scope.itemSelected = [];
      $scope.setSingalChoose = function () {
        if($scope.itemSelected.length>0){
          $scope.itemSelected = [];
          $scope.cleargearPlan.clearRepeatVal = ""
        };
        $scope.listleftRepeat.forEach(function (item,index) {
          if(item.reflag){
            $scope.itemSelected.push($translate.instant(item.name))
          }
        });
        if($scope.itemSelected.length===0){
          $scope.cleargearPlan.danweiFlag =false;
          $scope.cleargearPlan.clearRepeatVal = "无设置重复"
        }else{
          $scope.cleargearPlan.danweiFlag =true;
          $scope.cleargearPlan.clearRepeatVal ="("+$scope.itemSelected.join(",")+")"
        }
        $scope.setsingalmodal.hide();
      };
      /**
       *@autor:gongke;
       *@name:silderRepeatSeleced
       *@params:index(selected index)
       *@disc:display or remove img
       */
      $scope.silderRepeatSeleced = function (index) {
        $scope.listleftRepeat[index].reflag = !$scope.listleftRepeat[index].reflag;
      }
    }]);
