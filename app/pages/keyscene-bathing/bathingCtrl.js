/**
 * Created by daidongdong on 2017/4/3.
 */
angular.module('productModule')
  .controller('bathingCtrl', [
    '$scope',
    '$state',
    'publicMethod', '$ionicModal', '$ionicPopover', '$timeout', '$ionicHistory', 'hmsHttp', 'hmsPopup',
    function ($scope, $state, publicMethod, $ionicModal, $ionicPopover, $timeout, $ionicHistory, hmsHttp, hmsPopup) {


      $scope.config = {
        openFlag: true,
        device3: false,
        device4: false,
        flagDevice3: false,
        flagDevice4: false,
        onOrOff3: true,
        onOrOff4: true,
        onLinePic3: "build/img/keyscene-leavehome/icon_home_device_signal5.png",
        onLinePic4: "build/img/keyscene-leavehome/icon_home_device_signal5.png",
        isOneButton: true,
        isTwoButton: false,
        isOff: false
      }
      /**
       *@autor:daidongdong
       *@name:goBack
       *@params:
       *@return:
       *@disc:goback
       */
      $scope.goBack = function () {
        $ionicHistory.goBack();
      }

      $scope.getSwitchStatus = function (item) {
        if (item) {
          $scope.openKeyscene();
        } else {
          $scope.closeKeyscene();
        }
      };
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
          //浴霸
          if ($scope.config.flagDevice3 != true) {
            $("#progressAnimation3").css({
              "-webkit-animation": "aaa 6.0s linear",
              "background": "#1a1d28"
            });
            $timeout(function () {
              $scope.config.device3 = true;
            }, 5900);
          }
          //淋浴
          if ($scope.config.flagDevice4 != true) {
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


      $scope.closeKeyscene = function () {
        console.log($scope.config.openFlag);
        if ($scope.config.openFlag == true) {
          //浴霸
          if ($scope.config.flagDevice3 != true) {
            $scope.config.device3 = false;
            $("#progressAnimation3").css({
              "-webkit-animation": "bbb 6.0s linear",
              "background": ''
            });
          }
          //淋浴
          if ($scope.config.flagDevice4 != true) {
            $scope.config.device4 = false;
            $("#progressAnimation4").css({
              "-webkit-animation": "bbb 1.5s linear",
              "background": ''
            });
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
