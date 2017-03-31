package com.hand.bean;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

/**
 * Created by panx on 2017/2/27.
 */
public class ModuleBeanBiz {
  /**
   * [{updateModules:[{moduleId:"",downloadUrl:"",zipName:"",unZipPath:"",indexName:""},{},{}]}]
   *
   * @param args
   * @return
   */
  public ArrayList<ModuleBean> getModuleListFromJSON(JSONArray args) {
    ArrayList<ModuleBean> moduleList = new ArrayList<ModuleBean>();
    try {
      JSONObject argsObject = args.getJSONObject(0);
      JSONArray argsArray = argsObject.getJSONArray("updateModules");
      for (int i = 0; i < argsArray.length(); i++) {
        ModuleBean module = new ModuleBean();
        JSONObject moduleObject = argsArray.getJSONObject(i);
        module.setModuleId(moduleObject.getString("moduleId"));
        module.setDownloadUrl(moduleObject.getString("downloadUrl"));
        module.setZipName(moduleObject.getString("zipName"));
        module.setUnZipPath(moduleObject.getString("unZipPath"));
        module.setVersion(moduleObject.getString("version"));
        //module.setIndexName(moduleObject.getString("indexName"));
        moduleList.add(module);
      }
      return moduleList;
    } catch (JSONException e) {
      e.printStackTrace();
      return null;
    }
  }
}
