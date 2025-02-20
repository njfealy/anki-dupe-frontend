import { NavLink } from "react-router-dom";
import LoginButton from "./LoginButton";
import { useSelector } from "react-redux";

const NavBar = () => {
  
  return (
    <>
      <nav className="flex justify-between bg-white relative z-10">
        <div className="flex gap-3 items-end mx-5 mt-4 mb-2">
          <NavLink
            to="/"
            className="text-3xl font-bold text-blue-700 mr-3 border-b-2 border-transparent"
          >
            Anki Dupe
          </NavLink>

          <NavLink
            to="/"
            // className={({ isActive }) => (isActive ? "text-slate-500" : "")}
            className="rounded px-4 pt-4 font-semibold text-gray-600
            after:block after:border-b-2 after:border-gray-400
            after:scale-x-0 transition after:duration-200 after:ease-out
            hover:after:scale-x-150 hover:bg-gray-200"
          >
            Home
          </NavLink>

          <NavLink
            to="/library"
            // className={({ isActive }) => (isActive ? "text-slate-500" : "")}
            className="rounded px-4 pt-4 font-semibold text-gray-600
            after:block after:border-b-2 after:border-gray-400
            after:scale-x-0 transition after:duration-200 after:ease-out
            hover:after:scale-x-150 hover:bg-gray-200"
          >
            Library
          </NavLink>
        </div>

        <LoginButton />
      </nav>
    </>
  );
};

export default NavBar;
