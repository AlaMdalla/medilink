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
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("")
    public List<Notification> hello() {
        return  this.notificationService.getAllNotifications();   }

    @PostMapping("/add")
    public Notification createNotification(@RequestBody Notification notification) {
        System.out.println("Received notification: " + notification);
        Notification saved = notificationService.sendNotification(notification);
        System.out.println("Saved notification: " + saved);
        return saved;
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
