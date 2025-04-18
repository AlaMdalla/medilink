package com.example.rendez_vous.entity;

import com.example.rendez_vous.Enum.Status;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Rendezvous {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long patientId;

    private LocalDate date;

    @Enumerated(EnumType.STRING)
    private Status status;

    // Default constructor
    public Rendezvous() {
    }

    // Constructor used by the builder
    private Rendezvous(Builder builder) {
        this.id = builder.id;
        this.patientId = builder.patientId;
        this.date = builder.date;
        this.status = builder.status;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    // Static builder method
    public static Builder builder() {
        return new Builder();
    }

    // Builder class
    public static class Builder {
        private Long id;
        private Long patientId;
        private LocalDate date;
        private Status status;

        private Builder() {
        }

        public Builder id(Long id) {
            this.id = id;
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

        public Builder status(Status status) {
            this.status = status;
            return this;
        }

        public Rendezvous build() {
            return new Rendezvous(this);
        }
    }
}