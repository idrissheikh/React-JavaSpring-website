package no.oslomet.shipping.controller;

import no.oslomet.shipping.model.Shipping;
import no.oslomet.shipping.service.ShippingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class ShippingController {

    @Autowired
    ShippingService shippingService;

    @GetMapping("/shipping/{id}")
    public Shipping getShippingById(@PathVariable long id) {
        return shippingService.getShippingById(id);
    }

    @DeleteMapping("/shipping/{id}")
    public void deleteshippingById(@PathVariable long id) {
        shippingService.deleteShipping(id);
    }

    @PostMapping("/shipping")
    public Shipping saveShipping(@RequestBody Shipping newShipping) {
        return shippingService.saveShipping(newShipping);
    }

    @PutMapping("/shipping/{id}")
    public Shipping updateShipping(@PathVariable long id, @RequestBody Shipping shipping) {
        shipping.setId(id);
        return shippingService.saveShipping(shipping);
    }

    @PutMapping("/updateShipping/id={id}&user_id={user_id}")
    public Shipping updateShipping(@PathVariable("id") long id,
                                   @PathVariable("user_id") String user_id,
                                   @RequestBody Shipping shipping) {
        shipping.setUser_id(user_id);
        shipping.setId(id);
        return shippingService.saveShipping(shipping);
    }

    @GetMapping("/shipping/user/{id}")
    public List<Shipping> getShippingByUser(@PathVariable long id) {
        return shippingService.getShippingByUser(id);
    }



    @GetMapping("/shipping")
    public List<Shipping> getAllshippings() {
        return shippingService.getAllshipping();
    }



}
