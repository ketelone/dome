/**
 * Created by  on
 */
angular.module('karessControlModule')
  .service('karessService',
    ['baseConfig',
      function (baseConfig) {

        this.data = {
          closeAll: "00",
          openFiller: "2201",
          closeFiller: "2200",
          closeMassageBack: "2100",
          openMassageBack: "2101",
          closeMassagePillow: "2300",
          openMassagePillow: "2301",
          openSanitize: "2401",
          closeSanitize: "2400",
          openHeatBack: "2701",
          closeHeatBack: "2700",
          openDrain: "2501",
          closeDrain: "2500",
          quitSaveMode: "32", //退出节能模式
          _paramMassageBack: {
            flow: {
              LOW: "10",
              HIGH: "50",
              RESERVED: "00"
            },
            mode: {
              NORMAL: "00"
            }
          },
          _paramFiller: {
            flow: {
              LOW: "1",
              LOW_MID: "2",
              MID: "0011",
              MID_HIGH: "4",
              HIGH: "5"
            },
            outlet: {
              BATH_FAUCET: "13",
              HANDSHOWER: "23",
            }
          },
          _paramHeadBack: {
            temp: {
              LOW: "00",
              HIGH: "01"
            }
          },
          _paramPowerSaveMode: {
            _header: "31",
            LOW_POWER: "01",
            SLEEP: "02",
            POWER_OFF: "03"
          },
          _requestStatusType:{
            _header:"72",  //请求status 命令 的 data 头一个字节命令字
            WATER_TEMPERATURE_STATUS:"1A",
            WATER_LEVEL_STATUS:"1B",
            FILLER_STATUS:"0A",
            HEAT_BACK_STATUS:"09",
            DRAIN_STATUS:"08",
            SANTIZE_STATUS:"07",
            MASSAGE_BACK_STATUS:"04",
            MASSAGE_PILLOW_STATUS:"03",
            ERROR_STATUS:"01",
            DEVICE_STATUS:"00"
          },
          _returnCmdType: {
            DEVICE_STATUS:{
              CODE:"80",
              Initialize:"0",
              Work:"1",
              Diagnostic:"7",
              Aging:"9"
            },
            ERROR_STATUS:{
              NO_ERROR:"0",
              ERROR_OCCURRED:"1"
            },
            MASSAGE_PILLOW_STATUS:{
              CODE:"83",
              Init:"0",
              Idle:"1",
              Run_Massage_Pillow:"2",
              Diagnostic:"B"
            },
            MASSAGE_BACK_STATUS:{
              CODE:"84",
            },
            SANTIZE_STATUS:{
              CODE:"87",
              open:"01", //TODO
              close:"10", //TODO
            },
            DRAIN_STATUS:{
              CODE:"88",
              Init:"0",
              DrainOpen:"1", //TODO
              DrainClose:"2", //TODO
              PowerSave:"" //TODO
            },
            HEAT_BACK_STATUS:{
              CODE:"89",
              Init:"0",
              Idle:"1",
              Run:"2",
              Diagostic:"A"
            },
            FILLER_STATUS:{
              CODE:"8A",
              Stop:"00",
              Start:"01"
            },
            WATER_TEMPERATURE_STATUS:{
              CODE:"A6"
            },
            WATER_LEVEL_STATUS:{
              CODE:"A7"
            }
          }
        };

        /**
         * 设置背部加热(massage-back)的按摩水压
         *
         */
        this.setHeatParam = function(temp) {
          return "07" + temp;
        };


        /**
         * 设置水力按摩参数
         *
         */
        this.setMassageBackPressure = function(flow, mode) {
          return "01" + flow  + mode;
        };

        /**
         * 设置注水(filler)的参数
         * temp: 0-100
         * level 0 - 100
         * flow: _data._paramFiller.flow.*
         * outlet _data._paramFiller.outlet.*
         */
        this.setFillerParams = function(temp, level, outlet) {
          var t = doStr(temp.toString(16));
          var l = doStr(level.toString(16));
          return "02" + t + l + outlet;
        };

        this.enterPowerSaveMode = function(mode) {
          return this.data._paramPowerSaveMode._header + mode;
        };

        /**
         * requestStatusType
         * _data._requestStatusType.*
         */
        this.requestStatus = function(requestStatusType){
          return this.data._requestStatusType._header+requestStatusType;
        }

        /**
         * 解析返回的json数据
         * 传入cmd字段，传出json数据
         */
        this.resolveCmd = function(cmd) {
          var cmdLen = cmd.length;
          var idx = cmd.substring(6, 8);
          var devId = cmd.substring(10, 12);
          var data = cmd.substring(12, cmdLen - 2);
          if (devId == "02") {
            var code = data.substring(0, 2).toUpperCase();
            var out = {
              devId:"02",
              type:code,
              error:0,
              value:{}
            };
            var type = this.data._returnCmdType;
            console.log(data+"====");
            switch(code){
              //返回设备状态
              case type.DEVICE_STATUS.CODE:
                var valStatus = {status:""};
                out.error = data[2];
                valStatus.status = data[3];
                out.value = valStatus;
                break;
              //返回按摩枕状态
              case type.MASSAGE_PILLOW_STATUS.CODE:
                var valStatus = {status:""};
                valStatus.status = data[3];
                out.value = valStatus;
                break;
              //返回水位。 百分比
              case type.WATER_LEVEL_STATUS.CODE:
                var valStatus = {
                  waterLevel:parseInt(data.substring(2,4),16)
                };
                out.value = valStatus;
                break;
              //返回背部加热状态
              case type.HEAT_BACK_STATUS.CODE:
                var valStatus = {status:""};
                valStatus.status = data[3];
                out.value = valStatus;
                break;
              //返回水温
              case type.WATER_TEMPERATURE_STATUS.CODE:
                var valStatus = {temperature:parseInt(data.substring(2,4),16)}; //水温 十进制返回
                out.value = valStatus;
                break;
              case type.FILLER_STATUS.CODE:
                var valStatus = {status:data.substring(2,4)}; // 返回
                out.value = valStatus;
                break;
              case type.DRAIN_STATUS.CODE:
                var valStatus = {status:data.substring(2,4)}; // 返回
                out.value = valStatus;
                break;
              case type.SANTIZE_STATUS.CODE:
                var valStatus = {status:data.substring(2,4)}; // 返回
                out.value = valStatus;
                break;
              case type.MASSAGE_BACK_STATUS.CODE:
                var valStatus = {status:data.substring(2,4)}; // 返回
                out.value = valStatus;
                break;
            }
          }
          return out;
        };


        this.getHex = function(bin) {
          var hex = "";
          console.log(bin + "  " + bin.length)
          for (var i = 0; i < bin.length; i += 4) {
            var h = bin.substring(i, i + 4);
            hex += parseInt(h, 2).toString(16).toUpperCase();
          }
          return hex;
        }


        /**
         * 十六进制补0
         * @param {*字符} d
         */
        this.doStr = function(d) {
          if (d.length % 2 != 0) {
            d = "0" + d;
          }
          return d;
        }

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
            }else{
              code = {'ack': 'status'};
            }
          }
          return code;
        }

      }]);
