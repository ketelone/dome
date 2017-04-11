/**
 * Created by chenjiacheng on 2017/3/28.
 */
angular.module('myInfoModule')

  .controller('settingCtrl', [
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
    '$stateParams','checkVersionService','SettingsService',
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
              $rootScope, publicMethod,$stateParams,checkVersionService,SettingsService){


     /**
       *@author:chenjiacheng
       *@name:language
       *@params:
       *@return:default language
       *@disc:Set default language

      */
      $scope.language=function(){

     //  console.log( SettingsService.get("language")+"1");
        if( SettingsService.get("language")!=false){
          return SettingsService.get("language");
        }
        else{
          SettingsService.set("language","简体中文");
          return SettingsService.get("language");
        }


      }
      /**
       *@author:chenjiacheng
       *@name:default temperature
       *@params:
       *@return:
       *@disc:Set default temperature
       */
      $scope.temperatureUnit=function(){
        if( SettingsService.get("temperature")!=false){

          return SettingsService.get("temperature");
        }
        else{
          SettingsService.set("temperature","摄氏度°C");
          window.localStorage.temperature="°C";
          return SettingsService.get("temperature");
        }


      }


/**
       *@author:chenjiacheng
       *@name:logout
       *@params:
       *@return:
       *@disc:logout
       */
      $scope.logout=function() {

        var goLogin=function(){
          $state.go('login');
        }

        hmsPopup.confirmNoTitle( "<div style='text-align: center'>是否退出当前账号</div>",goLogin);
      }








    }]);
