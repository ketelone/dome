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

      /**
       *@autor:chenjiacheng
       *@name:chooseLanguage
       *@params:
       *@return:
       *@disc:Select temperature
       */
      $scope.chooseTemperature=function(e){

        if($(e.target).text().trim()=="摄氏度°C"){
          SettingsService.set("temperature","摄氏度°C");
          window.localStorage.temperature="°C";
          publicMethod.goBack();

        }
        if($(e.target).text().trim()=="centigrade"){
          SettingsService.set("temperature","centigrade");
          window.localStorage.temperature="°C";
          publicMethod.goBack();

        }
        if($(e.target).text().trim()=="华氏度°F"){
          SettingsService.set("temperature","华氏度°F");
          window.localStorage.temperature="°F";
         publicMethod.goBack();


        }  if($(e.target).text().trim()=="fahrenheit"){
          SettingsService.set("temperature","fahrenheit");
          window.localStorage.temperature="°F";
          publicMethod.goBack();


        }

      }



    }]);
