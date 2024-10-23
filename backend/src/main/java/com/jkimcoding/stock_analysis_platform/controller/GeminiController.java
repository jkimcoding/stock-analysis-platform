package com.jkimcoding.stock_analysis_platform.controller;

import com.jkimcoding.stock_analysis_platform.model.GeminiRequest;
import com.jkimcoding.stock_analysis_platform.model.GeminiResponse;
import com.jkimcoding.stock_analysis_platform.model.NewsArticle;
import com.jkimcoding.stock_analysis_platform.service.GeminiAiService;
import com.jkimcoding.stock_analysis_platform.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class GeminiController {

    @Autowired
    private GeminiAiService geminiAiService;

    @Autowired
    private NewsService newsService;

    @PostMapping("/ask-gemini")
    public ResponseEntity<GeminiResponse> getGemini(@RequestBody GeminiRequest request) {

        List<NewsArticle> newsArticles = newsService.getNews(request.getSymbol(), request.getFromDate(), request.getToDate());
        String aggregatedPrompt = promptBuilder(request, newsArticles);

        System.out.println("PROMPT: " + aggregatedPrompt);
        GeminiResponse geminiResponse = geminiAiService.queryGeminiAi(aggregatedPrompt);

        if (geminiResponse != null) {
            return ResponseEntity.ok(geminiResponse);
        } else {
            return ResponseEntity.status(500).body(null);
        }
    }

    public String promptBuilder(GeminiRequest rqt, List<NewsArticle> newsArticles) {
        String prompt = """
            Here's stock data and news articles on ticker %s from %s to %s.
            Analyze the market data and news articles provided to provide insightful comprehensive
            analysis and what's driving the %s stock. Provide your response in JSON format.
            Here's an example of the JSON output layout:
            {
              "overallSentiment": "",
              "keyDrivers": [],
              "positiveSentiment": [],
              "negativeSentiment": [],
              "newsHighlights": [],
              "overallSummary": ""
            }
            Stock data: %s
            News articles: %s""";

        return String.format(prompt, rqt.getSymbol(), rqt.getFromDate(),
                rqt.getToDate(), rqt.getSymbol(), rqt.getStockChartData(), newsArticles);

    }
}
