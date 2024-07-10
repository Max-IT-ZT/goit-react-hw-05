import clsx from "clsx";
import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
export default function Navigation() {
  const activeClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.isActive);
  };
  return (
    <div className={css.container}>
      <NavLink to="/" className={activeClass}>
        Home
      </NavLink>
      <NavLink to="/movies" className={activeClass}>
        Movies
      </NavLink>
    </div>
  );
}
