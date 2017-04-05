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


      $scope.chooseLanguage=function(e){
        alert(123465);

    if($(e.target).text().trim()=="中文简体"){
      alert(3);

     publicMethod.goBack();
 alert( SettingsService.get("language"));
    }
        if($(e.target).text().trim()=="中文繁體"){

        }
        if($(e.target).text().trim()=="English"){

        }


   }



    }]);
