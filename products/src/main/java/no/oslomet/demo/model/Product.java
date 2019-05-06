package no.oslomet.demo.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;


@Entity
@Data
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private long quantity;
    private String category;
    private double price;
    private HashMap<String, String> ratings = new HashMap<>();
    private String imagePath;
    private long merchant_id;



    public Product(String name, long quantity, String category, double price, long merchant_id ) {

        this.name = name;
        this.quantity = quantity;
        this.category = category;
        this.price = price;
        this.merchant_id= merchant_id;
    }

    public Product(String name, long quantity, String category, double price, String imagePath ) {

        this.name = name;
        this.quantity = quantity;
        this.category = category;
        this.price = price;
        this.imagePath =imagePath;
    }

    @Override
    public String toString() {
        return "Product{" +
                " id=" + id +
                ", name='" + name + '\'' +
                ", quantity=" + quantity +
                ", category='" + category + '\'' +
                '}';

    }
}
