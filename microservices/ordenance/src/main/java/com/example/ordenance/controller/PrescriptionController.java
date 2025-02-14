package com.example.ordenance.controller;


import com.example.ordenance.DTO.PrescriptionDTO;
import com.example.ordenance.services.PrescriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
@RequiredArgsConstructor
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    @GetMapping
    public ResponseEntity<List<PrescriptionDTO>> getAllPrescriptions() {
        return ResponseEntity.ok(prescriptionService.getAllPrescriptions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PrescriptionDTO> getPrescriptionById(@PathVariable Long id) {
        return ResponseEntity.ok(prescriptionService.getPrescriptionById(id));
    }

    @PostMapping
    public ResponseEntity<PrescriptionDTO> createPrescription(@RequestBody PrescriptionDTO dto) {
        return ResponseEntity.ok(prescriptionService.createPrescription(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PrescriptionDTO> updatePrescription(@PathVariable Long id, @RequestBody PrescriptionDTO dto) {
        return ResponseEntity.ok(prescriptionService.updatePrescription(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePrescription(@PathVariable Long id) {
        prescriptionService.deletePrescription(id);
        return ResponseEntity.ok("Prescription deleted successfully.");
    }
}
