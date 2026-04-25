import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "../src/components/ui/provider.jsx";

import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./contextAPI/UserContextapi.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider>
        <ContextProvider>
          <App />
        </ContextProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
