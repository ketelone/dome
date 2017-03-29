package com.hand.sql;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

/**
 * Created by panx on 2017/2/28.
 */
public class ModuleDB {
  private DBHelper dbHelper;

  public ModuleDB(Context context) {
    dbHelper = new DBHelper(context);
  }

  public void addModule(String moduleId, String version) {
    if(moduleId==null || version == null){
      return;
    }
    SQLiteDatabase db = dbHelper.getWritableDatabase();
    String sql = "replace into t_module values(?,?)";
    db.execSQL(sql, new Object[]{moduleId, version});
    db.close();
  }

  public String getModuleVersionByID(String moduleId) {
    if(moduleId == null){
      return null;
    }
    String version = null;
    SQLiteDatabase db = dbHelper.getReadableDatabase();
    String sql = "select version from t_module where moduleId= '"+moduleId+"'";
    Cursor cursor = db.rawQuery(sql,null);
    while (cursor.moveToNext()){
      version = cursor.getString(cursor.getColumnIndex("version"));
    }
    cursor.close();
    db.close();
    return version;
  }
}
