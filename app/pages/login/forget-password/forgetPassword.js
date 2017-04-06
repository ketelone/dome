/**
 *@autor: caolei
 */
angular.module('loginModule').controller('forgetPasswordCtrl', ['$scope', '$state', 'hmsPopup', '$ionicHistory', function($scope, $state, hmsPopup, $ionicHistory){

  $scope.showNextBtn = false;
  $scope.showNextBtnHidden = true;
  $scope.isFirstStep = true;
  $scope.isSecondStep = false;
  $scope.paracont = "";
  $scope.paraclass = "but_null";
  $scope.paraevent = true;
  $scope.accountInfo = {
    account: "",
    password: ""
  };

  /**
   *@autor: caolei
   *@params: accountInfo
   *@disc: monitor object accountInfo value
   */
  $scope.$watch('accountInfo', function(){
    changeFirstNextStep();
  }, true);

  /**
   *@autor: caolei
   *@disc: change the first 'next step' status
   */
  var changeFirstNextStep = function(){
    if($scope.accountInfo.account){
      $scope.showNextBtn = true;
      $scope.showNextBtnHidden = false;
    }else{
      $scope.showNextBtn = false;
      $scope.showNextBtnHidden = true;
    }
  };

  /**
   *@autor: caolei
   *@disc: the first step in finding a password
   */
  $scope.findPwdFirstStep = function(){

    alert("in--");
    var account = $scope.accountInfo.account;
    if(isEmailAddress(account) || phoneNumber(account)){

      //check the account exist
      if(true){
        $scope.isFirstStep = false;
        $scope.isSecondStep = true;
        sendCode();
      }else{
        hmsPopup.showPopup('该账户不存在');
      }

    }else{
      hmsPopup.showPopup('请输入正确的手机格式或者邮箱格式');
    }

  };

  $scope.goback = function(){
    $ionicHistory.goBack();
  };

  var sendCode = function(){
    timePromise = $interval(function(){
      if(second<=0){
        $interval.cancel(timePromise);
        timePromise = undefined;

        second = 60;
        $scope.paracont = "重发";
        $scope.paraclass = "but_null";
        $scope.paraevent = true;
      }else{
        $scope.paracont = second + "s";
        $scope.paraclass = "not but_null";
        second--;
      }
    },1000,100);
  };

}]);
