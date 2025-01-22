import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();

  const [emailInput, setEmailInput] = useState("");
  const [passInput, setPasswordInput] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.login());
    console.log("login");
    navigate("/");
  };

  const emailInputChangeHandler = (event) => {
    console.log(event.target.value);
    setEmailInput(event.target.value);
  };

  const passInputChangeHandler = (event) => {};

  return (
    <>
      <form onSubmit={submitHandler} className="m-10 flex flex-col">
        <h1 className="text-2xl">Login</h1>

        <label className="text-l inline-block">Email Address</label>
        <input
          className=""
          value={emailInput}
          onChange={emailInputChangeHandler}
        />

        <label className="text-l">Password</label>
        <input onChange={passInputChangeHandler} />

        <button>Login</button>
      </form>
    </>
  );
};

export default AuthPage;
