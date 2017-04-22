angular.module('bathroomModule')
  .service('bathroomCmdService',
    ['baseConfig',
      function (baseConfig) {

        var service = {
          getCmd: getCmd,
          operateLighting: operateLighting
        };

        return service;

        function operateLighting(arg){
          var data = '27';
          if (arg.switch == 'ON'){
            data = data + '02';
          }else if (arg.switch == 'OFF'){
            data = data + '00';
          }
          return data;
        };

        function getCmd(header, idx, data, ctrId, devId) {
          if (data.length % 2 != 0) {
            data = "0" + data;
          }
          var checksum = parseInt(idx, 16) ^ parseInt(ctrId, 16) ^ parseInt(devId, 16);
          for (var i = 0, len = data.length; i < len; i += 2) {
            var hex = data.substring(i, i + 2);
            checksum ^= parseInt(hex, 16);
          }
          var length = data.length / 2 + 4;
          return header + doStr(length)
            + doStr(idx)
            + doStr(ctrId)
            + doStr(devId)
            + data
            + doStr(checksum.toString(16));
        };

        /**
         * 十六进制补0
         * @param {*字符} d
         */
        function doStr(d) {
          if (d.length % 2 != 0) {
            d = "0" + d;
          }
          return d;
        };

        var d = {
          "data":[
            {
              "from": {
                "cid":"0xE3"
              },
              "to":{
                "cid":"0xE4",
                "device_id":"24A93477"
              },
              "ts":1491624061,
              "idx":1,
              "method":"CTL",
              "payload":{
                "value":["887706010005270221"],
                "cmd":"CMD_REQUEST",
                "device_type":"BLE_DEVICE"
              }
            }
          ],
          "methodName":"execute",
          "deviceId":"SimulatedBox",
          "env":"poc"}

      }]);
