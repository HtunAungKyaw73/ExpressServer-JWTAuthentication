var express = require('express');
var router = express.Router();
const reviews = require('../controllers/ReviewController');

router.get('/', reviews.getAllReviews);
router.get('/:id', reviews.getReviewById);
router.post('/', reviews.saveReview);
router.put('/:id', reviews.updateReview);
router.delete('/:id', reviews.deleteReview);
router.get('/movie/:id', reviews.getReviewByMovieId);

module.exports = router;