package no.oslomet.demo.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor

public class Merchant {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String fristName;
    private String lastName;
    private String email;
    private String passWord;


    //product_merchant
    @OneToMany(mappedBy = "merchant", cascade = CascadeType.ALL)
    private List<Product> productList;


    @Override
    public String toString() {
        return "Merchant{" +
                "id=" + id +
                ", fristName='" + fristName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", passWord='" + passWord + '\'' +

                '}';
    }
}



