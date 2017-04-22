package cordova.plugin.socket;

import android.util.Log;
import android.widget.Toast;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class SocketPlugin extends CordovaPlugin {

    private static final String TAG = "SocketPlugin";

    private TcpSocketReceiveListener receiveListener;

    private Map<String, TcpSocket> mapSocket;

    private  ExecutorService service ;
    private static final int defUdpPort  = 5037;
    private static final int defTcpPort = 5036;

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        init();
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
            callbackContext.error(getCode(-1));
            return false;
        }
        return true;
    }


    private String getCode(int code) {
        JSONObject err = new JSONObject();
        try {
            err.put("code", code);
        } catch (JSONException ignored) {}
        return err.toString();
    }


    private void udpBroadcast(final JSONArray args, final CallbackContext callbackContext) {
        try {
            Log.d(TAG, "udpBroadcast: args = "+args.toString());
            JSONObject object = args.optJSONObject(0);
            JSONObject value = object.getJSONObject("value");
            String ipBroad = object.getString("ip");
            int port = object.optInt("port",defUdpPort);
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
                    } catch (JSONException ignored) {}
                }
            });
        } catch (Exception ex) {
            Log.e(TAG, "udpBroadcast: error",ex );
            callbackContext.error(getCode(1));
        }
    }

    /**
     * 处理延时timeout再回调数据
     * @param timeout 延时
     */
    private void fixUdpTimeout(final int timeout, final CallbackContext callbackContext, final JSONArray data, final int port) {
        service.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(timeout);
                } catch (InterruptedException ignored) {}
                callbackContext.success(data);
                UDPBroadCast.getInstance(port).stopUDPBroadCast();
            }
        });
    }

    private void init(){
        if(mapSocket == null){
            mapSocket = SocketManager.getInstance().getSocketMap();
        }
        if(service == null){
            service = SocketManager.getInstance().getService();
        }
        if(receiveListener == null){
            receiveListener = new TcpSocketReceiveListener();
        }
    }

    private void tcpConnect(JSONArray args, final CallbackContext callbackContext) {
        try{
            Log.d(TAG, "tcpConnect: args = "+args.toString());
            JSONObject object = args.optJSONObject(0);
            final String ip = object.getString("ip");
            int port = object.optInt("port",defTcpPort);
            final int timeout = object.optInt("timeout",2000);
            TcpSocket socket  = mapSocket.get(ip);

            if(socket!=null){
                SocketManager.getInstance().close(ip);
            }
            socket = new TcpSocket(ip,port);
            socket.setCallback(receiveListener);
            final TcpSocket finalSocket = socket;
            service.execute(new Runnable() {
                @Override
                public void run() {
                    boolean success = finalSocket.connect(timeout);
                    if(success){
                        mapSocket.put(ip,finalSocket);
                        callbackContext.success(getCode(0));
                        service.execute(new Runnable() {
                            @Override
                            public void run() {
                                finalSocket.receive();
                            }
                        });

                    }else {
                        callbackContext.error(getCode(1));
                    }
                }
            });

        }catch (Exception ex){
            Log.e(TAG, "tcpConnect: ",ex );
            callbackContext.error(getCode(1));
        }
    }

    private void tcpSendCmd(JSONArray args, final CallbackContext callbackContext) {
        try {
            Log.d(TAG, "tcpSendCmd: args = "+args.toString());
            JSONObject obj = args.getJSONObject(0);
            final JSONObject value = obj.getJSONObject("value");
            final String ip =  obj.getString("ip");
//            final String ip =  obj.optString("ip","192.168.1.172");
            if(mapSocket!=null&&mapSocket.get(ip)!=null){
                service.execute(new Runnable() {
                    @Override
                    public void run() {
                        boolean success = mapSocket.get(ip).send(value.toString());
                        if(success){
                            callbackContext.success(getCode(0));
                        }else {
                            callbackContext.error(getCode(1));
                        }
                    }
                });
            }else {
                throw new Exception();
            }
        } catch (Exception ex) {
            callbackContext.error(getCode(1));
        }
    }

    private void tcpCLose(JSONArray args, CallbackContext callbackContext) {
        try {
            Log.d(TAG, "tcpCLose: args = "+args.toString());
            JSONObject jsonObject = args.getJSONObject(0);
            boolean closeAll = jsonObject.getBoolean("closeAll");
            if(!closeAll){
                String ip = jsonObject.getString("ip");
                TcpSocket tcpSocket = mapSocket.get(ip);
                if(tcpSocket!=null){
                    SocketManager.getInstance().close(ip);
                }
                callbackContext.success(getCode(0));
            }else {
                SocketManager.getInstance().closeAll();
                callbackContext.success(getCode(0));
            }
        }catch (Exception e){
            callbackContext.error(getCode(1));
        }
    }

    private void getTcpStatus(JSONArray args, CallbackContext callbackContext) {
        try {
            Log.d(TAG, "getTcpStatus: args = "+args.toString());
            JSONObject object = args.getJSONObject(0);
            String ip = object.getString("ip");
            boolean status = mapSocket.get(ip).isConnected();
            JSONObject out = new JSONObject();
            out.put("code",0);
            out.put("status",status);
            callbackContext.success(out.toString());
        }catch (Exception ex){
            callbackContext.error(getCode(1));
        }
    }

    private class TcpSocketReceiveListener implements ISocketCallback {


        @Override
        public void onReceived(String ip,String data) {
            Log.d(TAG, "onReceived: "+data );
            fireDocumentEvent("SocketPlugin.receiveTcpData",data);
        }

        @Override
        public void onReconnected(final String ip) {
            service.execute(new Runnable() {
                @Override
                public void run() {
                    mapSocket.get(ip).receive();
                }
            });
            JSONObject out = new JSONObject();
            try {
                out.put("ip",ip);
                out.put("code",0);
            } catch (JSONException ignored) {}
            fireDocumentEvent("SocketPlugin.receiveTcpStatus",out.toString());

        }

        @Override
        public void onReconnectFailed(String ip) {
            JSONObject out = new JSONObject();
            try {
                out.put("ip",ip);
                out.put("code",1);
            } catch (JSONException ignored) {}
            fireDocumentEvent("SocketPlugin.receiveTcpStatus",out.toString());
        }
    }

    private void fireDocumentEvent(String name,String info){
        final String data = String.format("cordova.fireDocumentEvent('%s',%s)",name, info);
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
        SocketManager.getInstance().closeAll();
    }


}