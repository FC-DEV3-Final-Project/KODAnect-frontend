import Home from "@/pages/Home";
import Error from "@/pages/Error";
import Members from "@/pages/remembrance/Members";
import MembersView from "@/pages/remembrance/MembersView";
import Letters from "@/pages/remembrance/Letters";
import LettersForm from "@/pages/remembrance/LettersForm";
import LetterView from "@/pages/remembrance/LetterView";
import Recipients from "@/pages/remembrance/Recipients";
import RecipientsForm from "@/pages/remembrance/RecipientsForm";
import RecipientView from "@/pages/remembrance/RecipientView";
import Stories from "@/pages/remembrance/Stories";
import StoriesForm from "@/pages/remembrance/StoriesForm";
import StoryView from "@/pages/remembrance/StoryView";

export const mainLayoutRoutes = [
  { path: "home", element: <Home /> },
  { path: "error", element: <Error /> },
  {
    path: "remembrance",
    children: [
      { path: "members", element: <Members /> },
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
];