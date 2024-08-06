import { Link } from "react-router-dom";
import css from "./FavoriteList.module.css";
import { useFavorites } from "../../FavoriteContext"; // Переконайтеся, що імпорт правильний
import { FaTrashAlt } from "react-icons/fa";

const defaultImg =
  "https://dummyimage.com/200x300/cdcdcd/000.jpg&text=No+poster";

export default function FavoriteList() {
  const { favorites, removeFavorite } = useFavorites(); // Використовуйте правильний хук

  return (
    <div className={css.container}>
      <h2 className={css.title}>Обрані фільми</h2>
      <div className={css.movieList}>
        {favorites.length > 0 ? (
          favorites.map((movie) => {
            const posterUrl = movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : defaultImg;
            console.log("Stored favorites:", localStorage.getItem("favorites"));
            return (
              <div key={movie.id} className={css.movieItem}>
                <Link to={`/movies/${movie.id}`}>
                  <img
                    src={posterUrl}
                    alt={movie.title}
                    className={css.movieImg}
                  />
                </Link>
                <button
                  className={css.removeButton}
                  onClick={() => removeFavorite(movie.id)}
                >
                  <FaTrashAlt color="red" size={10} className={css.icon} />
                </button>
              </div>
            );
          })
        ) : (
          <p className={css.emptyMessage}>Обране поки що пусте.</p>
        )}
      </div>
    </div>
  );
}
