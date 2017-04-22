/**
 *@autor:
 */
angular.module('karessControlModule')
  .controller('karessInfoControllerCtrl',[
    '$scope',
    '$state',
    'hmsPopup','$ionicHistory',
    function($scope, $state, hmsPopup,$ionicHistory){



      $scope.goBack = function(){
        $ionicHistory.goBack();
      }

      function openLocation()
      {

        cordova.plugins.location.openLocation({"timeout":"3000"},success , error);
        function success(msg)
        {
          console.log(msg);
        }
        // 返回值 {"latitude":"1231231","longitude":"1231231"}

        function error(msg)
        {
          console.log(msg);
        }
      }

      $scope.deciveInfo = {
        id: "3",
        deviceName: "Bathroom Header",
        version: "1.2.6-133.0139",
        sku: "1.2.6-133.0139",
        sn: "1.2.6-133.0139",
        place: "上海市闵行区1234567"
      };

      /**
       *@autor: caolei
       *@params: Object deciveInfo
       *@disc: update device's place information
       */
      $scope.save = function(item){
        //save device info
        var url = baseConfig.basePath + "/dvm/deviceInfo/update";
        var paramter = {
          deviceId: item.id,
          location: item.place
        };
        hmsHttp.post(url, paramter).success(
          function(response){
            console.log(response);
            $scope.deciveInfo.place = response.rows[0].location;
            hmsPopup.showPopup("<span translate='bathroom.saveAlert'></span>");
          }
        ).error(
          function (response, status, header, config){
            alert("-----");
            hmsPopup.showPopup("<span translate='bathroom.saveError'></span>");
          }
        );
      }

    }]);
