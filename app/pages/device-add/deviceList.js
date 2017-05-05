/**
 * Created by daidongdong on 2017/4/14.
 */
angular.module('deviceAddModule')
  .controller('deviceListCtrl', [
    '$scope',
    '$state',
    'publicMethod', '$ionicModal', '$ionicPopover', '$timeout', '$ionicHistory', 'hmsHttp', 'hmsPopup', '$translate',
    function ($scope, $state, publicMethod, $ionicModal, $ionicPopover, $timeout, $ionicHistory, hmsHttp, hmsPopup, $translate) {
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
      $scope.goAddBox = function () {
        $state.go('boxList');
      }


      $scope.goAddOnLineBox = function () {
        $state.go('boxOnLine');
      }


//寻找box
      $scope.selectBox = function () {
        hmsPopup.showLoading('<span translate="alertMsg.loading"></span>');
        console.log('select box');
        var cmd = [
          {
            "ver": "1",
            "from": {
              "ctype": 0XE3,
              "uid": window.localStorage.empno
            },
            "to": {
              "ctype": 0XE4,
              "uid": "peerId"
            },
            "ts": Date.parse(new Date()) / 1000,
            "idx": 12,
            "mtype": "rqst",
            "data": {
              "device_type": "BOX",
              "act": "SCAN_BOX_REQUEST",
              "act_params": {"scan_box_request": "KOHLER_BOX_SEARCH"}
            }
          }
        ];
        cordova.plugins.SocketPlugin.udpBroadCast({
          "timeout": "1500",
          "ip": "255.255.255.255",
          "value": cmd//指令json
        }, success, error);
        function success(response) {
          console.log(angular.toJson(response));
          $scope.boxList = response[0];
          $scope.Toast.show($translate.instant("index.searchBox"));
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
        console.log(angular.toJson($scope.boxItem));
        cordova.plugins.SocketPlugin.tcpConnect({
          "timeout": "3000",
          "ip": item.data.act_params.ip,
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
        alert($scope.boxItem.data.act_params.device_id);
        var cmd = [
          {
            "ver": 1,           //message protocol version
            "from": {
              "ctype": 0XE3,    //source peer type: 0xF0 Cloud,  0xE5 IOT Module, 0xE4 Box, 0xE3 App
              "uid": window.localStorage.empno   // follow Protocol design guide
            },
            "to": {
              "ctype": 0xE4,       //source peer type: 0xF0 Cloud,  0xE5 IOT Module, 0xE4 Box, 0xE3 App
              "uid": $scope.boxItem.data.act_params.device_id    // follow Protocol design guide
            },
            "ts": Date.parse(new Date()) / 1000,   //timestamp: the number of ms since time 00:00:00 UTC on 1970-01-01
            "idx": 12,          //message index 0 ~ 65535 2Bytes
            "mtype": "rqst",   //follow Protocol design guide
            "data": {
              "device_type": "BLE_DEVICE",   // ALL_DEVICE ,BLE_ DEVICE, ZigBee_DEVICE,RS485_DEVICE
              "act": "LIST_BONDED_DEVICE_REQUEST",
              "act_params": {}
            }
          }
        ]
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
        var cmd = [
          {
            "ver": 1,           //message protocol version
            "from": {
              "ctype": 0XE3,    //source peer type: 0xF0 Cloud,  0xE5 IOT Module, 0xE4 Box, 0xE3 App
              "uid": window.localStorage.empno   // follow Protocol design guide
            },
            "to": {
              "ctype": 0XE4,    //source peer type: 0xF0 Cloud,  0xE5 IOT Module, 0xE4 Box, 0xE3 App
              "uid": $scope.boxItem.data.act_params.device_id    // follow Protocol design guide
            },
            "ts": Date.parse(new Date()) / 1000,   //timestamp: the number of ms since time 00:00:00 UTC on 1970-01-01
            "idx": 12,            //message index 0 ~ 65535 2Bytes
            "mtype": "rqst",    //follow Protocol design guide
            "data": {
              "device_type": "BLE_DEVICE",
              "act": "SCAN_REQUEST",
              "act_params": {"device_state": 0}   //0-all, 1-can be bonded device (only)
            }
          }
        ]
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

        hmsPopup.showShortCenterToast("tcp状态" + angular.toJson(result.code));
      }, false);
//接受tcp返回数据
      //已连接的设备
      document.addEventListener('SocketPlugin.receiveTcpData', function (result) {
        hmsPopup.showShortCenterToast("开始返回数据！");
        var resultOn = result;
        if (resultOn[0].data.act == "LIST_BONDED_DEVICE_RETURN") {
          $scope.deviceOn = resultOn[0].data.act_params.device_list;
          if ($scope.deviceOn.length == 0) {
            hmsPopup.showShortCenterToast("没有已连接设备，请搜索未连接设备");//让他去选择连接未设备
          }
          $scope.$apply();
        }
//未连接的设备
        if (resultOn[0].data.act == "SCAN_RETURN") {
          console.log(resultOn[0]);
          $scope.deviceOff = resultOn[0].data.act_params.device_list;
          if ($scope.deviceOff.length == 0) {
            hmsPopup.showShortCenterToast("没有设备");//让他去选择连接未设备
          }
          $scope.$apply();
        }

        if (resultOn[0].data.act == "QUIT_RETURN") {
          hmsPopup.showShortCenterToast("解绑成功！");
        }

      }, false);


      //绑定设备
      $scope.deviceBang = function (item) {
        var cmd = [
          {
            "ver": 1,           //message protocol version
            "from": {
              "ctype": 0XE3,    //source peer type: 0xF0 Cloud,  0xE5 IOT Module, 0xE4 Box, 0xE3 App
              "uid": window.localStorage.empno  // follow Protocol design guide
            },
            "to": {
              "ctype": 0xE4,       //source peer type: 0xF0 Cloud,  0xE5 IOT Module, 0xE4 Box, 0xE3 App
              "uid": $scope.boxItem.data.act_params.device_id    // follow Protocol design guide
            },
            "ts": Date.parse(new Date()) / 1000,   //timestamp: the number of ms since time 00:00:00 UTC on 1970-01-01
            "idx": 12,          //message index 0 ~ 65535 2Bytes
            "mtype": "rqst",   //follow Protocol design guide
            "data": {
              "device_type": "BLE_DEVICE",   // ALL_DEVICE ,BLE_ DEVICE, ZigBee_DEVICE,RS485_DEVICE
              "act": " BOND_REQUEST ",
              "act_params": {
                "bond_number": "3",//1-10 bonded device，timeout：7s x n。
                //"device_mac":["data", "data", "data"]/ data is mac(FF:FF:FF:FF:FF:FF),区分大小写
                "device": [
                  {
                    "mac": item.device_mac,
                    "product_type": 0x01, // device_identity in Controller-Device Interface Specification
                    " cmd_set_id ": 1001,  // 执行动作的设备产品指令集ID
                  }
                ]
              }
            }
          }
        ]
        console.log('bang');
        cordova.plugins.SocketPlugin.tcpSendCmd({
          "timeout": "3000",
          "value": cmd
        }, success, error);
        function success(response) {
          hmsPopup.showShortCenterToast("搜索未连接设备成功");
        }

        function error() {
          hmsPopup.showShortCenterToast("搜索未连接设备失败");
        }
      }


      $scope.over = function (item) {

        var cmd = [
          {
            "ver": 1,           //message protocol version
            "from": {
              "ctype": 0XE3,    //source peer type: 0xF0 Cloud,  0xE5 IOT Module, 0xE4 Box, 0xE3 App
              "uid": window.localStorage.empno   // follow Protocol design guide
            },
            "to": {
              "ctype": 0xE4,       //source peer type: 0xF0 Cloud,  0xE5 IOT Module, 0xE4 Box, 0xE3 App
              "uid": $scope.boxItem.data.act_params.device_id    // follow Protocol design guide
            },
            "ts": Date.parse(new Date()) / 1000,   //timestamp: the number of ms since time 00:00:00 UTC on 1970-01-01
            "idx": 12,          //message index 0 ~ 65535 2Bytes
            "mtype": "rqst",   //follow Protocol design guide
            "data": {
              "device_type": "BLE_DEVICE",   // ALL_DEVICE ,BLE_ DEVICE, ZigBee_DEVICE,RS485_DEVICE
              "act": " QUIT_REQUEST ",
              "act_params": {"device_id": "data"}
            }
          }
        ]
        cordova.plugins.SocketPlugin.tcpSendCmd({
          "timeout": "5000",
          "ip": "255.255.255.255",
          "value": cmd
        }, success, error);
        function success(response) {
        }

        function error() {
          hmsPopup.showShortCenterToast("解绑失败");
        }
      }

      $scope.closebox = function () {
        cordova.plugins.SocketPlugin.tcpClose({
          "timeout": "3000",
          "ip": "255.255.255.255",
          "value": ''
        }, success, error);
        function success(response) {
          hmsPopup.showShortCenterToast("断开box成功");
        }

        function error() {
          hmsPopup.showShortCenterToast("断开box");
        }
      }

    }]);


