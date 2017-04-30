angular.module('toiletControlModule')
  .controller('cenwatpurSettingCtrl', [
    '$scope',
    '$state',
    '$translate',
    'publicMethod',
    '$ionicModal',
    '$compile',
    'baseConfig',
    'checkVersionService',
    'hmsPopup',
    function ($scope,
              $state,
              $translate,
              publicMethod,
              $ionicModal,
              $compile,
              baseConfig,
              checkVersionService,
              hmsPopup
    ) {
      $scope.goBack = function () {
        publicMethod.goBack();
      }
      $scope.cenwatpurSettingData={
        clearMode:"cenwatpurifier.mix",
        timeData:"02:00",
      };
      // console.log($translate.instant($scope.cenwatpurSettingData.clearMode))
      //get scrren hight
      //clear mode
      $scope.fontSize = document.documentElement.clientWidth / 7.5;
      $scope.setSingalModalTop = "cenwatpurSetSingalModalTop";
      $scope.screenHeig = window.innerHeight;
      $ionicModal.fromTemplateUrl('build/pages/model/hmsModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });
      $scope.value = [{id:2,des:"cenwatpurifier.timedelay"},
        {id:3,des:'cenwatpurifier.flowinstance'},{id:4,des:'cenwatpurifier.flowelay'},{id:5,des:'cenwatpurifier.mix'}];
      $scope.openModal = function () {
        if($scope.value.length!==0) {
          $scope.modal.show();
          setTimeout(function () {
            var ele = document.getElementsByClassName("cenwatpurSetSingalModalTop");
            ele[0].style.top = $scope.screenHeig - 52*$scope.value.length + 'px';
            ele[0].style.minHeight = 52*$scope.value.length + 'px';
          }, 10)
        }
      };
      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });
      $scope.choose = function (val) {
        $scope.modal.hide();
        $scope.cenwatpurSettingData.clearMode = val.des;
      };
      //data select
      //hour data
      $scope.listleft = [];
      $scope.listright = [];
      $scope.recicleObj = {};
      $scope.cleardataTime={
        hour:"",
        minute:""
      }
      for(var i=0;i<=23;i++){
        $scope.recicleObj = {
          name:i,
          flag:false,
          danwei:"cenwatpurifier.hour",
        };
        $scope.listleft.push($scope.recicleObj)
      };
      //minute data
      for(var i=0;i<=59;i++){
        $scope.recicleObj = {
          name:i,
          flag:false,
          danwei:"cenwatpurifier.minute",
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
          $scope.cleardataTime.hour = $scope.listleft[index].name+"时";
        }else{
          $scope.cleardataTime.hour = "";
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
          $scope.cleardataTime.minute = $scope.listright[index].name+"分";
        }else{
          $scope.cleardataTime.minute = "";
        }
        for(var i=0;i<$scope.listright.length;i++){
          if(index !== i){
            $scope.listright[i].flag = false;
          }
        }
      };
      $scope.setModalTop = "cenwatpurSetModalTop";
      $ionicModal.fromTemplateUrl('build/pages/model/hmsiot-setSelect.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.setmodal = modal;
      });
      $scope.setopenModal = function () {
        $scope.setmodal.show();
        setTimeout(function () {
          var ele = document.getElementsByClassName("cenwatpurSetModalTop");
          ele[0].style.top = 68 + '%';
        }, 10)
      };
      $scope.$on('$destroy', function() {
        $scope.setmodal.remove();
      });
      $scope.setchoose = function () {
        if($scope.cleardataTime.hour && $scope.cleardataTime.minute){
          if($scope.cleardataTime.hour.length===2){
            $scope.cleardataTime.hour = "0"+$scope.cleardataTime.hour;
          }
          if($scope.cleardataTime.minute.length===2){
            $scope.cleardataTime.minute = "0"+$scope.cleardataTime.minute;
          }
          $scope.cenwatpurSettingData.timeData = filterTimeMinute($scope.cleardataTime.hour,"hour")+":"+ filterTimeMinute($scope.cleardataTime.minute,"minute")
          $scope.setmodal.hide();
        }else{
          $scope.setmodal.hide();
          hmsPopup.showShortCenterToast("请选择数据项!");
        }
      };

      //确定是否清除设备设置
      $scope.isCheckDeviceInfoSet = function () {
        hmsPopup.confirmNoTitle("确定要恢复默认设置吗?</br>恢复默认设置后当前设置会被清空",function () {
          console.log("你点击了确定")
        });
      };
    }]);
