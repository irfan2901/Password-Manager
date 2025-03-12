const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Password'
    }]
});

module.exports = mongoose.model('Category', categorySchema);