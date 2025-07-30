import React from "react";
import Header from "./Header";
import { Netflix_Background_Url } from "../utils/constants";
const Login = () => {
  const [isSignIn, setIsSignIn] = React.useState(true);
  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };
  return (
    <div className="relative ">
      <Header />
      <img src={Netflix_Background_Url} alt="Netflix_Background"></img>
      <form className="w-4/12 absolute top-24 left-1/3 p-16 text-white rounded-md bg-black bg-opacity-80">
        <h1 className="font-bold text-3xl py-8">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 mx-auto mb-4 w-full rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
          />
        )}

        <input
          type="text"
          placeholder="Email or phone number"
          className="p-4 mx-auto mb-4 w-full rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 mx-auto mb-4 w-full rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
        />
        {!isSignIn && (
          <input
            type="password"
            placeholder="Re Enter Password"
            className="p-4 mx-auto mb-4 w-full rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
          />
        )}
        <button className="p-2 mx-auto mb-4 bg-red-600 rounded-md w-full">
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <div className="flex">
          <span>{isSignIn ? "New to netflix?" : "Already a member?"}</span>
          <span
            className="hover:underline cursor-pointer"
            onClick={toggleSignIn}
          >
            {isSignIn ? "Sign Up Now" : " Sign In"}
          </span>
        </div>
      </form>
    </div>
  );
};
export default Login;
