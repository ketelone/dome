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
              checkVersionService) {

    $scope.handlenapeListNape = [
      {
        imgUrl: "build/img/toilet-controller/dachong.png",
        handleDes: "大冲",
        selecFlag:"true"
      },
      {
        imgUrl: "build/img/toilet-controller/dachong.png",
        handleDes: "小冲",
        selecFlag:"true"
      },
      {
        imgUrl: "build/img/toilet-controller/dachong.png",
        handleDes: "女用",
        selecFlag:"true"
      },
      {
        imgUrl: "build/img/toilet-controller/dachong.png",
        handleDes: "臀洗",
        selecFlag:"true"
      },
      {
        imgUrl: "build/img/toilet-controller/dachong.png",
        handleDes: "圈温",
        selecFlag:"true"
      },
      {
        imgUrl: "build/img/toilet-controller/dachong.png",
        handleDes: "暖风",
        selecFlag:"true"
      },
      {
        imgUrl: "build/img/toilet-controller/dachong.png",
        handleDes: "灯光",
        selecFlag:"true"
      },
      {
        imgUrl: "build/img/toilet-controller/dachong.png",
        handleDes: "暖脚",
        selecFlag:"true"
      },
      {
        imgUrl: "build/img/toilet-controller/dachong.png",
        handleDes: "便盖",
        selecFlag:"true"
      },
      {
        imgUrl: "build/img/toilet-controller/dachong.png",
        handleDes: "翻盖",
        selecFlag:"true"
      },
      {
        imgUrl: "build/img/toilet-controller/dachong.png",
        handleDes: "翻圈",
        selecFlag:"true"
      },
      {
        imgUrl: "build/img/toilet-controller/dachong.png",
        handleDes: "设置",
        selecFlag:"true"
      },
    ]
      var canvsscreenHeight = document.getElementById("toilet-parameterctl").offsetHeight;
      document.getElementById("mycanvas01").width = canvsscreenHeight;
      document.getElementById("mycanvas01").height = canvsscreenHeight;
      var deliverCircle = new initCircle(canvsscreenHeight/2,canvsscreenHeight/2,canvsscreenHeight/2,"#6ACBB3");
      var HideCircle = new initCircle(canvsscreenHeight/2,canvsscreenHeight/2,canvsscreenHeight/2-20,"black");
      var cr1 = getCanvesObj("mycanvas01");
      console.log(deliverCircle)
      // var deliverLine = new initCircle(250,250,100,"white");
      // var rollCircle = new initCircle(250,250,90,"red");
      // var FillCircle = new initCircle(250,250,100,"#6ACBB3");

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

    }]);
