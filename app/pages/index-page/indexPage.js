/**
 * Created by daidongdong on 17/43/20.
 */

angular.module('indexPageModule')

  .controller('indexPageCtrl', [
    '$scope',
    '$state',
    'publicMethod',
    function ($scope,
              $state,
              publicMethod) {
      console.log('contactCtrl.enter');



      $scope.$on('$ionicView.enter', function (e) {
        console.log('contactCtrl.$ionicView.enter');
      });

      $scope.$on('$destroy', function (e) {
        console.log('contactCtrl.$destroy');
      });
    }]);
