import { AiFillLike } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import css from "./MovieDetailCard.module.css";
import { useRef } from "react";
const defaultImg =
  "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";
export default function MovieDetailCard({ movie }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : defaultImg;
  const genres = movie.genres;
  const location = useLocation();
  const backListRef = useRef(location.state ?? "/movies");

  return (
    <div
      className={css.backdrop}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <Link to={backListRef.current} className={css.linkBack}>
        <IoArrowBackOutline className={css.icon} /> Go back
      </Link>
      <div className={css.container}>
        <img
          className={css.img}
          src={posterUrl}
          alt={movie.title}
          width={250}
        />
        <div className={css.containerText}>
          <h1 className={css.title}>{movie.title}</h1>
          <h4 className={css.date}>Release Date:{movie.release_date}</h4>
          <p className={css.popularity}>
            Popularity: {movie.popularity.toFixed(0)}
            <AiFillLike />{" "}
          </p>
          <h3 className={css.overview}>Overview</h3>
          <p className={css.overviewText}>{movie.overview}</p>
          <h3 className={css.genres}>Genres</h3>
          <ul>
            {genres.map((gen) => (
              <li key={gen.id} className={css.genresItem}>
                {gen.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
