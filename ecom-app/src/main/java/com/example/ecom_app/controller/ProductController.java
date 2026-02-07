package com.example.ecom_app.controller;

import com.example.ecom_app.model.Product;
import com.example.ecom_app.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductService service;

    @RequestMapping("/")
    public String home() {
        return "hello w";
    }

    @RequestMapping("/products")
    public List<Product> getProducts() {
        return service.getProducts();
    }
}
