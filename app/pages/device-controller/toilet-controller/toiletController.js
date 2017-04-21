angular.module('toiletControlModule')
  .controller('toiletControllerCtrl', [
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
       tongyishujuji
       */
      $scope.toiletController = {
        modelTypeNv:"toiletController.zhengchang",
        modelTypeClear:"toiletController.gaunbi",
        modelType:"toiletController.zhengchang",
        selectMode:"toiletController.handleSelecMode",
        handleSelecDes:"toiletController.handleSelecMode",
        qingjie:"toiletController.qingjie"
      };
      //选择模式和清洁方式
      $scope.ModelvalueNvyong = [{
        id:0,directive:"887709010001014336000074",des:'toiletController.maichong'
      },{id:1,directive:"88770901000101433e00007C",des:'toiletController.bodong'
      },{id:2,directive:"88770901000101433a000078",des:'toiletController.yidong'
      },{id:3,directive:"887709010001014332000070",des:'toiletController.zhengchang'
      }];
      $scope.Modelvaluetunxi= [{
        id:0,irective:"887709040001024336000072",des:'toiletController.maichong'
      },{id:1,directive:"88770902000102433e00007C",des:'toiletController.bodong'
      },{id:2,directive:"88770903000102433a000079",des:'toiletController.yidong'
      },{id:3,directive:"887709010001024352000013",des:'toiletController.zhengchang'
      }];
      //选择模式和清洁方式
      $scope.Clearvalue = [{
        id:"clearopen",directiveopen:"887709060001178000000090",directiveclose:"887709050001170000000013",des:'toiletController.clearopen',
      },{
        id:"clearextend",directiveopen:"887709070001158000000093",directiveclose:"88770908000115000000001C",des:'toiletController.clearextend',
      },{
        id:"clearinstance",directiveopen:"8877090900010E8000000086",directiveclose:"8877090A00010E0000000005",des:'toiletController.clearinstance',
      },{
        id:"guanbi",
        des:'toiletController.gaunbi',
      }];
      $scope.value = [];
       /*
       cehuashuliangdangshu-json
       侧滑转档数量json
       */
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
        des: "风力档位",
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
        des: "水压档位",
        gearNum: 4,
        gearInit: 1,
        gearInitTemp: 1,
        parameterctlFlag: false,
        parNodeid: 'toilet-NvYongSyCtl',
        canves01: "NvYongSycanves01",
        canves02: "NvYongSycanves02",
        canves03: "NvYongSycanves03",
        open:'887709010001012332000010',
        close:'887709010001011332000020',
        directive:{
          init:'887709010001014432000077',
          1:'887709010001014232000071',
          2:'887709010001014432000077',
          3:'887709010001014632000075',
          4:'88770901000101483200007B',
          5:'887709010001014a32000079',
        }
      },
        {
        des:"位置档位",
        gearNum:4,
        gearInit:1,
        gearInitTemp:1,
        parameterctlFlag:false,
        parNodeid:'toilet-NvYongPosCtl',
        canves01:"NvYongSyPoscanves01",
        canves02:"NvYongSyPoscanves02",
        canves03:"NvYongSyPoscanves03",
        directive:{
          init:'887709010001014342000000',
          1:'887709010001014322000060',
          2:'887709010001014342000000',
          3:'887709010001014362000020',
          4:'8877090100010143820000C0',
          5:'8877090100010143a20000E0',
        }
      },{
        des:"温度档位",
        gearNum:5,
        gearInit:1,
        gearInitTemp:1,
        parameterctlFlag:false,
        parNodeid:'toilet-NvYongTemCtl',
        canves01:"NvYongTemcanves01",
        canves02:"NvYongTemcanves02",
        canves03:"NvYongTemcanves03",
        directive:{
          init:'887709010001015332000060',
          1:'887709010001011332000020',
          2:'887709010001013332000000',
          3:'887709010001015332000060',
          4:'887709010001017332000040',
          5:'8877090100010193320000A0',
          6:'88770901000101a332000090',
        }
      }];
      /*
       tunxi-json
       臀洗
       */
      $scope.slideTunBuData =[{
        des: "水压档位",
        gearNum: 4,
        gearInit: 1,
        gearInitTemp: 1,
        parameterctlFlag: false,
        parNodeid: 'toilet-TunBuSyCtl',
        canves01: "TunBuSycanves01",
        canves02: "TunBuSycanves02",
        canves03: "TunBuSycanves03",
        open:'887709010001022332000013',
        close:'887709010001021332000023',
        directive:{
          init:'887709030001024432000076',
          1:'887709020001024232000071',
          2:'887709010001024432000074',
          3:'887709010001024632000076',
          4:'887709010001024832000078',
          5:'887709010001024a3200007A',
        }
      },
        {
          des:"位置档位",
          gearNum:4,
          gearInit:1,
          gearInitTemp:1,
          parameterctlFlag:false,
          parNodeid:'toilet-TunBuPosCtl',
          canves01:"TunBuPosPoscanves01",
          canves02:"TunBuPosPoscanves02",
          canves03:"TunBuPosPoscanves03",
          directive:{
            init:'887709010001024342000003',
            1:'88770908000102432200006A',
            2:'887709070001024342000005',
            3:'887709060001024362000024',
            4:'8877090500010243820000C7',
            5:'8877090400010243a20000E6',
          }
        },{
          des:"温度档位",
          gearNum:5,
          gearInit:1,
          gearInitTemp:1,
          parameterctlFlag:false,
          parNodeid:'toilet-TunBuTemCtl',
          canves01:"TunBuTemTemcanves01",
          canves02:"TunBuTemTemcanves02",
          canves03:"TunBuTemTemcanves03",
          directive:{
            init:'887709010001025332000063',
            1:'887709010001021332000023',
            2:'887709010001023332000003',
            3:'887709010001025332000063',
            4:'887709010001027332000043',
            5:'8877090100010293320000A3',
            6:'88770901000102a332000093',
          }
        }];
      /*
       nuanfeng-json
       暖风
       */
      $scope.slidedryerData =[{
        des: "风力档位",
        gearNum: 4,
        gearInit: 1,
        gearInitTemp: 1,
        parameterctlFlag: false,
        parNodeid: 'toilet-dryerFlCtl',
        canves01: "dryerFlcanves01",
        canves02: "dryerFlcanves02",
        canves03: "dryerFlcanves03",
        open:'887709010001032302000022',
        close:'887709020001031302000011',
        directive:{
          init:'88770908000103440200004C',
          1:'887709070001034202000045',
          2:'887709060001034402000042',
          3:'887709050001034602000043',
          4:'88770904000103480200004C',
          5:'887709030001034a02000049',
        }
      },{
        des: "风温档位",
        gearNum: 5,
        gearInit: 1,
        gearInitTemp: 1,
        parameterctlFlag: false,
        parNodeid: 'toilet-dryerFwCtl',
        canves01: "dryerFwcanves01",
        canves02: "dryerFwcanves02",
        canves03: "dryerFwcanves03",
        directive:{
          init:'887709040001035302000057',
          1:'887709030001031302000010',
          2:'887709020001033302000031',
          3:'887709010001035302000052',
          4:'8877090B0001037302000078',
          5:'8877090A0001039302000099',
          6:'88770909000103a3020000AA',
        }
      }]
      /*
       nuanjiao-json
       暖角
       */
      $scope.slidewarmjData =[{
        des: "风力档位",
        gearNum: 9,
        gearInit: 1,
        gearInitTemp: 1,
        parameterctlFlag: false,
        parNodeid: 'toilet-warmjCtl',
        canves01: "warmjcanves01",
        canves02: "warmjcanves02",
        canves03: "warmjcanves03",
        open:'887709010001032302000022',
        close:'887709020001031302000011',
        directive:{
          // init:'88770908000103440200004C',
          // 1:'887709070001034202000045',
          // 2:'887709060001034402000042',
          // 3:'887709050001034602000043',
          // 4:'88770904000103480200004C',
          // 5:'887709030001034a02000049',
        }
      }];
      /*
       quanwen-json
       圈温
       */
      $scope.slidequanwenData =[{
        des: "温度档位",
        gearNum: 5,
        gearInit: 1,
        gearInitTemp: 1,
        parameterctlFlag: false,
        parNodeid: 'toilet-quanwenCtl',
        canves01: "quanwencanves01",
        canves02: "quanwencanves02",
        canves03: "quanwencanves03",
        open:'887709010001032302000022',
        close:'887709020001031302000011',
        directive:{
          // init:'88770908000103440200004C',
          // 1:'887709070001034202000045',
          // 2:'887709060001034402000042',
          // 3:'887709050001034602000043',
          // 4:'88770904000103480200004C',
          // 5:'887709030001034a02000049',
        }
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
          isManyDirective:false,
          matchdataid:0,
          handledata:$scope.slideInitData,
          directive:"887709010001078000000087",
        },
        {
          imgUrl: "build/img/toilet-controller/xiaochong.png",
          imgSeledUrl: "build/img/toilet-controller/xiaochongseled.png",
          imgUrlTemp:"build/img/toilet-controller/xiaochong.png",
          handleDes: "toiletController.xioachong",
          selecFlag:false,
          matchdataid:1,
          isManyDirective:false,
          handledata:$scope.slideInitData,
          directive:"887709010001070000000007",
        },
        {
          imgUrl: "build/img/toilet-controller/nvyong.png",
          imgSeledUrl: "build/img/toilet-controller/nvyongseled.png",
          imgUrlTemp:"build/img/toilet-controller/nvyong.png",
          handleDes: "toiletController.nvyong",
          selecFlag:false,
          matchdataid:"nvyong",
          isManyDirective:true,
          opendirective:"887709010001012332000010",
          closedirective:"887709010001011332000020",
          handleInitdata:$scope.slideInitData,
          handledata:$scope.slideNvYongData
        },
        {
          imgUrl: "build/img/toilet-controller/tunxi.png",
          imgSeledUrl: "build/img/toilet-controller/tunxiseled.png",
          imgUrlTemp:"build/img/toilet-controller/tunxi.png",
          handleDes: "toiletController.tunxi",
          selecFlag:false,
          matchdataid:"tunxi",
          isManyDirective:true,
          handleInitdata:$scope.slideInitData,
          handledata:$scope.slideTunBuData
        },
        {
          imgUrl: "build/img/toilet-controller/quanwen.png",
          imgSeledUrl: "build/img/toilet-controller/quanwenseled.png",
          imgUrlTemp:"build/img/toilet-controller/quanwen.png",
          handleDes: "toiletController.quanwen",
          isManyDirective:true,
          selecFlag:false,
          matchdataid:4,
          handleInitdata:$scope.slideInitData,
          handledata:$scope.slidequanwenData
        },
        {
          imgUrl: "build/img/toilet-controller/nuanfeng.png",
          imgSeledUrl: "build/img/toilet-controller/nuanfengseled.png",
          imgUrlTemp:"build/img/toilet-controller/nuanfeng.png",
          handleDes: "toiletController.nuanfeng",
          isManyDirective:true,
          selecFlag:false,
          matchdataid:5,
          handleInitdata:$scope.slideInitData,
          handledata:$scope.slidedryerData
        },
        {
          imgUrl: "build/img/toilet-controller/dengguan.png",
          imgSeledUrl: "build/img/toilet-controller/dengguanseled.png",
          imgUrlTemp:"build/img/toilet-controller/dengguan.png",
          handleDes: "toiletController.dengguang",
          isManyDirective:false,
          selecFlag:false,
          matchdataid:6,
        },
        {
          imgUrl: "build/img/toilet-controller/nuanjiao.png",
          imgSeledUrl: "build/img/toilet-controller/nuanjiaoseled.png",
          imgUrlTemp:"build/img/toilet-controller/nuanjiao.png",
          handleDes: "toiletController.nuanjiao",
          selecFlag:false,
          matchdataid:7,
          isManyDirective:true,
          handleInitdata:$scope.slideInitData,
          handledata:$scope.slidewarmjData
        },
        {
          imgUrl: "build/img/toilet-controller/kaigai.png",
          imgSeledUrl: "build/img/toilet-controller/kaigaiseled.png",
          imgUrlTemp:"build/img/toilet-controller/kaigai.png",
          handleDes: "toiletController.guangai",
          matchdataid:8,
          isManyDirective:false,
          selecFlag:false,
          handledata:$scope.slideInitData,
          directive:"887709010001080000000008",
        },{
          imgUrl: "build/img/toilet-controller/fangai.png",
          imgSeledUrl: "build/img/toilet-controller/fangaiseled.png",
          imgUrlTemp:"build/img/toilet-controller/fangai.png",
          handleDes: "toiletController.fangai",
          matchdataid:9,
          isManyDirective:false,
          selecFlag:false,
          handledata:$scope.slideInitData,
          directive:"887709010001084000000048",
        },{
          imgUrl: "build/img/toilet-controller/fanquan.png",
          imgSeledUrl: "build/img/toilet-controller/biangaiseled.png",
          imgUrlTemp:"build/img/toilet-controller/fanquan.png",
          handleDes: "toiletController.fanquan",
          matchdataid:10,
          isManyDirective:false,
          selecFlag:false,
          handledata:$scope.slideInitData,
          directive:"887709010001088000000088",
        },
        {
          imgUrl: "build/img/toilet-controller/fangai.png",
          imgSeledUrl: "build/img/toilet-controller/fangaiseled.png",
          imgUrlTemp:"build/img/toilet-controller/fangai.png",
          handleDes: "toiletController.qingjie",
          matchdataid:"clear",
          isManyDirective:false,
          selecFlag:false,
          handledata:$scope.slideInitData,
        },
        {
          imgUrl: "build/img/toilet-controller/shezhi.png",
          imgSeledUrl: "build/img/toilet-controller/shezhiseled.png",
          imgUrlTemp:"build/img/toilet-controller/shezhi.png",
          handleDes: "toiletController.shezhi",
          matchdataid:12,
          selecFlag:false
        },
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
        if($('#ionSliderBox').children().length !== 0){
          $('#ionSliderBox').empty();
        };
        // on-slide-changed='slideHasChanged($index)'>
        var checHtml =
          "<ion-slide-box ng-init='lockSlide()' does-continue = 'true' ng-click='nextSlide($index)'>"+
          "<ion-slide ng-repeat='list in currentSlideData track by $index'>"+
          "<div id={{list.parNodeid}} class='toilet-parameterctl'>"+
          "<canvas id={{list.canves01}} class='canves-pos'></canvas>"+
          "<canvas id={{list.canves02}} class='canves-pos'></canvas>"+
          "<canvas id={{list.canves03}} class='canves-pos'></canvas>"+
          "<canvas id={{list.canves04}} class=''canves-pos'></canvas>"+
          "<div class='toilet-parameterctl-data' ng-if='!list.parameterctlFlag'>"+
          "<span class='toilet-parameterctl-raddata' ng-bind='list.gearInit'></span>"+
          "<span class='toilet-parameterctl-des' ng-bind='list.des'></span>"+
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
        $('#ionSliderBox').append($checkhtml[0])
      };

      $scope.initHtmlTemplate($scope.currentSlideData);
      /**
       *@autor:gongke
       *@name:
       *@params:
       *@disc:goback
       */
      var initCircle = function (slideDataObj) {
        //获取父元素高度
        this.canvsscreenHeight = document.getElementById(slideDataObj.parNodeid).offsetHeight;
        this.canvsscreenWidth = document.getElementById(slideDataObj.parNodeid).offsetWidth;
        this.rateInit = document.documentElement.clientWidth / 7.5;

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
        // this.cr4 = getCanvesObj(slideDataObj.canves04);//颜色填充档位canves
        //四种圆
        this.deliverCircle = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2,color:"#2F3538"};//档位圆
        this.HideCircle = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2-0.4*this.rateInit,color:"black"};//档位圆
        this.deliverLine = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2,color:"black"};//档位线
        this.rollCircle = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2-0.2*this.rateInit,color:"white"};//小球圆
        this.FillCircle = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2,color:"#6ACBB3"};//填充圆
        // this.bimianCircle = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2-30,color:"black"};//防触点
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
          // drawRadian(this.cr4,this.bimianCircle,0,360);
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
                  slideDataObj.gearInit = 1;
                }else{
                  slideDataObj.gearInit = this.i;
                };
                $scope.$apply();
                //画档位线
                this.j=1;
                for(this.j;this.j<this.i;this.j++){
                  drawRadian(this.cr3,this.deliverLine,this.radSectionArr[this.i-this.j-1]-1,this.radSectionArr[this.i-this.j-1]);
                };
              }else{
                this.stoPosPoint = this.i;
                slideDataObj.gearInit = this.i+1;
                $scope.$apply();
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
              this.drawCircleFill(this.cr3,ancr)
            }
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
          currentRadObj.i=0;
          currentRadObj.j=0;
          currentRadObj.stoPosPoint=0;
          currentRadObj.gearInit = $scope.currentSlideData[index].gearInitTemp;
          $scope.currentSlideData[index].gearInit = $scope.currentSlideData[index].gearInitTemp;
          //当前绑定事件对象
          var currentEventObj = getIdObj($scope.currentSlideData[index].canves02);
          currentRadObj.drawDeliverCircle($scope.currentSlideData[index].gearNum);

          if($scope.currentSlideData[index].des === "init"){
            currentRadObj.drawc(currentRadObj.cr2,405,"type");
            currentRadObj.drawCircleFill(currentRadObj.cr2,405);
            //初始化数据
            $('.slider-pager').empty();
          }else{
            currentRadObj.drawc(currentRadObj.cr2,currentRadObj.starRad,"type");
            currentEventObj.addEventListener( 'touchstart', function( e ){
              e.preventDefault();
              var poi = getEvtLocation(e);
              bginX = poi.x;
              bginY = poi.y;
            }, false );
            currentEventObj.addEventListener( 'touchmove', function( e ){
              e.preventDefault();
              var poi = getEvtLocation(e);
              currentRadObj.drawc(currentRadObj.cr2,getAngle(currentRadObj.canvsscreenHeight,currentRadObj.canvsscreenWidth,poi.x,poi.y));
            }, false );
            currentEventObj.addEventListener( 'touchend', function( e ){
              e.preventDefault();
              currentRadObj.drawc(currentRadObj.cr2,currentRadObj.radSectionArr[currentRadObj.stoPosPoint]);
              //档位滑动执行发指令操作
              $scope.radScrollSendDir();
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
        $scope.getCurrentObj(0);
        $scope.nextSlide = function() {
           var sliderLenght = document.querySelectorAll('ion-slide').length;
           if(sliderLenght !== 1){
            $ionicSlideBoxDelegate.next();
            $scope.getCurrentObj($ionicSlideBoxDelegate.currentIndex());
          };
        };
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



      //保存选择的数据项
      $scope.handleRadSelected;
      $scope.handlenapeSelectedIndex;
      //档位滑动执行发指令操作
      $scope.radScrollSendDir = function () {
        if($scope.handlenapeListNape[$scope.handlenapeSelectedIndex].isManyDirective){
          var selectRad = $scope.handlenapeListNape[$scope.handlenapeSelectedIndex].handledata[$scope.handleRadSelected].gearInit;
          var dirinfo = $scope.handlenapeListNape[$scope.handlenapeSelectedIndex].handledata[$scope.handleRadSelected].directive[selectRad];
          var diedes = $scope.handlenapeListNape[$scope.handlenapeSelectedIndex].handledata[$scope.handleRadSelected].des;
          var cmdvalue = dirinfo;
          // 发送指令
          // $scope.sendCmd(cmdvalue,diedes);
        }
      };
      //处理选择怎加border
      var handlenapeListNapeLen = $scope.handlenapeListNape.length;
      $scope.selectNapes = function (index) {
        $scope.handlenapeSelectedIndex = index;
        if($scope.handlenapeListNape[index].matchdataid === 12){
          $state.go("toiletSetting");
        }else {
          $timeout(function () {
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
            if(!$scope.handlenapeListNape[index].isManyDirective){
              $timeout(function () {
                $scope.handlenapeListNape[index].selecFlag = false;
                $scope.handlenapeListNape[index].imgUrl = $scope.handlenapeListNape[index].imgUrlTemp;
                $scope.$apply()
                $scope.handlenapeSelectedIndex = undefined;
              },2000)
            };
          },3000)

          // $scope.handlenapeListNape[index].selecFlag = !$scope.handlenapeListNape[index].selecFlag;
          // for(var i=0;i<handlenapeListNapeLen;i++){
          //   if(i !== index){
          //     $scope.handlenapeListNape[i].selecFlag = false;
          //   };
          // };
          // if($scope.handlenapeListNape[index].selecFlag === true){
          //   $scope.handlenapeListNape[index].imgUrl = $scope.handlenapeListNape[index].imgSeledUrl;
          //    for(var i=0;i<handlenapeListNapeLen;i++){
          //      if(i !== index){
          //        $scope.handlenapeListNape[i].imgUrl = $scope.handlenapeListNape[i].imgUrlTemp;
          //      }
          //    };
          // }else{
          //   $scope.handlenapeListNape[index].imgUrl = $scope.handlenapeListNape[index].imgUrlTemp;
          // };
          // 根据选择项来初始化选择项的
          if($scope.handlenapeListNape[index].handledata){
            $scope.currentSlideData = $scope.handlenapeListNape[index].handledata;
            $scope.initHtmlTemplate($scope.currentSlideData);
            setTimeout(function () {
              $scope.getCurrentObj(0);
               //处理指令数据
              //处理女用和臀洗的模式选择
              if($scope.handlenapeListNape[index].matchdataid === "nvyong" || $scope.handlenapeListNape[index].matchdataid === "tunxi"){
                  if($scope.handlenapeListNape[index].matchdataid === "nvyong"){
                    $scope.value = $scope.ModelvalueNvyong;
                  }else{
                    $scope.value = $scope.Modelvaluetunxi;
                  };
                  $scope.toiletController.handleSelecDes = $scope.toiletController.selectMode;
                  $scope.toiletController.modelType = $scope.toiletController.modelTypeNv;
              };
              if($scope.handlenapeListNape[index].matchdataid === "clear"){
                $scope.value = $scope.Clearvalue;
                $scope.toiletController.handleSelecDes = $scope.toiletController.qingjie;
                $scope.toiletController.modelType = $scope.toiletController.modelTypeClear;
                $scope.$apply();
              }else{
                if($scope.handlenapeListNape[index])
                  if(!$scope.handlenapeListNape[index].isManyDirective){
                    var cmdvalue = $scope.handlenapeListNape[index].directive;
                    var dirdes = "";
                  }else {
                    // 初始化
                    if($scope.handlenapeListNape[index].selecFlag){
                      var cmdvalue = $scope.handlenapeListNape[index].handledata[0].open;
                      var dirdes = "";
                    }else{
                      var cmdvalue = $scope.handlenapeListNape[index].handledata[0].close;
                      var dirdes = "";

                    }
                  }
                // 发送指令l
                // 一次性动作的指令发出后修改选中的高亮
                // $scope.sendCmd(cmdvalue,"");
                //发送默认值指令
                if($scope.handlenapeListNape[index].isManyDirective){
                  var cmdvalue = $scope.handlenapeListNape[index].handledata[$scope.handleRadSelected].directive.init;
                  // $scope.sendCmd(cmdvalue,"");
                }
              }
            },20)
          }
        };
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
      $scope.openModal = function () {
        if($scope.handlenapeSelectedIndex !== undefined){
          var permitopen = $scope.handlenapeListNape[$scope.handlenapeSelectedIndex].matchdataid;
          if(permitopen === "nvyong" || permitopen === "tunxi" || permitopen === "clear"){
            $scope.modal.show();
            setTimeout(function () {
              var ele = document.getElementsByClassName("hmsModal");
              if ($scope.value.length === 3) {
                ele[0].style.top = $scope.screenHeig - 156 + 'px';
              } else if ($scope.value.length === 4) {
                ele[0].style.top = $scope.screenHeig - 208 + 'px';
              } else if ($scope.value.length === 2) {
                ele[0].style.top = $scope.screenHeig - 104 + 'px';
              } else if ($scope.value.length === 1) {
                ele[0].style.top = $scope.screenHeig - 52 + 'px';
              } else if ($scope.value.length > 4) {
                ele[0].style.top= 68 + '%';
                ele[0].style.minHeight = 32 + '%';
              };
            }, 10)
          }else{
            hmsPopup.showShortCenterToast("此选项不能设置此功能!");
          }
        }else{
          hmsPopup.showShortCenterToast("没有选择项不能使用!");
        };
      };
      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });

      $scope.valueTemp = "";
      $scope.choose = function (val) {
        for(var i=0;i<$scope.value.length;i++){
          if($scope.value[i].id === val.id){
            $scope.toiletController.modelType = $scope.value[i].des;
          }
        };
        if($scope.handlenapeListNape[$scope.handlenapeSelectedIndex].matchdataid === "nvyong" || $scope.handlenapeListNape[$scope.handlenapeSelectedIndex].matchdataid === "tunxi"){
          if(val.id !== $scope.valueTemp.id){
            $scope.sendCmd(val.directive,"");
          }
          // $scope.sendCmd(val.directive,"");
          $scope.valueTemp = val;
        }else if($scope.handlenapeListNape[$scope.handlenapeSelectedIndex].matchdataid === "clear"){
          if(val.id==="guanbi"){
            if($scope.valueTemp.directiveclose){
              // console.log("colse")
              // console.log($scope.valueTemp.directiveclose)
              $scope.sendCmd($scope.valueTemp.directiveclose,"")
            };
          }else{
            // console.log("open")
            // console.log(val.directiveclose)
            $scope.sendCmd(val.directiveopen,"");
          };
          // if(val.id !=="guanbi"){
            $scope.valueTemp = val;
          // }
        };
        $scope.modal.hide();
      };
    }]);
