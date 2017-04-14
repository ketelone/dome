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
      modelType:"toiletController.zhengchang"
    }
    $scope.parameterctlFlag = true;
    $scope.handlenapeListNape = [
      {
        imgUrl: "build/img/toilet-controller/dachong.png",
        handleDes: "toiletController.dachong01",
        selecFlag:false
      },
      {
        imgUrl: "build/img/toilet-controller/dachong.png",
        handleDes: "toiletController.xioachong",
        selecFlag:false
      },
      {
        imgUrl: "build/img/toilet-controller/dachong.png",
        handleDes: "toiletController.nvyong",
        selecFlag:false
      },
      {
        imgUrl: "build/img/toilet-controller/dachong.png",
        handleDes: "toiletController.tunxi",
        selecFlag:false
      },
      {
        imgUrl: "build/img/toilet-controller/dachong.png",
        handleDes: "toiletController.quanwen",
        selecFlag:false
      },
      {
        imgUrl: "build/img/toilet-controller/dachong.png",
        handleDes: "toiletController.nuanfeng",
        selecFlag:false
      },
      {
        imgUrl: "build/img/toilet-controller/dachong.png",
        handleDes: "toiletController.dengguang",
        selecFlag:false
      },
      {
        imgUrl: "build/img/toilet-controller/dachong.png",
        handleDes: "toiletController.nuanjiao",
        selecFlag:false
      },
      {
        imgUrl: "build/img/toilet-controller/dachong.png",
        handleDes: "toiletController.biangai",
        selecFlag:false
      },
      {
        imgUrl: "build/img/toilet-controller/dachong.png",
        handleDes: "toiletController.fangai",
        selecFlag:false
      },
      {
        imgUrl: "build/img/toilet-controller/dachong.png",
        handleDes: "toiletController.fanquan",
        selecFlag:false
      },
      {
        imgUrl: "build/img/toilet-controller/dachong.png",
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
      var cr1 = getCanvesObj("mycanvas01");
      var cr2 = getCanvesObj("mycanvas02");
      var cr3 = getCanvesObj("mycanvas03");

      var cr2obj = getIdObj("mycanvas02")
      var deliverCircle = new initCircle(canvsscreenHeight/2,canvsscreenHeight/2,canvsscreenHeight/2,"#2F3538");
      var HideCircle = new initCircle(canvsscreenHeight/2,canvsscreenHeight/2,canvsscreenHeight/2-20,"black");
      var deliverLine = new initCircle(canvsscreenHeight/2,canvsscreenHeight/2,canvsscreenHeight/2,"black");
      var rollCircle = new initCircle(canvsscreenHeight/2,canvsscreenHeight/2,canvsscreenHeight/2-10,"white");
      var FillCircle = new initCircle(canvsscreenHeight/2,canvsscreenHeight/2,canvsscreenHeight/2,"#6ACBB3");

      //画圆弧和圆
      var drawRadian= function (obj,cicleObj,sangle,fangle,type) {
        obj.beginPath();
        obj.fillStyle=cicleObj.color;
        obj.moveTo(cicleObj.x,cicleObj.y);
        obj.arc(cicleObj.x,cicleObj.y,cicleObj.r,changeAngale(sangle),changeAngale(fangle),false);
        obj.fill();
        obj.closePath();
      };
      //分档位画圆弧
      var radRange;
      var starRad = 135;
      //存储档位分段处的点数
      var radSectionArr = [];
      var drawDeliverCircle = function (n,obj,cicleObj) {
        radRange = (270-(n-1))/n;
        radSectionArr.push(starRad);
        var tempstrAngle = starRad;
        for(var i=1;i<=n;i++){
          drawRadian(cr1,deliverCircle,tempstrAngle,tempstrAngle+radRange);
          tempstrAngle = tempstrAngle+radRange+1;
          radSectionArr.push(tempstrAngle);
        };
        //画白色遮挡
        drawRadian(cr1,HideCircle,0,360);
      };
      //画档位圆
      drawDeliverCircle(5,cr1,deliverCircle);
      //处理选择怎加border
      var handlenapeListNapeLen = $scope.handlenapeListNape.length;
      $scope.selectNapes = function (index) {
        $scope.handlenapeListNape[index].selecFlag = !$scope.handlenapeListNape[index].selecFlag;
        for(var i=0;i<handlenapeListNapeLen;i++){
          if(i !== index){
            $scope.handlenapeListNape[i].selecFlag = false;
          }
        };
      };
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
        var i=0,j=0;
        for(i=0;i<radSectionArrLen;i++){
          if(changeRadTemp === radSectionArr[i]){
            if(Math.abs(radSectionArr[i]-radSectionArr[i-1]) < Math.abs(radSectionArr[i]-radSectionArr[i+1])){
              //画档位线
              for(j=1;j<i;j++){
                drawRadian(cr3,deliverLine,radSectionArr[i-j-1]-1,radSectionArr[i-j-1]);
              };
            }else{
              //画档位线
              for(j=1;j<i+1;j++){
                drawRadian(cr3,deliverLine,radSectionArr[i-j-1]-1,radSectionArr[i-j-1]);
              };
            };
            radSectionArr.splice(i,1);
          }
        };
        //画白色遮挡
        drawRadian(obj,HideCircle,0,360);
      };
      //滑动停止时根据档位点的距离设定圆球停留的位置并填充
      var drawFillPos = function (obj,obj2,changeRad) {
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
        for(var i=0;i<radSectionArrLen;i++){
          if(changeRadTemp === radSectionArr[i]){
            if(Math.abs(radSectionArr[i]-radSectionArr[i-1]) < Math.abs(radSectionArr[i]-radSectionArr[i+1])){
              drawRadian(obj,FillCircle,starRad,radSectionArr[i-1]);
              drawc(obj2,radSectionArr[i-1]);
              for(j=1;j<i;j++){
                drawRadian(cr3,deliverLine,radSectionArr[i-j-1]-1,radSectionArr[i-j-1]);
              };
            }else{
              drawRadian(obj,FillCircle,starRad,radSectionArr[i+1]);
              drawc(obj2,radSectionArr[i+1]);
              //画档位线
              for(j=1;j<i+1;j++){
                drawRadian(cr3,deliverLine,radSectionArr[i-j-1]-1,radSectionArr[i-j-1]);
              };
            };
            radSectionArr.splice(i,1);
          }
        };
      };
      //画圆球和指示标识
      var  drawc = function (obj,ancr) {
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
          drawCircleFill(cr3,ancr)
        };
      };
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
      var tempX = 0,tempY = 0;
      function start(ev){
        console.log(1)
        ev.preventDefault();
        bStart = 1;
        var poi = getEvtLocation(ev);
        bginX = poi.x;
        bginY = poi.y;
      };
      function getAngle(px,py,mx,my){//获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
        var x = Math.abs(px-mx);
        var y = Math.abs(py-my);
        var z = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
        var cos = y/z;
        var radina = Math.acos(cos);//用反三角函数求弧度
        var angle = 180/(Math.PI/radina);//将弧度转换成角度
        if(mx>px&&my>py){//鼠标在第四象限
          angle = 180 - angle;
        }
        if(mx==px&&my>py){//鼠标在y轴负方向上
          angle = 180;
        }
        if(mx>px&&my==py){//鼠标在x轴正方向上
          angle = 90;
        }
        if(mx<px&&my>py){//鼠标在第三象限
          angle = 180+angle;
        }
        if(mx<px&&my==py){//鼠标在x轴负方向
          angle = 270;
        }
        if(mx<px&&my<py){//鼠标在第二象限
          angle = 360 - angle;
        }
        return angle-90;
      };
      function move(ev){
        ev.preventDefault();
        if(bStart === 0)return;
        var poi = getEvtLocation(ev);
        tempX = poi.x;
        tempY = poi.y;
        if(endX && endX) {
          drawc(cr2,getAngle(canvsscreenHeight, canvsscreenHeight, endX, endY));
          endX = "";
          endY="";
        }else {
          drawc(cr2,getAngle(canvsscreenHeight,canvsscreenHeight,poi.x,poi.y));
        };
      };
      function end (ev) {
        ev.preventDefault();
        bStart = 0;
        endX = tempX;
        endY = tempY;
        drawFillPos(cr3,cr2,getAngle(canvsscreenHeight, canvsscreenHeight, endX, endY))
      };
      function getEvtLocation(ev){
        var touch = ev.touches[0];
        return{
          x : touch.clientX,
          y : touch.clientY
        }
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
