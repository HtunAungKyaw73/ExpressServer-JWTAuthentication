const movieService = require('../services/movieService');
const errorHandler = require('../middlewares/httpErrorHandler');

const getAllMoviesHandler = async function(req, res, next){
    const movies = await movieService.getAllMovies();
    res.status(200).json({
        status: 'success',
        data: movies,
    })
}

const getMovieByIdHandler = async (req, res, next) => {
    const movie = await movieService.getMovieById(req.params.id);
    res.status(200).json({
        status: 'success',
        data: movie,
    })
}

const saveMovieHandler = async (req, res, next) => {
    const movie = await movieService.saveMovie(req.body);
    res.status(201).json({
        status: 'success',
        data: movie,
    })
}

const deleteMovieHandler = async (req, res, next) => {
    const movie = await movieService.deleteMovie(req.params.id);
    res.status(200).json({
        status: 'success',
        data: movie,
    })
}

const updateMovieHandler = async (req, res, next) => {
    const movie = await movieService.updateMovie(req.params.id, req.body);
    res.status(200).json({
        status: 'success',
        data: movie,
    })
}

const findMoviesByTitleHandler = async (req, res, next) => {
    const movies = await movieService.findMoviesByTitle(req.params.title);
    res.status(200).json({
        status: 'success',
        data: movies,
    })
}

const findMoviesByYearHandler = async (req, res, next) => {
    const movies = await movieService.findMoviesByYear(req.params.year);
    res.status(200).json({
        status: 'success',
        data: movies,
    })
}

const getAllMovies = async (req, res, next) => await errorHandler.httpErrorHandler(getAllMoviesHandler, 404)(req, res, next);
const getMovieById = async (req, res, next) => await errorHandler.httpErrorHandler(getMovieByIdHandler, 404)(req, res, next);
const saveMovie = async (req, res, next) => await errorHandler.httpErrorHandler(saveMovieHandler, 500)(req, res, next);
const updateMovie = async (req, res, next) => await errorHandler.httpErrorHandler(updateMovieHandler, 500)(req, res, next);
const deleteMovie = async (req, res, next) => await errorHandler.httpErrorHandler(deleteMovieHandler, 500)(req, res, next);
const findMoviesByTitle = async (req, res, next) => await errorHandler.httpErrorHandler(findMoviesByTitleHandler, 404)(req, res, next);
const findMoviesByYear = async (req, res, next) => await errorHandler.httpErrorHandler(findMoviesByYearHandler, 404)(req, res, next);

module.exports = {
    getAllMovies,
    getMovieById,
    saveMovie,
    updateMovie,
    deleteMovie,
    findMoviesByTitle,
    findMoviesByYear,
}