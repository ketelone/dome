//
//  CDVLocation.m
//  HelloCordova
//
//  Created by wangsheng on 2017/4/11.
//
//

#import "CDVLocation.h"
#import <CoreLocation/CoreLocation.h>

@interface CDVLocation ()<CLLocationManagerDelegate>
@property (nonatomic,strong)CLLocationManager *manager;
@property (nonatomic,strong)CDVInvokedUrlCommand *cmd;
@end

@implementation CDVLocation

-(void)openLocation:(CDVInvokedUrlCommand *)command
{
    self.cmd = command;
    if ([CLLocationManager locationServicesEnabled]) {
        _manager = [CLLocationManager new];
        _manager.delegate = self;
        [_manager setDesiredAccuracy:kCLLocationAccuracyBest];
        [_manager setDistanceFilter:100.f];//设置定位范围更新频率100米
        if ([UIDevice currentDevice].systemVersion.floatValue>=8.0) {
            [_manager requestWhenInUseAuthorization];
        }
        if ([CLLocationManager authorizationStatus]==kCLAuthorizationStatusDenied ||[CLLocationManager authorizationStatus]==kCLAuthorizationStatusRestricted) {
            //@"定位权限被关闭"
            CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:@{@"error":@"unAuthorization"}];
            [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        }else{
            [_manager startUpdatingLocation];
        }
    }else{
        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:@{@"error":@"unAuthorization"}];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }
}

#pragma mark - CLLocationManagerDelegate
/** 当前位置授权状态的改变
 用户未决定
 kCLAuthorizationStatusNotDetermined = 0,
 //受限制
 kCLAuthorizationStatusRestricted,
 
 //拒绝
 kCLAuthorizationStatusDenied,
 
 //前后台定位授权
 kCLAuthorizationStatusAuthorizedAlways NS_ENUM_AVAILABLE(10_12, 8_0),
 //前台定位
 kCLAuthorizationStatusAuthorizedWhenInUse NS_ENUM_AVAILABLE(NA, 8_0),
 *
 */
-(void)locationManager:(CLLocationManager *)manager didChangeAuthorizationStatus:(CLAuthorizationStatus)status{
    
    if (status == kCLAuthorizationStatusAuthorizedWhenInUse) {
        [_manager startUpdatingLocation];
    }
    
}
- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray *)locations
{
    CLLocation *location = [locations lastObject];
    NSLog(@"locaitons_latitude:%f,longitude:%f",location.coordinate.latitude,location.coordinate.longitude);
    NSDictionary *locationDict = @{
                                   @"latitude":@(location.coordinate.latitude),
                                   @"longitude":@(location.coordinate.longitude)
                                   };
    CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:locationDict];
    [self.commandDelegate sendPluginResult:result callbackId:self.cmd.callbackId];
    manager = nil;
}

-(void)dealloc
{
    _manager = nil;
}

@end
