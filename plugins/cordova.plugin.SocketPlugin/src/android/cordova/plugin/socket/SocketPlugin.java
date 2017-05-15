package cordova.plugin.socket;

import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.ServiceConnection;
import android.os.Handler;
import android.os.IBinder;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;
import android.widget.Toast;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class SocketPlugin extends CordovaPlugin {
    private static final String SOCKET_RESULT = "com.socket.status";

    private static final String TAG = "SocketPlugin";

    private CallbackContext mCallbackContext;

    private TcpSocketService mService;

    private LocalBroadcastManager mLocalBroadcastManager;

    private BroadcastReceiver localBroadcastReceiver;
    private ServiceConnection conn = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            TcpSocketService.LocalBinder binder = (TcpSocketService.LocalBinder) service;
            mService = binder.getService();
        }

        @Override
        public void onServiceDisconnected(ComponentName name) {
            mService = null;
        }
    };

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        mLocalBroadcastManager = LocalBroadcastManager.getInstance(cordova.getActivity().getApplicationContext());
        if(localBroadcastReceiver == null){
            localBroadcastReceiver = new BroadcastReceiver() {
                @Override
                public void onReceive(Context context, Intent intent) {
                    String type = intent.getStringExtra("TYPE");
                    String data = intent.getStringExtra("DATA");
                    if ("STATUS".equals(type)) {
                        sendStatusUpdate(data);
                    } else if ("DATA".equals(type)) {
                        sendDataUpdate(data);
                    }
                }
            };
        }
        mLocalBroadcastManager.registerReceiver(localBroadcastReceiver, new IntentFilter(SOCKET_RESULT));
        //初始化
        final Intent intent = new Intent(cordova.getActivity(),TcpSocketService.class);
        //绑定Service
        cordova.getActivity().bindService(intent, conn, Service.BIND_AUTO_CREATE);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        mCallbackContext = callbackContext;
        Log.d(TAG, "execute: action=" + action + " args=" + args.toString());
        if ("udpBroadCast".equals(action)) {
            udpBroadcast(args, callbackContext);
        } else if ("tcpConnect".equals(action)) {
            tcpConnect(args, callbackContext);
        } else if ("tcpSendCmd".equals(action)) {
            tcpSendCmd(args, callbackContext);
        } else if ("getTcpStatus".equals(action)) {
            getTcpStatus(args, callbackContext);
        } else if ("tcpClose".equals(action)) {
            tcpCLose(args, callbackContext);
        } else {
            callbackContext.error(getCode(0x01));
            return false;
        }
        return true;
    }

    private int udpPort = 5037;

    private void udpBroadcast(final JSONArray args, final CallbackContext callbackContext) {
        try {
            Log.d(TAG, "tcpConnect: args = " + args.toString());
            JSONObject object = args.optJSONObject(0);
            JSONArray value = object.getJSONArray("value");
            String ipBroad = object.getString("ip");
            udpPort = object.optInt("port");
            if (udpPort == 0) {
                udpPort = 5037;
            }
            String ipLocal = AppUtil.getIPAddress(cordova.getActivity().getApplicationContext());
            int timeout = object.getInt("timeout");
            final JSONArray arr = new JSONArray();
            new Handler().postDelayed(new Runnable() {
                @Override
                public void run() {
                    UDPBroadCast.getInstance(udpPort).stopUDPBroadCast();
                    callbackContext.success(arr);
                }
            }, timeout);
            UDPBroadCast.getInstance(udpPort).sendUDPBroadCast(value.toString(), ipBroad);
            UDPBroadCast.getInstance(udpPort).getUDPBroadCastResponse(ipLocal, new UDPBroadCastCallBack() {
                @Override
                public void UDPResponse(String response) {
                    try {
                        arr.put(new JSONArray(response.replace("\\/n", "")));
                    } catch (JSONException ignored) {
                        Log.i("ERROR", ignored.toString());
                    }

                }
            });
        } catch (Exception ex) {
            callbackContext.error(getCode(0x00));
        }
    }

    private void tcpConnect(JSONArray args, final CallbackContext callbackContext) {
        mService.tcpConnect(args, callbackContext);
    }

    private void tcpSendCmd(JSONArray args, CallbackContext callbackContext) {
        mService.tcpSendCmd(args, callbackContext);
    }

    private void tcpCLose(JSONArray args, CallbackContext callbackContext) {
        mService.tcpCLose(args, callbackContext);
    }

    private void getTcpStatus(JSONArray args, CallbackContext callbackContext) {
        callbackContext.success(0);
    }

    private void sendDataUpdate(String info) {
        if (info != null && !info.isEmpty() && info.contains("Who are you")) {
            mCallbackContext.success();
        }
        final String data = String.format("cordova.fireDocumentEvent('SocketPlugin.receiveTcpData',%s)", info);
        cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                webView.loadUrl("javascript:" + data);
            }
        });
    }

    private void sendStatusUpdate(String info) {
        final String data = String.format("cordova.fireDocumentEvent('SocketPlugin.receiveTcpStatus',%s)", info);
        cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                webView.loadUrl("javascript:" + data);
            }
        });
    }

    @Override
    public void onDestroy() {
        if (localBroadcastReceiver != null && mLocalBroadcastManager != null) {
            mLocalBroadcastManager.unregisterReceiver(localBroadcastReceiver);
        }
        cordova.getActivity().unbindService(conn);
        super.onDestroy();
    }

    private String getCode(int code) {
        JSONObject err = new JSONObject();
        try {
            err.put("code", code);
        } catch (JSONException e) {
            return "{\"code\":-1}";
        }
        return err.toString();
    }

}