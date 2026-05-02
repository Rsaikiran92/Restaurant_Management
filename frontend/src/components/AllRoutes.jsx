import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import OrderPanel from "../pages/OrderPanel/OrderPanel";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import MainLayout from "./MainLayout";
import ManageUsers from "../pages/ManageUsers/ManageUsers";
import ManageMenu from "../pages/ManageMenu/ManageMenu";
import ManageTables from "../pages/ManageTables/ManageTables";
import Takeaway from "../pages/Takeaway/Takeaway";
import OrdersList from "../pages/OrderList/OrderList";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manageusers" element={<ManageUsers/>}/>
          <Route path="/managemenu" element={<ManageMenu/>} />
          <Route path="/managetable" element={<ManageTables/>}/>
          <Route path="/takeaway" element={<Takeaway/>} />
          <Route path="/dine" element={<OrderPanel />} />
          <Route path="/tkList" element={<OrdersList/>}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default AllRoutes;
