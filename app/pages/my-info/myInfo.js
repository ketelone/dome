angular.module('myInfoModule')
  .config(['$stateProvider',
    function ($stateProvider) {//router setting
      $stateProvider
        .state('addMembers', {
          url: '/addMembers',
          templateUrl: 'build/pages/my-info/add-members/addMembers.html',
          controller: 'addMembersCtrl'
        })
        .state('personalSetting', {//personal setting
          url: '/personalSetting',
          templateUrl: 'build/pages/my-info/personal-setting/personalSetting.html',
          controller: 'personalSettingCtrl'
        })
        .state('myRoom', {
          url: '/myRoom',
          templateUrl: 'build/pages/my-info/my-room/myRoom.html',
          controller: 'myRoomCtrl'
        })
        .state('greenLife', {
          url: '/greenLife/:device',
          templateUrl: 'build/pages/my-info/green-life/greenLife.html',
          controller: 'greenLifeCtrl'
        })
        .state('chooseDevice', {
          url: '/chooseDevice',
          templateUrl: 'build/pages/my-info/green-life/choose-device/chooseDevice.html',
          controller: 'chooseDeviceCtrl'
        })
        .state('consumptionDetail', {
          url: '/consumptionDetail/:device/:index/:type',
          templateUrl: 'build/pages/my-info/green-life/consumption-detail/consumptionDetail.html',
          controller: 'consumptionDetailCtrl'
        })
        .state('setting', {
          cache: false,
          url: '/setting',
          templateUrl: 'build/pages/my-info/setting/setting.html',
          controller: 'settingCtrl'
        });
    }
  ]).controller('myInfoCtrl', [
  '$scope',
  '$state',
  'publicMethod',
  function ($scope,
            $state,
            publicMethod) {

    $scope.a = "build/img/my-info/icon_home_avatar2.png";


  }]);
