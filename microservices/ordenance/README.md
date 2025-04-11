# 💊 Ordonnance Service - Medilink Microservices

This microservice manages **prescriptions and medical orders** for patients.

---

## 📌 Features

- Create, update, and list prescriptions
- Link prescriptions to consultations

---

## 🗂️ Folder Structure

```
ordenance/
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
GET    /ordonnances/
POST   /ordonnances/
GET    /ordonnances/{id}
```

---

## ⚙️ Configuration

```yaml
spring:
  application:
    name: ordenance
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
