/**
 * Created by gusenlin on 16/5/21.
 */
angular.module('HmsModule')
  .factory('hmsHttp', ['$log',
    '$http',
    'hmsPopup',
    '$state',
    'baseConfig',
    '$rootScope',
    function ($log,
              $http,
              hmsPopup,
              $state,
              baseConfig,
              $rootScope) {
      var serivieName = "HmsHttp";
      var isSucessfullName = "isSucessfull";
      var noAuthorPostName = serivieName + ".noAuthorPost";
      var noAuthorGetName = serivieName + ".noAuthorGet";
      var postName = serivieName + ".post";
      var getName = serivieName + ".get";
      var procedure;

      var init = function (procedure) {
        procedure = procedure;
      };
      var debug = function (text) {
        if (baseConfig.debug) {
          console.log(procedure + " success");
        }
      };
      //如果登录令牌失效，跳转会登录界面
      var goBackLogin = function (state) {
        hmsPopup.hideLoading();
        $rootScope.$broadcast("REFRESH_LOGIN");
        state.go('login');
      };

      var request = {
        goBackLogin: function (state) {
          goBackLogin(state);
        },
        isSuccessfull: function (status) {
          if (baseConfig.debug) {
            console.log(isSucessfullName + " Start!");
            console.log(noAuthorPostName + " status " + status);
          }
          if (status == "S" || status == "SW") {
            return true;
          } else {
            return false;
          }
        },
        post: function (url, paramter) {
          if (baseConfig.debug) {
            console.log(postName + " Start!");
            console.log(postName + " url " + url);
            console.log(postName + " paramter " + angular.toJson(paramter));
          }
          var destUrl = url;
          var startTime = new Date().getTime();
          var post = $http.post(destUrl, paramter,{
            headers: {'Content-Type': 'application/json','Authorization':'Bearer ' + window.localStorage.token}
          }, {'timeout': '30000'}).success(function (response) {
            if (baseConfig.debug) {
              console.log(postName + " success");
              console.log(postName + " response " + angular.toJson(response));
              console.log(postName + " End!");
            }
          }).error(function (response, status, header, config) {
            var respTime = new Date().getTime() - startTime;
            //超时之后返回的方法
            if(respTime >= config.timeout){
              console.log('HTTP timeout');
              if(ionic.Platform.isWebView()){
                hmsPopup.showShortCenterToast('请求超时, 请重试!');
              }
            }
            if (baseConfig.debug) {
              console.log(postName + " error");
              console.log(postName + " response " + response);
              console.log(postName + " status " + status);
              console.log(postName + " End!");
            }
            hmsPopup.hideLoading();
            if (status == '401') {
              window.localStorage.token = '';
              goBackLogin($state);
              hmsPopup.showShortCenterToast('另一个设备在登陆你的账号,请重新登陆!');
            }
            else if (status == '403') {
              window.localStorage.token = '';
              goBackLogin($state);
              hmsPopup.showShortCenterToast('用户令牌失效,请重新登陆!');
            }
            else if (status == '404') {
              hmsPopup.showShortCenterToast('后端服务器请求失败,请联系管理员!');
            }
            else {
              hmsPopup.showShortCenterToast('处理请求失败,请确认网络连接是否正常,或者联系管理员!');
            }
          });
          return post;
        },
        get: function (url) {
          if (baseConfig.debug) {
            console.log(getName + " Start!");
            console.log(getName + " url " + url);
          }
          var destUrl = url;
          var get = $http.get(destUrl,{
            headers: {'Content-Type': 'application/json','Authorization':'Bearer ' + window.localStorage.token}
          }).success(function (response) {
            if (baseConfig.debug) {
              console.log(getName + " success");
              console.log(getName + " response " + angular.toJson(response));
              console.log(getName + " End!");
            }
          }).error(function (response, status) {
            if (baseConfig.debug) {
              console.log(getName + " error");
              console.log(getName + " response " + response);
              console.log(getName + " status " + status);
              console.log(getName + " End!");
            }
          });
          return get;
        }
      };
      return request;
    }])

  .service('hmsPopup', ['$ionicLoading', '$cordovaToast', '$ionicPopup', 'baseConfig',
    function ($ionicLoading, $cordovaToast, $ionicPopup, baseConfig) {
      this.showLoading = function (content) {
        content = !content ? '<span translate="golabelvariable.loading"></span>>' : content;
        $ionicLoading.show({
          template: '<ion-spinner icon="ios" class="spinner spinner-ios spinner-stable"></ion-spinner>' +
          '<div style="color: white;font-size: 12px;text-align: center;height:25px;line-height: 25px;">' + content + '</div>'
        });
      };
      this.showLoadingWithoutBackdrop = function (content) {
        $ionicLoading.show({
          template: '<ion-spinner icon="ios" class="spinner spinner-ios spinner-stable"></ion-spinner>' +
          '<div style="color: white;font-size: 12px;text-align: center;height:25px;line-height: 25px;">' + content + '</div>',
          noBackdrop: true
        });
      };
      this.hideLoading = function () {
        $ionicLoading.hide();
      };
      this.showShortCenterToast = function (content) {//长时间底部提示toast
        if (!baseConfig.nativeScreenFlag) {
          $ionicLoading.show({
            template: (angular.isDefined(content) ? content : "操作失败"),
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            duration: 1500
          });
        } else {
          $cordovaToast.showLongBottom((angular.isDefined(content) ? content : "操作失败")).then(function (success) {
          }, function (error) {
          });
        }
      };
      this.showVeryShortCenterToast = function (content) {
        if (!baseConfig.nativeScreenFlag) {
          $ionicLoading.show({
            template: (angular.isDefined(content) ? content : "操作失败"),
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            duration: 1000
          });
        } else {
          $cordovaToast.showShortBottom((angular.isDefined(content) ? content : "操作失败")).then(function (success) {
          }, function (error) {
          });
        }
      };
      this.showLongCenterToast = function (content) {
        if (!baseConfig.nativeScreenFlag) {
          $ionicLoading.show({
            template: (angular.isDefined(content) ? content : "操作失败"),
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            duration: 3000
          });
        } else {
          $cordovaToast.showLongBottom((angular.isDefined(content) ? content : "操作失败")).then(function (success) {
          }, function (error) {
          });
        }
      };
      //弹出确认弹出框
      this.showPopup = function (template, title) {
        if (!baseConfig.nativeScreenFlag) {
          $ionicPopup.show({
            title: "提示",
            template: template,
            buttons: [{
              text: '确定',
              type: 'button button-cux-popup-confirm'
            }]
          });
        } else {
          var alertDismissed = function () {
          };
          navigator.notification.alert(
            template, // message
            alertDismissed, // callback
            "提示", // title
            '确定' // buttonName
          );
        }
      };
      this.confirmNoTitle = function (message, confireText,cancleText,onConfirm) {
  /*      if (!baseConfig.nativeScreenFlag) {*/
          var confirmPopup = $ionicPopup.confirm({
            template: message,
            cancelText: cancleText,
            cancelType: 'button-cux-popup-cancel',
            okText: confireText,
            okType: 'button-cux-popup-confirm'
          });
          confirmPopup.then(function(res){
            if(res){
              onConfirm(res);
            }else{

            }
          });
/*        } else {
          navigator.notification.confirm(
            message, // message
            function (index) {
              onConfirm(index-1);
            }, // callback to invoke with index of button pressed
            title, // title
            ['取消' , '确定'] // buttonLabels
          );
        }*/
      };
      //弹出是否确认的窗口
      this.prompt = function (myscope, title, popup, pluginPopup) {
        if (!baseConfig.nativeScreenFlag) {
          var myPopup = $ionicPopup.show({
            template: '<input type="type" ng-model="myScope.data.city">',
            title: title,
            subTitle: title,
            scope: myscope,
            buttons: [
              {text: '取消'},
              {
                text: '<b>确定</b>',
                type: 'button-positive',
                onTap: function (e) {
                  if (!myscope.myScope.data.city) {
                    e.preventDefault();
                  } else {
                    return myscope.myScope.data.city;
                  }
                }
              },
            ]
          });
          myPopup.then(popup);
        } else {

          navigator.notification.prompt(
            title,  // message
            pluginPopup,          // callback to invoke
            '填写信息',           // title
            ['确定', '退出'],    // buttonLabels
            ''                 // defaultText
          );
        }
      };
      //弹出wifi的的窗口
      this.prompt = function (title, text, okText, cancelText, okFunc, cancelFunc) {
        if (!baseConfig.nativeScreenFlag) {
          var confirmPopup = $ionicPopup.confirm({
            template: message,
            cancelText: '取消',
            cancelType: 'button-cux-popup-cancel',
            okText: '确定',
            okType: 'button-cux-popup-confirm'
          });
          confirmPopup.then(function(res){
            if(res){
              onConfirm(res);
            }else{

            }
          });
        } else {
          $cordovaDialogs.confirm(text, title, [okText, cancelText])
            .then(function (buttonIndex) {
              // no button = 0, 'OK' = 1, 'Cancel' = 2
              console.log("wsConfirm   buttonIndex: "+buttonIndex);
              var btnIndex = buttonIndex;
              if (btnIndex == 1) {
                okFunc();
              }
            });
        }
      };
    }
  ]);
