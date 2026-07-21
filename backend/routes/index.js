const express = require('express');
const router = express.Router();

const authRoutes = require('./admin/authRoutes');
const companyRoutes = require('./admin/companyRoutes');
const driveRoutes = require('./admin/driveRoutes');
const questionRoutes = require('./admin/questionRoutes');
const tipRoutes = require('./admin/tipRoutes');
const bookmarkRoutes = require('./admin/bookmarkRoutes');
const chatRoutes = require("./chatRoutes");


router.use('/admin/auth', authRoutes);
router.use('/admin/companies', companyRoutes);
router.use('/admin/drives', driveRoutes);
router.use('/admin/questions', questionRoutes);
router.use('/admin/tips', tipRoutes);
router.use('/admin/bookmarks', bookmarkRoutes);
router.use('/chat', chatRoutes);

router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = router;
