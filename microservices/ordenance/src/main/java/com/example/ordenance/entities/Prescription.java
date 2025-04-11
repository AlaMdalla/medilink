package com.example.ordenance.entities;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long doctorId;
    private Long patientId;
    private LocalDate date;

    @ElementCollection
    private List<String> medicationList;

    // Default constructor
    public Prescription() {
    }

    // Constructor with all fields
    public Prescription(Long id, Long doctorId, Long patientId, LocalDate date, List<String> medicationList) {
        this.id = id;
        this.doctorId = doctorId;
        this.patientId = patientId;
        this.date = date;
        this.medicationList = medicationList;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public List<String> getMedicationList() {
        return medicationList;
    }

    public void setMedicationList(List<String> medicationList) {
        this.medicationList = medicationList;
    }

    // Manual Builder implementation
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private Long doctorId;
        private Long patientId;
        private LocalDate date;
        private List<String> medicationList;

        private Builder() {
        }

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder doctorId(Long doctorId) {
            this.doctorId = doctorId;
            return this;
        }

        public Builder patientId(Long patientId) {
            this.patientId = patientId;
            return this;
        }

        public Builder date(LocalDate date) {
            this.date = date;
            return this;
        }

        public Builder medicationList(List<String> medicationList) {
            this.medicationList = medicationList;
            return this;
        }

        public Prescription build() {
            return new Prescription(id, doctorId, patientId, date, medicationList);
        }
    }
}