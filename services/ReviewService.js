const Reviews = require("../models/Reviews");
const {getAllMovies} = require("./MovieService");

async function getAllReviews() {
    const reviews = await Reviews.find().populate('movie');
    if(Array.isArray(reviews) && !reviews.length) throw new Error('Empty database');
    return reviews;
}

async function getReviewById(id){
    const review = await Reviews.findById(id);
    if (!review) throw new Error('No Review found with id ' + id);
    return review.populate('movie');
}

async function getReviewByMovieId(id){
    const reviews = await Reviews.find({
        movie: id
    });
    console.log(reviews);
    if (Array.isArray(reviews) && !reviews.length) throw new Error('No Review found with movie id ' + id);
    return reviews;
}

async function saveReview(review){
    const newReview = new Reviews(review);
    return newReview.save();
}

async function updateReview(id, review){
    const oldReview = await Reviews.findById(id);
    if (oldReview) {
        return Reviews.findByIdAndUpdate(id, review, {new: true});
    }
    else {
        throw new Error("Review with id " + id + " not found");
    }
}

async function deleteReview(id){
    const oldReview = await Reviews.findById(id);
    if (oldReview) {
        return Reviews.findByIdAndDelete(id);
    }
    else {
        throw new Error("Review with id " + id + " not found");
    }
}

module.exports = {
    getAllReviews,
    getReviewById,
    saveReview,
    updateReview,
    deleteReview,
    getReviewByMovieId,
}