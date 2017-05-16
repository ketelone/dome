angular.module('toiletControlModule')
  .controller('cenwatpurifierCtrl', [
    '$scope',
    '$state',
    '$translate',
    '$ionicSlideBoxDelegate',
    '$timeout',
    'cmdService',
    'publicMethod',
    'hmsPopup',
    'hmsHttp',
    '$ionicModal',
    '$compile',
    'baseConfig',
    'checkVersionService',
    function ($scope,
              $state,
              $translate,
              $ionicSlideBoxDelegate,
              $timeout,
              cmdService,
              publicMethod,
              hmsPopup,
              hmsHttp,
              $ionicModal,
              $compile,
              baseConfig,
              checkVersionService
    ) {
      $scope.goBack = function () {
        document.removeEventListener("SocketPlugin.receiveTcpData", centreceiveTcpDatahandle, false);
        publicMethod.goBack();
      };
      var cenwapurcmdObj = {
        boxid:localStorage.boxIp,
        diviceid:'B62EF53F',
        header:'8877',
        idx:1,
        ctrId:'E3',
        devId:'06'
      };
      // alert(angular.toJson(cenwapurcmdObj))
      //init zhiling obj
      var cenwatpurDir = new RoController();
      // /*
      //  Central water purifier shu ju
      //  */
      // $scope.cenwatpurifierCtrl = {
      //   //status
      //   connectStatus:"",
      //   //clear
      //   clearComplete:"cenwatpurifier.complete",
      //   clearStatus:"cenwatpurifier.surplus",
      //   clearData:"",
      //   isShwoClearStatus:true
      // }
      // /*
      //  moren-json
      //  init默认
      //  **/
      // $scope.slideInitData =[{
      //   des: "init",
      //   parNodeid: 'toilet-initCtl',
      //   canves01: "initcanves01",
      //   canves03: "initcanves03",
      // }]
      // /**
      //  gong neng list-json
      //  功能列表数据
      //  **/
      // $scope.handlenapeListNape = [{
      //   imgUrl: "build/img/cenwatpurifier-controller/icon_handleclear.png",
      //   imgSeledUrl: "build/img/cenwatpurifier-controller/icon_handlecleared.png",
      //   imgUrlTemp:"build/img/cenwatpurifier-controller/icon_handleclear.png",
      //   handleDes: "cenwatpurifier.autoclear",
      //   matchdataid:"clear",
      //   selecFlag:false,
      //   cloudId:"cenwapurclear"
      // },{
      //   imgUrl: "build/img/cenwatpurifier-controller/icon_setting.png",
      //   imgSeledUrl: "build/img/cenwatpurifier-controller/icon_settinged.png",
      //   imgUrlTemp:"build/img/cenwatpurifier-controller/icon_setting.png",
      //   matchdataid:"device",
      //   cloudId:"device",
      //   handleDes: "cenwatpurifier.devicestats",
      //   selecFlag:false,
      // },{
      //   imgUrl: "build/img/cenwatpurifier-controller/icon_setting.png",
      //   imgSeledUrl: "build/img/cenwatpurifier-controller/icon_settinged.png",
      //   imgUrlTemp:"build/img/cenwatpurifier-controller/icon_setting.png",
      //   handleDes: "cenwatpurifier.setting",
      //   matchdataid:"setting",
      //   selecFlag:false,
      // }];
      // /**
      //  *
      //  set dang qian ce hau shu ju zhi
      //  */
      // $scope.currentSlideData = $scope.slideInitData;
      /**
       init dang qian mo ban shu ju
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
          "<p ng-if='!cenwatpurifierCtrl.isShwoClearStatus' class='toilet-parameterctl-raddata' style='font-size: 0.4rem;' translate={{cenwatpurifierCtrl.clearData}}></p>"+
          "<span ng-if='!cenwatpurifierCtrl.isShwoClearStatus' class='toilet-parameterctl-des' translate='cenwatpurifier.autoclear'></span>"+
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
      /**
       *@params:
       *@disc:accept ack or status;
       */
      $scope.$on("$ionicView.beforeEnter",function () {
        /*
         Central water purifier shu ju
         */
        $scope.cenwatpurifierCtrl = {
          //status
          connectStatus:"",
          //clear
          clearComplete:"cenwatpurifier.complete",
          clearStatus:"cenwatpurifier.surplus",
          clearData:"",
          isShwoClearStatus:true
        }
        /*
         moren-json
         init默认
         **/
        $scope.slideInitData =[{
          des: "init",
          parNodeid: 'toilet-initCtl',
          canves01: "initcanves01",
          canves03: "initcanves03",
        }]
        /**
         gong neng list-json
         功能列表数据
         **/
        $scope.handlenapeListNape = [{
          imgUrl: "build/img/cenwatpurifier-controller/icon_handleclear.png",
          imgSeledUrl: "build/img/cenwatpurifier-controller/icon_handlecleared.png",
          imgUrlTemp:"build/img/cenwatpurifier-controller/icon_handleclear.png",
          handleDes: "cenwatpurifier.autoclear",
          matchdataid:"clear",
          selecFlag:false,
          cloudId:"cenwapurclear"
        },{
          imgUrl: "build/img/cenwatpurifier-controller/icon_setting.png",
          imgSeledUrl: "build/img/cenwatpurifier-controller/icon_settinged.png",
          imgUrlTemp:"build/img/cenwatpurifier-controller/icon_setting.png",
          matchdataid:"device",
          cloudId:"device",
          handleDes: "cenwatpurifier.devicestats",
          selecFlag:false,
        },{
          imgUrl: "build/img/cenwatpurifier-controller/icon_setting.png",
          imgSeledUrl: "build/img/cenwatpurifier-controller/icon_settinged.png",
          imgUrlTemp:"build/img/cenwatpurifier-controller/icon_setting.png",
          handleDes: "cenwatpurifier.setting",
          matchdataid:"setting",
          selecFlag:false,
        }];
        /**
         *
         set dang qian ce hau shu ju zhi
         */
        $scope.currentSlideData = $scope.slideInitData;
        $scope.initStatusFlag = true;
        //handle once
        $scope.directiveOnceFlag = 0;
        $scope.clearOnceFlag = 0;
        $scope.statustiveOnceFlag = false;
        //error over time
        $scope.overTiemFlag = true;

        $scope.handlenapeSelectedIndex = 1;
        $scope.selectChangeFlag = false;
        var handlenapeListNapeLen = $scope.handlenapeListNape.length;

        //get devic status
        var cmdvalue = getCmd(cenwapurcmdObj.header,cenwapurcmdObj.idx,cenwatpurDir._data["requestAllStatus"],cenwapurcmdObj.ctrId,cenwapurcmdObj.devId);
        //send instructin
        console.log(cmdvalue)
        if(baseConfig.isCloudCtrl){
          $scope.cpGetImpleteData(false,cmdvalue,$translate.instant('toiletController.devicePop'),1);
        }else{
          hmsPopup.showLoading("<span translate='golabelvariable.loadingdata'></span>");
          cmdService.sendCmd(cenwapurcmdObj.diviceid, cmdvalue, cenwapurcmdObj.boxid);
        };
      })
      var centreceiveTcpDatahandle = function (result) {
          var resultOn = result[0];
          if(resultOn.from.uid === cenwapurcmdObj.diviceid){
            if (resultOn.data.cmd) {
              var backDataCmd = cenwatpurDir.analysisInstruction(resultOn.data.cmd[0]);
              // alert(angular.toJson(backDataCmd))
              if(backDataCmd.flag === "ack"){
                if($scope.directiveOnceFlag === 0){
                  $scope.directiveOnceFlag++;
                  if(backDataCmd.cmd === "25"){
                    var name = "cenwatpurifier.autoclear";
                    if(backDataCmd.ack === "1000"){
                      // $scope.selectChange($scope.selectChangeFlag,$scope.handlenapeSelectedIndex);
                      if($scope.handlenapeListNape[0].selecFlag){
                        $scope.Toast.show($translate.instant("cenwatpurifier.clearover"));
                      };
                      $scope.Toast.show($translate.instant(name)+$translate.instant("golabelvariable.directesuccess"));
                    }else{
                      $scope.Toast.show($translate.instant(name)+$translate.instant("golabelvariable.directerror"));
                    };
                  };
                }
              }else{
                  // if(!$scope.overTiemFlag){
                    hmsPopup.hideLoading();
                  // };
                  // alert("backDataCmd"+angular.toJson(backDataCmd));
                  //status
                  if(backDataCmd.cmd === "a5"){
                    // if($scope.clearOnceFlag === 0) {
                    //   $scope.clearOnceFlag++;
                    $scope.overTiemFlag = false;
                    //get device status lv xin
                    if(backDataCmd.FiltrationRemain>100){
                      backDataCmd.FiltrationRemain = 0+"%";
                    }else{
                      backDataCmd.FiltrationRemain = backDataCmd.FiltrationRemain+"%";
                    };
                    $scope.cenwatpurifierCtrl.connectStatus = backDataCmd.FiltrationRemain;
                    if($scope.handlenapeListNape[0].selecFlag){
                      //clear show
                      $scope.cenwatpurifierCtrl.isShwoClearStatus = false;
                    }else{
                      $scope.cenwatpurifierCtrl.isShwoClearStatus = true;
                    };
                    // };
                    //clear
                  }else if(backDataCmd.cmd === "88"){
                    // if($scope.statustiveOnceFlag === 0) {
                    //   $scope.statustiveOnceFlag++;
                    $scope.overTiemFlag = false;
                    if(backDataCmd.flushStatus === "0001"){
                      //complete
                      $scope.cenwatpurifierCtrl.isShwoClearStatus = false;
                      $scope.handlenapeListNape[0].selecFlag = false;

                      $scope.handlenapeListNape[0].imgUrl = $scope.handlenapeListNape[0].imgUrlTemp;
                      $scope.cenwatpurifierCtrl.clearData = $scope.cenwatpurifierCtrl.clearComplete;
                      // if($scope.statustiveOnceFlag) {
                      //   $scope.Toast.show($translate.instant("cenwatpurifier.clearover"));
                      // }
                      $scope.statustiveOnceFlag = true;
                    }else if(backDataCmd.flushStatus === "0010"){
                      //doing
                      // $scope.selectChange(true,0);
                      $scope.handlenapeListNape[0].selecFlag = true;
                      $scope.handlenapeListNape[0].imgUrl = $scope.handlenapeListNape[0].imgSeledUrl;
                      $scope.cenwatpurifierCtrl.isShwoClearStatus = false;
                      $scope.cenwatpurifierCtrl.clearData = $scope.cenwatpurifierCtrl.clearStatus;
                    };
                    // };
                  };
                  if($scope.handlenapeListNape[0].selecFlag){
                    $scope.cenwatpurifierCtrl.isShwoClearStatus = false;
                  }else{
                    $scope.cenwatpurifierCtrl.isShwoClearStatus = true;
                  }
                }
              };
              $scope.$apply();
            // };
          };
        }
      document.addEventListener('SocketPlugin.receiveTcpData',centreceiveTcpDatahandle, false);
      $timeout(function(){
        if($scope.overTiemFlag){
          hmsPopup.hideLoading();
          $scope.Toast.show($translate.instant("golabelvariable.loadingdataerrror"));
        };
      },10000)
      /**
       *@params:index(selected index),deviceId(device id),cmdvalue(directive value),name(directive name)
       *@disc:impletemnet get data
       */
      $scope.cpGetImpleteData = function(flag,cmdvalue,index) {
        $timeout(function () {
          $scope.selectChange(flag,index);
        },1000)
      };
      /**
       *@params:index(selected index)
       *@disc:handle status change
       */
      $scope.selectChange = function (flag,index) {
        if(flag){
          $scope.cenwatpurifierCtrl.isShwoClearStatus = !$scope.cenwatpurifierCtrl.isShwoClearStatus;
          // $timeout(function () {
          $scope.handlenapeListNape[index].selecFlag = !$scope.handlenapeListNape[index].selecFlag;
          if($scope.handlenapeListNape[index].selecFlag === true){
            $scope.handlenapeListNape[index].imgUrl = $scope.handlenapeListNape[index].imgSeledUrl;
          }else{
            $scope.handlenapeListNape[index].imgUrl = $scope.handlenapeListNape[index].imgUrlTemp;
          };
        };
      };
      // $scope.handlenapeSelectedIndex = 1;
      // $scope.selectChangeFlag = false;
      // //get devic status
      // var cmdvalue = getCmd(cenwapurcmdObj.header,cenwapurcmdObj.idx,cenwatpurDir._data["requestAllStatus"],cenwapurcmdObj.ctrId,cenwapurcmdObj.devId);
      // //send instructin
      // console.log(cmdvalue)
      // if(baseConfig.isCloudCtrl){
      //   $scope.cpGetImpleteData(false,cmdvalue,$translate.instant('toiletController.devicePop'),1);
      // }else{
      //   hmsPopup.showLoading("<span translate='golabelvariable.loadingdata'></span>");
      //   cmdService.sendCmd(cenwapurcmdObj.diviceid, cmdvalue, cenwapurcmdObj.boxid);
      // };
      //处理选择怎加border
      // var handlenapeListNapeLen = $scope.handlenapeListNape.length;
      $scope.selectNapes = function (index) {
        $scope.directiveOnceFlag = 0;
        if(!$scope.overTiemFlag){
          $scope.handlenapeSelectedIndex = index;
          if($scope.handlenapeListNape[index].matchdataid === "setting"){
            $state.go("cenwatpurSetting");
          }else {
            hmsPopup.showLoading("");
            $timeout(function () {
              hmsPopup.hideLoading();
            },500);
            if(!$scope.handlenapeListNape[index].selecFlag){
              $scope.selectChangeFlag = true;
              var cmdvalue = getCmd(cenwapurcmdObj.header,cenwapurcmdObj.idx,cenwatpurDir._data.startOutlet,cenwapurcmdObj.ctrId,cenwapurcmdObj.devId);
              if(baseConfig.isCloudCtrl){
                $scope.cpGetImpleteData(true,cmdvalue,name,index);
              }else{
                //divice sen cmd
                cmdService.sendCmd(cenwapurcmdObj.diviceid, cmdvalue, cenwapurcmdObj.boxid);
              };
            }else{
              $scope.selectChangeFlag = true;
              var cmdvalue = getCmd(cenwapurcmdObj.header,cenwapurcmdObj.idx,cenwatpurDir._data.stopOutlet,cenwapurcmdObj.ctrId,cenwapurcmdObj.devId);
              if(baseConfig.isCloudCtrl){
                //cloud send cmd
                $scope.cpGetImpleteData(true,cmdvalue,name,index);
              }else{
                //divice sen cmd
                cmdService.sendCmd(cenwapurcmdObj.diviceid, cmdvalue, cenwapurcmdObj.boxid);
              };
            };
          };
        }else{
          $scope.Toast.show($translate.instant("golabelvariable.loadingdataerrror"))
        }
      };
    }]);
