package com.jkimcoding.stock_analysis_platform.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jkimcoding.stock_analysis_platform.model.GeminiResponse;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GeminiAiService {

    private static final RestTemplate restTemplate = new RestTemplate();
    private final String API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=%s";
    private final String API_KEY = "AIzaSyDnBwLdodq2-r2GbEooObf6Ne7KbXkKOIE";

    public GeminiResponse queryGeminiAi(String prompt) {
        Map<Object, Object> dataToPost = requestBody(prompt);

        String url = String.format(API_URL, API_KEY);

        RequestEntity<Map<Object, Object>> request =
                RequestEntity.post(url).headers(headers())
                        .body(dataToPost);

        String response = restTemplate.exchange(request, String.class).getBody();
        //    "contents": [{
        //        "role": "user",
        //                "parts": [{
        //            "text": "TEXT"
        //        }]
        //    }]
        System.out.println("Gemini Response: "+ response);
        return parseGeminiResponse(response);
    }

    private HttpHeaders headers(){
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Content-Type","application/json; charset=utf-8");
        return httpHeaders;
    }

    private Map<Object, Object> requestBody(String prompt){
        Map<Object, Object> body = new HashMap<>();
        body.put("contents", List.of(
                        Map.of("role", "user",
                                "parts", List.of(Map.of("text", prompt))
                        )
                )
        );

        return body;
    }

    private GeminiResponse parseGeminiResponse(String response) {
        JSONObject jsonResponse = new JSONObject(response);

        JSONArray candidates = jsonResponse.getJSONArray("candidates");
        JSONObject firstCandidate = candidates.getJSONObject(0);
        JSONObject content = firstCandidate.getJSONObject("content");
        JSONArray parts = content.getJSONArray("parts");
        String textContent = parts.getJSONObject(0).getString("text");

        String json = textContent.replace("```json", "").replace("```", "").trim();
        ObjectMapper objectMapper = new ObjectMapper();

        GeminiResponse geminiResponse;
        try {
            geminiResponse = objectMapper.readValue(json, GeminiResponse.class);
        } catch (IOException e) {
            geminiResponse = new GeminiResponse();
            e.printStackTrace();
        }

        return geminiResponse;
    }
}
