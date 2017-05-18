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

      if (window.localStorage.language == "default"||window.localStorage.language == '中文简体') {
        $scope.image = 'build/img/mc-controller/jg.png';
      }else if(window.localStorage.language == 'English'){
        $scope.image = 'build/img/mc-controller/jgen.png';
      }
      $scope.goBack = function () {
        publicMethod.goBack();
      };
    }]);
