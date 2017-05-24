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

      $scope.isOn = false;
      $scope.img ='build/img/toilet-controller/toilet-learning/btn_off.png';
      $scope.isDay =  true;
      $scope.chongshuisetval = false;
      $scope.chuchousetval = false;
      // $scope.anjianvoicesetval = true,
      // $scope.welcomemsetval = false

      $scope.index = 0;

      $scope.image = 'build/img/karess-controller/karess-learning/yg1.png';


      $scope.change = function () {
        $scope.isOn =  !$scope.isOn;
        if($scope.isOn==true){
          $scope.img = 'build/img/toilet-controller/toilet-learning/btn_on.png';
          if($scope.isDay==true){
            if ( window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/karess-controller/karess-learning/yg2.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/karess-controller/karess-learning/yge2.png';
            }
          }else{
            if ( window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/karess-controller/karess-learning/yg4.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/karess-controller/karess-learning/yge4.png';
            }
          }
        }else {
          $scope.img ='build/img/toilet-controller/toilet-learning/btn_off.png';
          if($scope.isDay==true){
            if ( window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/karess-controller/karess-learning/yg1.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/karess-controller/karess-learning/yge1.png';
            }
          }else{
            if ( window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/karess-controller/karess-learning/yg3.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/karess-controller/karess-learning/yge3.png';
            }
          }
        }
      }

      $scope.changeModel = function (item) {
        if(item=='day'){
          $scope.isDay = true;
          if($scope.isOn==true){
            if ( window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/karess-controller/karess-learning/yg2.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/karess-controller/karess-learning/yge2.png';
            }
          }else{
            if ( window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/karess-controller/karess-learning/yg1.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/karess-controller/karess-learning/yge1.png';
            }
          }
        }else{
          $scope.isDay = false;
          if($scope.isOn==true){
            if ( window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/karess-controller/karess-learning/yg4.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/karess-controller/karess-learning/yge4.png';
            }
          }else{
            if ( window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/karess-controller/karess-learning/yg3.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/karess-controller/karess-learning/yge3.png';
            }
          }
        }
      };
    }]);
