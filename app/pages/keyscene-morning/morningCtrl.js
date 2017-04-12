/**
 * Created by daidongdong on 2017/4/3.
 */
angular.module('productModule')
  .controller('morningCtrl', [
    '$scope',
    '$state',
    'publicMethod', '$ionicModal', '$ionicPopover', '$timeout', '$ionicHistory', 'hmsHttp','hmsPopup',
    function ($scope, $state, publicMethod, $ionicModal, $ionicPopover, $timeout, $ionicHistory, hmsHttp,hmsPopup) {


      $scope.config = {
        openFlag : true,
        device1 : false,
        device2 : false,
        device3 : false,
        device4 : false
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
            "-webkit-animation": "aaa 1.5s linear",
            "background": "#1a1d28"
        });
          $timeout(function(){
            $scope.config.device1 = true;
            $scope.config.openFlag = false;
          },1400);

          $("#progressAnimation3").css({
            "-webkit-animation": "aaa 3.0s linear",
            "background": "#1a1d28"
          });
          $timeout(function(){
            $scope.config.device3 = true;
          },2800);
        }else{
          $("#progressAnimation2").css({
            "-webkit-animation": "aaa 6.0s linear",
            "background": "#1a1d28"
          });
          $timeout(function(){
            $scope.config.device2 = true;
          },5900);

          $("#progressAnimation4").css({
            "-webkit-animation": "aaa 1.5s linear",
            "background": "#1a1d28"
          });
          $timeout(function(){
            $scope.config.device4 = true;
          },1400);
        }
      }

      /**
      *@autor:daidongdong
      *@name:deleteKeyscene
      *@params:
      *@return:
      *@disc:delete Keyscene
      */
      $scope.deleteKeyscene = function(){
        hmsPopup.confirmNoTitle('删除场景',deleteKey);
        function deleteKey(){
          var url = "";
          var paramter = {

          }
          hmsHttp.post(url, paramter).success(
            function(response){

            }
          ).error(
            function (response, status, header, config){
            }
          );
        }

      }

    }]);
