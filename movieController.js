const Movie = require('./movieModel');

// To List all the movies
const listMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// To search for the movie
const searchMovies = async (req, res) => {
  try {
    const { q } = req.query;
    const movies = await Movie.find({
      $or: [{ title: new RegExp(q, 'i') }, { genre: new RegExp(q, 'i') }],
    });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// To add the new movie
const addMovie = async (req, res) => {
  try {
        const { title, genre, rating, streamingLink } = req.body;
        const newMovie = new Movie({ title, genre, rating, streamingLink });
        await newMovie.save();
        res.json(newMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Want to update the movie based on the id
const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Want to Delete a movie based on the id
const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    res.json({ message: 'Movie deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  listMovies,
  searchMovies,
  addMovie,
  updateMovie,
  deleteMovie,
};
