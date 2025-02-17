package com.example.rendez_vous.Controller;

import com.example.rendez_vous.entity.RendezVous;
import com.example.rendez_vous.service.RendezVousService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rendezvous")
public class RendezVousController {
    @Autowired
    private RendezVousService rendezVousService;

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, Spring Boot!";
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<RendezVous>> listRendezVous() {
        return new ResponseEntity<>(rendezVousService.findAll(), HttpStatus.OK);
    }

}
