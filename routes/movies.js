var express = require('express');
var router = express.Router();
const movies = require('../controllers/MovieController');
const { checkSchema } = require('express-validator');
const { querySchema } = require("../middlewares/queryCheckSchema");

router.get('/', checkSchema(querySchema), movies.getAllMovies);
router.get('/filter',checkSchema(querySchema), movies.getFilteredMovies);
router.get('/:id', movies.getMovieById);
router.post('/', movies.saveMovie);
router.put('/:id', movies.updateMovie);
router.delete('/:id', movies.deleteMovie);
router.get('/title/:title', movies.findMoviesByTitle );
router.get('/year/:year', movies.findMoviesByYear);

module.exports = router;