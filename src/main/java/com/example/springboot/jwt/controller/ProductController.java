package com.example.springboot.jwt.controller;

import com.example.springboot.jwt.entity.Product;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/products")
public class ProductController {

    private List<Product> products = new ArrayList<>();

    public ProductController() {
        products.add(Product.from("Men's Shoes (White)", "White color men's shoes", 100, "USD"));
        products.add(Product.from("TShirt (Blue)", "Blue color t-shirt", 55, "USD"));
        products.add(Product.from("TShirt (White)", "White color t-shirt", 50, "USD"));
        products.add(Product.from("Short (White)", "White color short", 60, "USD"));
        products.add(Product.from("Short (Black)", "Black color short", 55, "USD"));
    }

    @GetMapping
    public List<Product> getProducts() {
        return products;
    }

    @PostMapping
    public void addProduct(@RequestBody Product product) {
        if (StringUtils.isBlank(product.getName()) || StringUtils.isBlank(product.getDescription())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid product name or description");
        }
        if (StringUtils.isBlank(product.getCurrency())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid currency");
        }
        if (product.getPrice() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Price shoud be non-negative");
        }
        product.setId(UUID.randomUUID().toString());
        products.add(product);
    }
}
