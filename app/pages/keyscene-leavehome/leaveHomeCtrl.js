/**
 * Created by daidongdong on 2017/4/10.
 */
angular.module('productModule')
  .controller('leaveHomeCtrl',     [
  '$scope',
  '$state',
  'publicMethod','$ionicModal','$ionicPopover','$timeout','$ionicHistory','hmsHttp',
  function ($scope, $state,publicMethod,$ionicModal,$ionicPopover,$timeout,$ionicHistory,hmsHttp) {
    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
    console.log($ionicHistory);

    $scope.post = function(){
      var url = "http://192.168.1.108:8087/core/r/api/public/demo/query";
      var paramter = {
        "deviceId":"xxtest",
        "data":[
          {
            "ver":1,
            "from" :{ "ctype":227, "uid":"17321096611"},
            "to" : { "ctype":229, "uid":"24A93477" },
            "ts": 123412412342134213432143214214323,
            "idx":1,
            "mtype": "command",
            "data":
            {
              "cmd":["887706010305270222"]
            }
          }
        ]

      }
      hmsHttp.post(url, paramter).success(
        function(response){
          console.log(response);
        }
      ).error(
        function (response, status, header, config){
        }
      );
    }
    // $scope.post();
    $scope.goSetting = function(){
      $state.go("bigAuntSetting");
    }
  }]);
