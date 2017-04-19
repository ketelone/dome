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
