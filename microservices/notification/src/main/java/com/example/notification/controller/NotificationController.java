package com.example.notification.controller;


import com.example.notification.entities.Notification;
import com.example.notification.entities.NotificationStatus;
import com.example.notification.services.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*")

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private  NotificationService notificationService;
    @GetMapping("")
    public String hello() {
        return"hellpo";
    }
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
}

