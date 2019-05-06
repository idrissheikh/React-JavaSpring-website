package no.oslomet.demo;

import no.oslomet.demo.model.Product;
import no.oslomet.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class ProductsApplication implements CommandLineRunner {

	@Autowired
	private ProductService productService;


	public static void main(String[] args) {
		SpringApplication.run(ProductsApplication.class, args);
	}

	@Bean
	WebMvcConfigurer configurer () {
		return new WebMvcConfigurerAdapter() {
			@Override
			public void addResourceHandlers (ResourceHandlerRegistry registry) {
				registry.addResourceHandler("/images/**").
						addResourceLocations("classpath:/images/");
			}
		};
	}

	@Override
	public void run(String... args) throws Exception {

	String uploadDirectory = System.getProperty("user.dir")+"/react-app/src/assets/";
		String product1ImagePath= "clark-shoes.jpg";
		String product2ImagePath= "nike-air-max.png";
		String product3ImagePath= "dockers-shoes.jpg";
		String product4ImagePath= "addidas-ultra.jpeg";
		String product5ImagePath= "apple-iphone-6.jpg";
		String product6ImagePath= "google-pixel-3.png";
		String product7ImagePath= "galaxy-9.jpg";
		String product8ImagePath= "samsung-galaxy-7.jpeg";


		List<Product> productList = new ArrayList<>();



		Product product2 = new Product("Clarks Men's Tilden Cap Oxford Shoe", 10, "shoes", 220, product1ImagePath);
		Product product3 = new Product("Nike Air Max 2019", 10, "shoes",330, product2ImagePath);
		Product product4 = new Product(" Dockers Men’s Endow Leather Oxford Dress Shoe" ,  10, "shoes", 1500, product3ImagePath);
		Product product5 = new Product("Addidas Ultra Shoes",   10, "shoes", 2219, product4ImagePath);


		Product product6 = new Product("Apple iPhone 6, GSM Unlocked, 16GB - Space Gray",  56, "mobile", 399, product5ImagePath);
		Product product7 = new Product("Google Pixel 3 64GB - Just Black",   400, "mobile", 699, product6ImagePath);
		Product product8 = new Product("Samsung Galaxy S9 Unlocked - 64gb - Midnight Black - US Warranty ",   56, "mobile", 499, product7ImagePath);
		Product product9 = new Product("Samsung Galaxy S7 G930v 32GB Verizon Wireless",   56, "mobile", 599, product8ImagePath);


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
