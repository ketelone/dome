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
    '$stateParams', 'checkVersionService', 'SettingsService', '$translate',
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
              $rootScope, publicMethod, $stateParams, checkVersionService, SettingsService, $translate) {

      /**
       *@author:chenjiacheng
       *@name:goBack
       *@params:
       *@return:
       *@disc:Set goBack

       */
      $scope.goBack = function () {
        $ionicHistory.goBack();
      }


      $scope.thisLanguage = "";

      /**
       *@author:chenjiacheng
       *@name:currentLanguage
       *@params:
       *@return:
       *@disc:display currentLanguage

       */
      $scope.currentLanguage = function () {

        if (window.localStorage.languageId == '1') {
          $scope.thisLanguage = "中文简体";
        }
        else if (window.localStorage.languageId == undefined) {
          $scope.thisLanguage = "my-info.setting.followLanguage";

          //navigator.globalization.getPreferredLanguage(
          //  function (language) {

          //  if (language.value == 'zh-CN' ||language.value ==  'zh-Hans-CN') {
          //    $scope.thisLanguage="中文简体";
          //
          //  }
          //  else if (language.value == 'zh-TW' || language.value == 'zh-Hans-TW') {
          //    $scope.thisLanguage="中文繁体";
          //
          //  }
          //  else if (language.value == 'en-US' || language.value == 'en-CN') {
          //    $scope.thisLanguage="English";
          //  }
          //  else if (language.value == 'en-TH' || language.value == 'th-CN') {
          //    $translate.use('th');
          //    $scope.thisLanguage="ภาษาไทย";
          //  }
          // else{
          //    $scope.thisLanguage="English";
          //  }
          //},
          //function () {
          //
          //});
        }
        else if (window.localStorage.language == '2') {
          $scope.thisLanguage = "中文繁体";
        }
        else if (window.localStorage.language == '0') {
          $scope.thisLanguage = "English";
        }
        else if (window.localStorage.language == '3') {
          $scope.thisLanguage = "ภาษาไทย";
        }
        else {
          $scope.thisLanguage = "English";
        }


      }

      $scope.currentLanguage();
//);


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
      $scope.logout = function () {

        var goLogin = function () {
          $state.go('login');
        }

        hmsPopup.confirmNoTitle("<div style='text-align: center' >是否退出当前账号</div>", goLogin);
      }


    }]);
