# 💬 Notification Service - Medilink Microservices

This microservice handles **system notifications** (email, SMS, etc.) sent to users and staff.

---

## 📌 Features

- Send notifications on events like registration, appointments, updates
- Support for multiple channels (to be extended)

---

## 🗂️ Folder Structure

```
notification/
├── src/
├── application.yml
└── pom.xml
```

---

## 🚀 Getting Started

```bash
mvn spring-boot:run
```

---

## 🔗 Sample Endpoints

```http
POST /notifications/send
```

Payload example:

```json
{
  "to": "user@example.com",
  "message": "Your appointment is confirmed.",
  "type": "EMAIL"
}
```

---

## ⚙️ Configuration

```yaml
spring:
  application:
    name: notification
  config:
    import: optional:configserver:http://localhost:8888

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
```

---

## 📄 License

MIT License
