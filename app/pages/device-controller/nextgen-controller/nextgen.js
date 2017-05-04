angular.module('nextgenModule')
  .controller('nextgenCtrl', [
    '$scope', '$state', '$ionicModal', '$compile', 'baseConfig', 'checkVersionService',
    '$ionicHistory', 'hmsPopup', 'nextgenService', '$timeout', 'SettingsService',
    '$ionicSlideBoxDelegate', 'hmsHttp', 'cmdService',
    function ($scope, $state, $ionicModal, $compile, baseConfig,
              checkVersionService, $ionicHistory, hmsPopup,
              nextgenService, $timeout, SettingsService,
              $ionicSlideBoxDelegate, hmsHttp, cmdService) {
      var ctrId = "00";
      var header = "8877";
      var idx = "00";
      var devId = "03";//E8:91:E0:DC:20:F1
      var sku = SettingsService.get('sku');
      var switchType = "";

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

      function chixuWater() {
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
          nextgenService.sendCmd(deviceId, value, "持续出水", "持续出水失败");
        }
      }

      function paikongWater() {
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
          nextgenService.sendCmd(deviceId, value, "排空冷水", "排空冷水失败");
        }
      }

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
          nextgenService.sendCmd(deviceId, value, "关闭", "关闭失败");
        }
      }

      function closeAll() {
        switchType = "closeAll";
        var data = nextgenService.stopAll();
        var value = getValue(data);
        //  alert(value);
        if (baseConfig.isCloudCtrl) {
          cloudSendcmd(deviceId, value, "一键关闭", "一键关闭失败");
        } else {
          nextgenService.sendCmd(deviceId, value, "一键关闭", "一键关闭失败");
        }
      }

      //操作成功的处理
      function operateSuccess() {
        switch (switchType) {
          case "chixuWater":
            hmsPopup.showShortCenterToast("持续出水开启成功");
            $scope.handlenapeListNape[0].selecFlag = true;
            $scope.handlenapeListNape[0].imgUrl = $scope.handlenapeListNape[0].imgSeledUrl;
            $scope.handlenapeListNape[1].selecFlag = false;
            $scope.handlenapeListNape[1].imgUrl = $scope.handlenapeListNape[1].imgUrlTemp;
            $scope.slideInitData[0].des = $scope.temperate;
            break;
          case "paikongWater":
            hmsPopup.showShortCenterToast("排空冷水开启成功");
            $scope.handlenapeListNape[1].selecFlag = true;
            $scope.handlenapeListNape[1].imgUrl = $scope.handlenapeListNape[1].imgSeledUrl;
            $scope.handlenapeListNape[0].selecFlag = false;
            $scope.handlenapeListNape[0].imgUrl = $scope.handlenapeListNape[0].imgUrlTemp;
            $scope.slideInitData[0].des = $scope.temperate;
            break;
          case "closeWater":
            hmsPopup.showShortCenterToast("关闭成功");
            $scope.handlenapeListNape[1].selecFlag = false;
            $scope.handlenapeListNape[1].imgUrl = $scope.handlenapeListNape[1].imgUrlTemp;
            $scope.handlenapeListNape[0].selecFlag = false;
            $scope.handlenapeListNape[0].imgUrl = $scope.handlenapeListNape[0].imgUrlTemp;
            $scope.slideInitData[0].des = "nextgen.unworking";
            break;
          case "closeAll":
            hmsPopup.showShortCenterToast("一键关闭成功");
            $scope.handlenapeListNape[2].selecFlag = true;
            $scope.handlenapeListNape[2].imgUrl = $scope.handlenapeListNape[2].imgSeledUrl;
            $scope.handlenapeListNape[1].selecFlag = false;
            $scope.handlenapeListNape[1].imgUrl = $scope.handlenapeListNape[1].imgUrlTemp;
            $scope.handlenapeListNape[0].selecFlag = false;
            $scope.handlenapeListNape[0].imgUrl = $scope.handlenapeListNape[0].imgUrlTemp;
            $scope.slideInitData[0].des = "nextgen.unworking";
            $timeout(function () {
              $scope.handlenapeListNape[2].selecFlag = false;
              $scope.handlenapeListNape[2].imgUrl = $scope.handlenapeListNape[2].imgUrlTemp;
            }, 2000);
            break;
          case "handHuasa":
            hmsPopup.showShortCenterToast("手持花洒开启成功");
            break;
          case "headerHuasa":
            hmsPopup.showShortCenterToast("头顶花洒开启成功");
            break;
          case "headerBaidong":
            hmsPopup.showShortCenterToast("头顶摆动开启成功");
            break;
          case "goSpout":
            hmsPopup.showShortCenterToast("spout开启成功");
            break;
        }
      }

      //返回
      $scope.goBack = function () {
        $ionicHistory.goBack();
      }

      //初始模式选择
      $scope.toiletController = {
        modelType: "nextgen.Spout",//初始模式选择默认手持花洒
        way: "nextgen.handleSelecDes"//出水方式
      };

      //Function list
      $scope.handlenapeListNape = [
        {
          imgUrl: "build/img/nextgen/chixu.png",
          imgSeledUrl: "build/img/nextgen/chixuseled.png",
          imgUrlTemp: "build/img/nextgen/chixu.png",
          handleDes: "nextgen.chixu",
          selecFlag: false,
          handledata: $scope.slideLinYuData //cjc初始canves
        },
        {
          imgUrl: "build/img/nextgen/paikong.png",
          imgSeledUrl: "build/img/nextgen/paikongseled.png",
          imgUrlTemp: "build/img/nextgen/paikong.png",
          handleDes: "nextgen.paikong",
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

      $scope.initHtmlTemplate = function (currentSlideData) {
        /**
         init silde-box data
         初始化slide-box数据
         */
        if ($('#cewafiionSliderBox').children().length !== 0) {
          $('#cewafiionSliderBox').empty();
        }
        var checHtml =
          "<ion-slide-box ng-init='lockSlide()' show-pager='false'>" +
          "<ion-slide ng-repeat='list in currentSlideData track by $index'>" +
          "<div id={{list.parNodeid}} class='toilet-parameterctl'>" +
          "<canvas id={{list.canves01}} class='canves-pos'></canvas>" +
          "<canvas id={{list.canves03}} class='canves-pos'></canvas>" +
          "<div class='toilet-parameterctl-data' ng-if='!list.parameterctlFlag'>" +
          "<p ng-if='cenwatpurifierCtrl.isShwoClearStatus' class='toilet-parameterctl-raddata' ></p>" +
          "<span ng-if='cenwatpurifierCtrl.isShwoClearStatus' class='toilet-parameterctl-des' ></span>" +

          "<span ng-if='true' class='toilet-parameterctl-raddata toilet-parameterct-span' ></span>" +
          "<div ng-if='true' class='toilet-parameterctl-des' translate='{{slideInitData[0].des}}'></div>" +
          "</div>" +
          "<div class='toilet-parameterctl-dataimg' ng-if='list.parameterctlFlag'>" +
          "<img class='conninfo-parameterctl-img' ng-src='build/img/toilet-controller/btn_devicedetail_scoll.png' alt=''>" +
          "</div>" +
          "</div>" +
          "</ion-slide>" +
          "</ion-slide-box>"
        /**
         bian yi html 数据
         编译html数据
         */
        var $checkhtml = $compile(checHtml)($scope); // 编译
        $('#cewafiionSliderBox').append($checkhtml[0])
      };

      $scope.initHtmlTemplate($scope.currentSlideData);

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
            }else{
              chixuWater();//再持续出水
            }
            break;
          case 1:
            if ($scope.handlenapeListNape[1].selecFlag == true) {
              closeWater();
            }else{
              paikongWater(); //排空冷水
            }
            break;
          case 2:
            if ($scope.handlenapeListNape[0].selecFlag || $scope.handlenapeListNape[1].selecFlag) {
                closeAll();
            }
            break;
          case 3:
            $state.go("nextgenSet");
            $scope.handlenapeListNape[3].selecFlag = false;
            $scope.handlenapeListNape[3].imgUrl = $scope.handlenapeListNape[3].imgUrlTemp;
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
          $scope.toiletController.modelType = val.des;
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
            nextgenService.sendCmd(deviceId, value, way, way + "失败");
          }
        }
      };

      //监听
      document.addEventListener('SocketPlugin.receiveTcpData', function (result) {
        var resultOn = result;
        if (resultOn.from.device_id == getDeviceId()) {
          if (resultOn.payload.cmd == "CMD_RETURN") {
            var tempData = nextgenService.explainAck(resultOn.payload.value[0]);
            if(tempData.temperature){//tempData.ack.indexOf("fa") >= 0
              $scope.temperate = parseInt(tempData.temperature,16) + "℃";
              operateSuccess();
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
        var url = baseConfig.basePath + "/r/api/message/sendMessage";
        var paramter = cmdService.cloudCmd(deviceId, value);
        hmsHttp.post(url, paramter).success(
          function (response) {
            //var value = response.data.data.cmd[0];
            alert(JSON.stringify(response));
            if (response.code == 200) {
              // alert('resp:'+response.data.data.cmd[0]);
              var value = nextgenService.explainAck(response.data.data.cmd[0]);
              alert("value.ack:  "+value.ack);
              if(value.temperature){
                $scope.temperate = parseInt(tempData.temperature,16) + "℃";
                operateSuccess();
              }
              // if (value.ack.indexOf("fa") >= 0) {
              //   operateSuccess();
              // }
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
