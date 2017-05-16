angular.module('karessControlModule')
  .controller('karessControllerCtrl', [
    '$scope',
    '$state',
    '$ionicModal',
    '$compile',
    'baseConfig',
    'checkVersionService', 'SettingsService', '$ionicHistory', '$ionicSlideBoxDelegate', 'karessService', 'hmsPopup', 'hmsHttp', 'cmdService', '$timeout', '$ionicPopover','$translate',
    function ($scope,
              $state,
              $ionicModal,
              $compile,
              baseConfig,
              checkVersionService, SettingsService, $ionicHistory, $ionicSlideBoxDelegate, karessService, hmsPopup, hmsHttp, cmdService, $timeout, $ionicPopover,$translate) {
      var sku = SettingsService.get('sku');
      /**
       *@autor: caolei
       *@return: device id
       *@disc: get device id
       */
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
      var init = function(){
        var flagLoading = false;
        hmsPopup.showLoading();
        $timeout(function () {
          if(flagLoading == false){
            hmsPopup.hideLoading();
            $scope.Toast.show($translate.instant("karessController.loading"));
          }
        }, 10000);
      }
      init();
      if (angular.isUndefined(localStorage.karessTemp)) {
        localStorage.karessTemp = '10';
      }
      console.log(localStorage.karessTemp);
      if (angular.isUndefined(localStorage.karessLevel)) {
        localStorage.karessLevel = '4';
      }
      if (angular.isUndefined(localStorage.karessPressure)) {
        localStorage.karessPressure = '1';
      }
      if (angular.isUndefined(localStorage.karessOutLet)) {
        localStorage.karessOutLet = 'karessController.bath';
      }
      $scope.config =
        {
          "fillerStatus": false,
          "luoshui": false,
          "touzhen": false,
          "chunjun": false,
          "anmo": false
        }
      $scope.karessController = {
        modelType: localStorage.karessOutLet,
      };
      $scope.fontSize = document.documentElement.clientWidth / 7.5;
      $scope.screenHeig = window.innerHeight;
      $scope.screenWidth = window.innerWidth;

      var statusKaress = function () {
        var value = cmdService.getCmd("8877", '01', '70', 'E3', '02');
        cmdService.sendCmd(deviceId, value, localStorage.boxIp);
      }
      statusKaress();
      //侧滑转档数量jsongulp
      $scope.slideInitData = [{
        des: "init",
        gearNum: 1,
        gearInit: 1,
        gearInitTemp: 1,
        parameterctlFlag: true,
        parameterctlImg: false,
        parNodeid: 'toilet-initCtl',
        canves01: "initcanves01",
        canves02: "initcanves02",
        canves03: "initcanves03",
      }]

      $scope.shuilianmoData = [{
        des: "karessController.anmo",
        desId: "shuilianmodangwei",
        gearNum: 1,
        gearInit: localStorage.karessPressure,
        gearInitTemp: localStorage.karessPressure,
        parameterctlFlag: false,
        parNodeid: 'toilet-NvYongSyCtl',
        canves01: "NvYongSycanves01",
        canves02: "NvYongSycanves02",
        canves03: "NvYongSycanves03",
        flag: '4'
      }];
      $scope.shuiBeiBuData = [{
        des: "karessController.wenDu",
        desId: "beibujiarewendu",
        gearNum: 1,
        gearInit: 1,
        gearInitTemp: 1,
        parameterctlFlag: false,
        parNodeid: 'toilet-NvYongSyCtl',
        canves01: "NvYongSycanves01",
        canves02: "NvYongSycanves02",
        canves03: "NvYongSycanves03",
        flag: '5'
      }];
      $scope.slideTunBuData = [{
        des: "karessController.shuiWen",
        desId: "zhuishuishuiwen",
        gearNum: 19,
        gearInit: localStorage.karessTemp,
        gearInitTemp: localStorage.karessTemp,
        parameterctlFlag: false,
        parNodeid: 'toilet-TunBuSyCtl',
        canves01: "TunBuSycanves01",
        canves02: "TunBuSycanves02",
        canves03: "TunBuSycanves03",
        flag: "1"
      },
        {
          des: "karessController.shuiWei",
          desId: "zhuishuishuiwei",
          gearNum: 3,
          gearInit: localStorage.karessLevel,
          gearInitTemp: localStorage.karessLevel,
          parameterctlFlag: false,
          parNodeid: 'toilet-TunBuPosCtl',
          canves01: "TunBuPosPoscanves01",
          canves02: "TunBuPosPoscanves02",
          canves03: "TunBuPosPoscanves03",
          flag: "2"
        }
      ];


      $scope.handlenapeListNape = [
        {
          imgUrl: "build/img/karess-controller/icon_zhushuinor.png",
          imgSeledUrl: "build/img/karess-controller/icon_zhushui.png",
          imgUrlTemp: "build/img/karess-controller/icon_zhushuinor.png",
          handleDes: "karessController.zhushui",
          selecFlag: $scope.config.fillerStatus,
          handledata: $scope.slideTunBuData,
          isManyDirective: true
        },
        {
          imgUrl: "build/img/karess-controller/icon_luoshuinor.png",
          imgSeledUrl: "build/img/karess-controller/icon_luoshui.png",
          imgUrlTemp: "build/img/karess-controller/icon_luoshuinor.png",
          handleDes: "karessController.luoshui",
          selecFlag: $scope.config.luoshui,
          handledata: $scope.slideInitData
        },
        {
          imgUrl: "build/img/karess-controller/icon_shuilinor.png",
          imgSeledUrl: "build/img/karess-controller/icon_shuili.png",
          imgUrlTemp: "build/img/karess-controller/icon_shuilinor.png",
          handleDes: "karessController.shuilianmo",
          selecFlag: $scope.config.anmo,
          handledata: $scope.shuilianmoData,
          isManyDirective: true
        },
        {
          imgUrl: "build/img/karess-controller/icon_touzhennor.png",
          imgSeledUrl: "build/img/karess-controller/icon_touzhen.png",
          imgUrlTemp: "build/img/karess-controller/icon_touzhennor.png",
          handleDes: "karessController.touzhen",
          selecFlag: $scope.config.luoshui,
          handledata: $scope.slideInitData
        },
        {
          imgUrl: "build/img/karess-controller/icon_beibujiarenor.png",
          imgSeledUrl: "build/img/karess-controller/icon_beibujiare.png",
          imgUrlTemp: "build/img/karess-controller/icon_beibujiarenor.png",
          handleDes: "karessController.beibujiare",
          selecFlag: false,
          handledata: $scope.shuiBeiBuData,
          isManyDirective: true
        },
        {
          imgUrl: "build/img/karess-controller/icon_yijiantingzhinor.png",
          imgSeledUrl: "build/img/karess-controller/icon_yijiantingzhi.png",
          imgUrlTemp: "build/img/karess-controller/icon_yijiantingzhinor.png",
          handleDes: "karessController.yijiantingzhi",
          selecFlag: false,
          handledata: $scope.slideInitData
        },
        {
          imgUrl: "build/img/karess-controller/icon_guandaochujunnor.png",
          imgSeledUrl: "build/img/karess-controller/icon_guandaochujun.png",
          imgUrlTemp: "build/img/karess-controller/icon_guandaochujunnor.png",
          handleDes: "karessController.guandaochujun",
          selecFlag: $scope.config.chunjun,
          handledata: $scope.slideInitData
        },
        // {
        //   imgUrl: "build/img/karess-controller/icon_jienengnor.png",
        //   imgSeledUrl: "build/img/karess-controller/icon_jieneng.png",
        //   imgUrlTemp: "build/img/karess-controller/icon_jienengnor.png",
        //   handleDes: "karessController.jieneng",
        //   selecFlag: false,
        //   handledata: $scope.slideInitData
        // },
        {
          imgUrl: "build/img/karess-controller/icon_shezhinor.png",
          imgSeledUrl: "build/img/karess-controller/icon_shezhi.png",
          imgUrlTemp: "build/img/karess-controller/icon_shezhinor.png",
          handleDes: "karessController.shezhi",
          selecFlag: false,
        }
      ];

      $scope.goBack = function () {
        document.removeEventListener("SocketPlugin.receiveTcpData", receiveKaresssTcpDatahandle, false);
        $ionicHistory.goBack();
      }
      /**
       init dang qian mo ban shu ju
       初始化当前模板数据
       */
      $scope.lockSlide = function () {
        $ionicSlideBoxDelegate.enableSlide(false);
      };
      $scope.currentSlideData = $scope.slideInitData;
      //初始化当前模板数据
      $scope.initHtmlTemplate = function (currentSlideData) {
        /**
         init silde-box data
         初始化slide-box数据
         */
        if ($('#ionSliderBox').children().length !== 0) {
          $('#ionSliderBox').empty();
        }
        ;
        var checHtml =
          "<ion-slide-box ng-init='lockSlide()' show-pager='true' delegate-handle='boxSlider'>" +
          "<ion-slide ng-repeat='list in currentSlideData track by $index'>" +
          "<div id={{list.parNodeid}} class='toilet-parameterctl'>" +
          "<canvas id={{list.canves01}} class='canves-pos'></canvas>" +
          "<canvas id={{list.canves02}} class='canves-pos'></canvas>" +
          "<canvas id={{list.canves03}} class='canves-pos'></canvas>" +
          "<canvas id={{list.canves04}} class=''canves-pos'></canvas>" +
          "<div class='toilet-parameterctl-data' ng-if='!list.parameterctlFlag'>" +
          "<span class='toilet-parameterctl-raddata'  ng-if='list.flag == 1'>{{config.temp}}</span>" +
          "<span class='toilet-parameterctl-raddata'  ng-if='list.flag == 2  && list.gearInit == 1'>25%</span>" +
          "<span class='toilet-parameterctl-raddata'  ng-if='list.flag == 2  && list.gearInit == 2'>50%</span>" +
          "<span class='toilet-parameterctl-raddata'  ng-if='list.flag == 2  && list.gearInit == 3'>75%</span>" +
          "<span class='toilet-parameterctl-raddata'  ng-if='list.flag == 2  && list.gearInit == 4'>95%</span>" +
          "<span class='toilet-parameterctl-raddata'  ng-if='list.flag == 4  && list.gearInit == 1'>L1</span>" +
          "<span class='toilet-parameterctl-raddata'  ng-if='list.flag == 4  && list.gearInit == 2'>L2</span>" +
          "<span class='toilet-parameterctl-raddata'  ng-if='list.flag == 5  && list.gearInit == 1'>低档</span>" +
          "<span class='toilet-parameterctl-raddata'  ng-if='list.flag == 5  && list.gearInit == 2'>高档</span>" +
          "<span class='toilet-parameterctl-des' ng-bind={{list.des}}></span>" +
          "<span class='toilet-parameterctl-des' ng-bind='list.gearInit+29' ng-if='list.flag == 1'></span>" +
          "</div>" +
          "<div class='toilet-parameterctl-data' ng-if='list.parameterctlFlag'>" +
          "<img class='conninfo-parameterctl-img' ng-src='build/img/toilet-controller/btn_devicedetail_scoll.png' alt='' ng-if='parameterctlImg'>" +
          "<span class='toilet-parameterctl-raddata' ng-if='!parameterctlImg'>{{config.temp}}℃</span>" +
          "<span class='toilet-parameterctl-des' ng-if='!parameterctlImg'>{{config.level}}%</span>" +
          "</div>" +
          "</div>" +
          "</ion-slide>" +
          "</ion-slide-box>"
        /**
         bian yi html 数据
         编译html数据
         */
        var $checkhtml = $compile(checHtml)($scope); // 编译
        $('#ionSliderBox').append($checkhtml[0])
      };
      $scope.initHtmlTemplate($scope.currentSlideData);
      var onceFlag = true;
      var initCircle = function (slideDataObj) {
        //获取父元素高度
        this.rateInit = document.documentElement.clientWidth / 7.5;
        this.canvsscreenHeight = document.getElementById(slideDataObj.parNodeid).offsetHeight;
        this.canvsscreenWidth = document.getElementById(slideDataObj.parNodeid).offsetWidth;
        // 设置每个canves的宽高
        document.getElementById(slideDataObj.canves01).height = this.canvsscreenHeight;
        document.getElementById(slideDataObj.canves01).width = this.canvsscreenWidth;
        document.getElementById(slideDataObj.canves01).style.zIndex = 1;

        document.getElementById(slideDataObj.canves02).height = this.canvsscreenHeight;
        document.getElementById(slideDataObj.canves02).width = this.canvsscreenWidth;
        document.getElementById(slideDataObj.canves02).style.zIndex = 3;

        document.getElementById(slideDataObj.canves03).height = this.canvsscreenHeight;
        document.getElementById(slideDataObj.canves03).width = this.canvsscreenWidth;
        document.getElementById(slideDataObj.canves03).style.zIndex = 2;
        // 获取canvesobj
        this.cr1 = getCanvesObj(slideDataObj.canves01);//档位canves
        this.cr2 = getCanvesObj(slideDataObj.canves02);//滑动小球档位canves
        this.cr3 = getCanvesObj(slideDataObj.canves03);//颜色填充档位canves
        //四种圆
        this.deliverCircle = {
          x: this.canvsscreenHeight / 2,
          y: this.canvsscreenWidth / 2,
          r: this.canvsscreenHeight / 2 - 0.1 * this.rateInit,
          color: "#2F3538"
        };//档位圆
        this.HideCircle = {
          x: this.canvsscreenHeight / 2,
          y: this.canvsscreenWidth / 2,
          r: this.canvsscreenHeight / 2 - 0.5 * this.rateInit,
          color: "black"
        };//档位圆
        this.deliverLine = {
          x: this.canvsscreenHeight / 2,
          y: this.canvsscreenWidth / 2,
          r: this.canvsscreenHeight / 2 - 0.1 * this.rateInit,
          color: "black"
        };//档位线
        this.rollCircle = {
          x: this.canvsscreenHeight / 2,
          y: this.canvsscreenWidth / 2,
          r: this.canvsscreenHeight / 2 - 0.3 * this.rateInit,
          color: "white"
        };//小球圆
        this.FillCircle = {
          x: this.canvsscreenHeight / 2,
          y: this.canvsscreenWidth / 2,
          r: this.canvsscreenHeight / 2 - 0.1 * this.rateInit,
          color: "#6ACBB3"
        };//填充圆
        //变量
        this.i = 0;
        this.j = 0;
        this.stoPosPoint = 0;
        this.starRad = 135;
        this.radSectionArr = [];
        this.radRange;
        //画档位圆
        this.drawDeliverCircle = function (n) {
          this.radRange = (270 - (n - 1)) / n;
          this.radSectionArr.push(this.starRad);
          var tempstrAngle = this.starRad;
          for (var k = 1; k <= n; k++) {
            drawRadian(this.cr1, this.deliverCircle, tempstrAngle, tempstrAngle + this.radRange);
            tempstrAngle = tempstrAngle + this.radRange + 1;
            this.radSectionArr.push(tempstrAngle);
          }
          ;
          // 画白色遮挡
          drawRadian(this.cr1, this.HideCircle, 0, 360);
        };
        // 画填充圆
        this.drawCircleFill = function (canvesobj, changeRad) {
          canvesobj.clearRect(0, 0, this.canvsscreenHeight, this.canvsscreenWidth);
          drawRadian(canvesobj, this.FillCircle, this.starRad, changeRad);
          //在滑动的时候判断是否经过档位点并重新画档位线
          if (changeRad < 0) {
            var changeRadTemp = Math.abs(changeRad + 360);
          } else {
            if (changeRad >= 0 && changeRad <= 45) {
              var changeRadTemp = Math.abs(changeRad + 360);
            } else {
              var changeRadTemp = Math.abs(changeRad);
            }
            ;
          }
          ;
          this.radSectionArr.push(changeRadTemp);
          this.radSectionArr = this.radSectionArr.sort(function (a, b) {
            return a - b
          });
          //判断是否滑动过档位点,若有滑过,则画遮挡弧度
          var radSectionArrLen = this.radSectionArr.length;
          //判断当前点距离那个档位距离最近
          this.i = 0;
          this.i = 1;
          for (this.i; this.i < radSectionArrLen; this.i++) {
            if (changeRadTemp === this.radSectionArr[this.i]) {
              if (Math.abs(this.radSectionArr[this.i] - this.radSectionArr[this.i - 1]) < Math.abs(this.radSectionArr[this.i] - this.radSectionArr[this.i + 1])) {
                this.stoPosPoint = this.i - 1;
                if (this.i <= 1) {
                  slideDataObj.gearInit = 1;
                } else {

                  slideDataObj.gearInit = this.i;
                }
                ;
                if (onceFlag) {
                  $scope.$apply();
                }
                ;
                //画档位线
                this.j = 1;
                for (this.j; this.j < this.i; this.j++) {
                  drawRadian(this.cr3, this.deliverLine, this.radSectionArr[this.i - this.j - 1] - 1, this.radSectionArr[this.i - this.j - 1]);
                }
                ;
              } else {
                this.stoPosPoint = this.i;

                slideDataObj.gearInit = this.i + 1;
                if (onceFlag) {
                  $scope.$apply();
                }
                ;
                //画档位线
                this.j = 1;
                for (this.j; this.j < this.i + 1; this.j++) {
                  drawRadian(this.cr3, this.deliverLine, this.radSectionArr[this.i - this.j] - 1, this.radSectionArr[this.i - this.j]);
                }
                ;
              }
              ;
              this.radSectionArr.splice(this.i, 1);
            }
          }
          ;
          //画白色遮挡
          drawRadian(canvesobj, this.HideCircle, 0, 360);
        };
        //画圆球和指示
        this.drawc = function (canvesobj, ancr, type) {
          if (135 <= ancr || ancr <= 45) {
            var jd = changeAngale(ancr);
            canvesobj.clearRect(0, 0, this.canvsscreenHeight, this.canvsscreenWidth);
            var x = Math.cos(jd) * (this.rollCircle.r) + (this.rollCircle.x);
            var y = Math.sin(jd) * (this.rollCircle.r) + (this.rollCircle.y);
            //画小球
            canvesobj.beginPath();
            canvesobj.fillStyle = this.rollCircle.color;
            canvesobj.moveTo(x, y);
            canvesobj.arc(x, y, 0.2 * this.rateInit, 0, Math.PI * 2, false);
            canvesobj.fill();
            canvesobj.closePath();
            //画小球中的指示标识
            canvesobj.beginPath();
            canvesobj.fillStyle = "#191C23";
            canvesobj.lineWidth = 0.01 * this.rateInit;//设置线宽
            canvesobj.moveTo(x, y - (0.2 * this.rateInit / 4));
            canvesobj.lineTo(x - (0.2 * this.rateInit / 4) / Math.sqrt(2) - 0.01 * this.rateInit, y);
            canvesobj.lineTo(x, y + (0.2 * this.rateInit / 4));
            canvesobj.fill();//填充颜色
            canvesobj.moveTo(x + 0.01 * this.rateInit, y - (0.2 * this.rateInit / 4));
            canvesobj.lineTo(x + (0.2 * this.rateInit / 4) / Math.sqrt(2) + 0.02 * this.rateInit, y);
            canvesobj.lineTo(x + 0.01 * this.rateInit, y + (0.2 * this.rateInit / 4));
            canvesobj.stroke();//画线框
            canvesobj.fill();//填充颜色
            canvesobj.closePath();
            //随小球和指示画fil填充
            if (!type) {
              this.drawCircleFill(this.cr3, ancr);
            }
            ;
          }
          ;
        };
      };
      var currentRadObj;
      setTimeout(function () {
        //保存选择的数据项当前的档位
        $scope.handleRadSelected;
        $scope.getCurrentObj = function (index) {
          $scope.handleRadSelected = index;
          //当前new实例
          currentRadObj = new initCircle($scope.currentSlideData[index]);
          $scope.handlenapeListNape.forEach(function (item, i) {
            if (item.isManyDirective) {
              if (item.matchdataid === $scope.currentSlideData[index].id) {
                currentRadObj.selectedIndex = i;
                currentRadObj.currentIndex = index;
              }
            }
          });
          currentRadObj.i = 0;
          currentRadObj.id = $scope.currentSlideData[index].id;
          currentRadObj.j = 0;
          currentRadObj.stoPosPoint = 0;
          currentRadObj.gearInit = $scope.currentSlideData[index].gearInitTemp;
          $scope.currentSlideData[index].gearInit = $scope.currentSlideData[index].gearInitTemp;
          //当前绑定事件对象
          var currentEventObj = getIdObj($scope.currentSlideData[index].canves02);
          currentRadObj.drawDeliverCircle($scope.currentSlideData[index].gearNum);
          if ($scope.currentSlideData[index].des === "init") {
            currentRadObj.drawc(currentRadObj.cr2, 405, "type");
            currentRadObj.drawCircleFill(currentRadObj.cr2, 405);
            //初始化数据
            $('.slider-pager').empty();
          } else {
            currentRadObj.drawc(currentRadObj.cr2, currentRadObj.starRad + currentRadObj.radRange * ($scope.currentSlideData[index].gearInit - 1), "type");
            currentRadObj.drawCircleFill(currentRadObj.cr3, currentRadObj.starRad + currentRadObj.radRange * ($scope.currentSlideData[index].gearInit - 1));
            currentEventObj.addEventListener('touchstart', function (e) {
              e.preventDefault();
            }, false);
            currentEventObj.addEventListener('touchmove', function (e) {
              e.preventDefault();
              var poi = getEvtLocation(e);
              currentRadObj.drawc(currentRadObj.cr2, getAngle($scope.screenWidth / 2, 2.7 * 2 * $scope.fontSize, poi.x, poi.y));
            }, false);
            currentEventObj.addEventListener('touchend', function (e) {
              e.preventDefault();
              currentRadObj.drawc(currentRadObj.cr2, currentRadObj.radSectionArr[currentRadObj.stoPosPoint]);
              //档位滑动执行发指令操作
              $scope.radScrollSendDir(currentRadObj);
            }, false);
            var getEvtLocation = function (e) {
              var touch = e.touches[0];
              return {
                x: touch.clientX,
                y: touch.clientY
              }
            };
          }
          ;
        };
        $scope.getCurrentObj(0);
        $scope.slideHasChanged = function (index) {
          $scope.getCurrentObj(index);
        };
        $scope.nextSlide = function () {
          var sliderLenght = document.querySelectorAll('ion-slide').length;
          if (sliderLenght !== 1) {
            $ionicSlideBoxDelegate.next();
            $scope.getCurrentObj($ionicSlideBoxDelegate.currentIndex());
          }
          ;
        };
        $scope.count = 0;
        $scope.slideHasChangedleft = function () {
          onceFlag = true;
          if ($scope.currentSlideData.length !== 1) {
            onceFlag = false;
            $scope.count--;
            if ($scope.count >= 0) {
              currentRadObj = null;
              $ionicSlideBoxDelegate.$getByHandle('boxSlider').previous();
              $timeout(function () {
                $scope.getCurrentObj($scope.count);
                onceFlag = true;
              }, 17)
            } else {
              $scope.count = 0;
            }
          }
          ;
        };
        $scope.slideHasChangedright = function () {
          onceFlag = true;
          var slidecount = $scope.currentSlideData.length;
          if (slidecount !== 1) {
            onceFlag = false;
            $scope.count++;
            if ($scope.count <= slidecount - 1) {
              currentRadObj = null;
              $ionicSlideBoxDelegate.$getByHandle('boxSlider').next();
              $timeout(function () {
                $scope.getCurrentObj($scope.count);
                onceFlag = true;
              }, 17)
            } else {
              $scope.count = slidecount - 1;
            }
            ;
          }
          ;
        };
      }, 20);

      //slelect button
      $scope.selectNapes = function (index, info) {
        $scope.handlenapeSelectedIndex = index;
        $scope.slideInitData.parameterctlImg = true;
        if (index == 0) {
          hmsPopup.showLoading();
          $timeout(function () {
            hmsPopup.hideLoading();
          }, 500);
          if (info.selecFlag == false) {
            //tingzhizhushui
            var value1 = cmdService.getCmd("8877", '01', karessService.data.closeDrain, 'E3', '02');

            //wendu
            if ($scope.karessController.modelType == 'karessController.bath') {
              var outlet = '13';
            } else {
              var outlet = '23';
            }
            var temp = $scope.slideTunBuData[0].gearInit + 29;
            if ($scope.slideTunBuData[1].gearInit == 1) {
              var level = 25;
            } else if ($scope.slideTunBuData[1].gearInit == 2) {
              var level = 50;
            }
            else if ($scope.slideTunBuData[1].gearInit == 3) {
              var level = 75;
            }
            else if ($scope.slideTunBuData[1].gearInit == 4) {
              var level = 95;
            }
            var value2 = cmdService.getCmd("8877", '01', karessService.setFillerParams(temp, level, outlet), 'E3', '02');
            console.log(value2);
            var value = cmdService.getCmd("8877", '01', karessService.data.openFiller, 'E3', '02');
            console.log(baseConfig.isCloudCtrl);
            if (baseConfig.isCloudCtrl == true) {
              test(index, value, 'karessOnWater');
            } else {
              if ($scope.handlenapeListNape[1].selecFlag == true) {
                cmdService.sendCmd(deviceId, value1, localStorage.boxIp);
                $scope.openFillerFlag = true;
              } else {
                $scope.openFillerFlag = false;
              }
              $timeout(function () {
                cmdService.sendCmd(deviceId, value2, localStorage.boxIp);
              }, 260);
              $timeout(function () {
                cmdService.sendCmd(deviceId, value, localStorage.boxIp);
              }, 500);
            }
          } else {
            var value = cmdService.getCmd("8877", '01', karessService.data.closeFiller, 'E3', '02');
            console.log(value);
            cmdService.sendCmd(deviceId, value, localStorage.boxIp);
          }
        }
        if (index == 1) {
          hmsPopup.showLoading();
          $timeout(function () {
            hmsPopup.hideLoading();
          }, 500);
          if (info.selecFlag == false) {
            var value = cmdService.getCmd("8877", '01', karessService.data.openDrain, 'E3', '02');
            if (baseConfig.isCloudCtrl == true) {
              test(index, value, 'karessOffWater');
            } else {
              console.log(value);
              cmdService.sendCmd(deviceId, value, localStorage.boxIp);
            }
          } else {
            var value = cmdService.getCmd("8877", '01', karessService.data.closeDrain, 'E3', '02');
            console.log(value);
            cmdService.sendCmd(deviceId, value, localStorage.boxIp);
          }
        }
        if (index == 2) {
          hmsPopup.showLoading();
          $timeout(function () {
            hmsPopup.hideLoading();
          }, 500);
          if (info.selecFlag == false) {
            var value1 = cmdService.getCmd("8877", '01', karessService.setMassageBackPressure('10', '00'), 'E3', '02');
            console.log(value1);
            cmdService.sendCmd(deviceId, value1, localStorage.boxIp);
            var value = cmdService.getCmd("8877", '01', karessService.data.openMassageBack, 'E3', '02');
            console.log(value);
            $timeout(function () {
              cmdService.sendCmd(deviceId, value, localStorage.boxIp);
            }, 300);
          } else {
            var value = cmdService.getCmd("8877", '01', karessService.data.closeMassageBack, 'E3', '02');
            cmdService.sendCmd(deviceId, value, localStorage.boxIp);
          }
        }
        if (index == 3) {
          hmsPopup.showLoading();
          $timeout(function () {
            hmsPopup.hideLoading();
          }, 500);
          if (info.selecFlag == false) {
            var value = cmdService.getCmd("8877", '01', karessService.data.openMassagePillow, 'E3', '02');
            console.log(value);
            cmdService.sendCmd(deviceId, value, localStorage.boxIp);
          } else {
            var value = cmdService.getCmd("8877", '01', karessService.data.closeMassagePillow, 'E3', '02');
            console.log(value);
            cmdService.sendCmd(deviceId, value, localStorage.boxIp);
          }
        }
        if (index == 4) {
          hmsPopup.showLoading();
          $timeout(function () {
            hmsPopup.hideLoading();
          }, 500);
          return;
          if (info.selecFlag == false) {
            var value = cmdService.getCmd("8877", '01', karessService.data.openHeatBack, 'E3', '02');
            console.log(value);
            cmdService.sendCmd(deviceId, value, localStorage.boxIp);
          } else {
            var value = cmdService.getCmd("8877", '01', karessService.data.closeHeatBack, 'E3', '02');
            console.log(value);
            cmdService.sendCmd(deviceId, value, localStorage.boxIp);
          }
        }
        if (index == 5) {
          hmsPopup.showLoading();
          $timeout(function () {
            hmsPopup.hideLoading();
          }, 500);
          var value = cmdService.getCmd("8877", '01', karessService.data.closeAll, 'E3', '02');
          console.log(value);
          cmdService.sendCmd(deviceId, value, localStorage.boxIp);
        }
        if (index == 6) {
          hmsPopup.showLoading();
          $timeout(function () {
            hmsPopup.hideLoading();
          }, 500);
          if (info.selecFlag == false) {
            var value = cmdService.getCmd("8877", '01', karessService.data.openSanitize, 'E3', '02');
            console.log(value);
            cmdService.sendCmd(deviceId, value, localStorage.boxIp);
          } else {
            var value = cmdService.getCmd("8877", '01', karessService.data.closeDrain, 'E3', '02');
            console.log(value);
            cmdService.sendCmd(deviceId, value, localStorage.boxIp);
          }
        }
        // if (index == 7) {
        //   if (info.selecFlag == false) {
        //     var value = cmdService.getCmd("8877", 1, karessService.data.openSanitize, 0, 2);
        //     console.log(value);
        //     cmdService.sendCmd(deviceId, value, localStorage.boxIp);
        //   } else {
        //     var value = cmdService.getCmd("8877", 1, karessService.data.closeSanitize, 0, 2);
        //     console.log(value);
        //     cmdService.sendCmd(deviceId, value, localStorage.boxIp);
        //   }
        // }
        if (index == 7) {
          $state.go('karessSetting');
        }

        // 根据选择项来初始化选择项的
        if ($scope.handlenapeListNape[index].handledata) {
          $scope.currentSlideData = $scope.handlenapeListNape[index].handledata;
          $scope.initHtmlTemplate($scope.currentSlideData);
          setTimeout(function () {
            $scope.getCurrentObj(0);
          }, 20)
        }
      };
      //模式选择
      //获取屏幕高度
      $scope.screenHeig = window.innerHeight;
      $ionicModal.fromTemplateUrl('build/pages/device-controller/karess-controller/modal/hmsModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });
      $scope.value = [{id: 1, des: 'karessController.bath'},
        {id: 2, des: 'karessController.handshower'}
      ];
      $scope.openModal = function () {
        if ($scope.handlenapeSelectedIndex == 0) {
        } else {
          $scope.Toast($translate.instant("golabelvariable.directesuccess"));
          return;
        }
        if ($scope.value.length !== 0) {
          $scope.modal.show();
          setTimeout(function () {
            var ele = document.getElementsByClassName("hmsModal");
            ele[0].style.top = 85 + '%';
            ele[0].style.minHeight = 61 + '%';
          }, 10)
        }
      };
      $scope.$on('$destroy', function () {
        $scope.modal.remove();
      });
      $scope.choose = function (val) {
        $scope.modal.hide();
        for (var i = 0; i < $scope.value.length; i++) {
          if ($scope.value[i].id === val.id) {
            $scope.karessController.modelType = $scope.value[i].des;
          }
        }
        localStorage.karessOutLet = $scope.karessController.modelType;
        console.log($scope.karessController.modelType);
        if ($scope.karessController.modelType == 'karessController.bath') {
          var outlet = '13';
        } else {
          var outlet = '23';
        }
        var temp = $scope.slideTunBuData[0].gearInit + 29;
        if ($scope.slideTunBuData[1].gearInit == 1) {
          var level = 25;
        } else if ($scope.slideTunBuData[1].gearInit == 2) {
          var level = 50;
        }
        else if ($scope.slideTunBuData[1].gearInit == 3) {
          var level = 75;
        }
        else if ($scope.slideTunBuData[1].gearInit == 4) {
          var level = 95;
        }
        //tingzhizhushui
        var value2 = cmdService.getCmd("8877", '01', karessService.setFillerParams(temp, level, outlet), 'E3', '02');
        cmdService.sendCmd(deviceId, value2, localStorage.boxIp);
      };

      //保存选择的数据项
      $scope.handleRadSelected;
      $scope.handlenapeSelectedIndex;
      //档位滑动执行发指令操作
      $scope.radScrollSendDir = function () {
        if ($scope.handlenapeListNape[$scope.handlenapeSelectedIndex].isManyDirective) {
          var selectRad = $scope.handlenapeListNape[$scope.handlenapeSelectedIndex].handledata[$scope.handleRadSelected].gearInit;
          $scope.handlenapeListNape[$scope.handlenapeSelectedIndex].handledata[$scope.handleRadSelected].gearInitTemp = $scope.handlenapeListNape[$scope.handlenapeSelectedIndex].handledata[$scope.handleRadSelected].gearInit;
          console.log(selectRad);
          var diedes = $scope.handlenapeListNape[$scope.handlenapeSelectedIndex].handledata[$scope.handleRadSelected].desId;
          console.log(diedes);
        }
        console.log($scope.handlenapeListNape[$scope.handlenapeSelectedIndex]);
        if (diedes == 'zhuishuishuiwen' || diedes == 'zhuishuishuiwei') {
          var temp = $scope.slideTunBuData[0].gearInit + 29;
          localStorage.karessTemp = $scope.slideTunBuData[0].gearInit + 1;
          console.log(localStorage.karessTemp);
          if ($scope.slideTunBuData[1].gearInit == 1) {
            var level = 25;
          } else if ($scope.slideTunBuData[1].gearInit == 2) {
            var level = 50;
          }
          else if ($scope.slideTunBuData[1].gearInit == 3) {
            var level = 75;
          }
          else if ($scope.slideTunBuData[1].gearInit == 4) {
            var level = 95;
          }
          localStorage.karessLevel = $scope.slideTunBuData[1].gearInit;
          if ($scope.karessController.modelType == 'karessController.bath') {
            var outlet = '13';
          } else {
            var outlet = '23';
          }
          localStorage.karessOutLet = $scope.karessController.modelType;
          var value2 = cmdService.getCmd("8877", '01', karessService.setFillerParams(temp, level, outlet), 'E3', '02');
          console.log(value2);
          cmdService.sendCmd(deviceId, value2, localStorage.boxIp);
        } else if (diedes == 'shuilianmodangwei') {
          if ($scope.shuilianmoData[0].gearInit == 1) {
            var temp = '10';
          } else {
            var temp = '50';
          }
          localStorage.karessPressure = $scope.shuilianmoData[0].gearInit;
          var value = cmdService.getCmd("8877", '01', karessService.setMassageBackPressure(temp, '00'), 'E3', '02');
          console.log(value);
          cmdService.sendCmd(deviceId, value, localStorage.boxIp);
        } else if (diedes == 'beibujiarewendu') {
          if ($scope.shuiBeiBuData[0].gearInit == 1) {
            var temp = '00';
          } else {
            var temp = '01';
          }
          var value = cmdService.getCmd("8877", '01', karessService.setHeatParam(temp), 'E3', '02');
          console.log(value2);
          cmdService.sendCmd(deviceId, value, localStorage.boxIp);
        }
      };

//接受tcp状态
//       document.addEventListener('SocketPlugin.receiveTcpStatus', function (result) {
//         if (result.from.uid == deviceId) {
//
//         }
//       }, false);
//接受tcp返回数据
      var receiveKaresssTcpDatahandle = function (result) {
        if (result[0].data.cmd.length > 0 && result[0].from.uid == deviceId) {
          flagLoading = true;
          hmsPopup.hideLoading();
          var cmd = result[0].data.cmd[0];
          var status = karessService.explainAck(result[0].data.cmd[0]);
          if (status.ack.indexOf('fa') >= 0) {
            karessButton(status);
          } else if (status.ack.indexOf('1003') >= 0 || status.ack.indexOf('1002') >= 0 || status.ack.indexOf('1001') >= 0) {
            $scope.Toast.show("操作失败！");
          } else {
            var item = karessService.resolveCmd(cmd);
            if (item.type.indexOf('A6') >= 0) {
              $scope.config.temp = item.value.temperature;
              buttonChange();
              hmsPopup.hideLoading();
            } else if (item.type.indexOf('A7') >= 0) {
              $scope.config.level = item.value.waterLevel;
              if ($scope.config.level == $scope.slideTunBuData[1].gearInit) {
                $scope.config.fillerStatus = false;
                $scope.handlenapeListNape[1].selecFlag = $scope.config.fillerStatus;
                buttonChange();
              } else {
                buttonChange();
              }
              hmsPopup.hideLoading();
            } else if (item.type.indexOf('8A') >= 0) {//zhushui
              if (item.value.status == '00') {
                $scope.config.fillerStatus = false;
              } else {
                $scope.config.fillerStatus = true;
              }
              $scope.handlenapeListNape[0].selecFlag = $scope.config.fillerStatus;
              buttonChange();
            } else if (item.type.indexOf('88') >= 0) {//luoshui
              if (item.value.status == '02') {
                $scope.config.luoshui = false;
              } else {
                $scope.config.luoshui = true;
              }
              $scope.handlenapeListNape[1].selecFlag = $scope.config.luoshui;
              buttonChange();
            } else if (item.type.indexOf('84') >= 0) {//anmo
              if (item.value.status == '01') {
                $scope.config.anmo = false;
              } else {
                $scope.config.anmo = true;
              }
              $scope.handlenapeListNape[2].selecFlag = $scope.config.anmo;
              buttonChange();
            }
            else if (item.type.indexOf('83') >= 0) {//touzhen
              if (item.value.status == '1') {
                $scope.config.touzhen = false;
              } else {
                $scope.config.touzhen = true;
              }
              $scope.handlenapeListNape[3].selecFlag = $scope.config.touzhen;
              buttonChange();
            } else if (item.type.indexOf('87') >= 0) {//chujun
              if (item.value.status == '01') {
                $scope.config.chunjun = false;
              } else {
                $scope.config.chunjun = true;
              }
              $scope.handlenapeListNape[6].selecFlag = $scope.config.chunjun;
              buttonChange();
            }
          }
        }
      }
      document.addEventListener('SocketPlugin.receiveTcpData', receiveKaresssTcpDatahandle, false);
      function buttonChange() {
        for (var i = 0; i < $scope.handlenapeListNape.length; i++) {
          if ($scope.handlenapeListNape[i].selecFlag == true) {
            $scope.handlenapeListNape[i].imgUrl = $scope.handlenapeListNape[i].imgSeledUrl;
          } else {
            $scope.handlenapeListNape[i].imgUrl = $scope.handlenapeListNape[i].imgUrlTemp;
          }
        }
        // if ($scope.handlenapeListNape[0].selecFlag == true && $scope.handlenapeListNape[2].selecFlag == true) {
        //   $scope.currentSlideData = $scope.shuilianmoData.concat($scope.shuilianmoData);
        //   $scope.initHtmlTemplate($scope.currentSlideData);
        //   setTimeout(function () {
        //     $scope.getCurrentObj(0);
        //   }, 20)
        // } else if ($scope.handlenapeListNape[0].selecFlag == true) {
        //   $scope.currentSlideData = $scope.slideTunBuData;
        //   $scope.initHtmlTemplate($scope.currentSlideData);
        //   setTimeout(function () {
        //     $scope.getCurrentObj(0);
        //   }, 20)
        // } else if ($scope.handlenapeListNape[2].selecFlag == true) {
        //   $scope.currentSlideData = $scope.shuilianmoData;
        //   $scope.initHtmlTemplate($scope.currentSlideData);
        //   setTimeout(function () {
        //     $scope.getCurrentObj(0);
        //   }, 20)
        // } else {
        // }

        $scope.$apply();
      }

      var test = function (index, value, deviceId) {
        var url = baseConfig.basePath + "/r/api/message/sendMessage";
        var paramter = cmdService.cloudCmd(deviceId, value);
        console.log(paramter);
        hmsHttp.post(url, paramter).success(
          function (response) {
            if (response.code == 200) {
              var status = karessService.explainAck(response.data.data.cmd[0]);
              karessButton(status);
            }
          }
        ).error(
          function (response, status, header, config) {
          }
        );
      };

      function karessButton(status) {
        var index = $scope.handlenapeSelectedIndex;
        if (status == '') {
        } else {
          if (status.ack.indexOf('fa') >= 0) {
            status.ack = status.ack.substring(2, 4);
            console.log(status);
            if (status.ack == '22') {
              if ($scope.handlenapeListNape[index].selecFlag == false) {
                $scope.Toast.show("注水开启成功！");
                changeColor();
              } else {
                $scope.Toast.show("注水关闭成功！");
                changeColor();
              }
            }
            if (status.ack == '25') {
              // if($scope.openFillerFlag == true){
              //   $scope.openFillerFlag = false;
              //   return;
              // }
              if ($scope.handlenapeListNape[index].selecFlag == false) {
                $scope.Toast.show("落水开启成功！");
                changeColor();
              } else {
                $scope.Toast.show("落水关闭成功！");
                changeColor();
              }
            }
            if (status.ack == '21') {
              if ($scope.handlenapeListNape[index].selecFlag == false) {
                $scope.Toast.show("水力按摩开启成功！");
                changeColor();
              } else {
                $scope.Toast.show("水力按摩关闭成功！");
                changeColor();
              }
            }
            if (status.ack == '23') {
              if ($scope.handlenapeListNape[index].selecFlag == false) {
                $scope.Toast.show("头部按摩开启成功！");
                changeColor();
              } else {
                $scope.Toast.show("头部按摩关闭成功！");
                changeColor();
              }
            }
            if (status.ack == '24') {
              if ($scope.handlenapeListNape[index].selecFlag == false) {
                $scope.Toast.show("管道除菌开启成功！");
                changeColor();
              } else {
                $scope.Toast.show("管道除菌关闭成功！");
                changeColor();
              }
            }
            if (status.ack == '27') {
              if ($scope.handlenapeListNape[index].selecFlag == false) {
                $scope.Toast.show("背部加热开启成功！");
                changeColor();
              } else {
                $scope.Toast.show("背部加热关闭成功！");
                changeColor();
              }
            }
            if (status.ack == '00') {
              $scope.Toast.show("一键关闭成功！");
              changeColor();
            }
            if (status.ack == '70') {
              $scope.flagStatus = true;
            }
          } else {
          }

        }
        function changeColor() {
          $scope.handlenapeListNape[index].selecFlag = !$scope.handlenapeListNape[index].selecFlag;
          if (index == 5) {
            for (var i = 0; i < $scope.handlenapeListNape.length; i++) {
              if (index == 1) {
              } else {
                $scope.handlenapeListNape[i].selecFlag = false;
                $scope.handlenapeListNape[i].imgUrl = $scope.handlenapeListNape[i].imgUrlTemp;
              }
            }
            return;
          }
          if ($scope.handlenapeListNape[index].selecFlag == true) {
            $scope.handlenapeListNape[index].imgUrl = $scope.handlenapeListNape[index].imgSeledUrl;
          } else {
            $scope.handlenapeListNape[index].imgUrl = $scope.handlenapeListNape[index].imgUrlTemp;

          }
        }

      }

      $scope.goLearn = function () {
        $state.go("karessLearning");
      }
      $scope.operating = [{
        text: '重命名'
      }, {
        text: '移动'
      }, {
        text: '解除绑定'
      }, {
        text: '机器学习设置'
      }];

      $scope.popover = $ionicPopover.fromTemplateUrl('build/pages/device-controller/karess-controller/modal/popover.html', {
        scope: $scope
      });

      // .fromTemplateUrl() 方法
      $ionicPopover.fromTemplateUrl('build/pages/device-controller/karess-controller/modal/popover.html', {
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
        if (index == 3) {
          $scope.goLearn();
        }
      }
    }]);
