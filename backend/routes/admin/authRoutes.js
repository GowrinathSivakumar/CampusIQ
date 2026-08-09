const express = require('express');
const router = express.Router();
const { register, login, getMe, updateSettings, changePassword, getPreferences, updatePreferences } = require('../../controllers/admin/authController');
const protect = require('../../middleware/auth');
const authorize = require('../../middleware/role');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/settings', protect, updateSettings);
router.put('/password', protect, changePassword);
router.get('/preferences', protect, getPreferences);
router.put('/preferences', protect, updatePreferences);

module.exports = router;
