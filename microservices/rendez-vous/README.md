# 📆 Rendez-vous Service - Medilink Microservices

This service manages **appointment scheduling** between patients and doctors.

---

## 📌 Features

- Schedule, update, cancel appointments
- Avoid overlaps with smart time slots
- RESTful APIs

---

## 🗂️ Folder Structure

```
rendez-vous/
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
GET    /rendezvous/
POST   /rendezvous/
PUT    /rendezvous/{id}
DELETE /rendezvous/{id}
```

---

## ⚙️ Configuration

```yaml
spring:
  application:
    name: rendez-vous
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
