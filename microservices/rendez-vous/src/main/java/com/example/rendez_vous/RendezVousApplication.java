package com.example.rendez_vous;

import com.example.rendez_vous.entity.RendezVous;
import com.example.rendez_vous.repository.RendezVousRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;


import java.time.LocalDateTime;

@SpringBootApplication
@EnableDiscoveryClient
public class RendezVousApplication {

	public static void main(String[] args) {
		SpringApplication.run(RendezVousApplication.class, args);
	}
	@Autowired
	private RendezVousRepository rendezVousRepository;

	@Bean
	public ApplicationRunner init() {
		return (args) -> {
			rendezVousRepository.save(new RendezVous(LocalDateTime.now(), RendezVous.Status.PENDING));
		};
	}

}
