const Movies = require("../models/Movies");

async function getAllMovies() {
    const movies = await Movies.find();
    if(Array.isArray(movies) && !movies.length) throw new Error('Empty database');
    return movies;
}

async function getMovieById(id){
    const movie = await Movies.findById(id);
    if (!movie) throw new Error('No Movie found with id ' + id);
    return movie;
}

async function saveMovie(movie){
    const newMovie = new Movies(movie);
    return newMovie.save();
}

async function findMoviesByTitle(title){
    let movies;
    movies = await Movies.find({
        title: {
            $regex: title
        }
    });
    if (!movies.length) throw new Error('No Movie found with title ' + title);
    return movies;
}

async function findMoviesByYear(year){
    let movies;
    movies = await Movies.find({
        year: year
    });
    if (!movies.length) throw new Error('No Movie found with year ' + year);
    return movies;
}

async function updateMovie(id, movie){
    const oldMovie = await Movies.findById(id);
    if (oldMovie) {
        return Movies.findByIdAndUpdate(id, movie, {new: true});
    }
    else {
        throw new Error("Movie with id " + id + " not found");
    }
}

async function deleteMovie(id){
    const oldMovie = await Movies.findById(id);
    if (oldMovie) {
        return Movies.findByIdAndDelete(id);
    }
    else {
        throw new Error("Movie with id " + id + " not found");
    }
}

module.exports = {
    getAllMovies,
    getMovieById,
    saveMovie,
    updateMovie,
    deleteMovie,
    findMoviesByTitle,
    findMoviesByYear
}