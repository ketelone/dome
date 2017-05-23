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
    'SettingsService',
    'hmsHttp',
    '$translate',
    'cmdService',
    '$window',
    'indexPageService',
    '$rootScope',
    function ($scope,
              $state,
              $ionicGesture,
              baseConfig,
              $timeout,
              $ionicScrollDelegate,
              $http,
              $ionicHistory,
              hmsPopup,
              SettingsService,
              hmsHttp,
              $translate,
              cmdService,
              $window,
              indexPageService,
              $rootScope) {
      window.localStorage.token = '4f75ed43-aee2-4f35-895e-7d3f086ddf86';
      window.localStorage.empno = '18620025571';
      window.localStorage.checkboxSavePwd = 'admin';
      console.log(window.localStorage.token);

      $scope.isSceneModel = true;
      $scope.isDeviceModel = false;
      $scope.isOneLine = true;
      $scope.isSecondLine = false;
      $scope.isBigScreen = $window.innerWidth > 1000 ? false : true;
      $scope.isMorning = false;
      $scope.isLeave = false;
      $scope.homeInfo = {
        temperature: "",
        percentage: "",
        temperatureCh: ""
      };
      var ishidden = false;
      $scope.tabs = [
        {
          text: "index.model",
          id: "1"
        },
        {
          text: "index.device",
          id: "2"
        }
      ];
      $scope.modelData = [];
      if (!baseConfig.isLinkDatabase) {
        //$scope.modelData = [
        //  // {
        //  //   id: "1",
        //  //   pictureUrl: 'build/img/index/img_home_gohome.png',
        //  //   title: "回家",
        //  //   context: "一键开启指定设备",
        //  //   isOneButton: true,
        //  //   isTwoButton: false,
        //  //   jsonContext: "1",
        //  //   isOff: false,
        //  //   lastUpdateDate: ""
        //  // },
        //  {
        //    id: "2",
        //    pictureUrl: 'build/img/index/img_home_morning.png',
        //    title: "晨起",
        //    context: "告别匆忙的晨起洗漱",
        //    isOneButton: true,
        //    isTwoButton: false,
        //    jsonContext: "1",
        //    isOff: false,
        //    lastUpdateDate: "",
        //    buttonName:"开启",
        //    buttonStatus:false
        //  },
        //  {
        //    id: "1",
        //    pictureUrl: 'build/img/index/img_home_leavehome.png',
        //    title: "离家",
        //    context: "一键关闭所有设备",
        //    isOneButton: true,
        //    isTwoButton: false,
        //    jsonContext: "1",
        //    isOff:  false,
        //    lastUpdateDate: "",
        //    buttonName:"开启",
        //    buttonStatus:false
        //  },
        //  {
        //    id: "4",
        //    pictureUrl: 'build/img/index/img_home_spa.png',
        //    title: "泡澡",
        //    context: "出去SPA不如在家泡澡",
        //    isOneButton: false,
        //    isTwoButton: true,
        //    jsonContext: "1",
        //    isOff:  false,
        //    lastUpdateDate: "",
        //    buttonName:"开启",
        //    buttonStatus:false
        //  },
        //  {
        //    id: "3",
        //    pictureUrl: 'build/img/index/muyu@3x.png',
        //    title: "沐浴",
        //    context: "享受沐浴",
        //    isOneButton: false,
        //    isTwoButton: true,
        //    jsonContext: "1",
        //    isOff:  false,
        //    lastUpdateDate: "",
        //    buttonName:"开启",
        //    buttonStatus:false
        //  },
        //  {
        //    id: "5",
        //    pictureUrl: 'build/img/index/img_home_veil.png',
        //    title: "维亚灯光",
        //    context: "开始您美好的一天",
        //    isOneButton: false,
        //    isTwoButton: false,
        //    jsonContext: "1",
        //    isOff:  false,
        //    lastUpdateDate: "",
        //    buttonName:"开启",
        //    buttonStatus:false
        //  },
        //  {
        //    id: "6",
        //    pictureUrl: 'build/img/index/img_home_period.png',
        //    title: "大姨了吗",
        //    context: "女性特殊期洗浴关怀方案",
        //    isOneButton: false,
        //    isTwoButton: false,
        //    jsonContext: "1",
        //    isOff:  false,
        //    lastUpdateDate: "",
        //    buttonName:"开启",
        //    buttonStatus:false
        //  }
        //];
        $scope.modelData = indexPageService.getScaneList();
      }


      $scope.isInPage = 2;
      $scope.goKeyscene = function (item, index) {
        if ($scope.isInPage == 1) {
          $scope.isInPage = 2;
          return;
        }
        window.localStorage.setItem('crrentScane', JSON.stringify($scope.modelData[index]));
        console.log('过去=' + JSON.stringify($scope.modelData[index]));
        window.localStorage.setItem('crrentScanesku', "D7:12:29:DF:76:06");

        if (item.id == '1') {
          $state.go('leaveHome');
        } else if (item.id == '2') {
          $state.go('morning');
        } else if (item.id == '3') {
          $state.go('bathing');
        } else if (item.id == '4') {
          $state.go('spa');
        } else if (item.id == '5') {
          $state.go('veil');
        } else if (item.id == '6') {
          $state.go('period');
        }

        db.transaction(function (tx) {
          tx.executeSql('update T_CTM_PARTY_SCENARIO set LAST_UPDATE_DATE = "' + getNowFormatDate() + '" where SCENARIO_ID = ' + item.id);

        });
        //var data = $scope.modelData[index];
        //
        //$scope.modelData.splice(index, 1);
        //$scope.modelData.splice(0, 0, data);
        //$scope.modelData = [];
        //getScenarioList();
      };


      $scope.changeStatus = function (index) {
        console.log('调用方法');
        if ($scope.modelData[index].buttonName == '开启中') {
          return 0;
        } else {
          $scope.modelData[index].buttonName = '开启中'
          $scope.modelData[index].buttonStatus = true;
        }

      }

      $scope.deviceModel = [];
      if (!baseConfig.isLinkDatabase) {
        $scope.deviceModel = [
          {
            id: "1",
            pictureUrl: "build/img/index/img_home_device_toliet.png",
            deviceType: "index.toliet",
            deviceStatus: "index.online",
            deviceDesc: "",
            statusPictureUrl: "build/img/index/icon_home_device_signal5.png",
            errorPictureUrl: "",
            isStatus: true,
            isError: false,
            sku: ["K-3900T","K-3900T-2"]
          }, {
            id: "2",
            pictureUrl: "build/img/index/water_purifier_compressed.png",
            deviceType: "index.waterPurifier",
            deviceStatus: "index.online",
            deviceDesc: "",
            statusPictureUrl: "build/img/index/icon_home_device_signal4.png",
            errorPictureUrl: "",
            isStatus: true,
            isError: false,
            sku: ["K-78436T-PPX10-01R"]
          }, {
            id: "3",
            pictureUrl: "build/img/index/img_home_device_heater.png",
            deviceType: "index.bathroomHeader",
            deviceStatus: "index.online",
            deviceDesc: "26℃，60%",
            statusPictureUrl: "build/img/index/icon_home_device_signal4.png",
            errorPictureUrl: "",
            isStatus: true,
            isError: false,
            sku: ['K-77316T-X-MZ','EB:4E:28:49:09:9D']
          },
          {
            id: "6",
            pictureUrl: "build/img/index/karess.png",
            deviceType: "index.bathtub",
            deviceStatus: "index.online",
            deviceDesc: "26℃",
            statusPictureUrl: "build/img/index/icon_home_device_signal5.png",
            errorPictureUrl: "build/img/index/icon_home_device_warnning.png",
            isStatus: true,
            isError: false,
            sku: ["K-76448T-XW-0","K-23044T-XWGR-0"]
          },
          {
            id: "7",
            pictureUrl: "build/img/index/next.png",
            deviceType: "index.nextgen",
            deviceStatus: "index.online",
            deviceDesc: "",
            statusPictureUrl: "build/img/index/icon_home_device_signal4.png",
            errorPictureUrl: "build/img/index/icon_home_device_warnning.png",
            isStatus: true,
            isError: false,
            sku: ['K-99879T-7-CP']//"E8:91:E0:DC:20:F1"//F0:F0:87:F5:A2:17
          },
          {
            id: "8",
            pictureUrl: "build/img/index/air.png",
            deviceType: "index.airfoilShower",
            deviceStatus: "index.online",
            deviceDesc: "30℃",
            statusPictureUrl: "build/img/index/icon_home_device_signal5.png",
            errorPictureUrl: "build/img/index/icon_home_device_warnning.png",
            isStatus: true,
            isError: false,
            sku: ['K-SHOWER-NA']
          },
          {
            id: "9",
            pictureUrl: "build/img/index/Grooming.png",
            deviceType: "index.mc",
            deviceStatus: "index.online",
            deviceDesc: "",
            statusPictureUrl: "build/img/index/icon_home_device_signal3.png",
            errorPictureUrl: "build/img/index/icon_home_device_warnning.png",
            isStatus: true,
            isError: false,
            sku: ["K-77115T-NA"]
          }
        ];
      }

      $scope.temperature = "20";
      $scope.humidity = "30";

      $scope.boxList = [];

      var islinkHidden = false;
      $scope.linkBox = function () {
        hmsPopup.showLoading('<span translate="golabelvariable.loadingdata"></span>');
        $timeout(function () {
          if (!islinkHidden) {
            hmsPopup.hideLoading();
            $scope.Toast.show($translate.instant("golabelvariable.linkError"));
          }
        }, 15000);
        searchBox();
      };


      var getNowFormatDate = function () {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
          + " " + date.getHours() + seperator2 + date.getMinutes()
          + seperator2 + date.getSeconds();
        return currentdate;
      }

      var getWeather = function () {
        var url = baseConfig.basePath + "/rr/api?sysName=seniverseWeather&apiName=GetWeather";
        var paramter = {
          "location": "ShangHai",
          "language": "zh-Hans",
          "unit": "c", //c摄氏，f华氏
          "start": "0",
          "hours": "24"
        };
        hmsHttp.post(url, paramter).success(
          function (response) {
            $scope.temperature = response.results[0].now.temperature;
            $scope.humidity = response.results[0].now.humidity;
          }
        ).error(
          function (response, status, header, config) {
            hmsPopup.showShortCenterToast("");
          }
        );
      };

      var getDeviceStatus = function (boxId) {
        var url = baseConfig.basePath + "/r/api/dvm/deviceAttribute/query";
        var paramter = [{
          "boxId": 37
        }];
        hmsHttp.post(url, paramter).success(
          function (response) {
            console.log(JSON.stringify(response));
          }
        ).error(
          function (response, status, header, config) {
          }
        );
      };

      var getDeviceList = function () {
        db.transaction(function (tx) {
          tx.executeSql('select tdd.DEVICE_ID as DEVICE_ID,tdd.PRODUCT_ID as PRODUCT_ID, tdsb.SKU_NAME as SKU_NAME, tdsb.SKU_ID as SKU_ID, tdsb.SKU_NUMBER as SKU_NUMBER,tdd.LAST_UPDATE_DATE as LAST_UPDATE_DATE from T_DVM_DEVICE  tdd,T_CTM_PARTY_BOX_DEVICE tcpbd,T_DVM_SKU_B tdsb' +
            ' where' +
            ' tcpbd.PARTY_ID = "20"' +
            ' and' +
            ' tcpbd.DEVICE_ID = tdd.DEVICE_ID' +
            ' and' +
            ' tdd.SKU_ID = tdsb.SKU_ID' +
            ' ORDER BY tdd.LAST_UPDATE_DATE DESC', [], function (tx, results) {

            /*var deviceIdList = [];
             for(var i = 0; i < results.rows.length; i ++){
             var deviceId = {"deviceId": results.rows.item(i).DEVICE_ID};
             deviceIdList.push(deviceId);
             }*/
            var deviceStatusList = getDeviceStatus(localStorage.boxId);

            for (var i = 0; i < results.rows.length; i++) {
              var device = results.rows.item(i);
              var deviceName = device.SKU_NAME;
              var pictureUrl = "";
              if (deviceName == 'NUMI 1.1') {
                pictureUrl = "build/img/index/img_home_device_toliet.png";
              } else if (deviceName == 'Bathroom Heater') {
                pictureUrl = "build/img/index/img_home_device_heater.png";
              } else if (deviceName == 'airfoil-shower') {
                pictureUrl = "build/img/index/air.png";
              } else if (deviceName == 'Karess') {
                pictureUrl = "build/img/index/karess.png";
              } else if (deviceName == 'MC') {
                pictureUrl = "build/img/index/mirror.png";
              } else if (deviceName == 'next gen shower') {
                pictureUrl = "build/img/index/next.png";
              } else if (deviceName == '中央净水器') {
                pictureUrl = "build/img/index/img_home_device_toliet.png";
              }

              var deviceStatus = "";
              var deviceDesc = "";
              for (var j = 0; j < deviceStatusList.length; j++) {
                if (device.DEVICE_ID == deviceStatusList[j].deviceId) {
                  deviceStatus = "设备在线";
                  deviceDesc = "有人使用";
                }
              }

              var deviceInfo =
                {
                  id: device.DEVICE_ID,
                  pictureUrl: pictureUrl,
                  deviceType: deviceName,
                  deviceStatus: deviceStatus,
                  deviceDesc: deviceDesc,
                  statusPictureUrl: "build/img/index/icon_home_device_signal5.png",
                  errorPictureUrl: "",
                  isStatus: true,
                  isError: false,
                  sku: device.SKU_ID,
                  productId: device.PRODUCT_ID
                };

              $scope.deviceModel.push(deviceInfo);

            }
          }, null);
        });
      };

      var getScenarioList = function () {
        $scope.modelData = [];
        db.transaction(function (tx) {
          //var partyId = window.localStorage.empno;
          var partyId = "13469950960";
          tx.executeSql('select * from T_CTM_PARTY_SCENARIO ORDER BY LAST_UPDATE_DATE DESC', [], function (tx, results) {
            for (var i = 0; i < results.rows.length; i++) {
              var pictureUrl = "";
              var scenarioId = results.rows.item(i).SCENARIO_ID;
              var scenarioName = results.rows.item(i).SCENARIO_NAME;
              var scenarioStatus = results.rows.item(i).SCENARIO_STATUS;
              var isOneButton = false;
              var isTwoButton = false;
              if (scenarioStatus == 'Y') {
                isOneButton = false;
                isTwoButton = true;
              } else {
                isOneButton = true;
                isTwoButton = false;
              }
              if (scenarioName == '离家') {
                pictureUrl = 'build/img/index/img_home_leavehome.png';
              } else if (scenarioName == '晨起') {
                pictureUrl = 'build/img/index/img_home_morning.png';
              } else if (scenarioName == '淋浴') {
                pictureUrl = 'build/img/index/muyu@3x.png';
              } else if (scenarioName == '泡澡') {
                pictureUrl = 'build/img/index/img_home_spa.png';
              } else if (scenarioName == '维亚灯光') {
                pictureUrl = 'build/img/index/img_home_veil.png';
              } else if (scenarioName == '大姨了吗') {
                pictureUrl = 'build/img/index/img_home_period.png';
              }
              var model =
                {
                  id: scenarioId,
                  pictureUrl: pictureUrl,
                  title: scenarioName,
                  context: "一键开启指定设备",
                  isOneButton: isOneButton,
                  isTwoButton: isTwoButton,
                  jsonContext: "1",
                  isOff: false,
                  lastUpdateDate: ""
                };
              $scope.modelData.push(model);

            }
          }, null);
        });
      };

      var checkIsOk = function () {
        db.transaction(function (tx) {
          var deviceList = "房间1:  ";
          var partyId = window.localStorage.empno;
          //tx.executeSql('select tcpgd.PARTY_ID as PARTY_ID,tcpgd.GROUP_ID as GROUP_ID,tcpgd.DEVICE_ID as DEVICE_ID from T_CTM_PARTY_GROUP_DEVICE tcpgd,T_DVM_DEVICE tdd where tcpgd.PARTY_ID = "20" and tcpgd.DEVICE_ID = tdd.DEVICE_ID and tdd.device_id in ("55","56","57","58","59","60","61") group by tcpgd.party_id,tcpgd.group_id,tcpgd.device_id',[],function(tx, results){
          tx.executeSql('select tcpgd.PARTY_ID as PARTY_ID,tcpgd.GROUP_ID as GROUP_ID,tcpgd.DEVICE_ID as DEVICE_ID from T_CTM_PARTY_GROUP_DEVICE tcpgd,T_DVM_DEVICE tdd where tcpgd.PARTY_ID = "20" and tcpgd.DEVICE_ID = tdd.DEVICE_ID  group by tcpgd.party_id,tcpgd.group_id,tcpgd.device_id', [], function (tx, results) {
            for (var i = 0; i < results.rows.length; i++) {
              if (results.rows.item(i).GROUP_ID == '46') {
                deviceList = deviceList + " 设备: " + results.rows.item(i).DEVICE_ID + ";";
              }
              //alert("deviceId : "+results.rows.item(i).DEVICE_ID + " groupId: "+results.rows.item(i).GROUP_ID + " PARTY_ID: "+results.rows.item(i).PARTY_ID);
            }

            //alert("deviceList:  "+deviceList);
          });

          /*tx.executeSql('select tdd.DEVICE_ID as DEVICE_ID, tdsb.SKU_NAME as SKU_NAME, tdsb.SKU_ID as SKU_ID, tdsb.SKU_NUMBER as SKU_NUMBER,tdd.LAST_UPDATE_DATE as LAST_UPDATE_DATE from T_DVM_DEVICE  tdd,T_CTM_PARTY_BOX_DEVICE tcpbd,T_DVM_SKU_B tdsb'+
           ' where'+
           ' tcpbd.PARTY_ID = "20"'+
           ' and'+
           ' tcpbd.DEVICE_ID = tdd.DEVICE_ID'+
           ' and'+
           ' tdd.SKU_ID = tdsb.SKU_ID'+
           ' ORDER BY tdd.LAST_UPDATE_DATE DESC',[],function(tx, results){
           for(var i = 0; i < results.rows.length; i ++) {
           var device = results.rows.item(i);
           var pictureUrl = "";
           alert("device name: " + results.rows.item(i).SKU_NAME);
           }

           });*/

        });
      };

      /**
       *@autor: caolei
       *@disc: get scene switch status
       */
      var changeSceneStatus = function () {
        var sceneInfo = JSON.parse(localStorage.sceneList);
        angular.forEach(sceneInfo, function (data, index, array) {
          for (var i = 0; i < $scope.modelData.length; i++) {
            if (data.sceneType == $scope.modelData[i].title) {
              $scope.modelData[i].isOff = data.status;
            }
          }
        });
      };


      $scope.$watch('', function () {
        //getDeviceStatus("");

        getShowDate();

        getWeather();
        if (localStorage.boxLinkCount == 1) {
          hmsPopup.showLoading('<span translate="golabelvariable.loadingdata"></span>');
          $timeout(function () {
            if (!ishidden) {
              hmsPopup.hideLoading();
              $scope.Toast.show($translate.instant("golabelvariable.linkError"));
            }
          }, 15000);

          $timeout(function () {
            searchBox();
          }, 2000);
          localStorage.boxLinkCount = 2;

          localStorage.windType = "bathroom.rock";
          localStorage.hotTimer = "default";
          localStorage.hotDryingTimer = "default";
          localStorage.coolTimer = "default";
          localStorage.dryerTimer = "default";
          localStorage.purityTimer = "default";
          localStorage.breathTimer = "default";

        }
        //checkIsOk();
        if (baseConfig.isLinkDatabase) {
          getScenarioList();
          getDeviceList();
          //changeSceneStatus();
        }

      }, true);

      var getShowDate = function(){
        var date = new Date().Format("yyyy-MM-dd");
        console.log("===="+date);
        var currentTemper = "20";
        var currentHumidity = "30";
        if(date == '2017-05-31'){
          currentTemper = "20";
          currentHumidity = "30";
        }else if(date == '2017-06-01'){
          currentTemper = "25";
          currentHumidity = "35";
        }else if(date == '2017-06-02'){
          currentTemper = "28";
          currentHumidity = "33";
        }
        $scope.temperature = currentTemper;
        $scope.humidity = currentHumidity;
      };

      /*document.addEventListener('SocketPlugin.receiveTcpData', function (result) {
       var resultOn = result;
       $scope.deviceOff = resultOn.payload.cmd_properties.device_list;
       if (resultOn.payload.cmd == "LIST_BONDED_DEVICE_RETURN") {
       hmsPopup.showShortCenterToast("开始返回数据");
       //localStorage.device_id = resultOn.payload.cmd_properties.device_list[0].device_id;
       //循环device list 取出device id，并降deviceid与相应页面的设备做关联
       var deviceLinkInfo = "";
       var deviceStatus = [];
       angular.forEach(resultOn[0].data.act_params.device_list, function(data, index, array){
       deviceLinkInfo = deviceLinkInfo =="" ? (";" + data.device_sku + "," + data.device_id) : (deviceLinkInfo + ";" + data.device_sku + "," + data.device_id);
       deviceStatus.push({'deviceSku': data.device_sku, 'deviceRssi': data.device_rssi, 'deviceState': data.device_state});
       });
       //保存device 连接的信息。
       localStorage.deviceInfo = deviceLinkInfo;
       localStorage.deviceStatus = JSON.stringify(deviceStatus);
       hmsPopup.hideLoading();

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

       }, false);*/


      var deviceStatus = [];
      var deviceLinkInfo = "";
      document.addEventListener('SocketPlugin.receiveTcpData', function (result) {
        var resultStr = JSON.stringify(result);
        console.log('触发结果为:==' + result);
        if (resultStr.indexOf("Who are you") >= 0) {
          return;
        }
        var resultOn = result["0"];
        if (resultOn.data.act == "LIST_BONDED_DEVICE_RETURN") {
          angular.forEach(resultOn.data.act_params.device_list, function (data, index, array) {
            deviceLinkInfo = deviceLinkInfo == "" ? (";" + data.device_sku + "," + data.device_id) : (deviceLinkInfo + ";" + data.device_sku + "," + data.device_id);
            deviceStatus.push({
              'deviceSku': data.device_sku,
              'deviceRssi': data.device_rssi,
              'deviceState': data.device_state
            });
          });

          localStorage.deviceInfo = deviceLinkInfo;
          localStorage.deviceStatus = JSON.stringify(deviceStatus);

          hmsPopup.hideLoading();
          ishidden = true;
          islinkHidden = true;
        }

        /*if (resultOn.payload.cmd == "SCAN_RETURN") {
         console.log(resultOn.payload.cmd_properties.device_list);
         if ($scope.deviceOff.length == 0) {
         $scope.Toast.show($translate.instant("index.noDevice"));
         }
         $scope.$apply();
         }*/

      }, false);

      //接受tcp状态
      // localStorage.tcpStatus = false;
      // document.addEventListener('SocketPlugin.receiveTcpStatus', function (result) {
      //   if(result.code == 0 || result.code == -1){
      //     localStorage.tcpStatus = false;
      //   }else{
      //     localStorage.tcpStatus = true;
      //   }
      // }, false);

      /**
       *@autor: caolei
       *@return: box ip
       *@disc: search box
       */
      var searchBox = function () {
        var cmd = [
          {
            "ver": "1",
            "from": {
              "ctype": 0XE3,
              "uid": window.localStorage.empno
            },
            "to": {
              "ctype": 0XE4,
              "uid": "peerId"
            },
            "ts": new Date().getTime(),
            "idx": 12,
            "mtype": "rqst",
            "data": {
              "device_type": "BOX",
              "act": "SCAN_BOX_REQUEST",
              "act_params": {"scan_box_request": "KOHLER_BOX_SEARCH"}
            }
          }
        ];

        cordova.plugins.SocketPlugin.udpBroadCast({
          "timeout": "3000",
          "ip": "255.255.255.255",
          "value": cmd,
          "port": "5037"
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
          $scope.$apply();
          $scope.Toast.show($translate.instant("index.searchBox"));
          angular.forEach($scope.boxList, function (data, index, array) {
            $timeout(function () {
              boxLink(data[0]);
            }, 1000);
          });
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
        var boxIp = item.data.act_params.ip; //item.payload.cmd_properties.ip
        var deviceId = item.data.act_params.device_id;
        localStorage.boxId = deviceId;
        $scope.Toast.show($translate.instant("index.startLinkBox"));
        cordova.plugins.SocketPlugin.tcpConnect({
          "timeout": "5000",
          "ip": boxIp,
          "port": "5036"
        }, success, error);

        function success(response) {
          $scope.Toast.show($translate.instant("index.linkSuccess"));
          $timeout(function () {
            localStorage.boxIp = boxIp;
            selectDeviceOn(deviceId, boxIp);
          }, 1000);
        }

        function error() {
          $scope.Toast.show($translate.instant("index.linkFail"));
        }
      };

      /**
       *@autor: caolei
       *@params: device id
       *@disc: link device
       */
      var selectDeviceOn = function (device_id, boxIp) {
        $scope.Toast.show($translate.instant("index.startSelectDevice"));

        var cmd = [
          {
            "ver": 1,
            "from": {
              "ctype": 0XE3,
              "uid": window.localStorage.empno
            },
            "to": {
              "ctype": 0xE4,
              "uid": device_id
            },
            "ts": new Date().getTime(),
            "idx": 12,
            "mtype": "rqst",
            "data": {
              "device_type": "BLE_DEVICE",
              "act": "LIST_BONDED_DEVICE_REQUEST",
              "act_params": {}
            }
          }
        ];

        cordova.plugins.SocketPlugin.tcpSendCmd({
          "timeout": "5000",
          "value": cmd,
          "ip": boxIp,
          "port": "5036"
        }, success, error);

        function success(response) {
          $scope.Toast.show($translate.instant("index.searchDeviceSuccess"));
        }

        function error() {
          $scope.Toast.show($translate.instant("index.searchFail"));
        }
      };

      /**
       *@autor: caolei
       *@params: modelType
       *@disc: change model
       */
      $scope.changeModel = function (item) {
        var modelType = item.id;
        if (modelType == "1") {
          $scope.isSceneModel = true;
          $scope.isDeviceModel = false;
          $("#line").removeClass('height-light2');
          $("#line").addClass('height-light');
        } else {
          $scope.isSceneModel = false;
          $scope.isDeviceModel = true;
          $("#line").removeClass('height-light');
          $("#line").addClass('height-light2');
        }
      };

      //本地发送指令
      var pluginToCtrl = function (value, successMsg, errorMsg) {
        cmdService.sendScanCmd(value, localStorage.boxIp);
      };

      var sendCmd = function (index) {
        var value = [
          {
            "ver": 1,
            "from": {
              "ctype": 227,
              "uid": "CN100012"
            },
            "to": {
              "ctype": 228,
              "uid": localStorage.boxId
            },
            "ts": 1487213040,
            "idx": 12,
            "mtype": "rqst",
            "data": {
              "device_type": "ALL_DEVICE",
              "act": "SCN_TRIGGER_REQUEST",
              "act_params": {
                "scn_id": "000000011"
              }
            }
          }
        ];

        if ($scope.modelData[index].id == '2') {
          value[0].data.act_params.scn_id = '000000011';
        }
        if ($scope.modelData[index].id == '1') {
          value[0].data.act_params.scn_id = '000000012';
        }
        if ($scope.modelData[index].id == '4') {
          if ($scope.modelData[index].isOff == true) {
            value[0].data.act_params.scn_id = '000000013';
          } else {
            value[0].data.act_params.scn_id = '000000014';
          }
        }
        if ($scope.modelData[index].id == '3') {
          if ($scope.modelData[index].isOff == true) {
            value[0].data.act_params.scn_id = '000000015';
          } else {
            value[0].data.act_params.scn_id = '000000016';
          }
        }
        pluginToCtrl(value, "发送成功", "发送失败");
      }

      /**
       *@autor: caolei
       *@params: item
       *@disc: get switch status
       */
      var sceneList = [];
      $scope.getSwitchStatus = function (index) {
        console.log('jinlai' + index + '==' + $scope.modelData[index].isOff);
        console.log($scope.modelData[index].title);
        ////$scope.modelData[index].isOff = !$scope.modelData[index].isOff;
        //console.log('jinlai2'+index+'=='+$scope.modelData[index].isOff)
        var scentObj = {sceneType: $scope.modelData[index].title, status: $scope.modelData[index].isOff};
        sceneList.push(scentObj);
        localStorage.sceneList = JSON.stringify(sceneList);
        $scope.isInPage = 1;


        if ($scope.modelData[index].id == '1') {
          if ($scope.modelData[index].isOff == false) { //是否开启状态
            $scope.modelData[index].isOff = true;
            $scope.modelData[0].isOff = false;
          }

          $scope.modelData[index].isOneButton = false;//隐藏按钮
          $timeout(function () {
            $scope.modelData[index].isOneButton = true;
          }, 5000);
          sendCmd(index);
          return;

        } else if ($scope.modelData[index].id == '2') {
          if ($scope.modelData[index].isOff == false) {
            $scope.modelData[index].isOff = true;
            $scope.modelData[1].isOff = false;
          }
          //sendCmd(index);
          $scope.modelData[index].isOneButton = false;
          $timeout(function () {
            $scope.modelData[index].isOneButton = true;
          }, 5000);
          sendCmd(index);
          return;
        }
        indexPageService.setScaneList($scope.modelData);
        if ($scope.modelData[index].id != '5' && $scope.modelData[index].id != '6') {
          sendCmd(index);
        }     //发送指令

        //if ($scope.modelData[index].isOff) {
        //  //发送指令并传送当前场景按钮的状态
        //  angular.forEach($scope.modelData, function (data, index, array) {
        //    if (data.id == $scope.modelData[index].id) {
        //      $scope.modelData[index].isOff = true;
        //      return;
        //    }
        //  });
        //} else {
        //  //db.transaction(function(tx) {
        //  //  tx.executeSql('update T_CTM_PARTY_SCENARIO set scenarioStatus = "N" where DEVICE_ID = '+item.id);
        //  //});
        //  angular.forEach($scope.modelData, function (data, index, array) {
        //    if (data.id == $scope.modelData[index].id) {
        //      $scope.modelData[index].isOff = false;
        //      return;
        //    }
        //  });
        //}

        /*if(item.isOff){
         //alert("on");
         if(checkIsLinkBox){
         var netType = network();
         if(netType == '无网络链接'){

         }else{
         //do post
         }
         }

         }else{
         }*/
      };
      console.log($ionicHistory);

      var checkIsLinkBox = function () {
        return true;
      };

      $scope.getDeviceInfo = function (item, index) {

        if (baseConfig.isLinkDatabase == true) {
          if (item.deviceType == "Bathroom Heater") {
            $state.go('bathroom', {deviceSku: item.sku});
          }
          if (item.deviceType == "NUMI 1.1") {
            $state.go('toiletContrl');
          }
          if (item.deviceType == "Karess") {
            $state.go('karess');
            SettingsService.set("sku", item.sku);
          }
          if (item.deviceType == "next gen shower") {
            $state.go('nextgen');
            SettingsService.set("sku", item.sku);
          }
          if (item.deviceType == "airfoil-shower") {
            $state.go('airfoilShower');
          }
          if (item.deviceType == "MC") {
            $state.go('mc');
          }


          db.transaction(function (tx) {
            tx.executeSql('update T_DVM_DEVICE set LAST_UPDATE_DATE = "' + getNowFormatDate() + '" where DEVICE_ID = ' + item.id);
          });


          //$scope.deviceModel = [];
          //getDeviceList();
        } else {
          if (item.deviceType == "index.bathroomHeader") {
            $state.go('bathroom');
            SettingsService.set("sku", item.sku);
          }
          if (item.deviceType == "index.toliet") {
            $state.go('toiletContrl');
            SettingsService.set("sku", item.sku);
          }
          if (item.deviceType == "index.waterPurifier") {
            $state.go('cenwatpurifierContrl');
            SettingsService.set("sku", item.sku);
          }
          if (item.deviceType == "index.bathtub") {
            $state.go('karess');
            SettingsService.set("sku", item.sku);
          }
          if (item.deviceType == "index.nextgen") {
            $state.go('nextgen');
            SettingsService.set("sku",item.sku);
          }
          if (item.deviceType == "index.airfoilShower") {
            $state.go('airfoilShower');
            SettingsService.set("sku", item.sku);
          }
          if (item.deviceType == "index.mc") {
            SettingsService.set("sku", item.sku);
            $state.go('mc');
          }
        }

        //var data = $scope.deviceModel[index];
        //
        //$scope.deviceModel.splice(index, 1);
        //$scope.deviceModel.splice(0, 0, data);
      };


      $scope.addModule = function () {
        $state.go('sceneSupermarket');
      };

      $scope.addDevice = function () {
        $state.go('deviceList');
      };


      function setUnit() {
        var url = baseConfig.basePath + "/r/api/ctm/insertPartyUtil";
        var paramter =
          {"temperature": "°C", "PartySettingId": 100};
        hmsHttp.post(url, paramter).success(
          function (response) {
            console.log(response);
            //alert(response);
          }).error(
          function (response, status, header, config) {
            //hmsPopup.showPopup("<span translate='bathroom.saveError'></span>");
            //  alert("1234");
          }
        );

      }

      $rootScope.$on('$ionicView.beforeEnter', function () {
        console.log('view。enter');
        $scope.modelData = indexPageService.getScaneList();
      });
      //document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px';

      // setUnit();

    }
  ]);


