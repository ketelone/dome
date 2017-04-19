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



    }]);
