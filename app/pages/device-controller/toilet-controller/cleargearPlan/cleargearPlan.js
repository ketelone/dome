angular.module('toiletControlModule')
  .controller('cleargearPlanCtrl', [
    '$scope',
    '$state',
    'publicMethod',
    '$ionicModal',
    'baseConfig',
    'checkVersionService',
    'hmsPopup',
    function ($scope,
              $state,
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
      $scope.cleargearPlan = {
        clearRepeatVal:"每周(一,二,三,四,五,六,天)",
        dataTime:"18:00",
        hourUnit:"时",
        minuteUnit:"分"
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
      }
      //data select
      //hour data
      $scope.listleft = [];
      $scope.listright = [];
      $scope.recicleObj = {};
      $scope.cleardataTime={
        hour:"",
        minute:""
      }
      for(var i=1;i<=24;i++){
        $scope.recicleObj = {
          name:i+$scope.cleargearPlan.hourUnit,
          flag:false,
        };
        $scope.listleft.push($scope.recicleObj)
      };
      //minute data
      for(var i=0;i<=6;i++){
        $scope.recicleObj = {
          name:i*10+$scope.cleargearPlan.minuteUnit,
          flag:false,
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
        $scope.listleft[index].flag = true;
        $scope.cleardataTime.hour = $scope.listleft[index].name;
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
        $scope.listright[index].flag = true;
        $scope.cleardataTime.minute = $scope.listright[index].name;
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
          ele[0].style.top = 68 + '%'
        }, 10)
      };
      $scope.$on('$destroy', function() {
        $scope.setmodal.remove();
      });
      $scope.setchoose = function () {
        $scope.cleargearPlan.dataTime = filterTimeMinute($scope.cleardataTime.hour,"hour")+":"+ filterTimeMinute($scope.cleardataTime.minute,"minute")
        $scope.setmodal.hide();
      };

      //repeat data
      $scope.listleftRepeat = [{
        name:"每周一",
        nameid:"一",
        reflag:true,
        dotflag:true
      },{
        name:"每周二",
        nameid:"二",
        reflag:true,
        dotflag:true
      },{
        name:"每周三",
        nameid:"三",
        reflag:true,
        dotflag:true
      },{
        name:"每周四",
        nameid:"四",
        reflag:true,
        dotflag:true
      },{
        name:"每周五",
        nameid:"五",
        reflag:true,
        dotflag:true
      },{
        name:"每周六",
        nameid:"六",
        reflag:true,
        dotflag:true
      },{
        name:"每周天",
        nameid:"天",
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
          ele[0].style.top = 40 + '%';
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
            $scope.itemSelected.push(item.nameid);
          }
        });
        if($scope.itemSelected.length===0){
          $scope.cleargearPlan.clearRepeatVal = "无设置重复"
        }else{
          $scope.cleargearPlan.clearRepeatVal ="每周("+$scope.itemSelected.join(",")+")"
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
