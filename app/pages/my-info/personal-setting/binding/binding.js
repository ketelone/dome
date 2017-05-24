
angular.module('myInfoModule')
  .controller('bindingCtrl', [
    '$scope','$state','baseConfig','$ionicLoading','$http',
    '$timeout','$ionicHistory','$ionicPlatform',
    '$ionicScrollDelegate','hmsPopup','$rootScope',
    'publicMethod','$stateParams',
    function ($scope,$state,baseConfig,$ionicLoading,
              $http,$timeout,$ionicHistory,$ionicPlatform,
              $ionicScrollDelegate,hmsPopup,
              $rootScope, publicMethod, $stateParams) {

      $scope.goBack = function(){
        $ionicHistory.goBack();
      };

      $scope.type=$stateParams.type?Number($stateParams.type):0;
      switch ($scope.type){
        case 0://手机号码
          $scope.title="my-info.personal-setting.tel_binding";
          $scope.tips="my-info.personal-setting.tel_tips1";
          $scope.inputDes="my-info.personal-setting.tel_placeholder";
          $scope.inputType="tel";
          break;
        case 1://邮箱
          $scope.title="my-info.personal-setting.email_binding";
          $scope.tips="my-info.personal-setting.email_tips1";
          $scope.inputDes="my-info.personal-setting.email_placeholder";
          $scope.inputType="email";
          break;
      }

      //获取验证码
      //表单验证
      //更新数据


    }]);
