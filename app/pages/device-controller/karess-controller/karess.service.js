/**
 * Created by gusenlin on 16/9/21.
 */
angular.module('karessControlModule')
  .service('karessService',
    ['baseConfig',
      function (baseConfig) {
        var screenSize = {}
        /**
         *@autor:daidongdong
         *@name:
         *@params:
         *@return:
         *@disc:panduan kraess shifou anzhuang chajian
         */
        var cmdChajian = {}
        this.chajian = function (result) {
          screenSize = result;
        };

        this.chajian = function () {
          return screenSize;
        }
      }]);
