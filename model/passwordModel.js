const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
    website: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
});

module.exports = mongoose.model('Password', passwordSchema);