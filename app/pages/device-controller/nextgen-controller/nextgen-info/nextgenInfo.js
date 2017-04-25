/**
 *@autor: caolei
 */
angular.module('nextgenModule')
  .controller('nextgenInfoCtrl',[
    '$scope',
    '$state',
    'hmsPopup','$ionicHistory','baseConfig','hmsHttp',
    function($scope, $state, hmsPopup,$ionicHistory,baseConfig,hmsHttp){
      $scope.goBack = function(){
        $ionicHistory.goBack();
      }
      $scope.deciveInfo = {
        id: "1",
        deviceName: "Bathroom Header",
        version: "1.2.6-133.0139",
        sku: "1.2.6-133.0139",
        sn: "1.2.6-133.0139",
        place: "上海市闵行区"
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
            hmsPopup.showPopup("<span translate='nextgen.deiveceMess.saveAlert'></span>");
          }
        ).error(
          function (response, status, header, config){
            alert("-----");
            hmsPopup.showPopup("<span translate='nextgen.deiveceMess.saveError'></span>");
          }
        );
      }



    }]);
