import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import css from "./BackgroundSlider.module.css";
import { FaStar } from "react-icons/fa";

const defaultImage = "path/to/default/image.jpg";

export default function BackgroundSlider({ movies }) {
  const [current, setCurrent] = useState(0);
  const [images, setImages] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const preloadImages = async () => {
      const loadedImages = await Promise.all(
        movies.map((movie) => {
          const img = new Image();
          const imgSrc = movie.backdrop_path
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : defaultImage;

          img.src = imgSrc;
          return new Promise((resolve) => {
            img.onload = () => resolve(imgSrc);
            img.onerror = () => resolve(defaultImage);
          });
        })
      );
      setImages(loadedImages);
    };

    preloadImages();
  }, [movies]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  const handleClick = () => {
    navigate(`/movies/${movies[current]?.id}`, { state: location });
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div className={css.container} onClick={handleClick}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`${css.background} ${
            index === current ? css.visible : ""
          }`}
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 1) 100%), url(${image})`,
            animation:
              index === current ? "zoomEffect 10s infinite alternate" : "none",
          }}
        />
      ))}
      <div className={css.movieTitle}>{movies[current]?.title}</div>
      <div className={css.movieVote}>
        <FaStar color="gold" />
        {movies[current]?.vote_average.toFixed(1)}
      </div>
      <div className={css.movieDate}>
        {new Date(movies[current]?.release_date).getFullYear()}
      </div>
    </div>
  );
}
