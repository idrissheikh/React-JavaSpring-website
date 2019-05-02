package no.oslomet.orders.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String date;
    private String user_id;

    @ElementCollection
    private List<String> productList = new ArrayList<>();

    public Orders(String date, String user_id, List<String> productList) {
        this.date = date;
        this.user_id = user_id;
        this.productList = productList;
    }

    @Override
    public String toString() {
        return "Orders{" +
                "id=" + id +
                ", date='" + date + '\'' +
                ", user_id='" + user_id + '\'' +
                ", productList=" + productList +
                '}';
    }


}
