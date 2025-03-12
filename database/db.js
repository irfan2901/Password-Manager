const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect('mongodb+srv://irfanmohd2910:weWN4Q7DpjCWUUx4@cluster0.2ngnu.mongodb.net/').then(() => {
        console.log('Connected to database');
    }).catch((err) => {
        console.log('Database connection error', err);
    });
};

module.exports = connectDB;