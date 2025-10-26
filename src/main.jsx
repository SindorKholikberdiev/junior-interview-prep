import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import TopicHomePage from "./pages/TopicHomePage.jsx";
import QuestionPage from "./pages/QuestionPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "topic/:topicName",
        children: [
          { index: true, element: <TopicHomePage /> },
          { path: ":questionId", element: <QuestionPage /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
