angular.module('airfoilShowerModule')
  .controller('airfoilShowerCtrl', [
    '$scope',
    '$state',
    '$ionicSlideBoxDelegate',
    'publicMethod',
    'hmsPopup',
    '$ionicModal',
    '$compile',
    'baseConfig',
    'checkVersionService',
    'airfoilShowerService',
    '$timeout',
    '$stateParams',
    'hmsHttp',
    'cmdService',
    function ($scope,
              $state,
              $ionicSlideBoxDelegate,
              publicMethod,
              hmsPopup,
              $ionicModal,
              $compile,
              baseConfig,
              checkVersionService,
              airfoilShowerService,
              $timeout,
              $stateParams,
              hmsHttp,
              cmdService
    ) {
      $scope.goBack = function () {
        publicMethod.goBack();
      };

      $scope.currentWaterTemperate = 0;

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
        canves03: "initcanves03"
      }]

      $scope.slideWaterData =
        [{
        des: "水温",
        gearNum: 19,
        gearInit: 1,
        gearInitTemp: 1,
        currentTemp: 30,
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
          5:'887709010001014a32000079'
        }
      }];

      /**
       gongnenglist-json
       功能列表数据
       **/
      $scope.handlenapeListNape = [
        {
          imgUrl: "build/img/airfoil-shower/water_nor.png",
          imgSeledUrl: "build/img/airfoil-shower/water.png",
          imgUrlTemp:"build/img/airfoil-shower/water_nor.png",
          handleDes: "airfoidShower.getWater",
          selecFlag:false,
          matchdataid:"water",
          isManyDirective:true,
          opendirective:"887709010001012332000010",
          closedirective:"887709010001011332000020",
          handleInitdata:$scope.slideInitData,
          handledata:$scope.slideWaterData
        },
        {
          imgUrl: "build/img/airfoil-shower/stop_nor.png",
          imgSeledUrl: "build/img/airfoil-shower/stop.png",
          imgUrlTemp:"build/img/airfoil-shower/stop_nor.png",
          handleDes: "airfoidShower.allStop",
          matchdataid:"clear",
          isManyDirective:false,
          selecFlag:false,
          handledata:$scope.slideInitData
        },
        {
          imgUrl: "build/img/airfoil-shower/setting_nor.png",
          imgSeledUrl: "build/img/airfoil-shower/setting.png",
          imgUrlTemp:"build/img/airfoil-shower/setting_nor.png",
          handleDes: "airfoidShower.setting",
          matchdataid:12,
          selecFlag:false
        }
      ];
      /**
       *
       set dang qian ce hau shu ju zhi
       设置当前侧滑数据为侧滑初始化数据
       */
      //$scope.currentSlideData = $scope.slideInitData;
      $scope.currentSlideData = $scope.slideWaterData;
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
          "<div ng-init='lockSlide()' does-continue = 'true' ng-click='nextSlide($index)'>"+
          "<div ng-repeat='list in currentSlideData track by $index'>"+
          "<div id={{list.parNodeid}} class='toilet-parameterctl'>"+
          "<canvas id={{list.canves01}} class='canves-pos'></canvas>"+
          "<canvas id={{list.canves02}} class='canves-pos'></canvas>"+
          "<canvas id={{list.canves03}} class='canves-pos'></canvas>"+
          "<canvas id={{list.canves04}} class='canves-pos'></canvas>"+
          "<div class='toilet-parameterctl-data' ng-if='!list.parameterctlFlag'>"+
          "<span class='toilet-parameterctl-raddata' ng-bind='list.currentTemp'></span>"+
          "<span class='toilet-parameterctl-des' ng-bind='list.des'></span>"+
          "<span class='toilet-parameterctl-des' ng-bind='list.gearInit + 29'></span>"+
          "</div>"+
          //"<div class='toilet-parameterctl-dataimg' ng-if='!list.parameterctlFlag'>"+
          //"<img class='conninfo-parameterctl-img' ng-src='build/img/toilet-controller/btn_devicedetail_scoll.png' alt=''>"+
          //"</div>"+
          "</div>"+
          "</div>"+
          "</div>"
        /**
         bian yi html 数据
         编译html数据
         */
        var $checkhtml = $compile(checHtml)($scope); // 编译
        $('#ionSliderBox').append($checkhtml[0])
      };

      $scope.$watch('currentSlideData', function(){

      }, false);

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
        this.cr1 = getCanvesObj(slideDataObj.canves01);
        this.cr2 = getCanvesObj(slideDataObj.canves02);
        this.cr3 = getCanvesObj(slideDataObj.canves03);
        this.deliverCircle = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2,color:"#2F3538"};
        this.HideCircle = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2-0.4*this.rateInit,color:"black"};
        this.deliverLine = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2,color:"black"};
        this.rollCircle = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2-0.2*this.rateInit,color:"white"};
        this.FillCircle = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2,color:"#6ACBB3"};
        this.i=0;this.j=0;
        this.stoPosPoint=0;
        this.starRad=135;
        this.radSectionArr=[];
        this.radRange;
        this.drawDeliverCircle = function (n) {
          this.radRange = (270-(n-1))/n;
          this.radSectionArr.push(this.starRad);
          var tempstrAngle = this.starRad;
          for(var k=1;k<=n;k++){
            drawRadian(this.cr1,this.deliverCircle,tempstrAngle,tempstrAngle+this.radRange);
            tempstrAngle = tempstrAngle+this.radRange+1;
            this.radSectionArr.push(tempstrAngle);
          };
          drawRadian(this.cr1,this.HideCircle,0,360);
          // drawRadian(this.cr4,this.bimianCircle,0,360);
        };
        this.drawCircleFill = function (canvesobj,changeRad) {
          canvesobj.clearRect(0,0,this.canvsscreenHeight,this.canvsscreenWidth);
          drawRadian(canvesobj,this.FillCircle,this.starRad,changeRad);
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
          var radSectionArrLen = this.radSectionArr.length;
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
                this.j=1;
                for(this.j;this.j<this.i;this.j++){
                  drawRadian(this.cr3,this.deliverLine,this.radSectionArr[this.i-this.j-1]-1,this.radSectionArr[this.i-this.j-1]);
                };
              }else{
                this.stoPosPoint = this.i;
                slideDataObj.gearInit = this.i+1;
                $scope.$apply();
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
        $scope.handleRadSelected;
        $scope.getCurrentObj = function (index) {
          $scope.handleRadSelected = index;
          currentRadObj = new initCircle($scope.currentSlideData[index]);
          currentRadObj.i=0;
          currentRadObj.j=0;
          currentRadObj.stoPosPoint=0;
          currentRadObj.gearInit = $scope.currentSlideData[index].gearInitTemp;
          $scope.currentSlideData[index].gearInit = $scope.currentSlideData[index].gearInitTemp;
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
            //$ionicSlideBoxDelegate.next();
            //$scope.getCurrentObj($ionicSlideBoxDelegate.currentIndex());
          }
        };
      },20);

      //保存选择的数据项
      $scope.handleRadSelected;
      $scope.handlenapeSelectedIndex;
      //档位滑动执行发指令操作
      var count = 1;

      $scope.radScrollSendDir = function () {

        if($scope.handlenapeListNape[0].selecFlag){
          if($scope.handlenapeListNape[$scope.handlenapeSelectedIndex].isManyDirective && (count%2 == 1)){
            var selectRad = $scope.handlenapeListNape[$scope.handlenapeSelectedIndex].handledata[$scope.handleRadSelected].gearInit;
            var dirinfo = $scope.handlenapeListNape[$scope.handlenapeSelectedIndex].handledata[$scope.handleRadSelected].directive[selectRad];
            var diedes = $scope.handlenapeListNape[$scope.handlenapeSelectedIndex].handledata[$scope.handleRadSelected].des;
            var cmdvalue = dirinfo;
            var temperate = $scope.handlenapeListNape[$scope.handlenapeSelectedIndex].handledata[$scope.handleRadSelected].gearInit + 29;
            getWater(temperate.toString(16));
            localStorage.airfoilTemperate = temperate;
          }
          count = count + 1;
        }
      };
      //处理选择怎加border
      var handlenapeListNapeLen = $scope.handlenapeListNape.length;
      $scope.selectNapes = function (index) {
        $scope.handlenapeSelectedIndex = index;
        if($scope.handlenapeListNape[index].matchdataid === 12){
          $state.go("airfoilShowerSetting");
        }else {
          $scope.handlenapeListNape[index].selecFlag = !$scope.handlenapeListNape[index].selecFlag;
          for(var i=0;i<handlenapeListNapeLen;i++){
            if(i !== index){
              $scope.handlenapeListNape[i].selecFlag = false;
            }
          }
          if($scope.handlenapeListNape[index].selecFlag === true){
            $scope.handlenapeListNape[index].selecFlag = false;
            //$scope.handlenapeListNape[index].imgUrl = $scope.handlenapeListNape[index].imgSeledUrl;
            for(var i=0;i<handlenapeListNapeLen;i++){
              if(i !== index){
                $scope.handlenapeListNape[i].imgUrl = $scope.handlenapeListNape[i].imgUrlTemp;
              }
            }
          }else{
            $scope.handlenapeListNape[index].imgUrl = $scope.handlenapeListNape[index].imgUrlTemp;
          };
          // 根据选择项来初始化选择项的
          if($scope.handlenapeListNape[index].handledata){
            //$scope.currentSlideData = $scope.handlenapeListNape[index].handledata;
            //$scope.initHtmlTemplate($scope.currentSlideData);
            setTimeout(function () {
              $scope.getCurrentObj(0);
              if($scope.handlenapeListNape[index].matchdataid === "water"){
                getWater();
              }
              if($scope.handlenapeListNape[index].matchdataid === "clear"){
                closeFunction();
                $timeout(function () {
                  $scope.handlenapeListNape[index].imgUrl = $scope.handlenapeListNape[index].imgUrlTemp;
                  $scope.handlenapeListNape[index].selecFlag = false;
                }, 1000);
              }else{
                if($scope.handlenapeListNape[index])
                  if(!$scope.handlenapeListNape[index].isManyDirective){
                    var cmdvalue = $scope.handlenapeListNape[index].directive;
                    var dirdes = "";
                  }else {
                    if($scope.handlenapeListNape[index].selecFlag){
                      var cmdvalue = $scope.handlenapeListNape[index].handledata[0].open;
                      var dirdes = "";
                    }else{
                      var cmdvalue = $scope.handlenapeListNape[index].handledata[0].close;
                      var dirdes = "";

                    }
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
          if(permitopen === "water" || permitopen === "clear"){
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
        }

      };
      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });

      $scope.$watch('',function(){
        //getCurrentSignalStatus();
        //getCurrentTemperate();
        getCurrentSwitchStatus();
      },true);

      var getCurrentSwitchStatus = function(){

      };

      /**
       *@autor: caolei
       *@disc: get current signal status
       */
      var getCurrentSignalStatus = function(){
        var data = airfoilShowerService.getAirfoilStatus();
        var value = getCmdValue(data);
        sendCmd(value,"获取出水状态","获取出水状态失败");
      };

      /**
       *@autor: caolei
       *@disc: get current temperate
       */
      var getCurrentTemperate = function(){
        var data = airfoilShowerService.getWaterTemperature();
        var value = getCmdValue(data);
        sendCmd(value,"获取水温","获取水温失败");
        //$scope.slideWaterData[0].currentTemp = 20;
      };

      document.addEventListener('SocketPlugin.receiveTcpData', function (result) {
        var resultOn = result[0];
        if(resultOn.from.uid != getDeviceId()){
          return;
        }
        if (resultOn.data.cmd.length > 0) {
          var temperteValue = airfoilShowerService.explainAck(resultOn.data.cmd[0]);
          if(temperteValue.temperature){
            $scope.slideWaterData[0].currentTemp = parseInt(temperteValue.temperature, 16);
          }

          changeSwitchStatus(resultOn.data.cmd[0]);

          explainCurrentOperate(resultOn.data.cmd[0]);

          $scope.$apply();
        }
      }, false);

      var changeSwitchStatus = function(value){
        var data = airfoilShowerService.explainAck(value);
        if(data.cmd == '83'){
          angular.forEach($scope.handlenapeListNape, function(data, index, array){
            if(data.matchdataid == 'water' && data.status == 'shower on'){
              data.selecFlag = true;
              data.imgUrl = data.imgSeledUrl;
            }else if(data.matchdataid == 'water' && data.status == 'shower off'){
              data.selecFlag = false;
              data.imgUrl = data.imgUrlTemp;
            }
          });
        }
      };

      /**
       *@autor: caolei
       *@params: ack
       *@disc: Analyze current operation
       */
      var explainCurrentOperate = function(value) {
        var code = bathroomCmdService.explainAck(value);
        if (code.ack.indexOf("fa") >= 0) {
          angular.forEach($scope.handlenapeListNape, function(data, index, array){
            if(data.matchdataid == 'water'){
              data.selecFlag = true;
              data.imgUrl = data.imgSeledUrl;
            }
            if(data.matchdataid == 'clear'){
              $timeout(function () {
                data.selecFlag = true;
                data.imgUrl = data.imgSeledUrl;
              }, 1000);
            }

          });
        }
      };

      var getCmdValue = function(data){
        return airfoilShowerService.getCmdValue("8877", "00", data, "E3", "01");
      };

      /**
       *@autor: caolei
       *@return: device id
       *@disc: get device id
       */
      var getDeviceId = function(){
        var deviceList = localStorage.deviceInfo.split(";");
        for(var i = 0; i < deviceList.length; i ++){
          var deviceInfo = deviceList[i].split(",");
          if(deviceInfo[0] == $stateParams.deviceSku){
            return deviceInfo[1];
          }
        }
      };

      /**
       *@autor: caolei
       *@disc: open water function
       */
      var getWater = function(temperature){
        var argment =  {
          'temperature':'1E',
          'out':'SP'
        };
        if(temperature){
          argment =  {
            'temperature':'temperature',
            'out':'SP'
          };
        }

        var data = airfoilShowerService.setShowerPara(argment);
        var value = getCmdValue(data);
        if(baseConfig.isCloudCtrl){
          sendCmd("airfoilWaterTurnOn",value,"出水成功","出水失败");
        }else{
          var deviceId = getDeviceId();
          sendCmd(value,"出水成功","出水失败");
        }
      };

      /**
       *@autor: caolei
       *@disc: close water function
       */
      var closeWater = function(){
        var argment = {
          'mode':'00'
        };
        var data = airfoilShowerService.operateShower(argment);
        var value = getCmdValue(data);
        if(baseConfig.isCloudCtrl){
          sendCmd("airfoilWaterTurnOff", value,"关闭","关闭失败");
        }else{
          var deviceId = getDeviceId();
          sendCmd(deviceId, value,"关闭","关闭失败");
        }
      };

      /**
       *@autor: caolei
       *@disc: close all function
       */
      var closeFunction = function(){
        var data = airfoilShowerService.stopAll();
        var value = getCmdValue(data);
        if(baseConfig.isCloudCtrl){
          sendCmd("closeAllFunction", value,"关闭","关闭失败");
        }else{
          var deviceId = getDeviceId();
          sendCmd(deviceId, value,"关闭","关闭失败");
        }
      };

      var sendCmd = function(deviceId, value, successMsg, errorMsg){
        if(baseConfig.isCloudCtrl){
          cloudToCtrl(deviceId, value, successMsg, errorMsg);
        }else{
          pluginToCtrl(deviceId, value, successMsg, errorMsg);
        }
      };

      var pluginToCtrl = function(deviceId, value, successMsg, errorMsg){

        cmdService.sendCmd(deviceId, value, localStorage.boxIp);

        /*var cmd = airfoilShowerService.getCmdJsonStr(value, deviceId);
        cordova.plugins.SocketPlugin.tcpSendCmd({
          "timeout": "2000",
          "value": cmd ,
          "ip": localStorage.boxIp
        }, success, error);
        function success(response) {
          hmsPopup.showShortCenterToast(successMsg);
        }
        function error() {
          hmsPopup.showShortCenterToast(errorMsg);
        }*/
      };

      var cloudToCtrl = function(deviceId, value, successMsg, errorMsg){
        var url = baseConfig.basePath + "/r/api/message/sendMessage";
        var paramter = cmdService.cloudCmd(deviceId, value);

        /*var paramter = {
          "ver":1,
          "from":{
            "ctype":240,
            "uid": deviceId
          },
          "to":{
            "ctype":229,
            "uid":"hand-residential"
          },
          "ts":1493013672695,
          "idx":1,
          "mtype":"ctl",
          "data":{
            "cmd":[value]
          }
        };*/

        hmsHttp.post(url, paramter).success(

          function(response){
            if(response.code == 200){
              var value = airfoilShowerService.explainAck(response.data.data.cmd[0]);

              if(value.ack.toLowerCase() == "fa21"){
                angular.forEach($scope.handlenapeListNape, function(data, index, array){
                  if(data.matchdataid == 'water'){
                    data.selecFlag = true;
                    data.imgUrl = data.imgSeledUrl;
                    $scope.Toast.show($translate.instant("airfoidShower.waterSuccess"));
                  }
                });
              }else if(value.ack.toLowerCase() == "fa00"){
                angular.forEach($scope.handlenapeListNape, function(data, index, array){
                  if(data.matchdataid == 'clear'){
                    $scope.Toast.show($translate.instant("airfoidShower.stopSuccess"));
                    $timeout(function () {
                      data.selecFlag = true;
                      data.imgUrl = data.imgSeledUrl;
                    }, 1000);
                  }
                });
              }
            }else{
              alert("fail");
            }
          }
        ).error(
          function (response, status, header, config){
            hmsPopup.showShortCenterToast("");
          }
        );
      };

      var checkCurrentLinkType = function(){

      };

    }]);
