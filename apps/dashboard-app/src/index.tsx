import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles.css";
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log(process.env.name);
