angular.module('bathroomModule')
  .service('bathroomService',
    ['baseConfig',
      function (baseConfig) {

        var service = {
          getCmd: getCmd
        };

        return service;

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
