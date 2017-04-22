/**
 *@autor: caolei
 */
angular.module('bathroomModule')
  .controller('bathroomSetCtrl',[
    '$scope',
    '$state',
    'hmsPopup',
    '$ionicHistory',
    function($scope, $state, hmsPopup, $ionicHistory){

      $scope.goBack = function(){
        $ionicHistory.goBack();
      };

      /**
       *@autor: caolei
       *@disc: restore default settings
       */
      $scope.resetDeviceInfo = function(){

        hmsPopup.confirmNoTitle('是否恢复默认设置', function(){
          /*var url = baseConfig.basePath + "/dvm/deviceAttribute/update";
          var paramter = {
            //""
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
        });

      };



    }]);
