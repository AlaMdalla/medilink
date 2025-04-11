# 🏥 Medilink Microservices

![Java](https://img.shields.io/badge/Java-17-blue)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.0-brightgreen)
![Microservices](https://img.shields.io/badge/Microservices-Architecture-orange)
![License](https://img.shields.io/badge/License-MIT-green)

Medilink is a **microservices-based healthcare application** designed to manage various aspects of medical practice, including:

- 👤 User Management  
- 📅 Consultations & Appointments  
- 💬 Notifications  
- 💊 Prescriptions  
- 🧾 Subscriptions  

Built using **Spring Boot**, **Spring Cloud**, and **Netflix Eureka**, the system ensures scalability, configurability, and robustness.

---

## 🗂️ Project Structure

Each feature is implemented as an independent microservice:

```
medilink/
│
├── config-server         📁 Centralized configuration
├── eureka-server         📁 Service discovery with Netflix Eureka
├── gateway               📁 API gateway
├── user                  📁 User management
├── consultation          📁 Medical consultations
├── notification          📁 System notifications
├── ordenance             📁 Prescription services
├── rendez-vous           📁 Appointment scheduling
└── subscription          📁 User subscriptions
```

---

## 🚀 Getting Started

### ✅ Prerequisites

- ☕ Java 17+
- 🧰 Maven 3.6+
- 🐳 Docker (optional)

### 🔧 Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AlaMdalla/medilink.git
   cd medilink/microservices
   ```

2. **Start Config Server**:
   ```bash
   cd config-server
   mvn spring-boot:run
   ```

3. **Start Eureka Server**:
   ```bash
   cd ../eureka-server
   mvn spring-boot:run
   ```

4. **Start API Gateway**:
   ```bash
   cd ../gateway
   mvn spring-boot:run
   ```

5. **Start All Other Microservices**:
   ```bash
   cd ../<service-name>
   mvn spring-boot:run
   ```
   Replace `<service-name>` with: `user`, `consultation`, `notification`, `ordenance`, `rendez-vous`, `subscription`

---

## ⚙️ Configuration Management

All configs are centralized in the **Config Server**.

Each service must include:

```yaml
spring:
  config:
    import: optional:configserver:http://localhost:8888
```

And in `application.yml` of each service:

```yaml
eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
  instance:
    prefer-ip-address: true
```

---

## 🌐 API Gateway Routing

Example routes for the `gateway`:

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://user
          predicates:
            - Path=/users/**
        - id: consultation-service
          uri: lb://consultation
          predicates:
            - Path=/consultations/**
```

---

## 🐳 Docker Support (Optional)

1. Create a `Dockerfile` in each microservice folder.
2. Build and tag the images:
   ```bash
   docker build -t user-service .
   ```
3. Create a `docker-compose.yml` to orchestrate services.
4. Run all containers:
   ```bash
   docker-compose up
   ```

---

## 🔒 Security (Future Enhancement)

- Spring Security + JWT / OAuth2
- Gateway-based authentication filter
- Role-based access control for microservices

---

## 📊 Monitoring & Logging (Optional)

- 📈 Metrics: Prometheus + Grafana
- 📋 Logs: ELK Stack (Elasticsearch + Logstash + Kibana)

---

## 🙌 Contributing

Contributions are welcome!  
Please fork the repo, create a new branch, and submit a pull request.

---

## 📄 License

This project is licensed under the **MIT License**.  
See the `LICENSE` file for more details.

---

> 🛠️ *Built with ❤️ using Spring Cloud & Microservice Best Practices*
