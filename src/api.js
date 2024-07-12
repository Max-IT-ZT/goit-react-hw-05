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
    `/search/movie?include_adult=false&language=en-US&page=1&query=${query}`,
    options
  );
  return response.data;
};

export const getTrendingMovies = async () => {
  const response = await axios.get(
    `/trending/movie/day?language=en-US`,
    options
  );
  return response.data;
};

export const getMovieDetails = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}?language=en-US`, options);
  return response.data;
};

export const getMovieCast = async (movieId) => {
  const response = await axios.get(
    `/movie/${movieId}/credits?language=en-US`,
    options
  );
  return response.data.cast;
};

export const getMovieReviews = async (movieId) => {
  const response = await axios.get(
    `/movie/${movieId}/reviews?language=en-US`,
    options
  );
  return response.data.results;
};
