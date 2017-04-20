/**
 * Created by daidongdong on 2017/4/14.
 */
angular.module('deviceAddModule')
  .controller('deviceListCtrl', [
    '$scope',
    '$state',
    'publicMethod', '$ionicModal', '$ionicPopover', '$timeout', '$ionicHistory', 'hmsHttp', 'hmsPopup',
    function ($scope, $state, publicMethod, $ionicModal, $ionicPopover, $timeout, $ionicHistory, hmsHttp, hmsPopup) {
      $scope.goBack = function () {
        $ionicHistory.goBack();
      }
      /**
      *@autor:daidongdong
      *@name:
      *@params:
      *@return:
      *@disc:
      */
      $scope.goAddBox = function(){
          $state.go('boxList');
      }


      $scope.goAddOnLineBox = function(){
        $state.go('boxOnLine');
      }



//寻找box
      $scope.selectBox = function () {
        hmsPopup.showLoading('<span translate="alertMsg.loading"></span>');
        console.log('select box');
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
        }
        cordova.plugins.SocketPlugin.udpBroadCast({
          "timeout": "5000",
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
          $scope.boxList = response;
          hmsPopup.hideLoading();
          $scope.$apply();

        }

        function error(error) {
          hmsPopup.showShortCenterToast("广播失败" + error);
        }
      }
//连接box
      $scope.boxClick = function (item) {
        $scope.boxItem = item;
        console.log('lian box');
        cordova.plugins.SocketPlugin.tcpConnect({
          "timeout": "5000",
          "ip": item.payload.cmd_properties.ip,
        }, success, error);

        function success(response) {
          hmsPopup.showShortCenterToast("连接成功");
        }

        function error() {
          hmsPopup.showShortCenterToast("连接失败");
        }
      }
      angular.toJson();

//搜索box已连接设备
      $scope.selectDeviceOn = function () {
        var cmd = {
          "from": {"cid": "0xE3"},
          "to": {"cid": "0xE4", "device_id": $scope.boxItem.payload.cmd_properties.device_id},
          "ts": Date.parse(new Date()) / 1000,
          "idx": 0,
          "method": "CTL",
          "payload": {
            "cmd": "LIST_BONDED_DEVICE_REQUEST",
            "cmd_properties": ""
          }
        }
        console.log('sou device yiyou');
        cordova.plugins.SocketPlugin.tcpSendCmd({
          "timeout": "5000",
          "value": cmd
        }, success, error);

        function success(response) {
          hmsPopup.showShortCenterToast("搜索已连接设备成功");
        }

        function error() {
          hmsPopup.showShortCenterToast("搜索已连接设备失败");
        }
      }
//搜索box未连接设备
      $scope.selectDeviceOff = function () {
        var cmd = {
          "from": {"cid": "0xE3"},
          "to": {"cid": "0xE4", "device_id": $scope.boxItem.payload.cmd_properties.device_id},
          "ts": Date.parse(new Date()) / 1000,
          "idx": 0,
          "method": "CTL",
          "payload": {
            "device_type": "BLE_DEVICE",
            "cmd": "SCANNED_RETURN",
            "cmd_properties": {"device_state": 0}
          }
        }
        console.log('sou device ');
        cordova.plugins.SocketPlugin.tcpSendCmd({
          "timeout": "5000",
          "value": cmd
        }, success, error);
        function success(response) {
          hmsPopup.showShortCenterToast("搜索未连接设备成功");
        }

        function error() {
          hmsPopup.showShortCenterToast("搜索未连接设备失败");
        }
      }
//接受tcp状态
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

      }, false);


      //绑定设备
      $scope.deviceBang = function (item) {
        var cmd = {
          "from": {"cid": "0xE3"},
          "to": {"cid": "0xE4", "device_id": $scope.boxItem.payload.cmd_properties.device_id},
          "ts": Date.parse(new Date()) / 1000,
          "idx": 0,
          "method": "CTL",
          "payload": {
            "device_type": "BLE_DEVICE",
            "cmd": "BOND_REQUEST",
            "cmd_properties": {
              "bond_number": 1,
              "device_mac": [item.device_mac]
            }
          }
        }
        console.log('bang');
        cordova.plugins.SocketPlugin.tcpSendCmd({
          "timeout": "5000",
          "value": cmd
        }, success, error);
        function success(response) {
          hmsPopup.showShortCenterToast("搜索未连接设备成功");
        }

        function error() {
          hmsPopup.showShortCenterToast("搜索未连接设备失败");
        }
      }
      $scope.open = function (item) {
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
            "device_id": item.device_id,
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
      }


      $scope.close = function (item) {
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
            "device_id": item.device_id,
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
      }

      $scope.over = function (item) {

        var cmd = {
          "from": {"cid": "0xE3"},
          "to": {"cid": "0xE4", "device_id": item.device_id},
          "ts": Date.parse(new Date()) / 1000,
          "idx": 0,
          "method": "CTL",
          "payload": {
            "cmd": "QUIT_REQUEST",
            "cmd_properties": {
              "device_mac": item.device_mac
            }
          }
        }
        cordova.plugins.SocketPlugin.tcpSendCmd({
          "timeout": "5000",
          "ip":"255.255.255.255",
          "value": cmd
        }, success, error);
        function success(response) {
          hmsPopup.showShortCenterToast("解绑");
        }

        function error() {
          hmsPopup.showShortCenterToast("解绑失败");
        }
      }

      $scope.closebox = function () {
        cordova.plugins.SocketPlugin.tcpClose ({
          "timeout": "5000",
          "ip":"255.255.255.255",
          "value": ''
        },success,error);
        function success(response) {
          hmsPopup.showShortCenterToast("断开box成功");
        }

        function error() {
          hmsPopup.showShortCenterToast("断开box");
        }
      }

    }]);


