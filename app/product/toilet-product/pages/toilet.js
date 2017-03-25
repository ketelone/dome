/**
 * Created by daidongdong on 17/43/20.
 */
angular.module('productModule')

  .controller('toiletCtrl', [
    '$scope',
    function ($scope) {


      $scope.$on('$ionicView.enter', function (e) {
        console.log('guideCtrl.$ionicView.enter');
      });

      $scope.$on('$destroy', function (e) {
        console.log('guideCtrl.$destroy');
      });
    }]);
