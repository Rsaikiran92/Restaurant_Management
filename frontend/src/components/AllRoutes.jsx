import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import OrderPanel from "../pages/OrderPanel/OrderPanel";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import MainLayout from "./MainLayout";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/takeaway" element={<OrderPanel type="takeaway" />} />
          <Route path="/dine" element={<OrderPanel />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AllRoutes;
