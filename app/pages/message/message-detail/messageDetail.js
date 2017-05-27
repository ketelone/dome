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

      /**go back to last url**/
      $scope.goBack = function () {
        $ionicHistory.goBack();
      }

      /**message's id**/
      var messageId=$stateParams.messageId;

      /**message's detail**/
      $scope.data={};

      $scope.data={
        "box":"BOX1",
        "room":"卫生间",
        "device":"马桶",
        "description":"进水滤芯快到使用期限，请及时更换",
        "hasRead":false,
        "advice":"滤芯需更换？快去商城购买吧！",
        "link":""
      };

      /**display message's detail**/
      // var displayDetail=function () {
      //   var url = baseConfig.basePath + "/r/api/cmm/exceptionDetail/query";
      //   var paramter = [{"exceptionId": messageId}];
      //   hmsHttp.post(url, paramter).success(
      //     function (response) {
      //       //  alert("success");
      //       // alert(response);
      //       if(response.success == true) {
      //         $scope.data={
      //           "box":response.box,
      //           "room":response.room,
      //           "device":response.device,
      //           "description":response.description,
      //           "hasRead":response.hasRead,
      //           "advice":response.advice,
      //           "link":response.link
      //         };
      //       }
      //     }
      //   ).error(
      //     function (response, status, header, config) {
      //       //hmsPopup.showPopup("<span translate='bathroom.saveError'></span>");
      //       //  alert("1234");
      //     }
      //   );
      // };

      /**change the message's read status**/
      function hasRead() {
        $scope.data.hasRead = true;
        // var url = baseConfig.basePath + "/r/api/cmm/deviceException/update";
        // var paramter =
        //   {"exceptionId": exceptionId, "processStatus": "Y"};
        // hmsHttp.post(url, paramter).success(
        //   function (response) {
        //     //  alert("success");
        //     alert(response);
        //     $scope.data.hasRead = true;
        //   }
        // ).error(
        //   function (response, status, header, config) {
        //     //hmsPopup.showPopup("<span translate='bathroom.saveError'></span>");
        //     //  alert("1234");
        //   }
        // );
      }

    }]);
