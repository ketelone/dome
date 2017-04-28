angular.module('bathroomModule')
  .service('bathroomCmdService',
    ['baseConfig',
      function (baseConfig) {

        var service = {
          getCmd: getCmd,
          operateLighting: operateLighting,
          operateAirCare: operateAirCare,
          operateHeater: operateHeater,
          stopAllOperation: stopAllOperation,
          explainEnvironmentStatus: explainEnvironmentStatus,
          explainAck: explainAck,
          explainHeaterStatus: explainHeaterStatus
        };

        return service;

        /**
         *@autor: caolei
         *@params: arg
         *@return: code
         *@disc: explain ack
         */
        function explainAck(arg){
          var code ;
          if (arg.length>=16 && arg.length<=40) {
            var ackStr = arg.substring(12,arg.length-2);
            var ack = ackStr.substring(0,2).toLowerCase();
            if (ack == 'fa') {
              //valid ack
              var operate = ackStr.substring(0,4);
              code = {'ack':operate};
            }else if(ack == 'fd'){
              //invalid ack package error
              code = {'ack':'1003'};
            }else if (ack =='fc'){
              //invalid ack   data error
              code = {'ack':'1002'};
            }else if (ack == 'fb'){
              //invalid ack mcd refuse
              code = {'ack':'1001'};
            }else if (ack == '8a'){
              code = explainLightingStatus(ackStr);
            }else if (ack == '85') {
              code = explainAirCareStatus(ackStr);
            }else if (ack == '91'){
              code = explainEnvironmentStatus(ackStr);
            }else if (ack == '80') {
              //返回BathRoom的设备状态
              code = explainDeviceStatus(ackStr);
            }else if (ack == '81'){
              //返回BathRoom的错误状态
              code = explainBathRoomErrorStatus(ackStr);
            }else if (ack == '84') {
              //返回BathRoom Heater状态
              code = explainHeaterStatus(ackStr);
            }
          }

          return code;
        }

        //返回BathRoom错误状态 cmd +arg1+ arg2 +arg3
        function explainBathRoomErrorStatus(arg){
          var error = {
            'error':'True',
            'code':arg
          };
          return error;
        }

        //lighting explain 8a/8A
        function explainLightingStatus(arg){
          var lightingState;
          var value = arg.substring(2,arg.length+1);
          if (value == '00') {
            lightingState = {
              'state':'init'
            };
          }else if (value == '01') {
            lightingState = {
              'state':'lighting_off'
            };
          }else if (value == '02') {
            lightingState = {
              'state':'lighting_on'
            };
          }
          return lightingState;
        }

//AIR-CARE STATUS 85 n	当Air-care处于off状态时hour,minute,second均为0
        function explainAirCareStatus(arg){
          var airCareStatus;
          var acsStr,acs,hour,min,sec;
          try{
            acs = arg.substring(2,4);//acs
            hour = arg.substring(4,6);//hour
            min = arg.substring(6,8);//min
            sec = arg.substring(8,10);//second
          }catch(error){
            return;
          }

          //acs status
          if (acs == '00') {
            acsStr = 'init';
          }else if (acs == '01') {
            acsStr = 'Air-care off';
          }else if (acs == '02') {
            acsStr = 'Air-care on'
          }
          //hour status
          if (hour == '00') {
            hourStr = 'init';
          }else if (hour == '01') {
            hourStr = 'Air-care off';
          }else if (hour == '02') {
            hourStr = 'Air-care on'
          }
          airCareStatus = {
            'acs':acsStr,
            'hour':hour,
            'min':min,
            'second':sec
          };
          return airCareStatus;
        }

        /**
         *@autor: caolei
         *@params: arg
         *@return: environment json
         *@disc: get environment's temperature and humidity
         */
        function explainEnvironmentStatus(arg){
          var environment ;
          var temperature,humidity;
          try{
            temperature = arg.substring(2,4);
            humidity = arg.substring(4,6);
          }catch(error){
            return;
          }
          environment = {
            'temperature':temperature,
            'humidity':humidity
          };
          return environment;
        }


        function explainHeaterStatus(arg){
          var heater;
          var status,hour,min,second;
          var statusStr,hourStr,minStr,secStr;
          try{
            status = arg.substring(2,4);
            hour = arg.substring(4,6);
            min = arg.substring(6,8);
            second = arg.substring(8,10);
          }catch(error){
            return;
          }
          if (status == '00') {
            statusStr = 'init';
          }else if (status == '01') {
            statusStr = 'heater_off';//
          }else if (status == '02'){
            statusStr = 'heater';//热风开启
          }else if (status == '03') {
            statusStr = 'fan';//凉风
          }else if (status == '04') {
            statusStr = 'hot_dry';
          }else if (status == '05') {
            statusStr = 'vantilation';
          }else if (status == '06') {
            statusStr = 'low_power';
          }else if (status == '07') {
            statusStr = 'sleep_power';
          }else if (status == '08') {
            statusStr = 'reserved_power';
          }else if (status == '09') {
            statusStr = 'error';
          }else if (status == '0a'||status=='0A') {
            statusStr = 'Diag';
          }else if (status == '0b'|| status =='0B') {
            statusStr = 'Safe Mode ';
          }else if (status =='0c'||status=='0c') {
            statusStr = 'heater finished';
          }else if (status == '0d'||status=='0D') {
            statusStr = 'cool dry';
          }else{
            statusStr = 'reserved';
          }
          heater = {
            'status':statusStr,
            'hour':hour,
            'min':min,
            'second':second
          };
          return heater;
        }

        function explainDeviceStatus(arg){
          var cmd = arg.substring()
        }

        function explainDeviceError(arg){

        }

        function stopAllOperation(){
          var data = '00';
          return data;
        }

        /**
         *@autor: caolei
         *@params: arg
         *@return: data
         *@disc: get bathroom operation data
         */
        function operateHeater(arg){
          var data = '21';
          if (arg.switch == 'OFF'){
            data = data + '00';
          }else if (arg.switch == 'ON'){
            if (arg.type == '01'){
              //暖风 Heater
              data = data + '01' + arg.time_hour + arg.time_min;
            }else if (arg.type == '02'){
              //凉风
              data = data + '02' + arg.time_hour +arg.time_min;
            }else if (arg.type == '03'){
              //热干
              data = data + '03' + arg.time_hour +arg.time_min;
            }else if (arg.type == '04'){
              //换气
              data = data + '04' + arg.time_hour +arg.time_min;
            }else if (arg.type == '05'){
              //冷干
              data = data + '05' + arg.time_hour +arg.time_min;
            }
          }
          return data;
        }

        /*5.设置Heater参数 ——————————————————————TEMP设置暂不作用，温度由Bathroom Heater自行控制。 cmd+mode+temp
         {
         "operate":"SET_HEATER_PARA",
         "temperature":"00~40",
         "mode":"NORMAL/SWING"
         }*/

        function setHeaterPara(arg){
          var data = '03';
          if (arg.mode == 'NORMAL'){
            data = data + '00';
          }else if (arg.mode =='SWING'){
            data = data + '01';
          }
          return data;
        }

        /**
         *@autor: caolei
         *@params: arg
         *@return: data
         *@disc: get air care data
         */
        function operateAirCare(arg){
          var data = '04';
          if (arg.switch == 'ON'){
            data = data + '01' + arg.time_hour + arg.time_min;
          }else if (arg.switch =='OFF'){
            data = data + '00' + '0000';
          }
          return data;
        }

        /**
         *@autor: caolei
         *@params: arg
         *@return: data
         *@disc: get light data
         */
        function operateLighting(arg){
          var data = '27';
          if (arg.switch == 'ON'){
            data = data + '02';
          }else if (arg.switch == 'OFF'){
            data = data + '00';
          }
          return data;
        };

        /**
         *@autor: caolei
         *@params: header, idx, data, ctrId, devId
         *@return: value
         *@disc: get cmd value
         */
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


        function doStr(d) {
          if (d.length % 2 != 0) {
            d = "0" + d;
          }
          return d;
        };

        var d = {
          data:[
            {
              from: {
                cid:"0xE3"
              },
              to:{
                cid:"0xE4",
                device_id:"24A93477"
              },
              ts:1491624061,
              idx:1,
              method:"CTL",
              payload:{
                value:["887706010005270221"],
                cmd:"CMD_REQUEST",
                device_type:"BLE_DEVICE"
              }
            }
          ],
          methodName:"execute",
          deviceId:"SimulatedBox",
          env:"poc"
        }

      }]);
