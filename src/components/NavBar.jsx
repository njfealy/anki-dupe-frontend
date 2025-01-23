import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useState } from "react";

import user from "../assets/user.png";
import { authActions } from "../store";

const NavBar = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuth);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    console.log("logout");
    console.log(auth);
    setIsOpen(false);
  };

  return (
    <>
      <nav className="flex justify-between bg-white">
        <div className="flex gap-3 items-end mx-5 my-4">
          <NavLink
            to="/"
            className="text-3xl font-bold text-blue-700 border-b-2 border-transparent"
          >
            Quizlet Dupe
          </NavLink>

          <NavLink
            to="/study"
            // className={({ isActive }) => (isActive ? "text-slate-500" : "")}
            className="rounded px-5
            after:block after:border-b-2 after:border-gray-400
            after:scale-x-0 after:transition after:duration-200 after:ease-out
            hover:after:scale-x-150 hover:bg-gray-200"
          >
            Study
          </NavLink>
        </div>

        <div className="flex gap-3 items-end m-2 mx-3">
          {!auth ? (
            <NavLink
              to="/auth"
              className="rounded-lg px-4 py-2 mb-1 text-white bg-blue-700 transition hover:bg-violet-700 hover:duration-200"
            >
              Log in
            </NavLink>
          ) : (
            <>
              <img
                src={user}
                className="max-h-5 max-w-5 m-1"
                onClick={toggleDropdown}
              />
              {isOpen && (
                <ul>
                  <li onClick={logoutHandler} className="relative">
                    Logout
                  </li>
                </ul>
              )}
            </>
          )}
          {/* {auth ? (
              <span>
                <img
                  src={user}
                  className="max-h-5 max-w-5 m-1"
                  onClick={toggleDropdown}
                />
                {isOpen && (
                  <ul>
                    <li onClick={logoutHandler} className="relative">
                      Logout
                    </li>
                  </ul>
                )}
              </span>
            ) : (
              <NavLink
                to="/auth"
                className="p-5 after:block after:border-b-2 after:border-gray-500 after:scale-x-0 after:transition after:duration-200 after:ease-in-out hover:after:scale-50"
              >
                Login
              </NavLink>
            )} */}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
