const axios = require('axios');
const { TMDB_API_KEY, TMDB_BASE_URL } = require('../config/config');
const Movie = require('../models/Movie'); // Import Movie model here for caching and analytics

const normalizeGenre = (genre) => genre === 'Science Fiction' ? 'Sci-Fi' : genre;

const sortMovies = (movies, sort) => {
  switch (sort) {
    case 'rating_desc':
      return movies.sort((a, b) => b.rating - a.rating);
    case 'rating_asc':
      return movies.sort((a, b) => a.rating - b.rating);
    case 'year_desc':
      return movies.sort((a, b) => b.year - a.year);
    case 'year_asc':
      return movies.sort((a, b) => a.year - b.year);
    default:
      return movies;
  }
};

async function fetchMovieDetails(tmdbId) {
  const response = await axios.get(`${TMDB_BASE_URL}/movie/${tmdbId}`, {
    params: { api_key: TMDB_API_KEY, append_to_response: 'credits' },
    timeout: 10000,
  });
  return response.data;
}

function transformMovieData( details) {
  return {
    tmdbId: details.id.toString(),
    title: details.title,
    year: parseInt(details.release_date?.split('-')[0]) || null,
    genre: details.genres?.map((g) => normalizeGenre(g.name)) || [],
    director: details.credits?.crew?.find((c) => c.job === 'Director')?.name || '',
    actors: details.credits?.cast?.slice(0, 3).map((c) => c.name) || [],
    rating: details.vote_average || 0,
    runtime: details.runtime || 0,
    plot: details.overview || '', 
    posterUrl: details.poster_path ? `https://image.tmdb.org/t/p/w500${details.poster_path}` : '', 
    backdropUrl: details.backdrop_path ? `https://image.tmdb.org/t/p/w780${details.backdrop_path}` : '',
    imdbLink: details.imdb_id ? `https://www.imdb.com/title/${details.imdb_id}` : '' 
  };
}

async function fetchAndTransformMoviesFromTMDB(search, filter, page = 1) {
  const isSearchEmpty = !search || search.trim() === '';
  const tmdbUrl = isSearchEmpty ? `${TMDB_BASE_URL}/discover/movie` : `${TMDB_BASE_URL}/search/movie`;
  const tmdbParams = isSearchEmpty
    ? { api_key: TMDB_API_KEY, sort_by: 'popularity.desc', page }
    : { api_key: TMDB_API_KEY, query: search, page };

  const response = await axios.get(tmdbUrl, { params: tmdbParams, timeout: 10000 });
  const tmdbMovies = response?.data.results || [];
  if (!tmdbMovies.length) return [];

  const transformedMovies = await Promise.all(
    tmdbMovies.map(async (movie) => {
      try {
        const details = await fetchMovieDetails(movie.id);
        const movieData = transformMovieData(details);

        if (filter && filter.startsWith('genre:')) {
          const genres = filter.split(':')[1].split(',');
          if (!movieData.genre.some(g => genres.includes(g))) {
            return null;
          }
        }

        return movieData;
      } catch (err) {
        // console.error(`Failed to fetch details for movie ${movie.id}:`, err.message);
        return null;
      }
    })
  );

  return transformedMovies.filter(Boolean);
}

async function cacheMovies(movies) {
  await Promise.all(
    movies.map(movie =>
      Movie.findOneAndUpdate({ tmdbId: movie.tmdbId }, movie, { upsert: true })
    )
  );
}

async function getGenreCount() {
  return await Movie.aggregate([
    { $unwind: '$genre' },
    { $group: { _id: '$genre', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
}

async function getAvgRating() {
  const result = await Movie.aggregate([
    { $group: { _id: null, avgRating: { $avg: '$rating' } } },
  ]);
  return result[0]?.avgRating || 0;
}

async function getRuntimeByYear() {
  return await Movie.aggregate([
    { $group: { _id: '$year', avgRuntime: { $avg: '$runtime' } } },
    { $sort: { _id: 1 } },
  ]);
}

module.exports = {
  normalizeGenre,
  sortMovies,
  fetchMovieDetails,
  transformMovieData,
  fetchAndTransformMoviesFromTMDB,
  cacheMovies,
  getGenreCount,
  getAvgRating,
  getRuntimeByYear
};