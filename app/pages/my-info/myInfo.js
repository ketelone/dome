/**
 * Created by chenjiacheng on 17/3/27.
 */
/*
angular.module('myInfoModule')
  .config(['$stateProvider',
    function($stateProvider) {
      $stateProvider
        .state('addMembers', {
          url: '/addMembers',
          templateUrl: 'build/pages/my-info/add-members/addMembers.html',
          controller: 'addMembersCtrl'
        });
    }
  ]);*/
angular.module('myInfoModule')

  .controller('myInfoCtrl', [
    '$scope',
    '$state',
    'publicMethod',
    function ($scope,
              $state,
              publicMethod) {

      $scope.goToaddMember= function () {

       $state.go("/#/tab/addMembers");
      };





    }]);
