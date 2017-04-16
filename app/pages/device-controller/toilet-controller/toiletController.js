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
      ];
      //侧滑转档数量json
      $scope.slideNyData =[{
        des:"水温档位",
        gearNum:5,
        gearInit:1,
        parameterctlFlag:false,
        parNodeid:'toilet-parameterctl',
        canves01:"nYcanves01",
        canves02:"nYcanves02",
        canves03:"nYcanves03",
      }]

      var initCircle = function (slideDataObj) {
        //获取父元素高度
        this.canvsscreenHeight = document.getElementById(slideDataObj.parNodeid).offsetHeight;
        this.canvsscreenWidth = document.getElementById(slideDataObj.parNodeid).offsetWidth;
        // 设置每个canves的宽高
        document.getElementById(slideDataObj.canves01).height = this.canvsscreenHeight;
        document.getElementById(slideDataObj.canves01).width = this.canvsscreenWidth;
        document.getElementById(slideDataObj.canves02).height = this.canvsscreenHeight;
        document.getElementById(slideDataObj.canves01).width = this.canvsscreenWidth;
        document.getElementById(slideDataObj.canves03).height = this.canvsscreenHeight;
        document.getElementById(slideDataObj.canves03).width = this.canvsscreenWidth;
        // 获取canvesobj
        this.cr1 = getCanvesObj(slideDataObj.canves01);//档位canves
        this.cr2 = getCanvesObj(slideDataObj.canves02);//滑动小球档位canves
        this.cr3 = getCanvesObj(slideDataObj.canves03);//颜色填充档位canves
        this.cr2obj = getIdObj(slideDataObj.canves02);
        //四种圆
        this.deliverCircle = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2,color:"#2F3538"};//档位圆
        this.HideCircle = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2-20,color:"black"};//档位圆
        this.deliverLine = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2,color:"black"};//档位线
        this.rollCircle = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2-10,color:"white"};//小球圆
        this.FillCircle = {x:this.canvsscreenHeight/2,y:this.canvsscreenWidth/2,r:this.canvsscreenHeight/2,color:"#6ACBB3"};//填充圆
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
          for(this.i;this.i<this.radSectionArrLen;this.i++){
            if(changeRadTemp === this.radSectionArr[i]){
              if(Math.abs(this.radSectionArr[this.i]-this.radSectionArr[this.i-1]) < Math.abs(this.radSectionArr[this.i]-this.radSectionArr[this.i+1])){
                this.stoPosPoint = this.i-1;
                if(this.i<=1){
                  $scope.toiletController.gear = 1;
                }else{
                  $scope.toiletController.gear = this.i;
                };
                $scope.$apply();
                //画档位线
                this.j=1;
                for(this.j;this.j<this.i;this.j++){
                  drawRadian(this.cr3,this.deliverLine,this.radSectionArr[this.i-this.j-1]-1,this.radSectionArr[this.i-this.j-1]);
                };
              }else{
                this.stoPosPoint = this.i;
                $scope.toiletController.gear = this.i+1;
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
              this.drawCircleFill(cr3,ancr)
            }
          };
        };

        var hasTouch = 'ontouchstart' in window;
        var STA_EN = hasTouch ? "touchstart" : "mousedown",
          MV_EV = hasTouch ? "touchmove":"mousemove",
          END_EV = hasTouch ? "touchend" : "mouseup",
          END_Cancel = hasTouch ? "touchcancel" : "mouseout";
        console.log(STA_EN)
        this.cr2obj.addEventListener(STA_EN,this.start,false);
        this.cr2obj.addEventListener(MV_EV,this.move,false);
        this.cr2obj.addEventListener(END_EV,this.end,false);
        this.cr2obj.addEventListener(END_EV,this.end,false);
        console.log(this)
        this.start = function(ev){
          console.log(ev)
          ev.preventDefault();
          // bStart = 1;
          var poi = this.getEvtLocation(ev);
          bginX = poi.x;
          bginY = poi.y;
        };
        this.move = function(ev){
          ev.preventDefault();
          if(bStart === 0)return;
          var poi = this.getEvtLocation(ev);
          this.drawc(this.cr2,getAngle(this.canvsscreenHeight,this.canvsscreenWidth,poi.x,poi.y));
        };
        this.end = function(ev) {
          ev.preventDefault();
          // bStart = 0;
          this.drawc(this.cr2,this.radSectionArr[this.stoPosPoint]);
        };
        this.getEvtLocation = function(ev){
          var touch = ev.touches[0];
          return{
            x : touch.clientX,
            y : touch.clientY
          }
        };

      };
      setTimeout(function () {
        var  ll = new initCircle($scope.slideNyData[0])
        ll.drawDeliverCircle($scope.slideNyData[0].gearNum);
        ll.drawc(ll.cr2,230,"type");
      },40)

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
