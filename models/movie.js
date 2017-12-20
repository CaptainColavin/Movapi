const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  'name': String,
  'synopsis': String,
  'actors': [String],
  'duration': String
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
