import axios from "axios";
axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjBmOGM0MGQyYjNiMDE2MDRiMGU1NmRhYmFmYzMyNCIsIm5iZiI6MTcyMDY0MzY0MS41MzU0MTUsInN1YiI6IjY2OGVlZjRlMzk1MjJkMTg3MzAzMzZlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f0Y0AvJBCmWicLd-dK6-PceTCCwTGEqA_W1jV73WtPw",
  },
};

export const getMovies = async (query) => {
  const response = await axios.get(
    `/search/movie?include_adult=false&language=uk-UA&page=1&query=${query}`,
    options
  );
  return response.data;
};

export const getTrendingMovies = async () => {
  const response = await axios.get(
    `/trending/movie/week?language=uk-UA`,
    options
  );
  return response.data;
};

export const getMovieDetails = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}?language=uk-UA`, options);
  return response.data;
};

export const getTopRatedMovies = async () => {
  const response = await axios.get(`/movie/top_rated?language=uk-UA`, options);
  return response.data;
};

export const getTrendingCartoons = async () => {
  const response = await axios.get(
    `/discover/movie?with_genres=16&language=uk-UA`,
    options
  );
  return response.data;
};

export const getGenres = async () => {
  const response = await axios.get("/genre/movie/list?language=uk-UA", options);
  return response.data;
};

export const getUpcomingMovies = async () => {
  const response = await axios.get(`/movie/upcoming?language=uk-UA`, options);
  return response.data;
};
export const getMovieCast = async (movieId) => {
  const response = await axios.get(
    `/movie/${movieId}/credits?language=uk-UA`,
    options
  );
  return response.data.cast;
};

export const getMovieReviews = async (movieId) => {
  const response = await axios.get(
    `/movie/${movieId}/reviews?language=uk-UA`,
    options
  );
  return response.data.results;
};
export const getMovieVideos = async (movieId) => {
  let response;

  response = await axios.get(
    `/movie/${movieId}/videos?language=uk-UA`,
    options
  );
  let videos = response.data.results;

  if (videos.length === 0) {
    response = await axios.get(`/movie/${movieId}/videos`, options);
    videos = response.data.results;
  }

  return videos;
};
export const getFavorites = () => {
  try {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    return favorites;
  } catch (error) {
    return [];
  }
};

export const addFavorite = (movie) => {
  const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (!savedFavorites.some((fav) => fav.id === movie.id)) {
    savedFavorites.push(movie);
    localStorage.setItem("favorites", JSON.stringify(savedFavorites));
  }
};

export const removeFavorite = (movieId) => {
  const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const updatedFavorites = savedFavorites.filter(
    (movie) => movie.id !== movieId
  );
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};
