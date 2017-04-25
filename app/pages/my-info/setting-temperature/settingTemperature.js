/**
 * Created by chenjiacheng on 2017/3/28.
 */
angular.module('myInfoModule')

  .controller('settingTemperatureCtrl', [
    '$scope',
    '$state',
    'baseConfig',
    '$ionicLoading',
    '$http',
    '$timeout',
    '$ionicHistory',
    '$ionicPlatform',
    '$ionicScrollDelegate',
    'hmsPopup',
    '$rootScope',
    'publicMethod',
    'SettingsService',
    function ($scope,
              $state,
              baseConfig,
              $ionicLoading,
              $http,
              $timeout,
              $ionicHistory,
              $ionicPlatform,
              $ionicScrollDelegate,
              hmsPopup,
              $rootScope, publicMethod,SettingsService) {

      var radioImg1="build/img/common/radio_q.png";
      var radioImg2="build/img/common/radio_h.png";
      var radioTemp="build/img/common/radio_q.png";

      $scope.unitItems = [{
        
        ischecked1: false,
        ischecked2: false,
        unitValue1:"摄氏度",
        unitValue2:"华氏度"
      }, {
        ischecked1: false,
        ischecked2: false,
        unitValue1:"摄氏度",
        unitValue2:"华氏度"
   },
        {
          ischecked1: false,
          ischecked2: false,
          unitValue1:"摄氏度",
          unitValue2:"华氏度"  },
      ];







      /**
       *@autor:chenjiacheng
       *@name:chooseLanguage
       *@params:
       *@return:
       *@disc:Select temperature
       */
      //$scope.chooseTemperature=function(e){
      //
      //  if($(e.target).text().trim()=="摄氏度°C"){
      //  //  SettingsService.set("temperature","摄氏度°C");
      //    window.localStorage.temperature="°C";
      //   // publicMethod.goBack();
      //
      //  }
      //  if($(e.target).text().trim()=="centigrade"){
      // //   SettingsService.set("temperature","centigrade");
      //    window.localStorage.temperature="°C";
      //  //  publicMethod.goBack();
      //
      //  }
      //  if($(e.target).text().trim()=="华氏度°F"){
      // //   SettingsService.set("temperature","华氏度°F");
      //    window.localStorage.temperature="°F";
      //  // publicMethod.goBack();
      //
      //
      //  }  if($(e.target).text().trim()=="fahrenheit"){
      // //   SettingsService.set("temperature","fahrenheit");
      //    window.localStorage.temperature="°F";
      //   // publicMethod.goBack();
      //
      //
      //  }
      //
      //}



    }]);
