import Empty from "@/pages/Empty";

export const sideMenuRoutes = [
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
];