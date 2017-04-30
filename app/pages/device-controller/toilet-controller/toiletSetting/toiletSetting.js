angular.module('toiletControlModule')
  .controller('toiletSettingCtrl', [
    '$scope',
    '$state',
    'publicMethod',
    '$ionicModal',
    '$compile',
    'baseConfig',
    'checkVersionService',
    'hmsPopup',
    function ($scope,
              $state,
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
      $scope.chongshuisetval = false,
      $scope.chuchousetval = false,
      $scope.anjianvoicesetval = true,
      $scope.welcomemsetval = false
      $scope.toilteSettingData={
        gaiganyin:"toiletSetting.ganyinggai",
        gaiganyinDistance:"toiletSetting.gaiquangy1",
        //jiedian setting
        jieDianSeting:"toiletSetting.never",
        jiedianDanwei:""
      };
      $scope.listleft = [{
        name:"toiletSetting.close",
        flag:false,
        towdata:[{
          name: "toiletSetting.none",
          flag:false
        }]
      },{
        name:"toiletSetting.ganyinggai",
        flag:false,
        towdata:[{
          name: "toiletSetting.nearinstance",
          flag:false
        },{
          name: "toiletSetting.centerinstance",
          flag:false
        },{
          name: "toiletSetting.farinstance",
          flag:false
        }]
      },{
        name:"toiletSetting.gaiquangy",
        flag:false,
        towdata:[{
          name: "toiletSetting.gaiquangy1",
          flag:false
        },{
          name: "toiletSetting.gaiquangy2",
          flag:false
        },{
          name: "toiletSetting.gaiquangy3",
          flag:false
        }]
      }];
      $scope.gaiganyinTemp = "";
      $scope.gaiganyinDistanceTemp = "";

      $scope.listright=$scope.listleft[0].towdata;
      $scope.silderSeleced = function (index) {
        $scope.listleft[index].flag = !$scope.listleft[index].flag;
        if($scope.listleft[index].flag){
          $scope.gaiganyinTemp = $scope.listleft[index].name;
          $scope.listright = $scope.listleft[index].towdata;
        }else{
          $scope.gaiganyinTemp = "";
          $scope.listright = [];
        };
        for(var i=0;i<$scope.listleft.length;i++){
          if(index !== i){
            $scope.listleft[i].flag = false;
          }
        }
      };
      $scope.silderRightSeleced = function (index) {
        $scope.listright[index].flag = !$scope.listright[index].flag;
        if($scope.listright[index].flag){
          $scope.gaiganyinDistanceTemp = $scope.listright[index].name;
        }else{
          $scope.gaiganyinDistanceTemp = "";
        };
        for(var i=0;i<$scope.listright.length;i++){
          if(index !== i){
            $scope.listright[i].flag = false;
          }
        }
      };
      //auto cover setting
      $scope.fontSize = document.documentElement.clientWidth / 7.5;
      $scope.setModalTop = "toiletSetModalTop";
      $scope.setSingalModalTop = "toiletSetSingalModalTop";
      $scope.screenHeig = window.innerHeight;
      $ionicModal.fromTemplateUrl('build/pages/model/hmsModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });
      //自动翻盖设置
      $ionicModal.fromTemplateUrl('build/pages/model/hmsiot-setSelect.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.setmodal = modal;
      });
      $scope.setopenModal = function () {
        $scope.listright=$scope.listleft[1].towdata;
        $scope.setmodal.show();
        setTimeout(function () {
          var ele = document.getElementsByClassName("toiletSetModalTop");
          ele[0].style.top = 68 + '%';
        },10)
      };
      $scope.$on('$destroy', function() {
        $scope.setmodal.remove();
      });
      $scope.setchoose = function () {
        $scope.setmodal.hide();
        if($scope.gaiganyinTemp && $scope.gaiganyinDistanceTemp){
          $scope.toilteSettingData.gaiganyin=$scope.gaiganyinTemp;
          $scope.toilteSettingData.gaiganyinDistance=$scope.gaiganyinDistanceTemp;
        }else{
          hmsPopup.showShortCenterToast("请选择数据项!");
        };
      };
      $scope.value = [{id:2,des:'toiletSetting.never','danwei':""},
        {id:3,des:'4','danwei':"toiletSetting.danwei"},{id:4,des:'8',danwei:"toiletSetting.danwei"},{id:5,des:'12',danwei:"toiletSetting.danwei"},{id:5,des:'toiletSetting.interngent','danwei':""}
      ];
      $scope.openModal = function () {
        if($scope.value.length!==0) {
          $scope.modal.show();
          setTimeout(function () {
            var ele = document.getElementsByClassName("toiletSetSingalModalTop");
            ele[0].style.top = $scope.screenHeig - 1*$scope.fontSize*$scope.value.length + 'px';
            ele[0].style.minHeight = 1*$scope.fontSize*$scope.value.length + 'px';
          }, 10)
        }
      };
      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });
      $scope.choose = function (val) {
        $scope.modal.hide();
        $scope.toilteSettingData.jieDianSeting=val.des;
        $scope.toilteSettingData.jiedianDanwei = val.danwei;
      };

      //确定是否清除设备设置
      $scope.isCheckDeviceInfoSet = function () {
        hmsPopup.confirmNoTitle("确定要恢复默认设置吗?</br>恢复默认设置后当前设置会被清空",function () {
          console.log("你点击了确定")
        });
      };
      //进入各个设置的具体界面
      $scope.goSettingInfo = function (url) {
        $state.go(url);
      }
    }]);
