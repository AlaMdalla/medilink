package tn.esprit.cons;


import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.cons.Entity.Consultation;
import tn.esprit.cons.Service.ConsultationService;

import java.util.List;

@RestController
@RequestMapping("/consultation")
public class ConsultationRestApi
{
    private final ConsultationService consultationService;

    public ConsultationRestApi(ConsultationService consultationService) {
        this.consultationService = consultationService;
    }

    /// Endpoint pour tester l'API
    @GetMapping("/hello")
    public String sayHello() {
        return "Hello World";
    }
    // Ajouter une consultation
    @PostMapping
    public ResponseEntity<Consultation> createConsultation(@RequestBody Consultation consultation) {
        return new ResponseEntity<>(consultationService.createConsultation(consultation), HttpStatus.CREATED);
    }

    // Obtenir une consultation par ID
    @GetMapping("/{id}")
    public ResponseEntity<Consultation> getConsultationById(@PathVariable int idConsultation) {
        return new ResponseEntity<>(consultationService.getConsultationById(idConsultation), HttpStatus.OK);
    }

    // Obtenir toutes les consultations
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Consultation>> listConsultations() {
        return new ResponseEntity<>(consultationService.findAll(), HttpStatus.OK);
    }

    // Mettre à jour une consultation
    @PutMapping("/{id}")
    public ResponseEntity<Consultation> updateConsultation(@PathVariable int idConsultation, @RequestBody Consultation consultation) {
        return new ResponseEntity<>(consultationService.updateConsultation(idConsultation, consultation), HttpStatus.OK);
    }

    // Supprimer une consultation
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConsultation(@PathVariable int idConsultation) {
        consultationService.deleteConsultation(idConsultation);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
