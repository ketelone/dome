angular.module('messageModule')
  .controller('messageDetailCtrl', [
    '$scope', '$state', 'baseConfig',
    '$ionicLoading', '$http', '$timeout',
    '$ionicHistory', '$ionicPlatform',
    '$ionicScrollDelegate', 'hmsPopup',
    '$rootScope', 'publicMethod',
    '$stateParams', 'hmsHttp',
    'SettingsService', 'baseConfig',
    function ($scope, $state, baseConfig, $ionicLoading, $http,
              $timeout, $ionicHistory, $ionicPlatform,
              $ionicScrollDelegate, hmsPopup,
              $rootScope, publicMethod, $stateParams,
              hmsHttp, SettingsService, baseConfig) {

      $scope.goBack = function () {
        $ionicHistory.goBack();
      }

      $scope.messageDetail = "";
      $scope.hasUpdate = "";

      var exceptionId = SettingsService.get("exceptionId");
      // console.log(exceptionId+1);
      function hasRead() {
        var url = baseConfig.basePath + "/r/api/cmm/deviceException/update";
        var paramter =
          {"exceptionId": exceptionId, "processStatus": "Y"};
        hmsHttp.post(url, paramter).success(
          function (response) {
            //  alert("success");
            alert(response);
            $scope.hasUpdate = response;
          }
        ).error(
          function (response, status, header, config) {
            //hmsPopup.showPopup("<span translate='bathroom.saveError'></span>");
            //  alert("1234");
          }
        );

      }

      hasRead();


      function displayDetail() {
        var url = baseConfig.basePath + "/r/api/cmm/exceptionDetail/query";
        var paramter = [{}];
        hmsHttp.post(url, paramter).success(
          function (response) {
            //  alert("success");
            // alert(response);
            $scope.messageDetail = response;
          }
        ).error(
          function (response, status, header, config) {
            //hmsPopup.showPopup("<span translate='bathroom.saveError'></span>");
            //  alert("1234");
          }
        );

      }

      displayDetail();


    }]);
