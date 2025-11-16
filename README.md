# TripZ — Backend API (Node.js + Express + MySQL)

This is the backend service for the **TripZ Travel Packages CRUD Application**, handling authentication, tour management, and database operations with MySQL.

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **MySQL**
- **JWT Authentication**
- **bcrypt**
- **dotenv**
- **CORS**
- **cookie-parser**

---

## 📌 Features

### **Admin**
- Login with JWT  
- Create a Tour  
- Edit a Tour  
- Delete a Tour  
- Authentication protected routes  

### **Public**
- Get all tours  
- Get details of a single tour  

---

## 🗄️ Database Schema (MySQL)

### **Table 1: admins**

```sql
CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

### **Table 2: tours**

```sql
CREATE TABLE tours (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  duration INT NOT NULL,
  start_date DATETIME NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## 🔌 API Endpoints

### **Auth Routes**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Login admin & receive JWT cookie |
| POST | `/api/admin/logout` | Logout admin (clears cookie) |

---

### **Tour Routes**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/api/tours` | Fetch all tours | ❌ No |
| GET | `/api/tours/:id` | Fetch single tour by ID | ❌ No |
| POST | `/api/tours` | Create a new tour | ✅ Yes |
| PUT | `/api/tours/:id` | Update tour by ID | ✅ Yes |
| DELETE | `/api/tours/:id` | Delete tour by ID | ✅ Yes |

---

## ⚙️ Environment Variables

Create a `.env` file:

```
PORT=3000
DB_HOST=localhost
DB_USER=test_user
DB_PASSWORD=StrongPass@123
DB_NAME=tripzsearch
DB_PORT=3306

JWT_SECRET=secretkey
FRONTEND_URL=http://localhost:5173
```

---

## 🛠️ How to Run Locally

### **1. Install Dependencies**
```sh
npm install
```

### **2. Start Server**
```sh
npm run dev
```

Backend runs at:  
`http://localhost:3000`

---

## 🧪 Admin Test Credentials

```
email: admin@example.com
password: password123
```

---

## 🌐 Deployment URLs 

- **Backend Base URL:** [<paste_here>](https://trip-z-backend.vercel.app/)
- **Frontend URL:** [<paste_here>](https://trip-z-frontend.vercel.app/)
- **GitHub Repository:** [<paste_here>](https://github.com/MananBagadi100/TripZ-backend)

---

## 🔒 Notes

- JWT is stored inside **HTTP-only cookies**  
- `withCredentials: true` must be used on frontend  
- CORS is configured for Vercel frontend  
- Passwords are securely hashed with bcrypt  

---

## 📄 Author

TripZ Travel App — Backend API  
Built as part of an assignment project.
