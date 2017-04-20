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

      $scope.threeBottom=false;
  $scope.hasStaus=true;//defalut no Display
  $scope.hasException=false;//defalut no Display
  //$scope.noStaus=false;//defalut no status
  //$scope.noException=false;//defalut no Exception
 $scope.statusword='statusword';
$scope.exceptionword='exceptionword';

      $scope.exceptionitems= [
        {
          id: "1",
          exceptionMessage:"自动开盖功能异常",
          device:"马桶1",
          time:"2017-02-08 17:25",
          circleUrl1:"build/img/message/radio_q.png",
          circleUrl2:"build/img/message/radio_h.png",
          ischecked:false
        },
        {
          id: "2",
          exceptionMessage:"自动开盖功能异常",
          device:"淋浴1",
          time:"2017-02-08 17:25",
          circleUrl1:"build/img/message/radio_q.png",
          circleUrl2:"build/img/message/radio_h.png",
          ischecked:false
        },{
          id: "3",
          exceptionMessage:"自动开盖功能异常",
          device:"马桶2",
          time:"2017-02-08 17:25",
          circleUrl1:"build/img/message/radio_q.png",
          circleUrl2:"build/img/message/radio_h.png",
          ischecked:false,
          circleUrltemp:"build/img/message/radio_q.png"

        }
      ];
      $scope.statusitems= [
        {
          id: "1",
          statusMessage:"进水滤芯寿命提醒",
          device:"马桶1",
          messageDel:"进水滤芯快到使用期限，快去跟换吧!",
          time:"2017-02-08 17:25",
          circleUrl1:"build/img/message/radio_q.png",
          circleUrl2:"build/img/message/radio_h.png",
          ischecked:false,
          circleUrltemp:"build/img/message/radio_q.png"
        },
        {
          id: "2",
          statusMessage:"出水水温达到提醒",
          device:"淋浴1",
          messageDel:"实际出水水温达到37°C",
          time:"2017-02-08 17:25",
          circleUrl1:"build/img/message/radio_q.png",
          circleUrl2:"build/img/message/radio_h.png",
          ischecked:false,
          circleUrltemp:"build/img/message/radio_q.png"
        },{
          id: "3",
          statusMessage:"进水滤芯寿命提醒",
          device:"马桶2",
          messageDel:"进水滤芯快到使用期限，快去跟换吧!",
          time:"2017-02-08 17:25",
          circleUrl1:"build/img/message/radio_q.png",
          circleUrl2:"build/img/message/radio_h.png",
          ischecked:false,
          circleUrltemp:"build/img/message/radio_q.png"
        },{
          id: "4",
          statusMessage:"进水滤芯寿命提醒",
          device:"马桶3",
          messageDel:"进水滤芯快到使用期限，快去跟换吧!",
          time:"2017-02-08 17:25",
          circleUrl1:"build/img/message/radio_q.png",
          circleUrl2:"build/img/message/radio_h.png",
          ischecked:false,
          circleUrltemp:"build/img/message/radio_q.png"
        },
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
        $scope.exceptionword='statusword';
        $scope.statusword="";
      };
      /**
       *@author:chenjiacheng
       *@name:goDetele
       *@params:
       *@return:
       *@disc:goDetele
       */

      $scope.goDeteleStatusitem=function(statusitem){


        var　toDetele=function(){

          $scope.statusitems.splice($scope.statusitems.indexOf(statusitem), 1);
        }
        hmsPopup.confirmNoTitle( "<br><br><div ><div>删除后将无法在消息记录中找回,</div><br><div style='text-align:center'>是否要删除此消息?</div></div><br><br>",toDetele);

 };
      /**
       *@author:chenjiacheng
       *@name:goDetele
       *@params:
       *@return:
       *@disc:goDetele
       */

      $scope.goDeteleExceptionitem=function(statusitem){


        var　toDetele=function(){

          $scope.exceptionitems.splice($scope.exceptionitems.indexOf(statusitem), 1);
        }
        hmsPopup.confirmNoTitle( "<br><br><div ><div>删除后将无法在消息记录中找回,</div><br><div style='text-align:center'>是否要删除此消息?</div></div><br><br>",toDetele);


      };
      /**
       *@author:chenjiacheng
       *@name:manyChoose
       *@params:
       *@return:
       *@disc:manyChoose
       */
      $scope.manyChoose=function(){
      $scope.threeBottom=true;
      $scope.data.showDelete = true;

  }

      /**
       *@author:chenjiacheng
       *@name:onChoose
       *@params:
       *@return:
       *@disc:choose you click
       */
      $scope.onChoose=function(statusitem){
        //  statusitem.showCircle=!statusitem.showCircle;
        alert(statusitem.ischecked);
        if(statusitem.ischecked==false){
          statusitem.ischecked=true;
          statusitem.circleUrl1=statusitem.circleUrl2;
          $scope.$apply();
          for(var i=0;i<$scope.statusitems.length;i++) {

         //   alert($scope.statusitems[i].device);
           // alert(statusitem.id);
      //if($scope.statusitems[i].id==statusitem.id){
        //     $scope.statusitems[i].ischecked = true;
            // $scope.statusitems[i].circleUrl1 =$scope.statusitems[i].circleUrl2;
             // alert($scope.statusitems[i].circleUrl1);
              //$scope.$apply();
            //};



           // });

          }

        }
        if(statusitem.ischecked==true){
          statusitem.ischecked=false;
          statusitem.circleUrl1=statusitem.circleUrltemp;

        }
      }
      /**
       *@author:chenjiacheng
       *@name:bottomGocancel
       *@params:
       *@return:
       *@disc:bottomGocancel
       */
      $scope.bottomGocancel=function(){

        $scope.threeBottom=false;

        $scope.data.showDelete =false;

    }
      //hmsHttp.post(url, paramter).success(
      //  function(response){
      //
      //  }
      //).error(
      //  function (response, status, header, config){
      //  }
      //);











    }]);
