angular.module('bathroomModule')
  .service('bathroomService',
    ['baseConfig',
      function (baseConfig) {

        var service = {
          getCmd: getCmd,
          getCmdCloud: getCmdCloud
        };

        return service;

        /**
         *@autor: caolei
         *@params: value, deviceId
         *@return: cmd json
         *@disc: get cloud cmd json
         */
        function getCmdCloud(value, deviceId){
          var cmd = {
            data:[
              {
                from: {
                  cid:"0xE3"
                },
                to:{
                  cid:"0xE4",
                  device_id: deviceId
                },
                ts:1491624061,
                idx:1,
                method:"CTL",
                payload:{
                  value:[value],
                  cmd:"CMD_REQUEST",
                  device_type:"BLE_DEVICE"
                }
              }
            ],
            methodName:"execute",
            deviceId:"SimulatedBox",
            env:"poc"
          }

          return cmd;
        }

        /**
         *@autor: caolei
         *@params: value, deviceId
         *@return: cmd json
         *@disc: get cmd json
         */
        function getCmd(value, deviceId) {
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
            ts: "1492146861.217451",
            ver: 1,
          };

          return cmd;
        };

      }]);
