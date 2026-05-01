import { Theme } from "@chakra-ui/react";
import AllRoutes from "./components/AllRoutes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchMenu, fetchTables, fetchUsers } from "./utils/api";

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    fetchMenu(dispatch);
    fetchUsers(dispatch)
    fetchTables(dispatch)
  }, []);

  return (
    <Theme appearance="light">
      <AllRoutes />
    </Theme>
  );
}

export default App;
