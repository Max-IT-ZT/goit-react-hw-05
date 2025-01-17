import { Link, useLocation } from "react-router-dom";
import { IoArrowBackOutline, IoHeartOutline, IoHeart } from "react-icons/io5";
import { useRef, useState } from "react";
import css from "./MovieDetailCard.module.css";
import StarRating from "../StarRating/StarRating";
import { useFavorites } from "../../FavoriteContext";

const defaultImg =
  "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

export default function MovieDetailCard({ movie, trailerKey }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : defaultImg;
  const genres = movie.genres;
  const location = useLocation();
  const backListRef = useRef(location.state ?? "/movies");
  const [showTrailer, setShowTrailer] = useState(false);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const toggleTrailer = () => {
    setShowTrailer(!showTrailer);
  };

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div
      className={css.backdrop}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 1) 100%), 
                          url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <Link to={backListRef.current} className={css.linkBack}>
        <IoArrowBackOutline className={css.icon} /> Повернутись назад
      </Link>
      <div className={css.container}>
        <img
          className={css.img}
          src={posterUrl}
          alt={movie.title}
          width={250}
        />
        <div className={css.containerText}>
          <div className={css.favoriteContainer}>
            <h1 className={css.title}>{movie.title}</h1>
            <button
              className={css.favoriteButton}
              onClick={handleFavoriteClick}
            >
              {isFavorite ? <IoHeart /> : <IoHeartOutline />}
            </button>
          </div>

          <h4 className={css.date}>Дата релізу: {movie.release_date}</h4>
          <div className={css.rating}>
            <StarRating rating={movie.vote_average} />
          </div>

          <h3 className={css.overview}>Опис</h3>
          <p className={css.overviewText}>{movie.overview}</p>
          <h3 className={css.genres}>Жанр</h3>
          <ul>
            {genres.map((gen) => (
              <li key={gen.id} className={css.genresItem}>
                {gen.name}
              </li>
            ))}
          </ul>
          <button className={css.trailerButton} onClick={toggleTrailer}>
            Трейлер
          </button>
        </div>
        <div className={css.containerTrailer}>
          {showTrailer && (
            <div className={css.trailerContainer}>
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Трейлер"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
