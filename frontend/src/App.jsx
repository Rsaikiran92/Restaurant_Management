import { Theme, Toaster } from "@chakra-ui/react";
import AllRoutes from "./components/AllRoutes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchMenu, fetchOrders, fetchTables, fetchUsers } from "./utils/api";

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    fetchMenu(dispatch);
    fetchUsers(dispatch)
    fetchTables(dispatch)
    fetchOrders(dispatch);
  }, []);

  return (
    <Theme appearance="light">
      <AllRoutes />
    </Theme>
  );
}

export default App;
