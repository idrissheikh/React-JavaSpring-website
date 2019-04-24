package no.oslomet.demo;

import no.oslomet.demo.model.Product;
import no.oslomet.demo.service.MerchantService;
import no.oslomet.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class DemoApplication implements CommandLineRunner {

    @Autowired
    private ProductService productService;

    @Autowired
    private MerchantService merchantService;

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }


    @Override
    public void run(String... args) throws Exception {

        List<Product> productList = new ArrayList<>();

        Product product = new Product("Steve Madden Men's Jagwar", "2019", 14, 56, "sko");
        productList.add(product);


        Product product2 = new Product("Clarks Men's Tilden Cap Oxford Shoe", "2019", 14, 56, "shoes");
        Product product3 = new Product("Clarks Men's Tilden Cap Oxford Shoe", "2018", 15, 56, "shoes");
        Product product4 = new Product(" Dockers Men’s Endow Leather Oxford Dress Shoe", "2017", 14, 56, "shoes");
        Product product5 = new Product("Stacy Adams Men's Dunbar Wingtip Lace-Up Oxford", "2016", 16, 56, "shoes");


        Product product6 = new Product("Apple iPhone 6, GSM Unlocked, 16GB - Space Gray", "2019", 135, 56, "mobile");
        Product product7 = new Product("Google Pixel 3 64GB - Just Black", "2018", 15, 400, "mobile");
        Product product8 = new Product("Samsung Galaxy S9 Unlocked - 64gb - Midnight Black - US Warranty ", "2017", 399, 56, "mobile");
        Product product9 = new Product("Samsung Galaxy S7 G930v 32GB Verizon Wireless", "2016", 299, 56, "mobile");


        productService.saveProduct(product);
        productService.saveProduct(product2);
        productService.saveProduct(product3);
        productService.saveProduct(product4);
        productService.saveProduct(product5);
        productService.saveProduct(product6);
        productService.saveProduct(product7);
        productService.saveProduct(product8);
        productService.saveProduct(product9);


    }


}
