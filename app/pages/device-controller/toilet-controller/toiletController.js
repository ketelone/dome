angular.module('toiletControlModule')
  .controller('toiletControllerCtrl', [
    '$scope',
    '$state',
    '$translate',
    '$ionicSlideBoxDelegate',
    '$timeout',
    'hmsHttp',
    'publicMethod',
    'hmsPopup',
    '$ionicModal',
    '$compile',
    'cmdService',
    'baseConfig',
    'checkVersionService',
    '$ionicPopover',
    function ($scope,
              $state,
              $translate,
              $ionicSlideBoxDelegate,
              $timeout,
              hmsHttp,
              publicMethod,
              hmsPopup,
              $ionicModal,
              $compile,
              cmdService,
              baseConfig,
              checkVersionService,
              $ionicPopover
    ) {
      $scope.screenHeig = window.innerHeight;
      $scope.screenWidth = window.innerWidth;
      $scope.fontSize = document.documentElement.clientWidth / 7.5;
      $scope.goBack = function () {
        document.removeEventListener("SocketPlugin.receiveTcpData", receiveTcpDatahandle, false);
        publicMethod.goBack();
      };
      var tolitercmdObj = {
        boxid:localStorage.boxIp,
        diviceid:'8BE850C2',
        header:'8877',
        idx:1,
        ctrId:'E3',
        devId:'01'
      };
      var nimi = new NIMI();
      // alert("obj"+angular.toJson(tolitercmdObj))
      /*
       tongyishujuji
       */
      $scope.toiletController = {
        modelTypeNv:"toiletController.zhengchang",
        modelTypeClear:"toiletController.gaunbi",
        modelType:"toiletController.zhengchang",
        selectMode:"toiletController.handleSelecMode",
        handleSelecDes:"toiletController.handleSelecMode",
        qingjie:"toiletController.qingjie",
        useing:"toiletController.deviceUseInfo",
        nouse:"toiletController.devicenouse",
        deviceUseInfo:"",
        deviceinfoflag:false
      };
      // $scope.value = [];
      // //选择模式和清洁方式
      // $scope.ModelvalueNvYTunX = [{
      //   id:0,
      //   des:'toiletController.maichong'
      // },{
      //   id:1,
      //   des:'toiletController.bodong'
      // },{
      //   id:2,
      //   des:'toiletController.yidong'
      // },{
      //   id:3,
      //   des:'toiletController.zhengchang'
      // }];
      // //选择模式和清洁方式
      // $scope.Clearvalue = [{
      //   id:"clearopen",des:'toiletController.clearopen',
      // },{
      //   id:"clearextend",des:'toiletController.clearextend',
      // },{
      //   id:"clearinstance",des:'toiletController.clearinstance',
      // }];
      // // tolite favoite localstarge
      // // window.localStorage.toilteFaviteSetting = JSON.stringify(a);
      //
      // $scope.toilteFaviteSetting = JSON.parse(window.localStorage.toilteFaviteSetting);
      // /**
      //  moren-json
      //  init默认
      //  **/
      // $scope.slideInitData =[{
      //   des: "init",
      //   gearNum: 1,
      //   gearInit: 1,
      //   gearInitTemp: 1,
      //   parameterctlFlag: true,
      //   parNodeid: 'toilet-initCtl',
      //   canves01: "initcanves01",
      //   canves02: "initcanves02",
      //   canves03: "initcanves03",
      // }]
      // /*
      //  nuanjiao-json
      //  暖脚
      //  */
      // $scope.slideNuanjioaData =[{
      //   id:"nuanjiao",
      //   des: "toiletController.njfl",
      //   gearNum: 9,
      //   gearInit: 1,
      //   gearInitTemp: 1,
      //   parameterctlFlag: false,
      //   parNodeid: 'toilet-NuanjioaFlCtl',
      //   canves01: "NuanjioaFlcanves01",
      //   canves02: "NuanjioaFlcanves02",
      //   canves03: "NuanjioaFlcanves03",
      // }]
      // /*
      //  nvyong-json
      //  女用
      //  */
      // $scope.slideNvYongData =[{
      //   id:"nvyong",
      //   des: "toiletController.nvsy",
      //   gearNum: 4,
      //   gearInit: $scope.toilteFaviteSetting.FRONT_SPRAY_PRESSURE,
      //   gearInitTemp: $scope.toilteFaviteSetting.FRONT_SPRAY_PRESSURE,
      //   parameterctlFlag: false,
      //   parNodeid: 'toilet-NvYongSyCtl',
      //   canves01: "NvYongSycanves01",
      //   canves02: "NvYongSycanves02",
      //   canves03: "NvYongSycanves03",
      // },{
      //   id:"nvyong",
      //   des:"toiletController.nvpos",
      //   gearNum:4,
      //   gearInit:$scope.toilteFaviteSetting.FRONT_SPRAY_POSITION,
      //   gearInitTemp:$scope.toilteFaviteSetting.FRONT_SPRAY_POSITION,
      //   parameterctlFlag:false,
      //   parNodeid:'toilet-NvYongPosCtl',
      //   canves01:"NvYongSyPoscanves01",
      //   canves02:"NvYongSyPoscanves02",
      //   canves03:"NvYongSyPoscanves03",
      // },{
      //   id:"nvyong",
      //   des:"toiletController.nvtemper",
      //   gearNum:5,
      //   gearInit:$scope.toilteFaviteSetting.FRONT_SPRAY_TMPT,
      //   gearInitTemp:$scope.toilteFaviteSetting.FRONT_SPRAY_TMPT,
      //   parameterctlFlag:false,
      //   parNodeid:'toilet-NvYongTemCtl',
      //   canves01:"NvYongTemcanves01",
      //   canves02:"NvYongTemcanves02",
      //   canves03:"NvYongTemcanves03",
      // }];
      // /*
      //  tunxi-json
      //  臀洗
      //  */
      // $scope.slideTunBuData =[{
      //   id:"tunxi",
      //   des: "toiletController.txsy",
      //   gearNum: 4,
      //   gearInit: $scope.toilteFaviteSetting.REAR_PRESSURE,
      //   gearInitTemp: $scope.toilteFaviteSetting.REAR_PRESSURE,
      //   parameterctlFlag: false,
      //   parNodeid: 'toilet-TunBuSyCtl',
      //   canves01: "TunBuSycanves01",
      //   canves02: "TunBuSycanves02",
      //   canves03: "TunBuSycanves03",
      // },
      //   {
      //     id:"tunxi",
      //     des:"toiletController.txpos",
      //     gearNum:4,
      //     gearInit:$scope.toilteFaviteSetting.REAR_POSITION,
      //     gearInitTemp:$scope.toilteFaviteSetting.REAR_POSITION,
      //     parameterctlFlag:false,
      //     parNodeid:'toilet-TunBuPosCtl',
      //     canves01:"TunBuPosPoscanves01",
      //     canves02:"TunBuPosPoscanves02",
      //     canves03:"TunBuPosPoscanves03",
      //   },{
      //     id:"tunxi",
      //     des:"toiletController.txtemper",
      //     gearNum:5,
      //     gearInit:$scope.toilteFaviteSetting.REAR_TMPT,
      //     gearInitTemp:$scope.toilteFaviteSetting.REAR_TMPT,
      //     parameterctlFlag:false,
      //     parNodeid:'toilet-TunBuTemCtl',
      //     canves01:"TunBuTemTemcanves01",
      //     canves02:"TunBuTemTemcanves02",
      //     canves03:"TunBuTemTemcanves03",
      //   }];
      // /*
      //  light-json
      //  灯光
      //  */
      // $scope.slidelightData = [{
      //   id:"dengguang",
      //   des: "toiletController.aroundlight",
      //   gearNum: 2,
      //   gearInit: $scope.toilteFaviteSetting.LIGHT_AMBIENT_BRIGHTNESS,
      //   gearInitTemp: $scope.toilteFaviteSetting.LIGHT_AMBIENT_BRIGHTNESS,
      //   parameterctlFlag: false,
      //   parNodeid: 'toilet-lightCtl',
      //   canves01: "lightcanves01",
      //   canves02: "lightcanves02",
      //   canves03: "lightcanves03",
      // },{
      //     id:"dengguang",
      //     des: "toiletController.toiltelight",
      //     gearNum: 8,
      //     gearInit: $scope.toilteFaviteSetting.LIGHT_BOWL_BRIGHTNESS,
      //     gearInitTemp: $scope.toilteFaviteSetting.LIGHT_BOWL_BRIGHTNESS,
      //     parameterctlFlag: false,
      //     parNodeid: 'toilet-contioCtl',
      //     canves01: "contiocanves01",
      //     canves02: "contiocanves02",
      //     canves03: "contiocanves03",
      //   }]
      // /*
      //  nuanfeng-json
      //  暖风
      //  */
      // $scope.slidedryerData =[{
      //   id:"nuanfen",
      //   des: "toiletController.nffl",
      //   gearNum: 4,
      //   gearInit: $scope.toilteFaviteSetting.DRYER_TMPT,
      //   gearInitTemp: $scope.toilteFaviteSetting.DRYER_TMPT,
      //   parameterctlFlag: false,
      //   parNodeid: 'toilet-dryerFlCtl',
      //   canves01: "dryerFlcanves01",
      //   canves02: "dryerFlcanves02",
      //   canves03: "dryerFlcanves03",
      // },{
      //   id:"nuanfen",
      //   des: "toiletController.nffw",
      //   gearNum: 5,
      //   gearInit: $scope.toilteFaviteSetting.DRYER_PRESSURE,
      //   gearInitTemp: $scope.toilteFaviteSetting.DRYER_PRESSURE,
      //   parameterctlFlag: false,
      //   parNodeid: 'toilet-dryerFwCtl',
      //   canves01: "dryerFwcanves01",
      //   canves02: "dryerFwcanves02",
      //   canves03: "dryerFwcanves03",
      // }]
      // /*
      //  nuanjiao-json
      //  暖角
      //  */
      // $scope.slidewarmjData =[{
      //   id:"nuanjiao",
      //   des: "toiletController.njfl",
      //   gearNum: 9,
      //   gearInit: $scope.toilteFaviteSetting.DRYER_POWER,
      //   gearInitTemp: $scope.toilteFaviteSetting.DRYER_POWER,
      //   parameterctlFlag: false,
      //   parNodeid: 'toilet-warmjCtl',
      //   canves01: "warmjcanves01",
      //   canves02: "warmjcanves02",
      //   canves03: "warmjcanves03",
      // }];
      // /*
      //  quanwen-json
      //  圈温
      //  */
      // $scope.slidequanwenData =[{
      //   id:"quanwen",
      //   des: "toiletController.qwfw",
      //   gearNum: 5,
      //   gearInit: $scope.toilteFaviteSetting.SEAT_TMPT,
      //   gearInitTemp: $scope.toilteFaviteSetting.SEAT_TMPT,
      //   parameterctlFlag: false,
      //   parNodeid: 'toilet-quanwenCtl',
      //   canves01: "quanwencanves01",
      //   canves02: "quanwencanves02",
      //   canves03: "quanwencanves03",
      // }]
      // /**
      //  gongnenglist-json
      //  功能列表数据
      //  **/
      // $scope.handlenapeListNape = [
      //   {
      //     imgUrl: "build/img/toilet-controller/dachong.png",
      //     imgSeledUrl: "build/img/toilet-controller/dachongseled.png",
      //     imgUrlTemp:"build/img/toilet-controller/dachong.png",
      //     handleDes: "toiletController.dachong01",
      //     selecFlag:false,
      //     matchdataid:"bigFlush",
      //     isManyDirective:false,
      //     dataname:"bigFlush",
      //     handledata:$scope.slideInitData,
      //     cloudId:"NIMIbigFlush",
      //   },
      //   {
      //     imgUrl: "build/img/toilet-controller/xiaochong.png",
      //     imgSeledUrl: "build/img/toilet-controller/xiaochongseled.png",
      //     imgUrlTemp:"build/img/toilet-controller/xiaochong.png",
      //     handleDes: "toiletController.xioachong",
      //     selecFlag:false,
      //     matchdataid:"smallFlush",
      //     dataname:"smallFlush",
      //     isManyDirective:false,
      //     handledata:$scope.slideInitData,
      //   },
      //   {
      //     imgUrl: "build/img/toilet-controller/nvyong.png",
      //     imgSeledUrl: "build/img/toilet-controller/nvyongseled.png",
      //     imgUrlTemp:"build/img/toilet-controller/nvyong.png",
      //     handleDes: "toiletController.nvyong",
      //     selecFlag:false,
      //     matchdataid:"nvyong",
      //     isManyDirective:true,
      //     handledata:$scope.slideNvYongData,
      //     cloudId:"NIMInvyong ",
      //   },
      //   {
      //     imgUrl: "build/img/toilet-controller/tunxi.png",
      //     imgSeledUrl: "build/img/toilet-controller/tunxiseled.png",
      //     imgUrlTemp:"build/img/toilet-controller/tunxi.png",
      //     handleDes: "toiletController.tunxi",
      //     selecFlag:false,
      //     matchdataid:"tunxi",
      //     isManyDirective:true,
      //     handledata:$scope.slideTunBuData
      //   },
      //   {
      //     imgUrl: "build/img/toilet-controller/quanwen.png",
      //     imgSeledUrl: "build/img/toilet-controller/quanwenseled.png",
      //     imgUrlTemp:"build/img/toilet-controller/quanwen.png",
      //     handleDes: "toiletController.quanwen",
      //     isManyDirective:true,
      //     selecFlag:false,
      //     matchdataid:"quanwen",
      //     handledata:$scope.slidequanwenData
      //   },
      //   {
      //     imgUrl: "build/img/toilet-controller/nuanfeng.png",
      //     imgSeledUrl: "build/img/toilet-controller/nuanfengseled.png",
      //     imgUrlTemp:"build/img/toilet-controller/nuanfeng.png",
      //     handleDes: "toiletController.nuanfeng",
      //     isManyDirective:true,
      //     selecFlag:false,
      //     matchdataid:"nuanfen",
      //     handledata:$scope.slidedryerData
      //   },
      //   {
      //     imgUrl: "build/img/toilet-controller/dengguan.png",
      //     imgSeledUrl: "build/img/toilet-controller/dengguanseled.png",
      //     imgUrlTemp:"build/img/toilet-controller/dengguan.png",
      //     handleDes: "toiletController.dengguang",
      //     isManyDirective:true,
      //     selecFlag:false,
      //     matchdataid:"dengguang",
      //     handledata:$scope.slidelightData
      //   },
      //   {
      //     imgUrl: "build/img/toilet-controller/nuanjiao.png",
      //     imgSeledUrl: "build/img/toilet-controller/nuanjiaoseled.png",
      //     imgUrlTemp:"build/img/toilet-controller/nuanjiao.png",
      //     handleDes: "toiletController.nuanjiao",
      //     selecFlag:false,
      //     matchdataid:"nuanjiao",
      //     isManyDirective:true,
      //     handledata:$scope.slidewarmjData
      //   },
      //   {
      //     imgUrl: "build/img/toilet-controller/kaigai.png",
      //     imgSeledUrl: "build/img/toilet-controller/kaigaiseled.png",
      //     imgUrlTemp:"build/img/toilet-controller/kaigai.png",
      //     handleDes: "toiletController.guangai",
      //     isManyDirective:false,
      //     selecFlag:false,
      //     matchdataid:"guangai",
      //     handledata:$scope.slideInitData,
      //     dataname:"closeLid",
      //   },{
      //     imgUrl: "build/img/toilet-controller/fangai.png",
      //     imgSeledUrl: "build/img/toilet-controller/fangaiseled.png",
      //     imgUrlTemp:"build/img/toilet-controller/fangai.png",
      //     handleDes: "toiletController.fangai",
      //     isManyDirective:false,
      //     selecFlag:false,
      //     matchdataid:"fangai",
      //     handledata:$scope.slideInitData,
      //     dataname:"openLid",
      //   },{
      //     imgUrl: "build/img/toilet-controller/fanquan.png",
      //     imgSeledUrl: "build/img/toilet-controller/fanquanseled.png",
      //     imgUrlTemp:"build/img/toilet-controller/fanquan.png",
      //     handleDes: "toiletController.fanquan",
      //     isManyDirective:false,
      //     selecFlag:false,
      //     matchdataid:"fanquan",
      //     handledata:$scope.slideInitData,
      //     dataname:"openRing",
      //   },{
      //     imgUrl: "build/img/toilet-controller/qingjie.png",
      //     imgSeledUrl: "build/img/toilet-controller/qingjieseled.png",
      //     imgUrlTemp:"build/img/toilet-controller/qingjie.png",
      //     handleDes: "toiletController.qingjie",
      //     matchdataid:"clear",
      //     isManyDirective:false,
      //     selecFlag:false,
      //     handledata:$scope.slideInitData,
      //   },{
      //     imgUrl: "build/img/toilet-controller/qingjie.png",
      //     imgSeledUrl: "build/img/toilet-controller/qingjieseled.png",
      //     imgUrlTemp:"build/img/toilet-controller/qingjie.png",
      //     handleDes: "toiletController.devicePop",
      //     matchdataid:"devicePop",
      //     isManyDirective:false,
      //     selecFlag:false,
      //     handledata:$scope.slideInitData,
      //   },{
      //     imgUrl: "build/img/toilet-controller/shezhi.png",
      //     imgSeledUrl: "build/img/toilet-controller/shezhiseled.png",
      //     imgUrlTemp:"build/img/toilet-controller/shezhi.png",
      //     handleDes: "toiletController.shezhi",
      //     matchdataid:"setting",
      //     selecFlag:false
      //   },
      // ];
      /**
       *
       set dang qian ce hau shu ju zhi
       */
      // $scope.currentSlideData = $scope.slideInitData;
      // $scope.currentSlideData = [];
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
        if($('#ionSliderBox').children().length !== 0){
          $('#ionSliderBox').empty();
        };

        var checHtml =
          "<ion-slide-box ng-init='lockSlide()' show-pager='true' delegate-handle='boxSlider'>"+
          "<ion-slide ng-repeat='list in currentSlideData track by $index'>"+
          "<div id={{list.parNodeid}} class='toilet-parameterctl'>"+
          "<canvas id={{list.canves01}} class='canves-pos'></canvas>"+
          "<canvas id={{list.canves02}} class='canves-pos'></canvas>"+
          "<canvas id={{list.canves03}} class='canves-pos'></canvas>"+
          "<canvas id={{list.canves04}} class=''canves-pos'></canvas>"+
          "<div class='toilet-parameterctl-data' ng-if='!list.parameterctlFlag'>"+
          "<span class='toilet-parameterctl-raddata' ng-bind='list.gearInit'></span>"+
          "<span class='toilet-parameterctl-des' translate={{list.des}}></span>"+
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
        // console.log($checkhtml)
        $('#ionSliderBox').append($checkhtml[0])
      };
      // $scope.initHtmlTemplate($scope.currentSlideData);
      var onceFlag=true;
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
        this.deliverCircle = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2-0.1*this.rateInit,color:"#2F3538"};//档位圆
        this.HideCircle = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2-0.5*this.rateInit,color:"black"};//档位圆
        this.deliverLine = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2-0.1*this.rateInit,color:"black"};//档位线
        this.rollCircle = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2-0.3*this.rateInit,color:"white"};//小球圆
        this.FillCircle = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2-0.1*this.rateInit,color:"#6ACBB3"};//填充圆
        //变量
        this.i=0;this.j=0;
        this.stoPosPoint=0;
        this.starRad=135;
        this.radSectionArr=[];
        this.radRange;
        //画档位圆
        this.drawDeliverCircle = function (n) {
          this.radRange = (270-(n-1))/n;
          this.radSectionArr.push(this.starRad);
          var tempstrAngle = this.starRad;
          for(var k=1;k<=n;k++){
            drawRadian(this.cr1,this.deliverCircle,tempstrAngle,tempstrAngle+this.radRange);
            tempstrAngle = tempstrAngle+this.radRange+1;
            this.radSectionArr.push(tempstrAngle);
          };
          // 画白色遮挡
          drawRadian(this.cr1,this.HideCircle,0,360);
        };
        // 画填充圆
        this.drawCircleFill = function (canvesobj,changeRad) {
          canvesobj.clearRect(0,0,this.canvsscreenHeight,this.canvsscreenWidth);
          drawRadian(canvesobj,this.FillCircle,this.starRad,changeRad);
          //在滑动的时候判断是否经过档位点并重新画档位线
          if(changeRad<0){
            var changeRadTemp = Math.abs(changeRad+360);
          }else{
            if(changeRad>=0 && changeRad<=45){
              var changeRadTemp = Math.abs(changeRad+360);
            }else{
              var changeRadTemp = Math.abs(changeRad);
            };
          };
          this.radSectionArr.push(changeRadTemp);
          this.radSectionArr = this.radSectionArr.sort(function(a,b){
            return a-b});
          //判断是否滑动过档位点,若有滑过,则画遮挡弧度
          var radSectionArrLen = this.radSectionArr.length;
          //判断当前点距离那个档位距离最近
          this.i=0;this.i=1;
          for(this.i;this.i<radSectionArrLen;this.i++){
            if(changeRadTemp === this.radSectionArr[this.i]){
              if(Math.abs(this.radSectionArr[this.i]-this.radSectionArr[this.i-1]) < Math.abs(this.radSectionArr[this.i]-this.radSectionArr[this.i+1])){
                this.stoPosPoint = this.i-1;
                if(this.i<=1){
                  // if(slideDataObj.parNodeid === "toilet-warmjCtl"){
                  //   slideDataObj.gearInit = 2;
                  // }else
                    if(slideDataObj.parNodeid === "toilet-lightCtl"){
                    if(this.i === 1){
                      slideDataObj.gearInit = "低";
                    };
                  }else{
                    slideDataObj.gearInit = 1;
                  }
                }else{
                  // if(slideDataObj.parNodeid === "toilet-warmjCtl"){
                  //   slideDataObj.gearInit = this.i+1;
                  // }else
                    if(slideDataObj.parNodeid === "toilet-lightCtl"){
                    if(this.i === 2){
                      slideDataObj.gearInit = '中';
                    }else if(this.i === 3){
                      slideDataObj.gearInit = "高";
                    }
                  }else{
                    slideDataObj.gearInit = this.i;
                  };
                };
                if(onceFlag){
                  $scope.$apply();
                };
                //画档位线
                this.j=1;
                for(this.j;this.j<this.i;this.j++){
                  drawRadian(this.cr3,this.deliverLine,this.radSectionArr[this.i-this.j-1]-1,this.radSectionArr[this.i-this.j-1]);
                };
              }else{
                this.stoPosPoint = this.i;
                // if(slideDataObj.parNodeid === "toilet-warmjCtl"){
                //   slideDataObj.gearInit = this.i+2;
                // }else
                  if(slideDataObj.parNodeid === "toilet-lightCtl"){
                  if(this.i+1 === 2){
                    slideDataObj.gearInit = "中";
                  }else if(this.i+1 === 3){
                    slideDataObj.gearInit = "高";
                  }
                }else{
                  slideDataObj.gearInit = this.i+1;
                }
                if(onceFlag){
                  $scope.$apply();
                };
                //画档位线
                this.j=1;
                for(this.j;this.j<this.i+1;this.j++){
                  drawRadian(this.cr3,this.deliverLine,this.radSectionArr[this.i-this.j]-1,this.radSectionArr[this.i-this.j]);
                };
              };
              this.radSectionArr.splice(this.i,1);
            }
          };
          //画白色遮挡
          drawRadian(canvesobj,this.HideCircle,0,360);
        };
        //画圆球和指示
        this.drawc = function (canvesobj,ancr,type) {
          if(135<=ancr || ancr<=45){
            var jd =  changeAngale(ancr);
            canvesobj.clearRect(0,0,this.canvsscreenHeight,this.canvsscreenWidth);
            var x = Math.cos(jd)*(this.rollCircle.r)+(this.rollCircle.x);
            var y = Math.sin(jd)*(this.rollCircle.r)+(this.rollCircle.y);
            //画小球
            canvesobj.beginPath();
            canvesobj.fillStyle = this.rollCircle.color;
            canvesobj.moveTo(x,y);
            canvesobj.arc(x,y,0.2*this.rateInit,0,Math.PI*2,false);
            canvesobj.fill();
            canvesobj.closePath();
            //画小球中的指示标识
            canvesobj.beginPath();
            canvesobj.fillStyle = "#191C23";
            canvesobj.lineWidth = 0.01*this.rateInit;//设置线宽
            canvesobj.moveTo(x,y-(0.2*this.rateInit/4));
            canvesobj.lineTo(x-(0.2*this.rateInit/4)/Math.sqrt(2)-0.01*this.rateInit,y);
            canvesobj.lineTo(x,y+(0.2*this.rateInit/4));
            canvesobj.fill();//填充颜色
            canvesobj.moveTo(x+0.01*this.rateInit,y-(0.2*this.rateInit/4));
            canvesobj.lineTo(x+(0.2*this.rateInit/4)/Math.sqrt(2)+0.02*this.rateInit,y);
            canvesobj.lineTo(x+0.01*this.rateInit,y+(0.2*this.rateInit/4));
            canvesobj.stroke();//画线框
            canvesobj.fill();//填充颜色
            canvesobj.closePath();
            //随小球和指示画fil填充
            if(!type){
              this.drawCircleFill(this.cr3,ancr);
            };
          };
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
          $scope.handlenapeListNape.forEach(function (item,i) {
            if(item.isManyDirective){
              if(item.matchdataid ===$scope.currentSlideData[index].id){
                currentRadObj.selectedIndex=i;
                currentRadObj.currentIndex=index;
              };
            };
          });
          currentRadObj.i=0;
          currentRadObj.id=$scope.currentSlideData[index].id;
          currentRadObj.j=0;
          currentRadObj.stoPosPoint=0;
          // currentRadObj.gearInit = $scope.currentSlideData[index].gearInitTemp;
          // $scope.currentSlideData[index].gearInit = $scope.currentSlideData[index].gearInitTemp;
          //当前绑定事件对象
          var currentEventObj = getIdObj($scope.currentSlideData[index].canves02);
          currentRadObj.drawDeliverCircle($scope.currentSlideData[index].gearNum);
          if($scope.currentSlideData[index].des === "init"){
            currentRadObj.drawc(currentRadObj.cr2,405,"type");
            currentRadObj.drawCircleFill(currentRadObj.cr2,405);
            //初始化数据
            $('.slider-pager').empty();
          }else{
            if($scope.currentSlideData[index].parNodeid === "toilet-lightCtl"){
              if($scope.currentSlideData[index].gearInit=== "低"){
                $scope.currentSlideData[index].gearInit = 1;
              }else if($scope.currentSlideData[index].gearInit=== "中"){
                $scope.currentSlideData[index].gearInit = 2;
              }else if($scope.currentSlideData[index].gearInit=== "高"){
                $scope.currentSlideData[index].gearInit = 3;
              };
            };
            currentRadObj.drawc(currentRadObj.cr2,currentRadObj.starRad+ currentRadObj.radRange * ($scope.currentSlideData[index].gearInit-1),"type");
            currentRadObj.drawCircleFill(currentRadObj.cr3,currentRadObj.starRad+currentRadObj.radRange * ($scope.currentSlideData[index].gearInit-1));
            currentEventObj.addEventListener( 'touchstart', function( e ){
              e.preventDefault();
            }, false );
            currentEventObj.addEventListener( 'touchmove', function( e ){
              e.preventDefault();
              var poi = getEvtLocation(e);
              currentRadObj.drawc(currentRadObj.cr2,getAngle($scope.screenWidth/2,2.7*2*$scope.fontSize,poi.x,poi.y));
            }, false );
            currentEventObj.addEventListener( 'touchend', function( e ){
              e.preventDefault();
              currentRadObj.drawc(currentRadObj.cr2,currentRadObj.radSectionArr[currentRadObj.stoPosPoint]);
              //档位滑动执行发指令操作
              $scope.radScrollSendDir(currentRadObj);
            }, false );
            var getEvtLocation = function(e){
              var touch = e.touches[0];
              return{
                x : touch.clientX,
                y : touch.clientY
              }
            };
          };
        };
        // $scope.getCurrentObj(0);
        $scope.count=0;
        $scope.slideHasChangedleft = function () {
          onceFlag = true;
          if($scope.currentSlideData.length !== 1){
            onceFlag = false;
            $scope.count--;
            if($scope.count >= 0){
              currentRadObj = null;
              $ionicSlideBoxDelegate.$getByHandle('boxSlider').previous();
              $timeout(function () {
                $scope.getCurrentObj($scope.count);
                onceFlag = true;
              },20)
            }else{
              $scope.count = 0;
            }
          };
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
                }, 20)
              } else {
                $scope.count = slidecount - 1;
              }
              ;
            };
        };
      },20);
      /**
       *@params:
       *@disc:accept ack or status;
       */
      // $scope.isSeatedStatusFlag = true;
      // $scope.handlenapeSelectedIndex = 12;
      // $scope.selectChangeFlag = false;
      // $scope.selectIsType = 1;
      // $scope.tostatustiveOnceFlag = 0;
      // $scope.todeviceFlag = 0;
      /**
       *@params:flushOptions(nvyong mode) mSwitchType(turn or off)
       *@disc:use nvyong Instruction create;
       */
      $scope.onceTimeIntionCreate = function (flag,isType,index) {
        $scope.selectChangeFlag = flag;
        $scope.selectIsType = isType;
        var selectedDataTemp = $scope.handlenapeListNape[index];
        var cmdvalue = getCmd(tolitercmdObj.header,tolitercmdObj.idx,nimi._data[selectedDataTemp.dataname],tolitercmdObj.ctrId,tolitercmdObj.devId);
        //send instructin
        // console.log(cmdvalue);
        // alert("cmdvalue"+cmdvalue)
        if(baseConfig.isCloudCtrl){
          $scope.toGetImpleteData(flag,cmdvalue,$scope.handlenapeListNape[index].handleDes,index,isType);
        }else{
          cmdService.sendCmd(tolitercmdObj.diviceid, cmdvalue, tolitercmdObj.boxid);
        };
      };
      /**
       *@params:type(use type),flushOptions(nvyong mode) mSwitchType(turn or off)
       *@disc:use nvyong and tunxi Instruction create
       */
      $scope.nvyongIntionCreate = function (flag,type,flushOptions,mSwitchType,isType,selectedIndex) {
        $scope.selectChangeFlag = flag;
        $scope.selectIsType = isType;
        var selectedDataTemp = $scope.handlenapeListNape[selectedIndex];
        var handleOriginData = selectedDataTemp.handledata;
        var temperature = handleOriginData[2].gearInit*2;
        var volume = handleOriginData[0].gearInit*2;
        var place = handleOriginData[1].gearInit*2;
        // if(temperature === 3){
        //   temperature = 4;
        // }else if(temperature === 4){
        //   temperature = 6;
        // }else if(temperature === 5){
        //   temperature = 8;
        // }else if(temperature === 6){
        //   temperature = 10;
        // };
        var cmdvalue = getCmd(tolitercmdObj.header,tolitercmdObj.idx,nimi.frontRearDry(type,temperature,volume,place,flushOptions,mSwitchType),tolitercmdObj.ctrId,tolitercmdObj.devId);
        //send instructin
        // console.log(cmdvalue);
        // alert("cmdvalue"+cmdvalue)
        if(baseConfig.isCloudCtrl){
          $scope.toGetImpleteData(flag,cmdvalue,$scope.handlenapeListNape[selectedIndex].handleDes,selectedIndex,isType);
        }else{
          cmdService.sendCmd(tolitercmdObj.diviceid, cmdvalue, tolitercmdObj.boxid);
        };
      };
      /**
       *@params:flushOptions(nvyong mode) mSwitchType(turn or off)
       *@disc:use nuamfen Instruction create
       */
      $scope.nuamfenIntionCreate = function (flag,mSwitchType,isType,selectedIndex) {
        $scope.selectChangeFlag = flag;
        $scope.selectIsType = isType;
        var selectedDataTemp = $scope.handlenapeListNape[selectedIndex];
        var handleOriginData = selectedDataTemp.handledata;
        var temperature = handleOriginData[1].gearInit*2;
        var volume = handleOriginData[0].gearInit*2;
        // if(temperature === 3){
        //   temperature = 4;
        // }else if(temperature === 4){
        //   temperature = 6;
        // }else if(temperature === 5){
        //   temperature = 8;
        // }else if(temperature === 6){
        //   temperature = 10;
        // };
        var cmdvalue = getCmd(tolitercmdObj.header,tolitercmdObj.idx,nimi.frontRearDry("暖风",temperature,volume,1,"正常",mSwitchType),tolitercmdObj.ctrId,tolitercmdObj.devId);
        //send instructin
        // console.log(cmdvalue);
        // alert("cmdvalue"+cmdvalue)
        if(baseConfig.isCloudCtrl){
          $scope.toGetImpleteData(flag,cmdvalue,$scope.handlenapeListNape[selectedIndex].handleDes,selectedIndex,isType);
        }else{
          cmdService.sendCmd(tolitercmdObj.diviceid,cmdvalue,tolitercmdObj.boxid);
        }
      };
      /**
       *@params:flushOptions(nvyong mode) mSwitchType(turn or off)
       *@disc:use nuamfen Instruction create
       */
      $scope.feetSeatIntionCreate = function (flag,temperature,isType,selectedIndex) {
        try {
          $scope.selectChangeFlag = flag;
          $scope.selectIsType = isType;
          var selectedDataTemp = $scope.handlenapeListNape[selectedIndex];
          var handleOriginData = selectedDataTemp.handledata;
          if (!temperature) {
            var temperature = handleOriginData[0].gearInit;
            // if (type === "quanwen") {
            //   if (temperature === 3) {
            //     temperature = 4;
            //   } else if (temperature === 4) {
            //     temperature = 6;
            //   } else if (temperature === 5) {
            //     temperature = 8;
            //   } else if (temperature === 6) {
            //     temperature = 10;
            //   };
            // };
          };
          var cmdvalue = getCmd(tolitercmdObj.header, tolitercmdObj.idx, nimi.feetSeatHeater(temperature), tolitercmdObj.ctrId, tolitercmdObj.devId);
          //send instructin
          // console.log(cmdvalue);
          // alert("cmdvalue" + cmdvalue)
          if (baseConfig.isCloudCtrl) {
            $scope.toGetImpleteData(flag, cmdvalue, $scope.handlenapeListNape[selectedIndex].handleDes, selectedIndex, isType);
          } else {
            cmdService.sendCmd(tolitercmdObj.diviceid, cmdvalue, tolitercmdObj.boxid);
          };
        }catch(e){
          alert(e.message)
        }
      };
      //quanwen
      $scope.SeatHeaterIntionCreate = function (flag,temperature,isType,selectedIndex) {
        try {
          $scope.selectChangeFlag = flag;
          $scope.selectIsType = isType;
          var selectedDataTemp = $scope.handlenapeListNape[selectedIndex];
          var handleOriginData = selectedDataTemp.handledata;
          if (!temperature) {
            var temperature = handleOriginData[0].gearInit*2;
          };
          var cmdvalue = getCmd(tolitercmdObj.header, tolitercmdObj.idx, nimi.SeatHeater(temperature), tolitercmdObj.ctrId, tolitercmdObj.devId);
          //send instructin
          // console.log(cmdvalue);
          // alert("cmdvalue" + cmdvalue)
          if (baseConfig.isCloudCtrl) {
            $scope.toGetImpleteData(flag,cmdvalue,$scope.handlenapeListNape[selectedIndex].handleDes,selectedIndex,isType);
          } else {
            cmdService.sendCmd(tolitercmdObj.diviceid, cmdvalue, tolitercmdObj.boxid);
          };
        }catch(e){
          alert(e.message)
        }
      };
      /**
       *@params:lightCtl(aroundLigh rand) isType(type) selectedIndex(selected index)
       *@disc:use aroundLigh Instruction create
       */
      $scope.aroundLightIntionCreate = function (flag,lightCtl,isType,selectedIndex) {
        $scope.selectChangeFlag = flag;
        $scope.selectIsType = isType;
        if(!window.localStorage.lightModal){
          var lightMode = "Default";
          var MOMC = "Pantone7456";
          var TUEC = "Pantone7507";
          var WEDC = "Pantone7515";
          var THUC = "Pantone7416";
          var FRIC = "Pantone618";
          var SATC = "Pantone563";
          var SUMC = "Pantone4985";
          var dynamicCtl = "OFF";
        }else{
          var locastorgeLight = JSON.parse(window.localStorage.lightModal);
          var lightMode = locastorgeLight.modal;
          var MOMC = locastorgeLight.MOMC;
          var TUEC = locastorgeLight.TUEC;
          var WEDC = locastorgeLight.WEDC;
          var THUC = locastorgeLight.THUC;
          var FRIC = locastorgeLight.FRIC;
          var SATC = locastorgeLight.SATC;
          var SUMC = locastorgeLight.SUMC;
          if(lightMode === "Default" && locastorgeLight.flag === false){
            var dynamicCtl = "ON";
          }else {
            var dynamicCtl = "OFF";
          }
        };
        var selectedDataTemp = $scope.handlenapeListNape[selectedIndex];
        var handleOriginData = selectedDataTemp.handledata;
        if(!lightCtl){
          var lightCtl = handleOriginData[0].gearInit;
          // alert("lightCtl"+lightCtl)
          if(lightCtl=== 1){
            lightCtl = "低";
          }else if(lightCtl === 2){
            lightCtl = "中";
          }else if(lightCtl === 3){
            lightCtl = "高";
          };
        };
        var cmdvalue = getCmd(tolitercmdObj.header,tolitercmdObj.idx,nimi.ambientLight(lightMode, lightCtl, dynamicCtl, MOMC, TUEC, WEDC, THUC, FRIC, SATC, SUMC),tolitercmdObj.ctrId,tolitercmdObj.devId);
        //send instructin
        console.log(cmdvalue);
        // alert("cmdvalue"+cmdvalue)
        if(baseConfig.isCloudCtrl){
          $scope.toGetImpleteData(flag,cmdvalue,$scope.handlenapeListNape[selectedIndex].handleDes,selectedIndex,isType);
        }else{
          cmdService.sendCmd(tolitercmdObj.diviceid, cmdvalue, tolitercmdObj.boxid);
        }
      };
      /**
       *@params:flushOptions(nvyong mode) mSwitchType(turn or off) flag(is toiltelight)
       *@disc:use toiltelight Instruction create
       */
      $scope.tolLightIntionCreate = function (flag,lightStalls,isType,selectedIndex) {
        $scope.selectChangeFlag = flag;
        $scope.selectIsType = isType;
        var selectedDataTemp = $scope.handlenapeListNape[selectedIndex];
        var handleOriginData = selectedDataTemp.handledata;
        if(!lightStalls){
          var lightStalls = handleOriginData[1].gearInit;
        }
        var cmdvalue = getCmd(tolitercmdObj.header,tolitercmdObj.idx,nimi.bowlLight(lightStalls),tolitercmdObj.ctrId,tolitercmdObj.devId);
        //send instructin
        console.log(cmdvalue);
        // alert("cmdvalue"+cmdvalue)
        if(baseConfig.isCloudCtrl){
          $scope.toGetImpleteData(flag,cmdvalue,$scope.handlenapeListNape[selectedIndex].handleDes,selectedIndex,isType);
        }else{
          cmdService.sendCmd(tolitercmdObj.diviceid, cmdvalue, tolitercmdObj.boxid);
        }
      };
      //Mutex json
      $scope.MutexAarray = ["bigFlush","smallFlush","nvyong","tunxi"];
      // $scope.MutexAarray = [];
      /**
       *@params:
       *@disc:judge mutex
       */
      $scope.hanleMutexInitFlag = true;
      $scope.hanleMutexInit = function () {
        $scope.handlenapeListNape.forEach(function (item) {
          if(item.matchdataid === "bigFlush" || item.matchdataid === "smallFlush" || item.matchdataid === "nvyong" || item.matchdataid === "tunxi"){
            if(item.selecFlag){
              $scope.hanleMutexInitFlag = false;
              return;
            };
          };
        })
      };
      $scope.hanleMutexFlag = true;
      $scope.hanleMutex = function (comparobj){
        if(!$scope.hanleMutexInitFlag){
          $scope.MutexAarray.forEach(function (item) {
            if(item === comparobj){
              $scope.hanleMutexFlag = false;
              return;
            };
          })
        }
      };
      /**
       *@params:
       *@disc:judge have many handles
       */
      $scope.judgeIsHaveHandlesFlag = true;
      $scope.judgeIsHaveHandles = function () {
        $scope.handlenapeListNape.forEach(function (item) {
          if(item.isManyDirective){
            if(item.selecFlag){
              $scope.judgeIsHaveHandlesFlag = false;
              return;
            };
          };
        })
      };
      //保存选择的数据项
      $scope.handleRadSelected;
      //档位滑动执行发指令操作
      $scope.radScrollSendDir = function (currentRadObj) {
        $scope.todeviceFlag = 0;
        $scope.handlenapeSelectedIndex = currentRadObj.selectedIndex;
        if(currentRadObj.id === "nvyong"){
          $scope.nvyongIntionCreate("true","女用","正常","ON","1",currentRadObj.selectedIndex);
        }else if(currentRadObj.id === "tunxi"){
          $scope.nvyongIntionCreate("true","臀洗","正常","ON","1",currentRadObj.selectedIndex);
        }else if(currentRadObj.id === "nuanfen"){
          $scope.nuamfenIntionCreate("true","ON","1",currentRadObj.selectedIndex);
        }else if(currentRadObj.id === "nuanjiao"){
          $scope.feetSeatIntionCreate("true","","1",currentRadObj.selectedIndex);
        }else if(currentRadObj.id === "quanwen"){
          $scope.SeatHeaterIntionCreate("true","","1",currentRadObj.selectedIndex);
        }else if(currentRadObj.id === "dengguang"){
          if(currentRadObj.currentIndex===0){
            $scope.aroundLightIntionCreate(true,"","1",currentRadObj.selectedIndex);
          }else{
            $scope.tolLightIntionCreate(true,"","1",currentRadObj.selectedIndex);
          }
        };
      };
      //ack back selected hanle
      $scope.selectChange = function (flag,index,isType) {
        if(flag){
          // 根据选择项来初始化选择项的
          if(isType == "0"){
            $scope.handlenapeListNape[index].selecFlag = !$scope.handlenapeListNape[index].selecFlag;
            if($scope.handlenapeListNape[index].selecFlag === true){
              $scope.handlenapeListNape[index].imgUrl = $scope.handlenapeListNape[index].imgSeledUrl;
            }else{
              $scope.handlenapeListNape[index].imgUrl = $scope.handlenapeListNape[index].imgUrlTemp;
            };
            if($scope.handlenapeListNape[index].isManyDirective){
              if(!$scope.handlenapeListNape[index].selecFlag){
                $scope.judgeIsHaveHandlesFlag = true;
                $scope.judgeIsHaveHandles();
                if($scope.judgeIsHaveHandlesFlag){
                  $scope.currentSlideData = $scope.slideInitData;
                }else{
                  // reduce
                  for(var j=0;j<$scope.currentSlideData.length;j++) {
                    for (var n = 0; n < $scope.handlenapeListNape[index].handledata.length; n++) {
                      if ($scope.currentSlideData[j].parNodeid === $scope.handlenapeListNape[index].handledata[n].parNodeid) {
                        $scope.currentSlideData.splice(j, 1);
                      };
                    };
                  };
                };
                // //click slide
                // if($scope.currentSlideData[0].des === "init"){
                //   $scope.clickSlideFlag = false;
                // }else{
                //   $scope.clickSlideFlag = true;
                // };
              }else{
                //open
                //repeat scroll
                if($scope.currentSlideData[0].des === "init"){
                  $scope.currentSlideData = [];
                  $scope.handlenapeListNape[index].handledata.forEach(function (item) {
                    $scope.currentSlideData.push(item);
                  });
                }else{
                  $scope.currentSlideDataTemp = $scope.currentSlideData.concat($scope.handlenapeListNape[index].handledata);
                  $scope.currentSlideData = [];
                  $scope.currentSlideDataTemp.forEach(function (item) {
                    $scope.currentSlideData.push(item);
                  });
                };
                // $ionicSlideBoxDelegate.$getByHandle("boxSlider").slide(0);
              };
              // //click slide
              // if($scope.currentSlideData[0].des === "init"){
              //   $scope.clickSlideFlag = false;
              // }else{
              //   $scope.clickSlideFlag = true;
              // };
              $scope.hanleInitTemple(index);
            }else{
              // //click slide
              // if($scope.currentSlideData[0].des === "init"){
              //   $scope.clickSlideFlag = false;
              // }else{
              //   $scope.clickSlideFlag = true;
              // };
              if($scope.handlenapeListNape[index].selecFlag){
                if($scope.handlenapeListNape[index].matchdataid === "clear"){
                  $scope.value = $scope.Clearvalue;
                  $scope.toiletController.modelTypeClear = "toiletController.gaunbi";
                  $scope.openModal();
                };
              };
            };
            if(!$scope.handlenapeListNape[index].isManyDirective && $scope.handlenapeListNape[index].matchdataid !== "clear"){
              $timeout(function () {
                $scope.handlenapeListNape[index].selecFlag = !$scope.handlenapeListNape[index].selecFlag;
                if($scope.handlenapeListNape[index].selecFlag === true){
                  $scope.handlenapeListNape[index].imgUrl = $scope.handlenapeListNape[index].imgSeledUrl;
                }else{
                  $scope.handlenapeListNape[index].imgUrl = $scope.handlenapeListNape[index].imgUrlTemp;
                };
              },6000)
            };
            //click slide
            if($scope.currentSlideData[0].des === "init"){
              $scope.clickSlideFlag = false;
            }else{
              $scope.clickSlideFlag = true;
            };
          };
        };
      };
      /**
       *@params:index(selected index),deviceId(device id),cmdvalue(directive value),name(directive name)
       *@disc:impletemnet get data
       */
      $scope.toGetImpleteData = function(flag,cmdvalue, name,index,isType){
        //cloud
        hmsPopup.showLoading("<span translate='golabelvariable.loadingdata'></span>");
        $timeout(function () {
          hmsPopup.hideLoading();
          $scope.selectChange(flag,index,isType);
        },1000)
        // hmsPopup.showLoading("<span translate='golabelvariable.loadingdata'></span>");
        // var url = baseConfig.basePath + "/r/api/message/sendMessage";
        // var paramter = cmdService.cloudCmd(cmdvalue,$scope.handlenapeListNape[index].cloudId);
        // hmsHttp.post(url, paramter).success(
        //   function(response){
        //     hmsPopup.hideLoading();
        //     //resolve
        //     if(response.code == 200){
        //       if(value.ack.toLowerCase() == "fa27"){
        //         if($scope.handlenapeListNape[index].matchdataid ==="dengguang" && isType === "0"){
        //           //
        //         };
        //         $scope.Toast.show($translate.instant($scope.handlenapeListNape[index].handleDes)+$translate.instant("golabelvariable.directesuccess"));
        //         $scope.selectChange(flag,index,isType);
        //       }
        //     }else{
        //       $scope.Toast.show($translate.instant($scope.handlenapeListNape[index].handleDes)+$translate.instant("golabelvariable.directerror"));
        //     }
        //   }).
        //   error(function () {
        //     hmsPopup.hideLoading();
        //     $scope.Toast.show($translate.instant($scope.handlenapeListNape[index].handleDes) + $translate.instant("golabelvariable.loadingdataerrror"));
        //   })
      };
      // // init data
      // $scope.handlenapeSelectedIndex = 12;
      // $scope.selectChangeFlag = false;
      // $scope.selectIsType = "1";
      // flag,index,isTyp
      //get devic status
      var cmdvalue = getCmd(tolitercmdObj.header,tolitercmdObj.idx,nimi._data["synchronizeReq"],tolitercmdObj.ctrId,tolitercmdObj.devId);
      //send instructin
      console.log(cmdvalue)
      $scope.$on("$ionicView.beforeEnter",function () {
        $scope.value = [];
        //选择模式和清洁方式
        $scope.ModelvalueNvYTunX = [{
          id:0,
          des:'toiletController.maichong'
        },{
          id:1,
          des:'toiletController.bodong'
        },{
          id:2,
          des:'toiletController.yidong'
        },{
          id:3,
          des:'toiletController.zhengchang'
        }];
        //选择模式和清洁方式
        $scope.Clearvalue = [{
          id:"clearopen",des:'toiletController.clearopen',
        },{
          id:"clearextend",des:'toiletController.clearextend',
        },{
          id:"clearinstance",des:'toiletController.clearinstance',
        }];
        // tolite favoite localstarge
        // window.localStorage.toilteFaviteSetting = JSON.stringify(a);

        $scope.toilteFaviteSetting = JSON.parse(window.localStorage.toilteFaviteSetting);
        /**
         moren-json
         init默认
         **/
        $scope.slideInitData =[{
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
        /*
         nuanjiao-json
         暖脚
         */
        $scope.slideNuanjioaData =[{
          id:"nuanjiao",
          des: "toiletController.njfl",
          gearNum: 9,
          gearInit: 1,
          gearInitTemp: 1,
          parameterctlFlag: false,
          parNodeid: 'toilet-NuanjioaFlCtl',
          canves01: "NuanjioaFlcanves01",
          canves02: "NuanjioaFlcanves02",
          canves03: "NuanjioaFlcanves03",
        }]
        /*
         nvyong-json
         女用
         */
        $scope.slideNvYongData =[{
          id:"nvyong",
          des: "toiletController.nvsy",
          gearNum: 4,
          gearInit: $scope.toilteFaviteSetting.FRONT_SPRAY_PRESSURE,
          gearInitTemp: $scope.toilteFaviteSetting.FRONT_SPRAY_PRESSURE,
          parameterctlFlag: false,
          parNodeid: 'toilet-NvYongSyCtl',
          canves01: "NvYongSycanves01",
          canves02: "NvYongSycanves02",
          canves03: "NvYongSycanves03",
        },{
          id:"nvyong",
          des:"toiletController.nvpos",
          gearNum:4,
          gearInit:$scope.toilteFaviteSetting.FRONT_SPRAY_POSITION,
          gearInitTemp:$scope.toilteFaviteSetting.FRONT_SPRAY_POSITION,
          parameterctlFlag:false,
          parNodeid:'toilet-NvYongPosCtl',
          canves01:"NvYongSyPoscanves01",
          canves02:"NvYongSyPoscanves02",
          canves03:"NvYongSyPoscanves03",
        },{
          id:"nvyong",
          des:"toiletController.nvtemper",
          gearNum:5,
          gearInit:$scope.toilteFaviteSetting.FRONT_SPRAY_TMPT,
          gearInitTemp:$scope.toilteFaviteSetting.FRONT_SPRAY_TMPT,
          parameterctlFlag:false,
          parNodeid:'toilet-NvYongTemCtl',
          canves01:"NvYongTemcanves01",
          canves02:"NvYongTemcanves02",
          canves03:"NvYongTemcanves03",
        }];
        /*
         tunxi-json
         臀洗
         */
        $scope.slideTunBuData =[{
          id:"tunxi",
          des: "toiletController.txsy",
          gearNum: 4,
          gearInit: $scope.toilteFaviteSetting.REAR_PRESSURE,
          gearInitTemp: $scope.toilteFaviteSetting.REAR_PRESSURE,
          parameterctlFlag: false,
          parNodeid: 'toilet-TunBuSyCtl',
          canves01: "TunBuSycanves01",
          canves02: "TunBuSycanves02",
          canves03: "TunBuSycanves03",
        },
          {
            id:"tunxi",
            des:"toiletController.txpos",
            gearNum:4,
            gearInit:$scope.toilteFaviteSetting.REAR_POSITION,
            gearInitTemp:$scope.toilteFaviteSetting.REAR_POSITION,
            parameterctlFlag:false,
            parNodeid:'toilet-TunBuPosCtl',
            canves01:"TunBuPosPoscanves01",
            canves02:"TunBuPosPoscanves02",
            canves03:"TunBuPosPoscanves03",
          },{
            id:"tunxi",
            des:"toiletController.txtemper",
            gearNum:5,
            gearInit:$scope.toilteFaviteSetting.REAR_TMPT,
            gearInitTemp:$scope.toilteFaviteSetting.REAR_TMPT,
            parameterctlFlag:false,
            parNodeid:'toilet-TunBuTemCtl',
            canves01:"TunBuTemTemcanves01",
            canves02:"TunBuTemTemcanves02",
            canves03:"TunBuTemTemcanves03",
          }];
        /*
         light-json
         灯光
         */
        $scope.slidelightData = [{
          id:"dengguang",
          des: "toiletController.aroundlight",
          gearNum: 2,
          gearInit: $scope.toilteFaviteSetting.LIGHT_AMBIENT_BRIGHTNESS,
          gearInitTemp: $scope.toilteFaviteSetting.LIGHT_AMBIENT_BRIGHTNESS,
          parameterctlFlag: false,
          parNodeid: 'toilet-lightCtl',
          canves01: "lightcanves01",
          canves02: "lightcanves02",
          canves03: "lightcanves03",
        },{
          id:"dengguang",
          des: "toiletController.toiltelight",
          gearNum: 9,
          gearInit: $scope.toilteFaviteSetting.LIGHT_BOWL_BRIGHTNESS,
          gearInitTemp: $scope.toilteFaviteSetting.LIGHT_BOWL_BRIGHTNESS,
          parameterctlFlag: false,
          parNodeid: 'toilet-contioCtl',
          canves01: "contiocanves01",
          canves02: "contiocanves02",
          canves03: "contiocanves03",
        }]
        /*
         nuanfeng-json
         暖风
         */
        $scope.slidedryerData =[{
          id:"nuanfen",
          des: "toiletController.nffl",
          gearNum: 4,
          gearInit: $scope.toilteFaviteSetting.DRYER_TMPT,
          gearInitTemp: $scope.toilteFaviteSetting.DRYER_TMPT,
          parameterctlFlag: false,
          parNodeid: 'toilet-dryerFlCtl',
          canves01: "dryerFlcanves01",
          canves02: "dryerFlcanves02",
          canves03: "dryerFlcanves03",
        },{
          id:"nuanfen",
          des: "toiletController.nffw",
          gearNum: 5,
          gearInit: $scope.toilteFaviteSetting.DRYER_PRESSURE,
          gearInitTemp: $scope.toilteFaviteSetting.DRYER_PRESSURE,
          parameterctlFlag: false,
          parNodeid: 'toilet-dryerFwCtl',
          canves01: "dryerFwcanves01",
          canves02: "dryerFwcanves02",
          canves03: "dryerFwcanves03",
        }]
        /*
         nuanjiao-json
         暖角
         */
        $scope.slidewarmjData =[{
          id:"nuanjiao",
          des: "toiletController.njfl",
          gearNum: 9,
          gearInit: $scope.toilteFaviteSetting.DRYER_POWER,
          gearInitTemp: $scope.toilteFaviteSetting.DRYER_POWER,
          parameterctlFlag: false,
          parNodeid: 'toilet-warmjCtl',
          canves01: "warmjcanves01",
          canves02: "warmjcanves02",
          canves03: "warmjcanves03",
        }];
        /*
         quanwen-json
         圈温
         */
        $scope.slidequanwenData =[{
          id:"quanwen",
          des: "toiletController.qwfw",
          gearNum: 5,
          gearInit: $scope.toilteFaviteSetting.SEAT_TMPT,
          gearInitTemp: $scope.toilteFaviteSetting.SEAT_TMPT,
          parameterctlFlag: false,
          parNodeid: 'toilet-quanwenCtl',
          canves01: "quanwencanves01",
          canves02: "quanwencanves02",
          canves03: "quanwencanves03",
        }]
        /**
         gongnenglist-json
         功能列表数据
         **/
        $scope.handlenapeListNape = [
          {
            imgUrl: "build/img/toilet-controller/dachong.png",
            imgSeledUrl: "build/img/toilet-controller/dachongseled.png",
            imgUrlTemp:"build/img/toilet-controller/dachong.png",
            handleDes: "toiletController.dachong01",
            selecFlag:false,
            matchdataid:"bigFlush",
            isManyDirective:false,
            dataname:"bigFlush",
            handledata:$scope.slideInitData,
            cloudId:"NIMIbigFlush",
          },
          {
            imgUrl: "build/img/toilet-controller/xiaochong.png",
            imgSeledUrl: "build/img/toilet-controller/xiaochongseled.png",
            imgUrlTemp:"build/img/toilet-controller/xiaochong.png",
            handleDes: "toiletController.xioachong",
            selecFlag:false,
            matchdataid:"smallFlush",
            dataname:"smallFlush",
            isManyDirective:false,
            handledata:$scope.slideInitData,
          },
          {
            imgUrl: "build/img/toilet-controller/nvyong.png",
            imgSeledUrl: "build/img/toilet-controller/nvyongseled.png",
            imgUrlTemp:"build/img/toilet-controller/nvyong.png",
            handleDes: "toiletController.nvyong",
            selecFlag:false,
            matchdataid:"nvyong",
            isManyDirective:true,
            handledata:$scope.slideNvYongData,
            cloudId:"NIMInvyong ",
          },
          {
            imgUrl: "build/img/toilet-controller/tunxi.png",
            imgSeledUrl: "build/img/toilet-controller/tunxiseled.png",
            imgUrlTemp:"build/img/toilet-controller/tunxi.png",
            handleDes: "toiletController.tunxi",
            selecFlag:false,
            matchdataid:"tunxi",
            isManyDirective:true,
            handledata:$scope.slideTunBuData
          },
          {
            imgUrl: "build/img/toilet-controller/quanwen.png",
            imgSeledUrl: "build/img/toilet-controller/quanwenseled.png",
            imgUrlTemp:"build/img/toilet-controller/quanwen.png",
            handleDes: "toiletController.quanwen",
            isManyDirective:true,
            selecFlag:false,
            matchdataid:"quanwen",
            handledata:$scope.slidequanwenData
          },
          {
            imgUrl: "build/img/toilet-controller/nuanfeng.png",
            imgSeledUrl: "build/img/toilet-controller/nuanfengseled.png",
            imgUrlTemp:"build/img/toilet-controller/nuanfeng.png",
            handleDes: "toiletController.nuanfeng",
            isManyDirective:true,
            selecFlag:false,
            matchdataid:"nuanfen",
            handledata:$scope.slidedryerData
          },
          {
            imgUrl: "build/img/toilet-controller/dengguan.png",
            imgSeledUrl: "build/img/toilet-controller/dengguanseled.png",
            imgUrlTemp:"build/img/toilet-controller/dengguan.png",
            handleDes: "toiletController.dengguang",
            isManyDirective:true,
            selecFlag:false,
            matchdataid:"dengguang",
            handledata:$scope.slidelightData
          },
          {
            imgUrl: "build/img/toilet-controller/nuanjiao.png",
            imgSeledUrl: "build/img/toilet-controller/nuanjiaoseled.png",
            imgUrlTemp:"build/img/toilet-controller/nuanjiao.png",
            handleDes: "toiletController.nuanjiao",
            selecFlag:false,
            matchdataid:"nuanjiao",
            isManyDirective:true,
            handledata:$scope.slidewarmjData
          },
          {
            imgUrl: "build/img/toilet-controller/kaigai.png",
            imgSeledUrl: "build/img/toilet-controller/kaigaiseled.png",
            imgUrlTemp:"build/img/toilet-controller/kaigai.png",
            handleDes: "toiletController.guangai",
            isManyDirective:false,
            selecFlag:false,
            matchdataid:"guangai",
            handledata:$scope.slideInitData,
            dataname:"closeLid",
          },{
            imgUrl: "build/img/toilet-controller/fangai.png",
            imgSeledUrl: "build/img/toilet-controller/fangaiseled.png",
            imgUrlTemp:"build/img/toilet-controller/fangai.png",
            handleDes: "toiletController.fangai",
            isManyDirective:false,
            selecFlag:false,
            matchdataid:"fangai",
            handledata:$scope.slideInitData,
            dataname:"openLid",
          },{
            imgUrl: "build/img/toilet-controller/fanquan.png",
            imgSeledUrl: "build/img/toilet-controller/fanquanseled.png",
            imgUrlTemp:"build/img/toilet-controller/fanquan.png",
            handleDes: "toiletController.fanquan",
            isManyDirective:false,
            selecFlag:false,
            matchdataid:"fanquan",
            handledata:$scope.slideInitData,
            dataname:"openRing",
          },{
            imgUrl: "build/img/toilet-controller/qingjie.png",
            imgSeledUrl: "build/img/toilet-controller/qingjieseled.png",
            imgUrlTemp:"build/img/toilet-controller/qingjie.png",
            handleDes: "toiletController.qingjie",
            matchdataid:"clear",
            isManyDirective:false,
            selecFlag:false,
            handledata:$scope.slideInitData,
          },{
            imgUrl: "build/img/toilet-controller/qingjie.png",
            imgSeledUrl: "build/img/toilet-controller/qingjieseled.png",
            imgUrlTemp:"build/img/toilet-controller/qingjie.png",
            handleDes: "toiletController.devicePop",
            matchdataid:"devicePop",
            isManyDirective:false,
            selecFlag:false,
            handledata:$scope.slideInitData,
          },{
            imgUrl: "build/img/toilet-controller/shezhi.png",
            imgSeledUrl: "build/img/toilet-controller/shezhiseled.png",
            imgUrlTemp:"build/img/toilet-controller/shezhi.png",
            handleDes: "toiletController.shezhi",
            matchdataid:"setting",
            selecFlag:false
          },
        ];
        var handlenapeListNapeLen = $scope.handlenapeListNape.length;

        $scope.currentSlideData = [];
        $scope.isSeatedStatusFlag = true;
        $scope.handlenapeSelectedIndex = 12;
        $scope.selectChangeFlag = false;
        $scope.selectIsType = 1;
        $scope.tostatustiveOnceFlag = 0;
        $scope.todeviceFlag = 0;
        //init click slide
        $scope.clickSlideFlag = false;
        //error over time
        $scope.overTiemFlag = true;
        // alert("cmdvalue"+cmdvalue)
        if(baseConfig.isCloudCtrl){
          // flag,cmdvalue, name,index,isType
          $scope.toGetImpleteData("false",cmdvalue,$translate.instant('toiletController.devicePop'),12,"1");
        }else{
          hmsPopup.showLoading("<span translate='golabelvariable.loadingdata'></span>");
          cmdService.sendCmd(tolitercmdObj.diviceid, cmdvalue, tolitercmdObj.boxid);
        };
      })
      // alert("cmdvalue"+cmdvalue)
      if(baseConfig.isCloudCtrl){
        // flag,cmdvalue, name,index,isType
        $scope.toGetImpleteData("false",cmdvalue,$translate.instant('toiletController.devicePop'),12,"1");
      }else{
        hmsPopup.showLoading("<span translate='golabelvariable.loadingdata'></span>");
        cmdService.sendCmd(tolitercmdObj.diviceid, cmdvalue, tolitercmdObj.boxid);
      };
      /**
       *@params:index(selected index)
       *@disc:handle light or gary
       */
      $scope.hanleInitTemple = function (index) {
        $scope.count=0;
        // console.log($scope.currentSlideData)
        $scope.initHtmlTemplate($scope.currentSlideData);
        setTimeout(function () {
          //init every gearInitTemp
          // $scope.currentSlideData.forEach(function (item,index) {
          //   item.gearInit = item.gearInitTemp;
          // });
          $scope.getCurrentObj(0);
          //处理指令数据
          //处理女用和臀洗的模式选择
          if($scope.handlenapeListNape[index].selecFlag){
            if($scope.handlenapeListNape[index].matchdataid === "nvyong" || $scope.handlenapeListNape[index].matchdataid === "tunxi"){
              $scope.value = $scope.ModelvalueNvYTunX;
              $scope.toiletController.handleSelecDes = $scope.toiletController.selectMode;
              $scope.toiletController.modelType = $scope.toiletController.modelTypeNv;
            }
          };
        },20);
      };
      //hanle selected border
      // var handlenapeListNapeLen = $scope.handlenapeListNape.length;
      $scope.selectNapes = function (index) {
        //device connect error and no use
        if(!$scope.overTiemFlag){
          //init randrow
          // $scope.currentSlideData.forEach(function (item) {
          //   item.gearInit = item.gearInitTemp;
          // });
          $scope.todeviceFlag = 0;
          $scope.handlenapeSelectedIndex = index;
          if($scope.handlenapeListNape[index].matchdataid === "setting"){
            $state.go("toiletSetting");
          }else {
            hmsPopup.showLoading("");
            $timeout(function () {
              hmsPopup.hideLoading();
            },500);
            $scope.hanleMutexFlag = true;
            $scope.hanleMutexInitFlag = true;
            if(!$scope.handlenapeListNape[index].selecFlag){
              $scope.hanleMutexInit();
              $scope.hanleMutex($scope.handlenapeListNape[index].matchdataid);
            };
            if($scope.hanleMutexFlag){
              if(!$scope.handlenapeListNape[index].isManyDirective){
                if(!$scope.handlenapeListNape[index].selecFlag && $scope.handlenapeListNape[index].matchdataid !== "clear"){
                  if($scope.handlenapeListNape[index].matchdataid === "guangai" || $scope.handlenapeListNape[index].matchdataid === "fanquan"){
                    if($scope.isSeatedStatusFlag){
                      $scope.onceTimeIntionCreate("true","0",index);
                    }else{
                      $scope.Toast.show($translate.instant("toiletController.seatstatus"));
                    }
                  }else{
                    $scope.onceTimeIntionCreate("true","0",index);
                  }
                };
                if($scope.handlenapeListNape[index].matchdataid === "clear") {
                  //close clear
                  console.log($scope.toiletController.modelTypeClear)
                  // alert($scope.toiletController.modelTypeClear)
                  if($scope.handlenapeListNape[index].selecFlag){
                    if($scope.toiletController.modelTypeClear !== "toiletController.gaunbi") {
                      if ($scope.toiletController.modelTypeClear === "toiletController.clearopen") {
                        var cmdvalue = getCmd(tolitercmdObj.header,tolitercmdObj.idx, nimi._data["closeTrap"],tolitercmdObj.ctrId,tolitercmdObj.devId);
                      } else if ($scope.toiletController.modelTypeClear === "toiletController.clearextend") {
                        var cmdvalue = getCmd(tolitercmdObj.header,tolitercmdObj.idx, nimi._data["closeExtendWand"],tolitercmdObj.ctrId,tolitercmdObj.devId);
                      } else if ($scope.toiletController.modelTypeClear === "toiletController.clearinstance") {
                        var cmdvalue = getCmd(tolitercmdObj.header,tolitercmdObj.idx, nimi._data["closeIntelligentSterilization"],tolitercmdObj.ctrId,tolitercmdObj.devId);
                      };
                      $scope.selectChangeFlag = true;
                      $scope.selectIsType = "0";
                      if(baseConfig.isCloudCtrl){
                        var isType = "0";
                        $scope.toGetImpleteData(true,cmdvalue,$scope.handlenapeListNape[index].handleDes,index,isType);
                      }else{
                        // $scope.sendCmd(cmdvalue,index);
                        cmdService.sendCmd(tolitercmdObj.diviceid, cmdvalue, tolitercmdObj.boxid);
                      }
                      $scope.toiletController.modelTypeClear = "toiletController.gaunbi";
                    }else{
                      $scope.selectChange("true",index,"0");
                    }
                  }else{
                    $scope.selectChange("true",index,"0");
                  };
                };
              }else{
                //use instruction create
                if($scope.handlenapeListNape[index].matchdataid === "nvyong"){
                  if($scope.isSeatedStatusFlag){
                    if(!$scope.handlenapeListNape[index].selecFlag){
                      $scope.nvyongIntionCreate(true,"女用","正常","ON","0",index);
                    }else{
                      $scope.nvyongIntionCreate(true,"女用","正常","OFF","0",index);
                    };
                  }else{
                    $scope.Toast.show($translate.instant("toiletController.seatstatus"))
                  };
                }else if($scope.handlenapeListNape[index].matchdataid === "tunxi"){
                  if($scope.isSeatedStatusFlag) {
                    if(!$scope.handlenapeListNape[index].selecFlag){
                      $scope.nvyongIntionCreate(true,"臀洗","正常","ON","0",index);
                    }else{
                      $scope.nvyongIntionCreate(true,"臀洗","正常","OFF","0",index);
                    };
                  }else{
                    $scope.Toast.show($translate.instant("toiletController.seatstatus"));
                  }
                }else if($scope.handlenapeListNape[index].matchdataid === "nuanfen"){
                  if($scope.isSeatedStatusFlag){
                    if(!$scope.handlenapeListNape[index].selecFlag){
                      $scope.nuamfenIntionCreate(true,"ON","0",index);
                    }else{
                      $scope.nuamfenIntionCreate(true,"OFF","0",index);
                    };
                  }else{
                    $scope.Toast.show($translate.instant("toiletController.seatstatus"))
                  };
                }else if($scope.handlenapeListNape[index].matchdataid === "nuanjiao"){
                  if(!$scope.handlenapeListNape[index].selecFlag){
                    $scope.feetSeatIntionCreate(true,"","0",index);
                  }else{
                    $scope.feetSeatIntionCreate(true,1,"0",index);
                  };
                }else if($scope.handlenapeListNape[index].matchdataid === "quanwen"){
                  if(!$scope.handlenapeListNape[index].selecFlag){
                    $scope.SeatHeaterIntionCreate(true,2,"0",index);
                  }else{
                    $scope.SeatHeaterIntionCreate(true,1,"0",index);
                  };
                }else if($scope.handlenapeListNape[index].matchdataid === "dengguang"){
                  if(!$scope.handlenapeListNape[index].selecFlag){
                    $scope.aroundLightIntionCreate(true,"","0",index);
                    $timeout(function () {
                      $scope.tolLightIntionCreate(false,"","0",index);
                    },1000)
                  }else{
                    $scope.aroundLightIntionCreate(true,'关',"0",index);
                    $timeout(function () {
                      $scope.tolLightIntionCreate(false,1,"0",index);
                    },1000)
                  };
                };
              };
            }else{
              $scope.Toast.show($translate.instant($scope.handlenapeListNape[index].handleDes) + $translate.instant("toiletController.mutex"));
            };
          };
        }else{
          $scope.Toast.show($translate.instant("golabelvariable.loadingdataerrror"))
        }
      };
      /**
       *@params:index(selected index),
       *@disc:init current status
       */
      $scope.initRecycleCurnt = function (index) {
        $scope.handlenapeListNape[index].selecFlag = true;
        if($scope.handlenapeListNape[index].selecFlag === true){
          $scope.handlenapeListNape[index].imgUrl = $scope.handlenapeListNape[index].imgSeledUrl;
        }else{
          $scope.handlenapeListNape[index].imgUrl = $scope.handlenapeListNape[index].imgUrlTemp;
        };
        $scope.handlenapeListNape[index].handledata.forEach(function (item) {
          $scope.currentSlideData.push(item);
        })
      };
      $scope.initRecycleRedce = function (index) {
        $scope.reducefalg = false;
        $scope.currentSlideData.forEach(function (obj) {
          $scope.handlenapeListNape[index].handledata.forEach(function (item) {
            if(obj.parNodeid === item.parNodeid){
              $scope.currentSlideData.unshift(item);
              $scope.reducefalg = true;
            };
          });
        });
        if($scope.reducefalg){
          $scope.handlenapeListNape[index].selecFlag = false;
          if($scope.handlenapeListNape[index].selecFlag === true){
            $scope.handlenapeListNape[index].imgUrl = $scope.handlenapeListNape[index].imgSeledUrl;
          }else{
            $scope.handlenapeListNape[index].imgUrl = $scope.handlenapeListNape[index].imgUrlTemp;
          };
        };
      };
      // //init click slide
      // $scope.clickSlideFlag = false;
      // //error over time
      // $scope.overTiemFlag = true;
      var receiveTcpDatahandle = function (result) {
        var resultOn = result[0];
        if(resultOn.from.uid === tolitercmdObj.diviceid){
          if (resultOn.data.cmd) {
            var backDataCmd = nimi.analysisInstruction(resultOn.data.cmd[0]);
            if(backDataCmd.flag === "ack"){
              if($scope.todeviceFlag === 0) {
                $scope.todeviceFlag++;
                if (backDataCmd.cmd === "07") {
                  var name = "toiletController.chongxi";
                  if (backDataCmd.ack === "1000") {
                    $scope.selectChange($scope.selectChangeFlag, $scope.handlenapeSelectedIndex, $scope.selectIsType);
                    $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directesuccess"));
                  } else {
                    $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directerror"));
                  };
                } else if (backDataCmd.cmd === "01") {
                  var name = "toiletController.nvyong";
                  if (backDataCmd.ack === "1000") {
                    $scope.selectChange($scope.selectChangeFlag, $scope.handlenapeSelectedIndex, $scope.selectIsType);
                    //setting favite
                    var selectedDataTemp = $scope.handlenapeListNape[$scope.handlenapeSelectedIndex];
                    var handleOriginData = selectedDataTemp.handledata;
                    $scope.toilteFaviteTemp = JSON.parse(window.localStorage.toilteFaviteSetting);
                    $scope.toilteFaviteTemp.FRONT_SPRAY_PRESSURE = handleOriginData[0].gearInit;
                    $scope.toilteFaviteTemp.FRONT_SPRAY_POSITION = handleOriginData[1].gearInit;
                    $scope.toilteFaviteTemp.FRONT_SPRAY_TMPT = handleOriginData[2].gearInit;
                    window.localStorage.toilteFaviteSetting = JSON.stringify($scope.toilteFaviteTemp);
                    $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directesuccess"));
                  } else {
                    $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directerror"));
                  };
                } else if (backDataCmd.cmd === "02") {
                  var name = "toiletController.tunxi";
                  if (backDataCmd.ack === "1000") {
                    $scope.selectChange($scope.selectChangeFlag, $scope.handlenapeSelectedIndex, $scope.selectIsType);
                    //setting favite
                    var selectedDataTemp = $scope.handlenapeListNape[$scope.handlenapeSelectedIndex];
                    var handleOriginData = selectedDataTemp.handledata;
                    $scope.toilteFaviteTemp = JSON.parse(window.localStorage.toilteFaviteSetting);
                    $scope.toilteFaviteTemp.REAR_PRESSURE = handleOriginData[0].gearInit;
                    $scope.toilteFaviteTemp.REAR_POSITION = handleOriginData[1].gearInit;
                    $scope.toilteFaviteTemp.REAR_TMPT = handleOriginData[2].gearInit;
                    window.localStorage.toilteFaviteSetting = JSON.stringify($scope.toilteFaviteTemp);
                    $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directesuccess"));
                  } else {
                    $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directerror"));
                  };
                } else if (backDataCmd.cmd === "05") {
                  var name = "toiletController.nuanjiao";
                  if (backDataCmd.ack === "1000") {
                    $scope.selectChange($scope.selectChangeFlag, $scope.handlenapeSelectedIndex, $scope.selectIsType);
                    var selectedDataTemp = $scope.handlenapeListNape[$scope.handlenapeSelectedIndex];
                    var handleOriginData = selectedDataTemp.handledata;
                    $scope.toilteFaviteTemp = JSON.parse(window.localStorage.toilteFaviteSetting);
                    $scope.toilteFaviteTemp.DRYER_POWER = handleOriginData[0].gearInit;
                    window.localStorage.toilteFaviteSetting = JSON.stringify($scope.toilteFaviteTemp);
                    $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directesuccess"));
                  } else {
                    $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directerror"));
                  };
                } else if (backDataCmd.cmd === "06") {
                  var name = "toiletController.quanwen";
                  if (backDataCmd.ack === "1000") {
                    $scope.selectChange($scope.selectChangeFlag, $scope.handlenapeSelectedIndex, $scope.selectIsType);
                    var selectedDataTemp = $scope.handlenapeListNape[$scope.handlenapeSelectedIndex];
                    var handleOriginData = selectedDataTemp.handledata;
                    $scope.toilteFaviteTemp = JSON.parse(window.localStorage.toilteFaviteSetting);
                    $scope.toilteFaviteTemp.SEAT_TMPT = handleOriginData[0].gearInit;
                    window.localStorage.toilteFaviteSetting = JSON.stringify($scope.toilteFaviteTemp);
                    $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directesuccess"));
                  } else {
                    $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directerror"));
                  };
                }
                else if (backDataCmd.cmd === "03") {
                  var name = "toiletController.nuanfeng";
                  if (backDataCmd.ack === "1000") {
                    $scope.selectChange($scope.selectChangeFlag, $scope.handlenapeSelectedIndex, $scope.selectIsType);
                    try {
                      //setting favite
                      var selectedDataTemp = $scope.handlenapeListNape[$scope.handlenapeSelectedIndex];
                      var handleOriginData = selectedDataTemp.handledata;
                      $scope.toilteFaviteTemp = JSON.parse(window.localStorage.toilteFaviteSetting);
                      $scope.toilteFaviteTemp.DRYER_PRESSURE = handleOriginData[0].gearInit;
                      $scope.toilteFaviteTemp.DRYER_TMPT = handleOriginData[1].gearInit;
                      window.localStorage.toilteFaviteSetting = JSON.stringify($scope.toilteFaviteTemp);
                    }catch(e){
                      alert(e.message)
                    };
                    $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directesuccess"));
                  } else {
                    $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directerror"));
                  };
                } else if (backDataCmd.cmd === "11") {
                  var name = "toiletController.arounlight";
                  if (backDataCmd.ack === "1000") {
                    $scope.selectChange($scope.selectChangeFlag, $scope.handlenapeSelectedIndex, $scope.selectIsType);
                    //setting favite
                    var selectedDataTemp = $scope.handlenapeListNape[$scope.handlenapeSelectedIndex];
                    var handleOriginData = selectedDataTemp.handledata;
                    $scope.toilteFaviteTemp = JSON.parse(window.localStorage.toilteFaviteSetting);
                    $scope.toilteFaviteTemp.LIGHT_AMBIENT_BRIGHTNESS = handleOriginData[0].gearInit;
                    window.localStorage.toilteFaviteSetting = JSON.stringify($scope.toilteFaviteTemp);
                    $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directesuccess"));
                  } else {
                    $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directerror"));
                  };
                } else if (backDataCmd.cmd === "18") {
                  var name = "toiletController.tlitelight";
                  if (backDataCmd.ack === "1000") {
                    $scope.selectChange($scope.selectChangeFlag, $scope.handlenapeSelectedIndex, $scope.selectIsType);
                    //setting favite
                    var selectedDataTemp = $scope.handlenapeListNape[$scope.handlenapeSelectedIndex];
                    var handleOriginData = selectedDataTemp.handledata;
                    $scope.toilteFaviteTemp = JSON.parse(window.localStorage.toilteFaviteSetting);
                    $scope.toilteFaviteTemp.LIGHT_BOWL_BRIGHTNESS = handleOriginData[1].gearInit;
                    window.localStorage.toilteFaviteSetting = JSON.stringify($scope.toilteFaviteTemp);
                    $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directesuccess"));
                  } else {
                    $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directerror"));
                  };
                }else if (backDataCmd.cmd === "08") {
                  var name = "toiletController.toiltequan";
                  if (backDataCmd.ack === "1000") {
                    $scope.selectChange($scope.selectChangeFlag, $scope.handlenapeSelectedIndex, $scope.selectIsType);
                    $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directesuccess"));
                  } else {
                    $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directerror"));
                  };
                } else if (backDataCmd.cmd === "17") {
                  var name = "toiletController.clearopen";
                  if (backDataCmd.ack === "1000") {
                    $scope.selectChange($scope.selectChangeFlag, $scope.handlenapeSelectedIndex, $scope.selectIsType);
                    $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directesuccess"));
                  } else {
                    $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directerror"));
                  };
                } else if (backDataCmd.cmd === "15") {
                  var name = "toiletController.clearextend";
                  if (backDataCmd.ack === "1000") {
                    $scope.selectChange($scope.selectChangeFlag, $scope.handlenapeSelectedIndex, $scope.selectIsType);
                    $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directesuccess"));
                  } else {
                    $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directerror"));
                  };
                } else if (backDataCmd.cmd === "0e") {
                  var name = "toiletController.clearinstance";
                  if (backDataCmd.ack === "1000") {
                    $scope.selectChange($scope.selectChangeFlag, $scope.handlenapeSelectedIndex, $scope.selectIsType);
                    $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directesuccess"));
                  } else {
                    $scope.Toast.show($translate.instant(name) + $translate.instant("golabelvariable.directerror"));
                  };
                };
              };
            }else{
              if(backDataCmd.cmd === "98") {
                $scope.currentSlideData = [];
                //get device status
                // if ($scope.tostatustiveOnceFlag === 0) {
                // alert("status");
                // alert("backDataCmd"+angular.toJson(backDataCmd));
                // alert("resultOn" + angular.toJson(resultOn))
                // $scope.tostatustiveOnceFlag++;
                //handle status
                //flush
                // if(backDataCmd.flushStatus === "001"){
                //   $scope.overTiemFlag = false;
                //   if(backDataCmd.flushType === "0"){
                //     $scope.initRecycleCurnt(0);
                //   }else if(backDataCmd.flushType === "1"){
                //     $scope.initRecycleCurnt(1);
                //   };
                // };
                //nv yong
                if(backDataCmd.fontStatus === "1"){
                  $scope.overTiemFlag = false;
                  $scope.initRecycleCurnt(2);
                }else{
                  $scope.initRecycleRedce(2)
                }
                //tun xi
                if(backDataCmd.rearStatus === "1"){
                  $scope.initRecycleCurnt(3);
                  $scope.overTiemFlag = false;
                }else{
                  $scope.initRecycleRedce(3)
                }
                //quan wenxxxx
                // if(backDataCmd.ambientStatus === "1"){
                //   $timeout(function () {
                //     $scope.selectChange("true",4,"0");
                //   },20);
                //   $scope.initTemplate = false;
                // };
                //nuanfen
                if(backDataCmd.dryerStatus === "1"){
                  $scope.initRecycleCurnt(5);
                  $scope.overTiemFlag = false;
                }else{
                  $scope.initRecycleRedce(5)
                }
                //dengguang
                if(backDataCmd.ambientStatus === "1"){
                  $scope.initRecycleCurnt(6);
                  $scope.overTiemFlag = false;
                }else{
                  $scope.initRecycleRedce(6)
                }
                //nuanjiao
                if(backDataCmd.feetHeater === "1"){
                  $scope.initRecycleCurnt(7);
                  $scope.overTiemFlag = false;
                }else{
                  $scope.initRecycleRedce(7)
                }
                // //guangai
                // if(backDataCmd.lidRingStatus === "110"){
                //   $scope.initRecycleCurnt(8);
                //   $scope.overTiemFlag = false;
                // };
                // //fangai
                // if(backDataCmd.lidRingStatus === "011"){
                //   $scope.initRecycleCurnt(9);
                //   $scope.overTiemFlag = false;
                // };
                // //fanquan
                // if(backDataCmd.lidRingStatus === "100"){
                //   $scope.initRecycleCurnt(10);
                //   $scope.overTiemFlag = false;
                // };
                //clear
                if(backDataCmd.wandStatus === "1" || backDataCmd.UVProgressStatus != "0" || backDataCmd.ballValve === "1"){
                  $timeout(function () {
                    $scope.handlenapeListNape[11].selecFlag = !$scope.handlenapeListNape[11].selecFlag;
                    if($scope.handlenapeListNape[11].selecFlag === true){
                      $scope.handlenapeListNape[11].imgUrl = $scope.handlenapeListNape[11].imgSeledUrl;
                    }else{
                      $scope.handlenapeListNape[11].imgUrl = $scope.handlenapeListNape[11].imgUrlTemp;
                    };
                  },30);
                  $scope.overTiemFlag = false;
                  if(backDataCmd.wandStatus === "1"){
                    $scope.toiletController.modelTypeClear === "toiletController.clearextend";
                  }else if(backDataCmd.UVProgressStatus !== "00"){
                    $scope.toiletController.modelTypeClear === "toiletController.clearinstance";
                  }else if(backDataCmd.ballValve === "1"){
                    $scope.toiletController.modelTypeClear === "toiletController.clearopen";
                  };
                }else{
                  if($scope.toiletController.modelTypeClear !== "toiletController.gaunbi"){
                    $scope.handlenapeListNape[11].selecFlag = !$scope.handlenapeListNape[11].selecFlag;
                    if($scope.handlenapeListNape[11].selecFlag === true){
                      $scope.handlenapeListNape[11].imgUrl = $scope.handlenapeListNape[11].imgSeledUrl;
                    }else{
                      $scope.handlenapeListNape[11].imgUrl = $scope.handlenapeListNape[11].imgUrlTemp;
                    };
                  };
                  $scope.toiletController.modelTypeClear = "toiletController.gaunbi";
                };
                // alert("11"+angular.toJson($scope.currentSlideData))
                if($scope.currentSlideData.length>0){
                  $scope.initHtmlTemplate($scope.currentSlideData);
                  setTimeout(function () {
                    $scope.getCurrentObj(0);
                    $scope.clickSlideFlag = true;
                  },20)
                }else{
                  $scope.overTiemFlag = false;
                  $scope.clickSlideFlag = false;
                  $timeout(function () {
                    $scope.currentSlideData = $scope.slideInitData;
                    $scope.hanleInitTemple(12);
                  },20);
                };
                hmsPopup.hideLoading();
                if(backDataCmd.seatedStatus === "1") {
                  $scope.isSeatedStatusFlag = true;
                  $scope.toiletController.deviceUseInfo = $scope.toiletController.useing;
                  $scope.toiletController.deviceinfoflag = true;
                  $scope.Toast.show($translate.instant("toiletController.devicePop") + $translate.instant("golabelvariable.directesuccess"));
                }else if (backDataCmd.seatedStatus === "0") {
                  $scope.isSeatedStatusFlag = false;
                  $scope.toiletController.deviceinfoflag = false;
                  $scope.toiletController.deviceUseInfo = $scope.toiletController.nouse
                  $scope.Toast.show($translate.instant("toiletController.devicePop") + $translate.instant("golabelvariable.directesuccess"));
                } else {
                  $scope.Toast.show($translate.instant("toiletController.devicePop") + $translate.instant("golabelvariable.directerror"));
                };
                // };
              };
            };
            $scope.$apply();
          };
        };
      };
      document.addEventListener('SocketPlugin.receiveTcpData',receiveTcpDatahandle,false);
      $timeout(function(){
        if($scope.overTiemFlag){
          hmsPopup.hideLoading();
          $scope.Toast.show($translate.instant("golabelvariable.loadingdataerrror"));
        };
      },10000);
      $scope.setSingalModalTop = "toiletSingalModalTop";
      $ionicModal.fromTemplateUrl('build/pages/model/hmsModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });
      $scope.openModal = function (type) {
          if(type){
            $scope.value = $scope.ModelvalueNvYTunX;
            $scope.toiletController.handleSelecDes = $scope.toiletController.selectMode;
            $scope.toiletController.modelType = $scope.toiletController.modelTypeNv;
          };
          if(($scope.handlenapeListNape[2].selecFlag || $scope.handlenapeListNape[3].selecFlag) && type){
            $scope.modal.show();
            setTimeout(function () {
              var ele = document.getElementsByClassName("toiletSingalModalTop");
              ele[0].style.top = $scope.screenHeig - 1*$scope.fontSize*$scope.value.length + 'px';
              ele[0].style.minHeight = 1*$scope.fontSize*$scope.value.length + 'px';
            },10)
          }else if($scope.handlenapeListNape[11].selecFlag && type === undefined){
            $scope.modal.show();
            setTimeout(function () {
              var ele = document.getElementsByClassName("toiletSingalModalTop");
              ele[0].style.top = $scope.screenHeig - 1*$scope.fontSize*$scope.value.length + 'px';
              ele[0].style.minHeight = 1*$scope.fontSize*$scope.value.length + 'px';
            },10)
          }else{
            $scope.Toast.show($translate.instant("toiletController.dirpop"));
          };
      };
      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });
      $scope.valueTemp = "";
      $scope.choose = function (val) {
        if($scope.value[0].id === 0){
          for(var i=0;i<$scope.value.length;i++){
            if($scope.value[i].id === val.id){
              $scope.toiletController.modelType = $scope.value[i].des;
            };
          };
        }else if($scope.value[0].id === "clearopen"){
          for(var i=0;i<$scope.value.length;i++){
            if($scope.value[i].id === val.id){
              $scope.toiletController.modelTypeClear = $scope.value[i].des;
            };
          };
        };
        if($scope.value[0].id===0){
          if(val.id !== $scope.valueTemp.id){
            var desTemp="";
            $scope.ModelvalueNvYTunX.forEach(function (item,index) {
              if(val.id === 0){
                desTemp = "脉冲";
              }else if(val.id === 1){
                desTemp = "波动";
              }else if(val.id === 2){
                desTemp = "移动";
              }else if(val.id === 3){
                desTemp = "正常";
              };
            })
            if($scope.handlenapeListNape[2].selecFlag){
              $scope.nvyongIntionCreate("true","女用",desTemp,"ON","1",2);
            }else if($scope.handlenapeListNape[3].selecFlag){
              $scope.nvyongIntionCreate("true","臀洗",desTemp,"ON","1",3);
            }
          };
          $scope.valueTemp = val;
        }else if($scope.value[0].id === "clearopen"){
          if(val.id !== $scope.valueTemp.id){
            var desTemp="";
            $scope.ModelvalueNvYTunX.forEach(function (item,index) {
              if(val.id === "clearopen"){
                desTemp = "openTrap";
              }else if(val.id === "clearextend"){
                desTemp = "openExtendWand";
              }else if(val.id === "clearinstance"){
                desTemp = "openIntelligentSterilization";
              };
            })
            var cmdvalue = getCmd(tolitercmdObj.header,tolitercmdObj.idx,nimi._data[desTemp],tolitercmdObj.ctrId,tolitercmdObj.devId);
            //send instructin
            console.log(cmdvalue);
            // alert("cmdvalue"+cmdvalue)
            $scope.selectChangeFlag = true;
            $scope.selectIsType = "1";
            if(baseConfig.isCloudCtrl){
              var isType = "1";
              $scope.toGetImpleteData(true,cmdvalue,$scope.handlenapeListNape[11].handleDes,11,isType);
            }else{
              cmdService.sendCmd(tolitercmdObj.diviceid, cmdvalue, tolitercmdObj.boxid);
            };
          };
          $scope.valueTemp = val;
        };
        $scope.value = [];
        $scope.modal.hide();
      };

      $scope.goLearn = function () {
        $state.go("toiletLearning");
      }
      $scope.operating = [{
        text:'重命名'
      },{
        text:'移动'
      },{
        text:'解除绑定'
      },{
        text:'机器学习设置'
      }];

      $scope.popover = $ionicPopover.fromTemplateUrl('build/pages/modal/popover.html', {
        scope: $scope
      });

      // .fromTemplateUrl() 方法
      $ionicPopover.fromTemplateUrl('build/pages/model/popover.html', {
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
        if(index==3){
          $scope.goLearn();
        }
      }

    }]);
