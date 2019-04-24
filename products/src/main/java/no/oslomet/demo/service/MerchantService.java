package no.oslomet.demo.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import no.oslomet.demo.model.Merchant;
import no.oslomet.demo.repository.MerchantRepository;

import java.util.List;

@Service
public class MerchantService {


    @Autowired
    private MerchantRepository merchantRepository;

    public List<Merchant> getAllMerchant() {
        return merchantRepository.findAll();
    }

    public Merchant getMerchantById(long id) {
        return merchantRepository.findById(id).get();
    }

    public Merchant getMerchantByEmail(String email) {
        Merchant merchant2 = null;
        for (Merchant m : merchantRepository.findAll()) {
            if (m.getEmail().equals(email)) merchant2 = m;
        }
        return merchant2;
    }

    public Merchant saveMerchant(Merchant merchant) {
        return merchantRepository.save(merchant);
    }

    public Merchant updateMerchant(Merchant merchant) {
        return merchantRepository.save(merchant);
    }

    public void deleteMerchant(long id) {
        merchantRepository.deleteById(id);
    }


}
