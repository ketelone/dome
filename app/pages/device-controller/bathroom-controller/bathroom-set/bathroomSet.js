/**
 *@autor: caolei
 */
angular.module('bathroomModule')
  .controller('bathroomSetCtrl',[
    '$scope',
    '$state',
    'hmsPopup',
    '$ionicHistory',
    '$translate',
    function($scope, $state, hmsPopup, $ionicHistory, $translate){

      $scope.goBack = function(){
        $state.go('bathroom');
      };

      /**
       *@autor: caolei
       *@disc: restore default settings
       */
      $scope.resetDeviceInfo = function(){

        hmsPopup.confirmNoTitle($translate.instant('bathroom.reset'),$translate.instant('golabelvariable.PopupConfire'),$translate.instant('golabelvariable.PopupCancle'),function () {
          localStorage.windType = "bathroom.rock";
          localStorage.hotTimer = "default";
          localStorage.hotDryingTimer = "default";
          localStorage.coolTimer = "default";
          localStorage.dryerTimer = "default";
          localStorage.purityTimer = "default";
          localStorage.breathTimer = "default";
        });

      };



    }]);
