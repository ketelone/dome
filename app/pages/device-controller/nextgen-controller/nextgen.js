angular.module('nextgenModule')
  .controller('nextgenCtrl', [
    '$scope',
    '$state',
    '$ionicModal',
    '$compile',
    'baseConfig',
    'checkVersionService','$ionicHistory','hmsPopup','nextgenService','$timeout','SettingsService','$ionicSlideBoxDelegate',
    function ($scope,
              $state,
              $ionicModal,
              $compile,
              baseConfig,
              checkVersionService,$ionicHistory,hmsPopup,nextgenService,$timeout,SettingsService,$ionicSlideBoxDelegate
    ) {
      var ctrId="00";
      var header="8877";
      var idx="00";
      var devId="03";//E8:91:E0:DC:20:F1
      var sku=SettingsService.get('sku');

      //var deveiceId="E0DC20F1";

  /**
       *@author:chenjiacheng
       *@name:getValue
       *@params:
       *@return:getValue
       *@disc:getValue

       */

    function getValue(data){
        //The following is the operating equipment parameters

        return nextgenService.getCmdvalue(header,idx, data, ctrId,devId);
      };
      /**
       *@author:chenjiacheng
       *@name:getDeviceId
       *@params:
       *@return:
       *@disc:getDeviceId

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
    // alert("OK"+deveiceId);

      /**
       *@author:chenjiacheng
       *@name:chixuWater
       *@params:
       *@return:
       *@disc:chixuWater

       */
  function chixuWater(){

    var argment = {
      'mode': '01'    //00表示stop，01表示Start continuous outlet 02表示Start evacuate cold water (turn on, and off when reach 37 degree,Start evacuate cold water 如果5分钟后水温仍达不到37度则自动停止) ,other表示内置设定
   }

    var  data= nextgenService.operateShower(argment);
    var value = getValue(data);
  alert(value);
    nextgenService.sendCmd(deviceId,value,"持续出水","持续出水失败");

  }
      /**
       *@author:chenjiacheng
       *@name:paikongWater
       *@params:
       *@return:
       *@disc:paikongWater

       */
  function paikongWater(){

    var argment = {
      'mode': '02'    //00表示stop，01表示Start continuous outlet 02表示Start evacuate cold water (turn on, and off when reach 37 degree,Start evacuate cold water 如果5分钟后水温仍达不到37度则自动停止) ,other表示内置设定
    }
    var data = nextgenService.operateShower(argment);
     var value = getValue(data);
    alert(value);
    nextgenService.sendCmd(deviceId,value,"排空冷水","排空冷水失败");

}
      /**
       *@author:chenjiacheng
       *@name:closeWater
       *@params:
       *@return:
       *@disc:closeWater

       */
      function closeWater(){
        var argment = {
          'mode': '00'    //00表示stop，01表示Start continuous outlet 02表示Start evacuate cold water (turn on, and off when reach 37 degree,Start evacuate cold water 如果5分钟后水温仍达不到37度则自动停止) ,other表示内置设定
        }
        var data = nextgenService.operateShower(argment);
      var value = getValue(data);
        alert(value);
        nextgenService.sendCmd(deviceId,value,"关闭","关闭失败");

      }
      /**
       *@author:chenjiacheng
       *@name:Key stop
       *@params:
       *@return:
       *@disc:Key stop

       */
  function closeAll(){

         var data = nextgenService.stopAll();

        var value = getValue(data);

       alert(value);
    nextgenService.sendCmd(deviceId,value,"一键关闭","一键关闭失败");
      };
      /**
       *@author:chenjiacheng
       *@name:headerHuasa
       *@params:
       *@return:
       *@disc:headerHuasa

       */
      //头顶花洒
      function headerHuasa(){
        var argment = {
          'temperature': '00',    //这个最好传16进制的字符串 比如0 ->00 100->64
          'out': 'HRS',			  //这个参数是个枚举字符串 HRS，HS，SP，HDS 分别表示 头顶花洒，头顶摇摆，spout，手持花洒，

        }

        var data = nextgenService.setShowerPara(argment);
       var value = getValue(data);
        alert(value);
       nextgenService.sendCmd(deviceId,value,"头顶花洒","头顶花洒失败");


      }
      /**
       *@author:chenjiacheng
       *@name:headerBaidong
       *@params:
       *@return:
       *@disc:headerBaidong

       */
      //头顶摆动
      function headerBaidong(){
        var argment = {
          'temperature': '00',    //这个最好传16进制的字符串 比如0 ->00 100->64
          'out': 'HS',			  //这个参数是个枚举字符串 HRS，HS，SP，HDS 分别表示 头顶花洒，头顶摇摆，spout，手持花洒，

        }
        var data = nextgenService.setShowerPara(argment);
      var value = getValue(data);
 alert(value);
        nextgenService.sendCmd(deviceId,value,"头顶花洒","头顶花洒失败");


      }
      /**
       *@author:chenjiacheng
       *@name:handHuasa
       *@params:
       *@return:
       *@disc:handHuasa

       */
      function handHuasa(){
        var argment = {
          'temperature': '00',    //这个最好传16进制的字符串 比如0 ->00 100->64
          'out': 'HDS',			  //这个参数是个枚举字符串 HRS，HS，SP，HDS 分别表示 头顶花洒，头顶摇摆，spout，手持花洒，

        }

        var data = nextgenService.setShowerPara(argment);
       var value = getValue(data);
        alert(value);
        nextgenService.sendCmd(deviceId,value,"手持花洒","手持花洒失败");


      }
      /**
       *@author:chenjiacheng
       *@name:goSpout
       *@params:
       *@return:
       *@disc:goSpout

       */
      function goSpout(){
        var argment = {
          'temperature': '00',    //这个最好传16进制的字符串 比如0 ->00 100->64
          'out': 'SP',			  //这个参数是个枚举字符串 HRS，HS，SP，HDS 分别表示 头顶花洒，头顶摇摆，spout，手持花洒，

        }
        var data = nextgenService.setShowerPara(argment);
        var value = getValue(data);
  alert(value);
        nextgenService.sendCmd(deviceId,value,"Spout","Spout失败");

    }


 /*function closeJieneng(){

        var data = nextgenService.exitPowerSave();
        var value = getValue(data);
   alert(value);
        nextgenService.sendCmd(deveiceId,value,"关闭节能","关闭节能失败");

      }*/
     /* function goSleep(){

        var argment = {
          'mode': '02' //00表示关闭，01表示低电量，02表示休眠，03表示断电
        }
        var data = nextgenService.enterPowerSave(argment);

        var value = getValue(data);
        alert(value);
        nextgenService.sendCmd(deveiceId,value,"关闭节能","关闭节能失败");

      }*/
      /*function goPowerfailure(){
        var argment = {
          'mode': '03' //00表示关闭，01表示低电量，02表示休眠，03表示断电
        }
        var data = nextgenService.enterPowerSave(argment);
        var value = getValue(data);
        alert(value);
        nextgenService.sendCmd(deveiceId,value,"断电","断电失败");

      }*/
      /*function goLowPower(){
        var argment = {
          'mode': '01' //00表示关闭，01表示低电量，02表示休眠，03表示断电
        }
        var data = nextgenService.enterPowerSave(argment);
        var value = getValue(data);
        alert(value);
        nextgenService.sendCmd(deveiceId,value,"低电量","低电量失败");

      }*/

      /**
       *@author:chenjiacheng
       *@name:
       *@params:
       *@return:
       *@disc:监听一键停止的返回信息，当tempData.ack=='1000'使图标变灰

       */

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
      /**
       *@author:chenjiacheng
       *@name:goBack
       *@params:
       *@return:
       *@disc:goBack

       */
  $scope.goBack = function(){
        $ionicHistory.goBack();

    }

      //初始模式选择
      $scope.toiletController = {
         modelType:"nextgen.yidong",//初始模式选择默认手持花洒
        way:"nextgen.handleSelecDes"//出水方式
      };

  //侧滑转档数量json
      $scope.slideInitData =[{
        des: "nextgen.yidong",
        gearNum: 1,
        gearInit: 1,
       // gearInitTemp: 1,
        parameterctlFlag: false,
        parNodeid: 'toilet-initCtl',
        canves01: "initcanves01",
       canves02: "initcanves02",
       canves03: "initcanves03",
      }]


//Function list
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
          selecFlag:false

        },
      /*  {
          imgUrl: "build/img/nextgen/jieneng.png",
          imgSeledUrl: "build/img/nextgen/jienengseled.png",
          imgUrlTemp:"build/img/nextgen/jieneng.png",
          handleDes: "nextgen.jieneng",
          selecFlag:false
        },*/

        {
          imgUrl: "build/img/nextgen/shezhi.png",
          imgSeledUrl: "build/img/nextgen/shezhiseled.png",
          imgUrlTemp:"build/img/nextgen/shezhi.png",
          handleDes: "nextgen.shezhi",
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
          "<p ng-if='cenwatpurifierCtrl.isShwoClearStatus' class='toilet-parameterctl-raddata' ></p>"+
          "<span ng-if='cenwatpurifierCtrl.isShwoClearStatus' class='toilet-parameterctl-des' ></span>"+

        "<span ng-if='true' class='toilet-parameterctl-raddata toilet-parameterct-span' ></span>"+
         /* "<p ng-if='true' class='toilet-parameterctl-raddata' translate='nextgen.yidong' style='font-size: 0.6rem;' >4324</p>"+*/
          "<div ng-if='true' class='toilet-parameterctl-des' translate='nextgen.yidong'></div>"+
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
       *@author:chenjiacheng
       *@name:
       *@params:
       *@return:
       *@disc:Process selection mode

       */
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
    alert(1);
    handHuasa();//先选择手持花洒
    alert(2);
    chixuWater();//再持续出水

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
            handHuasa();//先选择手持花洒
            paikongWater(); //再排空冷水
          }
          else{
            closeWater();
          }
        }
        if(index==2){

          closeAll();
    }
     /*   if(index==3)
        {
          //目前只能选睡眠模式
          $scope.slideInitData[0].des="nextgen.sleep";
          if($scope.handlenapeListNape[index].selecFlag ==true){
            alert("sleep");
            goSleep();
          }
          else{
            closeJieneng();
          }*/

          //$scope.toiletController = {
          //  modelType:"nextgen.sleep",
          //  way:"nextgen.jieneng"
          //};
          //if($scope.value[0].ionCheck==undefined) {//是否有ioncheck属性
          //  $scope.value = [{id: 6, des: 'nextgen.close', ionCheck: true},
          //    {id: 7, des: 'nextgen.powerFailure', ionCheck: false}, {
          //      id: 8,
          //      des: 'nextgen.sleep',
          //      ionCheck: false
          //    }, {id: 9, des: 'nextgen.lowPower', ionCheck: false}];
          //}


           //$scope.modal.show();
          //setTimeout(function () {
          //  var ele = document.getElementsByClassName("hmsModal");
          //  ele[0].style.top = 68 + '%';
          //  ele[0].style.minHeight = 61 + '%';
          //}, 10);
     // };

        if(index==3){

         $state.go("nextgenSet");
         $scope.handlenapeListNape[3].selecFlag = false;
         $scope.handlenapeListNape[3].imgUrl = $scope.handlenapeListNape[3].imgUrlTemp;
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







      /**
       *@author:chenjiacheng
       *@name:
       *@params:
       *@return:
       *@disc:Pull selection processing

       */

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


        if( $scope.handlenapeListNape[0].selecFlag==true||$scope.handlenapeListNape[1].selecFlag==true) {
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
       /* else{
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

*/

      };










    }]);
