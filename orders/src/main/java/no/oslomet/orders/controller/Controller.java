package no.oslomet.orders.controller;

import no.oslomet.orders.model.Orders;
import no.oslomet.orders.model.Shipping;
import no.oslomet.orders.service.OrdersService;
import no.oslomet.orders.service.ShippingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
public class Controller {


    @Autowired
    ShippingService shippingService;

    @Autowired
    OrdersService ordersService;


    @GetMapping("/")
    public String home() {
        return "This is a rest controller  ";
    }


    /* --------------------------- */


    @GetMapping("orders/{id}")
    public Orders getOrderById(@PathVariable long id) {
        return ordersService.getOrderById(id);
    }

    @DeleteMapping("/orders/{id}")
    public void deleteOrderById(@PathVariable long id) {
        ordersService.getOrderById(id);
    }

    @PostMapping("/orders")
    public Orders saveOrder(@RequestBody Orders newOrder) {
        return ordersService.saveOrder(newOrder);
    }

    @GetMapping("/orders")
    public List<Orders> getAllOrders() {
        return ordersService.getAllOrders();
    }

    @PutMapping("/orders/{id}")
    public Orders updateOrder(@PathVariable long id, @RequestBody Orders orders) {
        orders.setId(id);
        //orders.setDate();
        // return  ordersService.UpdateOrderById(id);
        return null;
    }

    /* --------------------------- */

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


}
