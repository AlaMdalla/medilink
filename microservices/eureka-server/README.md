# 🧭 Eureka Server - Medilink Microservices

This is the **Service Discovery Server** for the Medilink microservices system. It uses **Netflix Eureka** to register and discover all microservices dynamically at runtime.

---

## 📌 Features

- Central registry for all microservices
- Enables load balancing and failover
- Real-time visibility of available services
- Works seamlessly with Spring Cloud Gateway

---

## 🚀 Getting Started

### 📁 Folder Structure

```
eureka-server/
├── src/
├── application.yml
└── pom.xml
```

### ⚙️ Configuration Example

```yaml
server:
  port: 8761

spring:
  application:
    name: eureka-server

eureka:
  client:
    register-with-eureka: false
    fetch-registry: false
  server:
    wait-time-in-ms-when-sync-empty: 0
```

### ▶️ Run the Server

```bash
mvn spring-boot:run
```

Or build and run:

```bash
mvn clean package
java -jar target/eureka-server-0.0.1-SNAPSHOT.jar
```

---

## 🌐 Accessing the Dashboard

- Open your browser:
  ```
  http://localhost:8761
  ```

You’ll see the Eureka dashboard where all registered microservices appear.

---

## 📦 Dependencies

- Spring Cloud Netflix Eureka Server
- Spring Boot

---

## 💡 Notes

All client microservices must include the following in their `application.yml`:

```yaml
eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
  instance:
    prefer-ip-address: true
```

---

## 🧠 Useful Tip

You can enable health checks and instance metadata for better monitoring.

---

## 📄 License

MIT License
