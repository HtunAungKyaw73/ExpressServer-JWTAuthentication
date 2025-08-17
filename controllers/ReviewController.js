const reviewService = require('../services/reviewService');
const errorHandler = require('../middlewares/httpErrorHandler');

const getAllReviewsHandler = async function(req, res, next){
    const reviews = await reviewService.getAllReviews();
    res.status(200).json({
        status: 'success',
        data: reviews,
    })
}

const getReviewByIdHandler = async (req, res, next) => {
    const review = await reviewService.getReviewById(req.params.id);
    res.status(200).json({
        status: 'success',
        data: review,
    })
}

const saveReviewHandler = async (req, res, next) => {
    const review = await reviewService.saveReview(req.body);
    res.status(201).json({
        status: 'success',
        data: review,
    })
}

const deleteReviewHandler = async (req, res, next) => {
    const review = await reviewService.deleteReview(req.params.id);
    res.status(200).json({
        status: 'success',
        data: review,
    })
}

const updateReviewHandler = async (req, res, next) => {
    const review = await reviewService.updateReview(req.params.id, req.body);
    res.status(200).json({
        status: 'success',
        data: review,
    })
}

const getReviewByMovieIdHandler = async (req, res, next) => {
    const review = await reviewService.getReviewByMovieId(req.params.id);
    res.status(200).json({
        status: 'success',
        data: review,
    })
}


const getAllReviews = async (req, res, next) => await errorHandler.httpErrorHandler(getAllReviewsHandler, 404)(req, res, next);
const getReviewById = async (req, res, next) => await errorHandler.httpErrorHandler(getReviewByIdHandler, 404)(req, res, next);
const saveReview = async (req, res, next) => await errorHandler.httpErrorHandler(saveReviewHandler, 500)(req, res, next);
const updateReview = async (req, res, next) => await errorHandler.httpErrorHandler(updateReviewHandler, 500)(req, res, next);
const deleteReview = async (req, res, next) => await errorHandler.httpErrorHandler(deleteReviewHandler, 500)(req, res, next);
const getReviewByMovieId = async (req, res, next) => await errorHandler.httpErrorHandler(getReviewByMovieIdHandler, 404)(req, res, next);


module.exports = {
    getAllReviews,
    getReviewById,
    saveReview,
    updateReview,
    deleteReview,
    getReviewByMovieId,
}