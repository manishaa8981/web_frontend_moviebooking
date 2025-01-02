import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AdminLoginProvider } from "./context/AdminLoginContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  //<StrictMode>
  <AdminLoginProvider>
    <App />
  </AdminLoginProvider>
  //</StrictMode>,
);
