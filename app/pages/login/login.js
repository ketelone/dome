/**
 * Created by gusenlin on 16/4/24.
 */
angular.module('loginModule')

  .controller('loginCtrl', [
    '$scope',
    '$state',
    'baseConfig',
    '$ionicLoading',
    '$http',
    '$timeout',
    '$ionicHistory',
    '$ionicPlatform',
    '$ionicScrollDelegate',
    'hmsPopup',
    '$rootScope',
    'publicMethod',
    function ($scope,
              $state,
              baseConfig,
              $ionicLoading,
              $http,
              $timeout,
              $ionicHistory,
              $ionicPlatform,
              $ionicScrollDelegate,
              hmsPopup,
              $rootScope, publicMethod) {

      //将页面的导航bar设置成白色
      $ionicPlatform.ready(function () {
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
      /////////////////////////////////////
      $timeout(function () {
        $scope.loginScroll = $ionicScrollDelegate.$getByHandle('loginScroll');
        $scope.lockScroll(true);
      }, 300);
      $scope.loginInfo = {
        username: "",
        password: ""
      };//登录信息

      $scope.showUserClearButton = false;//显示用户名删除按钮
      $scope.showPasswordClearButton = false;//显示密码删除按钮
      if (window.localStorage.empno) {
        $scope.focusUsername = true;
        $scope.fillUsername = true;
        $scope.showUserClearButton = true;
        $scope.loginInfo.username = window.localStorage.empno;
      }
      $scope.lockScroll = function (bool) {
        $scope.loginScroll.freezeScroll(bool);//锁死Android平台上的滚动条
      };
      $scope.backTop = function () {
        $scope.loginScroll.scrollTop(false);
      };

      $scope.usernameChange = function () {//用户名改变
        if ($scope.loginInfo.username != "") {
          $scope.showUserClearButton = true;
        } else if ($scope.loginInfo.username == "") {
          $scope.showUserClearButton = false;
        }
      };
      $scope.passwordChange = function () {//密码改变
        if ($scope.loginInfo.password != "") {
          $scope.showPasswordClearButton = true;
        } else if ($scope.loginInfo.password == "") {
          $scope.showPasswordClearButton = false;
        }
      };


      $scope.clearUsername = function () {//清空用户名
        $scope.loginInfo.username = "";
        $scope.showUserClearButton = false;
      };

      $scope.clearPassword = function () {//清空密码
        $scope.loginInfo.password = "";
        $scope.showPasswordClearButton = false;
      };

      $scope.savePassword = function () {//记住密码
        $scope.rememberPassword = !$scope.rememberPassword;
        if (baseConfig.debug) {
          console.log("此时密码框的状态为 :", angular.toJson($scope.rememberPassword));
        }
        if ($scope.rememberPassword == true) {
          window.localStorage.checkboxSavePwd = "true";
        } else if ($scope.rememberPassword == false) {
          window.localStorage.checkboxSavePwd = "";
        }
        if ($scope.loginInfo.password !== "") {
          if ($scope.rememberPassword == true) {
            window.localStorage.password = $scope.loginInfo.password;
          } else {
            window.localStorage.password = "";
          }
        }
      };

      function toIPhoneModel(model) {
        var dictionary = {
          "i386": "Simulator",
          "x86_64": "Simulator",
          "iPod1,1": "iPod Touch",         // (Original)
          "iPod2,1": "iPod Touch 2",       // (Second Generation)
          "iPod3,1": "iPod Touch 3",       // (Third Generation)
          "iPod4,1": "iPod Touch 4",       // (Third Generation)
          "iPod7,1": "iPod Touch 6",       // (6th Generation)
          "iPhone1,1": "iPhone",           // (Original)
          "iPhone1,2": "iPhone 3G",        // (3G)
          "iPhone2,1": "iPhone 3GS",       // (3GS)
          "iPad1,1": "iPad",               // (Original)
          "iPad2,1": "iPad 2",             // (2nd Generation)
          "iPad3,1": "new iPad",           // (3rd Generation)
          "iPhone3,1": "iPhone 4",         // (GSM)
          "iPhone3,3": "iPhone 4",         // (CDMA/Verizon/Sprint)
          "iPhone4,1": "iPhone 4S",
          "iPhone5,1": "iPhone 5",         // (model A1428, AT&T/Canada)
          "iPhone5,2": "iPhone 5",         // (model A1429, everything else)
          "iPad3,4": "iPad 4th Generation",// (4th Generation)
          "iPad2,5": "iPad Mini",          // (Original)
          "iPhone5,3": "iPhone 5c",        // (model A1456, A1532 | GSM)
          "iPhone5,4": "iPhone 5c",        // (model A1507, A1516, A1526 (China), A1529 | Global)
          "iPhone6,1": "iPhone 5s",        // (model A1433, A1533 | GSM)
          "iPhone6,2": "iPhone 5s",        // (model A1457, A1518, A1528 (China), A1530 | Global)
          "iPhone7,1": "iPhone 6 Plus",
          "iPhone7,2": "iPhone 6",
          "iPhone8,1": "iPhone 6S",
          "iPhone8,2": "iPhone 6S Plus",
          "iPhone8,4": "iPhone SE",
          "iPhone9,1": "iPhone 7",
          "iPhone9,3": "iPhone 7",
          "iPhone9,2": "iPhone 7 Plus",
          "iPhone9,4": "iPhone 7 Plus",
          "iPad4,1": "iPad Air",           // 5th Generation iPad (iPad Air) - Wifi
          "iPad4,2": "iPad Air",           // 5th Generation iPad (iPad Air) - Cellular
          "iPad4,4": "iPad Mini",          // (2nd Generation iPad Mini - Wifi)
          "iPad4,5": "iPad Mini",          // (2nd Generation iPad Mini - Cellular)
          "iPad4,7": "iPad Mini",          // (3rd Generation iPad Mini - Wifi (model A1599))
          "iPad6,7": "iPad Pro (12.9\")",  // iPad Pro 12.9 inches - (model A1584)
          "iPad6,8": "iPad Pro (12.9\")",  // iPad Pro 12.9 inches - (model A1652)
          "iPad6,3": "iPad Pro (9.7\")",   // iPad Pro 9.7 inches - (model A1673)
          "iPad6,4": "iPad Pro (9.7\")"    // iPad Pro 9.7 inches - (models A1674 and A1675)
        };
        if (dictionary[model]) {
          return dictionary[model];
        } else {
          return "Unknown IOS model";
        }
      }

      function loginPost() {//后台采用HAP后更改成包含Content-type的方式，账号密码采用encodeURIComponent()转换，这样可以传特殊符号
        var deviceInfo = "";
        if (ionic.Platform.isAndroid()) {
          deviceInfo = "Android"
        } else if (ionic.Platform.isIOS()) {
          deviceInfo = "iOS";
        } else {
          deviceInfo = "PC";
        }

        try {
          if (deviceInfo == 'iOS') {
            var model = toIPhoneModel(device.model);
          } else {
            model = device.model;
          }
          var url = baseConfig.loginPath + "username=" + encodeURIComponent($scope.loginInfo.username) + "&password=" +
            encodeURIComponent($scope.loginInfo.password) + "&device_info=" + deviceInfo + "&device_model=" + encodeURIComponent(model) +
            "&device_version=" + encodeURIComponent(device.version) + "&device_uuid=" + encodeURIComponent(device.uuid);
        } catch (e) {
          url = baseConfig.loginPath + "username=" + encodeURIComponent($scope.loginInfo.username) + "&password=" +
            encodeURIComponent($scope.loginInfo.password) + "&device_info=" + deviceInfo;
        }
        if (baseConfig.debug) {
          console.log('loginPost.url ' + url);
        }

        return $http({
          method: 'POST',
          headers: {
            'Content-type': "application/x-www-form-urlencoded"
          },
          url: url
        })
      }

      $scope.login = function () {//登录功能
        if (window.localStorage.empno != $scope.loginInfo.username) {
          localStorage.removeItem('key_history1');
          localStorage.removeItem('common_linkman2');
        }
        hmsPopup.showLoading('<span translate="alertMsg.loading"></span>');
        $timeout(function () {
          window.localStorage.empno = $scope.loginInfo.username;
          window.localStorage.password = $scope.loginInfo.password;
          if ($scope.rememberPassword == true) {
            window.localStorage.password = $scope.loginInfo.password;
          } else if ($scope.rememberPassword == false) {
            window.localStorage.password = "";
          }

          if (!$scope.loginInfo.username || $scope.loginInfo.username == '') {
            hmsPopup.hideLoading();
            hmsPopup.showPopup('<span translate="alertMsg.unnn"></span>');
            return;
          }
          if (!$scope.loginInfo.password || $scope.loginInfo.password == '') {
            hmsPopup.hideLoading();
            hmsPopup.showPopup('<span translate="alertMsg.pwdnn"></span>');
            return;
          }
          $state.go('tab.indexPage');
          hmsPopup.hideLoading();
          return;

          loginPost().success(function (result) {
            hmsPopup.hideLoading();
            if (baseConfig.debug) {
              console.log("result success " + angular.toJson(result));
            }

            if (result.access_token && result.access_token != '') {
              window.localStorage.token = result.access_token;
              window.localStorage.empno = $scope.loginInfo.username;
              window.localStorage.checkboxSavePwd = $scope.rememberPassword;
              //imService.initImData();
              if (ionic.Platform.isWebView()) {
                imService.initImData();
              }

            } else {
              hmsPopup.showPopup('<span translate="alertMsg.lepcpir"></span>');
            }
          }).error(function (response, status) {
            hmsPopup.hideLoading();
            if (status && status == '401') {
              hmsPopup.showPopup('<span translate="alertMsg.lepcpir"></span>');
            } else {
              hmsPopup.showPopup('<span translate="alertMsg.lepcnlir"></span>');
              if (baseConfig.debug) {
                console.log("response error " + angular.toJson(response));
              }
            }
          });
        }, 700);
      };
      /**
      *@autor:daidongdong
      *@name:registered
      *@params:
      *@return:
      *@disc:注册
      */
      $scope.registered = function () {
        $state.go('registered');
      }
      /**
      *@autor:daidongdong
      *@name:forgetPw
      *@params:
      *@return:
      *@disc:忘记密码
      */
      $scope.forgetPw = function () {
        $state.go('forgetPassword');
      }
      /**
      *@autor:daidongdong
      *@name:userNameBlur
      *@params:
      *@return:
      *@disc:用户名验证
      */
      $scope.userNameBlur = function(){
        if(phoneNumber($scope.loginInfo.username)){
        }else{
          if(isEmailAddress($scope.loginInfo.username)){
          }else{
            if($scope.showUserClearButton){
              hmsPopup.showPopup('<span translate="alertMsg.unfr"></span>');
            }
          }
        }
      }
      $scope.$on('$ionicView.enter', function (e) {
        if (baseConfig.debug) {
          console.log('loginCtrl.$ionicView.enter');
        }
        $scope.loginInfo = {
          username: "",
          password: ""
        };//登录信息
      });

      $scope.$on('$ionicView.afterEnter', function () {
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
      });

      $scope.$on('$destroy', function (e) {
        if (baseConfig.debug) {
          console.log('loginCtrl.$destroy');
        }
      });

    }]);
