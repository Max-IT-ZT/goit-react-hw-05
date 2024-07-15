import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import BackgroundSlider from "../../components/BackgroundSlider/BackgroundSlider";
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
        console.log(data.results);
        setMovies(data.results);
      } catch (error) {
        setError("Error!!!");
      } finally {
        setLoading(false);
      }
    }
    fetchTrendingMovies();
  }, []);

  return (
    <div className={css.container}>
      {loading && <Loader />}
      {!loading && (
        <>
          <BackgroundSlider movies={movies} />
          <h1 className={css.title}>Популярні фільми</h1>
          {error && <p>Error: {error.message}</p>}
          <MovieList movies={movies} />
        </>
      )}
    </div>
  );
}
