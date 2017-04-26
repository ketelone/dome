/**
 * Created by gusenlin on 16/9/21.
 */
angular.module('mcControlModule')
  .service('mcService',
    ['baseConfig',
      function (baseConfig) {
        this.data = {
          closeAll:"00",
          closeLight:"2800",
          openLight:"2801",
          openDemist:"2601", //打开除雾
          closeDemist:"2600", //关闭除雾
          paramSaveMode:{
            _header:"31",
            Low_Power:"01",
            Sleep:"02",
            Power_Off:"03"
          },
          quitSaveMode:"32",//退出节能模式
          paramLight:{
            _header:"08",
            luminance:{
              L_30:"1E",
              L_50:"32",
              L_100:"64"
            },
            color:{
              C_27K:"1B",
              C_40K:"28",
              C_65K:"41"
            }
          }
        }


        /**
         * mode:
         * this.data.paramSaveMode.Low_Power
         * this.data.paramSaveMode.Sleep
         * this.data.paramSaveMode.Power_Off
         *
         * If you want to quit save mode,please use 'this.data.quitSaveMode' to
         * get data.
         */
        this.enterSaveMode = function(mode){
          return paramSaveMode._header+mode;
        }

        /**
         * luminance 亮度 :
         * data.paramLight.luminance.L_30
         * data.paramLight.luminance.L_50
         * data.paramLight.luminance.L_100
         *
         * color 色温 :
         * data.paramLight.color.C_27K
         * data.paramLight.color.C_40K
         * data.paramLight.color.C_65K
         *
         */
        this.setLightParam = function(luminance,color){
          var l = this.data.paramLight;
          return l._header+luminance+color+"000000";
        }
        this.getCmd=function(header, idx, data, ctrId, devId) {
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

        console.log(this.setLightParam(this.data.paramLight.luminance.L_30,this.data.paramLight.color.C_40K))
      }]);
