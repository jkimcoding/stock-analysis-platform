package com.jkimcoding.stock_analysis_platform.model;

import java.util.List;

public class GeminiRequest {
    private String symbol;
    private String fromDate;
    private String toDate;
    private List<StockChart> stockChartData;

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getFromDate() {
        return fromDate;
    }

    public void setFromDate(String fromDate) {
        this.fromDate = fromDate;
    }

    public String getToDate() {
        return toDate;
    }

    public void setToDate(String toDate) {
        this.toDate = toDate;
    }

    public List<StockChart> getStockChartData() {
        return stockChartData;
    }

    public void setStockChartData(List<StockChart> stockChartData) {
        this.stockChartData = stockChartData;
    }
}