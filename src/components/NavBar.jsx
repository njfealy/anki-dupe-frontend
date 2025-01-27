import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import user from "../assets/user.png";
import settings from "../assets/settings.png";
import logout from "../assets/logout.png";
import { authActions } from "../store";

const NavBar = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuth);

  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  const toggleDropdown = () => {
    event.stopPropagation();
    setIsOpen((open) => !open);
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    const dropdown = document.getElementById("dropdown-menu");
    if (dropdown && !dropdown.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="flex justify-between bg-white relative z-10">
        <div className="flex gap-3 items-end mx-5 mt-4 mb-2">
          <NavLink
            to="/"
            className="text-3xl font-bold text-blue-700 border-b-2 border-transparent"
          >
            Quizlet Dupe
          </NavLink>

          <NavLink
            to="/study"
            // className={({ isActive }) => (isActive ? "text-slate-500" : "")}
            className="rounded px-4 pt-4 font-semibold text-gray-600
            after:block after:border-b-2 after:border-gray-400
            after:scale-x-0 transition after:duration-200 after:ease-out
            hover:after:scale-x-150 hover:bg-gray-200"
          >
            Study
          </NavLink>
        </div>

        {location.pathname != "/auth" ? (
          <div className="flex gap-3 items-end m-2 mx-3">
            {!auth ? (
              <NavLink
                to="/auth"
                className="rounded-lg px-4 py-2 mb-1 font-semibold text-white bg-blue-700 transition hover:bg-violet-700 hover:duration-200"
              >
                Log in
              </NavLink>
            ) : (
              <div>
                <div className="flex items-center w-9">
                  <img
                    src={user}
                    className={`max-h-5 max-w-5 m-3 hover:opacity-50 transition duration-300 ${
                      isOpen ? "transform -translate-x-24 ml-0 ease-in-out" : ""
                    }`}
                    onClick={toggleDropdown}
                  />
                  {isOpen && <div className="absolute right-10"></div>}
                </div>

                {isOpen && (
                  <ul
                    id="dropdown-menu"
                    onClick={(event) => event.stopPropagation()}
                    className="absolute -right-5 top-16 w-48 bg-white rounded-l-lg py-3 animate-fadeIn transition"
                  >
                    <li className="font-semibold p-3 flex items-center hover:bg-gray-300 transition duration-200">
                      <img src={settings} className="size-4 ml-3" />
                      <NavLink to="/settings" className="px-3">
                        Settings
                      </NavLink>
                    </li>
                    <li
                      onClick={logoutHandler}
                      className="font-semibold p-3 flex items-center hover:bg-gray-300 transition duration-200"
                    >
                      <img src={logout} className="size-3.5 ml-3" />
                      <button className="px-3">Log out</button>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
        ) : undefined}
      </nav>
    </>
  );
};

export default NavBar;
