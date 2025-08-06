import React, { useEffect } from "react";
import { Netflix_Logo_Url } from "../utils/constants";
import { User_Icon_Url } from "../utils/constants";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeUser, addUser } from "../utils/slices/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        console.log("User signed out successfully.");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };
  return (
    <div
      className=" w-full absolute px-8 py-2 bg-gradient-to-b from-black flex 
    justify-between items-center"
    >
      <img src={Netflix_Logo_Url} alt="Netflix Logo" className="w-48 h-15" />
      {user && (
        <div className="flex text-white cursor-pointer">
          <img
            src={User_Icon_Url}
            alt="User_Icon"
            className="w-14 h-14 m-4"
          ></img>
          <button onClick={handleSignOut} className="font-bold">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
