package com.hand.hotpatch;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.preference.PreferenceManager;

/**
 * Created by panx on 2017/2/28.
 */
public class VersionManager {

  private String patchAppVersionKey = "patchAppVersion";
  private Context context;

  public VersionManager(Context context) {
    this.context = context;
  }

  public void saveCurrentVersion() {
    String currentVersion = getCurrentVersion();
    SharedPreferences mSharedPreferences = PreferenceManager
      .getDefaultSharedPreferences(context);
    SharedPreferences.Editor editor = mSharedPreferences.edit();
    editor.putString(patchAppVersionKey,currentVersion);
    editor.commit();
  }

  public String getSaveVersion() {
    String saveVersion = "";
    SharedPreferences sharedPreferences = PreferenceManager
      .getDefaultSharedPreferences(context);
    saveVersion = sharedPreferences.getString(patchAppVersionKey, "0.0.0");
    return saveVersion;
  }

  public String getCurrentVersion() {
    String currentVersion = "";
    try {
      PackageManager pm = context.getPackageManager();
      PackageInfo packageInfo = pm.getPackageInfo(context.getPackageName(), 0);
      currentVersion = packageInfo.versionName;
      return currentVersion;
    } catch (PackageManager.NameNotFoundException e) {
      e.printStackTrace();
      return null;
    }
  }


}
