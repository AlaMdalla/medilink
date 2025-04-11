package com.example.notification.services;


import com.example.notification.entities.Notification;
import com.example.notification.entities.NotificationStatus;
import com.example.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private  NotificationRepository notificationRepository;

    public Notification sendNotification(Notification notification) {
        notification.setStatus(NotificationStatus.PENDING);
        return notificationRepository.save(notification);
    }

    public List<Notification> getNotificationsByUserId(Long userId) {
        return notificationRepository.findByUserId(userId);
    }

    public void updateNotificationStatus(Long id, NotificationStatus status) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        notification.setStatus(status);
        notificationRepository.save(notification);
    }
}

