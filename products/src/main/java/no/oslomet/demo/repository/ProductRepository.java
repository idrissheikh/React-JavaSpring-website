package no.oslomet.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import no.oslomet.demo.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
