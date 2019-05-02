package no.oslomet.shipping.repository;

import no.oslomet.shipping.model.Shipping;
import org.springframework.data.jpa.repository.JpaRepository;

public  interface ShippingRepository extends JpaRepository<Shipping, Long> {
}



