import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/slices/movieSlice";
import { API_OPTIONS } from "../utils/constants";
const useNowPlayingMovies = () => {
  const [movies, setMovies] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const getNowPlayingMovies = async () => {
      const jsonData = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?&page=1",
        API_OPTIONS
      );
      const data = await jsonData.json();
      setMovies(data.results);
      dispatch(addNowPlayingMovies(data.results));
      console.log(data);
    };
    getNowPlayingMovies();
  }, []);
  return movies;
};

export default useNowPlayingMovies;
