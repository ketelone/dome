angular.module('myInfoModule')
  .controller('settingLanguageCtrl', [
    '$scope','$state','baseConfig','$ionicLoading','$http',
    '$timeout','$ionicHistory','$ionicPlatform',
    '$ionicScrollDelegate','hmsPopup','$rootScope',
    'publicMethod','$stateParams', 'SettingsService', '$translate',
    function ($scope,$state,baseConfig,$ionicLoading,
              $http,$timeout,$ionicHistory,
              $ionicPlatform,$ionicScrollDelegate,
              hmsPopup,$rootScope, publicMethod, $stateParams,
              SettingsService, $translate) {

      $scope.languageItems = [
        {
          ischecked: true,
          languageId:undefined,
          json_file: null,
          language: "my-info.setting-language.followLanguage",
          radioImg1: "build/img/common/radio_q.png",
          radioImg2: "build/img/common/radio_h.png",
          radioTemp: "build/img/common/radio_q.png"
        },
        {
          ischecked: false,
          languageId:"1",
          json_file: "zh",
          language: "中文简体",
          radioImg1: "build/img/common/radio_q.png",
          radioImg2: "build/img/common/radio_h.png",
          radioTemp: "build/img/common/radio_q.png"
        },
        {
          ischecked: false,
          languageId:"2",
          json_file: "tw",
          language: "中文繁体",
          radioImg1: "build/img/common/radio_q.png",
          radioImg2: "build/img/common/radio_h.png",
          radioTemp: "build/img/common/radio_q.png"
        },
        {
          ischecked: false,
          languageId:"0",
          json_file: "en",
          language: "English",
          radioImg1: "build/img/common/radio_q.png",
          radioImg2: "build/img/common/radio_h.png",
          radioTemp: "build/img/common/radio_q.png"
        },
        {
          ischecked: false,
          languageId:"3",
          json_file: "th",
          language: "ภาษาไทย",
          radioImg1: "build/img/common/radio_q.png",
          radioImg2: "build/img/common/radio_h.png",
          radioTemp: "build/img/common/radio_q.png"
        }
      ];
      /**
       *@autor:chenjiacheng
       *@name:initLanguage
       *@params:
       *@return:
       *@disc:Select the circle when entering the page

       */
      $scope.initLanguage = function () {
        if (window.localStorage.languageId == undefined) {
          $scope.languageItems[0].ischecked = true;
          $scope.languageItems[0].radioImg1 = "build/img/common/radio_h.png";
        }
        if (window.localStorage.languageId == "1") {
          $scope.languageItems[1].ischecked = true;
          $scope.languageItems[1].radioImg1 = "build/img/common/radio_h.png";

        }
        if (window.localStorage.languageId == '2') {
          $scope.languageItems[2].ischecked = true;
          $scope.languageItems[2].radioImg1 = "build/img/common/radio_h.png";
        }
        if (window.localStorage.languageId == '0') {
          $scope.languageItems[3].ischecked = true;
          $scope.languageItems[3].radioImg1 = "build/img/common/radio_h.png";
        }
        if (window.localStorage.languageId == '3') {
          $scope.languageItems[4].ischecked = true;
          $scope.languageItems[4].radioImg1 = "build/img/common/radio_h.png";
        }
      }
      $scope.initLanguage();

      /**
       *@autor:chenjiacheng
       *@name:goBack
       *@params:
       *@return:
       *@disc:goBack
       */
      $scope.goBack = function () {
        $ionicHistory.goBack();
      }

      /**
       *@autor:chenjiacheng
       *@name:chooseLanguage
       *@params:
       *@return:
       *@disc:Select language
       */
      $scope.chooseLanguage = function (item) {
        item.ischecked = true;
        item.radioImg1 = "build/img/common/radio_h.png";
        window.localStorage.languageId = item.languageId;
        for (var i = 0; i < $scope.languageItems.length; i++) {
          if ($scope.languageItems[i].language != item.language) {
            $scope.languageItems[i].ischecked = false;
            $scope.languageItems[i].radioImg1 = "build/img/common/radio_q.png";
          }
        }
        if (item.languageId == undefined) {
          navigator.globalization.getPreferredLanguage(
            function (language) {
              if (language.value == 'zh-CN' || language.value == 'zh-Hans-CN') {
                $translate.use('zh');
              }
              else if (language.value == 'zh-TW' || language.value == 'zh-Hans-TW') {
                $translate.use('tw');
              }
              else if (language.value == 'en-US' || language.value == 'en-CN') {
                $translate.use('en');
              }
              else if (language.value == 'en-TH' || language.value == 'th-CN') {
                $translate.use('th');
              }
              else {
                $translate.use('en');
              }
            },
            function () {
              // alert('Error getting locale\n');
            });
        }
        else {
          $translate.use(item.json_file);
        }
        $ionicHistory.goBack();

        //if($(e.target).text().trim()=="中文简体"){
        //
        //  $translate.use('zh');
        //  var  temperature=SettingsService.get("temperature");
        //  alert(temperature);
        //  if(temperature=='fahrenheit'){
        //    SettingsService.set("temperature",'华氏度°F');
        //    window.localStorage.temperature="°F";
        //  }
        //  if(temperature=='centigrade'){
        //    SettingsService.set("temperature",'摄氏度°C');
        //    window.localStorage.temperature="°C";
        //  }
        // // SettingsService.set("temperature",temperature);
        //
        //  publicMethod.goBack();
        //
        //}
        //    if($(e.target).text().trim()=="中文繁體"){
        //   //   SettingsService.set("language","中文繁體");
        //
        //      $translate.use('tw');
        //      publicMethod.goBack();
        //
        //    }
        //    if($(e.target).text().trim()=="English"){
        //  //    SettingsService.set("language","English");
        //      var  temperature=SettingsService.get("temperature");
        //      alert(temperature);
        //      if(temperature=='华氏度°F'){
        //        SettingsService.set("temperature",'fahrenheit');
        //        window.localStorage.temperature="°F";
        //      }
        //      if(temperature=='摄氏度°C'){
        //        SettingsService.set("temperature",'centigrade');
        //        window.localStorage.temperature="°C";
        //      }
        //      $translate.use('en');
        //
        //      publicMethod.goBack();
        //    }
        //    if($(e.target).text().trim()=="ภาษาไทย"){
        //     // SettingsService.set("language","ภาษาไทย");
        //      publicMethod.goBack();
        //    }

      }


    }]);
