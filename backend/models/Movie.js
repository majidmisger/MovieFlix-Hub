const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  tmdbId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  year: { type: Number },
  genre: [{ type: String }],
  director: { type: String },
  actors: [{ type: String }],
  rating: { type: Number },
  runtime: { type: Number },
  plot: { type: String },
  posterUrl: { type: String }, 
  backdropUrl: { type: String }, 
  imdbLink: { type: String },
  createdAt: { type: Date, default: Date.now, expires: 120 }, 
  // createdAt: { type: Date, default: Date.now, expires: '24h' }, 
});

module.exports = mongoose.model('Movie', movieSchema);


// db.movies.dropIndex("createdAt_1")
// db.movies.createIndex({ createdAt: 1 }, { expireAfterSeconds: 120 })