import { useEffect, useState } from "react";
import {
  getTrendingMovies,
  getUpcomingMovies,
  getTrendingCartoons,
  getTopRatedMovies,
} from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import BackgroundSlider from "../../components/BackgroundSlider/BackgroundSlider";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [animatedMovies, setAnimatedMovies] = useState([]);
  const [highRatedMovies, setHighRatedMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const trendingData = await getTrendingMovies();
        setTrendingMovies(trendingData.results);

        const upcomingData = await getUpcomingMovies();
        setUpcomingMovies(upcomingData.results);

        const animatedData = await getTrendingCartoons();
        console.log("animatedData: ", animatedData);
        setAnimatedMovies(animatedData.results);

        const topRatedData = await getTopRatedMovies();
        setHighRatedMovies(topRatedData.results);
      } catch (error) {
        setError("Error!!!");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className={css.containerHome}>
      {loading && <Loader />}
      {!loading && (
        <>
          <BackgroundSlider movies={trendingMovies} />
          {error && <p>Error: {error.message}</p>}
          <MovieList movies={trendingMovies} title="Популярні фільми" />
          <MovieList movies={upcomingMovies} title="Новинки в кінотеатрах" />
          <MovieList movies={animatedMovies} title="Мультфільми" />
          <MovieList movies={highRatedMovies} title="Високий рейтинг" />
        </>
      )}
    </div>
  );
}
