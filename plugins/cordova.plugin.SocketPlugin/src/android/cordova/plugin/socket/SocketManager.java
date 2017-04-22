package cordova.plugin.socket;


import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Created by oliver on 17-4-20.
 */
public class SocketManager {

    private static ExecutorService service ;
    private static Map<String,TcpSocket> socketMap ;

    public static SocketManager getInstance() {
        initialize();
        return SocketManagerHolder.INSTANCE;
    }

    private SocketManager(){}

    public static void initialize(){
        if(service ==  null){
            service = Executors.newCachedThreadPool();
        }
        if(socketMap == null){
            socketMap = new HashMap<String, TcpSocket>();
        }
    }

    public void put(String ip,TcpSocket socket){
        socketMap.put(ip,socket);
    }

    public TcpSocket get(String ip){
        return socketMap.get(ip);
    }

    public Map<String, TcpSocket> getSocketMap() {
        return socketMap;
    }

    public void close(String ip){
        TcpSocket socket = socketMap.get(ip);
        if(socket!=null){
            socket.close();
            socketMap.remove(ip);
        }

    }

    public ExecutorService getService() {
        return service;
    }

    public void closeAll(){
        for(TcpSocket socket:socketMap.values()){
            socket.close();
        }
        socketMap.clear();
        if(!service.isShutdown()){
            service.shutdown();
        }

    }

    static class SocketManagerHolder{
        final static SocketManager INSTANCE = new SocketManager();
    }
}
