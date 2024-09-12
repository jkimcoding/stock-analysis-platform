package com.jkimcoding.stock_analysis_platform.controller;

import com.jkimcoding.stock_analysis_platform.model.Example;
import com.jkimcoding.stock_analysis_platform.service.ExampleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ExampleController {

    private final ExampleService exampleService;

    public ExampleController(ExampleService exampleService) {
        this.exampleService = exampleService;
    }

    @GetMapping("/data")
    public List<Example> getAllData() {
        return exampleService.getAll();
    }

    @PostMapping("/data")
    public Example postData(@RequestBody Example example) {
        return exampleService.save(example);
    }
}