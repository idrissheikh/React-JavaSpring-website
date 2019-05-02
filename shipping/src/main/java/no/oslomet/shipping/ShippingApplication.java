package no.oslomet.shipping;

import no.oslomet.shipping.model.Shipping;
import no.oslomet.shipping.repository.ShippingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ShippingApplication implements CommandLineRunner {

    @Autowired
    ShippingRepository shippingRepository;

    public static void main(String[] args) {
        SpringApplication.run(ShippingApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        shippingRepository.save(new Shipping("Ali", "Basha", "Storgata", "Oslo",Long.parseLong("0182"), "1"));
        shippingRepository.save(new Shipping("Idris", "Hamid", "Refstadveien", "Oslo",Long.parseLong("0589"), "2"));
        shippingRepository.save(new Shipping("Ali", "Basha", "OsloCity", "Oslo",Long.parseLong("0182"), "1"));
        shippingRepository.save(new Shipping("Ali", "Basha", "Hamarvien", "Oslo",Long.parseLong("8888"), "1"));
    }
}
