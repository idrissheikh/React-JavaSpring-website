package no.oslomet.orders.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import no.oslomet.orders.model.Orders;
import no.oslomet.orders.service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import javax.persistence.criteria.Order;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin
public class Controller {



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
    public Orders saveOrder(@RequestBody HashMap<String, Object> body ) throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
         String user_id = body.get("user_id").toString();
         String date = body.get("date").toString();

        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        String json = ow.writeValueAsString(body.get("productList"));

        List<String> products = Arrays.asList(objectMapper.readValue(json, String[].class));

         Orders newOrder = new Orders();
         newOrder.setDate(date);
         newOrder.setUser_id(user_id);
         newOrder.setProductList(products);

        return ordersService.saveOrder(newOrder);
    }

    @GetMapping("/orders")
    public List<Orders> getAllOrders() {
        return ordersService.getAllOrders();
    }



    @GetMapping("/orderHistory/user/{id}")
    public List<Orders> getOrderByUser(@PathVariable long id) {
        return ordersService.getOrderByUser(id);
    }



}
