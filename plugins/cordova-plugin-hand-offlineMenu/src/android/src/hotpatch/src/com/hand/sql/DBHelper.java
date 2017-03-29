package com.hand.sql;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

/**
 * Created by panx on 2017/2/28.
 */
public class DBHelper extends SQLiteOpenHelper {
  private final static String DATABASE_NAME = "ModuleDB.db";
  private final static int DATABASE_VERSION = 1;

  public DBHelper(Context context) {
    super(context, DATABASE_NAME, null, DATABASE_VERSION);
  }

  @Override
  public void onCreate(SQLiteDatabase sqLiteDatabase) {
    String sql = "Create table t_module (moduleId varchar primary key, version varchar(10) )";
    sqLiteDatabase.execSQL(sql);
  }

  @Override
  public void onUpgrade(SQLiteDatabase sqLiteDatabase, int i, int i1) {

  }
}
