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
      <nav className="flex justify-between items-center">
        <div className="m-1 space-x-3 inline-block">
          <NavLink to="/" className="text-3xl font-semibold">
            Quizlet Dupe
          </NavLink>

          <NavLink
            to="/study"
            // className={({ isActive }) => (isActive ? "text-slate-500" : "")}
            className="inline-block rounded px-5
            after:block after:border-b-2 after:border-black 
            after:scale-x-0 after:transition after:duration-200 after:ease-out 
            hover:after:scale-x-150 hover:bg-gray-200"
          >
            Study
          </NavLink>
        </div>

        <div className="flex content-end">
            {auth ? (
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
                className="p-5 after:block after:border-b-2 after:border-black after:scale-x-0 after:transition after:duration-200 after:ease-in-out hover:after:scale-50"
              >
                Login
              </NavLink>
            )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
