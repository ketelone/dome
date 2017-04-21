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
          ischecked:false,
          name:"exception"
        },
        {
          id: "2",
          exceptionMessage:"自动开盖功能异常",
          device:"淋浴1",
          time:"2017-02-08 17:25",
          circleUrl1:"build/img/message/radio_q.png",
          circleUrl2:"build/img/message/radio_h.png",
          ischecked:false,
          name:"exception"
        },{
          id: "3",
          exceptionMessage:"自动开盖功能异常",
          device:"马桶2",
          time:"2017-02-08 17:25",
          circleUrl1:"build/img/message/radio_q.png",
          circleUrl2:"build/img/message/radio_h.png",
          ischecked:false,
          circleUrltemp:"build/img/message/radio_q.png",
         name:"exception"

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
          circleUrltemp:"build/img/message/radio_q.png",
          name:"status"
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
          circleUrltemp:"build/img/message/radio_q.png",
          name:"status"
        },{
          id: "3",
          statusMessage:"进水滤芯寿命提醒",
          device:"马桶2",
          messageDel:"进水滤芯快到使用期限，快去跟换吧!",
          time:"2017-02-08 17:25",
          circleUrl1:"build/img/message/radio_q.png",
          circleUrl2:"build/img/message/radio_h.png",
          ischecked:false,
          circleUrltemp:"build/img/message/radio_q.png",
          name:"status"
        },{
          id: "4",
          statusMessage:"进水滤芯寿命提醒",
          device:"马桶3",
          messageDel:"进水滤芯快到使用期限，快去跟换吧!",
          time:"2017-02-08 17:25",
          circleUrl1:"build/img/message/radio_q.png",
          circleUrl2:"build/img/message/radio_h.png",
          ischecked:false,
          circleUrltemp:"build/img/message/radio_q.png",
          name:"status"
        },
        {
          id: "5",
          statusMessage:"进水滤芯寿命提醒",
          device:"马桶3",
          messageDel:"进水滤芯快到使用期限，快去跟换吧!",
          time:"2017-02-08 17:25",
          circleUrl1:"build/img/message/radio_q.png",
          circleUrl2:"build/img/message/radio_h.png",
          ischecked:false,
          circleUrltemp:"build/img/message/radio_q.png",
          name:"status"
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


      $scope.goDeteleitem=function(item){
        var　toDetele=function(){
          if(item.name=='status') {

            $scope.statusitems.splice($scope.statusitems.indexOf(item), 1);
          }
          else{
            $scope.exceptionitems.splice($scope.exceptionitems.indexOf(item), 1);
          }
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
      $scope.onChoose=function(item){


        if(item.ischecked==true&item.name=="status") {
          alert("statustrue");
          for (var i = 0; i < $scope.statusitems.length; i++) {
            if ($scope.statusitems[i].id == item.id) {
              $scope.statusitems[i].ischecked = false;
              $scope.statusitems[i].circleUrl1 = $scope.statusitems[i].circleUrltemp;
            }
          }
        }

    if(item.ischecked==false&item.name=="status"){
      alert("statusfalse");
      for (var i = 0; i < $scope.statusitems.length; i++) {
        if ($scope.statusitems[i].id == item.id) {
          $scope.statusitems[i].ischecked = true;
          $scope.statusitems[i].circleUrl1 = $scope.statusitems[i].circleUrl2;
        }
      }  }

        if(item.ischecked==true&item.name=="exception") {
          alert("exceptiontrue");
          for (var i = 0; i < $scope.exceptionitems.length; i++) {
            if ($scope.exceptionitems[i].id ==item.id) {
              $scope.exceptionitems[i].ischecked = false;
              $scope.exceptionitems[i].circleUrl1 = $scope.exceptionitems[i].circleUrltemp;
            }
          }

        }
        if(item.ischecked==false&item.name=="exception") {
          alert("exceptionfalse");
          for (var i = 0; i < $scope.exceptionitems.length; i++) {
            if ($scope.exceptionitems[i].id ==item.id) {
              $scope.exceptionitems[i].ischecked = true;
              $scope.exceptionitems[i].circleUrl1 = $scope.exceptionitems[i].circleUrl2;
            }
          }
       ;
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


        for (var i = 0; i < $scope.statusitems.length; i++) {
            $scope.statusitems[i].ischecked = false;
          $scope.statusitems[i].circleUrl1 = $scope.statusitems[i].circleUrltemp;
        }
        for (var i = 0; i < $scope.exceptionitems.length; i++) {
          $scope.exceptionitems[i].ischecked = false;
          $scope.exceptionitems[i].circleUrl1 = $scope.exceptionitems[i].circleUrltemp;
        }
        $scope.threeBottom=false;
        $scope.data.showDelete =false;

      }

      /**
       *@author:chenjiacheng
       *@name:bottomManychoose
       *@params:
       *@return:
       *@disc:bottomManychoose
       */
    $scope.hasChooseAllstatus=false;
      $scope.hasChooseAllexception=false;
    $scope.bottomManychoose=function() {
if( $scope.hasStaus==true) {
  $scope.hasChooseAllstatus = !$scope.hasChooseAllstatus;
  if ($scope.hasChooseAllstatus == true) {
    for (var i = 0; i < $scope.statusitems.length; i++) {
      $scope.statusitems[i].ischecked = true;
      $scope.statusitems[i].circleUrl1 = $scope.statusitems[i].circleUrl2;
    }

  } else {
    for (var i = 0; i < $scope.statusitems.length; i++) {

      $scope.statusitems[i].ischecked = false;
      $scope.statusitems[i].circleUrl1 = $scope.statusitems[i].circleUrltemp;
    }
  }

}else{

  $scope.hasChooseAllexception = !$scope.hasChooseAllexception;
  if ($scope.hasChooseAllexception == true) {
    for (var i = 0; i < $scope.exceptionitems.length; i++) {
      $scope.exceptionitems[i].ischecked = true;
      $scope.exceptionitems[i].circleUrl1 = $scope.exceptionitems[i].circleUrl2;
    }

  } else {
    for (var i = 0; i < $scope.exceptionitems.length; i++) {

      $scope.exceptionitems[i].ischecked = false;
      $scope.exceptionitems[i].circleUrl1 = $scope.exceptionitems[i].circleUrltemp;

    }

  }




}



  }



        /**
       *@author:chenjiacheng
       *@name:bottomGodetele
       *@params:
       *@return:
       *@disc:bottomGodetele
       */

$scope.bottomGodetele=function(){

  if( $scope.hasStaus==true) {
    var tempArry = [];
    for (var i = 0; i < $scope.statusitems.length; i++) {
      if ($scope.statusitems[i].ischecked == false) {

        tempArry.push($scope.statusitems[i]);
      }

    }
    $scope.statusitems = tempArry;

    if ($scope.statusitems.length == 0) {
      $scope.threeBottom = false;
    }
  }
  else{
    var tempArry = [];
    for (var i = 0; i < $scope.exceptionitems.length; i++) {
      if ($scope.exceptionitems[i].ischecked == false) {

        tempArry.push($scope.exceptionitems[i]);
      }

    }
    $scope.exceptionitems = tempArry;

    if ($scope.exceptionitems.length == 0) {
      $scope.threeBottom = false;
    }
  }
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
