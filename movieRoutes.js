const express = require('express');
const {
  listMovies,
  searchMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} = require('./movieController');
const authentication = require('./auth')

const router = express.Router();

router.get('/movies', listMovies);
router.get('/search', searchMovies);
router.post('/movies', authentication,addMovie); 
router.put('/movies/:id', authentication,updateMovie); 
router.delete('/movies/:id', authentication,deleteMovie);

module.exports = router;
