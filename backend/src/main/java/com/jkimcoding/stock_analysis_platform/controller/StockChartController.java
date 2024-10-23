package com.jkimcoding.stock_analysis_platform.controller;

import com.jkimcoding.stock_analysis_platform.model.StockChartData;
import com.jkimcoding.stock_analysis_platform.service.StockChartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class StockChartController {

    @Autowired
    private StockChartService stockChartService;

    @GetMapping("/stock-chart")
    public ResponseEntity<StockChartData> getStockChartData(@RequestParam String symbol) {

        StockChartData stockChartData = stockChartService.getStockChartData(symbol);

        if (stockChartData != null) {
            return ResponseEntity.ok(stockChartData);
        } else {
            return ResponseEntity.status(500).body(null);
        }
    }
}