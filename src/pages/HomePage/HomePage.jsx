import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import css from "./HomePage.module.css";
export default function HomePage() {
  const [movies, setMovies] = useState([]);
  console.log("movies: ", movies);
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
  return (
    <div className={css.container}>
      {loading && <Loader />}
      {!loading && (
        <>
          <div
            className={`${css.background} ${css.show}`}
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(51, 51, 51, 0) 70%, rgba(51, 51, 51, 1) 100%),
              url(https://image.tmdb.org/t/p/original${movies[1]?.backdrop_path})`,
            }}
          ></div>
          <h1 className={css.title}>Популярні фільми</h1>
          {error && <p>Error: {error.message}</p>}

          <MovieList movies={movies} />
        </>
      )}
    </div>
  );
}
