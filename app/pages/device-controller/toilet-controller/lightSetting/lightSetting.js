angular.module('toiletControlModule')
  .controller('lightSettingCtrl', [
    '$scope',
    '$state',
    'publicMethod',
    '$ionicModal',
    'baseConfig',
    'checkVersionService',
    'hmsPopup',
    function ($scope,
              $state,
              publicMethod,
              $ionicModal,
              baseConfig,
              checkVersionService,
              hmsPopup
    ) {
      $scope.lightSetting={
        gaiganyin:"",
        gaiganyinDistance:"",
        ll:""
      };
      $scope.goBack = function () {
        publicMethod.goBack();
      }

    }]);
