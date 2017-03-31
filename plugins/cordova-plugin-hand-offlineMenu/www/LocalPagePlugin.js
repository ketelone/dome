var exec = require('cordova/exec');

var LocalPagePlugin = {

	updateLocalPage: function (successCallback, errorCallback, options) {

	  if (errorCallback == null) {
		errorCallback = function () {
		}
	  }
	  if (typeof errorCallback != "function") {
		return
	  }
	  if (typeof successCallback != "function") {
		return
	  }
	  exec(successCallback, errorCallback, "LocalPagePlugin", "updateLocalPage", [options]);

	},

	openPage: function (successCallback, errorCallback, options) {

	  if (errorCallback == null) {
		errorCallback = function () {
		}
	  }
	  if (typeof errorCallback != "function") {
		return
	  }
	  if (typeof successCallback != "function") {
		return
	  }
	  exec(successCallback, errorCallback, "LocalPagePlugin", "openPage", [options]);

	}




};

if (typeof module !== 'undefined' && module.exports) {
	module.exports = LocalPagePlugin;
}