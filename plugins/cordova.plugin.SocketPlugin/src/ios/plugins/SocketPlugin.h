//
//  SocketPlugin.h
//  HelloCordova
//
//  Created by wangsheng on 2017/4/5.
//
//

#import <Cordova/CDV.h>

@interface SocketPlugin : CDVPlugin
/*
 *! UDP广播
 */
- (void)udpBroadCast:(CDVInvokedUrlCommand *)command;

/*
 *! 发送TCP请求
 */
- (void)tcpSendCmd:(CDVInvokedUrlCommand*)command;

/*
 *! 发送TCP连接
 */
- (void)tcpConnect:(CDVInvokedUrlCommand *)command;
/*
 *! 获取TCP连接状态
 */
- (void)getTcpStatus:(CDVInvokedUrlCommand *)command;
/*
 *! 断开TCP连接
 */
- (void)tcpClose:(CDVInvokedUrlCommand *)command;
@end
