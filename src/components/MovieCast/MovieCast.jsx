import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../api";
import Loader from "../../components/Loader/Loader";
import css from "./MovieCast.module.css";
const defaultImg =
  "https://dummyimage.com/200x300/cdcdcd/000.jpg&text=No+poster";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMovieCast() {
      try {
        setLoading(true);
        const castData = await getMovieCast(movieId);
        setCast(castData);
      } catch (error) {
        setError("Error fetching cast information");
      } finally {
        setLoading(false);
      }
    }

    fetchMovieCast();
  }, [movieId]);

  return (
    <div className={css.container}>
      {error && <p>{error}</p>}
      {loading && <Loader />}
      {!loading && (
        <>
          <h2 className={css.title}>Movie Cast</h2>
          <ul className={css.list}>
            {cast.map((actor) => {
              const posterUrl = actor.profile_path
                ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                : defaultImg;
              return (
                <li key={actor.id} className={css.item}>
                  <img src={posterUrl} alt={actor.name} className={css.img} />
                  <p className={css.text}>{actor.name}</p>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
