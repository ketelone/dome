/**
 *@autor: caolei
 */
angular.module('bathroomModule')
  .controller('bathroomCtrl',[
    '$scope',
    '$state',
    function($scope, $state){

      $scope.bathroomData = [
        {
          id: "1",
          switchPictureUrl: "build/img/bathroom/hot.png",
          isOpen: false,
          isCommon: true,
          isSetting: false,
          isBreathSwitch: false,
          isOpenTimer: false,
          switchType: "Hot",
          desc: "热风"
        },
        {
          id: "2",
          switchPictureUrl: "build/img/bathroom/hot.png",
          isOpen: false,
          isCommon: true,
          isSetting: false,
          isBreathSwitch: false,
          isOpenTimer: false,
          switchType: "Cool",
          desc: "凉风"
        },
        {
          id: "3",
          switchPictureUrl: "build/img/bathroom/hot.png",
          isOpen: false,
          isCommon: true,
          isSetting: false,
          isBreathSwitch: false,
          isOpenTimer: false,
          switchType: "Dryer",
          desc: "冷干"
        },
        {
          id: "4",
          switchPictureUrl: "build/img/bathroom/hot.png",
          isOpen: false,
          isCommon: true,
          isSetting: false,
          isBreathSwitch: false,
          isOpenTimer: false,
          switchType: "Hot drying",
          desc: "热干"
        },
        {
          id: "5",
          switchPictureUrl: "build/img/bathroom/hot.png",
          isOpen: false,
          isCommon: false,
          isSetting: false,
          isBreathSwitch: true,
          isOpenTimer: false,
          switchType: "Breath",
          desc: "换气"
        },
        {
          id: "6",
          switchPictureUrl: "build/img/bathroom/hot.png",
          isOpen: false,
          isCommon: true,
          isSetting: false,
          isBreathSwitch: false,
          isOpenTimer: false,
          switchType: "Purify",
          desc: "空气净化"
        },
        {
          id: "7",
          switchPictureUrl: "build/img/bathroom/hot.png",
          isOpen: false,
          isCommon: true,
          isSetting: false,
          isBreathSwitch: false,
          isOpenTimer: false,
          switchType: "Wind direction",
          desc: "风向"
        },
        {
          id: "8",
          switchPictureUrl: "build/img/bathroom/hot.png",
          isOpen: false,
          isCommon: true,
          isSetting: false,
          isBreathSwitch: false,
          isOpenTimer: false,
          switchType: "Light",
          desc: "照明"
        },
        {
          id: "9",
          switchPictureUrl: "build/img/bathroom/hot.png",
          isOpen: false,
          isCommon: false,
          isSetting: true,
          isBreathSwitch: false,
          isOpenTimer: false,
          switchType: "Setting",
          desc: "设置"
        }

      ];
      $scope.isBreath = false;
      $scope.isWindShow = false;

      /**
       *@autor: caolei
       *@params: object device
       *@return: true or false
       *@disc: get relative device is open
       */
      $scope.getInfo = function(item){
        //热风，凉风，冷干，热干，换气，空气净化功能互斥

        if(item.isOpen){

          if(checkIsOk(item)){
            alert("正常打开");
            return true;
          }else{
            if(item.switchType == 'Wind direction'){
              alert("请打开热风或者凉风或者冷干或者热干的功能");
            }else{
              alert("请关闭其它功能");
            }
            return false;
          }
        }
      };

      /**
       *@autor: caolei
       *@params: object device
       *@return: true or false
       *@disc: check device's function is ok
       */
      var checkIsOk = function(item){
        var flag = true;
        angular.forEach($scope.bathroomData, function(data, index, array) {
          if ((data.switchType != item.switchType) && (item.switchType != 'Wind direction' && item.switchType != 'Light' && item.switchType != 'Setting' && data.isOpen)) {
            item.isOpen = false;
            flag = false;
          }
        });
        var isWind = false;
        if(item.switchType == 'Wind direction'){
          angular.forEach($scope.bathroomData, function(data, index, array) {
            if ((data.switchType != item.switchType) && ((data.switchType == 'Hot' || data.switchType == 'Cool' || data.switchType == 'Dryer' || data.switchType == 'Hot drying') && data.isOpen)) {
              item.isOpen = true;
              isWind = true;
            }
          });
          if(!isWind){
            item.isOpen = false;
          }
          return isWind;
        }
        return flag;
      };

      $scope.getCommon = function(item){
        alert("in----");
      };

      $scope.getAllDay = function(item){
        alert("in----all day");
      };

      /**
       *@autor: caolei
       *@params: true or false
       *@disc: change the value of isBreath and isWindShow
       */
      $scope.showType = function(item){

        if(item.isOpen){
          if(checkIsOk(item)){
            $scope.isBreath = true;
            $scope.isWindShow = true;
          }else{
            alert("请关闭其它功能");
          }
        }else{
          $scope.isBreath = false;
        }
      };

      /**
       *@autor: caolei
       *@params: true or false
       *@disc: close navigation button
       */
      $scope.closeNav = function(item){
        $scope.isWindShow = false;
      };

      /**
       *@autor: caolei
       *@disc: go to barthroomSet page
       */
      $scope.getBathroomInfo = function(){
        $state.go('bathroomSet');
      };

      /**
       *@autor: caolei
       *@disc: open timer
       */
      $scope.openTimer = function(){
        alert("in");

        var hasOpenCount = 0;
        var deviceInfo = [];

        angular.forEach($scope.bathroomData, function(data, index, array){

          if(!data.isSetting && data.isOpen){
            hasOpenCount = hasOpenCount + 1;
            deviceInfo.push(data);
          }

          if(!data.isSetting  && data.isOpen){

          }

        });

        if(hasOpenCount){
          alert("可以开启定时功能");
          console.log(deviceInfo);

        }else{
          alert("不能开启定时功能");
        }

      }

  }]);
