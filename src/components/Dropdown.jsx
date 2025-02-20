import { NavLink } from "react-router-dom";
import settings from "../assets/settings.png";
import logout from "../assets/logout.png";
const Dropdown = (props) => {
  const logoutHandler = () => {
    props.onLogout();
  };

  return (
    <>
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
    </>
  );
};

export default Dropdown;
