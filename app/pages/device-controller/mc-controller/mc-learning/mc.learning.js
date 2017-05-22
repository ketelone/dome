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
        $scope.images = ['build/img/mc-controller/mc-learning/jg1.png',
          'build/img/mc-controller/mc-learning/jg2.png',
          'build/img/mc-controller/mc-learning/jg3.png',
          'build/img/mc-controller/mc-learning/jg4.png'];

      }else if(window.localStorage.language == 'English'){
        $scope.images = ['build/img/mc-controller/mc-learning/jge1.png',
          'build/img/mc-controller/mc-learning/jge2.png',
          'build/img/mc-controller/mc-learning/jge3.png',
          'build/img/mc-controller/mc-learning/jge4.png'];
      }
      $scope.index = 0;
      $scope.image = $scope.images[0];

      $scope.next = function () {
        $scope.index += 1;
        if($scope.index <4){
          $scope.image = $scope.images[$scope.index];
        }else{
          $scope.index = 0;
          $scope.image = $scope.images[0];
        }
      }

      $scope.goBack = function () {
        publicMethod.goBack();
      };
    }]);
