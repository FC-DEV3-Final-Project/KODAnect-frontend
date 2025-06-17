import { createBrowserRouter, Navigate } from "react-router-dom";

import Layout from "@/widget/layout/Layout";
import SideMenuLayout from "@/widget/layout/SideMenuLayout";

import Home from "@/pages/Home";
import Empty from "@/pages/Empty";
import Members from "@/pages/remembrance/Members";
import MembersView from "@/pages/remembrance/MembersView";
import Letters from "@/pages/remembrance/Letters";
import Recipients from "@/pages/remembrance/Recipients";
import Stories from "@/pages/remembrance/Stories";
import OrganDonation from "@/pages/organ/info/OrganDonation";
import BrainDeath from "@/pages/organ/info/BrainDeath";
import Donors from "@/pages/participation/Donors";
import Comparison from "@/pages/participation/Comparison";
import YearlyTrend from "@/pages/participation/YearlyTrend";
import Notices from "@/pages/announcement/Notices";

import LetterView from "@/pages/remembrance/LetterView";
import RecipientView from "@/pages/remembrance/RecipientView";
import StoryView from "@/pages/remembrance/StoryView";

// 필요에 따라 페이지 컴포넌트 추가 import

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
          { path: "members", element: <Members /> },
          { path: "members-view/:donateSeq", element: <MembersView /> },
          { path: "letters", element: <Letters /> },
          { path: "letters-view/:id", element: <LetterView /> },
          { path: "recipients", element: <Recipients /> },
          { path: "recipients-view/:id", element: <RecipientView /> },
          { path: "stories", element: <Stories /> },
          { path: "stories-view/:id", element: <StoryView /> },
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
          {
            path: "info",
            children: [
              { path: "organ-donation", element: <OrganDonation /> },
              { path: "brain-death", element: <BrainDeath /> },
              { path: ":id", element: <Empty /> },
            ],
          },
          {
            path: "agreement",
            children: [{ path: ":id", element: <Empty /> }],
          },
          {
            path: "honor",
            children: [{ path: ":id", element: <Empty /> }],
          },
          {
            path: "program",
            children: [{ path: ":id", element: <Empty /> }],
          },
          { path: ":id", element: <Empty /> }, // 검사실(KODA LAB)
        ],
      },
      {
        path: "donation-registration",
        children: [{ path: ":id", element: <Empty /> }],
      },
      {
        path: "announcement",
        children: [
          { path: "notices", element: <Notices /> },
          { path: ":id", element: <Empty /> },
        ],
      },
      {
        path: "participation",
        children: [
          {
            path: "donation-stats",
            children: [
              { path: "donors", element: <Donors /> },
              { path: "comparison-5years", element: <Comparison /> },
              { path: "yearly-trend", element: <YearlyTrend /> },
            ],
          },
          {
            path: "disclosure",
            children: [{ path: ":id", element: <Empty /> }],
          },
          { path: ":id", element: <Empty /> }, // 저작권정책, 민원안내
        ],
      },
      {
        path: "about",
        children: [
          { path: ":id", element: <Empty /> }, // 인사말
          {
            path: "koda",
            children: [{ path: ":id", element: <Empty /> }],
          },
          {
            path: "compliance",
            children: [{ path: ":id", element: <Empty /> }],
          },
          { path: ":id", element: <Empty /> }, // 조직안내, 오시는길
        ],
      },
    ],
  },
]);
