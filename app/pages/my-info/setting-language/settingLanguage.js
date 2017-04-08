/**
 * Created by chenjiacheng on 2017/3/28.
 */
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
    '$stateParams','SettingsService',
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
              $rootScope, publicMethod,$stateParams,SettingsService) {


      /**
       *@autor:chenjiacheng
       *@name:chooseLanguage
       *@params:
       *@return:
       *@disc:Select language
       */
      $scope.chooseLanguage=function(e){

    if($(e.target).text().trim()=="中文简体"){
      SettingsService.set("language","中文简体");

      publicMethod.goBack();

    }
        if($(e.target).text().trim()=="中文繁體"){
          SettingsService.set("language","中文繁體");
          publicMethod.goBack();

        }
        if($(e.target).text().trim()=="English"){
          SettingsService.set("language","English");

          publicMethod.goBack();
        }
        if($(e.target).text().trim()=="ภาษาไทย"){
          SettingsService.set("language","ภาษาไทย");
          publicMethod.goBack();
        }

   }



    }]);
