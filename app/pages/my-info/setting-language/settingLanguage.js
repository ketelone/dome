/**
 * Created by chenjiacheng on 2017/3/28.
 */
//myInfoModule$translateProvider', '$translateStaticFilesLoaderProvider'
//.config([
//'$translateProvider', '$translateStaticFilesLoaderProvider',
//  function (  $translateProvider, $translateStaticFilesLoaderProvider) {


 // }])

angular.module('myInfoModule')
  .controller('settingLanguageCtrl', [
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
    '$stateParams','SettingsService','$translate',
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
              $rootScope, publicMethod,$stateParams,SettingsService,$translate) {







      /**
       *@autor:chenjiacheng
       *@name:chooseLanguage
       *@params:
       *@return:
       *@disc:Select language
       */
      $scope.chooseLanguage=function(e){

    if($(e.target).text().trim()=="中文简体"){
      //SettingsService.set("language","中文简体");
      $translate.use('zh');
      var  temperature=SettingsService.get("temperature");
      alert(temperature);
      if(temperature=='fahrenheit'){
        SettingsService.set("temperature",'华氏度°F');
        window.localStorage.temperature="°F";
      }
      if(temperature=='centigrade'){
        SettingsService.set("temperature",'摄氏度°C');
        window.localStorage.temperature="°C";
      }
     // SettingsService.set("temperature",temperature);

      publicMethod.goBack();

    }
        if($(e.target).text().trim()=="中文繁體"){
       //   SettingsService.set("language","中文繁體");

          $translate.use('tw');
          publicMethod.goBack();

        }
        if($(e.target).text().trim()=="English"){
      //    SettingsService.set("language","English");
          var  temperature=SettingsService.get("temperature");
          alert(temperature);
          if(temperature=='华氏度°F'){
            SettingsService.set("temperature",'fahrenheit');
            window.localStorage.temperature="°F";
          }
          if(temperature=='摄氏度°C'){
            SettingsService.set("temperature",'centigrade');
            window.localStorage.temperature="°C";
          }
          $translate.use('en');

          publicMethod.goBack();
        }
        if($(e.target).text().trim()=="ภาษาไทย"){
         // SettingsService.set("language","ภาษาไทย");
          publicMethod.goBack();
        }

   }



    }]);
