const express = require('express');
const router = express.Router();

const authRoutes = require('./admin/authRoutes');
const companyRoutes = require('./admin/companyRoutes');
const driveRoutes = require('./admin/driveRoutes');
const questionRoutes = require('./admin/questionRoutes');
const tipRoutes = require('./admin/tipRoutes');
const bookmarkRoutes = require('./admin/bookmarkRoutes');
const chatRoutes = require("./chatRoutes");


router.use('/api/auth', authRoutes);
router.use('/api/companies', companyRoutes);
router.use('/api/drives', driveRoutes);
router.use('/api/questions', questionRoutes);
router.use('/api/tips', tipRoutes);
router.use('/api/bookmarks', bookmarkRoutes);
router.use('/api/chat', chatRoutes);

router.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = router;
