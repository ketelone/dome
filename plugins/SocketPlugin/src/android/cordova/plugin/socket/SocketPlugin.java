package cordova.plugin.socket;

import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.widget.Toast;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.Socket;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Executor;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class SocketPlugin extends CordovaPlugin {

    private static final String TAG = "SocketPlugin";

    private TcpSocketReceiveListener receiveListener;

    private Map<String, TcpSocket> mapSocket;

    private ExecutorService service;

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (service == null) {
            service = Executors.newCachedThreadPool();
        }
        Log.d(TAG, "execute: action=" + action + " args=" + args.toString());
        if ("udpBroadcast".equals(action)) {
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


    private String getCode(int code) {
        JSONObject err = new JSONObject();
        try {
            err.put("code", code);
        } catch (JSONException e) {
            return "{\"code\":-1}";
        }
        return err.toString();
    }

    private void udpBroadcast(final JSONArray args, final CallbackContext callbackContext) {
        try {
            Log.d(TAG, "tcpConnect: args = " + args.toString());
            JSONObject object = args.optJSONObject(0);
            JSONObject value = object.getJSONObject("value");
            String ipBroad = object.getString("ip");
            final int port = object.getInt("port");
            String ipLocal = AppUtil.getIPAddress(cordova.getActivity().getApplicationContext());
            int timeout = object.getInt("timeout");
            final JSONArray arr = new JSONArray();
            fixUdpTimeout(timeout, callbackContext, arr, port);
            UDPBroadCast.getInstance(port).sendUDPBroadCast(value.toString(), ipBroad);
            UDPBroadCast.getInstance(port).getUDPBroadCastResponse(ipLocal, new UDPBroadCastCallBack() {
                @Override
                public void UDPResponse(String response) {
                    try {
                        arr.put(new JSONObject(response));
                    } catch (JSONException ignored) {
                    }

                }
            });
        } catch (Exception ex) {
            callbackContext.error(getCode(0x00));
        }
    }

    private void fixUdpTimeout(final int timeout, final CallbackContext callbackContext, final JSONArray data, final int port) {
        service.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(timeout);
                } catch (InterruptedException e) {

                }
                UDPBroadCast.getInstance(port).stopUDPBroadCast();
                callbackContext.success(data);
            }
        });
    }

    private int defTcpPort = 5037;
    private void tcpConnect(JSONArray args, final CallbackContext callbackContext) {

        try{
            Log.d(TAG, "tcpConnect: args = " + args.toString());
            TcpSocket  socket =null;
            JSONObject object = args.optJSONObject(0);
            String ip = object.optString("ip");
            String port = object.optString("port");
            int p = -1;
            if(port!=null){
                p = Integer.parseInt(port);
            }else {
                p = defTcpPort;
            }

            if(mapSocket == null){
                mapSocket = new HashMap<String, TcpSocket>();
                receiveListener = new TcpSocketReceiveListener();
            }
            socket = mapSocket.get(ip);
            if(socket!=null){
                callbackContext.success(0x00);
            }else {
                socket = new TcpSocket(receiveListener, service);
                mapSocket.put(ip,socket);
                socket.connect(ip, p);
            }

        }catch (Exception ex){
            ex.printStackTrace();
            callbackContext.error(0x00);
        }
    }

    private void tcpSendCmd(JSONArray args, CallbackContext callbackContext) {
        Log.d(TAG, "tcpSocket: args=" + args.toString());
        try {
            JSONObject obj = args.getJSONObject(0);
            JSONObject value = obj.getJSONObject("value");
            String ip =  obj.getString("ip");
            if(mapSocket!=null&&mapSocket.get(ip)!=null){
                mapSocket.get(ip).send(value.toString());
                callbackContext.success(getCode(0));
            }else {
                throw new Exception();
            }
        } catch (Exception ex) {
            callbackContext.error(getCode(0x06));
        }
    }

    private void tcpCLose(JSONArray args, CallbackContext callbackContext) {
        try {
            Log.d(TAG, "tcpCLose: "+args.toString());
            JSONObject jsonObject = args.getJSONObject(0);
            String ip = jsonObject.getString("ip");
            TcpSocket tcpSocket = mapSocket.get(ip);
            Toast.makeText(cordova.getActivity(), tcpSocket==null?"null":ip, Toast.LENGTH_SHORT).show();
            if(tcpSocket!=null){
                tcpSocket.close();
                mapSocket.remove(ip);
                callbackContext.success(getCode(0));
            }else {
                callbackContext.error(getCode(1));
            }
        }catch (Exception e){
            callbackContext.error(0x01);
        }
    }

    private void getTcpStatus(JSONArray args, CallbackContext callbackContext) {
        callbackContext.success(0);
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

    private void sendDataUpdate(String info) {
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
        super.onDestroy();
        if(mapSocket !=null){
            for (TcpSocket t: mapSocket.values()){
                if(!t.isClosed()){
                    t.close();
                }
            }
            mapSocket.clear();
            mapSocket =null;
        }
        sendStatusUpdate(getCode(0x00));
    }
}