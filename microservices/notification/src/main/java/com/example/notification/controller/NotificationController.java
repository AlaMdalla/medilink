package com.example.notification.controller;


import com.example.notification.entities.Notification;
import com.example.notification.entities.NotificationStatus;
import com.example.notification.services.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping
    public Notification createNotification(@RequestBody Notification notification) {
        return notificationService.sendNotification(notification);
    }

    @GetMapping("/user/{userId}")
    public List<Notification> getNotifications(@PathVariable Long userId) {
        return notificationService.getNotificationsByUserId(userId);
    }

    @PutMapping("/{id}/status")
    public void updateStatus(@PathVariable Long id, @RequestParam NotificationStatus status) {
        notificationService.updateNotificationStatus(id, status);
    }
    @Value("${welcome.message}")
    private String message;
    //simple web service for testing
    @GetMapping("/hello")
    public String sayHello() {

        return message;
    }
}

