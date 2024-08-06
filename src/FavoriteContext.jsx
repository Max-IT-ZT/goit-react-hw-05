import { createContext, useContext, useState, useEffect } from "react";
import { addFavorite, removeFavorite, getFavorites } from "./api";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const initialFavorites = getFavorites();
    setFavorites(initialFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavoriteHandler = (movie) => {
    addFavorite(movie);
    setFavorites(getFavorites());
  };

  const removeFavoriteHandler = (movieId) => {
    removeFavorite(movieId);
    setFavorites(getFavorites());
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        addFavorite: addFavoriteHandler,
        removeFavorite: removeFavoriteHandler,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);
