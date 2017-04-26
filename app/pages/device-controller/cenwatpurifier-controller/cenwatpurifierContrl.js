angular.module('toiletControlModule')
  .controller('cenwatpurifierCtrl', [
    '$scope',
    '$state',
    '$ionicSlideBoxDelegate',
    '$timeout',
    'publicMethod',
    'hmsPopup',
    '$ionicModal',
    '$compile',
    'baseConfig',
    'checkVersionService',
    function ($scope,
              $state,
              $ionicSlideBoxDelegate,
              $timeout,
              publicMethod,
              hmsPopup,
              $ionicModal,
              $compile,
              baseConfig,
              checkVersionService
    ) {
      $scope.goBack = function () {
        publicMethod.goBack();
      }
      /*
       Central water purifier shu ju
       */
      $scope.cenwatpurifierCtrl = {
        //status
        readyconnected:"cenwatpurifier.readyConnected",
        unconnected:"cenwatpurifier.unConnected",
        connectStatus:"cenwatpurifier.readyConnected",
        // //clear
        clearSurplus:"cenwatpurifier.surplus",
        clearComplete:"cenwatpurifier.complete",
        clearStatus:"cenwatpurifier.surplus",
        clearData:"1:34",
        isShwoClearStatus:true
      }
      // var myworker= new Worker("work.js");
      //
      // // $('#button').on('click',function(e){
      // //   myworker.postMessage(60);
      //
      // // });
      //
      //
      // myworker.addEventListener("message", function(e){
      //   console.log(e.data)
      // });

      /*
       moren-json
       init默认
       **/
      $scope.slideInitData =[{
        des: "init",
        parameterctlFlag: false,
        parNodeid: 'toilet-initCtl',
        canves01: "initcanves01",
        canves03: "initcanves03",
      }]
      /**
       gong neng list-json
       功能列表数据
       **/
      $scope.handlenapeListNape = [
        {
          imgUrl: "build/img/cenwatpurifier-controller/icon_handleclear.png",
          imgSeledUrl: "build/img/cenwatpurifier-controller/icon_handlecleared.png",
          imgUrlTemp:"build/img/cenwatpurifier-controller/icon_handleclear.png",
          handleDes: "cenwatpurifier.autoclear",
          matchdataid:"clear",
          selecFlag:false,
        },
        {
          imgUrl: "build/img/cenwatpurifier-controller/icon_setting.png",
          imgSeledUrl: "build/img/cenwatpurifier-controller/icon_settinged.png",
          imgUrlTemp:"build/img/cenwatpurifier-controller/icon_setting.png",
          handleDes: "cenwatpurifier.setting",
          matchdataid:"setting",
          selecFlag:false,
        }
      ];
      /**
       *
       set dang qian ce hau shu ju zhi
       设置当前侧滑数据为侧滑初始化数据
       */
      $scope.currentSlideData = $scope.slideInitData;
      /**
       init dang qian mo ban shu ju
       初始化当前模板数据
       */
      $scope.lockSlide = function () {
        $ionicSlideBoxDelegate.enableSlide( false );
      };
      $scope.initHtmlTemplate = function (currentSlideData) {
        /**
         init silde-box data
         初始化slide-box数据
         */
        if($('#cewafiionSliderBox').children().length !== 0){
          $('#cewafiionSliderBox').empty();
        };

        // on-slide-changed='slideHasChanged($index)'>
        var checHtml =
          "<ion-slide-box ng-init='lockSlide()'>"+
          "<ion-slide ng-repeat='list in currentSlideData track by $index'>"+
          "<div id={{list.parNodeid}} class='toilet-parameterctl'>"+
          "<canvas id={{list.canves01}} class='canves-pos'></canvas>"+
          "<canvas id={{list.canves03}} class='canves-pos'></canvas>"+
          "<div class='toilet-parameterctl-data' ng-if='!list.parameterctlFlag'>"+
          "<p ng-if='cenwatpurifierCtrl.isShwoClearStatus' class='toilet-parameterctl-raddata' translate={{cenwatpurifierCtrl.connectStatus}}></p>"+
          "<span ng-if='cenwatpurifierCtrl.isShwoClearStatus' class='toilet-parameterctl-des' translate='cenwatpurifier.status'></span>"+

          "<span ng-if='!cenwatpurifierCtrl.isShwoClearStatus' class='toilet-parameterctl-raddata toilet-parameterct-span' translate={{cenwatpurifierCtrl.clearStatus}}></span>"+
          "<p ng-if='!cenwatpurifierCtrl.isShwoClearStatus' class='toilet-parameterctl-raddata' style='font-size: 0.6rem;' ng-bind='cenwatpurifierCtrl.clearData'></p>"+
          "<span ng-if='!cenwatpurifierCtrl.isShwoClearStatus' class='toilet-parameterctl-des' translate='cenwatpurifier.clear'></span>"+
          "</div>"+
          "<div class='toilet-parameterctl-dataimg' ng-if='list.parameterctlFlag'>"+
          "<img class='conninfo-parameterctl-img' ng-src='build/img/toilet-controller/btn_devicedetail_scoll.png' alt=''>"+
          "</div>"+
          "</div>"+
          "</ion-slide>"+
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
        this.deliverCircle = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2,color:"#6ACBB3"};//档位圆
        this.HideCircle = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2-0.4*this.rateInit,color:"black"};//档位圆
        //画档位圆
        this.drawDeliverCircle = function () {
          drawRadian(this.cr1,this.deliverCircle,0,360);
          drawRadian(this.cr3,this.HideCircle,0,360);
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
          //当前绑定事件对象
          var currentEventObj = getIdObj($scope.currentSlideData[index].canves02);
          currentRadObj.drawDeliverCircle();
        };
        $scope.getCurrentObj(0);
      },20);
      //发送指令
      var cmd = {
        from: {
          cid: "0xE3",
        },
        idx: 1,
        method: "CTL",
        payload: {
          cmd: "CMD_REQUEST",
          "device_type": "BLE_DEVICE",
          value: [],
        },
        to: {
          cid: "0xE4",
          "device_id": "8BE850C2",
        },
        ts: "1492146861.217451",
        ver: 1,
      };
      $scope.sendCmd = function (cmdvalue,des) {
        cmd.payload.value =[];
        cmd.payload.value.push(cmdvalue);
        alert(angular.toJson(cmd));
        cordova.plugins.SocketPlugin.tcpSendCmd({
          "timeout": "5000",
          "value": cmd
        }, success, error);
        function success(response) {
          hmsPopup.showShortCenterToast(des+" "+"success");
        };
        function error() {
          hmsPopup.showShortCenterToast(des+" "+"error");
        }
      };
      //处理选择怎加border
      var handlenapeListNapeLen = $scope.handlenapeListNape.length;
      $scope.selectNapes = function (index) {
        // myworker.postMessage(60);
        $scope.handlenapeSelectedIndex = index;
        if($scope.handlenapeListNape[index].matchdataid === "setting"){
          $state.go("cenwatpurSetting");
        }else {
          $scope.cenwatpurifierCtrl.isShwoClearStatus = !$scope.cenwatpurifierCtrl.isShwoClearStatus;
          // $timeout(function () {
            $scope.handlenapeListNape[index].selecFlag = !$scope.handlenapeListNape[index].selecFlag;
            for(var i=0;i<handlenapeListNapeLen;i++){
              if(i !== index){
                $scope.handlenapeListNape[i].selecFlag = false;
              };
            };
            if($scope.handlenapeListNape[index].selecFlag === true){
              $scope.handlenapeListNape[index].imgUrl = $scope.handlenapeListNape[index].imgSeledUrl;
              for(var i=0;i<handlenapeListNapeLen;i++){
                if(i !== index){
                  $scope.handlenapeListNape[i].imgUrl = $scope.handlenapeListNape[i].imgUrlTemp;
                }
              };
            }else{
              $scope.handlenapeListNape[index].imgUrl = $scope.handlenapeListNape[index].imgUrlTemp;
            };
            // if(!$scope.handlenapeListNape[index].isManyDirective){
            //   $timeout(function () {
            //     $scope.handlenapeListNape[index].selecFlag = false;
            //     $scope.handlenapeListNape[index].imgUrl = $scope.handlenapeListNape[index].imgUrlTemp;
            //     $scope.$apply()
            //     $scope.handlenapeSelectedIndex = undefined;
            //   },2000)
            // };
          // },500);
        };
      };
    }]);
