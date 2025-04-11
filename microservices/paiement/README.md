# 🧾 Subscription Service - Medilink Microservices

This microservice handles **premium plans and subscriptions** for the platform.

---

## 📌 Features

- Manage subscription tiers (Free, Pro, Enterprise)
- Create, upgrade, cancel subscriptions
- Billing logic (to be extended)

---

## 🗂️ Folder Structure

```
subscription/
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
GET    /subscriptions/
POST   /subscriptions/
PUT    /subscriptions/{id}
```

---

## ⚙️ Configuration

```yaml
spring:
  application:
    name: subscription
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
