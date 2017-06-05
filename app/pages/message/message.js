/**
 * Writed by LiaoXuyi
 */
angular.module('messageModule')
  .config(['$stateProvider',
    function ($stateProvider) {
      //配置消息详情页面路由
      //Configure messageDetail router
      $stateProvider.state('messageDetail', {
        url: '/message/detail/:messageId',
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
      /**whether show delete checkbox on the left**/
      $scope.showDelete=false //左侧选择框是否显示
      /**whether show three button on the bottom**/
      $scope.threeBottom = false;//底下三个选项是否显示
      /**the message object array**/
      $scope.messages = [];//消息对象数组
      /**the message to tell user the messages array is empty**/
      $scope.empty_message="";//空消息的内容
      /**whether show empty_message**/
      $scope.showEmptyMessage=false;//是否显示空消息
      /**the clicked tab **/
      $scope.index=0;//选中的tab的下标

      //设置messages数组的数据
      /**
       * set type of message and ask the interface to get the messages
       * @param type:the type of message
       * @return the new messages array
       */
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
      /**init the messages array when entering the message page**/
      setMessages(0);

      //tab点击，切换内容
      /**
       * change the clicked tab style and reset messages array
       * if messages array is empty,show the empty_message
       * @param index: the index of clicked tab
       */
      $scope.listClick = function (index) {
        $scope.index=index;
        setMessages(index);//获取数据
        if($scope.messages.length==0){
          $scope.empty_message="message.noMessageWord"+index;
          $scope.showEmptyMessage=true;
        }else{
          $scope.empty_message="";
          $scope.showEmptyMessage=false;
        }
      }

      /**the img of selected checkbox**/
      var circleUrl2 = "build/img/common/radio_h.png";
      /**the img of unselected checkbox**/
      var circleUrltemp = "build/img/common/radio_q.png";

      /**
       * delete message and refresh the messages arrays
       * @param item:the clicked message
       */
      $scope.goDeteleitem = function (item) {
        var toDetele = function (res) {
          if(res==true){//comfirm to delete message
            //ask the interface to delete the message
            // var paramter = [{"exceptionId": item.id}];
            // console.log(paramter);
            // var url = baseConfig.basePath + "/r/api/cmm/deviceException/delete";
            // hmsHttp.post(url, paramter).success(function (response) {
            //   console.log(response);
            // }).error(
            // );
            //refresh the messages arrays
            $scope.messages.splice($scope.messages.indexOf(item), 1);
          }
        };
        //pop the dialog to ask whether confirm to delete message
        hmsPopup.confirmNoTitle("<div style='text-align:center'>删除后将无法在消息记录中找回,<br/>是否要删除此消息?</div>",
        "删除","取消",toDetele);
      };

      /**show three buttom on the bottom and checkbox on the left**/
      $scope.manyChoose = function () {
        $scope.threeBottom = true;
        $scope.showDelete = true;
      }

      /**
       * reverse the img of checkbox when the message is selected
       * @param item:the clicked message
       */
      $scope.onChoose = function (item) {
        if (item.ischecked) {//被选中
          item.circleUrl1 = circleUrltemp;
        }else{
          item.circleUrl1 = circleUrl2;
        }
        item.ischecked=!item.ischecked;
      }

      /**cancel the multi-choose operation,hide three button and checkbox**/
      $scope.bottomGocancel = function () {
        $scope.messages.forEach(function (message) {
          message.ischecked = false;
          message.circleUrl1 = circleUrltemp;
        });
        $scope.threeBottom = false;
        $scope.showDelete = false;
      }

      /**select all message in this tab**/
      $scope.bottomManychoose = function () {
        //change the img of checkbox
        $scope.messages.forEach(function (message) {
          message.ischecked = true;
          message.circleUrl1 = circleUrl2;
        });
      }

      /**delete the selected messages**/
      $scope.bottomGodetele = function () {
        var deleteArray=$scope.messages.filter(function(message){
          return message.ischecked;
        });
        var tempArray=$scope.messages.filter(function(message){
          return !message.ischecked;
        });
        var toDetele = function (res) {
          if(res==true){//comfirm to delete message
            //refresh the messages arrays
            $scope.messages=tempArray;
            // var paramter = [{"exceptionId": item.id}];
            // console.log(paramter);
            // var url = baseConfig.basePath + "/r/api/cmm/deviceException/delete";
            // hmsHttp.post(url, paramter).success(function (response) {
            //   console.log(response);
            // }).error(
            // );
          }
        };
        //pop the dialog to ask whether confirm to delete messages
        hmsPopup.confirmNoTitle("<div style='text-align:center'>删除后将无法在消息记录中找回,<br/>是否要删除这些消息?</div>",
          "删除","取消",toDetele);
        //hide three button and checkbox
        $scope.threeBottom = false;
        $scope.showDelete = false;
      }

    }]);
