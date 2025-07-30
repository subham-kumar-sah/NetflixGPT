import React from "react";
import { Netflix_Logo_Url } from "../utils/constants";

const Header = () => {
  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black">
      <img src={Netflix_Logo_Url} alt="Netflix Logo" className="w-48 h-15" />
    </div>
  );
};

export default Header;
