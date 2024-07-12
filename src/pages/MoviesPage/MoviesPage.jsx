import { useEffect, useState } from "react";
import { getMovies } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const data = await getMovies();
        setMovies(data.results);
      } catch (error) {
        setError("Error!!!");
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <div>
      {loading && <Loader />}
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
}
