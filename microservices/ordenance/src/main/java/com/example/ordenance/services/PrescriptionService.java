package com.example.ordenance.services;


import com.example.ordenance.DTO.PrescriptionDTO;
import com.example.ordenance.entities.Prescription;
import com.example.ordenance.repository.PrescriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;

    public List<PrescriptionDTO> getAllPrescriptions() {
        return prescriptionRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PrescriptionDTO getPrescriptionById(Long id) {
        return prescriptionRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Prescription not found!"));
    }

    public PrescriptionDTO createPrescription(PrescriptionDTO dto) {
        Prescription prescription = convertToEntity(dto);
        return convertToDTO(prescriptionRepository.save(prescription));
    }

    public PrescriptionDTO updatePrescription(Long id, PrescriptionDTO dto) {
        Optional<Prescription> existing = prescriptionRepository.findById(id);
        if (existing.isEmpty()) {
            throw new RuntimeException("Prescription not found!");
        }

        Prescription prescription = existing.get();
        prescription.setDoctorId(dto.getDoctorId());
        prescription.setPatientId(dto.getPatientId());
        prescription.setDate(dto.getDate());
        prescription.setMedicationList(dto.getMedicationList());

        return convertToDTO(prescriptionRepository.save(prescription));
    }

    public void deletePrescription(Long id) {
        if (!prescriptionRepository.existsById(id)) {
            throw new RuntimeException("Prescription not found!");
        }
        prescriptionRepository.deleteById(id);
    }

    private PrescriptionDTO convertToDTO(Prescription prescription) {
        return PrescriptionDTO.builder()
                .id(prescription.getId())
                .doctorId(prescription.getDoctorId())
                .patientId(prescription.getPatientId())
                .date(prescription.getDate())
                .medicationList(prescription.getMedicationList())
                .build();
    }

    private Prescription convertToEntity(PrescriptionDTO dto) {
        return Prescription.builder()
                .id(dto.getId())
                .doctorId(dto.getDoctorId())
                .patientId(dto.getPatientId())
                .date(dto.getDate())
                .medicationList(dto.getMedicationList())
                .build();
    }
}

