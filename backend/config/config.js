require('dotenv').config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;


module.exports = { TMDB_API_KEY, TMDB_BASE_URL };