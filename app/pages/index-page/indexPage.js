/**
 * Created by daidongdong on 17/43/20.
 */

angular.module('indexPageModule')

  .controller('indexPageCtrl', [
    '$scope',
    '$state',
    '$ionicGesture',
    'baseConfig',
    '$timeout',
    '$ionicScrollDelegate',
    '$http',
    '$ionicHistory',
    'hmsPopup',
    function ($scope,
              $state,
              $ionicGesture,
              baseConfig,
              $timeout,
              $ionicScrollDelegate,
              $http,$ionicHistory,
              hmsPopup) {

      $scope.isSceneModel = true;
      $scope.isDeviceModel = false;
      $scope.isOneLine = true;
      $scope.isSecondLine = false;
      $scope.homeInfo = {
        temperature: "",
        percentage: "",
        temperatureCh: ""
      };

      $scope.tabs = [
        {
          text: "场景模式",
        },
        {
          text: "设备模式",
        }
      ];

      $scope.modelData = [
        {
          id: "1",
          pictureUrl: 'build/img/index/img_home_gohome.png',
          title: "回家",
          context: "一键开启指定设备",
          isOneButton: true,
          isTwoButton: false,
          jsonContext: "1",
          isOff: false,
          lastUpdateDate: ""
        },
        {
          id: "2",
          pictureUrl: 'build/img/index/img_home_morning.png',
          title: "晨起",
          context: "告别匆忙的晨起洗漱",
          isOneButton: true,
          isTwoButton: false,
          jsonContext: "1",
          isOff: false,
          lastUpdateDate: ""
        },
        {
          id: "3",
          pictureUrl: 'build/img/index/img_home_leavehome.png',
          title: "离家",
          context: "一键关闭所有设备",
          isOneButton: true,
          isTwoButton: false,
          jsonContext: "1",
          isOff: false,
          lastUpdateDate: ""
        },
        {
          id: "4",
          pictureUrl: 'build/img/index/img_home_spa.png',
          title: "家庭SPA",
          context: "出去SPA不如在家泡澡",
          isOneButton: false,
          isTwoButton: true,
          jsonContext: "1",
          isOff: false,
          lastUpdateDate: ""
        },
        {
          id: "5",
          pictureUrl: 'build/img/index/img_home_veil.png',
          title: "维亚灯光",
          context: "开始您美好的一天",
          isOneButton: false,
          isTwoButton: true,
          jsonContext: "1",
          isOff: false,
          lastUpdateDate: ""
        },
        {
          id: "6",
          pictureUrl: 'build/img/index/img_home_period.png',
          title: "大姨了吗",
          context: "女性特殊期洗浴关怀方案",
          isOneButton: false,
          isTwoButton: true,
          jsonContext: "1",
          isOff: false,
          lastUpdateDate: ""
        }
      ];

      $scope.deviceModel = [
        {
          id: "1",
          pictureUrl: "build/img/index/img_home_device_toliet.png",
          deviceType: "马桶",
          deviceStatus: "设备在线",
          deviceDesc: "有人使用",
          statusPictureUrl: "build/img/index/icon_home_device_signal5.png",
          errorPictureUrl: "",
          isStatus: true,
          isError: false,
          sku: "1"
        },{
          id: "2",
          pictureUrl: "build/img/index/icon_home_device_room.png",
          deviceType: "卫生间",
          deviceStatus: "4个设备",
          deviceDesc: "",
          statusPictureUrl: "",
          errorPictureUrl: "",
          isStatus: false,
          isError: false,
          sku: "2"
        },{
          id: "3",
          pictureUrl: "build/img/index/img_home_device_heater.png",
          deviceType: "浴霸",
          deviceStatus: "设备在线",
          deviceDesc: "80%",
          statusPictureUrl: "build/img/index/icon_home_device_signal4.png",
          errorPictureUrl: "",
          isStatus: true,
          isError: false,
          sku: "F7:B3:24:A9:34:77"
        },{
          id: "4",
          pictureUrl: "build/img/index/img_home_device_sensor.png",
          deviceType: "溢水传感器",
          deviceStatus: "设备在线",
          deviceDesc: "发生溢水",
          statusPictureUrl: "build/img/index/icon_home_device_signal3.png",
          errorPictureUrl: "build/img/index/icon_home_device_warnning.png",
          isStatus: true,
          isError: true,
          sku: "4"
        },
        {
          id: "5",
          pictureUrl: "build/img/index/img_home_device_chushuifa.png",
          deviceType: "出水阀",
          deviceStatus: "设备离线",
          deviceDesc: "",
          statusPictureUrl: "build/img/index/icon_home_device_no_singal.png",
          errorPictureUrl: "build/img/index/icon_home_device_warnning.png",
          isStatus: true,
          isError: true,
          sku: "5"
        }
      ];

      $scope.boxList = [];

      $scope.$watch('', function(){
        //localStorage.deviceInfo = "1:001;2:002;3:003";
        searchBox();
      }, true);

     /* $scope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParam){

        if(toState.name == 'tabs'){
          searchBox();
          if($scope.boxList.length > 0){
            angular.forEach($scope.boxList, function(data, index, array) {
              boxLink(data);
              selectDeviceOn(data.payload.cmd_properties.device_id);
            });
          }
        }
      });*/

      document.addEventListener('SocketPlugin.receiveTcpData', function (result) {
        hmsPopup.showShortCenterToast("开始返回数据！");
        var resultOn = result;
        $scope.deviceOff = resultOn.payload.cmd_properties.device_list;
        if (resultOn.payload.cmd == "LIST_BONDED_DEVICE_RETURN") {
          localStorage.device_id = resultOn.payload.cmd_properties.device_list[0].device_id;
          //循环device list 取出device id，并降deviceid与相应页面的设备做关联
          var deviceLinkInfo = "";
          angular.forEach(resultOn.payload.cmd_properties.device_list, function(data, index, array){
            deviceLinkInfo = deviceLinkInfo =="" ? (data.device_sku + ":" + data.device_id) : (deviceLinkInfo + ";" + data.device_sku + ":" + data.device_id);
          });
          //保存device 连接的信息。
          localStorage.deviceInfo = deviceLinkInfo;

          if ($scope.deviceOn.length == 0) {
            hmsPopup.showShortCenterToast("没有已连接设备，请搜索未连接设备");
          }
        }

        if (resultOn.payload.cmd == "SCAN_RETURN") {
          console.log(resultOn.payload.cmd_properties.device_list);
          if ($scope.deviceOff.length == 0) {
            hmsPopup.showShortCenterToast("没有设备");
          }
          $scope.$apply();
        }

      }, false);

      /**
       *@autor: caolei
       *@return: box ip
       *@disc: search box
       */
      var searchBox = function () {
        var cmd = {
          "from": {"cid": "0xE3"},
          "to": {"cid": "0xE4"},
          "ts": Date.parse(new Date()) / 1000,
          "idx": 0,
          "method": "CTL",
          "payload": {
            "cmd": "SCAN_BOX_REQUEST",
            "cmd_properties": {
              "scan_box_request": "KOHLER_BOX_SEARCH"
            }
          }
        };
        cordova.plugins.SocketPlugin.udpBroadCast({
          "timeout": "5000",
          "ip": "255.255.255.255",
          "value": cmd//指令json
        }, success, error);
        function success(response) {
          // {
          //   from =     {
          //     cid = 0xE4;   表示来自box
          //   "device_id" = F9DA70C8;  box id
          // };
          //   idx = 0;          、指令的id
          //   method = RSP;     、指令的方式  写死
          //   payload =     {   、相应体
          //     cmd = "SCAN_BOX_RESPONSE";  、相应回复
          //   "cmd_properties" =         {  、设备box属性
          //     "device_id" = F9DA70C8;      、 box id
          //   ip = "192.168.1.172";          、box ip
          //   sku = "K-BOX";                  、sku号
          //   sn = 0123456789abcdef;           、对应云端id
          // };
          // };
          //   to =     {                 、目标
          //     cid = 0xE3;                、app
          // };
          //   ts = 1492136310;             、时间戳
          // }
          //localStorage.boxIp = response.payload.cmd_properties.ip;
          $scope.boxList = response;
          hmsPopup.hideLoading();
          $scope.$apply();
          angular.forEach($scope.boxList, function(data, index, array){
            boxLink(data);
          });
          //boxLink($scope.boxList[0]);
        }

        function error(error) {
          hmsPopup.showShortCenterToast("广播失败" + error);
        }
      };

      /**
       *@autor: caolei
       *@params: object box
       *@disc: link box
       */
      var boxLink = function (item) {
        console.log('lian box');
        cordova.plugins.SocketPlugin.tcpConnect({
          "timeout": "5000",
          "ip": item.payload.cmd_properties.ip,
        }, success, error);

        function success(response) {
          selectDeviceOn(item.payload.cmd_properties.device_id);
        }

        function error() {
          hmsPopup.showShortCenterToast("连接失败");
        }
      };

      /**
       *@autor: caolei
       *@params: device id
       *@disc: link device
       */
      var selectDeviceOn = function (device_id) {
        var cmd = {
          "from": {"cid": "0xE3"},
          "to": {"cid": "0xE4", "device_id": device_id},
          "ts": Date.parse(new Date()) / 1000,
          "idx": 0,
          "method": "CTL",
          "payload": {
            "cmd": "LIST_BONDED_DEVICE_REQUEST",
            "cmd_properties": ""
          }
        };
        cordova.plugins.SocketPlugin.tcpSendCmd({
          "timeout": "5000",
          "value": cmd
        }, success, error);

        function success(response) {
          hmsPopup.showShortCenterToast("搜索已连接设备成功");
        }

        function error() {
          hmsPopup.showShortCenterToast("搜索已连接设备失败");
        }
      };

      /**
       *@autor: caolei
       *@params: modelType
       *@disc: change model
       */
      $scope.changeModel = function(modelType){
        if(modelType == "场景模式"){
          $scope.isSceneModel = true;
          $scope.isDeviceModel = false;
          $("#line").removeClass('height-light2');
          $("#line").addClass('height-light');
        }else{
          $scope.isSceneModel = false;
          $scope.isDeviceModel = true;
          $("#line").removeClass('height-light');
          $("#line").addClass('height-light2');
        }
      };

      /**
       *@autor: caolei
       *@params: item
       *@disc: get switch status
       */
      $scope.getSwitchStatus = function(item){
        //console.log(item);
        alert(item.isOff);
        if(item.isOff){
          //alert("on");
          if(checkIsLinkBox){
            var netType = network();
            if(netType == '无网络链接'){

            }else{
              //do post
            }
          }

        }else{
          alert("off");
        }
      };
      console.log($ionicHistory);

      var checkIsLinkBox = function(){
        return true;
      };

      $scope.getDeviceInfo = function(item){
        if(item.deviceType == "浴霸"){
          $state.go('bathroom',{deviceSku: item.sku});
        }
      };

      $scope.addModule = function(){
        alert("in-----addModule");
      };

      $scope.addDevice = function(){
        $state.go('deviceList');
      };

    }
  ]);




 /*     $scope.goNumiProduct = function(){
        $state.go('toilet');
      };
      $scope.goBigAunt = function(){
        $state.go('goHome');
      };

      $scope.animationsEnabled = false;
      $scope.openDoor = 0;
      $scope.fetchWorkflowData = true;
      $scope.hasCrm = window.localStorage.crm == 'true';
      $scope.titleBg = 'build/img/application/banner@3x.png';

      var menuFetchFlag = false;


      $scope.bgLoaded = false;

      $scope.onLoadBg = function () {
        $scope.bgLoaded = true;
      };


      $scope.imgHeight = 0;

      $timeout(function () {
        $scope.imgHeight = angular.element('.calendar-container')[0].clientHeight - 5;
      }, 500);

      $scope.headerStyle = {
        opacity: 0
      };

      $scope.showHeader = false;

      $scope.bgStyle = {};

      $scope.searchStyle = {};

      $scope.onDragContent = function () {
        var top = $ionicScrollDelegate.getScrollPosition().top;
        if (top <= 0) {
          var scrollHeight = 0 - top;
          var scale = ((scrollHeight + $scope.imgHeight) / $scope.imgHeight).toFixed(2);
          $scope.bgStyle = {
            "transform": "scale(" + scale + ")",
            "-webkit-transform": "scale(" + scale + ")"
          };
          $scope.searchStyle = {};
        }

        else {
          if (ionic.Platform.isIOS())
            $scope.searchStyle = {
              top: 30 - top + "px"
            };
          else
            $scope.searchStyle = {
              top: 10 - top + "px"
            };
        }

        if (top >= $scope.imgHeight) {
          $scope.headerStyle.opacity = 1;
          return;
        }
        if (top <= 0) {
          $scope.headerStyle.opacity = 0;
          $scope.showHeader = false;
          return;
        }
        $scope.showHeader = true;
        $scope.headerStyle.opacity = (top / $scope.imgHeight).toFixed(1);
      };

      $scope.onSwipeContent = function () {
        $timeout(function () {
          var top = $ionicScrollDelegate.getScrollPosition().top;
          if (top >= $scope.imgHeight) {
            $scope.headerStyle.opacity = 1;
            return;
          }
          if (top <= 0) {
            $scope.headerStyle.opacity = 0;
            $scope.showHeader = false;
            return;
          }
          $scope.showHeader = true;
          $scope.headerStyle.opacity = (top / $scope.imgHeight).toFixed(1);
        }, 500);
      };

      $scope.onReleaseContent = function () {
        $scope.bgStyle = {
          "transition": "all 0.5s",
          "-webkit-transition": "all 0.5s",
          "transform": "scale(1)",
          "-webkit-transform": "scale(1)"
        };
      };


      $scope.onRelease = function () {
        if (baseConfig.debug) {
          console.log('$scope.onRelease');
        }
        $scope.animationsEnabled = false;
      };



      $scope.tabs = [
        {
          text: "场景模式",
        },
        {
          text: "设备模式",
        },
      ];
    }])
  .directive('onFinishRender', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        if (scope.$last === true) {
          $timeout(function () {
            scope.$emit('ngRepeatFinished');
          });
        }
      }
    }
  }).directive('hmsTabSlideBox', ['$timeout', '$window', '$ionicSlideBoxDelegate', '$ionicScrollDelegate', '$state',
  function ($timeout, $window, $ionicSlideBoxDelegate, $ionicScrollDelegate) {
    return {
      restrict: 'ACE',
      link: function (scope, element, attrs) {
        var ta = element[0], $ta = element;
        console.log(element[0]);
        console.log(element);

        //当页面存在多个滑动块时，需要用delegate-handle来标识
        var handle = ta.querySelector('.slider').getAttribute('delegate-handle');

        var ionicSlideBoxDelegate = $ionicSlideBoxDelegate;
        var ionicScrollDelegate = $ionicScrollDelegate;

        function renderScrollableTabs() {
          var iconsDiv = angular.element(ta.querySelector(".tsb-icons")),
            icons = iconsDiv.find("a"),
            totalTabs = icons.length;

          angular.forEach(icons, function (value, key) {
            //  将a元素变成jQuery元素
            var a = angular.element(value);
            a.on('click', function () {
              ionicSlideBoxDelegate.slide(key);
            });
          })
          //如果属性上有设置tab值，将标签页初始化为tab值
          var initialIndex = attrs.tab;
          //初始化标签页为0
          if (typeof attrs.tab === 'undefined' || (totalTabs <= initialIndex) || initialIndex < 0) {
            initialIndex = 0;
          }

          //如果标签页为0，设置位置
          if (initialIndex == 0) {
            setPosition(0);
          }
          //初始化滑动页
          $timeout(function () {
            ionicSlideBoxDelegate.slide(initialIndex);
          }, 0);
        };

        //滚动条
        function heightlight(item) {
          var heightlight = document.querySelector('.heightLight');
          var client = item[0].getBoundingClientRect();
          var coords = {
            width: client.width,
            top: 0,
            left: item[0].offsetLeft
          };
          heightlight.style.width = coords.width + 'px';
          heightlight.style.transform = 'translate3d(' + coords.left + 'px,' + coords.top + 'px,0)'

        }

        function setPosition(index) {
          var iconsDiv = angular.element(ta.querySelector(".tsb-icons")), icons = iconsDiv.find("a"), wrap = iconsDiv[0].querySelector(".tsb-ic-wrp")
          var scrollDiv = wrap.querySelector(".scroll");
          console.log(scrollDiv);
          var middle = iconsDiv[0].offsetWidth / 2;
          console.log(iconsDiv[0].offsetWidth);
          var curEl = angular.element(icons[index]);
          console.log(curEl);

          //获取之前生效的元素
          var prvEl = angular.element(iconsDiv[0].querySelector(".active"));
          if (curEl && curEl.length) {
            var curElWidth = curEl[0].offsetWidth, curElLeft = curEl[0].offsetLeft;
            if (prvEl) {
              prvEl.removeClass("active");
            }
            curEl.addClass('active');
            //当前元素的中点跟左端中线的距离
            var leftStr = (middle - (curElLeft) - curElWidth / 2 + 5);
            if (!scrollDiv) {
              //如果标签条不能滚动，则直接将选中元素居中
              var leftStr = (middle - (curElLeft) - curElWidth / 2 + 5) + "px";
              wrap.style.webkitTransform = "translate3d(" + leftStr + ",0,0)";
            } else {
              //  如果能够滚动
              if (leftStr > 0) {
                leftStr = 0;
              }
              //将选中的标签滚动到屏幕中间
              ionicScrollDelegate.scrollTo(Math.abs(leftStr), 0, true);
              heightlight(curEl);
            }
          }
        };

        scope.events.on('slideChange', function (data) {
          setPosition(data.index);
        });
        scope.events.on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
          console.log(111)
          renderScrollableTabs();
        });

      },
      controller: function ($scope, $attrs, $element) {
        $scope.events = new SimplePubSub();
        $scope.slideHasChanged = function (index) {
          //切换页面时触发方法来切换标签
          console.log(222);
          $scope.events.trigger("slideChange", {"index": index});
        };
        //当repeat结束时，触发初始化方法
        $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
          console.log(ngRepeatFinishedEvent);
          $scope.events.trigger("ngRepeatFinished", {"event": ngRepeatFinishedEvent});
        });
      }
    }
  }]);


function SimplePubSub() {
  var events = {};
  return {
    on: function (names, handler) {
      console.log(names.split(' '));
      console.log(names);
      names.split(' ').forEach(function (name) {
        console.log(events[name]);
        if (!events[name]) {
          events[name] = [];
        }
        events[name].push(handler);
      });
      return this;
    },
    trigger: function (name, args) {
      console.log(events);
      angular.forEach(events[name], function (handler) {
        console.log(events[name]);
        console.log(handler);
        handler.call(null, args);
      });
      return this;
    }
  };
};*/

