var exec = require('cordova/exec');

//udp broadcast udp广播
exports.udpBroadCast = function(arg, success, error) {
    exec(success, error, "SocketPlugin", "udpBroadCast", [arg]);
};
//tcp指令发送
exports.tcpSendCmd = function(arg, success, error) {
    exec(success, error, "SocketPlugin", "tcpSendCmd", [arg]);
};
//tcp连接
exports.tcpConnect = function(arg, success, error) {
    exec(success, error, "SocketPlugin", "tcpConnect", [arg]);
};
//获取tcp连接状态
exports.getTcpStatus = function(arg, success, error) {
    exec(success, error, "SocketPlugin", "getTcpStatus", [arg]);
};
exports.tcpClose = function(arg, success, error) {
  exec(success, error, "SocketPlugin", "tcpClose", [arg]);
};
//监听tcp状态
exports.receiveTcpStatus = function (data) {
  data = JSON.stringify(data);
  this.receiveStatus = JSON.parse(data);
  cordova.fireDocumentEvent('SocketPlugin.receiveTcpStatus',  this.receiveStatus);
};
//监听tcp返回数据
exports.receiveTcpData = function (data) {
    data = JSON.stringify(data);
    this.receiveData = JSON.parse(data);
    cordova.fireDocumentEvent('SocketPlugin.receiveTcpData',  this.receiveData);
};

