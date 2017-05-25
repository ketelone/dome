/**
 * Created by chenjiacheng on 17/3/27.
 */

angular.module('messageModule')
  .config(['$stateProvider',
    function ($stateProvider) {
      //配置消息详情页面路由
      $stateProvider.state('messageDetail', {
        url: '/messageDetail',
        templateUrl: 'build/pages/message/message-detail/messageDetail.html',
        controller: 'messageDetailCtrl'
      })
    }
  ])
  .controller('messageCtrl', [
    '$scope', '$state', '$timeout', 'publicMethod', '$ionicPopup',
    'hmsPopup', 'hmsHttp', 'SettingsService', 'baseConfig',
    function ($scope, $state, $timeout, publicMethod, $ionicPopup,
              hmsPopup, hmsHttp, SettingsService, baseConfig) {
      $scope.data = {
        showDelete: false //左侧选择框是否显示
      };
      $scope.threeBottom = false;//底下三个选项是否显示
      $scope.messages = [];//消息对象数组
      $scope.empty_message="";//空消息的内容
      $scope.showEmptyMessage=false;//是否显示空消息
      $scope.index=0;//选中的tab的下标

      //设置messages数组的数据
      function setMessages(type) {
        $scope.messages=[];
        if(type==0) {
          $scope.messages.push({
            id: "100",
            message: "message.statusMessage1",
            device: "message.device1",
            messageDel: "message.messageDel1",
            time: "message.time",
            circleUrl1: "build/img/common/radio_q.png",
            ischecked: false,
            hasRead: true,
          });
          $scope.messages.push({
            id: "200",
            message: "message.statusMessage1",
            device: "message.device1",
            messageDel: "message.messageDel1",
            time: "message.time",
            circleUrl1: "build/img/common/radio_q.png",
            ischecked: false,
            hasRead: false,
          });
        }
        else if(type==1){
          $scope.messages.push({
            id: "200",
            message: "message.exceptionMessage",
            device: "message.device2",
            time: "message.time",
            circleUrl1: "build/img/common/radio_q.png",
            ischecked: false,
            hasRead: false,
          });
          $scope.messages.push({
            id: "300",
            message: "message.exceptionMessage",
            device: "message.device2",
            time: "message.time",
            circleUrl1: "build/img/common/radio_q.png",
            ischecked: false,
            hasRead: true,
          });
        }
        //获取数据
        // hmsPopup.showLoading();
        // var url = baseConfig.basePath + "/r/api/cmm/deviceException/query";
        // var paramter = [
        //   {"partyId": 6, page: 1, pageSize: 10,lang:'zh_CN'}
        // ];
        // hmsHttp.post(url, paramter).success(
        //   function (response) {
        //     if(response.success == true){
        //       for (var i = 0; i < response.rows.length; i++) {
        //         if (type==0&&response.rows[i].exceptionType == 'err') {//'warn'
        //           //状态及提醒
        //           $scope.statusitems.push({
        //             id: response.rows[i].exceptionId,
        //             message: response.rows[i].description,
        //             device: response.rows[i].deviceName,
        //             time: response.rows[i].creationDate,
        //             circleUrl1: "build/img/common/radio_q.png",
        //             ischecked: false,
        //             hasRead: false,
        //           });
        //         }
        //       }
        //       hmsPopup.hideLoading();
        //     }
        //   }
        // ).error(
        //   function (response, status, header, config) {
        //     $timeout(function () {
        //       hmsPopup.hideLoading();
        //     },2000);
        //   }
        // );
      }

      //初始化messages数组
      setMessages(0);

      //tab点击，切换内容
      $scope.listClick = function (index) {
        $scope.index=index;
        setMessages(index);
        if($scope.messages.length==0){
          $scope.empty_message="message.noMessageWord"+index;
          $scope.showEmptyMessage=true;
        }else{
          $scope.empty_message="";
          $scope.showEmptyMessage=false;
        }
      }

      var circleUrl2 = "build/img/common/radio_h.png";
      var circleUrltemp = "build/img/common/radio_q.png";

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
       *@name:goDetele
       *@params:
       *@return:
       *@disc:goDetele item
       */
      $scope.goDeteleitem = function (item) {
        console.log(item);
        var toDetele = function (res) {
          if(res==true){
            $scope.messages.splice($scope.messages.indexOf(item), 1);
          }
          // var paramter = [{"exceptionId": item.id}];
          // console.log(paramter);
          // var url = baseConfig.basePath + "/r/api/cmm/deviceException/delete";
          // hmsHttp.post(url, paramter).success(function (response) {
          //   console.log(response);
          // }).error(
          // );
        };
        hmsPopup.confirmNoTitle("<div style='text-align:center'>删除后将无法在消息记录中找回,<br/>是否要删除此消息?</div>",
        "删除","取消",toDetele);
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
        if (item.ischecked) {//被选中
          item.circleUrl1 = circleUrltemp;
        }else{
          item.circleUrl1 = circleUrl2;
        }
        item.ischecked=!item.ischecked;
      }

      /**
       *@author:chenjiacheng
       *@name:bottomGocancel
       *@params:
       *@return:
       *@disc:clickbottomGocancel
       */
      $scope.bottomGocancel = function () {
        $scope.messages.forEach(function (message) {
          message.ischecked = false;
          message.circleUrl1 = circleUrltemp;
        });
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
      $scope.bottomManychoose = function () {
        $scope.messages.forEach(function (message) {
          message.ischecked = true;
          message.circleUrl1 = circleUrl2;
        });
      }

      /**
       *@author:chenjiacheng
       *@name:bottomGodetele
       *@params:
       *@return:
       *@disc:clickbottomGodetele
       */
      $scope.bottomGodetele = function () {
        var deleteArray=$scope.messages.filter(function(message){
          return message.ischecked;
        });
        var tempArray=$scope.messages.filter(function(message){
          return !message.ischecked;
        });
        var toDetele = function (res) {
          if(res==true){
            $scope.messages=tempArray;
          }
          // var paramter = [{"exceptionId": item.id}];
          // console.log(paramter);
          // var url = baseConfig.basePath + "/r/api/cmm/deviceException/delete";
          // hmsHttp.post(url, paramter).success(function (response) {
          //   console.log(response);
          // }).error(
          // );
        };
        hmsPopup.confirmNoTitle("<div style='text-align:center'>删除后将无法在消息记录中找回,<br/>是否要删除这些消息?</div>",
          "删除","取消",toDetele);
        $scope.threeBottom = false;
        $scope.data.showDelete = false;
      }

    }]);
