# Restaurant_Management
### 🍽️ Restaurant Management System

A full-stack Restaurant Management System built using the MERN Stack (MongoDB, Express.js, React.js, Node.js). This application streamlines restaurant operations by allowing waiters, kitchen staff, front desk executives, and administrators to efficiently manage orders, tables, menus, billing, and users in real time.

Orders placed by waiters are pushed instantly to the kitchen using **Socket.IO**. As the kitchen updates order status, those changes reflect live across every connected panel, keeping all roles in sync without needing to refresh.

---
 
## ✨ Features
 
- **Role-based access control** — separate dashboards and permissions for Admin, Waiter, Kitchen, and Front Desk
- **Real-time order flow** — orders created by waiters appear instantly on the kitchen display via Socket.IO
- **Live status updates** — kitchen staff update order status (e.g., preparing, ready, served) and changes sync across all panels immediately
- **Table & order management** — track active tables, orders, and billing
- **Secure authentication** — JWT-based auth with password hashing via Bcrypt.js
- **Menu management** — admins can manage menu items and categories
---

## ⚙️ Tech Stack
 
### Frontend
- React.js
- Vite
- React Router DOM
- Redux Toolkit
- Axios
- CSS3
### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT Authentication
- Bcrypt.js
### Tools
- Git & GitHub
- Postman
- VS Code
---
 
## 📁 Project Structure
 
```
Restaurant_Management/
├──backend/      # Express + MongoDB API, Socket.IO server, auth logic
│     ├── controllers/ 
│     ├── middleware/
│     ├── models/
│     ├── routes/
│     ├── config/
│     ├── index.js
│     └── package.json         
├──frontend/        # React + Vite client application
│      ├── src/
│      │    ├── assets/ 
│      │    ├── middleware/
│      │    ├── components/
│      │    ├── contextAPI/
│      │    ├── pages/
│      │    ├── redux/
│      │    ├── utils/
│      │    ├── App.css
│      │    ├── App.jsx
│      │    ├── index.css
│      │    └── main.jsx     
│      ├── public/
│      └── package.json       
└── README.md
```
 
---

