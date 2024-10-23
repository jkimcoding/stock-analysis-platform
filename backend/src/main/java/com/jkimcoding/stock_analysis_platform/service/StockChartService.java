package com.jkimcoding.stock_analysis_platform.service;

import com.jkimcoding.stock_analysis_platform.model.StockChartData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class StockChartService {

    private final String API_URL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=%s&outputsize=compact&apikey=%s";
    private final String API_KEY = "WMIP6GGZH6FI39DV";

//    https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TSLA&outputsize=compact&apikey=J98NU0YMZLZFK9ET
    @Autowired
    private RestTemplate restTemplate;

    public StockChartData getStockChartData(String symbol) {
        String url = String.format(API_URL, symbol, API_KEY);

        System.out.println("Stock url: "+ url);
        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);

        System.out.println("stock response body: "+ response.getBody());
        if (response.getStatusCode().is2xxSuccessful()) {
            Map<String, Object> body = response.getBody();
            StockChartData stockChartData = new StockChartData();

            Map<String, String> metaData = (Map<String, String>) body.get("Meta Data");
            Map<String, Map<String, String>> timeSeries = (Map<String, Map<String, String>>) body.get("Time Series (Daily)");

            stockChartData.setSymbol(metaData.get("2. Symbol"));
            stockChartData.setLastRefreshed(metaData.get("3. Last Refreshed"));
            stockChartData.setTimeSeries(timeSeries);

            return stockChartData;
        } else {
            return null;
        }
    }
}
