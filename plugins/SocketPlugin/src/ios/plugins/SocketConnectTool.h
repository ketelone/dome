//
//  SocketConnectTool.h
//  SocketSend
//
//  Created by wangsheng on 2017/3/15.
//  Copyright © 2017年 wangsheng. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GCDAsyncSocket.h"
#import "GCDAsyncUdpSocket.h"

#ifdef DEBUG
#   define DLog(fmt, ...) NSLog((@"%s [Line %d] " fmt), __PRETTY_FUNCTION__, __LINE__, ## __VA_ARGS__);
#else
#   define DLog(...)
#endif

/*TCP响应状态*/
typedef NS_OPTIONS(NSInteger,TcpSocketResponseStatus){
    TcpSocketResponseStatusDisConnect,//tcp disconnect
    TcpSocketResponseStatusInit ,//第一次tcp连接指令
    TcpSocketResponseStatusDidConnected,//连接成功
    TcpSocketResponseStatusScan ,  //搜索设备
    TcpSocketResponseStatusScanBonded,//搜索已绑定的设备
    TcpSocketResponseStatusBond,  //绑定操作
    TcpSocketResponseStatusQuit, //解除绑定
    TcpSocketResponseStatusTest, //测试指令
    TcpSocketResponseStatusUpload, //device状态上报
    TcpSocketResponseStatusOthers
};
/*UDP响应状态*/
typedef NS_OPTIONS(NSInteger, UdpSocketResponseStatus){
    UdpSocketResponseStatusInit,//初始化
    UdpSocketResponseStatusSendSuccess,//发送成功
    UdpSocketResponseStatusSendFailure,//发送失败
    UdpSocketResponseStatusReceived,//接受响应
    UdpSocketResponseStatusDisconnected,//断开连接
    UdpSocketResponseStatusClosed,//连接关闭
    UdpSocketResponseStatusOthers
};

static const NSNotificationName TcpStatusNotification = @"TcpStatusNotification";
static const NSNotificationName TcpDataNotification = @"TcpDataNotification";

typedef void(^UdpResponse)(id ,UdpSocketResponseStatus);
typedef void(^TcpResponse)(id ,TcpSocketResponseStatus);
typedef void(^TcpWriteResponse)(NSInteger tag);
typedef void(^TcpReadResponse)(NSInteger tag);

@interface SocketConnectTool : NSObject<GCDAsyncSocketDelegate,GCDAsyncUdpSocketDelegate>
@property (nonatomic,strong)GCDAsyncSocket *socket;//tcpSocket
@property (nonatomic,strong)GCDAsyncUdpSocket *udpSocket;//udpSocket
@property (nonatomic,strong)TcpWriteResponse tcpWriteResponse; //tcpWrite回调
@property (nonatomic,strong)TcpReadResponse tcpReadResponse;//tcpReceive回到
@property (nonatomic,strong)UdpResponse udpResponse;    //udp回调
@property (nonatomic,strong)TcpResponse tcpResponse;    //tcp回调
@property (nonatomic,assign)NSTimeInterval ackTime;


+(instancetype)sharedInstance;

//UDP
- (void)initGCDAsyncUdpSocket;  //udp协议初始化
-(void)broadcast:(NSDictionary *)ackMessage WithHost:(NSString *)udpHost  WithPort:(uint16_t)port;//发送udp广播

//TCP
- (BOOL)initGCDAsyncSocket:(NSString *)tcpHost; //tcp协议初始化
- (void)initGCDAsyncGroupSocket:(NSArray<NSString *>*)hostGroup;    //多个tcp协议初始化
- (void)startAck:(NSDictionary *)message;   //发送tcp数据报请求
- (void)cancelTcpSocketConnect; //取消tcp连接
- (void)cancelAllTcpSocketConnections;  //取消所有tcp连接
@end
