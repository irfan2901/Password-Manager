require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/userModel');

const registerUser = async (req, res) => {

    // Get user input
    const { name, email, password } = req.body;

    // Validate user input
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if user already exists
        const user = await User.find({ $or: [{ name: name }, { email: email },] });

        // If user exists, return error
        if (user.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save user to database
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // Create token
        jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) {
                throw err;
            }

            // Send token
            return res.status(201).json({ token });
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {

    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);

        // If password is incorrect, return error
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create token
        jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) {
                throw err;
            }

            // Send token
            return res.status(200).json({ token });
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        // Check if user exists
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        // Get user input
        const { name, email, password } = req.body;

        // Update user
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        // Save user to database
        await user.save();

        // Send response
        res.json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        // Check if user exists
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        // Send response
        res.json({ message: 'User deleted' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        // Check if user exists
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        // Send response
        res.json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser, updateUser, deleteUser, getCurrentUser };