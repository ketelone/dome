angular.module('nextgenModule')
  .controller('nextgenCtrl', [
    '$scope', '$state', '$ionicModal', 'baseConfig', 'checkVersionService',
    '$ionicHistory', 'hmsPopup', 'nextgenService', '$timeout', 'SettingsService',
    '$ionicSlideBoxDelegate', 'hmsHttp', 'cmdService', '$translate','$stateParams',
    function ($scope, $state, $ionicModal, baseConfig,
              checkVersionService, $ionicHistory, hmsPopup,
              nextgenService, $timeout, SettingsService,
              $ionicSlideBoxDelegate, hmsHttp, cmdService,
              $translate,$stateParams) {
      var ctrId = "00";
      var header = "8877";
      var idx = "00";
      var devId = "03";//E8:91:E0:DC:20:F1//F0:F0:87:F5:A2:17

      //获取相应格式的cmd指令
      function getValue(data) {
        //The following is the operating equipment parameters
        return nextgenService.getCmdvalue(header, idx, data, ctrId, devId);
      }

      // var deviceId = "E0DC20F1";
      //获取设备Id bug
      var getDeviceId = function(){
        var deviceList;
        if(localStorage.deviceInfo){
          deviceList = localStorage.deviceInfo.split(";");
        }else{
          localStorage.deviceInfo = ";123456";
          deviceList = localStorage.deviceInfo.split(";");
        }
        for(var i = 0; i < deviceList.length; i ++){
          var deviceInfo = deviceList[i].split(",");
          if(deviceInfo[0] == $stateParams.deviceSku){
            return deviceInfo[1];
          }
        }
      };
      var deviceId =getDeviceId();

      //本地发送指令
      var pluginToCtrl = function (deviceId, value, successMsg, errorMsg) {
        cmdService.sendCmd(deviceId, value, localStorage.boxIp);
      };

      //通过云端发送指令 bug
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

      //根据配置选择发送指令的方式
      var sendCmd = function (deviceId, value, successMsg, errorMsg) {
        if (baseConfig.isCloudCtrl) {
          cloudToCtrl(deviceId, value, successMsg, errorMsg);
        } else {
          pluginToCtrl(deviceId, value, successMsg, errorMsg);
        }
      };

      //返回
      $scope.goBack = function () {
        $ionicHistory.goBack();
      }

      //出水方式初始模式选择
      $scope.waterway =
        localStorage.SET_SHOWER_OUTLET_PARA_EXIT?localStorage.SET_SHOWER_OUTLET_PARA_EXIT:"nextgen.Spout";

      //头顶花洒
      function headerHuasa(){
        argment = {
          'temperature': '00',    //这个最好传16进制的字符串 比如0 ->00 100->64
          'out': 'HRS',			  //这个参数是个枚举字符串 HRS，HS，SP，HDS 分别表示 头顶花洒，头顶摇摆，spout，手持花洒，
        }
        var data = nextgenService.setShowerPara(argment);
        var value = getValue(data);
        sendCmd(deviceId, value, "头顶花洒", "头顶花洒失败");
      }

      //头顶摆动
      function headerBaidong() {
        argment = {
          'temperature': '00',    //这个最好传16进制的字符串 比如0 ->00 100->64
          'out': 'HS',			  //这个参数是个枚举字符串 HRS，HS，SP，HDS 分别表示 头顶花洒，头顶摇摆，spout，手持花洒，
        }
        var data = nextgenService.setShowerPara(argment);
        var value = getValue(data);
        sendCmd(deviceId, value, "头顶摆动", "头顶摆动失败");
      }

      //手持花洒
      function handHuasa() {
        argment = {
          'temperature': '00',    //这个最好传16进制的字符串 比如0 ->00 100->64
          'out': 'HDS',			  //这个参数是个枚举字符串 HRS，HS，SP，HDS 分别表示 头顶花洒，头顶摇摆，spout，手持花洒，
        }
        var data = nextgenService.setShowerPara(argment);
        var value = getValue(data);
        sendCmd(deviceId, value, "手持花洒", "手持花洒失败");
      }

      //goSpout
      function goSpout() {
        argment = {
          'temperature': '00',    //这个最好传16进制的字符串 比如0 ->00 100->64
          'out': 'SP',			  //这个参数是个枚举字符串 HRS，HS，SP，HDS 分别表示 头顶花洒，头顶摇摆，spout，手持花洒，
        }
        var data = nextgenService.setShowerPara(argment);
        var value = getValue(data);
        sendCmd(deviceId, value, "Spout", "Spout失败");
      }

      //判断出水口，发送选择出水口指令
      function chooseWaterWay() {
        switch($scope.waterway){
          case "nextgen.yidong":
            handHuasa();
            break;
          case "nextgen.maichong":
            headerHuasa();
            break;
          case "nextgen.bodong":
            headerBaidong();
            break;
          case "nextgen.Spout":
            goSpout();
            break;
        }
      }

      //出水状态
      $scope.waterstatus = "nextgen.unworking";

      //是否显示出水选项
      $scope.showWater = false;
      //关闭出水选项
      $scope.closeShowWater = function () {
        $scope.showWater = false;
      }

      //持续出水
      $scope.chixuWater = function () {
        $timeout(function () {
          chooseWaterWay();//发送选择出水口指令
        }, 500);
        var argment = {
          'mode': '01'    //00表示stop，01表示Start continuous outlet 02表示Start evacuate cold water (turn on, and off when reach 37 degree,Start evacuate cold water 如果5分钟后水温仍达不到37度则自动停止) ,other表示内置设定
        }
        var data = nextgenService.operateShower(argment);
        var value = getValue(data);
        // alert(value);
        sendCmd(deviceId, value, "持续出水", "持续出水失败");//"ShownerTurnOn"
      }

      //排空冷水
      $scope.paikongWater = function () {
        $timeout(function () {
          chooseWaterWay();//发送选择出水口指令
        }, 500);
        var argment = {
          'mode': '02'    //00表示stop，01表示Start continuous outlet 02表示Start evacuate cold water (turn on, and off when reach 37 degree,Start evacuate cold water 如果5分钟后水温仍达不到37度则自动停止) ,other表示内置设定
        }
        var data = nextgenService.operateShower(argment);
        var value = getValue(data);
        //  alert(value);
        sendCmd(deviceId, value, "排空冷水", "排空冷水失败");//"ShownerCoolTurnOn"
      }

      //关闭
      function closeWater() {
        var argment = {
          'mode': '00'    //00表示stop，01表示Start continuous outlet 02表示Start evacuate cold water (turn on, and off when reach 37 degree,Start evacuate cold water 如果5分钟后水温仍达不到37度则自动停止) ,other表示内置设定
        }
        var data = nextgenService.operateShower(argment);
        var value = getValue(data);
        sendCmd(deviceId, value, "关闭", "关闭失败");
      }

      //关闭的类型，用于判断选择的是否是StopAll
      // var isCloseAll = false;
      // //一键关闭
      // function closeAll() {
      //   isCloseAll = true;
      //   var data = nextgenService.stopAll();
      //   var value = getValue(data);
      //   //  alert(value);
      //   sendCmd(deviceId, value, "一键关闭", "一键关闭失败");
      // }

      //操作成功的处理
      function operateSuccess(ackData) {
        //ackData.ack.indexOf("fa") >= 0  //发送成功
        if (ackData.status == "shower on") {//正在出水
          $scope.showWater = false;
          $scope.handlenapeListNape[0].selecFlag = true;
          $scope.handlenapeListNape[0].imgUrl = $scope.handlenapeListNape[0].imgSeledUrl;
          $scope.waterstatus = "nextgen.watering";
        }
        else if(ackData.status == "shower off"){
          $scope.handlenapeListNape[0].selecFlag = false;
          $scope.handlenapeListNape[0].imgUrl = $scope.handlenapeListNape[0].imgUrlTemp;
          $scope.waterstatus = "nextgen.unworking";
          // if(isCloseAll){
          //   $scope.handlenapeListNape[1].selecFlag = true;
          //   $scope.handlenapeListNape[1].imgUrl = $scope.handlenapeListNape[1].imgSeledUrl;
          //   $timeout(function () {
          //     $scope.handlenapeListNape[1].selecFlag = false;
          //     $scope.handlenapeListNape[1].imgUrl = $scope.handlenapeListNape[1].imgUrlTemp;
          //   }, 2000);
          //   isCloseAll = false;
          // }
        }
      }

      //一进入页面就查询出水状态
      $scope.$on('$ionicView.beforeEnter', function () {
        var data = nextgenService.getDeviceStatus();
        var value = getValue(data);
        sendCmd(deviceId, value, "发送成功", "发送失败");
      });

      //监听
      document.addEventListener('SocketPlugin.receiveTcpData', function (result) {
        var resultOn = result[0];
        if (resultOn.from.uid == deviceId) {
          if (resultOn.data.cmd.length > 0) {
            var tempData = nextgenService.explainAck(resultOn.data.cmd[0]);
            // alert('alet:'+JSON.stringify(tempData));
            operateSuccess(tempData);
          }
          $scope.$apply();
        }
      }, false);

      //Function list
      $scope.handlenapeListNape = [
        {
          imgUrl: "build/img/nextgen/water_nor.png",
          imgSeledUrl: "build/img/nextgen/water.png",
          imgUrlTemp: "build/img/nextgen/water_nor.png",
          handleDes: "nextgen.water",
          selecFlag: false,
          handledata: $scope.slideLinYuData //cjc初始canves
        },
        {
          imgUrl: "build/img/nextgen/shezhi.png",
          imgSeledUrl: "build/img/nextgen/shezhiseled.png",
          imgUrlTemp: "build/img/nextgen/shezhi.png",
          handleDes: "nextgen.shezhi",
          selecFlag: false
        },
        // {
        //   imgUrl: "build/img/nextgen/stop.png",
        //   imgSeledUrl: "build/img/nextgen/stopseled.png",
        //   imgUrlTemp: "build/img/nextgen/stop.png",
        //   handleDes: "nextgen.stop",
        //   selecFlag: false
        // },
      ];

      $scope.slideInitData = [{
        des: "nextgen.unworking",
        parameterctlFlag: false,
        parNodeid: 'toilet-initCtl',
        canves01: "initcanves01",
        canves02: "initcanves02",
        canves03: "initcanves03",
      }]

      /**
       set dang qian ce hau shu ju zhi
       设置当前侧滑数据为侧滑初始化数据
       */
      $scope.currentSlideData = $scope.slideInitData;

      /**
       init dang qian mo ban shu ju
       初始化当前模板数据
       */
      $scope.lockSlide = function () {
        $ionicSlideBoxDelegate.enableSlide(false);
      };

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
        this.cr1 = getCanvesObj(slideDataObj.canves01);//档位canves
        this.cr3 = getCanvesObj(slideDataObj.canves03);//颜色填充档位canves
        //四种圆
        this.deliverCircle = {
          x: this.canvsscreenHeight / 2,
          y: this.canvsscreenWidth / 2,
          r: this.canvsscreenHeight / 2,
          color: "#6ACBB3"
        };//档位圆
        this.HideCircle = {
          x: this.canvsscreenHeight / 2,
          y: this.canvsscreenWidth / 2,
          r: this.canvsscreenHeight / 2 - 0.4 * this.rateInit,
          color: "black"
        };//档位圆
        //画档位圆
        this.drawDeliverCircle = function () {
          drawRadian(this.cr1, this.deliverCircle, 0, 360);
          drawRadian(this.cr3, this.HideCircle, 0, 360);
        };
      };

      var currentRadObj;
      setTimeout(function () {
        //实现画布
        $scope.getCurrentObj = function (index) {
          //当前new实例
          currentRadObj = new initCircle($scope.currentSlideData[index]);
          //当前绑定事件对象
          var currentEventObj = getIdObj($scope.currentSlideData[index].canves02);
          currentRadObj.drawDeliverCircle();
        };
        $scope.getCurrentObj(0);
      }, 20);

      //处理选择怎加border
      var handlenapeListNapeLen = $scope.handlenapeListNape.length;

      //功能选择
      $scope.selectNapes = function (index) {
        switch (index) {
          case 0:
            if ($scope.handlenapeListNape[0].selecFlag == true) {
              closeWater();
            } else {
              $scope.showWater = true;
            }
            break;
          case 1:
            $state.go("nextgenSet");
            break;
        }
      };

      //模式选择
      //获取屏幕高度
      $scope.screenHeig = window.innerHeight;
      $ionicModal.fromTemplateUrl('build/pages/model/hmsModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });
      $scope.value = [{id: 2, des: 'nextgen.maichong'},
        {id: 3, des: 'nextgen.bodong'}, {id: 4, des: 'nextgen.yidong'}, {id: 5, des: 'nextgen.Spout'}
      ];
      $scope.openModal = function () {
        $scope.modal.show();
        setTimeout(function () {
          var ele = document.getElementsByClassName("hmsModal");
          ele[0].style.top = 68 + '%';
          ele[0].style.minHeight = 61 + '%';
        }, 10);
      };
      $scope.$on('$destroy', function () {
        $scope.modal.remove();
      });

      //出水方式选择
      $scope.choose = function (val) {
        $scope.modal.hide();
        $scope.waterway = val.des;
        localStorage.SET_SHOWER_OUTLET_PARA_EXIT= val.des;
      };

    }]);
