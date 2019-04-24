package no.oslomet.demo.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Data
@NoArgsConstructor
public class Product {


    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "Merchant_id")
    @JsonIgnore
    private Merchant merchant;


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private long quantity;
    private long rate;
    private String category;


    public Product(String name, String releaseYear, long rate, long quantity, String category) {

        this.name = name;
        this.quantity = quantity;
        this.category = category;
        this.rate = rate;
    }


    @Override
    public String toString() {
        return "Product{" +
                " id=" + id +
                ", name='" + name + '\'' +
                ", quantity=" + quantity +
                ", rate=" + rate +
                ", category='" + category + '\'' +
                '}';

    }
}
