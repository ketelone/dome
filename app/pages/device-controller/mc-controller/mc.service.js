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
          },
          _requestStatusType:{
            _header:"72",  //请求status 命令 的 data 头一个字节命令字
            ALL:"70", //请求所有状态，不用加_header
            SYSTEM_STATE:"00", //系统本体状态
            ERROR_STATE:"01", //错误状态
            DEMIST_STATUS:"06",//除雾状态
            DETECT_STATUS:"09", //返回人体感应检测状态
            LIGHTING_STATUS:"0A",  //返回lighting状态
            DAILY_POWER_CONSUMPTION:"21" //返回当日电消耗量
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


        /**
         * 请求特定状态
         * requestStatusType:
         * this._data._requestStatusType.*
         */
        this.requestStatus = function(requestStatusType){
          var defType = this._data._requestStatusType;
          if(requestStatusType == defType.ALL ){
            return requestStatusType;
          }else{
            return defType._header+requestStatusType;
          }
        }


      }]);
