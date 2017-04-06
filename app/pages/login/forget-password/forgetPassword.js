/**
 *@autor: caolei
 */
angular.module('loginModule').controller('forgetPasswordCtrl', ['$scope', '$state', 'hmsPopup', '$ionicHistory', '$interval', function($scope, $state, hmsPopup, $ionicHistory, $interval){

  $scope.showNextBtn = false;
  $scope.showNextBtnHidden = true;
  $scope.isFirstStep = true;
  $scope.isSecondStep = false;
  $scope.isThirdStep = false;
  $scope.paracont = "";
  $scope.paraclass = "but_null";
  $scope.paraevent = true;
  $scope.showNextSecondBtn = false;
  $scope.showNextBtnSecondHidden = true;
  $scope.showNextThirdBtn = false;
  $scope.showNextBtnThirdHidden = true;
  var second = 60;
  var  timePromise = undefined;
  $scope.accountInfo = {
    account: "",
    password: "",
    securityCode: ""
  };
  $scope.findInfo = {
    securityCode: ""
  };

  /**
   *@autor: caolei
   *@params: accountInfo
   *@disc: monitor object accountInfo value
   */
  $scope.$watch('accountInfo', function(){
    changeFirstNextStep();
    showSubmitBtn();
  }, true);

  $scope.$watch('findInfo', function(){
    changeSecondNextStep();
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
   *@disc: change the second 'next step' status
   */
  var changeSecondNextStep = function(){
    if($scope.findInfo.securityCode){
      $scope.showNextSecondBtn = true;
      $scope.showNextBtnSecondHidden = false;
    }else{
      $scope.showNextSecondBtn = false;
      $scope.showNextBtnSecondHidden = true;
    }
  };

  /**
   *@autor: caolei
   *@disc: the first step in finding a password
   */
  $scope.findPwdFirstStep = function(){

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

  /**
   *@autor: caolei
   *@disc:go back first page
   */
  $scope.goback = function(){
    $ionicHistory.goBack();
  };

  /**
   *@autor: caolei
   *@disc: get security code
   */
  $scope.sendPhoneCode = function(){
    sendCode();
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

  /**
   *@autor: caolei
   *@disc:check security code
   */
  $scope.findPwdSecondStep = function(){
    var securityCode = $scope.findInfo.securityCode;
    if(securityCode.length == 4){
      if($scope.findInfo.securityCode){
        //check code from interface
        //$state.go('tab.indexPage');
        if(true){
          $scope.isFirstStep = false;
          $scope.isSecondStep = false;
          $scope.isThirdStep = true;
        }
      }
    }else{
      hmsPopup.showPopup('<span translate="alertMsg.scfie"></span>');
    }
  };

  /**
   *@autor: caolei
   *@disc: submit update password, go index page
   */
  $scope.findPwdThirdStep = function(){

    if(checkPwd()){
      $state.go('tab.indexPage');
    }

  };

  /**
   *@autor: caolei
   *@disc: check password format
   */
  var checkPwd = function(){
    var password = $scope.accountInfo.password;
    if(password){
      var wordLength = password.length;
      if(wordLength < 6){
        hmsPopup.showPopup('<span translate="alertMsg.pwdIsLess"></span>');
        return false;
      }else if(wordLength > 18){
        hmsPopup.showPopup('<span translate="alertMsg.pwdIsMore"></span>');
        return false;
      }
    }
    return true;
  };

  /**
   *@autor: caolei
   *@disc: show submit button
   */
  var showSubmitBtn = function(){
    if($scope.accountInfo.password){
      $scope.showNextThirdBtn = true;
      $scope.showNextBtnThirdHidden = false;
    }else{
      $scope.showNextThirdBtn = false;
      $scope.showNextBtnThirdHidden = true;
    }
  };

}]);
