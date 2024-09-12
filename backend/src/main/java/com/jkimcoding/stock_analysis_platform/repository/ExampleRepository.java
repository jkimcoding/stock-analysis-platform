package com.jkimcoding.stock_analysis_platform.repository;

import com.jkimcoding.stock_analysis_platform.model.Example;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ExampleRepository extends MongoRepository<Example, String> {

    Optional<Example> findByName(String name);

}