package com.example.consultation.repo;

import com.example.consultation.entity.Consultation;
import com.example.consultation.Service.ConsultationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultations")
public class ConsultationController {

    private final ConsultationService consultationService;

    public ConsultationController(ConsultationService consultationService) {
        this.consultationService = consultationService;
    }

    // Endpoint for testing the API
    @GetMapping("/hello")
    public String sayHello() {
        return "Hello World";
    }

    // Create a consultation
    @PostMapping
    public ResponseEntity<Consultation> createConsultation( @RequestBody Consultation consultation) {
        Consultation created = consultationService.createConsultation(consultation);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // Get a consultation by ID
    @GetMapping("/{id}")
    public ResponseEntity<Consultation> getConsultationById(@PathVariable int id) {
        Consultation consultation = consultationService.getConsultationById(id);
        return new ResponseEntity<>(consultation, HttpStatus.OK);
    }

    // Get all consultations
    @GetMapping
    public ResponseEntity<List<Consultation>> getAllConsultations() {
        List<Consultation> consultations = consultationService.findAll();
        return new ResponseEntity<>(consultations, HttpStatus.OK);
    }

    // Update a consultation
    @PutMapping("/{id}")
    public ResponseEntity<Consultation> updateConsultation(@PathVariable int id,  @RequestBody Consultation consultation) {
        Consultation updated = consultationService.updateConsultation(id, consultation);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    // Delete a consultation
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConsultation(@PathVariable int id) {
        consultationService.deleteConsultation(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}