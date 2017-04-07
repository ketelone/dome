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
       *@disc:显示状态及提醒列表
       */
     $scope.showStatus=function(){
       $scope.swStaus=true;
      // console.log( $scope.swStaus);
       $scope.swException=false;
    };
      /**
       *@author:chenjiacheng
       *@name:logout
       *@params:
       *@return:
       *@disc:显示异常及保修列表
       */
      $scope.showException=function(){
        $scope.swStaus=false;
        //console.log( $scope.swStatus);
        $scope.swException=true;

      };




    }]);
