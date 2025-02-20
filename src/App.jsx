import { createBrowserRouter, RouterProvider } from "react-router";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./store";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import StudyPage from "./pages/StudyPage";
import SettingsPage from "./pages/Settings";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import LibraryPage from "./pages/LibraryPage";
import DeckPage from "./pages/DeckPage";

import "./App.css";
import UserPage from "./pages/UserPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/library", element: <LibraryPage /> },
      { path: "/user/:userId", element: <UserPage />},
      { path: "/decks/:deckId", element: <DeckPage /> },
      { path: "/study/:deckId", element: <StudyPage />},
      { path: "/settings", element: <SettingsPage /> },
    ],
  },
]);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("http://localhost:3000/auth/status", {
        method: "GET",
        credentials: "include",
      });
      const resData = await response.json();
      console.log(resData);
      if (resData.authenticated == true) {
        dispatch(
          authActions.login({
            isAuth: true,
            _id: resData.user._id,
            googleId: resData.user.googleId,
            display_name: resData.user.username,
            picture: resData.user.picture,
            loading: false,
          })
        );
      }
    };

    if (isLoading) checkAuth();
  }, [isLoading]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
