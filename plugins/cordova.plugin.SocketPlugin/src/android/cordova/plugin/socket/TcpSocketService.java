package cordova.plugin.socket;

import android.app.Service;
import android.content.Intent;
import android.os.Binder;
import android.os.IBinder;
import android.support.annotation.Nullable;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Created by xiang.wang on 2017/5/12.
 */

public class TcpSocketService extends Service {
    private static final String SOCKET_RESULT = "com.socket.status";
    private static final String TAG = "TcpSocketService";
    private Map<String, TcpSocket> mapSocket;
    private ExecutorService threadPool;
    private LocalBinder binder = new LocalBinder();
    private LocalBroadcastManager mLocalBroadcastManager;
    private TcpSocketReceiveListener receiveListener;

    public class LocalBinder extends Binder {
        // 声明一个方法 getService（提供给客户端调用）
        TcpSocketService getService() {
            // 返回当前对象LocalService,这样我们就可在客户端端调用Service的公共方法了
            return TcpSocketService.this;
        }
    }

    @Override
    public void onCreate() {
        super.onCreate();
        mapSocket = new HashMap<String, TcpSocket>();
        mLocalBroadcastManager = LocalBroadcastManager.getInstance(this);
        threadPool = Executors.newCachedThreadPool();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return binder;
    }

    @Override
    public boolean onUnbind(Intent intent) {
        //解除绑定
        return super.onUnbind(intent);
    }

    @Override
    public void onDestroy() {
        if (mapSocket != null) {
            for (TcpSocket t : mapSocket.values()) {
                if (!t.isClosed()) {
                    t.close();
                }
            }
            mapSocket.clear();
            mapSocket = null;
        }
        sendStatusUpdate(getCode(0x00));
        try {
            threadPool.shutdownNow();
        } catch (Exception e) {

        }
        super.onDestroy();
    }

    private int defTcpPort = 5036;

    public void tcpConnect(JSONArray args, final CallbackContext callbackContext) {
        try {
            Log.d(TAG, "tcpConnect: args = " + args.toString());
            TcpSocket socket = null;
            JSONObject object = args.optJSONObject(0);
            String ip = object.optString("ip");
            String port = object.optString("port");
            int p = -1;
            if (port != null && !port.isEmpty()) {
                p = Integer.parseInt(port);
            } else {
                p = defTcpPort;
            }
            if (mapSocket == null) {
                mapSocket = new HashMap<String, TcpSocket>();
            }
            if (receiveListener == null) {
                receiveListener = new TcpSocketReceiveListener();
            }
            socket = mapSocket.get(ip);
            if (socket != null) {
                callbackContext.success(0x00);
            } else {
                socket = new TcpSocket(receiveListener, threadPool);
                mapSocket.put(ip, socket);
                socket.connect(ip, p);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            callbackContext.error(0x00);
        }
    }

    public void tcpSendCmd(JSONArray args, CallbackContext callbackContext) {
        try {
            JSONObject obj = args.getJSONObject(0);
            JSONArray value = obj.getJSONArray("value");
            String ip = obj.optString("ip");
            if (mapSocket != null && mapSocket.get(ip) != null) {
                mapSocket.get(ip).send(value.toString());
                callbackContext.success(getCode(0));
            } else {
                callbackContext.error(getCode(0x06));
                throw new Exception();
            }
        } catch (Exception ex) {
            callbackContext.error(getCode(0x06));
        }
    }

    public void tcpCLose(JSONArray args, CallbackContext callbackContext) {
        try {
            Log.d(TAG, "tcpCLose: " + args.toString());
            JSONObject jsonObject = args.getJSONObject(0);
            String ip = jsonObject.getString("ip");
            TcpSocket tcpSocket = null;
            if (mapSocket != null) {
                tcpSocket = mapSocket.get(ip);
            }
            if (tcpSocket != null) {
                tcpSocket.close();
                mapSocket.remove(ip);
                callbackContext.success(getCode(0));
            } else {
                callbackContext.error(getCode(1));
            }
        } catch (Exception e) {
            callbackContext.error(0x01);
        }
    }

    class TcpSocketReceiveListener implements ISocketCallback {

        @Override
        public void onConnected() {
            sendStatusUpdate(getCode(0x00));
        }

        @Override
        public void onReceived(String data) {
            sendDataUpdate(data);
        }

        @Override
        public void onDisconnected() {
            sendStatusUpdate(getCode(0x03));
        }

        @Override
        public void onError(Exception ex) {
            sendStatusUpdate(getCode(0x01));
        }
    }

    private void sendStatusUpdate(String code) {
        if(mLocalBroadcastManager == null){
            return;
        }
        Intent intent = new Intent(SOCKET_RESULT);
        intent.putExtra("TYPE", "STATUS");
        intent.putExtra("DATA", code);
        mLocalBroadcastManager.sendBroadcastSync(intent);
    }

    private void sendDataUpdate(String data) {
        if(mLocalBroadcastManager == null){
            return;
        }
        Intent intent = new Intent(SOCKET_RESULT);
        intent.putExtra("TYPE", "DATA");
        intent.putExtra("DATA", data);
        mLocalBroadcastManager.sendBroadcastSync(intent);
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
