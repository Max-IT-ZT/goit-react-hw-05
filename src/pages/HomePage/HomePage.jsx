import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import css from "./HomePage.module.css";
export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        setLoading(true);
        const data = await getTrendingMovies();
        setMovies(data.results);
      } catch (error) {
        setError("Error!!!");
      } finally {
        setLoading(false);
      }
    }
    fetchTrendingMovies();
  }, []);
  const currentBackdropPath = movies[0]?.backdrop_path;
  const backgroundImageUrl = currentBackdropPath
    ? `https://image.tmdb.org/t/p/original${currentBackdropPath}`
    : "";
  return (
    <div className={css.container}>
      <div
        className={`${css.background} ${css.show}`}
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      ></div>
      <h1 className={css.title}>Trending today</h1>
      {error && <p>Error: {error.message}</p>}
      {loading && <Loader />}
      <MovieList movies={movies} />
    </div>
  );
}
