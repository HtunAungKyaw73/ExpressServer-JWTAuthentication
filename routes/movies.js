var express = require('express');
var router = express.Router();
const movies = require('../controllers/MovieController');

router.get('/', movies.getAllMovies);
router.get('/:id', movies.getMovieById);
router.post('/', movies.saveMovie);
router.put('/:id', movies.updateMovie);
router.delete('/:id', movies.deleteMovie);
router.get('/title/:title', movies.findMoviesByTitle );
router.get('/year/:year', movies.findMoviesByYear);

module.exports = router;