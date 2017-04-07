var exec = require('cordova/exec');

//开启通知
exports.resumePush = function(arg0, success, error) {
    exec(success, error, "AzurePlugin", "resumePush", [arg0]);
};
//关闭通知
exports.stopPush = function(arg0, success, error) {
    exec(success, error, "AzurePlugin", "stopPush", [arg0]);
};
//监听推送
exports.receiveNotificationInIOSCallback = function (data) {
  data = JSON.stringify(data)
  console.log('JPushPlugin:receiveNotificationInIOSCallback: ' + data)
  this.receiveNotification = JSON.parse(data)
  cordova.fireDocumentEvent('azure.receiveNotification', this.receiveNotification)
};
