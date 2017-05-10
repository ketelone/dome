angular.module('airfoilShowerModule')
  .service('airfoilShowerService',
    ['baseConfig',
      function (baseConfig) {

        var service = {
          getCmdValue: getCmdValue,
          getCmdJsonStr: getCmdJsonStr,
          explainAck: explainAck,
          getWaterTemperature: getWaterTemperature,
          getAllStatus: getAllStatus
        };

        return service;


//7.获取当前水温
        function getWaterTemperature(){
          var data = '721A';
          return data;
        }
//8.获取设备状态
        function getDeviceStatus(){
          return '7203';
        }

        function getAllStatus(){
          return '70';
        }

//arg 这里 8877-----
        function explainAck(arg){
          var code ;
          if (arg.length>=16) {
            var ackStr = arg.substring(12,arg.length-2).toLowerCase();
            var ack = ackStr.substring(0,2);
            if (ack == 'fa') {
              //valid ack
              var operate = ackStr.substring(0,4).toLowerCase();
              code = {'ack':operate};
            }else if(ack == 'fd'){
              //invalid ack
              code = {'ack':'1003'};
            }else if (ack =='fc'){
              //invalid ack
              code = {'ack':'1002'};
            }else if (ack == 'fb'){
              //invalid ack
              code = {'ack':'1001'}; //cmd refuse
            }else if (ack == '83'){
              code = explainShowerStatus(ackStr);
            }else if (ack == 'a6'||ack == 'A6') {
              code = explainWaterTemperature(ackStr);
            }
          }

          return code;
        }

//5.返回shower的状态 83
        function explainShowerStatus(arg){
          var cmdStr = arg;
          var status,showerStatus;
          try{
            status = cmdStr.substring(2,4);
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
          showerStatus["cmd"] = '83';
          return showerStatus;
        }

//6.返回当前水温（A6）	用于当应答STATUS26 REQ n	当排空冷水完成时，推送STATUS26 返回的温度都是16进制数 （两个水温 前面是一个是目标水温  后面是当前水温）
        function explainWaterTemperature(arg){
          var cmdStr = arg;
          var ctemperature,stemperature,dict;
          if (cmdStr.length>=6) {
            try{
              ctemperature = cmdStr.substring(4,6)
              stemperature = cmdStr.substring(2,4);
            }catch(error){
              return;
            }
          }
          dict = {
            'cmd':'a6',
            'ctemperature':ctemperature,
            'stemerature':stemperature
          };
          return dict;
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
