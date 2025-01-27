import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/Home";
import AuthPage from "./pages/Auth";
import StudyPage from "./pages/Study";
import SettingsPage from "./pages/Settings";
import "./App.css";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import DeckPage from "./pages/DeckPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/auth", element: <AuthPage /> },
      { path: "/study", element: <StudyPage /> },
      { path: "/study/:deckId", element: <DeckPage />},
      { path: "/settings", element: <SettingsPage /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
