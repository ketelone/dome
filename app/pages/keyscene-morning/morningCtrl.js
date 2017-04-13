/**
 * Created by daidongdong on 2017/4/3.
 */
angular.module('productModule')
  .controller('morningCtrl', [
    '$scope',
    '$state',
    'publicMethod', '$ionicModal', '$ionicPopover', '$timeout', '$ionicHistory', 'hmsHttp', 'hmsPopup',
    function ($scope, $state, publicMethod, $ionicModal, $ionicPopover, $timeout, $ionicHistory, hmsHttp, hmsPopup) {


      $scope.config = {
        openFlag: true,
        device1: false,//shebei
        device2: false,
        device3: false,
        device4: false,
        flagDevice1: false,//shifouanzhuang
      flagDevice2: false,
        flagDevice3: false,
        flagDevice4: false,
        onOrOff1 : true,//shifouzaixian
        onOrOff2 : true,
        onOrOff3 : true,
        onOrOff4 : true,
        onLinePic1 : "build/img/keyscene-morning/icon_home_device_signal5.png",//tupian
        onLinePic2 : "build/img/keyscene-morning/icon_home_device_signal5.png",
        onLinePic3 : "build/img/keyscene-morning/icon_home_device_signal5.png",
        onLinePic4 : "build/img/keyscene-morning/icon_home_device_signal5.png",
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
        console.log($scope.config.openFlag);
        if ($scope.config.openFlag == true) {
          //马桶
          if($scope.config.flagDevice1 != true){
            console.log($scope.config.flagDevice1);
            $("#progressAnimation1").css({
              "-webkit-animation": "aaa 5.5s linear",
              "background": "#1a1d28"
            });
            $timeout(function () {
              $scope.config.device1 = true;
              $scope.config.openFlag = false;
            }, 5700);
          }
          //浴霸
          if($scope.config.flagDevice2 != true) {
            $("#progressAnimation3").css({
              "-webkit-animation": "aaa 3.0s linear",
              "background": "#1a1d28"
            });
            $timeout(function () {
              $scope.config.device3 = true;
            }, 2800);
          }
          //淋浴
          if($scope.config.flagDevice3 != true) {
            $("#progressAnimation2").css({
              "-webkit-animation": "aaa 6.0s linear",
              "background": "#1a1d28"
            });
            $timeout(function () {
              $scope.config.device2 = true;
            }, 5900);
          }
          //净水
          if($scope.config.flagDevice4 != true) {
            $("#progressAnimation4").css({
              "-webkit-animation": "aaa 1.5s linear",
              "background": "#1a1d28"
            });
            $timeout(function () {
              $scope.config.device4 = true;
            }, 1600);
          }
        } else {

        }
      }

      /**
       *@autor:daidongdong
       *@name:deleteKeyscene
       *@params:
       *@return:
       *@disc:delete Keyscene
       */
      $scope.deleteKeyscene = function () {
        hmsPopup.confirmNoTitle('删除场景', deleteKey);
        function deleteKey() {
          var url = "";
          var paramter = {}
          hmsHttp.post(url, paramter).success(
            function (response) {

            }
          ).error(
            function (response, status, header, config) {
            }
          );
        }

      }

    }]);
