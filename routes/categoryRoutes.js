const express = require('express');
const router = express.Router();
const { addCategory, updateCategory, deleteCategory, getCategories } = require('../controller/categoryController');

router.post('/add', addCategory);
router.put('/update/:categoryName', updateCategory);
router.delete('/delete/:id', deleteCategory);
router.get('/all', getCategories);

module.exports = router;