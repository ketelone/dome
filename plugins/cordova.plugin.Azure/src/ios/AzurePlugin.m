//
//  AzurePlugin.m
//  HelloCordova
//
//  Created by wangsheng on 2017/4/6.
//
//

#import "AzurePlugin.h"
#import "HubInfo.h"
#import "AppDelegate+AzurePush.h"

@implementation AzurePlugin

-(void)pluginInitialize
{
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(didReceivedRemoteNotification:) name:kAZureNotification object:nil];
}


- (void)didReceivedRemoteNotification:(NSNotification *)notification
{
    NSDictionary *userInfo = notification.object;
    NSLog(@"userInfo:%@",userInfo);
    
    NSError *error;
    NSData *jsonStrData = [NSJSONSerialization dataWithJSONObject:userInfo  options:0 error:&error];
    NSString *jsonStr = [[NSString alloc] initWithData:jsonStrData encoding:NSUTF8StringEncoding];
    
    //收到通知
    dispatch_async(dispatch_get_main_queue(), ^{
        [self.commandDelegate evalJs:[NSString stringWithFormat:@"cordova.fireDocumentEvent('azure.receiveNotification',%@)",jsonStr]];
    });
}

-(void)stopPush:(CDVInvokedUrlCommand *)cmd
{
    [(AppDelegate *)[UIApplication sharedApplication].delegate unRegisterNotificationSetting];
}

-(void)resumePush:(CDVInvokedUrlCommand *)cmd
{
    [(AppDelegate *)[UIApplication sharedApplication].delegate registerNotificationSettting];
}

@end
