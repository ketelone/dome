angular.module('toiletControlModule')
  .controller('toiletControllerCtrl', [
    '$scope',
    '$state',
    '$ionicModal',
    '$compile',
    'baseConfig',
    'checkVersionService',
    '$ionicHistory',
    function ($scope,
              $state,
              $ionicModal,
              $compile,
              baseConfig,
              checkVersionService,
              $ionicHistory
    ) {
      //返回上一页
      $scope.goBack=function () {
        $ionicHistory.goBack();

      }
      /*
       tongyishujuji
       */
      $scope.toiletController = {
        modelType:"toiletController.zhengchang",
      };
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
        onceactionDir:[{
          cmdDes:"大冲",
          cmd: {
            from: {
              cid: "0xE3",
            },
            idx: 1,
            method: "CTL",
            payload: {
              cmd: "CMD_REQUEST",
              "device_type": "BLE_DEVICE",
              value: ["887709010001078000000087"],
            },
            to: {
              cid: "0xE4",
              "device_id": "29DF7606",
            },
            ts: "1492146861.217451",
            ver: 1,
          }
        },{
          cmdDes:"小冲",
          cmd: {
            from: {
              cid: "0xE3",
            },
            idx: 1,
            method: "CTL",
            payload: {
              cmd: "CMD_REQUEST",
              "device_type": "BLE_DEVICE",
              value: ["887709010001070000000007"],
            },
            to: {
              cid: "0xE4",
              "device_id": "29DF7606",
            },
            ts: "1492146861.217451",
            ver: 1,
          }
        }],
        allopendirective:{
          cmdDes:"打开",
          cmd: {
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
              "device_id": "29DF7606",
            },
            ts: "1492146861.217451",
            ver: 1,
          }
        },
        allclosedirective:{
          cmdDes:"关闭",
          cmd: {
            from: {
              cid: "0xE3",
            },
            idx: 1,
            method: "CTL",
            payload: {
              cmd: "CMD_REQUEST",
              "device_type": "BLE_DEVICE",
              value: ["887709010001070000000007"],
            },
            to: {
              cid: "0xE4",
              "device_id": "29DF7606",
            },
            ts: "1492146861.217451",
            ver: 1,
          }
        }
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
          0:'887709010001011332000020',
          1:'887709010001013332000000',
          2:'887709010001015332000060',
          3:'887709010001017332000040',
          4:'8877090100010193320000A0',
          5:'88770901000101a332000090',
        }
      }];
      /*
       tunxi-json
       臀洗
       */
      $scope.slideTunBuData =[{
        des: "tun水压档位",
        gearNum: 5,
        gearInit: 1,
        gearInitTemp: 1,
        parameterctlFlag: false,
        parNodeid: 'toilet-TunBuSyCtl',
        canves01: "TunBuSycanves01",
        canves02: "TunBuSycanves02",
        canves03: "TunBuSycanves03",
      },
        {
          des:"tun位置档位",
          gearNum:5,
          gearInit:1,
          gearInitTemp:1,
          parameterctlFlag:false,
          parNodeid:'toilet-TunBuPosCtl',
          canves01:"TunBuPosPoscanves01",
          canves02:"TunBuPosPoscanves02",
          canves03:"TunBuPosPoscanves03"
        },{
          des:"tun温度档位",
          gearNum:6,
          gearInit:1,
          gearInitTemp:1,
          parameterctlFlag:false,
          parNodeid:'toilet-TunBuTemCtl',
          canves01:"TunBuTemTemcanves01",
          canves02:"TunBuTemTemcanves02",
          canves03:"TunBuTemTemcanves03",
        }];
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
          handledata:$scope.slideInitData
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
          matchdataid:3,
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
          matchdataid:4,
        },
        {
          imgUrl: "build/img/toilet-controller/nuanfeng.png",
          imgSeledUrl: "build/img/toilet-controller/nuanfengseled.png",
          imgUrlTemp:"build/img/toilet-controller/nuanfeng.png",
          handleDes: "toiletController.nuanfeng",
          isManyDirective:true,
          selecFlag:false,
          matchdataid:5,
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
          handledata:$scope.slideNuanjioaData
        },
        {
          imgUrl: "build/img/toilet-controller/kaigai.png",
          imgSeledUrl: "build/img/toilet-controller/kaigaiseled.png",
          imgUrlTemp:"build/img/toilet-controller/kaigai.png",
          handleDes: "toiletController.guangai",
          matchdataid:8,
          isManyDirective:false,
          selecFlag:false
        },
        {
          imgUrl: "build/img/toilet-controller/fangai.png",
          imgSeledUrl: "build/img/toilet-controller/fangaiseled.png",
          imgUrlTemp:"build/img/toilet-controller/fangai.png",
          handleDes: "toiletController.fangai",
          matchdataid:9,
          isManyDirective:false,
          selecFlag:false
        },
        {
          imgUrl: "build/img/toilet-controller/fanquan.png",
          imgSeledUrl: "build/img/toilet-controller/biangaiseled.png",
          imgUrlTemp:"build/img/toilet-controller/fanquan.png",
          handleDes: "toiletController.fanquan",
          matchdataid:10,
          isManyDirective:false,
          selecFlag:false
        },
        {
          imgUrl: "build/img/toilet-controller/shezhi.png",
          imgSeledUrl: "build/img/toilet-controller/shezhiseled.png",
          imgUrlTemp:"build/img/toilet-controller/shezhi.png",
          handleDes: "toiletController.shezhi",
          hanleDesTemp:"设置",
          selecFlag:false
        },
      ];
      /**
       set dang qian ce hau shu ju zhi
       设置当前侧滑数据为侧滑初始化数据
       */
      $scope.currentSlideData = $scope.slideInitData;
      /**
       init dang qian mo ban shu ju
       初始化当前模板数据
       */
      $scope.initHtmlTemplate = function (currentSlideData) {
        /**
         init silde-box data
         初始化slide-box数据
         */
        if($('#ionSliderBox').children().length !== 0){
          $('#ionSliderBox').empty();
        };
        var checHtml =
          "<ion-slide-box overflow-scroll='false' on-slide-changed='slideHasChanged($index)'>"+
          "<ion-slide overflow-scroll='false' ng-repeat='list in currentSlideData track by $index'>"+
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
        $('#ionSliderBox').append($checkhtml[0]);
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
        // 设置每个canves的宽高
        document.getElementById(slideDataObj.canves01).height = this.canvsscreenHeight;
        document.getElementById(slideDataObj.canves01).width = this.canvsscreenWidth;
        document.getElementById(slideDataObj.canves01).style.zIndex = 1;
        document.getElementById(slideDataObj.canves02).height = this.canvsscreenHeight;
        document.getElementById(slideDataObj.canves01).width = this.canvsscreenWidth;
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
        this.HideCircle = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2-20,color:"black"};//档位圆
        this.deliverLine = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2,color:"black"};//档位线
        this.rollCircle = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2-10,color:"white"};//小球圆
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
            canvesobj.arc(x,y,10,0,Math.PI*2,false);
            canvesobj.fill();
            canvesobj.closePath();
            //画小球中的指示标识
            canvesobj.beginPath();
            canvesobj.fillStyle = "#191C23";
            canvesobj.lineWidth = 1;//设置线宽
            canvesobj.moveTo(x,y-(10/4));
            canvesobj.lineTo(x-(10/4)/Math.sqrt(2)-1,y);
            canvesobj.lineTo(x,y+(10/4));
            canvesobj.fill();//填充颜色
            canvesobj.moveTo(x+1,y-(10/4));
            canvesobj.lineTo(x+(10/4)/Math.sqrt(2)+2,y);
            canvesobj.lineTo(x+1,y+(10/4));
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
        $scope.slideHasChanged = function (index) {

          $scope.getCurrentObj(index);
        };
      },20);

      //发送指令
      $scope.sendCmd = function (cmd,des) {
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
        // console.log(currentRadObj）
        if($scope.handlenapeListNape[$scope.handlenapeSelectedIndex].isManyDirective){
          var selectRad = $scope.handlenapeListNape[$scope.handlenapeSelectedIndex].handledata[$scope.handleRadSelected].gearInit;
          var dirinfo = $scope.handlenapeListNape[$scope.handlenapeSelectedIndex].handledata[$scope.handleRadSelected].directive[selectRad];
          var diedes = $scope.handlenapeListNape[$scope.handlenapeSelectedIndex].handledata[$scope.handleRadSelected].des;
        }
        var objdir = {
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
            "device_id": "29DF7606",
          },
          ts: "1492146861.217451",
          ver: 1,
        };
        objdir.payload.value.push(dirinfo);
        // 发送指令
        $scope.sendCmd(objdir,diedes);
      };



      //处理选择怎加border
      var handlenapeListNapeLen = $scope.handlenapeListNape.length;
      $scope.selectNapes = function (index) {

        $scope.handlenapeSelectedIndex = index;

        if($scope.handlenapeListNape[index].hanleDesTemp === "设置"){
          $state.go("toiletSetting");
        }else {
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
          }
          // 根据选择项来初始化选择项的
          if($scope.handlenapeListNape[index].handledata){
            $scope.currentSlideData = $scope.handlenapeListNape[index].handledata;
            $scope.initHtmlTemplate($scope.currentSlideData);
            setTimeout(function () {
              $scope.getCurrentObj(0);
              // console.log(currentRadObj)allopendirective
               if(!$scope.handlenapeListNape[index].isManyDirective){
                 console.log($scope.handlenapeListNape[index].handledata[0].onceactionDir[index])
                  var dirinfo = $scope.handlenapeListNape[index].handledata[0].onceactionDir[index].cmd;
                  var dirdes = $scope.handlenapeListNape[index].handledata[0].onceactionDir[index].cmdDes;
               }else {
                 // 初始化
                 $scope.handlenapeListNape[index].handleInitdata[0].allopendirective.cmd.payload.value =[];
                 $scope.handlenapeListNape[index].handleInitdata[0].allclosedirective.cmd.payload.value =[];

                 if($scope.handlenapeListNape[index].selecFlag){
                   $scope.handlenapeListNape[index].handleInitdata[0].allopendirective.cmd.payload.value.push($scope.handlenapeListNape[index].opendirective);
                   var dirinfo = $scope.handlenapeListNape[index].handleInitdata[0].allopendirective;
                   var dirdes = "";
                 }else{
                   $scope.handlenapeListNape[index].handleInitdata[0].allclosedirective.cmd.payload.value.push($scope.handlenapeListNape[index].closedirective);
                   var dirinfo = $scope.handlenapeListNape[index].handleInitdata[0].allclosedirective;
                   var dirdes = "";
                 }
               }
              // 发送指令
              $scope.sendCmd(dirinfo,dirdes);
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
      $scope.value = [{id:2,des:'toiletController.maichong'},
        {id:3,des:'toiletController.bodong'},{id:4,des:'toiletController.yidong'},{id:5,des:'toiletController.zhengchang'}
      ];
      $scope.openModal = function () {
        if($scope.value.length!==0) {
          $scope.modal.show();
          setTimeout(function () {
            var ele = document.getElementsByClassName("hmsModal");
            ele[0].style.top = 68 + '%';
            ele[0].style.minHeight = 61 + '%';
          }, 10)
        }
      };
      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });
      $scope.choose = function (val) {
        $scope.modal.hide();
        for(var i=0;i<$scope.value.length;i++){
          if($scope.value[i].id === val.id){
            $scope.toiletController.modelType = $scope.value[i].des;
          }
        };
      };
    }]);
