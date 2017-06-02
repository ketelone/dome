angular.module('myInfoModule')
  .controller('languageCtrl', [
    '$scope','$state','baseConfig','$ionicLoading','$http',
    '$timeout','$ionicHistory','$ionicPlatform',
    '$ionicScrollDelegate','hmsPopup','$rootScope',
    'publicMethod','$stateParams', 'SettingsService', '$translate',
    function ($scope,$state,baseConfig,$ionicLoading,
              $http,$timeout,$ionicHistory,
              $ionicPlatform,$ionicScrollDelegate,
              hmsPopup,$rootScope, publicMethod, $stateParams,
              SettingsService, $translate) {

      $scope.goBack = function () {
        $ionicHistory.goBack();
      };

      var select_img="build/img/common/radio_h.png";
      var unselect_img="build/img/common/radio_q.png";

      /**language item array**/
      $scope.languageItems = [
        {
          ischecked: false,
          language: $translate.instant("my-info.setting.followLanguage"),
          radioImg: unselect_img
        },
        {
          ischecked: false,
          lang:"zh",
          language: "中文简体",
          radioImg: unselect_img
        },
        {
          ischecked: false,
          lang:"tw",
          language: "中文繁体",
          radioImg: unselect_img
        },
        {
          ischecked: false,
          lang:"en",
          language: "English",
          radioImg: unselect_img
        },
        {
          ischecked: false,
          lang:"th",
          language: "ภาษาไทย",
          radioImg: unselect_img
        }
      ];

      //Select the circle when entering the page
      var initCircle=function () {
        if (!window.localStorage.language) {
          $scope.languageItems[0].ischecked = true;
          $scope.languageItems[0].radioImg = select_img;
        }
        else if (window.localStorage.language == 'zh') {
          $scope.languageItems[1].ischecked = true;
          $scope.languageItems[1].radioImg = select_img;

        }
        else if (window.localStorage.language == 'tw') {
          $scope.languageItems[2].ischecked = true;
          $scope.languageItems[2].radioImg = select_img;
        }
        else if (window.localStorage.language == 'en') {
          $scope.languageItems[3].ischecked = true;
          $scope.languageItems[3].radioImg = select_img;
        }
        else if (window.localStorage.language == 'th') {
          $scope.languageItems[4].ischecked = true;
          $scope.languageItems[4].radioImg = select_img;
        }
      };
      initCircle();

      /**select language and use language then go back**/
      $scope.chooseLanguage = function (item) {
        //change the select circle
        $scope.languageItems.forEach(function (currentItem) {
          if (currentItem.lang != item.lang) {
            currentItem.ischecked = false;
            currentItem.radioImg = unselect_img;
          } else {
            currentItem.ischecked = true;
            currentItem.radioImg = select_img;
          }
        });
        if (item.lang == 'zh') {
          $translate.use('zh');
          window.localStorage.language = "zh";
        }
        else if (item.lang == 'tw') {
          $translate.use('en');
          window.localStorage.language = "tw";
        }
        else if (item.lang == 'en') {
          $translate.use('en');
          window.localStorage.language = "en";
        }
        else if (item.lang == 'th') {
          $translate.use('en');
          window.localStorage.language = "th";
        }
        else{
          navigator.globalization.getPreferredLanguage(
            function (language) {
              if (language.value == 'zh-CN' || language.value == 'zh-Hans-CN') {
                $translate.use('zh');
                window.localStorage.language="zh";
              }
              else if (language.value == 'zh-TW' || language.value == 'zh-Hans-TW') {
                $translate.use('en');
                window.localStorage.language="tw";
              }
              else if (language.value == 'en-US' || language.value == 'en-CN') {
                $translate.use('en');
                window.localStorage.language="en";
              }
              else if (language.value == 'en-TH' || language.value == 'th-CN') {
                $translate.use('en');
                window.localStorage.language="th";
              }
              else {
                $translate.use('en');
              }
            },
            function () {
              // alert('Error getting locale\n');
            });
        }
        $ionicHistory.goBack();
      };

    }]);
