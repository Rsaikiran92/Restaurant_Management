import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "../src/components/ui/provider.jsx";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./contextAPI/UserContextapi.jsx";
import { store } from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider>
        <ReduxProvider store={store}>
        <ContextProvider>
          <App />
        </ContextProvider>
        </ReduxProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
