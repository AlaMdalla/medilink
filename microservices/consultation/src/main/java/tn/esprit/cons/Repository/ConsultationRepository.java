package tn.esprit.cons.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.cons.Entity.Consultation;

public interface ConsultationRepository extends JpaRepository<Consultation, Integer> {
}
