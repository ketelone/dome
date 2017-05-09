angular.module('airfoilShowerModule')
  .service('airfoilShowerService',
    ['baseConfig',
      function (baseConfig) {

        var service = {
          getCmdValue: getCmdValue,
          getCmdJsonStr: getCmdJsonStr,
          setShowerPara: setShowerPara,
          explainAck: explainAck,
          operateShower: operateShower,
          getWaterTemperature: getWaterTemperature,
          stopAll: stopAll,
          getAirfoilStatus: getAirfoilStatus
        };

        return service;

        /**
         *@autor: caolei
         *@params: arg json object
         *@return: data
         *@disc: set shower water parameters
         */
        function setShowerPara(arg){
          var data = '01';
          if (arg.out == 'HRS') {
            data = data + arg.temperature + '01' + 'FF';
          }else if (arg.out == 'HS') {
            data = data + arg.temperature + '02' + 'FF';
          }else if (arg.out == 'SP') {
            data = data + arg.temperature + '04' + 'FF';
          }else if (arg.out == 'HDS') {
            data = data + arg.temperature + '08' + 'FF';
          }
          return data;
        }

        /**
         *@autor: caolei
         *@params: arg json object
         *@return: data
         *@disc: operate shower start or stop
         */
        function operateShower(arg){
          var data = '21';
          data = data + arg.mode;
          return data;
        }

        /**
         *@autor: caolei
         *@return: data
         *@disc: stop data
         */
        function stopAll(){
          var data = '00';
          return data;
        }

        /**
         *@autor: caolei
         *@return: data
         *@disc: get current water temperature
         */
        function getWaterTemperature(){
          var data = '721A';
          return data;
        }

        /**
         *@autor: caolei
         *@params: arg json object
         *@return: code
         *@disc: explain arg
         */
        function explainAck(arg){
          var code ;
          if (arg.length>=16) {
            var ackStr = arg.substring(12,arg.length-2);
            var ack = ackStr.substring(0,2).toLowerCase();
            if (ack == 'fa') {
              //valid ack
              var operate = ackStr.substring(0,4);
              code = {'ack':operate};
            }else if(ack == 'fd'){
              //invalid ack
              code = {'ack':'1003'};
            }else if (ack =='fc'){
              //invalid ack
              code = {'ack':'1002'};
            }else if (ack == 'fb'){
              //invalid ack
              code = {'ack':'1001'};
            }else if (ack == '83'){
              code = explainShowerStatus(ackStr);
            }else if (ack == 'a6'||ack == 'A6') {
              code = explainWaterTemperature(ackStr);
            }else if (ack == '91'){
              code = explainEnvironmentStatus(ackStr);
            }else if (ack == '81') {
              //返回设备错误状态
              code = explainDeviceError(ackStr);
            }else if (ack == 'b0') {
              code = explainMemory(ackStr);
            }
          }

          return code;
        }

//5.返回shower的状态 83
        function explainShowerStatus(arg){
          var cmdStr = arg;
          var status,showerStatus;
          try{
            status = cmdStr.subString(2,4);
          }catch(error){
            return;
          }
          if (status == '00') {
            showerStatus = {'status':'init'};
          }else if (status == '01') {
            showerStatus = {'status':'shower off'};
          }else if (status == '02') {
            showerStatus = {'status':'shower on'};
          }else if (status == '03') {
            showerStatus = {'status':'run reserved'};
          }else if (status == '04') {
            showerStatus = {'status':'run reserved'};
          }else if (status == '05') {
            showerStatus = {'status':'run reserved'};
          }else if (status == '06') {
            showerStatus = {'status':'low save'};
          }else if (status == '07') {
            showerStatus = {'status':'sleep'};
          }else if (status == '08') {
            showerStatus = {'status':'power off'};
          }else if (status == '09') {
            showerStatus = {'status':'error'};
          }else if (status == '0a'||status=='0A') {
            showerStatus = {'status':'diag'};
          }else if (status == '0b'||status=='0B') {
            showerStatus = {'status':'safe mode'};
          }else {
            showerStatus = {'status':'reserved'};
          }
          showerStatus['cmd'] = '83';
          return showerStatus;
        }

        function explainWaterTemperature(arg){
          var cmdStr = arg;
          var temperature;
          if (cmdStr.length>=4) {
            try{
              temperature = cmdStr.subString(2,4);
            }catch(error){
              return;
            }
          }
          return {'temperature':temperature};
        }

        function explainDeviceError(arg){
          return arg;
        }

        function explainMemory(arg){
          return arg;
        }

        function getAirfoilStatus(){
          return "7203";
        }


        /**
         *@autor: caolei
         *@params: value, deviceId
         *@return: cmd json
         *@disc: get cmd json
         */
        function getCmdJsonStr(value, deviceId){
          var cmd = {
            from: {
              cid: "0xE3"
            },
            idx: 1,
            method: "CTL",
            payload: {
              cmd: "CMD_REQUEST",
              "device_type": "BLE_DEVICE",
              value: [value]
            },
            to: {
              cid: "0xE4",
              "device_id": deviceId
            },
            ts: "1492146861.217451",
            ver: 1
          };

          return cmd;
        };

        function getCmdValue(header, idx, data, ctrId, devId) {
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

        function doStr(d) {
          if (d.length % 2 != 0) {
            d = "0" + d;
          }
          return d;
        };

      }]);
