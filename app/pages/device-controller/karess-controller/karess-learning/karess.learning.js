angular.module('karessControlModule')
  .controller('karessLearningCtrl', [
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
      $scope.chongshuisetval = false;
      $scope.chuchousetval = false;
      // $scope.anjianvoicesetval = true,
      // $scope.welcomemsetval = false
      if (window.localStorage.language == "default"||window.localStorage.language == '中文简体') {
      $scope.images = ['build/img/karess-controller/karess-learning/yg1.png',
                        'build/img/karess-controller/karess-learning/yg2.png',
                        'build/img/karess-controller/karess-learning/yg3.png',
                        'build/img/karess-controller/karess-learning/yg4.png',];
      }else if(window.localStorage.language == 'English'){
        $scope.images = ['build/img/karess-controller/karess-learning/yge1.png',
          'build/img/karess-controller/karess-learning/yge2.png',
          'build/img/karess-controller/karess-learning/yge3.png',
          'build/img/karess-controller/karess-learning/yge4.png',];
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

    }]);
