import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/Home";
import AuthPage from "./pages/Auth";
import StudyPage from "./pages/Study";
import "./App.css";
import RootLayout from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/auth", element: <AuthPage /> },
      { path: "/study", element: <StudyPage /> },
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
