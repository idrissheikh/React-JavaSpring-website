package no.oslomet.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import no.oslomet.demo.model.Merchant;

import java.util.Optional;

public interface MerchantRepository extends JpaRepository<Merchant, Long> {

    Optional<Merchant> findMerchantByEmail(String email);


}
