import { Theme, Toaster } from "@chakra-ui/react";
import AllRoutes from "./components/AllRoutes";
import "./App.css"

function App() {
  return (
    <Theme appearance="light">
      <AllRoutes />
    </Theme>
  );
}

export default App;
