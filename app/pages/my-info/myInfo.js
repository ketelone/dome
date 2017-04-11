/**
 * Created by chenjiacheng on 17/3/27.
 */

angular.module('myInfoModule')
  .config(['$stateProvider',
    function($stateProvider) {
      $stateProvider
        .state('addMembers', {
          url: '/addMembers',
          templateUrl: 'build/pages/my-info/add-members/addMembers.html',
          controller: 'addMembersCtrl'
        })
        .state('greenLife', {

          url: '/greenLife',
          templateUrl: 'build/pages/my-info/green-life/greenLife.html',
          controller: 'greenLifeCtrl'
        })
        .state('setting', {
          url: '/setting',
          templateUrl: 'build/pages/my-info/setting/setting.html',
          controller: 'settingCtrl'
        })
        .state('settingLanguage', {
          url: '/settingLanguage',
          templateUrl: 'build/pages/my-info/setting-language/settingLanguage.html',
          controller: 'settingLanguageCtrl'
        })
        .state('settingTemperature', {
          url: '/settingTemperature',
          templateUrl: 'build/pages/my-info/setting-temperature/settingTemperature.html',
          controller: 'settingTemperatureCtrl'
        })
        .state('personalSetting', {
          url: '/personalSetting',
          templateUrl: 'build/pages/my-info/personal-setting/personalSetting.html',
          controller: 'personalSettingCtrl'
        })
    }
  ]).controller('myInfoCtrl', [
    '$scope',
    '$state',
    'publicMethod',
    function ($scope,
              $state,
              publicMethod) {




    }]);
