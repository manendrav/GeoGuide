import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./routes/Routes.jsx";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={Router} />
    <Toaster position="top-center" reverseOrder={false} />
  </React.StrictMode>
);
