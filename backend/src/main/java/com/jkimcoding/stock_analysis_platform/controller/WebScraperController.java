package com.jkimcoding.stock_analysis_platform.controller;

import com.jkimcoding.stock_analysis_platform.service.WebScraperService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/scrape")
public class WebScraperController {

    private final WebScraperService webScraperService;

    public WebScraperController(WebScraperService webScraperService) {
        this.webScraperService = webScraperService;
    }

    @GetMapping
    public List<String> getFinancialNewsHeadlines() {
        return webScraperService.getNewsHeadlines();
    }

}
