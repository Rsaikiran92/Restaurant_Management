import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import OrderPanel from "../pages/OrderPanel/OrderPanel";
import Login from "../pages/Login/Login";
import Navbar from "./Navbar/Navbar";

function AllRoutes() {
  return (
    <Routes>
      {/* <Route
            path="/admin"
            element={
              <PrivateRoute role="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          /> */}

      <Route
        path="/takeaway"
        element={
          <PrivateRoute>
            <OrderPanel type={"takeaway"} />
          </PrivateRoute>
        }
      />
      <Route
        path="/dine"
        element={
          <PrivateRoute>
            <OrderPanel  />
          </PrivateRoute>
        }
      />
      {/* <Route
            path="/frontdesk"
            element={
              <PrivateRoute role="frontdesk">
                <FrontDeskDashboard />
              </PrivateRoute>
            }
          /> */}
    </Routes>
  );
}

export default AllRoutes;
