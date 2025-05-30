import { createBrowserRouter, Navigate } from "react-router-dom";

import Layout from "@/widget/layout/Layout";
import SideMenuLayout from "@/widget/layout/SideMenuLayout";

import Home from "./Home";
import Empty from "./Empty";
import Members from "./remembrance/Members";
import Letters from "./remembrance/Letters";
import Recipients from "./remembrance/Recipients";
import Stories from "./remembrance/Stories";
import Notices from "./announcement/Notices";
import Donors from "./participation/Donors";
import Comparison from "./participation/Comparison";
import YearlyTrend from "./participation/YearlyTrend";
import OrganDonation from "./organ/info/OrganDonation";
import BrainDeath from "./organ/info/BrainDeath";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "home", element: <Home /> },
      {
        path: "remembrance",
        children: [
          { index: true, element: <Members /> },
          { path: "members", element: <Members /> },
          { path: "letters", element: <Letters /> },
          { path: "recipients", element: <Recipients /> },
          { path: "stories", element: <Stories /> },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <SideMenuLayout />,
    children: [
      {
        path: "organ",
        children: [
          { index: true, element: <OrganDonation /> },
          {
            path: "info",
            children: [
              { index: true, element: <OrganDonation /> },
              { path: "organ-donation", element: <OrganDonation /> },
              { path: "empty", element: <Empty /> },
              { path: "brain-death", element: <BrainDeath /> },
            ],
          },
          {
            path: "agreement",
            children: [
              { index: true, element: <Empty /> },
              { path: "empty", element: <Empty /> },
            ],
          },
          {
            path: "honor",
            children: [
              { index: true, element: <Empty /> },
              { path: "empty", element: <Empty /> },
            ],
          },
          {
            path: "program",
            children: [
              { index: true, element: <Empty /> },
              { path: "empty", element: <Empty /> },
            ],
          },
          { path: "empty", element: <Empty /> },
        ],
      },
      {
        path: "donation-registration",
        children: [
          { index: true, element: <Empty /> },
          { path: "empty", element: <Empty /> },
        ],
      },
      {
        path: "announcement",
        children: [
          { index: true, element: <Notices /> },
          { path: "empty", element: <Empty /> },
          { path: "notices", element: <Notices /> },
        ],
      },
      {
        path: "participation",
        children: [
          { index: true, element: <Donors /> },
          {
            path: "donation-stats",
            children: [
              { index: true, element: <Donors /> },
              { path: "donors", element: <Donors /> },
              { path: "comparison-5years", element: <Comparison /> },
              { path: "yearly-trend", element: <YearlyTrend /> },
            ],
          },
          {
            path: "disclosure",
            children: [
              { index: true, element: <Empty /> },
              { path: "empty", element: <Empty /> },
            ],
          },
          { path: "empty", element: <Empty /> },
        ],
      },
      {
        path: "about",
        children: [
          { index: true, element: <Empty /> },
          { path: "empty", element: <Empty /> },
          {
            path: "koda",
            children: [
              { index: true, element: <Empty /> },
              { path: "empty", element: <Empty /> },
            ],
          },
          {
            path: "compliance",
            children: [
              { index: true, element: <Empty /> },
              { path: "empty", element: <Empty /> },
            ],
          },
        ],
      },
    ],
  },
]);
