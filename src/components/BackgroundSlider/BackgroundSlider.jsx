import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import css from "./BackgroundSlider.module.css";

export default function BackgroundSlider({ movies }) {
  const [current, setCurrent] = useState(0);
  const [images, setImages] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const preloadImages = async () => {
      const loadedImages = await Promise.all(
        movies.map((movie) => {
          const img = new Image();
          img.src = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
          return new Promise((resolve) => {
            img.onload = () => resolve(img.src);
          });
        })
      );
      setImages(loadedImages);
      localStorage.setItem("backgroundImages", JSON.stringify(loadedImages));
    };

    const cachedImages = localStorage.getItem("backgroundImages");
    if (cachedImages) {
      setImages(JSON.parse(cachedImages));
    } else {
      preloadImages();
    }
  }, [movies]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className={css.container}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`${css.background} ${
            index === current ? css.visible : ""
          }`}
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 1) 100%), url(${image})`,
            animation: `${
              index === current ? "zoomEffect 10s infinite alternate" : "none"
            }`,
          }}
        />
      ))}
      <Link to={`/movies/${movies[current]?.id}`} state={location}>
        <div className={css.movieTitle}>{movies[current]?.title}</div>
      </Link>
    </div>
  );
}
