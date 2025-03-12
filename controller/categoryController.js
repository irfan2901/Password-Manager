const Category = require('../model/categoryModel');

const addCategory = async (req, res) => {

    // Get the name from the request body
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    const category = new Category({ name });
    await category.save();

    return res.status(201).json({ category });
};

const updateCategory = async (req, res) => {

    // Get the name from the request body
    const { name } = req.body;

    const categoryName = req.params.categoryName;

    const category = await Category.findOneAndUpdate({ name: categoryName }, { name }, { new: true });

    if (!category) {
        return res.status(404).json({ message: 'Category does not exist' });
    }
    return res.status(200).json({ category });
};

const deleteCategory = async (req, res) => {
    const id = req.params.id;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
        return res.status(404).json({ message: 'Category does not exist' });
    }
    return res.json({ message: 'Category deleted' });
};

const getCategories = async (req, res) => {
    const categories = await Category.find();

    if (!categories) {
        q
        return res.status(404).json({ message: 'No categories found' });
    }
    return res.json({ categories });
};

module.exports = { addCategory, updateCategory, deleteCategory, getCategories };