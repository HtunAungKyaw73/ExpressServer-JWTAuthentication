const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MoviesSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    director: {
        type: {
            name: {
                type: String,
                required: true,
            },
            phoneNo: {
                type: String,
                required: true,
            }
        },
        required: false,
    },
    year: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model("Movies", MoviesSchema);