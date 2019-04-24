package no.oslomet.orders.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String date;
    @Transient  // Forteller Hibernate å ignorere å mappe
    private User user;

    //product_Orders
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "Shipping_id")
    private Shipping shipping;

    @Override
    public String toString() {
        return "Orders{" +
                "id=" + id +
                ", date='" + date + '\'' +
                ", shipping=" + shipping +
                '}';
    }
}
