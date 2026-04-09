import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import WaiterDashboard from "./pages/WaiterDashboard";
import KitchenDashboard from "./pages/KitchenDashboard";
import FrontDeskDashboard from "./pages/FrontDeskDashboard";
import PrivateRoute from "./components/PrivateRoute";
import { Theme } from '@chakra-ui/react';
import Navbar from "../src/components/Navbar"

function App() {
  return (
     <Theme appearance="light">
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
              <Navbar/>
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
    </Theme>
  );
}

export default App;