import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import OrderPanel from "../pages/OrderPanel/OrderPanel";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import MainLayout from "./MainLayout";
import ManageUsers from "../pages/ManageUsers/ManageUsers";
import ManageMenu from "../pages/ManageMenu/ManageMenu";
import Menu from "../pages/Menu/Menu";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<ManageUsers/>}/>
          <Route path="/menu" element={<ManageMenu/>} />
          <Route path="/takeaway" element={<OrderPanel type="takeaway" />} />
          <Route path="/dine" element={<OrderPanel />} />
         <Route path="/tkList" element={<Menu/>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AllRoutes;
