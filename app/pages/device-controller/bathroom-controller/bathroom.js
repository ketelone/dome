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
    'hmsPopup',
    '$stateParams',
    function($scope, $state, $interval, $window, $ionicModal, hmsPopup, $stateParams){

      $scope.bathroomData = [
        {
          id: "1",
          switchPictureUrl: "build/img/bathroom/hot.png",
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
          switchPictureUrl: "build/img/bathroom/hot.png",
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
          switchPictureUrl: "build/img/bathroom/hot.png",
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
          switchPictureUrl: "build/img/bathroom/hot.png",
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
          switchPictureUrl: "build/img/bathroom/hot.png",
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
          desc: "bathroom.purify"
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
          switchType: "Wind direction",
          desc: "bathroom.windDirection"
        },
        {
          id: "8",
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
      var canvas=document.getElementById("canvas");
      $scope.setHour = "";
      $scope.setMinu = "";

      $scope.goBack = function(){
        $ionicHistory.goBack();
      };

/*      //接受tcp状态
      document.addEventListener('SocketPlugin.receiveTcpStatus', function (result) {

        hmsPopup.showShortCenterToast("tcp状态"+angular.toJson(result.code));
      }, false);
//接受tcp返回数据
      document.addEventListener('SocketPlugin.receiveTcpData', function (result) {
        hmsPopup.showShortCenterToast("开始返回数据！");
        // alert(JSON.stringify(result));
        // {
        //   from =     {
        //     cid = 0xE4;
        //   "device_id" = 7E66264D;
        // };
        //   idx = 0;
        //   method = RSP;
        //   payload =     {
        //     cmd = "LIST_BONDED_DEVICE_RETURN";
        //   "cmd_properties" =         {
        //     "device_list" =             (
        //     {
        //       "device_id" = 24A93477;
        //   "device_mac" = "F7:B3:24:A9:34:77";  //固定mac地址  唯一标示
        //   "device_rssi" = 0;
        //   "device_sku" = "F7:B3:24:A9:34:77";    、、设备sku
        //   "device_state" = 1;                      、、设备状态 1已连接 0未连接
        // }
        // );
        //   "device_number" = 1;                、、数组的个数
        // };
        //   "device_type" = "BLE_DEVICE";        、、蓝牙 box连接设备的类型   分蓝牙和WiFi  一般为蓝牙
        // };
        //   to =     {
        //     cid = 0xE3;
        // };
        //   ts = 1492138779;
        // }
        var resultOn = result;
        if (resultOn.payload.cmd == "LIST_BONDED_DEVICE_RETURN") {
          $scope.deviceOn = resultOn.payload.cmd_properties.device_list;
          if ($scope.deviceOn.length == 0) {
            hmsPopup.showShortCenterToast("没有已连接设备，请搜索未连接设备");//让他去选择连接未设备
          }
        }

        if (resultOn.payload.cmd == "SCAN_RETURN") {
          console.log(resultOn.payload.cmd_properties.device_list);
          $scope.deviceOff = resultOn.payload.cmd_properties.device_list;
          if ($scope.deviceOff.length == 0) {
            hmsPopup.showShortCenterToast("没有设备");//让他去选择连接未设备
          }
          $scope.$apply();
        }

      }, false);*/

      var openLight = function (deviceId) {
        var cmd = {
          from: {
            cid: "0xE3",
          },
          idx: 1,
          method: "CTL",
          payload: {
            cmd: "CMD_REQUEST",
            "device_type": "BLE_DEVICE",
            value: ["887706010005270221"],
          },
          to: {
            cid: "0xE4",
            "device_id": deviceId,
          },
          ts: "1492146861.217451",
          ver: 1,
        }
        cordova.plugins.SocketPlugin.tcpSendCmd({
          "timeout": "5000",
          "value": cmd
        }, success, error);
        function success(response) {
          hmsPopup.showShortCenterToast("开灯");
        }

        function error() {
          hmsPopup.showShortCenterToast("开灯失败");
        }
      };

      var closeLight = function (deviceId) {
        var cmd = {
          from: {
            cid: "0xE3",
          },
          idx: 1,
          method: "CTL",
          payload: {
            cmd: "CMD_REQUEST",
            "device_type": "BLE_DEVICE",
            value: ["887706020005270020"],
          },
          to: {
            cid: "0xE4",
            "device_id": deviceId,
          },
          ts: "1492146861.217451",
          ver: 1,
        }
        cordova.plugins.SocketPlugin.tcpSendCmd({
          "timeout": "5000",
          "value": cmd
        }, success, error);
        function success(response) {
          hmsPopup.showShortCenterToast("开灯");
        }

        function error() {
          hmsPopup.showShortCenterToast("开灯失败");
        }
      };

      var openHot = function(deviceId){
        var cmd = {
          from: {
            cid: "0xE3",
          },
          idx: 1,
          method: "CTL",
          payload: {
            cmd: "CMD_REQUEST",
            "device_type": "BLE_DEVICE",
            value: ["8877080200052101000A2E"],
          },
          to: {
            cid: "0xE4",
            "device_id": deviceId,
          },
          ts: "1492146861.217451",
          ver: 1,
        }
        cordova.plugins.SocketPlugin.tcpSendCmd({
          "timeout": "5000",
          "value": cmd
        }, success, error);
        function success(response) {
          hmsPopup.showShortCenterToast("热风");
        }

        function error() {
          hmsPopup.showShortCenterToast("热风失败");
        }
      };

      var closeHot = function(deviceId){
        var cmd = {
          from: {
            cid: "0xE3",
          },
          idx: 1,
          method: "CTL",
          payload: {
            cmd: "CMD_REQUEST",
            "device_type": "BLE_DEVICE",
            value: ["8877080200052100000026"],
          },
          to: {
            cid: "0xE4",
            "device_id": deviceId,
          },
          ts: "1492146861.217451",
          ver: 1,
        }
        cordova.plugins.SocketPlugin.tcpSendCmd({
          "timeout": "5000",
          "value": cmd
        }, success, error);
        function success(response) {
          hmsPopup.showShortCenterToast("热风");
        }

        function error() {
          hmsPopup.showShortCenterToast("热风失败");
        }
      };

      var getXOR = function(){
        var result = 2^0^5^(39^2);
        return result;
      };

      /**
       *@autor: caolei
       *@disc: to obtain the information of Yuba
       */
      $scope.$watch('', function(){
        //console.log(getXOR());
      }, true);

      var getDeviceId = function(){
        var deviceList = localStorage.deviceInfo.split(";");
        angular.forEach(deviceList, function(data, index, array){
          var deviceInfo = data.split(":");
          if(deviceInfo[0] == $stateParams.deviceSku){
            return deviceInfo[1];
          }
        });
      }

      /**
       *@autor: caolei
       *@params: object device
       *@return: true or false
       *@disc: get relative device is open
       */
      $scope.getInfo = function(item){

        var deviceId = getDeviceId();

        if(item.switchType == 'Light'){


          if(($scope.count%3) == 1){
            item.isOpen = true;
            alert("白灯");
            openLight(deviceId);
          }else if(($scope.count%3) == 2){
            item.isOpen = true;
            alert("黄灯");
            //openLight(localStorage.device_id);
            changeRingCol('#ff6600');
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
                  openHot(deviceId);
                }
                changeRingCol('#ff6600');
              }
              return true;
            }else{
              if(item.switchType == 'Wind direction'){
                alert("请打开热风或者凉风或者冷干或者热干的功能");
              }else{
                alert("请关闭其它功能");
              }
              return false;
            }
          }else{
            if(item.switchType == 'Hot' || item.switchType == 'Cool' || item.switchType == 'Dryer' || item.switchType == 'Hot drying'){
              if(item.switchType == 'Hot'){
                closeHot(deviceId);
              }
              angular.forEach($scope.bathroomData, function(data, index, array) {
                if (data.switchType == 'Wind direction') {
                  data.isOpen = false;
                }
              });
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
       *@disc: check device's function is ok
       */
      var checkIsOk = function(item){
        if(item.switchType == 'Light'){
          return true;
        }
        var flag = true;
        angular.forEach($scope.bathroomData, function(data, index, array) {
          if (data.switchType != 'Light' && (data.switchType != item.switchType) && (item.switchType != 'Wind direction' && item.switchType != 'Light' && item.switchType != 'Setting' && data.isOpen)) {
            item.isOpen = false;
            flag = false;
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
        alert("in----");
      };

      $scope.getAllDay = function(item){
        alert("in----all day");
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
      $scope.getBathroomInfo = function(){
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
          //forEach deviceInfo,set time
          //getTimer();
          openModal();
          console.log($scope.setHour + "    "+$scope.setMinu);
          angular.forEach(deviceInfo, function(data, index, array){
            data.setTime = "";
          });
        }else{
          alert("不能开启定时功能");
        }
      };

      var  timePromise = undefined;
      var getTimer = function(){
        $scope.countDown = 1000*60*6 - 8*60*60*1000;
        $scope.isCountDown = true;
        timePromise = $interval(function(){
          if($scope.countDown<=0){
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
        var xLength = $window.innerHeight * 0.28;
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
      var cxt=canvas.getContext("2d");
      var xLength = $window.innerHeight * 0.28;
      var yLength = $window.innerWidth * 0.8;
      var r = $window.innerWidth * 0.4;
      cxt.beginPath();
      cxt.arc(xLength,yLength,r,0,360,false);
      cxt.lineWidth=$window.innerWidth * 0.08;
      cxt.strokeStyle="#99d5ff";
      cxt.stroke();
      cxt.closePath();


      $scope.openPopover = function () {
        console.log($scope.currentHour + "    "+$scope.currentMin);
        $scope.setHour = $scope.currentHour;
        $scope.setMinu = $scope.currentMin;
        $scope.modal.hide();
      };

      $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });
      var openModal = function () {
        $scope.modal.show();
      };
      $scope.closeModal = function () {
        $scope.modal.hide();
      };


      $scope.listHourData = ['一时', '二时', '三时', '四时', '五时', '六时', '七时', '八时', '九时',
        '十时', '十一时', '十二时', '十三时', '十四时', '十五时', '十六时', '十七时', '十八时','十九时','二十时','二十一时','二十二时','二十三时','二十四时'];

      $scope.listMinData = ['0分', '十分', '二十分', '三十分', '四十分', '五十分', '六十分'];

      //滚动啊
      var scope = $scope;
      $scope.currentHour = "";
      scope.rotates = [];
      scope.sourceDeg = 180;
      scope.hourIndex = [];
      var weekNum = 5;
      scope.nowIndex = weekNum / 2;
      scope.stageRotate = {
        "transform": "rotateX(" + scope.sourceDeg + "deg)",
        "-webkit-transform": "rotateX(" + scope.sourceDeg + "deg)"
      };
      for (var i = 0; i < weekNum; i++) {
        scope.hourIndex.push(i);
      }
      scope.baseDeg = 360 / scope.hourIndex.length;

      for (var i = (weekNum - 1); i >= 0; i--) {
        var deg = 360 / weekNum * (weekNum - i);
        scope.rotates[i] = {
          "transform": "rotateX(" + deg + "deg) translateZ(90px)",
          "-webkit-transform": "rotateX(" + deg + "deg) translateZ(90px)"
        };
      }

      function getLastDeg(deg) {
        return (Math.round(deg / scope.baseDeg) + 1) * scope.baseDeg;
      }

      scope.lastDeg = 0;
      scope.onDragScroll = function ($event) {
        // console.log(scope.nowIndex);
        // console.log(scope.weeks[scope.nowIndex]);
        if (scope.hour[scope.nowIndex] <= min && $event.gesture.deltaY > 0) {
          return;
        }
        if (scope.hour[scope.nowIndex] >= max && $event.gesture.deltaY < 0) {
          return;
        }
        scope.lastDeg = scope.sourceDeg - $event.gesture.deltaY / 2;
        scope.stageRotate = {
          "transform": "rotateX(" + scope.lastDeg + "deg)",
          "-webkit-transform": "rotateX(" + scope.lastDeg + "deg)"
        };
        getNowIndex(scope.lastDeg);
      };

      scope.onReleaseScroll = function ($event) {
        if ($event.gesture.deltaY > 0)
          scope.sourceDeg = getLastDeg(scope.lastDeg) - scope.baseDeg;
        else
          scope.sourceDeg = getLastDeg(scope.lastDeg - scope.baseDeg);
        scope.stageRotate = {
          "transform": "rotateX(" + scope.sourceDeg + "deg)",
          "-webkit-transform": "rotateX(" + scope.sourceDeg + "deg)"
        };
      };

      var min = 1;
      var max = 24;
      function getNextIndex(nowIndex) {
        var temp = nowIndex + 1;
        if (temp > (weekNum - 1))
          temp = 0;
        return temp;
      }

      function getPrevIndex(nowIndex) {
        var temp = nowIndex - 1;
        if (temp < 0)
          temp = weekNum - 1;
        return temp;
      }

      function getNowIndex(deg) {
        var temp = deg / scope.baseDeg % weekNum;
        scope.nowIndex = temp < 0 ? (weekNum + temp) : temp;
        refreshData();
      }

      function refreshData() {
        scope.nowIndex = Math.round(scope.nowIndex);
        if (scope.nowIndex > (weekNum - 1))
          scope.nowIndex -= weekNum;

        var needChangeUpIndex = scope.nowIndex - weekNum / 4;
        if (needChangeUpIndex < 0)
          needChangeUpIndex = weekNum + needChangeUpIndex;

        if (scope.hour[getNextIndex(needChangeUpIndex)] == '' || scope.hour[getNextIndex(needChangeUpIndex)] - 1 < min)
          scope.hour[needChangeUpIndex] = '';
        else
          scope.hour[needChangeUpIndex] = scope.hour[getNextIndex(needChangeUpIndex)] - 1;

        var needChangeDownIndex = scope.nowIndex + weekNum / 4;
        if (needChangeDownIndex > (weekNum - 1))
          needChangeDownIndex = needChangeDownIndex - weekNum;

        if (scope.hour[getPrevIndex(needChangeDownIndex)] == '' || scope.hour[getPrevIndex(needChangeDownIndex)] + 1 > max)
          scope.hour[needChangeDownIndex] = '';
        else
          scope.hour[needChangeDownIndex] = scope.hour[getPrevIndex(needChangeDownIndex)] + 1;
      }

      scope.hour = [];
      for (var i = 0; i < scope.listHourData.length; i++) {
        scope.hour.push(i + 1);
      }

      scope.getShowString = function (item) {
        return scope.listHourData[item-1];
      };

      $scope.getCurrentHour = function(item){
        $scope.currentHour = scope.listHourData[item-1];
      };


      $scope.currentMin = "";
      scope.rotates2 = [];
      scope.sourceDeg2 = 180;
      scope.hourIndex2 = [];
      var weekNum2 = 5;
      scope.nowIndex2 = weekNum2 / 2;
      scope.stageRotate2 = {
        "transform": "rotateX(" + scope.sourceDeg2 + "deg)",
        "-webkit-transform": "rotateX(" + scope.sourceDeg2 + "deg)"
      };
      for (var i = 0; i < weekNum; i++) {
        scope.hourIndex2.push(i);
      }
      scope.baseDeg2 = 360 / scope.hourIndex2.length;

      for (var i = (weekNum2 - 1); i >= 0; i--) {
        var deg = 360 / weekNum2 * (weekNum2 - i);
        scope.rotates2[i] = {
          "transform": "rotateX(" + deg + "deg) translateZ(90px)",
          "-webkit-transform": "rotateX(" + deg + "deg) translateZ(90px)"
        };
      }

      function getLastDeg2(deg) {
        return (Math.round(deg / scope.baseDeg2) + 1) * scope.baseDeg2;
      }

      scope.lastDeg2 = 0;

      scope.onDragScroll2 = function ($event) {
        // console.log(scope.nowIndex);
        // console.log(scope.weeks[scope.nowIndex]);
        if (scope.minute[scope.nowIndex2] <= min2 && $event.gesture.deltaY > 0) {
          return;
        }
        if (scope.minute[scope.nowIndex2] >= max2 && $event.gesture.deltaY < 0) {
          return;
        }
        scope.lastDeg2 = scope.sourceDeg2 - $event.gesture.deltaY / 2;
        scope.stageRotate2 = {
          "transform": "rotateX(" + scope.lastDeg2 + "deg)",
          "-webkit-transform": "rotateX(" + scope.lastDeg2 + "deg)"
        };
        getNowIndex2(scope.lastDeg2);
      };

      scope.onReleaseScroll2 = function ($event) {
        if ($event.gesture.deltaY > 0)
          scope.sourceDeg2 = getLastDeg2(scope.lastDeg2) - scope.baseDeg2;
        else
          scope.sourceDeg2 = getLastDeg2(scope.lastDeg2 - scope.baseDeg2);
        scope.stageRotate2 = {
          "transform": "rotateX(" + scope.sourceDeg2 + "deg)",
          "-webkit-transform": "rotateX(" + scope.sourceDeg2 + "deg)"
        };
      };

      var min2 = 1;
      var max2 = 7;
      function getNextIndex2(nowIndex) {
        var temp = nowIndex + 1;
        if (temp > (weekNum - 1))
          temp = 0;
        return temp;
      }

      function getPrevIndex2(nowIndex) {
        var temp = nowIndex - 1;
        if (temp < 0)
          temp = weekNum - 1;
        return temp;
      }

      function getNowIndex2(deg) {
        var temp = deg / scope.baseDeg2 % weekNum;
        scope.nowIndex2 = temp < 0 ? (weekNum + temp) : temp;
        refreshData2();
      }

      function refreshData2() {
        scope.nowIndex2 = Math.round(scope.nowIndex2);
        if (scope.nowIndex2 > (weekNum - 1))
          scope.nowIndex2 -= weekNum;

        var needChangeUpIndex = scope.nowIndex2 - weekNum / 4;
        if (needChangeUpIndex < 0)
          needChangeUpIndex = weekNum + needChangeUpIndex;

        if (scope.minute[getNextIndex2(needChangeUpIndex)] == '' || scope.minute[getNextIndex2(needChangeUpIndex)] - 1 < min2)
          scope.minute[needChangeUpIndex] = '';
        else
          scope.minute[needChangeUpIndex] = scope.minute[getNextIndex2(needChangeUpIndex)] - 1;

        var needChangeDownIndex = scope.nowIndex2 + weekNum / 4;
        if (needChangeDownIndex > (weekNum - 1))
          needChangeDownIndex = needChangeDownIndex - weekNum;

        if (scope.minute[getPrevIndex2(needChangeDownIndex)] == '' || scope.minute[getPrevIndex2(needChangeDownIndex)] + 1 > max2)
          scope.minute[needChangeDownIndex] = '';
        else
          scope.minute[needChangeDownIndex] = scope.minute[getPrevIndex2(needChangeDownIndex)] + 1;
      }

      scope.minute = [];
      for (var i = 0; i < scope.listMinData.length; i++) {
        scope.minute.push(i + 1);
      }

      scope.getShowMin = function (item) {
        return scope.listMinData[item-1];
      };

      $scope.getCurrentMin = function(item){
        $scope.currentMin = scope.listMinData[item-1];
      };

  }]);
