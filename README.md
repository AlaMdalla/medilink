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
medilink/ │ ├── config-server 📁 Centralized configuration ├── eureka-server 📁 Service discovery with Netflix Eureka ├── gateway 📁 API gateway ├── user 📁 User management ├── consultation 📁 Medical consultations ├── notification 📁 System notifications ├── ordenance 📁 Prescription services ├── rendez-vous 📁 Appointment scheduling └── subscription 📁 User subscriptions

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
2. **Start Config Server**:
  ```bash
   cd config-server
   mvn spring-boot:run





