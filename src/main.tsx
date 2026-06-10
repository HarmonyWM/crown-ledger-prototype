import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { getRouter } from "./router";
import { AppStoreProvider } from "./lib/store";
import "./styles.css";

const router = getRouter();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppStoreProvider>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </AppStoreProvider>
  </StrictMode>
);
