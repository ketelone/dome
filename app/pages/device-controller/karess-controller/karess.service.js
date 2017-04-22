/**
 * Created by gusenlin on 16/9/21.
 */
angular.module('karessControlModule')
  .service('karessService',
    ['baseConfig',
      function (baseConfig) {

        function Karess() {
        };
        Karess.prototype._data = {
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
          _paramMassageBack: {
            flow: {
              LOW: "1",
              HIGH: "5",
              RESERVED: "0"
            },
            mode: {
              NORMAL: "0"
            }
          },
          _paramFiller: {
            flow: {
              LOW: "1",
              LOW_MID: "2",
              MID: "3",
              MID_HIGH: "4",
              HIGH: "5"
            },
            outlet: {
              BATH_FAUCET: "1",
              HANDSHOWER: "2",
            }
          },
          _paramHeadBack: {
            temp: {
              LOW: "00",
              HIGH: "01"
            }
          }
        };

        /**
         * 设置水力按摩(massage-back)的按摩水压
         * HIGH，LOW
         */
        Karess.prototype.setHeatParam = function (temp) {
          return "07" + temp;
        };

        /**
         * 设置背部加热参数
         * HIGH，LOW
         */
        Karess.prototype.setMassageBackPressure = function (flow, mode) {
          return "01" + flow + "00" + mode;
        };

        /**
         * 设置注水(filler)的参数
         * temp: 0-100
         * level 0 - 100
         * flow: _data._paramFiller.flow.*
         * outlet _data._paramFiller.outlet.*
         */
        Karess.prototype.setFillerParams = function (temp, level, flow, outlet) {
          var t = doStr(temp.toString(16));
          var l = doStr(level.toString(16));
          return "02" + t + l + outlet + flow;
        };


        function getHex(bin) {
          var hex = "";
          console.log(bin + "  " + bin.length)
          for (var i = 0; i < bin.length; i += 4) {
            var h = bin.substring(i, i + 4);
            hex += parseInt(h, 2).toString(16).toUpperCase();
          }
          return hex;
        }


        /**
         * 返回cmd字段命令
         * @param {*} header 头 16进制
         * @param {*} idx 索引 16进制
         * @param {*} data 数据段 16进制
         * @param {*} ctrId 控制段 16进制
         * @param {*} devId 设备段 16进制
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
          return header + doStr(length) + doStr(idx) + doStr(ctrId) + doStr(devId) + data + doStr(checksum.toString(16));
        }

        /**
         * 十六进制补0
         * @param {*字符} d
         */
        function doStr(d) {
          if (d.length % 2 != 0) {
            d = "0" + d;
          }
          return d;
        }


        /**
         * 测试
         */

        var k = new Karess();
        var allData = k._data.closeFiller;
        console.log(getCmd("8877", 1, allData, 0, 5));  //关闭所有

        var setFiller = k.setFillerParams(50, 50, k._data._paramFiller.flow.HIGH, k._data._paramFiller.outlet.BATH_FAUCET);
        console.log(getCmd("8877", 1, setFiller, 0, 5));

        var setHeatBack = k.setHeatParam(k._data._paramHeadBack.temp.HIGH);
        console.log(getCmd("8877", 1, setHeatBack, 0, 5));

        var setHeatBack = k.setMassageBackPressure(k._data._paramMassageBack.flow.HIGH, k._data._paramMassageBack.mode.NORMAL);
        console.log(getCmd("8877", 1, setHeatBack, 0, 5));
      }]);
