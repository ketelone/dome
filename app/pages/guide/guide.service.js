/**
 * Created by gusenlin on 16/9/21.
 */
angular.module('loginModule')
  .service('guideService',
    ['baseConfig',
      function (baseConfig) {
        var screenSize = {}
        this.setScreenSize = function (result) {
          screenSize = result;
        };

        this.getScreenSize = function () {
          return screenSize;
        }
      }]);
