/**
 * Created by chenjiacheng on 17/3/27.
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


  $scope.swStaus=true;
  $scope.swException=false;
      /**
       *@author:chenjiacheng
       *@name:logout
       *@params:
       *@return:
       *@disc:Display status and alert list
       */
     $scope.showStatus=function(){
       $scope.swStaus=true;
      // console.log( $scope.swStaus);
       $scope.swException=false;
       $scope.statusword='statusword';
       $scope.exceptionword="";
    };
      /**
       *@author:chenjiacheng
       *@name:logout
       *@params:
       *@return:
       *@disc:Display exception and warranty list
       */
      $scope.showException=function(){
        $scope.swStaus=false;
        //console.log( $scope.swStatus);
        $scope.swException=true;
        $scope.exceptionword='exceptionword';
        $scope.statusword="";
      };
 $scope.statusword='statusword';
 $scope.exceptionword="";






    }]);
