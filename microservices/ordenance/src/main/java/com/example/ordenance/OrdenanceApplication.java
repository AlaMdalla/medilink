package com.example.ordenance;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class OrdenanceApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrdenanceApplication.class, args);
	}

}
