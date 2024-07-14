import { Suspense, useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { getMovieDetails, getMovieVideos } from "../../api";
import Loader from "../../components/Loader/Loader";
import MovieDetailCard from "../../components/MovieDetailCard/MovieDetailCard";
import clsx from "clsx";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    async function fetchMovieDetails() {
      try {
        setLoading(true);
        const data = await getMovieDetails(movieId);
        setMovie(data);

        const videoData = await getMovieVideos(movieId);
        setVideos(videoData);
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

  const trailerKey =
    videos.find((video) => video.language === "uk")?.key ||
    videos.find((video) => video.language === "en")?.key ||
    videos[0]?.key;

  return (
    <div className={css.container}>
      {error && <p>Error: {error.message}</p>}
      {loading && <Loader />}
      {!loading && movie && (
        <>
          <MovieDetailCard movie={movie} trailerKey={trailerKey} />
          <ul className={css.list}>
            <li>
              <NavLink to="cast" className={activeClass}>
                Актори
              </NavLink>
            </li>
            <li>
              <NavLink to="reviews" className={activeClass}>
                Відгуки
              </NavLink>
            </li>
          </ul>
        </>
      )}
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
