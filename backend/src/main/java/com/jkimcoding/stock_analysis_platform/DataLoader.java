package com.jkimcoding.stock_analysis_platform;

import com.jkimcoding.stock_analysis_platform.model.Example;
import com.jkimcoding.stock_analysis_platform.repository.ExampleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DataLoader implements CommandLineRunner {

    private final ExampleRepository repository;

    public DataLoader(ExampleRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        Optional<Example> existingDocument = repository.findByName("testing");
        if (existingDocument.isEmpty()) {
            Example document = new Example();
            document.setName("testing");
            repository.save(document);
            System.out.println("Inserted initial document: " + document);
        } else {
            System.out.println("Document already exists: " + existingDocument.get());
        }
    }
}
