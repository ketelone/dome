###Socket通讯插件

###插件提供了三种方法：
1.cordova.plugins.SocketPlugin.udpBroadCast //udp广播
2.cordova.plugins.SocketPlugin.tcpSendCmd      //发送tcp指令 
3.cordova.plugins.SocketPlugin.tcpConnect     //tcp连接
4.cordova.plugins.SocketPlugin.getTcpStatus   //获取tcp连接状态
5.cordova.plugins.SocketPlugin.tcpClose    //断开tcp连接 0表示断开所有 ip断开指定tcP

###接收监听
#接受tcp状态
document.addEventListener('SocketPlugin.receiveTcpStatus', function (result) {
                                      alert(JSON.stringify(result));
                                      }, false);
#接受tcp返回数据
document.addEventListener('SocketPlugin.receiveTcpData', function (result) {
                                      alert(JSON.stringify(result));
                                      }, false);


####所有的返回状态json格式





###用法示例:
1.cordova.plugins.SocketPlugin.udpBroadCast({"timeout":"5000”,,”ip”:”255.255.255.255”,”value”:cmd},success , error);

2.cordova.plugins.SocketPlugin.tcpConnect({"timeout":"5000”,”ip":"192.168.1.1"},success , error);

3.cordova.plugins.SocketPlugin.tcpSendCmd({"timeout":"5000”,”value”:cmd,,”ip":"192.168.1.1"},success , error);

4.cordova.plugins.SocketPlugin.getTcpStatus({”ip":"192.168.1.1”},success , error);

5.cordova.plugins.SocketPlugin.tcpClose ({”ip":"192.168.1.1”}，success,error)

###getTcpStatus###
1.正在连接状态
{@"tcpStatus”:@(1)}
2.连接失败
{@"tcpStatus”:@(0)}




