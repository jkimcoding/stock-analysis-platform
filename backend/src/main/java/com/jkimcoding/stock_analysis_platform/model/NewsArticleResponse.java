package com.jkimcoding.stock_analysis_platform.model;

import java.util.List;

public class NewsArticleResponse {
    private List<NewsArticle> results;

    public List<NewsArticle> getResults() {
        return results;
    }

    public void setResults(List<NewsArticle> results) {
        this.results = results;
    }
}
