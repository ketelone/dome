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

      $scope.value = [{"background-color":'#563233'},{"background-color":'#6378B4'},{"background-color":'#F0D19F'},{"background-color":'#C39170'},{"background-color":'#EA695B'},
        {"background-color":'#C1AE49'},{"background-color":'#70A18E'},{"background-color":'#FEFCFD'}];
      //week light color
      $scope.colorWeek = [{
        des:"lightSetting.zhoutian",
        color:{
          "background-color":"#563233",
          "margin-right":"12%"
        }
      },{
        des:"lightSetting.zhouyi",
        color: {
          "background-color":"#6378B4",
          "margin-right": "12%"
        }
      },{
        des:"lightSetting.zhouer",
        color:{
          "background-color":"#F0D19F",
          "margin-right":"12%"
        }
      },{
        des:"lightSetting.zhousan",
        color:{
          "background-color":"#C39170",
        },
      },{
        des:"lightSetting.zhousi",
        color:{
          "background-color":"#EA695B",
          "margin-right":"12%",
          "margin-bottom":"0.5rem"
        }
      },{
        des:"lightSetting.zhouwu",
        color:{
          "background-color":"#C1AE49",
          "margin-right":"12%",
          "margin-bottom":"0.5rem"
        }
      },{
        des:"lightSetting.zhouliu",
        color:{
          "background-color":"#70A18E",
          "margin-right":"12%",
          "margin-bottom":"0.5rem"
        }
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
      $ionicModal.fromTemplateUrl('build/pages/model/lightModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });
      $scope.value = [{"background-color":'#563233'},{"background-color":'#6378B4'},{"background-color":'#F0D19F'},{"background-color":'#C39170'},{"background-color":'#EA695B'},
        {"background-color":'#C1AE49'},{"background-color":'#70A18E'},{"background-color":'#FEFCFD'}];
      $scope.indexSelected;
      $scope.openModal = function (index) {
        $scope.indexSelected = index;
        $scope.modal.show();
        setTimeout(function () {
          var ele = document.getElementsByClassName("lightModal");
          ele[0].style.top= 70 + '%';
          ele[0].style.minHight= 30 + '%';
        }, 10)
      };
      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });
      $scope.choose = function (val) {
        $scope.colorWeek[$scope.indexSelected].color['background-color'] = val['background-color'];
        $scope.modal.hide();
      };

    }]);
