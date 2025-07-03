// router.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "@/widget/layout/Layout";
import SideMenuLayout from "@/widget/layout/SideMenuLayout";
import { mainLayoutRoutes } from "@/routes/mainLayoutRoutes";
import { sideMenuRoutes } from "@/routes/sideMenuRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      {
        element: <Layout />,
        children: mainLayoutRoutes,
      },
      {
        element: <SideMenuLayout />,
        children: sideMenuRoutes,
      },
    ],
  },
]);
