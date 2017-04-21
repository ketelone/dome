angular.module('toiletControlModule')
  .controller('cleargearPlanCtrl', [
    '$scope',
    '$state',
    'publicMethod',
    '$ionicModal',
    'baseConfig',
    'checkVersionService',
    'hmsPopup',
    function ($scope,
              $state,
              publicMethod,
              $ionicModal,
              baseConfig,
              checkVersionService,
              hmsPopup
    ) {

      $scope.clearGearPlan = true;

      //时间选择

      // //自动翻盖设置
      // $ionicModal.fromTemplateUrl('build/pages/model/hmsiot-setSelect.html', {
      //   scope: $scope,
      //   animation: 'slide-in-up'
      // }).then(function (modal) {
      //   $scope.setmodal = modal;
      // });
      // $scope.setopenModal = function () {
      //   $scope.listright=$scope.listleft[0].towdata;
      //   $scope.setmodal.show();
      //   setTimeout(function () {
      //     var ele = document.getElementsByClassName("hmsiot-setSelect");
      //     ele[0].style.top = 68 + '%';
      //     ele[0].style.minHeight = 61 + '%';
      //   }, 10)
      // };
      // $scope.$on('$destroy', function() {
      //   $scope.setmodal.remove();
      // });
      // $scope.setchoose = function () {
      //   $scope.toilteSetting.gaiganyin=$scope.gaiganyinTemp;
      //   $scope.toilteSetting.gaiganyinDistance=$scope.gaiganyinDistanceTemp;
      //   $scope.setmodal.hide();
      // };
    }]);
