const movieService = require('../services/movieService');
const errorHandler = require('../middlewares/httpErrorHandler');
const {validationResult, matchedData} = require("express-validator");

const getAllMoviesHandler = async function(req, res, next){
    const movies = await movieService.getAllMovies();
    console.log('Query', req.query);
    if(!!Object.keys(req.query).length)
    {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({
                status: 'error',
                error: result.array()
            });
        }
        const { filter, value } = matchedData(req); // best practice more safe
        if (filter && value && value.length > 0) {
            return res.status(200).json({
                status: 'success',
                data: movies.filter(movie => movie[filter].includes(value))
            })
        }
    }
    return res.status(200).json({
        status: 'successful',
        data: movies,
    })
}

const getFilteredMoviesHandler = async function(req, res, next){
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            error: result.array()
        });
    }
    const { filter, value } = matchedData(req); // best practice more safe
    const movies = await movieService.getAllMovies();

    if (filter && value && value.length > 0) {
        return res.status(200).json({
            status: 'success',
            data: movies.filter(movie => movie[filter].includes(value))
        })
    }
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
const getFilteredMovies = async (req, res, next) => await errorHandler.httpErrorHandler(getFilteredMoviesHandler, 404)(req, res, next);
const getMovieById = async (req, res, next) => await errorHandler.httpErrorHandler(getMovieByIdHandler, 404)(req, res, next);
const saveMovie = async (req, res, next) => await errorHandler.httpErrorHandler(saveMovieHandler, 500)(req, res, next);
const updateMovie = async (req, res, next) => await errorHandler.httpErrorHandler(updateMovieHandler, 500)(req, res, next);
const deleteMovie = async (req, res, next) => await errorHandler.httpErrorHandler(deleteMovieHandler, 500)(req, res, next);
const findMoviesByTitle = async (req, res, next) => await errorHandler.httpErrorHandler(findMoviesByTitleHandler, 404)(req, res, next);
const findMoviesByYear = async (req, res, next) => await errorHandler.httpErrorHandler(findMoviesByYearHandler, 404)(req, res, next);

module.exports = {
    getAllMovies,
    getFilteredMovies,
    getMovieById,
    saveMovie,
    updateMovie,
    deleteMovie,
    findMoviesByTitle,
    findMoviesByYear,
}