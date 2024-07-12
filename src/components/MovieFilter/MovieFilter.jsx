import { SiThemoviedatabase } from "react-icons/si";
import css from "./MovieFilter.module.css";
export default function MovieFilter({ search, onFilter }) {
  return (
    <div className={css.filterByMovie}>
      <label htmlFor="filter" className={css.label}>
        <SiThemoviedatabase /> Search Movies <SiThemoviedatabase />
      </label>
      <input
        className={css.input}
        type="text"
        name="filter"
        value={search}
        placeholder="Please enter search movie"
        onChange={(e) => onFilter(e.target.value)}
      />
    </div>
  );
}
