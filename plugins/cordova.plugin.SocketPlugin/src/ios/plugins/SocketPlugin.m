//
//  SocketPlugin.m
//  HelloCordova
//
//  Created by wangsheng on 2017/4/5.
//
//

#import "SocketPlugin.h"
#import "SocketConnectTool.h"
#import "CDVLocation.h"
@interface SocketPlugin ()
{
    CDVInvokedUrlCommand *udpCmd;
    CDVInvokedUrlCommand *tcpCmd;
    NSMutableArray *_udpRespQueue;
}
@property (nonatomic,strong)SocketConnectTool *socketConnect;
@property (nonatomic,strong)NSMutableArray *udpRespQueue;
@end

@implementation SocketPlugin

-(void)pluginInitialize
{
    // Initialize
    self.socketConnect = [SocketConnectTool sharedInstance];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(ReceivedTcpStatusNotification:) name:TcpStatusNotification object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(ReceivedTcpDataNotification:) name:TcpDataNotification object:nil];
}

/**UDP广播**/
-(void)udpBroadCast:(CDVInvokedUrlCommand *)command
{
    udpCmd  =command;
    NSDictionary *arg = [command.arguments firstObject];
    NSTimeInterval timeout = [[arg objectForKey:@"timeout"] doubleValue];
    NSString *broadCastIp = [arg objectForKey:@"ip"];
    broadCastIp = broadCastIp?broadCastIp:@"255.255.255.255";
    NSDictionary *msg = [arg objectForKey:@"value"];
    
    if (msg==nil||[msg isEqual:[NSNull null]]) {
        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"udp broadcast cmd can not be null or nil"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        return;
    }
    
    //Initialize
    [self.socketConnect initGCDAsyncUdpSocket];
    
    [self.socketConnect broadcast:msg WithHost:broadCastIp WithTag:0];//发送广播
    
     self.udpRespQueue = [NSMutableArray array];//实例化一个udp消息队列
    
    __block CDVPluginResult *result = nil;
    __weak typeof(self)slf = self;
    
    //超时处理
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(timeout/1000.0 * NSEC_PER_SEC)), dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:_udpRespQueue];
        [slf.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        //超时断开连接
        [self.socketConnect.udpSocket close];
        DLog(@"udpSocketBroad_close");
    });
    
    //udp response
    self.socketConnect.udpResponse = ^(id resp,UdpSocketResponseStatus status){
        if (status == UdpSocketResponseStatusSendFailure) {
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:resp];
            [slf.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        }else if (status == UdpSocketResponseStatusReceived){
            if (![slf.udpRespQueue containsObject:resp]) {
                [slf.udpRespQueue addObject:resp];
            }
        }
    };
}


/*TCP连接*/
-(void)tcpConnect:(CDVInvokedUrlCommand *)command
{
    tcpCmd = command;
    NSDictionary *arg = command.arguments[0];
    NSTimeInterval timeout = [arg[@"timeout"] doubleValue];
    NSString *ip = arg[@"ip"];
    BOOL isConnected = [self.socketConnect initGCDAsyncSocket:ip];
    if (isConnected) {
        //第一次请求验证 返回 who are you?
        NSDictionary *tcpAck = @{
                                 @"from":@{@"cid":@"0xE3"},
                                 @"to":@{@"cid":@"0xE4",@"device_id":@""},
                                 @"ts":@([[NSDate date] timeIntervalSince1970]),
                                 @"idx":@0,
                                 @"method":@"CTL",
                                 @"payload": @{
                                         @"device_type":@"BLE_DEVICE",
                                         @"cmd":@"",
                                         @"cmd_properties":@""
                                         }
                                 };
        [self.socketConnect startAck:tcpAck];//验证指令
        
        __block CDVPluginResult *result = nil;
        __weak typeof(self)slf = self;
        //超时处理
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(timeout/1000.0 * NSEC_PER_SEC)), dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
            //超时断开连接
            if (![self.socketConnect.socket isConnected]) {
                result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"tcpConnect_timeout"];
                [slf.commandDelegate sendPluginResult:result callbackId:command.callbackId];
                DLog(@"tcpConnect_timeout");
            }
        });
        
        //tcpSocket Response
        self.socketConnect.tcpResponse = ^(id resp,TcpSocketResponseStatus status){
            if (status == TcpSocketResponseStatusInit) {
                result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:@(YES)];
                [slf.commandDelegate sendPluginResult:result callbackId:command.callbackId];
            }
        };
    }else{
        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"please check your ip format!"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];

    }
    
}

/**TCP指令**/
-(void)tcpSendCmd:(CDVInvokedUrlCommand *)command
{
    tcpCmd = command;
    NSDictionary *arg = command.arguments[0];
    NSTimeInterval timeout = [arg[@"timeout"] doubleValue];
    NSDictionary *tcpAck = arg[@"value"];
    
    if (tcpAck==nil||[tcpAck isEqual:[NSNull null]]) {
        CDVPluginResult  *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:@{@"error":@"command can not be nill or null"}];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        return;
    }
    
    [self.socketConnect startAck:tcpAck];//发送指令
    __block CDVPluginResult *result = nil;
    __weak typeof(self)slf = self;
    
    //超时处理
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(timeout/1000.0 * NSEC_PER_SEC)), dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        //超时断开连接
        if (![self.socketConnect.socket isConnected]) {
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"send message failure!"];
            [slf.commandDelegate sendPluginResult:result callbackId:command.callbackId];
            DLog(@"tcpConnect_timeout");
        }
    });
    
    //tcp response
    self.socketConnect.tcpResponse = ^(id response,TcpSocketResponseStatus status){
        if (status == TcpSocketResponseStatusOthers) {
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"send message success!"];
            [slf.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        }
    };
}

-(void)tcpClose:(CDVInvokedUrlCommand *)command
{
    CDVPluginResult *result;
    if ([self.socketConnect.socket isConnected]) {
        [self.socketConnect.socket disconnect];
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"tcp disconnect success!"];
    }else{
          result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"tcp has been disconnect status!"];
    }
    
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

/*
 * Tcp receive data callback
 */
- (void)ReceivedTcpDataNotification:(NSNotification *)notification
{
    id resp = notification.object;
    
    NSDictionary *result = resp;
    
    if (result) {
        //主动调用JS
        NSError *error;
        NSData *jsonStrData = [NSJSONSerialization dataWithJSONObject:result  options:0 error:&error];
        NSString *jsonStr = [[NSString alloc] initWithData:jsonStrData encoding:NSUTF8StringEncoding];
        
        //收到通知
        dispatch_async(dispatch_get_main_queue(), ^{
            [self.commandDelegate evalJs:[NSString stringWithFormat:@"cordova.fireDocumentEvent('SocketPlugin.receiveTcpData',%@)",jsonStr]];
        });

    }
}

/*
 * TCP get tcpConnection status
 */
-(void)getTcpStatus:(CDVInvokedUrlCommand *)command
{
    if ([self.socketConnect.socket isConnected]) {
        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:@{@"status":@(1)}] callbackId:command.callbackId];
    }else{
        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:@{@"status":@(0)}] callbackId:command.callbackId];
    }
}

/*
 * TCP 状态回调
 */
- (void)ReceivedTcpStatusNotification:(NSNotification *)notification
{
    id resp = notification.object;
    
    NSDictionary *result = (NSDictionary *)resp;
    
    if (result) {
        //主动调用JS
        NSError *error;
        NSData *jsonStrData = [NSJSONSerialization dataWithJSONObject:result  options:0 error:&error];
        NSString *jsonStr = [[NSString alloc] initWithData:jsonStrData encoding:NSUTF8StringEncoding];
        
        //收到通知
        dispatch_async(dispatch_get_main_queue(), ^{
            [self.commandDelegate evalJs:[NSString stringWithFormat:@"cordova.fireDocumentEvent('SocketPlugin.receiveTcpStatus',%@)",jsonStr]];
        });

    }
    DLog(@"tcpStatus:%@",resp);
}

@end
