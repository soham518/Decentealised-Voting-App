import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import "./index.css";
import Web3Provider from "./context/Web3Provider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Web3Provider>
      <RouterProvider router={routes} />
    </Web3Provider>
  </React.StrictMode>
);