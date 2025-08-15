
const Movie = require('../models/Movie');
const {
  sortMovies,
  fetchAndTransformMoviesFromTMDB,
  cacheMovies,
  fetchMovieDetails,
  transformMovieData,
  getGenreCount,
  getAvgRating,
  getRuntimeByYear
} = require('../utils/utils');

exports.searchMovies = async (req, res) => {
  const { search, sort, filter } = req.query;

  try {

    //create a query object to use with MongoDB
    let query = {};

    // check if search is provided and add it to the query
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    // check if filter is provided and add it to the query
    if (filter) {
      const [key, value] = filter.split(':');
      if (key === 'genre') {
        const genres = value.split(',');
        query.genre = { $in: genres };
      }
    }

    // find movies in the database that match the query
    let movies = await Movie.find(query);

    // if movies are found, sort them based on the sort option
    if (movies.length > 0) {
      return res.json(sortMovies(movies, sort));
    }

    // if movies are not found in the database, fetch them from TMDB
    movies = await fetchAndTransformMoviesFromTMDB(search, filter);

    // if movies are fetched from TMDB, cache them in the database
    if (movies.length > 0) {
      await cacheMovies(movies);
    }

    // return the sorted movies
    res.json(sortMovies(movies, sort));
  } catch (error) {
    console.log("🚀 ~ error:", error)
    res.status(500).json({ message: 'Server error', details: error.message });
  }
};

exports.getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the movie is already cached in the database
    let movie = await Movie.findOne({ tmdbId: id });

    // If movie is found in the cache, return it
    if (movie) {
      return res.json(movie);
    }

    // If not found in cache, fetch details from TMDB
    const details = await fetchMovieDetails(id);

    // Transform the movie data and cache it
    movie = transformMovieData( details);

    // Save the movie to the database
    await Movie.findOneAndUpdate({ tmdbId: id }, movie, { upsert: true });

    // Return the movie data
    res.json(movie);
  } catch (error) {
    console.log("🚀 ~ error:", error)
    res.status(500).json({ message: 'Server error', details: error.message });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    // Fetch genre count, average rating, and runtime by year
    const genreCount = await getGenreCount();
    const avgRating = await getAvgRating();
    const runtimeByYear = await getRuntimeByYear();

    // Return the analytics data
    res.json({
      genreCount,
      avgRating,
      runtimeByYear,
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: 'Server error', details: error.message });
  }
};