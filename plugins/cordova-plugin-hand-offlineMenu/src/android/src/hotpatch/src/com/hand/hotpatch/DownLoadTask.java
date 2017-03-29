package com.hand.hotpatch;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.DialogInterface.OnKeyListener;
import android.os.AsyncTask;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.view.KeyEvent;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.hand.bean.ModuleBean;
import com.hand.sql.ModuleDB;

import org.apache.cordova.CordovaWebView;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;


public class DownLoadTask extends AsyncTask<String, String, Boolean> {

  private final static int TIME_OUT = 30 * 1000;
  private Context mContext;
  private ProgressDialog mProgressDialog;
  private ProgressBar mProgressBar;
  private TextView mPercent;
  private String mPercentString;
  private CordovaWebView webView;

  private String folderName;
  private ModuleBean module;
  private VersionManager versionManager;
  private ModuleDB moduleDB;

  private Handler mHandler = new Handler() {
    @Override
    public void handleMessage(Message msg) {
      super.handleMessage(msg);
      mPercent.setText(mPercentString);
    }
  };

  public DownLoadTask(Context context, CordovaWebView webView, ModuleBean module) {
    mContext = context;
    this.webView = webView;
    this.module = module;
    this.folderName = (module.getZipName().split("\\."))[0];
    mProgressDialog = new ProgressDialog(mContext);
    mProgressDialog.setProgress(0);
    mProgressDialog.setMax(100);
    mProgressDialog.setCancelable(false);
    mProgressDialog.show();

    mProgressDialog.setOnKeyListener(onKeyListener);
    mProgressDialog.setContentView(R.layout.progresslayout);
    mProgressBar = (ProgressBar) mProgressDialog.findViewById(R.id.progressBar1);
    mProgressBar.setProgress(0);
    mPercent = (TextView) mProgressDialog.findViewById(R.id.tv_percent);

    versionManager = new VersionManager(context);
    moduleDB = new ModuleDB(context);
  }


  @Override
  protected Boolean doInBackground(String... params) {
    if (params[0] != null) {

      String url = params[0];
      try {
        HttpURLConnection connection = null;
        URL u = new URL(url);
        connection = (HttpURLConnection) u.openConnection();
        connection.setDoInput(true);
        connection.setUseCaches(false);
        connection.setRequestMethod("GET");
        connection.setConnectTimeout(TIME_OUT);
        connection.connect();

        int lenghtOfFile = connection.getContentLength();
        InputStream input = new BufferedInputStream(
          connection.getInputStream());

        mContext.deleteFile(module.getZipName());
        OutputStream output = mContext.openFileOutput(module.getZipName(), Context.MODE_PRIVATE);
        byte data[] = new byte[1024 * 20];
        long total = 0;
        int count;
        while ((count = input.read(data)) != -1) {
          total += count;
          output.write(data, 0, count);
          publishProgress(String.valueOf((total * 100) / lenghtOfFile));
        }
        output.flush();
        output.close();
        input.close();

        mContext.deleteFile(folderName);
        ZipUtil.UnZipFolder(mContext.getFileStreamPath(module.getZipName()).toString(),
          mContext.getFilesDir().toString().concat(module.getUnZipPath()).concat("/"));
        if (module.getZipName() != null && module.getZipName().equals("www.zip") && module.getUnZipPath().equals("")) {
          versionManager.saveCurrentVersion();
        }
        moduleDB.addModule(module.getModuleId(), module.getVersion());
      } catch (MalformedURLException e) {
        e.printStackTrace();
        return false;
      } catch (IOException e) {

        e.printStackTrace();
        return false;
      } catch (Exception e) {
        e.printStackTrace();
        return false;
      }
    } else {
      return false;
    }
    return true;
  }

  @Override
  protected void onProgressUpdate(String... values) {
    // TODO Auto-generated method stub
    super.onProgressUpdate(values);
    mProgressDialog.setProgress(Integer.parseInt(values[0]));
    mProgressBar.setProgress(Integer.parseInt(values[0]));
    mPercentString = values[0] + "%";
    mHandler.sendEmptyMessage(100);
    //mPercent.setText(values[0]+"%");
  }

  @Override
  protected void onPostExecute(Boolean result) {
    // TODO Auto-generated method stub
    super.onPostExecute(result);

    if (mProgressDialog != null && mProgressDialog.isShowing()) {
      mProgressDialog.dismiss();
    }
    if (true) {
      new Handler().postDelayed(new Runnable() {
        public void run() {
          webView.clearHistory();
          webView.clearCache();
        }
      }, 0);
      // webView.loadUrlIntoView("file://".concat(mContext.getFilesDir().getPath()).concat("/"+folderName+"/"+indexName),false);
    } else {
    }

  }


  ///////////////////
  private OnKeyListener onKeyListener = new OnKeyListener() {
    @Override
    public boolean onKey(DialogInterface dialog, int keyCode, KeyEvent event) {
      if (keyCode == KeyEvent.KEYCODE_BACK && event.getAction() == KeyEvent.ACTION_DOWN) {
        mProgressDialog.dismiss();
      }
      return false;
    }
  };

}
