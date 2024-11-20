const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    number: {
        type: Number
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tasks'
        }],
});

const UserDB = mongoose.model('User', Schema);

module.exports = UserDB;
