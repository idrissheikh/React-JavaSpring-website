package no.oslomet.demo.service;

import no.oslomet.demo.model.Product;
import no.oslomet.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;


    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    public Product getProductById(long id) {
        return productRepository.findById(id).get();

    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Product product) {
        return productRepository.save(product);

    }

   /* public List<Product> getMerchantProduct(Merchant merchant){
        return;}
    */

    public void deleteProduct(long id) {
        productRepository.deleteById(id);
    }

}
