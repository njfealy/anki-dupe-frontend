import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import passwordVisible from "../assets/passwordVisible.png";

const AuthPage = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();

  const [emailInput, setEmailInput] = useState("");
  const [passInput, setPasswordInput] = useState("");
  const [passVisible, setPassVisible] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.login());
    navigate("/");
  };

  const emailInputChangeHandler = (event) => {
    console.log(event.target.value);
    setEmailInput(event.target.value);
  };

  const passInputChangeHandler = (event) => {};

  const passVisToggleHandler = () => {
    setPassVisible(!passVisible);
  };

  return (
    <>
      {!auth && (
        <div className="flex justify-center">
          <form
            onSubmit={submitHandler}
            className="m-[20vh] flex flex-col gap-5 items-center"
          >
            <h1 className="text-3xl text-gray-700 mb-4">Login</h1>

            <div className="">
              <label className="text-lg text-gray-700 font-semibold block">
                Email Address
              </label>
              <input
                className="w-96 rounded-lg p-2 font-semibold
          focus:outline-none focus:ring-1 focus:ring-blue-500 
          transition duration-200 ease-in-out 
          placeholder-gray-500"
                placeholder="Enter your email address"
                value={emailInput}
                onChange={emailInputChangeHandler}
              />
            </div>

            <div className="mb-6">
              <label className="text-lg text-gray-700 font-semibold block">
                Password
              </label>
              <div className="relative">
                <input
                  type={!passVisible ? "password" : "text"}
                  className="w-96 rounded-lg p-2 font-semibold
          focus:outline-none focus:ring-1 focus:ring-blue-500 
          transition duration-200 ease-in-out 
          placeholder-gray-600"
                  placeholder="Enter your password"
                  onChange={passInputChangeHandler}
                />
                <button
                  type="button"
                  onClick={passVisToggleHandler}
                  className="h-full box-content px-3 absolute inset-y-0 right-0 flex items-center size-5 opacity-60 rounded-r-lg hover:bg-gray-300 transition duration-200"
                >
                  <img src={passwordVisible} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-96 rounded-lg p-4 mb-1 text-white font-semibold bg-blue-700 transition hover:bg-violet-700 hover:duration-200"
            >
              Log in
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AuthPage;
