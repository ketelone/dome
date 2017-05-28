// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js


var myApp = angular.module('myApp', [
  'ionic',
  'ngCordova',
  'loginModule',
  'baseConfig',
  'messageModule',
  'indexPageModule',
  'myInfoModule',
  'utilModule',
  'utilsModule',
  'serviceModule',
  'deviceAddModule',
  'HmsModule',
  'productModule',
  'pascalprecht.translate',
  'toiletControlModule',
  'bathroomModule',
  'karessControlModule',
  'nextgenModule',
  'mcControlModule',
  'airfoilShowerModule',
  'sceneSupermarketModule'
]);

var db = null;
angular.module('myApp')
  .run(function ($ionicPlatform, $translate, baseConfig) {
    $ionicPlatform.ready(function () {
      // window.plugins.orientationLock.lock("portrait");
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }


      window.localStorage.temperature="°C";
      window.localStorage.useWater="S";
      window.localStorage.useElectricity="h";

      if (window.localStorage.languageFlag == undefined || window.localStorage.language == "default") {
        navigator.globalization.getPreferredLanguage(
          function (language) {
            //alert(language.value == 'zh-Hans-CN');
            //alert(language.value == 'zh-CN' || language.value == 'zh-Hans-CN');
            if (language.value == 'zh-CN' || language.value == 'zh-Hans-CN') {
              //alert(language.value + '1');
              $translate.use('zh');
              window.localStorage.language="中文简体";
            }
            else if (language.value == 'zh-TW' || language.value == 'zh-Hans-TW') {
              $translate.use('en');
              window.localStorage.language="English";
            }
            else if (language.value == 'en-US' || language.value == 'en-CN') {
              //alert(language.value + '2');
              $translate.use('en');
              window.localStorage.language="English";
            }
            else if (language.value == 'en-TH' || language.value == 'th-CN') {
              $translate.use('en');
              window.localStorage.language="English";
            }
            else {
              $translate.use('en');
              //alert(language.value + "a");
            }
            window.localStorage.languageFlag = true;
            window.localStorage.language = "default";
          },
          function () {
            // alert('Error getting locale\n');
          });
      }
      else {
        if (window.localStorage.language == '中文简体') {
          $translate.use('zh');
        }
        else if (window.localStorage.language == '中文繁体') {
          $translate.use('en');
        }
        else if (window.localStorage.language == 'English') {
          $translate.use('en');
        }
        else if (window.localStorage.language == 'ภาษาไทย') {
          $translate.use('en');
        }
        else {
          $translate.use('en');
        }
      }
    });

    localStorage.boxLinkCount = 1;

    document.addEventListener('deviceready', function () {
      console.log('openDatabase');
      db = window.sqlitePlugin.openDatabase({name: 'ko.db', location: 'default'});

      //T_CTM_PARTY
      db.transaction(function (tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS T_CTM_PARTY (" +
          "[PARTY_ID] [bigint] IDENTITY(1,1) NOT NULL," +
          "[PARTY_TYPE] [nvarchar](30) NULL," +
          "[PARTY_ACCOUNT] [nvarchar](30) NULL," +
          "[PASSWORD] [nvarchar](80) NULL," +
          "[HEAD_PORTRAIT] [nvarchar](240) NULL," +
          "[PARTY_NAME] [nvarchar](30) NULL," +
          "[SEX] [nvarchar](30) NULL," +
          "[PHONE_NUMBER] [nvarchar](30) NULL," +
          "[EMAIL_ADDRESS] [nvarchar](30) NULL," +
          "[LOCATION_ADDRESS] [nvarchar](30) NULL," +
          "[ROLE_ID] [bigint] NULL," +
          "[TIME_ZONE] [nvarchar](30) NULL," +
          "[PARTY_STATUS] [nvarchar](30) NULL," +
          "[REFERENCE_SOURCE] [nvarchar](30) NULL," +
          "[CREATION_DATE] [datetime] NOT NULL," +
          "[CREATED_BY] [nvarchar](100) NOT NULL," +
          "[LAST_UPDATE_DATE] [datetime] NOT NULL," +
          "[LAST_UPDATED_BY] [nvarchar](100) NOT NULL," +
          "[LAST_UPDATE_LOGIN] [nvarchar](100) NOT NULL," +
          "[OBJECT_VERSION_NUMBER] [bigint] NOT NULL," +
          "[REQUEST_ID] [bigint] NULL," +
          "[PROGRAM_ID] [bigint] NULL," +
          "[ATTRIBUTE_CATEGORY] [nvarchar](100) NULL," +
          "[ATTRIBUTE1] [nvarchar](240) NULL," +
          "[ATTRIBUTE2] [nvarchar](240) NULL," +
          "[ATTRIBUTE3] [nvarchar](240) NULL," +
          "[ATTRIBUTE4] [nvarchar](240) NULL," +
          "[ATTRIBUTE5] [nvarchar](240) NULL," +
          "[ATTRIBUTE6] [nvarchar](240) NULL," +
          "[ATTRIBUTE7] [nvarchar](240) NULL," +
          "[ATTRIBUTE8] [nvarchar](240) NULL," +
          "[ATTRIBUTE9] [nvarchar](240) NULL," +
          "[ATTRIBUTE10] [nvarchar](240) NULL," +
          "[ATTRIBUTE11] [nvarchar](240) NULL," +
          "[ATTRIBUTE12] [nvarchar](240) NULL," +
          "[ATTRIBUTE13] [nvarchar](240) NULL," +
          "[ATTRIBUTE14] [nvarchar](240) NULL," +
          "[ATTRIBUTE15] [nvarchar](240) NULL," +
          "[GROUP_ID] [bigint] NULL" +
          ")");

        tx.executeSql("CREATE TABLE IF NOT EXISTS T_CTM_PARTY_BOX (" +
          "[PARTY_BOX_ID] [bigint] IDENTITY(1,1) NOT NULL," +
          "[PARTY_ID] [bigint] NULL," +
          "[BOX_ID] [bigint] NULL," +
          "[REFERENCE_SOURCE] [nvarchar](30) NULL," +
          "[CREATION_DATE] [datetime] NOT NULL," +
          "[CREATED_BY] [nvarchar](100) NOT NULL," +
          "[LAST_UPDATE_DATE] [datetime] NOT NULL," +
          "[LAST_UPDATED_BY] [nvarchar](100) NOT NULL," +
          "[LAST_UPDATE_LOGIN] [nvarchar](100) NOT NULL," +
          "[GROUP_ID] [bigint] NULL" +
          ")");

        tx.executeSql("CREATE TABLE IF NOT EXISTS T_CTM_PARTY_BOX_DEVICE (" +
          "[BOX_DEVICE_ID] [bigint] IDENTITY(1,1) NOT NULL," +
          "[PARTY_ID] [bigint] NOT NULL," +
          "[BOX_ID] [bigint] NULL," +
          "[DEVICE_ID] [bigint] NOT NULL," +
          "[REFERENCE_SOURCE] [nvarchar](30) NULL," +
          "[CREATION_DATE] [datetime] NOT NULL," +
          "[CREATED_BY] [nvarchar](100) NOT NULL," +
          "[LAST_UPDATE_DATE] [datetime] NOT NULL," +
          "[LAST_UPDATED_BY] [nvarchar](100) NOT NULL," +
          "[LAST_UPDATE_LOGIN] [nvarchar](100) NULL," +
          "[GROUP_ID] [bigint] NULL" +
          ")");

        tx.executeSql("CREATE TABLE IF NOT EXISTS T_CTM_PARTY_GROUP (" +
          "[PARTY_GROUP_ID] [bigint] IDENTITY(1,1) NOT NULL," +
          "[PARTY_ID] [bigint] NULL," +
          "[GROUP_ID] [bigint] NULL," +
          "[ROOT_FLAG] [nvarchar](30) NULL," +
          "[DEFAULT_FLAG] [nvarchar](30) NULL," +
          "[REFERENCE_SOURCE] [nvarchar](30) NULL," +
          "[CREATION_DATE] [datetime] NOT NULL," +
          "[CREATED_BY] [nvarchar](100) NOT NULL," +
          "[LAST_UPDATE_DATE] [datetime] NOT NULL," +
          "[LAST_UPDATED_BY] [nvarchar](100) NOT NULL," +
          "[LAST_UPDATE_LOGIN] [nvarchar](100) NOT NULL" +
          ")");

        tx.executeSql("CREATE TABLE IF NOT EXISTS T_CTM_PARTY_GROUP_DEVICE (" +
          "[GROUP_DEVICE_ID] [bigint] IDENTITY(1,1) NOT NULL," +
          "[PARTY_ID] [bigint] NOT NULL," +
          "[GROUP_ID] [bigint] NOT NULL," +
          "[DEVICE_ID] [bigint] NOT NULL," +
          "[REFERENCE_SOURCE] [nvarchar](30) NULL," +
          "[CREATION_DATE] [datetime] NOT NULL," +
          "[CREATED_BY] [nvarchar](100) NOT NULL," +
          "[LAST_UPDATE_DATE] [datetime] NOT NULL," +
          "[LAST_UPDATED_BY] [nvarchar](100) NOT NULL," +
          "[LAST_UPDATE_LOGIN] [nvarchar](100) NOT NULL," +
          "[DEVICE_TYPE] [nvarchar](30) NOT NULL" +
          ")");

        tx.executeSql("CREATE TABLE IF NOT EXISTS T_DVM_DEVICE (" +
          "[DEVICE_ID] [bigint] IDENTITY(1,1) NOT NULL," +
          "[IOT_DEVICE_ID] [nvarchar](50) NULL," +
          "[PRODUCT_ID] [bigint] NOT NULL," +
          "[SKU_ID] [bigint] NOT NULL," +
          "[SKU_NUMBER] [nvarchar](30) NOT NULL," +
          "[DEVICE_SERIAL_NUMBER] [nvarchar](30) NULL," +
          "[DEVICE_CODE] [nvarchar](30) NULL," +
          "[DEVICE_NAME] [nvarchar](30) NULL," +
          "[LOCATION] [nvarchar](240) NULL," +
          "[CONNECT_MODE] [nvarchar](30) NULL," +
          "[REFERENCE_SOURCE] [nvarchar](30) NULL," +
          "[CREATION_DATE] [datetime] NOT NULL," +
          "[CREATED_BY] [nvarchar](100) NOT NULL," +
          "[LAST_UPDATE_DATE] [datetime] NOT NULL," +
          "[LAST_UPDATED_BY] [nvarchar](100) NOT NULL," +
          "[LAST_UPDATE_LOGIN] [nvarchar](100) NULL," +
          "[OBJECT_VERSION_NUMBER] [bigint] NOT NULL," +
          "[REQUEST_ID] [bigint] NULL," +
          "[PROGRAM_ID] [bigint] NULL," +
          "[ATTRIBUTE_CATEGORY] [nvarchar](100) NULL," +
          "[ATTRIBUTE1] [nvarchar](240) NULL," +
          "[ATTRIBUTE2] [nvarchar](240) NULL," +
          "[ATTRIBUTE3] [nvarchar](240) NULL," +
          "[ATTRIBUTE4] [nvarchar](240) NULL," +
          "[ATTRIBUTE5] [nvarchar](240) NULL," +
          "[ATTRIBUTE6] [nvarchar](240) NULL," +
          "[ATTRIBUTE7] [nvarchar](240) NULL," +
          "[ATTRIBUTE8] [nvarchar](240) NULL," +
          "[ATTRIBUTE9] [nvarchar](240) NULL," +
          "[ATTRIBUTE10] [nvarchar](240) NULL," +
          "[ATTRIBUTE11] [nvarchar](240) NULL," +
          "[ATTRIBUTE12] [nvarchar](240) NULL," +
          "[ATTRIBUTE13] [nvarchar](240) NULL," +
          "[ATTRIBUTE14] [nvarchar](240) NULL," +
          "[ATTRIBUTE15] [nvarchar](240) NULL," +
          "[DEVICE_STATUS] [nvarchar](30) NULL," +
          "[GROUP_ID] [bigint] NULL," +
          "[DEVICE_TYPE] [nvarchar](30) NULL" +
          ")");

        tx.executeSql("CREATE TABLE T_CTM_PARTY_SCENARIO (" +
          "[SCENARIO_ID] [bigint] IDENTITY(1,1) NOT NULL," +
          "[PARTY_ID] [bigint] NOT NULL," +
          "[PLUGIN_ID] [bigint] NOT NULL," +
          "[SCENARIO_TYPE] [nvarchar](30) NULL," +
          "[SCENARIO_CODE] [nvarchar](30) NULL," +
          "[SCENARIO_NAME] [nvarchar](30) NULL," +
          "[IMAGE_ADDRESS] [nvarchar](30) NULL," +
          "[REFERENCE_SOURCE] [nvarchar](30) NULL," +
          "[SCENARIO_STATUS] [nvarchar](30) NULL," +
          "[DEFAULT_FLAG] [nvarchar](30) NULL," +
          "[ACTIVE_FLAG] [nvarchar](30) NULL," +
          "[DESCRIPTION] [nvarchar](240) NULL," +
          "[CREATION_DATE] [datetime] NOT NULL," +
          "[CREATED_BY] [nvarchar](100) NOT NULL," +
          "[LAST_UPDATE_DATE] [datetime] NOT NULL," +
          "[LAST_UPDATED_BY] [nvarchar](100) NOT NULL," +
          "[LAST_UPDATE_LOGIN] [nvarchar](100) NOT NULL," +
          "[OBJECT_VERSION_NUMBER] [bigint] NOT NULL," +
          "[REQUEST_ID] [bigint] NULL," +
          "[PROGRAM_ID] [bigint] NULL," +
          "[ATTRIBUTE_CATEGORY] [nvarchar](100) NULL," +
          "[ATTRIBUTE1] [nvarchar](240) NULL," +
          "[ATTRIBUTE2] [nvarchar](240) NULL," +
          "[ATTRIBUTE3] [nvarchar](240) NULL," +
          "[ATTRIBUTE4] [nvarchar](240) NULL," +
          "[ATTRIBUTE5] [nvarchar](240) NULL," +
          "[ATTRIBUTE6] [nvarchar](240) NULL," +
          "[ATTRIBUTE7] [nvarchar](240) NULL," +
          "[ATTRIBUTE8] [nvarchar](240) NULL," +
          "[ATTRIBUTE9] [nvarchar](240) NULL," +
          "[ATTRIBUTE10] [nvarchar](240) NULL," +
          "[ATTRIBUTE11] [nvarchar](240) NULL," +
          "[ATTRIBUTE12] [nvarchar](240) NULL," +
          "[ATTRIBUTE13] [nvarchar](240) NULL," +
          "[ATTRIBUTE14] [nvarchar](240) NULL," +
          "[ATTRIBUTE15] [nvarchar](240) NULL," +
          "[GROUP_ID] [bigint] NULL" +
          ")");

        tx.executeSql("CREATE TABLE IF NOT EXISTS T_OGM_GROUP_B (" +
          "[GROUP_ID] [bigint] IDENTITY(1,1) NOT NULL," +
          "[GROUP_TYPE] [nvarchar](30) NULL," +
          "[GROUP_NAME] [nvarchar](30) NULL," +
          "[PARENT_GROUP_ID] [bigint] NULL," +
          "[LEVEL] [bigint] NOT NULL," +
          "[REFERENCE_SOURCE] [nvarchar](30) NULL," +
          "[CREATION_DATE] [datetime] NOT NULL," +
          "[CREATED_BY] [nvarchar](100) NOT NULL," +
          "[LAST_UPDATE_DATE] [datetime] NOT NULL," +
          "[LAST_UPDATED_BY] [nvarchar](100) NOT NULL," +
          "[LAST_UPDATE_LOGIN] [nvarchar](100) NOT NULL," +
          "[OBJECT_VERSION_NUMBER] [bigint] NOT NULL," +
          "[REQUEST_ID] [bigint] NULL," +
          "[PROGRAM_ID] [bigint] NULL," +
          "[ATTRIBUTE_CATEGORY] [nvarchar](100) NULL," +
          "[ATTRIBUTE1] [nvarchar](240) NULL," +
          "[ATTRIBUTE2] [nvarchar](240) NULL," +
          "[ATTRIBUTE3] [nvarchar](240) NULL," +
          "[ATTRIBUTE4] [nvarchar](240) NULL," +
          "[ATTRIBUTE5] [nvarchar](240) NULL," +
          "[ATTRIBUTE6] [nvarchar](240) NULL," +
          "[ATTRIBUTE7] [nvarchar](240) NULL," +
          "[ATTRIBUTE8] [nvarchar](240) NULL," +
          "[ATTRIBUTE9] [nvarchar](240) NULL," +
          "[ATTRIBUTE10] [nvarchar](240) NULL," +
          "[ATTRIBUTE11] [nvarchar](240) NULL," +
          "[ATTRIBUTE12] [nvarchar](240) NULL," +
          "[ATTRIBUTE13] [nvarchar](240) NULL," +
          "[ATTRIBUTE14] [nvarchar](240) NULL," +
          "[ATTRIBUTE15] [nvarchar](240) NULL," +
          "[LEAF_FLAG] [nvarchar](10) NULL" +
          ")");

        tx.executeSql("CREATE TABLE IF NOT EXISTS T_DVM_BOX (" +
          "[BOX_ID] bigint IDENTITY(1,1) NOT NULL  ," +
          "[IOT_DEVICE_ID] nvarchar(50) NULL ," +
          "[PRODUCT_ID] bigint NOT NULL ," +
          "[SKU_ID] bigint NOT NULL ," +
          "[SKU_NUMBER] nvarchar(30) NOT NULL ," +
          "[BOX_SERIAL_NUMBER] nvarchar(30) NOT NULL ," +
          "[BOX_CODE] nvarchar(30) NULL ," +
          "[BOX_NAME] nvarchar(30) NULL ," +
          "[LOCATION] nvarchar(240) NULL ," +
          "[CONNECT_MODE] nvarchar(30) NULL ," +
          "[REFERENCE_SOURCE] nvarchar(30) NULL ," +
          "[CREATION_DATE] datetime NOT NULL DEFAULT (sysdatetime()) ," +
          "[CREATED_BY] nvarchar(100) NOT NULL DEFAULT ('-1') ," +
          "[LAST_UPDATE_DATE] datetime NOT NULL DEFAULT (sysdatetime()) ," +
          "[LAST_UPDATED_BY] nvarchar(100) NOT NULL DEFAULT ('-1') ," +
          "[LAST_UPDATE_LOGIN] nvarchar(100) NOT NULL DEFAULT ('-1') ," +
          "[OBJECT_VERSION_NUMBER] bigint NOT NULL DEFAULT ((1)) ," +
          "[REQUEST_ID] bigint NULL ," +
          "[PROGRAM_ID] bigint NULL ," +
          "[ATTRIBUTE_CATEGORY] nvarchar(100) NULL ," +
          "[ATTRIBUTE1] nvarchar(240) NULL ," +
          "[ATTRIBUTE2] nvarchar(240) NULL ," +
          "[ATTRIBUTE3] nvarchar(240) NULL ," +
          "[ATTRIBUTE4] nvarchar(240) NULL ," +
          "[ATTRIBUTE5] nvarchar(240) NULL ," +
          "[ATTRIBUTE6] nvarchar(240) NULL ," +
          "[ATTRIBUTE7] nvarchar(240) NULL ," +
          "[ATTRIBUTE8] nvarchar(240) NULL ," +
          "[ATTRIBUTE9] nvarchar(240) NULL ," +
          "[ATTRIBUTE10] nvarchar(240) NULL ," +
          "[ATTRIBUTE11] nvarchar(240) NULL ," +
          "[ATTRIBUTE12] nvarchar(240) NULL ," +
          "[ATTRIBUTE13] nvarchar(240) NULL ," +
          "[ATTRIBUTE14] nvarchar(240) NULL ," +
          "[ATTRIBUTE15] nvarchar(240) NULL ," +
          "[BOX_STATUS] nvarchar(30) NOT NULL ," +
          "[GROUP_ID] bigint NULL ," +
          "[FRIMWARE_VERSION] nvarchar(30) NULL ," +
          "PRIMARY KEY ([BOX_ID])" +
          ")");

        tx.executeSql("CREATE TABLE IF NOT EXISTS T_DVM_SKU_B (" +
          "[SKU_ID] bigint IDENTITY(1,1) NOT NULL  ," +
          "[PRODUCT_ID] bigint NOT NULL ," +
          "[SKU_NUMBER] nvarchar(30) NULL ," +
          "[SKU_NAME] nvarchar(240) NULL ," +
          "[DECRIPTION] nvarchar(240) NULL ," +
          "[REFERENCE_SOURCE] nvarchar(30) NULL ," +
          "[CREATION_DATE] datetime NOT NULL DEFAULT (sysdatetime()) ," +
          "[CREATED_BY] nvarchar(100) NOT NULL DEFAULT ('-1') ," +
          "[LAST_UPDATE_DATE] datetime NOT NULL DEFAULT (sysdatetime()) ," +
          "[LAST_UPDATED_BY] nvarchar(100) NOT NULL DEFAULT ('-1') ," +
          "[LAST_UPDATE_LOGIN] nvarchar(100) NOT NULL DEFAULT ('-1') ," +
          "[OBJECT_VERSION_NUMBER] bigint NOT NULL DEFAULT ((1)) ," +
          "[REQUEST_ID] bigint NULL ," +
          "[PROGRAM_ID] bigint NULL ," +
          "[ATTRIBUTE_CATEGORY] nvarchar(100) NULL ," +
          "[ATTRIBUTE1] nvarchar(240) NULL ," +
          "[ATTRIBUTE2] nvarchar(240) NULL ," +
          "[ATTRIBUTE3] nvarchar(240) NULL ," +
          "[ATTRIBUTE4] nvarchar(240) NULL ," +
          "[ATTRIBUTE5] nvarchar(240) NULL ," +
          "[ATTRIBUTE6] nvarchar(240) NULL ," +
          "[ATTRIBUTE7] nvarchar(240) NULL ," +
          "[ATTRIBUTE8] nvarchar(240) NULL ," +
          "[ATTRIBUTE9] nvarchar(240) NULL ," +
          "[ATTRIBUTE10] nvarchar(240) NULL ," +
          "[ATTRIBUTE11] nvarchar(240) NULL ," +
          "[ATTRIBUTE12] nvarchar(240) NULL ," +
          "[ATTRIBUTE13] nvarchar(240) NULL ," +
          "[ATTRIBUTE14] nvarchar(240) NULL ," +
          "[ATTRIBUTE15] nvarchar(240) NULL ," +
          "[IMAGE_URL] nvarchar(240) NULL ," +
          "PRIMARY KEY ([SKU_ID])" +
          ")");

        tx.executeSql("INSERT INTO T_CTM_PARTY_BOX_DEVICE (BOX_DEVICE_ID, PARTY_ID, BOX_ID, DEVICE_ID, REFERENCE_SOURCE, CREATION_DATE, CREATED_BY, LAST_UPDATE_DATE, LAST_UPDATED_BY, LAST_UPDATE_LOGIN, GROUP_ID) VALUES " +
          "('48', '20', '37', '55', 'residential', '2017-04-30 11:17:34.797', '-1', '2017-04-30 11:17:34.797', '-1', '-1', '43')," +
          "('49', '20', '37', '56', 'residential', '2017-04-30 11:17:34.797', '-1', '2017-04-30 11:17:34.797', '-1', '-1', '43')," +
          "('50', '20', '37', '57', 'residential', '2017-04-30 11:17:34.797', '-1', '2017-04-30 11:17:34.797', '-1', '-1', '43')," +
          "('51', '20', '37', '58', 'residential', '2017-04-30 11:17:34.797', '-1', '2017-04-30 11:17:34.797', '-1', '-1', '43')," +
          "('52', '20', '37', '59', 'residential', '2017-04-30 11:17:34.797', '-1', '2017-04-30 11:17:34.797', '-1', '-1', '43')," +
          "('53', '20', '37', '60', 'residential', '2017-04-30 11:17:34.797', '-1', '2017-04-30 11:17:34.797', '-1', '-1', '43')," +
          "('54', '20', '37', '61', 'residential', '2017-04-30 11:17:34.797', '-1', '2017-04-30 11:17:34.797', '-1', '-1', '43')");

        tx.executeSql("INSERT INTO T_DVM_DEVICE ([DEVICE_ID], [IOT_DEVICE_ID], [PRODUCT_ID], [SKU_ID], [SKU_NUMBER], [DEVICE_SERIAL_NUMBER], [DEVICE_CODE], [DEVICE_NAME], [LOCATION], [CONNECT_MODE], [REFERENCE_SOURCE], [CREATION_DATE], [CREATED_BY], [LAST_UPDATE_DATE], [LAST_UPDATED_BY], [LAST_UPDATE_LOGIN], [OBJECT_VERSION_NUMBER], [REQUEST_ID], [PROGRAM_ID], [ATTRIBUTE_CATEGORY], [ATTRIBUTE1], [ATTRIBUTE2], [ATTRIBUTE3], [ATTRIBUTE4], [ATTRIBUTE5], [ATTRIBUTE6], [ATTRIBUTE7], [ATTRIBUTE8], [ATTRIBUTE9], [ATTRIBUTE10], [ATTRIBUTE11], [ATTRIBUTE12], [ATTRIBUTE13], [ATTRIBUTE14], [ATTRIBUTE15], [DEVICE_STATUS], [GROUP_ID], [DEVICE_TYPE]) VALUES " +
          "('55', 'CN1R1002', '25', '65', 'K-3900T-2-0', 'OK0001', 'K-3900T-2-0/OK0001', 'K-3900T-2-0/OK0001', null, 'BLE', 'residential', '2017-04-30 10:35:28.277', '-1', '2017-04-30 10:35:28.277', '-1', '-1', '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2', '43', 'BIDET_TOILET')," +
          "('56', 'CN1R1003', '26', '73', 'K-3901T-2-0', 'OK0001', 'K-3901T-2-0/OK0001', 'K-3901T-2-0/OK0001', null, 'BLE', 'residential', '2017-04-30 10:35:28.277', '-1', '2017-04-30 10:35:28.277', '-1', '-1', '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2', '43', 'BATHROOM_HEATER')," +
          "('57', 'CN1R1004', '27', '80', 'K-3902T-2-0', 'OK0001', 'K-3902T-2-0/OK0001', 'K-3902T-2-0/OK0001', null, 'BLE', 'residential', '2017-04-30 10:35:28.277', '-1', '2017-04-30 10:35:28.277', '-1', '-1', '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2', '43', 'BATHTUB_WHIRLPOOL')," +
          "('58', 'CN1R1005', '28', '86', 'K-3903T-2-0', 'OK0001', 'K-3903T-2-0/OK0001', 'K-3903T-2-0/OK0001', null, 'BLE', 'residential', '2017-04-30 10:35:28.277', '-1', '2017-04-30 10:35:28.277', '-1', '-1', '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2', '43', 'SHOWER')," +
          "('59', 'CN1R1006', '29', '91', 'K-3904T-2-0', 'OK0001', 'K-3904T-2-0/OK0001', 'K-3904T-2-0/OK0001', null, 'BLE', 'residential', '2017-04-30 10:35:28.277', '-1', '2017-04-30 10:35:28.277', '-1', '-1', '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2', '43', 'WATER_FILTRATION_RO')," +
          "('60', 'CN1R1007', '30', '95', 'K-3906T-2-0', 'OK0001', 'K-3906T-2-0/OK0001', 'K-3906T-2-0/OK0001', null, 'BLE', 'residential', '2017-04-30 10:35:28.277', '-1', '2017-04-30 10:35:28.277', '-1', '-1', '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2', '43', 'SHOWER')," +
          "('61', 'CN1R1008', '31', '98', 'K-3907T-2-0', 'OK0001', 'K-3907T-2-0/OK0001', 'K-3907T-2-0/OK0001', null, 'BLE', 'residential', '2017-04-30 10:35:28.277', '-1', '2017-04-30 10:35:28.277', '-1', '-1', '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2', '43', 'MIRROR_CABINET')");

        tx.executeSql("INSERT INTO [T_DVM_BOX] ([BOX_ID], [IOT_DEVICE_ID], [PRODUCT_ID], [SKU_ID], [SKU_NUMBER], [BOX_SERIAL_NUMBER], [BOX_CODE], [BOX_NAME], [LOCATION], [CONNECT_MODE], [REFERENCE_SOURCE], [CREATION_DATE], [CREATED_BY], [LAST_UPDATE_DATE], [LAST_UPDATED_BY], [LAST_UPDATE_LOGIN], [OBJECT_VERSION_NUMBER], [REQUEST_ID], [PROGRAM_ID], [ATTRIBUTE_CATEGORY], [ATTRIBUTE1], [ATTRIBUTE2], [ATTRIBUTE3], [ATTRIBUTE4], [ATTRIBUTE5], [ATTRIBUTE6], [ATTRIBUTE7], [ATTRIBUTE8], [ATTRIBUTE9], [ATTRIBUTE10], [ATTRIBUTE11], [ATTRIBUTE12], [ATTRIBUTE13], [ATTRIBUTE14], [ATTRIBUTE15], [BOX_STATUS], [GROUP_ID], [FRIMWARE_VERSION]) VALUES ('37', 'CN1R1001', '35', '112', '8791TYC01CP', 'OK0001', 'CN1R1001', 'CN1R1001', null, 'WIFI', 'residential', '2017-04-30 09:00:08.510', '-1', '2017-04-30 09:00:08.510', '-1', '-1', '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2', '43', '1.3.0_210')");

        tx.executeSql("INSERT INTO T_CTM_PARTY_SCENARIO (SCENARIO_ID,PARTY_ID,PLUGIN_ID,SCENARIO_TYPE,SCENARIO_CODE,SCENARIO_NAME,REFERENCE_SOURCE,SCENARIO_STATUS,CREATION_DATE,CREATED_BY,LAST_UPDATE_DATE,LAST_UPDATED_BY,LAST_UPDATE_LOGIN,OBJECT_VERSION_NUMBER)VALUES (1,13469950960,1,'atuo','trigger','离家','RESIDENTIAL','N','2017-04-18 06:16:51.297','-1','2017-04-18 06:16:51.297','-1','-1','1')");
        tx.executeSql("INSERT INTO T_CTM_PARTY_SCENARIO (SCENARIO_ID,PARTY_ID,PLUGIN_ID,SCENARIO_TYPE,SCENARIO_CODE,SCENARIO_NAME,REFERENCE_SOURCE,SCENARIO_STATUS,CREATION_DATE,CREATED_BY,LAST_UPDATE_DATE,LAST_UPDATED_BY,LAST_UPDATE_LOGIN,OBJECT_VERSION_NUMBER)VALUES (2,13469950960,2,'atuo','trigger','晨起','RESIDENTIAL','N','2017-04-18 06:16:51.297','-1','2017-04-19 06:16:51.297','-1','-1','1')");
        tx.executeSql("INSERT INTO T_CTM_PARTY_SCENARIO (SCENARIO_ID,PARTY_ID,PLUGIN_ID,SCENARIO_TYPE,SCENARIO_CODE,SCENARIO_NAME,REFERENCE_SOURCE,SCENARIO_STATUS,CREATION_DATE,CREATED_BY,LAST_UPDATE_DATE,LAST_UPDATED_BY,LAST_UPDATE_LOGIN,OBJECT_VERSION_NUMBER)VALUES (3,13469950960,3,'atuo','trigger','淋浴','RESIDENTIAL','Y','2017-04-18 06:16:51.297','-1','2017-04-20 06:16:51.297','-1','-1','1')");
        tx.executeSql("INSERT INTO T_CTM_PARTY_SCENARIO (SCENARIO_ID,PARTY_ID,PLUGIN_ID,SCENARIO_TYPE,SCENARIO_CODE,SCENARIO_NAME,REFERENCE_SOURCE,SCENARIO_STATUS,CREATION_DATE,CREATED_BY,LAST_UPDATE_DATE,LAST_UPDATED_BY,LAST_UPDATE_LOGIN,OBJECT_VERSION_NUMBER)VALUES (4,13469950960,4,'atuo','trigger','泡澡','RESIDENTIAL','Y','2017-04-18 06:16:51.297','-1','2017-04-18 06:16:51.297','-1','-1','1')");
        tx.executeSql("INSERT INTO T_CTM_PARTY_SCENARIO (SCENARIO_ID,PARTY_ID,PLUGIN_ID,SCENARIO_TYPE,SCENARIO_CODE,SCENARIO_NAME,REFERENCE_SOURCE,SCENARIO_STATUS,CREATION_DATE,CREATED_BY,LAST_UPDATE_DATE,LAST_UPDATED_BY,LAST_UPDATE_LOGIN,OBJECT_VERSION_NUMBER)VALUES (5,13469950960,5,'atuo','trigger','维亚灯光','RESIDENTIAL','Y','2017-04-18 06:16:51.297','-1','2017-04-18 06:16:51.297','-1','-1','1')");
        tx.executeSql("INSERT INTO T_CTM_PARTY_SCENARIO (SCENARIO_ID,PARTY_ID,PLUGIN_ID,SCENARIO_TYPE,SCENARIO_CODE,SCENARIO_NAME,REFERENCE_SOURCE,SCENARIO_STATUS,CREATION_DATE,CREATED_BY,LAST_UPDATE_DATE,LAST_UPDATED_BY,LAST_UPDATE_LOGIN,OBJECT_VERSION_NUMBER)VALUES (6,13469950960,6,'atuo','trigger','大姨了吗','RESIDENTIAL','Y','2017-04-18 06:16:51.297','-1','2017-04-18 06:16:51.297','-1','-1','1')");


        tx.executeSql("INSERT INTO [T_CTM_PARTY_GROUP_DEVICE] ([GROUP_DEVICE_ID], [PARTY_ID], [GROUP_ID], [DEVICE_ID], [REFERENCE_SOURCE], [CREATION_DATE], [CREATED_BY], [LAST_UPDATE_DATE], [LAST_UPDATED_BY], [LAST_UPDATE_LOGIN], [DEVICE_TYPE]) VALUES " +
          "('69', '20', '46', '55', 'residential', '2017-04-30 11:23:35.133', '-1', '2017-04-30 11:23:35.133', '-1', '-1', 'DEVICE')," +
          "('70', '20', '46', '56', 'residential', '2017-04-30 11:23:35.133', '-1', '2017-04-30 11:23:35.133', '-1', '-1', 'DEVICE')," +
          "('71', '20', '46', '57', 'residential', '2017-04-30 11:23:35.133', '-1', '2017-04-30 11:23:35.133', '-1', '-1', 'DEVICE')," +
          "('72', '20', '46', '58', 'residential', '2017-04-30 11:23:35.133', '-1', '2017-04-30 11:23:35.133', '-1', '-1', 'DEVICE')," +
          "('73', '20', '47', '59', 'residential', '2017-04-30 11:23:35.133', '-1', '2017-04-30 11:23:35.133', '-1', '-1', 'DEVICE')," +
          "('74', '20', '47', '60', 'residential', '2017-04-30 11:23:35.133', '-1', '2017-04-30 11:23:35.133', '-1', '-1', 'DEVICE')," +
          "('75', '20', '47', '61', 'residential', '2017-04-30 11:23:35.133', '-1', '2017-04-30 11:23:35.133', '-1', '-1', 'DEVICE')," +
          "('93', '20', '46', '37', 'residential', '2017-04-30 13:19:47.580', '-1', '2017-04-30 13:19:47.580', '-1', '-1', 'BOX')");

        tx.executeSql("INSERT INTO [T_DVM_SKU_B] ([SKU_ID], [PRODUCT_ID], [SKU_NUMBER], [SKU_NAME], [DECRIPTION], [REFERENCE_SOURCE], [CREATION_DATE], [CREATED_BY], [LAST_UPDATE_DATE], [LAST_UPDATED_BY], [LAST_UPDATE_LOGIN], [OBJECT_VERSION_NUMBER], [REQUEST_ID], [PROGRAM_ID], [ATTRIBUTE_CATEGORY], [ATTRIBUTE1], [ATTRIBUTE2], [ATTRIBUTE3], [ATTRIBUTE4], [ATTRIBUTE5], [ATTRIBUTE6], [ATTRIBUTE7], [ATTRIBUTE8], [ATTRIBUTE9], [ATTRIBUTE10], [ATTRIBUTE11], [ATTRIBUTE12], [ATTRIBUTE13], [ATTRIBUTE14], [ATTRIBUTE15], [IMAGE_URL]) VALUES " +
          "('65', '25', 'K-3900T-2-0', 'NUMI 1.1', null, 'residential', '1900-01-01 00:00:00.000', '', '1900-01-01 00:00:00.000', '', '', '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)," +
          "('73', '26', 'K-3901T-2-0', 'Bathroom Heater', null, 'residential', '1900-01-01 00:00:00.000', '', '1900-01-01 00:00:00.000', '', '', '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)," +
          "('80', '27', 'K-3902T-2-0', 'Karess', null, 'residential', '1900-01-01 00:00:00.000', '', '1900-01-01 00:00:00.000', '', '', '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)," +
          "('86', '28', 'K-3903T-2-0', 'next gen shower', null, 'residential', '1900-01-01 00:00:00.000', '', '1900-01-01 00:00:00.000', '', '', '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)," +
          "('91', '29', 'K-3904T-2-0', '中央净水器', null, 'residential', '1900-01-01 00:00:00.000', '', '1900-01-01 00:00:00.000', '', '', '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)," +
          "('95', '30', 'K-3906T-2-0', 'airfoil-shower', null, 'residential', '1900-01-01 00:00:00.000', '', '1900-01-01 00:00:00.000', '', '', '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)," +
          "('98', '31', 'K-3907T-2-0', 'MC', null, 'residential', '1900-01-01 00:00:00.000', '', '1900-01-01 00:00:00.000', '', '', '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)," +
          "('106', '32', 'K-7761T-8-0', 'Sensor faucet -Composed cold noly (w/o power unit) 0.6GPM ', null, 'commercial', '1900-01-01 00:00:00.000', '', '1900-01-01 00:00:00.000', '', '', '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)," +
          "('107', '33', 'K-7762T-8-0', 'Struktura Urinal Sensor (IR) 0.5/2L', null, 'commercial', '1900-01-01 00:00:00.000', '', '1900-01-01 00:00:00.000', '', '', '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)," +
          "('108', '34', 'K-7763T-8-0', 'Struktura  touchless Toilet Sensor (4.6L)', null, 'commercial', '1900-01-01 00:00:00.000', '', '1900-01-01 00:00:00.000', '', '', '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)," +
          "('109', '33', 'K-7764T-8-0', 'Touchless urinal -Modern Life Wallhung Touchless Urinal w/o E-water 0.5L&1L&4L', null, 'commercial', '1900-01-01 00:00:00.000', '', '1900-01-01 00:00:00.000', '', '', '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)," +
          "('110', '33', 'K-7765T-8-0', 'Touchless urinal -Modern Life Floor Standing Touchless Urinal  w/o E-water 1L&4L', null, 'commercial', '1900-01-01 00:00:00.000', '', '1900-01-01 00:00:00.000', '', '', '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)," +
          "('112', '35', '8791TYC01CP', 'Residential Box', null, 'residential', '1900-01-01 00:00:00.000', '', '1900-01-01 00:00:00.000', '', '', '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)," +
          "('113', '36', '8791TYC01CP', 'Commercial Box', null, 'commercial', '2017-04-30 09:10:37.130', '-1', '2017-04-30 09:10:37.130', '-1', '-1', '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)");

        tx.executeSql("INSERT INTO T_OGM_GROUP_B (GROUP_ID,GROUP_TYPE,GROUP_NAME,PARENT_GROUP_ID,LEVEL,REFERENCE_SOURCE,CREATION_DATE,CREATED_BY,LAST_UPDATE_DATE,LAST_UPDATED_BY,LAST_UPDATE_LOGIN,OBJECT_VERSION_NUMBER)VALUES (1,'RESIDENTIAL','我',-1,'0','RESIDENTIAL','2017-04-18 06:16:51.297','-1','2017-04-18 06:16:51.297','-1','-1','1')");
        tx.executeSql("INSERT INTO T_OGM_GROUP_B (GROUP_ID,GROUP_TYPE,GROUP_NAME,PARENT_GROUP_ID,LEVEL,REFERENCE_SOURCE,CREATION_DATE,CREATED_BY,LAST_UPDATE_DATE,LAST_UPDATED_BY,LAST_UPDATE_LOGIN,OBJECT_VERSION_NUMBER)VALUES (2,'RESIDENTIAL','我家一',1,'0','RESIDENTIAL','2017-04-18 06:16:51.297','-1','2017-04-18 06:16:51.297','-1','-1','1')");
        tx.executeSql("INSERT INTO T_OGM_GROUP_B (GROUP_ID,GROUP_TYPE,GROUP_NAME,PARENT_GROUP_ID,LEVEL,REFERENCE_SOURCE,CREATION_DATE,CREATED_BY,LAST_UPDATE_DATE,LAST_UPDATED_BY,LAST_UPDATE_LOGIN,OBJECT_VERSION_NUMBER)VALUES (3,'RESIDENTIAL','房间一',2,'0','RESIDENTIAL','2017-04-18 06:16:51.297','-1','2017-04-18 06:16:51.297','-1','-1','1')");
        tx.executeSql("INSERT INTO T_OGM_GROUP_B (GROUP_ID,GROUP_TYPE,GROUP_NAME,PARENT_GROUP_ID,LEVEL,REFERENCE_SOURCE,CREATION_DATE,CREATED_BY,LAST_UPDATE_DATE,LAST_UPDATED_BY,LAST_UPDATE_LOGIN,OBJECT_VERSION_NUMBER)VALUES (4,'RESIDENTIAL','房间二',2,'0','RESIDENTIAL','2017-04-18 06:16:51.297','-1','2017-04-18 06:16:51.297','-1','-1','1')");

      });
      /*db.close(successcb, errorcb);
       //
       var successcb = function(){

       };
       var errorcb = function(msg){

       };*/
    });
  });

angular.module('myApp')
  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$ionicConfigProvider',
    '$translateProvider', '$translateStaticFilesLoaderProvider', 'baseConfig',
    function ($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider,
              $translateProvider, $translateStaticFilesLoaderProvider, baseConfig) {
      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js

      $httpProvider.interceptors.push('httpRequestHeader');//注册过滤器
      $ionicConfigProvider.platform.ios.tabs.style('standard');
      $ionicConfigProvider.platform.ios.tabs.position('bottom');
      $ionicConfigProvider.platform.android.tabs.style('standard');
      $ionicConfigProvider.platform.android.tabs.position('standard');

      $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
      $ionicConfigProvider.platform.android.navBar.alignTitle('center');

      //$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
      $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

      $ionicConfigProvider.platform.ios.views.transition('ios');
      $ionicConfigProvider.platform.android.views.transition('android');


      $translateProvider.preferredLanguage("zh");

      $translateProvider.useStaticFilesLoader({
        prefix: 'build/common/i18n/',
        suffix: '.json'
      });

      $stateProvider
        .state('tabs', {
          url: '/tabs',
          templateUrl: 'build/pages/tab/tabs.html',
          controller: 'TabsCtrl'
        })

        .state('indexPage', {
          url: '/indexPage',
          templateUrl: 'build/pages/index-page/indexPage.html',
          controller: 'indexPageCtrl'
        })

        .state('message', {
          url: '/message',
          templateUrl: 'build/pages/message/message.html',
          controller: 'messageCtrl'

        })

        .state('myInfo', {
          url: '/myInfo',
          templateUrl: 'build/pages/my-info/myInfo.html',
          controller: 'myInfoCtrl'

        })

        .state('guide', {
          url: '/guide',
          templateUrl: 'build/pages/guide/guide.html',
          controller: 'guideCtrl'
        })

        .state('registered', {
          url: '/registered',
          templateUrl: 'build/pages/login/registered/registered.html',
          controller: 'registeredCtrl'
        })

        .state('forgetPassword', {
          url: '/forgetPassword',
          templateUrl: 'build/pages/login/forget-password/forgetPassword.html',
          controller: 'forgetPasswordCtrl'
        })

        .state('test', {
          url: '/test',
          templateUrl: 'build/pages/test/test.html',
          controller: 'testCtrl'
        })

        .state('login', {
          url: '/login',
          templateUrl: 'build/pages/login/login.html',
          controller: 'loginCtrl'
        })
        .state('deviceList', {
          url: '/deviceList',
          templateUrl: 'build/pages/device-add/deviceList.html',
          controller: 'deviceListCtrl'
        })
        .state('boxList', {
          url: '/boxList',
          templateUrl: 'build/pages/device-add/box-add/boxList.html',
          controller: 'boxListCtrl'
        })
        .state('boxOnLine', {
          url: '/boxOnLine',
          templateUrl: 'build/pages/device-add/box-online-List/boxOnLine.html',
          controller: 'boxOnLineCtrl'
        })
        .state('boxAddDevice', {
          url: '/boxAddDevice',
          templateUrl: 'build/pages/device-add/box-add-device/boxAddDevice.html',
          controller: 'boxAddDeviceCtrl'
        })
        .state('sceneSupermarket', {
          url: '/sceneSupermarket',
          templateUrl: 'build/pages/scene-supermarket/scene-supermarket.html',
          controller: 'sceneSupermarketCtrl'
        })
        //一键场景
        //gohome
        .state('goHome', {
          url: '/goHome',
          templateUrl: 'build/pages/keyscene-gohome/goHome.html',
          controller: 'goHomeCtrl'
        })
        .state('leaveHome', {
          url: '/leaveHome',
          templateUrl: 'build/pages/keyscene-leavehome/leaveHome.html',
          controller: 'leaveHomeCtrl'
        })
        .state('morning', {
          url: '/morning',
          templateUrl: 'build/pages/keyscene-morning/morning.html',
          controller: 'morningCtrl'
        })
        .state('bathing', {
          url: '/bathing',
          templateUrl: 'build/pages/keyscene-bathing/bathing.html',
          controller: 'bathingCtrl'
        })
        .state('spa', {
          url: '/spa',
          templateUrl: 'build/pages/keyscene-spa/spa.html',
          controller: 'spaCtrl'
        })

        .state('period', {
          url: '/period',
          templateUrl: 'build/pages/keyscene-period/period.html',
          controller: 'periodCtrl'
        })
        .state('periodSetting', {
          url: '/periodSetting',
          templateUrl: 'build/pages/keyscene-period/period-setting/period-setting.html',
          controller: 'periodSettingCtrl'
        })

        .state('veil', {
          url: '/veil',
          templateUrl: 'build/pages/keyscene-veil/veil.html',
          controller: 'veilCtrl'
        })
        .state('veilSetting', {
          url: '/veilSetting',
          templateUrl: 'build/pages/keyscene-veil/veil-setting/veil-setting.html',
          controller: 'veilSettingCtrl'
        })

        // 设备控制-马桶
        .state('toiletContrl', {
          url: '/toiletContrl',
          templateUrl: 'build/pages/device-controller/toilet-controller/toiletController.html',
          controller: 'toiletControllerCtrl'
        })
        //马桶设置
        .state('toiletSetting', {
          url: '/toiletSetting',
          templateUrl: 'build/pages/device-controller/toilet-controller/toiletSetting/toiletSetting.html',
          controller: 'toiletSettingCtrl'
        })
        //马桶设置
        .state('toiletLearning', {
          url: '/toiletLearning',
          templateUrl: 'build/pages/device-controller/toilet-controller/toilet-learning/toilet.learning.html',
          controller: 'toiletLearningCtrl'
        })
        //灯光设置
        .state('lightSetting', {
          url: '/lightSetting',
          templateUrl: 'build/pages/device-controller/toilet-controller/lightSetting/lightSetting.html',
          controller: 'lightSettingCtrl'
        })
        //智能除菌计划
        .state('cleargearPlan', {
          url: '/cleargearPlan',
          templateUrl: 'build/pages/device-controller/toilet-controller/cleargearPlan/cleargearPlan.html',
          controller: 'cleargearPlanCtrl'
        })
        // 设备控制-中央净水器
        .state('cenwatpurifierContrl', {
          url: '/cenwatpurifierContrl',
          templateUrl: 'build/pages/device-controller/cenwatpurifier-controller/cenwatpurifierContrl.html',
          controller: 'cenwatpurifierCtrl'
        })
        // 设备控制-中央净水器设置
        .state('cenwatpurSetting', {
          url: '/cenwatpurSetting',
          templateUrl: 'build/pages/device-controller/cenwatpurifier-controller/cenwatpurSetting/cenwatpurSetting.html',
          controller: 'cenwatpurSettingCtrl'
        })
        //设备控制-karess
        .state('karess', {
          url: '/karess',
          templateUrl: 'build/pages/device-controller/karess-controller/karessController.html',
          controller: 'karessControllerCtrl'
        })
        .state('karessSetting', {
          url: '/karessSetting',
          templateUrl: 'build/pages/device-controller/karess-controller/setting-karess/karessSet.html',
          controller: 'karessSettingControllerCtrl'
        })
        .state('karessInfo', {
          url: '/karessInfo',
          templateUrl: 'build/pages/device-controller/karess-controller/info-karess/karessInfo.html',
          controller: 'karessInfoControllerCtrl'
        })
        .state('karessLearning', {
          url: '/karessLearning',
          templateUrl: 'build/pages/device-controller/karess-controller/karess-learning/karess.learning.html',
          controller: 'karessLearningCtrl'
        })

        //设备控制-mc
        .state('mc', {
          url: '/mc',
          templateUrl: 'build/pages/device-controller/mc-controller/mcController.html',
          controller: 'mcControllerCtrl'
        })
        .state('mcSetting', {
          url: '/mcSetting',
          templateUrl: 'build/pages/device-controller/mc-controller/setting-mc/mcSet.html',
          controller: 'mcSettingControllerCtrl'
        })
        .state('mcInfo', {
          url: '/mcInfo',
          templateUrl: 'build/pages/device-controller/mc-controller/info-mc/mcInfo.html',
          controller: 'mcInfoControllerCtrl'
        })
        .state('mcLearning', {
          url: '/mcLearning',
          templateUrl: 'build/pages/device-controller/mc-controller/mc-learning/mc.learning.html',
          controller: 'mcLearningCtrl'
        })

        .state('nextgenSet', {
          url: '/nextgenSet',
          templateUrl: 'build/pages/device-controller/nextgen-controller/nextgen-set/nextgenSet.html',
          controller: 'nextgenSetCtrl'
        })
        .state('nextgen', {
          url: '/nextgen',
          templateUrl: 'build/pages/device-controller/nextgen-controller/nextgen.html',
          controller: 'nextgenCtrl'
        })
        .state('nextgenInfo', {
          url: '/nextgenInfo',
          templateUrl: 'build/pages/device-controller/nextgen-controller/nextgen-info/nextgenInfo.html',
          controller: 'nextgenInfoCtrl'
        })
        .state('bathroom', {
          url: '/bathroom/:deviceSku',
          templateUrl: 'build/pages/device-controller/bathroom-controller/bathroom.html',
          controller: 'bathroomCtrl'
        })

        .state('bathroomSet', {
          url: '/bathroomSet',
          templateUrl: 'build/pages/device-controller/bathroom-controller/bathroom-set/bathroomSet.html',
          controller: 'bathroomSetCtrl'
        })
        .state('bathroomInfo', {
          url: '/bathroomInfo',
          templateUrl: 'build/pages/device-controller/bathroom-controller/bathroom-info/bathroomInfo.html',
          controller: 'bathroomInfoCtrl'
        })
        .state('bathroomLearning', {
          url: '/bathroomLearning',
          templateUrl: 'build/pages/device-controller/bathroom-controller/bathroom-learning/bathroom.learning.html',
          controller: 'bathroomLearningCtrl'
        })

        .state('airfoilShower', {
          url: '/airfoilShower',
          templateUrl: 'build/pages/device-controller/airfoil-shower-controller/airfoilShower.html',
          controller: 'airfoilShowerCtrl'
        })
        .state('airfoilShowerSetting', {
          url: '/airfoilShowerSetting',
          templateUrl: 'build/pages/device-controller/airfoil-shower-controller/airfoil-shower-setting-controller/airfoilShowerSetting.html',
          controller: 'airfoilShowerSettingCtrl'
        });
      // if none of the above states are matched, use this as the fallback
      if (baseConfig.debug) {
        console.log('app.js window.localStorage.appCacheVersion ' + window.localStorage.appCacheVersion);
        console.log('app.js !window.localStorage.appCacheVersion ' + !window.localStorage.appCacheVersion);
        console.log('app.js baseConfig.version.currentVersion ' + baseConfig.version.currentVersion);
      }

      //$xhrFactory('GET','http://localhost:8100/build/pages/application/application.html');

      //$templateRequest('build/pages/application/application.html',true);
      //$urlRouterProvider.otherwise('/guide'); return;
      if(!window.localStorage.toilteLocalstro){
        window.localStorage.appCacheVersion = baseConfig.version.currentVersion;
        //toilte favite set
        var toilteFaviote = {
          //ny
          FRONT_SPRAY_PRESSURE:2,
          FRONT_SPRAY_POSITION:2,
          FRONT_SPRAY_TMPT:2,
          //tx
          REAR_PRESSURE:2,
          REAR_POSITION:2,
          REAR_TMPT:2,
          //nf
          DRYER_PRESSURE:2,
          DRYER_TMPT:2,
          //nj
          DRYER_POWER:2,
          //qw
          SEAT_TMPT:2,
          //dg
          LIGHT_AMBIENT_BRIGHTNESS:1,
          LIGHT_BOWL_BRIGHTNESS:5,
        }
        window.localStorage.toilteFaviteSetting= JSON.stringify(toilteFaviote);
        window.localStorage.toilteLocalstro = true;
      };

      if (!window.localStorage.needGuid || window.localStorage.needGuid == "true"
        || !window.localStorage.appCacheVersion || window.localStorage.appCacheVersion != baseConfig.version.currentVersion
      ) {
        if (baseConfig.debug) {
          console.log('app.js into guide');
        };
        $urlRouterProvider.otherwise('/tabs');
      } else {
        if (window.localStorage.token && window.localStorage.token != "" && window.localStorage.isHrms2108) {

          window.localStorage.isHrms2108 = "true";

          if (window.localStorage.getItem('gesturePassword') && window.localStorage.getItem('gesturePassword') != '') {
          } else {
            $urlRouterProvider.otherwise('/tabs');
          }
        } else {

          window.localStorage.isHrms2108 = "true";

          $urlRouterProvider.otherwise('/tabs');
        }
      }
    }]);
