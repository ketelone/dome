angular.module('myInfoModule')
  .controller('unitCtrl', [
    '$scope', '$state', 'baseConfig', '$ionicLoading',
    '$http', '$timeout', '$ionicHistory',
    '$ionicPlatform', '$ionicScrollDelegate',
    'hmsPopup', '$rootScope', 'publicMethod',
    'SettingsService','$translate',
    function ($scope, $state, baseConfig, $ionicLoading,
              $http, $timeout, $ionicHistory,
              $ionicPlatform, $ionicScrollDelegate,
              hmsPopup, $rootScope, publicMethod,
              SettingsService,$translate) {

      $scope.goBack = function () {
        $ionicHistory.goBack();
      };

      var select_img = "build/img/common/radio_h.png";
      var unselect_img = "build/img/common/radio_q.png";

      //unit item array
      $scope.unitItems = [
        {
          id:1,
          unitName: $translate.instant("my-info.setting.temperatureUnit"),
          unitValue1: $translate.instant("my-info.setting.centigrade"),
          unitValue2: $translate.instant("my-info.setting.fahrenheit"),
          radioImg1: unselect_img,
          radioImg2: unselect_img
        },
        {
          id:2,
          unitName: $translate.instant("my-info.setting.waterUnit"),
          unitValue1: $translate.instant("my-info.setting.litre"),
          unitValue2: $translate.instant("my-info.setting.ton"),
          radioImg1: unselect_img,
          radioImg2: unselect_img
        },
        {
          id:3,
          unitName: $translate.instant("my-info.setting.electricityUnit"),
          unitValue1: "Kw.h",
          unitValue2: "Kw.min",
          radioImg1: unselect_img,
          radioImg2: unselect_img
        }
      ];

      //init the select circle
      $scope.initUnit = function () {
        if (window.localStorage.temperatureUnit == "C") {
          $scope.unitItems[0].radioImg1 = select_img;
        }
        else {
          $scope.unitItems[0].radioImg2 = select_img;
        }
        if (window.localStorage.waterUnit == "L") {
          $scope.unitItems[1].radioImg1 = select_img;
        }
        else {
          $scope.unitItems[1].radioImg2 = select_img;
        }
        if (window.localStorage.electricityUnit == "H") {
          $scope.unitItems[2].radioImg1 = select_img;
        }
        else {
          $scope.unitItems[2].radioImg2 = select_img;
        }
      };
      $scope.initUnit();

      /**
       * select the unit
       * @param item:the unit item
       * @param index:0 is unit1,1 is unit2
       */
      $scope.chooseUnit = function (item,index) {
        if(index){//unit2
          item.radioImg1 = unselect_img;
          item.radioImg2 = select_img;
          if(item.id==1){
            window.localStorage.temperatureUnit = "F";
          }
          else if (item.id==2) {
            window.localStorage.waterUnit = "T";
          }
          else if (item.id==3) {
            window.localStorage.electricityUnit = "M";
          }
        }
        else{//unit1
          item.radioImg1 = select_img;
          item.radioImg2 = unselect_img;
          if(item.id==1){
            window.localStorage.temperatureUnit = "C";
          }
          else if (item.id==2) {
            window.localStorage.waterUnit = "L";
          }
          else if (item.id==3) {
            window.localStorage.electricityUnit = "H";
          }
        }
      }

    }]);
