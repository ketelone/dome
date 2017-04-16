angular.module('toiletControlModule')

  .controller('toiletControllerCtrl', [
    '$scope',
    '$state',
    '$ionicModal',
    'baseConfig',
    'checkVersionService',
    function ($scope,
              $state,
              $ionicModal,
              baseConfig,
              checkVersionService
    ) {
    $scope.toiletController = {
      gear:1,
      modelType:"toiletController.zhengchang",
    };


    $scope.parameterctlFlag = false;
    $scope.handlenapeListNape = [
      {
        imgUrl: "build/img/toilet-controller/dachong.png",
        imgSeledUrl: "build/img/toilet-controller/dachongseled.png",
        imgUrlTemp:"build/img/toilet-controller/dachong.png",
        handleDes: "toiletController.dachong01",
        selecFlag:false
      },
      {
        imgUrl: "build/img/toilet-controller/xiaochong.png",
        imgSeledUrl: "build/img/toilet-controller/xiaochongseled.png",
        imgUrlTemp:"build/img/toilet-controller/xiaochong.png",
        handleDes: "toiletController.xioachong",
        selecFlag:false
      },
      {
        imgUrl: "build/img/toilet-controller/nvyong.png",
        imgSeledUrl: "build/img/toilet-controller/nvyongseled.png",
        imgUrlTemp:"build/img/toilet-controller/nvyong.png",
        handleDes: "toiletController.nvyong",
        selecFlag:false
      },
      {
        imgUrl: "build/img/toilet-controller/tunxi.png",
        imgSeledUrl: "build/img/toilet-controller/tunxiseled.png",
        imgUrlTemp:"build/img/toilet-controller/tunxi.png",
        handleDes: "toiletController.tunxi",
        selecFlag:false
      },
      {
        imgUrl: "build/img/toilet-controller/quanwen.png",
        imgSeledUrl: "build/img/toilet-controller/quanwenseled.png",
        imgUrlTemp:"build/img/toilet-controller/quanwen.png",
        handleDes: "toiletController.quanwen",
        selecFlag:false
      },
      {
        imgUrl: "build/img/toilet-controller/nuanfeng.png",
        imgSeledUrl: "build/img/toilet-controller/nuanfengseled.png",
        imgUrlTemp:"build/img/toilet-controller/nuanfeng.png",
        handleDes: "toiletController.nuanfeng",
        selecFlag:false
      },
      {
        imgUrl: "build/img/toilet-controller/dengguan.png",
        imgSeledUrl: "build/img/toilet-controller/dengguanseled.png",
        imgUrlTemp:"build/img/toilet-controller/dengguan.png",
        handleDes: "toiletController.dengguang",
        selecFlag:false
      },
      {
        imgUrl: "build/img/toilet-controller/nuanjiao.png",
        imgSeledUrl: "build/img/toilet-controller/nuanjiaoseled.png",
        imgUrlTemp:"build/img/toilet-controller/nuanjiao.png",
        handleDes: "toiletController.nuanjiao",
        selecFlag:false
      },
      {
        imgUrl: "build/img/toilet-controller/kaigai.png",
        imgSeledUrl: "build/img/toilet-controller/kaigaiseled.png",
        imgUrlTemp:"build/img/toilet-controller/kaigai.png",
        handleDes: "toiletController.biangai",
        selecFlag:false
      },
      {
        imgUrl: "build/img/toilet-controller/fangai.png",
        imgSeledUrl: "build/img/toilet-controller/fangaiseled.png",
        imgUrlTemp:"build/img/toilet-controller/fangai.png",
        imgUrlTemp:"",
        handleDes: "toiletController.fangai",
        selecFlag:false
      },
      {
        imgUrl: "build/img/toilet-controller/fanquan.png",
        imgSeledUrl: "build/img/toilet-controller/biangaiseled.png",
        imgUrlTemp:"build/img/toilet-controller/fanquan.png",
        handleDes: "toiletController.fanquan",
        selecFlag:false
      },
      {
        imgUrl: "build/img/toilet-controller/shezhi.png",
        imgSeledUrl: "build/img/toilet-controller/shezhiseled.png",
        imgUrlTemp:"build/img/toilet-controller/shezhi.png",
        handleDes: "toiletController.shezhi",
        selecFlag:false
      },
    ]
      var canvsscreenHeight = document.getElementById("toilet-parameterctl").offsetHeight;
      document.getElementById("mycanvas01").width = canvsscreenHeight;
      document.getElementById("mycanvas01").height = canvsscreenHeight;
      document.getElementById("mycanvas02").width = canvsscreenHeight;
      document.getElementById("mycanvas02").height = canvsscreenHeight;
      document.getElementById("mycanvas03").width = canvsscreenHeight;
      document.getElementById("mycanvas03").height = canvsscreenHeight;
      var cr1 = getCanvesObj("mycanvas01");//档位canves
      var cr2 = getCanvesObj("mycanvas02");//滑动小球档位canves
      var cr3 = getCanvesObj("mycanvas03");//颜色填充档位canves
      //获取canves2对象
      var cr2obj = getIdObj("mycanvas02")
      var deliverCircle = new initCircle(canvsscreenHeight/2,canvsscreenHeight/2,canvsscreenHeight/2,"#2F3538");//档位圆
      var HideCircle = new initCircle(canvsscreenHeight/2,canvsscreenHeight/2,canvsscreenHeight/2-20,"black");//遮挡圆
      var deliverLine = new initCircle(canvsscreenHeight/2,canvsscreenHeight/2,canvsscreenHeight/2,"black");//档位线
      var rollCircle = new initCircle(canvsscreenHeight/2,canvsscreenHeight/2,canvsscreenHeight/2-10,"white");//小球圆
      var FillCircle = new initCircle(canvsscreenHeight/2,canvsscreenHeight/2,canvsscreenHeight/2,"#6ACBB3");//填充圆

      //分档位画圆弧
      var radRange;
      var starRad = 135;
      //存储档位分段处的点数
      var radSectionArr = [];
      var drawDeliverCircle = function (n,obj,cicleObj) {
        radRange = (270-(n-1))/n;
        radSectionArr.push(starRad);
        var tempstrAngle = starRad;
        for(var m=1;m<=n;m++){
          drawRadian(cr1,deliverCircle,tempstrAngle,tempstrAngle+radRange);
          tempstrAngle = tempstrAngle+radRange+1;
          radSectionArr.push(tempstrAngle);
        };
        //画白色遮挡
        drawRadian(cr1,HideCircle,0,360);
      };
      //画档位圆
      drawDeliverCircle(4,cr1,deliverCircle);
      var i=0,j=0,stoPosPoint=0;
      var drawCircleFill = function (obj,changeRad) {
        obj.clearRect(0,0,canvsscreenHeight,canvsscreenHeight);
        drawRadian(obj,FillCircle,starRad,changeRad);
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
        radSectionArr.push(changeRadTemp);
        radSectionArr = radSectionArr.sort(function(a,b){
          return a-b});
        //判断是否滑动过档位点,若有滑过,则画遮挡弧度
        var radSectionArrLen = radSectionArr.length;
        //判断当前点距离那个档位距离最近
        i=0;j=1;
        for(i;i<radSectionArrLen;i++){
          if(changeRadTemp === radSectionArr[i]){
            if(Math.abs(radSectionArr[i]-radSectionArr[i-1]) < Math.abs(radSectionArr[i]-radSectionArr[i+1])){
              stoPosPoint = i-1
              if(i<=1){
                $scope.toiletController.gear = 1;
              }else{
                $scope.toiletController.gear = i;
              };
              $scope.$apply();
              //画档位线
              j=1;
              for(j;j<i;j++){
                drawRadian(cr3,deliverLine,radSectionArr[i-j-1]-1,radSectionArr[i-j-1]);
              };
            }else{
              stoPosPoint = i;
              $scope.toiletController.gear = i+1;
              $scope.$apply();
              //画档位线
              j=1;
              for(j;j<i+1;j++){
                drawRadian(cr3,deliverLine,radSectionArr[i-j]-1,radSectionArr[i-j]);
              };
            };
            radSectionArr.splice(i,1);
          }
        };
        //画白色遮挡
        drawRadian(obj,HideCircle,0,360);
      };
      //画圆球和指示
      var  drawc = function (obj,ancr,type) {
        if(135<=ancr || ancr<=45){
          var jd =  changeAngale(ancr);
          obj.clearRect(0,0,canvsscreenHeight,canvsscreenHeight);
          var x = Math.cos(jd)*(rollCircle.r)+(rollCircle.x);
          var y = Math.sin(jd)*(rollCircle.r)+(rollCircle.y);
          //画小球
          obj.beginPath();
          obj.fillStyle = rollCircle.color;
          obj.moveTo(x,y);
          obj.arc(x,y,10,0,Math.PI*2,false);
          obj.fill();
          obj.closePath();
          //画小球中的指示标识
          obj.beginPath();
          obj.fillStyle = "#191C23";
          obj.lineWidth = 1;//设置线宽
          obj.moveTo(x,y-(10/4));
          obj.lineTo(x-(10/4)/Math.sqrt(2)-1,y);
          obj.lineTo(x,y+(10/4));
          obj.fill();//填充颜色
          obj.moveTo(x+1,y-(10/4));
          obj.lineTo(x+(10/4)/Math.sqrt(2)+2,y);
          obj.lineTo(x+1,y+(10/4));
          obj.stroke();//画线框
          obj.fill();//填充颜色
          obj.closePath();
          //随小球和指示画fil填充
          if(!type){
            drawCircleFill(cr3,ancr)
          }
        };
      };
      //初始化小球
      drawc(cr2,starRad,"type");
      var hasTouch = 'ontouchstart' in window;
      var STA_EN = hasTouch ? "touchstart" : "mousedown",
        MV_EV = hasTouch ? "touchmove":"mousemove",
        END_EV = hasTouch ? "touchend" : "mouseup",
        END_Cancel = hasTouch ? "touchcancel" : "mouseout";
      cr2obj.addEventListener(STA_EN,start,false);
      cr2obj.addEventListener(MV_EV,move,false);
      cr2obj.addEventListener(END_EV,end,false);
      cr2obj.addEventListener(END_EV,end,false);
      var endX,endY,bStart = 0;
      function start(ev){
        ev.preventDefault();
        bStart = 1;
        var poi = getEvtLocation(ev);
        bginX = poi.x;
        bginY = poi.y;
      };
      function move(ev){
        ev.preventDefault();
        if(bStart === 0)return;
        var poi = getEvtLocation(ev);
        drawc(cr2,getAngle(canvsscreenHeight,canvsscreenHeight,poi.x,poi.y));
      };
      function end (ev) {
        ev.preventDefault();
        bStart = 0;
        drawc(cr2,radSectionArr[stoPosPoint]);
      };
      function getEvtLocation(ev){
        var touch = ev.touches[0];
        return{
          x : touch.clientX,
          y : touch.clientY
        }
      };




      //处理选择怎加border
      var handlenapeListNapeLen = $scope.handlenapeListNape.length;
      $scope.selectNapes = function (index) {
        $scope.handlenapeListNape[index].selecFlag = !$scope.handlenapeListNape[index].selecFlag;
        for(var i=0;i<handlenapeListNapeLen;i++){
          if(i !== index){
            $scope.handlenapeListNape[i].selecFlag = false;
          };
        };
        if($scope.handlenapeListNape[index].selecFlag === true){
          $scope.handlenapeListNape[index].imgUrl = $scope.handlenapeListNape[index].imgSeledUrl;
        };
        for(var i=0;i<handlenapeListNapeLen;i++){
          if(i !== index){
            $scope.handlenapeListNape[i].imgUrl = $scope.handlenapeListNape[i].imgUrlTemp;
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
      $scope.value = [{id:0, des:"toiletController.gaunbi"},{id:2,des:'toiletController.maichong'},
        {id:3,des:'toiletController.bodong'},{id:4,des:'toiletController.yidong'},{id:5,des:'toiletController.zhengchang'}
      ];
      $scope.openModal = function () {
        if($scope.value.length!==0) {
          $scope.modal.show();
          setTimeout(function () {
            var ele = document.getElementsByClassName("hmsModal");
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
