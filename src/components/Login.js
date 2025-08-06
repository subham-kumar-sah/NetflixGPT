import React from "react";
import Header from "./Header";
import Validate from "../utils/Validate";
import { auth } from "../utils/firebase";
import { Netflix_Background_Url } from "../utils/constants";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slices/userSlice";

const Login = () => {
  const [isSignIn, setIsSignIn] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const name = React.useRef(null);
  const email = React.useRef(null);
  const password1 = React.useRef(null);
  const password2 = React.useRef(null);
  const dispatch = useDispatch();

  const toggleSignIn = () => {
    email.current.value = "";
    password1.current.value = "";
    setErrorMessage(null);
    setIsSignIn(!isSignIn);
  };

  const handleButtonClick = () => {
    const message = Validate(
      name?.current?.value,
      email.current.value,
      password1.current.value,
      password2?.current?.value,
      isSignIn
    );
    setErrorMessage(message);
    console.log("Error Message:", message);
    if (message) return;

    if (isSignIn) {
      // sign-in logic here
      async function signInUser() {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password1.current.value
        );
        const user = userCredential.user;
        console.log("User created:", user);
        updateProfile(user, {
          displayName: name?.current?.value,
        })
          .then(() => {
            const { uid, email, displayName } = auth.currentUser;
            dispatch(
              addUser({
                uid: uid,
                email: email,
                displayName: displayName,
              })
            );
          })
          .catch((error) => {
            setErrorMessage(error.message);
          });

        console.log("User signed in:", user);
      }
      signInUser().catch((error) => {
        if (error.code === "auth/invalid-credential") {
          setErrorMessage("Invalid login credentials. Please try again.");
        }
      });
    } else {
      // sign-up logic here
      async function setUser() {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password1.current.value
        );
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name?.current?.value,
        })
          .then(() => {
            const { uid, email, displayName } = auth.currentUser;
            dispatch(
              addUser({
                uid: uid,
                email: email,
                displayName: displayName,
              })
            );
          })
          .catch((error) => {
            setErrorMessage(error.message);
          });
        console.log("User created:", user);
      }
      setUser().catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setErrorMessage("Email already in use. Please try another.");
        }
      });
    }
  };

  return (
    <div className="relative ">
      <Header />
      <img src={Netflix_Background_Url} alt="Netflix_Background"></img>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-4/12 absolute top-24 left-1/3 p-14 text-white rounded-md bg-black bg-opacity-80"
      >
        <h1 className="font-bold text-3xl pb-12">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 mx-auto mb-4 w-full rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email"
          className="p-4 mx-auto mb-4 w-full rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <input
          ref={password1}
          type="password"
          placeholder="Password"
          className="p-4 mx-auto mb-4 w-full rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
        />
        {!isSignIn && (
          <input
            ref={password2}
            type="password"
            placeholder="Re Enter Password"
            className="p-4 mx-auto mb-4 w-full rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
          />
        )}
        <button
          onClick={handleButtonClick}
          className="p-2 mx-auto mb-4 bg-red-600 rounded-md w-full"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="text-red-600 mb-4">{errorMessage}</p>
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
