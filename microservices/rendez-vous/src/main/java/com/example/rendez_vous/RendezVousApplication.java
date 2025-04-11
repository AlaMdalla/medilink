package com.example.rendez_vous;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@EnableDiscoveryClient
@SpringBootApplication
@RestController
@RequestMapping("rendez-vous")
public class RendezVousApplication {

	public static void main(String[] args) {
		SpringApplication.run(RendezVousApplication.class, args);

	}
	@GetMapping("/hello")
	public String hello() {
		return"hellpo";
	}
}
