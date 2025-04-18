package esprit.subscription.dao;

import esprit.subscription.Entity.CancellationReason;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CancellationReasonDao extends JpaRepository<CancellationReason, Long> {
    List<CancellationReason> findBySubid(Integer subid);
}