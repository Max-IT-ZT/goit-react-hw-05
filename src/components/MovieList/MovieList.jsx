import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";
const defaultImg =
  "https://dummyimage.com/200x300/cdcdcd/000.jpg&text=No+poster";
export default function MovieList({ movies }) {
  const location = useLocation();
  return (
    <ul className={css.movieList}>
      {movies.map((movie) => {
        const posterUrl = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
          : defaultImg;
        return (
          <li key={movie.id} className={css.movieItem}>
            <Link to={`/movies/${movie.id}`} state={location}>
              <img src={posterUrl} alt={movie.title} className={css.movieImg} />
              <p className={css.movieText}>{movie.title}</p>
              <p className={css.movieText}>Date: {movie.release_date}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
