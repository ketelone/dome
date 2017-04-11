/**
 * Created by daidongdong on 2017/4/3.
 */
angular.module('productModule')
  .controller('morningCtrl', [
    '$scope',
    '$state',
    'publicMethod', '$ionicModal', '$ionicPopover', '$timeout', '$ionicHistory', 'hmsHttp',
    function ($scope, $state, publicMethod, $ionicModal, $ionicPopover, $timeout, $ionicHistory, hmsHttp) {


      $scope.config = {
        openFlag : true
      }
      /**
       *@autor:daidongdong
       *@name:goBack
       *@params:
       *@return:
       *@disc:goback
       */
      $scope.goBack = function () {
        window.history.go();
      }

      /**
       *@autor:daidongdong
       *@name:openKeyscene
       *@params:
       *@return:
       *@disc:openKeysceneMorning
       */
      $scope.openKeyscene = function () {
        if($scope.config.openFlag == true){
          $("#progressAnimation").css({
            "background": "-webkit-gradient(linear, 0 0, 0 100%, from(#1a1d28), color-stop(0.5,#1a1d28), to(#1a1d28))",
            "-webkit-animation": "aaa 2s linear"
          });
        }else{

        }
      }
    }]);
