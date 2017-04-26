var exec = require('cordova/exec');


exports.udpBroadCast = function(arg, success, error) {
    exec(success, error, "SocketPlugin", "udpBroadCast", [arg]);
};

exports.tcpConnect = function(arg, success, error) {
  exec(success, error, "SocketPlugin", "tcpConnect", [arg]);
};

exports.tcpSendCmd = function(arg, success, error) {
    exec(success, error, "SocketPlugin", "tcpSendCmd", [arg]);
};

exports.getTcpStatus = function(arg, success, error) {
    exec(success, error, "SocketPlugin", "getTcpStatus", [arg]);
};

exports.tcpClose = function(arg, success, error) {
  exec(success, error, "SocketPlugin", "tcpClose", [arg]);
};


exports.receiveTcpStatus = function (data) {
  data = JSON.stringify(data);
  this.receiveStatus = JSON.parse(data);
  cordova.fireDocumentEvent('SocketPlugin.receiveTcpStatus',  this.receiveStatus);
};


exports.receiveTcpData = function (data) {
    data = JSON.stringify(data);
    this.receiveData = JSON.parse(data);
    cordova.fireDocumentEvent('SocketPlugin.receiveTcpData',  this.receiveData);
};

