const User = require('../model/userModel');
const Password = require('../model/passwordModel');
const Category = require('../model/categoryModel');

const addPassword = async (req, res) => {

    // Get the website, username, and password from the request body
    const { website, username, password } = req.body;

    if (!website || !username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Find the category
        const category = await Category.findOne({ name: req.params.categoryName });

        if (!category) {
            return res.status(404).json({ message: 'Category does not exist' });
        }

        // Create a new password
        const newPassword = new Password({ website, username, password, category: category._id, user: req.user.id });
        await newPassword.save();

        // Add the password to the category password array
        category.password.push(newPassword._id);
        await category.save();

        // Add the password to the user password array
        const user = await User.findById(req.user.id);
        user.passwords.push(newPassword._id);
        await user.save();

        // Return the new password
        return res.status(201).json({ newPassword });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updatePassword = async (req, res) => {

    // Get the website, username, and password from the request body
    const { website, username, password } = req.body;

    // Get the password id from the request parameters
    const passwordId = req.params.id;

    try {

        // Find the category
        const category = await Category.findOne({ name: req.params.categoryName });

        if (!category) {
            return res.status(404).json({ message: 'Category does not exist' });
        }

        // Find the password
        const updatedPassword = await Password.findOne({ $and: [{ _id: passwordId }, { user: req.user.id }, { category: category._id }] });

        if (!updatedPassword) {
            return res.status(404).json({ message: 'Password does not exist' });
        }

        // Update the password
        if (website) updatedPassword.website = website;
        if (username) updatedPassword.username = username;
        if (password) updatedPassword.password = password;

        // Save the updated password
        await updatedPassword.save();

        // Return the updated password
        return res.status(200).json({ updatedPassword });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deletePassword = async (req, res) => {

    // Get the password id from the request parameters
    const passwordId = req.params.id;

    try {

        // Find the category
        const category = await Category.findOne({ name: req.params.categoryName });

        if (!category) {
            return res.status(404).json({ message: 'Category does not exist' });
        }

        // Find and delete the password
        const deletedPassword = await Password.findOneAndDelete({ $and: [{ _id: passwordId }, { user: req.user.id }, { category: category._id }] });

        if (!deletedPassword) {
            return res.status(404).json({ message: 'Password does not exist' });
        }


        // Remove the password from the category password array
        category.password = category.password.filter(password => password.toString() !== passwordId);
        await category.save();


        // Remove the password from the user password array
        const user = await User.findById(req.user.id);
        user.passwords = user.passwords.filter(password => password.toString() !== passwordId);
        await user.save();

        // Return a success message
        return res.json({ message: 'Password deleted' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getPassword = async (req, res) => {
    try {

        // Find the category
        const category = await Category.findOne({ name: req.params.categoryName });

        if (!category) {
            return res.status(404).json({ message: 'Category does not exist' });
        }

        // Find the password
        const password = await Password.find({ $and: [{ user: req.user.id }, { category: category._id }] });

        if (!password) {
            return res.status(404).json({ message: 'No password found' });
        }

        // Return the password
        return res.json({ password });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


module.exports = { addPassword, updatePassword, deletePassword, getPassword };