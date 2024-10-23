package com.jkimcoding.stock_analysis_platform.model;

import java.util.List;
import java.util.stream.Collectors;

public class NewsArticle {
    private String title;
    private String published_utc;
    private String description;
    private List<Insight> insights;

    public NewsArticle() {
    }

    public NewsArticle(String title, String published_utc, String description, List<Insight> insights) {
        this.title = title;
        this.published_utc = published_utc;
        this.description = description;
        this.insights = insights;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPublished_utc() {
        return published_utc;
    }

    public void setPublished_utc(String published_utc) {
        this.published_utc = published_utc;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Insight> getInsights() {
        return this.insights;
    }

    public List<Insight> getInsights(String ticker) {
        return insights.stream()
                .filter(insight -> ticker.equals(insight.getTicker()))
                .collect(Collectors.toList());
    }

    public void setInsights(List<Insight> insights) {
        this.insights = insights;
    }
}