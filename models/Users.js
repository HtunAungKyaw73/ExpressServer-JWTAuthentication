const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: 'String',
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: 'String',
        required: true,
        trim: true,
    },
    password: {
        type: 'String',
        required: true,
        trim: true,
        unique: true
    }
});
module.exports = mongoose.model('User', UserSchema)