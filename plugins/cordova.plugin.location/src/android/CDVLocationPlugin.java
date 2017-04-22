package com.cordova.location;

import android.Manifest;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.net.Uri;
import android.os.Bundle;
import android.provider.Settings;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.widget.Toast;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by xiang.wang on 2017/4/14.
 */

public class CDVLocationPlugin extends CordovaPlugin {
    private static final int UnAuthorized = 1000;
    private static final int GPSNotOpen = 1001;
    private Context context;
    private CallbackContext mCallbackContext;
    private static final int MY_PERMISSION_ACCESS_COARSE_LOCATION = 0x01;
    private static final int MY_PERMISSION_ACCESS_FINE_LOCATION = 0x02;
    private LocationManager mLocationManager;

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        mCallbackContext = callbackContext;
        context = cordova.getActivity();
        mLocationManager = (LocationManager) context.getSystemService(Context.LOCATION_SERVICE);
        checkGPSPermission();
        return super.execute(action, args, callbackContext);
    }

    private void checkGPSPermission() {
        if (ContextCompat.checkSelfPermission(context, android.Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED
                || ContextCompat.checkSelfPermission(context, android.Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            startGPSLocation();
        } else {
            if (ContextCompat.checkSelfPermission(context, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(cordova.getActivity(),
                        new String[]{Manifest.permission.ACCESS_COARSE_LOCATION},
                        MY_PERMISSION_ACCESS_COARSE_LOCATION);
            }
            if (ContextCompat.checkSelfPermission(context, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(cordova.getActivity(),
                        new String[]{Manifest.permission.ACCESS_FINE_LOCATION},
                        MY_PERMISSION_ACCESS_FINE_LOCATION);
            }
        }
    }

    @Override
    public void onRequestPermissionResult(int requestCode, String[] permissions, int[] grantResults) throws JSONException {
        switch (requestCode) {
            case MY_PERMISSION_ACCESS_COARSE_LOCATION:
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    startGPSLocation();
                } else {
                    JSONObject err = new JSONObject();
                    err.put("error", UnAuthorized);
                    mCallbackContext.error(err);
                }
                break;
            case MY_PERMISSION_ACCESS_FINE_LOCATION: {
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    startGPSLocation();
                } else {
                    JSONObject err = new JSONObject();
                    err.put("error", UnAuthorized);
                    mCallbackContext.error(err);
                }
                break;
            }

        }
        super.onRequestPermissionResult(requestCode, permissions, grantResults);
    }

    /**
     * Determine whether GPS is on
     *
     * @return true mean is opening
     */

    private boolean isGPSOPen() {
        boolean gps = mLocationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
        boolean network = mLocationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER);
        if (gps || network) {
            return true;
        }
        return false;
    }

    private void startGPSLocation() throws SecurityException {
        if (isGPSOPen()) {
            Location location;
            if (mLocationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER)) {
                mLocationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 1000, 0, locationListener);
                location = mLocationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
            } else {
                mLocationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 1000, 0, locationListener);
                location = mLocationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
            }

            if (location != null) {
                double latitude = location.getLatitude();
                double longitude = location.getLongitude();
                JSONObject success = new JSONObject();
                try {
                    success.put("latitude", String.valueOf(latitude));
                    success.put("longitude", String.valueOf(longitude));
                    mCallbackContext.success(success);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        } else {
            JSONObject err = new JSONObject();
            try {
                err.put("error", GPSNotOpen);
            } catch (JSONException e) {
                e.printStackTrace();
            }
            mCallbackContext.error(err);
        }
    }

    LocationListener locationListener = new LocationListener() {

        public void onLocationChanged(Location location) {
        }

        public void onStatusChanged(String provider, int status, Bundle extras) {
        }

        public void onProviderEnabled(String provider) {
        }

        public void onProviderDisabled(String provider) {
        }

    };
}
