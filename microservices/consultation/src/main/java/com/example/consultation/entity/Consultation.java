package com.example.consultation.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Consultation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idConsultation;


    private int rendezVousId; // Au lieu de @ManyToOne
    private int medecinId; // Au lieu de @ManyToOne
    private int patientId;
    private int paiementId;
    private LocalDateTime dateConsultation;

    private Integer duree; // En minutes

    @Enumerated(EnumType.STRING)
    private StatutConsultation statut;

    private String motif;

    private String diagnostic;

    private String prescription;

    @Enumerated(EnumType.STRING)
    private ModeConsultation modeConsultation;

    private Double prix;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt;

    @PreUpdate
    public void setLastUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public int getIdConsultation() {
        return idConsultation;
    }

    public void setIdConsultation(int idConsultation) {
        this.idConsultation = idConsultation;
    }

}

