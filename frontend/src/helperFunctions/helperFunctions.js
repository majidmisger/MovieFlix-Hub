
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Helper: retry wrapper
const retryRequest = async (fn, retries = 7, delay = 500) => {
  let lastError;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      console.warn(`Attempt ${attempt} failed: ${error.message || error}`);
      if (attempt < retries) {
        await new Promise(res => setTimeout(res, delay)); // Wait before retry
      }
    }
  }
  throw lastError; // Only throw after all retries fail
};

export const searchMovies = async (search, sort, genre, page = 1) => {
  const params = { page }; // always send page

  if (search && search.trim()) {
    params.search = search.trim();
  }
  if (sort) {
    params.sort = sort;
  }
  if (genre) {
    params.filter = `genre:${genre}`;
  }

  try {
    return await retryRequest(
      () => axios.get(`${API_BASE_URL}/movies`, { params }).then(res => res.data),
      7,  // max retries
      500 // delay between retries in ms
    );
  } catch (error) {
    console.error('Error fetching movies after retries:', error);
    return [];
  }
};
// Fetch analytics (requires JWT token)
export const getAnalytics = async (token) => {
  try {
    return await retryRequest(
      () =>
        axios
          .get(`${API_BASE_URL}/movies/analytics`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(res => res.data),
      3, // fewer retries for auth endpoints
      500
    );
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
};

// Fetch single movie details
export const getMovieById = async (id) => {
  try {
    return await retryRequest(
      () => axios.get(`${API_BASE_URL}/movies/${id}`).then(res => res.data),
      5,
      500
    );
  } catch (error) {
    console.error(`Error fetching movie ${id}:`, error);
    throw error;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await retryRequest(
      () =>
        axios.post(`${API_BASE_URL}/auth/login`, {
          username,
          password,
        }),
      3, // Retry less aggressively for auth
      500
    );
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
