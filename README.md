<div align="center">

# 🍽️ Restaurant Management System

### A Full-Stack MERN Restaurant Management Platform with Real-Time Order Processing

Real-time restaurant operations powered by **React**, **Node.js**, **Express**, **MongoDB**, and **Socket.IO**.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![NodeJS](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--Time-010101?style=for-the-badge&logo=socketdotio)
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?style=for-the-badge&logo=redux)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge)

🚀 **Live Demo:**  https://restaurant-management-system-mbmj.onrender.com/

</div>

---

# 📖 Overview

Restaurant Management System is a full-stack web application that digitizes restaurant operations. It enables seamless communication between **Waiters**, **Kitchen Staff**, **Front Desk**, and **Administrators** through real-time updates using **Socket.IO**.

The application simplifies restaurant workflows by managing orders, tables, menus, billing, payments, users, and revenue analytics from a centralized platform.

---

# 🌐 Live Demo

Experience the application live:

🔗 **Application:**  https://restaurant-management-system-mbmj.onrender.com/

> **Demo Credentials**
>
> Use the credentials below to explore different user roles.
>
> | Role | Email | Password |
> |------|-------|----------|
> | Admin | saikiran@gmail.com | saikiran92 |
> | Waiter | neeraj@gmail.com | neeraj |
> | Kitchen | sravan@gmail.com | sravan |
> | Front Desk | kiran@gmail.com | kiran |


# 📸 Project Preview

| Login | Dashboard |
|-------|-----------|
| ![](https://i.postimg.cc/d1C6MDFL/Screenshot-(20).png) | ![](https://i.postimg.cc/HnHQf23S/Screenshot-(21).png) |

| Create Order |  Orders |
|---------|----------|
| ![](https://i.postimg.cc/HkJ7vRdW/Screenshot-(24).png) | ![](https://i.postimg.cc/ncqLsxFw/Screenshot-(26).png) |

| Billing | Revenue |
|----------|----------|
| ![](https://i.postimg.cc/zBfN0Z1Z/Screenshot-(25).png) | ![](images/revenue.png) |

# ✨ Features

## 🔐 Authentication & Authorization

- JWT Authentication
- Protected Routes
- Secure Password Encryption
- Role-Based Access Control

---

## 👨‍💼 Admin

- Dashboard
- Manage Users
- Manage Menu
- Manage Tables
- View Orders
- Revenue Dashboard
- Restaurant Analytics

---

## 👨‍🍳 Kitchen

- Receive Orders Instantly
- Live Order Queue
- Update Cooking Status
- Ready Order Notifications

---

## 🧑‍💼 Waiter

- Create Orders
- Select Tables
- Add Menu Items
- Update Existing Orders
- Dine-In Orders
- Takeaway Orders

---

## 💳 Front Desk

- View Customer Orders
- Generate Bills
- Print Bills
- Mark Payments
- Release Tables Automatically

---

# 🚀 Highlights

- ⚡ Real-Time Order Updates
- 🔒 Secure Authentication
- 👥 Role-Based Dashboard
- 🍽️ Table Management
- 📋 Menu Management
- 💰 Billing System
- 🧾 Invoice Printing
- 📊 Revenue Dashboard
- 📱 Responsive Design
- 🔔 Notification Support

---

# 🛠 Tech Stack

## Frontend

- React 19
- Vite
- Chakra UI
- Redux Toolkit
- React Router DOM
- Axios
- Socket.IO Client
- Recharts
- Framer Motion
- React Icons
- React To Print
- Lottie Animations

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Socket.IO
- CORS
- Dotenv

---

# 📂 Project Structure

```
Restaurant_Management
│
├── frontend
│   ├── public
│   ├── src
│   │
│   ├── assets
│   ├── components
│   ├── contextAPI
│   ├── pages
│   │     ├── Dashboard
│   │     ├── Login
│   │     ├── KitchenDashboard
│   │     ├── ManageMenu
│   │     ├── ManageTables
│   │     ├── ManageUsers
│   │     ├── OrderPanel
│   │     ├── OrdersList
│   │     └── RevenueDashboard
│   │
│   ├── redux
│   ├── services
│   ├── utils
│   └── App.jsx
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

# 🏗️ System Architecture

```text
             Customer

                │

                ▼

          Waiter Dashboard

                │

                ▼

         Socket.IO Server

        ┌────────┴────────┐

        ▼                 ▼

Kitchen Dashboard    Front Desk

        │                 │

        ▼                 ▼

   Food Ready       Generate Bill

        │                 │

        └────────┬────────┘

                 ▼

              Payment

                 ▼

         Table Available
```

---

# 🔄 Application Workflow

### 1. Waiter

- Login
- Select Table
- Add Food Items
- Submit Order

↓

### 2. Kitchen

- Receives Order Instantly
- Starts Preparation
- Marks Food Ready

↓

### 3. Front Desk

- Views Completed Orders
- Generates Bill
- Prints Invoice
- Receives Payment

↓

### 4. Table Status

Automatically changes from

```
Occupied ➜ Available
```

after successful payment.

---

# 📊 Modules

### Dashboard

- Restaurant Summary
- Active Orders
- Revenue Overview

---

### User Management

- Add User
- Edit User
- Delete User
- Assign Roles

---

### Menu Management

- Create Menu
- Update Menu
- Delete Menu
- Categories

---

### Table Management

- Add Tables
- Edit Tables
- Occupancy Status

---

### Order Management

- Create Order
- Modify Order
- Track Status
- Payment Status

---

### Revenue Dashboard

- Sales Analytics
- Revenue Charts
- Order Statistics

---

# 📸 Screenshots

Replace the placeholder images below with screenshots.

```
images/

├── login.png
├── dashboard.png
├── menu.png
├── waiter.png
├── kitchen.png
├── billing.png
├── revenue.png
├── users.png
├── tables.png
```

Example:

```md
## Login

![Login](images/login.png)

## Dashboard

![Dashboard](images/dashboard.png)

## Kitchen

![Kitchen](images/kitchen.png)

## Billing

![Billing](images/billing.png)
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Rsaikiran92/Restaurant_Management.git
```

```bash
cd Restaurant_Management
```

---

## Install Frontend

```bash
cd frontend
npm install
```

---

## Install Backend

```bash
cd backend
npm install
```

---

# 🔑 Environment Variables

## Backend (.env)

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173
```

---

## Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api

VITE_SOCKET_URL=http://localhost:5000
```

---

# ▶️ Run Application

### Backend

```bash
cd backend

npm start
```

---

### Frontend

```bash
cd frontend

npm run dev
```

---

# 📦 API Modules

- Authentication
- Users
- Menu
- Orders
- Tables
- Revenue

---

# 🔒 Security

- JWT Authentication
- Password Hashing using Bcrypt
- Protected APIs
- Middleware Authorization

---

# ⚡ Real-Time Communication

Socket.IO is used for:

- New Order Notifications
- Kitchen Updates
- Order Status Changes
- Payment Updates
- Table Availability

---

# 📈 Future Enhancements

- QR Code Ordering
- Online Payments
- Inventory Management
- Customer Feedback
- Multi Branch Support
- Reservation System
- Kitchen Analytics
- Email Notifications
- Mobile Application

---

# 🤝 Contributing

1. Fork the repository

2. Create your feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to your branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 👨‍💻 Author

**Sai Kiran**

- GitHub: https://github.com/Rsaikiran92

---

# ⭐ Support

If you found this project helpful, consider giving it a **⭐ Star** on GitHub.

It motivates future improvements and helps others discover the project.
