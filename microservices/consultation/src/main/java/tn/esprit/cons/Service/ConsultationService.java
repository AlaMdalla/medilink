package tn.esprit.cons.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.cons.Entity.Consultation;
import tn.esprit.cons.Repository.ConsultationRepository;

import java.util.List;
@Service
public class ConsultationService
{ @Autowired
private ConsultationRepository consulttationRepository;

    public List<Consultation> findAll() {
        return consulttationRepository.findAll();
    }

    public void deleteConsultation(int idConsultation) {
        if (consulttationRepository.findById(idConsultation).isPresent()) {
            consulttationRepository.deleteById(idConsultation);
        } else {
            throw new RuntimeException("Consultation avec ID " + idConsultation + " non trouvée.");
        }
    }

    public Consultation updateConsultation(int idConsultation, Consultation consultation) {
        return consulttationRepository.save(consultation);
    }


    public Consultation createConsultation(Consultation consultation) {
        return consulttationRepository.save(consultation);
    }

    public Consultation getConsultationById(int idConsultation) {
        return consulttationRepository.findById((int) idConsultation).get();
    }
}


