import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { CallsProvider } from "./context/CallsContext";
import { ErrorBoundary } from "./ErrorBoundary";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ErrorBoundary>
    <CallsProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </CallsProvider>
  </ErrorBoundary>
);
