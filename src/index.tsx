import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { CallsProvider } from "./context/CallsContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <CallsProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CallsProvider>
);
