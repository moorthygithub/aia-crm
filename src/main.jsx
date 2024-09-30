import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import AppProvider from "./utils/ContextPanel.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
);
