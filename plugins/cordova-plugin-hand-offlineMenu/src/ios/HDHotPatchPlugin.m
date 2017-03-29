//
//  HDHotPatchPlugin.m
//
//
//  Created by wangsheng on 17/3/27.
//
//

#import "HDHotPatchPlugin.h"
#import <AFNetworking/AFNetworking.h>

static NSString *patchAppVersionKey = @"patchAppVersion";

@implementation HDHotPatchPlugin{
    
    UIWebView * _webView;
    CDVViewController * _cdvViewController;
    NSURL *  _newWWWFloderUrl;
    NSString *www_Path;
    UIAlertView * _alertView;
    NSArray *updateUrlList; //更新模块url列表
    NSArray *updateModelList; //更新模块路径
    NSString *enterPath; //模块入口路劲
    NSString *_zipTempPath;//热更zip临时路径
}

- (void)pluginInitialize
{
    _webView = (UIWebView *)self.webView;
    
    _cdvViewController = (CDVViewController *)self.viewController;
    
    
    NSFileManager *fileManager = [NSFileManager defaultManager];
    NSString *basePath = [[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject] stringByAppendingString:@"/www"];
    
    if(![fileManager fileExistsAtPath:basePath]){
        NSError *error;
        [fileManager createDirectoryAtPath:basePath withIntermediateDirectories:NO attributes:nil error:&error];
    }
    
    NSLog(@"localPath = %@",[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject]);
}

#pragma mark public
- (void)openPage:(CDVInvokedUrlCommand *)command{
    _webView = (UIWebView *)self.webView;
    _cdvViewController = (CDVViewController *)self.viewController;
    NSDictionary *result = [command argumentAtIndex:0];
    NSString *filePath = result[@"localUrl"];
    NSString *version = result[@"version"];
    NSString *model_id = result[@"moduleId"];
    BOOL isUpdate = [[[NSUserDefaults standardUserDefaults] objectForKey:model_id] isEqualToString:version];
    if(!isUpdate){
        NSLog(@"你需要更新");
        return;
    }
    NSString *basePath = [[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject] stringByAppendingFormat:@"/www"];
    
    NSFileManager *fileManager = [NSFileManager defaultManager];
    basePath = [basePath stringByAppendingFormat:@"/%@",filePath];
    NSURLRequest *request = [NSURLRequest requestWithURL:[NSURL fileURLWithPath:basePath]];
    if([fileManager fileExistsAtPath:basePath]){
        [_webView loadRequest:request];
    }else{
        NSLog(@"打开路径错误");
        [_webView loadRequest:request];
    }
}


#pragma mark public  更新
- (void)updateLocalPage:(CDVInvokedUrlCommand *)command {
    NSDictionary *result = [command argumentAtIndex:0];
    updateUrlList = result[@"updateModules"];
    for (NSInteger i=0; i<updateUrlList.count; i++) {
        //解压路径
        __block NSString *updatepath = updateUrlList[i][@"unZipPath"];
        //下载路径
        __block NSString * updateUrl = updateUrlList[i][@"downloadUrl"];
        //模块id
        __block NSString *moduleId = updateUrlList[i][@"moduleId"];
        __block NSString *version = updateUrlList[i][@"version"];//版本号
        CDVPluginResult *result;
        if([version isEqualToString:[[NSUserDefaults standardUserDefaults] objectForKey:moduleId]]){
            DLog(@"没有版本差异");
            result  = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"There's no difference for this version!"];
            return;
        }
        if(updateUrl == nil || [updateUrl isEqualToString:@""]){
            DLog(@"下载链接不能为空!");
            result  = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"The downLoadUrl can't be NULL or nil!"];
            return;
        }
        NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
        AFURLSessionManager *manager = [[AFURLSessionManager alloc] initWithSessionConfiguration:configuration];
        
        NSURL *URL = [NSURL URLWithString:updateUrl];
        NSURLRequest *request = [NSURLRequest requestWithURL:URL];
        
        NSURLSessionDownloadTask *downloadTask = [manager downloadTaskWithRequest:request progress:^(NSProgress * _Nonnull downloadProgress) {
            [downloadProgress addObserver:self
                               forKeyPath:@"fractionCompleted"
                                  options:NSKeyValueObservingOptionNew
                                  context:(__bridge void * _Nullable)(moduleId)];
        } destination:^NSURL *(NSURL *targetPath, NSURLResponse *response) {
            NSString *tempPath = [[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject] stringByAppendingString:@"/hotPatch"];
            NSFileManager *fileManager= [NSFileManager defaultManager];
            if(![fileManager fileExistsAtPath:tempPath]){
                NSError *error;
                [fileManager createDirectoryAtPath:tempPath withIntermediateDirectories:NO attributes:nil error:&error];
            }
            NSString *hotPath = [tempPath stringByAppendingFormat:@"/%@",response.suggestedFilename];
             _zipTempPath = hotPath;//记录下当前的zip路径
//            if([fileManager fileExistsAtPath:hotPath]){
//                [fileManager removeItemAtPath:hotPath error:nil];
//            }
            return [NSURL fileURLWithPath:hotPath];
            
        } completionHandler:^(NSURLResponse *response, NSURL *filePath, NSError *error) {
            NSString *documentsDirectory = [[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject] stringByAppendingFormat:@"/%@",updatepath];
            [[NSUserDefaults standardUserDefaults] setObject:version forKey:moduleId];
            _newWWWFloderUrl = [NSURL fileURLWithPath:[documentsDirectory stringByAppendingString:@"/index.html"]];
            [SSZipArchive unzipFileAtPath:[filePath path] toDestination:documentsDirectory delegate:self];
        }];
        [downloadTask resume];
    }
}

#pragma mark kvo
- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary *)change context:(void *)context
{
    if ([keyPath isEqualToString:@"fractionCompleted"] && [object isKindOfClass:[NSProgress class]]) {
        NSProgress *progress = (NSProgress *)object;
        NSLog(@"Progress is %f,and context = %@", progress.fractionCompleted,[NSString stringWithFormat:@"%@",context]);
    }
}

#pragma mark delegate 解压完成
- (void)zipArchiveDidUnzipArchiveAtPath:(NSString *)path zipInfo:(unz_global_info)zipInfo unzippedPath:(NSString *)unzippedPath {
    
    //删除临时zip文件
    NSFileManager *fileManager = [NSFileManager defaultManager];
    if ([fileManager fileExistsAtPath:_zipTempPath]) {
        NSError *err;
        [fileManager removeItemAtPath:_zipTempPath error:&err];
    }

    
    NSURLRequest* appReq = [NSURLRequest requestWithURL:_newWWWFloderUrl cachePolicy:NSURLRequestReloadIgnoringLocalCacheData timeoutInterval:20.0];
    //    [_webView loadRequest:appReq];
    [_alertView dismissWithClickedButtonIndex:0 animated:YES];
}



@end
