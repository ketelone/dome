/**
 * Created by chenjiacheng on 2017/4/3.
 */
angular.module('productModule')
  .controller('periodCtrl', [
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
       *@autor: caolei
       *@params: item
       *@disc: get switch status
       */
      $scope.getSwitchStatus = function(item){
        //console.log(item);
        alert(item.isOff);
        if(item.isOff){
          //alert("on");
          $scope.openKeyscene();

        }else{
          alert("off1");
        }
      };



/**
       *@author:chenjiacheng
       *@name:goBack
       *@params:
       *@return:
       *@disc:goback
       */
      $scope.goBack = function () {
        window.history.go();
      }

      /**
       *@author:chenjiacheng
       *@name:openKeyscene
       *@params:
       *@return:
       *@disc:openKeysceneSpa
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
       *@author:chenjiacheng
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
