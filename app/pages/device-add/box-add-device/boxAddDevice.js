/**
 * Created by daidongdong on 2017/4/14.
 */
angular.module('deviceAddModule')
  .controller('boxAddDeviceCtrl', [
    '$scope',
    '$state',
    'publicMethod', '$ionicModal', '$ionicPopover', '$timeout', '$ionicHistory', 'hmsHttp', 'hmsPopup','SettingsService',
    function ($scope, $state, publicMethod, $ionicModal, $ionicPopover, $timeout, $ionicHistory, hmsHttp, hmsPopup,SettingsService) {
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

      $scope.boxItem = SettingsService.get('box');
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
    }]);


