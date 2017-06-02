//Next gen shower
angular.module('nextgenModule')
  .service('nextgenService',
    ['baseConfig', 'hmsPopup',
      function (baseConfig, hmsPopup) {

        var service = {
          setShowerPara: setShowerPara,
          operateShower: operateShower,
          enterPowerSave: enterPowerSave,
          exitPowerSave: exitPowerSave,
          stopAll: stopAll,
          readMemory: readMemory,
          explainAck: explainAck,
          explainShowerStatus: explainShowerStatus,
          explainWaterTemperature: explainWaterTemperature,
          explainDeviceError: explainDeviceError,
          explainMemory: explainMemory,
          explainSystemState: explainSystemState,
          getCmd: getCmd,
          sendCmd: sendCmd,
          getDeviceStatus:getDeviceStatus
        };

        return service;

        /*设置出水参数 cmd + arg1 + arg2 + arg3
         var argment =  {
         'unit':'0-100',    //这个最好传16进制的字符串 比如0 ->00 100->64
         'out':'HRS',			  //这个参数是个枚举字符串 HRS，HS，SP，HDS 分别表示 头顶花洒，头顶摇摆，spout，手持花洒，

         }*/
        function setShowerPara(arg) {
          var data = '01';
          if (arg.out == 'HRS') {
            data = data + arg.temperature + '01' + 'FF';
          } else if (arg.out == 'HS') {
            data = data + arg.temperature + '02' + 'FF';
          } else if (arg.out == 'SP') {
            data = data + arg.temperature + '04' + 'FF';
          } else if (arg.out == 'HDS') {
            data = data + arg.temperature + '08' + 'FF';
          }
          return data;
        }

        /*2.开启或停止shower出水
         var argment = {
         'mode':'00-02'    //00表示stop，01表示Start continuous outlet 02表示Start evacuate cold water (turn on, and off when reach 37 degree,Start evacuate cold water 如果5分钟后水温仍达不到37度则自动停止) ,other表示内置设定

         }参数样式*/
        function operateShower(arg) {
          var data = '21';
          data = data + arg.mode;
          return data;
        }

        /*3.进入节能状态 	相关作业未停止，不能进入节能状态。
         var argment = {
         'mode':'01-03' //01表示低电量，02表示休眠，03表示断电
         }*/
        function enterPowerSave() {
          var data = '31';
          data = data + arg.mode;
          return data;
        }

//4.退出节能模式 退出节能状态，回复到RUN状态。	无论从何种POWER SAVE状态退出，均回复RUN状态。
        function exitPowerSave() {
          var data = '32';
          return data;
        }

//5.一键停止
        function stopAll() {
          var data = '00';
          return data;
        }

//6.读取Memory设置
        function readMemory() {
          var data = '79';
          return data;
        }

        //7.获取shower状态
        function getDeviceStatus() {
          var data = '7203';
          return data;
        }

//8.获取设备温度
        function getDeviceTemperature() {
          var data = '721a';
          return data;
        }

//9.返回系统本体状态
        function getSystemStatus(arg) {
          var data = '7200';
          return data;
        }


//arg 这里 8877-----
        function explainAck(arg) {
          var code;
          if (arg.length >= 16) {
            var ackStr = arg.substring(12, arg.length - 2).toLowerCase();
            var ack = ackStr.substring(0, 2).toLowerCase();
            if (ack == 'fa') {
              //valid ack
              var operate = ackStr.substring(0, 4).toLowerCase();
              code = {'ack': operate};
            } else if (ack == 'fd') {
              //invalid ack
              code = {'ack': 'fd'};
            } else if (ack == 'fc') {
              //invalid ack
              code = {'ack': 'fd'};
            } else if (ack == 'fb') {
              //invalid ack
              code = {'ack': 'fb'};//cmd refuse
            } else if (ack == '83') {
              code = explainShowerStatus(ackStr);
            } else if (ack == 'a6' || ack == 'A6') {
              code = explainWaterTemperature(ackStr);
            } else if (ack == '91') {
              code = explainEnvironmentStatus(ackStr);
            } else if (ack == '80') {
              code = explainSystemState(ackStr);
            } else if (ack == '81') {
              //返回设备错误状态
              code = explainDeviceError(ackStr);
            } else if (ack == 'b0') {
              code = explainMemory(ackStr);
            }
          }

          return code;
        }


//7.返回shower的状态 83
        function explainShowerStatus(arg) {
          var cmdStr = arg;
          var status, showerStatus;
          try {
            status = cmdStr.substring(2, 4);
          } catch (error) {
            return;
          }
          if (status == '00') {
            showerStatus = {'status': 'init'};
          } else if (status == '01') {
            showerStatus = {'status': 'shower off'};
          } else if (status == '02') {
            showerStatus = {'status': 'shower on'};
          } else if (status == '03') {
            showerStatus = {'status': 'run reserved'};
          } else if (status == '04') {
            showerStatus = {'status': 'run reserved'};
          } else if (status == '05') {
            showerStatus = {'status': 'run reserved'};
          } else if (status == '06') {
            showerStatus = {'status': 'low save'};
          } else if (status == '07') {
            showerStatus = {'status': 'sleep'};
          } else if (status == '08') {
            showerStatus = {'status': 'power off'};
          } else if (status == '09') {
            showerStatus = {'status': 'error'};
          } else if (status == '0a' || status == '0A') {
            showerStatus = {'status': 'diag'};
          } else if (status == '0b' || status == '0B') {
            showerStatus = {'status': 'safe mode'};
          } else {
            showerStatus = {'status': 'reserved'};
          }
          showerStatus['cmd'] = '83';
          return showerStatus;
        }

//8.返回当前水温（A6）	用于当应答STATUS26 REQ 	当排空冷水完成时，推送STATUS26 返回的温度都是16进制数
        function explainWaterTemperature(arg) {
          var cmdStr = arg;
          var temperature, dict;
          if (cmdStr.length >= 4) {
            try {
              temperature = cmdStr.subString(2, 4);
            } catch (error) {
              return;
            }
          }
          dict = {
            'cmd': 'a6',
            'temperature': temperature
          };
          return dict;
        }

//9.返回设备错误状态
        function explainDeviceError(arg) {
          var dict = {
            'cmd': '81',
            'error': arg
          };
          return arg;
        }

//10.返回设备Memory设置 B0
        function explainMemory(arg) {
          var dict = {
            'cmd': 'b0',
            'setting': arg
          };
          return dict;
        }

//9.返回系统本体状态 80
        function explainSystemState(arg){
          var dict;
          var state = arg.subString(2,4);
          if (state == '00') {
            dict = {'state':'init'};
          }else if (state == '01') {
            dict = {'state':'run'};
          }else if (state == '02') {
            dict = {'state'	:'low power'};
          }else if(state == '03'){
            dict = {'state':'sleep power'};
          }else if (state == '04') {
            dict = {'state':'power off'};
          }else if (state == '05'||state=='06'||state =='08') {
            dict = {'state':'reserved'};
          }else if (state == '07') {
            dict = {'state':'diagnostic'};
          }else if (state >='10' && state<='1e') {
            dict = {'state':'error'};
          }
          dict["cmd"] = '80';
          return dict;
        }

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


        function sendCmd(deviceId, value, successMsg, errorMsg) {

          if (baseConfig.deviceFlag == false) {
            return;
          }
          var cmd = getCmd(value, deviceId);
          alert("cmd:" + JSON.stringify(cmd));
          cordova.plugins.SocketPlugin.tcpSendCmd({
            "timeout": "2000",
            "value": cmd,
            "ip": localStorage.boxIp
          }, success, error);
          function success(response) {
            //hmsPopup.showShortCenterToast(successMsg);
          }

          function error() {
            //  hmsPopup.showShortCenterToast(errorMsg);
          }
        }

      }]);
