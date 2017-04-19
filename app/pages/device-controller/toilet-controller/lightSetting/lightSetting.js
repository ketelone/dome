angular.module('toiletControlModule')
  .controller('lightSettingCtrl', [
    '$scope',
    '$state',
    '$ionicModal',
    '$compile',
    'baseConfig',
    'checkVersionService',
    'publicMethod',
    'hmsPopup',
    function ($scope,
              $state,
              $ionicModal,
              $compile,
              baseConfig,
              checkVersionService,
              publicMethod,
              hmsPopup
    ) {
    $scope.lightSetting={
      gaiganyin:"",
      gaiganyinDistance:""
    }

    }]);
