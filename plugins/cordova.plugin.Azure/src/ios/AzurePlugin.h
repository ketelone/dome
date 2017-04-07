//
//  AzurePlugin.h
//  HelloCordova
//
//  Created by wangsheng on 2017/4/6.
//
//

#import <Cordova/CDV.h>

@interface AzurePlugin : CDVPlugin
/*
 *!重启推送
 */
- (void)resumePush:(CDVInvokedUrlCommand *)cmd;

/*
 *!关闭推送
 */

- (void)stopPush:(CDVInvokedUrlCommand *)cmd;
@end
