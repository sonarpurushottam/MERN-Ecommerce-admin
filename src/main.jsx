import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { NextUIProvider } from "@nextui-org/react";

import App from "./App.jsx";
import "./index.css";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <App />
        <Toaster />
      </NextUIProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
