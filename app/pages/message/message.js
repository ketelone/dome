/**
 * Created by chenjiacheng on 17/3/27.
 */

angular.module('messageModule')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('messageDetail', {
          url: '/messageDetail',
          templateUrl: 'build/pages/message/message-detail/messageDetail.html',
          controller: 'messageDetailCtrl'
        })
    }
  ])
  .controller('messageCtrl', [
    '$scope',
    '$state',
    '$timeout',
    'publicMethod', '$ionicPopup', 'hmsPopup', 'hmsHttp', 'SettingsService', 'baseConfig',
    function ($scope,
              $state,
              $timeout,
              publicMethod, $ionicPopup, hmsPopup, hmsHttp, SettingsService, baseConfig) {


      $scope.data = {
        showDelete: false //左侧选择框是否显示
      };
      $scope.threeBottom = false;
      $scope.hasStaus = true;//defalut no Display
      $scope.hasException = false;//defalut no Display
      $scope.statusword = 'statusword';
      $scope.exceptionword = 'exceptionword';
      $scope.exceptionitems = [];
      $scope.statusitems = [];

      var circleUrl2 = "build/img/common/radio_h.png";
      var circleUrltemp = "build/img/common/radio_q.png";


      /**
       *@author:chenjiacheng
       *@name:getException
       *@params:
       *@return:
       *@disc: Get exception information from interface
       */

      function getException() {
        hmsPopup.showLoading();
        var url = baseConfig.basePath + "/r/api/cmm/deviceException/query";
        var paramter = [
          {"partyId": 6, page: 1, pageSize: 10,lang:'zh_CN'}
        ];
        hmsHttp.post(url, paramter).success(
          function (response) {
            //异常及保修
            if(response.success == true){
              for (var i = 0; i < response.rows.length; i++) {
                if (response.rows[i].exceptionType == 'err') {
                  //状态及提醒
                  $scope.statusitems.push({
                    id: response.rows[i].exceptionId,
                    statusMessage: response.rows[i].description,
                    device: response.rows[i].deviceName,
                    time: response.rows[i].creationDate,
                    exceptionId : response.rows[i].exceptionId,
                    circleUrl1: "build/img/common/radio_q.png",
                    ischecked: false,
                    name: "status",
                    hasRead: false,
                    readStyle: ""
                  });
                } else if (response.rows[i].exceptionType == 'warn') {
                  $scope.exceptionitems.push(
                    {
                      id: response.rows[i].exceptionId,
                      exceptionMessage: response.rows[i].description,
                      device: response.rows[i].deviceName,
                      time: response.rows[i].creationDate,
                      exceptionId : response.rows[i].exceptionId,
                      circleUrl1: "build/img/common/radio_q.png",
                      ischecked: false,
                      name: "exception",
                      hasRead: false,
                      readStyle: ""
                    }
                  );
                }
              }
            }
            $scope.exceptionitems.push({
              id: "200",
              exceptionMessage: "message.exceptionMessage",
              device: "message.device1",
              time: "message.time",
              circleUrl1: "build/img/common/radio_q.png",
              ischecked: false,
              name: "exception",
              hasRead: true,
              readStyle: ""
            });


            $scope.statusitems.push({
              id: "100",
              statusMessage: "message.statusMessage1",
              device: "message.device1",
              messageDel: "message.messageDel1",
              time: "message.time",
              circleUrl1: "build/img/common/radio_q.png",
              ischecked: false,
              name: "status",
              hasRead: true,
              readStyle: ""
            });
            console.log($scope.statusitems);
            read();
            hmsPopup.hideLoading();
          }
        ).error(
          function (response, status, header, config) {
          }
        );

      }

      getException();
      /**
       *@author:chenjiacheng
       *@name:logout
       *@params:
       *@return:
       *@disc:go  messageDetail list
       */
      $scope.goMessDetail = function (item) {

        SettingsService.set("exceptionId", item.id);
        $state.go("messageDetail");

      }
      /**
       *@author:chenjiacheng
       *@name:logout
       *@params:
       *@return:
       *@disc:判断是否已读
       */

      var read = function () {

        for (var i = 0; i < $scope.statusitems.length; i++) {
          if ($scope.statusitems[i].hasRead == true) {
            $scope.statusitems[i].readStyle = "hasread";
          }
        }

        for (var i = 0; i < $scope.exceptionitems.length; i++) {
          if ($scope.exceptionitems[i].hasRead == true) {
            $scope.exceptionitems[i].readStyle = "hasread";
          }
        }
      }
      /**
       *@author:chenjiacheng
       *@name:logout
       *@params:
       *@return:
       *@disc:Display status and alert list
       */
      $scope.showStatus = function () {
        $scope.hasStaus = true;
        // console.log( $scope.swStaus);
        $scope.hasException = false;
        $scope.statusword = 'statusword';
        $scope.exceptionword = "";
      };
      /**
       *@author:chenjiacheng
       *@name:showException
       *@params:
       *@return:
       *@disc:Display exception and warranty list
       */
      $scope.showException = function () {
        $scope.hasStaus = false;
        //console.log( $scope.swStatus);
        $scope.hasException = true;
        $scope.exceptionword = 'statusword';
        $scope.statusword = "";
      };
      /**
       *@author:chenjiacheng
       *@name:goDetele
       *@params:
       *@return:
       *@disc:goDetele item
       */


      $scope.goDeteleitem = function (item) {
        console.log(item);
        var toDetele = function () {
          if (item.name == 'status') {
            $scope.statusitems.splice($scope.statusitems.indexOf(item), 1);
          }
          else {
            $scope.exceptionitems.splice($scope.exceptionitems.indexOf(item), 1);
          }
          var paramter = [{"exceptionId": item.exceptionId}];
          console.log(paramter);
          var url = baseConfig.basePath + "/r/api/cmm/deviceException/delete";
          hmsHttp.post(url, paramter).success(function(response){
            console.log(response);
          }).error(
          );
        }
        hmsPopup.confirmNoTitle("<div ><div>删除后将无法在消息记录中找回,</div><br><div style='text-align:center'>是否要删除此消息?</div></div><br><br>", toDetele);

      };

      /**
       *@author:chenjiacheng
       *@name:manyChoose
       *@params:
       *@return:
       *@disc:ClickmanyChoose
       */
      $scope.manyChoose = function () {
        $scope.threeBottom = true;
        $scope.data.showDelete = true;

      }

      /**
       *@author:chenjiacheng
       *@name:onChoose
       *@params:
       *@return:
       *@disc:choose you click
       */
      $scope.onChoose = function (item) {

        //alert("statustrue");
        //  alert($scope.data.showDelete);
        //  if($scope.data.showDelete==false){
        //    return;
        //  }

        if (item.ischecked == true && item.name == "status") {
          //alert("statustrue");
          for (var i = 0; i < $scope.statusitems.length; i++) {
            if ($scope.statusitems[i].id == item.id) {
              $scope.statusitems[i].ischecked = false;
              $scope.statusitems[i].circleUrl1 = circleUrltemp;
            }
          }
        }

        else if (item.ischecked == false && item.name == "status") {

          for (var i = 0; i < $scope.statusitems.length; i++) {
            if ($scope.statusitems[i].id == item.id) {
              $scope.statusitems[i].ischecked = true;
              $scope.statusitems[i].circleUrl1 = circleUrl2;
            }
          }
        }

        else if (item.ischecked == true && item.name == "exception") {

          for (var i = 0; i < $scope.exceptionitems.length; i++) {
            if ($scope.exceptionitems[i].id == item.id) {
              $scope.exceptionitems[i].ischecked = false;
              $scope.exceptionitems[i].circleUrl1 = circleUrltemp;
              //alert(  $scope.exceptionitems[i].circleUrltemp +"2");
              //alert( $scope.exceptionitems[i].circleUrl1 +"1");
            }
          }

        }
        else if (item.ischecked == false && item.name == "exception") {
          //alert("exceptionfalse");

          for (var i = 0; i < $scope.exceptionitems.length; i++) {
            if ($scope.exceptionitems[i].id == item.id) {
              $scope.exceptionitems[i].ischecked = true;
              $scope.exceptionitems[i].circleUrl1 = circleUrl2;
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
       *@disc:clickbottomGocancel
       */
      $scope.bottomGocancel = function () {


        for (var i = 0; i < $scope.statusitems.length; i++) {
          $scope.statusitems[i].ischecked = false;
          $scope.statusitems[i].circleUrl1 = circleUrltemp;
        }
        for (var i = 0; i < $scope.exceptionitems.length; i++) {
          $scope.exceptionitems[i].ischecked = false;
          $scope.exceptionitems[i].circleUrl1 = circleUrltemp;
        }
        $scope.threeBottom = false;
        $scope.data.showDelete = false;

      }

      /**
       *@author:chenjiacheng
       *@name:bottomManychoose
       *@params:
       *@return:
       *@disc:clickbottomManychoose
       */
      $scope.hasChooseAllstatus = false;
      $scope.hasChooseAllexception = false;
      $scope.bottomManychoose = function () {
        if ($scope.hasStaus == true) {
          $scope.hasChooseAllstatus = !$scope.hasChooseAllstatus;
          if ($scope.hasChooseAllstatus == true) {
            for (var i = 0; i < $scope.statusitems.length; i++) {
              $scope.statusitems[i].ischecked = true;
              $scope.statusitems[i].circleUrl1 = circleUrl2;
            }

          } else {
            for (var i = 0; i < $scope.statusitems.length; i++) {

              $scope.statusitems[i].ischecked = false;
              $scope.statusitems[i].circleUrl1 = circleUrltemp;
            }
          }

        } else {

          $scope.hasChooseAllexception = !$scope.hasChooseAllexception;
          if ($scope.hasChooseAllexception == true) {
            for (var i = 0; i < $scope.exceptionitems.length; i++) {
              $scope.exceptionitems[i].ischecked = true;
              $scope.exceptionitems[i].circleUrl1 = circleUrl2;
            }

          } else {
            for (var i = 0; i < $scope.exceptionitems.length; i++) {

              $scope.exceptionitems[i].ischecked = false;
              $scope.exceptionitems[i].circleUrl1 = circleUrltemp;

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

      $scope.bottomGodetele = function () {

        if ($scope.hasStaus == true) {
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
        else {
          var tempArry = [];
          for (var i = 0; i < $scope.exceptionitems.length; i++) {
            if ($scope.exceptionitems[i].ischecked == false) {

              tempArry.push($scope.exceptionitems[i]);
            }

          }
          $scope.exceptionitems = tempArry;

        }
        $scope.threeBottom = false;
        $scope.data.showDelete = false;
      }


    }]);
