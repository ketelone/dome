/**
 * Created by daidongdong on 17/3/28.
 */
angular.module('loginModule').controller('registeredCtrl', ['$scope','hmsPopup','$state','$ionicHistory','$interval', function ($scope, hmsPopup, $state, $ionicHistory, $interval) {

  $scope.isMailRsg = true;
  $scope.isPhoneRsg = false;
  $scope.showUserClearButton = true;
  $scope.showNextBtn = true;
  $scope.showNextRsgBtn = false;
  $scope.isPhoneRsgNext = false;
  $scope.showNextCodeBtn = false;
  $scope.showNextCodeHiddenBtn = true;
  $scope.paracont = "";
  $scope.paraclass = "but_null";
  $scope.paraevent = true;
  var second = 60;
  var  timePromise = undefined;
  $scope.mailRegisterInfo = {
    email: "",
    password: ""
  };
  $scope.phoneRegisterInfo = {
    phoneNumber: "",
    password: "",
    country: "",
    securityCode: ""
  };
  $scope.country = "";
  $scope.selectedStr = ['China', 'American', 'England'];

  /**
   *@autor: caolei
   *@disc: registered function
   */
  $scope.registered = function () {

    if($scope.isMailRsg){
      if(checkMailFormat() && checkPassword()){
        //hmsPopup.confirmDIY('<center><p translate="alertMsg.ywei">'+$scope.mailRegisterInfo.email + "</p>" + '<p translate="alertMsg.ecmpafp"></p><p translate="alertMsg.pcir"></p></center>', '<p translate="alertMsg.cem"></p>','<p translate="alertMsg.cr"></p>','<p translate="alertMsg.rm"></p>',confirm, cancel);
        hmsPopup.confirmDIY('<center><p>您填写的邮箱是'+$scope.mailRegisterInfo.email + ",</p>" + "<p>邮箱可用于修改密码和找回密码。</p><p>请确认是否正确无误。</p></center>", "确认邮箱","继续注册","返回修改",confirm, cancel);
        return;
      }
    }else{
      if(checkPhoneNumFormat() && checkPhonePwd()){
        $state.go('tab.indexPage');
        return;
      }
    }
  };

  /**
   *@autor: caolei
   *@disc: phone registration
   */
  $scope.phoneRegistered = function(){
    if(checkPhoneNumFormat()){
      $scope.isPhoneRsgNext = true;
      sendCode();
    }
  };

  /**
   *@autor: caolei
   *@disc: the last phone registration
   */
  $scope.phoneLastRegistered = function(){
    //1.验证码的验证
    //2.手机密码的验证
    //成功后提示注册成功，加载框进入首页
    if(checkCode() && checkPhonePwd()){
      $state.go('tab.indexPage');
      return;
    }
  };

  var confirm = function(){
    hmsPopup.hideLoading();
    $state.go('tab.indexPage');
  };

  var cancel = function(){
    //alert("cancel");
  };

  $scope.getAggrementInfo = function(){
    alert("in---");
  };

  $scope.showPhoneRsg = function(){
    $scope.isMailRsg = false;
    $scope.isPhoneRsg = true;
  };

  $scope.showMailRsg = function(){
    $scope.isMailRsg = true;
    $scope.isPhoneRsg = false;
  };

  $scope.clearMailValue = function(){
    $scope.showUserClearButton = false;
    $scope.mailRegisterInfo.email = "";
  };

  $scope.clearPhoneNum = function(){
    $scope.showUserClearButton = false;
    $scope.phoneRegisterInfo.phoneNumber = "";
  };

  $scope.emailBlur = function(){
    $scope.showUserClearButton = true;
  };

  $scope.phoneBlur = function(){
    $scope.showUserClearButton = true;
  };

  /**
   *@autor: caolei
   *@disc: verify email's format
   */
  var checkMailFormat = function(){
    //right
    if(isEmailAddress($scope.mailRegisterInfo.email)){
      $scope.showUserClearButton = false;
    }else{
      //error
      if($scope.showUserClearButton){
        hmsPopup.showPopup('<span translate="alertMsg.ema"></span>');
        return false;
      }
    }

    return true;
  };

  var checkPassword = function(){
    var password = $scope.mailRegisterInfo.password;
    if(password){
      var wordLength = password.length;
      if(wordLength < 6){
        hmsPopup.showPopup('<span translate="alertMsg.pwdIsLess"></span>');
        return false;
      }else if(wordLength > 18){
        hmsPopup.showPopup('<span translate="alertMsg.pwdIsMore"></span>');
        return false;
      }
    }else{
      hmsPopup.showPopup('<span translate="alertMsg.pwdnn"></span>');
      return false;
    }
    return true;
  };

  var checkPhonePwd = function(){
    var password = $scope.phoneRegisterInfo.password;
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

  var checkPhoneNumFormat = function(){

    if(phoneNumber($scope.phoneRegisterInfo.phoneNumber)){
      $scope.showUserClearButton = false;
    }else{
      //error
      if($scope.showUserClearButton){
        hmsPopup.showPopup('<span translate="alertMsg.pnfie"></span>');
        return false;
      }
    }

    return true;
  };

  $scope.$watch('mailRegisterInfo', function(){
    changeNextStepBtnPP($scope.mailRegisterInfo.email, $scope.mailRegisterInfo.password);
  }, true);

  $scope.$watch('phoneRegisterInfo', function(){
    changeNextStepBtnPP($scope.phoneRegisterInfo.phoneNumber, $scope.phoneRegisterInfo.password);
    changeNextStepBtn($scope.phoneRegisterInfo.phoneNumber);
    changeNextStepCode($scope.phoneRegisterInfo.securityCode, $scope.phoneRegisterInfo.password);
  }, true);

  var changeNextStepBtnPP = function(userAccount, password){
    var value = userAccount;
    var passwordValue = password;
    if(value && passwordValue){
      $scope.showNextBtn = false;
      $scope.showNextRsgBtn = true;
    }else{
      $scope.showNextBtn = true;
      $scope.showNextRsgBtn = false;
    }
  };

  var changeNextStepBtn = function(userAccount){
    var phoneNum = userAccount;
    var value = $("#country").val();
    if(value && phoneNum){
      $scope.showNextBtn = false;
      $scope.showNextRsgBtn = true;
    }else{
      $scope.showNextBtn = true;
      $scope.showNextRsgBtn = false;
    }
  };

  var changeNextStepCode = function(securityCode, password){
    var value = securityCode;
    var passwordValue = password;
    if(value && passwordValue){
      $scope.showNextCodeBtn = true;
      $scope.showNextCodeHiddenBtn = false;
    }else{
      $scope.showNextCodeBtn = false;
      $scope.showNextCodeHiddenBtn = true;
    }
  };

  $scope.goback = function(){
    $ionicHistory.goBack();
  };

  $scope.sendphonecode = function(){
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

  var checkCode = function(){
    var securityCode = $scope.phoneRegisterInfo.securityCode;
    if(securityCode){
      //格式是否正确
      if(securityCode.length == 4){
        //code是否正确
        if(true){
          return true;
        }else{
          return false;
        }
      }else{
        hmsPopup.showPopup('<span translate="alertMsg.scfie"></span>');
        return false;
      }
    }
    //hmsPopup.showPopup('<span translate="alertMsg.pwdIsLess"></span>');
  }

}]);
