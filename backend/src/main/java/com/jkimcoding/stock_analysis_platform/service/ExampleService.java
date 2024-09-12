package com.jkimcoding.stock_analysis_platform.service;

import com.jkimcoding.stock_analysis_platform.model.Example;
import com.jkimcoding.stock_analysis_platform.repository.ExampleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExampleService {

    private final ExampleRepository exampleRepository;

    public ExampleService(ExampleRepository exampleRepository) {
        this.exampleRepository = exampleRepository;
    }

    public List<Example> getAll() {
        return exampleRepository.findAll();
    }

    public Example save(Example example) {
        return exampleRepository.save(example);
    }

}
