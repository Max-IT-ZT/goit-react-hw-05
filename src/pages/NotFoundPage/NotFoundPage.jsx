import { BiError } from "react-icons/bi";
import css from "./NotFoundPage.module.css";
import { Link } from "react-router-dom";
export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <BiError className={css.icon} />
      <h2 className={css.text}>Not Found Page</h2>
      <h4 className={css.text}>
        Please restart page ore return{" "}
        <Link to="/" className={css.link}>
          Home Page
        </Link>
      </h4>
    </div>
  );
}
