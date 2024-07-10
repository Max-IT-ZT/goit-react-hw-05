import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../api";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    fetchTrendingMovies()
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % movies.length);
        setIsTransitioning(false);
      }, 500); // Adjust timing as needed for smoother transition
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  const currentBackdropPath = movies[currentImageIndex]?.backdrop_path;
  const backgroundImageUrl = currentBackdropPath
    ? `https://image.tmdb.org/t/p/original${currentBackdropPath}`
    : "";

  return (
    <div className={css.container}>
      <div
        className={`${css.background} ${isTransitioning ? "" : css.show}`}
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      ></div>
      <h1 className={css.title}>Trending today</h1>
      {error && <p>Error: {error.message}</p>}
      <ul className={css.homeList}>
        {movies.map((movie) => (
          <li className={css.homeItem} key={movie.id}>
            <img
              className={css.homeImg}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <p className={css.homeTitle}>{movie.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
