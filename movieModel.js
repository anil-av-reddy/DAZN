const mongoose = require('mongoose');

const movieModel = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  rating: { type: Number,required: true,min: 0,max: 10},  
  streamingLink: { type: String, required: true },
});

const Movie = mongoose.model('Movie', movieModel);
module.exports = Movie;
