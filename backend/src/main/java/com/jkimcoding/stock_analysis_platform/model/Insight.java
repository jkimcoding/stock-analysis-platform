package com.jkimcoding.stock_analysis_platform.model;

public class Insight {
    private String ticker;
    private String sentiment;
    private String sentiment_reasoning;

    public Insight() {
    }

    public Insight(String ticker, String sentiment, String sentiment_reasoning) {
        this.ticker = ticker;
        this.sentiment = sentiment;
        this.sentiment_reasoning = sentiment_reasoning;
    }

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public String getSentiment() {
        return sentiment;
    }

    public void setSentiment(String sentiment) {
        this.sentiment = sentiment;
    }

    public String getSentiment_reasoning() {
        return sentiment_reasoning;
    }

    public void setSentiment_reasoning(String sentiment_reasoning) {
        this.sentiment_reasoning = sentiment_reasoning;
    }
}
