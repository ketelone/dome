package com.hand.bean;

/**
 * Created by panx on 2017/2/27.
 */
public class ModuleBean {

  private String moduleId;
  private String downloadUrl;
  private String zipName;
  private String unZipPath;
  private String indexName;
  private String version;

  public String getModuleId() {
    return moduleId;
  }

  public void setModuleId(String moduleId) {
    this.moduleId = moduleId;
  }

  public String getDownloadUrl() {
    return downloadUrl;
  }

  public void setDownloadUrl(String downloadUrl) {
    this.downloadUrl = downloadUrl;
  }

  public String getZipName() {
    return zipName;
  }

  public void setZipName(String zipName) {
    this.zipName = zipName;
  }

  public String getUnZipPath() {
    return unZipPath;
  }

  public void setUnZipPath(String unZipPath) {
    this.unZipPath = unZipPath;
  }

  public String getIndexName() {
    return indexName;
  }

  public void setIndexName(String indexName) {
    this.indexName = indexName;
  }

  public String getVersion() {
    return version;
  }

  public void setVersion(String version) {
    this.version = version;
  }
}
