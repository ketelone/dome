package cordova.plugin.socket;

import android.os.Bundle;
import android.os.Handler;
import android.os.HandlerThread;
import android.os.Looper;
import android.os.Message;
import android.util.Log;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.SocketException;
import java.util.List;
import java.util.concurrent.ExecutorService;

/**
 * Created by Oliver on 2017/3/21.
 */
public class TcpSocket {
    private static final int TCPSOCKET_MESSAGE = 0x1000;
    private Socket tcp;
    private boolean flagReceive = true;
    private BufferedReader reader;
    protected ISocketCallback callback;
    boolean hasSent = false;

    protected ExecutorService service;
    protected String ip;
    protected int port;
    private ServiceHandler mSenderServiceHandler;
    private Looper mSenderServiceLooper;

    public TcpSocket(ISocketCallback c, ExecutorService service) {
        this.callback = c;
        this.service = service;
        HandlerThread senderThread = new HandlerThread("sender_service");
        senderThread.start();
        mSenderServiceLooper = senderThread.getLooper();
        mSenderServiceHandler = new ServiceHandler(mSenderServiceLooper, this);
    }

    public void setCallback(ISocketCallback callback) {
        this.callback = callback;
    }

    public void connect(final String ip, final int port) {
        this.ip = ip;
        this.port = port;
        if (tcp == null) {
            try {
                tcp = new Socket(ip, port);
                service.execute(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            reader = new BufferedReader(new InputStreamReader(tcp.getInputStream()));
                            callback.onConnected();
                        } catch (IOException e1) {
                            e1.printStackTrace();
                        }

                        receive();
                    }
                });
            } catch (IOException e) {
                callback.onError(e);
                return;
            }

        } else {
            if (!tcp.isClosed()) {
                try {
                    tcp.close(); //重连
                } catch (IOException e) {
                    callback.onError(e);
                }

            }
            if (tcp.isClosed()) {
                InetSocketAddress address = new InetSocketAddress(ip, port);
                try {
                    tcp.connect(address);
                    callback.onConnected();
                } catch (IOException e) {
                    callback.onError(e);
                }
            }
        }
    }

    public void disconnect() {
        if (tcp != null && !tcp.isClosed() && tcp.isConnected()) {
            try {
                tcp.close();
                callback.onDisconnected();
            } catch (IOException e) {
                callback.onError(e);
            }
            if (mSenderServiceHandler != null) {
                mSenderServiceHandler.removeCallbacksAndMessages(null);
                mSenderServiceHandler = null;
            }
        }
    }


    public void send(final String data) {
        Message msg = new Message();
        msg.what = TCPSOCKET_MESSAGE;
        Bundle bundle = new Bundle();
        bundle.putString("data", data);
        msg.setData(bundle);
        if (mSenderServiceHandler != null) {
            mSenderServiceHandler.handleMessage(msg);
        }
    }

    private void sendMessage(final String data) {
        if (service != null) {
            try {
                OutputStream outputStream = tcp.getOutputStream();
                if (outputStream != null) {
                    outputStream.write(data.getBytes());
                    outputStream.flush();
                    Log.d("TcpSocket", "Send --- >" + data);
                }
            } catch (IOException e) {
                callback.onError(e);
            }
        }
    }

    public void receive() {
        try {
            tcp.setSoTimeout(200);
        } catch (SocketException e) {
            e.printStackTrace();
        }
        while (flagReceive) {
            try {
                if (reader == null) {
                    continue;
                }
                String data = reader.readLine();
                hasSent = false;
                if (callback != null && data != null) {
                    callback.onReceived(data);
                }
            } catch (IOException e) {
                //    callback.onError(e);
            }
        }
    }

    public boolean isClosed() {
        return tcp != null && tcp.isClosed();
    }


    public void close() {
        flagReceive = false;
        disconnect();
        tcp = null;
    }

    class ServiceHandler extends Handler {
        private TcpSocket s;

        public ServiceHandler() {

        }

        public ServiceHandler(Looper looper, TcpSocket socket) {
            super(looper);
            s = socket;
        }

        @Override
        public void handleMessage(Message msg) {
            if (msg == null || msg.what != TCPSOCKET_MESSAGE) {
                return;
            }
            Bundle bundle = msg.getData();
            if (bundle == null) {
                return;
            }
            String data = bundle.getString("data");
            if (data == null || data.isEmpty()) {
                return;
            }
            try {
                Thread.sleep(200);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            if (s == null) {
                return;
            }
            s.sendMessage(data);
        }
    }


}
