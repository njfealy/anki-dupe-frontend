import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/index";

import Dropdown from "./Dropdown";

const LoginButton = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    event.stopPropagation();
    setShowDropdown((state) => !state);
  };

  const logoutHandler = async () => {
    console.log("yes");
    const response = await fetch("http://localhost:3000/auth/logout", {
      method: "GET",
      credentials: "include",
    });

    dispatch(
      authActions.logout({
        isAuth: false,
        username: undefined,
        userId: undefined,
        loading: false,
      })
    );
    setShowDropdown(false);
    navigate("/login");
  };

  const handleClickOutside = (event) => {
    const dropdown = document.getElementById("dropdown-menu");
    if (dropdown && !dropdown.contains(event.target)) {
      setShowDropdown(false);
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
      {location.pathname != "/login" && (
        <div className="flex gap-3 items-end m-2 mx-3">
          {!auth.loading && (
            <>
              {!auth.isAuth ? (
                <NavLink
                  to="/login"
                  className="rounded-lg px-4 py-2 mb-1 font-semibold text-white bg-blue-700 transition hover:bg-violet-700 hover:duration-200"
                >
                  Log in
                </NavLink>
              ) : (
                <div>
                  <div className="flex items-center w-9 mr-3">
                    <img
                      src={auth.picture}
                      className={`size-8 m-3 rounded-3xl hover:opacity-50 transition duration-300`}
                      onClick={toggleDropdown}
                    />
                    {/* {isOpen && <div className="absolute right-10"></div>} */}
                  </div>
                  {showDropdown && (
                    <Dropdown id="dropdown-menu" onLogout={logoutHandler} />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default LoginButton;
