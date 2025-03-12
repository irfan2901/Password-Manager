const express = require('express');
const router = express.Router();
const {registerUser, loginUser, updateUser, deleteUser, getCurrentUser} = require('../controller/userController');
const auth = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update/:id', auth, updateUser);
router.delete('/delete/:id', auth, deleteUser);
router.get('/current', auth, getCurrentUser);

module.exports = router;