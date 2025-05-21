import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/shared/styles/index.css";
import "@krds-ui/core/dist/style.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
