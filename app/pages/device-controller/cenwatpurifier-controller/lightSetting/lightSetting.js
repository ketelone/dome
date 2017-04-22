angular.module('toiletControlModule')
  .controller('lightSettingCtrl', [
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
      //init valiable
      $scope.lightSetting={
        gaiganyin:"",
        gaiganyinDistance:"",
        isShowCheckimg:true,
        isShowWeekset:true,
        isShowStatuset:true
      };
      //init check value
      $scope.lighttoiletlampmode = true;
      $scope.lightnightmode = false;

      //week light color
      $scope.colorWeek = [{
        des:"lightSetting.zhoutian",
        color:{
          "background-color":"red",
          "margin-right":"12%"
        },
        selectColo:[{
          id:2,
          des:'red'
        },{
          id:3,
          des:'blue'
        },{
          id:4,
          des:'green'
        },{
          id:5,
          des:'black'
        },{
          id:5,
          des:'white'
        }]
      },{
        des:"lightSetting.zhouyi",
        color:{
          "background-color":"Pantone7456",
          "margin-right":"12%"
        },
        selectColo:[{
          id:2,
          des:'red'
        },{
          id:3,
          des:'blue'
        },{
          id:4,
          des:'green'
        },{
          id:5,
          des:'black'
        },{
          id:5,
          des:'white'
        }]
      },{
        des:"lightSetting.zhouer",
        color:{
          "background-color":"Pantone7507",
          "margin-right":"12%"
        },
        selectColo:[{
          id:2,
          des:'red'
        },{
          id:3,
          des:'blue'
        },{
          id:4,
          des:'green'
        },{
          id:5,
          des:'black'
        },{
          id:5,
          des:'white'
        }]
      },{
        des:"lightSetting.zhousan",
        color:{
          "background-color":"Pantone7507",
        },
        selectColo:[{
          id:2,
          des:'red'
        },{
          id:3,
          des:'blue'
        },{
          id:4,
          des:'green'
        },{
          id:5,
          des:'black'
        },{
          id:5,
          des:'white'
        }]
      },{
        des:"lightSetting.zhousi",
        color:{
          "background-color":"Pantone7507",
          "margin-right":"12%",
          "margin-bottom":"0.5rem"
        },
        selectColo:[{
          id:2,
          des:'red'
        },{
          id:3,
          des:'blue'
        },{
          id:4,
          des:'green'
        },{
          id:5,
          des:'black'
        },{
          id:5,
          des:'white'
        }]
      },{
        des:"lightSetting.zhouwu",
        color:{
          "background-color":"Pantone7507",
          "margin-right":"12%",
          "margin-bottom":"0.5rem"
        },
        selectColo:[{
          id:2,
          des:'red'
        },{
          id:3,
          des:'blue'
        },{
          id:4,
          des:'green'
        },{
          id:5,
          des:'black'
        },{
          id:5,
          des:'white'
        }]
      },{
        des:"lightSetting.zhouliu",
        color:{
          "background-color":"Pantone7507",
          "margin-right":"12%",
          "margin-bottom":"0.5rem"
        },
        selectColo:[{
          id:2,
          des:'red'
        },{
          id:3,
          des:'blue'
        },{
          id:4,
          des:'green'
        },{
          id:5,
          des:'black'
        },{
          id:5,
          des:'white'
        }]
      }];
      //gobakc
      $scope.goBack = function () {
        publicMethod.goBack();
      };
      /**
       *@disc:checkbox selected
       */
      $scope.checkboxChange = function (type) {
        if(type === "color"){
          $scope.lightSetting.isShowCheckimg = !$scope.lightSetting.isShowCheckimg;
          $scope.lightSetting.isShowWeekset = false;
          $scope.lightSetting.isShowStatuset = false;
        }else if(type==="week"){
          $scope.lightSetting.isShowWeekset = !$scope.lightSetting.isShowWeekset;
          $scope.lightSetting.isShowCheckimg = false;
          $scope.lightSetting.isShowStatuset = false;
        }else if(type==="change"){
          $scope.lightSetting.isShowStatuset = !$scope.lightSetting.isShowStatuset;
          $scope.lightSetting.isShowCheckimg = false;
          $scope.lightSetting.isShowWeekset = false;
        };
      };
      //get scren height
      $scope.screenHeig = window.innerHeight;
      $ionicModal.fromTemplateUrl('build/pages/model/hmsModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });
      $scope.value = [];
      $scope.selecedtIndex;
      $scope.openModal = function (index) {
        $scope.selecedtIndex = index;
        $scope.value = $scope.colorWeek[index].selectColo;
        $scope.modal.show();
        setTimeout(function () {
          var ele = document.getElementsByClassName("hmsModal");
          if ($scope.value.length === 3) {
            ele[0].style.top = $scope.screenHeig - 156 + 'px';
          } else if ($scope.value.length === 4) {
            ele[0].style.top = $scope.screenHeig - 208 + 'px';
          } else if ($scope.value.length === 2) {
            ele[0].style.top = $scope.screenHeig - 104 + 'px';
          } else if ($scope.value.length === 1) {
            ele[0].style.top = $scope.screenHeig - 52 + 'px';
          } else if ($scope.value.length > 4) {
            ele[0].style.top= 68 + '%';
            ele[0].style.minHeight = 32 + '%';
          };
        }, 10)
      };
      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });
      $scope.choose = function (val) {
        $scope.colorWeek[$scope.selecedtIndex].color['background-color'] = val.des;
        $scope.modal.hide();
      };

    }]);
