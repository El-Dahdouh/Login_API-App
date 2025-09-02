# Login_API_APP
A **Node.js** & **Express** authentication API that provides secure user management features such as registration, login, logout, refresh tokens, and profile access.  
The project is **containerized with Docker**, supports both **automated CI/CD** using GitHub Actions and **manual CI**, and includes **unit testing with Jest**.  
Database is hosted on **MongoDB Atlas (Cloud DB)**.

---

## 🚀 Features
- 🔑 **User Authentication**
  - Register (`/register`)
  - Login (`/login`)
  - Logout (`/logout`)
  - Refresh Token (`/refresh`)
  - Profile (`/profile`)
- 🛡️ **JWT-based authentication**
  - Access Token
  - Refresh Token
- 🗄️ **MongoDB Atlas Cloud Database**
- 🧪 **Unit testing with Jest**
- 🐳 **Dockerfile & Docker Compose**
- ⚡ **GitHub Actions**
  - Automated CI pipeline
  - Manual CI pipeline

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Auth:** JSON Web Tokens (JWT)
- **Testing:** Jest
- **Containerization:** Docker, Docker Compose
- **CI/CD:** GitHub Actions

---

## ⚙️ Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/El-Dahdouh/Login_API-App.git
cd Login_API-APP
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
MONGODB_URI=<your-mongodb-atlas-uri>
JWT_ACCESS_SECRET=<your-access-secret>
JWT_REFRESH_SECRET=<your-refresh-secret>
```

### 4. Run Locally
```bash 
npm run dev
```
---
API runs on: http://localhost:5000

## 🧪 Run Tests
```bash
npm test
```

## 🐳 Run with Docker
```bash
docker build -t login-api-app .
```
## Run Container
```bash
docker run -d -p 5000:5000 login-api-app
```

## Run with Docker Compose
```bash
docker-compose up -d
```

## CI/CD Pipeline

### Automated CI (GitHub Actions)
- Triggered on every push to `main`.
- **Jobs:**
  - Run tests with Jest.
  - Build & push Docker images for backend & frontend.

### Manual CI
- Can be triggered manually from GitHub Actions.
- Performs the same jobs as the automated pipeline:
  - Run tests with Jest.
  - Build & push Docker images for backend & frontend.


