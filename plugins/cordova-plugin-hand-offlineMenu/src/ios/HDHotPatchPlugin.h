//
//  HDHotPatchPlugin.h
//  WXIonicObj
//
//  Created by Mr.xiao on 17/2/27.
//
//

#import <Cordova/CDV.h>
#import <ZipArchive/SSZipArchive.h>
#ifdef DEBUG
#   define DLog(fmt, ...) NSLog((@"%s [Line %d] " fmt), __PRETTY_FUNCTION__, __LINE__, ## __VA_ARGS__);
#else
#   define DLog(...)
#endif

@interface HDHotPatchPlugin : CDVPlugin<SSZipArchiveDelegate>


- (void)updateLocalPage:(CDVInvokedUrlCommand *)command;
- (void)openPage:(CDVInvokedUrlCommand *)command;
@end
