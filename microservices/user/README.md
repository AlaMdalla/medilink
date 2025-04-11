# 👤 User Service - Medilink Microservices

This is the **User Management** microservice for the Medilink system. It handles registration, authentication, and user profiles.

---

## 📌 Features

- User creation and profile management
- Future support for role-based access and authentication
- RESTful API

---

## 🗂️ Folder Structure

```
user/
├── src/
├── application.yml
└── pom.xml
```

---

## 🚀 Getting Started

```bash
mvn spring-boot:run
```

Or:

```bash
mvn clean package
java -jar target/user-0.0.1-SNAPSHOT.jar
```

---

## 🔗 Sample Endpoints

```http
POST   /users/register
GET    /users/{id}
PUT    /users/{id}
```

---

## ⚙️ Configuration

```yaml
spring:
  application:
    name: user
  config:
    import: optional:configserver:http://localhost:8888

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
```

---

## 📦 Dependencies

- Spring Web
- Spring Data JPA
- Eureka Client
- Spring Boot

---

## 📄 License

MIT License
