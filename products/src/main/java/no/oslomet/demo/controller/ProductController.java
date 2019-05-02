package no.oslomet.demo.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import no.oslomet.demo.model.Merchant;
import no.oslomet.demo.model.Product;
import no.oslomet.demo.repository.ProductRepository;
import no.oslomet.demo.service.MerchantService;
import no.oslomet.demo.service.ProductService;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class ProductController {

    @Autowired
    MerchantService merchantService;

    @Autowired
    ProductService productService;
    @Autowired
    ProductRepository productRepository;

    @GetMapping("/")
    public String home() {
        return "This is a rest controller  ";
    }

    @GetMapping("/merchants")
    public List<Merchant> getAllMerchant() {

        return merchantService.getAllMerchant();
    }

    @GetMapping("/merchant/{id}")
    public Merchant getMerchantById(@PathVariable long id) {
        return merchantService.getMerchantById(id);

    }

    @DeleteMapping("/merchant/{id}")
    public void deleteMerchantById(@PathVariable long id) {
        merchantService.deleteMerchant(id);
    }

    @PostMapping("/merchants")
    public Merchant saveMerchant(@RequestBody Merchant newMerchant) {
        return merchantService.saveMerchant(newMerchant);
    }

    @PutMapping("/merchants/{id}")
    public Merchant updateMerchant(@PathVariable long id, @RequestBody Merchant newMerchant) {
        newMerchant.setId(id);
        return merchantService.updateMerchant(newMerchant);
    }


    @GetMapping("/products")
    public List<Product> getAllProdect() {
        return productService.getAllProduct();
    }

    @GetMapping("/products/{id}")
    public Product getProductById(@PathVariable long id) {
        return productService.getProductById(id);
    }


    @DeleteMapping("/products/{id}")
    public void deleteProductById(@PathVariable long id) {
        productService.deleteProduct(id);
    }

    @PutMapping("/products/{id}")
    public Product updateProductById(@PathVariable long id, @RequestBody LinkedHashMap<String, Object> body) {
        ObjectMapper objectMapper = new ObjectMapper();
        Product product = objectMapper.convertValue(body.get("product"), Product.class);
        Merchant merchant = objectMapper.convertValue(body.get("merchant"), Merchant.class);
        product.setMerchant(merchant);
        return productService.saveProduct(product);
    }


    @PostMapping("/products")
    public Product saveProductById(@RequestBody Map<String, Object> body) {
        // System.out.println("body: "+ body.toString());
        ObjectMapper mapper1 = new ObjectMapper();
        ObjectMapper mapper2 = new ObjectMapper();

        Product product = mapper1.convertValue(body.get("product"), Product.class);
        Merchant merchant = mapper2.convertValue(body.get("merchant"), Merchant.class);

        productService.saveProduct(product);
        Merchant merchantdb = merchantService.getMerchantByEmail(merchant.getEmail());
        System.out.println("merchantdb:" + merchantdb);

        if (merchantdb == null) {
            System.out.println("not found ");
            // save merchant
            merchantService.saveMerchant(merchant);

            List<Product> merchantProducts = new ArrayList<>();
            merchantProducts.add(product);
            merchant.setProductList(merchantProducts);
            product.setMerchant(merchant);


        } else {
            // Hent alle sine produkter og lagre det i en lis
            productService.getAllProduct();

//            List<Product> merchantProductsStream = productService.getAllProduct()
//                    .stream().filter(currentProduct -> currentProduct.getMerchant().getEmail().equals(merchant.getEmail()))
//                    .collect(Collectors.toList());

            List<Product> merchantProducts = new ArrayList<>();

            for (Product p : productService.getAllProduct()) {
                if (p.getMerchant() != null) {
                    if (p.getMerchant().getEmail().equals(merchant.getEmail())) {
                        merchantProducts.add(p);
                    }
                }

            }

            List<Product> productList = productService.getAllProduct();
            productList.add(product);
            merchantService.saveMerchant(merchant);


        }
        return productService.saveProduct(product);

    }

    @GetMapping("/products/decrease/{id}")
    public Product decreaseQuantity(@PathVariable long id ){
        Product product = productService.getProductById(id);
        product.setQuantity(product.getQuantity() -1);
        return productService.saveProduct(product);

    }

    @GetMapping("/products/rate/{id}/{numberOfRate}")
    public Product rateProduct(@PathVariable long id, @PathVariable("numberOfRate") long numberOfRate ){
        Product product = productService.getProductById(id);
        product.setRate(numberOfRate);
        return productService.saveProduct(product);

    }


}
