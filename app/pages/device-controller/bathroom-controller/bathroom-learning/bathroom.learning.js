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

      $scope.isOn = false;
      $scope.img ='build/img/toilet-controller/toilet-learning/btn_off.png';
      $scope.isDay =  true;
      $scope.chongshuisetval = false;
      $scope.chuchousetval = false;
      // $scope.anjianvoicesetval = true,
      // $scope.welcomemsetval = false

      $scope.index = 0;
      $scope.image = 'build/img/bathroom/bathroom-learning/yb1.png';

      $scope.change = function () {
        $scope.isOn =  !$scope.isOn;
        if($scope.isOn==true){
          $scope.img = 'build/img/toilet-controller/toilet-learning/btn_on.png';
          if($scope.isDay==true){
            if ( window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/bathroom/bathroom-learning/yb2.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/bathroom/bathroom-learning/ybe2.png';
            }
          }else{
            if ( window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/bathroom/bathroom-learning/yb4.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/bathroom/bathroom-learning/ybe4.png';
            }
          }
        }else {
          $scope.img ='build/img/toilet-controller/toilet-learning/btn_off.png';
          if($scope.isDay==true){
            if ( window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/bathroom/bathroom-learning/yb1.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/bathroom/bathroom-learning/ybe1.png';
            }
          }else{
            if ( window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/bathroom/bathroom-learning/yb3.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/bathroom/bathroom-learning/ybe3.png';
            }
          }
        }
      }

      $scope.changeModel = function (item) {
        if(item=='day'){
          $scope.isDay = true;
          if($scope.isOn==true){
            if ( window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/bathroom/bathroom-learning/yb2.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/bathroom/bathroom-learning/ybe2.png';
            }
          }else{
            if ( window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/bathroom/bathroom-learning/yb1.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/bathroom/bathroom-learning/ybe1.png';
            }
          }
        }else{
          $scope.isDay = false;
          if($scope.isOn==true){
            if ( window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/bathroom/bathroom-learning/yb4.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/bathroom/bathroom-learning/ybe4.png';
            }
          }else{
            if ( window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/bathroom/bathroom-learning/yb3.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/bathroom/bathroom-learning/ybe3.png';
            }
          }
        }
      };

    }]);
