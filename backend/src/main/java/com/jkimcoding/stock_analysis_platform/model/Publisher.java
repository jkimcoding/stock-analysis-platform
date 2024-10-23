package com.jkimcoding.stock_analysis_platform.model;

public class Publisher {
    private String name;
    private String homepage_url;
    private String logo_url;
    private String favicon_url;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHomepage_url() {
        return homepage_url;
    }

    public void setHomepage_url(String homepage_url) {
        this.homepage_url = homepage_url;
    }

    public String getLogo_url() {
        return logo_url;
    }

    public void setLogo_url(String logo_url) {
        this.logo_url = logo_url;
    }

    public String getFavicon_url() {
        return favicon_url;
    }

    public void setFavicon_url(String favicon_url) {
        this.favicon_url = favicon_url;
    }
}
