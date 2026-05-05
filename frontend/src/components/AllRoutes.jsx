import KitchenDashboard from "../pages/KitchenDashboard/KitchenDashboard";
import ManageTables from "../pages/ManageTables/ManageTables";
import ManageUsers from "../pages/ManageUsers/ManageUsers";
import OrderPanel from "../pages/OrderPanel/OrderPanel";
import ManageMenu from "../pages/ManageMenu/ManageMenu";
import OrdersList from "../pages/OrderList/OrderList";
import Dashboard from "../pages/Dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login/Login";
import MainLayout from "./MainLayout";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/kitchen" element={<KitchenDashboard/>} />
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manageusers" element={<ManageUsers/>}/>
          <Route path="/managemenu" element={<ManageMenu/>} />
          <Route path="/managetable" element={<ManageTables/>}/>
          <Route path="/takeaway" element={<OrderPanel type="takeaway"/>} />
          <Route path="/dine" element={<OrderPanel type="dine" />} />
          <Route path="/tkList" element={<OrdersList type="takeaway" />}/>
          <Route path="/dineList" element={<OrdersList type="dine-in"  />}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default AllRoutes;
