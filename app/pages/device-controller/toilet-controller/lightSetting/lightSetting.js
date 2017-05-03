angular.module('toiletControlModule')
  .controller('lightSettingCtrl', [
    '$scope',
    '$state',
    '$translate',
    '$timeout',
    'publicMethod',
    '$ionicModal',
    'baseConfig',
    'checkVersionService',
    'hmsPopup',
    function ($scope,
              $state,
              $translate,
              $timeout,
              publicMethod,
              $ionicModal,
              baseConfig,
              checkVersionService,
              hmsPopup
    ) {
      var lighttersetcmdObj = {
        diviceid:'8BE850C2',
        header:'8877',
        idx:1,
        ctrId:'00',
        devId:'01'
      };
      var lightsetting = new NIMI();
      //init valiable
      $scope.lightSetting={
        // gaiganyin:"",
        // gaiganyinDistance:"",
        isShowCheckimg:true,
        isShowWeekset:false,
        isShowStatuset:false
      };
      //init check value
      // $scope.lighttoiletlampmode = true;
      $scope.lightnightmode = false;
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
        //localstorage setting value
        var lightsetval = {
          modal:"",
        }
        if($scope.lightSetting.isShowCheckimg){
          lightsetval.modal = "default";
        }else if($scope.lightSetting.isShowWeekset){
          lightsetval.modal = "default";
        }else if($scope.lightSetting.isShowStatuset){
          lightsetval.modal = "default";
        };
        window.localStorage.lightModal = JSON.stringify(lightsetval);
        console.log(JSON.parse(window.localStorage.lightModal))
        publicMethod.goBack();
      };
      /**
       *@params:cmdvalue(value) type(chu fa type) name(current chu fa name)
       *@disc:send Instruction;
       */
      $scope.sendCmd = function (cmdvalue,name) {
        hmsPopup.showLoading("<span translate='lightSetting.loadingdata'></span>");
        cordova.plugins.SocketPlugin.tcpSendCmd({
          "timeout": "5000",
          paramter :cmdService.cloudCmd(cmdvalue,$scope.handlenapeListNape[index].cloudId)
        }, success, error);
        function success(response) {
          hmsPopup.hideLoading();
          if(response.code == 200){
            if(value.ack.toLowerCase() == "fa27"){
              $scope.Toast.show(name+$translate.instant("lightSetting.directesuccess"));
              $scope.lightnightmode = !$scope.lightnightmode;
            }
          }else{
            $scope.Toast.show(name+$translate.instant("lightSetting.directerror"));
          }
        };
        function error() {
          hmsPopup.hideLoading();
          $scope.Toast.show(name + $translate.instant("lightSetting.loadingdataerrror"));
        };
      };
      /**
       *@params:cmdvalue(value) type(chu fa type) name(current chu fa name)
       *@disc:send clound Instruction;
       */
      $scope.toilSetGetImpleteData = function(cmdvalue, name){
        //cloud
        hmsPopup.showLoading("<span translate='lightSetting.loadingdata'></span>");
        $timeout(function () {
          hmsPopup.hideLoading();
          $scope.Toast.show("发生指令成功");
        },1000)
        // hmsPopup.showLoading("<span translate='lightSetting.loadingdata'></span>");
        // var url = baseConfig.basePath + "/r/api/message/sendMessage";
        // var paramter = cmdService.cloudCmd(cmdvalue,$scope.handlenapeListNape[index].cloudId);
        // hmsHttp.post(url, paramter).success(
        //   function(response){
        //     hmsPopup.hideLoading();
        //     //resolve
        //     if(response.code == 200){
        //       if(value.ack.toLowerCase() == "fa27"){
        //         $scope.Toast.show(name+$translate.instant("lightSetting.directesuccess"));
        //         $scope.lightnightmode = !$scope.lightnightmode;
        //       }
        //     }else{
        //       $scope.Toast.show(name+$translate.instant("lightSetting.directerror"));
        //     }
        //   }).
        // error(function () {
        //   hmsPopup.hideLoading();
        //   $scope.Toast.show(name + $translate.instant("lightSetting.loadingdataerrror"));
        // })
      };
      /**
       *@disc:night light set
       */
      $scope.lightchangeSet = function () {
        if(!$scope.lightnightmode){
          var cmdvalue = getCmd(lighttersetcmdObj.header,lighttersetcmdObj.idx,lightsetting.setting("OFF", "ON", "OFF", "OFF", "OFF", "OFF", "OFF", "OFF", "OFF"),lighttersetcmdObj.ctrId,lighttersetcmdObj.devId);
          //send instructin
          console.log(cmdvalue)
          if(baseConfig.isCloudCtrl){
            $scope.toilSetGetImpleteData(cmdvalue,$translate.instant("lightSetting.lightmode"));
          }else{
            // $scope.sendCmd(cmdvalue,$translate.instant("lightSetting.lightmode"));
          };
        }else{
          var cmdvalue = getCmd(lighttersetcmdObj.header,lighttersetcmdObj.idx,lightsetting.setting("OFF", "OFF", "OFF", "OFF", "OFF", "OFF", "OFF", "OFF", "OFF"),lighttersetcmdObj.ctrId,lighttersetcmdObj.devId);
          //send instructin
          console.log(cmdvalue)
          if(baseConfig.isCloudCtrl){
            $scope.toilSetGetImpleteData(cmdvalue,$translate.instant("lightSetting.lightmode"));
          }else{
            // $scope.sendCmd(cmdvalue,$translate.instant("lightSetting.lightmode"));
          };
        }
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
