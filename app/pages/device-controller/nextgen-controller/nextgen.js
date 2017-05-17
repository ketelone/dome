angular.module('nextgenModule')
  .controller('nextgenCtrl', [
    '$scope', '$state', '$ionicModal', 'baseConfig', 'checkVersionService',
    '$ionicHistory', 'hmsPopup', 'nextgenService', '$timeout', 'SettingsService',
    '$ionicSlideBoxDelegate', 'hmsHttp', 'cmdService', '$translate','$stateParams',
    '$ionicPopover','$window',
    function ($scope, $state, $ionicModal, baseConfig,
              checkVersionService, $ionicHistory, hmsPopup,
              nextgenService, $timeout, SettingsService,
              $ionicSlideBoxDelegate, hmsHttp, cmdService,
              $translate,$stateParams,$ionicPopover,$window) {
      var ctrId = "00";
      var header = "8877";
      var idx = "00";
      var devId = "03";//E8:91:E0:DC:20:F1//F0:F0:87:F5:A2:17
      var isLink=false;//是否连接到了box
      var isLight=false;//是否高亮
      $scope.isLinkOK=false;
      var currentTime;

      //获取相应格式的cmd指令
      function getValue(data) {
        //The following is the operating equipment parameters
        return nextgenService.getCmdvalue(header, idx, data, ctrId, devId);
      }

      // var deviceId = "E0DC20F1";
      //获取设备Id bug
      var getDeviceId = function(){
        var skuList = SettingsService.get('sku');
        var deviceId = "";
        var deviceList = localStorage.deviceInfo.split(";");
        for(var i = 0; i < deviceList.length; i ++){
          var deviceInfo = deviceList[i].split(",");
          for(var j =0 ; j < skuList.length; j ++){
            if(deviceInfo[0] == skuList[j]){
              deviceId =  deviceInfo[1];
              return deviceId;
            }
          }
        }
        return deviceId;
      };

      var deviceId =getDeviceId();
      // var deviceId="87F5A217";
      // alert(deviceId);

      //本地发送指令
      var pluginToCtrl = function (deviceId, value, successMsg, errorMsg) {
        isLight=false;
        currentTime=new Date().getTime();
        hmsPopup.showLoading();
        cmdService.sendCmd(deviceId, value, localStorage.boxIp);
        $timeout(function(){
          if(new Date().getTime()-currentTime>=10000&&!isLight){
            hmsPopup.hideLoading();
            $scope.Toast.show($translate.instant("golabelvariable.loadingdataerrror"));
            $scope.isLinkOK=false;
          }
        }, 10000);
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
        // pluginToCtrl(deviceId, value, successMsg, errorMsg);
        if(isLink){
          if (baseConfig.isCloudCtrl) {
            cloudToCtrl(deviceId, value, successMsg, errorMsg);
          } else {
            pluginToCtrl(deviceId, value, successMsg, errorMsg);
          }
        }else{
          $scope.Toast.show($translate.instant("golabelvariable.loadingdataerrror"));
        }
      };

      //返回
      $scope.goBack = function () {
        //receiveTcpDatahandle：你处理逻辑函数
        document.removeEventListener("SocketPlugin.receiveTcpData",
          listenrDeal, false);
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
      }

      //排空冷水
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
        // alert("json"+JSON.stringify(ackData));
        if (ackData.status === 'shower on') {//正在出水
          // alert("status"+ackData.status);
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
        if(ackData.ack.indexOf("fa")>=0){//发送成功
          // alert("fa");
          isLight=true;
          $scope.isLinkOK=true;
          hmsPopup.hideLoading();
        }
        else if(ackData.ack.indexOf("fb")>=0||ackData.ack.indexOf("fd")>=0||ackData.ack.indexOf("fc")>=0){
            isLight=true;
            hmsPopup.hideLoading();
            $scope.Toast.show($translate.instant("golabelvariable.directerror"));
        }
      }

      //一进入页面就查询出水状态
      $scope.$on('$ionicView.beforeEnter', function () {
        changeRingCol('#6ACBB3');
        hmsPopup.showLoading();
        $timeout(function () {
          if(!isLink) {
            hmsPopup.hideLoading();
            $scope.Toast.show($translate.instant("golabelvariable.loadingdataerrror"));
          }
        }, 10000);
        var data = nextgenService.getDeviceStatus();
        var value = getValue(data);
        cmdService.sendCmd(deviceId, value, localStorage.boxIp);
      });

      var listenrDeal=function (result) {
        var resultOn = result[0];
        if (resultOn.from.uid == deviceId) {
          hmsPopup.hideLoading();
          isLink=true;
          $scope.isLinkOK=true;
          // alert(isLink);
          if (resultOn.data.cmd.length > 0) {
            var tempData = nextgenService.explainAck(resultOn.data.cmd[0]);
            // alert('alet:'+JSON.stringify(tempData));
            operateSuccess(tempData);
          }
          $scope.$apply();
        }
      };

      //监听
      document.addEventListener('SocketPlugin.receiveTcpData',listenrDeal , false);

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

      var canvas=document.getElementById("canvas");

      /**
       *@autor: caolei
       *@params: color
       *@disc: change the color of the ring
       */
      var changeRingCol = function(color){
        var c = '#6ACBB3';
        var cxt=canvas.getContext("2d");
        var xLength = $window.innerWidth * 0.5;
        var yLength = $window.innerWidth > 1000 ? $window.innerWidth * 0.73 : $window.innerWidth * 0.65;
        var r = $window.innerWidth * 0.34;
        cxt.beginPath();
        cxt.arc(xLength,yLength,r,Math.PI*0.75,Math.PI*2.25,false);
        cxt.lineWidth =  $window.innerWidth * 0.055;
        cxt.strokeStyle = c;
        cxt.fillStyle = c;
        cxt.stroke();
        //cxt.fill();
        cxt.closePath();
        cxt.scale(2, 2);
      };

      // $scope.slideInitData = [{
      //   des: "nextgen.unworking",
      //   parameterctlFlag: false,
      //   parNodeid: 'toilet-initCtl',
      //   canves01: "initcanves01",
      //   canves02: "initcanves02",
      //   canves03: "initcanves03",
      // }]
      //
      // /**
      //  set dang qian ce hau shu ju zhi
      //  设置当前侧滑数据为侧滑初始化数据
      //  */
      // $scope.currentSlideData = $scope.slideInitData;
      //
      // /**
      //  init dang qian mo ban shu ju
      //  初始化当前模板数据
      //  */
      // $scope.lockSlide = function () {
      //   $ionicSlideBoxDelegate.enableSlide(false);
      // };
      //
      // //初始化当前模板数据
      // $scope.initHtmlTemplate = function (currentSlideData) {
      //   /**
      //    init silde-box data
      //    初始化slide-box数据
      //    */
      //   if ($('#nextgenSliderBox').children().length !== 0) {
      //     $('#nextgenSliderBox').empty();
      //   }
      //   ;
      //   var checHtml =
      //     "<ion-slide-box ng-init='lockSlide()' show-pager='false' delegate-handle='boxSlider'>" +
      //     "<ion-slide ng-repeat='list in currentSlideData track by $index'>" +
      //     "<div id={{list.parNodeid}} class='toilet-parameterctl'>" +
      //     "<canvas id={{list.canves01}} class='canves-pos'></canvas>" +
      //     "<canvas id={{list.canves02}} class='canves-pos'></canvas>" +
      //     "<canvas id={{list.canves03}} class='canves-pos'></canvas>" +
      //     // "<canvas id={{list.canves04}} class='canves-pos'></canvas>" +
      //     "<div class='toilet-parameterctl-data' ng-if='!list.parameterctlFlag'>"+
      //     // "<span class='toilet-parameterctl-raddata toilet-parameterct-span'></span>"+
      //     "<div class='toilet-parameterctl-des' translate='{{waterstatus}}'></div>"+
      //     "</div>" +
      //     "</ion-slide>" +
      //     "</ion-slide-box>"
      //   /**
      //    bian yi html 数据
      //    编译html数据
      //    */
      //   var $checkhtml = $compile(checHtml)($scope); // 编译
      //   $('#nextgenSliderBox').append($checkhtml[0])
      // };
      // $scope.initHtmlTemplate($scope.currentSlideData);
      //
      // var initCircle = function (slideDataObj) {
      //   //获取父元素高度
      //   this.canvsscreenHeight = document.getElementById(slideDataObj.parNodeid).offsetHeight;
      //   this.canvsscreenWidth = document.getElementById(slideDataObj.parNodeid).offsetWidth;
      //   this.rateInit = document.documentElement.clientWidth / 7.5;
      //
      //   // 设置每个canves的宽高
      //   document.getElementById(slideDataObj.canves01).height = this.canvsscreenHeight;
      //   document.getElementById(slideDataObj.canves01).width = this.canvsscreenWidth;
      //   document.getElementById(slideDataObj.canves01).style.zIndex = 1;
      //
      //   document.getElementById(slideDataObj.canves02).height = this.canvsscreenHeight;
      //   document.getElementById(slideDataObj.canves02).width = this.canvsscreenWidth;
      //   document.getElementById(slideDataObj.canves02).style.zIndex = 3;
      //
      //   document.getElementById(slideDataObj.canves03).height = this.canvsscreenHeight;
      //   document.getElementById(slideDataObj.canves03).width = this.canvsscreenWidth;
      //   document.getElementById(slideDataObj.canves03).style.zIndex = 2;
      //   // 获取canvesobj
      //   this.cr1 = getCanvesObj(slideDataObj.canves01);//档位canves
      //   this.cr2 = getCanvesObj(slideDataObj.canves02);//滑动小球档位canves
      //   this.cr3 = getCanvesObj(slideDataObj.canves03);//颜色填充档位canves
      //   //四种圆
      //   this.deliverCircle = {
      //     x: this.canvsscreenHeight / 2,
      //     y: this.canvsscreenWidth / 2,
      //     r: this.canvsscreenHeight / 2 - 0.1 * this.rateInit,
      //     color: "#2F3538"
      //   };//档位圆
      //   this.HideCircle = {
      //     x: this.canvsscreenHeight / 2,
      //     y: this.canvsscreenWidth / 2,
      //     r: this.canvsscreenHeight / 2 - 0.5 * this.rateInit,
      //     color: "black"
      //   };//档位圆
      //   this.deliverLine = {
      //     x: this.canvsscreenHeight / 2,
      //     y: this.canvsscreenWidth / 2,
      //     r: this.canvsscreenHeight / 2 - 0.1 * this.rateInit,
      //     color: "black"
      //   };//档位线
      //   this.rollCircle = {
      //     x: this.canvsscreenHeight / 2,
      //     y: this.canvsscreenWidth / 2,
      //     r: this.canvsscreenHeight / 2 - 0.3 * this.rateInit,
      //     color: "white"
      //   };//小球圆
      //   this.FillCircle = {
      //     x: this.canvsscreenHeight / 2,
      //     y: this.canvsscreenWidth / 2,
      //     r: this.canvsscreenHeight / 2 - 0.1 * this.rateInit,
      //     color: "#6ACBB3"
      //   };//填充圆
      //   this.drawDeliverCircle = function () {
      //     drawRadian(this.cr1, this.deliverCircle, 0, 360);
      //     drawRadian(this.cr3, this.HideCircle, 0, 360);
      //   };
      //   //变量
      //   // this.i = 0;
      //   // this.j = 0;
      //   // this.stoPosPoint = 0;
      //   // this.starRad = 135;
      //   // this.radSectionArr = [];
      //   // this.radRange;
      //   // //画档位圆
      //   // this.drawDeliverCircle = function (n) {
      //   //   this.radRange = (270 - (n - 1)) / n;
      //   //   this.radSectionArr.push(this.starRad);
      //   //   var tempstrAngle = this.starRad;
      //   //   for (var k = 1; k <= n; k++) {
      //   //     drawRadian(this.cr1, this.deliverCircle, tempstrAngle, tempstrAngle + this.radRange);
      //   //     tempstrAngle = tempstrAngle + this.radRange + 1;
      //   //     this.radSectionArr.push(tempstrAngle);
      //   //   }
      //   //   ;
      //   //   // 画白色遮挡
      //   //   drawRadian(this.cr1, this.HideCircle, 0, 360);
      //   // };
      //   // //四种圆
      //   // this.deliverCircle = {
      //   //   x: this.canvsscreenHeight / 2,
      //   //   y: this.canvsscreenWidth / 2,
      //   //   r: this.canvsscreenHeight / 2,
      //   //   color: "#6ACBB3"
      //   // };//档位圆
      //   // this.HideCircle = {
      //   //   x: this.canvsscreenHeight / 2,
      //   //   y: this.canvsscreenWidth / 2,
      //   //   r: this.canvsscreenHeight / 2 - 0.4 * this.rateInit,
      //   //   color: "black"
      //   // };//档位圆
      //   // //画档位圆
      //   // this.drawDeliverCircle = function () {
      //   //   drawRadian(this.cr1, this.deliverCircle, 0, 360);
      //   //   drawRadian(this.cr3, this.HideCircle, 0, 360);
      //   // };
      // };
      //
      // var currentRadObj;
      // setTimeout(function () {
      //   //实现画布
      //   $scope.getCurrentObj = function (index) {
      //     //当前new实例
      //     currentRadObj = new initCircle($scope.currentSlideData[index]);
      //     //当前绑定事件对象
      //     var currentEventObj = getIdObj($scope.currentSlideData[index].canves02);
      //     currentRadObj.drawDeliverCircle();
      //   };
      //   $scope.getCurrentObj(0);
      // }, 20);

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
      $scope.screenWidth = window.innerWidth;
      $scope.fontSize = document.documentElement.clientWidth / 7.5;
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
          ele[0].style.top = $scope.screenHeig - 1*$scope.fontSize*$scope.value.length + 'px';
          ele[0].style.minHeight = 1*$scope.fontSize*$scope.value.length + 'px';
          // ele[0].style.top = 70 + '%';
          // ele[0].style.minHeight = 61 + '%';
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
        chooseWaterWay();//发送选择出水口指令
      };

      // $scope.goLearn = function () {
      //   $state.go("karessLearning");
      // }
      $scope.operating = [{
        text:'nextgen.rename'
      },{
        text:'nextgen.move'
      },{
        text:'nextgen.delete'
      }];

      $scope.popover = $ionicPopover.fromTemplateUrl(
        'build/pages/device-controller/nextgen-controller/modal/popover.html', {
        scope: $scope
      });

      // .fromTemplateUrl() 方法
      $ionicPopover.fromTemplateUrl(
        'build/pages/device-controller/nextgen-controller/modal/popover.html', {
        scope: $scope
      }).then(function(popover) {
        $scope.popover = popover;
      });


      $scope.openPopover = function($event) {
        $scope.popover.show($event);
      };

      $scope.closePopover = function(index) {
        console.log(index);
        $scope.popover.hide();
        // if(index==3){
        //   // $scope.goLearn();
        // }
      }

    }]);
