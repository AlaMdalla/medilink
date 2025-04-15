package com.example.user.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/demo")
public class HelloController {
    @GetMapping("/hello")
    public String hello() {
        return "Hello, authenticated user!";
    }
    @GetMapping("/hello-2")
    public String hello2() {
        return "Hello, authenticated admin!";
    }
}