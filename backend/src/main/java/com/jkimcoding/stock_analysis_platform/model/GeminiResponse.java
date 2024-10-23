package com.jkimcoding.stock_analysis_platform.model;

import java.util.List;

public class GeminiResponse {
    private String overallSentiment;
    private List<String> keyDrivers;
    private List<String> positiveSentiment;
    private List<String> negativeSentiment;
    private List<String> newsHighlights;
    private String overallSummary;

    public GeminiResponse() {}

    public GeminiResponse(String overallSentiment, List<String> keyDrivers, List<String> positiveSentiment,
                          List<String> negativeSentiment, List<String> newsHighlights, String overallSummary) {
        this.overallSentiment = overallSentiment;
        this.keyDrivers = keyDrivers;
        this.positiveSentiment = positiveSentiment;
        this.negativeSentiment = negativeSentiment;
        this.newsHighlights = newsHighlights;
        this.overallSummary = overallSummary;
    }

    public String getOverallSentiment() {
        return overallSentiment;
    }

    public void setOverallSentiment(String overallSentiment) {
        this.overallSentiment = overallSentiment;
    }

    public List<String> getKeyDrivers() {
        return keyDrivers;
    }

    public void setKeyDrivers(List<String> keyDrivers) {
        this.keyDrivers = keyDrivers;
    }

    public List<String> getPositiveSentiment() {
        return positiveSentiment;
    }

    public void setPositiveSentiment(List<String> positiveSentiment) {
        this.positiveSentiment = positiveSentiment;
    }

    public List<String> getNegativeSentiment() {
        return negativeSentiment;
    }

    public void setNegativeSentiment(List<String> negativeSentiment) {
        this.negativeSentiment = negativeSentiment;
    }

    public List<String> getNewsHighlights() {
        return newsHighlights;
    }

    public void setNewsHighlights(List<String> newsHighlights) {
        this.newsHighlights = newsHighlights;
    }

    public String getOverallSummary() {
        return overallSummary;
    }

    public void setOverallSummary(String overallSummary) {
        this.overallSummary = overallSummary;
    }

    @Override
    public String toString() {
        return "GeminiResponse{" +
                "overallSentiment='" + overallSentiment + '\'' +
                ", keyDrivers=" + keyDrivers +
                ", positiveSentiment=" + positiveSentiment +
                ", negativeSentiment=" + negativeSentiment +
                ", newsHighlights=" + newsHighlights +
                ", overallSummary='" + overallSummary + '\'' +
                '}';
    }
}
