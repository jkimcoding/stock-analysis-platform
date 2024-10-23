package com.jkimcoding.stock_analysis_platform.service;

import com.jkimcoding.stock_analysis_platform.model.NewsArticle;
import com.jkimcoding.stock_analysis_platform.model.NewsArticleResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NewsService {
    // Making API call to https://polygon.io/docs/stocks/get_v2_reference_news
    private final String API_URL = "https://api.polygon.io/v2/reference/news?ticker=%s&apiKey=%s&published_utc.gte=%s&published_utc.lte=%s";
    private final String API_KEY = "kEaCqVodO3WoKhtz1I7HWa70dEXXKDjA";

    // Example: https://api.polygon.io/v2/reference/news?ticker=TSLA&apiKey={apikey}&published_utc.gte=2024-09-30T01:00:00Z&published_utc.lte=2024-10-13T01:00:00Z
    private static final RestTemplate restTemplate = new RestTemplate();

    public List<NewsArticle> getNews(String ticker, String fromDate, String toDate) {
        String url = String.format(API_URL, ticker, API_KEY, fromDate, toDate);
        NewsArticleResponse newsArticleResponse = restTemplate.getForObject(url, NewsArticleResponse.class);

        if (newsArticleResponse == null || newsArticleResponse.getResults() == null) {
            return Collections.emptyList();
        }

        List<NewsArticle> filteredResults = newsArticleResponse.getResults().stream()
                .peek(result -> result.setInsights(result.getInsights(ticker)))
                .collect(Collectors.toList());

        return ResponseEntity.ok(filteredResults).getBody();
    }

}
