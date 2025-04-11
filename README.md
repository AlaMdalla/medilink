# 🚪 API Gateway - Medilink Microservices

This is the **API Gateway** for the Medilink system, built using **Spring Cloud Gateway**. It acts as a single entry point for all client requests and forwards them to the appropriate microservice.

---

## 📌 Features

- Centralized routing for all microservices
- Dynamic service discovery via Eureka
- Load balancing and path-based routing
- Future support for global filters (e.g., authentication, logging)

---

## 🗂️ Folder Structure

```
gateway/
├── src/
├── application.yml
└── pom.xml
```

---

## 🚀 Getting Started

### ▶️ Run the Gateway

```bash
mvn spring-boot:run
```

Or build and run:

```bash
mvn clean package
java -jar target/gateway-0.0.1-SNAPSHOT.jar
```

---

## ⚙️ Configuration Example

```yaml
server:
  port: 8080

spring:
  application:
    name: gateway

  cloud:
    gateway:
      discovery:
        locator:
          enabled: true
          lower-case-service-id: true
      routes:
        - id: user-service
          uri: lb://user
          predicates:
            - Path=/users/**
        - id: consultation-service
          uri: lb://consultation
          predicates:
            - Path=/consultations/**
        - id: notification-service
          uri: lb://notification
          predicates:
            - Path=/notifications/**
        # Add more routes here...

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
```

---

## 🔗 Example Requests

```http
GET http://localhost:8080/users/
GET http://localhost:8080/consultations/
```

---

## 📦 Dependencies

- Spring Cloud Gateway
- Spring Boot
- Spring Cloud Netflix Eureka Client

---

## 💡 Notes

- Ensure all target microservices are up and registered in Eureka.
- You can add global filters for logging, security, or header manipulation in future enhancements.

---

## 📄 License

MIT License
