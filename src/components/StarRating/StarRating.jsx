import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import css from "./StarRating.module.css";

const StarRating = ({ rating }) => {
  // Конвертуємо рейтинг в кількість зірок від 1 до 10
  const totalStars = 10;
  const filledStars = Math.round(rating); // Округлюємо рейтинг до найближчого цілого числа

  return (
    <div className={css.starContainer}>
      {[...Array(totalStars)].map((_, index) => (
        <span key={index} className={css.star}>
          {index < filledStars ? <TiStarFullOutline /> : <TiStarOutline />}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
