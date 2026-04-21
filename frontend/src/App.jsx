import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";

import AdminDashboard from "./pages/AdminDashboard";
import WaiterDashboard from "./pages/WaiterDashboard";
import KitchenDashboard from "./pages/KitchenDashboard";
import FrontDeskDashboard from "./pages/FrontDeskDashboard";
import PrivateRoute from "./components/PrivateRoute";
import { Theme } from "@chakra-ui/react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./pages/Login/Login";
import OrderPanel from "./pages/OrderPanel/OrderPanel";
import AllRoutes from "./components/AllRoutes";

function App() {
  return (
    <Theme appearance="light">
      <Navbar/>
      <div style={{display:"flex"}}>
        <Sidebar />
        <AllRoutes />
      </div>
    </Theme>
  );
}

export default App;
