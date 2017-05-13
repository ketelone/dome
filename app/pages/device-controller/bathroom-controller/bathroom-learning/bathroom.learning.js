angular.module('bathroomModule')
  .controller('bathroomLearningCtrl', [
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
      $scope.images = ['build/img/bathroom/bathroom-learning/yb1.png',
                        'build/img/bathroom/bathroom-learning/yb2.png'];
      $scope.index = 0;
      $scope.image = $scope.images[0];

      $scope.next = function () {
        $scope.index += 1;
        if($scope.index <2){
          $scope.image = $scope.images[$scope.index];
        }else{
          $scope.index = 0;
          $scope.image = $scope.images[0];
        }
      }

    }]);
