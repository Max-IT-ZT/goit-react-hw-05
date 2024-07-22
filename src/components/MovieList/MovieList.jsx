import { Link, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import css from "./MovieList.module.css";
import { FaStar } from "react-icons/fa";
const defaultImg =
  "https://dummyimage.com/200x300/cdcdcd/000.jpg&text=No+poster";

export default function MovieList({ movies, title }) {
  const location = useLocation();

  return (
    <div className={css.categoryContainer}>
      <h2 className={css.categoryTitle}>{title}</h2>
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        breakpoints={{
          768: {
            slidesPerView: 3, // For smartphones
          },
          1024: {
            slidesPerView: 10, // For tablets and larger screens
          },
        }}
        navigation
        pagination={{ clickable: true }}
        className={css.swiper}
      >
        {movies.map((movie) => {
          const posterUrl = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : defaultImg;

          return (
            <SwiperSlide key={movie.id} className={css.movieItem}>
              <Link to={`/movies/${movie.id}`} state={location}>
                <img
                  src={posterUrl}
                  alt={movie.title}
                  className={css.movieImg}
                />
                <ul className={css.list}>
                  <li className={css.vote}>
                    {" "}
                    <FaStar color="gold" />
                    {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                  </li>
                  <li className={css.date}>
                    {new Date(movie.release_date).getFullYear()}
                  </li>
                </ul>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
