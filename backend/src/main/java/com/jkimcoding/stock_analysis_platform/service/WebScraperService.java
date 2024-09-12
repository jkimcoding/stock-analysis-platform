package com.jkimcoding.stock_analysis_platform.service;

import com.jkimcoding.stock_analysis_platform.api.WebScraper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Service
public class WebScraperService {

    private final WebScraper webscraper;

    public WebScraperService(WebScraper webscraper) {
        this.webscraper = webscraper;
    }

    public List<String> getNewsHeadlines() {
        try {
            return webscraper.scrapeHeaders();
        } catch (IOException e) {
            return Collections.emptyList();
        }
    }
}
