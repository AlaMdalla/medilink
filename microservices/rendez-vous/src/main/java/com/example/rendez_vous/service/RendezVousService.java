package com.example.rendez_vous.service;

import com.example.rendez_vous.entity.RendezVous;
import com.example.rendez_vous.repository.RendezVousRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RendezVousService {
    @Autowired
    private RendezVousRepository rendezVousRepository;
    public List<RendezVous> findAll() {
        return rendezVousRepository.findAll();
    }


}
