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
alert("OK");
      var   radioImg3="build/img/common/radio_h.png";
      var   radioTemp="build/img/common/radio_q.png";
      $scope.goBack = function(){
        $ionicHistory.goBack();
      }
      $scope.unitItems = [{
        unitName:"my-info.setting-temperature.temperatureUnit",
        unitValue1:"my-info.setting-temperature.centigrade",
        unitValue2:"my-info.setting-temperature.fahrenheit",//华氏度°F
        radioImg1:"build/img/common/radio_q.png",
        radioImg2:"build/img/common/radio_q.png"
      }, {
        unitName:"my-info.setting-temperature.useWaterUnit",
       unitValue1:"my-info.setting-temperature.litre",
        unitValue2:"my-info.setting-temperature.ton",
        radioImg1:"build/img/common/radio_q.png",
        radioImg2:"build/img/common/radio_q.png"
   },
        {
          unitName:"my-info.setting-temperature.useElectricityUnit",
         unitValue1:"Kw.h",
          unitValue2:"Kw.min",
          radioImg1:"build/img/common/radio_q.png",
          radioImg2:"build/img/common/radio_q.png"}

      ];
  $scope.initUnit=function(){

  if(window.localStorage.temperature=="°C"){
      $scope.unitItems[0].radioImg1=radioImg3;
    }
    else{
      $scope.unitItems[0].radioImg2=radioImg3;
    }
    if(window.localStorage.useWater=="S"){
      $scope.unitItems[1].radioImg1=radioImg3;
    }
    else{
      $scope.unitItems[1].radioImg2=radioImg3;
    }
    if(window.localStorage.useElectricity=="h"){
      $scope.unitItems[2].radioImg1=radioImg3;
    }
    else{
      $scope.unitItems[2].radioImg2=radioImg3;
    }




  }

   $scope.initUnit();



      /**
       *@autor:chenjiacheng
       *@name:chooseLanguage
       *@params:
       *@return:
       *@disc:Select temperature
       */
      $scope.chooseOne=function(item){
       item.radioImg1=radioImg3;
       item.radioImg2=radioTemp;
        if(item.unitName=="my-info.setting-temperature.temperatureUnit"){
          window.localStorage.temperature="°C";
        }
        else if(item.unitName=="my-info.setting-temperature.useWaterUnit"){
          window.localStorage.useWater="S";
        }
        else if(item.unitName=="my-info.setting-temperature.useElectricityUnit"){
          window.localStorage.useElectricity="h";
        }
 }

      /**
       *@autor:chenjiacheng
       *@name:chooseLanguage
       *@params:
       *@return:
       *@disc:Select temperature
       */
      $scope.chooseTwo=function(item){
        item.radioImg2=radioImg3;
        item.radioImg1=radioTemp;
        if(item.unitName=="温度单位"){
          window.localStorage.temperature="°F";
        }
        else if(item.unitName=="用水量单位"){
          window.localStorage.useWater="T";
        }
        else if(item.unitName=="用电量单位"){
          window.localStorage.Electricity="min";
        }
      }
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
