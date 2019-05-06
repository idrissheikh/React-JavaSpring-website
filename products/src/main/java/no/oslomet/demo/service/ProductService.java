package no.oslomet.demo.service;

import no.oslomet.demo.model.Product;
import no.oslomet.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.RenderedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
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

    public boolean saveImage(MultipartFile file, String path) {
        boolean saved = false;
        byte[] bytes = new byte[0];
        try {
            ImageIO.write((RenderedImage) file, file.getContentType(), new File(path));

           // bytes = file.getBytes();
            //Files.write(Paths.get(path), bytes);
            saved = true;
        } catch (IOException e) {
            e.printStackTrace();

        }
        return saved;
    }


    public List<Product> getMyProducts(long id) {
        List<Product> list = new ArrayList<>();
        for(Product p: productRepository.findAll()){
            if(p.getMerchant_id() == id) list.add(p);
        }
        return list;
    }

}
