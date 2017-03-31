package com.hand.platform;

import android.content.Context;

import android.util.Log;
import android.widget.Toast;

import com.hand.bean.ModuleBean;
import com.hand.bean.ModuleBeanBiz;
import com.hand.hotpatch.DownLoadTask;
import com.hand.hotpatch.VersionManager;
import com.hand.sql.ModuleDB;
import com.handmobile.cordova.hotpatch.PluginUtil;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaActivity;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.lang.reflect.Field;
import java.util.ArrayList;

/**
 * Created by panx on 2017/2/27.
 */
public class LocalPagePlugin extends CordovaPlugin {

  private final static String UPDATE_LOCAL_PAGE = "updateLocalPage";
  private final static String OPEN_PAGE = "openPage";
  private final static String LOCAL_URL = "localUrl";
  private CordovaWebView webView;
  private Context context;
  private CallbackContext callbackContext;
  private VersionManager versionManager;

  @Override
  public void initialize(CordovaInterface cordova, CordovaWebView webView) {
    super.initialize(cordova, webView);
    this.webView = webView;
    this.context = cordova.getActivity();
    versionManager = new VersionManager(context);
    String saveVersion = versionManager.getSaveVersion();
    String currentVersion = versionManager.getCurrentVersion();
    Log.e("Save-currentVersion", saveVersion + "--" + currentVersion);
    //判断版本号大小
    if (saveVersion.compareTo(currentVersion) < 0) {
      String mFilePath = webView.getContext().getFilesDir().toString().concat("/www");
      File file = new File(mFilePath);
      if (file.exists()) {
        boolean result = deleteDir(file);
        if (!result) {
          Toast.makeText(context,"部分旧版本数据删除失败",Toast.LENGTH_SHORT).show();
        }
      }
    }

    String targetFilePath = webView.getContext().getFilesDir().toString().concat("/www/index.html");
    File targetFile = new File(targetFilePath);
    if (targetFile.exists()) {
      Class userCla = (Class) CordovaActivity.class;
      Field[] fs = userCla.getDeclaredFields();

      for (int i = 0; i < fs.length; i++) {
        Field f = fs[i];
        if (f.getName().equals("launchUrl")) {
          try {
            f.setAccessible(true); //设置些属性是可以访问的
            f.set(cordova.getActivity(), "file://".concat(targetFilePath));
          } catch (IllegalAccessException e) {
            e.printStackTrace();
          }
        }
      }
    }

  }

  private boolean deleteDir(File dir) {
    if (dir.isDirectory()) {
      String[] children = dir.list();
      //递归删除目录中的子目录下
      for (int i = 0; i < children.length; i++) {
        boolean success = deleteDir(new File(dir, children[i]));
        if (!success) {
          return false;
        }
      }
    }
    // 目录此时为空，可以删除
    return dir.delete();
  }

  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    Log.e("LocalPagePlugin", args.toString());
    this.callbackContext = callbackContext;
    if (UPDATE_LOCAL_PAGE.equals(action)) {
      updateLocalPage(args);
      return true;
    } else if (OPEN_PAGE.equals(action)) {
      openPage(args);
      return true;
    }
    return false;
  }

  private void updateLocalPage(JSONArray args) {
    ModuleBeanBiz moduleBeanBiz = new ModuleBeanBiz();
    ArrayList<ModuleBean> modules = moduleBeanBiz.getModuleListFromJSON(args);
    if (modules != null) {
      for (int i = 0; i < modules.size(); i++) {
        DownLoadTask downLoadTask = new DownLoadTask(cordova.getActivity(), webView, modules.get(i));
        downLoadTask.execute(modules.get(i).getDownloadUrl());
      }
    } else {
      callbackContext.error("wrong arguments");
      return;
    }
  }

  private void openPage(JSONArray args) {

    try {
      JSONObject argsObject = args.getJSONObject(0);
      String localUrl = argsObject.getString(LOCAL_URL);
      String moduleId = argsObject.getString("moduleId");
      String argsVersion = argsObject.getString("version");
      ModuleDB moduleDB = new ModuleDB(context);
      String saveVersion = moduleDB.getModuleVersionByID(moduleId);
      if(saveVersion.compareTo(argsVersion)!=0){
        callbackContext.error("本地版本与请求版本不匹配，local version：" + saveVersion);
        return;
      }
      webView.loadUrlIntoView("file://".concat(context.getFilesDir().getPath()).concat(localUrl), false);
    } catch (JSONException e) {
      e.printStackTrace();
      Toast.makeText(cordova.getActivity(), e.getMessage(), Toast.LENGTH_SHORT).show();
    }
  }
}
