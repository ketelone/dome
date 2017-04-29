/**
 * Created by daidongdong on 17/43/20.
 */

angular.module('indexPageModule')

  .controller('indexPageCtrl', [
    '$scope',
    '$state',
    '$ionicGesture',
    'baseConfig',
    '$timeout',
    '$ionicScrollDelegate',
    '$http',
    '$ionicHistory',
    'hmsPopup',
    'SettingsService',
    'hmsHttp',
    function ($scope,
              $state,
              $ionicGesture,
              baseConfig,
              $timeout,
              $ionicScrollDelegate,
              $http,
              $ionicHistory,
              hmsPopup,
              SettingsService,
              hmsHttp) {

      $scope.isSceneModel = true;
      $scope.isDeviceModel = false;
      $scope.isOneLine = true;
      $scope.isSecondLine = false;
      $scope.homeInfo = {
        temperature: "",
        percentage: "",
        temperatureCh: ""
      };

      $scope.tabs = [
        {
          text: "场景模式",
        },
        {
          text: "设备模式",
        }
      ];
      $scope.modelData = [];
      if(!baseConfig.isLinkDatabase){
        $scope.modelData = [
          // {
          //   id: "1",
          //   pictureUrl: 'build/img/index/img_home_gohome.png',
          //   title: "回家",
          //   context: "一键开启指定设备",
          //   isOneButton: true,
          //   isTwoButton: false,
          //   jsonContext: "1",
          //   isOff: false,
          //   lastUpdateDate: ""
          // },
          {
            id: "2",
            pictureUrl: 'build/img/index/img_home_morning.png',
            title: "晨起",
            context: "告别匆忙的晨起洗漱",
            isOneButton: true,
            isTwoButton: false,
            jsonContext: "1",
            isOff: false,
            lastUpdateDate: ""
          },
          {
            id: "3",
            pictureUrl: 'build/img/index/img_home_leavehome.png',
            title: "离家",
            context: "一键关闭所有设备",
            isOneButton: true,
            isTwoButton: false,
            jsonContext: "1",
            isOff: false,
            lastUpdateDate: ""
          },
          {
            id: "4",
            pictureUrl: 'build/img/index/img_home_spa.png',
            title: "泡澡",
            context: "出去SPA不如在家泡澡",
            isOneButton: false,
            isTwoButton: true,
            jsonContext: "1",
            isOff: false,
            lastUpdateDate: ""
          },
          {
            id: "5",
            pictureUrl: 'build/img/index/muyu@3x.png',
            title: "沐浴",
            context: "享受沐浴",
            isOneButton: false,
            isTwoButton: true,
            jsonContext: "1",
            isOff: false,
            lastUpdateDate: ""
          },
          {
            id: "6",
            pictureUrl: 'build/img/index/img_home_veil.png',
            title: "维亚灯光",
            context: "开始您美好的一天",
            isOneButton: false,
            isTwoButton: true,
            jsonContext: "1",
            isOff: false,
            lastUpdateDate: ""
          },
          {
            id: "7",
            pictureUrl: 'build/img/index/img_home_period.png',
            title: "大姨了吗",
            context: "女性特殊期洗浴关怀方案",
            isOneButton: false,
            isTwoButton: true,
            jsonContext: "1",
            isOff: false,
            lastUpdateDate: ""
          }
        ];
      }


      $scope.isInPage = 2;
      $scope.goKeyscene = function(item){
        if($scope.isInPage == 1){
          $scope.isInPage = 2;
          return;
        }
        console.log(item);
        if(item.id == '1'){
          $state.go('leaveHome');
        }else if(item.id == '2'){
          $state.go('morning');
        }else if(item.id == '3'){
          $state.go('bathing');
        }else if(item.id == '4'){
          $state.go('spa');
        }else if(item.id == '5'){
          $state.go('veil');
        }else if(item.id == '6'){
          $state.go('period');
        }
      };

      $scope.deviceModel = [];
      if(!baseConfig.isLinkDatabase){
        $scope.deviceModel = [
          {
            id: "1",
            pictureUrl: "build/img/index/img_home_device_toliet.png",
            deviceType: "马桶",
            deviceStatus: "设备在线",
            deviceDesc: "有人使用",
            statusPictureUrl: "build/img/index/icon_home_device_signal5.png",
            errorPictureUrl: "",
            isStatus: true,
            isError: false,
            sku: "1"
          },{
            id: "2",
            pictureUrl: "build/img/index/icon_home_device_room.png",
            deviceType: "卫生间",
            deviceStatus: "4个设备",
            deviceDesc: "",
            statusPictureUrl: "",
            errorPictureUrl: "",
            isStatus: false,
            isError: false,
            sku: "2"
          },{
            id: "3",
            pictureUrl: "build/img/index/img_home_device_heater.png",
            deviceType: "浴霸",
            deviceStatus: "设备在线",
            deviceDesc: "80%",
            statusPictureUrl: "build/img/index/icon_home_device_signal4.png",
            errorPictureUrl: "",
            isStatus: true,
            isError: false,
            sku: "EB:4E:28:49:09:9D"
          },{
            id: "4",
            pictureUrl: "build/img/index/img_home_device_sensor.png",
            deviceType: "溢水传感器",
            deviceStatus: "设备在线",
            deviceDesc: "发生溢水",
            statusPictureUrl: "build/img/index/icon_home_device_signal3.png",
            errorPictureUrl: "build/img/index/icon_home_device_warnning.png",
            isStatus: true,
            isError: true,
            sku: "4"
          },
          {
            id: "5",
            pictureUrl: "build/img/index/img_home_device_chushuifa.png",
            deviceType: "出水阀",
            deviceStatus: "设备离线",
            deviceDesc: "",
            statusPictureUrl: "build/img/index/icon_home_device_no_singal.png",
            errorPictureUrl: "build/img/index/icon_home_device_warnning.png",
            isStatus: true,
            isError: true,
            sku: "5"
          },
          {
            id: "6",
            pictureUrl: "build/img/index/karess.png",
            deviceType: "karess",
            deviceStatus: "设备离线",
            deviceDesc: "",
            statusPictureUrl: "build/img/index/icon_home_device_no_singal.png",
            errorPictureUrl: "build/img/index/icon_home_device_warnning.png",
            isStatus: true,
            isError: true,
            sku: "D2:3D:19:2C:A9:89"
          },
          {
            id: "7",
            pictureUrl: "build/img/index/next.png",
            deviceType: "nextgen",
            deviceStatus: "设备离线",
            deviceDesc: "",
            statusPictureUrl: "build/img/index/icon_home_device_no_singal.png",
            errorPictureUrl: "build/img/index/icon_home_device_warnning.png",
            isStatus: true,
            isError: true,
            sku: "E8:91:E0:DC:20:F1"
          },
          {
            id: "8",
            pictureUrl: "build/img/index/air.png",
            deviceType: "airfoil-shower",
            deviceStatus: "设备离线",
            deviceDesc: "",
            statusPictureUrl: "build/img/index/icon_home_device_no_singal.png",
            errorPictureUrl: "build/img/index/icon_home_device_warnning.png",
            isStatus: true,
            isError: true,
            sku: ""
          },
          {
            id: "9",
            pictureUrl: "build/img/index/img_home_device_chushuifa.png",
            deviceType: "mc镜柜",
            deviceStatus: "设备离线",
            deviceDesc: "",
            statusPictureUrl: "build/img/index/icon_home_device_no_singal.png",
            errorPictureUrl: "build/img/index/icon_home_device_warnning.png",
            isStatus: true,
            isError: true,
            sku: ""
          }
        ];
      }

      $scope.temperature = "20";
      $scope.humidity = "30";

      $scope.boxList = [];

      $scope.linkBox = function(){
        searchBox();
      };

      var test = function(){
        var url = baseConfig.basePath + "/rr/api?sysName=seniverseWeather&apiName=GetWeather";
        var paramter = {
          "location" : "ShangHai",
          "language" : "zh-Hans",
          "unit" : "c",
          "start" : "0",
          "hours" : "24"
        };
        hmsHttp.post(url, paramter).success(
          function(response){
            $scope.temperature = response.results[0].now.temperature;
            $scope.humidity = response.results[0].now.humidity;
            alert(JSON.stringify(response));
          }
        ).error(
          function (response, status, header, config){
            hmsPopup.showShortCenterToast("");
          }
        );
      };

      var getDeviceList = function(){
        db.transaction(function(tx){
          var partyId = window.localStorage.empno;
          var deviceIdList = [1,2,3,4,5,6,7];
          tx.executeSql('select * from T_CTM_PARTY_SCENARIO',[],function(tx, results){
            for(var i = 0; i < results.rows.length; i ++){
              var pictureUrl = "";
              var scenarioId = results.rows.item(i).SCENARIO_ID;
              var scenarioName = results.rows.item(i).SCENARIO_NAME;
              var scenarioStatus = results.rows.item(i).SCENARIO_STATUS;
              var isOneButton = false;
              var isTwoButton = false;
              if(scenarioStatus == 'Y'){
                isOneButton = false;
                isTwoButton = true;
              }else{
                isOneButton = true;
                isTwoButton = false;
              }
              if(scenarioName == '离家'){
                pictureUrl =  'build/img/index/img_home_leavehome.png';
              }else if(scenarioName == '晨起'){
                pictureUrl =  'build/img/index/img_home_morning.png';
              }else if(scenarioName == '淋浴'){
                pictureUrl =  'build/img/index/muyu@3x.png';
              }else if(scenarioName == '泡澡'){
                pictureUrl =  'build/img/index/img_home_spa.png';
              }else if(scenarioName == '维亚灯光'){
                pictureUrl =  'build/img/index/img_home_veil.png';
              }else if(scenarioName == '大姨了吗'){
                pictureUrl =  'build/img/index/img_home_period.png';
              }
              var model =
              {
                id: scenarioId,
                pictureUrl: pictureUrl,
                title: scenarioName,
                context: "一键开启指定设备",
                isOneButton: isOneButton,
                isTwoButton: isTwoButton,
                jsonContext: "1",
                isOff: false,
                lastUpdateDate: ""
              };
              $scope.modelData.push(model);

            }
          }, null);
          tx.executeSql('select * from T_DVM_DEVICE where DEVICE_ID in (select f.DEVICE_ID from T_CTM_PARTY_BOX_DEVICE f where f.PARTY_ID = "'+partyId+'")',[],function(tx, results){
            for(var i = 0; i < results.rows.length; i ++){
              var device = results.rows.item(i);
              var pictureUrl = "";
              if(device.DEVICE_NAME == 'numi'){
                pictureUrl = "build/img/index/img_home_device_toliet.png";
              }else if(device.DEVICE_NAME == 'bathroomHeader'){
                pictureUrl = "build/img/index/img_home_device_heater.png";
              }else if(device.DEVICE_NAME == 'airfoilShower'){
                pictureUrl = "build/img/index/air.png";
              }else if(device.DEVICE_NAME == 'karess'){
                pictureUrl = "build/img/index/karess.png";
              }else if(device.DEVICE_NAME == 'mc'){
                pictureUrl = "build/img/index/mirror.png";
              }else if(device.DEVICE_NAME == 'ng'){
                pictureUrl = "build/img/index/next.png";
              }else if(device.DEVICE_NAME == 'ro'){
                pictureUrl = "build/img/index/img_home_device_toliet.png";
              }

              var deviceInfo =
              {
                 id: device.DEVICE_ID,
                 pictureUrl: pictureUrl,
                 deviceType: device.DEVICE_NAME,
                 deviceStatus: "设备在线",
                 deviceDesc: "有人使用",
                 statusPictureUrl: "build/img/index/icon_home_device_signal5.png",
                 errorPictureUrl: "",
                 isStatus: true,
                 isError: false,
                 sku: "1"
               };

              $scope.deviceModel.push(deviceInfo);

            }
          }, null);
        });
      };

      $scope.$watch('', function(){
        if(baseConfig.isLinkDatabase){
          getDeviceList();
        }
        test();
        if(localStorage.boxLinkCount == 1){
          searchBox();
          localStorage.boxLinkCount = 2;
        }
      }, true);

      document.addEventListener('SocketPlugin.receiveTcpData', function (result) {
        //hmsPopup.showShortCenterToast("开始返回数据！");
        var resultOn = result;
        $scope.deviceOff = resultOn.payload.cmd_properties.device_list;
        if (resultOn.payload.cmd == "LIST_BONDED_DEVICE_RETURN") {
          hmsPopup.showShortCenterToast("开始返回数据");
          //localStorage.device_id = resultOn.payload.cmd_properties.device_list[0].device_id;
          //循环device list 取出device id，并降deviceid与相应页面的设备做关联
          var deviceLinkInfo = "";
          var deviceStatus = [];
          angular.forEach(resultOn.payload.cmd_properties.device_list, function(data, index, array){
            deviceLinkInfo = deviceLinkInfo =="" ? (";" + data.device_sku + "," + data.device_id) : (deviceLinkInfo + ";" + data.device_sku + "," + data.device_id);
            deviceStatus.push({'deviceSku': data.device_sku, 'deviceRssi': data.device_rssi, 'deviceState': data.device_state});
          });
          //保存device 连接的信息。
          localStorage.deviceInfo = deviceLinkInfo;
          localStorage.deviceStatus = JSON.stringify(deviceStatus);
          hmsPopup.hideLoading();

          if ($scope.deviceOn.length == 0) {
            hmsPopup.showShortCenterToast("没有已连接设备，请搜索未连接设备");
          }
        }

        if (resultOn.payload.cmd == "SCAN_RETURN") {
          console.log(resultOn.payload.cmd_properties.device_list);
          if ($scope.deviceOff.length == 0) {
            hmsPopup.showShortCenterToast("没有设备");
          }
          $scope.$apply();
        }

      }, false);

      /**
       *@autor: caolei
       *@return: box ip
       *@disc: search box
       */
      var searchBox = function () {
        var cmd = {
          "from": {"cid": "0xE3"},
          "to": {"cid": "0xE4"},
          "ts": Date.parse(new Date()) / 1000,
          "idx": 0,
          "method": "CTL",
          "payload": {
            "cmd": "SCAN_BOX_REQUEST",
            "cmd_properties": {
              "scan_box_request": "KOHLER_BOX_SEARCH"
            }
          }
        };
        cordova.plugins.SocketPlugin.udpBroadCast({
          "timeout": "1500",
          "ip": "255.255.255.255",
          "value": cmd//指令json
        }, success, error);
        function success(response) {
          // {
          //   from =     {
          //     cid = 0xE4;   表示来自box
          //   "device_id" = F9DA70C8;  box id
          // };
          //   idx = 0;          、指令的id
          //   method = RSP;     、指令的方式  写死
          //   payload =     {   、相应体
          //     cmd = "SCAN_BOX_RESPONSE";  、相应回复
          //   "cmd_properties" =         {  、设备box属性
          //     "device_id" = F9DA70C8;      、 box id
          //   ip = "192.168.1.172";          、box ip
          //   sku = "K-BOX";                  、sku号
          //   sn = 0123456789abcdef;           、对应云端id
          // };
          // };
          //   to =     {                 、目标
          //     cid = 0xE3;                、app
          // };
          //   ts = 1492136310;             、时间戳
          // }
          //localStorage.boxIp = response.payload.cmd_properties.ip;
          $scope.boxList = response;
          hmsPopup.hideLoading();
          $scope.$apply();
          hmsPopup.showShortCenterToast("searchBox");
          angular.forEach($scope.boxList, function(data, index, array){

            $timeout(function () {
              boxLink(data);
            }, 1000);

          });
          //boxLink($scope.boxList[0]);
        }

        function error(error) {
          hmsPopup.showShortCenterToast("广播失败" + error);
        }
      };

      /**
       *@autor: caolei
       *@params: object box
       *@disc: link box
       */
      var boxLink = function (item) {
        hmsPopup.showShortCenterToast("start boxLink");
        console.log('lian box');
        cordova.plugins.SocketPlugin.tcpConnect({
          "timeout": "5000",
          "ip": item.payload.cmd_properties.ip,
        }, success, error);

        function success(response) {
          hmsPopup.showShortCenterToast("boxLink sucess");
          $timeout(function () {
            localStorage.boxIp = item.payload.cmd_properties.ip;
            selectDeviceOn(item.payload.cmd_properties.device_id, item.payload.cmd_properties.ip);
          }, 1000);
        }

        function error() {
          hmsPopup.showShortCenterToast("连接失败");
        }
      };

      /**
       *@autor: caolei
       *@params: device id
       *@disc: link device
       */
      var selectDeviceOn = function (device_id, boxIp) {
        hmsPopup.showShortCenterToast("start  selectDeviceOn");
        var cmd = {
          "from": {"cid": "0xE3"},
          "to": {"cid": "0xE4", "device_id": device_id},
          "ts": Date.parse(new Date()) / 1000,
          "idx": 0,
          "method": "CTL",
          "payload": {
            "cmd": "LIST_BONDED_DEVICE_REQUEST",
            "cmd_properties": ""
          }
        };
        cordova.plugins.SocketPlugin.tcpSendCmd({
          "timeout": "5000",
          "value": cmd,
          "ip": boxIp
        }, success, error);

        function success(response) {
          hmsPopup.showShortCenterToast("搜索已连接设备成功");
        }

        function error() {
          hmsPopup.showShortCenterToast("搜索已连接设备失败");
        }
      };

      /**
       *@autor: caolei
       *@params: modelType
       *@disc: change model
       */
      $scope.changeModel = function(modelType){
        if(modelType == "场景模式"){
          $scope.isSceneModel = true;
          $scope.isDeviceModel = false;
          $("#line").removeClass('height-light2');
          $("#line").addClass('height-light');
        }else{
          $scope.isSceneModel = false;
          $scope.isDeviceModel = true;
          $("#line").removeClass('height-light');
          $("#line").addClass('height-light2');
        }
      };

      /**
       *@autor: caolei
       *@params: item
       *@disc: get switch status
       */
      $scope.getSwitchStatus = function(item){
        $scope.isInPage = 1;
        //console.log(item);
        alert(item.isOff);
        if(item.isOff){
          //alert("on");
          if(checkIsLinkBox){
            var netType = network();
            if(netType == '无网络链接'){

            }else{
              //do post
            }
          }

        }else{
          alert("off");
        }
      };
      console.log($ionicHistory);

      var checkIsLinkBox = function(){
        return true;
      };

        $scope.getDeviceInfo = function(item){

          if(baseConfig.isLinkDatabase == true){
            if(item.deviceType == "卫生间"){
              $state.go('cenwatpurifierContrl',{deviceSku: item.sku});
            }
            if(item.deviceType == "bathroomHeader"){
              $state.go('bathroom',{deviceSku: item.sku});
            }
            if(item.deviceType == "numi"){
              $state.go('toiletContrl');
            }
            if(item.deviceType == "karess"){
              $state.go('karess');
              SettingsService.set("sku",item.sku);
            }
            if(item.deviceType == "ng"){
              $state.go('nextgen');
              SettingsService.set("sku",item.sku);
            }
            if(item.deviceType == "airfoilshower"){
              $state.go('airfoilShower');
            }
            if(item.deviceType == "mc"){
              $state.go('mc');
            }
          }else{
            if(item.deviceType == "卫生间"){
              $state.go('cenwatpurifierContrl',{deviceSku: item.sku});
            }
            if(item.deviceType == "浴霸"){
              $state.go('bathroom',{deviceSku: item.sku});
            }
            if(item.deviceType == "马桶"){
              $state.go('toiletContrl');
            }
            if(item.deviceType == "karess"){
              $state.go('karess');
              SettingsService.set("sku",item.sku);
            }
            if(item.deviceType == "nextgen"){
              $state.go('nextgen');
              SettingsService.set("sku",item.sku);
            }
            if(item.deviceType == "airfoil-shower"){
              $state.go('airfoilShower');
            }
            if(item.deviceType == "mc镜柜"){
              $state.go('mc');
            }
          }


      };

      $scope.addModule = function(){
        alert("in-----addModule");
      };

      $scope.addDevice = function(){
        $state.go('deviceList');
      };


      function setUnit(){
        var url =baseConfig.basePath+"/r/api/ctm/insertPartyUtil";
        var paramter =
        {"temperature":"°C","PartySettingId":100};
        hmsHttp.post(url, paramter).success(
          function(response) {
            console.log(response);
            //alert(response);
          }).error(
          function (response, status, header, config){
            //hmsPopup.showPopup("<span translate='bathroom.saveError'></span>");
            //  alert("1234");
          }
        );

      }
      setUnit();
    }
  ]);


