var exec = require('cordova/exec');

//开启定位
exports.openLocation = function(arg, success, error) {
    exec(success, error, "CDVLocation", "openLocation", [arg]);
};

