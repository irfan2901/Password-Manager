const express = require('express');
const router = express.Router();
const { addPassword, updatePassword, deletePassword, getPassword } = require('../controller/passwordController');
const auth = require('../middleware/auth');

router.get('/all/:categoryName', auth, getPassword);
router.post('/add/:categoryName', auth, addPassword);
router.put('/update/:categoryName/:id', auth, updatePassword);
router.delete('/delete/:categoryName/:id', auth, deletePassword);

module.exports = router;