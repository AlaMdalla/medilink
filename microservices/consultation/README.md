# 📅 Consultation Service - Medilink Microservices

This microservice manages **medical consultations**, doctor scheduling, and patient histories.

---

## 📌 Features

- Create, update, view consultations
- Associate consultations with patients and doctors
- RESTful API

---

## 🗂️ Folder Structure

```
consultation/
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
GET    /consultations/
POST   /consultations/
PUT    /consultations/{id}
DELETE /consultations/{id}
```

---

## ⚙️ Configuration

```yaml
spring:
  application:
    name: consultation
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
