import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import WaiterDashboard from "./pages/WaiterDashboard";
import KitchenDashboard from "./pages/KitchenDashboard";
import FrontDeskDashboard from "./pages/FrontDeskDashboard";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/waiter"
          element={
            <PrivateRoute role="waiter">
              <WaiterDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/kitchen"
          element={
            <PrivateRoute role="kitchen">
              <KitchenDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/frontdesk"
          element={
            <PrivateRoute role="frontdesk">
              <FrontDeskDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;