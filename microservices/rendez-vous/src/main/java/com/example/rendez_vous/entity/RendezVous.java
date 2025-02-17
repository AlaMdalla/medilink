package com.example.rendez_vous.entity;


import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
public class RendezVous {
    @Id
    @GeneratedValue
    private Long id;

    private LocalDateTime date;

    @Enumerated(EnumType.STRING)
    private Status status;

    public RendezVous() {
        this.date = LocalDateTime.now();
        this.status = Status.PENDING;
    }

    public RendezVous(LocalDateTime date, Status status) {
        this.date = date;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public enum Status {
        PENDING,
        CONFIRMED,
        CANCELED
    }
}
