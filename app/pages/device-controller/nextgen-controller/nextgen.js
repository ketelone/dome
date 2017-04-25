angular.module('nextgenModule')
  .controller('nextgenCtrl', [
    '$scope',
    '$state',
    '$ionicModal',
    '$compile',
    'baseConfig',
    'checkVersionService','$ionicHistory','hmsPopup','$timeout','nextgenService',
    function ($scope,
              $state,
              $ionicModal,
              $compile,
              baseConfig,
              checkVersionService,$ionicHistory,hmsPopup,$timeout,nextgenService
    ) {
      var ctrId="00";
      var header="8877";
      var idx="00";
      var devId="E8:91:E0:DC:20:F1";

      function getValue(data){
        return nextgenService.getCmdvalue(header,idx, data, ctrId,devId);
      };



  function chixuWater(){
    var argment = {
      'mode': '01'    //00表示stop，01表示Start continuous outlet 02表示Start evacuate cold water (turn on, and off when reach 37 degree,Start evacuate cold water 如果5分钟后水温仍达不到37度则自动停止) ,other表示内置设定
   }
    var data = nextgenService.operateShower(argment);
    var value = getValue(data);

    nextgenService.sendCmd(devId,value,"持续出水","持续出水失败");
  }

  function paikongWater(){
    var argment = {
      'mode': '02'    //00表示stop，01表示Start continuous outlet 02表示Start evacuate cold water (turn on, and off when reach 37 degree,Start evacuate cold water 如果5分钟后水温仍达不到37度则自动停止) ,other表示内置设定
    }
    var data = nextgenService.operateShower(argment);
    var value = getValue(data);

    nextgenService.sendCmd(devId,value,"排空冷水","排空冷水失败");

}

      function closeWater(){
        var argment = {
          'mode': '00'    //00表示stop，01表示Start continuous outlet 02表示Start evacuate cold water (turn on, and off when reach 37 degree,Start evacuate cold water 如果5分钟后水温仍达不到37度则自动停止) ,other表示内置设定
        }
        var data = nextgenService.operateShower(argment);
        var value = getValue(data);

        nextgenService.sendCmd(devId,value,"关闭","关闭失败");

      }

  function closeAll(){
        var data = nextgenService.stopAll();
        var value = getValue(data);
        sendCmd(devId,value,"一键关闭","一键关闭失败");
      };

      //头顶花洒
      function headerHuasa(){
        var argment = {
          'temperature': '00',    //这个最好传16进制的字符串 比如0 ->00 100->64
          'out': 'HRS',			  //这个参数是个枚举字符串 HRS，HS，SP，HDS 分别表示 头顶花洒，头顶摇摆，spout，手持花洒，

        }
        var data = nextgenService.setShowerPara(argment);
        var value = getValue(data);
       nextgenService.sendCmd(devId,value,"头顶花洒","头顶花洒失败");


      }
      //头顶摆动
      function headerBaidong(){
        var argment = {
          'temperature': '00',    //这个最好传16进制的字符串 比如0 ->00 100->64
          'out': 'HS',			  //这个参数是个枚举字符串 HRS，HS，SP，HDS 分别表示 头顶花洒，头顶摇摆，spout，手持花洒，

        }
        var data = nextgenService.setShowerPara(argment);
        var value = getValue(data);
        nextgenService.sendCmd(devId,value,"头顶花洒","头顶花洒失败");


      }
      function handHuasa(){
        var argment = {
          'temperature': '00',    //这个最好传16进制的字符串 比如0 ->00 100->64
          'out': 'HDS',			  //这个参数是个枚举字符串 HRS，HS，SP，HDS 分别表示 头顶花洒，头顶摇摆，spout，手持花洒，

        }
        var data = nextgenService.setShowerPara(argment);
        var value = getValue(data);
        nextgenService.sendCmd(devId,value,"手持花洒","手持花洒");


      }
      function goSpout(){
        var argment = {
          'temperature': '00',    //这个最好传16进制的字符串 比如0 ->00 100->64
          'out': 'SP',			  //这个参数是个枚举字符串 HRS，HS，SP，HDS 分别表示 头顶花洒，头顶摇摆，spout，手持花洒，

        }
        var data = nextgenService.setShowerPara(argment);
        var value = getValue(data);
        nextgenService.sendCmd(devId,value,"Spout","Spout失败");

    }

//3.进入节能状态 n	相关作业未停止，不能进入节能状态。
      var argment = {
        'mode': '00-03' //00表示关闭，01表示低电量，02表示休眠，03表示断电
      }

      function enterPowerSave() {
        var data = '31';
        data = data + arg.mode;
        return data;
      }


      function colseJieneng(){
        var argment = {
          'mode': '00' //00表示关闭，01表示低电量，02表示休眠，03表示断电
        }
        var data = nextgenService.enterPowerSave(argment);
        var value = getValue(data);
        nextgenService.sendCmd(devId,value,"休眠","休眠失败");

      }
      function goSleep(){
        var argment = {
          'mode': '02' //00表示关闭，01表示低电量，02表示休眠，03表示断电
        }
        var data = nextgenService.enterPowerSave(argment);
        var value = getValue(data);
        nextgenService.sendCmd(devId,value,"关闭节能","关闭节能失败");

      }
      function goPowerfailure(){
        var argment = {
          'mode': '03' //00表示关闭，01表示低电量，02表示休眠，03表示断电
        }
        var data = nextgenService.enterPowerSave(argment);
        var value = getValue(data);
        nextgenService.sendCmd(devId,value,"断电","断电失败");

      }
      function goLowPower(){
        var argment = {
          'mode': '01' //00表示关闭，01表示低电量，02表示休眠，03表示断电
        }
        var data = nextgenService.enterPowerSave(argment);
        var value = getValue(data);
        nextgenService.sendCmd(devId,value,"低电量","低电量失败");

      }



      document.addEventListener('SocketPlugin.receiveTcpData', function (result) {
        var resultOn = result;
        if (resultOn.payload.cmd == "CMD_RETURN") {
          var tempData = nextgenService.explainAck(resultOn.payload.value[0]);
          if(tempData.ack=='1000'){
            $scope.handlenapeListNape[2].selecFlag =false;
            $scope.handlenapeListNape[2].imgUrl = $scope.handlenapeListNape[2].imgUrlTemp;

           }

          $scope.$apply();
        }
      }, false);

  $scope.goBack = function(){
        $ionicHistory.goBack();

    }

      //初始模式选择
      $scope.toiletController = {
         modelType:"nextgen.maichong",
        way:"nextgen.handleSelecDes"
      };

  //侧滑转档数量json
      $scope.slideInitData =[{
        des: "nextgen.chixu",
        gearNum: 1,
        gearInit: 1,
       // gearInitTemp: 1,
        parameterctlFlag: false,
        parNodeid: 'toilet-initCtl',
        canves01: "initcanves01",
       canves02: "initcanves02",
       canves03: "initcanves03",
      }]



      $scope.handlenapeListNape = [

        {
          imgUrl: "build/img/nextgen/chixu.png",
          imgSeledUrl: "build/img/nextgen/chixuseled.png",
          imgUrlTemp:"build/img/nextgen/chixu.png",
          handleDes: "nextgen.chixu",
          selecFlag:false,
          handledata:$scope.slideLinYuData //cjc初始canves
        },
        {
          imgUrl: "build/img/nextgen/paikong.png",
          imgSeledUrl: "build/img/nextgen/paikongseled.png",
          imgUrlTemp:"build/img/nextgen/paikong.png",
          handleDes: "nextgen.paikong",
          selecFlag:false,
          handledata:$scope.slideLinYuData //cjc初始canves
        },
        {
          imgUrl: "build/img/nextgen/stop.png",
          imgSeledUrl: "build/img/nextgen/stopseled.png",
          imgUrlTemp:"build/img/nextgen/stop.png",
          handleDes: "nextgen.stop",
          selecFlag:false,

        },
        {
          imgUrl: "build/img/nextgen/jieneng.png",
          imgSeledUrl: "build/img/nextgen/jienengseled.png",
          imgUrlTemp:"build/img/nextgen/jieneng.png",
          handleDes: "nextgen.jieneng",
          selecFlag:false
        },

        {
          imgUrl: "build/img/nextgen/shezhi.png",
          imgSeledUrl: "build/img/nextgen/shezhiseled.png",
          imgUrlTemp:"build/img/nextgen/shezhi.png",
          handleDes: "nextgen.shezhi",
          selecFlag:false
        },
      ];




    //  $scope.currentSlideData = $scope.handlenapeListNape[0].handledata;
      $scope.currentSlideData = $scope.slideInitData;

      //初始化当前模板数据
      $scope.initHtmlTemplate = function (currentSlideData) {
        //初始化数据
        if($('#ionSliderBox').children().length !== 0){
      $('#ionSliderBox').empty();
        };
        var checHtml =
          "<ion-slide-box on-slide-changed='slideHasChanged($index)'>"+
          "<ion-slide ng-repeat='list in currentSlideData track by $index'>"+
          "<div id={{list.parNodeid}} class='toilet-parameterctl'>"+
          "<canvas id={{list.canves01}} class='canves-pos'></canvas>"+
          "<canvas id={{list.canves02}} class='canves-pos'></canvas>"+
          "<canvas id={{list.canves03}} class='canves-pos'></canvas>"+
          "<canvas id={{list.canves04}} class='canves-pos'></canvas>"+
          "<div class='toilet-parameterctl-data' ng-if='!list.parameterctlFlag'>"+
          "<span class='toilet-parameterctl-raddata' ng-bind='list.gearInit'></span>"+
          "<span class='toilet-parameterctl-des'  translate={{list.des}} ></span>"+
          "</div>"+
          "<div class='toilet-parameterctl-dataimg' ng-if='list.parameterctlFlag'>"+
       "<img class='conninfo-parameterctl-img' ng-src='build/img/toilet-controller/btn_devicedetail_scoll.png' alt=''>"+
          "</div>"+
          "</div>"+
          "</ion-slide>"+
          "</ion-slide-box>"
        var $checkhtml = $compile(checHtml)($scope); // 编译
        $('#ionSliderBox').append($checkhtml[0]);
        console.log(1);
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
         this.deliverCircle = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2,color:"#67c6b0"};//档位圆
         this.HideCircle = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2-0.4*this.rateInit,color:"black"};//档位圆
         this.deliverLine = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2,color:"black"};//档位线
         this.rollCircle = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2-0.2*this.rateInit,color:"white"};//小球圆
         this.FillCircle = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2,color:"#59a59d"};//填充圆
         // this.bimianCircle = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2-30,color:"black"};//防触点
         //变量
        //填充圆
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

     };
      var currentRadObj;
      setTimeout(function () {
        $scope.getCurrentObj = function (index) {
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
            }, false );
            var getEvtLocation = function(e){
              var touch = e.touches[0];
              return{
                x : touch.clientX,
                y : touch.clientY
              }
            };

          }
        };
      $scope.getCurrentObj(0);
        $scope.slideHasChanged = function (index) {
          $scope.getCurrentObj(index);
        };
      },20);
      //处理选择怎加border
      var handlenapeListNapeLen = $scope.handlenapeListNape.length;


      $scope.selectNapes = function (index) {

     $scope.handlenapeListNape[index].selecFlag = !$scope.handlenapeListNape[index].selecFlag;

        for(var i=0;i<handlenapeListNapeLen;i++){
          if(i != index){
            $scope.handlenapeListNape[i].selecFlag = false;
          };
        };
        if($scope.handlenapeListNape[index].selecFlag === true){
          $scope.handlenapeListNape[index].imgUrl = $scope.handlenapeListNape[index].imgSeledUrl;
        };
        if($scope.handlenapeListNape[index].selecFlag === false){
          $scope.handlenapeListNape[index].imgUrl = $scope.handlenapeListNape[index].imgUrlTemp;
        };

        for(var i=0;i<handlenapeListNapeLen;i++){
          if(i !== index){
            $scope.handlenapeListNape[i].imgUrl = $scope.handlenapeListNape[i].imgUrlTemp;
          }
        };

  if (index == 0) {


     $scope.slideInitData[0].des = "nextgen.chixu";
      $scope.toiletController = {
        modelType: "nextgen.maichong",
        way: "nextgen.handleSelecDes"
      };
      $scope.value = [{id: 2, des: 'nextgen.maichong'},
        {id: 3, des: 'nextgen.bodong'}, {id: 4, des: 'nextgen.yidong'}, {id: 5, des: 'nextgen.Spout'}
      ];
  if($scope.handlenapeListNape[index].selecFlag ==true){
    chixuWater();
  }
    else{
    closeWater();
  }

}
        if(index==1) {


            $scope.slideInitData[0].des = "nextgen.paikong";
            $scope.toiletController = {
              modelType: "nextgen.maichong",
              way: "nextgen.handleSelecDes"
            };
            $scope.value = [{id: 2, des: 'nextgen.maichong'},
              {id: 3, des: 'nextgen.bodong'}, {id: 4, des: 'nextgen.yidong'}, {id: 5, des: 'nextgen.Spout'}
            ];
          if($scope.handlenapeListNape[index].selecFlag ==true){
            paikong();
          }
          else{
            closeWater();
          }
        }
        if(index==2){

          closeAllFunction();
    }
        if(index==3)
        {

          $scope.slideInitData[0].des="nextgen.close";
          $scope.toiletController = {
            modelType:"nextgen.close",
            way:"nextgen.jieneng"
          };
          if($scope.value[0].ionCheck==undefined) {//是否有ioncheck属性
            $scope.value = [{id: 6, des: 'nextgen.close', ionCheck: true},
              {id: 7, des: 'nextgen.powerFailure', ionCheck: false}, {
                id: 8,
                des: 'nextgen.sleep',
                ionCheck: false
              }, {id: 9, des: 'nextgen.lowPower', ionCheck: false}];
          }


           //$scope.modal.show();
          //setTimeout(function () {
          //  var ele = document.getElementsByClassName("hmsModal");
          //  ele[0].style.top = 68 + '%';
          //  ele[0].style.minHeight = 61 + '%';
          //}, 10);

        };

        if(index==4){

         $state.go("nextgenSet");
         $scope.handlenapeListNape[4].selecFlag = false;
         $scope.handlenapeListNape[4].imgUrl = $scope.handlenapeListNape[4].imgUrlTemp;
       }
        // 根据选择项来初始化选择项的
      /*  if($scope.handlenapeListNape[index].handledata){
          $scope.currentSlideData = $scope.handlenapeListNape[index].handledata;
          $scope.initHtmlTemplate($scope.currentSlideData);
         setTimeout(function () {
            $scope.getCurrentObj(0);
          },20)
        }*/
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
      $scope.value = [{id:2,des:'nextgen.maichong'},
        {id:3,des:'nextgen.bodong'},{id:4,des:'nextgen.yidong'},{id:5,des:'nextgen.Spout'}
      ];
      $scope.openModal = function () {


        if( $scope.handlenapeListNape[0].selecFlag==true||$scope.handlenapeListNape[3].selecFlag==true||$scope.handlenapeListNape[1].selecFlag==true) {
          $scope.modal.show();
          setTimeout(function () {
            var ele = document.getElementsByClassName("hmsModal");
            ele[0].style.top = 68 + '%';
            ele[0].style.minHeight = 61 + '%';
          }, 10)
        }

       //  }


      };
      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });
      $scope.choose = function (val) {
  if(val.id<6) {
         $scope.modal.hide();
         $scope.toiletController.modelType = val.des;
    if(val.id==2){
      alert("头顶花洒");
      headerHuasa();
    };
    if(val.id==3){
      alert("头顶摆动");
      headerBaidong();
    };

    if(val.id==4){
      alert("头持花洒");
      handHuasa();
    };
    if(val.id==5){
      alert("Spout");
      goSpout();
    };


  }
        else{
    $scope.toiletController.modelType = val.des;
          $scope.modal.hide();
    for (var i = 0; i < $scope.value.length; i++) {
      $scope.value[i].ionCheck=false;
      val.ionCheck = true;
    }

        }

        if(val.id==6){
          $scope.slideInitData[0].des="nextgen.close";
         alert("关闭");
          colseJieneng();
        };
        if(val.id==7){
          $scope.slideInitData[0].des="nextgen.powerFailure";
          alert("断电");
          goPowerfailure();
        };

        if(val.id==8){
          $scope.slideInitData[0].des="nextgen.sleep";
          alert("睡眠");
          goSleep();
        };
        if(val.id==9){
          $scope.slideInitData[0].des="nextgen.lowPower";
          alert("低用电");
          goLowPower();
        };



      };




      var shower = function (deviceId) {
        var cmd = {
          from: {
            cid: "0xE3",
          },
          idx: 1,
          method: "CTL",
          payload: {
            cmd: "CMD_REQUEST",
            "device_type": "BLE_DEVICE",
            value: ["887706010005270221"],
          },
          to: {
            cid: "0xE4",
            "device_id": deviceId,
          },
          ts: "1492146861.217451",
          ver: 1,
        }
        cordova.plugins.SocketPlugin.tcpSendCmd({
          "timeout": "5000",
          "value": cmd,
          "ip":"255,255,255,255"
        }, success, error);
        function success(response) {
          hmsPopup.showShortCenterToast("淋浴");
        }

        function error() {
          hmsPopup.showShortCenterToast("淋浴失败");
        }
      };








    }]);
