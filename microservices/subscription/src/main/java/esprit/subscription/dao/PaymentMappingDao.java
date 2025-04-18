package esprit.subscription.dao;

import esprit.subscription.Entity.PaymentMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentMappingDao extends JpaRepository<PaymentMapping, String> {
    // Find by paymentId (already used in other methods)
    PaymentMapping findByPaymentId(String paymentId);

    // Add method to find by subid
    List<PaymentMapping> findBySubid(Integer subid);
}