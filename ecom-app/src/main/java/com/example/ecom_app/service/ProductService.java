package com.example.ecom_app.service;

import com.example.ecom_app.model.Product;
import com.example.ecom_app.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepo repo;
    public List<Product> getProducts() {
        return repo.findAll();
    }
}
