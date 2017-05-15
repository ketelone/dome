//
//  SocketConnectTool.m
//  SocketSend
//
//  Created by wangsheng on 2017/3/15.
//  Copyright © 2017年 wangsheng. All rights reserved.
//

#import "SocketConnectTool.h"

static const uint16_t UDPPort = 5037;
static const uint16_t TCPPort = 5036;

@implementation SocketConnectTool
{
    NSString *_host; //服务器ip - tcpIp
    uint16_t _port;  //服务器端口号 5037是广播端口 5036是tcp端口
    NSMutableArray *_sockGroup; //socket组
    NSTimer *ackTimer;
    int flag;
    int tcpIdx;
    NSMutableArray *tcpSendArray;
}

//创建单例
+(instancetype)sharedInstance
{
    static SocketConnectTool *socketTool = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        socketTool = [[self alloc] init];
    });
    return socketTool;
}

//TcpSocket初始化
-(BOOL)initGCDAsyncSocket:(NSString *)tcpHost
{
    if (tcpHost) {
        //实例化
        self.socket = [[GCDAsyncSocket alloc] initWithDelegate:self delegateQueue:dispatch_get_main_queue()];
        
        if (self.socket.isIPv4) {
            [self.socket setIPv4Enabled:YES];
        }else{
            [self.socket setIPv6Enabled:YES];
        }//优先级ipv6
        
        _host = tcpHost;
        NSError *error = nil;
        
        BOOL isConnect = [self.socket connectToHost:tcpHost onPort:TCPPort withTimeout:3.f error:&error];
        DLog(@"initGCDAsyncSocket");
        return isConnect;
        
    }else{
        return NO;
    }
}

//TcpSocketGroup初始化
-(void)initGCDAsyncGroupSocket:(NSArray<NSString *> *)hostGroup
{
    if (hostGroup) {
        _sockGroup = [NSMutableArray arrayWithCapacity:hostGroup.count];
        GCDAsyncSocket *socket = [[GCDAsyncSocket alloc] initWithDelegate:self delegateQueue:dispatch_get_main_queue()];
        for (NSString *host in hostGroup) {
            NSError *err = nil;
            [socket connectToHost:host onPort:TCPPort withTimeout:3.f error:&err];
            [_sockGroup addObject:socket];
        }
    }
}

//UDPSocket初始化
-(void)initGCDAsyncUdpSocket
{
    //实例化
    self.udpSocket = [[GCDAsyncUdpSocket alloc] initWithDelegate:self delegateQueue:dispatch_get_main_queue()];
    
    if (self.udpSocket.isIPv4) {
        [self.udpSocket setIPv4Enabled:YES];
    }else{
        [self.udpSocket setIPv6Enabled:YES];
    }//优先级ipv6
    
    NSError *error = nil;
    
    if (![self.udpSocket enableBroadcast:YES error:&error]) {
        DLog(@"开启广播状态失败!");
    }
    
    if (![self.udpSocket bindToPort:0 error:&error])
    {
        DLog(@"绑定端口出错了:%@",error);
        return;
    }
    
    if (![self.udpSocket beginReceiving:&error])
    {
        DLog(@"启动接受消息出错了:%@",error);
        return;
    }
    __weak typeof(self)slf = self;
    //设置接收过滤器
    [self.udpSocket setReceiveFilter:^BOOL(NSData *data, NSData *address, __autoreleasing id *context) {
        if ([address isEqual:slf.udpSocket.localAddress]) {
            return NO;
        }
        return YES;
    } withQueue:dispatch_get_main_queue()];
    
    DLog(@"initGCDAsyncUdpSocket");
}

#pragma makr - udp发送广播
-(void)broadcast:(id )ackMessage WithHost:(NSString *)udpHost  WithPort:(uint16_t)port
{
    //获取BOX详细信息请求格式
    NSError *err;
    NSData *data = [NSJSONSerialization dataWithJSONObject:ackMessage options:NSJSONWritingPrettyPrinted error:&err];
    NSString *host = udpHost;
    if (!host) {
        host = @"255.255.255.255"; //如果udp为nil，则广播ip默认是255.255.255.255
    }
    uint16_t tempPort = port?port:UDPPort;
    [self.udpSocket sendData:data toHost:host port:tempPort withTimeout:-1 tag:0];
    
    DLog(@"prepare to broadcast!");
}

#pragma mark - tcp发送数据报
-(void)startAck:(id)message
{
    //发送确认包，服务器回执。发送数据报不能为nil
    id requestACK = message;
    if (requestACK) {
        //确保还在连接中
        if ([self.socket isConnected]) {
            NSError *err;
            NSData * writeData = [NSJSONSerialization dataWithJSONObject:requestACK options:NSJSONWritingPrettyPrinted error:&err];
            [self.socket writeData:writeData withTimeout:-1 tag:tcpIdx];
            DLog(@"didSendSocket:%@,tag:%i",requestACK,tcpIdx);
            
        }else{
            //3s执行一次连接
            if (!ackTimer) {
                flag = 0;
                ackTimer = [NSTimer scheduledTimerWithTimeInterval:3.f target:self selector:@selector(timerLoopFunction:) userInfo:requestACK repeats:YES];
            }
        }
    }
}

//重连，重发
- (void)timerLoopFunction:(NSTimer *)timer
{
    if ([self.socket isConnected]) {
        [self startAck:timer.userInfo];
        [ackTimer invalidate];
        ackTimer = nil;
        return;
    }
    //尝试重连,最多重连三次
    [self initGCDAsyncSocket:_host];
    flag++;
    DLog(@"flag:%i",flag);
    if (flag>=3) {
        [ackTimer invalidate];
        ackTimer = nil;
        
        NSDictionary *respDict = @{@"error":@"tcp reConnect failure!",
                                   @"code":@(-1),
                                   @"ip":_host?_host:@""
                                   };
        [[NSNotificationCenter defaultCenter] postNotificationName:TcpStatusNotification object:respDict];
    }
}

#pragma makr - 断开tcp连接
-(void)cancelTcpSocketConnect
{
    if (![self.socket isDisconnected]) {
        [self.socket disconnect];
    }
    DLog(@"cancelTcpSocketConnect");
}

#pragma mark - 取消所有的tcp连接
-(void)cancelAllTcpSocketConnections
{
    for (GCDAsyncSocket *socket in _sockGroup) {
        if (![socket isDisconnected]) {
            [socket disconnect];
        }
    }
}


#pragma mark - ==============GCDAsyncUdpSocketDelegate==================
//UDP成功连接回调
- (void)udpSocket:(GCDAsyncUdpSocket *)sock didConnectToAddress:(NSData *)address
{
    DLog(@"broadcast_didConnectToAddress");
    
}
//UDP连接失败回调
- (void)udpSocket:(GCDAsyncUdpSocket *)sock didNotConnect:(NSError *)error
{
    DLog(@"broadcast_didNotConnect");
}

//UDP发送消息成功回调
- (void)udpSocket:(GCDAsyncUdpSocket *)sock didSendDataWithTag:(long)tag
{
    DLog(@"broadcast_didSendDataWithTag:%lu",tag);
}

//UDP发送消息失败回调
- (void)udpSocket:(GCDAsyncUdpSocket *)sock didNotSendDataWithTag:(long)tag dueToError:(NSError *)error
{
    DLog(@"broadcast_didNotSendDataWithTag:%lu,err:%@",tag,error);
    NSDictionary *errorDesp = @{
                                @"error":[NSString stringWithFormat:@"%@",error.description]
                                };
    
    if (self.udpResponse) self.udpResponse(errorDesp,UdpSocketResponseStatusSendFailure);
}

//收到upd应答回调
- (void)udpSocket:(GCDAsyncUdpSocket *)sock didReceiveData:(NSData *)data
      fromAddress:(NSData *)address
withFilterContext:(id)filterContext
{
    //Json解析
    NSError *err;
    id receiveMsg = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingAllowFragments error:&err];
    DLog(@"broadcast_didReceiveData:%@",receiveMsg);
    
    if (![address isEqual:sock.localAddress]) {
        //广播完成 返回host地址
        if (self.udpResponse) self.udpResponse(receiveMsg,UdpSocketResponseStatusReceived);
    }
}

//udpsocket关闭回调
- (void)udpSocketDidClose:(GCDAsyncUdpSocket *)sock withError:(NSError *)error
{
    DLog(@"udpSocketDidClose:%@",error);
}

#pragma mark - ==================GCDAsyncSocketDelegate==================
//有新tcp连接回调（暂时没有）
-(void)socket:(GCDAsyncSocket *)sock didAcceptNewSocket:(GCDAsyncSocket *)newSocket
{
    DLog(@"tcp_didAcceptNewSocket:%@,%u",newSocket.connectedHost,newSocket.connectedPort);
}

// 连接成功回调
-(void)socket:(GCDAsyncSocket *)sock didConnectToHost:(NSString *)host port:(uint16_t)port
{
    DLog(@"tcp_didConnectToHost:%@:%u",host,port);
    NSDictionary *respDict = @{@"message":@"didConnectToHost",
                               @"code":@(1),
                               @"ip":host?host:@""
                               };
    [[NSNotificationCenter defaultCenter] postNotificationName:TcpStatusNotification object:respDict];
}

// 收到回执
-(void)socket:(GCDAsyncSocket *)sock didReadData:(NSData *)data withTag:(long)tag
{
    NSError *err;
    id httpResponse = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingAllowFragments error:&err];
    
    if (httpResponse){
        //第一次连接等待
        if ([httpResponse isEqual:@{@"message":@"Who are you?"}]) {
            if (self.tcpResponse) self.tcpResponse(httpResponse,TcpSocketResponseStatusInit);
        }else{
            if (self.tcpResponse) self.tcpResponse(httpResponse,TcpSocketResponseStatusOthers);
            [[NSNotificationCenter defaultCenter] postNotificationName:TcpDataNotification object:httpResponse];
        }
    }
    
    DLog(@"tcp_didReadData:%@",httpResponse);
    
    //开始监听数据到来
    [self.socket readDataWithTimeout:-1 tag:tag];
}

//发送成功回调
-(void)socket:(GCDAsyncSocket *)sock didWriteDataWithTag:(long)tag
{
    //开始监听数据到来
    [self.socket readDataWithTimeout:-1 tag:tag];
    
    DLog(@"socket_didWriteDataWithTag:%@",@(tag));
}

//连接失败回调
-(void)socketDidDisconnect:(GCDAsyncSocket *)sock withError:(NSError *)err
{
    DLog(@"tcp_socketDidDisconnect:%@",err);
    if (err.code==7) {
        //锁屏重连
        [self keepLongConnection];
        return;
    }
    NSDictionary *respDict = @{@"code":@(0),
                               @"error":@"socketDidDisconnect",
                               @"ip":sock.connectedHost?sock.connectedHost:@""
                               };
    [[NSNotificationCenter defaultCenter] postNotificationName:TcpStatusNotification object:respDict];
}

- (void)keepLongConnection
{
    if ([self.socket isDisconnected]) {
        id reConnectAck = @[@{
                                @"ver":@(1),
                                @"from":@{
                                        @"ctype":@(0xE3),
                                        @"uid":@"peerId"
                                        },
                                @"ctype":@"",
                                @"to": @{
                                        @"ctype": @(0XE4),
                                        @"uid": @"peerId"
                                        },
                                @"ts":@([NSDate date].timeIntervalSince1970),
                                @"idx":@(0),
                                @"mtype":@"rqst",
                                @"data":@{
                                        @"device_type":@"BOX",
                                        @"act": @"",
                                        @"act_params":@""
                                        }
                                }];
        [self startAck:reConnectAck];
    }
}

@end
