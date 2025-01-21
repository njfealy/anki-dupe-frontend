import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/Home";
import NavBar from "./components/NavBar";
import "./App.css";

const router = createBrowserRouter([{ path: "/", element: <HomePage /> }]);

function App() {
  return (
    <>
      <NavBar />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
