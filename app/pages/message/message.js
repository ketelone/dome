/**
 * Created by daidongdong on 17/43/20.
 */

angular.module('messageModule')

  .controller('messageCtrl', [
    '$scope',
    '$state',
    '$timeout',
    'publicMethod',
    function ($scope,
              $state,
              $timeout,
              publicMethod) {

      $scope.$on('$ionicView.enter', function (e) {
        console.log('messageCtrl.$ionicView.enter');
      });

      $scope.$on('$destroy', function (e) {
        console.log('messageCtrl.$destroy');
      });

    }]);
