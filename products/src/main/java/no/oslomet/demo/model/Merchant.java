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
    private String address;
    private String city;
    private int postalCode;



    //product_merchant
    @OneToMany(mappedBy = "merchant", cascade = CascadeType.ALL)
    private List<Product> productList;


    @Override
    public String toString() {
        return "Merchant{" +
                "id=" + id +
                ", fristName='" + fristName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", passWord='" + passWord + '\'' +
                ", address='" + address + '\'' +
                ", city='" + city + '\'' +
                ", postalCode=" + postalCode +
                ", productList=" + productList +
                '}';
    }
}



