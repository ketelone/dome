/**
 * Created by daidongdong on 2017/4/28.
 */

angular.module('utilModule')
  .service('cmdService',
    ['baseConfig',
      function (baseConfig) {

        this.cloudCmd = function (deviceId, value) {
          var paramter = {
            "ver": 1,
            "from": {
              "ctype": 240,
              "uid": deviceId
            },
            "to": {
              "ctype": 229,
              "uid": "hand-residential"
            },
            "ts": Date.parse(new Date()) / 1000,
            "idx": 1,
            "mtype": "ctl",
            "data": {
              "cmd": [value]
            }
          };
          return paramter;
        };

        this.sendCmd = function (deviceId, value, boxId) {
          var cmd = {
            from: {
              cid: "0xE3",
            },
            idx: 1,
            method: "CTL",
            payload: {
              cmd: "CMD_REQUEST",
              "device_type": "BLE_DEVICE",
              value: [value],
            },
            to: {
              cid: "0xE4",
              "device_id": deviceId,
            },
            ts: Date.parse(new Date()) / 1000,
            ver: 1
          }
          cordova.plugins.SocketPlugin.tcpSendCmd({
            "timeout": "5000",
            "value": cmd,
            "ip": boxId
          }, success, error);
          function success(response) {
          }

          function error() {
          }
        };


      }]);
