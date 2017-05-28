/**
 *@autor: caolei
 */
angular.module('bathroomModule')
  .controller('bathroomInfoCtrl',[
    '$scope',
    '$state',
    'hmsPopup',
    'hmsHttp',
    'baseConfig',
    function($scope, $state, hmsPopup, hmsHttp, baseConfig){

      $scope.location = "";

      $scope.$watch('', function(){
       /* var url = baseConfig.basePath + "/dvm/location/query";
        var paramter = {
          "lat": "39",
          "lng": "116"
        };
        hmsHttp.post(url, paramter).success(
          function(response){
            console.log(response.rows[0]);
            $scope.deciveInfo.place = response.rows[0];
            //hmsPopup.showPopup("<span translate='bathroom.saveAlert'></span>");
          }
        ).error(
          function (response, status, header, config){
            //hmsPopup.showPopup("<span translate='bathroom.saveError'></span>");
          }
        );*/
      },false);

      $scope.deciveInfo = {
        id: "3",
        deviceName: "Bathroom Heater",
        version: "1.2.6-133.0139",
        sku: "1.2.6-133.0139",
        sn: "1.2.6-133.0139",
        place: $scope.location
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
            hmsPopup.showPopup("<span translate='bathroom.saveError'></span>");
          }
        );
      }


    }]);
