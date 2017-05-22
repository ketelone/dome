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
      $scope.chongshuisetval = false;
      $scope.chuchousetval = false;
      // $scope.anjianvoicesetval = true,
      // $scope.welcomemsetval = false
      if (window.localStorage.language == "default"||window.localStorage.language == '中文简体') {
      $scope.images = ['build/img/toilet-controller/toilet-learning/mt1.png',
                        'build/img/toilet-controller/toilet-learning/mt2.png',
                        'build/img/toilet-controller/toilet-learning/mt3.png',
                        'build/img/toilet-controller/toilet-learning/mt4.png'];
      }else if(window.localStorage.language == 'English'){
        $scope.images = ['build/img/toilet-controller/toilet-learning/mte1.png',
          'build/img/toilet-controller/toilet-learning/mte2.png',
          'build/img/toilet-controller/toilet-learning/mte3.png',
          'build/img/toilet-controller/toilet-learning/mte4.png'];
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
