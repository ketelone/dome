angular.module('toiletControlModule')
  .controller('cleargearPlanCtrl', [
    '$scope',
    '$state',
    '$translate',
    'publicMethod',
    '$ionicModal',
    'baseConfig',
    'checkVersionService',
    'hmsPopup',
    function ($scope,
              $state,
              $translate,
              publicMethod,
              $ionicModal,
              baseConfig,
              checkVersionService,
              hmsPopup
    ) {
      $scope.goBack = function () {
        publicMethod.goBack();
      };
      $scope.clearGearPlanCheck = false;
      $scope.clearGearPlanCheckBg = true;
      $translate.instant("cleargearPlan.zhouyi")

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
        dataTime:"18:00"
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
      //data select
      //hour data
      $scope.listleft = [];
      $scope.listright = [];
      $scope.recicleObj = {};
      $scope.clearGeardataTime={
        hour:"",
        minute:""
      }
      for(var i=0;i<=23;i++){
        $scope.recicleObj = {
          name:i,
          flag:false,
          danwei:"cleargearPlan.hour",
        };
        $scope.listleft.push($scope.recicleObj)
      };
      //minute data
      for(var i=0;i<=6;i++){
        $scope.recicleObj = {
          name:i*10,
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
      $ionicModal.fromTemplateUrl('build/pages/model/hmsiot-setSelect.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.setmodal = modal;
      });
      $scope.setopenModal = function () {
        $scope.setmodal.show();
        setTimeout(function () {
          var ele = document.getElementsByClassName("hmsiot-setSelect");
          ele[0].style.top = 68 + '%';
        }, 10)
      };
      $scope.$on('$destroy', function() {
        $scope.setmodal.remove();
      });
      $scope.setchoose = function () {
        if($scope.clearGeardataTime.hour && $scope.clearGeardataTime.minute){
          if($scope.clearGeardataTime.hour.length===2){
            $scope.clearGeardataTime.hour = "0"+$scope.clearGeardataTime.hour;
          }
          if($scope.clearGeardataTime.minute.length===2){
            $scope.clearGeardataTime.minute = "0"+$scope.clearGeardataTime.minute;
          }
          $scope.cleargearPlan.dataTime = filterTimeMinute($scope.clearGeardataTime.hour,"hour")+":"+ filterTimeMinute($scope.clearGeardataTime.minute,"minute")
          $scope.setmodal.hide();
        }else{
          $scope.setmodal.hide();
          hmsPopup.showShortCenterToast("请选择数据项!");
        }
      };
      $scope.listleftRepeat = [{
        name:"cleargearPlan.zhouyi",
        reflag:true,
        dotflag:true
      },{
        name:"cleargearPlan.zhouer",
        reflag:true,
        dotflag:true
      },{
        name:"cleargearPlan.zhousan",
        reflag:true,
        dotflag:true
      },{
        name:"cleargearPlan.zhousi",
        reflag:true,
        dotflag:true
      },{
        name:"cleargearPlan.zhouwu",
        reflag:true,
        dotflag:true
      },{
        name:"cleargearPlan.zhouliu",
        reflag:true,
        dotflag:true
      },{
        name:"cleargearPlan.zhoutian",
        reflag:true,
        dotflag:true
      }];
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
          ele[0].style.top = 39 + '%';
        }, 10)
      };
      $scope.$on('$destroy', function() {
        $scope.setsingalmodal.remove();
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
          if(item.dotflag){
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
       *@autor:gongke
       *@name:silderRepeatSeleced
       *@params:index(selected index)
       *@disc:display or remove img
       */
      $scope.silderRepeatSeleced = function (index) {
        $scope.listleftRepeat[index].dotflag = !$scope.listleftRepeat[index].dotflag;
        // $scope.listleftRepeat[index].reflag = !$scope.listleftRepeat[index].reflag;
      }
    }]);
