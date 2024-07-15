import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../api";
import Loader from "../Loader/Loader";
import css from "./MovieReviews.module.css";
export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMovieReviews() {
      try {
        setLoading(true);
        const reviewsData = await getMovieReviews(movieId);
        setReviews(reviewsData);
      } catch (error) {
        setError("Error fetching reviews information");
      } finally {
        setLoading(false);
      }
    }

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div>
      {error && <p>{error}</p>}
      {loading && <Loader />}
      <h2 className={css.title}>Відгуки про фільм</h2>
      {reviews.length === 0 ? (
        <p className={css.notFound}>Поки жодног відгуку</p>
      ) : (
        <ul className={css.list}>
          {reviews.map((rev) => (
            <li className={css.item} key={rev.id}>
              <h4>Author: {rev.author}</h4>
              <p>{rev.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
