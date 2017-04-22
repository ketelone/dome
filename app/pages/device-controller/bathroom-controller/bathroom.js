/**
 *@autor: caolei
 */
angular.module('bathroomModule')
  .controller('bathroomCtrl',[
    '$scope',
    '$state',
    '$interval',
    '$window',
    '$ionicModal',
    '$ionicHistory',
    'hmsPopup',
    '$stateParams',
    'bathroomService',
    'bathroomCmdService',
    function($scope, $state, $interval, $window, $ionicModal, $ionicHistory, hmsPopup, $stateParams, bathroomService, bathroomCmdService){

      $scope.bathroomData = [
        {
          id: "1",
          switchPictureUrl: "build/img/bathroom/hot_wind_nor.png",
          isOpen: false,
          isCommon: true,
          isSetting: false,
          isBreathSwitch: false,
          isOpenTimer: false,
          setTime: "",
          switchType: "Hot",
          desc: "bathroom.hot"
        },
        {
          id: "2",
          switchPictureUrl: "build/img/bathroom/cool_wind_nor.png",
          isOpen: false,
          isCommon: true,
          isSetting: false,
          isBreathSwitch: false,
          isOpenTimer: false,
          setTime: "",
          switchType: "Cool",
          desc: "bathroom.cool"
        },
        {
          id: "3",
          switchPictureUrl: "build/img/bathroom/cool_nor.png",
          isOpen: false,
          isCommon: true,
          isSetting: false,
          isBreathSwitch: false,
          isOpenTimer: false,
          setTime: "",
          switchType: "Dryer",
          desc: "bathroom.dryer"
        },
        {
          id: "4",
          switchPictureUrl: "build/img/bathroom/hot_drying_nor.png",
          isOpen: false,
          isCommon: true,
          isSetting: false,
          isBreathSwitch: false,
          isOpenTimer: false,
          setTime: "",
          switchType: "Hot drying",
          desc: "bathroom.hotDrying"
        },
        {
          id: "5",
          switchPictureUrl: "build/img/bathroom/breath_nor.png",
          isOpen: false,
          isCommon: false,
          isSetting: false,
          isBreathSwitch: true,
          isOpenTimer: false,
          setTime: "",
          switchType: "Breath",
          desc: "bathroom.breath"
        },
        {
          id: "6",
          switchPictureUrl: "build/img/bathroom/hot.png",
          isOpen: false,
          isCommon: true,
          isSetting: false,
          isBreathSwitch: false,
          isOpenTimer: false,
          setTime: "",
          switchType: "Purify",
          desc: "空气净化"
        },
        {
          id: "7",
          switchPictureUrl: "build/img/bathroom/hot.png",
          isOpen: false,
          isCommon: true,
          isSetting: false,
          isBreathSwitch: false,
          isOpenTimer: false,
          setTime: "",
          switchType: "Light",
          desc: "bathroom.light"
        },
        {
          id: "8",
          switchPictureUrl: "build/img/bathroom/stop_nor.png",
          isOpen: false,
          isCommon: true,
          isSetting: false,
          isBreathSwitch: false,
          isOpenTimer: false,
          setTime: "",
          switchType: "Wind direction",
          desc: "bathroom.windDirection"
        },
        {
          id: "9",
          switchPictureUrl: "build/img/bathroom/stop_nor.png",
          isOpen: false,
          isCommon: true,
          isSetting: false,
          isBreathSwitch: false,
          isOpenTimer: false,
          setTime: "",
          switchType: "CloseAll",
          desc: "bathroom.closeAll"
        },
        {
          id: "9",
          switchPictureUrl: "build/img/bathroom/hot.png",
          isOpen: false,
          isCommon: false,
          isSetting: true,
          isBreathSwitch: false,
          isOpenTimer: false,
          setTime: "",
          switchType: "Setting",
          desc: "bathroom.setting"
        }

      ];
      $scope.isBreath = false;
      $scope.isWindShow = false;
      $scope.count = 1;
      $scope.isCountDown = false;
      $scope.countDown = 0;
      $scope.temperate = '20℃';
      $scope.tempPercent = '80%';
      $scope.isBox = true;
      $scope.isBig = false;
      $scope.isWind = false;
      $scope.isTime = false;
      $scope.isTouchSwitch = false;
      $scope.bathroomItem = {};
      var canvas=document.getElementById("canvas");
      $scope.setHour = "";
      $scope.setMinu = "";
      $scope.windType = {'type': "bathroom.rock"};

      $scope.goBack = function(){
        closebox();
        $ionicHistory.goBack();
      };

      /**
       *@autor: caolei
       *@disc: close box link
       */
      var closebox = function () {
        cordova.plugins.SocketPlugin.tcpClose ({
          "ip": localStorage.boxIp
        },success,error);
        function success(response) {
          hmsPopup.showShortCenterToast("断开box成功");
        }

        function error() {
          hmsPopup.showShortCenterToast("断开box");
        }
      };

      var sendCmd = function(deviceId, value, successMsg, errorMsg){
        var cmd = bathroomService.getCmd(value, deviceId);
        cordova.plugins.SocketPlugin.tcpSendCmd({
          "timeout": "5000",
          "value": cmd,
          "ip": localStorage.boxIp
        }, success, error);
        function success(response) {
          hmsPopup.showShortCenterToast(successMsg);
        }

        function error() {
          hmsPopup.showShortCenterToast(errorMsg);
        }
      };

      var getCurrentTemplate = function(){
        sendCmd(deviceId,"887706010005721563","获取温度","获取温度失败");
      };

      var flag = false;
      document.addEventListener('SocketPlugin.receiveTcpData', function (result) {
        //hmsPopup.showShortCenterToast("开始返回数据！");
        var resultOn = result;

        if (resultOn.payload.cmd == "CMD_RETURN") {
          if ($scope.deviceOff.length == 0) {
            hmsPopup.showShortCenterToast("没有设备");
          }
          alert("resultOn.payload.value1:  "+resultOn.payload.value);
          if(resultOn.payload.value.contains("fa72")){
            flag = true;
          }
          $scope.$apply();
        }

        if(flag){
          if (resultOn.payload.cmd == "CMD_RETURN") {
            alert("resultOn.payload.value2:  "+resultOn.payload.value);
           if(resultOn.payload.value.substring(12,14) == '91'){
             resultOn.payload.value.substring(15,17);
             resultOn.payload.value.substring(17,19);
           }
            $scope.$apply();
          }
        }

      }, false);

      var openLight = function (deviceId) {
        var data = bathroomCmdService.operateLighting("ON");
        console.log("data: "+data);
        var vaule = bathroomCmdService.getCmd('8877','01', data, '00', '05');
        console.log("value: " + vaule);
        sendCmd(deviceId, vaule ,"开灯","开灯失败");
      };

      var closeLight = function (deviceId) {
        var data = bathroomCmdService.operateLighting("OFF");
        console.log("data: "+data);
        var vaule = bathroomCmdService.getCmd('8877','01', data, '00', '05');
        console.log("value: " + vaule);
        sendCmd(deviceId,vaule,"关灯","关灯失败");
      };

      var openHot = function(deviceId){
        $scope.isWind = true;
        $scope.isTime = false;
        //sendCmd(deviceId,"8877080200052101000A2D","热风","热风失败");
      };

      var closeHot = function(deviceId){
        $scope.isWind = false;
        $scope.isTime = false;
        //sendCmd(deviceId,"8877080200052100000026","热风关闭","热风关闭失败");
      };

      var openCool = function(deviceId){
        $scope.isWind = true;
        $scope.isTime = false;
        //sendCmd(deviceId,"8877080300052102000A2F","凉风","凉风失败");
      };

      var closeCool = function(deviceId){
        $scope.isWind = false;
        $scope.isTime = false;
        //sendCmd(deviceId,"8877080200052100000026","凉风关闭","凉风关闭失败");
      };

      var openDryer = function(deviceId){
        $scope.isWind = true;
        $scope.isTime = false;
        //sendCmd(deviceId,"8877080200052105000A29","冷干","冷干失 败");
      };

      var closeDryer = function(deviceId){
        $scope.isWind = false;
        $scope.isTime = false;
        //sendCmd(deviceId,"8877080200052100000026","冷干关闭","冷干关闭失败");
      };

      var openHotDrying = function(deviceId){
        $scope.isWind = true;
        $scope.isTime = false;
        //sendCmd(deviceId,"8877080200052103000A2F","热干","热干失败");
      };

      var closeHotDrying = function(deviceId){
        $scope.isWind = false;
        $scope.isTime = false;
        //sendCmd(deviceId,"8877080200052100000026","热干关闭","热干关闭失败");
      };

      //Breath
      var openBreath = function(deviceId){
        //sendCmd(deviceId,"8877080200052104000A28","换气","换气失败");
      };
      var open24HBreath = function(deviceId){
        //sendCmd(deviceId,"8877090200052104FF0A0F22","换气","换气失败");
      };

      var closeBreath = function(deviceId){
        //sendCmd(deviceId,"8877080200052100000026","换气关闭","换气关闭失败");
      };

      var openWindDirection = function (deviceId) {
        //sendCmd(deviceId,"887706020005030105","风向","风向失败");
      };

      var closeWindDirection = function (deviceId) {
        sendCmd(deviceId,"887706020005030004","风向关闭","风向关闭失败");
      };

      var closeAllFunction = function(deviceId){
        sendCmd(deviceId,"8877050200050007","一键关闭","一键关闭失败");
      };

      var openPurity = function(deviceId){
        sendCmd(deviceId,"8877080200050401000A08","打开空气净化","空气净化打开失败");
      };

      var getXOR = function(){
        var result = 2^0^5^(114^1);
        return result;
      };

      /**
       *@autor: caolei
       *@disc: to obtain the information of Yuba
       */
      $scope.$watch('', function(){
        changeRingCol('#99d5ff');
        console.log(getXOR());
        //console.log(localStorage.deviceInfo.split(";"));
        //getCurrentTemplate();
      }, true);

      /**
       *@autor: caolei
       *@return: device id
       *@disc: get device id
       */
      var getDeviceId = function(){
        var deviceList = localStorage.deviceInfo.split(";");

        for(var i = 0; i < deviceList.length; i ++){
          var deviceInfo = deviceList[i].split(",");
          if(deviceInfo[0] == $stateParams.deviceSku){
            return deviceInfo[1];
          }
        }
      };

      var startCommand = function(item){

        var deviceId = getDeviceId();

        if(item.switchType == 'CloseAll'){
          item.isOpen = false;
          closeAllFunction(deviceId);
        }

        if(item.switchType == 'Light'){

          alert($scope.count);
          if(($scope.count%3) == 1){
            item.isOpen = true;
            alert("白灯"+deviceId);
            openLight(deviceId);
          }else if(($scope.count%3) == 2){
            item.isOpen = true;
            //alert("黄灯");
            //openLight(localStorage.device_id);
            //changeRingCol('#ff6600');
          }else if(($scope.count%3) == 0){
            item.isOpen = false;
            closeLight(deviceId);
            changeRingCol('#99d5ff');
          }
          $scope.count = $scope.count + 1;

        }else{
          if(item.isOpen){
            if(checkIsOk(item)){
              alert("正常打开");
              if(item.switchType == 'Hot' || item.switchType == 'Hot drying'){
                if(item.switchType == 'Hot'){
                  item.switchPictureUrl = 'build/img/bathroom/hot_wind.png';
                  openHot(deviceId);
                }
                if(item.switchType == 'Hot drying'){
                  item.switchPictureUrl = 'build/img/bathroom/hot_drying.png';
                  openHotDrying(deviceId);
                }
                changeRingCol('#ff6600');
              }
              if(item.switchType == 'Cool'){
                item.switchPictureUrl = 'build/img/bathroom/cool_wind.png';
                openCool(deviceId);
              }
              if(item.switchType == 'Dryer'){
                item.switchPictureUrl = 'build/img/bathroom/cool.png';
                openDryer(deviceId);
              }
              if(item.switchType == 'Breath'){
                //openBreath(deviceId);
              }
              if(item.switchType == 'Wind direction'){
                $scope.isWind = true;
                $scope.isTime = false;
                //openWindDirection(deviceId);
              }
              if(item.switchType == 'Purify'){
                openPurity(deviceId);
              }

              return true;
            }else{
              if(item.switchType == 'Wind direction'){
                alert("请打开热风或者凉风或者冷干或者热干的功能");
              }else{

              }
              return false;
            }
          }else{
            if(item.switchType == 'Hot' || item.switchType == 'Cool' || item.switchType == 'Dryer' || item.switchType == 'Hot drying'){
              if(item.switchType == 'Hot'){
                item.switchPictureUrl = 'build/img/bathroom/hot_wind_nor.png';
                closeHot(deviceId);
              }
              if(item.switchType == 'Cool'){
                item.switchPictureUrl = 'build/img/bathroom/cool_wind_nor.png';
                closeCool(deviceId);
              }
              if(item.switchType == 'Dryer'){
                item.switchPictureUrl = 'build/img/bathroom/cool_nor.png';
                closeDryer(deviceId);
              }
              if(item.switchType == 'Hot drying'){
                item.switchPictureUrl = 'build/img/bathroom/hot_drying_nor.png';
                closeHotDrying(deviceId);
              }
              angular.forEach($scope.bathroomData, function(data, index, array) {
                if (data.switchType == 'Wind direction') {
                  //closeWindDirection(deviceId);
                  $scope.isWind = false;
                  $scope.isTime = true;
                  data.isOpen = false;
                }
              });
            }
            if(item.switchType == 'Breath'){
              closeBreath(deviceId);
            }
            if(item.switchType == 'Wind direction'){
              $scope.isWind = false;
              $scope.isTime = true;
              //closeWindDirection(deviceId);
            }
            if((item.switchType != 'Hot' && item.switchType != 'Hot drying') || (item.switchType == 'Hot' || item.switchType == 'Hot drying')){
              changeRingCol('#99d5ff');
            }
          }
        }
      };

      /**
       *@autor: caolei
       *@params: object device
       *@return: true or false
       *@disc: get relative device is open
       */
      $scope.getInfo = function(item){

        //$scope.isTouchSwitch = true;
        //$scope.bathroomItem = item;
        startCommand(item);

      };

      /**
       *@autor: caolei
       *@params: object device
       *@return: true or false
       *@disc: check device's function is ok
       */
      var checkIsOk = function(item){
        if(item.switchType == 'Light'){
          return true;
        }
        var flag = true;
        var deviceId = getDeviceId();
        angular.forEach($scope.bathroomData, function(data, index, array) {
          if (data.switchType != 'Light' && (data.switchType != item.switchType) && (item.switchType != 'Wind direction' && item.switchType != 'Light' && item.switchType != 'Setting' && data.isOpen)) {
            item.isOpen = true;
            data.isOpen = false;
            //flag = false;

            if(item.switchType == 'Hot'){
              item.switchPictureUrl = 'build/img/bathroom/hot_wind.png';
            }
            if(item.switchType == 'Hot drying'){
              item.switchPictureUrl = 'build/img/bathroom/hot_drying.png';
            }
            if(item.switchType == 'Cool'){
              item.switchPictureUrl = 'build/img/bathroom/cool_wind.png';
            }
            if(item.switchType == 'Dryer'){
              item.switchPictureUrl = 'build/img/bathroom/cool.png';
            }

            if(data.switchType == 'Hot'){
              data.switchPictureUrl = 'build/img/bathroom/hot_wind_nor.png';
              closeHot(deviceId);
            }
            if(data.switchType == 'Cool'){
              data.switchPictureUrl = 'build/img/bathroom/cool_wind_nor.png';
              closeCool(deviceId);
            }
            if(data.switchType == 'Dryer'){
              data.switchPictureUrl = 'build/img/bathroom/cool_nor.png';
              closeDryer(deviceId);
            }
            if(data.switchType == 'Hot drying'){
              data.switchPictureUrl = 'build/img/bathroom/hot_drying_nor.png';
              closeHotDrying(deviceId);
            }
            if(data.switchType == 'Breath'){
              closeBreath(deviceId);
            }
          }
        });

        var isWind = false;
        if(item.switchType == 'Wind direction'){
          angular.forEach($scope.bathroomData, function(data, index, array) {
            if ((data.switchType != item.switchType) && ((data.switchType == 'Hot' || data.switchType == 'Cool' || data.switchType == 'Dryer' || data.switchType == 'Hot drying') && data.isOpen)) {
              item.isOpen = true;
              isWind = true;
            }
          });
          if(!isWind){
            item.isOpen = false;
          }
          return isWind;
        }

        return flag;
      };

      $scope.getCommon = function(item){
        openBreath(getDeviceId());
      };

      $scope.getAllDay = function(item){
        open24HBreath(getDeviceId());
      };

      /**
       *@autor: caolei
       *@params: true or false
       *@disc: change the value of isBreath and isWindShow
       */
      $scope.showType = function(item){

        if(item.isOpen){
          if(checkIsOk(item)){
            $scope.isBreath = true;
            $scope.isWindShow = true;
          }else{
            alert("请关闭其它功能");
          }
        }else{
          $scope.isBreath = false;
        }
      };

      /**
       *@autor: caolei
       *@params: true or false
       *@disc: close navigation button
       */
      $scope.closeNav = function(item){
        $scope.isWindShow = false;
      };

      /**
       *@autor: caolei
       *@disc: go to barthroomSet page
       */
      $scope.getBathroomInfo = function(item){
        item.isOpen = false;
        $state.go('bathroomSet');
      };

      /**
       *@autor: caolei
       *@disc: open timer
       */
      $scope.openTimer = function(){
        //alert("in");

        var hasOpenCount = 0;
        var deviceInfo = [];

        angular.forEach($scope.bathroomData, function(data, index, array){

          if(!data.isSetting && data.isOpen){
            hasOpenCount = hasOpenCount + 1;
            deviceInfo.push(data);
          }
        });

        if(hasOpenCount){
          //alert("可以开启定时功能");
          console.log(deviceInfo);

          $scope.isWind = false;
          $scope.isTime = true;
          openTimeModal();
          var deviceId = getDeviceId();
          var alltime = $scope.timeHour.substring(0,$scope.timeHour.length-1) + $scope.timeMinu.substring (0,$scope.timeMinu.length-1);
          angular.forEach(deviceInfo, function(data, index, array){
            //根据deviceid对开启的功能添加定时功能
            if(data.switchType == 'Hot'){
              //openHot(deviceId);
            }
            if(data.switchType == 'Hot drying'){
              //openHotDrying(deviceId);
            }
            if(data.switchType == 'Cool'){
              //openCool(deviceId);
            }
            if(data.switchType == 'Dryer'){
              //openDryer(deviceId);
            }
            if(data.switchType == 'Breath'){
              //openBreath(deviceId);
            }
          });
        }else{
          alert("不能开启定时功能");
        }
      };

      var  timePromise = undefined;
      var getTimer = function(hour, minu){
        $scope.countDown = hour.substring (0,hour.length-1)*60*60*1000 + minu.substring (0,minu.length-1)*60*1000 - 8*60*60*1000;
        $scope.isCountDown = true;
        timePromise = $interval(function(){
          console.log("time: "+$scope.countDown);
          if($scope.countDown == -28800000){
            $interval.cancel(timePromise);
            timePromise = undefined;
          }else{
            $scope.countDown -= 60000;
          }
        },60000);
      };

      /**
       *@autor: caolei
       *@params: color
       *@disc: change the color of the ring
       */
      var changeRingCol = function(color){
        var cxt=canvas.getContext("2d");
        var xLength = $window.innerWidth * 0.5;
        var yLength = $window.innerWidth * 0.8;
        var r = $window.innerWidth * 0.4;
        cxt.beginPath();
        cxt.arc(xLength,yLength,r,0,360,false);
        cxt.lineWidth=$window.innerWidth * 0.08;
        cxt.strokeStyle= color;
        cxt.stroke();
        cxt.closePath();
      };

      canvas.height = $window.innerWidth*1.1;
      canvas.width = $window.innerWidth*1;
      var cxt=canvas.getContext("2d");
      console.log();
      var xLength = $window.innerWidth * 0.5;
      var yLength = $window.innerWidth * 0.8;
      var r = $window.innerWidth * 0.4;
      cxt.beginPath();
      cxt.arc(xLength,yLength,r,0,360,false);
      cxt.lineWidth=$window.innerWidth * 0.08;
      cxt.strokeStyle="#99d5ff";
      cxt.stroke();
      cxt.closePath();

      $scope.screenHeig = window.innerHeight;
      $ionicModal.fromTemplateUrl('build/pages/model/windModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });
      $scope.value = [{id:2,des:'bathroom.fixed'}, {id:3,des:'bathroom.rock'}];
      $scope.openModal = function () {
        if($scope.value.length!==0) {
          $scope.modal.show();
          setTimeout(function () {
            var ele = document.getElementsByClassName("windModal");
            ele[0].style.top = '10rem';
            ele[0].style.minHeight = 61 + '%';
          }, 10)
        }
      };
      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });
      $scope.choose = function (val) {
        $scope.modal.hide();
        for(var i=0;i<$scope.value.length;i++){
          if($scope.value[i].id == val.id){
            $scope.windType.type = $scope.value[i].des;
            if($scope.value[i].des != 'bathroom.fixed'){
              openWindDirection(getDeviceId());
            }else{
              closeWindDirection(getDeviceId());
            }
          }
        }
      };

      $scope.toilteSetting={
        gaiganyin:"",
        gaiganyinDistance:""
      };
      $scope.listleft = [{
        name:"0时",
        flag:false,
        towdata:[{
          name: "0分",
          flag:false
        },{
          name: "10分",
          flag:false
        },{
          name: "20分",
          flag:false
        },{
          name: "30分",
          flag:false
        },{
          name: "40分",
          flag:false
        },{
          name: "50分",
          flag:false
        },{
          name: "59分",
          flag:false
        }]
      },{
        name:"1时",
        flag:false,
        towdata:[{
          name: "无",
          flag:false
        }]
      },{
        name:"2时",
          flag:false,
          towdata:[{
          name: "无",
          flag:false
        }]
      },{
        name:"3时",
          flag:false,
          towdata:[{
          name: "无",
          flag:false
        }]
      },{
        name:"4时",
          flag:false,
          towdata:[{
          name: "无",
          flag:false
        }]
      },{
        name:"5时",
        flag:false,
        towdata:[{
          name: "无",
          flag:false
        }]
      },{
        name:"6时",
        flag:false,
        towdata:[{
          name: "无",
          flag:false
        }]
      }];
      $scope.timeHour="";
      $scope.timeMinu="";
      $scope.listright=$scope.listleft[0].towdata;
      $scope.silderSeleced = function (index) {
        $scope.listleft[index].flag = true;
        $scope.timeHour = $scope.listleft[index].name;
        //$scope.listright = $scope.listleft[index].towdata;
        for(var i=0;i<$scope.listleft.length;i++){
          if(index !== i){
            $scope.listleft[i].flag = false;
          }
        }
      };
      $scope.silderRightSeleced = function (index) {
        $scope.listright[index].flag = true;
        $scope.timeMinu = $scope.listright[index].name;
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
      openTimeModal = function () {
        $scope.listright=$scope.listleft[0].towdata;
        $scope.setmodal.show();
        setTimeout(function () {
          var ele = document.getElementsByClassName("hmsiot-setSelect");
          ele[0].style.top = 68 + '%';
          ele[0].style.minHeight = 61 + '%';
        }, 10)
      };
      $scope.$on('$destroy', function() {
        $scope.setmodal.remove();
      });
      $scope.setchoose = function () {
        if($scope.timeHour.substring(0,$scope.timeHour.length-1) == 0 && $scope.timeMinu.substring (0,$scope.timeMinu.length-1) == 0){
          hmsPopup.showPopup('<span translate="bathroom.timeout"></span>');
        }
        if($scope.timeHour.substring(0,$scope.timeHour.length-1) == 6 && $scope.timeMinu.substring (0,$scope.timeMinu.length-1) != 0){
          hmsPopup.showPopup('<span translate="bathroom.timeout"></span>');
        }
        getTimer($scope.timeHour, $scope.timeMinu);
        $scope.setmodal.hide();
      };

  }]);
