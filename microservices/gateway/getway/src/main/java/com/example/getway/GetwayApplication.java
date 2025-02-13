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
		//return builder.routes().route("candidat",r->r.path("/candidats/**").uri("http://localhost:8054")).build();
		return builder.routes().route("problem",r->r.path("/problems/**").uri("lb://SERVICEPROBLEMS"))
				.route("submition",r->r.path("/submitions/**").uri("lb://SERVICEPROBLEMS"))
				.route("blog",r->r.path("/blog/**").uri("lb://BLOG"))
				.route("training",r->r.path("/trainings/**").uri("lb://TRAINING"))
				.route("question",r->r.path("/question/**").uri("lb://TRAINING"))

				.build();


	}
}
