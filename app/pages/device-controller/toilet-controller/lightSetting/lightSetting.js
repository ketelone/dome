angular.module('toiletControlModule')
  .controller('lightSettingCtrl', [
    '$scope',
    '$state',
    '$translate',
    '$timeout',
    '$ionicPlatform',
    '$ionicHistory',
    'publicMethod',
    '$ionicModal',
    'baseConfig',
    'checkVersionService',
    'hmsPopup',
    'cmdService',
    'SettingsService',
    'hmsHttp',
    function ($scope,
              $state,
              $translate,
              $timeout,
              $ionicPlatform,
              $ionicHistory,
              publicMethod,
              $ionicModal,
              baseConfig,
              checkVersionService,
              hmsPopup,
              cmdService,
              SettingsService,
              hmsHttp
    ) {
      var getDeviceIlightset = function(){
        if(localStorage.deviceInfo == undefined){
          return;
        };
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
      var lighttersetcmdObj = {
        boxid:localStorage.boxIp,
        diviceid:getDeviceIlightset(),
        header:'8877',
        idx:1,
        ctrId:'E3',
        devId:'01'
      };
      var lightsetting = new NIMI();
      //init valiable
      $scope.lightSetting={
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
      /**
       *@params:value(current selected color)
       *@disc:get color;
       */
      $scope.getColor = function (value) {
        if(value === "#563233"){
          return "Pantone4985";
        }else if(value === "#6378B4"){
          return "Pantone7456";
        }else if(value === "#F0D19F"){
          return "Pantone7507";
        }else if(value === "#C39170"){
          return "Pantone7515";
        }else if(value === "#EA695B"){
          return "Pantone7416";
        }else if(value === "#C1AE49"){
          return "Pantone618";
        }else if(value === "#70A18E"){
          return "Pantone556";
        }else if(value === "#FEFCFD"){
          return "White";
        }
      }
      /**
       *@params:
       *@disc:accept ack or status;
       */
      var receiveTcpDatalightset =  function (result) {
        var resultOn = result[0];
        if(resultOn.from.uid === lighttersetcmdObj.diviceid){
          if (resultOn.data.cmd) {
            var backDataCmd = lightsetting.analysisInstruction(resultOn.data.cmd[0]);
            if(backDataCmd.flag === "ack"){
              if(backDataCmd.cmd === "0a") {
                // alert("backDataCmdlightset"+angular.toJson(backDataCmd))
                var name = "lightSetting.settingsucc";
                if(backDataCmd.ack === "1000"){
                  $scope.lightnightmode = !$scope.lightnightmode;
                  $scope.Toast.show($translate.instant(name)+$translate.instant("golabelvariable.directesuccess"));
                }else{
                  $scope.Toast.show($translate.instant(name)+$translate.instant("golabelvariable.directerror"));
                };
              };
            };
            $scope.$apply();
          };
        };
      };
      document.addEventListener('SocketPlugin.receiveTcpData',receiveTcpDatalightset, false);
      /**
       *@params:cmdvalue(value) type(chu fa type) name(current chu fa name)
       *@disc:send clound Instruction;
       */
      $scope.toilSetGetImpleteData = function(cmdvalue, name){
        //cloud
        hmsPopup.showLoading("<span translate='golabelvariable.loadingdata'></span>");
        $timeout(function () {
          hmsPopup.hideLoading();
          $scope.Toast.show("发生指令成功");
          $scope.lightnightmode = !$scope.lightnightmode;
        },1000);
      };
      /**
       *@disc:night light set
       */
      $scope.lightchangeSet = function () {
        if(!$scope.lightnightmode){
          var cmdvalue = cmdService.getCmd(lighttersetcmdObj.header,lighttersetcmdObj.idx,lightsetting.setting("OFF", "ON", "OFF", "OFF", "OFF", "OFF", "OFF", "OFF", "OFF"),lighttersetcmdObj.ctrId,lighttersetcmdObj.devId);
          //send instructin
          if(baseConfig.isCloudCtrl){
            $scope.toilSetGetImpleteData(cmdvalue,$translate.instant("lightSetting.lightmode"));
          }else{
            // $scope.sendCmd(cmdvalue,$translate.instant("lightSetting.lightmode"));
            cmdService.sendCmd(lighttersetcmdObj.diviceid, cmdvalue, lighttersetcmdObj.boxid);
          };
        }else{
          var cmdvalue = cmdService.getCmd(lighttersetcmdObj.header,lighttersetcmdObj.idx,lightsetting.setting("OFF", "OFF", "OFF", "OFF", "OFF", "OFF", "OFF", "OFF", "OFF"),lighttersetcmdObj.ctrId,lighttersetcmdObj.devId);
          //send instructin
          if(baseConfig.isCloudCtrl){
            $scope.toilSetGetImpleteData(cmdvalue,$translate.instant("lightSetting.lightmode"));
          }else{
            // $scope.sendCmd(cmdvalue,$translate.instant("lightSetting.lightmode"));
            cmdService.sendCmd(lighttersetcmdObj.diviceid, cmdvalue, lighttersetcmdObj.boxid);
          };
        }
      };
      /**
       *@disc:checkbox selected
       */

      $scope.localBaocunVlaue = function () {
        var lightsetval = {
          modal:"",
          MOMC:"White",
          TUEC:"White",
          WEDC:"White",
          THUC:"White",
          FRIC:"White",
          SATC:"White",
          SUMC:"White"
        };
        if($scope.lightSetting.isShowCheckimg){
          lightsetval.modal = "Default";
          lightsetval.flag = true;
        }else if($scope.lightSetting.isShowWeekset){
          lightsetval.modal = "ByWeek";
          lightsetval.MOMC = $scope.getColor($scope.colorWeek[1].color["background-color"]);
          lightsetval.TUEC = $scope.getColor($scope.colorWeek[2].color["background-color"]);
          lightsetval.WEDC = $scope.getColor($scope.colorWeek[3].color["background-color"]);
          lightsetval.THUC = $scope.getColor($scope.colorWeek[4].color["background-color"]);
          lightsetval.FRIC = $scope.getColor($scope.colorWeek[5].color["background-color"]);
          lightsetval.SATC = $scope.getColor($scope.colorWeek[6].color["background-color"]);
          lightsetval.SUMC = $scope.getColor($scope.colorWeek[0].color["background-color"]);
          lightsetval.flag = true;
        }else if($scope.lightSetting.isShowStatuset){
          lightsetval.modal = "Default";
          lightsetval.flag = false;
        };
        window.localStorage.lightModal = null;
        window.localStorage.lightModal = JSON.stringify(lightsetval);
      };
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
      //gobakc
      $scope.goBack = function () {
        $scope.localBaocunVlaue();
        // console.log(JSON.parse(window.localStorage.lightModal).MOMC)
        document.removeEventListener("SocketPlugin.receiveTcpData", receiveTcpDatalightset, false);
        publicMethod.goBack();
      };
      $ionicPlatform.registerBackButtonAction(function (e) {
        $scope.localBaocunVlaue();
        document.removeEventListener("SocketPlugin.receiveTcpData", receiveTcpDatalightset, false);
        $ionicHistory.goBack();
        e.preventDefault();
        return false;
      }, 101);
      //get scren height
      $scope.screenHeig = window.innerHeight;
      $ionicModal.fromTemplateUrl('build/pages/model/lightModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });
      $scope.value = [
        {"background-color":'#563233'},
        {"background-color":'#6378B4'},
        {"background-color":'#F0D19F'},
        {"background-color":'#C39170'},
        {"background-color":'#EA695B'},
        {"background-color":'#C1AE49'},
        {"background-color":'#70A18E'},
        {"background-color":'#FEFCFD'}
      ];
      $scope.indexSelected;
      $scope.openModal = function (index) {
        $scope.indexSelected = index;
        $scope.modal.show();
      };
      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });
      $scope.choose = function (val) {
        $scope.colorWeek[$scope.indexSelected].color['background-color'] = val['background-color'];
        $scope.modal.hide();
      };

    }]);
