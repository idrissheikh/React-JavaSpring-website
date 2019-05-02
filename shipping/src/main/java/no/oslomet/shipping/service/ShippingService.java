package no.oslomet.shipping.service;


import no.oslomet.shipping.model.Shipping;
import no.oslomet.shipping.repository.ShippingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class
ShippingService {

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

    public List<Shipping> getShippingByUser(long id) {
        System.out.println("id received: " + id);
        List<Shipping> list = new ArrayList<>();
        for(Shipping s: shippingRepository.findAll()){
            if(Long.parseLong(s.getUser_id()) == id){
                list.add(s);
            }


        }

       /* List<Shipping> list ;
        for(Shipping s: shippingRepository.findAll()){
            if(s.getId() == id){
                if (list == null){
                    List<Shipping> list = new ArrayList<>();

                }else list.add(s);

            }
        }*/
        return list;
    }

    public void deleteShipping(long id) {
        shippingRepository.deleteById(id);
    }

    public Shipping updateShipping(Shipping shipping) {
        return shippingRepository.save(shipping);
    }



}