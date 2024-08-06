import { Route, Routes } from "react-router-dom";
import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage";
import Navigation from "../Navigation/Navigation";
import { lazy, Suspense } from "react";
import Loader from "../Loader/Loader";
import { FavoriteProvider } from "../../FavoriteContext";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));
const FavoriteList = lazy(() => import("../FavoriteList/FavoriteList"));

export default function App() {
  return (
    <FavoriteProvider>
      <div>
        <Navigation />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="/favorites" element={<FavoriteList />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </FavoriteProvider>
  );
}
