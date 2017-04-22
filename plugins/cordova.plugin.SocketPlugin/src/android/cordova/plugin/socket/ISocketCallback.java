package cordova.plugin.socket;

/**
 * Created by Oliver on 2017/3/21.
 */

public interface ISocketCallback{
    void onReceived(String ip, String data);
    void onReconnected(String ip);
    void onReconnectFailed(String ip);
}