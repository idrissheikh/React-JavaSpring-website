package no.oslomet.demo.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import no.oslomet.demo.model.Product;
import no.oslomet.demo.repository.ProductRepository;
import no.oslomet.demo.service.ProductService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RestController
@CrossOrigin
public class ProductController {


        private static String IMAGE_PATH="/images/";


    private String EXTERNAL_IMAGE_PATH="http://localhost:9997/images/";
    public static String uploadDirectory = System.getProperty("user.dir")+"/react-app/src/assets";
    //src/main/resources/static/images   /uploads
    public long indice = 0;


    @Autowired
    ProductService productService;
    @Autowired
    ProductRepository productRepository;

    @GetMapping("/")
    public String home() {
        return "This is a rest controller  ";
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
        return productService.saveProduct(product);
    }




    @RequestMapping(value="/products",
            method=RequestMethod.POST,
            consumes= MediaType.MULTIPART_FORM_DATA_VALUE)
    public Product saveProductById(@RequestParam("file") MultipartFile file,
                                   Product newProduct) {
        //Product product = new Product(name,description , quantity,price, category,merchant_id);
        StringBuilder fileName = new StringBuilder();
        Path fileNameAndPath = Paths.get(uploadDirectory, indice+file.getOriginalFilename());
        fileName.append(file.getOriginalFilename());

        try {
            Files.write(fileNameAndPath, file.getBytes());

        } catch (IOException e) {
            e.printStackTrace();
        }

        newProduct.setImagePath(""+indice+fileName); //fileNameAndPath


        /*
       if(productService.saveImage(file,IMAGE_PATH+file.getOriginalFilename()));{
            newProduct.setImage(EXTERNAL_IMAGE_PATH+file.getOriginalFilename());
            //productService.saveImage(file,IMAGE_PATH+file.getOriginalFilename());
        //}



        */
        return productService.saveProduct(newProduct);
    }

    @GetMapping("/products/decrease/{id}")
    public Product decreaseQuantity(@PathVariable long id ){
        Product product = productService.getProductById(id);
        product.setQuantity(product.getQuantity() -1);
        return productService.saveProduct(product);

    }

    @GetMapping("/products/rate/{id}/{numberOfRate}/{user_id}")
    public Product rateProduct(@PathVariable long id,
                               @PathVariable("numberOfRate") String numberOfRate,
                               @PathVariable("user_id") String user_id){
        Product product = productService.getProductById(id);
        product.getRatings().put(user_id, numberOfRate);
        return productService.saveProduct(product);

    }

    public double getAverageRating(HashMap<Long, Double> ratings){
        double sum=0;
        Set<Long> keys = ratings.keySet();
        for(long key: keys){
            sum+= ratings.get(key);
        }

        return sum > 0 ?sum/ratings.size(): 0;

    }

    @GetMapping("/myproducts/{id}")
    public List<Product> getMyProducts(@PathVariable long id) {
        return productService.getMyProducts(id);
    }





}
