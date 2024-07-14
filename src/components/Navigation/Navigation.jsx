import clsx from "clsx";
import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
export default function Navigation() {
  const activeClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.isActive);
  };
  return (
    <header>
      <nav className={css.nav}>
        <NavLink to="/" className={activeClass}>
          Головна
        </NavLink>
        <NavLink to="/movies" className={activeClass}>
          Фільми
        </NavLink>
      </nav>
    </header>
  );
}
