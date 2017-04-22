package cordova.plugin.socket;

import java.io.*;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.SocketAddress;
import java.util.concurrent.ExecutorService;

/**
 * Created by oliver on 17-4-20.
 */
public class TcpSocket {
    private boolean isConnected = false;
    private ISocketCallback callback;
    private Socket socket;
    private InetSocketAddress address;
    private BufferedReader reader;
    private OutputStream out ;

    public TcpSocket(String ip, int port) {
        if (address == null) {
            address = new InetSocketAddress(ip, port);
        }
    }

    public boolean connect(int timeout) {
        close();
        socket = new Socket();
        try {
            socket.connect(address);
            isConnected = true;
            out = socket.getOutputStream();
            reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            return true;
        } catch (IOException e) {}

        return false;
    }

    public void setCallback(ISocketCallback callback) {
        this.callback = callback;
    }

    public boolean send(String data) {
        try {
            if(out != null){
                out.write(data.getBytes());
                out.flush();
                return true;
            }
        } catch (IOException ignored) {
        }
        reconnect();
        return false;
    }

    public void receive()  {
        while (true) {
            String data = null;
            try {
                if(reader == null){
                    break;
                }
                data = reader.readLine();
                if (data != null && !"".equals(data)) {
                    onReceived(data);
                }
            } catch (IOException e) {
                break;
            }
        }
        isConnected = false;
        System.err.println("close");
    }

    private void onReceived(String data) {
        if (callback != null) {
            callback.onReceived(address.getHostString(), data);
        }
    }

    private void onReconnected() {
        if (callback != null) {
            callback.onReconnected(address.getHostString());
        }
    }

    private void onReconnectFailed() {
        if (callback != null) {
            callback.onReconnectFailed(address.getHostString());
        }
    }

    public boolean isConnected() {
        return isConnected;
    }

    private boolean reconnect() {
        for (int i = 0; i < 3; i++) {
            boolean connect = connect(3000);
            System.out.println("Start connecting... " + connect);
            if (connect) {
                onReconnected();
                return true;
            }
        }
        onReconnectFailed();
        return false;
    }

    public void close() {
        if(reader!=null){
            try {
                reader.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            reader = null;
        }

        if(out!=null){
            try {
                out.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            out = null;
        }
            if(socket!=null&&!socket.isClosed()){

                try {
                    socket.close();
                } catch (IOException e) {

                }
            }
            socket = null;
    }

}

