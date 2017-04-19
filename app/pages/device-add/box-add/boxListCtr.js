/**
 * Created by daidongdong on 2017/4/14.
 */
angular.module('deviceAddModule')
  .controller('boxListCtrl', [
    '$scope',
    '$state',
    'publicMethod', '$ionicModal', '$ionicPopover', '$timeout', '$ionicHistory', 'hmsHttp', 'hmsPopup',
    function ($scope, $state, publicMethod, $ionicModal, $ionicPopover, $timeout, $ionicHistory, hmsHttp, hmsPopup) {
      $scope.goBack = function () {
        $ionicHistory.goBack();
      }



      //寻找box
      $scope.selectBox = function () {
        // hmsPopup.showLoading('<span translate="alertMsg.loading"></span>');
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
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast("广播失败" + error);
        }
      }

//连接box
      $scope.boxClick = function (item) {
        localStorage.box =item;
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
    }]);


