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
        unique: true,
        trim: true,
    },
    password: {
        type: 'String',
        required: true,
        trim: true,
        unique: true
    },
    role: {
        type: 'String',
        required: true,
        trim: true,
        enum: {
            values: ['admin', 'user'],
            message: '{VALUE} is not a valid role'
        }
    },
    refreshToken: {
        type: 'String',
    }
});
module.exports = mongoose.model('User', UserSchema)