import React from "react";
import ReactDOM from "react-dom/client";
// Load only the 3 weights actually used — eliminates CLS from unused font loading
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import "@/styles/globals.css";
import { App } from "@/App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);