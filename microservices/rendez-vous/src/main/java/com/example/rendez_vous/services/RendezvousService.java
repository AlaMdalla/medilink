package com.example.rendez_vous.services;

import com.example.rendez_vous.dto.RendezvousDTO;
import com.example.rendez_vous.entity.Rendezvous;
import com.example.rendez_vous.repository.RendezvousRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RendezvousService {

    private final RendezvousRepository rendezvousRepository;

    public List<RendezvousDTO> getAllRendezvous() {
        return rendezvousRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public RendezvousDTO getRendezvousById(Long id) {
        return rendezvousRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Rendezvous not found!"));
    }

    public RendezvousDTO createRendezvous(RendezvousDTO dto) {
        Rendezvous rendezvous = convertToEntity(dto);
        return convertToDTO(rendezvousRepository.save(rendezvous));
    }

    public RendezvousDTO updateRendezvous(Long id, RendezvousDTO dto) {
        Optional<Rendezvous> existing = rendezvousRepository.findById(id);
        if (existing.isEmpty()) {
            throw new RuntimeException("Rendezvous not found!");
        }

        Rendezvous rendezvous = existing.get();
        rendezvous.setPatientId(dto.getPatientId());
        rendezvous.setDate(dto.getDate());
        rendezvous.setStatus(dto.getStatus());

        return convertToDTO(rendezvousRepository.save(rendezvous));
    }

    public void deleteRendezvous(Long id) {
        if (!rendezvousRepository.existsById(id)) {
            throw new RuntimeException("Rendezvous not found!");
        }
        rendezvousRepository.deleteById(id);
    }

    private RendezvousDTO convertToDTO(Rendezvous rendezvous) {
        return RendezvousDTO.builder()
                .id(rendezvous.getId())
                .patientId(rendezvous.getPatientId())
                .date(rendezvous.getDate())
                .status(rendezvous.getStatus())
                .build();
    }

    private Rendezvous convertToEntity(RendezvousDTO dto) {
        return Rendezvous.builder()
                .id(dto.getId())
                .patientId(dto.getPatientId())
                .date(dto.getDate())
                .status(dto.getStatus())
                .build();
    }
}