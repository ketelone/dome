angular.module('mcControlModule')
  .controller('mcLearningCtrl', [
    '$scope',
    '$state',
    '$ionicModal',
    '$compile',
    'baseConfig',
    'publicMethod',
    function ($scope,
              $state,
              $ionicModal,
              $compile,
              baseConfig,
              publicMethod
             ) {


      $scope.image = 'build/img/mc-controller/jg.png';

      $scope.goBack = function () {
        publicMethod.goBack();
      };
    }]);
