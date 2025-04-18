package com.example.rendez_vous.repo;

import com.example.rendez_vous.entity.Rendezvous;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RendezvousRepository extends JpaRepository<Rendezvous, Long> {
}