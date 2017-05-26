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


      $scope.isOn = false;
      $scope.img ='build/img/toilet-controller/toilet-learning/btn_off.png';
      $scope.isDay =  true;
      if (window.localStorage.language == "default"|| window.localStorage.language == '中文简体') {
        $scope.image = 'build/img/mc-controller/mc-learning/jg1.png';
      }else if(window.localStorage.language == 'English'){
        $scope.image = 'build/img/mc-controller/mc-learning/jge1.png';
      }



      $scope.goBack = function () {
        publicMethod.goBack();
      };

      $scope.change = function () {
        $scope.isOn =  !$scope.isOn;
        if($scope.isOn==true){
          $scope.img = 'build/img/toilet-controller/toilet-learning/btn_on.png';
          if($scope.isDay==true){
            if (window.localStorage.language == "default"|| window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/mc-controller/mc-learning/jg2.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/mc-controller/mc-learning/jge2.png';
            }
          }else{
            if (window.localStorage.language == "default"|| window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/mc-controller/mc-learning/jg4.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/mc-controller/mc-learning/jge4.png';
            }
          }
        }else {
          $scope.img ='build/img/toilet-controller/toilet-learning/btn_off.png';
          if($scope.isDay==true){
            if (window.localStorage.language == "default"|| window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/mc-controller/mc-learning/jg1.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/mc-controller/mc-learning/jge1.png';
            }
          }else{
            if (window.localStorage.language == "default"|| window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/mc-controller/mc-learning/jg3.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/mc-controller/mc-learning/jge3.png';
            }
          }
        }
      }

      $scope.changeModel = function (item) {
        if(item=='day'){
          $scope.isDay = true;
          if($scope.isOn==true){
            if (window.localStorage.language == "default"|| window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/mc-controller/mc-learning/jg2.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/mc-controller/mc-learning/jge2.png';
            }
          }else{
            if (window.localStorage.language == "default"|| window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/mc-controller/mc-learning/jg1.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/mc-controller/mc-learning/jge1.png';
            }
          }
        }else{
          $scope.isDay = false;
          if($scope.isOn==true){
            if (window.localStorage.language == "default"|| window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/mc-controller/mc-learning/jg4.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/mc-controller/mc-learning/jge4.png';
            }
          }else{
            if (window.localStorage.language == "default"|| window.localStorage.language == '中文简体') {
              $scope.image = 'build/img/mc-controller/mc-learning/jg3.png';
            }else if(window.localStorage.language == 'English'){
              $scope.image = 'build/img/mc-controller/mc-learning/jge3.png';
            }
          }
        }
      };

    }]);
