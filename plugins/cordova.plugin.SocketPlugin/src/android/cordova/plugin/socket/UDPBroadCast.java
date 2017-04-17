
package cordova.plugin.socket;

import android.util.Log;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * UDP广播工具
 * @author xiang.wang
 */
public class UDPBroadCast {
    private static String TAG = "UDPBroadCast";
    private static final int MAX_DATA_PACKET_LENGTH = 256;
    private static final int MAX_DATA_RECEV_LENGTH = 256;
    private static volatile DatagramSocket udpSocket;

    /**
     * 接收广播控制标志位
     */
    private boolean GET_BROADCAST_FLAG = true;
    private ExecutorService mThreadPool = Executors.newFixedThreadPool(2);
    private static volatile UDPBroadCast mUDPBroadCast;
    private static volatile int PROT;
    private UDPBroadCast() {}

    public static UDPBroadCast getInstance(int prot) {
        PROT = prot;
        if (mUDPBroadCast == null) {
            synchronized (UDPBroadCast.class) {
                if (mUDPBroadCast == null) {
                    try {
                        udpSocket = new DatagramSocket(PROT);
                    } catch (SocketException e) {
                        e.printStackTrace();
                    }
                    mUDPBroadCast = new UDPBroadCast();
                }
            }
        }
        return mUDPBroadCast;
    }

    /**
     * 发送UDP广播
     * @author xiang.wang
     * @param dataStr-广播内容
     * @param intentAddr-广播发送的网段范围
     */
    public void sendUDPBroadCast(String dataStr,String intentAddr){
        byte[] sendbuffer = new byte[MAX_DATA_PACKET_LENGTH];
        final DatagramPacket dataPacket = new DatagramPacket(
                sendbuffer, MAX_DATA_PACKET_LENGTH);
        try {
            byte[] data = dataStr.getBytes();
            dataPacket.setData(data);
            dataPacket.setLength(data.length);
            dataPacket.setPort(PROT);
            InetAddress broadcastAddr;
            broadcastAddr = InetAddress.getByName(intentAddr);
            dataPacket.setAddress(broadcastAddr);
            if(mThreadPool.isShutdown()){
                return;
            }
            mThreadPool.execute(new Runnable() {
                @Override
                public void run() {
                    try {
                        if(udpSocket == null){
                            try {
                                udpSocket = new DatagramSocket(PROT);
                            } catch (SocketException e) {
                            }
                        }
                        if(udpSocket==null||udpSocket.isClosed()){
                            return;
                        }
                        udpSocket.send(dataPacket);// 发送广播
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            });
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
    }

    public void getUDPBroadCastResponse(final String mIP,final UDPBroadCastCallBack mCallBack) {
        GET_BROADCAST_FLAG = true;
        if(mThreadPool.isShutdown()){
            return;
        }
        mThreadPool.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    if(udpSocket!=null){
                        udpSocket.setSoTimeout(100);
                    }
                } catch (Exception ignored) {}
                while (GET_BROADCAST_FLAG) {
                    Log.i(TAG, "get is running ---> "+mIP);
                    byte[] recvdata = new byte[MAX_DATA_RECEV_LENGTH];
                    DatagramPacket receivePacket = new DatagramPacket(recvdata,MAX_DATA_RECEV_LENGTH);

                    try {
                        if(udpSocket == null){
                            try {
                                udpSocket = new DatagramSocket(PROT);
                            } catch (SocketException e) {
                                e.printStackTrace();
                            }
                        }
                        if(udpSocket==null||udpSocket.isClosed()){
                            return;
                        }
                        udpSocket.receive(receivePacket);
                        if (null != receivePacket.getAddress()) {
                            final String quest_ip = receivePacket.getAddress().toString();
                            String ipString = quest_ip.replaceAll("\\/", "");
                            Log.i(TAG, "ipstr ---> "+ipString);
                            if(!mIP.endsWith(ipString)){
                                String  data = new String(receivePacket.getData(),0,receivePacket.getLength());
                                Log.i(TAG,data);
                                mCallBack.UDPResponse(data);
                            }
                        }
                    } catch (IOException e) {
                        Log.w("UDP",e.getMessage()+"");
                    }
                }
            }
        });
    }

    /**
     * 停止发送广播以及接收广播
     * @author xiang.wang
     */
    public void stopUDPBroadCast(){
        GET_BROADCAST_FLAG = false;
        if(udpSocket != null && !udpSocket.isClosed()){
            udpSocket.close();
            udpSocket = null;
        }
    }

}
