import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </React.StrictMode>
);
const container = document.getElementById("root");
if (container) {
  if (container.hasChildNodes()) {
    hydrateRoot(container, app);
  } else {
    const root = createRoot(container);
    root.render(app);
  }
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
