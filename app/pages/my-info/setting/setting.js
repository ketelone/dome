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


      $scope.goBack = function(){
        $ionicHistory.goBack();
      }
 /**
       *@author:chenjiacheng
       *@name:language
       *@params:
       *@return:default language
       *@disc:Set default language

      */
//$scope.language=function(){


 // if( SettingsService.get("language")!=false){
  //  return SettingsService.get("language");
 // }
 //else{

   //   var language=angular.element('#sl').text();
   // alert(language);
 //   SettingsService.set("language",language);

 //navigator.globalization.getPreferredLanguage(
 //     function (language)
 //     {
 //       //alert('language1: ' + language.value + '\n');
 //       var localLanguage=language.value;
 //       if( localLanguage=='zh-CN'){
 //         SettingsService.set("language","中文简体");
 //         return SettingsService.get("language");
 //       }
 //       else  if( localLanguage=='zh-TW'){
 //         SettingsService.set("language","中文繁体");
 //         return SettingsService.get("language");
 //       }
 //       else  if( localLanguage=='en-US'){
 //         SettingsService.set("language","English");
 //         return SettingsService.get("language");
 //       }
 //       else  if( localLanguage=='en-TH'){
 //         SettingsService.set("language","ภาษาไทย");
 //         return SettingsService.get("language");
 //       }
 //       else {
 //         SettingsService.set("language","English");
 //         return SettingsService.get("language");
 //       }
 //     },
 //     function ()
 //     {

  //alert('Error getting language\n');

     // }
 // );



  //}


//}

      /**
       *@author:chenjiacheng
       *@name:default temperature
       *@params:
       *@return:
       *@disc:Set default temperature
       */
/*$scope.temperatureUnit=function()
     {
        if (SettingsService.get("temperature") != false) {

         //console.log(SettingsService.get("temperature")+'1a');
          return SettingsService.get("temperature");
        }
        else {
         var  temperature=angular.element('#temperatureUnit').text();
          SettingsService.set("temperature", temperature);
          window.localStorage.temperature = "°C";
          return SettingsService.get("temperature");
        }


    }*/


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
