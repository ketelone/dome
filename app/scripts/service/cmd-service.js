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
        this.explainAck = function (arg) {
          var code;
          if (arg.length >= 16 && arg.length <= 40) {
            var ackStr = arg.substring(12, arg.length - 2);
            var ack = ackStr.substring(0, 2).toLowerCase();
            if (ack == 'fa') {
              //valid ack
              var operate = ackStr.substring(0, 4).toLowerCase();
              code = {'ack': operate};
            } else if (ack == 'fd') {
              //invalid ack
              code = {'ack': '1003'};
            } else if (ack == 'fc') {
              //invalid ack
              code = {'ack': '1002'};
            } else if (ack == 'fb') {
              //invalid ack
              code = {'ack': '1001'};
            }
          }
          return code;
        }
        /**
         * 返回cmd字段命令
         * @param {*} header 头 16进制
         * @param {*} idx 索引 16进制
         * @param {*} data 数据段 16进制
         * @param {*} ctrId 控制段 16进制
         * @param {*} devId 设备段 16进制
         */
        this.getCmd = function(header, idx, data, ctrId, devId) {
          if (data.length % 2 != 0) {
            data = "0" + data;
          }
          var checksum = parseInt(idx, 16) ^ parseInt(ctrId, 16) ^ parseInt(devId, 16);
          for (var i = 0, len = data.length; i < len; i += 2) {
            var hex = data.substring(i, i + 2);
            checksum ^= parseInt(hex, 16);
          }
          var length = data.length / 2 + 4;
          return header + doStr(length) + doStr(idx) + doStr(ctrId) + doStr(devId) + data + doStr(checksum.toString(16));
        }

      }]);
