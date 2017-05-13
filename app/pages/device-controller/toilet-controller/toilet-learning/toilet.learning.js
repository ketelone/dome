angular.module('toiletControlModule')
  .controller('toiletLearningCtrl', [
    '$scope',
    '$state',
    '$translate',
    '$timeout',
    'publicMethod',
    '$ionicModal',
    '$compile',
    'baseConfig',
    'checkVersionService',
    'hmsPopup',
    'cmdService',
    function ($scope,
              $state,
              $translate,
              $timeout,
              publicMethod,
              $ionicModal,
              $compile,
              baseConfig,
              checkVersionService,
              hmsPopup,
              cmdService
    ) {
      $scope.goBack = function () {
        publicMethod.goBack();
      };
      $scope.chongshuisetval = false,
      $scope.chuchousetval = false,
      // $scope.anjianvoicesetval = true,
      // $scope.welcomemsetval = false
      $scope.images = ['build/img/toilet-controller/toilet-learning/mt1.png',
                        'build/img/toilet-controller/toilet-learning/mt2.png',
                        'build/img/toilet-controller/toilet-learning/mt3.png',];
      $scope.index = 0;
      $scope.image = $scope.images[0];

      $scope.next = function () {
        $scope.index += 1;
        if($scope.index <3){
          $scope.image = $scope.images[$scope.index];
        }else{
          $scope.index = 0;
          $scope.image = $scope.images[0];
        }
      }

    }]);
