require('dotenv').config();
const express = require('express')
const app = express();
const connectDB = require('./database/db');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const passwordRoutes = require('./routes/passwordRoutes');  

// Connect to the database
connectDB().then(() => {
    // Define the port
    const PORT = process.env.PORT || 5000;

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.log('Database connection error', err);
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/password', passwordRoutes);