const express = require('express');
const router = express.Router();
const { register, login, getMe, updateSettings } = require('../../controllers/admin/authController');
const protect = require('../../middleware/auth');
const authorize = require('../../middleware/role');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/settings', protect, updateSettings);

module.exports = router;
