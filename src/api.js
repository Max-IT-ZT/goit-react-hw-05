import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjBmOGM0MGQyYjNiMDE2MDRiMGU1NmRhYmFmYzMyNCIsIm5iZiI6MTcyMDY0MzY0MS41MzU0MTUsInN1YiI6IjY2OGVlZjRlMzk1MjJkMTg3MzAzMzZlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f0Y0AvJBCmWicLd-dK6-PceTCCwTGEqA_W1jV73WtPw",
  },
};

export const fetchMovies = (query) => {
  return axios.get(
    `${BASE_URL}/search/movie?include_adult=false&language=en-US&page=1&query=${query}`,
    options
  );
};

export const fetchTrendingMovies = () => {
  return axios.get(`${BASE_URL}/trending/movie/day?language=en-US`, options);
};
