import { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { getMovieDetails } from "../../api";
import Loader from "../../components/Loader/Loader";
import MovieDetailCard from "../../components/MovieDetailCard/MovieDetailCard";
import clsx from "clsx";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setLoading(true);
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError("Error!!!");
      } finally {
        setLoading(false);
      }
    }
    fetchMovieDetails();
  }, [movieId]);

  const activeClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.isActive);
  };

  return (
    <div className={css.container}>
      {error && <p>Error: {error.message}</p>}
      {loading && <Loader />}
      {movie && <MovieDetailCard movie={movie} />}
      <ul className={css.list}>
        <li>
          <NavLink to="cast" className={activeClass}>
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink to="reviews" className={activeClass}>
            Reviews
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
