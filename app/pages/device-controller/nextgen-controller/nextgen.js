angular.module('nextgenModule')
  .controller('nextgenCtrl', [
    '$scope', '$state', '$ionicModal', '$compile', 'baseConfig', 'checkVersionService',
    '$ionicHistory', 'hmsPopup', 'nextgenService', '$timeout', 'SettingsService',
    '$ionicSlideBoxDelegate', 'hmsHttp', 'cmdService','$translate',
    function ($scope, $state, $ionicModal, $compile, baseConfig,
              checkVersionService, $ionicHistory, hmsPopup,
              nextgenService, $timeout, SettingsService,
              $ionicSlideBoxDelegate, hmsHttp, cmdService,$translate) {
      var ctrId = "00";
      var header = "8877";
      var idx = "00";
      var devId = "03";//E8:91:E0:DC:20:F1
      var sku = SettingsService.get('sku');
      var switchType = "";
      var init=true;

      //获取相应格式的cmd指令
      function getValue(data) {
        //The following is the operating equipment parameters
        return nextgenService.getCmdvalue(header, idx, data, ctrId, devId);
      }

      //获取设备Id
      var getDeviceId = function () {
        if (localStorage.deviceInfo == undefined) {
          return;
        }
        var deviceList = localStorage.deviceInfo.split(";");
        console.log("----" + localStorage.deviceInfo);
        for (var i = 0; i < deviceList.length; i++) {
          var deviceInfo = deviceList[i].split(",");
          if (deviceInfo[0] == sku) {
            return deviceInfo[1];
          }
        }
      };
      var deviceId = getDeviceId();

      //持续出水
      $scope.chixuWater = function () {
        switchType = "chixuWater";
        var argment = {
          'mode': '01'    //00表示stop，01表示Start continuous outlet 02表示Start evacuate cold water (turn on, and off when reach 37 degree,Start evacuate cold water 如果5分钟后水温仍达不到37度则自动停止) ,other表示内置设定
        }
        var data = nextgenService.operateShower(argment);
        var value = getValue(data);
        //alert(value);
        if (baseConfig.isCloudCtrl) {
          cloudSendcmd("ShownerTurnOn", value, "持续出水", "持续出水失败");
        } else {
          cmdService.sendCmd(deviceId, value, "持续出水", "持续出水失败");
        }
      }

      //排空冷水
      $scope.paikongWater = function () {
        switchType = "paikongWater";
        var argment = {
          'mode': '02'    //00表示stop，01表示Start continuous outlet 02表示Start evacuate cold water (turn on, and off when reach 37 degree,Start evacuate cold water 如果5分钟后水温仍达不到37度则自动停止) ,other表示内置设定
        }
        var data = nextgenService.operateShower(argment);
        var value = getValue(data);
        //  alert(value);
        if (baseConfig.isCloudCtrl) {
          cloudSendcmd("ShownerCoolTurnOn", value, "排空冷水", "排空冷水失败");
        } else {
          cmdService.sendCmd(deviceId, value, "排空冷水", "排空冷水失败");
        }
      }

      //关闭出水选项
      $scope.closeShowWater = function () {
        $scope.showWater = false;
      }

      //关闭
      function closeWater() {
        switchType = "closeWater";
        var argment = {
          'mode': '00'    //00表示stop，01表示Start continuous outlet 02表示Start evacuate cold water (turn on, and off when reach 37 degree,Start evacuate cold water 如果5分钟后水温仍达不到37度则自动停止) ,other表示内置设定
        }
        var data = nextgenService.operateShower(argment);
        var value = getValue(data);
        if (baseConfig.isCloudCtrl) {
          cloudSendcmd(deviceId, value, "关闭", "关闭失败");
        } else {
          cmdService.sendCmd(deviceId, value, "关闭", "关闭失败");
        }
      }

      //一键关闭
      function closeAll() {
        switchType = "closeAll";
        var data = nextgenService.stopAll();
        var value = getValue(data);
        //  alert(value);
        if (baseConfig.isCloudCtrl) {
          cloudSendcmd(deviceId, value, "一键关闭", "一键关闭失败");
        } else {
          cmdService.sendCmd(deviceId, value, "一键关闭", "一键关闭失败");
        }
      }

      //返回
      $scope.goBack = function () {
        $ionicHistory.goBack();
      }

      //出水方式初始模式选择
      $scope.waterway = "nextgen.Spout";

      //出水状态
      $scope.waterstatus = "nextgen.unworking";

      //是否显示出水选项
      $scope.showWater = false;

      $scope.$watch('',function(){
        var data = nextgenService.getDeviceStatus(argment);
        var value = getValue(data);
        cmdService.sendCmd(deviceId, value,"发送成功","发送失败")
      },true);

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
          imgUrl: "build/img/nextgen/stop.png",
          imgSeledUrl: "build/img/nextgen/stopseled.png",
          imgUrlTemp: "build/img/nextgen/stop.png",
          handleDes: "nextgen.stop",
          selecFlag: false
        },
        {
          imgUrl: "build/img/nextgen/shezhi.png",
          imgSeledUrl: "build/img/nextgen/shezhiseled.png",
          imgUrlTemp: "build/img/nextgen/shezhi.png",
          handleDes: "nextgen.shezhi",
          selecFlag: false
        },
      ];

      //操作成功的处理
      function operateSuccess() {
        switch (switchType) {
          case "chixuWater":
            $scope.Toast.show($translate.instant("nextgen.chixu")+$translate.instant("nextgen.start"));
            // hmsPopup.showShortCenterToast("持续出水开启成功");
            $scope.showWater = false;
            $scope.handlenapeListNape[0].selecFlag = true;
            $scope.handlenapeListNape[0].imgUrl = $scope.handlenapeListNape[0].imgSeledUrl;
            $scope.waterstatus = "nextgen.watering";
            break;
          case "paikongWater":
            // hmsPopup.showShortCenterToast("排空冷水开启成功");
            $scope.Toast.show($translate.instant("nextgen.paikong")+$translate.instant("nextgen.start"));
            $scope.showWater = false;
            $scope.handlenapeListNape[0].selecFlag = true;
            $scope.handlenapeListNape[0].imgUrl = $scope.handlenapeListNape[0].imgSeledUrl;
            $scope.waterstatus = "nextgen.watering";
            break;
          case "closeWater":
            // hmsPopup.showShortCenterToast("关闭成功");
            $scope.Toast.show($translate.instant("nextgen.close")+$translate.instant("nextgen.success"));
            $scope.handlenapeListNape[0].selecFlag = false;
            $scope.handlenapeListNape[0].imgUrl = $scope.handlenapeListNape[0].imgUrlTemp;
            $scope.waterstatus = "nextgen.unworking";
            break;
          case "closeAll":
            // hmsPopup.showShortCenterToast("一键关闭成功");
            $scope.Toast.show($translate.instant("nextgen.stop")+$translate.instant("nextgen.success"));
            $scope.handlenapeListNape[1].selecFlag = true;
            $scope.handlenapeListNape[1].imgUrl = $scope.handlenapeListNape[1].imgSeledUrl;
            $scope.handlenapeListNape[0].selecFlag = false;
            $scope.handlenapeListNape[0].imgUrl = $scope.handlenapeListNape[0].imgUrlTemp;
            $scope.waterstatus = "nextgen.unworking";
            $timeout(function () {
              $scope.handlenapeListNape[1].selecFlag = false;
              $scope.handlenapeListNape[1].imgUrl = $scope.handlenapeListNape[1].imgUrlTemp;
            }, 2000);
            break;
          case "handHuasa":
            // hmsPopup.showShortCenterToast("手持花洒开启成功");
            $scope.Toast.show($translate.instant("nextgen.yidong")+$translate.instant("nextgen.start"));
            break;
          case "headerHuasa":
            // hmsPopup.showShortCenterToast("头顶花洒开启成功");
            $scope.Toast.show($translate.instant("nextgen.maichong")+$translate.instant("nextgen.start"));
            break;
          case "headerBaidong":
            // hmsPopup.showShortCenterToast("头顶摆动开启成功");
            $scope.Toast.show($translate.instant("nextgen.bodong")+$translate.instant("nextgen.start"));
            break;
          case "goSpout":
            // hmsPopup.showShortCenterToast("spout开启成功");
            $scope.Toast.show($translate.instant("nextgen.Spout")+$translate.instant("nextgen.start"));
            break;
        }
      }

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
            if ($scope.handlenapeListNape[0].selecFlag) {
              closeAll();
            }
            break;
          case 2:
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
        if (val.id < 6) {
          $scope.modal.hide();
          var argment = null;
          var way = "";
          switch (val.id) {
            case 2:
              switchType = "headerHuasa";
              argment = {
                'temperature': '00',    //这个最好传16进制的字符串 比如0 ->00 100->64
                'out': 'HRS',			  //这个参数是个枚举字符串 HRS，HS，SP，HDS 分别表示 头顶花洒，头顶摇摆，spout，手持花洒，
              }
              way = "头顶花洒";
              break;
            case 3:
              switchType = "headerBaidong";
              argment = {
                'temperature': '00',    //这个最好传16进制的字符串 比如0 ->00 100->64
                'out': 'HS',			  //这个参数是个枚举字符串 HRS，HS，SP，HDS 分别表示 头顶花洒，头顶摇摆，spout，手持花洒，
              }
              way = "头顶摆动";
              break;
            case 4:
              switchType = "handHuasa";
              argment = {
                'temperature': '00',    //这个最好传16进制的字符串 比如0 ->00 100->64
                'out': 'HDS',			  //这个参数是个枚举字符串 HRS，HS，SP，HDS 分别表示 头顶花洒，头顶摇摆，spout，手持花洒，
              }
              way = "头持花洒";
              break;
            case 5:
              switchType = "goSpout";
              argment = {
                'temperature': '00',    //这个最好传16进制的字符串 比如0 ->00 100->64
                'out': 'SP',			  //这个参数是个枚举字符串 HRS，HS，SP，HDS 分别表示 头顶花洒，头顶摇摆，spout，手持花洒，
              }
              way = "Spout";
              break;
          }
          // alert(way);
          var data = nextgenService.setShowerPara(argment);
          var value = getValue(data);
          // alert(value);
          if (baseConfig.isCloudCtrl) {
            cloudSendcmd(deviceId, value, way, way + "失败");
          } else {
            cmdService.sendCmd(deviceId, value, way, way + "失败");
          }
          $scope.waterway = val.des;
        }
      };

      //监听
      document.addEventListener('SocketPlugin.receiveTcpData', function (result) {
        // operateSuccess();
        var resultOn = result;
        if (resultOn.from.device_id == getDeviceId()) {
          if (resultOn.payload.cmd == "CMD_RETURN") {
            var tempData = nextgenService.explainAck(resultOn.payload.value[0]);
            if(tempData){//tempData.ack.indexOf("fa") >= 0
              if(init){
                if(tempData.status=="shower on") {//正在出水
                  $scope.handlenapeListNape[0].selecFlag = true;
                  $scope.handlenapeListNape[0].imgUrl = $scope.handlenapeListNape[0].imgSeledUrl;
                  $scope.waterstatus = "nextgen.watering";
                }
                init=false;
              }else{
                operateSuccess();
              }
            }
            else {
              hmsPopup.showShortCenterToast("操作失败");
            }
          }
          $scope.$apply();
        }
      }, false);

      //通过云端发送指令
      var cloudSendcmd = function (deviceId, value, successMsg, errorMsg) {
        // operateSuccess();
        var url = baseConfig.base
        Path + "/r/api/message/sendMessage";
        var paramter = cmdService.cloudCmd(deviceId, value);
        hmsHttp.post(url, paramter).success(
          function (response) {
            //var value = response.data.data.cmd[0];
            alert(JSON.stringify(response));
            if (response.code == 200) {
              // alert('resp:'+response.data.data.cmd[0]);
              var value = nextgenService.explainAck(response.data.data.cmd[0]);
              alert("value.ack:  "+value.ack);
              if (value.ack.indexOf("fa") >= 0) {
                operateSuccess();
              }
              else {
                hmsPopup.showShortCenterToast("设备异常,操作失败");
              }
            }
          }
        ).error(
          function (response, status, header, config) {
            // hmsPopup.showShortCenterToast("网络异常,操作失败");
          }
        );
      };
    }]);
