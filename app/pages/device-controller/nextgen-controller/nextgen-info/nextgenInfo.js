/**
 *@autor: caolei
 */
angular.module('nextgenModule')
  .controller('nextgenInfoCtrl',[
    '$scope',
    '$state',
    'hmsPopup','$ionicHistory',
    function($scope, $state, hmsPopup,$ionicHistory){
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
        if(true){
          hmsPopup.showPopup("<span translate='bathroom.saveAlert'></span>");
          //$state.go('bathroomSet');
        }else{
          hmsPopup.showPopup("<span translate='bathroom.saveError'></span>");
        }
      }


    }]);
