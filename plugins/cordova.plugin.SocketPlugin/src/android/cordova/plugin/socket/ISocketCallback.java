package cordova.plugin.socket;

/**
 * Created by Oliver on 2017/3/21.
 */

public interface ISocketCallback{
    void onConnected();
    void onReceived(String data);
    void onDisconnected();
    void onError(Exception ex);

}