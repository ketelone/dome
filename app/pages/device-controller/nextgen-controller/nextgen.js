angular.module('nextgenModule')
  .controller('nextgenCtrl', [
    '$scope', '$state', '$ionicModal', 'baseConfig', 'checkVersionService',
    '$ionicHistory', 'hmsPopup', 'nextgenService', '$timeout', 'SettingsService',
    '$ionicSlideBoxDelegate', 'hmsHttp', 'cmdService', '$translate', '$stateParams',
    '$ionicPopover',
    function ($scope, $state, $ionicModal, baseConfig,
              checkVersionService, $ionicHistory, hmsPopup,
              nextgenService, $timeout, SettingsService,
              $ionicSlideBoxDelegate, hmsHttp, cmdService,
              $translate, $stateParams, $ionicPopover) {

      /**draw the circle**/

      /**slide init data**/
      $scope.slideInitData = [{
        des: "nextgen.unworking",
        parNodeid: 'toilet-initCtl',
        canves01: "initcanves01",
        canves02: "initcanves02",
        canves03: "initcanves03",
      }];
      /**set current slide data equals slide init data**/
      $scope.currentSlideData = $scope.slideInitData;
      /**init the circle**/
      $scope.lockSlide = function () {
        $ionicSlideBoxDelegate.enableSlide(false);
      };
      /**the object to draw the circle**/
      var initCircle = function (slideDataObj) {
        //获取父元素高度
        this.canvsscreenHeight = document.getElementById(slideDataObj.parNodeid).offsetHeight;
        this.canvsscreenWidth = document.getElementById(slideDataObj.parNodeid).offsetWidth;
        this.rateInit = document.documentElement.clientWidth / 7.5;
        // 设置每个canves的宽高
        document.getElementById(slideDataObj.canves01).height = this.canvsscreenHeight;
        document.getElementById(slideDataObj.canves01).width = this.canvsscreenWidth;
        document.getElementById(slideDataObj.canves01).style.zIndex = 1;
        document.getElementById(slideDataObj.canves03).height = this.canvsscreenHeight;
        document.getElementById(slideDataObj.canves03).width = this.canvsscreenWidth;
        document.getElementById(slideDataObj.canves03).style.zIndex = 2;
        // 获取canvesobj
        this.cr1 = getCanvesObj(slideDataObj.canves01);
        //档位canves
        this.cr3 = getCanvesObj(slideDataObj.canves03);
        //颜色填充档位canves
        // 四种圆
        this.deliverCircle = {
          x: this.canvsscreenHeight / 2,
          y: this.canvsscreenWidth / 2,
          r: this.canvsscreenHeight / 2,
          color: "#6ACBB3"
        };
        //档位圆
        this.HideCircle = {
          x: this.canvsscreenHeight / 2,
          y: this.canvsscreenWidth / 2, r: this.canvsscreenHeight / 2 - 0.4 * this.rateInit, color: "black"
        };
        // 画档位圆
        this.drawDeliverCircle = function () {
          drawRadian(this.cr1, this.deliverCircle, 135, 45);
          drawRadian(this.cr3, this.HideCircle, 0, 360);
        };
      };
      /**draw the circle**/
      setTimeout(function () {
        //achieve canvas
        $scope.getCurrentObj = function (index) {
          //new initCircle object
          var currentRadObj = new initCircle($scope.currentSlideData[index]);
          currentRadObj.drawDeliverCircle();
        };
        $scope.getCurrentObj(0);
      }, 20);

      /**go back to last page**/
      $scope.goBack = function () {
        $ionicHistory.goBack();
      }

      /**send command**/

      var ctrId = "00";
      var header = "8877";
      var idx = "00";
      var devId = "03";
      /**whether link with box**/
      var isLink = false;//是否连接到了box
      /**wheter to highlight**/
      var isLight = false;//是否高亮
      /**the time when send the command**/
      var currentTime;
      /**stop loading and show network error message**/
      var netError;

      /**get the correct format cmd directive**/
      function getValue(data) {
        //The following is the operating equipment parameters
        return cmdService.getCmd(header, idx, data, ctrId, devId);
      }

      /**get device id**/
      var getDeviceId = function () {
        //if there is no deviceInfo in localStorage,return null
        if (localStorage.deviceInfo == undefined) {
          return;
        }
        var skuList = SettingsService.get('sku');
        // alert("sku:"+skuList);
        var deviceId = "";
        var deviceList = localStorage.deviceInfo.split(";");
        for (var i = 0; i < deviceList.length; i++) {
          var deviceInfo = deviceList[i].split(",");
          for (var j = 0; j < skuList.length; j++) {
            if (deviceInfo[0] == skuList[j]) {
              deviceId = deviceInfo[1];
              return deviceId;
            }
          }
        }
        return deviceId;
      };
      var deviceId = getDeviceId();

      /**
       * send command using local plugin
       * @param deviceId:device's id
       * @param value: cmd directive with correct format
       **/
      var pluginToCtrl = function (deviceId, value, successMsg, errorMsg) {
        if(netError){
          $timeout.cancel(netError);
        }
        isLight = false;
        currentTime = new Date().getTime();
        hmsPopup.showLoading();
        cmdService.sendCmd(deviceId, value, localStorage.boxIp);
        netError=$timeout(function () {
          if (new Date().getTime() - currentTime >= 10000 && !isLight) {
            hmsPopup.hideLoading();
            $scope.Toast.show($translate.instant("golabelvariable.loadingdataerrror"));
          }
        }, 10000);
      };

      /**
       * send command through cloud
       * @param deviceId:device's id
       * @param value: cmd directive with correct format
       **/
      var cloudToCtrl = function (deviceId, value, successMsg, errorMsg) {
        //cloud
        var url = baseConfig.basePath + "/r/api/message/sendMessage";
        var paramter = cmdService.cloudCmd(deviceId, value);
        hmsHttp.post(url, paramter).success(
          function (response) {
            //var value = response.data.data.cmd[0];
            alert(JSON.stringify(response));
            if (response.code == 200) {
              // alert('resp:'+response.data.data.cmd[0]);
              var value = nextgenService.explainAck(response.data.data.cmd[0]);
              // alert("value.ack:  " + value.ack);
              operateSuccess(value);
            }
          }
        ).error(
          function (response, status, header, config) {
            // hmsPopup.showShortCenterToast("网络异常,操作失败");
          }
        );
      };

      /**
       * choose the way of sending command according to the baseConfig
       * if isLink==false show network error message
       * @param deviceId:device's id
       * @param value: cmd directive with correct format
       * @param successMsg
       * @param errorMsg
       */
      var sendCmd = function (deviceId, value, successMsg, errorMsg) {
        if (isLink) {
          if (baseConfig.isCloudCtrl) {
            cloudToCtrl(deviceId, value, successMsg, errorMsg);
          } else {
            pluginToCtrl(deviceId, value, successMsg, errorMsg);
          }
        } else {
          $scope.Toast.show($translate.instant("golabelvariable.loadingdataerrror"));
        }
      };

      /**send command to achieve device's function**/

      /**1、choose the way to get water**/
      $scope.waterway =
        localStorage.SET_SHOWER_OUTLET_PARA_EXIT ? localStorage.SET_SHOWER_OUTLET_PARA_EXIT : "nextgen.Spout";

      //判断出水口，发送选择出水口指令
      /**judge the waterway,set the argment to get the cmd value
       * and then send command to determine the way to get water**/
      function chooseWaterWay() {
        var argment;
        if($scope.waterway=="nextgen.yidong"){//手持花洒
          argment = {
            'temperature': '00',    //这个最好传16进制的字符串 比如0 ->00 100->64
            'out': 'HDS',			  //这个参数是个枚举字符串 HRS，HS，SP，HDS 分别表示 头顶花洒，头顶摇摆，spout，手持花洒，
          }
        }
        else if($scope.waterway=="nextgen.maichong"){//头顶花洒
          argment = {
            'temperature': '00',    //这个最好传16进制的字符串 比如0 ->00 100->64
            'out': 'HRS',			  //这个参数是个枚举字符串 HRS，HS，SP，HDS 分别表示 头顶花洒，头顶摇摆，spout，手持花洒，
          }
        }
        else if($scope.waterway=="nextgen.bodong") {//头顶摆动
          argment = {
            'temperature': '00',    //这个最好传16进制的字符串 比如0 ->00 100->64
            'out': 'HS',			  //这个参数是个枚举字符串 HRS，HS，SP，HDS 分别表示 头顶花洒，头顶摇摆，spout，手持花洒，
          }
        }
        else if($scope.waterway=="nextgen.Spout") {
          argment = {
            'temperature': '00',    //这个最好传16进制的字符串 比如0 ->00 100->64
            'out': 'SP',			  //这个参数是个枚举字符串 HRS，HS，SP，HDS 分别表示 头顶花洒，头顶摇摆，spout，手持花洒，
          }
        }
        var data = nextgenService.setShowerPara(argment);
        var value = getValue(data);
        sendCmd(deviceId, value,$scope.waterway,$scope.waterway);
      }

      /**the modal to choose the way to get water**/
      $scope.screenHeig = window.innerHeight;
      $scope.screenWidth = window.innerWidth;
      $scope.fontSize = document.documentElement.clientWidth / 7.5;
      $ionicModal.fromTemplateUrl('build/pages/model/hmsModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });
      /**four way to get water**/
      $scope.value = [
        {id: 2, des: 'nextgen.maichong'},
        {id: 3, des: 'nextgen.bodong'},
        {id: 4, des: 'nextgen.yidong'},
        {id: 5, des: 'nextgen.Spout'}
      ];
      /**show the modal**/
      $scope.openModal = function () {
        $scope.modal.show();
        setTimeout(function () {
          var ele = document.getElementsByClassName("hmsModal");
          ele[0].style.top = $scope.screenHeig - 1 * $scope.fontSize * $scope.value.length + 'px';
          ele[0].style.minHeight = 1 * $scope.fontSize * $scope.value.length + 'px';
        }, 10);
      };
      /**remove the modal**/
      $scope.$on('$destroy', function () {
        $scope.modal.remove();
      });
      /**send the command to determine which way to get water**/
      $scope.choose = function (val) {
        $scope.modal.hide();
        $scope.waterway = val.des;
        localStorage.SET_SHOWER_OUTLET_PARA_EXIT = val.des;
        chooseWaterWay();//发送选择出水口指令
      };

      /**2、choose the watering choice**/
      /**whether is watering**/
      $scope.waterstatus = "nextgen.unworking";
      /**whether show the choice**/
      $scope.showWater = false;
      /**close the choice**/
      $scope.closeShowWater = function () {
        $scope.showWater = false;
      };

      /**continuous to watering**/
      $scope.chixuWater = function () {
        chooseWaterWay();//发送选择出水口指令
        $timeout(function () {
          var argment = {
            'mode': '01'    //00表示stop，01表示Start continuous outlet 02表示Start evacuate cold water (turn on, and off when reach 37 degree,Start evacuate cold water 如果5分钟后水温仍达不到37度则自动停止) ,other表示内置设定
          }
          var data = nextgenService.operateShower(argment);
          var value = getValue(data);
          // alert(value);
          sendCmd(deviceId, value, "持续出水", "持续出水失败");//"ShownerTurnOn"
        }, 500);
      };

      /**empty the cold water**/
      $scope.paikongWater = function () {
        chooseWaterWay();//发送选择出水口指令
        $timeout(function () {
          var argment = {
            'mode': '02'    //00表示stop，01表示Start continuous outlet 02表示Start evacuate cold water (turn on, and off when reach 37 degree,Start evacuate cold water 如果5分钟后水温仍达不到37度则自动停止) ,other表示内置设定
          }
          var data = nextgenService.operateShower(argment);
          var value = getValue(data);
          //  alert(value);
          sendCmd(deviceId, value, "排空冷水", "排空冷水失败");//"ShownerCoolTurnOn"
        }, 500);
      };

      /**3、close watering**/
      function closeWater() {
        var argment = {
          'mode': '00'    //00表示stop，01表示Start continuous outlet 02表示Start evacuate cold water (turn on, and off when reach 37 degree,Start evacuate cold water 如果5分钟后水温仍达不到37度则自动停止) ,other表示内置设定
        }
        var data = nextgenService.operateShower(argment);
        var value = getValue(data);
        sendCmd(deviceId, value, "关闭", "关闭失败");
      }

      /**Function list**/
      $scope.handlenapeListNape = [
        {
          imgUrl: "build/img/nextgen/chixu.png",
          imgSeledUrl: "build/img/nextgen/chixuseled.png",
          imgUrlTemp: "build/img/nextgen/chixu.png",
          handleDes: "nextgen.water",
          selecFlag: false
        },
        {
          imgUrl: "build/img/nextgen/shezhi.png",
          imgSeledUrl: "build/img/nextgen/shezhiseled.png",
          imgUrlTemp: "build/img/nextgen/shezhi.png",
          handleDes: "nextgen.shezhi",
          selecFlag: false
        }
      ];

      /**chooce devcice's function**/
      $scope.selectNapes = function (index) {
        if(index==0){
          if ($scope.handlenapeListNape[0].selecFlag == true) {
            closeWater();
          } else {
            $scope.showWater = true;
          }
        }
        else if(index==1){
          $state.go("nextgenSet");
        }
      };

      /**tcp data listen and deal**/

      /**deal with the tcp data**/
      function operateSuccess(ackData) {
        // alert("json"+JSON.stringify(ackData));
        if (ackData.status === 'shower on') {//正在出水
          // alert("status"+ackData.status);
          $scope.showWater = false;
          $scope.handlenapeListNape[0].selecFlag = true;
          $scope.handlenapeListNape[0].imgUrl = $scope.handlenapeListNape[0].imgSeledUrl;
          $scope.waterstatus = "nextgen.watering";
        }
        else if (ackData.status == "shower off") {
          $scope.handlenapeListNape[0].selecFlag = false;
          $scope.handlenapeListNape[0].imgUrl = $scope.handlenapeListNape[0].imgUrlTemp;
          $scope.waterstatus = "nextgen.unworking";
        }
        if (ackData.ack.indexOf("fa") >= 0) {//发送成功
          // alert("fa");
          isLight = true;
          hmsPopup.hideLoading();
        }
        else if (ackData.ack.indexOf("fb") >= 0 || ackData.ack.indexOf("fd") >= 0 || ackData.ack.indexOf("fc") >= 0) {
          isLight = true;
          hmsPopup.hideLoading();
          $scope.Toast.show($translate.instant("golabelvariable.directerror"));
        }
      }

      /**check the watering status**/
      $scope.$on('$ionicView.beforeEnter', function () {
        // alert("deviceId"+deviceId);
        hmsPopup.showLoading();
        $timeout(function () {
          if (!isLink) {
            hmsPopup.hideLoading();
            $scope.Toast.show($translate.instant("golabelvariable.loadingdataerrror"));
          }
        }, 10000);
        var data = nextgenService.getDeviceStatus();
        var value = getValue(data);
        cmdService.sendCmd(deviceId, value, localStorage.boxIp);
      });

      /**tcp listener**/
      var listenerDeal = function (result) {
        var resultOn = result[0];
        if (resultOn.from.uid == deviceId) {
          hmsPopup.hideLoading();
          isLink = true;
          // alert(isLink);
          if (resultOn.data.cmd.length > 0) {
            var tempData = nextgenService.explainAck(resultOn.data.cmd[0]);
            // alert('alet:'+JSON.stringify(tempData));
            operateSuccess(tempData);
          }
          $scope.$apply();
        }
      };

      /**remove the listener**/
      $scope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) {
          //alert('进来了。');
          //注销自己的监听
          document.removeEventListener("SocketPlugin.receiveTcpData",
            listenerDeal, false);
        });

      /**add the listener**/
      document.addEventListener('SocketPlugin.receiveTcpData', listenerDeal, false);

      /**operation**/
      $scope.operating = [
        {
          text: 'nextgen.rename'
        },
        {
          text: 'nextgen.move'
        },
        {
          text: 'nextgen.delete'
        }
      ];

      $scope.popover = $ionicPopover.fromTemplateUrl(
        'build/pages/device-controller/nextgen-controller/modal/popover.html', {
          scope: $scope
        });

      // .fromTemplateUrl() 方法
      $ionicPopover.fromTemplateUrl(
        'build/pages/device-controller/nextgen-controller/modal/popover.html', {
          scope: $scope
        }).then(function (popover) {
        $scope.popover = popover;
      });


      $scope.openPopover = function ($event) {
        $scope.popover.show($event);
      };

      $scope.closePopover = function (index) {
        console.log(index);
        $scope.popover.hide();
        // if(index==3){
        //   // $scope.goLearn();
        // }
      }

    }
  ]);
