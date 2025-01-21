import { useSelector, useDispatch } from "react-redux";

import user from "../assets/user.png"

const NavBar = () => {
  return (
    <>
      <div className="bg-white p-1">
        <span>Quizlet Dupe</span>
        <span>Study</span>
        <span></span>
        <img src={user} className="inline-block max-h-5 max-w-5 float-end m-1"/>
      </div>
    </>
  );
};

export default NavBar;
