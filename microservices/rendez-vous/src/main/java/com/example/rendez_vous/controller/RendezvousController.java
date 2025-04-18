package com.example.rendez_vous.controller;

import com.example.rendez_vous.dto.RendezvousDTO;
import com.example.rendez_vous.services.RendezvousService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rendezvous")
public class RendezvousController {

    private final RendezvousService rendezvousService;

    public RendezvousController(RendezvousService rendezvousService) {
        this.rendezvousService = rendezvousService;
    }

    @GetMapping
    public ResponseEntity<List<RendezvousDTO>> getAllRendezvous() {
        return ResponseEntity.ok(rendezvousService.getAllRendezvous());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RendezvousDTO> getRendezvousById(@PathVariable Long id) {
        return ResponseEntity.ok(rendezvousService.getRendezvousById(id));
    }

    @PostMapping
    public ResponseEntity<RendezvousDTO> createRendezvous(@RequestBody RendezvousDTO dto) {
        return ResponseEntity.ok(rendezvousService.createRendezvous(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RendezvousDTO> updateRendezvous(@PathVariable Long id, @RequestBody RendezvousDTO dto) {
        return ResponseEntity.ok(rendezvousService.updateRendezvous(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRendezvous(@PathVariable Long id) {
        rendezvousService.deleteRendezvous(id);
        return ResponseEntity.ok("Rendezvous deleted successfully.");
    }
}