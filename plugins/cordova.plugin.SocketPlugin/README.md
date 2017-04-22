## SocketPlugin README


```javascript
//udp broadcast udp广播
 cordova.plugins.SocketPlugin.udpBroadCast({
          "timeout": 3000,  // 超时 ms
          "ip": "255.255.255.255", //广播地址
          "port": 5037,  //UDP端口,如果不传这个端口默认5037
          "value": cmd  //搜索box 请求json
        }, success, error);
        
        function success(msg) {
          [{}，
            //Box 列表
          ]
        };
        
        function error(msg) {
          {code:1} //失败返回 code 1
        };
        
        
```

```javascript
//tcp连接
 cordova.plugins.SocketPlugin.tcpConnect({
          "timeout": 5000,  // 超时时间
          "ip": "192.168.1.172", //设备 IP
          "port": 5036,  //Tcp端口,如果不传这个端口默认5036
        }, success, error);
        
        function success(msg) {
          {code:0}  //成功
        };
        
        function error(msg) {
          {code:1} //失败
        };
```

```javascript
//tcp指令发送
 cordova.plugins.SocketPlugin.tcpSendCmd({
          "ip": "192.168.1.172", //设备 IP
          "value": cmd   //发送的json
        }, success, error);
        
        function success(msg) {
          {code:0}  //成功
        };
        
        function error(msg) {
          {code:1} //失败
        };
```



```javascript
//获取tcp连接状态
 cordova.plugins.SocketPlugin.getTcpStatus({
          "ip": "192.168.1.172", //设备 IP
        }, success, error);
        
        function success(msg) {
          {code:0，status:true }  //成功,status 为是否连接 true连接状态  false 断开状态
        };
        
        function error(msg) {
          {code:1} //由于参数传入或者其他原因导致此失败
        };
```

```javascript
 cordova.plugins.SocketPlugin.tcpClose({
          "ip": "192.168.1.172", //设备 IP
          "closeAll":false  //是否关闭全部Socket通信连接,插件会优先检查这个字段，如果是true则不会读取ip字段
        }, success, error);
        
        function success(msg) {
          {code:0}  //成功
        };
        
        function error(msg) {
          {code:1} //失败
        };
```

```javascript
//监听tcp状态
addEventListener('SocketPlugin.receiveTcpStatus', function (result){
  {
  	isTrusted:false, //请忽略这个字段，这是插件传送事件的时候自动产生的
    ip:192.168.1.172, //设备的ip
    code: 0  //0 表明设备重连成功,1 表明设备重连失败
  }
});
```

```javascript
//监听tcp返回数据
addEventListener('SocketPlugin.receiveTcpData', function (result){
  {
    isTrusted:false, 
    //...其他设备返回的字段，在顶层json对象中
  }
});
```

