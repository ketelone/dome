/**
 * Created by chenjiacheng on 2017/3/28.
 */
//myInfoModule$translateProvider', '$translateStaticFilesLoaderProvider'
//.config([
//'$translateProvider', '$translateStaticFilesLoaderProvider',
//  function (  $translateProvider, $translateStaticFilesLoaderProvider) {


 // }])

angular.module('myInfoModule')
  .controller('settingLanguageCtrl', [
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
    '$stateParams','SettingsService','$translate',
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
              $rootScope, publicMethod,$stateParams,SettingsService,$translate) {


    // alert(window.localStorage.locallanguage);
if( window.localStorage.locallanguage==undefined) {
  window.localStorage.ischecked=true;
  window.localStorage.radioImg1="build/img/common/radio_h.png";
  window.localStorage.radioImg2="build/img/common/radio_q.png";
  window.localStorage.radioTemp="build/img/common/radio_h.png";

 $scope.languageItems = [{
    ischecked: true,
    language: "my-info.setting-language.followLanguage",
    radioImg1: "build/img/common/radio_h.png",
    radioImg2: "build/img/common/radio_q.png",
    radioTemp: "build/img/common/radio_h.png"
  }, {
    ischecked: false,
    language: "中文简体",
    radioImg1: "build/img/common/radio_q.png",
    radioImg2: "build/img/common/radio_h.png",
    radioTemp: "build/img/common/radio_q.png"
  },
    {
      ischecked: false,
      language: "中文繁体",
      radioImg1: "build/img/common/radio_q.png",
      radioImg2: "build/img/common/radio_h.png",
      radioTemp: "build/img/common/radio_q.png"
    },
    {
      ischecked: false,
      language: "English",
      radioImg1: "build/img/common/radio_q.png",
      radioImg2: "build/img/common/radio_h.png",
      radioTemp: "build/img/common/radio_q.png"
    },
    {
      ischecked: false,
      language: "한국어",
      radioImg1: "build/img/common/radio_q.png",
      radioImg2: "build/img/common/radio_h.png",
      radioTemp: "build/img/common/radio_q.png"
    },
    {
      ischecked: false,
      language: "ภาษาไทย",
      radioImg1: "build/img/common/radio_q.png",
      radioImg2: "build/img/common/radio_h.png",
      radioTemp: "build/img/common/radio_q.png"
    }
  ];
}

      $scope.goBack = function(){
        $ionicHistory.goBack();
      }

      /**
       *@autor:chenjiacheng
       *@name:chooseLanguage
       *@params:
       *@return:
       *@disc:Select language
       */
      $scope.chooseLanguage=function(item){
        item.ischecked=true;
        item.radioImg1="build/img/common/radio_h.png";
        for(var i=0;i<$scope.languageItems.length;i++){
       if($scope.languageItems[i].language!=item.language){
         $scope.languageItems[i].ischecked=false;
         $scope.languageItems[i].radioImg1="build/img/common/radio_q.png";
       }
        }

 if(item.language=='my-info.setting-language.followLanguage'){
alert(1);
   navigator.globalization.getPreferredLanguage(
     function (language) {

       if (language.value == 'zh-CN' || 'zh-Hans-CN') {
         $translate.use('zh');

 }
       else if (language.value == 'zh-TW' || 'zh-Hans-TW') {
         $translate.use('tw');

 }
       else if (language.value == 'en-US' || 'en-CN') {
         $translate.use('en');
}
       else if (language.value == 'en-TH' || 'th-CN') {
         $translate.use('th');

    }

     },
     function () {
       // alert('Error getting locale\n');
     });
    publicMethod.goBack();
        }
   if(item.language=='中文简体'){

     $translate.use('zh');

     publicMethod.goBack();
   }
        if(item.language=='中文繁体'){

          $translate.use('tw');
       publicMethod.goBack();
        }
        if(item.language=='English'){

          $translate.use('en');
          publicMethod.goBack();

        }




    //if($(e.target).text().trim()=="中文简体"){
    //
    //  $translate.use('zh');
    //  var  temperature=SettingsService.get("temperature");
    //  alert(temperature);
    //  if(temperature=='fahrenheit'){
    //    SettingsService.set("temperature",'华氏度°F');
    //    window.localStorage.temperature="°F";
    //  }
    //  if(temperature=='centigrade'){
    //    SettingsService.set("temperature",'摄氏度°C');
    //    window.localStorage.temperature="°C";
    //  }
    // // SettingsService.set("temperature",temperature);
    //
    //  publicMethod.goBack();
    //
    //}
    //    if($(e.target).text().trim()=="中文繁體"){
    //   //   SettingsService.set("language","中文繁體");
    //
    //      $translate.use('tw');
    //      publicMethod.goBack();
    //
    //    }
    //    if($(e.target).text().trim()=="English"){
    //  //    SettingsService.set("language","English");
    //      var  temperature=SettingsService.get("temperature");
    //      alert(temperature);
    //      if(temperature=='华氏度°F'){
    //        SettingsService.set("temperature",'fahrenheit');
    //        window.localStorage.temperature="°F";
    //      }
    //      if(temperature=='摄氏度°C'){
    //        SettingsService.set("temperature",'centigrade');
    //        window.localStorage.temperature="°C";
    //      }
    //      $translate.use('en');
    //
    //      publicMethod.goBack();
    //    }
    //    if($(e.target).text().trim()=="ภาษาไทย"){
    //     // SettingsService.set("language","ภาษาไทย");
    //      publicMethod.goBack();
    //    }

   }



    }]);
