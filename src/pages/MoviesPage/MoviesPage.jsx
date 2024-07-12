import { useEffect, useState } from "react";
import { getMovies } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import { useSearchParams } from "react-router-dom";
import MovieFilter from "../../components/MovieFilter/MovieFilter";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchMovie, setSearchMovie] = useSearchParams();
  const movieFilter = searchMovie.get("original_title") ?? "";

  const changeMovieFilter = (newMovie) => {
    setSearchMovie({
      original_title: newMovie,
    });
  };

  useEffect(() => {
    if (!movieFilter) return;
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await getMovies(movieFilter);
        setMovies(data.results);
      } catch (error) {
        setError("Error!!!");
      } finally {
        setLoading(false);
      }
    };
      fetchMovies();
  }, [movieFilter]);

  return (
    <div>
      <MovieFilter search={movieFilter} onFilter={changeMovieFilter} />
      {loading && <Loader />}
      {error && <p>{error}</p>}
      {movieFilter && <MovieList movies={movies} />}
    </div>
  );
}
