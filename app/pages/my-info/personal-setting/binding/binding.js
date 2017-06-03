angular.module('myInfoModule')
  .controller('bindingCtrl', [
    '$scope','$state','baseConfig','$ionicLoading','$http',
    '$timeout','$ionicHistory','$ionicPlatform',
    '$ionicScrollDelegate','hmsPopup','$rootScope',
    'publicMethod','$stateParams','$translate',
    function ($scope,$state,baseConfig,$ionicLoading,
              $http,$timeout,$ionicHistory,$ionicPlatform,
              $ionicScrollDelegate,hmsPopup,
              $rootScope, publicMethod, $stateParams,
              $translate) {

      $scope.goBack = function(){
        $ionicHistory.goBack();
      };

      $scope.type=$stateParams.type?Number($stateParams.type):0;
      if($scope.type){//邮箱
          $scope.title=$translate.instant("my-info.personal-setting.email_binding");
          $scope.tips=$translate.instant("my-info.personal-setting.email_tips1");
          $scope.inputDes=$translate.instant("my-info.personal-setting.email_placeholder");
          $scope.inputType="email";
      }else {//手机号码
        $scope.title=$translate.instant("my-info.personal-setting.tel_binding");
        $scope.tips=$translate.instant("my-info.personal-setting.tel_tips1");
        $scope.inputDes=$translate.instant("my-info.personal-setting.tel_placeholder");
        $scope.inputType="tel";
      }

      //获取验证码
      //表单验证
      //更新数据


    }]);
