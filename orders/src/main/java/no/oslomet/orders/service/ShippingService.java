package no.oslomet.orders.service;

import no.oslomet.orders.model.Shipping;
import no.oslomet.orders.repository.ShippingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class ShippingService {

    @Autowired
    private ShippingRepository shippingRepository;

    public List<Shipping> getAllshipping() {
        return shippingRepository.findAll();

    }

    public Shipping getShippingById(long id) {
        return shippingRepository.findById(id).get();
    }


    public Shipping saveShipping(Shipping shipping) {
        return shippingRepository.save(shipping);

    }

    public void deleteShipping(long id) {
        shippingRepository.deleteById(id);
    }

    public Shipping updateShipping(Shipping shipping) {
        return shippingRepository.save(shipping);
    }
}
