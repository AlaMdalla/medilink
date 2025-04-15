package com.example.getway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@EnableDiscoveryClient
@CrossOrigin
public class GetwayApplication {

	public static void main(String[] args) {
		SpringApplication.run(GetwayApplication.class, args);

	}
	@Bean
	public RouteLocator customRouteLocator(RouteLocatorBuilder builder){
		return builder.routes().route("notification",r->r.path("/notification/**").uri("lb://NOTIFICATION"))
				.route("ordenance",r->r.path("/ordenance/**").uri("lb://SERVICEORDENANCE"))
				.route("paiement",r->r.path("/paiement/**").uri("lb://PAIEMENT"))
				.route("rendez-vous",r->r.path("/rendez-vous/**").uri("lb://RENDEZ-VOUS"))
				.route("user",r->r.path("/user/**").uri("lb://USER"))
				.route("consultation",r->r.path("/consultation/**").uri("lb://CONSULTATION"))
				.route("config-server",r->r.path("/config-server/**").uri("lb://config-server"))
				.route("NODE-SERVICE",r->r.path("/support/**").uri("lb://NODE-SERVICE"))




				.build();


	}
}
