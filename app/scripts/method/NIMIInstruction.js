var config = {
  //冲洗选项-正常
  "NORMAL": "正常",
  //冲洗选项-按摩
  "MASSAGE": "按摩",
  //冲洗选项-振动
  "VIBRATION": "振动",
  //冲洗选项-波动
  "FLUCTUATION": "波动",
  //开启
  "ON": "ON",
  //关闭
  "OFF": "OFF",
  //前冲 Front
  "FRONT": "女用",
  //后冲 Rear
  "REAR": "臀洗",
  //烘干 Dry
  "DRY": "暖风",
  //命令拒绝
  "ACK_REFUSE": "1001",
  //数据错误
  "ACK_DATA_ERROR": "1002",
  //包错误
  "ACK_PKG_ERROR": "1003"
};

function NIMI() {
}

/**
 * 简单指令可直接获取
 * @private
 */
NIMI.prototype._data = {
  //小冲
  smallFlush: "0700000000",
  //大冲
  bigFlush: "0780000000",
  //关盖
  closeLid: "0800000000",
  //开盖
  openLid: "0840000000",
  //开圈
  openRing: "0880000000",
  //打开喷管手动清洁
  "openExtendWand": "1580000000",
  //关闭喷管手动清洁
  "closeExtendWand": "1500000000",
  //打开清洁阀门
  "openTrap": "1780000000",
  //关闭清洁阀门
  "closeTrap": "1700000000",
  //自动开关盖 开
  "openLidAuto": "1380000000",
  //自动开关盖 关
  "closeLidAuto": "1300000000",
  //设置感应距离 近
  "distanceNear": "1320000000",
  //设置感应距离 中
  "distanceMedium": "1340000000",
  //设置感应距离 远
  "distanceFar": "1360000000",
  //自动空气净化 开
  "openDeodorizer": "0480000000",
  //自动空气净化 关
  "closeDeodorizer": "0400000000",
  //智感除菌 开
  "openIntelligentSterilization": "0E80000000",
  //智感除菌 关
  "closeIntelligentSterilization": "0E00000000",
  //重置
  "reset": "7D1E0301",
  //获取设备状态
  "synchronizeReq": "9B000000",
  //获取一键除菌状态
  "UVStatusReq": "7207",
  //一键关闭
  "stopAll": "00"
};

/**
 * NIMI front rear dry
 * @param method{string} - 方法 {女用，臀洗，暖风}
 * @param temperature{int} - 温度档位 - 1-10
 * @param volume{int} - 流量档位 - 1-10
 * @param place{int} - 喷管位置 1-10
 * @param flushOptions{string} 冲洗选项 - {正常，按摩，振动，波动}
 * @param mSwitchType {String} 开关 {ON,OFF}
 * @returns {string} 指令中的 data串
 * @constructor
 */
NIMI.prototype.frontRearDry = function (method, temperature, volume, place, flushOptions, mSwitchType) {
  // alert(angular.toJson({
  //   method:method,
  //   temperature:temperature,
  //   volume:volume,
  //   place:place,
  //   flushOptions:flushOptions,
  //   mSwitchType:mSwitchType
  // }))
  console.log(angular.toJson({
    method:method,
    temperature:temperature,
    volume:volume,
    place:place,
    flushOptions:flushOptions,
    mSwitchType:mSwitchType
  }))
  var cmd = "";
  if (config.FRONT == method) {
    cmd = "01";
  } else if (config.REAR == method) {
    cmd = "02";
  } else if (config.DRY == method) {
    cmd = "03";
  }
  cmd += getHex(fourBitToCheck(temperature.toString(2)) + fourBitToCheck(volume.toString(2)));
  var mSwitch = "";
  (mSwitchType == config.ON) ? mSwitch = "10" : mSwitch = "00";
  var options = "";
  if (config.NORMAL == flushOptions) {
    options = "00";
  } else if (config.MASSAGE == flushOptions) {
    options = "01";
  } else if (config.VIBRATION == flushOptions) {
    options = "10";
  } else if (config.FLUCTUATION == flushOptions) {
    options = "11";
  }
  cmd += getHex(fourBitToCheck(place.toString(2)) + options + mSwitch);
  cmd += "00" + "00";
  return cmd;
};

/**
 * Feet Heater 暖脚 坐垫加热
 * @param{int} temperature - 暖风档位
 * @returns {string} 指令中的 data串
 */
NIMI.prototype.feetSeatHeater = function (temperature) {
  console.log(angular.toJson({
    method:"暖分",
    temperature:temperature,
  }))
  var cmd = "05" + getHex(fourBitToCheck(temperature.toString(2))) + "0" + "00" + "00" + "00";
  return cmd;
};

/**
 *
 * @param{String} mSwitchType - 开关 {ON,OFF}
 * @param{int} hour 小时
 * @param {int} minute 分钟 {0,15,30,45}
 * @param dateSwitch{ ON,OFF} 定时设置开启位
 * @param MOM{ ON,OFF} 周一
 * @param TUE{ ON,OFF} 周二
 * @param WED{ ON,OFF} 周三
 * @param THU{ ON,OFF} 周四
 * @param FRI{ ON,OFF} 周五
 * @param SAT{ ON,OFF} 周六
 * @param SUM{ ON,OFF} 周日
 * @returns {string}
 */
NIMI.prototype.cleanWand = function (mSwitchType, hour, minute, dateSwitch, MOM, TUE, WED, THU, FRI, SAT, SUM) {
  var cmd = "0E";
  var mSwitch = "0";
  (mSwitchType == config.ON) ? mSwitch = "1" : mSwitch = "0";
  var min = "";
  if (minute == 0) {
    min = "00";
  } else if (minute == 15) {
    min = "01";
  } else if (minute == 30) {
    min = "10";
  } else if (minute == 45) {
    min = "11";
  }
  cmd += getHex(mSwitch + fiveBitToCheck(hour.toString(2)) + min);
  var dataS = "0";
  (dateSwitch == config.ON) ? dataS = "1" : dataS = "0";
  var MOMS = "0";
  (MOM == config.ON) ? MOMS = "1" : MOMS = "0";
  var TUES = "0";
  (TUE == config.ON) ? TUES = "1" : TUES = "0";
  var WEDS = "0";
  (WED == config.ON) ? WEDS = "1" : WEDS = "0";
  var THUS = "0";
  (THU == config.ON) ? THUS = "1" : THUS = "0";
  var FRIS = "0";
  (FRI == config.ON) ? FRIS = "1" : FRIS = "0";
  var SATS = "0";
  (SAT == config.ON) ? SATS = "1" : SATS = "0";
  var SUMS = "0";
  (SUM == config.ON) ? SUMS = "1" : SUMS = "0";
  cmd += getHex(dataS + MOMS + TUES + WEDS + THUS + FRIS + SATS + SUMS) + "00" + "00";
  return cmd;
};

/**
 * Ambient light 环境灯
 * @param lightMode 灯光模式 {default,by week}
 * @param lightCtl 灯光控制 {关,低,中,高}
 * @param MOMC 周一灯光颜色
 * @param TUEC 周二灯光颜色
 * @param WEDC 周三灯光颜色
 * @param THUC 周四灯光颜色
 * @param FRIC 周五灯光颜色
 * @param SATC 周六灯光颜色
 * @param SUMC 周日灯光颜色
 * @returns {string}
 */
NIMI.prototype.ambientLight = function (lightMode, lightCtl, MOMC, TUEC, WEDC, THUC, FRIC, SATC, SUMC) {
  var cmd = "11";

  return cmd;
};

/**
 * 坐便灯
 * @param{int} lightStalls 灯光档位
 * @returns {string}
 */
NIMI.prototype.bowlLight = function (lightStalls) {
  var cmd = "18";
  cmd += "0" + getHex(fourBitToCheck(lightStalls.toString(2))) + "00" + "00" + "00";
  return cmd;
};

/**
 * 设置
 * @param welcome
 * @param nightLight 夜灯 {ON,OFF}
 * @param bowlLight 坐便灯 {ON,OFF}
 * @param autoFlush 自动冲洗 {ON,OFF}
 * @param PRWash 前缘冲洗 {ON,OFF}
 * @param autoOpenClose 自动感应距离 {ON,OFF}
 * @param deodorizer 智能除臭 {ON,OFF}
 * @param trap 自动开关盖
 * @param sound 声音
 * @returns {string}
 */
NIMI.prototype.setting = function (welcome, nightLight, bowlLight, autoFlush, PRWash, autoOpenClose, deodorizer, trap, sound) {
  var cmd = "0A";
  var mWelcome = "0";
  (welcome == config.ON) ? mWelcome = "1" : mWelcome = "0";
  var mNightLight = "0";
  (nightLight == config.ON) ? mNightLight = "1" : mNightLight = "0";
  var mBowlLight = "0";
  (bowlLight == config.ON) ? mBowlLight = "1" : mBowlLight = "0";
  var mAutoFlush = "0";
  (autoFlush == config.ON) ? mAutoFlush = "1" : mAutoFlush = "0";
  var mPRWash = "0";
  (PRWash == config.ON) ? mPRWash = "1" : mPRWash = "0";
  var mAutoOpenClose = "0";
  (autoOpenClose == config.ON) ? mAutoOpenClose = "1" : mAutoOpenClose = "0";
  var mDeodorizer = "0";
  (deodorizer == config.ON) ? mDeodorizer = "1" : mDeodorizer = "0";
  var mTrap = "0";
  (trap == config.ON) ? mTrap = "1" : mTrap = "0";
  var mSound = "0";
  (sound == config.ON) ? mSound = "1" : mSound = "0";
  cmd += getHex(mWelcome + mNightLight + mBowlLight + mAutoFlush + mPRWash + mAutoOpenClose + mDeodorizer + mTrap);
  cmd += getHex("0" + mSound + "000000");
  cmd += "00" + "00";
  return cmd;
};

/**
 * 节能模式 延时状态
 * @param delayTime
 * @returns {string}
 */
NIMI.prototype.powerSaveDelay = function (delayTime) {
  var cmd = "0C";
  cmd += getHex("0" + fourBitToCheck(delayTime.toString(2)) + "000") + "00" + "00" + "00";
  return cmd;
};

/**
 * 节能模式 Schedule状态
 * @param startTime
 * @param startMin
 * @param endTime
 * @param endMin
 * @returns {string}
 */
NIMI.prototype.powerSaveSchedule = function (startTime, startMin, endTime, endMin) {
  var cmd = "0C";
  cmd += getHex("1" + fiveBitToCheck(startTime.toString(2)) + sixBitToCheck(startMin.toString(2))
      + fiveBitToCheck(endTime.toString(2)) + sixBitToCheck(endMin.toString(2)) + "0") + "FE";
  return cmd;
};

/**
 * 解析指令入口
 * @param cmd
 */
NIMI.prototype.analysisInstruction = function (cmd) {
  var code;
  if (arg.length >= 16 && arg.length <= 40) {
    var ackStr = arg.substring(12, arg.length - 2);
    var ack = ackStr.substring(0, 2).toLowerCase();
    if (ack == "fa") {
      var operate = ackStr.substring(0, 4);
      code = {"ack": operate};
    } else if (ack == "fb") {
      code = {"ack": config.ACK_REFUSE};
    } else if (ack == "fc") {
      code = {"ack": config.ACK_DATA_ERROR};
    } else if (ack == "fd") {
      code = {"ack": config.ACK_PKG_ERROR};
    } else if (ack == "98") {
      code = analysisToiletStatus(ackStr);
    }else if (ack == "87") {
      code = analysisSanitizeStatus(ackStr);
    }
  } else {
    code = {"ack": config.ACK_PKG_ERROR};
  }
  return code;
};

/**
 * 解析返回命令字为98的数据 指设备状态的返回
 * 当flushStatus 为正在冲水时 flushType分大冲小冲 0-小冲 1-大冲
 * @param ackStr
 */
function analysisToiletStatus(ackStr) {
  var mJson;
  var data = ackStr.substring(2, ackStr.length);
  var param_one = byteToCheck(data.substring(0, 2).toString(2));
  var param_second = byteToCheck(data.substring(2, 4).toString(2));
  var param_third = byteToCheck(data.substring(4, 6).toString(2));
  var param_fourth = byteToCheck(data.substring(6, 8).toString(2));
  var param_fifth = byteToCheck(data.substring(8, 10).toString(2));
  var flushStatus = param_one.substring(0, 3);
  var lidRingStatus = param_one.substring(3, 6);
  var dryerStatus = param_one.substring(7, 8);
  var feetHeater = param_second.substring(0, 1);
  var seatedStatus = param_second.substring(1, 2);
  var powerSaveStatus = param_second.substring(3, 4);
  var motherboardSystemStatus = param_second.substring(5, 8);
  var hasBattery = param_third.substring(2, 3);
  var fontStatus = param_third.substring(3, 4);
  var rearStatus = param_third.substring(4, 5);
  var ambientStatus = param_third.substring(6, 7);
  var flushType = param_third.substring(7, 8);
  var wandStatus = param_fourth.substring(0, 1);
  var UVProgressStatus = param_fourth.substring(1, 3);
  var ballValve = param_fourth.substring(3, 4);
  var powerSaveLearnByUser = param_fifth.substring(0, 3);
  mJson = {
    "flushStatus": flushStatus, "lidRingStatus": lidRingStatus, "dryerStatus": dryerStatus,
    "feetHeater": feetHeater, "seatedStatus": seatedStatus, "powerSaveStatus": powerSaveStatus,
    "motherboardSystemStatus": motherboardSystemStatus, "hasBattery": hasBattery, "fontStatus": fontStatus,
    "rearStatus": rearStatus, "ambientStatus": ambientStatus, "flushType": flushType, "wandStatus": wandStatus,
    "UVProgressStatus": UVProgressStatus, "ballValve": ballValve, "powerSaveLearnByUser": powerSaveLearnByUser
  };
  return mJson;
}

/**
 * 一键除菌状态返回
 * @param ackStr
 */
function analysisSanitizeStatus(ackStr) {
  var mJson;
  var data = ackStr.substring(2, ackStr.length);
  var param_one = byteToCheck(data.substring(0, 2).toString(2));
  var UVStatus = param_one.substring(4, 8);
  var hour = parseInt(data.substring(2, 4), 16);
  var minute = parseInt(data.substring(4, 6), 16);
  var second = parseInt(data.substring(6, 8), 16);
  mJson = {"UVStatus": UVStatus, "hour": hour, "minute": minute, "second": second};
  return mJson;
}

/**
 * 16进制转2进制补零
 * @param data
 */
function byteToCheck(data) {
  if (data.length < 8) {
    var l = 8 - data.length;
    for (var i = 0; i < l; i++) {
      data = "0" + data;
    }
  }
  return data;
}

/**
 * 十进制转二进制 六位补零
 * @param {String} data
 */
function sixBitToCheck(data) {
  if (data.length < 6) {
    var l = 6 - data.length;
    for (var i = 0; i < l; i++) {
      data = "0" + data;
    }
  }
  return data;
}

/**
 * 十进制转二进制 四位补零
 * @param {String} data
 */
function fourBitToCheck(data) {
  if (data.length < 4) {
    var l = 4 - data.length;
    for (var i = 0; i < l; i++) {
      data = "0" + data;
    }
  }
  return data;
}

/**
 * 十进制转二进制 五位补零
 * @param {String} data
 */
function fiveBitToCheck(data) {
  if (data.length < 5) {
    var l = 5 - data.length;
    for (var i = 0; i < l; i++) {
      data = "0" + data;
    }
  }
  return data;
}

/**
 * 按byte获取十六进制
 * @param {String} bin
 */
function getHex(bin) {
  var hex = "";
  for (var i = 0; i < bin.length; i += 4) {
    var h = bin.substring(i, i + 4);
    hex += parseInt(h, 2).toString(16).toUpperCase();
  }
  return hex;
}

/**
 * 十六进制补0
 * @param {String} d
 */
function doStr(d) {
  if (d.length % 2 != 0) {
    d = "0" + d;
  }
  return d;
};

function RoController(){};
RoController.prototype._data={
  stopAll:"00", //停止所有功能。
  startOutlet:"2101",  //开启出水
  stopOutlet:"2100",  //关闭出水
  requestAllStatus:"70",  //查询设备所有状态
  _paramPowerSaveMode:{
    _header:"31",
    LOW_POWER:"01",
    SLEEP:"02",
    POWER_OFF:"03"
  }
}
RoController.prototype.enterPowerSaveMode = function(mode) {
  return this._data._paramPowerSaveMode._header+mode;
};



/**
 * 返回cmd字段命令
 * @param {*} header 头 16进制
 * @param {*} idx 索引 16进制
 * @param {*} data 数据段 16进制
 * @param {*} ctrId 控制段 16进制
 * @param {*} devId 设备段 16进制
 */
function getCmd(header, idx, data, ctrId, devId) {
  if (data.length % 2 != 0) {
    data = "0" + data;
  }
  var checksum = parseInt(idx, 16) ^ parseInt(ctrId, 16) ^ parseInt(devId, 16);
  for (var i = 0, len = data.length; i < len; i += 2) {
    var hex = data.substring(i, i + 2);
    checksum ^= parseInt(hex, 16);
  }
  var length = data.length / 2 + 4;
  return header + doStr(length)
    + doStr(idx)
    + doStr(ctrId)
    + doStr(devId)
    + data
    + doStr(checksum.toString(16));
}
