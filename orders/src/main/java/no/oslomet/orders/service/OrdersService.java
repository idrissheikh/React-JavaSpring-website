package no.oslomet.orders.service;


import no.oslomet.orders.model.Orders;
import no.oslomet.orders.repository.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class OrdersService {
    @Autowired
    private OrdersRepository ordersRepository;

    public List<Orders> getAllOrders() {
        return ordersRepository.findAll();
    }

    public Orders getOrderById(long id) {
        return ordersRepository.findById(id).get();
    }

    public Orders saveOrder(Orders orders) {
        return ordersRepository.save(orders);
    }

    public void deleteOrder(long id) {
        ordersRepository.deleteById(id);

    }

    public Orders UpdateOrderById(Orders orders) {
        return ordersRepository.save(orders);
    }


}
