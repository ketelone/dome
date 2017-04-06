//
//  AppDelegate+AzurePush.m
//  HelloCordova
//
//  Created by wangsheng on 2017/4/6.
//
//

#import "AppDelegate+AzurePush.h"
#import <objc/runtime.h>
#import <WindowsAzureMessaging/WindowsAzureMessaging.h>
#import <WindowsAzureMobileServices/WindowsAzureMobileServices.h>
#import "HubInfo.h"

@implementation AppDelegate (AzurePush)
+(void)load
{
    Method origin;
    Method swizzle;
    
    origin=class_getInstanceMethod([self class],@selector(init));
    swizzle=class_getInstanceMethod([self class], @selector(init_AzurePush));
    method_exchangeImplementations(origin, swizzle);
}

-(id)init_AzurePush
{
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(applicationDidLaunchForKohler:)
                                                 name:@"UIApplicationDidFinishLaunchingNotification"
                                               object:nil];
    return [self init_AzurePush];
}

- (void)applicationDidLaunchForKohler:(NSDictionary *)launchOptions
{
    NSLog(@"applicationDidLaunchForKohler");
    [self registerNotificationSettting];
}

//注册推送
- (void)registerNotificationSettting
{
    UIUserNotificationSettings *setting = [UIUserNotificationSettings settingsForTypes:UIUserNotificationTypeBadge| UIUserNotificationTypeSound| UIUserNotificationTypeAlert categories:nil];
    [[UIApplication sharedApplication] registerUserNotificationSettings:setting];
    [[UIApplication sharedApplication] registerForRemoteNotifications];
}

//关闭推送
- (void)unRegisterNotificationSetting
{
    [[UIApplication sharedApplication] unregisterForRemoteNotifications];
}

-(void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
    SBNotificationHub* hub = [[SBNotificationHub alloc] initWithConnectionString:HUBLISTENACCESS
                                                             notificationHubPath:HUBNAME];
    
    NSLog(@"didRegisterWithDeviceToken:%@,version:%@",deviceToken,[SBNotificationHub version]);
    
    [hub registerNativeWithDeviceToken:deviceToken tags:nil completion:^(NSError* error) {
        if (error != nil) {
            NSLog(@"Error registering for notifications: %@", error);
        }
    }];

}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
    NSLog(@"didReceiveRemoteNotification:%li,%@",[UIApplication sharedApplication].applicationState,userInfo);
    [[NSNotificationCenter defaultCenter] postNotificationName:kAZureNotification object:userInfo];
}

-(void)MessageBox:(NSString *)title message:(NSString *)messageText
{
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:title message:messageText delegate:self
                                          cancelButtonTitle:@"OK" otherButtonTitles: nil];
    [alert show];
}

@end
