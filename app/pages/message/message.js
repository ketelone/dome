/**
 * Created by chenjiacheng on 17/3/27.
 */

angular.module('messageModule')

  .controller('messageCtrl', [
    '$scope',
    '$state',
    '$timeout',
    'publicMethod','$ionicPopup','hmsPopup','publicMethod','hmsHttp',
    function ($scope,
              $state,
              $timeout,
              publicMethod,$ionicPopup,hmsPopup,publicMethod,hmsHttp) {



      $scope.data = {
        showDelete: false //左侧选择框
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
          exceptionMessage:"message.exceptionMessage",
          device:"message.device1",
          time:"message.time",
          circleUrl1:"build/img/common/radio_q.png",
          circleUrl2:"build/img/common/radio_h.png",
          circleUrltemp:"build/img/common/radio_q.png",
          ischecked:false,
          name:"exception"
        },
        {
          id: "2",
          exceptionMessage:"message.exceptionMessage",
          device:"message.device2",
          time:"message.time",
          circleUrl1:"build/img/common/radio_q.png",
          circleUrl2:"build/img/common/radio_h.png",
          circleUrltemp:"build/img/common/radio_q.png",
          ischecked:false,
          name:"exception"
        },{
          id: "3",
          exceptionMessage:"message.exceptionMessage",
          device:"message.device1",
          time:"message.time",
          circleUrl1:"build/img/common/radio_q.png",
          circleUrl2:"build/img/common/radio_h.png",
          ischecked:false,
          circleUrltemp:"build/img/common/radio_q.png",
         name:"exception"

        }
      ];


      $scope.statusitems= [
        {
          id: "1",
          statusMessage:"message.statusMessage1",
          device:"message.device1",
          messageDel:"message.messageDel1",
          time:"message.time",
          circleUrl1:"build/img/common/radio_q.png",
          circleUrl2:"build/img/common/radio_h.png",
          ischecked:false,
          circleUrltemp:"build/img/common/radio_q.png",
          name:"status"
        },
        {
          id: "2",
          statusMessage:"message.statusMessage2",
          device:"message.device2",
          messageDel:"message.messageDel2",
          time:"message.time",
          circleUrl1:"build/img/common/radio_q.png",
          circleUrl2:"build/img/common/radio_h.png",
          ischecked:false,
          circleUrltemp:"build/img/common/radio_q.png",
          name:"status"
        },{
          id: "3",
          statusMessage:"message.statusMessage1",
          device:"message.device2",
          messageDel:"message.messageDel1",
          time:"message.time",
          circleUrl1:"build/img/common/radio_q.png",
          circleUrl2:"build/img/common/radio_h.png",
          ischecked:false,
          circleUrltemp:"build/img/common/radio_q.png",
          name:"status"
        },{
          id: "4",
          statusMessage:"message.statusMessage1",
          device:"message.device1",
          messageDel:"message.messageDel1",
          time:"message.time",
          circleUrl1:"build/img/common/radio_q.png",
          circleUrl2:"build/img/common/radio_h.png",
          ischecked:false,
          circleUrltemp:"build/img/common/radio_q.png",
          name:"status"
        },
        {
          id: "5",
          statusMessage:"message.statusMessage1",
          device:"message.device1",
          messageDel:"message.messageDel1",
          time:"2017-02-08 17:25",
          circleUrl1:"build/img/common/radio_q.png",
          circleUrl2:"build/img/common/radio_h.png",
          ischecked:false,
          circleUrltemp:"build/img/common/radio_q.png",
          name:"status"
        },
      ]


      /**
       *@author:chenjiacheng
       *@name:getException
       *@params:
       *@return:
       *@disc: Get exception information from interface
       */
      function getException(){
        var url = "https://139.219.186.43/residential/r/api/cmm/deviceException/query";
        var paramter = [
          {"partyId":"1"}
        ];
        hmsHttp.post(url, paramter).success(
          function(response){
            alert("success");
            alert(response);
            console.log(response);
            // console.log(response.rows[0]);
            // $scope.deciveInfo.place = response.rows[0];
            //hmsPopup.showPopup("<span translate='bathroom.saveAlert'></span>");
          }
        ).error(
          function (response, status, header, config){
            //hmsPopup.showPopup("<span translate='bathroom.saveError'></span>");
            alert("1234");
          }
        );

      }
      getException();
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
       *@name:showException
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
       *@disc:goDetele item
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
       *@disc:ClickmanyChoose
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

        alert("statustrue");
        alert($scope.data.showDelete);
        if($scope.data.showDelete==false){
          return;
        }

        if(item.ischecked==true&& item.name=="status") {
           //alert("statustrue");
          for (var i = 0; i < $scope.statusitems.length; i++) {
            if ($scope.statusitems[i].id == item.id) {
              $scope.statusitems[i].ischecked = false;
              $scope.statusitems[i].circleUrl1 = $scope.statusitems[i].circleUrltemp;
            }
          }
        }

    else if(item.ischecked==false&& item.name=="status"){


      for (var i = 0; i < $scope.statusitems.length; i++) {
        if ($scope.statusitems[i].id == item.id) {
          $scope.statusitems[i].ischecked = true;
          $scope.statusitems[i].circleUrl1 = $scope.statusitems[i].circleUrl2;
        }
      }  }

     else   if(item.ischecked==true&& item.name=="exception") {
         // alert("exceptiontrue");
          if($scope.data.showDelete==false){
            return;
          }
          for (var i = 0; i < $scope.exceptionitems.length; i++) {
            if ($scope.exceptionitems[i].id ==item.id) {
              $scope.exceptionitems[i].ischecked = false;
              $scope.exceptionitems[i].circleUrl1 = $scope.exceptionitems[i].circleUrltemp;
    //alert(  $scope.exceptionitems[i].circleUrltemp +"2");
    //alert( $scope.exceptionitems[i].circleUrl1 +"1");
            }
          }

        }
    else  if(item.ischecked==false&& item.name=="exception") {
       //alert("exceptionfalse");
          if($scope.data.showDelete==false){
            return;
          }
          for (var i = 0; i < $scope.exceptionitems.length; i++) {
            if ($scope.exceptionitems[i].id ==item.id) {
              $scope.exceptionitems[i].ischecked = true;
              $scope.exceptionitems[i].circleUrl1 = $scope.exceptionitems[i].circleUrl2;
            }
          };
        }
 }
      /**
       *@author:chenjiacheng
       *@name:bottomGocancel
       *@params:
       *@return:
       *@disc:clickbottomGocancel
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
       *@disc:clickbottomManychoose
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
       *@disc:clickbottomGodetele
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

   // if ($scope.exceptionitems.length == 0) {

    //}
  }
  $scope.threeBottom = false;
  $scope.data.showDelete =false;
    }








    }]);
