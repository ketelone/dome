angular.module('mcControlModule')
  .controller('mcControllerCtrl', [
    '$scope',
    '$state',
    '$ionicModal',
    '$compile',
    'baseConfig',
    'checkVersionService', 'SettingsService', '$ionicHistory', '$ionicSlideBoxDelegate', 'mcService', 'hmsHttp', 'cmdService', 'hmsPopup', '$timeout',
    function ($scope,
              $state,
              $ionicModal,
              $compile,
              baseConfig,
              checkVersionService, SettingsService, $ionicHistory, $ionicSlideBoxDelegate, mcService, hmsHttp, cmdService, hmsPopup, $timeout) {
      var sku = SettingsService.get('sku')
      $scope.fontSize = document.documentElement.clientWidth / 7.5;
      $scope.screenHeig = window.innerHeight;
      $scope.screenWidth = window.innerWidth;
      /**
       *@autor: caolei
       *@return: device id
       *@disc: get device id
       */
      var getDeviceId = function () {
        var deviceList = localStorage.deviceInfo.split(";");
        for (var i = 0; i < deviceList.length; i++) {
          var deviceInfo = deviceList[i].split(",");
          if (deviceInfo[0] == sku) {
            return deviceInfo[1];
          }
        }
      };
      var deviceId = getDeviceId();
      $scope.karessController = {
        modelType: "karessController.bath",
      };
      //侧滑转档数量json
      $scope.slideInitData = [{
        des: "init",
        gearNum: 1,
        gearInit: 1,
        gearInitTemp: 1,
        parameterctlFlag: true,
        parNodeid: 'toilet-initCtl',
        canves01: "initcanves01",
        canves02: "initcanves02",
        canves03: "initcanves03",
      }]

      $scope.slideTunBuData = [{
        des: "亮度",
        gearNum: 2,
        gearInit: 1,
        gearInitTemp: 1,
        parameterctlFlag: false,
        parNodeid: 'toilet-TunBuSyCtl',
        canves01: "TunBuSycanves01",
        canves02: "TunBuSycanves02",
        canves03: "TunBuSycanves03",
        flag: "1"
      },
        {
          des: "色温",
          gearNum: 2,
          gearInit: 1,
          gearInitTemp: 1,
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
          imgUrl: "build/img/mc-controller/icon_dengguangnor.png",
          imgSeledUrl: "build/img/mc-controller/icon_dengguang.png",
          imgUrlTemp: "build/img/mc-controller/icon_dengguangnor.png",
          handleDes: "mcController.zhushui",
          selecFlag: false,
          handledata: $scope.slideTunBuData,
          isManyDirective: true
        },
        {
          imgUrl: "build/img/mc-controller/icon_chuwunor.png",
          imgSeledUrl: "build/img/mc-controller/icon_chuwu.png",
          imgUrlTemp: "build/img/mc-controller/icon_chuwunor.png",
          handleDes: "mcController.luoshui",
          selecFlag: false,
          handledata: $scope.slideInitData
        },
        {
          imgUrl: "build/img/mc-controller/icon_yijiannor.png",
          imgSeledUrl: "build/img/mc-controller/icon_yijian.png",
          imgUrlTemp: "build/img/mc-controller/icon_yijiannor.png",
          handleDes: "mcController.shuilianmo",
          selecFlag: false,
          handledata: $scope.shuilianmoData,
          isManyDirective: false
        },
        {
          imgUrl: "build/img/mc-controller/icon_shezhinor.png",
          imgSeledUrl: "build/img/mc-controller/icon_shezhi.png",
          imgUrlTemp: "build/img/mc-controller/icon_shezhinor.png",
          handleDes: "mcController.shezhi",
          selecFlag: false,
        }
      ];

      $scope.goBack = function () {
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
          "<span class='toilet-parameterctl-raddata'  ng-if='list.flag == 1  && list.gearInit == 1'>2700K</span>" +
          "<span class='toilet-parameterctl-raddata'  ng-if='list.flag == 1  && list.gearInit == 2'>4000K</span>" +
          "<span class='toilet-parameterctl-raddata'  ng-if='list.flag == 1  && list.gearInit == 3'>6500K</span>" +

          "<span class='toilet-parameterctl-raddata'  ng-if='list.flag == 2  && list.gearInit == 1'>30</span>" +
          "<span class='toilet-parameterctl-raddata'  ng-if='list.flag == 2  && list.gearInit == 2'>50</span>" +
          "<span class='toilet-parameterctl-raddata'  ng-if='list.flag == 2  && list.gearInit == 3'>100</span>" +

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
                  if (slideDataObj.parNodeid === "toilet-warmjCtl") {
                    slideDataObj.gearInit = 2;
                  } else if (slideDataObj.parNodeid === "toilet-lightCtl") {
                    if (this.i === 1) {
                      slideDataObj.gearInit = "低";
                    }
                    ;
                  } else {
                    slideDataObj.gearInit = 1;
                  }
                } else {
                  if (slideDataObj.parNodeid === "toilet-warmjCtl") {
                    slideDataObj.gearInit = this.i + 1;
                  } else if (slideDataObj.parNodeid === "toilet-lightCtl") {
                    if (this.i === 2) {
                      slideDataObj.gearInit = '中';
                    } else if (this.i === 3) {
                      slideDataObj.gearInit = "高";
                    }
                  } else {
                    slideDataObj.gearInit = this.i;
                  }
                  ;
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
                if (slideDataObj.parNodeid === "toilet-warmjCtl") {
                  slideDataObj.gearInit = this.i + 2;
                } else if (slideDataObj.parNodeid === "toilet-lightCtl") {
                  if (this.i + 1 === 2) {
                    slideDataObj.gearInit = "中";
                  } else if (this.i + 1 === 3) {
                    slideDataObj.gearInit = "高";
                  }
                } else {
                  slideDataObj.gearInit = this.i + 1;
                }
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
      //处理选择怎加border
      var handlenapeListNapeLen = $scope.handlenapeListNape.length;
      $scope.selectNapes = function (index, info) {
        $scope.handlenapeSelectedIndex = index;
        console.log(info.selecFlag);
        if (index == 0) {
          if (info.selecFlag == false) {
            var value = mcService.getCmd("8877", 1, mcService.data.openLight, 0, 5);
            console.log(value);

            if (baseConfig.isCloudCtrl == true) {

              test(index, value, 'mcOpenLight');
            } else {
              console.log(value);
              cmdService.sendCmd(deviceId, value, localStorage.boxIp);
            }
          } else {
            var value = mcService.getCmd("8877", 1, mcService.data.closeLight, 0, 5);
            console.log(value);
            sendCmd(deviceId, value, '灯光关闭成功！', '灯光关闭失败！');
          }
        }
        if (index == 1) {
          if (info.selecFlag == false) {
            var value = mcService.getCmd("8877", 1, mcService.data.openDemist, 0, 5);
            if (baseConfig.isCloudCtrl == true) {
              test(index, value, 'mcDefogging');
            } else {
              console.log(value);
              cmdService.sendCmd(deviceId, value, localStorage.boxIp);
            }
          } else {
            var value = mcService.getCmd("8877", 1, mcService.data.closeDemist, 0, 5);
            console.log(value);
            cmdService.sendCmd(deviceId, value, localStorage.boxIp);
          }
        }
        if (index == 2) {
          var value = mcService.getCmd("8877", 1, mcService.data.closeAll, 0, 5);
          console.log(value);
          cmdService.sendCmd(deviceId, value, localStorage.boxIp);
        }
        if (index == 3) {
          $state.go('karessSetting');
        }


        for (var i = 0; i < handlenapeListNapeLen; i++) {
          if (i !== index) {
            $scope.handlenapeListNape[i].imgUrl = $scope.handlenapeListNape[i].imgUrlTemp;
          }
        }
        ;
        // 根据选择项来初始化选择项的
        if ($scope.handlenapeListNape[index].handledata) {
          $scope.currentSlideData = $scope.handlenapeListNape[index].handledata;
          $scope.initHtmlTemplate($scope.currentSlideData);
          setTimeout(function () {
            $scope.getCurrentObj(0);
          }, 20)
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
        ;
      };
      //保存选择的数据项
      $scope.handleRadSelected;
      $scope.handlenapeSelectedIndex;
      //档位滑动执行发指令操作
      $scope.radScrollSendDir = function () {
        if ($scope.handlenapeListNape[$scope.handlenapeSelectedIndex].isManyDirective) {
          var selectRad = $scope.handlenapeListNape[$scope.handlenapeSelectedIndex].handledata[$scope.handleRadSelected].gearInit;
          console.log(selectRad);
          var diedes = $scope.handlenapeListNape[$scope.handlenapeSelectedIndex].handledata[$scope.handleRadSelected].des;
        }
        if ($scope.handlenapeListNape == 0) {
          var value = mcService.getCmd("8877", 1, mcService.data.closeSanitize, 0, 5);
          cmdService.sendCmd(deviceId, value, localStorage.boxIp);
        }
      };


      //接受tcp状态
      document.addEventListener('SocketPlugin.receiveTcpStatus', function (result) {
        if (result.from.uid == deviceId) {

        }
      }, false);
//接受tcp返回数据
      document.addEventListener('SocketPlugin.receiveTcpData', function (result) {
        if (result[0].data.cmd.length > 0 && result[0].from.uid == deviceId) {
          var status = karessService.explainAck(result[0].data.cmd[0]);
          karessButton(status);
        }
      }, false);
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
            console.log(status)
            if (status.ack == 28) {
              hmsPopup.showShortCenterToast("开灯成功！");
            }
            if (status.ack == 26) {
              hmsPopup.showShortCenterToast("除雾成功！");
            }
          } else {
            if (status.ack.indexOf('fb') >= 0 || status.ack.indexOf('fc') >= 0 || status.ack.indexOf('fd') >= 0) {
              $scope.Toast.show("操作失败！");
            } else {
              karessService.resolveCmd(status.ack);
              console.log(karessService.resolveCmd(status.ack));
            }
          }

        }
        $scope.handlenapeListNape[index].selecFlag = !$scope.handlenapeListNape[index].selecFlag;
        if (index == 5) {
          for (var i = 0; i < $scope.handlenapeListNape.length; i++) {
            $scope.handlenapeListNape[i].selecFlag = false;
            $scope.handlenapeListNape[i].imgUrl = $scope.handlenapeListNape[i].imgUrlTemp;
          }
        } else {
        }
        if ($scope.handlenapeListNape[index].selecFlag == true) {
          $scope.handlenapeListNape[index].imgUrl = $scope.handlenapeListNape[index].imgSeledUrl;
        } else {
          $scope.handlenapeListNape[index].imgUrl = $scope.handlenapeListNape[index].imgUrlTemp;

        }
      }
      $scope.$on('$destroy', function() {
      });
    }]);
