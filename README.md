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
### 👨‍💼 Admin
- Secure Admin Login
- Dashboard Overview
- Create, Update & Delete Users
- Manage Waiters
- Manage Kitchen Staff
- Manage Front Desk Staff
- Manage Menu Items
- Category-wise Menu Management
- JWT Authentication
- Protected Routes

### 🧑‍🍳 Waiter
- Login Authentication
- Create New Orders
- Select Dining Tables
- Add Menu Items
- Update Existing Orders
- Increase/Decrease Item Quantity
- Add More Items to Existing Orders
- Send Orders to Kitchen
- Real-time Order Status

### 🍳 Kitchen
- View Incoming Orders
- Real-time Order Updates
- Order Preparation Status
- Mark Orders as Completed
- Track Pending Orders

### 💳 Front Desk
- View All Active Tables
- View Order Details
- Generate Customer Bill
- Print Bills
- Update Payment Status
- Handle Takeaway Orders
- Manage Customer Checkout
- 🍴 Menu Management
- Veg Items
- Non-Veg Items
- Starter (Veg)
- Starter (Non-Veg)
- Desserts
- Drinks
- Item Images
- Price Management
- Availability Status

### 🪑 Table Management
- Create Tables
- Table Availability
- Occupied Tables
- Table-wise Orders
- Table Status Tracking

### 💰 Billing System
- Automatic Bill Calculation
- Quantity-based Pricing
- GST/Tax Ready Structure
- Payment Status
- Printable Invoice

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

