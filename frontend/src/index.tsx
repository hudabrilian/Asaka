import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./tailwind.output.css";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Router>
        <App />
      </Router>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
