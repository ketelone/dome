angular.module('myInfoModule')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('binding', {
          url: '/personalSetting/binding/:type',
          templateUrl: 'build/pages/my-info/personal-setting/binding/binding.html',
          controller: 'bindingCtrl'
        })
        .state('changePwd', {
          url: '/personalSetting/changePwd/:type',
          templateUrl: 'build/pages/my-info/personal-setting/change-pwd/changePwd.html',
          controller: 'changePwdCtrl'
        })
    }])
  .controller('personalSettingCtrl', [
    '$scope', '$state', 'baseConfig', '$ionicLoading', '$http',
    '$timeout', '$ionicHistory', '$ionicPlatform',
    '$ionicScrollDelegate', 'hmsPopup', '$rootScope',
    'publicMethod', '$stateParams','$translate',
    function ($scope, $state, baseConfig, $ionicLoading,
              $http, $timeout, $ionicHistory, $ionicPlatform,
              $ionicScrollDelegate, hmsPopup,
              $rootScope, publicMethod, $stateParams,
              $translate) {

      $scope.goBack = function () {
        $ionicHistory.goBack();
      };

      $scope.userData = {
        "head_img": "",
        "nickname": "老爸",
        "male_img": "build/img/my-info/icon_male_color.png",
        "female_img": "build/img/my-info/icon_female.png",
        "telephone": "18828321238",
        "email": "",
        "state": "上海",
      };

      //拍照
      $scope.getPhoto = function () {

      };

      //修改性别
      $scope.setSex = function (index) {
        if (index) {//female
          $scope.userData.male_img = "build/img/my-info/icon_male.png";
          $scope.userData.female_img = "build/img/my-info/icon_female_color.png";
        } else {
          $scope.userData.male_img = "build/img/my-info/icon_male_color.png";
          $scope.userData.female_img = "build/img/my-info/icon_female.png";
        }
      };


    }]);
