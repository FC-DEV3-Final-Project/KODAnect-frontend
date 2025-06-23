import { createBrowserRouter, Navigate } from "react-router-dom";

import Layout from "@/widget/layout/Layout";
import SideMenuLayout from "@/widget/layout/SideMenuLayout";

import Home from "@/pages/Home";
import Empty from "@/pages/Empty";
import Members from "@/pages/remembrance/Members";
import MembersView from "@/pages/remembrance/MembersView";
import Letters from "@/pages/remembrance/Letters";
import LettersForm from "@/pages/remembrance/LettersForm";
import Recipients from "@/pages/remembrance/Recipients";
import RecipientsForm from "./remembrance/RecipientsForm";
import Stories from "@/pages/remembrance/Stories";
import StoriesForm from "./remembrance/StoriesForm";
import Error from "@/pages/Error";

import LetterView from "@/pages/remembrance/LetterView";
import RecipientView from "@/pages/remembrance/RecipientView";
import StoryView from "@/pages/remembrance/StoryView";

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
      { path: "error", element: <Error /> },
      {
        path: "remembrance",
        children: [
          { path: "members", element: <Members /> },
          { path: "members-view/:donateSeq", element: <MembersView /> },
          { path: "members-view/:donateSeq", element: <MembersView /> },
          { path: "letters", element: <Letters /> },
          { path: "letters-form", element: <LettersForm /> },
          { path: "letters-form/:letterSeq", element: <LettersForm /> },
          { path: "letters-view/:letterSeq", element: <LetterView /> },
          { path: "recipients", element: <Recipients /> },
          { path: "recipients-form", element: <RecipientsForm /> },
          { path: "recipients-form/:letterSeq", element: <RecipientsForm /> },
          { path: "recipients-view/:letterSeq", element: <RecipientView /> },
          { path: "stories", element: <Stories /> },
          { path: "stories-form", element: <StoriesForm /> },
          { path: "stories-form/:storySeq", element: <StoriesForm /> },
          { path: "stories-view/:storySeq", element: <StoryView /> },
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
              { path: "organ-donation", element: <Empty /> },
              { path: "brain-death", element: <Empty /> },
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
          { path: "notices", element: <Empty /> },
          { path: ":id", element: <Empty /> },
        ],
      },
      {
        path: "participation",
        children: [
          {
            path: "donation-stats",
            children: [
              { path: "donors", element: <Empty /> },
              { path: "comparison-5years", element: <Empty /> },
              { path: "yearly-trend", element: <Empty /> },
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
