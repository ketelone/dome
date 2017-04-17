/**
 * Created by chenjiacheng on 17/3/27.
 */

angular.module('messageModule')

  .controller('messageCtrl', [
    '$scope',
    '$state',
    '$timeout',
    'publicMethod','$ionicPopup','hmsPopup','publicMethod',
    function ($scope,
              $state,
              $timeout,
              publicMethod,$ionicPopup,hmsPopup,publicMethod) {

      $scope.data = {
        showDelete: false
      };
  $scope.hasStaus=true;//defalut no Display
  $scope.hasException=false;//defalut no Display
  //$scope.noStaus=false;//defalut no status
  //$scope.noException=false;//defalut no Exception
 $scope.statusword='statusword';
$scope.exceptionword="";
      $scope.items= [
        {
          id: "1",
          statusMessage:"进水滤芯寿命提醒",
          device:"马桶",
          messageDel:"进水滤芯快到使用期限，快去跟换吧!",
          time:"2017-02-08 17:25"
        },
        {
          id: "2",
          statusMessage:"出水水温达到提醒",
          device:"淋浴",
          messageDel:"实际出水水温达到37°C",
          time:"2017-02-08 17:25"
        },{
          id: "3",
          statusMessage:"进水滤芯寿命提醒",
          device:"马桶",
          messageDel:"进水滤芯快到使用期限，快去跟换吧!",
          time:"2017-02-08 17:25"
        }
      ]


      /**
       *@author:chenjiacheng
       *@name:logout
       *@params:
       *@return:
       *@disc:Display status and alert list
       */
     $scope.showStatus=function(){
       $scope.hasStaus=true;
      // console.log( $scope.swStaus);
       $scope.hasException=false;
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
        $scope.hasStaus=false;
        //console.log( $scope.swStatus);
        $scope.hasException=true;
        $scope.exceptionword='exceptionword';
        $scope.statusword="";
      };
      /**
       *@author:chenjiacheng
       *@name:goDetele
       *@params:
       *@return:
       *@disc:goDetele
       */

      $scope.goDetele=function(item){


        var　toDetele=function(){

          $scope.items.splice($scope.items.indexOf(item), 1);
        }
        hmsPopup.confirmNoTitle( "<br><br><div ><div>删除后将无法在消息记录中找回,</div><br><div style='text-align:center'>是否要删除此消息?</div></div><br><br>",toDetele);


      };




      //hmsHttp.post(url, paramter).success(
      //  function(response){
      //
      //  }
      //).error(
      //  function (response, status, header, config){
      //  }
      //);











    }]);
