import React, { use, useEffect } from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";

const Browse = () => {
  const nowPlayingMovies = useNowPlayingMovies();
  return (
    <div className="flex justify-between">
      <Header />
    </div>
  );
};

export default Browse;
