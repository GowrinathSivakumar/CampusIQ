const express = require('express');
const router = express.Router();
const {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
} = require('../../controllers/admin/companyController');
const protect = require('../../middleware/auth');
const authorize = require('../../middleware/role');

router.use(protect);

router.get('/', getCompanies);
router.get('/:id', getCompanyById);
router.post('/', authorize('admin'), createCompany);
router.put('/:id', authorize('admin'), updateCompany);
router.delete('/:id', authorize('admin'), deleteCompany);

module.exports = router;
